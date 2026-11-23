import axios from '~/axios'

export function getGoodsList(page = 1, params: Record<string, any> = {}): Promise<any> {
    return axios.get(`/admin/goods/${page}`, {
        params: {
            tab: params.tab || 'all',
            title: params.title || undefined,
            category_id: params.category_id || undefined,
            limit: params.limit || 10,
        }
    })
}

export function createGoods(data: Record<string, any>): Promise<any> {
    return axios.post('/admin/goods', data)
}

export function updateGoods(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/goods/${id}`, data)
}

export function changeGoodsStatus(ids: number | number[], status: number): Promise<any> {
    return axios.post('/admin/goods/changestatus', { ids, status })
}

export function deleteGoods(ids: number | number[]): Promise<any> {
    return axios.post('/admin/goods/delete_all', {
        ids: Array.isArray(ids) ? ids : [ids]
    })
}

export function restoreGoods(ids: number | number[]): Promise<any> {
    return axios.post('/admin/goods/restore', {
        ids: Array.isArray(ids) ? ids : [ids]
    })
}

export function destroyGoods(ids: number | number[]): Promise<any> {
    return axios.post('/admin/goods/destroy', {
        ids: Array.isArray(ids) ? ids : [ids]
    })
}

export function checkGoods(id: number, ischeck: number): Promise<any> {
    return axios.post(`/admin/goods/${id}/check`, { ischeck })
}

export function updateGoodsBanners(id: number, banners: any[]): Promise<any> {
    return axios.post(`/admin/goods/banners/${id}`, { banners })
}

export function readGoods(id: number): Promise<any> {
    return axios.get(`/admin/goods/read/${id}`)
}