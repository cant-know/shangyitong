<template>
  <div>
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select placeholder="请选择就诊人" v-model="patientId" @change="change">
          <el-option label="请选择全部就诊人" value=""></el-option>
          <el-option :label="item.name" v-for="item in userArr" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="change">
          <el-option label="全部订单" value=""></el-option>
          <el-option v-for="(item,index) in allOrderInfo" :key="index" :label="item.comment" :value="item.status"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="allOrder" stripe style="margin: 10px 0px;">
      <el-table-column prop="reserveDate" label="就诊时间" width="180" />
      <el-table-column prop="hosname" label="医院" width="180" />
      <el-table-column prop="depname" label="科室" />
      <el-table-column prop="title" label="医生" />
      <el-table-column prop="amount" label="服务费" />
      <el-table-column prop="patientName" label="就诊人" />
      <el-table-column prop="param.orderStatusString" label="订单状态" />
      <el-table-column label="操作" type="index">
        <template #="{ row }">
          <el-button type="text" size="default" @click="goDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="handler(pageNo)"
      @size-change="selectHandler(pageSize)"
    />
  </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { reqUserOrderInfo,reqAllUser,reqOrderStatus } from '@/api/user/index.ts'
import type { UserOrderResponseData,Order,AllUser,AllUserResponseData,AllOrderStateResponseData,AllOrderState } from '@/api/user/type.ts'
import { useRouter } from 'vue-router';

// 分页器当前页码
let pageNo = ref<number>(1)
// 当前页码展示几条数据
let pageSize = ref<number>(10)
// 存储就诊人id
let patientId = ref<string>('')
// 存储订单状态
let orderStatus = ref<string>('')
// 存储全部订单
let allOrder = ref<Order[]>([])
// 存储订单总页数
let total = ref<number>(1)
// 获取路由器对象
let $router = useRouter()
// 存储全部就诊人信息
let userArr = ref<AllUser>([])
// 存储全部订单信息
let allOrderInfo = ref<AllOrderState>([])

onMounted(()=>{
  getOrderInfo()
  // 获取全部就诊人信息与订单状态
  getData()
})

// 获取订单信息的方法
const getOrderInfo = async () => {
  let result:UserOrderResponseData = await reqUserOrderInfo(pageNo.value,pageSize.value,patientId.value,orderStatus.value)
  if(result.code == 200){
    allOrder.value = result.data.records
    total.value = result.data.total
  }
}

// 点击详情的回调
const goDetail = (row:any) => {
  $router.push({path:'/user/order',query:{orderId:row.id}})
}

// 页码改变时的回调
const handler = (page:number) => {
  pageNo.value = page
  getOrderInfo()
}

// 点击下拉菜单的回调
const selectHandler = (page:number) => {
  pageSize.value = page
  getOrderInfo()
}

// 获取就诊人与订单状态的方法
const getData = async () => {
  let result:AllUserResponseData = await reqAllUser()
  let result1:AllOrderStateResponseData = await reqOrderStatus()
  userArr.value = result.data
  allOrderInfo.value = result1.data
}

// 就诊人下拉菜单的回调
const change = () => {
  getOrderInfo()
}
</script>

<style scoped>

</style>