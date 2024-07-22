<template>
<div class="todo-list">
  <van-list :finished="finished" v-model="loading" @load="onLoad" offset="300">
    <div v-for="(data, idx) in datas" :key="idx" class="card" @click="link(data.dataValue)">
      <div class="sub">
        <img v-if="Number(data.dataValue['S-UNIFY-TASK-00010'])" :src="`static/images/wanzhengtong/urgent_${data.dataValue['S-UNIFY-TASK-00010']}.png`" 
          style="height: 0.3rem; width: auto; padding-right: 4px">
        <span class="dept elps"><img src="static/images/wanzhengtong/dept.png" alt="">{{data.dataValue['S-UNIFY-TASK-00020'] || data.dataValue['B0056']}}</span>
        <span class="time"><i class="iconfont iconclock"></i>{{data.dataValue['S-UNIFY-TASK-00025'] || data.dataValue['B0005']}}</span>
      </div>
      <div class="title elps">{{data.dataValue['S-UNIFY-TASK-0005'] || data.dataValue['B0001']}}</div>
    </div>
  </van-list>
  <commonempty v-if="!datas.length && !loading"></commonempty>
</div>
</template>

<script>
export default {
  props: {
    url: {
      type: String
    }
  },
  data() {
    return {
      datas: [],
      finished: false,
      loading: false,
      start: 1
    }
  },
  activated() {
    this.onRefresh()
  },
  methods: {
    onRefresh() {
      this.datas = []
      this.finished = false
      this.loading = true
      this.start = 1
      this.fetchData()
    },
    onLoad() {
      // 上拉加载
      this.fetchData();
    },
    fetchData() {
      if (this.url) {
        dsf.http.post(this.url, {
          limit: 5,
          page: this.start,
        }).then(res => {
          if(res.data.datas) {
            this.datas = [...this.datas, ...res.data.datas]
            this.start += 1;
            if (this.datas.length == res.data.total) {
              this.finished = true
            }
          }
        }).catch(err => {
          this.finished = true;
        }).finally(() => {
          this.loading = false;
          // this.isLoading = false;
        });
      }
    },
    async link(itemValue) {
      if(itemValue['A0001'] && itemValue['A0004']) {
        this.$router.push(`/commonForm/${itemValue['A0004']}/${itemValue['A0001']}`)
      } else if(itemValue['S-UNIFY-TASK-00028']) {
        await dsf.http.post('ctrl/unifyOfficeInfo/requestChangeRead',{
          dataId: itemValue['S-BASE-0001'],
          type: 'todounify',
          appCode: itemValue['S-UNIFY-TASK-0002.value']
        }).then(res => {
          itemValue['S-UNIFY-TASK-00014'] = 1
        })
        if (window.dd) {
          dd.openLink({
            url: itemValue['S-UNIFY-TASK-00028']
          }).then(res => {
            console.log(res)
          }).catch(err => { })
        } else {
          this.$router.push({
            path: "/iframe",
            query: {
              url: itemValue['S-UNIFY-TASK-00028'],
              title: itemValue['S-UNIFY-TASK-0005']
            }
          })
        }
      }else {
        dsf.layer.toast('该文件建议在电脑端处理')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.todo-list {
  max-height: 480px;
  overflow: auto;
  // 滚动条整体部分
    &::-webkit-scrollbar{
        width: 3px;//对垂直方向滚动条
        height: 6px;//对水平方向滚动条
    }
    //滚动的滑块
    &::-webkit-scrollbar-thumb{
    border-radius:3px;
    background-color: #D7E7F8//滚动条的颜色
    }
    // //内层滚动槽
    // &::-webkit-scrollbar-track-piece{
    // background-color:#ccc ;
    // }
  .card {
    margin: 16px;
    background: rgba(255,255,255,0.80);
    box-shadow: 0 2px 14px 0 rgba(131,190,236,0.16);
    border-radius: 10px;
    padding: 16px;
    .sub {
      font-size: var(--font_size_4);
      padding-bottom: 10px;
      color: #666;
      display: flex;
      justify-content: space-between;
      .dept {
        flex: 1;
        img {
          height: 0.3rem;
          width: auto;
          display: inline-block;
          vertical-align: bottom;
        }
      }
      i {
        vertical-align: bottom;
      }
    }
    .title {
      font-weight: 600;
    }
  }
}
</style>