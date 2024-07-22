
<template>
  <div class="meet-Conflict" :class="{ active: show0 }">
    <!-- <van-popup
      v-model:show="show0"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <default-list :params="item"></default-list>
    </van-popup> -->
    <div class="in-box">
      <div class="back">
        <div @click="back()">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </div>
        <span>冲突会议</span>
      </div>
      <div class="content">
        <default-list :params="item"></default-list>
      </div>
    </div>
  </div>
</template>

<script>
// 会议冲突--jf
export default {
  name: "meetConflict",
  components: {
    // DefaultList: () => import("../documentCenter/DefaultList.vue"),
  },
  props: {
    vueData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: {},
    },
    formParams: {
      type: Object,
      default: {},
    },
  },
  components: {},
  data() {
    return {
      show0: false,
      item: {
        listId: "221222170205LrzTTVPk1FTcVsurRf4",
        moduleId: "21070914173377CK6e9OttviLpv0zaN",
        name: "会议占用列表",
        params: {
          moduleId: "21070914173377CK6e9OttviLpv0zaN",
          listId: "221222170205LrzTTVPk1FTcVsurRf4",
          roomId: this.formData.main["c-meetingsq-009"].value,
          sTime: this.formData.main["c-meetingsq-007"].value,
          eTime: this.formData.main["c-meetingsq-008"].value,
        },
      },
    };
  },
  mounted() {
    this.checkRoom();
    console.log(this.$parent.$parent);
  },
  beforeCreate() {
    this.$options.components.DefaultList =
      require("../documentCenter/DefaultList.vue").default;
  },
  watch: {
    formParams(val) {
      console.log(val);
    },
    "vueData.DioMounted": {
      handler(val) {
        debugger;
        console.log(val);
      },
    },
  },
  methods: {
    checkRoom() {
      var self = this;
      if (!this.formData.main["c-meetingsq-007"].value) {
        dsf.layer.toast("请选择开始时间");
        this.show0 = false;
        return;
      }
      if (!this.formData.main["c-meetingsq-008"].value) {
        dsf.layer.toast("请选择结束时间");
        this.show0 = false;
        return;
      }
      if (!this.formData.main["c-meetingsq-009"].value) {
        dsf.layer.toast("请选择会议室");
        this.show0 = false;
        return;
      }
      dsf.http
        .post("fn/meetingRoomOccupy/checkRoomOccupy", {
          //校验会议室是否空置
          pk: this.formData.main["B0035"].value,
          hys: this.formData.main["c-meetingsq-009"].value,
          sdate: this.formData.main["c-meetingsq-007"].value,
          edate: this.formData.main["c-meetingsq-008"].value,
        })
        .then((res) => {
          console.log(res);
          if (res.data.type == "error") {
            self.show0 = true;
          } else {
            self.$parent.$parent.buttonHandle["send"](
              self.$parent.$parent.$route.params,
              self.$parent.$parent.formMeta,
              self.$parent.$parent.formData,
              self.$parent.$parent,
              self.$parent.$parent.$refs,
              null,
              self.$parent.$parent.nowButtonParameters
            );
            self.show0 = false;
            this.$emit("closeCallback", "");
          }
        });
    },
    back() {
      this.show0 = false;
      console.log("关闭", this.show0);
      this.$emit("closeCallback", "");
    },
  },
  created() {},

  destroyed() {},
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.meet-Conflict {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  overflow: hidden;
  opacity: 0;
  transition: all 1;
  &.active {
    bottom: 0;
    opacity: 1;
  }
  .in-box {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #fff;
    > div {
      position: absolute;
      top: 15px;
      left: 14px;
      display: flex;
      align-items: center;
      .van-icon {
        @include font-theme("normal");
        @include font_5;
        margin-right: 3px;
      }
      > span {
        @include font-theme("normal");
        @include font_5;
      }
    }
    > span {
      color: #323233;
      font-weight: 500;
      font-size: var(--font_size_2);
    }
  }
}

.content {
  position: absolute;
  top: 50px;
  right: 0;
  left: 0;
  bottom: 0;
  /* transform: translate(0, -50%); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 250px;
  background: #fff;
  .ds-signinlist {
    width: 100%;
    .van-pull-refresh {
      height: calc(100% - 54px) !important;
    }
  }
}
</style>
