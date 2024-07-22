<template></template>
<script>
import store from "@/common/util";
import axios from "axios";
export default {
  mounted() {
    let that = this;
    /* this.dsf.http.post("fn/mobileToDo/getToDoBadge",{})
    .then((result)=>{
      console.log('tag', this);
    }); */

    axios.get("/DreamMobile/fn/common/getConfig").then(result => {
      console.log("tag", this);
      console.log("tag", this.$route.params.userid);
      this.dsf.http.post("fn/mobileToDo/getToDoBadge", {}).then(res => {
      console.log("tag", this.$route.params.userid);
      });
    });
    store.clearSession();
    if (
      this.$route.params.userid &&
      this.$route.params.toPath &&
      this.$route.params.random
    ) {
      dsf.http
        .post(
          "fn/mobileAuth/getUserDataByToken?token=" + this.$route.params.userid,
          {}
        )
        .then(result => {
          if (result.data.rcode == 1) {
            store.saveToSessionStore("user", result.data.data);
            store.saveToSessionStore("loginToken", result.data.data.auth.token);
            store.saveToSessionStore("Role", result.data.data.role);
            that.$router.push({
							path:that.$route.params.toPath,
							query:{
								isPreview: 1
							}
						});
          } else {
            alert("登录失败");
          }
        });
    } else {
      alert("参数无效");
    }
  }
};
</script>