import { defineStore } from 'pinia'
import { reqHospitalDetail,reqHospitalDepartment } from '@/api/hospital/index.ts'
import type { HospitalDetailResponseData,HospitalDetail,DepartmentResponseData } from '@/api/hospital/type.ts'
import type { DetailState } from './interface/index.ts'

const useDetailStore = defineStore('Detail',{
  state:():DetailState => {
    return {
      // 医院详情的数据
      hospitalInfo:{} as HospitalDetail,
      // 存储医院科室的数据
      department:[]
    }
  },
  actions:{
    // 获取医院详情的方法
    async getHospital(hoscode:string){
     let result:HospitalDetailResponseData =  await reqHospitalDetail(hoscode)
     if(result.code == 200){
      this.hospitalInfo = result.data
     }
    },

    // 获取医院详情科室的方法
    async getDepartment(hoscode:string){
      let result:DepartmentResponseData = await reqHospitalDepartment(hoscode)
      if(result.code == 200){
        this.department = result.data
      }
    }
  },
  getters:{

  }
})

// 对外暴露仓库的使用方法
export default useDetailStore