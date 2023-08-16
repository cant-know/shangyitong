<template>
  <div class="register">
    <div class="top">
      <div class="left">
        {{ detailStore.hospitalInfo.hospital?.hosname }}
      </div>
      <div class="right">
        <el-icon><Star /></el-icon>
        <span>{{ detailStore.hospitalInfo.hospital?.param.hostypeString }}</span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${detailStore.hospitalInfo.hospital?.logoData}`" alt="">
      </div>
      <div class="right">
        <div class="rule">挂号规则</div>
        <div class="time">预约周期:{{ detailStore.hospitalInfo.bookingRule?.cycle }}天 放号时间:{{ detailStore.hospitalInfo.bookingRule?.releaseTime }} 停挂时间:{{ detailStore.hospitalInfo.bookingRule?.stopTime }}</div>
        <div class="address">具体位置:{{ detailStore.hospitalInfo.hospital?.param.fullAddress }}</div>
        <div class="route">规划路线:{{ detailStore.hospitalInfo.hospital?.route }}</div>
        <div class="quit">退号时间:就诊前一工作日{{ detailStore.hospitalInfo.bookingRule?.quitTime }}前取消</div>
        <div class="book">预约挂号规则:</div>
        <div class="bookInfo" v-for="(item,index) in detailStore.hospitalInfo.bookingRule?.rule" :key="index">{{ item }}</div>
      </div>
    </div>
    <div class="department">
      <div class="left">
          <ul>
            <li @click="changeActive(index)" :class="{active:index == departmentActive}" v-for="(item,index) in detailStore.department" :key="item.depcode">{{ item.depname }}</li>
          </ul>
      </div>
      <div class="right">
        <!-- 每个div代表一个大科室和小科室 -->
        <div class="menu" v-for="(item) in detailStore.department" :key="item.depcode">
          <h1 class="cur" @click="goLogin">{{ item.depname }}</h1>
          <!-- 小科室 -->
          <ul>
            <li v-for="(little) in item.children" :key="little.depcode" @click="goLogin(little)">{{ little.depname }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Star } from '@element-plus/icons-vue'
// 引入详情页仓库
import useDetailStore from '@/store/moudules/hospitalDetail.ts'
import { useRouter,useRoute } from 'vue-router'
// import useUserStore from '@/store/moudules/user';

// 获取路由器
let $router = useRouter()
let $route = useRoute()
// 控制科室高亮的响应式数据
let departmentActive = ref<number>(0)

let detailStore = useDetailStore()
// let userStore = useUserStore()

// 科室列表点击事件的回调
const changeActive = (index:number) => {
  departmentActive.value = index
  // 点击导航获取大科室的h1标题
  let allH1 = document.querySelectorAll('.cur')
  // 滚动到对应科室的位置
  allH1[departmentActive.value].scrollIntoView({
    // 过渡动画效果
    behavior: 'smooth'
  })
}

// 点击小科室后的回调函数
const goLogin = (little:any) => {
  // 跳转到登录页
  // userStore.visible = true
  // 跳转到挂号详情页
  $router.push({path:'/hospital/register_step1',query:{hoscode:$route.query.hoscode,depcode:little.depcode}})
}
</script>

<style lang="scss" scoped>
.register{
  .top{
    display: flex;
    .left{
      color: black;
      font-size: 30px;
      font-weight: 900;
    }
    .right{
      color: #7f7f7f;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      span{
        margin-left: 5px;
      }
    }
  }
  .content{
    display: flex;
    .left{
      width: 80px;
      margin-top: 20px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right{
      margin-left: 20px;
      font-size: 14px;
      .time,.address,.route,.quit{
        margin-top: 10px;
      }
      .rule{
        color: black;
      }
    }
    .book{
      margin: 10px 0px;
      color: black;
    }
    .bookInfo{
      margin-top: 10px;
    }
  }
  .department{
    width: 100%;
    height: 500px;
    display: flex;
    .left{
      width: 80px;
      height: 100%;
      ul{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: rgb(248, 248, 248);
        li{
          cursor: pointer;
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 40px;
          &.active{
            color: #55a6fe;
            background-color: white;
            border-left: 1px solid red;
          }
        }
      }
    }
    .right{
      overflow: auto;
      height: 100%;
      flex: 1;
      margin-left: 20px;
      &::-webkit-scrollbar{
        display: none;
      }
      .menu{
        background-color: rgb(248, 248, 248);
        cursor: pointer;
        ul{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li{
            width: 33%;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>