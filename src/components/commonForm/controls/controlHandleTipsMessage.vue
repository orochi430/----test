<template>
  <div class="controlPostscript" ref="controlPostscript">
    <div class="more" @click.stop="moreList">
      <img
        src="static/images/project/chengduyitihua/iconLiuYan@1x.png"
        alt=""
      />
    </div>
    <div class="num" @click.stop="moreList">
      {{ count }}
    </div>
    <div class="close" @click.stop="close">
      <img
        src="static/images/project/chengduyitihua/iconGuanBi@1x.png"
        alt=""
        v-if="!flag&&closeShow"
      />
      <i class="iconfont iconxialajiantou" v-show="flag&&!closeShow"></i>
      <i class="iconfont iconshangjiantou" v-show="flag&&closeShow"></i>
    </div>
    <div
      :class="{ clamp: !more }"
      :style="{ height: more ? 'auto !important' : height + 'px' }"
      @click.stop="more = true"
    >
      <div class="fuyan" ref="fuyan">附言&nbsp;&nbsp;&nbsp;</div>
      <span
        style="
          white-space: pre-wrap;
          color: #565551;
          letter-spacing: 1.3px;
          line-height: 25px;
        "
        ref="flag"
        v-html="content"
      ></span>
    </div>
    <div
      style="
        text-align: right !important;
        padding-right: 26px;
        color: #92908c;
        letter-spacing: -0.4px;
        line-height: 26px;
      "
    >
      {{ showName }} {{ mobileShowDate }}
    </div>
    <van-popup v-model="show" :style="{ height: '100vh', width: '100vw' }">
      <van-nav-bar title="附言记录" @click-left="closePopup" style="z-index: 9">
        <template #left>
          <van-icon name="arrow-left" /><span>返回</span>
        </template>
      </van-nav-bar>
      <div class="list">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="left">
            <img
              src="static/images/project/chengduyitihua/iconBiaoQian@1x.png"
              alt=""
            />
          </div>
          <div class="right1">
            <span class="text">{{ item.content }}</span>
            <div class="content">
              <div class="left">
                <img
                  src="static/images/project/chengduyitihua/iconJianTou@1x.png"
                  alt=""
                />
                <span>{{ item.showName }}</span>
              </div>
              <div class="right">
                {{ item.showDate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "controlPostscript",

  props: {
    subFormIndex: {
      type: Number,
      default: null,
    },
    formId: {
      // 子表id
      type: String,
      default: null,
    },
    formMeta: {
      type: Object,
      default: () => ({}),
    },
    metaData: {
      type: Object,
      default: () => ({}),
    },
    allFile: {
      type: Array,
      default: () => [],
    },
  },

  components: {},

  data() {
    return {
      showDate: "",
      mobileShowDate: "",
      showName: "",
      content: "",
      // Text:"",
      more: false,
      count: "",
      show: false,
      list: [],
      // flag: false,
      height: 0,
      // historicalView: false,
      closeShow: true,
      flag:dsf.config.setting["p2512-MOBILE-FORM-ZKFYAGAIN"]==1||false
    };
  },

  created() {
    this.getData();
  },

  mounted() {
  },

  activated() {},

  computed: {},

  watch: {},

  methods: {
    getData() {
      // fn/handleTipsMessage/queryHandleTipData
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/handleTipsMessage/queryHandleTipData", {
          pk: this.formMeta.parameters.pk,
          fPnId: this.formMeta.parameters.fPnId,
          nodeId: this.formMeta.parameters.nodeId,
        })
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { showDate, showName, content, mobileShowDate } =
              res.data.data.first;
            this.showDate = showDate;
            this.showName = showName;
            this.mobileShowDate = mobileShowDate;
            // this.historicalView = historicalView;
            // this.content = content.replace(/[ ]/g, "");
            this.content = content;
            this.count = res.data.data.list.length;
            this.list = res.data.data.list;
            this.$nextTick(() => {
              this.height = this.$refs.fuyan.offsetHeight + 50;
              if (this.$refs.flag.offsetHeight <= 50) {
                this.more = true;
              }
            });
            if (this.content) {
              this["metaData"].show = 1;
            }
          } else {
            // dsf.layer.toast(res.data.message);
            console.log(res.data.message);
            this["metaData"].show = 0;
          }
        })
        .error((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
    close() {
      // console.log(this["metaData"].show);
      // this["metaData"].show = 0;
      
      if(this.flag&&!this.closeShow){
        this.closeShow = true ;
        this.$refs.controlPostscript.style.height = "auto";
      this.$refs.controlPostscript.style.padding = "8px 10px 8px 32px";
      this.$parent.$parent.$parent.$parent.$el.childNodes[0].style.borderBottom = "5px solid #f8f8f8";
      }else{
        this.closeShow = false;
      // console.log("this.$refs", this);
      this.$refs.controlPostscript.style.height = 0;
      this.$refs.controlPostscript.style.padding = 0;
      this.$parent.$parent.$parent.$parent.$el.childNodes[0].style.border = 0;
      }
    },
    moreList() {
      // if (this.count > 1) {
      this.show = true;
      // }
    },
    closePopup() {
      this.show = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.controlPostscript {
  background: url("../../../../static/images/project/chengduyitihua/BeiJing@1x.png")
    center center/100% 100% no-repeat;
  position: relative;
  // height: 120px;
  padding: 8px 10px 8px 32px;
  .more {
    position: absolute;
    background-image: linear-gradient(180deg, #88c2ff 0%, #4f8df6 100%);
    box-shadow: 0 2px 10px 1px rgba(79, 141, 246, 0.5);
    border-radius: 50%;
    padding: 5px;
    top: -4px;
    left: 0;
    z-index: 999;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .num {
    position: absolute;
    top: -6px;
    left: 20px;
    background: #eab15a;
    font-size: 10px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    text-align: center;
    color: #fff;
    z-index: 999;
    line-height: 16px;
  }
  .close {
    position: absolute;
    right: 6px;
    top: 6px;
    z-index: 999;
    img {
      height: 20px;
      width: 20px;
    }
  }
  .title {
    padding: 15px 0;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: var(--normal);
    border-bottom: 1px solid #eee;
  }
  .list {
    .item {
      padding: 15px 0;
      display: flex;
      border-bottom: 1px solid #eee;
      .left {
        width: 40px;
        img {
          width: 22px;
          height: 17px;
          margin: 0 auto;
        }
      }
      .right1 {
        flex: 1;
        .text {
          white-space: pre-wrap;
          font-weight: bold;
          line-height: 18px;
          color: #333;
        }
        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 10px;
          margin: 10px 0;
          width: 100%;
          color: gray;
          .left {
            width: auto;
            img {
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
.van-notice-bar {
  // height: auto !important;
  // height: 100px;
}
::v-deep .van-nav-bar__title {
  color: var(--normal);
  font-weight: bold;
}
::v-deep .van-notice-bar__content {
  width: 100%;
}
.fuyan {
  color: #565551;
  font-weight: bold;
  position: relative;
}
// .van-popup {
//   width: 90%;
//   // text-align: start !important;
//   color: #ed6a0c;
//   background: #ffe4d0;
//   padding: 45px 10px 20px;
//   .item {
//     padding: 4px 0;
//     // border-bottom: 1px solid #ff2b2b;
//     text-align: start !important;
//   }
// }
.clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>