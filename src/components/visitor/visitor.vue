<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div class="left">
          <span class="free">{{ user.isInsure == 1 ? '医保' : '自费' }}</span>
          <span class="name">{{ user.name }}</span>
        </div>
        <div class="btn">
          <el-button v-if="$route.path == '/user/patient'" @click="handler" type="primary" :icon="Edit" circle />
          <el-popover trigger="click" :visible="visible" placement="top" :width="160">
            <p style="display: flex;align-items: center;"><el-icon style="margin-right: 5PX;"><Warning /></el-icon>是否确认删除?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="visible = false">取消</el-button>
              <el-button size="small" type="primary" @click="confirm">确认</el-button>
            </div>
            <template #reference>
              <el-button  @click="showConfirm" v-if="$route.path == '/user/patient'" type="danger" :icon="Delete" circle />
            </template>
          </el-popover>
        </div>
      </div>
    </template>
    <div class="bottom">
      <div class="text item">证件类型:{{ user.param?.certificatesTypeString }}</div>
      <div class="text item">证件号码:{{ user.certificatesNo }}</div>
      <div class="text item">用户性别:{{ user.sex == 0 ? "女生" : "男士" }}</div>
      <div class="text item">出生日期：{{ user.birthdate }}</div>
      <div class="text item">手机号码：{{ user.phone }}</div>
      <div class="text item">婚姻状况:{{ user.isMarry == 0 ? "未婚" : "已婚" }}</div>
      <div class="text item">当前住址{{ user.param?.cityString }}</div>
      <div class="text item">详细地址：{{ user.param?.fullAddress }}</div>
      <!-- 红色已选择的盒子 -->
      <div class="confirm" v-if="props.index == props.currentIndex">已选择</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Edit,Delete,Warning } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue';
import { reqDeleteUser } from '@/api/user/index.ts'
import { ElMessage } from 'element-plus';

let $route = useRoute()
// 控制确认删除页面的显示与隐藏
let visible = ref<boolean>(false)

// 接受父组件传来的信息
let props = defineProps(['user','currentIndex','index'])
let $emit = defineEmits(['changePage','removeUser'])

// 点击修改按钮的回调
const handler = () => {
  $emit('changePage',props.user)
}

// 点击删除按钮后的回调
const showConfirm = () => {
  visible.value = true
}

// 点击确认删除按钮的回调
const confirm = async () => {
  visible.value = false
  try {
    await reqDeleteUser(props.user.id)
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    $emit('removeUser')
  } catch (error) {
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}
</script>

<style scoped lang="scss">
.box-card{
  box-shadow: 0 0 12 rgba(0, 0, 0, 0.12);
  .card-header{
    background-color: #e5e5e5;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left{
      .free{
        background-color: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 10px;
      }
      .name{
        color: #7f7f7f;
      }
    }
  }
  .bottom{
    .item{
      line-height: 40px;
    }
    .confirm{
      position: absolute;
      width: 200px;
      height: 200px;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 200px;
      opacity: 0.5;
      font-weight: 900;
      margin-top: -300px;
      margin-left: 25px;
    }
  }
}
</style>