import { ref, reactive, computed, type Ref } from 'vue'
import { toast } from '~/composables/util'

interface TableOption {
  getList: (page: number, searchForm?: any) => Promise<any>
  delete: (id: number) => Promise<any>
  updateStatus: (id: number, status: number) => Promise<any>
  searchForm?: Record<string, any>
  onGetListSuccess?: (res: any) => void
}

interface FormOption {
  form: Record<string, any>
  rules?: Record<string, any>
  create: (data: any) => Promise<any>
  update: (id: number, data: any) => Promise<any>
  getData: (refresh?: boolean | number) => void
}

//搜索、分页、删除、状态改变
export function useInitTable(opt: TableOption) {

    let searchForm: Record<string, any> | null = null
    let resetSearchForm: (() => void) | null = null
    if (opt.searchForm) {
        searchForm = reactive({ ...opt.searchForm })
        resetSearchForm = () => {
            for (const key in opt.searchForm) {
                searchForm![key] = opt.searchForm![key]
            }
            getData()
        }
    }

    const tableData: Ref<any[]> = ref([])
    const loading = ref(false)

    //分页
    const currentPage = ref(1)
    const total = ref(0)
    const limit = ref(10)

    //获取数据
    function getData(p: number | null = null) {
        if (typeof p === 'number') {
            currentPage.value = p
        }

        loading.value = true
        opt.getList(currentPage.value, searchForm).then((res: any) => {
            if (opt.onGetListSuccess && typeof opt.onGetListSuccess === 'function') {
                opt.onGetListSuccess(res)
            } else {
                tableData.value = res.list
                total.value = res.totalCount
            }

        }).finally(() => {
            loading.value = false
        })
    }

    getData()

    //删除
    const handleDelete = (id: number) => {
        loading.value = true
        opt.delete(id).then(() => {
            toast('删除成功')
            getData(1)
        }).finally(() => {
            loading.value = false
        })
    }

    //状态改变
    const handleStatusChange = (status: number, row: any) => {
        row.statusLoading = true
        opt.updateStatus(row.id, status).then(() => {
            row.status = status
            toast('状态改变成功')
        }).finally(() => {
            row.statusLoading = false
        })

    }

    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handleDelete,
        handleStatusChange,
    }
}

//新增、修改
export function useInitForm(opt: FormOption) {
    //表单部分
    const formDrawerRef: Ref<any> = ref(null)
    const formRef: Ref<any> = ref(null)
    const defaultForm = opt.form
    const form = reactive<Record<string, any>>({})
    const loading = ref(false)
    const rules = opt.rules
    const handleSubmit = () => {
        formRef.value.validate().then((valid: boolean) => {
            if (!valid) return

            formDrawerRef.value.showLoading()

            const fun = updateId.value ? opt.update(updateId.value, form) : opt.create(form)

            fun.then(() => {
                toast(updateId.value ? '修改成功' : '新增成功')
                // 修改刷新当前页，新增刷新第一页
                opt.getData(updateId.value ? false : 1)
            }).finally(() => {
                formDrawerRef.value.hideLoading()
                formDrawerRef.value.close()
                loading.value = false
            })
        })
    }

    //标识
    const updateId = ref(0)
    const drawerTitle = computed(() => {
        return updateId.value ? '修改' : '新增'
    })

    //重置表单
    function resetForm(row: Record<string, any> = defaultForm) {
        if (formRef.value) {
            formRef.value.clearValidate()
        }
        for (const key in defaultForm) {
            form[key] = row[key]
        }
    }

    //新增
    const handleCreate = () => {
        updateId.value = 0
        resetForm(defaultForm)
        formDrawerRef.value.open()
    }

    //修改
    const handleUpdate = (row: any) => {
        updateId.value = row.id
        resetForm(row)
        formDrawerRef.value.open()
    }

    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        handleSubmit,
        updateId,
        drawerTitle,
        resetForm,
        handleCreate,
        handleUpdate,
    }
}