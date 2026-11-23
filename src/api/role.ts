import axios from '~/axios'

export function getRoleList(page: number): Promise<any> {
    return axios.get(`/admin/role/${page}`)
}

export function createRole(data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/role`, data)
}

export function updateRole(id: number, data: Record<string, any>): Promise<any> {
    return axios.post(`/admin/role/${id}`, data)
}

export function deleteRole(id: number): Promise<any> {
    return axios.post(`/admin/role/${id}/delete`)
}

export function updateRuleStatus(id: number, status: number): Promise<any> {
    return axios.post(`/admin/role/${id}/update_status`, { status })
}

export function setRoleRules(id: number, rule_ids: number[]): Promise<any> {
    return axios.post('/admin/role/set_rules', { id, rule_ids })
}