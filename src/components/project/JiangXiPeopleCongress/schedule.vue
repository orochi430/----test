<template>
  <div>
    <div v-if="schedules.length > 0">
      <template v-if="$route.name == 'peopleCongressSch'">
        <div v-for="day in schedules" :key="day.date" class="day-box">
          <div class="day">{{ day.date }}</div>
          <van-cell-group :border="false" inset>
            <van-cell
              v-for="(schedule, index) in day.agendas"
              :key="index"
              :title="schedule.title"
              :to="{
                name: 'peopleCongressScheduleDetail',
                params: { agendaId: schedule.id }
              }"
              is-link
            />
          </van-cell-group>
        </div>
      </template>
      <template v-else>
        <div v-for="day in schedules" :key="day.date" class="day-box">
          <div class="day">
            <i v-if="false" class="iconfont iconricheng1"></i>{{ day.date }}
          </div>
          <div class="schedules">
            <div>
              <div v-for="(schedule, index) in day.agendas" :key="index">
                <schedule-item
                  :schedule="schedule"
                  :is-fold="isFold"
                ></schedule-item>
              </div>
            </div>
            <div class="left-line"></div>
          </div>
        </div>
      </template>
    </div>
    <div v-else class="flex">
      <commonempty
        :image="require('static/images/peopleCongress/img_rcap.png')"
        class="schedule-empty"
        description="暂无日程安排"
      />
    </div>
  </div>
</template>

<script>
// import {
//     meetings
// } from './test'
import scheduleItem from "./components/scheduleItem";
export default {
  components: {
    scheduleItem
  },
  props: {
    allSchedules: {
      type: Array
    },
    meetingId: {
      type: String
    },
    isFold: {
      type: Boolean
    }
  },
  data() {
    return {
      schedules: [],
      loading: null
    };
  },
  watch: {
    allSchedules: function(newValue, oldValue) {
      this.schedules = newValue;
    }
  },
  created() {
    let self = this;
    self.init();
  },
  mounted() {},
  methods: {
    init() {
      let self = this;
      if (self.allSchedules) {
        // 首页子组件传参
        self.schedules = self.allSchedules;
      } else {
        // 点击更多
        self.loading = dsf.layer.loading();
        dsf.http
          .post(`fn/peopleCongress/myAgendas`, {
            meetingId: self.$route.params.meetingId
          })
          .done(result => {
            if (result.type == "success") {
              self.schedules = result.data;
            }
          })
          .error(err => {
            console.log("myAgendas-err", err);
            // dsf.layer.toast("数据获取失败！");
          })
          .always(() => {
            dsf.layer.closeLoading(self.loading);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.day-box {
  //   background-color: #fff;
  overflow: hidden;
  padding: 0 0 0.32rem 0.32rem;
  .day {
    // background-color: #fff;
    i {
      @include font-theme("normal");
      margin-right: 0.1rem;
    }
  }
  .schedules {
    position: relative;
  }
  .left-line {
    position: absolute;
    width: 1px;
    height: calc(100% - 26px);
    left: 0;
    top: 26px;
    @include background-theme("normal");
  }

  .van-cell-group {
    margin: 0 16px 10px;
    background-color: #f5f6f7;

    .van-cell {
      padding: 10px;
      background-color: inherit;

      &::after {
        border-bottom: 1px solid #ddd;
      }
    }
  }

  &:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #cfcfcf;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

.schedule-empty {
  display: flex;
  flex-direction: row;
  padding: 0.2rem 0.5rem;

  ::v-deep .van-empty__image {
    flex: none;
  }

  ::v-deep .van-empty__description {
    padding: 0;
  }
}

.flex {
  justify-content: center;
  height: 100vh;
}
</style>
