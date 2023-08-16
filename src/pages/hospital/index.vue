<template>
  <div class="hospital">
    <!-- 左侧菜单区 -->
    <div class="menu">
      <div class="top">
        <el-icon><Menu /></el-icon>
        <span>/  医院信息</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-menu-item index="/hospital/register">
          <el-icon><Calendar /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice">
          <el-icon><Bell /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close">
          <el-icon><Warning /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
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
import {
  Document,
  Calendar,
  Search,
  Bell,
  Warning,
  Menu
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import useDetailStore from '@/store/moudules/hospitalDetail.ts'
import { onMounted } from 'vue';

// 获取当前路由信息
let $route = useRoute()
// 获取仓库对象
let detailStore = useDetailStore()

// 挂载完毕
onMounted(()=>{
  // pinia仓库发请求获取详情数据
  detailStore.getHospital($route.query.hoscode as string)
  // 获取医院详情科室的数据
  detailStore.getDepartment($route.query.hoscode as string)
})
</script>

<style lang="scss" scoped>
.hospital{
  color: #7f7f7f;
  display: flex;
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