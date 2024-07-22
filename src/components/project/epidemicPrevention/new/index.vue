<template>
<div class="epidemicPrevention" :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <div class="box" ref="box">
    <div class="top">
      <div class="flex jb">
        <!-- <img src="@/assets/imgs/epidemicPrevention/logo1.png" alt="" style="width: 1.14rem; height: 0.48rem"> -->
        <span></span>
        <img src="@/assets/imgs/epidemicPrevention/logo2.png" alt="" style="width: 1.46rem; height: 0.48rem">
      </div>
      <div class="title">疫情防控&nbsp;&nbsp;人人有责</div>
      <!-- <div class="sub"><span>疫情防控·人人有责·请您配合</span></div> -->
    </div>
    <div class="ao">
      <img src="@/assets/imgs/epidemicPrevention/ao.png" alt="">
    </div>
    <!-- <div class="divider-bottom"></div> -->
    <div class="bottom">
        <van-button style="width: 100%; font-size: var(--font_size_2)" type="info" @click="scan()">身份证查询</van-button>
        <van-button style="width: 100%; font-size: var(--font_size_2)" type="info" @click="scanCode()">扫码查询</van-button>
        <div style="font-size: var(--font_size_4);color: #666">
          <!-- <div style="padding-bottom: 0.1rem">建设单位：上海市大数据中心</div> -->
          <div style="padding-bottom: 0.1rem">开发公司：仪电双杨智能科技（上海）有限公司</div>
          <!-- <div class="flex jb ab" style="padding-bottom: 0.1rem"><span>业务支持：18918883653</span><span>技术支持：15626921761</span></div> -->
        </div>
      <!-- </van-form> -->
    </div>
  </div>
  <div class="bg-bottom" v-if="isShow">
    <img src="@/assets/imgs/epidemicPrevention/bg1.png" alt="">
  </div>
  <van-dialog v-model="show" title="身份证查询" :show-confirm-button="false">
    <van-form ref="smslogin">
      <van-field v-model="name" :rules="[{ required: true }]" readonly name="姓名" placeholder="请输入姓名" center></van-field>
      <van-field v-model="idCard" :rules="[{ required: true }]" readonly name="身份证" placeholder="请输入身份证" center></van-field>
      <van-button style="width: 100%; font-size: var(--font_size_3)" type="info" @click="query()">确认</van-button>
    </van-form>
    <div class="close-icon" @click="show = false"><van-icon name="close" size="30px"/></div>
  </van-dialog>

