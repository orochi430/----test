<template>
  <div
    :style="{
      minHeight: `calc(100vh - ${
        $store.state.isShowAppHeader ? '0.92rem' : '0px'
      })`
    }"
    class="container"
  >
    <template v-if="list.length > 0">
      <div class="box">
        <div
          v-for="(day, idxDay) in list"
          :key="idxDay"
          :id="idxDay"
          class="card"
        >
          <div class="date">
            <span class="left"></span>
            <span>{{ day.date }}</span>
          </div>
          <div class="businfo">
            <van-collapse v-model="activeNames" :border="false">
              <van-collapse-item
                v-for="(item, idxSkd) in day.schedule"
                :key="idxSkd"
                :title="`${item.time} ${item.title}`"
                :name="`${idxDay}-${idxSkd}`"
              >
                <van-cell-group inset>
                  <van-cell :value="item.position">
                    <template #title>
                      <img
                        src="static/images/peopleCongress/icon-location.png"
                        alt=""
                      />
                      <span>上车位置</span>
                    </template>
                  </van-cell>
                  <van-cell center>
                    <template #title>
                      <img
                        src="static/images/peopleCongress/ccxx-icon-ContactPerson.png"
                        alt=""
                      />
                      <span>联系人</span>
                    </template>
                    <template #default>
                      <span>{{
                        `${item.linkmanName} ${item.linkmanTel}`
                      }}</span>
                    </template>
                    <template #right-icon>
                      <img
                        v-if="item.linkmanTel"
                        src="static/images/peopleCongress/ccxx-icon-phonenumber.png"
                        alt=""
                        style="width: 0.52rem;height: 0.52rem;"
                        @click="phoneTo(item.linkmanTel)"
                      />
                    </template>
                  </van-cell>
                  <van-cell>
                    <template #title>
                      <img
                        src="static/images/peopleCongress/ccxx-icon-VehicleInformation.png"
                        alt=""
                      />
                      <span>车辆信息</span>
                    </template>
                    <template #label>
                      <div class="flex fw">
                        <div
                          v-for="(bus, idxBus) in item.buses"
                          :key="idxBus"
                          class="bus"
                        >
                          {{ bus.name }} {{ bus.number }}
                        </div>
                      </div>
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-collapse-item>
            </van-collapse>
            <div class="left-line"></div>
          </div>
        </div>
      </div>

      <div class="btn-contanier" v-if="tips">
        <div class="flex jb title" @click="showRemind = !showRemind">
          乘车温馨提示
          <van-icon :name="showRemind ? 'arrow-down' : 'arrow-up'" />
        </div>
        <div v-show="showRemind" class="tips" v-html="tips"></div>
      </div>
    </template>
    <template v-else>
      <commonempty
        :image="require('static/images/peopleCongress/img_empty.png')"
        class="file-empty"
        description="暂无数据"
      />
    </template>
  </div>
</template>

<script>
import store from "@/common/util";
export default {
  data() {
    return {
      activeNames: [],
      list: [],
      loading: null,
      meetingInfo: store.loadSessionStore("meeting"),
      currDivId: "",
      showRemind: true,
      tips: ""
    };
  },
  created() {
    let self = this;
    self.getBusInfo();
  },
  methods: {
    getBusInfo() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .post(`fn/peopleCongress/busInfo`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.type == "success") {
            self.list = result.data.schedules;
            self.list.sort(
              (a, b) => dsf.date.parse(a.date) - dsf.date.parse(b.date)
            );
            self.tips = result.data.tips;
            self.$nextTick(() => {
              if (self.list && self.list.length > 0) {
                self.initActiveNames();
                if (self.currDivId) {
                  // 页面滚动到当天的面板
                  document.getElementById(self.currDivId).scrollIntoView();
                }
              }
            });
          }
        })
        .error(error => {})
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    },
    phoneTo(tel) {
      window.location.href = `tel:${tel}`;
    },
    initActiveNames() {
      let self = this;
      let toDay = dsf.date.toDay();
      for (let i = 0; i < self.list.length; i++) {
        // 仅展开当天和未来日期的面板
        if (toDay.getTime() <= dsf.date.parse(self.list[i].date).getTime()) {
          for (let j = 0; j < self.list[i].schedule.length; j++) {
            self.activeNames.push(`${i}-${j}`);
            self.currDivId = self.currDivId || i;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.container {
  background-color: #fff;
  .box {
    padding: 0.32rem;
    margin-bottom: 2em;
    .card {
      padding-bottom: 1em;
      .date {
        font-size: var(--font_size_2);
        font-weight: 600;
        display: flex;
        .left {
          display: inline-block;
          width: 0.1rem;
          height: 0.32rem;
          margin-right: 0.1rem;
          @include background-theme("normal");
        }
      }
    }
  }

  .van-collapse {
    ::v-deep .van-collapse-item__title {
      padding: 0.2rem 0 0.2rem 0.32rem;
      font-size: var(--font_size_2);
      font-weight: 600;
      position: relative;
      overflow: initial;

      &::before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        border: 1px solid;
        @include border-color-theme("normal");
        z-index: 1;
      }
    }

    ::v-deep .van-collapse-item__content {
      padding: 0 0.32rem;
    }

    .van-cell-group {
      background-color: #f5f6f7;
      border-radius: 5px;
      overflow: hidden;

      .van-cell {
        background-color: inherit;

        &::after {
          border-bottom: 1px solid #ddd;
        }

        img {
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
        }

        // .van-cell__title {
        //     flex: inherit;
        // }
      }
    }
  }

  .bus {
    font-size: var(--font_size_3);
    padding-left: 0.32rem;
    width: 50%;
    line-height: 30px;
  }

  .businfo {
    position: relative;

    .left-line {
      position: absolute;
      width: 1px;
      height: calc(100% - 26px);
      left: 0;
      top: 26px;
      @include background-theme("normal");
    }
  }
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

.btn-contanier {
  font-size: 0.3rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff8d7;
  padding: 0.32rem;
  border-radius: 10px 10px 0 0;
  z-index: 1;
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
</style>
