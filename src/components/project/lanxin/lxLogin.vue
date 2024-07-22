<template>
  <div class="imgdiv">
    <img v-if="!tipsText" src="static/images/project/sxXTBG/loading.gif" alt="">
    <span v-else>{{ tipsText }}</span>
  </div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
  data() {
    return {
      tipsText: "",
    };
  },
  created() {
    let self = this;
    let count = 0;
    let startTime = new Date().getTime();
    // setInterval(() => {
    //   count++;
    //   self.tipsText = "正在初始化(" + count + ")...";
    // }, 1000);
    store.clearSession();
    const ddScript = document.createElement("script");
    ddScript.type = "text/javascript";
    ddScript.src = "static/js/lanxin/jssdk.js";
    document.body.appendChild(ddScript);
    ddScript.onload = () => {
      let appId = dsf.config.setting["SYS-MOBILE-LX-0001"];
      window.lx = lx;
      lx.biz.getAuthCode({
        appId: appId,
        success: function (res) {
          var authCode = res.authCode;

          let endTime = new Date().getTime();
          console.log("加载lanxinJsSdk获取authCode总耗时:", endTime - startTime);

          dsf.http
            .post(`/fn/lxLogin/mloginGetInfo?code=${authCode}`, {})
            .then(function (result) {
              let resultTpl = result.data;

              endTime = new Date().getTime();
              console.log("接口调用总耗时:", endTime - startTime);
              // console.log("fn/lxLogin/mloginGetInfo", resultTpl);
              //   console.log("html加载到接口结束总耗时:", endTime - window.htmlTime);

              //console.log("resultTpl.code",resultTpl.code);
              if (resultTpl.code == "500") {
                //console.log("resultTpl.message",resultTpl.data.message);
                self.tipsText = resultTpl.data.message;
                //console.log(self.tipsText);
              } else {
                if (resultTpl.data.rcode == 1) {
                  store.saveToSessionStore("user", resultTpl.data.data);
                  store.saveToSessionStore("loginToken", resultTpl.data.data.auth.token);
                  store.logIn(() => {
                    let redirectUrl = self.$route.query.redirectUrl;
                    if (redirectUrl) {
                      let path = B64.decode(
                        redirectUrl.replace(new RegExp("@", "gm"), "/")
                      );
                      self.$router.replace(path);
                    } else {
                      self.$router.replace("/index");
                    }
                  });
                } else {
                  //dsf.layer.toast("当前系统登录异常，请联系管理员！");
                  self.tipsText = "当前系统登录异常，请联系管理员！";
                }
              }
            });
        },
        fail: function (err) {
          console.log(err);
        },
      });
    };
  },
};
</script>
<style lang="scss" scoped>
.imgdiv {
  position: absolute;
  top: 35vh;
  left: 0;
  text-align: center;
  width: 100%;
  float: left;

  img {
    width: 30vw;
    max-width: 140px;
    margin: 0px auto;
  }
}
</style>
