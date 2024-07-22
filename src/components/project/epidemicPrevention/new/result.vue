<template>
<div class="epidemicPrevention" :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`, background: backgroundUrl}">
  <div class="box">
    <div class="top" :style="{color: isOk ? '#29B93D' : '#DE4B2D'}">
      <div class="title flex jc ac">
        <i :class="['iconfont', isOk ? 'iconchoose' : 'iconguanbi']" style="font-size: 0.8rem;padding-right: 0.2rem"></i>
        <!-- <van-icon :name="isOk ? 'checked' : 'clear'" size="0.9rem" style="padding-right: 0.2rem"/> -->
        {{ isOk ? '通过' : '不通过'}}
      </div>
      <!-- <div class="sub"><span>疫情防控·人人有责·请您配合</span></div> -->
    </div>
    <!-- <div class="divider-top" :style="{borderColor: isOk ? '#29B93D' : '#DE4B2D'}"></div>
    <div class="divider-bottom"></div> -->
    <div class="ao">
      <div class="line" :style="{borderColor: isOk ? '#29B93D' : '#DE4B2D'}"></div>
      <img src="@/assets/imgs/epidemicPrevention/ao.png" alt="">
    </div>
    <div class="bottom">
      <div style="text-align:center;">{{data.requestTime}}</div>
      <div class="flex jc info">
        <div class="info">
          <div>
            <span>姓&nbsp;&nbsp;&nbsp;名：</span>
            <span>{{ data.name }}</span>
          </div>
          <div>
            <span>身份证：</span>
            <span>{{ data.idNumber }}</span>
          </div>
        </div>
      </div>
      <div class="sub-box flex jc" :style="setStyle(data.nuclein.result)">
        <div class="left flex jc ac tc">{{data.nuclein.effectiveTime}}小时<br>核酸检测</div>
        <div class="right flex dc jc">
          <!-- <template v-else class="empty"> -->
            <span style="font-size: var(--font_size_3)">{{data.nuclein.result == -1 && data.nuclein.status == 1 ? data.nuclein.resultDesc : data.nuclein.statusDesc}}</span>
            <div v-if="data.nuclein.time" style="font-size: var(--font_size_3)">{{data.nuclein.time}}</div>
          <!-- </template> -->
        </div>
      </div>
      <div class="sub-box flex jc" :style="setStyle(data.healthCode.result, data.healthCode.status)">
        <div class="left flex jc ac">健康码</div>
        <div class="right flex jb ac">
          <span v-if="data.healthCode.statusDesc" style="font-size: var(--font_size_3)">{{data.healthCode.statusDesc}}</span>
          <span v-else style="font-size: var(--font_size_3)">未查询到健康码</span>
        </div>
      </div>
      <div class="sub-box flex jc" :style="setStyle(data.antigen.result)">
        <div class="left flex jc ac">{{data.antigen.effectiveTime}}小时<br>抗原检测</div>
        <div class="right flex dc jc">
          <!-- <template v-if="data.antigen.statusDesc != undefined"> -->
            <span style="font-size: var(--font_size_3)">{{data.antigen.result == -1 && data.antigen.status == 1 ? data.antigen.resultDesc : data.antigen.statusDesc}}</span>
            <div v-if="data.antigen.time" style="font-size: var(--font_size_3)">{{data.antigen.time}}</div>
          <!-- </template> -->
          <!-- <div v-else style="font-size: var(--font_size_3)">暂无记录</div> -->
        </div>
      </div>
      <div class="sub-box flex jc" :style="setStyle(data.vaccin.result)">
        <div class="left flex dc jc ac">
          疫苗接种
        </div>
        <div class="right flex jb ac">
          <!-- <template v-if="data.vaccin.times"> -->
            <span style="font-size: var(--font_size_3)">{{data.vaccin.times != 0 ? `接种${data.vaccin.times}次` : data.vaccin.resultDesc}}</span>
          <!-- </template>
          <div v-else class="empty">
            <span style="font-size: var(--font_size_3)">暂无记录</span>
          </div> -->
        </div>
      </div>
      <!-- <div class="sub-box flex jc" :style="setStyle(data.travelCodeStatus)">
        <div class="left flex jc ac">行程</div>
        <div class="right flex jb ac">
          <template v-if="data.travelCodeStatus != undefined">
            <span>{{data.travelCodeMemo}}</span>
          </template>
          <div v-else style="font-size: var(--font_size_3)">本次未查询行程码</div>
        </div>
      </div> -->
    </div>
  </div>
</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components: {Toast},
  data() {
    return {
      // data: {},
      pass: '',
      noPass: '',
      data: {},
      isOk: '',
      code: '',
      backgroundUrl: ''
    }
  },
  filters: {
    filterName(name){
      return name.substring(0, 1) +  new Array(name.length).join("*")
    },
  },
  computed: {
    // data() {
    //   return this.$route.query.data ? JSON.parse(this.$route.query.data) : {}
    // },
    time() {
      return dsf.date.format(new Date(), 'yyyy-mm-dd hh:ii:ss')
    },
    // isOk() {
    //   return this.data.healthCodeStatus == 1 && this.data.nucleinStatus == 1 && this.data.vaccinStatus == 1 && (this.data.travelCodeStatus == undefined || this.data.travelCodeStatus == 1)
    // },
    // code() {
    //   return this.isOk ? require('@/assets/imgs/epidemicPrevention/greenCode.svg') : require('@/assets/imgs/epidemicPrevention/redCode.svg')
    // },
    // backgroundUrl() {
    //   return this.isOk ? `url(${require('@/assets/imgs/epidemicPrevention/greenBg.png')})` : `url(${require('@/assets/imgs/epidemicPrevention/redBg.png')})`
    // }
  },
  created() {
    let self = this
    if(self.$route.query.data) {
      self.data = JSON.parse(self.$route.query.data)
      if(self.data.errorDesc) {
        Toast({message: self.data.errorDesc.replace(/<\/br>/gm,"\n")})
      }
      self.setData()
    } else if(self.$route.query.id) {
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
        self.loadingIndx = dsf.layer.loading();
        dsf.http.post(`ctrl/api/log/${self.$route.query.id}`, {
          timestamp: timestamp,
          token: token,
          app: app,
          vcode: vcode,
          deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
          deviceName: dsf.util.loadLocalStore('DeviceName') || '未获取到设备',
        }).then(res => {
          dsf.layer.closeLoading(self.loadingIndx)
          if (res.data.code == 200) {
            self.data = res.data.data
            if(self.data.errorDesc) {
              Toast({message: self.data.errorDesc.replace(/<\/br>/gm,"\n")})
            }
            self.setData()
          } else {
            dsf.layer.toast(res.data.message);
          }
        }).error(e => {
          dsf.layer.toast('查询失败')
        })
      },function(e){
        alert(e);
      });
    }
  },
  methods: {
    setData() {
      this.isOk = this.data.allowPass
      this.code = this.isOk ? require('@/assets/imgs/epidemicPrevention/greenCode.svg') : require('@/assets/imgs/epidemicPrevention/redCode.svg')
      this.backgroundUrl = this.isOk ? `url(${require('@/assets/imgs/epidemicPrevention/greenBg.png')})` : `url(${require('@/assets/imgs/epidemicPrevention/redBg.png')})`
    },
    setStyle(status, healthCode) {
      if (status == 0) {
        return {
          backgroundColor: '#a1a1a1',
          boxShadow: '3px 7px 12px 0px #ddd'
        }
      } else if (healthCode == '2') {
        return {
          backgroundColor: '#EBAE30',
          boxShadow: '3px 7px 12px 0px #decca3'
        }
      } else if (status == '1') {
        return {
          backgroundColor: '#29B93D',
          boxShadow: '3px 7px 12px 0px rgba(163,222,171,1)'
        }
      } else  {
        return {
          backgroundColor: '#DE4B2D',
          boxShadow: '3px 7px 12px 0px #DEA3A3'
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.epidemicPrevention {
  // height: 100vh;
  // background: url('../../../assets/imgs/epidemicPrevention/bg.png');
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .box {
    margin: 30px 20px;
    height: calc(100% - 120px);
    .top {
      background-color: #fff;
      font-weight: 600;
      // color: #1B67CD;
      padding: 24px 16px 10px;
      border-radius: 20px 20px 0 0;
      .title {
        // padding: 10px 0;
        font-size: 34px;
        text-align: center;
      }
    }
    .ao {
      position: relative;
      .line {
        content: ' ';
        width: calc(100% - 0.6rem);
        border-bottom: 1px dashed;
        position: absolute;
        top: 50%;
        left: 0.3rem;
      }
    }
    .bottom {
      padding: 10px 16px;
      background-color: #fff;
      border-radius: 0 0 20px 20px;
      .info {
        padding: 10px 0;
        // display: inline-block;
        div {
          line-height: 30px;
        }
      }
      .sub-box {
        box-shadow: 3px 7px 12px 0px rgba(163,222,171,1);
        background: #29B93D;
        min-height: 62px;
        border-radius: 10px;
        margin-bottom: 16px;
        color: #fff;
        .left {
          width: 90px;
          border-right: 1px dashed #fff;
          font-weight: 600;
          font-size: var(--font_size_2);
          position: relative;
          padding: 20px 0;
          text-align: center;
          &::before, &::after{
            content: " ";
            width: 10px;
            height: 5px;
            border-radius: 10px 10px 0 0;
            background-color: #fff;
            display: inline-block;
            position: absolute;
            right: -5px;
          }
          &::before {
            top: 0;
            transform: rotate(180deg);
          }
          &::after {
            bottom: 0;
          }
        }
        .right {
          flex: 1;
          padding: 16px 10px;
          font-size: var(--font_size_4);
          position: relative;
          .jzjc {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 18px;

            background-color: #fff;
            flex-shrink: 0;
            text-align: center;
          }
          .nucleinResult {
            width: 25px;
            height: 25px;
            text-align: center;
            background-color: #fff;
            border-radius: 50%;
            flex-shrink: 0;
            color: #000;
            font-size: 10px;
          }
          .van-icon, .iconfont, .jzjc, .nucleinResult {
            margin-left: 4px;
            // position: absolute;
            // top: 10px;
            // right: 10px;
          }
          .cell {
            display: flex;
            justify-content: space-between;
            padding-top: 6px;
            align-items: baseline;
            .key {
              flex-shrink: 0;
            }
            .val {
              text-align: right;
            }
            .to {
              padding: 3px 10px;
              border-radius: 50px;
              color: #fff;
              border: 1px solid #fff;
            }
          }
          .hours {
            padding: 3px 10px;
            border-radius: 50px;
            background-color: #fff;
          }
        }
      }
    }
  }
  .tc {
    text-align: center;
  }
}
</style>
