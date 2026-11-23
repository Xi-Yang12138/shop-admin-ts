import axios from '~/axios'

// 商品规格列表
export function getSkuList(page: number): Promise<any> {
    return axios.get(`/admin/skus/${page}`)
}

// 增加商品规格
export function createSku(data: Record<string, any>): Promise<any> {
    return axios.post('/admin/skus', data)
}

// 修改商品规格
export function updateSku(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/skus/${id}`, data)
}

// 修改商品规格状态
export function updateSkuStatus(id: number, status: number): Promise<any> {
    return axios.post(`/admin/skus/${id}/update_status`, { status })
}

// 批量删除商品规格（单行删除也走此接口）
export function deleteSkus(ids: number[]): Promise<any> {
    return axios.post('/admin/skus/delete_all', { ids })
}