export interface ResponseData{
  code: number,
  message: string,
  ok: boolean
}

// 提交订单接口返回的ts类型
export interface SubmitOrderResponseData extends ResponseData{
  data: number
}

// 订单详情数据的ts类型
export interface OrderInfo {
  id : number,
  createTime : string,
  updateTime : string,
  isDeleted : number,
  param : {
      orderStatusString : string
  },
  userId : number,
  outTradeNo : string,
  hoscode : string,
  hosname : string,
  depcode : string,
  depname : string,
  scheduleId : string,
  title : string,
  reserveDate : string,
  reserveTime : number,
  patientId : number,
  patientName : string,
  patientPhone : string,
  hosRecordId : string,
  number : number,
  fetchTime : string,
  fetchAddress : string,
  amount : number,
  quitTime : string,
  orderStatus : number
}

//定义订单接口返回的数据ts类型
export interface OrderResponseData extends ResponseData {
  data: OrderInfo
}

// 获取二维码接口返回的ts类型
export interface PayInfo{
  codeUrl?: any;
  orderId: number;
  totalFee: number;
  resultCode: string;
}

export interface QrCodeResponseData extends ResponseData{
  data:PayInfo
}

// 查询订单支付状态的ts类型
export interface PayStatusResponseData extends ResponseData{
  data:boolean
}

// 证件类型的ts类型
export interface CertificatesType {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}

interface Param {
}

// 获取证件类型接口返回的数据类型
export interface CertificatesTypeResponseData extends ResponseData{
  data: CertificatesType[]
}

// 用户认证携带参数的ts类型
export interface UserParams{
   certificatesNo : string,
   certificatesType : string,
   certificatesUrl : string,
   name : string
}

// 订单的ts类型
export interface Order {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId?: any;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}

interface Param {
  orderStatusString: string;
}

// 获取订单信息接口返回的类型
export interface UserOrderResponseData extends ResponseData {
  data:temp
}

interface temp{
  records: Order[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  hitCount: boolean;
  searchCount: boolean;
  pages: number;
}

//代表就诊人ts类型
export interface User {
  id : number,
  createTime : string,
  updateTime : string,
  isDeleted : number,
  param : {
      certificatesTypeString : string,
      contactsCertificatesTypeString : string,
      cityString : null,
      fullAddress : string,
      districtString : null,
      provinceString : null
},
  userId : number,
  name : string,
  certificatesType : string,
  certificatesNo : string,
  sex : number,
  birthdate : string,
  phone : string,
  isMarry : number,
  provinceCode : null,
  cityCode : null,
  districtCode : null,
  address : string,
  contactsName : string,
  contactsCertificatesType : string,
  contactsCertificatesNo : string,
  contactsPhone : string,
  isInsure : number,
  cardNo : null,
  status : string
}
//全部就诊人的数据ts类型
export type AllUser = User[];

//获取全部就诊人的ts类型
export interface AllUserResponseData extends ResponseData {
  data: AllUser
}

//订单状态ts类型
export interface OrderState {
  comment: string,
  status: number
}

export type AllOrderState = OrderState[];

//全部订单状态码接口返回的数据ts类型
export interface AllOrderStateResponseData extends ResponseData {
  data: AllOrderState
}

// 新增或修改就诊人信息的参数的ts类型
export interface PatientInfo{
  id?: string,
  name: string,
  certificatesType: string,
  certificatesNo:string,
  sex:number,
  birthdate:string,
  phone:string,
  isMarry:number,
  isInsure:number,
  addressSelected:string[],
  address:string,
  contactsName:string,
  contactsCertificatesType:string,
  contactsCertificatesNo:string,
  contactsPhone:string
}