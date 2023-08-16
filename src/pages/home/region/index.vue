<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul>
        <li :class="{active:regionLight==''}" @click="clickRegion('')">全部</li>
        <li v-for="(item,index) in regionArr" :key="item.value" @click="clickRegion(item.value)" :class="{active:regionLight==item.value}">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from '@/api/home/type.ts'
import { reqHospitalLevelAndRegion } from '@/api/home/index.ts'
import { onMounted,ref } from 'vue';

// 存储地区的数据
let regionArr = ref<HospitalLevelAndRegionArr>([])
// 存储地区高亮的响应式数据
let regionLight = ref<string>('')

onMounted(()=>{
  getRegion()
})

// 获取地区的数据
const getRegion = async () => {
  let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin')
  if(result.code == 200){
    regionArr.value = result.data
  }
}

// 点击地区按钮的回调
const clickRegion = (region:string) => {
  regionLight.value = region
  // 触发自定义事件：将医院地区参数传给父组件
  $emit('getRegion',regionLight.value)
}

// 自定义事件
let $emit = defineEmits(['getRegion'])
</script>

<style lang="scss" scoped>
.region{
  color: #7f7f7f;
  margin-top: 10px;
  .content{
    display:flex;
    .left{
      margin-right:10px;
      width:48px;
    }
    ul{
      display:flex;
      flex-wrap:wrap;
      li{
        cursor: pointer;
        margin-right:10px;
        margin-bottom:10px;
          &.active{
            color: #55a6fe;
        }
      }
      li:hover{
        color: #55a6fe;
      }
    }
  }
}
</style>