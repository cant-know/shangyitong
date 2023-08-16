<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="图片加载失败">
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="goLogin" v-if="!userStore.userInfo.name">登录/注册</p>
        <!-- 如果有用户信息，展示用户信息 -->
        <el-dropdown v-else>
    <span class="el-dropdown-link">
      {{ userStore.userInfo.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeRoute('/user/certification')">实名认证</el-dropdown-item>
        <el-dropdown-item @click="changeRoute('/user/order')">挂号订单</el-dropdown-item>
        <el-dropdown-item @click="changeRoute('/user/patient')">就诊人管理</el-dropdown-item>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
// 获取仓库中visible
import useUserStore from "@/store/moudules/user.ts";
import { ArrowDown } from '@element-plus/icons-vue'

let userStore = useUserStore() 

// 创建路由器对象
let $router = useRouter()

const goHome = () => {
  // 编程时导航跳转到首页
  $router.push({path:'/home'})
}

// 登录组件显示与隐藏
const goLogin = () =>{
  userStore.visible = true
}

// 退出登录的回调
const loginOut = () => {
  userStore.loginOut()
  // 编程式导航回到首页
  $router.push('/home')
}

// 下拉菜单点击事件的回调
const changeRoute = (route:string) => {
  $router.push({path:route})
}
</script>

<style lang="scss" scoped>
.top{
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  // background-color: #fff;
  display: flex;
  justify-content: center;
  .content{
    width: 1200px;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .left{
      cursor: pointer;
      display: flex;
      align-items: center;
      img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p{
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .right{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #bbb;
      .help{
        cursor: pointer;
        margin-right: 10px;
      }
      .login:hover{
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>