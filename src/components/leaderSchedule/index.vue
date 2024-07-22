<template>
  <div
    class="leader-schedule"
    :style="{
      height: `calc(100vh - ${dsf.util.getOffsetTop()})`
    }"
  >
    <van-search v-model="keyword" sticky placeholder="搜索" @input="onSearch" :clearable="false">
      <template #left-icon>
        <i class="iconfont iconsousuo1"></i>
      </template>
      <template #right-icon v-if="keyword">
        <span @click="onSearch()">取消</span>
      </template>
    </van-search>
    <div class="card">
      <time-picker
        ref="timePicker"
        :cancel-checked="cancelChecked"
        :position-today="true"
        :hava-sch.sync="havaSch"
        :curyear.sync="curyear"
        :curmonth.sync="curmonth"
        @thisWeek="thisWeek"
        @thisMonth="thisMonth"
        @checkedDate="checkedDate"
      >
        <template #right-icon>
          <img
            src="static/images/platform/setting.svg"
            alt=""
            style="width: 0.3rem; height: 0.3rem; display: inline-block; margin-left: 0.24rem; vertical-align: sub"
            @click="showSettingPopup = true"
          />
        </template>
      </time-picker>
    </div>
    <div class="card">
      <leader-picker ref="leaderPicker" :isShowImg="setting.leaderImageShow == 0" @chooseLeader="onChooseLeader"></leader-picker>
    </div>
    <div class="state-container" v-if="setting.iconDescShow == 0">
      <span class="state state-1">
        <i></i>
        正常
      </span>
      <span class="state state-2">
        <i></i>
        变更
      </span>
      <span class="state state-0" v-if="hasPermission || isleader">
        <i></i>
        未发布
      </span>
      <span class="state state-3">
        <i>s</i>
        取消
      </span>
    </div>
    <div class="scroll-list-wrap list-container" :key="navKey" id="touchBox" @touchend="listWrapScroll">
      <cube-scroll-nav
        :side="true"
        ref="scrollNav"
        :data="list"
        :current="currentDate"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        @change="stickyChange"
      >
        <cube-scroll-nav-panel v-for="item in list" :key="item.name" :label="item.name" :title="item.name" class="date-container">
          <ul>
            <li
              v-for="leader in item.data"
              class="card leader-container"
              ref="leaderContainer"
              v-show="(leaderIds == '' || leaderIds.includes(leader.userId)) && !(leader.schedule.length == 0 && setting.emptyShowType == 1)"
            >
              <div class="user">
                <div v-show="setting.leaderImageShow == 0">
                  <img v-if="leader.photo" class="userImg" :src="dsf.url.getWebPath(leader.photo)" />
                  <img v-else class="userImg" :src="leader.sex == 1 ? femalePhoto : malePhoto" alt="" />
                  <!-- <div v-else class="userImg nameImg">
                    {{ leader.userName | filterName }}
                  </div> -->
                </div>
                <span>{{ leader.userName }}</span>
              </div>
              <div class="schedule-container">
                <div v-if="leader.schedule.length == 0" class="schedule">
                  <p v-if="setting.emptyShowType == 0" style="color: #0086d9">单位办公</p>
                </div>
                <template v-else v-for="schedule in leader.schedule">
                  <div :class="['schedule', `schedule-${schedule.state}`]" v-if="schedule.state != 0 || (hasPermission || schedule.mySchedule)">
                    <template v-if="schedule.isBusy == 1 && !hasPermission && !schedule.mySchedule">
                      <p>
                        <i class="iconfont iconshijian"></i>
                        <span>{{ schedule.time }}-{{ schedule.endTime }}</span>
                      </p>
                      <p>
                        <img src="static/images/platform/leaderSchedule/busy.svg" alt="" />
                        <span>忙碌</span>
                      </p>
                    </template>
                    <template v-else>
                      <p v-show="setting.viewColumn.includes('0') || setting.viewColumn.includes('1')" @click="toForm(schedule)">
                        <i class="iconfont iconshijian"></i>
                        <span>{{ setting.viewColumn.includes("0") ? schedule.time : "" }} {{ setting.viewColumn.includes("1") ? schedule.bt : "" }}</span>
                      </p>
                      <p v-show="schedule.isBusy == 1">
                        <img src="static/images/platform/leaderSchedule/busy.svg" alt="" />
                        <span>忙碌</span>
                      </p>
                      <p v-show="setting.viewColumn.includes('2') && schedule.place">
                        <img src="static/images/platform/leaderSchedule/place.png" alt="" />
                        <span>{{ schedule.place }}</span>
                      </p>
                      <p v-show="setting.viewColumn.includes('3') && schedule.host">
                        <img src="static/images/platform/leaderSchedule/host.svg" alt="" />
                        <span>{{ schedule.host }}</span>
                      </p>
                      <p v-show="setting.viewColumn.includes('4') && schedule.participants">
                        <img src="static/images/platform/leaderSchedule/attendant.svg" alt="" />
                        <span>
                          {{
                            setting.participantDisplay == 1
                              ? `${schedule.leader}${schedule.participantPerson ? "," + schedule.participantPerson : ""}${
                                  schedule.onotherPerson ? "," + schedule.onotherPerson : ""
                                }`
                              : `${schedule.leader}${schedule.participantDept ? "," + schedule.participantDept : ""}${schedule.onotherPerson ? "," + schedule.onotherPerson : ""}`
                          }}
                        </span>
                      </p>
                      <p v-show="setting.viewColumn.includes('6') && schedule.content">
                        <img src="static/images/platform/leaderSchedule/content.svg" alt="" />
                        <span>{{ schedule.content }}</span>
                      </p>
                    </template>
                  </div>
                </template>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <dsf-fab v-show="hasAddPermission" :fab-items="addBtn" @clickItem="btnAction('aaa')"></dsf-fab>
    <round-popup :show.sync="showSettingPopup" title="设置">
      <template #right-icon>
        <span @click="saveSettings">确定</span>
      </template>
      <template #container>
        <div v-for="(item, index) in settingKeys" :key="index" class="setting-column">
          <span class="setting-column-name">{{ item.text }}</span>
          <van-radio-group v-if="item.type == 'radio'" v-model="item.value" direction="horizontal" class="setting-column-value">
            <van-radio v-for="col in item.column" :key="col.value" :name="col.value">
              {{ col.name }}
            </van-radio>
          </van-radio-group>
          <van-checkbox-group v-else v-model="item.value" direction="horizontal" class="setting-column-value">
            <van-checkbox v-for="col in item.column" :key="col.value" :name="col.value" shape="square">{{ col.name }}</van-checkbox>
          </van-checkbox-group>
        </div>
      </template>
    </round-popup>
  </div>
