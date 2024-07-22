<template>
  <div class="dblist">
    <van-sticky get-container="#app" :offset-top="dsf.util.getOffsetTop()">
      <div class="search">
        <div class="left">
          <span v-for="(item, index) in searchList">
            {{ item.name }}
          </span>
        </div>
        <div class="right" @click="openSearch()">
          <span>筛选</span>
        </div>
      </div>
      <div class="total">
        总计：<span>{{ total }}</span
        >条
      </div>
      <div class="tabs">
        <span
          v-for="(item, index) in tabslist"
          :key="index"
          :name="index"
          :class="item.selected ? 'tabactive' : ''"
          @click="changeTab(index)"
        >
          {{ item.name }}({{ item.count }}条)
        </span>
      </div>
    </van-sticky>
    <div class="listbody">
      <div class="list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedTips"
            @load="onLoad"
            offset="100"
          >
            <div
              class="card"
              v-for="(item, index) in datalist"
              :key="index"
              :name="index"
              @click="goForm(item)"
            >
              <div class="title">
                {{ item.title }}
              </div>
              <div class="content">
                <ul>
                  <li>分管领导:{{ item.leader }}</li>
                  <li>主办处室:{{ item.dept }}</li>
                </ul>
                <ul>
                  <li>办理期限:{{ item.blsx }}</li>
                  <li>状态:{{ item.status }}</li>
                </ul>
                <ul>
                  <li>督办事项:{{ item.dbsx }}</li>
                </ul>
              </div>
            </div>

            <commonempty v-if="!datalist.length && !loading"></commonempty>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>

    <!-- 搜索弹窗 -->
    <van-action-sheet v-model="searchBox" class="searchSheet" position="bottom" round>
      <van-nav-bar title="筛选" />
      <div class="sheetBox flex1">
        <component
          v-for="(item, index) in controlList"
          :key="index"
          :meta-data="item"
          :is="item.control"
        >
        </component>
      </div>
      <div class="disfr jsb searchBox">
        <van-button class="flex1" @click="returnFilter">重置</van-button>
        <van-button class="flex1" type="info" @click="searchData">确定</van-button>
      </div>
    </van-action-sheet>

    <van-action-sheet
      v-model="isShowTypePicker"
      class="searchSheet"
      position="bottom"
      round
    >
      <van-nav-bar title="查询" />
      <div class="datebody">
        <div class="datelabel">
          <span>办理期限</span>
        </div>
        <div class="dateselect">
          <van-field
            readonly
            clickable
            name="calendar"
            :value="dateStart"
            placeholder="选择日期"
            @click="start = true"
          /><i class="iflex">——</i>
          <van-field
            readonly
            clickable
            name="calendar"
            :value="dateEnd"
            placeholder="选择日期"
            @click="end = true"
          />
        </div>
      </div>
      <div class="datefooter">
        <van-button type="default" @click="btnReset()">重置</van-button>
        <van-button type="info" @click="btnSure()">确定</van-button>
      </div>
      <van-calendar
        get-container="#app"
        :min-date="minDate1"
        :max-date="maxDate1"
        v-model="start"
        @confirm="startConfirm"
      />
      <van-calendar
        get-container="#app"
        :min-date="minDate2"
        :max-date="maxDate2"
        v-model="end"
        @confirm="endConfirm"
      />
    </van-action-sheet>
  </div>
