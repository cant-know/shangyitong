<template>
  <div>
    <!-- 首页轮播图结构 -->
    <Carousel></Carousel>
    <!-- 首页搜索医院的表单区 -->
    <Search></Search>
    <!-- 底部展示医院的结构 -->  
    <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel"></Level>
        <!-- 地区 -->
        <Region @getRegion="getRegion"></Region>
        <!-- 展示医院的结构 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card class="item" v-for="(item,index) in hasHospitalArr" :key="item.id" :hospitalInfo="item"></Card>
        </div>
        <el-empty v-else description="啥玩意儿都没有" />
        <!-- 分页器 -->
        <div class="demo-pagination-block">
            <el-pagination
              v-model:current-page="pageNo"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 30, 40]"
              :background="true"
              layout="prev, pager, next, jumper, sizes, total"
              :total="total"
              @size-change="sizeChange"
              @current-change="currentChange"
            />
        </div>
      </el-col>
      <el-col :span="4">
        <Tip></Tip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入组合式api
import { ref,onMounted } from 'vue'
import { reqHospital } from '@/api/home/index.ts'
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'
import type { Content,HospitalResponseData } from '@/api/home/type.ts'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'

// 分页器页码
let pageNo = ref<Number>(1)
// 一页展示的数据
let pageSize = ref<Number>(10)
// 存储已有医院的数据
let hasHospitalArr = ref<Content>([])
// 存储已有医院的总个数
let total = ref<number>(0)
// 存储医院等级的响应式数据
let hostype = ref<string>('')
// 存储医院地区的响应式数据
let districtCode = ref<string>('')
// 获取路由对象
let $route = useRoute()
let route = JSON.stringify($route.query).length

if(route != 2){
  localStorage.setItem('userInfo',JSON.stringify($route.query))
}

// 组件挂载完毕
onMounted(()=>{
  getHospitalInfo()
})

// 获取已有医院的数据
const getHospitalInfo = async ()=>{
  let result:HospitalResponseData = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value)
  if(result.code == 200){
    // 存储已有医院的数据
    hasHospitalArr.value = result.data.content
    // 存储已有的总个数
    total.value = result.data.totalElements
  }
}

// 分页器页码发生变化时的回调
const currentChange = () => {
  getHospitalInfo()
}

// 分页器下拉菜单发生变化时触发
const sizeChange = () => {
  getHospitalInfo()
}

// 子组件自定义事件：获取子组件传来的等级数据
const getLevel = (level:string) => {
  hostype.value = level
  // 存储参数后再次发送请求
  getHospitalInfo()
}

// 子组件自定义事件：获取子组件传来的地区数据
const getRegion = (region:string) => {
  districtCode.value = region
  // 存储参数后再次发送请求
  getHospitalInfo()
}
</script>

<style lang="scss" scoped>
.hospital{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
    width: 48%;
    margin: 10px 0;
  }
}
</style>