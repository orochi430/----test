<template>
<div>
    <div class="allTab">
      <span class="choose"><van-icon name="arrow-left" @click="preMonth"/>{{chooseTime}}<van-icon name="arrow" @click="nextMonth"/></span>
    </div>
    <!-- <div v-if="title" class="title">{{title}}</div> -->
    <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
    <template v-else>
      <DsfListTable :columns="columns" :data="data" :show-default="showDefault" :tbHighLight="true"></DsfListTable>
      <commonempty v-if="data.length == 0" />
    </template>
</div>
</template>

<script>
import DsfListTable from "@/components/documentCenter/DsfListTable";
export default {
  components: { DsfListTable },
  data() {
    return {
    //   isShowSearchBox: true,
      keyword: "",
      columns: [
        {
          "showCategory": "mergeRow",
          "showName": "日期",
          "showMetaColumn": "ZBRQ"
        },
        {
          "showCategory": "subTitleA",
          "showName": "值班人",
          "showMetaColumn": "ZBR_TEXT"
        },
        {
          "showCategory": "subTitleA",
          "showName": "值班时间",
          "showMetaColumn": "ZBKSSJ"
        }
      ],
      data: [],
      showDefault: [],
      showPicker: false,
      chooseTime: dsf.date.format(new Date(), 'yyyy-mm'),
      loading: true,
      previous: null
    }
  },
  computed: {
    
  },
  watch: {
    chooseTime: {
      handler(nv) {
        this.init()
      }
    }
  },
  created() {
    if (this.$route.query.date) {
      this.chooseTime = this.$route.query.date
    }
    this.init();
  },
  methods: {
    preMonth() {
      let year = this.chooseTime.split('-')[0]; //获取当前日期的年份
      let month = this.chooseTime.split('-')[1]; //获取当前日期的月份
      let year2 = year;
      let month2 = parseInt(month) - 1;
      if (month2 == 0) {
          year2 = parseInt(year2) - 1;
          month2 = 12;
      }
      if (month2 < 10) {
          month2 = '0' + month2;
      }
      this.chooseTime = `${year2}-${month2}`
    },
    nextMonth() {
      let year = this.chooseTime.split('-')[0]; //获取当前日期的年份
      let month = this.chooseTime.split('-')[1]; //获取当前日期的月份
      let year2 = year;
      let month2 = parseInt(month) + 1;
      if (month2 == 13) {
          year2 = parseInt(year2) + 1;
          month2 = 1;
      }
      if (month2 < 10) {
          month2 = '0' + month2;
      }
      this.chooseTime = `${year2}-${month2}`
    },
    init() {
        this.loading = true
        dsf.http.post('ctrl/DutyForMobiles/getSchedule',{year: this.chooseTime.split('-')[0], month: this.chooseTime.split('-')[1]}).then(res => {
          if(res.data.code == 200) {
            this.data = res.data.data.datas
          }
        }).error(e => {
          dsf.layer.toast('系统出错，请再次尝试')
        }).always(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';
.topRemark {
  background-color: #fff;
  text-align: center;
  padding-top: 6px;
}
.allTab {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: var(--font_size_2);
  padding: 0 60px;
  align-items: center;
  .choose {
    background-color: #fff;
    padding: 4px 10px;
    flex: 1;
    text-align: center;
  }
  .tabIndex {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    background-color: #ddd;
  }
}
.title {
  font-size: 18px;
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
}
::v-deep .van-col {
  min-height: 30px
}
</style>