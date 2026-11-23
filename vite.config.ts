import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import { fileURLToPath } from 'url'
import vueDevTools from 'vite-plugin-vue-devtools'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  define:{
    __VUE_OPTIONS_API__: false,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, 'src')
    }
  },

  server:{
    proxy:{
      '/api':{
        target:"http://ceshi13.dishait.cn",
        changeOrigin:true,
        rewrite:(path: string) => path.replace(/^\/api/,"")
      },
    }
  },

  plugins: [
    vue(),
    WindiCSS(),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          echarts: ['echarts'],
          vue: ['vue', 'vue-router', 'vuex'],
          axios: ['axios'],
          'vueuse': ['@vueuse/core', '@vueuse/integrations'],
        },
      },
    },
  },

})