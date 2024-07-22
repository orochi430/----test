<template>
  <div>
    <!-- 中孚TNA集成 2022年7月15日11:24:46  @ly -->
    <div class="init-div"></div>
    <div class="tips">{{ tipsText }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tipsText: ""
    }
  },
  data() {
    return {
      loading: null
    }
  },
  created() {
    let self = this;
    self.loading = dsf.layer.loading("登录中...");
    function goVpn() {
      setTimeout(() => {
        $sharedPreferences.save('{"Tnasucceed":false}', function () {
          xsfCommon.goVPNSettingActivity("", function (result) { }, function (error) { });
        }, function (e) { });
      }, 2000);
    }
    function login() {
      $sharedPreferences.get("accountId", function (result) {
        console.log("accountId", result);
        let accountId = result

        $sharedPreferences.get("password", function (result) {
          console.log("password", result);
          let password = result

          let postData = {
            __DATA: JSON.stringify({
              logname: accountId,
              password: password,
              device_id: "postman",
              device_desc: "postman"
            }),
          };
          dsf.http.post('/fn/mobileAuth/login', postData).then(res => {
            dsf.layer.closeLoading(self.loading);
            if (res.data.rcode == 1) {
              dsf.util.saveToSessionStore("user", res.data.data);
              dsf.util.saveToSessionStore("loginToken", res.data.data.auth.token);
              dsf.util.saveToLocalStore("loginToken", res.data.data.auth.token);
              dsf.util.saveToLocalStore("user", JSON.stringify(res.data.data));
              dsf.util.logIn(() => {
                self.$router.replace("/index");
              });
            } else {
              dsf.layer.toast('登录失败')
              goVpn()
            }
          })
        })
        // self.$router.replace({
        //   path: "/logNameAutologin",
        //   query: {
        //     state: "L2luZGV4",
        //     logName: result
        //   }
        // });
      }, function (e) {
        console.log("e", e);
        dsf.layer.closeLoading(self.loading);
        self.tipsText = "当前系统登录异常，请联系管理员！";
        goVpn()
      });
    }

    if (typeof $sharedPreferences == "undefined") {
      document.addEventListener("deviceready", function () {
        login()
      })
    } else {
      login()
    }
  }
};
</script>
<style lang="scss" scoped>
.tips {
  text-align: center;
  line-height: 30px;
  padding-top: 100px;
}
</style>
