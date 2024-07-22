<template>
  <div style="width: 100%">
    <div class="ds-button-toolbox" v-if="isFormBtn">
      <!-- 带图标式按钮平铺 -->
      <div
        v-if="dsf.config.commonForm.btnStyle"
        style="width: 100%"
      >
        <DsfButtonGroup
          :isFormBtn="isFormBtn"
          :more="more"
          :data="mainButtons.reverse().concat(commonButtons)"
          :size="size"
          :showNum="dsf.config.clientType == 'mobile' ? dsf.config.commonForm.btnNum || 4 : 5"
          :btnStyle="dsf.config.commonForm.btnStyle"
          justify="space-around"
          :direction="dsf.config.commonForm.btnDirection || 'row'"
          @click="onCommonClick"
        />
      </div>
      <div
        v-else-if="commonButtons.length + mainButtons.length <= 2"
        class="flex1 ds-button-center"
      >
        <debounce-click
          v-for="(item, index) in commonButtons"
          :key="item.action"
        >
          <van-button
            size="middle"
            class="flex1"
            :icon="item.icon"
            :type="
              item.type ||
              (index == commonButtons.length - 1 && !mainButtons.length
                ? 'primary'
                : 'default')
            "
            @click="onCommonClick(item)"
            :disabled="item.disabled"
            >{{ item.name }}
          </van-button>
        </debounce-click>
        <debounce-click v-for="(item, index) in mainButtons" :key="item.action">
          <van-button
            size="middle"
            class="flex1"
            :icon="item.icon"
            :type="
              item.type ||
              (index == mainButtons.length - 1 ? 'primary' : 'default')
            "
            @click="onMainClick(item)"
            :disabled="item.disabled"
            >{{ item.name }}
          </van-button>
        </debounce-click>
      </div>
      <div class="ds-button-toolbox" v-else>
        <DsfButtonGroup
          :isFormBtn="isFormBtn"
          v-if="(commonButtons && commonButtons.length > 0) || btnSty"
          :more="more"
          :data="commonButtons"
          :size="size"
          :showNum="0"
          justify="flex-start"
          class="ds-button-left"
          @click="onCommonClick"
          style="width: auto"
        />
        <div
          v-if="mainButtons.length || btnSty"
          :class="[
            btnSty ? 'flex1' : '',
            !commonButtons || commonButtons.length == 0 ? 'full' : '',
            'ds-button-right',
            mainButtons.length === 1 ? 'ds-button-single' : 'ds-button-many',
          ]"
        >
          <debounce-click
            v-for="(item, index) in mainButtons"
            :key="item.action"
          >
            <van-button
              size="middle"
              :class="['flex1', { single: single && mainButtons.length === 1 }]"
              :type="index === mainButtons.length - 1 ? 'primary' : 'default'"
              @click="onMainClick(item)"
              >{{ item.name }}
            </van-button>
          </debounce-click>
        </div>
      </div>
    </div>
    <div class="ds-button-toolbox" v-else>
      <DsfButtonGroup
        :isFormBtn="isFormBtn"
        v-if="(commonButtons && commonButtons.length > 0) || btnSty"
        :more="more"
        :data="commonButtons"
        :size="size"
        :showNum="
          dsf.config.commonList && dsf.config.commonList.btnToggleShow ? 2 : 3
        "
        justify="flex-start"
        :class="{ flex1: btnSty }"
        class="ds-button-left"
        @click="onCommonClick"
        style="margin-left: -0.2rem"
      />
      <div
        v-if="mainButtons.length || btnSty"
        :class="[
          btnSty ? 'flex1' : '',
          !commonButtons || commonButtons.length == 0 ? 'full' : '',
          'ds-button-right',
          mainButtons.length === 1 ? 'ds-button-single' : 'ds-button-many',
        ]"
      >
        <debounce-click v-for="(item, index) in mainButtons" :key="item.action">
          <van-button
            size="middle"
            :class="{ single: single && mainButtons.length === 1 }"
            style="width: 45%"
            :type="index === mainButtons.length - 1 ? 'primary' : 'default'"
            @click="onMainClick(item)"
            >{{ item.name }}</van-button
          >
        </debounce-click>
      </div>
    </div>
    <van-action-sheet
      :value="isShowSub"
      :actions="subButtons"
      @select="onSubButton"
      @click-overlay="isShowSub = false"
      get-container="#app"
    />
    <van-popup v-model="isShowIntroductionImage" position="bottom" get-container="#app" overlay-class="introductionImageOverlay" round class="introductionImagePopup">
      <img :src="introductionImage[introductionImageIndex]" alt="" @click="clickintroductionImage">
      <div class="coverBtn" @click="updateGuidanceModule">已知晓</div>
    </van-popup>
  </div>
</template>

