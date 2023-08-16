// 引入路由器
import router from "./router";
// 引入进度条
import Nprogress from 'nprogress'
// 引入·进度条的样式
import 'nprogress/nprogress.css'
import useUserStore from "./store/moudules/user";
import { createPinia } from "pinia";

const userStore = useUserStore(createPinia())
// 用户未登录时可访问的路由
let whiteList = ['/home','/hospital/register','/hospital/detail','/hospital/notice','/hospital/close','/hospital/search']

// 全局前置守卫
router.beforeEach((to,from,next) => {
  Nprogress.start()
  let token = userStore.userInfo.token
  if(token){
    next()
  }else{
    if(whiteList.includes(to.path)){
      next()
    }else{
      userStore.visible = false
      next({path:'/home'})
    }
  }
})

// 后置守卫
router.afterEach((to,from) => {

})
