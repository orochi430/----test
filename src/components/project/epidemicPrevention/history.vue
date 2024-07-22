<template>
<div class="epidemicPrevention" :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <div class="box">
    <div class="top">
      <div class="title">历史核酸检测</div>
      <div class="cell">
        <span class="key">姓名</span>
        <span class="val">{{$route.query.name | filterName}}</span>
      </div>
      <div class="cell">
        <span class="key">身份证号</span>
        <span class="val">{{$route.query.idNumber.replace(/^(.{3})(?:\d+)(.{4})$/,"$1***********$2")}}</span>
      </div>
      <!-- <div class="sub"><span>疫情防控·人人有责·请您配合</span></div> -->
    </div>
    <div class="ao">
      <img src="@/assets/imgs/epidemicPrevention/ao.png" alt="">
    </div>
    <!-- <div class="divider-bottom"></div> -->
    <div class="bottom">
      <div v-for="data in list" :key="data.id" class="list">
        <div class="cell">
          <div class="key">采样时间</div>
          <div class="val">{{data.sampleDate}}</div>
          <!-- <div class="val" style="font-size: var(--font_size_3)">{{data.lastNucleinSampleDateTime.split(' ')[0]}}<br>{{data.lastNucleinSampleDateTime.split(' ')[1]}}</div> -->
        </div>
        <div class="cell">
          <div class="key">采样单位</div>
          <div class="val">{{data.sampleOrgname || '核酸码采集'}}</div>
        </div>
        <div class="cell">
          <div class="key">采样方式</div>
          <div class="val">{{!data.testOrgname && !data.natResultText ? '待检测机构上传' : data.sampleTypeText}}</div>
        </div>
        <div class="cell">
          <div class="key">检测时间</div>
          <div class="val">{{!data.testOrgname && !data.natResultText ? '待检测机构上传' : data.collectDate}}</div>
          <!-- <div class="val">{{data.lastNucleinSampleDateTime.split(' ')[0]}}<br>{{data.lastNucleinSampleDateTime.split(' ')[1]}}</div> -->
        </div>
        <div class="cell">
          <div class="key">检测机构</div>
          <div class="val">{{!data.testOrgname && !data.natResultText ? '待检测机构上传' : data.testOrgname}}</div>
        </div>
        <div class="cell"  style="color:#000;font-size: var(--font_size_2);font-weight:600">
          <div class="key" style="color:#000">报告时间</div>
          <div class="val">{{!data.testOrgname && !data.natResultText ? '待检测机构上传' : data.reportDate}}</div>
          <!-- <div class="val">{{data.lastNucleinReportTime.split(' ')[0]}}<br>{{data.lastNucleinReportTime.split(' ')[1]}}</div> -->
        </div>
        <div class="cell" style="font-size: var(--font_size_2);font-weight:600">
          <div class="key" style="color: #000">检测结果</div>
          <div class="val" v-if="!data.testOrgname && !data.natResultText">待检测机构上传</div>
          <div class="val" v-else :style="{color: data.natResult == 1 ? '#29B93D' : '#DE4B2D'}">{{ data.natResultText}}</div>
        </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  filters: {
    filterName(name){
      return name ? name.substring(0, 1) +  new Array(name.length).join("*") : ''
    },
  },
  mounted() {
    let self = this
    function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid() {
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    let timestamp = new Date().getTime()
    let token = "cms"+guid();
    let app = 'YQFKCX'
    $iaction.encrypt({"proName":"YQFKCX","encryptKey": timestamp + app + token},function(vcode){
      let loadingIndx = dsf.layer.loading();
      dsf.http.post(`ctrl/serviceApi/getMoreNucleins/${self.$route.query.idNumber || ' '}/${self.$route.query.name || ' '}`, {
        timestamp: timestamp,
        token: token,
        app: app,
        vcode: vcode,
        deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
        deviceName: dsf.util.loadLocalStore('DeviceName') || '未获取到设备',
      }).then(res => {
        dsf.layer.closeLoading(loadingIndx)
        if (res.data.code == 200) {
          self.list = res.data.data
        } else {
          dsf.layer.toast(res.data.message)
        }
      }).error(() =>
        dsf.layer.closeLoading(loadingIndx)
      )
    },function(e){
      alert(e);
    });
  },
  watch: {

  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.epidemicPrevention {
  // height: 100vh;
  background: url('../../../assets/imgs/epidemicPrevention/bg.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .box {
    margin: 30px;
    height: calc(100% - 120px);
    .top {
      background-color: #fff;
      padding: 24px 16px 0;
      border-radius: 20px 20px 0 0;
      .title {
        font-weight: 600;
        color: #1B67CD;
        padding-bottom: 10px;
        font-size: 32px;
        text-align: center;
      }
      .sub {
        font-size: var(--font_size_2);
        text-align: right;
        overflow: hidden;
        span {
          position: relative;
          &::before {
            position: absolute;
            content: " ";
            width: 100%;
            height: 6px;
            border-top: 1px solid #1B67CD;
            border-bottom: 1px solid #1B67CD;
            top: 50%;
            left: -101%;
            transform: translateY(-50%);
          }
        }

      }
    }
    .ao {
      position: relative;
      &::before {
        content: ' ';
        width: calc(100% - 0.6rem);
        border-bottom: 1px dashed #1B67CD;
        position: absolute;
        top: 50%;
        left: 0.3rem;
      }
    }
    .bottom {
      background-color: #fff;
      border-radius: 0 0 20px 20px;
      padding: 16px;
      .list {
        border-bottom: 1px dashed #1B67CD;
        &:not(:first-child) {
          margin-top: 16px;
        }
      }
    }
    .cell {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
      align-items: baseline;
      .key {
        color: #919191;
        width: 25%;
        flex-shrink: 0;
      }
      .val {
        text-align: right;
      }
    }
  }
}
</style>
