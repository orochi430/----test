<!--
 * @Author: RONGWEI PENG
 * @Date: 2020-05-13 11:19:55
 * @LastEditTime: 2020-05-18 12:26:34
 * @LastEditors: Do not edit
 * @FilePath: /xzDing/src/components/common/DingBtn.vue
 * @Description:
 -->
<template>
  <div class="box" :style="{ ...defaultStyles, ...styleOptions }" v-if="
  dsf.config.ddSetting && dsf.config.ddSetting.dingdingType == 'dingding'">
    <van-button :style="{ ...styleOptions }" v-bind="options" @click="ding">{{ text }}</van-button>
    <van-popup :close-on-click-overlay="false" v-model="showPerson" get-container="#app" :style="{ height: '100%' }"
      position="bottom">
      <selectPerson v-if="showPerson" :extra="{ pk: pk }" @close="close" :selectPersons="selectPersons"
        @getSelectUser="getSelectUser" @cancePerson="cancePerson" @dingding="dingding"></selectPerson>
    </van-popup>
  </div>
</template>

<script>
import selectPerson from "@/components/selectPerson/dingPerson";
export default {
  name: "ding",
  props: {
    text: {
      type: String,
      default: "",
    },
    pk: {
      type: String,
      default: "",
    },
    btntype: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: () => {
        return {
          size: "normal",
          type: "info",
        };
      },
    },
    bt: {
      type: String,
      default: "",
    },
    styleOptions: {
      type: Object,
      default: () => {
        return {};
      },
    },
    prarms: {
      type: Object,
      default: () => {
        return {
        };
      },
    },
  },
  data() {
    return {
      defaultStyles: {
        height: "48px",
        width: "96%",
        borderRadius: "6px",
      },
      showPerson: false,
      selectPersons: [],
    };
  },
  components: {
    selectPerson,
  },
  methods: {
    close() {
      (this.showPerson = false), dsf.layer.toast("暂无可钉人员");
    },
    ding() {
      const users = this.prarms && this.prarms.users ? this.prarms.users : [];
      let self = this;
      if (this.btntype == "video") {
        if (!users.length) {
          dsf.layer.toast("暂无可发起人员");
          return;
        }
        dsf.dd.video({
          title: "视频会议",
          calleeCorpId: dsf.config.ddSetting.ddCoprId,
          calleeStaffIds: users,
          onSuccess: function (res) { },
          onFail: function (e) {
            dsf.layer.toast("发起会议失败，存在未激活用户。", false);
          },
          success: function () {
            toast = {
              msg: "开始视频",
              type: false,
            };
          },
        });
        return;
      }
      this.selectPersons = this.prarms.selectPerson
        ? this.prarms.selectPerson
        : [];
      this.selectPersons = this.selectPersons.filter((item) => {
        return item.id;
      });
      if (this.$route.name == "commonForm" || this.selectPersons.length > 0) {
        this.showPerson = true;
        return;
      }

      let text1 = "",
        text = "";
      dsf.http.get(`fn/common/getFileInfo?pk=${this.pk}`).then((res) => {
        console.log(res);
        text1 = res.data.bt;
        if (this.$route.name == "MeetingSignUpStatus") {
          text = `您有一份标题为【${text1}】的会议通知尚未报名，请及时处理！`;
        }
        if (this.$route.name == "InspectorCondition") {
          text = `您有一份标题为【${text1}】的督办事项尚未反馈，请及时处理！`;
        }
        if (this.$route.name == "signIn") {
          text = `您有一份标题为【${text1}】的远程文件尚未签收，请及时处理！`;
        }
        console.log(text);
        dsf.dd.Ding({
          users: users,
          type: 2, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          text: text,
          attachment: {
            images: [""],
          },
          bizType: 0,
          confInfo: {
            bizSubType: 0,
            location: "会议室",
            remindMinutes: 30,
            remindType: 2,
          },
          taskInfo: {
            taskRemind: 30,
          },
          onSuccess: function () {
            // alert("success");
          },
          onFail: function () {
            // alert("fail");
          },
        });
      });
    },
    getSelectUser() { },
    cancePerson() {
      this.showPerson = false;
    },
    dingding(forienArr) {
      const users = forienArr;
      console.log(users);
      if (!forienArr.length) {
        dsf.layer.toast("暂无可钉人员");
      }
      let text1 = "",
        text = "";
      if (this.bt) {
        dsf.dd.Ding({
          users: users,
          type: 2, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          text: this.bt,
          attachment: {
            images: [""],
          },
          bizType: 0,
          confInfo: {
            bizSubType: 0,
            location: "公告",
            remindMinutes: 30,
            remindType: 2,
          },
          taskInfo: {
            taskRemind: 30,
          },
          onSuccess: function () { },
          onFail: function () { },
        });
        return;
      }
      dsf.http.get(`fn/common/getFileInfo?pk=${this.pk}`).then((res) => {
        console.log(res);
        text1 = res.data.bt;
        text = `您有一份标题为【${text1}】文件，请及时处理！`;
        if (this.$route.name == "MeetingSignUpStatus") {
          text = `您有一份标题为【${text1}】的会议通知尚未报名，请及时处理！`;
        }
        if (this.$route.name == "InspectorCondition") {
          text = `您有一份标题为【${text1}】的督办事项尚未反馈，请及时处理！`;
        }
        if (this.$route.name == "signIn") {
          text = `您有一份标题为【${text1}】的远程文件尚未签收，请及时处理！`;
        }
        if (!text1) {
          text = `您有一份新文件，请及时处理！`;
        }
        console.log(text);
        dsf.dd.Ding({
          users: users,
          type: 2, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          text: text,
          attachment: {
            images: [""],
          },
          bizType: 0,
          confInfo: {
            bizSubType: 0,
            location: "会议室",
            remindMinutes: 30,
            remindType: 2,
          },
          taskInfo: {
            taskRemind: 30,
          },
          onSuccess: function () { },
          onFail: function () { },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ds-ding-btn {
  height: 100px;
  width: 100px;
  border: 1px solid red;
}
</style>
