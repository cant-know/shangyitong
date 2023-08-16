<template>
  <div>
    获取验证码({{ time }})
  </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue'

// 倒计时的事件
let time = ref<number>(5)
// 接受父组件传来的参数
let flag = defineProps(['flag'])

// 监听父组件传来参数
watch(()=>flag,()=>{
  // 开启定时器
  let timer = setInterval(()=>{
    time.value --
    if(time.value==0){
      // 清除定时器
      clearInterval(timer)
      $emit('getFlag',false)
    }
  },1000)
},{
  immediate: true
})

// 向父组件传参数
let $emit = defineEmits(['getFlag'])
</script>

<style lang="scss" scoped>

</style>