<template>
<div class="container">
  <div class="title flex ac">
    <img src="@/assets/imgs/recentMeetings.png" alt="">
    <span style="flex: 1;">近期会议</span>
    <!-- <span class="sub" @click="toList">更多</span> -->
  </div>
  <div class="card">
    <template v-if="dates.length > 0" >
      <div v-for="date in dates" :key="date.date" class="date flex as">
        <div class="date-time flex dc jc ac">
          <span>{{date.dateChinese}}</span>
          <span>{{date.date}}</span>
        </div>
        <div style="flex: 1">
          <div class="date-item" v-for="item in date.data" @click="toMeeting(item)">
            <em>&#9670;</em>
            <span>&#9670;</span>
            <div class="time">{{item.time}}</div>
            <div class="title clamp">{{item.bt}}</div>
            <div class="sub flex jb">
              <span><img src="@/assets/imgs/conference/address.png" alt="">{{item.address}}</span>
              <span><img src="@/assets/imgs/conference/type.png" alt="">{{item.meetingType}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <commonempty v-else :image="require('@/assets/imgs/conference/empty.png')" class="meeting-empty" description="暂无待参加会议" />
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      dates: []
    }
  },
  created() {
    this.getData()
  },
  activated() {
    this.getData()
  },
  methods: {
    getData() {
      dsf.http.post('fn/meeting/getRecentMeetingData').then(res => {
        if(res.data.code == 200) {
          this.dates = res.data.data
        }
      })
    },
    toList() {
      this.$router.push('/commonTabs/receiveNotice?title=会议通知')
    },
    toMeeting(item) {
      if (item.moduleId == '190121161348OthBI4s3sEhvfuDJ5FD') { // 如果是通知模块跳转通知单
        this.$router.push({
          path: `/commonForm/${item.moduleId}/${item.id}`,
          query: {
            listId: 'MeetingList',
            method: 'customNode',
            validateByList: '1',
            hyTzlx: '1',
            hytzStatus: '-2',
            showNodeId: '16'
          }
        })
      } else if (item.moduleId == '210902110807b6V0jmvL06vdMmcRTMW') { // 会中跳转会中首页
        this.$router.push({
          path: `/conferenceIndex`,
          query: {
            id: item.id
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  margin: 10px;
  .title {
    margin-bottom: 10px;
    font-size: var(--font_size_1);
    font-weight: bold;
    color: #333;
    img {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
    .sub {
      font-size: var(--font_size_4);
      color: #666;
    }
  }
  .card {
    background-color: #FFF;
    border-radius: 6px;
    padding: 25px 15px 15px;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);
    .date {
      position: relative;
      &:after {
        content: " ";
        width: 0;
        height: calc(100% - 60px);
        border-right: 1px solid #d8d8d8;
        position: absolute;
        left: 22px;
        top: 50px;
      }
      .date-time {
        background: #C8E3FF;
        border: 1px solid rgba(0,105,210,1);
        border-radius: 5px;
        font-size: 15px;
        color: #0069D2;
        width: 44px;
        height: 44px;
        margin-right: 15px;
      }
      .date-item {
        flex: 1;
        border: 1px solid #b2b2b2;
        border-radius: 5px;
        box-shadow: 0px 0px 6px 4px rgba(244,244,244,0.5);
        padding: 10px;
        position: relative;
        margin-bottom: 10px;
        &>span, &>em {
          font-size: var(--font_size_0);
          position: absolute;
          left: -7px;
          top: 7px;
          color: #b2b2b2;
        }
        &>span {
          left: -6px;
          color: #fff;
        }
        .time {
          color: #0069D2;
          padding-bottom: 5px;
        }
        .title {
          font-size: 15px;
          color: #333333;
          margin-bottom: 5px;
        }
        .sub {
          font-size: var(--font_size_4);
          color: #666666;
          &>span:last-child {
            flex-shrink: 0;
          }
          img {
            width: auto;
            height: 14px;
            margin-right: 6px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
