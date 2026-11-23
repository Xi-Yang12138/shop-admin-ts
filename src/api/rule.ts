import axios from '~/axios'

export function getRuleList(): Promise<any> {
    return axios.get('/admin/rule/1')
}

export function createRule(data: Record<string, any>): Promise<any> {
    return axios.post('/admin/rule', data)
}

export function updateRule(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/rule/${id}`, data)
}

export function updateRuleStatus(id: number, status: number): Promise<any> {
    return axios.post(`/admin/rule/${id}/update_status`, { status })
}

export function deleteRule(id: number): Promise<any> {
    return axios.post(`/admin/rule/${id}/delete`)
}