<template>
  <div class="ds-inspector-center">
    <van-nav-bar fixed
      title="检查督办"
      left-arrow
      @click-left="back"/>
    <!--会议室-->
    <div class="__meeting-room">
      <div class="__data">
        <div class="__data-item">
          <div class="__data-item-num" style="color: #0089FF;">10</div>
          <div class="__data-item-name">发布任务</div>
        </div>
        <div class="__data-item">
          <div class="__data-item-num" style="color: #67C23B;">10</div>
          <div class="__data-item-name">接收任务</div>
        </div>
        <div class="__data-item">
          <div class="__data-item-num">10</div>
          <div class="__data-item-name">已回执</div>
        </div>
        <div class="__data-item" style="color: #F66C6C;">
          <div class="__data-item-num">10</div>
          <div class="__data-item-name">已超期</div>
        </div>
      </div>
    </div>
    <van-tabs v-model="active" animated>
      <van-tab title="发布任务">
        <ds-list :data="[{},{},{},{}]">
          <template slot="item-content" slot-scope="slotProps">
            <div class="col-3">
              <div class="col-it"><a class="iconfont iconwenjianleixing" /><span class="label">类型</span></div>
              <div class="col-it"><a class="iconfont iconshijian" /><span class="label">2020-05-16</span></div>
              <div class="col-it"><a class="iconfont iconriqi" /><span class="label">4天</span></div>
            </div>
            <div class="col-3">
              <div class="col-it"><a class="iconfont iconwenhao" /><span class="label">督办号</span></div>
              <div class="col-it"><a class="iconfont iconcompany" /><span class="label">发布单位</span></div>
              <div class="col-it" style="width: 20%"></div>
            </div>
          </template>
          <template slot="item-footer" slot-scope="slotProps">
            <div class="item-bottom">
              <div class="bot-l">
                <dsf-button-group :data="[
                  { size: 20, icon: 'icondayin1', text: '打印'},
                  { size: 20, icon: 'iconguanzhu', text: '关注'},
                  { size: 20, icon: 'iconzhiding', text: '置顶'}]"
                               justify="flex-end" />
              </div>
              <div class="bot-r">
                <van-button type="default">申请延期</van-button>
                <van-button type="primary">签收</van-button>
              </div>
            </div>
          </template>
        </ds-list>
      </van-tab>
      <van-tab title="接收任务">
        <ds-list :data="[{},{}]">
          <template slot="item-content" slot-scope="slotProps">
            <div class="col-3">
              <div class="col-it"><a class="iconfont iconwenjianleixing" /><span class="label">类型</span></div>
              <div class="col-it"><a class="iconfont iconshijian" /><span class="label">2020-05-16</span></div>
              <div class="col-it"><a class="iconfont iconriqi" /><span class="label">4天</span></div>
            </div>
            <div class="col-3">
              <div class="col-it"><a class="iconfont iconwenhao" /><span class="label">督办号</span></div>
              <div class="col-it"><a class="iconfont iconcompany" /><span class="label">发布单位</span></div>
              <div class="col-it" style="width: 20%"></div>
            </div>
          </template>
          <template slot="item-footer" slot-scope="slotProps">
            <div class="item-bottom">
              <div class="bot-l">
                <dsf-button-group :data="[
                  { size: 20, icon: 'icondayin1', text: '打印'},
                  { size: 20, icon: 'iconguanzhu', text: '关注'},
                  { size: 20, icon: 'iconzhiding', text: '置顶'}]"
                               justify="flex-end" />
              </div>
              <div class="bot-r">
                <van-button type="default">申请延期</van-button>
                <van-button type="primary">签收</van-button>
              </div>
            </div>
          </template>
        </ds-list>
      </van-tab>
    </van-tabs>
    <div class="__footer">
      <dsf-button-toolbox :left="leftButtons"
                         :right="rightButtons"
                         single
                         @leftClick="handleLeftClick"
                         @rightClick="handleRightClick"/>
    </div>
  </div>
</template>

<script>
import DsList from '../documentCenter/DsList';
import DsfButtonGroup from '../documentCenter/DsfButtonGroup';
import DsfButtonToolbox from "../documentCenter/DsfButtonToolbox";

export default {
  name: 'InspectorCenter',
  components: {
    DsList,
    DsfButtonGroup,
    DsfButtonToolbox
  },
  data() {
    return {
      active: 0,
      leftButtons: [{
        icon: 'iconsousuo',
        name: 'dataview',
        text: '搜素筛选'
      },{
        icon: 'iconpiliangchuli',
        name: 'batchaction',
        text: '批量处理'
      }],
      rightButtons: [{
        name: 'create',
        type: 'primary',
        text: '我要新建',
      }]
    }
  },
  methods: {
    back () {
      this.$router.back();
    },
    handleLeftClick(name) {
      console.log(name);
    },
    handleRightClick(name) {
      console.log(name);
    }
  }
}
</script>

<style lang="scss">
// @import "../../assets/font/font.css";
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-inspector-center{
  padding: 46px 0 65px;
  @include font_4();
  *{
    box-sizing: border-box;
  }
  .van-nav-bar{
    z-index: 200;
  }
  .a-arrow-left{
    color: #333;
    font-weight: 600;
    font-size: 1.5em;
  }
  .__meeting-room{
    margin: 12px 0;
    padding: 13.5px 15px 0;
    height: 87px;
    background-color: #fff;
    .__data{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &-item{
        width: 25%;
        text-align: center;
        padding: 0 0 13px;
        position: relative;
        &::before{
          content: ' ';
          width: 1px;
          height: 27.5px;
          background-color: #E6E6E6;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -17.75px;
        }
        &:first-child::before{
          display: none;
        }
        &-num{
          @include font_0();
          line-height: 30px;
        }
        &-name{
          @include font_4();
          color: #333;
          line-height: 28px;
        }
      }
    }
  }
  .van-tabs__nav{
    height: 44px;
    padding: 0;
    .van-tab{
      color: #666 !important;
      @include font_3(true);
    }
    .van-tabs__line{
      bottom: 0;
      height: 2px;
    }
  }

  .bot-r{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button + button{
      margin-left: 15px;
    }
    .van-button{
      flex: none;
      @include font_6();
      width: 75px;
      height: 30px;
      margin-left: 10px;
      padding: 0 4px;
    }
  }

  .col-3{
    justify-content: left !important;
    .col-it{
      width: 38%;
      padding-left: 0 !important;
      &:last-child{
        display: block !important;
        width: 24%;
        text-align: right;

      }
    }
    .iconfont{
      margin-right: 5px;
    }
  }

  .__footer{
    width: 100%;
    height: 65px;
    background-color: #fff;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 200;
    .ds-button-toolbox{
      height: 65px;
    }
  }

}
</style>
