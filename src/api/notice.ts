import axios from '~/axios'

export function getNoticeList(page: number): Promise<any> {
    return axios.get(`/admin/notice/${page}`)
}

export function createNotice(data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/notice`, data)
}

export function updateNotice(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/notice/${id}`, data)
}

export function deleteNotice(id: number): Promise<any> {
    return axios.post(`/admin/notice/${id}/delete`)
}