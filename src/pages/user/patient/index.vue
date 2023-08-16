<template>
  <div class="patient">
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button class="button" type="primary" @click="addUser">
          <el-icon><User /></el-icon>
          添加就诊人
        </el-button>
      </div>
    </template>
    <div class="visitor" v-if="showCard">
      <Visitor @removeUser="removeUser" @changePage="changePage" class="item" v-for="(item,index) in userArr" :key="item.id" :user="item" :index="index"></Visitor>
    </div>
    <!-- 添加就诊人或者修改就诊人信息的结构 -->
    <div class="form" v-else>
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%;margin: 10px auto">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select label="请选择证件类型" style="width: 100%"  v-model="userParams.certificatesType">
            <el-option label="身份证"></el-option>
            <el-option label="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"  v-model="userParams.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userParams.sex" class="ml-4">
            <el-radio label="1" size="large">男</el-radio>
            <el-radio label="2" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="userParams.birthdate"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请选择一个日期"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入用户手机号码" v-model="userParams.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">建档信息</el-divider>
      <el-form style="width: 60%;margin: 10px auto">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userParams.isMarry" class="ml-4">
            <el-radio label="1" size="large">已婚</el-radio>
            <el-radio label="2" size="large">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userParams.isInsure" class="ml-4">
            <el-radio label="1" size="large">自费</el-radio>
            <el-radio label="2" size="large">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前的住址">
          <el-cascader :props="props" v-model="userParams.addressSelected" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            placeholder="请你输入用户详细地址"
            v-model="userParams.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">联系人信息(选填)</el-divider>
      <el-form style="width: 60%;margin: 10px auto" label-width="70px">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名" v-model="userParams.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select label="请选择证件类型" style="width: 100%"  v-model="userParams.contactsCertificatesType">
            <el-option label="身份证"></el-option>
            <el-option label="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"  v-model="userParams.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入用户手机号码"  v-model="userParams.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="submit">提交</el-button>
          <el-button type="primary" size="default" @click="reset">重写</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type CascaderProps } from 'element-plus'
import { User } from '@element-plus/icons-vue'
import { ref,onMounted, reactive } from 'vue'
import { reqGetUser } from '@/api/hospital/index.ts'
import type { UserResponseData,UserArr } from '@/api/hospital/type.ts'
import { reqCity,reqAddOrUpdateUser } from '@/api/user/index.ts'
import type { PatientInfo } from '@/api/user/type.ts'
import { useRoute,useRouter } from 'vue-router'

// 存储全部就诊人信息
let userArr = ref<UserArr>([])
// 决定卡片身体部分展示的内容
let showCard = ref<number>(1)
// 创建路由对象
let $route = useRoute()
// 创建路由器对象
let $router = useRouter()
// 收集新增就诊人的数据
let userParams = reactive<PatientInfo>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
})

onMounted(()=>{
  if($route.query.type == 'add'){
    showCard.value = 0
  }
  fetchUserData()
})

// 获取就诊人信息
const fetchUserData = async () => {
  let result:UserResponseData = await reqGetUser()
  if(result.code==200){
    userArr.value = result.data
  }
}

// 添加就诊人按钮的回调
const addUser = () => {
  // 清空上一次填写的数据
  reset()
  showCard.value = 0
}

// 子组件自定义事件的回调
const changePage = (user:PatientInfo) => {
  showCard.value = 0
  Object.assign(userParams,user)
  fetchUserData()
}

// 子组件自定义事件的回调
const removeUser = () => {
  showCard.value = 1
  fetchUserData()
}

// 级联选择器数据
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve){
    let result:any = await reqCity(node.data?.id as ''||'86')
    // 
    let showData = result.data.map((item:any) => {
      return {
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren
      }
    })
    resolve(showData)
  }
}

// 新增或修改就诊人
const submit = async () => {
  try {
    console.log(userParams)
    await reqAddOrUpdateUser(userParams)
    ElMessage({
      type:'success',
      message:userParams.id ? '修改成功' : '添加成功'
    })
    // 判断是否点击了预约挂号的添加就诊人按钮
    if($route.query.type){
      $router.back()
    }
    showCard.value = 1
    // 再次获取就诊人信息
    fetchUserData()
  } catch (error) {
    throw new Error(error.message)
  }
}

// 清空添加就诊人页面的数据
const reset = () => {
  Object.assign(userParams,{
    id: null,
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  })
}
</script>

<style scoped lang="scss">
.patient{
  .box-card{
    .card-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .visitor{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 32%;
        margin: 5px;
      }
    }
  }
}
</style>