</template>

<script>
import scroll from "./components/scroller.vue"
import cubeScrollNav from "./components/scroll-nav.vue"
import cubeScrollNavPanel from "./components/scroll-pannel.vue"
import cubeSticky from "./components/sticky.vue"
import timePicker from "./timePicker.vue"
import leaderPicker from "./leaderPicker.vue"
import roundPopup from "@/components/commonComponents/roundPopup.vue"
import dsfFab from "@/components/dsfFab/dsfFab";
export default {
  components: {
    timePicker,
    leaderPicker,
    roundPopup,
    scroll,
    cubeScrollNavPanel,
    cubeSticky,
    cubeScrollNav,
    dsfFab
  },
  data() {
    return {
      femalePhoto: "static/images/platform/leaderSchedule/female.png",
      malePhoto: "static/images/platform/leaderSchedule/male.png",
      navKey: 0, // 数据区域key，用于刷新滚动组件
      currentDate: "", // 当前日期，用于数据区域滚动到指定日期
      stickyDate: "", // 数据区域当前吸顶日期
      leaderIds: "", // 选中的领导id
      options: {
        pullDownRefresh: true,
        pullUpLoad: { threshold: 300 },
        scrollbar: true
      },
      showSettingPopup: false,
      keyword: "",
      havaSch: [], // 有日程的日期，用于日历组件显示日期下的点
      cancelChecked: false,
      curyear: null,
      curmonth: null,
      list: [],
      hasAddPermission: false, // 是否有新增权限
      hasPermission: false, // 是不是管理员
      isleader: false, // 是不是领导
      setting: {
        viewModel: 0,
        leaderImageShow: 0,
        viewColumn: "0,1,2",
        iconDescShow: 0,
        // busyDetailShow: 0,
        emptyShowType: 0,
        participantDisplay: "1"
      },
      settingKeys: [
        {
          text: "显示模式：",
          type: "radio",
          column: [
            // { value: 0, name: "清单模式" },
            { value: 3, name: "领导汇总" }
          ],
          key: "viewModel",
          value: 3
        },
        {
          text: "领导头像：",
          type: "radio",
          column: [
            { value: 0, name: "显示" },
            { value: 1, name: "不显示" }
          ],
          key: "leaderImageShow",
          value: 1
        },
        {
          text: "显示要素：",
          type: "checkbox",
          column: [
            { value: "0", name: "时间" },
            { value: "1", name: "名称" },
            { value: "2", name: "地点" },
            { value: "3", name: "主持人" },
            { value: "4", name: "参与人员" },
            { value: "6", name: "会议内容" }
          ],
          key: "viewColumn",
          value: ["0", "1", "2"]
        },
        {
          text: "图标说明：",
          type: "radio",
          column: [
            { value: 0, name: "显示" },
            { value: 1, name: "不显示" }
          ],
          key: "iconDescShow",
          value: 0
        },
        // {
        //   text: "忙碌详情：",
        //   type: "radio",
        //   column: [
        //     { value: 0, name: "显示" },
        //     { value: 1, name: "不显示" }
        //   ],
        //   key: "busyDetailShow",
        //   value: 0
        // },
        {
          text: "空闲显示：",
          type: "radio",
          column: [
            { value: 0, name: "单位办公" },
            { value: 1, name: "缩起区间" },
            { value: 2, name: "空白" }
          ],
          key: "emptyShowType",
          value: 0
        },
        {
          text: "参与人员：",
          type: "radio",
          column: [
            { value: "1", name: "人员名称" },
            { value: "2", name: "部门名称" }
          ],
          key: "participantDisplay",
          value: "1"
        }
      ],
      addBtn: [{
        icon: "iconjiahao",
        title: "新增",
        type: "go", // 'event'
        url: "/commonForm/230707104025XyvXLw0OS2fq4YSag9r",
        action: "",
      }],
    }
  },
  filters: {
    filterName(name) {
      return name.slice(name.length - 2)
    }
  },
  created() {
    this.getSetting()
  },
  mounted() {
    this.$refs.timePicker.dateClick()
  },
  methods: {
    // 设置只看领导，使用v-show将未选中领导数据隐藏
    onChooseLeader(val) {
      this.leaderIds = val
      this.currentDate = this.stickyDate
      this.navKey = Math.random()
    },
    // 获取设置项
    getSetting() {
      dsf.http.post("fn/leaderScheduleApi/getViewConfigByMobile").then(res => {
        if (res.data.code == 200) {
          this.hasAddPermission = res.data.data.hasAddPermission
          this.hasPermission = res.data.data.hasPermission
          this.isleader = res.data.data.leader
          Object.keys(this.setting).forEach(key => {
            this.setting[key] = res.data.data[key]
            let settingCol = this.settingKeys.find(item => item.key == key)
            if (settingCol.type == "radio") {
              settingCol.value = this.setting[key]
            } else if (settingCol.type == "checkbox") {
              settingCol.value = this.setting[key].split(",")
            }
          })
        }
      })
    },
    // 保存设置项
    saveSettings() {
      this.showSettingPopup = false
      this.settingKeys.forEach(item => {
        if (item.type == "radio") {
          this.setting[item.key] = item.value
        } else {
          this.setting[item.key] = item.value.join(",")
        }
      })
      dsf.http
        .post("fn/leaderScheduleApi/saveViewConfigByMobile", this.setting, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            dsf.layer.toast("设置成功")
          }
        })
    },
    // 切换周 获取数据用于设置是否有日程
    thisWeek(val) {
      console.log(val)
      this.getSchedule(val[0].date, val[6].date).then(data => {
        this.havaSch = data.filter(date => date.data.filter(leader => leader.schedule.length).length > 0).map(date => date.name)
      }).catch(err => {
        dsf.layer.toast(err)
      })
    },
    // 切换月 获取数据用于设置是否有日程
    thisMonth(val) {
      console.log(val)
      this.getSchedule(val[0][0].date, val[val.length - 1][6].date).then(data => {
        this.havaSch = data.filter(date => date.data.filter(leader => leader.schedule.length).length > 0).map(date => date.name)
      }).catch(err => {
        dsf.layer.toast(err)
      })
    },
    /*** 当手动点击日历某一天时触发
     * 如果吸顶日期即为该天 无任何操作
     * 如果已有数据中存在该天 滚动至该天
     * 否则重新获取数据，刷新组件
     ***/
    checkedDate(val) {
      if (this.stickyDate == val) {
        return
      }
      if (this.list.find(date => date.name == val)) {
        this.currentDate = val
      } else {
        let loadIndex = dsf.layer.loading()
        this.getSchedule(val, val).then(data => {
          this.list = data
          this.$nextTick(() => {
            this.navKey = Math.random()
          })
        }).catch(err => {
          dsf.layer.toast(err)
        }).finally(() => {
          dsf.layer.closeLoading(loadIndex)
        })
      }
    },
    // 获取日程数据
    getSchedule(startDate, endDate) {
      return new Promise((resolve, reject) => {
        dsf.http
          .get("fn/leaderScheduleApi/getDayScheduleByMobile", {
            startDate: startDate,
            endDate: endDate,
            content: this.keyword,
            userIds: ""
          })
          .then(res => {
            if (res.data.code == 200) {
              resolve(res.data.data.data)
            } else {
              reject('获取日程失败')
            }
          })
      })
    },
    // 下拉刷新获取前一天日程
    onPullingDown() {
      let firstDate = this.list[0].name
      let date = moment(firstDate).subtract(1, "days").format("yyyy-MM-DD")
      this.getSchedule(date, date).then(data => {
        this.list.unshift(data[0])
      }).catch(err => {
        dsf.layer.toast(err)
      })
    },
    // 上拉加载获取后一天日程
    onPullingUp() {
      let lastDate = this.list[this.list.length - 1].name
      let date = moment(lastDate).add(1, "days").format("yyyy-MM-DD")
      this.getSchedule(date, date).then(data => {
        this.list.push(data[0])
      }).catch(err => {
        dsf.layer.toast(err)
      })
    },
    // 列表滚动 日期吸顶改变时，联动改变日历日期
    stickyChange(val) {
      if (val) {
        // 如果日期为上一周最后一天 则日历切换至上周， 如日期为下一周第一天 则日历切换至下周
        if (this.$refs.timePicker.prev_now_next[0][6].date == val) {
          this.$refs.timePicker.onChange(0)
        } else if (this.$refs.timePicker.prev_now_next[2][0].date == val) {
          this.$refs.timePicker.onChange(2)
        }
        this.stickyDate = val
        this.currentDate = val
        this.$refs.timePicker.dateClick(val)
      }
    },
    // 列表区域touchend触发，收起日历和领导区域
    listWrapScroll() {
      if (this.$refs.timePicker.defaultShowType != "week") {
        this.$refs.timePicker.toggleShowType("week")
      }
      this.$refs.timePicker.isShowSliderContent = false
      this.$refs.leaderPicker.isShowLeader = false
    },
    // 检索
    onSearch() {
      let loadIndex = dsf.layer.loading()
      this.getSchedule(this.stickyDate, this.stickyDate).then(data => {
        dsf.layer.closeLoading(loadIndex)
        this.list = data
        this.$nextTick(() => {
          this.navKey = Math.random()
        })
      })
    },
    toForm(item) {
      this.$router.push(item.mobileClickUrl)
    }
  }
}
</script>
<style lang="scss" scoped>
$normalColor: #0086d9;
$changeColor: #ffa500;
$unpublishedColor: #e30000;

