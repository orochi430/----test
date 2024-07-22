<template>
<div class="wan-header" :style="{backgroundImage: `url(static/images/wanzhengtong/top.png)`}">
  <div>
    <img src="static/images/wanzhengtong/search.png" alt="" @click="$router.push('/commonList?fileType=WZTzhcx')">
    <img src="static/images/wanzhengtong/service.png" alt="">
  </div>
  <div class="dept">
    <!-- {{dept}} -->
  </div>
  <div class="name">
    {{ new Date().getHours() | greeting }}，{{ name }}
  </div>
</div>
</template>

<script>
export default {
  filters: {
    greeting(hour) {
      if(hour >=0 && hour <= 10) {
        return '早上好'
      } else if(hour > 10 && hour <= 14) {
        return '中午好'
      } else if(hour > 14 && hour <= 18) {
        return '下午好'
      } else if(hour > 18 && hour <= 24) {
        return '晚上好'
      }
    }
  },
  data() {
    return {
      dept: '大数据中心',
      name: dsf.util.loadSessionStore("user").name,
    }
  }
}
</script>
<style lang='scss' scoped>
.wan-header {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  padding: 15px;
  text-align: right;
  margin-bottom: -65px;
  img {
    width: 16px;
    height: 16px;
    display: inline-block;
    padding-left: 16px;
  }
  .dept {
    padding-top: 38px;
    padding-bottom: 30px;
  }
  .name {
    padding-bottom: 100px;
    font-size: var(--font_size_2);
  }
}
</style>