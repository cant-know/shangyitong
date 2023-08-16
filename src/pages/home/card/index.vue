<template>
  <el-card class="box-card" shadow="hover" @click="goDetail">
    <div class="content">
      <div class="left">
        <div class="hospital">{{ hospitalInfo.hosname }}</div>
        <div class="tip">
          <div class="level">
            <el-icon class="icon"><FirstAidKit /></el-icon>
            {{ hospitalInfo.param.hostypeString }}
          </div>
          <div class="time">
            <el-icon class="icon"><AlarmClock /></el-icon>
            每天{{ hospitalInfo.bookingRule.releaseTime }}放号
          </div>
        </div>
      </div>
      <div class="right">
        <img :src= "`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt="图片加载失败"/>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// 引入element-plus的图标库
import { FirstAidKit,AlarmClock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

// 创建路由器对象
let $router = useRouter()

// 点击卡片后跳转到详情页
const goDetail = () => {
  $router.push({path:'/hospital/register',query:{hoscode:props.hospitalInfo.hoscode}})
}

// 接受父组件传来的参数
let props = defineProps(['hospitalInfo'])
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  justify-content: space-between;
  .left{
    width: 60%;
    .tip{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      color: #7f7f7f;
      .icon{
        margin-right: 5px;
      }
      .level{
        display: flex;
        align-items: center;
      }
      .time{
        display: flex;
        align-items: center;
      }
    }
  }
  .right{
    img{
      width: 50px;
      height: 50px;
    }
  }
}
</style>