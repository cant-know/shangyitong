import type { DepartmentArr, HospitalDetail,UserInfo } from '@/api/hospital/type.ts'

// 详情仓库内部state的ts类型
export interface DetailState {
  hospitalInfo: HospitalDetail
  department: DepartmentArr
}

// 用户仓库内部state的ts类型
export interface UserState{
  visible: boolean //控制login组件中dialog展示与隐藏
  code: string //存储用户验证码
  userInfo: UserInfo //存储用户登录后的信息
}