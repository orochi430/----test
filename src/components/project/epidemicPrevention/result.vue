<template>
<div class="container" :style="{backgroundColor: isOk ? '#2ba568' : '#c20000', minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <div class="title fwb">流调人员疫情防控查询</div>
  <div class="main-box">
    <div class="tc">{{ time }}</div>
    <div class="qrcode">
      <img :src="code" alt="">
    </div>
    <div>
      <span class="fwb">姓名&nbsp;&nbsp;</span>
      <span>{{ data.name }}</span>
    </div>
    <div>
      <span class="fwb">身份证&nbsp;&nbsp;</span>
      <span>{{ data.idNumber ? data.idNumber.replace(/^(.{3})(?:\d+)(.{4})$/,"$1**********$2") : ''}}</span>
    </div>
    <div v-if="data.travelCodeMemo" class="travel" :style="{color: data.travelCodeStatus == 1 ? '#000' : '#c20000'}">{{data.travelCodeMemo}}</div>
  </div>
  <div class="flex jb bottom-container">
    <div class="sub-box" :style="{color: data.nucleinStatus == 1 ? '#000' : '#c20000'}">
      <div class="tc fwb">核酸检测</div>
      <template v-if="data.lastNucleinTime">
        <div>
          <div>{{data.lastNucleinSurplusHour > 0 ? `剩余${data.lastNucleinSurplusHour}小时过期` : data.lastNucleinOverdueDesc}}</div>
          <div class="tc">【{{data.lastNucleinResult}}】</div>
          <div>检测时间：</div>
          <div>{{data.lastNucleinTime}}</div>
        </div>
      </template>
      <div v-else class="empty">暂无记录</div>
    </div>
    <div class="sub-box" :style="{color: data.vaccinStatus == 1 ? '#000' : '#c20000'}">
      <div class="tc fwb">新冠疫苗</div>
      <template v-if="data.jzjc">
        <div>接种剂次：{{data.jzjc}}</div>
        <div>生产企业：</div>
        <div>{{data.scqy}}</div>
      </template>
      <div v-else class="empty">暂无记录</div>
    </div>
  </div>
  <div class="status flex jc ac" v-if="pass"><van-icon name="passed" style="padding-right: 6px"/>{{pass.substring(0, pass.length - 1)}}查询通过</div>
  <div class="status flex jc ac" v-if="noPass"><van-icon name="close" style="padding-right: 6px"/>{{noPass.substring(0, noPass.length - 1)}}查询不通过</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      // data: {},
      pass: '',
      noPass: '',
    }
  },
  computed: {
    data() {
      return JSON.parse(this.$route.query.data) || {}
    },
    time() {
      return dsf.date.format(new Date(), 'yyyy-mm-dd hh:ii:ss')
    },
    isOk() {
      return this.data.healthCodeStatus == 1 && this.data.nucleinStatus == 1 && this.data.vaccinStatus == 1 && (this.data.travelCodeStatus == undefined || this.data.travelCodeStatus == 1)
    },
    code() {
      return this.isOk ? require('@/assets/imgs/epidemicPrevention/greenCode.svg') : require('@/assets/imgs/epidemicPrevention/redCode.svg')
    },
  },
  created() {
    // this.data = JSON.parse(this.$route.query.data)
    if (this.data.travelCodeStatus == 1){ this.pass += '行程码、'} else if(this.data.travelCodeStatus == -1){ this.noPass += '行程码、'}
    if (this.data.healthCodeStatus == 1){ this.pass += '健康码、'} else{ this.noPass += '健康码、'}
    if (this.data.nucleinStatus == 1){ this.pass += '核酸、'} else{ this.noPass += '核酸、'}
    if (this.data.vaccinStatus == 1){ this.pass += '疫苗、'} else{ this.noPass += '疫苗、'}
  },
  method: {

  }
}
</script>
<style lang='scss' scoped>
.container {
  .title {
    font-size: var(--font_size_0);
    color: #fff;
    text-align: center;
    padding-top: 30px;
  }
  .main-box {
    background-color: #fff;
    border-radius: 10px;
    margin: 20px;
    padding: 16px;
    div {
      margin-bottom: 16px;
    }
    .qrcode {
      width: 180px;
      height: 180px;
      margin: 16px auto;
    }
  }
  .bottom-container {
    margin: 20px 20px 10px;
    .sub-box {
      width: 48%;
      background-color: #fff;
      border-radius: 6px;
      padding: 8px;
      div {
        padding-bottom: 6px;
      }
      .empty {
        text-align: center;
        margin: 20px 0;
      }
    }
  }
  .status {
    text-align: center;
    color: #fff;
    font-size: var(--font_size_2);
    padding-bottom: 8px;
  }
  .travel {
    font-size: var(--font_size_2);
    font-weight: 600;
  }
  .tc {
    text-align: center;
  }
  .fwb {
    font-weight: 600;
  }
}
</style>
