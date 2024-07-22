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
    //考勤打卡用户免登陆
    store.clearSession();
    let self = this;
    dsf.loadJs('static/js/transferPlatformTool.js').then(() => {
      croods.load(function () {
        croods.customPlugin({
          action: "UserPlugin.login",
          params: {},
          success: function (res) {
            console.log('res', res);
            let argumentsVal = {
              height: window.innerHeight,
              width: window.innerWidth,
              tokenId: res.token,
              remoteIp: res.moapIp
            }
            dsf.http.post("ctrl/wztNotAuthLogin/mobileLogin", argumentsVal).then((result) => {
              console.log(result);
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
                    let toUrl = "/attndIndex"
                    let redirectUrl = self.$route.query.redirectUrl
                    if (redirectUrl) {
                      toUrl = decodeURIComponent(self.$route.query.redirectUrl)
                    }
                    else if (self.$route.query.todoId) {
                      toUrl += "?todoId=" + self.$route.query.todoId
                    }
                    self.$router.replace(toUrl);
                  });
                } else {
                  self.tipsText = "当前系统登录异常，请联系管理员！";
                }
              }
            })
          },
          fail: function (msg) {
            console.log(msg)
            dsf.layer.toast(msg, false)
          }
        });


      })


    })
  },
  methods: {}
}
</script>
<style lang='scss' scoped>

</style>