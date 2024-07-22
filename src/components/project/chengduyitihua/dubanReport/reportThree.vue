<template>
  <div class="container one">
    <div class="type-container">
      <span>主办领导情况</span>
    </div>
    <div class="table-container">
      <div class="table-title">
        <span>分管领导</span>
        <span>已办</span>
        <span>在办</span>
        <span>超期</span>
        <span>总计</span>
      </div>
      <div class="table-content">
        <div
          class="table-row"
          :class="rowIndex == currentRowIndex ? 'rowactive' : ''"
          @click="changeRow(rowIndex, itemRow)"
          v-for="(itemRow, rowIndex) in tableData1"
          :key="rowIndex"
        >
          <div
            class="name center"
            :class="rowIndex == tableData1.length - 1 ? 'highlight' : ''"
          >
            {{ itemRow.name }}
          </div>
          <div
            class="count"
            :class="getClass(itemRow.completed, rowIndex)"
            @click.stop="goList1(itemRow, '已办')"
          >
            {{ itemRow.completed }}
          </div>
          <div
            class="count"
            :class="getClass(itemRow.progress, rowIndex)"
            @click.stop="goList1(itemRow, '在办')"
          >
            {{ itemRow.progress }}
          </div>
          <div
            class="count"
            :class="getClass(itemRow.over, rowIndex)"
            @click.stop="goList1(itemRow, '超期')"
          >
            {{ itemRow.over }}
          </div>
          <div
            class="count"
            :class="getClass(itemRow.total, rowIndex)"
            @click.stop="goList1(itemRow)"
          >
            {{ itemRow.total }}
          </div>
        </div>
      </div>
    </div>
    <div class="type-container">
      <span>处室办理</span>
    </div>
    <div class="table-container">
      <div class="table-content">
        <div class="table-row" v-for="(itemRow, rowIndex) in tableData2" :key="rowIndex">
          <div class="name name2">{{ itemRow.name }}</div>
          <div class="progress">
            <van-progress
              :percentage="itemRow.progress"
              :show-pivot="false"
              :color="itemRow.color"
              stroke-width="8"
              track-color="#F1F1F1"
            />
          </div>
          <div class="count count2 right bottomline" @click="goList2(itemRow)">
            {{ itemRow.count }}条
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "reportThree",
  props: [
    "currentTabIndex",
    "tabslist",
    "searchList",
    "searchIndex",
    "dateStart",
    "dateEnd",
    "dateStr",
  ],
  data() {
    return {
      currentRowIndex: -1,
      colors: [
        "#0091FF",
        "#32C5FF",
        "#1A74D8",
        "#16C8A0",
        "#8AC9B5",
        "#6DD400",
        "#F7B500",
        "#D19900",
        "#F88542",
        "#DC5609",
      ],
      tableData1: [],
      tableData2: [],
      currentRow: null,
    };
  },
  watch: {
    searchIndex(val) {
      if (this.currentTabIndex == 2 && val < 3) {
        this.currentRowIndex = -1;
        // this.currentRow = null;

        this.getTableData1(() => {
          this.getTableData2();
        });
      }
    },
    dateStr(val) {
      if (this.currentTabIndex == 2 && val.length) {
        this.currentRowIndex = -1;
        // this.currentRow = null;
        this.getTableData1(() => {
          this.getTableData2();
        });
      }
    },
  },
  created() {},
  mounted() {
    let self = this;
    self.getTableData1(() => {
      self.getTableData2();
    });
  },
  methods: {
    goList1(itemRow, type) {
      console.log(itemRow);

      this.$router.push({
        path: `/reportGo`,
        query: {
          status: type,
          fgLeaderName: itemRow.name,
          fgLeaderId: itemRow.userId,
          searchIndex: this.searchIndex,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        },
      });
    },
    goList2(itemRow) {
      console.log(itemRow);

      this.$router.push({
        path: `/reportGo`,
        query: {
          deptId: itemRow.id,
          deptName: itemRow.name,
          fgLeaderName: this.currentRow.userId != "-1" ? this.currentRow.name : "",
          fgLeaderId: this.currentRow.userId != "-1" ? this.currentRow.userId : "",
          searchIndex: this.searchIndex,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        },
      });
      // query_C-DB-0001: 数据资源管理处
    },
    getClass(count, rowIndex) {
      return count > 0 && rowIndex < this.tableData1.length - 1 ? "bottomline" : "";
    },
    changeRow(rowIndex, itemRow) {
      if (rowIndex == this.tableData1.length - 1) return;

      if (itemRow.selected) {
        itemRow.selected = false;
        this.currentRowIndex = -1;

        if (this.tableData1.length) {
          this.currentRow = this.tableData1[this.tableData1.length - 1];
        }
      } else {
        this.currentRowIndex = rowIndex;
        this.currentRow = itemRow;

        this.tableData1.forEach((element, eindex) => {
          if (rowIndex == eindex) element.selected = true;
          else element.selected = false;
        });
      }

      this.getTableData2();
    },
    getTableData1(back) {
      let self = this;
      let param = { type: self.searchIndex + 1 };
      if (self.searchIndex == 3) {
        param.start = self.dateStart;
        param.end = self.dateEnd;
      }
      dsf.http.post("ctrl/customStatic/hostLeaderTask").then((data) => {
        self.tableData1 = [];
        console.log(data.data);
        data.data.data.forEach((element) => {
          self.tableData1.push({
            userId: element.userId,
            name: element.userName,
            completed: element.ybNum,
            progress: element.zbNum,
            over: element.cqNum,
            total: element.total,
            selected: false,
          });
        });
        if (self.tableData1.length) {
          self.currentRow = self.tableData1[self.tableData1.length - 1];
        }
        back();
      });
    },
    getTableData2() {
      let self = this;
      let param = { type: self.searchIndex + 1 };
      if (self.searchIndex == 3) {
        param.start = self.dateStart;
        param.end = self.dateEnd;
      }
      if (self.currentRow && self.currentRow.userId != "-1") {
        param.leaderId = self.currentRow.userId;
      }
      dsf.http.post("ctrl/customStatic/unitTask", param).then((data) => {
        self.tableData2 = [];
        console.log(data.data);
        data.data.data.forEach((element) => {
          self.tableData2.push({
            id: element.key,
            name: element.name,
            progress: Math.floor((element.value / self.currentRow.total) * 100),
            color: this.colors[Math.floor(Math.random() * 10)],
            count: element.value,
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .type-container {
    padding: 0.15rem 0.3rem;
    box-sizing: border-box;
    position: relative;
    line-height: 1.44em;
    font-size: 0.36rem;

    span:first-child {
      padding-left: 0.1rem;
      border-left: 5px solid #fff;
      position: relative;
      font-weight: bold;
      &::before {
        content: " ";
        position: absolute;
        height: 18px;
        width: 5px;
        top: 50%;
        left: -5px;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        border-radius: 3px;
        background-color: var(--normal);
      }
    }
  }
  .table-container {
    padding: 0.1rem 0.15rem;
    .table-title {
      background: #eff9ff;
      border-radius: 10px 10px 0px 0px;
      font-size: 0.3rem;
      font-weight: 500;
      padding: 10px 10px;
      display: flex;
      align-items: center;
      span {
        font-weight: 600;
        flex: 1;
      }
      span:first-child {
        color: #333333;
        text-align: center;
      }
      span:not(:first-child) {
        color: #0378be;
        text-align: center;
      }
    }
    .table-content {
      border-radius: 0px 0px 10px 10px;
      background: #ffffff;
      box-shadow: 0px 2px 6px 2px rgba(168, 193, 211, 0.1);
      .table-row {
        display: flex;
        align-items: center;
        padding: 0px 10px;
        min-height: 40px;
        .name {
          width: 20%;
          font-size: 0.28rem;
          color: #5a5a5a;
          font-weight: 400;
        }

        .name2 {
          width: 34%;
          text-align: right;
          padding-right: 10px;
        }
        .highlight {
          color: #0378be;
        }
        .progress {
          //   border-radius: 7.5px;
          width: 55%;
        }
        .count {
          width: 20%;
          font-size: 0.28rem;
          color: #666666;
          text-align: center;
          font-weight: 400;
        }
        .count2 {
          width: 15%;
          text-wrap: nowrap;
        }
        .bottomline {
          text-decoration: underline;
        }
        .center {
          text-align: center;
        }
        .right {
          text-align: right;
        }
      }
      .rowactive {
        background-color: #e8f2fc !important;
      }
    }
  }
}
</style>
