<template>
  <div class="summaryMore-page">
    <div class="bar">
      <div class="bar-btns">
        <div
          @click="chengeMode(0)"
          :class="['btn', 'btn-l', { 'btn-active': mode == 0 }]"
        >
          周
        </div>
        <div
          @click="chengeMode(1)"
          :class="['btn', 'btn-r', { 'btn-active': mode == 1 }]"
        >
          月
        </div>
      </div>
      <div class="bar-search">
        <van-icon name="arrow-left" @click="prevClick" />
        <span v-if="mode == 0"
          >{{ sdate | dateFormatWeek }} - {{ edate | dateFormatWeek }}</span
        >
        <span v-else>{{ sdate | dateFormatMonth }}</span>
        <van-icon name="arrow" @click="nextClick" />
      </div>
    </div>
    <div class="content">
      <van-cell-group>
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="info">
              <div class="info-avatar" v-if="calcType == 0">
                <!-- <img :src="avatar" :onerror="default_avatar" /> -->
                <van-image round :src="avatar" />
              </div>
              <div class="info-msg">
                <div class="name" v-if="calcType == 0">{{ userName }}</div>
                <!-- <div class="group">
                  {{ groupName
                  }}<span class="rule" @click="$router.push('/attndCheckRules')"
                    >(查看规则)</span
                  >
                </div> -->
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <commonempty v-if="kvp.length == 0" description="暂无数据" />
      <van-cell-group v-else v-for="(item, idx) in showKvp" :key="idx">
        <van-cell :title="item.key" :value="item.value" @click="checkBox(item)"/>
      </van-cell-group>
      <!-- 详情弹层 -->
      <van-popup v-model="showPop" position="bottom" round style="height: 70%">
        <van-nav-bar :title="showPopTitle" left-text="返回" left-arrow @click-left="showPop = false"/>
        <commonempty v-if="kvp2.length == 0" description="暂无数据" />
        <van-cell-group v-else v-for="(item, idx) in kvp2" :key="idx">
          <van-cell :title="item.userName" :value="item.num"/>
        </van-cell-group>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calcType: this.$route.params.calcType,
      userName: dsf.util.loadSessionStore("user").name,
      groupName:
        dsf.util.loadSessionStore("user").attndGroupName,
      default_avatar:
        +require("static/images/peopleCongress/icon_head.png") + '"',
      avatar: dsf.url.getWebPath(
        `/fn/mobilePhoto/download?id=${
          dsf.util.loadSessionStore("user").user_id
        }&time=${new Date().getTime()}`
      ),
      mode: 0, //0周，1月
      kvp: [],
      kvp2: [],
      nowDay: moment().format("YYYY-MM-DD"), // 当前日期（默认当天），会根据检索条件改变
      showPop: false,
      showPopTitle: ""
    };
  },
  computed: {
    sdate: function() {
      let self = this;
      let arr;
      if (self.mode == 0) arr = self.getCurrWeekDays(self.nowDay);
      else arr = self.getCurrMonthDays(self.nowDay);
      return arr[0];
    },
    edate: function() {
      let self = this;
      let arr;
      if (self.mode == 0) arr = self.getCurrWeekDays(self.nowDay);
      else arr = self.getCurrMonthDays(self.nowDay);
      return arr[1];
    },
    showKvp: function() {
      return this.kvp.filter(item => item.visible);
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let self = this;
      if (self.$route.query.demo == "1") {
        self.kvp = [
          {
            key: "平均工时",
            value: "11.4小时"
          },
          {
            key: "出勤天数",
            value: "5天"
          },
          {
            key: "休息天数",
            value: "2天"
          },
          {
            key: "外勤",
            value: "1天"
          },
          {
            key: "迟到",
            value: "0次"
          },
          {
            key: "早退",
            value: "0次"
          },
          {
            key: "缺卡",
            value: "0次"
          },
          {
            key: "旷工",
            value: "0天"
          }
        ];
        if (self.mode == 1)
          self.kvp = self.kvp = [
            {
              key: "平均工时",
              value: "11.4小时"
            },
            {
              key: "出勤天数",
              value: "22天"
            },
            {
              key: "休息天数",
              value: "8天"
            },
            {
              key: "外勤",
              value: "1天"
            },
            {
              key: "迟到",
              value: "0次"
            },
            {
              key: "早退",
              value: "0次"
            },
            {
              key: "缺卡",
              value: "0次"
            },
            {
              key: "旷工",
              value: "1天"
            }
          ];
      } else {
        let params = {
          type: self.calcType,
          sdate: self.sdate,
          edate: self.edate,
        }
        this.calcType == 1 ? self.$set(params, "groupId", self.$route.params.btId) : ""
        dsf.http.post(`fn/attnd/getSummary`, params).done(res => {
            if (res.type == "success") {
              self.kvp = res.data;
            }
          }).error(error => {
            console.log("getSummary-error", error);
          })
      }
    },
    checkBox(item){
      let checkShowPopArr = ["迟到", "早退", "缺卡", "旷工"]
      // type=1 迟到 2 早退 3 缺卡 4 矿工
      let typeId = checkShowPopArr.indexOf(item.key)
      if(this.$route.params.calcType == 1 && typeId != -1) {
        dsf.http.post(`/fn/attnd/getSummary2`, {
            type: typeId + 1,
            sdate: this.sdate,
            edate: this.edate,
            groupId: this.$route.params.btId
          }).done(res => {
            if (res.type == "success") {
              this.kvp2 = res.data;
              this.showPop = true
              this.showPopTitle = item.key
            }
          })
        }
    },
    getMyGroup() {
      let self = this;
      dsf.http
        .get(`fn/attnd/getMyGroup`)
        .done(res => {
          if (res.type == "success") {
            self.groupName = res.data.groupName;
            let user = dsf.util.loadSessionStore("user");
            if (!user.attndGroupName) {
              user.attndGroupName = res.data.groupName;
              dsf.util.saveToSessionStore("user", user);
            }
          }
        })
        .error(error => {
          console.log("getMyGroup-error", error);
          // dsf.layer.toast("数据获取失败！", false);
          // self.errored = true;
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    },
    chengeMode(mode) {
      let self = this;
      if (self.mode == mode) return;
      self.mode = mode;
      self.nowDay = moment().format("YYYY-MM-DD"); // 切换模式后初始化查询日期
      self.loadData();
    },
    // 获取当前周的开始结束时间
    getCurrWeekDays(nowDay) {
      let self = this;
      let dates = [];
      let weekOfday = parseInt(moment().format("d")) - 1; // 计算今天是这周第几天 周1为一周中的第一天
      let start = moment(nowDay)
        .startOf("week")
        .add(1, "day")
        .format("YYYY-MM-DD"); // 周一日期
      let end = moment(nowDay)
        .endOf("week")
        .add(1, "day")
        .format("YYYY-MM-DD"); // 周日日期
      dates.push(start);
      dates.push(end);
      self.nowDay = start;
      return dates;
    },
    // 获取当前月的开始结束时间
    getCurrMonthDays(nowDay) {
      let self = this;
      let dates = [];
      let start = moment(nowDay)
        .startOf("month")
        .format("YYYY-MM-DD");
      let end = moment(nowDay)
        .endOf("month")
        .format("YYYY-MM-DD");
      dates.push(start);
      dates.push(end);
      self.nowDay = start;
      return dates;
    },
    prevClick() {
      let self = this;
      if (self.mode == 0)
        self.nowDay = moment(self.nowDay)
          .subtract(7, "days")
          .format("YYYY-MM-DD");
      else if (self.mode == 1)
        self.nowDay = moment(self.nowDay)
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD");
      // console.log("sdate", self.sdate);
      // console.log("edate", self.edate);
      self.loadData();
    },
    nextClick() {
      let self = this;
      if (self.mode == 0)
        self.nowDay = moment(self.nowDay)
          .add(7, "days")
          .startOf("week")
          .format("YYYY-MM-DD");
      else if (self.mode == 1)
        self.nowDay = moment(self.nowDay)
          .add(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD");
      // console.log("sdate", self.sdate);
      // console.log("edate", self.edate);
      self.loadData();
    }
  },
  filters: {
    //时间格式化
    dateFormatWeek: function(val) {
      if (!val) return "";
      return dsf.date.format(val, "mm.dd");
    },
    dateFormatMonth: function(val) {
      if (!val) return "";
      return dsf.date.format(val, "yyyy.mm");
    }
  }
};
</script>

<style lang="scss" scoped>
.summaryMore-page {
  .bar {
    margin: 1vh 0;
    padding: 16px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    &-btns {
      display: flex;
      .btn {
        color: #008be7;
        padding: 0.5vh 6vw;
        border-color: #008be7;
        border-style: solid;
        border-width: 1px;
      }
      .btn-l {
        border-radius: 5px 0 0 5px;
      }
      .btn-r {
        border-radius: 0 5px 5px 0;
      }
      .btn-active {
        color: #fff;
        background-color: #008be7;
      }
    }
    &-search {
      display: flex;
      align-items: center;
      span {
        padding: 0 2vw;
      }
    }
  }
  .content {
    .info {
      background-color: #fff;
      // margin: 16px;
      // padding: 16px;

      display: flex;
      justify-content: flex-start;

      &-avatar {
        width: 1rem;
        height: 1rem;
        margin-right: 0.2rem;
      }

      &-msg {
        .name {
          font-size: var(--font_size_0);
          font-weight: bold;
        }
        .rule {
          color: #4f99e4;
          margin-left: 8px;
        }
      }
    }
    .van-empty {
      height: 50vh;
    }
  }
  >>>.van-nav-bar__content {
    background-color: #008be7;
    .van-nav-bar__title,
    .van-nav-bar__left i,
    .van-nav-bar__left span {
      color: white !important
    }
  }
  >>>.van-nav-bar {
    position: sticky;
    top: 0;
    z-index: 2;
    height: 10%;
  }
}
</style>
