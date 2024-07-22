<template>
  <div class="ds-你的类名">
    <van-popup v-model="isShow" position="bottom">
      <div class="header">
        <van-nav-bar title="弹窗标题" left-text="取消" @click-left="cancel" />
      </div>
      <div class="body">
        这里放内容

      </div>
      <div class="footer">
        这里放底部按钮
        <van-button type="theme" @click="submit">发送</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'PopTemplate', // 你的组件名
    data() {
      return {
        isShow: false,
        resolve: () => {},
        reject: () => {},
        data: null
      }
    },
    methods: {
      // 暴露的开启弹窗的方法
      // data为父组件传入的参数，请自定义
      show (data) {
        this.data = data;
        // 这里可以做弹窗打开时初始化的逻辑
        this.isShow = true;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      },
      // 关闭弹窗
      cancel () {
        this.isShow1 = false;
        this.reject('流程被中断');
      },
      // 这是底部按钮事件
      submit () {
        // 这里是你的逻辑
        // 。。。
        // 你的逻辑完成后，执行下面的代码
        this.isShow = false;
        this.resolve('你要传递的消息');
      },

      /***********************/
      /****  你独有的逻辑  ****/
      /***********************/


      /***********************/
      /****使用演示，请不要copy ****/
      /* <pop-template ref="popTemplate" /> */
      /***********************/
      pop () {
        let data = {}; // 你要传递给弹窗的参数
        this.$refs.popTemplate
          .show(data)
          .then(res => {
            // success(res = 你要传递的消息)
          }, res => {
            // error(res = 流程被中断)
          });
      }
    }
  }
</script>

<style lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-你的类名{
  @include font_4();
  *{
    box-sizing: border-box;
  }
  .van-popup{
    display: flex;
    flex-direction: column;
    height: 90%; // 弹窗高度
  }
  .van-tabs__nav{
    padding: 0;
  }
  .van-tabs__line{
    bottom: 0;
  }
  .body {
    flex: auto;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    border-top: 16px solid #f3f3f3;
    border-bottom: 16px solid #f3f3f3;
  }
  .footer {
    display: flex;
    flex: none;
    justify-content: space-between;
    align-items: center;
    padding: 15px 18px;
    height: 75px;
    width: 100%;
    background-color: #fff;
    .van-button {
      flex: auto;
      height: 48px;
    }
  }

  // 下面写你的样式
}
</style>
