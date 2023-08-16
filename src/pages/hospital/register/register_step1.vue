<template>
  <div class="wrap">
    <div class="top">
      <div class="hosname">
        {{ workData.baseMap?.hosname }}
      </div>
      <div class="line">|</div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">.</div>
      <div class="hosdepartment">{{ workData.baseMap?.depname }}</div>
    </div>
    <div class="center">
      <h1>{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div :class="{active: item.status == -1 || item.availableNumber == -1,cur: item.workDate == workTime.workDate}"
          class="item"
          v-for="(item,index) in workData.bookingScheduleList"
          :key="index"
          @click="changeTime(item)">
          <div class="top1">{{ item.workDate }} {{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status == -1">无号</div>
            <div v-if="item.status == 0">{{ (item.availableNumber == -1) ? '约满了' : `有号（${item.availableNumber}）` }}</div>
            <div v-if="item.status == 1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination v-model:current-page="pageNo" layout="prev, pager, next" :total="workData.total" @current-change="fetchWorkData" />
    </div>
    <div class="bottom">
      <!-- 即将放号的结构 -->
      <div v-if="workTime.status == 1" class="will">
        <span class="time">2023年6月3日8:30</span>
        <span class="text">放号</span>
      </div>
      <!-- 医生的结构 -->
      <div v-else-if="workTime.status == 0" class="doctor">
        <!-- 上午号源 -->
        <div class="morning">
          <div class="tip">
            <el-icon><Sunny /></el-icon>
            <span>上午号源</span>
          </div>
          <div class="doctorInfo" v-for="(doctor) in morningArr" :key="doctor.id">
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="money">{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor)">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <!-- 下午号源 -->
        <div class="morning">
          <div class="tip">
            <el-icon><Sunrise /></el-icon>
            <span>下午号源</span>
          </div>
          <div class="doctorInfo" v-for="(doctor) in afternoonArr" :key="doctor.id">
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <div class="right">
              <div class="money">{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor)">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,ref,computed } from "vue";
import { reqHospitalWork,reqHospitalDoctor } from '@/api/hospital/index.ts'
import { useRoute,useRouter } from "vue-router";
import type { HospitalWorkResponseData,DoctorResponseData,Doctor } from '@/api/hospital/type.ts'
import { Sunny,Sunrise } from '@element-plus/icons-vue'

// 分页器当前页码
let pageNo = ref<number>(1)
// 最大展示数量
let limit = ref<number>(6)
// 获取路由对象
let $route = useRoute()
// 获取路由器对象
let $router = useRouter()
// 存储挂号数据
let workData = ref<any>({})
// 存储排班日期:第一天
let workTime = ref<any>({})
// 存储排班医生的数据
let doctorArr = ref<Doctor[]>([])

onMounted(()=>{
  fetchWorkData()
})

// 获取挂号数据
const fetchWorkData = async () => {
  let result:HospitalWorkResponseData = await reqHospitalWork(pageNo.value,limit.value,$route.query.hoscode,$route.query.depcode)
  if(result.code == 200){
    workData.value = result.data
    // 获取第一天数据
    workTime.value = workData.value.bookingScheduleList[0]
    // 获取一次医生的数据
    getDoctorWorkData()
  }
}

// 获取医生某天排班的数据
const getDoctorWorkData = async () => {
  let hoscode:string = $route.query.hoscode as string
  let depcode:string = $route.query.depcode as string
  let workDate:string = workTime.value.workDate
  let result:DoctorResponseData = await reqHospitalDoctor(hoscode,depcode,workDate)
  if(result.code == 200){
    doctorArr.value = result.data
  }
}

// 点击顶部某一天时触发的回调
const changeTime = (item:any) => {
  // 存储用户选择的那一天的数据
  workTime.value = item
  // 再发一次请求获取医生排班数据
  getDoctorWorkData()
}

// 计算出上午排班的医生的数据
let morningArr = computed(() => {
  return doctorArr.value.filter((doc:Doctor)=>{
    return doc.workTime == 0
  })
})

// 计算出下午排班的医生的数据
let afternoonArr = computed(() => {
  return doctorArr.value.filter((doc:Doctor)=>{
    return doc.workTime == 1
  })
})

// 跳转到挂号页面2
let goStep2 = (doctor:Doctor) => {
  // 编程式导航进行路由跳转，携带id
  $router.push({path:'/hospital/register_step2',query:{docid: doctor.id}})
}
</script>

<style lang="scss" scoped>
.wrap{
  .top{
    display: flex;
    color: #7f7f7f;
    .line{
      width: 3px;
      height: 100%;
      margin: 0px 5px;
      color: skyblue;
    }
    .dot{
      margin: 0px 5px;
      color: skyblue;
    }
  }
  .center{
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 900;
    .container{
      width: 100%;
      display: flex;
      margin: 60px 0px;
      .item{
        transition: .5s all;
        cursor: pointer;
        flex: 1;
        border: 1px solid skyblue;
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &.cur{
          transform: scale(1.1);
        }
        &.active{
        border: 1px solid #ccc;
        color: #7f7f7f;
          .top1{
            background-color: #ccc; 
          }
        }
        .top1{
          background-color: #e8f2ff;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
        }
        .bottom{
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
  .bottom{
    .will{
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      .time{
        color: red;
      }
      .text{
        color: skyblue;
      }
    }
    .doctor{
      .morning{
        .tip{
          display: flex;
          align-items: center;
          span{
            font-weight: 900;
          }
        }
        .doctorInfo{
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;
          .left{
            display: flex;
            flex-direction: column;
            margin: 10px 0px;
            .info{
              color: skyblue;
              margin: 0px 5px;
              font-size: 18px;
              font-weight: 900;
            }
            .skill{
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }
          .right{
            display: flex;
            align-items: center;
            width: 150px;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>