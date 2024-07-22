<template>
  <div class="ds-user-dialog">
    <common-dialog :close-on-click-modal="false" :show.sync="showDialog">
      <div class="__user_box">
        <div class="__user_box-header">
          <div class="__title">流程已发送到以下人员：</div>
        </div>
        <div class="__user_box-body">
          <div class="box">
            <div v-for="column in columns" class="ds_font5">1212</div>
          </div>
        </div>
        <div class="__user_box-footer">
          <div class="__bt" @click="confirm">确定</div>
        </div>
      </div>
    </common-dialog>
  </div>
</template>

<script>
  import CommonDialog from './CommonDialog'

  export default {
    name: 'UserDialog',
    components: {
      CommonDialog
    },
    data() {
      return {
        showDialog: false,
        columns: [],
        confirmCallBack: () => {}
      }
    },
    methods: {
      confirm() {
        this.showDialog = false;
        this.confirmCallBack();
      },
      show({data}) {
        this.columns = data || [];
        this.showDialog = true;
        return new Promise((confirmCallBack) => {
          this.confirmCallBack = confirmCallBack;
        });
      },
    }
  }
</script>

<style lang="scss">
  // @import "../../assets/font/font.css";

  @import "../../assets/styles/themes.scss";

  @import "../../assets/styles/mixin.scss";

  .ds-user-dialog {
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
        padding: 0.24rem;
        .box{
          box-sizing: border-box;
          max-height: 150px;
          overflow: auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          div{
            @include font-theme('normal');
            margin: 0.16rem;
          }
        }
      }

      &-footer {
        border-top: 1px solid #eee;
        background-color: #f4f5f6;
        height: 46px;
        line-height: 46px;
        font-size: 18px;

        .__bt {
          text-align: center;
          @include font-theme("main");
        }
      }
    }
  }
</style>
