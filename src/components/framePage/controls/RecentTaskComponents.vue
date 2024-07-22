<template>
<div class="container">
  <div class="card">
    <div class="top flex jb ac">
      <img src="../../../../static/images/taskManager/home-task.png" alt="">
      <span class="flex1">最近任务 {{total}}</span>
      <span class="sub" @click="toList">全部<van-icon name="arrow" /></span>
    </div>
    <div class="content">
      <template v-if="!loading">
        <van-swipe v-if="total > 0" class="my-swipe" :loop="false" indicator-color="#1064CD">
          <van-swipe-item v-for="(group, index) in groups" :key="index">
            <div v-for="item in group" class="task-item" @click="toDetail(item)">
              <div class="title flex jb as">
                <img v-if="item['C-TASKMAN-TASK-0005.value']" :src="`static/images/taskManager/icon${item['C-TASKMAN-TASK-0005.value']}.png`" alt="">
                <span class="flex1 clamp">{{item['C-TASKMAN-TASK-0006']}}</span>
                <div :class="['tag', 'tag-red']" v-if="item['C-TASKMAN-TASK-0004.value'] != 3 && dsf.date.parse(item['C-TASKMAN-TASK-0010.value']).getTime() < new Date().getTime()">逾期</div>
                <div :class="['tag', `tag-${item['C-TASKMAN-TASK-0004.value']}`]" v-else-if="item['C-TASKMAN-TASK-0004.value']">{{item['C-TASKMAN-TASK-0004']}}</div>
              </div>
              <div>
                <span class="sub"><i class="iconfont iconyonghu" />{{item['C-TASKMAN-TASK-0001']}}</span>
                <span class="sub"><i class="iconfont iconcalendar-text" />{{item['C-TASKMAN-TASK-0010']}}</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
        <div v-else class="empty">暂无其它任务</div>
      </template>
      <div v-else class="empty"><van-loading />加载中</div>
    </div>
    <div class="bottom" @click="addTask">
      <van-icon name="plus" />
      <span>新建任务</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      groups: [],
      loading: true
    }
  },
  created() {
    this.getList()
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true;
      this.groups = []
      this.total = 0
      dsf.http.post('fn/list/230104111519KOat570Iy1Su66nn2Hy/mobile/q?moduleId=230103192045EncoYZoaQ9Zee0afJmh', {
        taskmanTaskStatus: -1,
        page: 1,
        limit: 30
      }).then(res => {
        this.loading = false
        this.total = res.data.total
        let datas = res.data.datas.map(item => item.dataValue)
        for(let i=0; i < datas.length; i += 3){
          this.groups.push(datas.slice(i, i+3));
        }
      })
    },
    toList() {
      this.$router.push('/commontabs/IMTask')
    },
    addTask() {
      this.$router.push('/addTask/null')
    },
    toDetail(item) {
      this.$router.push(`/taskDetail/${item['A0001']}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  margin: 10px;
}
.card {
  background-color: #FFF;
  border-radius: 6px;
  box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);
  overflow: hidden;
  .sub {
    font-size: var(--font_size_4);
    color: #666;
    i {
      font-size: var(--font_size_4);
      padding-right: 4px;
    }
  }
  .flex1 {
    flex: 1;
  }
  .top {
    padding: 15px;
    border-bottom: 1px solid #f5f5f5;
    img {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
  .content {
    padding: 0 15px;
    ::v-deep .van-swipe-item {
      margin-bottom: 24px;
    }
    .task-item {
      padding: 15px 0;
      border-bottom: 1px solid #f5f5f5;
      .title {
        padding-bottom: 15px;
        img {
          width: 16px;
          height: 16px;
          margin-right: 6px;
        }
      }
      .sub {
        padding-right: 24px;
      }
      .tag {
        font-size: var(--font_size_4);
        padding: 2px 6px;
        border-radius: 4px;
        margin: 0 6px;
        &-1 {
          background-color: #F0F5FF;
          color: #0091FF;
        }
        &-2 {
          background-color: #f1f1f1;
          color: #666;
        }
        &-3 {
          background-color: #F0FFF6;
          color: #0DBF4F;
        }
        &-red {
          background-color: #ffeaea;
          color: #f66c6c;
        }
      }

    }
    .empty {
      text-align: center;
      padding: 15px;
      color: #666;
    }
  }
  .bottom {
    text-align: center;
    padding: 15px;
    background-color: #E4EEFC;
    color: #1064CD;
  }
}
</style>