.leader-schedule {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .card {
    margin: 10px 10px 0;
    background: #ffffff;
    box-shadow: 0 1px 10px 0 rgba(191, 191, 191, 0.26);
    border-radius: 3px;
  }
  .state-container {
    margin: 10px 10px 0;
    text-align: center;
    font-size: var(--font_size_4);
    .state {
      i {
        display: inline-block;
        width: 9px;
        height: 9px;
        margin-right: 4px;
        border-radius: 50%;
      }
      &-0 {
        i {
          background-color: $unpublishedColor;
        }
      }
      &-1 {
        i {
          background-color: $normalColor;
        }
      }
      &-2 {
        i {
          background-color: $changeColor;
        }
      }
      &-3 {
        i {
          text-decoration: line-through;
        }
      }
      &:not(:last-child) {
        padding-right: 28px;
      }
    }
  }
  .list-container {
    flex: 1;
    overflow: auto;
    position: relative;
    transform: translateX(0);

    .date-container {
      .date {
        top: 0;
        right: 0;
        // width: 100vw;
        background-color: #f8f8f8;
        margin: 10px;
        text-align: right;
        font-size: 15px;
      }
      .card {
        margin: 10px;
      }
    }
    .leader-container {
      padding: 12px;
      display: flex;
      .user {
        margin-right: 10px;
        width: 44px;
        text-align: center;
        .userImg {
          width: 32px;
          height: 32px;
          border-radius: 2px;
          display: inline-block;
          margin-bottom: 4px;
        }
        .nameImg {
          background-color: var(--normal);
          line-height: 32px;
          text-align: center;
          font-size: var(--font_size_4);
          color: #fff;
        }
        span {
          font-weight: 600;
          display: inline-block;
        }
      }
    }
    .schedule-container {
      flex: 1;
      .schedule {
        font-size: var(--font_size_2);
        p {
          line-height: 24px;
          // display: flex;
          // align-items: baseline;
          i {
            font-size: var(--font_size_3);
            margin-right: 4px;
          }
          img {
            width: 14px;
            height: 14px;
            object-fit: contain;
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
            flex-shrink: 0;
          }
          span {
            line-height: 24px;
            word-break: break-all;
            vertical-align: middle;
          }
        }
        &:not(:last-child) {
          border-bottom: 1px dotted #979797;
          padding-bottom: 12px;
          margin-bottom: 12px;
        }
        &-0 {
          p:first-child {
            color: $unpublishedColor;
          }
        }
        &-1 {
          p:first-child {
            color: $normalColor;
          }
        }
        &-2 {
          p:first-child {
            color: $changeColor;
          }
        }
        &-3 {
          p span{
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
.setting-column {
  display: flex;
  font-size: var(--font_size_2);
  &-name {
    flex-shrink: 0;
    width: 30%;
  }
  &-value {
    flex: 1;
    .van-radio,
    .van-checkbox {
      width: 40%;
      margin-bottom: 16px;
    }
  }
}
</style>
<style lang="scss">
.list-container {
  .cube-scroll-nav-panel-title {
    padding: 10px;
    text-align: right;
    background-color: #f8f8f8;
    font-size: 15px;
    color: #333333;
    font-weight: 400;
  }
}
</style>
