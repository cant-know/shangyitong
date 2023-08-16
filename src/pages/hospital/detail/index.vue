<template>
  <div class="detail">
    <div class="top">
      <div class="left">{{ detailStore.hospitalInfo.hospital?.hosname }}</div>
      <div class="right">
        <el-icon><Star /></el-icon>
        <span>{{ detailStore.hospitalInfo.hospital?.param.hostypeString }}</span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${detailStore.hospitalInfo.hospital?.logoData}`" alt="">
      </div>
      <div class="right">
        <el-icon><Location /></el-icon>
        <span class="address">
          具体地址:{{ detailStore.hospitalInfo.hospital?.param.fullAddress }}
        </span>
        <div class="route">规划路线:{{ detailStore.hospitalInfo.hospital?.route }}</div>
      </div>
    </div>
    <div class="footer">
      <h1>医院介绍</h1>
      <p>北京协和医院是中国协和医科大学的临床医学院，中国医
        学科学院的临床医学研究所，现任院长是赵玉沛，于2007年12月就任；特聘南方著名教授吴颂叶做为顾问。也是综合实力出众的三级甲等医院，北京协和医院拥有一批优秀的医学家、医学教育家和医学科研队伍，拥有大量可与世界接轨的先进设备，医院专科齐全，技术力量雄厚，医疗、科研、教学等方面均有相当的水平。北京协和医院与原北京邮电医院合并后分为益生路东西二院：北京协和医院东院、北京协和医院西院。
        医院建成于1921年，由洛克菲勒基金会创办。建院之初，就志在建成亚洲最好的医学中心。中央人民政府于1951年接管协和后，协和的发展建设得到历届党和国家领导人的高度重视和大力支持。近90年来，医院
        始终拥有一支以优秀的临床医学家、医学教育家和医学科学家为骨干的专业队伍，培养和造就了张孝骞、林巧稚等一代医学大师和多位中国现代医学的领军人物，也向全国输送了大批的医学管理人才，共有10余家当今知名的大型综合、专科医院是由协和人创建的。在长期发展过程中，形成了独特的文化和优良传统、“严谨、求精、勤奋、奉献”的协和精神。“教授、病案、图书馆”是著名的协和“三宝”，现代医学教育的“三基”、“三严”理念就起源于这里。
        医院学科齐全、技术力量雄厚、特色专科突出，以多学科综合优势享誉海内外。2002年与邮电总医院合并重组，形成东单和西单两个院区，现有总建筑面积17余万平方米。8年来，通过学科规划和资源整合，初步形成东院以“大医疗为主体”、西院以“大专科、小综合”为特色的医疗格局。干部保健基地和新门急诊楼及手术科室楼将分别于2010年9月和2011年9月建成并投入使用，届时医院总建筑面积将达到49万余平方米，将进一步全面提升医院的就医环境。
        医院连续多年荣获多项荣誉，如全国医院管理年活动先进单位、卫生系统护士岗位技能竞赛金奖、全国百佳医院、全国五一劳动奖状、全国创建文明行业先进单位、卫生系统先进集体等10余项国家级奖项，荣获北京市十佳医院、首都五一劳动奖状、首都“双十佳”人民满意医院、首都文明标兵单位、首都民族团结进步先进单位、首都精神文明建设先进单位等多项市级荣誉。
        近90年来，协和人以执着的医志、高尚的医德、精湛的医术和严谨的学风书写了辉煌的历史，今天的协和人正为打造“国际知名、国内一流”医院的目标而努力奋斗!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star,Location } from '@element-plus/icons-vue'
// 引入详情页仓库
import useDetailStore from '@/store/moudules/hospitalDetail.ts'

let detailStore = useDetailStore()
</script>

<style lang="scss" scoped>
.detail{
  .top{
    display: flex;
    .left{
      font-size: 30px;
      font-weight: 900;
      color: black;
    }
    .right{
      color: #7f7f7f;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      span{
        margin-left: 5px;
      }
    }
  }
  .content{
    display: flex;
    .left{
      width: 80px;
      margin-top: 20px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right{
      margin-left: 20px;
      font-size: 18px;
      .address,.route{
        margin-top: 10px;
      }
      .rule{
        color: black;
      }
    }
    .book{
      margin: 10px 0px;
      color: black;
    }
    .bookInfo{
      margin-top: 10px;
    }
  }
  .footer{
    margin: 30px 0px;
    h1{
      color: black;
    }
    p{
      margin-top: 10px;
      line-height: 30px;
    }
  }
}
</style>