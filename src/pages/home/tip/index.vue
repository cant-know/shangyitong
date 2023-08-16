<template>
  <div class="tip">
    <!-- 常见科室的结构 -->
    <div class="department">
      <div class="header">
        <div class="left">
          <el-icon><House /></el-icon>
          <span>常见科室</span>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>神经内科</li>
          <li>消化内科</li>
          <li>呼吸内科</li>
          <li>内科</li>
          <li>神经外科</li>
          <li>妇科</li>
          <li>产科</li>
          <li>儿科</li>
        </ul>
      </div>
    </div>
    <!-- 平台公告 -->
    <div class="notice">
      <div class="header">
        <div class="left">
        <el-icon><Bell /></el-icon>
        <span>平台公告</span>
      </div>
      <div class="right">
        <span>全部</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
      </div>
      <div class="content">
        <ul>
          <li>关于延长北京大学国际医院放假的通知</li>
          <li>北京中医药大学东方医院部分科室医生门诊医</li>
          <li>武警总医院号源暂停更新通知</li>
        </ul>
      </div>
    </div>
    <!-- 停诊公告 -->
    <div class="notice">
      <div class="header">
        <div class="left">
        <el-icon><Warning /></el-icon>
        <span>停诊公告</span>
      </div>
      <div class="right">
        <span>全部</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
      </div>
      <div class="content">
        <ul>
          <li>公告那么长</li>
          <li>打字累死了</li>
          <li>谁爱写谁写</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { House,ArrowRight,Bell,Warning } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.tip{
  color: #7f7f7f;
.department{
  .header{
    display:flex;
    justify-content: space-between;
    .left{
      display: flex;
      align-items: center;
      span{
        margin-left: 5px;
      }
    }
    .right{
      display: flex;
      align-items: center;
    }
  }
  .content{
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        width: 40%;
        margin-top: 20px;
      }
    }
  }
}
.notice{
  .header{
    display:flex;
    justify-content: space-between;
    margin-top: 20px;
    .left{
      display: flex;
      align-items: center;
      span{
        margin-left: 5px;
      }
    }
    .right{
      display: flex;
      align-items: center;
    }
  }
  .content{
    ul{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      li{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
}
</style>