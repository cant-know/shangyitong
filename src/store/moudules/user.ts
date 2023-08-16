// 定义用户相关的仓库
import { defineStore } from 'pinia'
import { reqUserCode,reqUserLogin } from '@/api/hospital/index.ts'
import type { LoginData,UserLoginResponseData } from '@/api/hospital/type.ts'
import { UserState } from './interface'

const useUserStore = defineStore('useUserStore', {
  state:():UserState=>{
    return {
      visible: false, //控制login组件中dialog展示与隐藏
      code: '', //存储用户验证码
      userInfo: JSON.parse(localStorage.getItem('userInfo') as string) || {}, //存储用户登录后的信息
    }
  },
  actions:{
    // 获取验证码的方法
    async getCode(phone:string){
      let result:any = await reqUserCode(phone)
      if(result.code == 200){
        this.code = result.data
        return 'ok'
      }else{
        Promise.reject(new Error(result.message))
      }
    },
    // 用户手机号码登录的方法
    async userLogin(loginParam:LoginData){
      let result:UserLoginResponseData = await reqUserLogin(loginParam)
      if(result.code == 200){
        this.userInfo = result.data
        // 本地存储持久化用户信息
        localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
        return 'ok'
      }else{
        Promise.reject(new Error(result.message))
      }
    },
    // 退出登录的方法
    loginOut(){
      // 清空仓库数据
      this.userInfo = {name:'',token:''}
      // 清空本地存储仓库
      localStorage.removeItem('userInfo')
    },
    // 看本地存储是否存储数据
    queryState(){
      // 开启定时器，每隔一段时间查看本地存储是否拥有用户信息
      let timer = setInterval(()=>{
        // 本地存储有数据
        if(localStorage.getItem('userInfo')){
          this.visible = false
          this.userInfo= JSON.parse(localStorage.getItem('userInfo') as string)
          clearInterval(timer)
        }
      },1000)
    }
  },
  getters:{

  }
})

export default useUserStore