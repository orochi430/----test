<template>
  <div class="box">
    <div class="banner"></div>
    <div class="formbox loginForm" v-if="!isChangeUser">
      <div class="login_title">请输入验证密码</div>
      <van-form @submit="login">
        <van-field
          v-model="logname"
          type="password"
          :rules="[{ required: true }]"
          name="验证密码"
          placeholder="请输入验证密码"
          center
        >
        </van-field>
        <div class="btnbox" style="margin-top: 30px">
          <van-button
            v-if="autoLogin"
            :disabled="autoLogin"
            style="width: 100%; font-size: 19px"
            round
            type="info"
            native-type="submit"
            >登录中...</van-button
          >
          <van-button
            v-else
            style="width: 100%; font-size: 19px"
            round
            type="info"
            native-type="submit"
            >确定</van-button
          >
        </div>
      </van-form>
    </div>
    <van-popup
      ref="popref"
      v-model="createUser"
      :close-on-click-overlay="true"
      lock-scroll
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="formUserBox loginForm">
        <!-- <div class="login_title">登录</div> -->
        <van-form @submit="gologin">
          <van-field
            readonly
            clickable
            name="picker"
            v-model="userData.orgName"
            label="单位"
            placeholder="点击选择单位"
            :rules="[{ required: true }]"
            @click="showPicker('unit')"
          />
          <van-field
            readonly
            clickable
            name="picker"
            v-model="userData.deptName"
            label="部门"
            placeholder="点击选择部门"
            :rules="[{ required: true }]"
            @click="showPicker('dept')"
          />

          <!-- <van-field
            readonly
            clickable
            name="picker"
            v-model="userData.rankName"
            label="职务"
            placeholder="点击选择职务"
            :rules="[{ required: true }]"
            @click="showPicker('post')"
          /> -->
          <van-field
            v-model="userData.userName"
            name="姓名"
            label="姓名"
            placeholder="请输入姓名"
            :rules="[{ required: true }]"
          />

          <van-popup v-model="showPickerData.unit" position="bottom">
            <van-picker
              show-toolbar
              :columns="showPickerData.unitColumns"
              @confirm="onConfirmUnit"
              @cancel="showPicker('unit')"
            />
          </van-popup>

          <van-popup v-model="showPickerData.dept" position="bottom">
            <van-picker
              show-toolbar
              :columns="showPickerData.deptColumns"
              @confirm="onConfirmDept"
              @cancel="showPicker('dept')"
            />
          </van-popup>

          <van-popup v-model="showPickerData.post" position="bottom">
            <van-picker
              show-toolbar
              :columns="showPickerData.postColumns"
              @confirm="onConfirmPost"
              @cancel="showPicker('post')"
            />
          </van-popup>
          <div class="btnbox" style="margin-top: 30px">
            <van-button
              v-if="autoLogin"
              :disabled="autoLogin"
              style="width: 100%; font-size: 19px"
              round
              type="info"
              native-type="submit"
              >登录中...</van-button
            >
            <van-button
              v-else
              style="width: 100%; font-size: 19px"
              round
              type="info"
              native-type="submit"
              >确定</van-button
            >

            <!-- <van-button
              v-if="isChangeUser"
              style="width: 100%; font-size: 19px;margin-top:10px;"
              round
              type="default" native-type="button"
              @click="goForm"
              >返回</van-button
            > -->
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";

