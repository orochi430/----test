<template>
  <div>
    <div>
      {{ tipsText }}
    </div>
  </div>
</template>
  
<script>
import store from "@/common/util";

export default {
  data() {
    return {
      tipsText: ''
    }
  },
  created() {
    //龙政通免登陆
    store.clearSession();
    let self = this;
    let ticket=this.$route.query.ticket;
    dsf.http.get("fn/notAuth/mobileLogin", {ticket}).then((result) => {
              console.log("result",result);
              if (result.code == "500") {
                self.tipsText = result.data.message;
              }
              else {
                if (result.data.rcode == 1) {
                  store.saveToSessionStore("user", result.data.data);
                  store.saveToSessionStore(
                    "loginToken",
                    result.data.data.auth.token
                  );
                  store.logIn(() => {
                    let toUrl = "/index"
                    let redirectUrl = self.$route.query.redirectUrl
                    if (redirectUrl) {
                      redirectUrl += redirectUrl.indexOf("?") > -1 ? "&from=lzt" : "?from=lzt"
                      toUrl = redirectUrl
                      if(self.$route.query.todoId) {
                        toUrl += "&todoId=" + self.$route.query.todoId
                      }
                    }
                    self.$router.replace(toUrl);
                  });
                } else {
                  self.tipsText = "当前系统登录异常，请联系管理员！";
                }
              }
            })
  },
  methods: {}
}
</script>
<style lang='scss' scoped>

</style>