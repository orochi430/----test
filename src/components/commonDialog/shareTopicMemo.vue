<template>
  <div class="meet-Entrust" v-if="show0">
    <div class="content">
      <div class="com-title">
        <span>请选择</span>
      </div>
      <div class="main">
        <van-radio-group v-model="radio">
          <van-radio :name="item" v-for="(item, idx) in list" :key="idx">{{ item.name }}</van-radio>
        </van-radio-group>
      </div>
      <div class="btn">

        <van-button type="default" @click="cancel">取消</van-button>
        <van-button type="default" @click="submit">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shareTopicMemo",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    metaData: {
      type: Object,
      default: {}
    },
    formParams: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    return {
      radio: "",
      show0: true,
      personData: "",
      textVal: "",
      list: []
    };
  },
  computed: {},
  watch: {
    formParams(val) {
      console.log(val);
    }
  },
  methods: {
    close() {
      this.show0 = true;
      console.log("关闭", this.show0);
      this.$emit("closeCallback", "");
    },
    submit() {
      let self = this;

      console.log('qqqwe', self.$route.query);
      if (!self.radio) {JSON.stringify()
        dsf.layer.toast("请选择", false);
      } else {
          // https://atrust-poc.sdt.sdbdc.cn:8443/portal/custom_qywx.html?host=http%3A%2F%2F16.0.14.69%3A8080%2FDreamWeb%2Fctrl%2FsdtongSSO%2FloginMeeting%3FtoUrl%3DL2NvbW1vbnRhYnMvd2RoeQ%3D%3D&response_type=code&scope=snsapi_base&agentid=1001582&state=STATE#wechat_redirect
          let fileName=encodeURI(self.radio.name)
        let hostUrl = `${dsf.url.getRootPath()}/ctrl/sdtongSSO/loginMeeting?toUrl=` + dsf.base64.encode(`/meetingPreview?method=onlyPre&infoId=${self.formParams.pk}&moduleId=${self.metaData.parameters.moduleId}&nodeId=-1&flowId=0&fileId=${self.radio.id}&fileName=${fileName}`);

        let url = `${dsf.config.meetingConfig.sdtServerUrl}portal/custom_qywx.html?host=${encodeURIComponent(hostUrl)}` + `&response_type=code&scope=snsapi_base&agentid=${dsf.config.meetingConfig.agentId}&state=STATE#wechat_redirect`;
        console.log(`/meetingPreview?method=onlyPre&infoId=${self.formParams.pk}&moduleId=${self.metaData.parameters.moduleId}&nodeId=-1&flowId=0&fileId=${self.radio.id}&fileName=${fileName}`);
       
        console.log('url',url);
        console.log('title', self.list, self.radio);
        try {
          //备注：shareAppMessage分享到会话接口，1.6及以上版本支持
          wx.invoke("shareAppMessage", {
            title: self.radio.name, // 分享标题
            desc: '预览文件内容', // 分享描述
            link: url, // 分享链接
            imgUrl: '' // 分享封面
          },
            function (res) {
              console.log("shareAppMessage-res", res);
              if (res.err_msg == "shareAppMessage:ok") { }
            }
          );
        } catch (e) {
          console.log("shareAppMessage-err", e);
          dsf.layer.toast("请在山东通app中操作", false);
        }
        console.log(self.radio);
        self.close();
      }
    },
    cancel() {
      this.show0 = false;
      this.$emit("closeCallback", "");
    },
    beforeClose(action, done) {
      return done(false);
    },
    init() {
      let self = this;
      console.log("formData", self.formData);
      console.log("metaData", self.metaData);
      console.log("formParams", self.formParams);
      for (let att in self.formData.attach) {
        for (let item of self.formData.attach[att]) {
          self.list.push({
            name: item.fileName,
            id: item.id,
            file: item,
       
          })
        }
      }

    }
  },
  created() {
    let self = this;
    self.init();
  },
  mounted() { },
  destroyed() { }
};
</script>
<style scoped  lang="scss">
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
  font-size: var(--font_size_2);
}
::v-deep .van-radio__label {
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  width: 90%;
}
</style>
