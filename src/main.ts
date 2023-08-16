import { createApp } from 'vue'
import App from './App.vue'
// 清除默认样式
import '@/style/reset.scss'
// 引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
// 引入vue-router核心插件并安装
import router from '@/router/index.ts'
// 引入elment-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入pinia仓库
import pinia from '@/store/index.ts'
// 引入就诊人组件
import Visitor from '@/components/visitor/visitor.vue'
// 引入路由鉴权的文件
import './permission.ts'

// 使用createApp方法创建应用实例
const app = createApp(App)

// 注册全局组件
app.component('HospitalTop',HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.component('Login',Login)
app.component('Visitor',Visitor)

// 安装vue-router
app.use(router)
// 安装element-plus插件 element-plus国际化
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装pinia仓库
app.use(pinia)

// 挂载
app.mount('#app')

