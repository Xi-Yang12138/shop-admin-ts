import { useCookies } from '@vueuse/integrations/useCookies'

const TokenKey = 'admin-token'
const cookie = useCookies()

//获取token
export function getToken(): string | undefined {
    return cookie.get(TokenKey)
}

//设置token
export function setToken(token: string): void {
    cookie.set(TokenKey, token)
}

//删除token
export function removeToken(): void {
    cookie.remove(TokenKey)
}