<template>
  <div class="ds-links-dialog">
    <common-dialog :close-on-click-modal="false" :show.sync="showDialog">
      <div class="__links_box">
        <div class="__links_box-header">
          <div class="__title">请选择要发送的环节：</div>
        </div>
        <div class="__links_box-body">
          <van-picker ref="picker" :columns="columns" :value-key="valueKey" title="标题" />
        </div>
        <div class="__links_box-footer">
          <div class="__bt" @click="cancel">取消</div>
          <div class="__bt confirm" @click="confirm">确定</div>
        </div>
      </div>
    </common-dialog>
  </div>
</template>

<script>
  import CommonDialog from './CommonDialog'

  export default {
    name: 'LinksDialog',
    components: {
      CommonDialog
    },
    data() {
      return {
        showDialog: false,
        picker: null,
        // 选项对象中，选项文字对应的键名
        valueKey: 'text',
        // 对象数组，配置每一列显示的数据
        columns: [],
        resolve: () => {},
        reject: () => {}
      }
    },
    mounted() {
      this.picker = this.$refs.picker;
    },
    methods: {
      show({
        data,
        valueKey
      }) {
        this.columns = data || [];
        this.valueKey = valueKey || 'text';
        this.showDialog = true;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });

      },
      confirm() {
        this.picker.confirm();
        this.resolve(this.picker.getValues()[0]);
      },
      cancel() {
        this.showDialog = false;
        this.reject();
        setTimeout(() => {
          this.columns = [];
          this.valueKey = 'text';
        }, 0);
      }
    }
  }
</script>

<style scoped lang="scss">
  // @import "../../assets/font/font.css";

  @import "../../assets/styles/themes.scss";

  @import "../../assets/styles/mixin.scss";

  .ds-links-dialog {
    .__links_box {
      width: 100%;

      &-header {
        height: 46px;
        border-bottom: 1px solid #eee;
        background-color: #f4f5f6;

        .__title {
          line-height: 46px;
          padding: 0 20px;
          font-size: var(--font_size_2);
          font-weight: bold;
          color: #777;
        }
      }

      &-body {
        width: 100%;
        height: 220px;
      }

      &-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #f4f5f6;
        border-top: 1px solid #eee;
        height: 46px;
        line-height: 46px;
        font-size: var(--font_size_2);

        .__bt {
          flex: auto;
          text-align: center;
          border-left: 1px solid #e7e7e7;
          color: #666;

          &.confirm {
            @include font-theme("main");
          }

          &:first-child {
            border: none;
          }
        }
      }
    }
  }
</style>
