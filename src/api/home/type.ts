// 定义首页模块ts数据类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 定义已有医院ts数据类型
export interface Hospital {
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
  bookingRule: BookingRule;
}

interface BookingRule {
  cycle: number;
  releaseTime: string;
  stopTime: string;
  quitDay: number;
  quitTime: string;
  rule: string[];
}

interface Param {
  hostypeString: string;
  fullAddress: string;
}

// 存储全部已有医院的数组类型
export type Content = Hospital[]

// 获取已有医院接口返回的数据类型
export interface HospitalResponseData extends ResponseData {
  data:{
    content: Content;
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    sort: Sort;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  }
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
}

// 医院等级或地区的ts类型
export interface HospitalLevelAndRegion {
    id: number;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: Param;
    parentId: number;
    name: string;
    value: string;
    dictCode?: any;
    hasChildren: boolean;
}
  
interface Param {
}

export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[]

// 获取医院等级获地区接口返回的数据类型
export interface HospitalLevelAndRegionResponseData extends ResponseData{
  data:HospitalLevelAndRegionArr
}

export interface HospitalInfo extends ResponseData{
  data:Content
}