<template>
  <div class="ds_funList">
    <div></div>
    <van-list
      ref="list"
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :offset="10"
      class="list_wrap"
      @load="onLoad"
    >
      <div v-if="list.length > 0" slot="default" class="item_box">
        <div v-for="(item, index) in list" :key="index" class="item flex jb">
          <div style="width: 100%" @click="goForm(item, tabIndx)">
            <div class="title van-ellipsis">
              <span class="point"></span>
              <span>{{ item.date }} {{ item.time }} {{ item.content }}</span>
            </div>
            <div class="info_box fontcolor flex fontsmallSize jb">
              <div class="teacher van-multi-ellipsis--l2">
                <span>{{ item.attendant }}</span>
              </div>
              <div class="location">
                <span>{{ item.place }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <commonempty v-if="list.length == 0 && finished"></commonempty>
  </div>
</template>

<script>
export default {
  name: "ScheduleList",
  props: {
    tabIndx: [String, Number],
    selectedDate: String,
    week: Array,
    hasSch: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      finished: false,
      loading: false,
      refreshing: false,
      class: null,
      allClass: null,
      list: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 20,
      },
      screenHeight: "auto",
      previewUrl: "",
      hasRefresh: true,
      // types: ['personal', 'department', 'leader'],
      types: ["personal", "leader"],
    };
  },
  computed: {
    // ...mapState({
    //   user: state => state.user.user
    // })
  },
  watch: {
    tabIndx(val) {
      this.initfn(this.week[0].date, this.week[6].date);
    },
    selectedDate(val) {
      this.initfn(val, val);
    },
    week(val) {
      this.initfn(val[0].date, val[6].date);
    },
  },

  created() {
    console.log(this.tabIndx);
  },
  methods: {
    onLoad(isrefresh) {
      // if (!isrefresh) {
      //   this.pageConfig.pageNum++;
      //   this.initfn(this.week[0].date, this.week[6].date, true);
      // } else {
      //   this.initfn(this.keyword, false);
      // }
    },
    goForm(item, tabIndex) {
      // if(dsf.config.projectName=="xzd"){
      //sourceInfoId 和 sourceModuleId
      if (item.sourceInfoId && item.sourceModuleId) {
        this.$router.push({
          name: "commonForm",
          params: {
            pk: item.sourceInfoId,
            moduleId: item.sourceModuleId,
          },
        });
        return;
      }
      this.$router.push({
        name: "commonForm",
        params: {
          pk: item.agendaId,
          moduleId: item.moduleId,
        },
        query: {
          listId: "201203170900xK9BmlEYInRncNI7K81",
        },
      });
      return;
      // }
      if (item.agendaId && item.agendaId != "")
        this.$router.push({
          name: tabIndex === 0 ? "ScheduleDetail" : "ScheduleLeader",
          params: {
            id: item.agendaId,
            type: this.types[tabIndex],
            data: item,
          },
        });
    },
    initfn(sdate, edate) {
      this.$user ? "" : (this.$user = dsf.util.loadSessionStore("user"));
      if (!this.$user && !dsf.util.loadSessionStore("user")) {
        this.dsf.layer.toast("用户丢了, 快去登录");
        return;
      }
      if (!sdate && !edate) {
        return;
      }
      console.log(this.$user);
      let param = {
        sdate: sdate,
        edate: edate,
        unitId: this.$user.unitId,
        requestEnv: "mobile",
        MODULE_ID: "180719094152MnF6C2hEPtqIvhjJIxo",
        type: "personal",
        leaderId: 0,
        dept: "",
      };
      // if (this.tabIndx === 1) { // 部门日程
      //   param = Object.assign(param, {
      //     MODULE_ID: '',
      //     type: '',
      //     dept: 0,
      //   });
      // }
      if (this.tabIndx === 1) {
        param = Object.assign(param, {
          MODULE_ID: "191104202027u8LzPuGjn5qwqvmn9B0",
          type: "leader",
        });
      }
      this.loadData(param);
    },
    loadData(param) {
      this.list = [];
      this.loading = true;
      this.finished = false;
      console.log(this.tabIndx, param);
      let url;
      if (this.tabIndx) {
        url = "fn/ldrc/unit/getMobileWeekData";
      } else {
        url = "fn/scheduleList/queryMobileData";
      }
      if (dsf.config.projectName == "xzd") {
        url = "fn/workSchedule/getNewWeekDataNew";
      }
      this.dsf.http
        .post(url, param)
        .then((args) => {
          // this.$emit('update:hasSch', ['2020-05-13']);
          if (args.data.type === "success") {
            const data = args.data.data;
            let hasSch = [];
            data.forEach((item) => {
              if (item.schedule && item.schedule.length > 0) {
                hasSch.push(item.date);
                item.schedule.map((sch) => {
                  sch.date = moment(item.date).format("MM-DD");
                  sch.sdate = item.date;
                  sch.edate = item.date;
                });
                this.list.push(...item.schedule);
              }
            });
            if (param.sdate !== param.edate) {
              this.$emit("update:hasSch", hasSch);
            }
            this.refreshing = false;
            this.finished = true;
            this.loading = false;
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
  },
};
</script>