<script>
// 节流
const throttle = (fn, wait) => {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    fn.apply(this, arguments);
    setTimeout(() => {
      canRun = true;
    }, wait);
  };
};
import DebounceClick from "@/components/common/debounceClick.jsx";
import DsfButtonGroup from "./DsfButtonGroup";
import { Icon, Popup, Grid, GridItem } from "vant";
export default {
  data() {
    return {
      btnSty: false,
      moreBtn: [],
      isShowMoreBtn: false,
      isShowSub: false,
      subButtons: [],
      isShowIntroductionImage: false,
      introductionImage: [],
      isShowCoverBtn: false,
      newButton: null,
      introductionImageIndex: 0
    };
  },
  components: {
    DebounceClick,
    DsfButtonGroup,
    Icon,
    Popup,
    Grid,
    GridItem,
  },
  props: {
    // 按钮
    buttons: {
      type: Object,
      default: () => {},
    },
    // 右侧单按钮是否宽度100%
    single: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "normal",
    },
    more: {
      type: Boolean,
      default: false,
    },
    isFormBtn: {
      type: Boolean,
      default: false,
    },
    isShowYoZoHandWriteBtn: {
      type: Boolean,
      default: false,
    },
    isShowWriteOpintionBtn: {
      type: Boolean,
    },
    isShowQiXiangJuEditOpinion: {
      type: Boolean,
    },
    isListBtn: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // if(this.$route.name=="Home"||this.$route.name=="TodoCenter"){
    this.btnSty = true;
    if (this.isFormBtn && this.isShowWriteOpintionBtn != undefined)
      this.checkIsShowWriteOpintionBtn(); // 如果是表单，检查是否存在单独的意见按钮
    // }
    this.showIntroductionImage()
  },
  computed: {
    commonButtons() {
      let btns =
        this.buttons.commonButton || this.buttons.commonButtons
          ? [...(this.buttons.commonButton || this.buttons.commonButtons)]
          : [];
      let all = this.buttons.mainButtons;
      if (all && all.length > 2) {
        for (var i = all.length - 1; i >= 2 ; i--) {
          btns.unshift(all[i]);
        }
      }
      // btns.sort((a, b) => {
      //   let ai = a.showIndex || 0;
      //   let bi = a.showIndex || 0;
      //   return ai > bi ? 1 : -1;
      // });
      // btns.push({ showIndex: "2", name: "安排人员", icon: "", action: "anPaiRenYuan" });
      return btns;
    },
    mainButtons() {
      const btns = this.buttons.mainButtons
        ? [...this.buttons.mainButtons]
        : [];
      let btnArr = [];
      if (this.buttons.mainButtons) {
        let all = this.buttons.mainButtons;
        btnArr = all.filter((item, index) => index < 2);
      }
      // btns.sort((a, b) => {
      //   let ai = a.showIndex || 0;
      //   let bi = a.showIndex || 0;
      //   return ai > bi ? 1 : -1;
      // });
      return btnArr.reverse();
    },
  },
  methods: {
    onCommonClick: throttle(function (button) {
      if (this.isListBtn) {
        // 通用列表上的按钮点击
        this.$emit("listBtnClick", button);
        return;
      }
      if (button.action == "subBtnPopup") {
        // 弹出二级按钮
        this.showSubButtons(button);
      } else {
        this.comfirmDialog(button).then(() => {
          this.$emit("getNowButton", button);
          this.$emit("commonClick", button.action);
        });
      }
    }, 1000),
    onMainClick: throttle(function (button) {
      if (this.isListBtn) {
        // 通用列表上的按钮点击
        this.$emit("listBtnClick", button);
        return;
      }
      if (button.action == "subBtnPopup") {
        this.showSubButtons(button);
      } else {
        this.comfirmDialog(button).then(() => {
          this.$emit("getNowButton", button);
          this.$emit("mainClick", button.action);
        });
      }
    }, 1000),
    getContainer() {
      return document.body;
    },
    comfirmDialog(button) {
      // 按钮参数弹窗 {"key":"isComfirm","value":"","name":"是否确认弹窗","remark" : "0为不弹窗，1为弹窗"},{"key":"comfirmText","value":"","name":"弹窗内容"}
      return new Promise((resolve, reject) => {
        if (
          button.parameters &&
          button.parameters.find(
            (item) => item.key == "isComfirm" && item.value == 1
          )
        ) {
          dsf.layer.confirm(
            {
              message: button.parameters
                .find((item) => item.key == "comfirmText")
                .value.replace(/\\n/gm, "<br/>"),
              confirmButtonText: "确认",
            },
            () => {
              resolve();
            }
          );
        } else {
          resolve();
        }
      });
    },
    showSubButtons(button) {
      // 弹出子级按钮层
      if (
        button.parameters &&
        button.parameters.find((item) => item.key == "subButtons")
      ) {
        // console.log(button.parameters.find(item => item.key == 'subButtons').value)
        this.subButtons = button.parameters
          .find((item) => item.key == "subButtons")
          .value.split(";")
          .map((btn) => {
            return JSON.parse(btn.replace(/'/g, '"'));
          });
        this.isShowSub = true;
      }
    },
    onSubButton(button) {
      // 点击子级按钮触发按钮操作
      console.log(button);
      this.isShowSub = false;
      this.$emit("getNowButton", button);
      this.$emit("commonClick", button.action);
    },
    checkIsShowWriteOpintionBtn() {
      // 检查是否存在单独的意见按钮，不需要在发送界面显示意见
      let allBtns = this.commonButtons.concat(this.mainButtons);
      let notShowActions = ["BtnWriteOpinion", "qxjEditOpinion"]; // 单独的意见按钮action
      allBtns.forEach((btn) => {
        if (btn.action == "qxjEditOpinion") {
          this.$emit("update:isShowQiXiangJuEditOpinion", true);
        }
        if (notShowActions.indexOf(btn.action) > -1) {
          this.$emit("update:isShowWriteOpintionBtn", true);
        }
        if (btn.action == "subBtnPopup") {
          // 如果是弹出二级按钮，二级按钮中存在notShowActions
          let subButtons = btn.parameters.find(
            (item) => item.key == "subButtons"
          ).value;
          if (subButtons) {
            if (subButtons.indexOf("qxjEditOpinion") > -1) {
              this.$emit("update:isShowQiXiangJuEditOpinion", true);
            }
            if (
              notShowActions.filter((action) => subButtons.indexOf(action) > -1)
                .length > 0
            ) {
              this.$emit("update:isShowWriteOpintionBtn", true);
            }
          }
        }
      });
    },
    showIntroductionImage() {
      this.introductionImageIndex = 0
      let buttons = this.mainButtons.concat(this.commonButtons)
      let newButton = buttons.find(item => Array.isArray(item.introductionImage) && item.introductionImage.length > 0)
      if (newButton) {
        this.newButton = newButton
        this.introductionImage = newButton.introductionImage.map(img => dsf.url.getServerUrl(img))
        this.isShowIntroductionImage = true
        if (this.introductionImage.length == 1) {
          this.isShowCoverBtn = true
        }
      }
    },
    updateGuidanceModule() {
      this.isShowIntroductionImage = false
      dsf.http.post('/fn/updateGuidanceModule/saveUserInfo', {
        type: 1,
        objId: this.newButton.buttonId,
        objName: this.newButton.name
      }).then(res => {
        this.newButton.introductionImage = ''
        this.showIntroductionImage()
      })
    },
    clickintroductionImage() {
      if (this.introductionImageIndex == this.introductionImage.length - 1) {
        this.updateGuidanceModule()
      } else {
        this.introductionImageIndex += 1
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.van-button--success {
  background: #07c160;
  border: 1px solid #07c160;
  color: #ffffff;
}

.van-button--warning {
  background: #ff976a;
  border: 1px solid #ff976a;
  color: #ffffff;
}

.ds-button-right {
  width: 50%;
  box-sizing: border-box;
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button + button {
    margin-left: 10px;
  }

  button {
    // @include font-theme('normal');

    &.van-button--primary,
    &.van-button--info {
      color: #ffffff;
    }

    &.van-button--empty {
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #ebebee;
    }

    &.van-button--small {
      @include font_6;
      min-width: 50px;
      max-width: 120px;
    }

    &.van-button--normal {
      @include font_5;
    }

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.ds-button-many {
    button {
      border-radius: 3.5px;

      &.van-button--small {
        @include font_6;
        // width: 50%;
      }

      &.van-button--normal {
        // width: 50%;
      }
    }
  }

  &.ds-button-single {
    button {
      border-radius: 3.5px;

      &.van-button--normal {
        width: 100%;
      }

      &.van-button--small {
        @include font_6;
        // width: 50%;
      }
    }
  }

  &.full {
    width: 100%;
  }
}

.ds-button-left {
  height: 40px;
  width: 50%;
  padding-right: 0px;
  box-sizing: border-box;
}

.ds-button-toolbox {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  box-sizing: border-box;

  .single {
    width: 100%;
  }

  .singleBtn {
    height: 0.8rem;
  }
}

.ds-button-center {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button + button {
    margin-left: 10px;
  }
}

.flex1 {
  flex: 1;
}
.introductionImagePopup {
  max-height: 95vh;
  border-top: 3px solid #fff;
    .coverBtn {
    position: absolute;
    top: 30px;
    right: 10px;
    background-color: rgba(130,130,130,0.3);
    border-radius: 50px;
    color: #fff;
    padding: 6px 10px;
  }
}
</style>
<style>
.introductionImageOverlay{
  backdrop-filter:blur(0.2rem)
}
</style>
