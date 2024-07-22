<template>
  <div class="passageNetworkTransact">
    <div class="card">
      <div class="title showIcon flex jb ac">
        <span>一网通办</span>
      </div>
      <div class="tab">
        <van-tabs v-model="active" swipeable :ellipsis="false">
          <van-tab v-for="(item, index) in data" :title="item.name" :key="index">
            <div class="flex fw ja">
              <div class="content">
                <div class="flex jb ac contentTop">
                  <span>累计办件总量</span>
                  <van-icon name="arrow" />
                </div>
                <div>
                  <span class="num">4.35</span>
                  <span class="unit">亿笔</span>
                </div>
              </div>
              <div class="content">
                <div class="flex jb ac contentTop">
                  <span>累计办件总量</span>
                  <van-icon name="arrow" />
                </div>
                <div>
                  <span class="num">4.35</span>
                  <span class="unit">亿笔</span>
                </div>
              </div>
              <div class="content">
                <div class="flex jb ac contentTop">
                  <span>累计办件总量</span>
                  <van-icon name="arrow" />
                </div>
                <div>
                  <span class="num">4.35</span>
                  <span class="unit">亿笔</span>
                </div>
              </div>
              <div class="content">
                <div class="flex jb ac contentTop">
                  <span>累计办件总量</span>
                  <van-icon name="arrow" />
                </div>
                <div>
                  <span class="num">4.35</span>
                  <span class="unit">亿笔</span>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: ['itemdata'],
  data() {
    return {
      active: 0,
      data: [{
        name: "事项接入"
      }, {
        name: "办件情况"
      }, {
        name: "随申办"
      }, {
        name: "事项接入"
      },
      {
        name: "事项接入"
      }, {
        name: "事项接入"
      }, {
        name: "事项接入"
      },]
    }
  }
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.passageNetworkTransact {
  .card {
    background-color: #FFF;
    margin: 10px;
    border-radius: 6px;
    padding-top: 10px;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);

    .title {
      padding: 2px 15px 18px;
      box-sizing: border-box;
      position: relative;
      padding-right: 0.2rem;
      @include font_2;

      span:first-child {
        font-size: var(--font_size_1);
        font-weight: bold;
        color: #333;
        margin-left: -5px;
      }
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
        height: 18px;
        width: 5px;
        top: 50%;
        left: -5px;
        transform: translate(0, -50%);
        border-radius: 3px;
        @include background-theme("normal");
      }
    }
  }

  .tab {
    width: 100%;
  }

  .content {
    width: 46%;
    background: #F6F8FC;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;

    .contentTop {
      margin-bottom: 8px;
    }

    .num {
      font-size: 20px;
      color: #3389E0;
      font-weight: 700;
    }

    .unit {
      color: #3389E0;
    }
  }

}

::v-deep .van-tabs__wrap {
  height: 40px;
}

::v-deep .van-tab {
  background: #FBFCFF;
  border: 1px solid rgba(208, 212, 220, 1);
  color: #686A6F;
  border-radius: 24px;
  margin: 5px 8px 10px 8px;
  font-size: 14px;
}

::v-deep .van-tab--active {
  color: #3389E0;
  background: #E9F2FE;
  border: 1px solid rgba(51, 137, 224, 1);
}

::v-deep .van-tabs__line {
  display: none;
}

::v-deep .van-tabs__nav--line {
  padding: unset;
}
</style>
  