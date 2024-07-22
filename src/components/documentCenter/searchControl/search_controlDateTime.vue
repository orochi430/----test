<template>
  <div class="box">
    <div class="itemSheet">
      <p>{{metaData.title}}</p>
      <div class="dateRange disfr ac">
        <van-field readonly clearable @click="chooseDate" v-model="startDate" placeholder="选择日期" />
        <div class="line"></div>
        <van-field readonly clearable @click="chooseDate" v-model="endDate" placeholder="选择日期" />
      </div>
    </div>
    <van-popup v-model="dateShow" position="bottom" round get-container="#app" :style="{ height: '500px' }">
      <van-calendar :poppable="false" ref="calendar" :min-date="minDate" :max-date="maxDate" type="range" @confirm="confirmDate" first-day-of-week="1" :default-date="null" allow-same-day />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["metaData"],
  data() {
    return {
      dateShow: false, //日期显示
      startDate: "",
      endDate: "",
      defaultdate: [],
      minDate: new Date(dsf.config.commonList?.searchDateSel?.minDate ?? new Date().getFullYear() - 5, 0, 1),//可选择的最小日期
      // maxDate:new Date(dsf.config.commonList?.searchDateSel?.maxDate ) ?? "undefined",//可选择的最大日期
    }
  },
  watch: {
    startDate: {
      handler(val) {
        console.log(val)
        if (val != "") {
          this.metaData.value = `${this.startDate} - ${this.endDate}`
        }
      }
    },
    endDate: {
      handler(val) {
        console.log(val)
        if (val != "") {
          this.metaData.value = `${this.startDate} - ${this.endDate}`
        }
      }

    },
    metaData: {
      handler(val) {
        if (val.value == "") {
          this.startDate = ""
          this.endDate = ""
        } else {
          this.startDate = val.value.split(' - ')[0]
          this.endDate = val.value.split(' - ')[1]
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    maxDate() {
      let selectDate = dsf.config.commonList?.searchDateSel?.maxDate
      if (selectDate) {
        if (selectDate =="today")
          return new Date()
        return new Date(selectDate)
      }
      else
        return undefined
    }
  },
  methods: {
    chooseDate() {
      this.dateShow = !this.dateShow;
      this.$nextTick(() => {
        this.$refs.calendar.scrollToDate(new Date())
      })
    },
    confirmDate(date) {
      let [start, end] = date;
      this.dateShow = !this.dateShow;
      this.startDate = dsf.date.format(start, "yyyy-mm-dd");
      this.endDate = dsf.date.format(end, "yyyy-mm-dd");
    },
    getContainer() {
      return document.body;
    },
  },
  created() {
    if (this.metaData.defaultValue) {
      this.startDate = this.metaData.defaultValue.split(" - ")[0]
      this.endDate = this.metaData.defaultValue.split(" - ")[1]
    } else {
      this.defaultdate.push(dsf.date.getMonthFirstDay());
      this.defaultdate.push(dsf.date.getMonthLastDay());
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  font-size: var(--font_size_2);
}
.itemSheet {
  font-size: var(--font_size_2);
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
  font-size: var(--font_size_2);
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
.btnBox {
  padding: 15px;
}
.peopleSec {
  height: 36px;
  padding-left: 10px;
  background-color: rgb(235, 239, 245);
  border-radius: 5px;
  overflow-x: scroll;
  overflow-y: hidden;
  .secItem {
    padding: 4px 10px;
    margin: 0 4px;
    white-space: nowrap;
    background: white;
    border-radius: 18px;
  }
}
</style><style lang="scss">
.searchSheet {
  height: 500px;
  .van-action-sheet__content {
    height: 100%;
  }
}
.sheetBox {
  overflow-y: auto;
  .van-cell {
    padding: 10px 0;
  }

  .van-field__body {
    border-radius: 2px;
    overflow: hidden;
  }
  .van-field__control {
    height: 0.72rem;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    padding-left: 0.2rem;
  }
  .peopleSec {
    span {
      margin: 0 5px;
      white-space: nowrap;
    }
  }
  .peopleSec + .van-button {
    height: 36px;
  }
}
.btnBox {
  .van-button--normal {
    padding: 0 40px;
  }
}
</style>









