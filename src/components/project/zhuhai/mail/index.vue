<template>
<div>
  <div v-for="(item, index) in list" :key="index" class="mail" @click="$router.push('/zhuhaiMailInfo')">
    <img :src="item.icon" alt="">
    <span>{{item.name}}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        icon: require('./imgs/QQmail.png'),
        name: 'QQ邮箱',
      },{
        icon: require('./imgs/exchange.png'),
        name: 'Exchange',
      },{
        icon: require('./imgs/163.png'),
        name: '163邮箱',
      },{
        icon: require('./imgs/126.png'),
        name: '126邮箱',
      },{
        icon: require('./imgs/Gmail.png'),
        name: 'Gmail',
      },{
        icon: require('./imgs/outlook.png'),
        name: 'Outlook',
      },{
        icon: require('./imgs/other.png'),
        name: '其他邮箱',
      }]
    }
  }
}
</script>
<style lang='scss' scoped>
.mail {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
  img {
    display: inline-block;
    width: 32px;
    height: 32px;
    padding-right: 20px;
    padding-left: calc(50% - 60px);
  }
}
</style>