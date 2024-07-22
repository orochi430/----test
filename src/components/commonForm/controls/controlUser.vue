<template>
  <div class="controlUser" v-if="!readonly || (readonly && !!usertext.text)">
    <div v-if="metaData.extra.eatraClass == 'showTelicon' && readonly">
      <div v-for="item in telList" :key="item.id" class="showTel">
        <span>{{ item.userName }}</span>
        <img
          @click="phoneTo(item.mobile)"
          src="../../../assets/imgs/mailDetail_phone.png"
          alt=""
        />
        <i @click="smsTo(item.mobile)" class="iconfont iconletter infoName infoColor"></i>
      </div>
    </div>
    <van-field
      v-else
      autosize
      type="textarea"
      show-word-limit
      :placeholder="controlData.placeholder"
      :readonly="true"
      v-model="usertext.text"
      :rules="controlData.rules"
      :rows="rows"
      @click="getUser"
      :name="metaData && metaData.metaId ? metaData.metaId : ''"
    >
      <template #input>
        <div
          :class="['selectUser', { flex: metaData.extra.mobileAddLink != 1 }]"
          v-if="usertext.text"
        >
          <template v-if="metaData.extra.mobileAddLink == 1">
            <span
              style="color: #0086d9; word-break: break-all; overflow-wrap: break-word"
              @click.stop="toMailDetail(index)"
              v-for="(user, index) in usertextArr"
              :key="index"
            >
              {{ user }}{{ index < usertextArr.length - 1 ? "," : "" }}
            </span>
          </template>
          <div
            v-else-if="readonly || !dsf.config.commonForm.isEnableControlUserTagDel"
            style="flex: 1"
          >
            {{ usertext.text }}
          </div>
          <template v-else>
            <span class="delTag" v-for="(user, index) in usertextArr" :key="index">
              {{ user }}
              <van-icon name="cross" size="0.28rem" @click="delUser(index)" />
            </span>
          </template>
        </div>
      </template>
      <template #right-icon v-if="!readonly">
        <i class="iconfont iconyoujiantou1"></i>
      </template>
    </van-field>
    <van-popup
      :get-container="getContainer"
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <control-user-list
        v-if="show"
        :metaId="metaData.metaId"
        :extra="metaData.extra"
        :selectType="selectType"
        @close="close"
        :default-select-array="defaultSelectArray"
        @getSelectUser="getSelectUser"
        :topformMeta="topformMeta"
      ></control-user-list>
    </van-popup>
    <van-popup
      :get-container="getContainer"
      v-model="showMailDetail"
      position="bottom"
      style="height: 100vh"
      class="flex dc"
    >
      <van-nav-bar @click-left="showMailDetail = false">
        <template #left>
          <van-icon name="arrow-left" />
          <span>返回</span>
        </template>
      </van-nav-bar>
      <mail-detail
        style="flex: 1"
        v-if="showMailDetail"
        :_userdata="userdata"
      ></mail-detail>
    </van-popup>
  </div>
</template>

