import axios from '~/axios'

export function login(username: string, password: string): Promise<any> {
    return axios.post("/admin/login", {
        username,
        password
    })
}

export function getInfo(): Promise<any> {
    return axios.post('/admin/getinfo')
}

export function logout(): Promise<any> {
    return axios.post('/admin/logout')
}

export function updatePassword(data: Record<string, any>): Promise<any> {
    return axios.post('/admin/updatepassword', data)
}

export function getManagerList(page: number, query: Record<string, any> = {}): Promise<any> {
    let q: string[] = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join('&')
    r = r ? '?' + r : ''
    return axios.get(`/admin/manager/${page}${r}`)
}

export function updateManagerStatus(id: number, status: number): Promise<any> {
    return axios.post(`/admin/manager/${id}/update_status`, { status })
}

export function createManager(data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/manager`, data)
}

export function updateManager(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/manager/${id}`, data)
}

export function deleteManager(id: number): Promise<any> {
    return axios.post(`/admin/manager/${id}/delete`)
}