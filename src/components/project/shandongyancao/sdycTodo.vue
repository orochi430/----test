<template>
  <div>
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
  mounted() {
    dsf.util.clearSession();
    let self = this
    window.getTodoData = function (res) {
      dsf.http.post(`/fn/mobileProjectAuth/auth?logName=${res.logName}`).then(function (result) {
        let resultTpl = result.data;
        console.log("fn/lxLogin/mloginGetInfo", resultTpl);
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
            self.$router.push({
              path: '/commonForm' + `${res.moduleId}/${res.pk}`, query: {
                type: gw,
                todoId: res.todoId,
                isEnterTodo: 1
              }, replace: true
            })
          } else {
            //dsf.layer.toast("当前系统登录异常，请联系管理员！");
            self.tipsText = "当前系统登录异常，请联系管理员！";
          }
        }
      });
    }
    TodoData.postMessage("")
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
