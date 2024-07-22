<!-- 征询单中议题填报--jf -->
<template>
  <div class="TopicFill" :class="{ active: show0 }">
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
        <span>议题填报</span>
      </div>
      <div class="content">
        <default-list :params="item"></default-list>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../common/util";
export default {
  name: "TopicFill",
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
        listId: "",
        moduleId: "",
        name: "",
        params: {
          moduleId: "",
          listId: "",
          pk: "",
        },
      },
      // item: {
      //   listId:
      //   //第一个判断为是否是远程议题
      //     this.formParams.moduleId == "230530201203Mch5WXbue5t6Fa2KdYe" ? "230530194204evzlwXfg991ByLQg3Mv"
      //       : (this.metaData.parameters.todoId
      //       ? "210731153816nI4Ajx2pjB2mnhXB76o"
      //       : "210803152651ysvjiVvXwDx6GPRxN7E"),
      //   moduleId:
      //     this.formParams.moduleId == "230530201203Mch5WXbue5t6Fa2KdYe"
      //       ? "230530194203oCZOzSJSoCVZFi1J8gL"
      //       : "210607181937YJxUC5fve4y7q3SH5hJ",
      //   name: "议题填报",
      //   params: {
      //     moduleId:
      //       this.formParams.moduleId == "230530201203Mch5WXbue5t6Fa2KdYe"
      //         ? "230530194203oCZOzSJSoCVZFi1J8gL"
      //         : "210607181937YJxUC5fve4y7q3SH5hJ",
      //     listId:
      //       this.formParams.moduleId == "230530201203Mch5WXbue5t6Fa2KdYe"
      //         ? "230530194204evzlwXfg991ByLQg3Mv"
      //         : (this.metaData.parameters.todoId
      //       ? "210731153816nI4Ajx2pjB2mnhXB76o"
      //       : "210803152651ysvjiVvXwDx6GPRxN7E"),
      //     pk: this.formData.main["A0001"].value,
      //   },
      // },
    };
  },
  mounted() {
    this.checkRoom();
    util.saveToSessionStore("ytText", {
          value: this.formData.main["C-MEETINGAGENDA-0012"].value,
          text: this.formData.main["C-MEETINGAGENDA-0012"].text,
        });
        util.saveToSessionStore("topicPk", {
          value: this.formData.main["A0001"].value,
        });
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
      self.show0 = true;
    },
    back() {
      this.show0 = false;
      console.log("关闭", this.show0);
      this.$emit("closeCallback", "");
    },
  },
  created() {
    let listId = ''
    let moduleId = ''
    console.log(this.metaData);
    if (this.metaData.parameters.moduleId == "230530201203Mch5WXbue5t6Fa2KdYe") { // 是否是远程议题
      if (this.metaData.parameters.nodeId == '17'||this.metaData.parameters.nodeId == '-7'||this.metaData.parameters.nodeId =='-1'||this.metaData.parameters.nodeId == 'meeting') {
        listId = '230530194204JrKaVHEkvtvPyGjDYRl'
      }else{
        listId = '230530194204evzlwXfg991ByLQg3Mv'
      }
      moduleId = '230530194203oCZOzSJSoCVZFi1J8gL'
    }else{
      if (this.metaData.parameters.todoId) {
        listId = '210731153816nI4Ajx2pjB2mnhXB76o'
      }else{
        listId = '210803152651ysvjiVvXwDx6GPRxN7E'
      }
      moduleId = '210607181937YJxUC5fve4y7q3SH5hJ'
    }
    this.item = {
      listId: listId,
      moduleId: moduleId,
      name: "议题填报",
      params: {
        listId: listId,
        moduleId: moduleId,
        pk: this.formData.main["A0001"].value,
      }
    }
  },

  destroyed() {},
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.TopicFill {
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
  background: #f5f5f5;
  .ds-signinlist {
    width: 100%;
    .van-pull-refresh {
      height: calc(100% - 54px) !important;
    }
  }
}
</style>
