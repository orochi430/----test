<template>
  <div class="unifiedNetworkManagement">
    <div class="card">
      <div class="title showIcon flex jb ac">
        <span>一网统管</span>
      </div>
      <div class="csrc">
        <div class="header flex ac">
          <img src="static/images/project/yunzhengtong/csrc.png" alt="">
          <span>城市人车</span>
        </div>
        <div class="csrcDetail">
          <div class="csrcDetailLetf flexColumn">
            <span class="numBlue">2622.7</span>
            <span class="remark">当前在沪</span>
            <span class="unit">（万人）</span>
          </div>
          <div class="csrcDetailRight">
            <div class="flexColumn">
              <span class="remark">大客流</span>
              <span class="unit">（当前无预警）</span>
            </div>
            <div class="flexColumn">
              <span class="numBlue">3.90</span>
              <span class="remark">迪士尼</span>
              <span class="unit">（万人）</span>
            </div>
            <div class="flexColumn">
              <span class="percent">42%</span>
            </div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="csrcDetail">
          <div class="csrcDetailLetf flexColumn">
            <span class="numBlue">46.98</span>
            <span class="remark">当前在途</span>
            <span class="unit">（万车次）</span>
          </div>
          <div class="csrcDetailRight">
            <div class="flexColumn" style="width: 25%;">
              <span class="remark">交通拥堵指数</span>
              <van-icon name="question-o" />
            </div>
            <div class="flexColumn">
              <span class="numBlue" style="color: #00B078;">29.2</span>
              <span class="remark">地面套路</span>
            </div>
            <div class="flexColumn">
              <span class="numBlue" style="color: #00B078;">29.9</span>
              <span class="remark">快速路</span>
            </div>
            <div class="flexColumn">
              <span class="numBlue" style="color: #00B078;">3.6</span>
              <span class="remark">高速路</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sdq">
        <div class="header flex ac">
          <img src="static/images/project/yunzhengtong/sdq.png" alt="">
          <span>水电气</span>
        </div>
        <div class="sdqDetail">
          <div class="sdqDetailContent flexColumn">
            <span class="numBlue">2135.96</span>
            <span class="remark">电网实时负荷</span>
            <span class="unit">（万千瓦）</span>
            <van-progress style="width: 90%; margin: 8px;" ref="progress" :percentage="50" track-color="#E0EFFF" color="#3389E0"
              :show-pivot="false" />
              <span class="percent">50%</span>
          </div>
          <div class="sdqDetailContent flexColumn">
            <span class="numBlue">2135.96</span>
            <span class="remark">水网实时负荷</span>
            <span class="unit">（万立方米）</span>
            <van-progress style="width: 90%; margin: 8px;" ref="progress" :percentage="70" track-color="#E0EFFF" color="#3389E0"
              :show-pivot="false" />
              <span class="percent">70%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: ['itemdata'],
  data() {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.unifiedNetworkManagement {
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

  .sdq,
  .csrc {
    padding: 0 10px;

    .header {
      img {
        width: 26px;
      }

      span {
        margin-left: 5px;
        color: black;
        font-size: 16px;
        font-weight: 600;
      }
    }

    .csrcDetail {
      width: 100%;
      background: #F6F8FC;
      border-radius: 10px;
      padding: 15px 10px;
      display: flex;
      margin: 10px 0;

      .csrcDetailLetf {
        width: 30%;
        border-right: 1px solid rgba(223, 223, 223, 1);
      }

      .csrcDetailRight {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .percent {
          display: block;
          color: #00B078;
          background-color: #e4fff7;
        }
      }
    }

    .sdqDetail {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10px 0;

      .sdqDetailContent {
        padding: 15px 10px;
        width: 49%;
        background: #F6F8FC;
        border-radius: 10px;
        .percent {
          color: #3389E0;
          font-size: 14px;
        }
      }
    }


    .flexColumn {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .numBlue {
      color: #3389E0;
      font-size: 19px;
      font-weight: 600;
    }

    .remark {
      font-size: 14px;
      text-align: center;
      color: #666;
    }

    .unit {
      font-size: 12px;
      color: #666;
    }
  }

}
</style>
  