import axios from '~/axios'

export function getImageList(id: number, page = 1): Promise<any> {
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}

export function updateImage(id: number, name: string): Promise<any> {
    return axios.post(`/admin/image/${id}`, { name })
}

export function deleteImage(ids: number[]): Promise<any> {
    return axios.post('/admin/image/delete_all', { ids })
}

export const uploadImageAction = '/api/admin/image/upload'