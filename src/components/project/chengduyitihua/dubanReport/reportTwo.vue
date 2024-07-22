<template>
  <div class="container one">
    <div class="type-container">
      <span>市领导</span>
    </div>
    <div class="table-container" v-for="(item, index) in tableData" :key="index">
      <div class="table-title">
        <span>{{ item.title }}</span>
        <span>{{ item.total }}条</span>
      </div>
      <div class="table-content">
        <div
          class="table-row"
          v-for="(itemRow, rowIndex) in item.dataList"
          :key="rowIndex"
        >
          <div class="name">{{ itemRow.name }}</div>
          <div class="progress">
            <van-progress
              :percentage="itemRow.progress"
              :show-pivot="false"
              :color="itemRow.color"
              stroke-width="8"
              track-color="#F1F1F1"
            />
          </div>
          <div class="count bottomline" @click="goList(itemRow)">
            {{ itemRow.count }}条
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "reportTwo",
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
      tableData: [],
    };
  },
  watch: {
    searchIndex(val) {
      if (this.currentTabIndex == 1 && val < 3) {
        this.getData();
      }
    },
    dateStr(val) {
      if (this.currentTabIndex == 1 && val.length) {
        this.getData();
      }
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    goList(itemRow) {
      console.log(itemRow);

      this.$router.push({
        path: `/reportGo`,
        query: {
          leaderName: itemRow.name,
          leaderId: itemRow.value,
          searchIndex: this.searchIndex,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        },
      });
    },
    getData() {
      let self = this;
      let param = { type: self.searchIndex + 1 };
      if (self.searchIndex == 3) {
        param.start = self.dateStart;
        param.end = self.dateEnd;
      }

      dsf.http.post("ctrl/customStatic/leader", param).then((data) => {
        self.tableData = [];
        console.log(data.data);
        if (data.data.type == "success") {
          let temp1 = {
            title: data.data.data.swTitle.name,
            total: data.data.data.swTitle.value,
            dataList: [],
          };
          data.data.data.swData.forEach((element) => {
            temp1.dataList.push({
              name: element.name,
              value: element.key,
              color: self.colors[Math.floor(Math.random() * 10)],
              count: element.value,
              progress: Math.floor((element.value / data.data.data.swTitle.value) * 100),
            });
          });

          let temp2 = {
            title: data.data.data.sfTitle.name,
            total: data.data.data.sfTitle.value,
            dataList: [],
          };
          data.data.data.sfData.forEach((element) => {
            temp2.dataList.push({
              name: element.name,
              value: element.key,
              color: self.colors[Math.floor(Math.random() * 10)],
              count: element.value,
              progress: Math.floor((element.value / data.data.data.sfTitle.value) * 100),
            });
          });
          self.tableData = self.tableData.concat([temp1, temp2]);
        } else {
          dsf.layer.toast("当前暂无数据");
        }
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
        text-align: left;
      }
      span:last-child {
        color: #0378be;
        text-align: right;
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
        height: 40px;
        .name {
          width: 20%;
          font-size: 0.28rem;
          color: #5a5a5a;
          text-align: justify;
          font-weight: 400;
        }
        .progress {
          //   border-radius: 7.5px;
          width: 60%;
        }
        .count {
          width: 20%;
          font-size: 0.28rem;
          color: #666666;
          text-align: right;
          font-weight: 400;
        }
        .bottomline {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
