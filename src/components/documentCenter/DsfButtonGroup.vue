<template>
  <div :style="styles" :class="['ds-button-group', size, dsf.config.commonForm.showPopoverMore && isFormBtn ? 'showDivider' : '', !isFormBtn ? `list-button` : '', `showNum_${showNum}`, btnStyle]">
    <debounce-click v-for="el in showData" :key="el.action">
      <div :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'ds-button ds-button2':'ds-button'" @click="handleButtonClick(el)"  v-if="!(el.action=='liuChengShiPin'&&!dsf.config.ddSetting.isDing)" :style="{color: showNum == 1 ? 'var(--normal)' : ''}">
        <Icon :size="iconSize" :class="['iconfont', el.icon]" :style="getIconColor(el)"/>
        <span :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'':'btn-text'">{{ el.name }}</span>
      </div>
    </debounce-click>
    <template v-if="showMore">
      <div v-if="dsf.config.commonForm.showPopoverMore && isFormBtn" :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'ds-button ds-button2':'ds-button'">
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="moreData"
          placement="top"
        >
          <div v-for="el in moreData" :key="el.action" @click="handleButtonClick(el);showPopover = false" style="padding: 0.32rem">
            <!-- <Icon :size="iconSize"  name="apps-o" v-if="!isFormBtn || (isFormBtn && !dsf.config.commonForm.hideMoreBtnIcon)"/>  -->
            <span :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'':'btn-text'">{{ el.name }}</span>
          </div>
          <template #reference>
            <Icon :size="iconSize"  name="apps-o" v-if="!isFormBtn || (isFormBtn && !dsf.config.commonForm.hideMoreBtnIcon)"/>
            <span :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'':'btn-text'">更多</span>
          </template>
        </van-popover>
      </div>
      <div v-else :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'ds-button ds-button2':'ds-button'" @click="handleShowMore" :style="{color: 'var(--normal)'}">
        <Icon :size="iconSize"  name="apps-o" v-if="!isFormBtn || (isFormBtn && !dsf.config.commonForm.hideMoreBtnIcon)"/>
        <span :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'':'btn-text'">更多</span>
      </div>
    </template>

    <!-- <div v-if="showMore" :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'ds-button ds-button2':'ds-button'" @click="handleShowMore">
    <Icon :size="iconSize"  name="apps-o" v-if="!isFormBtn || (isFormBtn && !dsf.config.commonForm.hideMoreBtnIcon)"/>
      <span :class="!isFormBtn&&dsf.config.commonList&&dsf.config.commonList.btnToggleShow?'':'btn-text'">更多</span>
    </div> -->
    <van-popup :get-container="getContainer" :lock-scroll="true" v-model="show" round close-icon-position="top-right" position="bottom">
      <div class="popup-title">
          <Icon slot="icon" size="0.4rem" class="iconfont iconxialajiantou" color="#000000" @click="show = false" />更多
      </div>
      <div class="popup-btn">
        <Grid :column-num="4" clickable :border="false">
          <GridItem v-for="el in moreData" :key="el.action" @click="show = false;handleButtonClick(el);" v-if="!(el.action=='liuChengShiPin'&&!dsf.config.ddSetting.isDing)">
            <Icon slot="icon" :size="iconSize" :class="['iconfont', el.icon]" :style="getIconColor(el)"/>
            <span slot="text" class="grid-text">{{ el.name }}</span>
          </GridItem>
        </Grid>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Icon, Popup, Grid, GridItem } from 'vant';
