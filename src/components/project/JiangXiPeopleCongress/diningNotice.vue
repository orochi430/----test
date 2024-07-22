<template>
  <div
    v-if="mealInfo"
    :style="{
      minHeight: `calc(100vh - ${isShowAppHeader ? '0.92rem' : '0px'})`
    }"
    class="container"
  >
    <div>
      <div class="card">
        <template v-if="true">
          <div class="meal">
            <div class="time flex jb ac">
              <div class="meal-type">
                <span class="meal-icon">
                  <img
                    :src="`static/images/peopleCongress/cyxx-1.png`"
                    alt=""
                    style="width:0.32rem;height: 0.32rem"
                  />
                </span>
                <span class="meal-title">早餐</span>
              </div>
              <span style="padding: 0 8px"
                >{{ mealInfo.breakfastStart }} -
                {{ mealInfo.breakfastEnd }}</span
              >
              <img
                class="bg"
                src="static/images/peopleCongress/cyxx-img-seal.png"
                alt=""
              />
            </div>
            <div class="time flex jb ac">
              <div class="meal-type">
                <span class="meal-icon">
                  <img
                    :src="`static/images/peopleCongress/cyxx-2.png`"
                    alt=""
                    style="width:0.32rem;height: 0.32rem"
                  />
                </span>
                <span class="meal-title">中餐</span>
              </div>
              <span style="padding: 0 8px"
                >{{ mealInfo.lunchStart }} - {{ mealInfo.lunchEnd }}</span
              >
              <img
                class="bg"
                src="static/images/peopleCongress/cyxx-img-seal.png"
                alt=""
              />
            </div>
            <div class="time flex jb ac">
              <div class="meal-type">
                <span class="meal-icon">
                  <img
                    :src="`static/images/peopleCongress/cyxx-3.png`"
                    alt=""
                    style="width:0.32rem;height: 0.32rem"
                  />
                </span>
                <span class="meal-title">晚餐</span>
              </div>
              <span style="padding: 0 8px"
                >{{ mealInfo.dinnerStart }} - {{ mealInfo.dinnerEnd }}</span
              >
              <img
                class="bg"
                src="static/images/peopleCongress/cyxx-img-seal.png"
                alt=""
              />
            </div>
          </div>
          <div class="meal">
            <div v-if="mealInfo.position" class="addr">
              <img
                src="static/images/peopleCongress/icon-location.png"
                alt=""
                class="icon"
              />
              <span>{{ mealInfo.position }}</span>
            </div>
            <div
              class="btn flex ac jc"
              @click="
                $router.push({
                  path: '/peopleCongressQrCode',
                  query: { title: encodeURI('电子餐券') }
                })
              "
            >
              <van-icon name="qr" />电子餐券
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="btn-contanier" v-if="mealInfo.tips">
      <div class="flex jb title" @click="showRemind = !showRemind">
        用餐温馨提示
        <van-icon :name="showRemind ? 'arrow-down' : 'arrow-up'" />
      </div>
      <div v-show="showRemind" class="tips" v-html="mealInfo.tips"></div>
    </div>
  </div>
  <commonempty
    v-else
    :image="require('static/images/peopleCongress/img_empty.png')"
    class="file-empty"
    description="暂无数据"
  />
</template>

<script>
import { mapState } from "vuex";
import store from "@/common/util";
export default {
  data() {
    return {
      showRemind: true,
      mealInfo: null,
      meetingInfo: store.loadSessionStore("meeting"),
      loading: null,
      startTimes: { "1": "07:00", "2": "11:40", "3": "17:20" },
      endTimes: { "1": "08:30", "2": "13:10", "3": "18:50" },
      currDivId: ""
    };
  },
  computed: {
    ...mapState({
      isShowAppHeader: state => state.isShowAppHeader
    })
  },
  created() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .post(`fn/peopleCongress/diningNotice`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.type == "success") {
            self.mealInfo = result.data;
          }
          return self.mealInfo;
        })
        .error(error => {})
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.container {
  overflow: hidden;
  background-color: #c30e12;
  position: relative;
}

.card {
  margin: 16px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 16px;

  .title {
    font-size: 22px;
    font-weight: 600;
    padding: 16px 0;
    border-bottom: 1px solid #ddd;
  }

  .meal {
    padding: 16px 0;
    position: relative;

    .time {
      font-size: var(--font_size_0);
      font-weight: 600;
      padding: 0.5em 0;
      .meal-type {
        display: flex;
        align-items: center;
      }
    }

    .meal-icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      text-align: center;
      background-color: #c30e12;
      border-radius: 50%;
      // padding: 3px;
    }

    .meal-title {
      margin-left: 0.5em;
    }

    .addr {
      font-size: var(--font_size_1);
      color: #666;
      padding: 0.2rem 0;
      .icon {
        width: 0.34rem;
        height: 0.34rem;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px dashed #ddd;
    }

    .bg {
      // position: absolute;
      width: 80px;
      height: 60px;
      right: 0;
      bottom: 16px;
    }
  }

  img {
    display: inline-block;
  }

  &:last-of-type {
    margin-bottom: 160px;
  }
}

.btn-contanier {
  font-size: 0.3rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff8ec;
  padding: 16px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -10px 20px 0px rgba(0, 0, 0, 0.06);
  .van-icon {
    border: 1px solid;
    border-radius: 50%;
    padding: 2px;
  }
  .title {
    color: #ffa92a;
  }
  .tips {
    padding-top: 0.2rem;

    ::v-deep p {
      line-height: 20px;
    }
  }
}

.btn {
  background-color: #c30e12;
  color: #fff;
  font-size: 0.36rem;
  line-height: 1rem;
  margin: 0.32rem 0;
  border-radius: 4px;
}
.file-empty {
  // display: flex;
  // flex-direction: row;
  padding: 5rem 0;

  ::v-deep .van-empty__image {
    flex: none;
    height: 2.2rem;
  }

  ::v-deep .van-empty__description {
    padding: 0;
  }
}
</style>
