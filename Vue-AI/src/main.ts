import './assets/main.css' // 引入自定义 CSS
import './assets/global.css';  // 引入全局样式

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

// 创建一个Vue应用实例
const app = createApp(App)
const pinia = createPinia()


app.use(pinia);

app.use(ElementPlus)
app.use(router)

// 挂载Vue应用到DOM元素上
app.mount('#app')