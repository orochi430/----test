<template>
  <div class="ds-documentcenter">
    <van-nav-bar fixed
                 title="办文中心"
                 left-arrow
                 @click-left="$router.back()"/>
    <div class="staticsis">
      <div v-for="item in staticsisData" :key="item.text" class="staticsis-item">
        <div class="si-t">{{ item.num }}</div>
        <div class="si-c">{{ item.text }}</div>
        <div class="si-b">{{ item.desc }}</div>
      </div>
    </div>
    <van-tabs v-model="tab" animated sticky class="tabs">
      <van-tab
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :title="item.title"
        :badge="item.count"
      >
      <DsList :data="data" :columns="columns"/>
      </van-tab>
    </van-tabs>
    <!-- <div class="content">
      <DsList :data="[{},{},{}]"/>
    </div> -->
    <div class="footer">
      <DsButtonToolbox
        :buttons="buttons"
        single
        more
        @commonClick="handleCommonClick"
        @mainClick="handleMainClick"
      />
    </div>
  </div>
</template>
<script>
import DsList from './DsList';
import DsButtonToolbox from './DsfButtonToolbox';
export default {
  components: {
    DsList,
    DsButtonToolbox,
  },
  data() {
    return {
      tab: '',
      tabs: [{
        title: '我发起',
        name: 'mypost',
      },{
        title: '待审批',
        name: 'waitaudit',
        count: 2
      },{
        title: '已审批',
        name: 'audited',
      },{
        title: '我关注',
        name: 'mycollect'
      }],
      buttons: {
        commonButton: [{
          icon: 'iconshujukanban',
          action: 'dataview',
          name: '数据看板',
        },{
          icon: 'iconpiliangchuli',
          action: 'batchaction',
          name: '批量处理'
        },{
          icon: 'iconpiliangchuli',
          action: 'batchaction2',
          name: '批量处理'
        },{
          icon: 'iconpiliangchuli',
          action: 'batchaction3',
          name: '批量处理'
        }],
        mainButtons: [{
          action: 'create',
          name: '我要新建',
        }]
      },
      staticsisData: [{
        num: 10,
        text: '收文',
        desc: '今日+2',
      },{
        num: 10,
        text: '发文',
        desc: '今日+2',
      },{
        num: 10,
        text: '会议',
        desc: '今日+2',
      },{
        num: 10,
        text: '流转中',
        desc: '今日+2',
      },{
        num: 10,
        text: '已结束',
        desc: '今日+2',
      },{
        num: 10,
        text: '已超期',
        desc: '今日+2',
      }],
      data: [{
        dataValue: {
          bt: '已按要求做好相关工作,请毅松、志强、联姘同志阅示',
          fw: '发文',
          lz: '来自章三（环节）',
          date: '当天',
          coment: '已按要求做好相关工作,请毅松、志强、联姘同志阅示已按要求做好相关工作,请毅松、志强、联姘同志阅示已按要求做好相关工作,请毅松、志强、联姘同志阅示'
        },
        buttons: {
          commonButton: [{
            icon: 'iconguanzhu',
            action: 'gz',
            name: '关注',
          },{
            icon: 'iconzhiding',
            action: 'zd',
            name: '置顶'
          }],
          mainButtons: [{
            action: 'th',
            name: '退回',
          },{
            action: 'fs',
            name: '发送',
          }]
        }
      }],
      columns: [{
        "showCategory": "mainTitle",
        "showMetaColumn": "bt",
      },{
        "showCategory": "subTitle",
        "showMetaColumn": "fw",
        "icon": "iconwenjianleixing",
      },{
        "showCategory": "subTitle",
        "showMetaColumn": "lz",
        "icon": "iconzhuangtai",
        "color": "#67C23B"
      },{
        "showCategory": "subTitle",
        "showMetaColumn": "date",
        "icon": "iconriqi",
        "color": "#F66C6C"
      },{
        "showCategory": "content",
        "showMetaColumn": "coment",
        "icon": "iconshijian",
        "showRows": 2
      }],
    }
  },
  methods: {
    handleCommonClick(action) {
      // eslint-disable-next-line no-console
      console.log(action);
    },
    handleMainClick(action) {
      // eslint-disable-next-line no-console
      console.log(action);
    }
  },
}
</script>
<style lang="scss">
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.ds-documentcenter{
  height: 100%;
  position: relative;
  padding: 46px 0 88px 0;
  box-sizing: border-box;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .van-nav-bar{
    z-index: 200;
  }
  .van-icon-arrow-left{
    color: #333;
    font-weight: 600;
    font-size: 1.5em;
  }
  .content{
    width: 100%;
  }
  .footer{
    width: 100%;
    height: 65px;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 200;
    .ds-button-toolbox{
      height: 65px;
    }
    padding: 0 15px;
    box-sizing: border-box;
  }
  .van-info{
    top: 20px;
    padding: 2px 5px;
    background-color: #f65959;
  }
  .van-tab__text-wrapper{
    padding-right: 15px;
  }
  .staticsis{
    background: #fff;
    margin: 15px 0;
    padding: 15px 15px 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .staticsis-item{
      flex-basis: 33.33%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      position: relative;
      margin-bottom: 15px;
      &::before{
        content: '';
        display: block;
        width: 1px;
        height: 40px;
        position: absolute;
        top: 0;
        margin: auto;
        bottom: 0;
        left: 0;
        background: $separate_color;
      }
      &:nth-child(3n + 1)::before{
        display: none;
      }
      .si-t,.si-b,.si-c{
        text-align: center;
        padding: 3px 0;
      }
      .si-t{
        @include font_1;
      }
      .si-c{
        @include font_4;
      }
      .si-b{
        @include font_5;
        color: $fontColor_sub;
      }
      &:nth-child(6) .si-t{
        color: salmon;
      }
      &:nth-child(2) .si-t,&:nth-child(4) .si-t{
        color: #67C23B;
      }
      &:nth-child(3) .si-t{
        color: #E6A23C;
      }
      &:nth-child(6) .si-t{
        color: #999999;
      }
    }
  }
}
</style>
