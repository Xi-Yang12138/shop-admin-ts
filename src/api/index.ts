import axios from '~/axios'

export function getStatistics1(): Promise<any> {
    return axios.get('/admin/statistics1')
}

export function getStatistics2(): Promise<any> {
    return axios.get('/admin/statistics2')
}

export function getStatistics3(type: string): Promise<any> {
    return axios.get('/admin/statistics3?type=' + type)
}