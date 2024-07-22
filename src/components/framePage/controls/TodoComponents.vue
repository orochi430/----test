<template>
<div class="TodoComponents">
  <div class="card">
    <div class="title showIcon flex jb ac">
        <span>待办</span>
        <span class="more flex jc ac" @click="toList"><van-icon name="arrow" color="#fff" /></span>
    </div>
    <DefaultList
      :key="refreshKey"
      :params="listParam"
      :filterData="filterData"
      @changeData="getData"
    ></DefaultList>
  </div>
</div>
</template>

<script>
import DefaultList from "@/components/documentCenter/DefaultList"
export default {
  props: ['itemdata'],
  components: { DefaultList },
  data() {
    return {
      isShow: true,
      total: '',
      refreshKey: Math.random(),
      listParam: {
        params: {
          fileType: 'gw',
          showSearchBox: false,
          justShowCard: true
        }
      },
      filterData: {
        limit: 1
      }
    }
  },
  created() {
    if (this.itemdata?.params?.showRows) {
      this.filterData.limit = this.itemdata.params.showRows
    }
  },
  activated() {
    this.isShow = true
    this.refreshKey = Math.random()
  },
  methods: {
    getData(arg) { // arg = [total, listParam]
      this.total = arg.total
      if(arg.total == 0) {
        this.isShow = false
      }
    },
    toList() {
      this.$router.push('/commonList?fileType=gw')
    }
  }
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.TodoComponents{
.card {
    background-color: #FFF;
    margin: 10px;
    border-radius: 6px;
    padding: 10px 0 0;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);
    .title {
      padding: 2px 15px 10px;
      box-sizing: border-box;
      position: relative;
      @include font_2;

      span:first-child {
          font-size: var(--font_size_1);
          font-weight: bold;
          color: #333;
          margin-left: -5px;
      }
      .more {
        border-radius: 50%;
        @include background-theme("normal");
        float: right;
        width: 16px;
        height: 16px;
        font-size: 10px;
      }
      &::after {
        position: absolute;
          box-sizing: border-box;
          content: ' ';
          pointer-events: none;
          right: 15px;
          bottom: 0;
          left: 15px;
          border-bottom: 1px dotted #cfcfcf;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
      }
    }
    .showIcon {
        span:first-child {
            padding-left: 5px;
            border-left: 5px solid #fff;
            position: relative;
            &::before {
              content: ' ';
              position: absolute;
              height: 100%;
              width: 5px;
              top: 0;
              left: -5px;
              border-radius: 3px;
              @include background-theme("normal");
            }
        }
    }
  }
  .tabs {
    ::v-deep .van-info {
      top: 50%;
      transform: translate(100%,-50%);
    }
    ::v-deep .van-tabs__nav--complete {
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .ds-list {
    padding: 0;
    background-color: #fff;
    &~.van-uploader {
      height: 0;
      display: block;
    }
    .ds-item {
      &+.ds-item {
        margin-top: 0;
        position: relative;
        &::after {
          position: absolute;
          box-sizing: border-box;
          content: ' ';
          pointer-events: none;
          right: 16px;
          top: 0;
          left: 16px;
          border-bottom: 1px dotted #cfcfcf;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      .ds-card {
        border-radius: 0;
        .ds-card-header {
          padding: 16px 10px 0;
        }
        .ds-card-content {
          padding: 0 10px 10px;
        }
        .ds-card-footer {
          display: none;
        }
      }
    }
  }
}
</style>
