<template>
  <div class="ds-meeting-list">
    <ds-list :data="list"
             :columns="columns">
      <template slot="item-content" slot-scope="slotProps">
        <div class="col-3">
          <div class="col-it"><van-icon class="iconfont iconwenjianleixing" /><span class="label">文件种类</span></div>
          <div class="col-it"><van-icon class="iconfont iconlaiyuan" /><span class="label" style="color: #3296FA;">未开始</span></div>
          <div class="col-it"><van-icon class="iconfont iconriqi" /><span class="label green">4天</span></div>
        </div>
        <div class="col-1">
          <div class="col-it"><van-icon class="iconfont iconshijian" /><span class="label">05-04到05-08</span></div>
        </div>
        <div class="col-1">
          <div class="col-it"><van-icon class="iconfont iconyijian" /><span class="label">综合楼A308教室</span></div>
        </div>
      </template>
      <template slot="item-footer" slot-scope="slotProps">
        <div class="item-bottom">
          <div class="bot-l">
            <ds-button-group :data="buttons" justify="flex-end" @click="groupEvent($event, slotProps)"/>
          </div>
          <div class="bot-r">
            <van-button size="small" type="default" @click="leave(slotProps)">请假</van-button>
            <van-button size="small" type="primary" @click="signUp(slotProps)">报名</van-button>
          </div>
        </div>
      </template>
    </ds-list>
  </div>
</template>

<script>
import DsList from '../documentCenter/DsList';
import DsButtonGroup from '../documentCenter/DsfButtonGroup';

export default {
  name: 'MeetingList',
  components: {
    DsList,
    DsButtonGroup
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      buttons: [
        { size: 20, icon: 'iconguanzhu', text: '关注', name: '关注'},
        { size: 20, icon: 'iconzhiding', text: '置顶', name: '置顶'},
        { size: 20, icon: 'iconqiandao', text: '签到', name: '签到'}
      ]
    }
  },
  methods: {
    groupEvent (name, item) {
      if (name === '关注') {
        this.follow(item);
      } else if (name === '置顶') {
        this.setTop(item);
      } else if (name === '签到') {
        this.signIn(item);
      }
    },
    // 关注
    follow (item) {
      // todo 关注
      console.log('关注')
    },
    // 置顶
    setTop (item) {
      // todo 置顶
      console.log('置顶')
    },
    // 签到
    signIn (item) {
      // todo 签到
      console.log('签到')
    },
    // 报名
    signUp (item) {
      // todo 报名
      console.log('报名')
    },
    // 请假
    leave (item) {
      // todo 请假
      console.log('请假')
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "../../assets/font/font.css";

.ds-meeting-list{

}
</style>
