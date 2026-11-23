import axios from '~/axios'

export function getSysConfig(): Promise<any> {
    return axios.get('/admin/sysconfig')
}

export function updateSysConfig(data: Record<string, any> = {}): Promise<any> {
    return axios.post('/admin/sysconfig', data)
}

export function uploadSysConfigFile(file: File): Promise<any> {
    const fd = new FormData()
    fd.append('file', file)
    return axios.post('/admin/sysconfig/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}