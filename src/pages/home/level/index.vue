<template>
  <div class="level">
    <h1>医院</h1>
    <div class="container">
      <div class="left">等级：</div>
      <ul>
        <li :class="{active:levelLight == ''}" @click="clickLevel('')">全部</li>
        <li v-for="(item) in levelArr" :key="item.value" :class="{active:levelLight==item.value}" @click="clickLevel(item.value)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from '@/api/home/type.ts'
import { reqHospitalLevelAndRegion } from '@/api/home/index.ts'
import { onMounted,ref } from 'vue';

// 定义存储医院等级的数组
let levelArr = ref<HospitalLevelAndRegionArr>([])
// 控制医院等级高亮响应式数据
let levelLight = ref<string>('')

// 组件挂载完毕
onMounted(()=>{
  getLevel()
})

// 获取医院等级的数据
const getLevel = async () => {
  const result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType')
  if(result.code == 200){
    levelArr.value = result.data
  }
}

// 点击等级按钮的回调
const clickLevel = (level:string) => {
  levelLight.value = level
  // 触发自定义事件：将医院等级参数传给父组件
  $emit('getLevel',levelLight.value)
}

// 自定义事件
let $emit = defineEmits(['getLevel'])
</script>

<style lang="scss" scoped>
.level{
  color: #7f7f7f;
  h1{
    font-weight: 900;
    margin: 10px 0;
  }
  .container{
    display: flex;
    .left{
      margin-right: 10px;
    }
    ul{
      display: flex;
      li{
        cursor: pointer;
        margin-right: 10px;
        &.active{
        color: #55a6fe;
      }
      }

    }
  }
}
</style>