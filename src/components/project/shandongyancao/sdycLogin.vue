<template>
  <div>
    <div class="init-div"></div>
    <div class="tips">{{tipsText}}</div>
  </div>
</template>

<script>
import store from "@/common/util";
export default {
  data() {
    return {
      tipsText: ""
    }
  },
  mounted() {
    dsf.util.clearSession();
    let self = this
    window.getCode = function (res) {
      dsf.http.post(`/fn/mobileProjectAuth/auth?code=${res}`).then(function (result) {
        let resultTpl = result;
        console.log("/fn/mobileProjectAuth/auth", resultTpl);
        //console.log("resultTpl.code",resultTpl.code);
        if (resultTpl.code == "500") {
          //console.log("resultTpl.message",resultTpl.data.message);
          self.tipsText = resultTpl.data.message;
          //console.log(self.tipsText);
        } else {
          if (resultTpl.data.rcode == 1) {
            store.saveToSessionStore("user", resultTpl.data.data);
            store.saveToSessionStore(
              "loginToken",
              resultTpl.data.data.auth.token
            );
            store.logIn(() => {
              self.$router.replace("/shouye");
            });
          } else {
            //dsf.layer.toast("当前系统登录异常，请联系管理员！");
            self.tipsText = "当前系统登录异常，请联系管理员！";
          }
        }
      });
    }
    Code.postMessage("")
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
