<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted() {
    let logname = this.$route.query.logName || this.$route.query.login_name
    if (logname) {
      let ticket = dsf.md5(dsf.md5(`${logname}87~5c*b7-2$8-1a-9c81|003e@0f21`))
      dsf.http.post('/fn/mobileCustomSso/loginByName', {
        logName: logname,
        ticket: ticket
      }).then(res => {
        if (res.data.rcode == 1) {
          let path = dsf.base64.decode(this.$route.query.state)
          dsf.util.saveToSessionStore("user", res.data.data);
          dsf.util.saveToSessionStore("loginToken", res.data.data.auth.token);
          dsf.util.saveToLocalStore("loginToken", res.data.data.auth.token);
          dsf.util.saveToLocalStore("user", JSON.stringify(res.data.data));
          dsf.util.logIn(() => {
            this.$router.replace(path);
          });
        } else {
          dsf.layer.toast('登录失败')
        }
      })
    } else {
      dsf.layer.toast('登录失败')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>