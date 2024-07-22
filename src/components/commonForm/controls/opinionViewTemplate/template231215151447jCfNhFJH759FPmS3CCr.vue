<template>
  <div class="controlOpinionView">
    <div class="opinionBox">
      <div class="opinionType" v-show="metaData.extra.deptname" style="font-weight: bold">
        {{ metaData.extra.deptname }}:
      </div>
      <div class="opinionBox" v-for="(item, index) in metaData.extra.list" :key="index">
        <div :class="['opinionBoxCon', fontStyle == 'SX_FZKT' ? 'opinionBoxConFZKT' : 'opinionBoxConKT']">
          <span class="opinionTextTemp">{{ item.userName }}</span>
          <span class="opinionTextTemp">（{{ item.time | filterTime }}）</span>
          <span class="opinionTextTemp" v-show="item.opinionContent">：</span>
          <span class="opinionTextTemp" v-show="item.opinionContent" v-html="item.opinionContent"></span>
        </div>
        <div class="opinionTime tr" v-show="item.time">
          <img v-if="item.signPhoto && !dsf.config.commonForm.hideOpinionSignPhoto"
            :src="dsf.url.getWebPath(item.signPhoto)" alt="" :style="signPhotoStyle">
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: ["metaData"],
  data() {
    return {
      fontStyle: ""
    }
  },
  filters: {
    filterTime: function (value) {
      console.log(value);
      if (!value) return ''
      if (value.includes("年")) {
        return value.split("年")[1]
      } else {
        return value
      }
    }
  },
  computed: {
    signPhotoStyle() {
      if (dsf.config.commonForm.opinionSignPhotoWidth) {
        return {
          width: dsf.config.commonForm.opinionSignPhotoWidth,
          height: 'auto'
        }
      } else if (dsf.config.commonForm.opinionSignPhotoHeight) {
        return {
          height: dsf.config.commonForm.opinionSignPhotoHeight,
          width: 'auto'
        }
      } else {
        return { width: '30%' }
      }
    },
  },
  mounted() {
    this.fontStyle = this.metaData.extra.eatraClass ?? "KT"
  }
}
</script>
  
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.controlOpinionView {
  font-size: var(--font_size_2);
  width: 100%;

  .tf {
    text-align: left;
  }

  .tc {
    text-align: center;
  }

  .tr {
    text-align: right;
  }

  iframe {
    width: 100%;
    height: calc(100vh - 40px);
  }

  >>>.van-nav-bar__content {
    height: 40px;
  }

  .videoBox {
    background-color: rgba(0, 0, 0, .8);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .opinionBox {
    position: relative;
    margin: 10px 0 5px;
    color: #333;

    .opinionBoxCon {
      padding: 10px 0;
    }

    .opinionBoxConKT {}

    .opinionBoxConFZKT {
      font-family: 'SX_FZKT';
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

    .opinionBoxCon:not(:first-child)::before {
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

  .attachWrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -6px;

    .attach {
      width: calc(100% / 4 - 12px);
      margin: 6px;
      word-break: break-all;
      padding: 6px;
      background: #eee;
      border-radius: 3px;
      position: relative;

      .title {
        line-height: 16px;
        height: 48px;
        font-size: var(--font_size_4);
        @include multi-ellipsis(3)
      }

      .icon {
        padding-top: 6px;
        font-size: 10px;

        img {
          height: 16px;
          width: auto;
          display: inline-block;
          margin-right: 4px;
          vertical-align: bottom;
        }
      }

      .del {
        position: absolute;
        color: #ccc;
        top: -6px;
        right: -6px;

        i {
          font-size: var(--font_size_4);
        }
      }
    }
  }
}</style>