export default {
  components: {},
  data() {
    return {
      logname: "",
      autoLogin: false,
      isChangeUser: false,
      createUser: false,
      showPickerData: {
        unit: false,
        unitColumns: [],
        dept: false,
        deptColumns: [],
        post: false,
        postColumns: [],
      },
      userData: {
        orgId: "",
        orgName: "",
        deptId: "",
        deptName: "",
        rankId: "11",
        rankName: "其他工作人员",
        userName: "",
      },
      unitData: [],
      rankData: [],
      orgIndex: 0,
    };
  },
  computed: {},
  mounted() {},
  created() {
    if (this.$route.query.changUser) {
      this.isChangeUser = true;
      this.createUser = true;
    } else if (store.loadLocalStore("check_passWord")) {
      if (store.loadLocalStore("autoLogin")) {
        this.login2();
      } else {
        this.createUser = true;
      }
    }

    dsf.http
      .post("fn/bgtIndex/organize")
      .then((res) => {
        this.unitData = res.data.data;
        this.showPickerData.unitColumns = this.unitData.map((item) => {
          return item.text;
        });
        return dsf.http.post(
          "fn/bgtIndex/code?fid=190223145151tY2wvSmRgkYR1dJpjmj"
        );
      })
      .then((res) => {
        console.log(res);
        this.rankData = res.data;
        this.showPickerData.postColumns = this.rankData.map((item) => {
          return item.name;
        });
      });
  },
  methods: {
    goForm(){
      this.$router.go(-1)
    },
    onConfirmUnit(value, index) {
      this.orgIndex = index;
      this.userData.deptName = "";
      this.userData.orgName = value;
      this.userData.orgId = this.unitData[index].value;
      this.showPickerData.deptColumns = [];
      this.unitData[index].depts.forEach((element) => {
        this.showPickerData.deptColumns.push(element.text);
      });
      this.showPickerData.unit = false;
    },
    onConfirmDept(value, index) {
      this.userData.deptName = value;
      this.userData.deptId = this.unitData[this.orgIndex].depts[index].value;
      this.showPickerData.dept = false;
    },
    onConfirmPost(value, index) {
      this.userData.rankName = value;
      this.userData.rankId = this.rankData[index].value;
      this.showPickerData.post = false;
    },
    showPicker(item) {
      if (item == "dept" && !this.userData.orgName.length) {
        dsf.layer.toast("请先选择单位");
        return;
      }
      this.showPickerData[item] = !this.showPickerData[item];
    },
    goUrl() {
      this.$router.replace("/index");
    },
    login2() {
      let self = this;
      let userName =
        B64.decode(store.loadLocalStore("userName")) ||
        store.loadLocalStore("user").logName;
      let passWord = B64.decode(store.loadLocalStore("passWord")) || "111111";
      let url = "/fn/mobileAuth/login";
      let postData = {
        __DATA: JSON.stringify({
          logname: userName,
          password: passWord,
          device_id: "device_id",
          device_desc: "device_desc",
        }),
      };
      dsf.http
        .post(url, postData)
        .then(function (data) {
          if (data.data.rcode == 1) {
            store.saveToSessionStore("user", data.data.data);
            store.saveToSessionStore("loginToken", data.data.data.auth.token);

            store.saveToLocalStore(
              "userName",
              B64.encode(data.data.data.logName)
            );
            store.saveToLocalStore("passWord", B64.encode("111111"));

            store.saveToLocalStore("loginToken", data.data.data.auth.token);
            store.saveToLocalStore("user", data.data.data);

            store.saveToLocalStore("autoLogin", true);
            store.logIn(function () {
              self.goUrl();
            });
          } else {
            store.saveToLocalStore("autoLogin", false);
          }
          dsf.layer.toast(data.data.message);
        })
        .error((data) => {
          if (data.message.indexOf("404") > -1) {
            dsf.layer.toast("登录接口异常，请联系系统管理员！");
          }
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    },
    gologin() {
      let self = this;
      let postData = Object.assign(
        {
          device_id: "device_id",
          device_desc: "device_desc",
        },
        this.userData
      );
      dsf.http
        .post("fn/bgtIndex/bgtLogin", postData)
        .then(function (data) {
          console.log(data);
          if (data.data.rcode == 1) {
            store.saveToSessionStore("user", data.data.data);
            store.saveToSessionStore("loginToken", data.data.data.auth.token);

            store.saveToLocalStore(
              "userName",
              B64.encode(data.data.data.logName)
            );
            store.saveToLocalStore("passWord", B64.encode("111111"));

            store.saveToLocalStore("loginToken", data.data.data.auth.token);
            store.saveToLocalStore("user", data.data.data);

            store.saveToLocalStore("autoLogin", true);
            store.logIn(function () {
              self.goUrl();
            });
          } else {
            store.saveToLocalStore("autoLogin", false);
          }
          dsf.layer.toast(data.data.message);
        })
        .error((data) => {
          store.saveToLocalStore("autoLogin", false);
          if (data.message.indexOf("404") > -1) {
            dsf.layer.toast("登录接口异常，请联系系统管理员！");
          }
        });
    },
    login() {
      let self = this;
      if (self.logname == "bgt123456") {
        store.saveToLocalStore("check_passWord", B64.encode("bgt123456"));
        self.createUser = true;
      } else {
        dsf.layer.toast("验证码不正确");
        self.logname = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.theme-font {
  @include font-theme("normal");
}

.iconfont {
  font-size: var(--font_size_0);
  @include font-theme("normal");
  padding-right: 6px;
}

.box {
  height: calc(100vh);
  overflow-x: hidden;
  overflow-y: scroll;

  .banner {
    width: 100%;
    min-height: 250px;
    position: relative;

    > img {
      width: 100%;
    }

    > p {
      width: 264px;
      text-align: center;
      font-size: 22px;
      line-height: 32px;
      color: white;
      position: absolute;
      top: 50px;
      transform: translateX(-50%);
      left: 50%;
    }
  }
}
.formUserBox {
  margin: 40% 15px;
  border-radius: 8px;
  border: 2px solid #2271b3;
  background: white;
  padding: 24px;
}
.formbox {
  margin: 0 15px;
  transform: translateY(-50px);
  border-radius: 8px;
  background: white;
  padding: 24px;

  .van-cell {
    border: 1px solid #eeeeee;
    border-radius: 46px;
  }

  .van-cell + .van-cell {
    margin-top: 20px;
  }

  .sendCode {
    display: flex;
    margin-top: 20px;

    button {
      height: inherit;
      width: 130px;
      border-radius: 46px;
      margin-left: 10px;
    }
  }

  .iptLabelImg {
    width: 21px;
    height: 21px;
    margin-right: 15px;
  }

  .auto {
    color: #666;
    margin-top: 16px;
  }

  .btnbox {
    margin-top: 40px;

    > button {
      @include background-theme("normal");
      border: 0 !important;
    }
  }

  .changeType {
    margin-top: 16px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    @include font-theme("button_auxiliary_fontcolor");
  }
}

.login_icon {
  right: -80%;
  top: 5px;
}

.login_title {
  font-weight: 600;
  margin: 5px 0px 10px 10px;
  @include font-theme("button_auxiliary_fontcolor", true);
  @include font_5;
}
</style>
