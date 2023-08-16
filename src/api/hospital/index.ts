// 引入二次封装axios
import request from "@/utils/request";
import type { WxLoginResponseData,HospitalDetailResponseData,DepartmentResponseData,UserLoginResponseData,LoginData,HospitalWorkResponseData,DoctorResponseData,UserResponseData } from './type.ts'
// 枚举医院接口地址
enum API{
  // 获取医院详情的接口地址
  HOSPITALDETAIL_URL = '/hosp/hospital/',
  // 获取医院科室的接口地址
  HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/',
  // 获取验证码的接口地址
  USERCODE_URL = '/sms/send/',
  // 用户登录的接口地址
  USERLOGIN_URL = '/user/login',
  // 获取微信扫码登录需要参数的接口地址
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  // 获取医院科室挂号数据的接口地址
  HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
  // 获取医院某科室医生排班的接口地址
  HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
  // 获取就诊人列表
  GETUSER_URL = '/user/patient/auth/findAll',
  // 获取挂号医生的信息
  GETDOCTOR_URL = '/hosp/hospital/getSchedule/'
}

// 获取医院详情的请求
export const reqHospitalDetail = (hoscode:string) => request.get<HospitalDetailResponseData>(API.HOSPITALDETAIL_URL+`${hoscode}`)
// 获取医院科室的请求
export const reqHospitalDepartment = (hoscode:string) => request.get<DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL+`${hoscode}`)
// 获取验证码的请求
export const reqUserCode = (phone:string) => request.get<any>(API.USERCODE_URL+`${phone}`)
// 用户登录的请求
export const reqUserLogin = (data:LoginData) => request.post<UserLoginResponseData>(API.USERLOGIN_URL,data)
// 获取微信扫码登录需要参数的请求
export const reqWxLogin = (wxRedirectUri:string) => request.get<WxLoginResponseData>(API.WXLOGIN_URL+`?wxRedirectUri=${wxRedirectUri}`)
// 获取预约挂号的请求
export const reqHospitalWork = (page:number,limit:number,hoscode:string,depcode:string) => request.get<HospitalWorkResponseData>(API.HOSPITALWORK_URL+`${page}/${limit}/${hoscode}/${depcode}`)
// 获取医院某科室医生排班的请求
export const reqHospitalDoctor = (hoscode:string,depcode:string,workDate:string) => request.get<DoctorResponseData>(API.HOSPITALDOCTOR_URL+`${hoscode}/${depcode}/${workDate}`)
// 获取就诊人列表
export const reqGetUser = () => request.get<UserResponseData>(API.GETUSER_URL)
// 获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string) => request.get<DoctorResponseData>(API.GETDOCTOR_URL+`${scheduleId}`)
