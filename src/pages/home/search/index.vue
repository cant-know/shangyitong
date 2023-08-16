<template>
  <div class="search">
    <el-autocomplete
        clearable
        placeholder="来点正常内容吧"
        v-model="hosname"
        :fetch-suggestions="fetchData"
        :trigger-on-focus="false"
        @select="goDetail"
      />
      <el-button type= "primary" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
// 引入element-plus的图标库
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue';
// 引入请求方法
import { reqHospitalInfo } from '@/api/home/index.ts'
import type { HospitalInfo } from '@/api/home/type.ts'
import { useRouter } from 'vue-router';

// 创建路由器对象
let $router = useRouter()

// 存储搜索的关键字
let hosname = ref<string>('')

// 顶部组件的回调
const fetchData = async (keyword:string,cb:any) => {
  // 当用户输入关键字后执行
  const result:HospitalInfo = await reqHospitalInfo(keyword)
  // 整理数据，符合组件格式
  let showData = result.data.map((item)=>{
    return {
      value: item.hosname, //存储医院名字
      hoscode: item.hoscode //存储医院编码
    }
  })
  // 给组件提供展示的数据
  cb(showData)

}

// 点击某一个推荐项
const goDetail = (item:any) => {
  // 点击推荐项进入医院详情页
  $router.push({path:'/hospital/register',query:{hoscode:item.hoscode}})
}
</script>

<style lang="scss" scoped>
.search{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  // 深度选择器
  ::v-deep(.el-input__wrapper){
    width: 600px;
    margin-right: 10px;
  }
}
</style>