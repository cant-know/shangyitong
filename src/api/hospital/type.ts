// 定义详情模块的ts类型
export interface ResponseData{
  code: number,
  message: string,
  ok: boolean
}

// 医院详情的ts类型
export interface HospitalDetail {
  bookingRule: BookingRule;
  hospital: Hospital;
}

interface Hospital {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro?: any;
  route: string;
  status: number;
  bookingRule?: any;
}

interface Param {
  hostypeString: string;
  fullAddress: string;
}

interface BookingRule {
  cycle: number;
  releaseTime: string;
  stopTime: string;
  quitDay: number;
  quitTime: string;
  rule: string[];
}

// 医院详情返回的数据
export interface HospitalDetailResponseData extends ResponseData{
  data: HospitalDetail
}

// 医院科室数据的ts类型
export interface Department{
  depcode: string,
  depname: string,
  children: Department[]
}

// 代表存储科室的数组类型
export type DepartmentArr = Department[]

// 科室返回的数据类型
export interface DepartmentResponseData extends ResponseData{
  data: DepartmentArr
}

// 用户登录接口需要携带参数的类型
export interface LoginData{
  phone: string
  code: string
}

// 登录接口返回用户信息的类型
export interface UserInfo{
  name: string
  token: string
}

// 登录接口返回数据的类型
export interface UserLoginResponseData extends ResponseData{
  data: UserInfo
}

// 定义微信扫码登录返回参数的类型
export interface WxLogin{
  redirectUri: string;
  appid: string;
  scope: string;
  state: string;
}

export interface WxLoginResponseData extends ResponseData{
  data: WxLogin;
}

// 预约挂号的ts类型
export interface HospitalWorkResponseData extends ResponseData {
  data: Data;
}

export interface Data {
  total: number;
  bookingScheduleList: BookingScheduleList[];
  baseMap: BaseMap;
}

export interface BaseMap {
  workDateString: string;
  releaseTime: string;
  bigname: string;
  stopTime: string;
  depname: string;
  hosname: string;
}

// 排班数据的ts类型
export interface DoctorResponseData extends ResponseData {
  data: Doctor[];
}

export interface Doctor {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

interface Param {
  dayOfWeek: string;
  depname: string;
  hosname: string;
}

//代表的是一个就诊人数据ts类型
export interface User {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
      "certificatesTypeString": string,
      "contactsCertificatesTypeString": string,
      "cityString": null,
      "fullAddress": string,
      "districtString": null,
      "provinceString": null
  },
  "userId": number,
  "name": number,
  "certificatesType": string,
  "certificatesNo": string,
  "sex": number,
  "birthdate": string,
  "phone": string,
  "isMarry": number,
  "provinceCode": null,
  "cityCode": null,
  "districtCode": null,
  "address": string,
  "contactsName": string,
  "contactsCertificatesType": string,
  "contactsCertificatesNo": string,
  "contactsPhone": string,
  "isInsure": number,
  "cardNo": null,
  "status": string
}
export type UserArr = User[];
export interface UserResponseData extends ResponseData {
  data: UserArr
}