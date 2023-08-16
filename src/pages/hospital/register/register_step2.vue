<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 展示就诊人信息 -->
    <el-card class="box-card">
    <!-- 就诊人头部 -->
    <template #header>
      <div class="card-header">
        <span>选择就诊人</span>
        <el-button @click="goUser" type="primary" size="default" class="button">
        <el-icon><User /></el-icon>
        添加就诊人
        </el-button>
      </div>
    </template>
    <!-- 就诊人身体 -->
    <div class="user">
      <Visitor class="item"
      v-for="(user,index) in userArr"
      :key="user.id"
      :user="user"
      @click="changeIndex(index)"
      :currentIndex="currentIndex"
      :index="index"></Visitor>
    </div>
  </el-card>
  <!-- 展示医生信息 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号信息</span>
      </div>
    </template>
    <el-descriptions
    class="margin-top"
    :column="2"
    border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊日期:
        </div>
      </template>
      {{ doctorInfo.workDate }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊医院:
        </div>
      </template>
      {{ doctorInfo.param?.hosname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          就诊科室:
        </div>
      </template>
      {{ doctorInfo.param?.depname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生姓名:
        </div>
      </template>
      {{ doctorInfo.docname }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生职称:
        </div>
      </template>
      {{ doctorInfo.title }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生专长:
        </div>
      </template>
      {{ doctorInfo.skill }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          医生服务费:
        </div>
      </template>
      <span style="color: red;">{{ doctorInfo.amount }}</span>
    </el-descriptions-item>
  </el-descriptions>

  </el-card>
  <!-- 确认挂号按钮 -->
  <div class="btn">
    <el-button type="primary" size="default" :disabled="currentIndex == -1 ? true : false" @click="submitOrder">确认挂号</el-button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
// 引入就诊人信息
import { reqGetUser,reqDoctorInfo } from '@/api/hospital/index.ts'
import type { UserResponseData,UserArr,DoctorResponseData } from '@/api/hospital/type.ts'
import { ref,onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { reqSubmitOrder } from '@/api/user/index.ts'
import { ElMessage } from 'element-plus';

// 存储全部就诊人信息
let userArr = ref<UserArr>([])
// 获取路由对象
let $route = useRoute()
// 获取路由器对象
let $router = useRouter()
// 存储医生信息
let doctorInfo = ref<any>({})
// 存储用户确定就诊人的索引值
let currentIndex = ref<number>(-1)

onMounted(()=>{
  // 获取就诊人信息
  fetchUserData()
  // 获取医生信息
  fetchDoctor()
})

// 获取就诊人信息
const fetchUserData = async () => {
  let result:UserResponseData = await reqGetUser()
  if(result.code==200){
    userArr.value = result.data
  }
}

// 获取医生信息
const fetchDoctor = async () => {
  let result:DoctorResponseData = await reqDoctorInfo($route.query.docid as string)
  if(result.code == 200){
    doctorInfo.value = result.data
  }
}

// 点击就诊人后的回调
const changeIndex = (index:number) => {
  currentIndex.value = index
}

// 确认挂号按钮的回调
const submitOrder = async () => {
  let hoscode = doctorInfo.value.hoscode
  let scheduledId = doctorInfo.value.id
  let patientId = userArr.value[currentIndex.value].id
  let result:DoctorResponseData = await reqSubmitOrder(hoscode,scheduledId,patientId)
  if(result.code == 200){
    $router.push({path:'/user/order',query:{orderId:result.data}})
  }else{
    ElMessage({
      type:'error',
      message: result.message
    })
  }
}

// 预约挂号添加就诊人按钮的回调
const goUser = () => {
  $router.push({path:'/user/patient',query:{type:'add'}})
}
</script>

<style lang="scss" scoped>
.container{
  .tip{
    font-weight: 900;
    font-size: 20px;
  }
  .box-card{
    margin: 20px 0px;
    .user{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 32%;
        margin: 5px;
      }
    }
    .cell-item{
      width: 100px;
    }
  }
  .card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn{
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
}
</style>