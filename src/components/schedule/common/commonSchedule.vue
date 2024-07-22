<template>
  <div class="ds-schedule">
    <keep-alive>
      <div class="tab_box">
        <van-sticky class="sticky" :offset-top="dsf.util.getOffsetTop()" ref="sticky">
          <van-tabs @click="mainTabClick" v-if="tabConfig.tabItems.length > 1" :ellipsis="false">
            <template v-for="(item, index) in tabConfig.tabItems">
              <van-tab v-if="item.privilegeShow" :title="item.tabname" :key="index">
                <div slot="title" class="tab_title">{{ item.tabname }}</div>
                <div slot="default" class="tab_content">
                  <van-tabs v-model="item.active" ref="subTabs" v-if="item.tabItems && item.tabItems.length" @click="timePickerResize()">
                    <van-tab :title="itm.tabname" v-for="(itm, idx) in item.tabItems" :key="idx">
                      <div slot="title" class="tab_title" @click="itemTabClick(item, itm)">
                        {{ itm.tabname }}
                      </div>
                      <div slot="default" class="tab_content"></div>
                    </van-tab>
                  </van-tabs>
                </div>
              </van-tab>
            </template>
          </van-tabs>
          <time-picker ref="timePicker" v-show="currentTab.type == 'date'" :end-slider-call-back="endSliderCallBack"
            :active-bgcolor="activeBgcolor" :active-textcolor="activeTextcolor" :today-dotcolor="todayDotcolor"
            :start-number="startNumber" :click-mode="clickMode" :hava-sch.sync="havaSch" :cancel-checked="cancelChecked"
            :curyear.sync="curyear" :curmonth.sync="curmonth" @thisWeek="thisWeek" @thisMonth="thisMonth"
            @checkedDate="checkedDate" @toggleShowType="toggleShowType(arguments)"></time-picker>
        </van-sticky>
        <div>
          <select-leader ref="leaderSelect" v-show="currentTab.type == 'leader'" @selectLeader="selectLeader"
            @selectLeaderWeek="selectLeaderWeek" :main-tab="mainTab"></select-leader>
          <schedule-list ref="list" :week="week" :month="month" :has-sch.sync="havaSch" :selected-date="selectedDate"
            :current-tab="currentTab" :select-leader-list="selectLeaderList" :leader-week="leaderWeek"
            :showType="defaultShowType" :curyear="curyear" :curmonth="curmonth"></schedule-list>
        </div>
        <dsf-fab v-show="currentTab.isShowAddIcon" :fab-items="addBtn" @clickItem="btnAction('aaa')"></dsf-fab>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import timePicker from "./timePicker";
