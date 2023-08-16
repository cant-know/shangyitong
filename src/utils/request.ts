// axios二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { userInfo } from 'os'
import useUserStore from '../store/moudules/user'

// 使用create方法创建axios实例
const request = axios.create({
  // 基准路径
  baseURL: '/api',
  // 超时的设置
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config)=>{
  // 获取用户仓库
  let userStore = useUserStore()
  // 如果用户登录了，发请求时携带token
  if(userStore.userInfo.token){
    config.headers.token = userStore.userInfo.token
  }
  // 请求拦截器配置对象
  return config
})

// 响应拦截器
request.interceptors.response.use((response)=>{
  // 响应拦截器成功的回调
  return response.data
},(error)=>{
  // 处理http错误
  let status = error.response?.status
  switch (status) {
    case 404:
      // 错误提示信息
      ElMessage({
        type: 'error',
        message: '请求路径出现问题'
        }
      )
      break;
    case 500|501|502|503|504|505:
      ElMessage({
        type: 'error',
        message: '服务器出现问题'
      })
      break;
    case 401:
      ElMessage({
        type: 'error',
        message: '携带参数有误'
      })
  }
  return Promise.reject(new Error(error.message))
})

// 对外暴露
export default request