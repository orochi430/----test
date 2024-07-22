<template>
  <div class="meet-Entrust" v-if="show0">
    <div class="content">
      <div class="com-title">
        <span>委托他人</span>
      </div>
      <div class="main">
        <div class="tab">
          <label for="">委托人:</label>
          <input
            v-model="InputVal"
            type="text"
            @click="ShowTree"
            placeholder="请选择委托人"
          />
        </div>
        <div class="tab">
          <label for="">委托理由:</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="textVal"
            placeholder="请输入委托理由"
          ></textarea>
        </div>
      </div>

      <div class="btn">
        <button @click="cancel">取消</button>
        <button @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "meetEntrust",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: {},
    },
    formParams: {
      type: Object,
      default: {},
    },
  },
  components: {},
  data() {
    return {
      show0: true,
      personData: "",
      InputVal: "",
      textVal: "",
      extra: {
        multiple: false,
        tabs: [
          {
            name: "本机构",
            action:
              `fn/user/select/data?types=person&rootObject=2&action=self_org&async=false&excludeIds=${dsf.util.loadSessionStore("user").user_id}`,
            subTabKey: "department",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    formParams(val) {
      console.log(val);
    },
  },
  methods: {
    closed() {
      this.show0 = true;
      console.log("关闭", this.show0);
      this.$emit("closeCallback", "");
    },
    submit() {
      let that = this;
      if (this.personData.length == 0) {
        dsf.layer.toast("请选择委托人员");
        return;
      }
      if (!this.textVal) {
        dsf.layer.toast("请填写委托理由");
        return;
      }
      dsf.http
        .post("ctrl/meetingNotice/directSignUp", {
          bmId:
          this.metaData.parameters.bmId || this.$route.query.signUpPk ||
            this.metaData.parameters.todoId.split("_")[0],
          tzId: this.metaData.parameters.tzId ||  this.formParams.pk,
          registrationStatus: "3",
          bzValue: this.textVal,
          userId: this.personData[0].id,
          deptId: this.personData[0].attrs.deptId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("委托提交成功", () => {
              that.show0 = false;
              that.$emit("closeCallback", "");
              this.$router.go(0);
            });
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    },
    cancel() {
      this.show0 = false;
      this.$emit("closeCallback", "");
    },
    ShowTree() {
      this.$emit("showTree", this.extra);
      this.show0 = true;
    },
    beforeClose(action, done) {
      return done(false);
    },
  },
  created() {},
  mounted() {
    this.$bus.$on("selectData", (val) => {
      console.log(val);
      this.personData = val;
      this.InputVal = val[0].name;
    });
  },
  destroyed() {},
};
</script>
<style scoped>
.meet-Entrust {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
.content {
  position: absolute;
  left: 10%;
  right: 10%;
  top: 45%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding-top: 20px;
  min-height: 250px;
  background: #fff;
  border-radius: 10px;
}

.content .com-title span {
  text-align: center;
  font-size: var(--font_size_2);
  font-weight: bold;
}
.main {
  margin-top: 20px;
  width: 90%;
}
.tab {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 100%;
}
.tab label {
  padding-top: 5px;
  padding-right: 10px;
  width: 80px;
  text-align: right;
}
.tab input {
  padding-left: 10px;
  width: calc(100% - 80px);
  height: 35px;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}
.tab textarea {
  padding: 10px;
  width: calc(100% - 80px);
  height: 80px;
  border-radius: 5px;
  border: 1px solid #cfcfcf;
}
.btn {
  display: flex;
  width: 100%;
}
.btn button {
  flex: 1;
  height: 50px;
  color: #3296fa;
  font-size: var(--font_size_2);
  background: transparent;
}
</style>
