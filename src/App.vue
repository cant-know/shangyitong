<script setup lang="ts">
</script>

<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop/>
    <div class="content">
      <!-- 展示路由组件 -->
      <router-view></router-view>
    </div>
    <HospitalBottom/>
    <!-- 登录组件 -->
    <Login></Login>
  </div>
</template>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  .content{
  width: 1200px;
  min-height: 700px;
  margin-top: 70px;
  }
}
</style>
