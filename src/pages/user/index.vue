<template>
  <div class="user">
    <!-- 左侧菜单区 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/  会员中心</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-menu-item index="/user/certification">
          <el-icon><Postcard /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order">
          <el-icon><Memo /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient">
          <el-icon><User /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile">
          <el-icon><Document /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback">
          <el-icon><ChatDotRound /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu></div>
    <!-- 右侧路由组件展示区 -->
    <div class="content">
      <!-- 子组件展示区 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled,Postcard,Memo,User,Document,ChatDotRound } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.user{
  color: #7f7f7f;
  display: flex;
  .top{
    font-weight: 500;
    color: black;
  }
  .menu{
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content{
    flex: 8;
  }
}
</style>