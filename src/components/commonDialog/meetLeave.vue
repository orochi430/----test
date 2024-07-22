<template>
  <div class="meet-Entrust" v-if="show0">
    <div class="content">
      <div class="com-title">
        <span>请假</span>
      </div>
      <div class="main">
        <div class="tab">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="textVal"
            placeholder="请输入请假理由"
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
  name: "meetLeave",
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
      if (!this.textVal) {
        dsf.layer.toast("请填写请假理由");
        return;
      }
      dsf.http
        .post("ctrl/meetingNotice/directSignUp", {
          bmId: this.metaData.parameters.bmId || this.$route.query.signUpPk || this.metaData.parameters.todoId.split('_')[0],
          tzId: this.metaData.parameters.tzId || this.formParams.pk,
          registrationStatus: "2",
          bzValue: this.textVal,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("请假提交成功",()=>{
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
      console.log("取消");
      this.$emit("closeCallback", "");
    },
    ShowTree() {
      console.log("点击");
      this.$emit("showTree", this.extra);
      this.show0 = true;
    },
    beforeClose(action, done) {
      console.log("关闭1111111");
      return done(false);
    },
  },
  created() {},
  mounted() {},
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
  min-height: 200px;
  background: #fff;
  border-radius: 10px;
}

.content .com-title span {
  text-align: center;
  font-size: var(--font_size_2);
  font-weight: bold;
}
.main {
  width: 80%;
}
.tab {
  display: flex;
  align-items: flex-start;
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
  flex: 1;
  height: 35px;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}
.tab textarea {
  padding: 10px;
  flex: 1;
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
