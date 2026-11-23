import axios from '~/axios'

export function getImageClassList(page: number): Promise<any> {
    return axios.get('/admin/image_class/' + page)
}

export function createImageClass(data: Record<string, any>): Promise<any> {
    return axios.post('/admin/image_class', data)
}

export function updateImageClass(id: number, data: Record<string, any>): Promise<any> {
    return axios.post('/admin/image_class/' + id, data)
}

export function deleteImageClass(id: number): Promise<any> {
    return axios.post(`/admin/image_class/${id}/delete`)
}