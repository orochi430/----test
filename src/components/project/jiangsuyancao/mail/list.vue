<template>
<div style="margin-top: 0.2rem">
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedTips"
      @load="onLoad"
    >
      <template v-if="list.length > 0">
        <div class="mail" v-for="(item,index) in list" :key="index" @click="$router.push(`/jiangsuyancaoMailDetail?id=${item.id}&type=${$route.query.type}`)">
          <span v-if="item.status == 0" class="status"></span>
          <div style="flex:1;overflow: hidden;">
            <div class="email flex jb ac">
              <span class="elps">{{ $route.query.type==0 ? item.sender : item.recipient}}</span>
              <span class="sub-font" style="flex-shrink: 0">{{item.createTime}}</span>
            </div>
            <div class="title elps">{{item.title || '(无主题)'}}</div>
            <div class="elps" style="color: #999">{{item.content || '(无内容)'}}</div>
          </div>
        </div>
      </template>
      <commonempty v-if="!list.length && !loading" />
    </van-list>
  </van-pull-refresh>
  <div>

  </div>
  <dsf-fab :fab-items="addBtn"></dsf-fab>
</div>
</template>

<script>
import dsfFab from "@/components/dsfFab/dsfFab";
export default {
  components: { dsfFab },
  data() {
    return {
      addBtn: [{
        icon: "iconjiahao",
        title: "写信",
        type: "go", // 'event'
        url: "/jiangsuyancaoMailEdit",
        action: "",
      }],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      finishedTips: '',
      page: 1
    }
  },
  created() {
    let title = '邮箱列表'
    switch(this.$route.query.type) {
      case '0':
        title = '收件箱'
        break
      case '1':
        title = '发件箱'
        break
      case '2':
        title = '草稿箱'
        break
      case '3':
        title = '垃圾箱'
        break
      default:
        break
    }
    dsf.url.setTitle(title)
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      dsf.http.post('fn/mail/list', {
        type: this.$route.query.type,
        page: this.page,
        limit: 15
      }).then(res => {
        if(res.data.code == 200) {
          this.page += 1
          this.list.push(...res.data.data)
          if(this.list.length == res.data.total || res.data.data.length == 0) {
            this.finished = true;
            this.finishedTips = "没有更多了";
          }
        } else {
          this.finished = true;
          dsf.layer.toast(res.data.message)
        }
      }).catch(({
        message
      }) => {
        this.finished = true;
      })
      .finally(() => {
        this.loading = false;
      });

    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.list = [];
      this.page = 1
      this.onLoad();
    },
  }
}
</script>
<style lang='scss' scoped>
.mail {
  position: relative;
  background-color: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  .status {
    margin: 6px 6px 0 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fa5151;
    display: inline-block;
  }
  .title {
    font-size: var(--font_size_1);
    padding: 8px 0;
  }
  &:not(:last-of-type)::after{
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #cfcfcf;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
}
.sub-font{
  color: #999;
  font-size: var(--font_size_4);
}
</style>