import DebounceClick from '@/components/common/debounceClick.jsx'
export default {
  components: {
    DebounceClick,
    Icon,
    Popup,
    Grid,
    GridItem,
  },
  props: {
			isFormBtn: {
				type: Boolean,
				default: false,
			},
    data: {
      type: Array,
      default: () => []
    },
    justify: {
      type: String,
      default: 'center',
    },
    direction: {
      type: String,
      default: 'row',
    },
    more: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal'
    },
    showNum: {
      type: Number,
      default: 3
    },
    btnStyle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
      showPopover: false
    }
  },
  computed: {
    iconSize() {
      if(dsf.config.commonForm.btnStyle == 'iconTile' && this.isFormBtn) return '0.52rem'
      return this.size === 'small' ? '0.4rem' : '0.48rem';
    },
    styles() {
      return {
        justifyContent: this.justify,
        flexDirection: this.direction
      }
    },
    showData() {
      let btnlist = [];
      let showNum = this.showNum > 0 ? this.showNum : 1
      this.data.slice(0, showNum - 1).forEach((element,indx) => {
        // if (btnlist.filter(item=>item.action==element.action).length) {
        //   element.action=element.action+indx;
        // }
        btnlist.push(element);
      });
      return this.showMore ? btnlist: this.data;
    },
    moreData() {
      let btnlist=[];
      let showNum = this.showNum > 0 ? this.showNum : 1
      this.data.slice(showNum - 1).forEach((element,indx) => {
        // if (btnlist.filter(item=>item.action==element.action).length) {
        //   element.action=element.action+indx;
        // }
        btnlist.push(element);
      });
      return btnlist;
    },
    showMore() {
      return this.more && this.data.length > this.showNum;
    },
  },
  methods: {
    handleButtonClick(el) {
      setTimeout(() => {
        this.$emit('click', el);
      }, 200)
    },
    handleShowMore() {
      this.show = true;
    },
    getContainer() {
      return document.body;
    },
    getIconColor(button) {
      let arr = ['已关注', '已置顶', '取消关注', '取消置顶','取消收藏', '已收藏','取消'];
      if (arr.indexOf(button.name) >= 0||button.name.indexOf("已")>-1) {
        return {
          color: "#F1B902"
        }
      }
      if(button.parameters && button.parameters.find(item => item.key == 'color')) {
        return {
          color: button.parameters.find(item => item.key == 'color').value
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.ds-button-group {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  flex-shrink: 0;
  > .ds-button {
    width: auto;
    flex: 1;
    flex-shrink: 0;
    overflow: hidden;
  }
}
.showDivider {
  .ds-button {
    flex: 1;
    &:not(:last-child) {
      border-right: 1px solid #ddd;
    }
  }
}
.list-button {
  .ds-button {
    .btn-text {
      margin-top: 4px;
      font-size: var(--font_size_4);
    }
  }
}
.showNum_2 .ds-button{
  width: calc(40%);
}
.ds-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // width: calc(33.33%);
  width:50px;
  align-items: center;
  color: $fontColor_main;
  cursor: pointer;
  // @include font_5;
  font-size: var(--font_size_4);
  text-align:center;
  // &.double {
  //   width: calc(50% - 2px);
  // }
}
.ds-button2{
  width: calc(50%) !important;
  flex-direction:row !important;
}
.ds-button + .ds-button {
  margin-left: 0px;
}
.btn-text {
  margin-top: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
.iconfont::before {
  height: 1.1em;
  line-height: 1.1em;
}
.van-icon-apps-o::before {
  height: 1.1em;
  line-height: 1.1em;
}
.grid-text {
  margin-top: 5px;
  @include font_5;
}
.popup-title{
  text-align: center;
  font-size: var(--font_size_2);
  padding: 15px;
  border-bottom: 5px solid #F1F2F4;
  color: #000000;
  .iconfont{
      position: absolute;
      left: 15px;
  }
}
.popup-btn {
  padding-bottom: 16px;
}
.blockTile {
  // flex-direction: row-reverse;
  margin: 0 -10px;
  // border: 1px solid var(--button_auxiliary_bordercolor);
  overflow: hidden;
  .ds-button {
    height: 60px;
    flex: 1;
    border-right: 1px solid var(--button_auxiliary_bordercolor);
    font-size: var(--font_size_2) !important;
    i {
      display: none;
    }
    .btn-text {
      text-overflow: initial;
      white-space: initial;
    }
    &:last-child {
      color: #333 !important;
      border-right: 0;
    }
    &:first-child {
      background-color: var(--normal);
      color: #fff !important;
      // border-right: 0;
      font-weight: bold;
      // flex: 2;
    }
  }

}
.blockTileWithMargin {
  margin: 0 -10px;
  // border: 1px solid var(--button_auxiliary_bordercolor);
  overflow: hidden;
  .ds-button {
    background-color: var(--normal);
    color: #fff !important;
    height: 50px;
    flex: 1;
    border-right: 1px solid var(--button_auxiliary_bordercolor);
    font-size: var(--font_size_2) !important;
    padding: 2px;
    margin: 5px 3px;
    border-radius: 3px;
    i {
      display: none;
    }
    .btn-text {
      text-overflow: initial;
      white-space: initial;
    }
  }
}
.parallelDisplay{
  .ds-button{
    flex-direction: row;
    font-size: var(--font_size_3) !important;
    color: #333 !important;
  }
  .btn-text{
      width: unset;
      margin:0 0 0 5px
  }
  .ds-button:not(:last-child){
    border-left: 1px solid #d0bfbf;
  }
}
</style>
