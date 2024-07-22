<template>
  <div class="box">
    <div class="nav">
      <van-icon name="arrow-left" class="navicon" @click="$router.go(-1)" />
      <p>公务助手</p>
    </div>
    <van-cell :border="false" title="查询结果："  size="large" />
    <div class="content disfr">
      <div class="hotelPrice flex1">
        <p class="disfr ac">住宿费标准<van-icon name="question-o" style="margin-left:5px" /></p>
        <div class="price">
          {{travelData.price[grade].price}}
          <span>元/人/天</span>
        </div>
      </div>
      <div class="lrline"></div>
      <div class="hotPrice flex1">
        <p class="disfr ac">旺季浮动标准
          <van-popover theme="dark" v-model="showPopover" :placement="'top'" trigger="click">
            <div style="padding:10px" v-if="travelData.hotMouth.length">旺季月份为:{{hotText}}</div>
            <div style="padding:10px" v-else>该地区暂无旺季</div>
            <template #reference>
              <van-icon name="question-o" style="margin-left:5px" />
            </template>
          </van-popover>

        </p>
        <div class="price">
          <div class="price" v-if="travelData.hotPrice&&isHot">
            {{travelData.hotPrice[grade].price}}
            <span>元/人/天</span>
          </div>
          <div class="price" v-else>
            本月非旺季
          </div>
        </div>
      </div>
    </div>
    <div class="hotInfo disfr">
      <div class="iconLogo">
        <van-icon name="warning" color="#3386f1" />
      </div>
      <div class="infoContent flex1">
        <p class="infoTitle">标准/旺季  住宿费说明：</p>
        <div class="info">
          查询结果所列标准，均为财政部公布的标准
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"assistantPrice",
  data(){
    return{
      travelData:null,
      grade:null,
      isHot:false,
      showPopover:false
    }
  },
  computed:{
    hotText(){
      let str=``
      this.travelData.hotMouth.forEach(item=>{
        console.log(item)
        if(String(item).indexOf(".")>-1){
          if(String(item).split(".")[1]<6){
            str+=`${item}月上旬`
          }else{
            str+=`${item}月下旬`
          }
        }else{
          str+=`${item}月`
        }

      })
      console.log(str,this.travelData.hotMouth)
      return str
    }
  },
  created(){
    this.grade=this.$route.params.grade
    this.travelData=this.$route.params.travelData
    let localMouth=new Date().getMonth()+1
    // let localMouth=5
    console.log(localMouth)
    console.log(this.travelData)
    let localDay=new Date().getDate()
    this.isHot=this.travelData.hotMouth.filter((item)=>{
      if(String(item).indexOf(".")>-1){
        if((String(item).split(".")[1]>5&&localDay>15)||(String(item).split(".")[1]<6&&localDay<16)){
          return true
        }else{
          return false
        }
      }else{
        return String(item)==localMouth
      }
    }).length
  }
}
</script>

<style lang="scss" scoped>
 @import '../common/common.scss';
.box{


  .nav{
    background:#3d7fff;
    height:45px;
    line-height: 45px;
    color:white;
    text-align: center;
    display: flex;
    align-items: center;
    padding:0 10px;
    p{
      flex:1;
    }
  }
  .content{
    height:80px;
    border-top:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
    background:white;
    padding:10px;
    .lrline{
      width:1px;
      height:100%;
      background:#e5e5e5;
      margin:0 10px;
    }
    .price{
      margin-top:10px;
      font-size:30px;
      color:#000;
      span{
        font-size:8px;
        color: #999999;
      }
    }
  }
  .hotInfo{
    padding:20px 10px;
    background:white;
    .iconLogo{
      margin-right:4px;
    }
    .infoContent{
      .infoTitle{
        font-size: var(--font_size_0);
        color: #333333;
        margin-bottom:10px;
      }
      .info{
        font-size: var(--font_size_3);
        color: #999999;
      }
    }

  }
}
</style>
