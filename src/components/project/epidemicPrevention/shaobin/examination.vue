<template>
  <div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <DsList ref="dslist" :data="datas" :columns="columns" :spHandleJs="spHandleJS" @mainClick="handleActionClick" @commonClick="handleActionClick"/>
    </van-pull-refresh>
    <van-dialog v-model="show" title="入场签到" :show-confirm-button="false">
      <van-form ref="enter">
        <van-radio-group v-model="cardType" direction="horizontal">
          <van-radio name="1">证件号</van-radio>
          <van-radio name="2">准考证号</van-radio>
        </van-radio-group>
        <van-field v-model="cardNo" :rules="[{ required: true }]" name="证件号" placeholder="请输入证件号或准考证号" center @click-right-icon="scanCode()">
          <template #right-icon v-if="cardType == 2">
            <img src="@/assets/imgs/epidemicPrevention/saomiao.svg" alt="" style="width: 0.44rem">
          </template>
        </van-field>
        <van-radio-group v-model="signStatus" direction="horizontal" class="jb signStatus">
          <van-radio name="10" style="padding-bottom: 0.16rem">正常签到</van-radio>
          <van-radio name="11" style="padding-bottom: 0.16rem">人证比对存疑</van-radio>
          <van-radio name="12" style="padding-bottom: 0.16rem">健康码存疑</van-radio>
          <van-radio name="13" style="padding-bottom: 0.16rem">温度存疑</van-radio>
          <van-radio name="14" style="padding-bottom: 0.16rem">核酸存疑</van-radio>
          <van-radio name="19" style="padding-bottom: 0.16rem">其他存疑</van-radio>
        </van-radio-group>
        <van-button style="width: 100%; font-size: var(--font_size_3)" type="info" @click="enter()">签到</van-button>
      </van-form>
      <div class="close-icon" @click="closeDialog()"><van-icon name="close" size="30px"/></div>
    </van-dialog>
    <van-popup v-model="resultShow" :get-container="'#app'" position="bottom" class="resultPop" style="height: 100vh">
        <div class="epidemicPrevention" :style="{minHeight: '100vh', background: backgroundUrl}">
          <div style="position: absolute; top: 0.32rem; right: 0.32rem;color:#fff" @click="resultShow = false"><van-icon name="close" size="30px"/></div>
          <div class="box">
            <div class="top" :style="{color: result.allowPass ? '#29B93D' : '#DE4B2D'}">
              <div class="title flex jc ac">
                <i :class="['iconfont', result.allowPass ? 'iconchoose' : 'iconguanbi']" style="font-size: 0.8rem;padding-right: 0.2rem"></i>
                {{ result.allowPass ? '通过' : '不通过'}}
              </div>
            </div>
            <div class="ao">
              <div class="line" :style="{borderColor: result.allowPass ? '#29B93D' : '#DE4B2D'}"></div>
              <img src="@/assets/imgs/epidemicPrevention/ao.png" alt="">
            </div>
            <div class="bottom">
              <div style="text-align:center;">{{result.requestTime}}</div>
              <div class="flex jc">
                <div class="info">
                  <div>
                    <span>姓  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  名：</span>
                    <span>{{ result.name }}</span>
                  </div>
                  <div>
                    <span>证&nbsp;&nbsp;件&nbsp;&nbsp;号：</span>
                    <span>{{ result.idNumber }}</span>
                  </div>
                  <div>
                    <span>准考证号：</span>
                    <span>{{ result.exam.cardNo }}</span>
                  </div>
                  <div>
                    <span>考&nbsp;&nbsp;场&nbsp;&nbsp;号：</span>
                    <span>{{ result.exam.examRoomId }}</span>
                  </div>
                  <div>
                    <span>座&nbsp;&nbsp;位&nbsp;&nbsp;号：</span>
                    <span>{{ result.exam.seatNo }}</span>
                  </div>
                </div>
              </div>
              <div class="sub-box flex jc" :style="setStyle(result.nuclein.result)">
                <div class="left flex jc ac tc">{{result.nuclein.effectiveTime}}小时<br>核酸检测</div>
                <div class="right flex dc jc">
                    <span style="font-size: var(--font_size_3)">{{result.nuclein.resultDesc}}</span>
                    <div v-if="result.nuclein.time" style="font-size: var(--font_size_3)">{{result.nuclein.time}}</div>
                </div>
              </div>
              <div class="sub-box flex jc" :style="setStyle(result.healthCode.result, result.healthCode.status)">
                <div class="left flex jc ac">健康码</div>
                <div class="right flex jb ac">
                  <span v-if="result.healthCode.statusDesc" style="font-size: var(--font_size_3)">{{result.healthCode.statusDesc}}</span>
                  <span v-else style="font-size: var(--font_size_3)">未查询到健康码</span>
                </div>
              </div>
              <div class="sub-box flex jc" :style="setStyle(result.antigen.result)">
                <div class="left flex jc ac">{{result.antigen.effectiveTime}}小时<br>抗原检测</div>
                <div class="right flex dc jc">
                    <span style="font-size: var(--font_size_3)">{{result.antigen.result == -1 && result.antigen.status == 1 ? result.antigen.resultDesc : result.antigen.statusDesc}}</span>
                    <div v-if="result.antigen.time" style="font-size: var(--font_size_3)">{{result.antigen.time}}</div>
                </div>
              </div>
              <div class="sub-box flex jc" :style="setStyle(result.vaccin.result)">
                <div class="left flex dc jc ac">
                  疫苗接种
                </div>
                <div class="right flex jb ac">
                    <span style="font-size: var(--font_size_3)">{{result.vaccin.times != 0 ? `接种${result.vaccin.times}次` : result.vaccin.resultDesc}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </van-popup>
  </div>
</template>

<script>
import DsList from "@/components/documentCenter/commonDsList";
export default {
  components: { DsList },
  data() {
    return {
      isLoading: false,
      show: false,
      cardType: '1',
      cardNo: '',
      signStatus: '',
      currentExamId: '',
      datas: [],
      columns: [{
          "showCategory": "mainTitle",
          "showName": "考试名称",
          "showMetaColumn": "examName"
      },
      {
          "showCategory": "needTitle",
          "showName": "考试开始时间",
          "icon": "",
          "showMetaColumn": "examBeginTime"
      },
      {
          "showCategory": "needTitle",
          "showName": "考试结束时间",
          "icon": "",
          "showMetaColumn": "examEndTime"
      },
      {
          "showCategory": "needTitle",
          "showName": "允许入场时间",
          "icon": "",
          "showMetaColumn": "enterStartTime"
      },
      {
          "showCategory": "needTitle",
          "showName": "截止入场时间",
          "icon": "",
          "showMetaColumn": "enterDeadline"
      }],
      spHandleJS: {},
      result: {"allowPass":true,"nuclein":{},"exam":{},"vaccin":{},"name":"","antigen":{},"idNumber":"31010419820306681X","healthCode":{}},
      resultShow: false
    }
  },
  created() {
    this.getDatas()
    this.spHandleJS.link = function (listid, moduleId, pk, vueData, itemValue) {

    }
  },
  computed: {
    backgroundUrl() {
      return this.result.allowPass ? `url(${require('@/assets/imgs/epidemicPrevention/greenBg.png')})` : `url(${require('@/assets/imgs/epidemicPrevention/redBg.png')})`
    }
  },
  methods: {
    getDatas() {
      this.datas = []
      dsf.http.post('/ctrl/guard/exam/data/getCommunityExam', {communityId: dsf.util.loadSessionStore('user').communityId}).then(res => {
        if(res.data.code == 200) {
          res.data.data.forEach(element => {
            this.datas.push({
              buttons: {
                commonButton: [],
                mainButtons: [{action: "enter",condition: "",icon: "",name: "签到",showIndex: 0},
                {action: "enterSaturation",condition: "",icon: "",name: "签到情况",showIndex: 0}]
              },
              dataValue: element
            })
          })
        }
        this.isLoading = false
      })
    },
    onRefresh() {
      this.getDatas()
    },
    handleActionClick() {
        const action = arguments[0];
        const fn = this[`action-${action}`] || function () {};
        fn(...Array.prototype.slice.call(arguments, 1));
    },
    "action-enter"(item, index) {
      this.currentExamId = item.dataValue.id;
      if (new Date() < dsf.date.parse(item.dataValue.enterStartTime) || new Date() > dsf.date.parse(item.dataValue.enterDeadline)) {
        dsf.layer.toast('目前不允许入场签到')
      } else {
        this.show = true
      }
    },
    "action-enterSaturation"(item, index) {
      this.$router.push({
        path: '/commonList/220513115624errdeKH9p6nCAZM1Drh/2205131145208PlD0YmKiZzwmBNOEHe',
        query: {
          secQuery: JSON.stringify({sceneCode: item.dataValue.sceneCode, communityId: dsf.util.loadSessionStore('user').communityId, examId: item.dataValue.id})
        }
      })
    },
    enter() {
      if (!this.cardNo) {
        dsf.layer.toast('请输入证件号或准考证号')
        return
      } else if (!this.signStatus) {
        dsf.layer.toast('请选择签到类型')
        return
      } else {
        let self = this
        let obj = {
          examId: this.currentExamId,
          communityId: dsf.util.loadSessionStore('user').communityId,
          cardNo: this.cardNo,
          cardType: this.cardType,
          signStatus: this.signStatus
        }
        $iaction.encrypt({"proName":"YQFKCX","encryptKey": JSON.stringify(obj), "encryptType":"sm4"},function(vcode){
          dsf.http.Axios.post(dsf.url.getWebPath('/ctrl/guard/exam/data/sign'),vcode, {
            headers: {
              'x-auth-token': dsf.util.loadSessionStore("loginToken"),
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(res => {
            if (res.data.code == 200) {
              self.closeDialog()
              dsf.layer.toast(res.data.message);
              $iaction.decode({"proName":"YQFKCX","decodeKey": res.data.data,"decodeType":"sm4"},function(decode) {
                self.result = JSON.parse(decode)
                self.resultShow = true
              },function(e){
                alert(e);
              });
            } else {
              dsf.layer.toast(res.data.message);
            }
          }).error(e => {
            dsf.layer.toast('签到失败，请重试')
          })
        },function(e){
          alert(e);
        });
      }
    },
    closeDialog() {
      this.show = false
      this.cardNo = ''
      this.signStatus = ''
    },
    scanCode() {
      if(dsf.util.getClientName()=='app') {
        let self = this
        xsfBarcode.scan(
            (res) => {
                console.log(res)
                if(res.text) {
                  self.cardNo = res.text
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
::v-deep .van-dialog {
    overflow: initial;
    width: 300px;
    &__header {
      padding-top: 16px;
      font-size: 18px;
      font-weight: 800;
    }
    &__content {
      padding: 16px;
      .van-field {
        border: 1px solid #c7c7c7;
        border-radius: 4px;
      }
      .van-form {
        & > div {
          margin-bottom: 16px;
        }

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
  .epidemicPrevention {
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .box {
    margin: 50px 20px 30px;
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
