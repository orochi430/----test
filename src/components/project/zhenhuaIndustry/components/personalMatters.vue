<template>
  <div class="matters">
    <!-- <div class="matters-title">个人事项</div> -->
    <van-swipe class="swipe" :loop="false" :show-indicators="false" :width="340">
      <van-swipe-item>
        <div class="dormitory">
          <div class="title">
            <div class="titl">
              <div class="tit">
                宿舍费用<img :src="eyeOne" alt="" @click="isShow(1)" />
              </div>
              <div class="fee">{{ dormitory.totalFee }}</div>
            </div>
            <div class="code" style="visibility: hidden">
              <img src="static/images/project/zhenhuaIndustry/paymentcode.png" alt="" />
              <div>付款码</div>
            </div>
          </div>
          <div class="allmoney" :class="oldWrap">
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/lodgingfee.png" alt="" /><span class="feename"
                :class="minStyle">住宿费(元)：{{ dormitory.stayFee }}</span>
            </div>
            <span :class="styleAfter"></span>
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/gasfee.png" alt="" /><span class="feename"
                :class="minStyle">燃气费(元)：{{ dormitory.gasFee }}</span>
            </div>
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/electricfee.png" alt="" /><span class="feename"
                :class="minStyle">电费(元)：{{ dormitory.powerFee }}</span>
            </div>
            <span :class="styleAfter"></span>
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/waterfee.png" alt="" /><span class="feename"
                :class="minStyle">水费(元)：{{ dormitory.waterFee }}</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="mealcard">
          <div class="title">
            <div class="titl">
              <div class="tit">
                饭卡余额(元)<img :src="eyeTwo" @click="isShow(2)" alt="" />
              </div>
              <div class="fee">{{ mealcard.mealCardBalance }}</div>
            </div>
            <div class="code" @click="showPopup">
              <img src="static/images/project/zhenhuaIndustry/paymentcode.png" alt="" />
              <div>付款码</div>
            </div>
          </div>
          <div class="allmoney" :class="oldWrap">
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/subsidy.png" alt="" /><span class="feename"
                :class="minStyle">补贴(元)：{{ mealcard.perk }}</span>
            </div>
            <span :class="styleAfter"></span>
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/person.png" alt="" /><span class="feename"
                :class="minStyle">个人(元)：{{ mealcard.personal }}</span>
            </div>
            <div class="item" style="visibility: hidden;min-width: 115.45x;" >
              <img src="static/images/project/zhenhuaIndustry/person.png" alt="" /><span class="feename"
                :class="minStyle">个人(元)：{{ mealcard.perk }}</span>
            </div>
            <div class="item" style="visibility: hidden; min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/person.png" alt="" /><span class="feename"
                :class="minStyle">个人(元)：{{ mealcard.perk }}</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="wages">
          <div class="title">
            <div class="titl">
              <div class="tit">
                实发工资(元)<img :src="eyeThree" @click="isShow(3)" alt="" />
              </div>
              <div class="fee">{{ wages.actualSalary }}</div>
            </div>
            <div class="code" style="visibility: hidden">
              <img src="static/images/project/zhenhuaIndustry/paymentcode.png" alt="" />
              <div>付款码</div>
            </div>
          </div>
          <div class="allmoney" :class="oldWrap">
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/essential.png" alt="" /><span class="feename"
                :class="minStyle">基本(元)：{{ wages.basicSalary }}</span>
            </div>
            <span :class="styleAfter"></span>
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/performance.png" alt="" /><span class="feename"
                :class="minStyle">绩效(元)：{{ wages.performanceSalary }}</span>
            </div>
            <div class="item" style="min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/essential.png" alt="" /><span class="feename"
                :class="minStyle">加班(元)：{{ wages.workOvertimeSalary }}</span>
            </div>
            <div class="item" style="visibility: hidden;min-width: 115.45px;">
              <img src="static/images/project/zhenhuaIndustry/essential.png" alt="" /><span class="feename"
                :class="minStyle">加班(元)：{{ wages.actualSalary }}</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-popup v-model="show">
      <img src="static/images/project/zhenhuaIndustry/headbg.png" alt="" />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "personalMatters",
  props: {},
  components: {},
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      eyeOne: "static/images/project/zhenhuaIndustry/hide.png",
      eyeTwo: "static/images/project/zhenhuaIndustry/hide.png",
      eyeThree: "static/images/project/zhenhuaIndustry/hide.png",
      dormitory: {}, //宿舍费用
      dormitoryHide: {},
      totaldor: {},
      mealcard: {}, //饭卡余额
      mealcardHide: {},
      totalmea: {},
      wages: {}, //实发工资
      wagesHide: {},
      totalwag: {},
      dormitoryHeight: "",
      iteAfter: "ite",
      styleAfter: "",
      minStyle: "",
      userInfo: dsf.util.loadSessionStore("user"),
      oldWrap: "",
      show: false,
      multiple: dsf.util.loadLocalStore("multiple")||dsf.config.login.fontSizeMultiple,
    };
  },
  computed: {},
  methods: {
    isShow(value) {
      if (value == 1) {
        this.show1 = !this.show1;
        if (this.show1) {
          this.eyeOne = "static/images/project/zhenhuaIndustry/display.png";
          this.dormitory = this.totaldor;
        } else {
          this.eyeOne = "static/images/project/zhenhuaIndustry/hide.png";
          this.dormitory = this.dormitoryHide;
        }
      } else if (value == 2) {
        this.show2 = !this.show2;
        if (this.show2) {
          this.eyeTwo = "static/images/project/zhenhuaIndustry/display.png";
          this.mealcard = this.totalmea;
        } else {
          this.eyeTwo = "static/images/project/zhenhuaIndustry/hide.png";
          this.mealcard = this.mealcardHide;
        }
      } else {
        this.show3 = !this.show3;
        if (this.show3) {
          this.eyeThree = "static/images/project/zhenhuaIndustry/display.png";
          this.wages = this.totalwag;
        } else {
          this.eyeThree = "static/images/project/zhenhuaIndustry/hide.png";
          this.wages = this.wagesHide;
        }
      }
    },
    judgeHeight() {
      // 判断字号改变样式
      // console.log('zzz',this.multiple)
      this.multiple=dsf.util.loadLocalStore("multiple")||dsf.config.login.fontSizeMultiple;
        if (this.multiple<= 5) {
        // console.log('z1')
        this.styleAfter = "spanline";
        this.oldWrap = "";
        if (this.multiple == 5) {
          // console.log('z2')
          this.minStyle = "biaozhun";
        } else {
          // console.log('z3')
          this.minStyle = "minstyle";
        }
      } else {
        // console.log('z4')
        this.styleAfter = "spanhide";
        this.minStyle = "";
        this.oldWrap = "oldWrap";
      }
      
    },
    getList() {
      //宿舍费用
      dsf.http.get("fn/proxyRequest/forwardResource?proxyPageId=230923105225VWEmb6JoFZcjmKK774t&proxyComponentInterfaceKey=dormitoryFee&proxyComponentName=ZhzgMobilePersonalMattersComponents", {
        // "userId": this.userInfo.user_id,
        "x-auth-token": dsf.util.loadSessionStore("loginToken")
      }).then((res) => {
        this.dormitory = res.data.data;
        this.totaldor = res.data.data;
        let obj = {};
        for (let key in this.dormitory) {
          obj.key = obj[key] = "****";
        }
        this.dormitoryHide = obj;
        this.dormitory = obj;
        this.eyeOne = "static/images/project/zhenhuaIndustry/hide.png";
      });
      //饭卡余额
      dsf.http.get("fn/proxyRequest/forwardResource?proxyPageId=230923105225VWEmb6JoFZcjmKK774t&proxyComponentInterfaceKey=mealcardFee&proxyComponentName=ZhzgMobilePersonalMattersComponents",{
        "x-auth-token": dsf.util.loadSessionStore("loginToken")
      }).then((res) => {
        this.mealcard = res.data.data;
        this.totalmea = res.data.data;
        let obj1 = {};
        for (let key in this.mealcard) {
          obj1.key = obj1[key] = "****";
        }
        obj1.payCode = this.mealcard.payCode;
        this.mealcardHide = obj1;
        this.mealcard = obj1;
        this.eyeTwo = "static/images/project/zhenhuaIndustry/hide.png";
      });
      //工资信息
      dsf.http.get("fn/proxyRequest/forwardResource?proxyPageId=230923105225VWEmb6JoFZcjmKK774t&proxyComponentInterfaceKey=salaryInfo&proxyComponentName=ZhzgMobilePersonalMattersComponents",{
        "x-auth-token": dsf.util.loadSessionStore("loginToken")
      }).then((res) => {
        this.wages = res.data.data;
        this.totalwag = res.data.data;
        let obj2 = {};
        for (let key in this.wages) {
          obj2.key = obj2[key] = "****";
        }
        this.wagesHide = obj2;
        this.wages = obj2;
        this.eyeThree = "static/images/project/zhenhuaIndustry/hide.png";
      });
    },
    goCode(code) {
      console.log("code: ", code);
    },
    showPopup() {
      this.show = true;
    },
  },
  activated() {
    this.judgeHeight();
    this.getList();
  },
  mounted() {
    this.judgeHeight();
    this.getList();
  },
  beforeDestroy() { },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.matters {
  margin: 15px 0 20px 0;

  .matters-title {
    margin: 15px 15px;
    color: #333333;
    font-weight: 700;
    font-size: var(--font_size_1);
  }

  .swipe {
    .dormitory {
      margin-left: 10px;
      font-size: 14px;
      border-radius: 10px;
      color: #fff;
      /* height: 144px; */
      background: url("../../../../../static/images/project/zhenhuaIndustry/dormitorybg.png") no-repeat;
      background-size: 100% 100%;

      .title {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .titl {
          .tit {
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 12px;
              margin-left: 8px;
            }
          }

          .fee {
            font-size: 18px;
            font-weight: 700;
            margin-top: 4px;
          }
        }

        .code {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;

          img {
            /* min-width: 10px; */
            max-width: 28px;
          }
        }
      }

      .allmoney {
        display: flex;
        flex-wrap: wrap;
        // margin: 0 10px;
        justify-content: space-between;
        width: 96%;
        margin: 0 auto;

        .item {
          display: flex;
          margin-bottom: 15px;
          align-items: center;
          position: relative;

          .feename {
            // width: 90px;
          }

          .minstyle {
            min-width: 80px;
          }

          .biaozhun {
            // width: 80px;
          }

          img {
            width: 17px;
            margin-right: 3px;
          }
        }

        .spanline {
          height: 8px;
          border-left: 1px solid #fff;
          margin-top: 5px;
        }

        .spanhide {
          display: none;
        }
      }

      .oldWrap {
        flex-direction: column;
      }
    }

    .mealcard {
      margin: 0 10px;
      font-size: 14px;
      border-radius: 10px;
      color: #fff;
      /* height: 144px; */
      background: url("../../../../../static/images/project/zhenhuaIndustry/mealcardbg.png") no-repeat;
      background-size: 100% 100%;

      .title {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .titl {
          .tit {
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 12px;
              margin-left: 8px;
            }
          }

          .fee {
            font-size: 18px;
            font-weight: 700;
            margin-top: 4px;
          }
        }

        .code {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;

          img {
            /* min-width: 10px; */
            max-width: 28px;
          }
        }
      }

      .allmoney {
        display: flex;
        flex-wrap: wrap;
        // margin: 0 10px;
        justify-content: space-between;
        width: 96%;
        margin: 0 auto;

        .item {
          display: flex;
          margin-bottom: 15px;
          align-items: center;
          position: relative;

          .feename {
            // width: 90px;
            
          }

          .minstyle {
            min-width: 66px;
          }

          .biaozhun {
            // width: 66px;
          }

          img {
            width: 17px;
            margin-right: 3px;
          }
        }

        .spanline {
          height: 8px;
          border-left: 1px solid #fff;
          margin-top: 5px;
        }

        .spanhide {
          display: none;
        }
      }

      .oldWrap {
        flex-direction: column;
      }
    }

    .wages {
      margin-right: 10px;
      font-size: 14px;
      border-radius: 10px;
      color: #fff;
      /* height: 144px; */
      background: url("../../../../../static/images/project/zhenhuaIndustry/wagesbg.png") no-repeat;
      background-size: 100% 100%;

      .title {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .titl {
          .tit {
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 12px;
              margin-left: 8px;
            }
          }

          .fee {
            font-size: 18px;
            font-weight: 700;
            margin-top: 4px;
          }
        }

        .code {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;

          img {
            /* min-width: 10px; */
            max-width: 28px;
          }
        }
      }

      .allmoney {
        display: flex;
        flex-wrap: wrap;
        // margin: 0 10px;
        justify-content: space-between;
        width: 96%;
        margin: 0 auto;

        .item {
          display: flex;
          margin-bottom: 15px;
          align-items: center;
          position: relative;

          .feename {
            // width: 90px;
          }

          .minstyle {
            min-width: 66px;
          }

          .biaozhun {
            // width: 66px;
          }

          img {
            width: 17px;
            margin-right: 3px;
          }
        }

        .spanline {
          height: 8px;
          border-left: 1px solid #fff;
          margin-top: 5px;
        }

        .spanhide {
          display: none;
        }
      }

      .oldWrap {
        flex-direction: column;
      }
    }
  }
}
</style>