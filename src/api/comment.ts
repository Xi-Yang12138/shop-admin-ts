import axios from '~/axios'

export function getGoodsCommentList(page = 1, params: Record<string, any> = {}): Promise<any> {
    return axios.get(`/admin/goods_comment/${page}`, {
        params: {
            title: params.title || undefined,
            limit: params.limit || 10,
        }
    })
}

export function updateGoodsCommentStatus(id: number, status: number): Promise<any> {
    return axios.post(`/admin/goods_comment/${id}/update_status`, { status })
}

export function reviewGoodsComment(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/goods_comment/review/${id}`, data)
}