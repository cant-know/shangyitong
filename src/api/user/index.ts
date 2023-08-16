import request  from "@/utils/request";
import type { PatientInfo,AllOrderStateResponseData,AllUserResponseData,UserParams,SubmitOrderResponseData,OrderResponseData,QrCodeResponseData,CertificatesTypeResponseData,UserOrderResponseData } from './type.ts'

enum API {
  // 提交订单的接口地址
  SUBMIT_URL = '/order/orderInfo/auth/submitOrder/',
  // 获取订单详情的接口地址
  ORDERDETAIL_URL='/order/orderInfo/auth/getOrderInfo/',
  // 取消预约的接口地址
  CANCELORDER_URL='/order/orderInfo/auth/cancelOrder/',
  // 获取订单支付二维码的接口地址
  QRCODE_URL='/order/weixin/createNative/',
  // 查询支付状态的接口地址
  PAYSTATUS_URL = '/order/weixin/queryPayStatus/',
  // 获取会员信息
  USERINFO_URL = '/user/auth/getUserInfo',
  // 获取证件类型的接口地址
  CERTIFCATION_URL = '/cmn/dict/findByDictCode/',
  // 用户认证的接口地址
  USERCERTIFICATION_URL = '/user/auth/userAuah',
  // 获取用户订单信息的接口地址
  USERORDERINFO_URL = '/order/orderInfo/auth/',
  // 获取全部就诊人的接口地址
  ALLUSER_URL = '/user/patient/auth/findAll',
  // 获取订单状态的接口地址
  ORDERSTATUS_URL = '/order/orderInfo/auth/getStatusList',
  // 获取城市的接口地址
  CITY_URL = '/cmn/dict/findByParentId/',
  // 新增就诊人的接口地址
  ADDUSER_URL = '/user/patient/auth/save',
  // 更新已有就诊人的接口地址
  UPDATEUSER_URL = '/user/patient/auth/update',
  // 删除就诊人的接口地址
  DELETEUSER_URL = '/user/patient/auth/remove/'
}

// 提交订单
export const reqSubmitOrder = (hoscode:string,scheduleId:string,patient:number) => request.post<SubmitOrderResponseData>(API.SUBMIT_URL+`${hoscode}/${scheduleId}/${patient}`)
// 获取订单的方法
export const reqOrderDetail = (id:string) => request.get<OrderResponseData>(API.ORDERDETAIL_URL+`${id}`)
// 取消订单的方法
export const reqCancelOrder = (id:string) => request.get<any>(API.CANCELORDER_URL+`${id}`)
// 获取支付的二维码方法
export const reqQrCode = (orderId:string) => request.get<QrCodeResponseData>(API.QRCODE_URL+`${orderId}`)
// 查询订单支付的请求
export const reqPayStatus = (orderId:string) => request.get<any>(API.PAYSTATUS_URL+`${orderId}`)
// 获取用户信息的请求
export const reqUserInfo = () => request.get<any>(API.USERINFO_URL)
// 获取实名认证类型的请求
export const reqCertification = (dictCode:string) => request.get<CertificatesTypeResponseData>(API.CERTIFCATION_URL+`${dictCode}`)
// 提交用户认证的请求
export const reqUserCertification = (data:UserParams) => request.post<any>(API.USERCERTIFICATION_URL,data)
// 获取用户订单信息的请求
export const reqUserOrderInfo = (page:number,limit:number,patientId:string,orderStatus:string) => request.get<UserOrderResponseData>(API.USERORDERINFO_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
// 获取全部就诊人信息
export const reqAllUser = () => request.get<AllUserResponseData>(API.ALLUSER_URL)
// 获取全部订单的接口
export const reqOrderStatus = () => request.get<AllOrderStateResponseData>(API.ORDERSTATUS_URL)
// 获取城市的请求
export const reqCity = (parentId:string) => request.get<any>(API.CITY_URL + parentId)
// 新增和更新就诊人的请求
export const reqAddOrUpdateUser = (patient:PatientInfo) => {
  if(patient.id){
    request.put<any>(API.UPDATEUSER_URL,patient)
  }else{
    request.post<any>(API.ADDUSER_URL,patient)
  }
}
// 删除就诊人的请求
export const reqDeleteUser = (id:string) => request.delete(API.DELETEUSER_URL+id)