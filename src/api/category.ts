import axios from '~/axios'

export function getCategoryList(): Promise<any> {
    return axios.get('/admin/category')
}

export function createCategory(data: Record<string, any>): Promise<any> {
    return axios.post('/admin/category', data)
}

export function updateCategory(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/category/${id}`, data)
}

export function updateCategoryStatus(id: number, status: number): Promise<any> {
    return axios.post(`/admin/category/${id}/update_status`, { status })
}

export function deleteCategory(id: number): Promise<any> {
    return axios.post(`/admin/category/${id}/delete`)
}

export function getCategoryItemList(category_id: number): Promise<any> {
    return axios.get('/admin/app_category_item/list', {
        params: { category_id }
    })
}

export function deleteCategoryItem(id: number): Promise<any> {
    return axios.post(`/admin/app_category_item/${id}/delete`)
}

export function addCategoryItem(data: Record<string, any>): Promise<any> {
    return axios.post('/admin/app_category_item', data)
}