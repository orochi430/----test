<template>
<div>
  <van-search v-model="value" placeholder="搜索关键词" />
  <div class="mail" v-for="(item, index) in mailList" :key="index" @click="$router.push(item.url)">
    <img :src="item.icon" alt="">
    <span>{{item.title}}</span>
    <van-icon name="arrow" color="#ababab"/>
  </div>
  <!-- <div class="capacity">
    <span class="dot"></span>
    <span>邮箱容量</span>
    <div class="progress">
      <van-progress :percentage="50" stroke-width="10" color="#3389e0" :show-pivot="false"/>
    </div>
    <span style="color:#ababab">{{now}}/{{all}}</span>
  </div> -->
  <dsf-fab :fab-items="addBtn"></dsf-fab>
</div>
</template>

<script>
import dsfFab from "@/components/dsfFab/dsfFab";
export default {
  components: { dsfFab },
  data() {
    return {
      value: '',
      now: '300M',
      all: '500M',
      mailList: [{
        icon: 'static/images/jiangsuyancao/inbox.png',
        title: '收件箱',
        url: '/jiangsuyancaoMailList?type=0'
      },{
      //   icon: 'static/images/jiangsuyancao/drafts.png',
      //   title: '草稿箱',
      //   url: '/jiangsuyancaoMailList?type=2'
      // },{
        icon: 'static/images/jiangsuyancao/compose.png',
        title: '发件箱',
        url: '/jiangsuyancaoMailList?type=1'
      },{
        icon: 'static/images/jiangsuyancao/bin.png',
        title: '垃圾箱',
        url: '/jiangsuyancaoMailList?type=3'
      }],
      addBtn: [{
        icon: "iconjiahao",
        title: "新增",
        type: "go", // 'event'
        url: "/jiangsuyancaoMailEdit",
        action: "",
      }],
    }
  }
}
</script>
<style lang='scss' scoped>
.mail {
  margin-top: 10px;
  background-color: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
  span {
    flex: 1;
    font-size: var(--font_size_1);
  }
}
.capacity {
  .dot {
    width: 10px;
    height: 10px;
    border: 2px solid #f8bc18;
    border-radius: 50%;
    margin-right: 8px;
  }
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .progress{
    flex: 1;
    margin: 0 8px;
  }
}
</style>
