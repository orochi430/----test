<template>
<div>
  <van-cell v-for="(item, index) in menus" :key="index" :title="item.title" is-link @click="to(item)"/>
</div>
</template>

<script>
export default {
  data() {
    return {
      menus: [{
        title: "字体大小",
        url: "/setFontSize"
      }, {
        title: "修改密码",
        url: dsf.config.setting['SYS-MOBILE-UPDATEPWD-001'] || ''
      }]
    }
  },
  methods: {
    to(item) {
      if (item.url.indexOf('http') == 0) {
        if(window.dd) {
          dd.openLink({
            url: item.url
          }).then(res => {
            console.log(res)
          }).catch(err => { })
        } else {
          this.$router.push({
            path: "/iframe",
            query: {
                url: item.url,
                title: item.title
            }
          })
        }
      } else {
        this.$router.push({
          path: item.url,
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.van-cell {
  font-size: var(--font_size_2);
  padding: 0.32rem;
  ::after {
    border-bottom: 1px solid #ebedf0;
  }
}
</style>
