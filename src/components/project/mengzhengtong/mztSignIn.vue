<template>
  <div class="mztSignIn">
    <div class="orgName">{{ pageInfo.orgName }}</div>
    <div class="title">{{ pageInfo.title }}</div>
    <div class="imgDiv">
      <img :src="pageInfo.scrUrl" />
    </div>
    <span class="returnInfo"
      ><strong>{{ returnMes[pageInfo.type - 1] }}</strong></span
    >
  </div>
</template>

<script>
export default {
  name: "mztSignIn",
  data() {
    return {
      pageInfo: {
        orgName: "",
        title: "",
        scrUrl: "",
        type: 3,
      },
      returnMes: [
        "签到成功",
        "您已签到",
        "非活动人员无法签到",
        "活动结束无法签到",
      ],
      imgName: ["success", "signedIn", "unable", "end"],
    };
  },
  created() {
    console.log("text", this.$route.query.text);
    //组织生活会签到
    if (!this.$route.query.text.includes("orgId")) {
      let pk = this.$route.query.text.split(",")[0];
      let headerUrl = this.$route.query.text.split(",")[1];
      dsf.http
        .get(`${headerUrl}/ctrl/partyOrgAct/signByQRCode`, {
          pk,
          userId: dsf.util.loadSessionStore("user").user_id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "200") {
            this.pageInfo = res.data.data;
            this.pageInfo.scrUrl = `static/images/mengzhengtong/${
              this.imgName[this.pageInfo.type - 1]
            }.jpg`;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {//党建签到
      let headUrl=this.$route.query.text.split(",")[0]
      let inteInfo=this.$route.query.text.split(",")[1]
      let completeUrl=`${headUrl}/ctrl/api/sso/slogin?logName=[logName]&redirectUrl=${headUrl}${inteInfo}`
      dsf.http.get(dsf.util.getReplaceUrl(completeUrl)).then((res) => {
        console.log(res);
        if (res.data.code == "200") {
          this.pageInfo = res.data.data;
          this.returnMes = [
            "报到成功",
            "已报到，无需再次报到",
            "非本支部人员不能报到",
          ];
          this.imgName = ["success", "unable", "end"];
          this.pageInfo.scrUrl = `static/images/mengzhengtong/${
            this.imgName[this.pageInfo.type - 1]
          }.jpg`;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.mztSignIn {
  position: relative;
  top: 6em;
  height: 48vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  .orgName {
    font-weight: 700;
    font-size: 22px;
  }

  .title {
    font-size: 0.3rem;
    font-weight: 600;
  }

  .imgDiv {
    width: 40%;
    height: auto;
    max-width: 200px;
  }

  .img-icon {
    object-fit: contain;
  }

  .returnInfo {
    font-size: small;
    font-size: 0.28rem;
  }
}
</style>
