<template>
<div class="wan-notice">
  <img src="static/images/wanzhengtong/notice.png" alt="">
  <div class="content" v-if="list.length == 0">
    <p>暂无数据</p>
    <!-- <p class="elps" v-for="(item, index) in list" :key="index" @click="to(item)">{{item['n.Unify-Notice-0009']}}</p> -->
  </div>
  <van-swipe vertical :show-indicators="false" :loop="true" autoplay="3000" :touchable="false" :height="24">
    <van-swipe-item v-for="(item, index) in list" :key="index" class="ellipsis" @click="to(item)">
      <span style="line-height: 0.44rem">{{item['n.Unify-Notice-0009']}}</span>
    </van-swipe-item>
  </van-swipe>
  <div class="arrow" @click="$router.push('/commonList/210527161957rOqq8K5AdDLrNBqQIkp/210526190113N1Nxycuf1n1qtul7pwM')">
    <van-icon name="arrow" color="#fff" size="10"/>
  </div>
</div>
</template>

<script>
export default {
  props: ['currentComponent', 'currentPortalId'],
  data() {
    return {
      list: []
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
      dsf.http.post('fn/list/220715155311GHDuGKDlXzrQUEFWuZp/mobile/q?moduleId=210526190113N1Nxycuf1n1qtul7pwM&isFirst=1', {
        page: 1,
        limit: 30,
        pageId: this.currentPortalId
      }).then(res => {
        if(res.data.datas.length) {
          this.list = res.data.datas.map(item => item.dataValue)
        }
      })
    },
    async to(item) {
      await dsf.http.post('ctrl/unifyOfficeInfo/requestChangeRead',{
        dataId: item['n.A0001'],
        type: 'unifynotice',
        appCode: item['n.Unify-Notice-0023']
      }).then(res => {
        item['un.Unify-Notice-User-0003'] = 1
      })
      if(window.dd) {
        if (item['n.Unify-Notice-0003'].indexOf(`${location.host}${location.pathname}`) > -1) {
          this.$router.push(item['n.Unify-Notice-0003'].split('#')[1]);
        } else {
          dd.openLink({
            url: item['n.Unify-Notice-0003']
          }).then(res => {
              console.log(res)
          }).catch(err => { })
        }
      } else {
        if (item['n.Unify-Notice-0003'].indexOf(`${location.host}${location.pathname}`) > -1) {
          this.$router.push(item['n.Unify-Notice-0003'].split('#')[1]);
        } else {
          this.$router.push({
            path: "/iframe",
            query: {
                url: item['n.Unify-Notice-0003'],
                title: item['n.Unify-Notice-0009']
            }
          })
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.wan-notice {
  background-image: linear-gradient(180deg, #F5FAFF 0%, #FFFFFF 100%);
  box-shadow: 0 1px 20px 0 rgba(166,201,235,0.26);
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 15px;
  padding: 15px 10px;
  &>img {
    width: 55px;
    height: auto;
  }
  .content {
    flex: 1;
    overflow: hidden;
    p {
      padding: 2px 10px;
    }
  }
  .van-swipe {
    padding: 0 10px;
    height: 44px;
    flex: 1;
  }
  .arrow {
    background-color: #1e6cf1;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: 0 2px 8px 0 #5c8dbf;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>