<!--
 * @Author: RONGWEI PENG
 * @Date: 2020-05-13 09:30:04
 * @LastEditTime: 2020-05-17 18:48:20
 * @LastEditors: Do not edit
 * @FilePath: /xzDing/src/components/signIn/Index.vue
 * @Description: 签收情况
 -->

<template>
  <div class="ds-signin">
    <!-- <van-nav-bar
      fixed
      title="签收情况"
      left-arrow
      @click-left="$router.back()"
    />-->
    <div class="ds-bg"></div>
    <div class="ds-top-tab-box">
      <!-- <div>
        <van-button
          :plain="!(activeNum === 1)"
          type="info"
          class="ds-top-tab"
          @click="changeTab(1)"
        >未签收<span v-if="total1">({{total1}})</span></van-button>
        <van-button
          :plain="!(activeNum === 2)"
          class="ds-top-tab center"
          type="info"
          @click="changeTab(2)"
        >已签收<span v-if="total2">({{total2}})</span></van-button>
        <van-button
          :plain="!(activeNum === 3)"
          class="ds-top-tab"
          type="info"
          @click="changeTab(3)"
        >已退回<span v-if="total3">({{total3}})</span></van-button>
      </div> -->
      <van-tabs v-model="tabIndex" sticky @change="changeTab()" :offset-top="isShowAppHeader ? '0.92rem' : '0'">
        <van-tab title="未签收" :badge="total1 | badgeCount">
        </van-tab>
        <van-tab title="已签收" :badge="total2 | badgeCount">
        </van-tab>
        <van-tab title="已退回" :badge="total3 | badgeCount">
        </van-tab>
      </van-tabs>
    </div>
    <div class="ds-list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <template v-if="activeNum !== 3">
            <!-- <template> -->
            <div v-for="(item, index) in list" :key="index" :title="item" class="ds-list-box"
              style="display:flex;flex-direction:column" @click="gofankui(item)">
              <div>
                <span class="ds-list-icon ds-list-icon1">
                  <span class="icon iconfont icontouxiang"></span>
                </span>
                <span class="ds-list-text1">
                  {{ `${item["dataValue"]["C-R-SEND-DETAIL-0002"]}` }}
                  <span v-if="item['dataValue']['C-R-SEND-DETAIL-0005']"></span>
                </span>
                <van-button v-if="activeNum == 1" type="info" class="ds-list-btn" disabled>
                  {{ item["dataValue"]["C-R-SEND-DETAIL-0004.value"] == '4' ? '已接收' : '未接收' }}
                </van-button>
                <span v-if="item['dataValue']['C-R-SEND-DETAIL-0005.value'] && activeNum == 2" class="ds_status">
                  {{ item["dataValue"]["C-R-SEND-DETAIL-0005"] }}
                </span>
              </div>
              <!-- <div> -->
              <span class="ds-list-date" style="float:none;margin-top:-20px;margin-bottom:10px;"
                v-if="item['dataValue']['C-R-SEND-DETAIL-0005.value'] == '0'">
                {{
                  item["dataValue"]["C-R-SEND-DETAIL-0003"]
                }}
              </span>
              <!-- </div> -->
              <!-- <span class="ds-list-icon ds-list-icon1">
                <span class="icon iconfont icontouxiang"></span>
              </span>
              <span class="ds-list-text1">
                {{ `${item["dataValue"]["C-R-SEND-DETAIL-0002"]}` }}
                <span
                  v-if="item['dataValue']['C-R-SEND-DETAIL-0005']"
                ></span>
              </span> -->
              <!-- :class="{ willread: index === -1}" -->
              <!-- item["dataValue"]["C-R-RCV-0011"] || -->
              <!--<van-button v-if="activeNum==1" type="info" class="ds-list-btn" disabled>
                {{
                activeText
                }}
              </van-button>-->
              <!-- <van-button v-if="activeNum==1" type="info" class="ds-list-btn" disabled>
                {{item["dataValue"]["C-R-SEND-DETAIL-0004.value"]=='4' ? '已接收' : '未接收'}}
              </van-button>
              <span class="ds-list-date" v-if="item['dataValue']['C-R-SEND-DETAIL-0005.value'] == '0'">
                {{
                item["dataValue"]["C-R-SEND-DETAIL-0003"]
                }}
              </span>
              <span v-if="item['dataValue']['C-R-SEND-DETAIL-0005.value']&&activeNum==2" class="ds_status">
                {{item["dataValue"]["C-R-SEND-DETAIL-0005"]}}
              </span> -->
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) in list" :key="index" :title="item" class="ds-list-box ds-list-box2">
              <span class="ds-list-icon">
                <span class="icon iconfont icontouxiang"></span>
              </span>
              <span class="ds-list-text">
                {{
                  item["dataValue"]["C-R-SEND-DETAIL-0002"] || ""
                }}
              </span>
              <van-button type="info" class="ds-list-btn" disabled>
                {{
                  activeText
                }}
              </van-button>
              <div>
                <p class="ds-list-date ds-list-time">
                  <span>时间:</span>
                  {{ item["dataValue"]["C-R-SEND-DETAIL-0003"] }}
                </p>
                <p class="ds-list-date ds-list-date-reason float_n">
                  原因:
                  <span>{{ item["dataValue"]["C-R-SEND-DETAIL-0011"] || "" }}</span>
                </p>

              </div>
            </div>
          </template>
        </van-list>
      </van-pull-refresh>
    </div>
    <commonempty v-if="list.length === 0" />
    <!-- <div v-show="activeNum === 1" class="ds-bottom"> -->
    <!--  :prarms="dingObj" -->
    <!-- <Ding-btn :prarms="dingObj" :pk="$route.params.data.dataValue['A0001']" :options="{ size: 'large', type: 'info' }" text="DING一下"></Ding-btn> -->
    <!-- <van-button type="info" class="ds-bottom-btn">DING一下</van-button> -->
    <!-- </div> -->
  </div>
