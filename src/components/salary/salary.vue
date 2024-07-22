<template>
<div class="salary">
  <van-sticky :offset-top="dsf.util.getOffsetTop()">
    <div class="sticky">
      <div @click="dateShow=true">发放日期<i class="iconfont iconxialajiantou"></i></div>
      <div>共<span class="count">{{count}}</span>笔工资记录</div>
    </div>
  </van-sticky>
  <commonempty  v-if="!gztArray.length" />
  <div v-for="item in gztArray" :key="item.id" class="gzt" @click="showDetail(item)">
    <div class="gz_icon"><i class="iconfont iconqian"></i></div>
    <div class="gz_title">
      <p>{{item.year}}{{item.month}}月份工资</p>
      <p>发放日期{{item.publish_time}}</p>
    </div>
    <div class="gz_money">
      +{{item.gz}}
    </div>
  </div>
  <van-popup v-model="detailShow" position="bottom" :style="{ height: '100%' }">
    <salary-detail :salary="chooseData" @close="detailShow = false"></salary-detail>
  </van-popup>
  <van-calendar
      :get-container="getContainer"
      v-model="dateShow"
      :min-date="minDate"
      type="range"
      @confirm="confirmDate"
    />
</div>
</template>

<script>
import dateObj from '@/common/date'
import {mapState} from 'vuex'
import salaryDetail from './salaryDetail'
export default {
  components:{salaryDetail},
  data() {
    return {
      getContainer:'#app',
      dateShow: false,
      minDate: new Date(new Date().getFullYear() - 40, 0, 1),
      detailShow: false,
      date: '',
      chooseData: {},
      count: 1,
      gztArray:[{
        year:'2021',
        month: '04',
        publish_time:'20210401',
        gz: '17777'
      },{
        year:'2021',
        month: '04',
        publish_time:'20210401',
        gz: '17777'
      },{
        year:'2021',
        month: '04',
        publish_time:'20210401',
        gz: '17777'
      },{
        year:'2021',
        month: '04',
        publish_time:'20210401',
        gz: '17777'
      },{
        year:'2021',
        month: '04',
        publish_time:'20210401',
        gz: '17777'
      },{
        year:'2021',
        month: '05',
        publish_time:'20210401',
        gz: '1111111'
      },]
    }
  },
  computed: {
    ...mapState({
      isShowAppFooter: state => state.isShowAppFooter,
      isShowAppHeader: state => state.isShowAppHeader
    })
  },
  created(){
    // dsf.http.post('/fn/gzt/getGztInfoList',{
    //   fprq:''
    // }).then(res => {
    //   console.log(res)
    // })
  },
  methods:{
    confirmDate(date) {
      const [start, end] = date;
      this.dateShow = false;
      this.date = `${dateObj.format(start, 'yyyy-mm-dd')} - ${dateObj.format(end, 'yyyy-mm-dd')}`;
      console.log(this.date)
    },
    showDetail(item){
      this.detailShow= true
      this.chooseData = item
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.sticky{
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 20px;
  .count{
    @include font-theme('normal');
  }
}
.gzt{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #fff;
  margin: 5px;
  .gz_icon{
    @include font-theme('normal');
    i{
      font-size: 26px;
    }
  }
  .gz_title{
    flex: 1;
    padding: 0 10px;
    p:first-of-type{
      @include font_4;
    }
    p:last-of-type{
      color: $fontColor;
    }
  }
  .gz_money{
    @include font-theme('normal');
    @include font_1;
  }
}
</style>