</template>
<script>
import allComps from "@/components/documentCenter/searchControl";
export default {
  name: "dblist",
  data() {
    return {
      isShowTypePicker: false,
      dateStart: "",
      dateEnd: "",
      dateStr: "",
      start: false,
      end: false,
      minDate1: new Date(1970, 0, 1),
      maxDate1: new Date(),
      minDate2: new Date(1970, 0, 1),
      maxDate2: new Date(),
      searchBox: false,
      loading: false,
      finished: false,
      refreshing: false,
      searchList: [], //[{ name: "罗建" }, { name: "近三个月" }, { name: "建设规划安全处" }],
      total: 0,
      tabslist: [
        { name: "在办", status: "1", count: 0, selected: true },
        { name: "已办", status: "2", count: 0, selected: false },
        { name: "超期", status: "-2", count: 0, selected: false },
      ],
      currentTabIndex: 0,
      datalist: [],
      controlList: [],
      page: 1,
      limit: 15,
      finishedTips: "",
      isFirst: true,
    };
  },
  components: {
    ...allComps,
  },
  watch: {},
  created() {},
  mounted() {
    let self = this;
    self.$bus.on("searchRadioSelectBus", function (busObj) {
      console.log(busObj);
      if (busObj.metaData.metaData == "blsx" && busObj.value == "4") {
        self.isShowTypePicker = true;
      }
    });
  },
  methods: {
    btnReset() {
      this.dateStart = "";
      this.dateEnd = "";
      this.minDate1 = new Date(1970, 0, 1);
      this.maxDate1 = new Date();
      this.minDate2 = new Date(1970, 0, 1);
      this.maxDate2 = new Date();
    },
    btnSure() {
      this.start = false;
      this.end = false;
      this.isShowTypePicker = false;
      this.minDate1 = new Date(1970, 0, 1);
      this.maxDate1 = new Date();
      this.minDate2 = new Date(1970, 0, 1);
      this.maxDate2 = new Date();
      this.dateStr = this.dateStart + "|" + this.dateEnd;
    },
    startConfirm(date) {
      this.start = false;
      this.minDate2 = date;
      this.dateStart = dsf.date.format(date, "yyyy-mm-dd");
    },
    endConfirm(date) {
      this.end = false;
      this.maxDate1 = date;
      this.dateEnd = dsf.date.format(date, "yyyy-mm-dd");
    },
    async searchData() {
      let self = this;
      self.searchList = [];
      self.controlList.forEach((item, index) => {
        if (item.value && item.value != "") {
          self.searchList.push({
            name: item.text,
            value: item.value,
            key: item.metaData,
          });
        }
      });
      console.log(self.searchList);
      self.searchBox = false;
      await self.getTopData();
      self.onRefresh();
    },
    async getTopData() {
      //获取顶部的统计和检索条件   只执行一次
      let self = this;
      let param = {};
      self.getListParams(param);
      await dsf.http.post("ctrl/customStatic/listInfo", param).then((data) => {
        console.log(data.data);
        if (data.data.type == "success") {
          let resObj = data.data.data;
          self.total = resObj.allNum;
          self.tabslist[0].count = resObj.zbNum;
          self.tabslist[1].count = resObj.ybNum;
          self.tabslist[2].count = resObj.cqNum;
        } else {
          dsf.layer.toast("当前暂无数据");
        }
      });
    },
    initSearchList(resObj) {
      console.log("initSearchList");
      let self = this;
      let temptab = this.tabslist.find(
        (item) => item.name == this.$route.query["status"] //处理完成状态
      );
      if (temptab) {
        this.tabslist.forEach((element) => {
          element.selected = false;
        });
        temptab.selected = true;
      }
      console.log(JSON.stringify(this.tabslist));

      //处理领导人员检索
      if (self.$route.query["leaderName"]?.length) {
        self.searchList.push({
          name: self.$route.query["leaderName"],
          value: self.$route.query["leaderId"],
          key: "leaderList",
        });
        let tempControl = self.controlList.find((item) => item.metaData == "leaderList");
        tempControl.value = self.$route.query["leaderId"]; //检索条件回显
      }
      //处理分管领导人员检索
      if (self.$route.query["fgLeaderName"]?.length) {
        self.searchList.push({
          name: self.$route.query["fgLeaderName"],
          value: self.$route.query["fgLeaderId"],
          key: "fgld",
        });
        let tempControl = self.controlList.find((item) => item.metaData == "fgld");
        tempControl.value = self.$route.query["fgLeaderId"]; //检索条件回显
      }
      //处理时间检索
      if (self.$route.query["searchIndex"]?.length) {
        self.searchList.push({
          name: resObj.typeList[self.$route.query["searchIndex"]].text,
          value: resObj.typeList[self.$route.query["searchIndex"]].value,
          key: "blsx",
        });

        let tempControl = self.controlList.find((item) => item.metaData == "blsx");
        tempControl.value = resObj.typeList[self.$route.query["searchIndex"]].value; //检索条件回显
      }
      //处理部门检索
      if (self.$route.query["deptId"]?.length) {
        self.searchList.push({
          name: self.$route.query["deptName"],
          value: self.$route.query["deptId"],
          key: "zbdwList",
        });
        let tempControl = self.controlList.find((item) => item.metaData == "zbdwList");
        tempControl.value = self.$route.query["deptId"]; //检索条件回显
      }
      //处理督办分类检索
      if (self.$route.query["dbsx"]?.length) {
        self.searchList.push({
          name: resObj.fileTypeList.find(
            (item) => item.value == self.$route.query["dbsx"]
          )?.text,
          value: self.$route.query["dbsx"],
          key: "dbsx",
        });
        let tempControl = self.controlList.find((item) => item.metaData == "dbsx");
        tempControl.value = self.$route.query["dbsx"]; //检索条件回显
      }
    },
    async initTopData() {
      //获取顶部的统计和检索条件   只执行一次
      let self = this;
      self.controlList = [];
      let param = {};

      //处理领导人员检索
      if (self.$route.query["leaderName"]?.length) {
        param.leaderId = self.$route.query["leaderId"];
      }
      //处理分管领导人员检索
      if (self.$route.query["fgLeaderName"]?.length) {
        param.fgLeaderId = self.$route.query["fgLeaderId"];
      }
      //处理时间检索
      if (self.$route.query["searchIndex"]?.length) {
        param.type = parseInt(self.$route.query["searchIndex"]) + 1;
        if (self.$route.query["searchIndex"] == 3) {
          self.dateStart = param.start = self.$route.query["dateStart"];
          self.dateEnd = param.end = self.$route.query["dateEnd"];
        }
      }
      //处理部门检索
      if (self.$route.query["deptId"]?.length) {
        param.deptId = self.$route.query["deptId"];
      }
      //处理督办分类检索
      if (self.$route.query["dbsx"]?.length) {
        param.fileType = self.$route.query["dbsx"];
      }

      await dsf.http.post("ctrl/customStatic/listInfo", param).then((data) => {
        console.log(data.data);
        if (data.data.type == "success") {
          let resObj = data.data.data;
          self.total = resObj.allNum;
          self.tabslist[0].count = resObj.zbNum;
          self.tabslist[1].count = resObj.ybNum;
          self.tabslist[2].count = resObj.cqNum;

          let leaderList = {
            control: "search_controlRadio",
            metaData: "leaderList",
            placehold: "",
            selectData: resObj.leaderList,
            title: "批示领导",
          };
          self.controlList.push(leaderList);

          let fgld = {
            control: "search_controlRadio",
            metaData: "fgld",
            placehold: "",
            selectData: resObj.fgLeaderList,
            title: "分管领导",
          };
          self.controlList.push(fgld);

          let blsx = {
            control: "search_controlRadio",
            metaData: "blsx",
            placehold: "",
            selectData: resObj.typeList,
            title: "办理期限",
          };
          self.controlList.push(blsx);

          let zbdwList = {
            control: "search_controlRadio",
            metaData: "zbdwList",
            placehold: "",
            selectData: resObj.zbdwList,
            title: "主办单位",
          };
          self.controlList.push(zbdwList);

          let dbsx = {
            control: "search_controlRadio",
            metaData: "dbsx",
            placehold: "",
            selectData: resObj.fileTypeList,
            title: "督办事项",
          };
          self.controlList.push(dbsx);

          self.initSearchList(resObj);

          // self.getListData();
        } else {
          dsf.layer.toast("当前暂无数据");
        }
      });
    },
    getListParams(param) {
      let self = this;
      console.log(JSON.stringify(self.searchList));
      self.searchList.forEach((element) => {
        //处理领导人员检索
        if (element.key == "leaderList") {
          param.leaderId = element.value;
        }
        //处理分管领导人员检索
        if (element.key == "fgld") {
          param.fgLeaderId = element.value;
        }
        //处理时间检索
        if (element.key == "blsx") {
          param.type = element.value;
          if (element.value == 4) {
            param.start = self.dateStart;
            param.end = self.dateEnd;
          }
        }
        //处理部门检索
        if (element.key == "zbdwList") {
          param.deptId = element.value;
        }
        //处理督办分类检索
        if (element.key == "dbsx") {
          param.fileType = element.value;
        }
      });
    },
    getListData() {
      let self = this;
      console.log("getListData");
      console.log(JSON.stringify(this.tabslist));
      let param = {
        status: self.tabslist.find((item) => item.selected).status,
        page: this.page,
        limit: this.limit,
      };
      self.getListParams(param);

      function convertISOStringToCustomFormat(isoString) {
        const date = new Date(isoString);
        // 将日期转换为ISO字符串
        const isoDateString = date.toISOString();
        // 截取并重新排列所需要的部分
        return isoDateString.substring(0, 10) + " " + isoDateString.substring(11, 16);
      }
      //获取数据
      dsf.http.post("ctrl/customStatic/listData", param).then((data) => {
        console.log(data.data);
        if (data.data.type == "success") {
          if (self.page == 1) {
            self.datalist = [];
          }
          data.data.data.data.forEach((element) => {
            self.datalist.push({
              title: element.bt,
              leader: element.xgldText,
              dept: element.zbdwText,
              blsx: convertISOStringToCustomFormat(element.blqx),
              dbsx: element.dbxmlxText,
              status: element.spztText,
              moduleId: element.moduleId,
              pk: element.id,
              formId: element.formId,
            });
          });
          self.page++;

          self.loading = false;
          if (self.datalist.length == data.data.data.count || self.datalist.length == 0) {
            // 加载结束
            self.finished = true;
            if (self.datalist.length > 0) {
              self.finishedTips = "没有更多了";
            } else self.finishedTips = "";
          }
        } else {
          dsf.layer.toast("当前暂无数据");
        }
      });
    },
    async onLoad() {
      if (this.refreshing) {
        this.refreshing = false;
      }
      if (this.isFirst) {
        await this.initTopData();
      }
      this.getListData();
      this.isFirst = false;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.page = 1;
      this.datalist = [];
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    openSearch() {
      this.searchBox = true;
    },
    returnFilter() {
      let data = JSON.parse(JSON.stringify(this.controlList));
      data.forEach((item) => {
        item.text = "";
        item.value = "";
      });
      this.controlList = data;
    },
    goForm(item) {
      console.log(item);
      this.$router.push({
        path: `/commonForm/${item.moduleId}/${item.pk}`,
        query: {
          formId: item.formId,
          listId: "210602101612cwrG8N6w79LnSWR8gSY",
          method: "viewNode",
          validateByList: 1,
        },
      });
    },
    changeTab(tabindex) {
      this.currentTabIndex = tabindex;

      this.tabslist.forEach((element) => {
        element.selected = false;
      });
      this.tabslist[tabindex].selected = true;
      this.onRefresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.dblist {
  .searchSheet {
    height: auto;

    .van-nav-bar {
      border-bottom: 5px solid #f1f2f4;
    }

    .searchBox {
      padding: 10px;

      .van-button {
        margin: 0 5px;
        font-size: var(--font_size_2);
      }
    }

    .datebody {
      padding: 35px 35px 0px 35px;

      .datelabel {
        color: black;
        font-size: 16px;
        font-weight: bold;
        // padding: 25px 35px 0px 35px;
        // span {
        //   padding: 0.2rem 0.32rem;
        // }
      }
      .dateselect {
        display: flex;
        align-items: center;
        justify-content: center;
        ::v-deep .van-field__control {
          text-align: center !important;
        }
        .iflex {
          display: flex;
          text-align: center;
        }
      }
    }
    .datefooter {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      ::v-deep .van-button {
        height: 0.68rem;
        width: 145px;
      }
    }
  }

  .disfr {
    display: flex;
  }

  .fc {
    display: flex;
    flex-direction: column;
  }

  .ac {
    align-items: center;
  }

  .jsb {
    justify-content: space-between;
  }

  .jc {
    justify-content: center;
  }

  .flex1 {
    flex: 1;
  }

  .sheetBox {
    padding: 15px;
    font-size: var(--font_size_3);

    .van-cell__value {
      height: 24px;
      background: #e5e5e5;
    }

    .dateRange {
      .line {
        width: 20px;
        height: 1px;
        background: #cecece;
        margin: 0 15px;
      }
    }
  }
  .search {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    height: 45px;

    .left {
      text-align: left;
      overflow-x: scroll;
      align-items: center;
      display: flex;
      span {
        background-color: #ffe292;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 5px;
        text-wrap: nowrap;
      }
    }
    .right {
      text-align: right;
      width: 60px;
      padding-right: 10px;
    }
  }

  .total {
    height: 35px;
    align-items: center;
    display: flex;
    padding: 0px 10px;
    border-bottom: 1px solid #dbcfcf;
    background-color: #f8f8f8;
    font-weight: 600;
    span {
      color: #f88542;
    }
  }
  .tabs {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0px 10px;
    background-color: #f8f8f8;
    span {
      padding: 5px 15px;
      margin-right: 10px;
      background-color: #d7dfff;
      border-radius: 5px;
    }
  }
  .tabactive {
    color: white;
    background-color: #3976c7 !important;
  }
  .listbody {
    padding: 5px 10px;
    .list {
      .card {
        border-radius: 5px;
        padding: 10px 20px;
        background-color: white;
        margin-bottom: 20px;
        .title {
          font-weight: 600;
          font-size: 14px;
          color: black;
          border-bottom: 1px solid #dbcfcf;
          padding: 10px 0px 20px 0px;
          margin-bottom: 10px;
        }
        .content {
          font-size: 12px;
          color: #8d8d8d;
          ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
            li {
              flex: 1;
              height: 26px;
              line-height: 26px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
