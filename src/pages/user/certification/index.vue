<template>
  <div>
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
    <!-- 实名认证结构的提示 -->
    <div class="tip">
      <el-icon><InfoFilled /></el-icon>
      请先完成实名认证，以便不影响后续操作
    </div>
    <!-- 认证成功的结构 -->
    <div v-if="userInfo.authStatus">
      <el-descriptions
        style="margin: 20px auto;"
        class="margin-top"
        :column="1"
        size="small"
        border
      >
        <el-descriptions-item label-align="center" width="20px">
          <template #label>
            <div class="cell-item">
              用户姓名
            </div>
          </template>
          {{ userInfo.name }}
        </el-descriptions-item>
        <el-descriptions-item label-align="center" width="20px">
          <template #label>
            <div class="cell-item">
              证件类型
            </div>
          </template>
          {{ userInfo.certificatesType == 10 ? '身份证' : '户口本' }}
        </el-descriptions-item>
        <el-descriptions-item label-align="center" width="20px">
          <template #label>
            <div class="cell-item">
              证件号码
            </div>
          </template>
          {{ userInfo.certificatesNo }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 未认证的结构 -->
  <el-form ref="form" :rules="rules" :model="formData" label-width="80px" style="width: 60%;margin: 20px auto;" v-else>
    <el-form-item label="用户姓名" prop="name">
      <el-input placeholder="请输入用户姓名" v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="证件类型" prop="certificatesType">
      <el-select style="width: 100%;" placeholder="请选择证件类型" v-model="formData.certificatesType">
        <el-option :label="item.name" :value="item.value" v-for="(item,index) in typeArr" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="证件号码" prop="certificatesNo">
      <el-input placeholder="请输入证件号码" v-model="formData.certificatesNo"></el-input>
    </el-form-item>
    <el-form-item label="上传证件" prop="certificatesUrl">
      <el-upload
      action="/api/oss/file/fileUpload?fileHost=userAuah"
      :limit="1"
      :on-exceed="exceedHandler"
      :on-success="successHandler"
      v-model:file-list="fileList"
      list-type="picture-card"
      :on-preview="previewHandler"
      :on-remove="handleRemove"
      ref="upload"
  >
  <img style="width: 100%;height: 80%;" src="../../../assets/images/auth_example.png" alt="">
  </el-upload>

  <el-dialog v-model="showDialog">
    <img w-full style="width: 100%;height: 100%;" :src="formData.certificatesUrl" alt="Preview Image" />
  </el-dialog>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="submit">提交</el-button>
      <el-button type="primary" size="default" @click="reset">重写</el-button>
    </el-form-item>
  </el-form>
  </el-card>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { reqUserInfo,reqCertification,reqUserCertification } from '@/api/user/index.ts'
import type { CertificatesTypeResponseData,CertificatesType } from '@/api/user/type.ts'
import { onMounted,reactive,ref } from 'vue';
import { ElMessage } from 'element-plus';

// 存储用户信息
let userInfo = ref<any>({})
// 存储证件类型
let typeArr = ref<CertificatesType[]>([])
// 控制对话框显示与隐藏
let showDialog = ref<boolean>(false)
// upload元素
let upload = ref()
// 表单元素
let form = ref()
// 存储表单数据
let formData = reactive({
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})

onMounted(()=>{
  // 获取用户信息
  getUserInfo()
  // 获取证件类型
  getCertificateType()
})

const validatorName = (rule: any, value: any, callback: any) => {
  let reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/
  if(reg.test(value)){
    callback()
  }else{
    callback(new Error('请输入中文名字'))
  }
}

const validatorNo = (rule: any, value: any, callback: any) => {
  let regSfz = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  let regHkb = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if(regSfz.test(value) || regHkb.test(value)){
    callback()
  }else{
    callback(new Error('请输入正确的身份证或户口本号码'))
  }
}

const getUserInfo = async () => {
  let result:any = await reqUserInfo()
  if(result.code == 200){
    userInfo.value = result.data
  }
}

// 获取证件类型
const getCertificateType = async () => {
  let result:CertificatesTypeResponseData = await reqCertification('CertificatesType')
  if(result.code==200){
    typeArr.value = result.data
  }
}

// 上传证件时超过最大数量触发
const exceedHandler = () => {
  ElMessage({
    type:'error',
    message:'只能上传一张照片'
  })
}

// 上传证件成功的回调
const successHandler = (response: any) => {
  // 清除表单校验信息
  form.value.clearValidate('certificatesUrl')
  formData.certificatesUrl = response.data
}

// 点击上传证件预览的回调
const previewHandler = () => {
  showDialog.value = true
}

// 删除上传证件图片的回调
const handleRemove = () => {
  formData.certificatesUrl = ''
}

// 点击重写后的回调
const reset = () => {
  formData.certificatesNo = ''
  formData.certificatesType = ''
  formData.certificatesUrl = ''
  formData.name = ''
  // 清除已上传证件照片
  upload.value.clearFiles()
}

// 点击提交按钮后的回调
const submit = async () => {
  // 触发全部表单校验，全部通过返回成功的promise，不通过不继续执行
  await form.value.validate()
  try {
    await reqUserCertification(formData)
    ElMessage({
      type:'success',
      message:'认证成功'
    })
    // 获取用户信息
    getUserInfo()
  } catch (error) {
    ElMessage({
      type:'error',
      message:'认证失败'
    })
  }
}

// 表单校验规则
const rules = {
  name:[{required:true,validator:validatorName}],
  certificatesType:[{required:true,message:'证件类型为必选项'}],
  certificatesNo:[{required:true,validator:validatorNo}],
  certificatesUrl:[{required:true,message:'必须上传证件照'}]
}
</script>

<style scoped lang="scss">
.box-card{
  .tip{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>