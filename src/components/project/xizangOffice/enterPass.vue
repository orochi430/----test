<template>
  <div class="box">
    <div class="pass">
      <input v-model="password" type="text" maxlength="6" placeholder="请输入主持密码" />
      <button @click="confirm()">确定</button>
      <span @click="goBack()">返回参会者列表</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "enterPass",
  data() {
    return {
      password: ""
    }
  },
  methods: {
    confirm(){
      if(this.password.length == 0){
        dsf.layer.toast("请输入密码")
        return;
      }
      let loading = dsf.layer.loading("")
      dsf.http.post("fn/vedioMeeting/judgeControlPassword",{
        meetingRoom: this.$route.query.meetingNum,
        controlPassword: this.password
      }).then(({data}) => {
          if(data.code == "200") {
            dsf.util.saveToSessionStore("identity",  {identity: 1})
            dsf.layer.closeLoading(loading)
            this.$router.push({
              path: `/xizangMeeting`,query:{
                meetingNum: this.$route.query.meetingNum
            }})
          }else if(data.code == "500") {
            dsf.layer.closeLoading(loading)
            dsf.layer.toast("密码错误")
          }
        }
      )
    },
    goBack(){
      this.$router.push({
        path: `/xizangMeeting`, query: {
          meetingNum: this.$route.query.meetingNum
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.box{
  height: 100vh;
  background-color: white;
}
.pass{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input{
    margin: 10px;
    text-align: center;
    background-color: rgb(244,245,247);
    width: 100%;
    height: 35px;
  }
  button{
    margin-bottom: 10px;
    width: 95%;
    height: 35px;
    background-color: rgb(66,130,254);
    color: white;
    border-radius: 30px;
  }
  span{
    color: rgb(66,130,254);
  }
}
>>>.van-nav-bar__content {
    background-color: rgb(57,57,69);
    .van-nav-bar__title,
    .van-nav-bar__left i,
    .van-nav-bar__left span {
      color: white !important
    }
  }
</style>
