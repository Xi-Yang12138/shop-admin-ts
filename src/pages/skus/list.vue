<!-- 页面: 规格管理 -->
<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增|刷新 -->
        <div class="top flex items-center justify-between">
            <ListHeader @create="handleCreate" @refresh="getData" />
            <el-button type="danger" :disabled="!selectedRows.length" @click="handleBulkDelete">批量删除</el-button>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" stripe style="width:100%" v-loading="loading" @selection-change="onSelectionChange">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="规格名称" />
            <el-table-column prop="default" label="规格值" />
            <el-table-column label="状态" width="140">
                <template #default="{ row }">
                    <StatusSwitch :model-value="row.status" :loading="row.statusLoading" @change="handleStatusChange($event, row)" />
                </template>
            </el-table-column>
            <el-table-column prop="order" label="排序" width="100" />
            <el-table-column prop="create_time" label="创建时间" width="180" />
            <el-table-column label="操作" width="160">
                <template #default="{ row }">
                    <el-button type="primary" text @click="handleUpdate(row)">编辑</el-button>
                    <DeleteButton @confirm="handleDelete(row.id)" />
                </template>
            </el-table-column>
        </el-table>

        <Pagination :total="total" :current-page="currentPage" :page-size="limit" @current-change="getData" />

        <!-- 新增|编辑抽屉 -->
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="规格名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入规格名称" />
                </el-form-item>
                <el-form-item label="规格值" prop="default">
                    <el-input v-model="form.default" placeholder="多个规格值用逗号分割，如：规格1,规格2" />
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { toast, showModal } from '~/composables/util'
import { getSkuList, createSku, updateSku, updateSkuStatus, deleteSkus } from '~/api/skus'
import FormDrawer from '~/components/FormDrawer.vue'
import ListHeader from '~/components/ListHeader.vue'
import Pagination from '~/components/Pagination.vue'
import DeleteButton from '~/components/DeleteButton.vue'
import StatusSwitch from '~/components/StatusSwitch.vue'
import { useInitTable, useInitForm } from '~/composables/useCommon'

const selectedRows = ref([])

const {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange,
} = useInitTable({
    getList: getSkuList,
    // 单行删除统一走批量删除接口
    delete: (id) => deleteSkus([id]),
    updateStatus: updateSkuStatus,
})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    handleSubmit,
    drawerTitle,
    handleCreate,
    handleUpdate,
} = useInitForm({
    form: {
        name: '',
        default: '',
        order: 50,
        status: 1
    },
    rules: {
        name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
        default: [{ required: true, message: '请输入规格值', trigger: 'blur' }]
    },
    getData,
    create: createSku,
    update: updateSku,
})

function onSelectionChange(val) {
    selectedRows.value = val
}

//批量删除
async function handleBulkDelete() {
    const ids = selectedRows.value.map(r => r.id)
    if (!ids.length) return
    await showModal('确认批量删除所选规格吗？', 'warning')
    deleteSkus(ids).then(() => {
        toast('删除成功')
        getData(1)
    })
}
</script>