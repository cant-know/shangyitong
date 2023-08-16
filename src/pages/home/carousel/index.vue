<template>
  <div>
    <el-carousel height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../../assets/images/web-banner-1.png" alt="图片加载失败">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
img{
  width: 100%;
  height: 350px;
}
</style>