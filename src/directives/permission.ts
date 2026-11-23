//自定义组件
import store from '~/store'
import type { App, DirectiveBinding } from 'vue'

function hasPermission(value: string[], el: HTMLElement | false = false): boolean {
    if (!Array.isArray(value)) {
        throw new Error(`需要配置权限，例如 v-permission="['getStatistics3, GET']"`)
    }
    const hasAuth = value.findIndex(v => store.state.ruleNames.includes(v)) !== -1
    if (el && !hasAuth) {
        el.parentNode && el.parentNode.removeChild(el)
    }

    return hasAuth
}

export default {
    install(app: App) {
        app.directive('permission', {
            mounted(el: HTMLElement, binding: DirectiveBinding) {
                hasPermission(binding.value, el)
            }
        })
    }
}