<script>
import propMixin from "./mixin";
import controlUserList from "@/components/commonForm/controls/controlUserList";
import MailDetail from "@/components/mailList/mailDetail.vue";
export default {
  name: "controlUser",
  model: {
    prop: "usertext",
    event: "selectuser",
  },
  props: {
    metaData: {
      type: Object,
      default: () => ({}),
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    topformData: {
      type: Object,
      default: () => ({}),
    },
    topformMeta: {
      type: Object,
      default: () => ({}),
    },
    usertext: {
      type: Object,
      default: () => ({}),
    },
    subFormIndex: {
      type: Number,
      default: null,
    },
    pformData: {
      type: Object,
      default: () => ({}),
    },
    formId: {
      type: String,
      default: "",
    },
  },
  mixins: [propMixin],
  components: {
    controlUserList,
    MailDetail,
  },
  data() {
    return {
      users: this.usertext.text,
      controlUserMessage: {},
      show: false,
      //0---用户选择，1---代码选择
      controlData: {
        rules: [],
      },
      tempUrl: "",
      defaultSelectArray: [],
      telList: [],
      userdata: {},
      showMailDetail: false,
    };
  },
  created() {
    this.controlUserMessage = this.metaData;
    if (this.readonly) {
      // this.controlUserMessage.placeholder = "";
      // 显示可拨电话模式，控件配置样式类名为 showTelicon
      if (this.metaData.extra.eatraClass == "showTelicon" && this.usertext.value != "") {
        dsf.http
          .post("fn/mobile/user/info", {
            ids: this.usertext.value,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.telList = res.data.data;
            }
          });
      }
    }
    if (JSON.stringify(this.metaData.defaultValue) == "{}") {
    } else {
      if (!this.usertext.value) {
        let defaultValue = this.metaData.defaultValue;
        let checkObj = this.usertext;
        if (defaultValue.text) {
          this.$set(checkObj, "text", defaultValue.text);
          checkObj.value = defaultValue.value;
          if (this.selectType == 0) checkObj.schema = defaultValue.schema;
        } else {
          this.$set(checkObj, "text", JSON.parse(defaultValue.value).text);
          checkObj.value = JSON.parse(defaultValue.value).value;
          if (this.selectType == 0)
            checkObj.schema = JSON.parse(defaultValue.value).schema;
        }
        this.$emit("selectuser", checkObj);
      }
    }
    if (!this.metaData.extra.tabs) {
      console.log(this.metaData.extra.message);
    } else if (this.metaData.controlType != "controlUser") {
      this.metaData.extra.tabs.forEach((item) => {
        if (item.action.indexOf("fn") < 0) {
          if (item.action[0] == "/") {
            item.action = "fn" + item.action;
          } else {
            item.action = "fn/" + item.action;
          }
        }
        if (item.action.includes("?")) {
          item.action += `&moduleId=${this.topformMeta.parameters.moduleId}&pk=${this.topformMeta.parameters.pk}`;
        } else {
          item.action += `?moduleId=${this.topformMeta.parameters.moduleId}&pk=${this.topformMeta.parameters.pk}`;
        }
        if (this.formId) {
          // 属于子表控件时
          let subformPk = this.pformData[this.formId].value;
          let subformModuleId = this.pformData["A0004"].value;
          item.action += `&subformPk=${subformPk}&subformModuleId=${subformModuleId}`;
        }
      });
    }
  },
  mounted() {
    // 监听getUser，通过codeSelect传参，动态传参,参数格式
    this.$bus.on("codeSelect", (obj) => {
      let sub = obj.split("=");
      console.log(this.metaData)
      if (this.metaData.extra.tabs[0].action.includes(sub[0])) {
        let str = this.metaData.extra.tabs[0].action.split(sub[0]);
        this.metaData.extra.tabs[0].action = str[0] + obj;
      } else {
        this.metaData.extra.tabs[0].action += obj;
      }
    });
    // 监听getUser，修改action地址
    this.$bus.on("codeChange", (obj) => {
      console.log(this.metaData)
      if (obj && obj.data && this.metaData.metaId == obj.data.metaData.metaId) {
        this.metaData.extra.tabs[0].action = obj.url;
      }
    });
  },
  computed: {
    text() {
      return this.usertext.text;
    },
    selectType() {
      return this.metaData.controlType == "controlUser" ? 0 : 1;
    },
    rows() {
      return this.metaData.extra != undefined && this.metaData.extra.rows != undefined
        ? this.metaData.extra.rows
        : 1;
    },
    usertextArr() {
      return this.usertext.text?.split(",") || [];
    },
  },
  watch: {
    text(newVal, oldVal) {
      this.users = newVal;
    },
    usertext: {
      handler(newVal, oldVal) {
        // console.log("===", newVal)
        if (newVal.value) {
          this.defaultSelectArray = [];
          let idArray = newVal.value.split(",");
          let nameArray = newVal.text.split(",");
          let schemaArray = newVal.schema ? newVal.schema.split(",") : "";
          for (let i = 0; i < idArray.length; i++) {
            if (idArray[i]) {
              this.defaultSelectArray.push({
                name: nameArray[i],
                showName: nameArray[i],
                id: idArray[i],
                pid: schemaArray[i] ? schemaArray[i].split("::")[1] : "",
                type: schemaArray[i]
                  ? schemaArray[i].split("::")[0]
                  : this.selectType == 0
                  ? "1"
                  : "0",
                checked: true,
                attrs: {
                  orgNameLV2Text: nameArray[i],
                  deptId: schemaArray[i] ? schemaArray[i].split("::")[1] : "",
                  pidValue: schemaArray[i] ? schemaArray[i].split("::")[1] : "",
                  idValue: idArray[i],
                },
              });
            }
          }
          // console.log("===", this.defaultSelectArray)
        } else {
          this.defaultSelectArray = [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    toMailDetail(index) {
      let type = this.usertext.schema?.split(",")[index].split(":")[0];
      if (type == 1) {
        let id = this.usertext.value.split(",")[index];
        this.userdata = { userId: id };
        this.showMailDetail = true;
      }
    },
    getContainer() {
      return document.body;
    },
    getUser() {
      if (this.readonly) {
        return;
      }
      this.$bus.emit("getUser", {
        metaData: this.metaData,
      });
      if (!this.metaData.extra.tabs) {
        dsf.layer.toast("未设置选择范围");
        return;
      }
      if (window[this.metaData.metaId + "_beforeOpenCode"]) {
        //归土特殊函数，2022年1月5日01:44:22  @ly
        if (!this.tempUrl.length) {
          this.tempUrl = this.metaData.extra.tabs[0].action;
        }
        let url = window[this.metaData.metaId + "_beforeOpenCode"](
          this.topformData || this.formData,
          this.tempUrl,
          this
        );
        if (url.length) {
          this.metaData.extra.tabs[0].action = url;
        } else {
          return;
        }
      }

      this.show = true;
    },
    close(isShow) {
      this.show = isShow;
    },
    getSelectUser(selectArr) {
      console.log(selectArr);
      let name = "";
      let val = "";
      let sch = "";
      let temp1 = [];
      let temp2 = [];
      let temp3 = [];
      for (let cell of selectArr) {
        let id = "";
        if (cell.attrs.idValue) {
          if (cell.attrs.idValue.lastIndexOf("-") > -1) {
            id = cell.attrs.idValue.slice(cell.attrs.idValue.lastIndexOf("-") + 1); // 检索的数据 person-id
          } else if (cell.attrs.idValue.lastIndexOf("_") > -1) {
            id = cell.attrs.idValue.slice(cell.attrs.idValue.lastIndexOf("_") + 1); // person_id
          } else {
            id = cell.attrs.idValue;
          }
        } else {
          id = cell.id;
        }
        temp1.push(cell.name);
        temp2.push(id);
        // 代码选择不需要schema
        if (cell.attrs.idValue) {
          //节点为人员时取部门ID       2023年12月11日21:01:28@luy再次按照平台的逻辑改造
          temp3.push(cell.type + "::" + (cell.type == "1" ? (cell.attrs.deptId === undefined ? "" : cell.attrs.deptId) : id))
          // temp3.push(cell.type + "::" + (cell.type == "1" ? cell.attrs.pidValue : id)); //与PC保持一致，选人时给父id，否则给自己id
        }
      }
      name = temp1.join(",");
      val = temp2.join(",");
      if (temp3.length > 0) {
        sch = temp3.join(",");
      }
      //this.usertext = name;
      this.show = false;
      let checkObj = this.usertext;
      this.$set(checkObj, "text", name);
      // checkObj.text = name;
      checkObj.value = val;
      if (temp3.length > 0) {
        checkObj.schema = sch;
      }
      this.$bus.emit("selectUserBus", {
        ...checkObj,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        selectArr: selectArr,
      });
      this.$emit("selectuser", checkObj);
    },
    smsTo(tel) {
      if (!tel) {
        dsf.layer.toast("暂未获取到该用户电话");
        return;
      }
      window.location.href = `sms:${tel}`;
    },
    phoneTo(tel) {
      if (!tel) {
        dsf.layer.toast("暂未获取到该用户电话");
        return;
      }
      window.location.href = `tel:${tel}`;
    },
    delUser(userindex) {
      this.$set(
        this.usertext,
        "text",
        this.usertext.text
          .split(",")
          .filter((item, index) => {
            return index != userindex;
          })
          .join(",")
      );
      this.usertext.value = this.usertext.value
        .split(",")
        .filter((item, index) => {
          return index != userindex;
        })
        .join(",");
      if (this.selectType == 0)
        this.usertext.schema = this.usertext.schema
          .split(",")
          .filter((item, index) => {
            return index != userindex;
          })
          .join(",");
    },
  },
};
</script>

<style lang="scss" scoped>
.controlUser {
  width: 100%;
}
</style>
<style lang="scss">
.controlUser .van-field__body {
  align-items: center;
}

// .controlUser .van-field__control {
//   font-size: var(--font_size_2);
//   // font-size: var(--font_size_3);
// }

.font_20 {
  font-size: var(--font_size_0) !important;
}

.showTel {
  font-size: 15px;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    padding-bottom: 8px;
  }

  span {
    flex: 1;
    color: #999;
  }

  img {
    width: 16px;
    height: 16px;
    margin: 3px 8px;
  }

  .iconfont {
    color: #3296fa !important;
  }
}
.selectUser {
  flex: 1;
  overflow: auto;
  max-height: 110px;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
      width: 3px;
      background-color: #eee;
  }

  &::-webkit-scrollbar-track {
      background-color: #eee;
  }

  &::-webkit-scrollbar-thumb {
      background: #ccc;
  }
  /deep/.van-empty__description{
      font-size: 18px;
  }
  // min-height: 26px;
  .delTag {
    // display: inline-block;
    padding: 4px 8px;
    margin: 2px;
    font-size: var(--font_size_3);
    background-color: #f3f3f3;
    border-radius: 5px;
    display: flex;
    align-items: center;
    text-align: left;
    justify-content: space-between;
    flex-grow: 1;
    i {
      color: #ababab;
      padding: 2px;
      font-weight: 600;
    }
  }
}
</style>
