import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'
import { fileURLToPath } from 'url'
import vueDevTools from 'vite-plugin-vue-devtools'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: '/shop-admin-ts/',
  define: {
    __VUE_OPTIONS_API__: false,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, 'src')
    }
  },

  server: {
    proxy: {
      '/api': {
        target: "http://ceshi13.dishait.cn",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, "")
      },
    }
  },

  plugins: [
    vue(),
    WindiCSS(),
  ],

  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vue',
              test: /node_modules\/(vue|vue-router|pinia)/
            },
            {
              name: 'element-plus',
              test: /node_modules\/(element-plus|@element-plus\/icons-vue)/
            },
            {
              name: 'echarts',
              test: /node_modules\/echarts/
            },
            {
              name: 'axios',
              test: /node_modules\/axios/
            },
            {
              name: 'vueuse',
              test: /node_modules\/@vueuse/
            },
            {
              name: 'vendor',
              test: /node_modules/
            }
          ]
        }
      }
    }
  },


})