import SelectLeader from "./selectLeader";
import ScheduleList from "./commonScheduleList";
import dsfFab from "@/components/dsfFab/dsfFab";
export default {
  name: "ScheduleCenter",
  props: ["tabKey"],
  components: {
    ScheduleList,
    timePicker,
    dsfFab,
    SelectLeader,
  },
  filters: {
    privilegeShow(val) {

    }
  },
  data() {
    return {
      endSliderCallBack: null,
      activeBgcolor: "#FF6A00",
      activeTextcolor: "#FFFFFF",
      todayDotcolor: "#FFFFFF",
      startNumber: 1,
      clickMode: "month",
      cancelChecked: false,
      havaSch: [], //存在数据的日期
      listData: [], //接口返回的数据列表的数据
      notHavedata: false, //接口有没有数据
      selectedDate: null,
      week: [],
      month: [],
      addUrl: `/commonForm/${dsf.config.scheduleCenter.commonListModuleId}`,
      addBtn: [{
        icon: "iconjiahao",
        title: "新增",
        type: "go", // 'event'
        url: "",
        action: "",
      }],
      tabConfig: null,
      currentTab: null,
      selectLeaderList: [],
      leaderWeek: [],
      defaultShowType: "week",
      curyear: null,
      curmonth: null,
      mainTab: null,
    };
  },
  mounted() {
    // let title = this.$route.query.titleName
    // document.title = title || '教学资料';
    this.addBtn[0].url = this.getUrl
  },
  activated() {
    // this.init();
    this.$refs.timePicker.toggleShowType("week");
  },
  created() {
    this.init();
  },
  computed: {
    getUrl() {
      return this.addUrl + "?defaultDate=" + (this.selectedDate || moment().format("YYYY-MM-DD"))
    }
  },
  watch: {
    mainTab(val) {
      if (val.tabItems.find(tab => tab.type == 'leader'))
        this.$refs.leaderSelect.init(val.tabItems.find(tab => tab.type == 'leader').url);
    },
    getUrl() {
      this.addBtn[0].url = this.getUrl
    }
  },
  methods: {
    init() {
      let keyName = this.tabKey || this.$route.params.key || "default";
      this.tabConfig = dsf.config.homePage.schedule[keyName];
      this.tabConfig.tabItems.forEach((item, index) => {
        if (!item.privilege) {
          item.privilegeShow = true
        } else {
          let privileges = dsf.util.loadSessionStore("user") ? dsf.util.loadSessionStore("user").privileges : [];
          if (privileges.filter(privilege => privilege.name == item.privilege).length) {
            item.privilegeShow = true
          } else {
            item.privilegeShow = false
          }
        }

        if (item.tabItems && item.tabItems.length) {
          item.tabItems.forEach((itm, idx) => {
            if (idx == 0) {
              itm.isActive = true;
            } else {
              itm.isActive = false;
            }
          });
        }
        if (!item.tabItems) {
          if (index == 0) this.currentTab = item
          if (item.type == "leader") {
            this.$nextTick(() => {
              this.$refs.leaderSelect.init(item.url)
              if (!this.leaderWeek.length) {
                this.$refs.leaderSelect.selectWeek('current');
              }
            })
          }
        }
        if (item.tabItems && item.tabItems.length && index == 0) {
          this.currentTab = item.tabItems[0];
        }
      });

      // console.log('init-this.currentTab', this.currentTab);
    },
    mainTabClick(name, title) {
      this.timePickerResize()
      let tempTab = this.tabConfig.tabItems.filter(
        (item) => item.tabname == title
      )[0];
      tempTab.active = 0
      if (tempTab.tabItems && tempTab.tabItems.length) {
        //this.currentTab = tempTab.tabItems.filter((item) => item.isActive)[0];
        this.currentTab = tempTab.tabItems[0];
        tempTab.tabItems.forEach((item, index) => {
          if (index == 0) {
            // this.activeName=item.tabname;
            item.isActive = true;
          }
          else {
            item.isActive = false;
          }
        });
        this.mainTab = tempTab
        this.selectLeaderList = [];
      } else {
        this.currentTab = tempTab;
      }
      // console.log('mainTabClick-this.currentTab', this.currentTab);
      this.cancelChecked = true;
      this.selectedDate = "";
      // this.leaderWeek=this.$ref.;

      if (this.currentTab.type == "date") {
        let tempArr = this.week.filter((item) => item.isToday);
        if (tempArr.length && this.currentTab.getDataType == "day") {
          // console.log(this.$refs.timePicker)
          //this.$refs.timePicker.initTimer(tempArr[0].date);
          if (dsf.config.homePage.schedule.defaultToday && this.$refs.timePicker.checkedDate == dsf.date.format(new Date(), 'yyyy-mm-dd')) {
            this.$refs.timePicker.dateClick({ date: this.$refs.timePicker.checkedDate })
          } else {
            this.$refs.timePicker.toggleShowType("week");
          }
          //this.$refs.timePicker.dateClick(tempArr[0], tempArr[0]);
          if (this.currentTab.params && this.currentTab.params.type == "other") {
            dsf.http.post('/fn/scheduleList/queryMobileShare').then((res) => {
              if (res.data.code == 200) {
                this.selectLeaderList = res.data.data.map((item) => item.id);
              } else {
                dsf.layer.toast("获取数据失败,请稍后再试");
              }
            }).catch((err) => console.log(err));
          }
        }else if(dsf.config.homePage.schedule.defaultToday){
          setTimeout(()=>{
              this.$refs.timePicker.dateClick({ date: this.$refs.timePicker.checkedDate})
          },470)
        }
      }
      if (this.currentTab.type == "leader") {
        window.scroll(0, 0)
        if (!this.leaderWeek.length) {
          this.$refs.leaderSelect.selectWeek('current');
        }
        // this.$refs.leaderSelect.init(this.currentTab.url);
      }
    },
    itemTabClick(item, subitem) {
      this.tabConfig.tabItems.forEach((tabItem) => {
        if (
          tabItem.tabname == item.tabname &&
          tabItem.tabItems &&
          tabItem.tabItems.length
        ) {
          tabItem.tabItems.forEach((tabItm) => {
            if (tabItm.tabname == subitem.tabname) {
              tabItm.isActive = true;
              this.currentTab = tabItm;
            } else {
              tabItm.isActive = false;
            }
          });
        }
      });
      this.cancelChecked = true;
      this.selectedDate = "";
      // this.selectLeaderList=[];
      // console.log('itemTabClick-this.currentTab', this.currentTab);
      if (this.currentTab.type == "date") {
        let tempArr = this.week.filter((item) => item.isToday);
        if (tempArr.length && this.currentTab.getDataType == "day") {
          // console.log(this.$refs.timePicker)
          if (dsf.config.homePage.schedule.defaultToday  && this.$refs.timePicker.checkedDate == dsf.date.format(new Date(), 'yyyy-mm-dd')){
            setTimeout(()=>{
              this.$refs.timePicker.dateClick({ date: this.$refs.timePicker.checkedDate})
            },200)
          } else {
            this.$refs.timePicker.toggleShowType("week");
          }

          //this.$refs.timePicker.dateClick(tempArr[0], tempArr[0]);
        }else if(dsf.config.homePage.schedule.defaultToday){
          setTimeout(()=>{
            this.$refs.timePicker.dateClick({ date: this.$refs.timePicker.checkedDate})
          },200)
        }
        if (this.currentTab.params && this.currentTab.params.type == "other") {
          dsf.http.post('/fn/scheduleList/queryMobileShare').then((res) => {
            if (res.data.code == 200) {
              this.selectLeaderList = res.data.data.map((item) => item.id);
            } else {
              dsf.layer.toast("获取数据失败,请稍后再试");
            }
          }).catch((err) => console.log(err));
        }
      } else if (this.currentTab.type == "leader") {
        if (!this.leaderWeek.length) {
          this.$refs.leaderSelect.selectWeek('current');
        }
      }
      // if (subitem) {
      //   this.$refs.leaderSelect.init(subitem.url);
      // }
    },
    thisWeek(week, isSelfToggle = false) {
      this.timePickerResize()
      this.week = week;
      // 月周切换时需要重新获取日历信息
      if (isSelfToggle) this.$refs.timePicker.reGetprev_now_next(week[0].date)
      this.$nextTick(() => {
        let tempArr = week.filter((item) => item.date == this.$refs.timePicker.checkedDate);
        if (
          tempArr.length &&
          this.currentTab.getDataType == "day" &&
          this.defaultShowType == "week"
        ) {
          //this.$refs.timePicker.dateClick(tempArr[0], tempArr[0])
          this.$refs.timePicker.defaultDateShow(tempArr[0]);
          this.selectedDate = tempArr[0].date;
        } else {
          this.selectedDate = "";
        }
      });
    },
    thisMonth(month) {
      this.timePickerResize()
      this.month = month;
      this.$nextTick(() => {
        let flag = false;
        let date = "";
        month.forEach((item) => {
          item.forEach((itm) => {
            if (itm.isToday) {
              flag = true;
              date = itm;
            }
          });
        });
        if (
          flag &&
          this.currentTab.getDataType == "day" &&
          this.defaultShowType == "month"
        ) {
          // this.$refs.timePicker.dateClick(date, date)
          this.$refs.timePicker.defaultDateShow(date);
          this.selectedDate = date.date;
        } else {
          this.selectedDate = "";
        }
      });
    },
    checkedDate(day) {
      //console.log();
      this.cancelChecked = false;
      this.selectedDate = day;
      this.$nextTick(() => {
        if (day != "") {
          this.listGetData(day, day);
        } else {
          if (this.defaultShowType == "week") {
            this.listGetData(this.week[0].date, this.week[6].date);
          } else {
            this.listGetData(
              moment(`${this.curyear}-${this.curmonth + 1}`).startOf('month').format("YYYY-MM-DD"),
              moment(`${this.curyear}-${this.curmonth + 1}`).endOf('month').format("YYYY-MM-DD")
            );
          }
        }
      });
    },
    toaddScheduleAdd() {
      if (dsf.config.scheduleCenter.isCommonList) {
        this.$router.push({
          path: `/commonForm/${dsf.config.scheduleCenter.commonListModuleId}`,
        });
        return;
      }
      this.$router.push({
        path: "/scheduleAdd",
      });
    },
    selectLeader(data) {
      this.selectLeaderList = data.selectLeaderList;
    },
    selectLeaderWeek(data) {
      this.leaderWeek = [data.leaderWeekSdate, data.leaderWeekEdate]
      console.log(this.$refs.leaderSelect.$el.offsetHeight)
      // this.$nextTick(() => {window.scroll(0, this.$refs.leaderSelect.$el.offsetHeight)})
    },
    toggleShowType(val) {
      this.timePickerResize()
      let type = val[0]
      let isSelfToggle = val[1]
      this.defaultShowType = type;
      let hasSch = [];
      let checkedDate = this.$refs.timePicker.checkedDate
      let checkedWeek = checkedDate ? this.month.filter(week => week.find(day => day.date == checkedDate))[0] : this.week
      // this.$refs.timePicker.checkedDate = "";
      if (type == "week") {
        // this.listGetData(this.week[0].date, this.week[6].date);
        if(dsf.config.homePage.schedule.defaultToday){
          this.thisWeek(checkedWeek, isSelfToggle);
          setTimeout(()=>{
              this.$refs.timePicker.dateClick({ date: this.$refs.timePicker.checkedDate})
          },100)
        }else{
          this.thisWeek(checkedWeek, isSelfToggle);
        }
      } else {
        // this.listGetData(
        //   this.month[0][0].date,
        //   this.month[this.month.length - 1][6].date
        // );
        if(dsf.config.homePage.schedule.defaultToday){
          this.thisMonth(this.month);
          setTimeout(()=>{
            this.$refs.timePicker.dateClick({ date: this.$refs.timePicker.checkedDate})
          },100)
        }else{
          this.thisMonth(this.month);
        }
      }
    },
    listGetData(sdate, edate) {
      this.$refs.list.initfn(sdate, edate);
    },
    timePickerResize() { // van-sticky有吸顶距离时，父元素只在渲染时计算一次高度，后改变吸顶元素的高度不再计算，通过手动计算解决
      if (this.$store.state.isShowAppHeader) {
        this.$nextTick(() => {
          let height = 10
          this.$refs.sticky.$children.forEach(item => {
            height += item.$el.offsetHeight
          })
          this.$refs.sticky.$el.style.height = height + 'px'
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
// @import "../../assets/font/font.css";
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.sticky ::v-deep .van-sticky {
  background-color: #f5f5f5;
}

.add {
  position: fixed;
  right: 12px;
  bottom: 85px;
  width: 50px;
  height: 50px;
  @include background-theme("normal");
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  .van-icon {
    font-size: 22px;
    font-weight: bold;
  }
}
</style>
