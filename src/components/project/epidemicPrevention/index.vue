<template>
<div class="epidemicPrevention" :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <div class="box" ref="box">
    <div class="top">
      <div class="flex jb">
        <img src="@/assets/imgs/epidemicPrevention/logo1.png" alt="" style="width: 1.14rem; height: 0.48rem">
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
      <div style="text-align: center;padding-bottom: 0.2rem;color:red;font-size: var(--font_size_2)">仅限进博会、疾控、公安等部门内部使用</div>
      <div style="text-align: center;padding-bottom: 0.2rem;">今日可查询人次：<span style="color: #0081DF;">{{usedTimes}}</span>/{{allowTimes== -1 ? '无限制' : allowTimes}}</div>
      <van-form ref="form">
        <van-field v-model="name" name="姓名" placeholder="请输入姓名" center @click-right-icon="showHistory = true;">
          <template #right-icon>
            <img src="@/assets/imgs/epidemicPrevention/history.svg" alt="" style="width: 0.44rem">
          </template>
        </van-field>
        <van-field v-model="idCard" name="身份证" placeholder="请输入证件号(任意证件)" center @click-right-icon="scan()">
          <template #right-icon>
            <img src="@/assets/imgs/epidemicPrevention/camera.svg" alt="" style="width: 0.44rem">
          </template>
        </van-field>
        <div style="padding-bottom: 0.2rem;color:#666;font-size: var(--font_size_3)">核酸查询可无需输入姓名，健康码、疫苗查询必须输入正确姓名</div>
        <van-button style="width: 100%; font-size: var(--font_size_2)" type="info" @click="query()">健康码、核酸、疫苗查询</van-button>
        <van-button style="width: 100%; font-size: var(--font_size_2)" type="info" @click="query(true)">行程码、健康码、核酸、疫苗查询</van-button>
        <div style="font-size: var(--font_size_4);color: #666">
          <div style="padding-bottom: 0.1rem">建设单位：上海市大数据中心</div>
          <div style="padding-bottom: 0.1rem">开发公司：仪电双杨智能科技（上海）有限公司</div>
          <div class="flex jb ab" style="padding-bottom: 0.1rem"><span>业务支持：18918883653</span><span>技术支持：15626921761</span></div>
          <div style="text-align: right;color: #0081DF;margin-top: 0.2rem;" @click="$router.push('/changePassWord')">修改密码</div>
        </div>
      </van-form>
    </div>
  </div>
  <div class="bg-bottom" v-if="isShow">
    <img src="@/assets/imgs/epidemicPrevention/bg1.png" alt="">
  </div>
  <van-dialog v-model="show" title="行程码核验" :show-confirm-button="false">
    <van-form ref="smslogin">
      <div class="sendCode">
        <van-field v-model="phone" :rules="phoneValidator" name="phone" type="tel" placeholder="请输入手机号"></van-field>
        <van-button :text="smsBtnText" :disabled="smsBtnEnable" size="small" type="primary" native-type="button" @click="sendSmsCode()"></van-button>
      </div>
      <van-field v-model="phonecode" :rules="[{ required: true }]" name="phonecode" placeholder="请输入验证码" center></van-field>
      <van-button style="width: 100%; font-size: var(--font_size_3)" type="info" @click="codeQuery()">行程码、健康码、核酸、疫苗查询</van-button>
    </van-form>
    <div class="close-icon" @click="show = false"><van-icon name="close" size="30px"/></div>
  </van-dialog>

  <van-popup v-model="showHistory" get-container="#app"  class="history-dialog" :close-on-click-overlay="false">
    <!-- <div> -->
      <!-- <van-sticky :container="container"> -->
        <div style="position: relative;">
          <van-field v-model="keyword" placeholder="请输入姓名/身份证号 进行查询" center @click-right-icon="onSearch">
            <template #right-icon>
              <img src="@/assets/imgs/epidemicPrevention/search.svg" alt="" style="width: 0.44rem">
            </template>
          </van-field>
          <div class="close-icon" @click="showHistory = false"><van-icon name="close" size="30px"/></div>

        </div>

      <!-- </van-sticky> -->
      <div class="list">
        <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedTips"
        offset="100"
        @load="onLoad"
      >
        <van-cell class="history-info" v-for="item in list" :key="item.id" :title="item.name" :value="item.id" @click="setInfo(item)"/>
      </van-list>
      </div>

    <!-- </div> -->
  </van-popup>
  <!-- <van-uploader ref="uploader" :after-read="afterRead">
        <van-icon size="1rem" name="add-o" />
    </van-uploader> -->
  <!-- <van-number-keyboard
    v-model="idCard"
    :show="showKey"
    extra-key="X"
    close-button-text="完成"
    @blur="showKey = false"
  /> -->
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
        pattern: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)|(^$)/,
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
    let loading = dsf.layer.loading()
    dsf.http.post('ctrl/sysuser/queryTimes', {userId: dsf.util.loadSessionStore('user').user_id}).then(res => {
      dsf.layer.closeLoading(loading)
      if(res.data.code == 200) {
        this.usedTimes = res.data.data.usedTimes
        this.allowTimes = res.data.data.allowTimes
      } else {
        dsf.layer.toast(res.data.message)
      }
    }).error(e => {
      dsf.layer.closeLoading(loading)
    })
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
      let translateY = clientHeight - boxHeight - (clientWidth / 1.5 ) > 0 ? clientHeight - boxHeight - (clientWidth / 1.5 ) : 0
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
      if(dsf.util.checkSystem() == 'ios') {
        xsfCamera.getPicture(function (imageData) {
          function base64ToFile(data) {
            // 将base64 的图片转换成file对象上传 atob将ascii码解析成binary数据
            let binary = atob(data.split(',')[1]);
            let mime = data.split(',')[0].match(/:(.*?);/)[1];
            let array = [];
            for (let i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i));
            }
            let fileData = new Blob([new Uint8Array(array)], {
              type: mime,
            });
            let file = new File([fileData], `${new Date().getTime()}.png`, { type: mime });
            return file;
          }
          // var smallImage = document.getElementById('smallImage');
          // smallImage.style.display = 'block';
          // smallImage.src = "data:image/jpeg;base64," + imageData;
          let file = base64ToFile("data:image/jpeg;base64," + imageData)
          self.$toast.loading({
              message: "上传中...",
              forbidClick: true,
              duration: 0,
              overlay: true,
          });
          dsf.http.upload(`ctrl/web/idCard/imageParse`,{}, file).then(res => {
            if(res.data.code == 200) {
              self.$toast.clear();
              self.idCard = res.data.data.ID
              self.name = res.data.data.Name
            } else {
              dsf.layer.toast('未检测到身份证，请重新上传身份证或手动输入')
            }
          }).error(e => {
            console.log(e)
          })
        }, function(message) {
          // alert('失败: ' + message);
        }, { quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL });
      } else {
        $iaction.getIdentityCardMsg({"type":"1","quality":"0"},function(s){
          console.log(s)
          let data = JSON.parse(s)
          if (data.ID) {
            self.idCard = data.ID
          } else {
            dsf.layer.toast('未检测到身份证，请重新上传身份证或手动输入')
          }
          if (data.Name) self.name = data.Name

        },function(e){
          // alert(e);
        });
      }
    },
    query(istravel = false) {
      let self = this;
      self.$refs.form.validate().then(() => {
        if (this.allowTimes == 0) {
          dsf.layer.toast('您今日可查询人次为0')
          return
        }
        if (this.allowTimes != -1 && Number(this.usedTimes) >= Number(this.allowTimes)) {
          dsf.layer.toast('今日查询人次已使用完毕')
          return
        }
        if (!istravel) {
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
            dsf.http.post(`/ctrl/serviceApi/healthDetails/${self.idCard.toUpperCase().trim() || ' '}/${self.name.trim()}`, {
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
                  self.$router.push({
                    path: '/epidemicResult',
                    query: {
                      data: JSON.stringify(self.data)
                    }
                  })
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
        } else {
          self.show = true
        }
      })
    },
    sendSmsCode() {
      let self = this;
      let loadingIndx = 0;
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
        self.$refs.smslogin.validate("phone").then(() => {
          self.smsBtnEnable = true;
          loadingIndx = dsf.layer.loading("发送中...");
          return dsf.http.post(`/ctrl/serviceApi/travelCode/getCode/${self.idCard.toUpperCase().trim()}/${self.phone.trim()}`, {
            timestamp: timestamp,
            token: token,
            app: app,
            vcode: vcode,
            deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
            deviceName: dsf.util.loadLocalStore('DeviceName') || '未获取到设备',
          })
        }).then((data) => {
          console.log(data);
          dsf.layer.closeLoading(loadingIndx);
          if (data.data.code == 200) {
            dsf.layer.toast(data.data.message);
            let timeCount = 60;
            let timeInterval = setInterval(() => {
              timeCount--;
              self.smsBtnText = "发送验证码(" + timeCount + ")";
              if (timeCount == 0) {
                clearInterval(timeInterval);
                self.smsBtnEnable = false;
                self.smsBtnText = "发送验证码";
              }
            }, 1000);
          } else {
            self.smsBtnEnable = false;
            dsf.layer.toast(data.data.message || "短信发送接口异常");
          }
        }).error((data) => {
          dsf.layer.closeLoading(loadingIndx);
          self.smsBtnEnable = false;
          console.log(data);
          if (data.message.indexOf("404") > -1) {
            dsf.layer.toast("短信发送接口异常，请联系系统管理员！");
          }
        })
      },function(e){
        alert(e);
      });
    },
    codeQuery() {
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
      self.$refs.smslogin.validate("phonecode").then(() => {
        $iaction.encrypt({"proName":"YQFKCX","encryptKey": timestamp + app + token},function(vcode){
          self.loadingIndx = dsf.layer.loading();
          dsf.http.post(`/ctrl/serviceApi/healthAllInfos/${self.idCard.toUpperCase().trim()}/${self.name.trim()}/${self.phone.trim()}/${self.phonecode.trim()}`, {
            timestamp: timestamp,
            token: token,
            app: app,
            vcode: vcode,
            deviceId: dsf.util.loadLocalStore('DeviceId') || '未获取到设备',
            deviceName: dsf.util.loadLocalStore('DeviceName') || '未获取到设备',
            name: self.name.trim()
          }).then(res => {
            if (res.data.type == 'success') {
              dsf.layer.closeLoading(self.loadingIndx)
              self.data = res.data.data
              self.$router.push({
                path: '/epidemicResult',
                query: {
                  data: JSON.stringify(self.data)
                }
              })
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
      })
    },
    fetchData(){
            let url = "/fn/list/220318184459Y1IEAEpUmNXiShjfpYK/mobile/q?moduleId=2203181833082IpGsZssSF8iV3wzUsa";
            let params = {
                limit: 15,
                _content: this.keyword,
                key: this.keyword,
                page: this.start,
            };
            dsf.http.post(url, params).then(({ status, data }) => {
              if (data.filter && data.filter.length) {
                  this.isShowSearchBox = true;
              }
              const { datas = [], total, } = data;
              if (status === 200) {
                  this.loading = false;
                  this.start += 1;
                  this.list = [...this.list, ...datas.map(item => {return {name: item.dataValue['C-ES-QUERY-HISTORY-0002'], id:item.dataValue['C-ES-QUERY-HISTORY-0003'] }})];
                  if (
                      datas == null ||
                      this.list.length === total ||
                      datas.length === 0 ||
                      datas.length < 15
                  ) {
                      // 加载结束
                      this.finished = true;
                      if (this.list.length > 0) {
                          this.finishedTips = "";
                      }
                  }
              }
          })
          .catch(({
              message
          }) => {
              this.finished = true;
          })
          .finally(() => {
              this.loading = false;
              // this.isLoading = false;
              this.isFirst = 0;
          });
        },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 2; i++) {
      //     this.list.push({name: '邹雪涵', id: '432222222222222222'});
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 2) {
      //     this.finished = true;
      //   }
      // }, 1000);
      this.fetchData()
    },
    onSearch() {
        this.finishedTips = ''
        this.finished = false;
        this.loading = true;
        this.list = [];
        // this.distribIds = ''
        this.start = 1;
        this.fetchData();
    },
    setInfo(item) {
      this.showHistory = false
      this.name = item.name;
      this.idCard = item.id;
    }
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
    margin: 20px 20px;
    height: calc(100% - 120px);
    .top {
      background-color: #fff;
      font-weight: 600;
      color: #1B67CD;
      padding: 10px 16px 0;
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
      padding: 0 16px 16px;
      .van-field {
        border: 1px solid #c7c7c7;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .van-button {
        margin-bottom: 10px;
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
        margin-bottom: 10px;
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
