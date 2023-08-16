<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片头部 -->
    <template #header>
      <div class="detail">
        挂号详情
      </div>
    </template>
    <div class="top">
      <el-tag class="ml-2" type="success">
        <div class="tag">
          <el-icon><Check /></el-icon>
          <span>{{ orderInfo.param?.orderStatusString }}</span>
        </div>
      </el-tag>
      <div class="right">
        <img src="../../../../assets/images/code_app.png" alt="图片加载失败">
        <span>微信关注“我是无敌大王”</span>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <!-- 左侧展示订单详情信息 -->
        <el-descriptions
          class="margin-top"
          :column="1"
          border
        >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊人信息
              </div>
            </template>
            {{ orderInfo.patientName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊日期
              </div>
            </template>
            {{ orderInfo.reserveDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊医院
              </div>
            </template>
            {{ orderInfo.hosname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                就诊科室
              </div>
            </template>
            {{ orderInfo.depname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                医生职称
              </div>
            </template>
            {{ orderInfo.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                医生服务费
              </div>
            </template>
            <span style="color: red;">{{ orderInfo.amount }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                挂号单号
              </div>
            </template>
            {{ orderInfo.outTradeNo }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                挂号时间
              </div>
            </template>
            {{ orderInfo.createTime }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="btn" v-if="orderInfo.orderStatus==0||orderInfo.orderStatus==1">
          <el-popconfirm title="确定取消预约吗?" @confirm="cancel">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>
          <el-button type="primary" size="default" v-if="orderInfo.orderStatus==0" @click="openDialog">支付</el-button>
        </div>
      </div>
      <!-- 右侧结构 -->
      <div class="right">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>注意事项</span>
            </div>
          </template>
          <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
            <p style="color: red">
              2.【取号】就诊当天需在{{ orderInfo.fetchTime }}前
              在医院取号，未取号视为爽约，该号不退不换；
            </p>
            <p>
              3.【退号】在{{ orderInfo.quitTime }}前可在线退号 ，逾期将不可办理退号退费；
            </p>
            <p>
              4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
            </p>
            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
        </el-card>
      </div>
    </div>
  </el-card>
  <!-- 展示支付二维码的结构 -->
  <el-dialog @close="close" width="400px" v-model="dialogVisible" title="微信支付">
    <div class="qrcode">
      <img :src="imgUrl" alt="">
      <p>请使用微信扫一扫</p>
      <p>扫描二维码支付</p>
    </div>
    <template #footer>
      <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue';
import { onMounted,ref } from 'vue';
import { reqOrderDetail,reqCancelOrder,reqQrCode,reqPayStatus } from '@/api/user/index.ts'
import { useRoute } from 'vue-router';
import type { OrderResponseData,QrCodeResponseData,PayStatusResponseData } from '@/api/user/type.ts'
// 引入二维码
import QRCode from 'qrcode'
import { ElMessage } from 'element-plus';

let $route = useRoute()
// 存储订单详情的数据
let orderInfo = ref<any>({})
// 控制对话框显示与隐藏的数据
let dialogVisible = ref<boolean>(false)
// 存储二维码图片的路径
let imgUrl = ref<string>('')
// 存储定时器的数据
let timer = ref<any>()

onMounted( async ()=>{
  getOrderDetail()
  let result:QrCodeResponseData = await reqQrCode($route.query.orderId as string)
  // 根据服务器返回的二维码信息生成二维码
  imgUrl.value = await QRCode.toDataURL(result.data.codeUrl)
  // 询问支付状态
    timer.value = setInterval(async ()=>{
    let result:PayStatusResponseData = await reqPayStatus($route.query.orderId as string)
    if(result.data){
      dialogVisible.value = false
      ElMessage({
        type:'success',
        message:'支付成功'
      })
      clearInterval(timer.value)
      // 支付成功后再次获取订单详情
      getOrderDetail()
    }
  },2000)
})

// 获取订单详情
const getOrderDetail = async () => {
  let result:OrderResponseData = await reqOrderDetail($route.query.orderId as string)
  if(result.code==200){
    orderInfo.value = result.data
  }
}

// 取消订单 订单状态有三种：orderStatus是-1代表取消预约，0是预约未支付，1是预约已支付
const cancel = async () => {
  try {
  await reqCancelOrder($route.query.orderId as string)
  getOrderDetail()
  } catch (error:any) {
    ElMessage({
      type: 'error',
      message: error.message
    })
  }
}

// 点击支付按钮后的回调
const openDialog = () => {
  dialogVisible.value = true
}

// 点击关闭窗口后的回调
const closeDialog = () => {
  dialogVisible.value = false
  clearInterval(timer.value)
}

// 点击支付页面右上角叉号的回调
const close = () => {
  clearInterval(timer.value)
}
</script>

<style scoped lang="scss">
.box-card{
  .detail{
    color: #7f7f7f;
    font-weight: 900;
  }
  .top{
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .tag{
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        margin-left: 5px;
      }
    }
    display: flex;
    justify-content: space-between;
    .right{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 40px;
        height: 40px;
      }
      span{
        font-size: 14px;
      }
    }
  }
  .bottom{
    display: flex;
    margin-top: 20px;
    .left{
      flex: 4;
      .btn{
        margin: 10px 0px;
        .confirm{
          display: flex;
          align-items: center;
        }
      }
    }
    .right{
      margin-left: 20px;
      flex: 6;
      p{
        line-height: 30px;
      }
    }
  }
}

::v-deep(.el-dialog__body){
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}

.qrcode{
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    line-height: 30px;
  };
}
</style>