</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      idCard: '',
      docHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight,
      isShow: true,
      show: false,
      showKey: false,
      showHistory: false,
      phone: '',
      phonecode: '',
      smsBtnText: '发送验证码',
      smsBtnEnable: false,
      phoneValidator: [{
          required: true
        },
        {
          pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
          message: '请输入正确手机号'
        }
      ],
      idCardValidator: [{
          required: true
        },{
        pattern: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
        message: '请输入正确身份证号码'
      }],
      data: null,
      keyword: '',
      list: [],
      loading: false,
      finished: false,
      finishedTips: '',
      container: null,
      start: 1,
      usedTimes: '',
      allowTimes: '',
    }
  },
  created() {

  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight
      })()
    }
    this.$nextTick(() => {
      let clientHeight = document.documentElement.clientHeight
      let clientWidth = document.documentElement.clientWidth
      let boxHeight = this.$refs.box.offsetHeight
      let translateY = clientHeight - boxHeight - (clientWidth / 1.3 ) > 0 ? clientHeight - boxHeight - (clientWidth / 1.3 ) : 0
      this.$refs.box.style.transform = `translateY(${translateY}px)`
    })
  },
  watch: {
    showHeight(newVal, oldVal) {
      if(this.docHeight >newVal) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  methods: {
    scan() {
      let self = this;
        $iaction.getIdentityCardMsg({"type":"1","quality":"0"},function(s){
          console.log(s)
          let data = JSON.parse(s)
          if (data.ID && data.Name) {
            self.idCard = data.ID
            self.name = data.Name
            self.show = true
          } else {
            dsf.layer.toast('未检测到身份证，请重新识别')
          }

        },function(e){
          // alert(e);
        });
            // self.query()
    },
    query() {
      let self = this;
            // self.loadingIndx = dsf.layer.loading();
            // dsf.http.post(`/ctrl/healthApi/getHealthInfoByUser`, {
            //   name: self.name,
            //   idNumber: self.idCard,
            //   deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
            // }).then(res => {
            //   dsf.layer.closeLoading(self.loadingIndx)
            //   if (res.data.code == 200) {
            //     self.data = res.data.data
            //       self.$router.push({
            //         path: '/newEpidemicResult',
            //         query: {
            //           data: JSON.stringify(self.data)
            //         }
            //       })
            //   } else {
            //     dsf.layer.toast(res.data.message);
            //   }
            // }).error(e => {
            //   dsf.layer.toast('查询失败，请重试')
            // }).finally(() => {
            //   // dsf.layer.closeLoading(self.loadingIndx)
            // })
          let obj = {
            name: self.name,
            idNumber: self.idCard,
            deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备'
          }
          $iaction.encrypt({"proName":"YQFKCX","encryptKey": JSON.stringify(obj), "encryptType":"sm4"},function(vcode){
            self.loadingIndx = dsf.layer.loading();
            dsf.http.Axios.post(dsf.url.getWebPath('/ctrl/app/device/action/queryByUser'),vcode, {
              headers: {
                'x-auth-token': dsf.util.loadSessionStore("loginToken"),
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(res => {
              dsf.layer.closeLoading(self.loadingIndx)
              if (res.data.code == 200) {
                // self.data = res.data.data
                  $iaction.decode({"proName":"YQFKCX","decodeKey": res.data.data,"decodeType":"sm4"},function(decode) {
                    self.$router.push({
                      path: '/newEpidemicResult',
                      query: {
                        data: decode
                      }
                    })
                  },function(e){
                    alert(e);
                  });

              } else {
                dsf.layer.toast(res.data.message);
              }
            }).error(e => {
              dsf.layer.toast('查询失败，请重试')
            }).finally(() => {
            })
          },function(e){
            alert(e);
          });
    },
    scanCode() {
      if(dsf.util.getClientName()=='app') {
            let self = this
            xsfBarcode.scan(
                (res) => {
                    console.log(res)
                    // if(res.text && res.text.indexOf('gov.cn') > -1) {
                    //     self.loadingIndx = dsf.layer.loading();
                    //     dsf.http.post('/ctrl/healthApi/getHealthInfoByHealthCode', {
                    //         healthCode: res.text,
                    //         deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
                    //     }).then(res => {
                    //         dsf.layer.closeLoading(self.loadingIndx)
                    //         if (res.data.code == 200) {
                    //           self.data = res.data.data
                    //             self.$router.push({
                    //               path: '/newEpidemicResult',
                    //               query: {
                    //                 data: JSON.stringify(self.data)
                    //               }
                    //             })
                    //         } else {
                    //           dsf.layer.toast(res.data.message);
                    //         }
                    //       }).error(e => {
                    //         dsf.layer.toast('查询失败，请重试')
                    //       })
                    // } else if(res.text && res.text.indexOf('courtesyQRCode') > -1) {
                    //     self.loadingIndx = dsf.layer.loading();
                    //     dsf.http.post('/ctrl/healthApi/callback', {
                    //         data: res.text,
                    //         deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
                    //     }).then(res => {
                    //         dsf.layer.closeLoading(self.loadingIndx)
                    //         if (res.data.code == 200) {
                    //           self.data = res.data.data
                    //             self.$router.push({
                    //               path: '/newEpidemicResult',
                    //               query: {
                    //                 data: JSON.stringify(self.data)
                    //               }
                    //             })
                    //         } else {
                    //           dsf.layer.toast(res.data.message);
                    //         }
                    //       }).error(e => {
                    //         dsf.layer.toast('查询失败，请重试')
                    //       })
                    // } else {
                    //     dsf.layer.toast('该二维码无效')
                    // }
                    if(res.text) {
                      let obj = {
                        qrcode: res.text,
                        deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
                      }
                      $iaction.encrypt({"proName":"YQFKCX","encryptKey": JSON.stringify(obj), "encryptType":"sm4"},function(vcode){
                        self.loadingIndx = dsf.layer.loading();
                        dsf.http.Axios.post(dsf.url.getWebPath('/ctrl/app/device/action/onQRCodeRequest'), vcode, {
                          headers: {
                            'x-auth-token': dsf.util.loadSessionStore("loginToken"),
                            'Content-Type': 'application/json;charset=UTF-8'
                          }
                        }).then(res => {
                          dsf.layer.closeLoading(self.loadingIndx)
                          if (res.data.code == 200) {
                            $iaction.decode({"proName":"YQFKCX","decodeKey": res.data.data,"decodeType":"sm4"},function(decode) {
                              // self.data = res.data.data
                              self.$router.push({
                                path: '/newEpidemicResult',
                                query: {
                                  data: decode
                                }
                              })
                            },function(e){
                              alert(e);
                            });
                          } else {
                            dsf.layer.toast(res.data.message);
                          }
                        }).error(e => {
                          dsf.layer.toast('查询失败，请重试')
                        }).finally(() => {
                          // dsf.layer.closeLoading(self.loadingIndx)
                        })
                      },function(e){
                        alert(e);
                      });
                    }
                },
                (error) => {
                    dsf.layer.toast('扫码失败')
                }
            );
        }else {
          dsf.layer.toast('需在app中进行扫码')
            // this.message = '需在app中进行扫码'
            // this.showState = true
        }
    },
  }
}
</script>
<style lang='scss' scoped>
.epidemicPrevention {
  // height: 100vh;
  background: url('../../../../assets/imgs/epidemicPrevention/bg.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .box {
    margin: 30px 20px;
    height: calc(100% - 120px);
    .top {
      background-color: #fff;
      font-weight: 600;
      color: #1B67CD;
      padding: 20px 16px;
      border-radius: 20px 20px 0 0;
      .title {
        padding: 10px 0;
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
      padding: 30px 16px;
      .van-field {
        border: 1px solid #c7c7c7;
        border-radius: 4px;
        margin-bottom: 16px;
      }
      .van-button {
        margin-bottom: 30px;
        // &:last-child {
        //   margin-bottom: 100px;
        // }
      }
    }
  }
  .van-button {
    background-image: linear-gradient(90deg, #39AAFF 2%, #0081DF 99%);
    border-radius: 6px;
    border: 0;
  }
  .bg-bottom {
    width: 80%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  ::v-deep .van-dialog {
    overflow: initial;
    width: 300px;
    &__header {
      padding-top: 16px;
      font-size: 18px;
      color: #1B67CD;
      font-weight: 800;
    }
    &__content {
      padding: 16px;
      .van-field {
        border: 1px solid #c7c7c7;
        border-radius: 4px;
      }
      .van-form > div {
        margin-bottom: 16px;
      }
      position: relative;
      .close-icon {
        color: #fff;
        position: absolute;
        top: -60px;
        right: -30px;
      }
    }

  }
  .sendCode {
    display: flex;
    button {
      height: inherit;
      width: 130px;
      margin-left: 10px;
    }
  }

}
.history-dialog {
    width: 300px;
    border-radius: 10px;
    min-height: 20vh;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    // overflow-y: auto;
    // overflow-x: hidden;
    padding: 16px;
    overflow: visible;
    .van-field {
      border: 1px solid #c7c7c7;
      border-radius: 4px;
      margin-bottom: 10px;
      // position: absolute;
      // top: 16px;
      // width: calc(100% - 32px);
    }
    .history-info {
      padding: 10px 0;
      border-bottom: 1px dashed rgba(183,183,183,1);
      align-items: center;
      .van-cell__title {
        flex: 0 auto;
      }
    }
    .list {
      flex: 1;
      overflow: scroll;
    }
    .close-icon {
      position: absolute;
      top: -50px;
      right: -30px;
      color: #fff;
    }
  }
</style>
