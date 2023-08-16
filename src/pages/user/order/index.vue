<template>
  <div class="order">
    <div v-if="$route.query.orderId">
      <Detail/>
    </div>
    <div v-else>
      <AllOrder></AllOrder>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Detail from './detail/index.vue'
import AllOrder from './allOrder/index.vue'

let $route = useRoute()
</script>

<style scoped>

</style>