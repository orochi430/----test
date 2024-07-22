<template>
<div>
  <van-popup v-model="show" class="flex dc" position="bottom" round @close="close">
      <van-nav-bar
        left-text="取消"
        @click-left="close"
        style="border-bottom: 5px solid #F1F2F4;"
      >
      <template #title>
      <div>
        <van-icon name="arrow-left" @click="lastMonth" color="#666"/>
        <span>{{year}}年{{month+1}}月</span>
        <van-icon name="arrow" @click="nextMonth" color="#666"/>
      </div>
    </template>
    </van-nav-bar>
      <div class="weeks">
        <div v-for="item in weeks" class="week" @click="chooseWeek(item)">
          <div>{{item.week}}</div>
          <div>{{item.sdate.slice(5)}}至{{item.edate.slice(5)}}</div>
        </div>
      </div>
  </van-popup>
</div>
</template>

<script>
export default {
  name: 'chooseWeek',
  data() {
    return {
      show: true,
      value: '',
      year: moment().year(),
      month: moment().month(),
      weeks: []
    }
  },
  created() {
    this.getWeek(this.year,this.month)
  },
  methods: {
    getWeek(year, month) {
      this.weeks.splice(0)
      let firstMonday = moment().year(year).month(month).date(1).day(8);
      if (firstMonday.date() > 7) firstMonday.day(-6);
      console.log(firstMonday)
      let index = 1
      console.log(moment(firstMonday).month())
      let sdate = firstMonday
      while (moment(sdate).month() == month) {
        console.log(sdate)
        this.weeks.push({
          week: `第${index}周`,
          sdate: sdate.format("YYYY-MM-DD"),
          edate: moment(sdate).add(6, "days").format("YYYY-MM-DD")
        })
        sdate.add(7, "days")
        index ++
      }
      console.log(this.weeks)
    },
    lastMonth() {
      if (this.month > 0) {
        this.month --
      } else {
        this.month = 11
        this.year --
      }
      this.getWeek(this.year,this.month)
    },
    nextMonth() {
      if (this.month < 11) {
        this.month ++
      } else {
        this.month = 0
        this.year ++
      }
      this.getWeek(this.year,this.month)
    },
    chooseWeek(item) {
        this.$bus.emit('chooseWeek', {
              week: item
        });
        this.close()
    },
    close() {
      this.show = false
      this.$emit("closeCallback", this.value)
    }
  }
}
</script>
<style lang='scss' scoped>
.weeks {
  display: flex;
  flex-wrap: wrap;
  .week {
    margin: 10px;
    padding: 20px 5px;
    text-align: center;
    width: calc(33.33% - 20px);
    background: #f7f7f7;
    border-radius: 5px;
  }
}
</style>
