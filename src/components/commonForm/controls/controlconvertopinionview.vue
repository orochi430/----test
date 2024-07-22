<template>
  <div class="controlconvertopinionview">
    <div class="opinionBox" v-for="(item, index) in opinion" :key="index">
      <!-- <div class="opinionType" v-show="isShowType(item, index)" style="font-weight: bold">{{ item.nodeName }}:</div>
      <div v-show="item.deptName" style="padding: 6px 0;">{{ item.deptName }}</div> -->
      <div class="opinionText" v-show="item.opinionContent" v-html="item.opinionContent">
      </div>
      <div class="opinionText opinionImg" v-show="item.handwritePic" @click="priviewOpinionImg(item.handwritePic)">
        <img :src="item.handwritePic" alt="" :style="{ width: dsf.config.commonFlow.opinionImgWidth || '50%' }">
      </div>

      <div class="attachWrap" v-if="item.opinionFiles && item.opinionFiles.length > 2">
        <div v-for="(itm, index) in item.opinionFiles" class="attach" @click="priview(itm)">
          <div class="title">{{ itm.fileName }}</div>
          <div class="icon elps"><img :src="dsf.util.getFileTypeIcon(itm.fileName)" alt=""><span>{{ dsf.util.filesizeTostr(itm.fileSize) }}</span></div>
        </div>
      </div>
      <div class="opinionTime tr" v-show="item.rDateTimeShow">
        <img v-if="item.signPhoto && !dsf.config.commonForm.hideOpinionSignPhoto" :src="dsf.url.getWebPath(item.signPhoto)" alt="">
        <i v-else>{{ item.userName }}&nbsp;</i>
        {{ item.rDateTimeShow }}
      </div>
    </div>

  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  mixins: [propMixin],
  props: ["parameters", "formMeta"],
  data() {
    return {
      opinion: [],
      controlData: {},
    };
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let params = {
        pk: this.parameters.pk,
        moduleId: this.parameters.moduleId,
        showNode: this.metaData.extra.showNode,
        opinionFilter: this.metaData.extra.opinionFilter,
        opinonSource: this.metaData.extra.opinonSource,
        orderType: this.metaData.extra.orderType,
        moduleIds: this.metaData.extra.moduleIds
      }
      dsf.http.post("fn/convertOpinion/convertOpinionView", params).then(res => {
        if (res.data.type = "success") {
          this.opinion = res.data.data
        }
        else
          dsf.layer.toast(res.data.message)
      })
    },
    isShowType(item, index) { // 只有相同流程节点的第一个显示节点名称
      if (index == 0) {
        return item.nodeName
      } else {
        return item.nodeName && item.nodeName != this.opinion[index - 1].nodeName
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.controlconvertopinionview {
  .tr {
    text-align: right;
  }

  .opinionBox {
    // padding-left: 15px;
    position: relative;
    margin: 10px 0 5px;
    color: #333;
    // border: 1px solid #eee;
    // padding: 10px;
    // border-radius: 2px;
    .opinionText {
      // margin-top: 5px;
      // min-height: 30px;
      font-size: var(--font_size_0);
      font-weight: 600;
      // text-indent: 1em;
      padding-bottom: 12px;
    }

    .opinionImg {
      display: flex;
      justify-content: flex-end;
    }
    .opinionTime {
      font-size: var(--font_size_2);
      color: #333;
      img {
        width: auto;
        height: 34px;
        display: inline-block;
        vertical-align: bottom;
      }
    }
    // &:first-child {
    //     margin-top: 5px;
    // }

    &:not(:first-child)::before {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: 0;
      top: -5px;
      left: 0;
      border-bottom: 1px solid #ebedf0;
    }

    .opinionFile {
      margin: 6px 0;
      padding: 9px 6px;
      background-color: #eee;
      display: flex;
      align-items: center;
      border-radius: 3px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 6px;
        object-fit: contain;
      }
      .info {
        flex: 1;
        overflow: hidden;
        font-size: var(--font_size_3);
        .sub {
          font-size: var(--font_size_4);
        }
      }
    }
  }
}
</style>