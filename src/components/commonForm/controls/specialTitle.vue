<template>
<div class="special-title">
  <div class="avatar">
    <img :src="avatar" :onerror="default_avatar" alt="">
  </div>
  <div class="info">
    <div class="title">{{title}}</div>
    <div v-if="promoter">
      所属部门：<span class="promoter">{{promoter}}</span>
    </div>
    <div v-if="status" :style="{color: status.value == 2 ? '#13ba84' : '#E6A23C'}">
      {{status.text}}
    </div>
    <!-- <div class="opinion" v-if="opinionText">{{opinionText}}</div> -->
  </div>
</div>
</template>

<script>
import propMixin from "./mixin";
export default {
  props: ["formData", "formMeta"],
  data() {
    return {
      default_avatar: 'this.src="' + require('static/images/EnterpriseServices/zj_avatar.png') + '"',
      controlData: {
        rules: [],
        maxlength: null,
        showWordLimit: true,
        placeholder: ''
      },
      readonly: false,
      opinion: this.formData.opinion
    }
  },
  computed: {
    opinionText() {
      let lastOpinion = null
      Object.values(this.opinion).forEach(nodeList => {
        nodeList.forEach(item => { // 取最后一次意见，根据时间判断
          if(!lastOpinion || dsf.date.parse(lastOpinion.opinionDate).getTime() < dsf.date.parse(item.opinionDate).getTime()) {
            lastOpinion = item
          }else if(dsf.date.parse(lastOpinion.opinionDate).getTime() == dsf.date.parse(item.opinionDate).getTime()) {
            lastOpinion = item.nodeName == this.formMeta.parameters.nodeName ? lastOpinion : item // 当前节点与上一节点时间一致时，取不是当前节点的
          }
        })
      })
      return lastOpinion ? lastOpinion.opinionContent : ''
    },
    promoter() {
      return this.formData.main['A0023'] ? this.formData.main['A0023'].value : ''
    },
    status() {
      return this.formData.main['A0009'] ? this.formData.main['A0009'] : ''
    },
    title() {
      return `${this.formData.main['A0011'] ? this.formData.main['A0011'].value : ''}发起的${this.formData.main['A0005'] ? this.formData.main['A0005'].value : ''}`
    },
    avatar() {
      return dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${this.formData.main['A0010'].value}&time=${new Date().getTime()}`)
    }
  },
  created() {
    console.log()
  },
  methods: {
    inpfn() {
      this.$emit('input', this.value)
    }
  },
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.special-title{
  // border-bottom: 1px solid #ebedf0;
  padding: 0.32rem;
  // display: flex;
  background-color: #fff;
  .avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    display: inline-block;
    vertical-align: top;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .promoter{
    @include font-theme('normal')
  }
  .opinion{
    // padding: 0 16px;
    padding-top: 5px;
    color: #E6A23C;
  }
  ::v-deep .van-field__body .van-field__control:read-only{
    color: #000 !important;
  }
  .info{
    display: inline-block;
    min-height: 72px;
    max-width: 272px;
  }
  .info>div:not(:first-child){
    padding-top: 5px;
  }
}

</style>