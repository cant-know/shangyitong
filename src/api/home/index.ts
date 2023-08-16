// 统一管理首页模块接口
import request from "@/utils/request";
import type { HospitalResponseData,HospitalLevelAndRegionResponseData,HospitalInfo } from './type.ts'
// 通过枚举管理首页模块的接口地址
enum API{
  // 获取已有医院数据的接口地址
  HOSPITAL_URL= '/hosp/hospital/',
  // 获取医院等级或地区
  HOSPITALLEVELANDREGION_URL='/cmn/dict/findByDictCode/',
  // 根据医院的关键字获取数据
  HOSPITALINFO_URL='/hosp/hospital/findByHosname/'
}

// 获取医院的数据
export const reqHospital = (page:number,limit:number,hostype='',districtCode='') => request.get<HospitalResponseData>(API.HOSPITAL_URL+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
// 获取医院等级或地区
export const reqHospitalLevelAndRegion = (dictCode:string) => request.get<HospitalLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL+`${dictCode}`)
// 根据医院关键字获取数据
export const reqHospitalInfo = (hosname:string) => request.get<HospitalInfo>(API.HOSPITALINFO_URL+`${hosname}`)