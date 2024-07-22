<template>
  <div class="change-pwd-container">
    <div class="change-pwd-top">
      <van-icon name="arrow-left" @click="$router.back()" />
      <h2>修改密码</h2>
    </div>
    <div class="change-pwd-form">
      <van-form validate-first validate-trigger="onBlur" @submit="save">
        <div class="change-pwd-form-con">
          <van-field v-model="pwd" type="password" label="旧密码" />
          <van-field
            v-model="newPwd"
            :rules="[{ validator: newPwdRules, message: '请输入正确内容' }]"
            type="password"
            label="新密码"
          />
          <van-field
            v-model="confirmPwd"
            :rules="[{ validator: confirmPwdRules, message: '请输入正确内容' }]"
            type="password"
            label="确认密码"
          />
          <p class="point-content">密码必须至少6位，而且同时包含数字+字母</p>
        </div>
        <div class="change-pwd-btn">
          <van-button type="info" native-type="submit">保存</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pwd: "",
      newPwd: "",
      confirmPwd: ""
    };
  },
  created() {},
  methods: {
    newPwdRules(val, rules) {
      return /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(val);
    },
    confirmPwdRules(val, rules) {
      return this.newPwd === val;
    },
    save() {
      dsf.http
        .post(`fn/userinfo/updatePwd`, {
          pwd: this.pwd,
          newPwd: this.newPwd,
          userId: dsf.util.loadSessionStore("user").user_id
        })
        .done(result => {
          if (result.code == 200) {
            dsf.layer.toast("修改成功", false);
            this.$router.push({
              path:"/meetingPad/index/personal"
            })
          } else {
            dsf.layer.toast(result.message, false);
          }
        })
        .error(error => {
          console.log("error", error);
        })
        .always(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.change-pwd-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .change-pwd-top {
    display: flex;
    padding-bottom: 50px;
    border-bottom: 1px solid #3389e0;

    ::v-deep .van-icon {
      line-height: 70px;
    }

    h2 {
      flex: 1;
      text-align: center;
      color: #3389e0;
      font-size: 52px;
    }
  }

  .change-pwd-form {
    flex: 1;

    ::v-deep .van-field {
      padding: 0.88rem !important;
      display: flex;
      align-items: center;

      .van-field__label {
        text-align: right;
      }
      .van-field__control {
        border-bottom: 1px solid #dcdcdc;
        padding: 0.5rem;
      }
    }

    .point-content {
      text-align: center;
      font-size: 32px;
      color: #3389e0;
    }

    ::v-deep .van-form {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .change-pwd-form-con {
      flex: 1;
    }
  }

  .change-pwd-btn {
    display: flex;
    justify-content: center;

    ::v-deep .van-button {
      width: 17rem;
      height: 2rem;
      background-color: #3b74db;
      border-color: #3b74db;
      font-size: 40px;
      color: #ffffff;
    }
  }
}
</style>
