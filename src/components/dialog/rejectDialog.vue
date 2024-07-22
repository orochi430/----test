<template>
  <div class="ds-user-dialog">
    <common-dialog :close-on-click-modal="true" :show.sync="showDialog">
      <div class="__user_box">
        <div class="__user_box-header">
          <div class="__title">{{ title }}</div>
        </div>
        <div class="__user_box-body">
          <div class="box">
            <van-field v-model="reason" rows="4" :label="subTitle" autosize autofocus type="textarea" :placeholder="placeholder" :label-width="subTitle ? 62 : 0" />
          </div>
        </div>
        <div class="__user_box-footer">
          <van-button type="default" @click="showDialog = false">取消</van-button>
          <van-button type="primary" @click="confirm">{{buttonText}}</van-button>
        </div>
      </div>
    </common-dialog>
  </div>
</template>

<script>
import CommonDialog from './CommonDialog'

export default {
  name: 'rejectDialog',
  components: {
    CommonDialog
  },
  data() {
    return {
      showDialog: false,
      reason: "",
      title: "",
      placeholder: "",
      subTitle: "",
      buttonText: "确定",
      confirmCallBack: () => { },
      isrequire:true
    }
  },
  methods: {
    confirm() {
      if (this.reason.length || !this.isrequire) {
        this.showDialog = false;
        this.confirmCallBack(this.reason);
        this.reason = "";
        this.isrequire = true;
      } else {
        dsf.layer.toast(this.placeholder)
      }
    },
    show(name,flag) {
      this.title = name
      if(flag){
        this.isrequire=false;
      }
      this.placeholder = `请填写${this.title}理由`
      this.showDialog = true;
      return new Promise((confirmCallBack) => {
        this.confirmCallBack = confirmCallBack;
      });
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-user-dialog {
  .van-cell {
    padding: 0px !important;
  }

  .__user_box {
    &-header {
      height: 46px;
      border-bottom: 1px solid #eee;
      background-color: #f4f5f6;

      .__title {
        line-height: 46px;
        padding: 0 20px;
        font-size: var(--font_size_2);
        font-weight: bold;
        color: #666;
        text-align: center;
      }
    }

    &-body {
      // padding: 0.24rem;

      .box {
        box-sizing: border-box;
        max-height: 150px;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        div {
          @include font-theme('normal');
          margin: 0.1rem;
        }

        ::v-deep .van-field__label > span:after{
          content: "*";
          color: red;
        }
      }
    }

    &-footer {
      border-top: 1px solid #eee;
      background-color: #f4f5f6;
      // height: 46px;
      // line-height: 46px;
      font-size: 18px;
      text-align: center;
      padding: 10px 0 15px;
    }
  }
}
</style>
