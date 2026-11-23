/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'nprogress' {
  interface NProgress {
    start: () => void
    done: () => void
  }
  const nprogress: NProgress
  export default nprogress
}

declare module 'vue'{
  export interface GlobalProperties {
    vPermission: string[]
  }
}

declare module 'virtual:windi.css' {}