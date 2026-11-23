import { createStore, type Store } from 'vuex'
import { login, getInfo } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth'
import type { InjectionKey } from 'vue'

export interface State {
  user: Record<string, any>
  asideWidth: string
  menus: any[]
  ruleNames: string[]
}

export const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
    state() {
        return {
            //用户信息
            user: { },
            //侧边栏宽度
            asideWidth: '250px',
            
            menus:[],
            ruleNames:[],
        }
    },
    mutations: {
        //记录用户信息
        SET_USERINFO(state: State, user: Record<string, any>) {
            state.user = user
        },
        //切换侧边栏宽度
        handleAsideWidth(state: State){
            state.asideWidth = state.asideWidth === '250px' ? '64px' : '250px'
        },
        SET_MENUS(state: State, menus: any[]){
            state.menus = menus
        },
        SET_RULENAMES(state: State, ruleNames: string[]){
            state.ruleNames = ruleNames
        },
    },
    actions: {
        //登录
        login({ commit }, { username, password }: { username: string; password: string }) {
            return new Promise<any>((resolve, reject) => {
                login(username, password).then((res: any) => {
                    setToken(res.token)
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        },
        //获取用户信息
        getinfo({ commit }) {
            return new Promise<any>((resolve, reject) => {
                getInfo().then((res: any) => {
                    commit('SET_USERINFO', res)
                    commit('SET_MENUS',res.menus)
                    commit('SET_RULENAMES',res.ruleNames)
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        },
        //退出登录
        logout({commit}) {
            //移除cookie里的token
            removeToken()

            //清除当前用户状态 vuex
            commit('SET_USERINFO',{})
        }
    }
})

export default store