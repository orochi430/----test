<template>
  <div id="select-leader">
    <div style="background-color: #f5f5f5; height: 0.2rem; width: 100vw"></div>
    <div class="content">
      <template v-for="(item, index) in leaderList">
        <div
          v-if="isOpen || (!isOpen && index < 6)"
          @click="onClick(item, index)"
          :key="item.id"
          class="item-container"
          :class="item.isChecked ? 'color_active' : 'color_normal'"
        >
          <span>{{ item.name||item.userName }}</span>
          <div class="checked" v-if="item.isChecked">
            <van-icon name="success" class="success-icon" />
          </div>
        </div>
      </template>
    </div>
    <div class="row personChoose" v-if="leaderList.length > 6">
      <span class="btn" @click="chooseAll()">{{!isChoodeAll ? '全选' : '取消全选'}}</span><span></span>
      <span class="btn" @click="isOpen = !isOpen">{{isOpen? '收起' : '展开'}}</span>
    </div>
    <van-sticky :offset-top="mainTab ? dsf.util.getOffsetTop('1.76rem') : dsf.util.getOffsetTop('0.88rem')">
      <div class="row timeChoose">
        <span :class="['btn', {'btn-active': chooseWeek == 'last'}]" @click="selectWeek('last')">上周</span>
        <span :class="['btn', {'btn-active': chooseWeek == 'current'}]" @click="selectWeek('current')">本周</span>
        <span :class="['btn', {'btn-active': chooseWeek == 'next'}]" @click="selectWeek('next')">下周</span>
      </div>
      <!-- <div>{{leaderWeekSdate}} - {{leaderWeekEdate}}</div> -->
    </van-sticky>
  </div>
</template>

<script>
export default {
  name: "selectLeader",
  props: {
    mainTab: {
      type: Object
    },
  },
  data() {
    return {
      postUrl:"/fn/ldrc/unit/getMobileLeaders",
      leaderList: [],
      checkedList: [],
      isChoodeAll: false,
      isOpen: true,
      chooseWeek: 'current',
      leaderWeekSdate: '',
      leaderWeekEdate: '',
      currentWeekSdate: '',
      currentWeekEdate: '',
      lastNum: 0,
      nextNum: 0
    };
  },
  created() {
	  // this.init(this.postUrl);
    this.getCurrentWeek()
  },
  mounted() {},
  watch: {
    mainTab(val) {
      this.selectWeek('current')
    }
  },
  methods: {
    getCurrentWeek() {
      let nowTime = new Date().getTime() ;
      let day = new Date().getDay() || 7;
      let oneDayTime = 24*60*60*1000 ;
      this.currentWeekSdate = dsf.date.format(new Date(nowTime - (day-1)*oneDayTime), 'yyyy-mm-dd');
      this.currentWeekEdate = dsf.date.format(new Date(nowTime + (7-day)*oneDayTime), 'yyyy-mm-dd') ;
    },
    init(postUrl) {
      this.checkedList=[];
      this.dsf.http
        .post(postUrl)
        .then((res) => {
          if (res.data.code == 200) {
            this.leaderList = res.data.data.map((item) => {
              item.isChecked = false;
              return item;
            });
          } else {
            dsf.layer.toast("获取数据失败,请稍后再试");
          }
        })
        .catch((err) => console.log(err));
    },
    onClick(item, index) {
      item.isChecked = !item.isChecked;
      if (this.checkedList.includes(item.id)) {
        this.checkedList.splice(this.checkedList.indexOf(item.id), 1);
      } else {
        this.checkedList.push(item.id);
      }
      this.isChoodeAll = (this.checkedList.length == this.leaderList.length)
      this.$emit("selectLeader", {
        selectLeaderList: this.checkedList,
      });
    },
    chooseAll() {
      this.isChoodeAll = !this.isChoodeAll;
      this.checkedList = []
      this.leaderList.forEach(item => {
        item.isChecked = this.isChoodeAll
        if(this.isChoodeAll) {
          this.checkedList.push(item.id);
        }
      })
      this.$emit("selectLeader", {
        selectLeaderList: this.checkedList,
      });
    },
    selectWeek(val) {
      this.chooseWeek = val
      if (val == 'current') {
          this.lastNum = 0
          this.nextNum = 0
          this.leaderWeekSdate = this.currentWeekSdate
          this.leaderWeekEdate = this.currentWeekEdate
      } else if (val == 'last') {
          this.lastNum += 1
          this.nextNum = 0
          this.leaderWeekSdate = dsf.date.format(dsf.date.parse(this.currentWeekSdate).getTime()-this.lastNum*7*24*60*60*1000, 'yyyy-mm-dd')
          this.leaderWeekEdate = dsf.date.format(dsf.date.parse(this.currentWeekEdate).getTime()-this.lastNum*7*24*60*60*1000, 'yyyy-mm-dd')
      } else if (val == 'next') {
          this.nextNum += 1
          this.lastNum = 0
          this.leaderWeekSdate = dsf.date.format(dsf.date.parse(this.currentWeekSdate).getTime()+this.nextNum*7*24*60*60*1000, 'yyyy-mm-dd')
          this.leaderWeekEdate = dsf.date.format(dsf.date.parse(this.currentWeekEdate).getTime()+this.nextNum*7*24*60*60*1000, 'yyyy-mm-dd')
      }
      this.$emit("selectLeaderWeek", {
        leaderWeekSdate: this.leaderWeekSdate,
        leaderWeekEdate: this.leaderWeekEdate
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
#select-leader {
  font-size: var(--font_size_2);
  background-color: #fff;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    text-align: center;
    padding: 15px;

    .item-container {
      border-radius: 4px;
      padding: 8px 0;
      position: relative;

      .checked {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 55%;
        width: 23%;
        @include background-theme("normal");
        // background-color: #1677ff;
        border-radius: 0 0 4px 0;
        clip-path: polygon(100% 0px, 100% 100%, 0px 100%);

        .success-icon {
          font-size: var(--font_size_4);
          color: #fff;
          position: absolute;
          right: 1px;
          bottom: 0;
        }
      }
    }
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    text-align: center;
    padding: 15px;

  }
  .personChoose {
    padding-top: 0;
    .btn {
      @include font-theme("normal");
      // padding: 6px 16px;
      border-radius: 4px;
      font-weight: 600;
      // border: 1px solid;
      // @include border-color-theme("normal");
    }
  }
  .timeChoose {
    border-top: 10px solid #f5f5f5;
    background-color: #fff;
    .btn {
      background-color: #f5f5f5;
      padding: 6px 16px;
      border-radius: 20px;
    }
    .btn-active {
      @include background-theme("normal");
      color: #fff;
    }
  }
}

.color_active {
  @include lighter-background-theme("normal", 20%);
  @include font-theme("normal");
  // background-color: #e7f1ff;
  // color: #1677ff;
}

.color_normal {
  background-color: #f5f5f5;
  color: #333333;
}
</style>
