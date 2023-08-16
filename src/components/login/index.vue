<template>
  <div class="container">
    <!-- v-model控制显示对话框，title是左上角标题 -->
    <el-dialog v-model="userStore.visible" title="用户登录" @close="close">
      <!-- 对话框身体部分结构 -->
      <el-row>
        <!-- 左侧结构，手机号码和微信 -->
        <el-col :span="12" class="login">
          <!-- 手机登录的结构 -->
          <div v-show="scene==0">
            <el-form :model="phoneParams" :rules="rules" ref="form">
                <el-form-item :label-width="1" prop="phone">
                    <el-input autocomplete="off" placeholder="请输入手机号码" :prefix-icon="User" v-model="phoneParams.phone"/>
                </el-form-item>
                <el-form-item :label-width="1" prop="code">
                    <el-input autocomplete="off" placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="phoneParams.code"/>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="!isPhone || flag ? true : false" @click="getCode">
                      <Countdown v-if="flag" :flag="flag" @getFlag="getFlag"></Countdown>
                      <span v-else>获取验证码</span>
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="bottom">
              <el-button type="primary" style="width: 90%;" size="default" :disabled="!isPhone || phoneParams.code.length<6" @click="login">用户登录</el-button>
              <p @click="changeLogin">微信扫码登录</p>
            </div>
          </div>
          <!-- 微信扫码登录的结构 -->
          <div class="wechatLogin" v-show="scene==1">
            <div id="login_container"></div>
            <p @click="phoneLogin">手机短信验证码登录</p>
          </div>
        </el-col>
        <!-- 右侧结构 -->
        <el-col :span="12">
          <div class="loginRight">
            <div class="top">
              <div class="item">
                <img src="../../assets/images/code_login_wechat.png" alt="图片加载失败">
                <p>微信扫一扫关注</p>
                <p>"快速预约挂号"</p>
              </div>
              <div class="item">
                <img src="../../assets/images/code_app.png" alt="图片加载失败">
                <p>扫一扫下载</p>
                <p>预约挂号app</p>
              </div>
            </div>
            <p class="tip">尚医通官方指定平台</p>
            <p class="tip">快速挂号 安全放心</p>
          </div>
        </el-col>
      </el-row>
      <!-- 底部结构 -->
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
      </span>
    </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 获取仓库中visible
import useUserStore from "@/store/moudules/user.ts";
import { User,Lock } from '@element-plus/icons-vue';
import { ref,reactive,computed,watch } from "vue";
import { ElMessage } from "element-plus";
import type { WxLoginResponseData } from '@/api/hospital/type.ts'
// 引入倒计时组件
import Countdown from '../../components/countdown/index.vue'
// 引入微信扫码登录参数请求
import { reqWxLogin } from '@/api/hospital/index.ts'

// 定义响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false) //flag为真展示倒计时组件
let userStore = useUserStore()
let scene = ref<number>(0) //0代表手机号码登录，1代表微信扫码登录
// 收集表单实例
let form = ref<any>()
// 收集用户输入进来的手机号
let phoneParams = reactive({
  phone: '', //收集手机号码
  code: '', //收集验证码
})

// 自定义手机号码校验规则
const validatorPhone = (rule:any,value:any,callback:any) => {
  // rule即为表单校验对象，value即为当前文本内容，callback为回调函数
  const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  if(reg.test(value)){
    callback()
  }else{
    callback(new Error("请输入正确的手机号码格式"))
  }
}

// 自定义验证码校验规则
const validatorCode = (rule:any,value:any,callback:any) => {
  if(value.length==6){
    callback()
  }else{
    new Error("请输入正确的验证码格式")
  }
}

// 表单校验的规则
const rules = {
  // 手机号码的校验
  phone:[
    // message:代表错误提示信息
    // trigger:代表表单校验触发时机 change文本变化 blur失去焦点
    {required:true,message:'手机号码必须为11位',trigger:'blur',validator:validatorPhone}
  ],
  code:[
    {required:true,message:'验证码必须为6位',trigger:'blur',validator:validatorCode}
  ]
}

// 计算出当前表单元素收集的内容是否是手机号码格式
let isPhone = computed(()=>{
  // 手机号码正则表达式
  const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  // 返回布尔值，是真为手机号码
  return reg.test(phoneParams.phone)
})

// 切换手机登录和扫码登录
const changeLogin = async () => {
  scene.value = 1
  // 发请求获取微信扫码登录页面的参数，需要携带一个参数通知服务器用户授权成功以后，重定向到项目某一个页面
  let redirect_URL = encodeURIComponent(window.location.origin) 
  let result:WxLoginResponseData = await reqWxLogin(redirect_URL)
  // 微信扫码登录的二维码页面
  var obj = new WxLogin({
  self_redirect:true, // true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
  id:"login_container", // 二维码容器设置
  appid: result.data.appid, // 应用唯一标识
  scope: "snsapi_login", //代表微信扫码登录页面已授权
  redirect_uri: result.data.redirectUri, // 用户授权后，微信服务器向后端发送code地址
  state: result.data.state, // 微信扫码成功后重定向到哪个页面
  style: "black", // 二维码外观
  });
}

// 点击获取验证码后的回调
const getCode = async () => {
  // 展示倒计时组件
  flag.value = true
  // 通知pinia仓库存储验证码
  try {
    // 获取验证码成功
    await userStore.getCode(phoneParams.phone)
    phoneParams.code = userStore.code
  } catch (error) {
    // 获取验证码失败
    ElMessage({
      type: 'error',
      message: (error as Error).message
    })
  }
}

// 接受子组件传来的参数
const getFlag = (val:boolean) => {
  // 倒计时模式结束
  flag.value = val
}

// 点击用户登录按钮的回调
const login = () => {
  // 发送登录请求
 try {
  // 用户登录成功
  userStore.userLogin(phoneParams)
  // 关闭对话框
  userStore.visible = false
 } catch (error) {
  // 用户登录失败
  ElMessage({
    type: 'error',
    message: (error as Error).message
  })
 }
}

// dialog关闭时的回调
const close = () => {
  // 清空收集的数据
  phoneParams.phone = ''
  phoneParams.code = ''
  // 移除上次表单校验的结果
  form.value.resetFields()
}

// 关闭窗口按钮的回调
const closeDialog = () => {
  userStore.visible = false
  close()
}

// 点击手机验证码登录的回调
const phoneLogin = () => {
  // 展示手机验证码登录组件
  scene.value = 0
}

// 监听场景数值
watch(()=>scene.value,(val:number)=>{
  if(val == 1){
    userStore.queryState()
  }
})
</script>

<style lang="scss" scoped>
.container{
  ::v-deep(.el-dialog__body){
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .login{
      padding: 20px;
      border: 1px solid #ccc;
    }
    .bottom{
      display: flex;
      flex-direction: column;
      align-items: center;
      p{
        margin-top: 20px;
        cursor: pointer;
      }
    }
    .loginRight{
      .top{
        display: flex;
        justify-content: space-around;
        .item{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 130px;
            height: 130px;
          }
          p{
            margin: 10px 0px;
          }
        }
      }
      .tip{
      text-align: center;
      margin: 20px 0px;
      font-size: 20px;
      font-weight: 900;
      }
    }
    .wechatLogin{
      display: flex;
      flex-direction: column;
      align-items: center;
      p{
        cursor: pointer;
      }
    }

  }
}
</style>