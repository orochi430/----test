<template>
<div class="checkbox-dialog">
  <van-dialog v-model="isShow" :show-cancel-button="showButton" :show-confirm-button="showButton" :close-on-click-overlay='!showButton' @confirm="confirm" :before-close="beforeClose">
    <template #title v-if="showButton">
      <van-nav-bar
        :title="title"
        :left-text="leftText"
        @click-left="onClickLeft"
      />
    </template>
    <van-checkbox-group v-model="result" ref="checkboxGroup" v-if="showButton">
      <div class="diaItem" v-for="(item, index) in currentColumns" :key="index">
        <van-checkbox :name="item[showValueKey]" @click='clickCheckbox'>{{ item | showText(showTextKey) }}</van-checkbox>
      </div>
    </van-checkbox-group>
    <div v-else>
      <div class="radioItem" v-for="(item, index) in currentColumns" :key="index" @click="isShow = false;result.push(item[showValueKey]);confirm()">
        {{ item[showTextKey] }}
      </div>
    </div>
  </van-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: '选择',
      isShow: false,
      result: [],
      currentColumns: [],
      showValueKey: 'value',
      showTextKey: 'text',
      resolve: () => {},
      reject: () => {},
      multiple: true,
      showButton: true
    }
  },
  computed: {
    leftText() {
      // 单选模式下无全选功能
      if (this.multiple) {
        return this.result.length == this.currentColumns.length ? '取消全选' : '全选'
      }
      return ''
    }
  },
  filters: {
    showText: function (obj, key) {
      return key.split(',').map(k => obj[k]).join(' - ')
    }
  },
  methods: {
    show(columns, title='选择', valueKey='value', textKey='text', defaultSelectArray=[], multiple=true, showButton=true) {
      this.isShow = true
      this.result = defaultSelectArray
      this.multiple = multiple
      this.showButton = showButton
      this.title = title
      this.showValueKey = valueKey
      this.showTextKey = textKey
      this.currentColumns = columns
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    beforeClose(action, done) {
      if (action === 'confirm' && this.result.length == 0) {
        done(false)
        this.reject()
      } else {
        done()
      }
    },
    confirm() {
      if (this.result.length) {
        this.resolve(this.result)
      } else {
        this.reject()
      }
    },
    onClickLeft() {
      console.log(this.$refs)
      if (this.leftText == '全选') {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll(false)
      }
    },
    clickCheckbox() {
      // 可支持单选
      if (!this.multiple) {
        this.result = [this.result.pop()]
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.checkbox-dialog {
  ::v-deep .van-dialog__header {
    padding-top: 10px;
  }
  ::v-deep .van-dialog__content {
    max-height: 60vh;
    overflow: auto;
    padding: 16px;
    .diaItem {
      padding: 6px 0;
    }
    .radioItem {
      line-height: 38px;
      text-align: center;
      position: relative;
      &:not(:last-child)::after{
        width: 100%;
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid #ebedf0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
      }
    }
  }
}
// 空白会被浏览器保留 行为方式类似 HTML 中的 <pre> 标签 字符串中的 \n 可生效
>>>.van-checkbox .van-checkbox__label{
  white-space: pre;
}
</style>