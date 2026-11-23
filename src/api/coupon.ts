import axios from '~/axios'

export function getCouponList(page = 1, params: Record<string, any> = {}): Promise<any> {
  return axios.get(`/admin/coupon/${page}`, { params })
}

export function createCoupon(data: Record<string, any>): Promise<any> {
  return axios.post('/admin/coupon', data)
}

export function updateCoupon(id: number, data: Record<string, any>): Promise<any> {
  return axios.post(`/admin/coupon/${id}`, data)
}

export function deleteCoupon(id: number): Promise<any> {
  return axios.post(`/admin/coupon/${id}/delete`)
}

export function updateCouponStatus(id: number, status: number): Promise<any> {
  return axios.post(`/admin/coupon/${id}/update_status`, { status })
}