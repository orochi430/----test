<template>
  <div>
    <div class="date spaceAround">
      <div class="center" @click="showDate = true">
        <span class="dateSpan">{{ dateStart | dateFilter}}</span>
        <span class="triangle"></span>
      </div>
      <span>至</span>
      <div class="center" @click="showDate = true">
        <span class="dateSpan">{{ dateEnd | dateFilter}}</span>
        <span class="triangle"></span>
      </div>
    </div>
    <div class="title spaceBetween">
      <span class="span">各司局统计</span>
      <div class="center">
        <span class="first"></span><span>被纳入管控区</span>
        <span class="last"></span><span>未被纳入管控区</span>
      </div>
    </div>
    <div class="content">
      <div class="card" v-for="item in dataArray" :key="item.orgId">
        <div class="spaceBetween sector" @click="goDetile(item)">
          <div class="center" >
            <span v-if="item.orgId !== 'total'" :class="item.nrgkq=='1' ? 'last' : 'first'" style="width:8px;height:8px;"></span>
            <span>{{item.orgName}}</span>
          </div>
          <i class="font iconfont icongengduo1"></i>
        </div>
        <div class="numberBox spaceAround">
          <div class="center" style="flex-direction: column;">
            <div class="number" :style="numberColor[0]">{{item.zrs}}</div>
            <div>总人数</div>
          </div>
          <div class="center" style="flex-direction: column;">
            <div class="number" :style="numberColor[1]">{{item.tbcs}}</div>
            <div>填报次数</div>
          </div>
          <div class="center" style="flex-direction: column;">
            <div class="number" :style="numberColor[2]">{{item.dgrc}}</div>
            <div>到岗人次</div>
          </div>
          <div class="center" style="flex-direction: column;">
            <div class="number" :style="numberColor[4]">{{item.syrc}}</div>
            <div>涉疫人次</div>
          </div>
        </div>
      </div>
    </div>
    <van-calendar v-model="showDate" :min-date="minDate" type="range" allow-same-day
      @confirm="onConfirm" />
  </div>
</template>

<script>

export default {
  name: "fangyiIndex",
  data() {
    return {
      numberColor: ["color:#0089FF", "color:#F89908", "color:#00AAB2", "color:#F73131"],
      dateStart: "",
      dateEnd: "",
      minDate: new Date(2020, 0, 1),
      showDate: false,
      org_id: "",
      dataArray: []
    };
  },
  created() {
    this.init()
  },
  filters: {
    dateFilter(msg){
      let arr = msg.split("-")
      return `${arr[0]}年${arr[1]}月${arr[2]}日`
    }
  },
  methods: {
    onConfirm(date) {
      const [start, end] = date;
      this.showDate = false;
      this.dateStart = this.getNowFormatDate(start)
      this.dateEnd = this.getNowFormatDate(end)
      this.getFytjList()
    },
    getNowFormatDate(date) {
      let year = date.getFullYear(),
      month = date.getMonth() + 1,
      strDate = date.getDate()
      if (month >= 1 && month <= 9) month = '0' + month // 如果月份是个位数，在前面补0
      if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate // 如果日是个位数，在前面补0
      return `${year}-${month}-${strDate}`
    },
    getFytjList() {
      dsf.http.get("/ctrl/mzbMobileController/fytjList", {
        query_time_start: this.dateStart,
        query_time_end: this.dateEnd,
        query_org_id: this.org_id
      }).then(({data}) => {
        this.dataArray = data.data.dataArray
      })
    },
    init(){
      this.dateStart = this.getNowFormatDate(new Date())
      this.dateEnd = this.getNowFormatDate(new Date())
      this.org_id = this.$route.query.id
      this.getFytjList()
    },
    goDetile(item){
      this.$router.push({
        path: `/fangyiDetail/${item.orgId}`,
        query: {
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
          id: item.orgId
        }
      })
    }
  },
  activated() {
    this.init()
  }
};
</script>

<style lang="scss" scoped>
.date {
  background: #fff;
  padding: 15px;

  .triangle {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #666666;
    margin-left: 8px;
  }

  .dateSpan {
    font-size: 13px;
    color: #333333;
  }
}

.title {
  margin: 10px 10px 0;

  .span {
    font-size: var(--font_size_1);
  }
}

.content {
  .card {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    margin: 12px;
    padding: 10px;

    .sector {
      margin-bottom: 10px;
      font-size: var(--font_size_2)
    }

    .numberBox {
      background: #F5F8FC;
      border-radius: 12px;
      padding: 20px 15px;

      .number {
        font-size: var(--font_size_0);
      }
    }
  }
}

.first {
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  margin-right: 5px;
  background: #F73131;
}

.last {
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 5px;
  background: #39B362;
}

.center {
  display: flex;
  align-items: center;
}

.spaceBetween {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.spaceAround {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
