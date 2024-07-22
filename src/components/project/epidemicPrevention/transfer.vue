<template>
<div>
  <!-- 权限中转页 -->
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
    let privileges = dsf.util.loadLocalStore("user").privileges || [];
    if(privileges.find(item => item.name=="疫情查询高级")) {
      dsf.util.saveToSessionStore('homePage', '/index')
      this.$router.replace('/index')
    } else {
      dsf.util.saveToSessionStore('homePage', '/epidemicPrevention')
      this.$router.replace('/epidemicPrevention')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>