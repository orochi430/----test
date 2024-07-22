<template>
  <div class="mztLogin"></div>
</template>

<script>
import store from "@/common/util";
export default {
  name: "mztLogin",
  mounted() {
    let self = this;
    let loading = dsf.layer.loading();
    if (store.getClientName() == "app") {
      document.addEventListener("deviceready", function () {
        console.log("deviceready_emergency_login");
        $sharedPreferences.get(
          "KOAL_CA_UIKIT_TICKET",
          function (result) {
            console.log("result", result);
            if (result) {
              dsf.http
                .post("/fn/mobileProjectAuth/auth", {
                  ticket:result,
                })
                .then((res) => {
                  console.log("checkticket值", res);
                  dsf.layer.closeLoading(loading);
                  if (res.data.rcode == 1) {
                    dsf.util.saveToSessionStore("user", res.data.data);
                    dsf.util.saveToSessionStore(
                      "loginToken",
                      res.data.data.auth.token
                    );
                    dsf.util.saveToLocalStore(
                      "loginToken",
                      res.data.data.auth.token
                    );
                    dsf.util.saveToLocalStore(
                      "user",
                      JSON.stringify(res.data.data)
                    );
                    dsf.util.logIn(() => {
                      self.$router.replace("/index");
                    });
                  } else {
                    dsf.layer.toast("登录失败");
                  }
                }).catch(err=>{
                  dsf.layer.closeLoading(loading);
                  console.log("获取用户信息失败",err);
                });

              // self.$router.replace({
              //   path: "logNameAutologin",
              //   query: {
              //     ticket: result,
              //     state: dsf.base64.encode("/index"),
              //   },
              // });
            } else {
              dsf.layer.toast("系统正在跳转登录页,请稍等", () => {
                self.$router.replace("testLogin");
              });
            }
          },
          function (e) {
            dsf.layer.closeLoading(loading);
            dsf.layer.toast("系统正在跳转登录页,请稍等", () => {
              self.$router.replace("/testLogin");
            });
          }
        );
      });
    } else {
      dsf.layer.closeLoading(loading);
      self.$router.replace("testLogin");
    }
  },
};
</script>
<style lang="scss" scoped>
.mztLogin{
  width: 100vw;
  height: 100vh;
  background: url("../../../../static/images/project/mzt/720.png") center center/100% 100% no-repeat;
}
</style>
