<template>
<div class="WorkerScheduleComponents">
  <div class="card">
    <div class="title showIcon flex jb ac">
        <span>日程中心</span>
          <!-- <span class="more flex jc ac" @click="$router.push('/commonSchedule/default?title=日程')"><van-icon name="arrow" color="#999" /></span> -->
        <div>
          <i class="iconfont iconxinzeng" style="padding-right: 0.2rem;color: #999" @click="$router.push(`/commonForm/${dsf.config.scheduleCenter.commonListModuleId}?title=日程`)"></i>
          <van-icon name="arrow" color="#999" size="0.32rem" @click="$router.push('/commonSchedule/default?title=日程')"/>
        </div>
    </div>
    <time-picker ref="timePicker" :end-slider-call-back="endSliderCallBack"
      :start-number="startNumber" :click-mode="clickMode" :hava-sch.sync="havaSch" :cancel-checked="cancelChecked"
      :curyear.sync="curyear" :curmonth.sync="curmonth" @thisWeek="thisWeek" @thisMonth="thisMonth"
      @checkedDate="checkedDate" @toggleShowType="toggleShowType(arguments)" :isShowMonth="false">
    </time-picker>
    <div class="list" v-if="list.length">
      <div class="list-item" v-for="(item, index) in list[0]" :key="index" @click="toForm(item)">
        <!-- <div class="title ellipsis">{{item.content}}</div>
        <div class="flex jb sub">
          <span v-if="item.place" class="ellipsis"><van-icon name="location-o" />{{ item.place }}</span>
          <span style="flex-shrink: 0;"><van-icon name="clock-o" />{{ item.sdate }} - {{ item.edate }}</span>
        </div> -->
        <div class="time">{{item.time}}</div>
        <div class="title ellipsis">{{item.content}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import timePicker from "@/components/schedule/common/timePicker";
const groupBy = require("lodash/groupBy.js"); //以后lodash函数按需引入,减少打包体积
export default {
  components: {timePicker},
  data() {
    return {
      endSliderCallBack: null,
      startNumber: 1,
      clickMode: "month",
      havaSch: [], //存在数据的日期
      curyear: null,
      curmonth: null,
      cancelChecked: false,
      defaultShowType: 'week',
      selectedDate: '',
      list: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.timePicker.dateClick({date: dsf.date.format(new Date(), 'yyyy-mm-dd')});
    })
  },
  activated() {
    this.checkedDate(this.$refs.timePicker.checkedDate)
  },
  methods: {
    toForm(item) {
      //目前只支持进入个人日程表单
      // if (item.moduleId != "180719094152MnF6C2hEPtqIvhjJIxo") return;
      if (item.agendaId || item.id || item.pk) {
          this.$router.push({
              name: "commonForm",
              params: {
                  pk: item.agendaId || item.id || item.pk,
                  moduleId: '180719094152MnF6C2hEPtqIvhjJIxo',
              },
              query: {
                  title: '日程'
              }
          });
      }
    },
    checkedDate(day) {
      //console.log();
      this.cancelChecked = false;
      this.selectedDate = day;
      console.log(day)
      this.$nextTick(() => {
        this.setInference(day, day);
      });
    },
    toggleShowType(val) {
      console.log(val[0])
      this.defaultShowType = val[0]
    },
    thisWeek(week) {
      if (this.defaultShowType == 'week') {
        console.log(week)
        this.setInference(week[0].date, week[6].date);
      }
    },
    thisMonth(month) {
      if (this.defaultShowType == 'month') {
        console.log(month)
        this.$nextTick(() => {
          this.setInference(
            moment(`${this.curyear}-${this.curmonth + 1}`).startOf('month').format("YYYY-MM-DD"),
            moment(`${this.curyear}-${this.curmonth + 1}`).endOf('month').format("YYYY-MM-DD")
          )
        })
      }
    },
    setInference(sdate, edate) {
      let url = 'fn/scheduleList/queryMobileData'
      let params = {
        leaderId: 0,
        type: 'personal',
        MODULE_ID: '180719094152MnF6C2hEPtqIvhjJIxo',
        requestEnv: 'mobile',
        unitId: dsf.util.loadSessionStore('user').unitId,
        sdate: sdate,
        edate: edate
      }
      this.getData(url, params)
    },
    getData(url, param, scrollType) {
        dsf.http.post(url, param)
            .then(args => {
                if (args.data.type === "success") {
                    const data = args.data.data;
                    let havaSch = [];
                    this.list = [];
                    data.forEach((item) => {
                        if (item.schedule && item.schedule.length > 0) {
                            let arr = []
                            havaSch.push(item.date);
                            item.schedule.map((sch) => {
                                sch.date = moment(item.date).format("MM-DD");
                                sch.sdate = moment(sch.startTime).format("MM/DD HH:mm");
                                sch.edate = moment(sch.endTime).format("MM/DD HH:mm");
                            });
                            arr = groupBy(item.schedule, function (val) {
                                return val.userName
                            })
                            console.log(this.selectedDate)
                            if (item.date == this.selectedDate) {
                              this.list = Object.values(arr)
                            }
                        }
                    });
                    if (param.sdate !== param.edate) {
                      let today = moment().format('yyyy-MM-DD')
                      this.havaSch = havaSch
                      if (havaSch.length && !(moment(today).isSameOrAfter(param.sdate) && moment(today).isSameOrBefore(param.edate))) {
                        this.$refs.timePicker.dateClick({ date: havaSch[0] })
                      } else if(moment(today).isSameOrAfter(param.sdate) && moment(today).isSameOrBefore(param.edate)) {
                        this.$refs.timePicker.dateClick({ date: today })
                      }
                    }
                } else {
                    this.finished = true;
                    this.dsf.layer.toast("数据请求失败，请稍后再试");
                }
            })
            .catch((error) => {
                this.finished = true;
                console.log(`接口请求失败 错误码:${error}`);
            })
            .always(() => {
                this.refreshing = false;
                this.loading = false;
                if (this.list.length == 0) {
                    this.screenHeight = document.documentElement.clientHeight - 180;
                }
            });
    },
  }
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.WorkerScheduleComponents {
  .card {
    background-color: #FFF;
    margin: 10px;
    border-radius: 6px;
    padding: 10px 0 0;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);
    >.title {
      padding: 2px 15px;
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
      .more {
        border-radius: 50%;
        // @include background-theme("normal");
        float: right;
        width: 16px;
        height: 16px;
        font-size: 10px;
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
  }
  .week-slider {
    margin: 0;
  }
  .list {
    // padding: 15px 0;
    margin: 0 10px;
    // padding-bottom: 15px;
    .list-item {
      // &:not(:last-child) {
      //   padding-bottom: 10px;
      //   margin-bottom: 10px;
      //   border-bottom: 1px solid #e2e2e2;
      // }
      &:not(:last-child) {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 5px;
          border-right: 1px dashed #e2e2e2;
          height: 100%;
        }
      }
      display: flex;
      align-items: baseline;
      .title {
        font-size: var(--font_size_3);
        color: #333;
        padding-bottom: 15px;
      }
      .time {
        padding: 0 16px;
        position: relative;
        color: #666;
        font-size: var(--font_size_4);
        &:after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--normal);
          border-radius: 50%;
          top: 50%;
          left: 0;
          transform: translateY(-50%) translateX(50%);
        }
        &:before {
          content: '';
          background: #FFFFFF;
          border: 1px solid var(--normal);
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: 50%;
          left: -4px;
          transform: translateY(-50%) translateX(50%);
        }
      }
    }
    // .title {
    //   padding-bottom: 10px;
    // }
    // .sub {
    //   color: #666;
    //   font-size: var(--font_size_4);
    //   i {
    //     font-size: var(--font_size_2);
    //     padding-right: 5px;
    //     vertical-align: sub;
    //   }
    // }
  }
}
</style>