</template>

<script>
import {
  mapState
} from "vuex";
import DingBtn from "@/components/common/DingBtn";
import DsList from "@/components/documentCenter/DsList";
// import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
export default {
  name: "signIn",
  components: {
    DingBtn,
    DsList
  },
  data() {
    return {
      total: 0,
      activeNum: 1,
      tabIndex: 0,
      activeText: "未签收",
      // activeTab: true,
      datas: [
        // {
        //   dataValue: {
        //     bt: "已按要求做好相关工作,请毅松、志强、联姘同志阅示",
        //     fw: "发文",
        //     lz: "来自章三（环节）",
        //     date: "当天",
        //     coment:
        //       "已按要求做好相关工作,请毅松、志强、联姘同志阅示已按要求做好相关工作,请毅松、志强、联姘同志阅示已按要求做好相关工作,请毅松、志强、联姘同志阅示"
        //   },
        //   buttons: {}
        // }
      ],
      columns: [
        {
          showCategory: "mainTitle",
          showMetaColumn: "bt"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "fw",
          icon: "iconwenjianleixing"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "lz",
          icon: "iconzhuangtai",
          color: "#67C23B"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "date",
          icon: "iconriqi",
          color: "#F66C6C"
        },
        {
          showCategory: "content",
          showMetaColumn: "coment",
          icon: "iconshijian",
          showRows: 2
        }
      ],
      list: [
      ],
      loading: false,
      finished: false,
      refreshing: false,
      date: moment().format("MM" + "月" + "DD" + "日     " + "HH:mm"),
      params: {
        // _content: "",
        // page: 1,
        // limit: 2
      },
      dingObj: {},
      fid: "",
      signStatus: "0,4",
      url:
        //&fid=200517145527NeZwhrj4BPbfwrA7rz0&signStatus=
        // "fn/list/190313151208mxUh2ioQTsDSnsXC5Js/mobile/q?moduleId=190313143112jfLuUxrc19Dchhv4BPU"
        "fn/list/190318160937LCEKCGdLNoA5yXZFNnR/mobile/q?moduleId=190316150842gGFeRKU0VtkcDlBltcJ&page=1&limit=1000",
      total1: 0,
      total2: 0,
      total3: 0,
      Status: 0
    };
  },
  filters: {
    badgeCount(val) {
      if (val > 100) {
        return "99+"
      }
      if (val < 1) {
        return ""
      }
      return val
    }
  },
  computed: {
    ...mapState({
      isShowAppFooter: state => state.isShowAppFooter,
      isShowAppHeader: state => state.isShowAppHeader
    })
  },
  created() {
    this.getTotal(1)
    this.getTotal(2)
    this.getTotal(3)
  },
  mounted() {

  },
  methods: {
    getTotal(val) {
      this.finished = false;
      this.list = [];
      if (val == 1) {
        //未签收
        this.Status = "0,4";
      } else if (val === 2) {
        //已签收
        this.Status = "2";
      } else {
        //已退回
        this.Status = "-1,-2";
      }
      let data = this.$route.params.data;
      const obj = {
        fid: data.dataValue.fid,
        signStatus: this.Status
      };
      dsf.http
        .get(this.url, obj)
        .done(res => {
          if (val == 1) {
            this.total1 = res.total
          } else if (val == 2) {
            this.total2 = res.total
          } else if (val == 3) {
            this.total3 = res.total
          }
        })
    },
    changeTab() {
      this.activeNum = this.tabIndex + 1;
      this.finished = false;
      this.list = [];
      if (this.activeNum === 1) {
        //未签收
        this.activeText = "未签收";
        this.signStatus = "0,4";
        // this.url =
        //   "fn/list/190313151208mxUh2ioQTsDSnsXC5Js/mobile/q?moduleId=190313143112jfLuUxrc19Dchhv4BPU";
      } else if (this.activeNum === 2) {
        //已签收
        this.activeText = "已签收";
        this.signStatus = "2";
        // this.url =
        //   "fn/list/1903161124289nXBk8iVSmTMGYxn9bi/mobile/q?moduleId=190313143112jfLuUxrc19Dchhv4BPU";
      } else {
        //已退回
        this.activeText = "已退回";
        this.signStatus = "-1,-2";
        // this.url =
        //   "fn/list/200307204110SKsQhZb0MA0tIJfmMIV/mobile/q?moduleId=190313143112jfLuUxrc19Dchhv4BPU";
      }
      this.onhandleHttp();
    },
    gofankui(item) {
      const status = item["dataValue"]["C-R-SEND-DETAIL-0005.value"] ? item["dataValue"]["C-R-SEND-DETAIL-0005.value"] : ""
      if (status == '1') {
        dsf.http.post(`/fn/remoteExchangeData/getFeedbackForm?feedbackRcvId=${item.dataValue["C-R-SEND-DETAIL-0015"]}`)
          .then(modulData => {
            console.log(modulData)
            this.$router.push({
              name: "commonForm",
              params: {
                moduleId: modulData.data.data.moduleId,
                pk: modulData.data.data.pk
              },
              query: {
                qianshoufankui: "ExchangeRecvList",
                method: "view",
                validateByList: "1",
              }
            })
          })
        // this.$router.push({
        //   name: "opinionReceiptReadonly",
        //   params: {
        //     moduleId: "190313143112jfLuUxrc19Dchhv4BPU",
        //     pk: item.dataValue["C-R-SEND-DETAIL-0015"]
        //   }
        // });
      }
    },
    onLoad() {
      this.$set(this.params, "page", this.params.page + 1);
      this.$nextTick(() => {
        this.onhandleHttp(this.params);
      });
      this.loading = false;
      if (!this.total) {
        return;
      }
      if (this.list.length >= this.total) {
        this.finished = true;
      }
    },
    onhandleHttp(params) {
      /* 测试  fid
      未签收： 200517170603vZhLkYle6FdmCoDNRiO
      已签收: 200517171040OUTjmlojPPC7Fpi1ejV
      已退回: 200517172700XkuLH9hx04TMIBGgtLd
 */
      let data = this.$route.params.data;
      if (data) {
        dsf.util.saveToLocalStore("fid", data.dataValue.fid);
      }
      const obj = {
        fid: data ? data.dataValue.fid : dsf.util.loadLocalStore("fid"),
        // fid: "200517171040OUTjmlojPPC7Fpi1ejV",
        signStatus: this.signStatus
      };
      let that = this;
      dsf.http
        .get(this.url, obj)
        .done(res => {
          if (!res) {
            return;
          }
          let { datas } = res;

          this.list = datas;
          this.total = res.total;
          this.refreshing = false
          // dsf.http
          //   .get(
          //     "fn/exchangeMobile/getUnacceptedUsers?sendRecordId=" +
          //       localStorage.getItem("fid"),
          //     {}
          //   )
          //   .then(function(dingData) {
          //     let users=[];
          //     dingData.data.forEach(item => {
          //       if (users.indexOf(item.foreignId) < 0) {
          //         users.push(item.foreignId);
          //       }
          //     });
          //     that.dingObj.users =users;
          //   });
        })
        .error(error => {
          console.log("error", error);
          self.dsf.layer.toast("请求异常", false);
        });
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<style lang="scss" scoped>
//  ::v-deep
.ds-signin {
  font-family: AlibabaPuHuiTi-Regular;
  font-size: var(--font_size_2);

  ::v-deep .van-nav-bar {
    z-index: 200;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
    font-weight: 600;
    font-size: 1.5em;
  }

  .ds-bg {
    position: fixed;
    z-index: 99;
    height: 14px;
    background-color: #f5f5f5;
    width: 100%;
    top: 46px;
  }

  .ds-top-tab-box {
    width: 100%;
    height: 58px;
    line-height: 58px;
    position: fixed;
    z-index: 99;
    // top: 60px;
    // .center {
    //   ::v-deep .van-button--info {
    //     border-left: 0;
    //     border-right: 0;
    //   }
    // }

  }

  .ds-top-tab-box>div {
    background-color: #ffffff;
    padding-top: 13px;
    width: 100%;
    height: 58px;
    padding-left: 4%;
    box-sizing: border-box;
  }

  .ds-top-tab {
    width: 32%;
    height: 32px;
    float: left;
    border-radius: 0;
    box-sizing: border-box;

    .van-button__text {
      font-size: var(--font_size_2);

      span {
        font-size: var(--font_size_3);
      }
    }
  }

  .ds-list {
    position: relative;
    top: 70px;
    // max-height: 316px;
    height: auto;
    // overflow-y: auto;
    padding-bottom: 115px;
    overflow: hidden;

    .ds-list-box {
      background-color: #ffffff;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      // height: 50px;
      line-height: 50px;
    }

    .ds-list-box2 {
      min-height: 120px;
    }

    .ds-list-icon {
      margin: 0 15px;

      .iconfont {
        color: #3296fa;
        font-size: 22px;
      }
    }

    .ds-list-text {
      color: #000000;
    }

    .ds-list-icon1 {
      position: relative;
      margin-left: 15px;
      margin-right: 15px;
      top: -16px;
    }

    .ds-list-text1 {
      color: #000000;
      display: inline-block;
      width: 45%;
      overflow: hidden;
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .ds_status {
      float: right;
      // width: 13%;
      padding: 5px;
      margin-right: 14px;
      font-size: 13px;
      background: #1989fa;
      color: #fff;
      // height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 14px;
      margin-top: 14px;
    }

    .ds-list-btn {
      font-size: var(--font_size_3);
      border-radius: 8px;
      width: 60px;
      padding: 0;
      height: 23px;
      position: absolute;
      right: 15px;
      top: 13.5px;
      border: none;
      // margin-right: 15px;
    }

    .willread {
      color: #999999;
      background: #d8d8d8;
    }

    .ds-list-time {
      margin-top: 0px !important;
      float: left !important;
    }

    .ds-list-date {
      font-size: var(--font_size_3);
      color: #999999;
      line-height: 23px;
      // height: 23px;
      // position: absolute;
      // right: 15px;
      padding-left: 15px;
      float: right;
      margin-right: 10px;
      margin-top: 18px;
      // margin-right: 15px;
    }

    .float_n {
      float: none;
      margin-top: 5px !important;
    }

    .ds-list-date-reason {
      margin: 0px;
      float: left;

      span {
        // padding-left: 15px;
      }

      width: 100%;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // overflow: hidden;
    }
  }

  .ds-bottom {
    position: fixed;
    bottom: 0;
    height: 84px;
    line-height: 84px;
    width: 100%;
    text-align: center;
    background: #ffffff;
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.12);

    .ds-bottom-btn {
      font-size: var(--font_size_1);
      width: 92%;
    }
  }
}</style>
