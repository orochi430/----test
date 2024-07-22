<template>
  <div class="ds-workflow_dialog" v-show="showDialog">
    <div class="header">
      <van-nav-bar
        :title="text + '理由'"
        left-text="取消"
        @click-left="cancel()"
      />
    </div>
    <div class="content" ref="content">
      <div ref="user" class="sheetBox" v-if="isShowUser">
        <p class="reasonLabel">退回人员</p>
        <div class="disfr ac" style="padding: 10px 0">
          <div class="peopleSec disfr ac flex1">
            <van-tag
              closeable
              size="large"
              type="primary"
              @close="closePerson(item, index)"
              v-for="(item, index) in personSelectData"
              :key="index"
            >
              {{ item.text }}
            </van-tag>
            &nbsp;&nbsp;
          </div>
          <van-button
            @click="showPersonModel"
            style="margin-left: 10px"
            size="small"
            type="default"
            >选择人员</van-button
          >
        </div>
        <p class="reasonLabel" style="margin-bottom: 0.2rem">退回原因</p>
      </div>
      <van-field
        class="reason"
        ref="reason"
        v-model="message"
        rows="5"
        type="textarea"
        :placeholder="'请输入' + text + '理由'"
        border
      />
    </div>
    <div class="footer">
      <van-button type="theme" block @click="submitFun"
        >确认{{ text }}</van-button
      >
    </div>
    <van-popup
      v-model="secPeo"
      :style="{ height: '50vh' }"
      position="bottom"
      round
    >
      <div style="width: 100%">
        <van-picker
          title="请选择退回人员"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPersonModel"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "WorkFlowDialog",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      text: "退回",
      message: "",
      showDialog: false,
      submitAfter: () => {},
      h: 0,
      isNeedWrite: dsf.config.setting["SYS-FLOW-0038"] || 0,
      personSelectData: [],
      secPeo: false,
      columns: [],
      SendRequest: {},
    };
  },
  created() {},
  mounted() {},
  computed: {
    isShowUser() {
      return this.columns.length > 1||dsf.config.commonFlow.onePersonBackIsShow;
    },
  },
  methods: {
    cancel() {
      this.showDialog = false;
      this.h = 0;
      this.$emit("close");
    },
    //退回
    sendBack() {
      var self = this;
      let postData = {
        pid: this.formData.pid || this.formData.pId,
        pnid: this.formData.pnid || this.formData.pnId,
        wfId: this.formData.flowId,
        backReason: this.message,
      };
      //console.log(this.formData);
      let _loading = dsf.layer.loading(this.text + "中");
      dsf.http
        .post("/fn/mobileFlow/sendBack", postData)
        .then(function (result) {
          //console.warn(result);
          dsf.layer.closeLoading(_loading);
          self.dsf.layer.toast(self.text + "成功", true);
          self.cancel();
          setTimeout(() => {
            self.$emit("change");
          }, 100)
        });
    },
    sendBackNew() {
      let self = this;
      let NoopinionBack = true
      self.metaData.buttons.mainButtons.some(item=>{
        if(item.action == "NoopinionBack"){
          NoopinionBack = false
        }})
      if (self.message.trim() == "" && self.isNeedWrite ==1 && NoopinionBack == true) {
        dsf.layer.toast("请输入退回原因");
        return;
      }
      if (self.personSelectData.length < 1 && self.isShowUser) {
        dsf.layer.toast("请选择退回人员");
        return;
      }
      let _loading = dsf.layer.loading(self.text + "中");
      let postData = {
        TPID: self.SendRequest.tpid,
        CurLinkID: self.personSelectData[0].LinkID,
        WFID: self.SendRequest.wfid,
        backType: 1,
        Remark: self.message,
        inherit: "",
        MultSendBackMod: self.SendRequest.multSendBackMod,
        IsMergeTodo: self.SendRequest.isMergeTodo,
        NGR: 0,
        SendBackTo: self.SendRequest.sendBackTo,
      };
      dsf.http
        .post("/fn/flow/submitSendBackNode", postData)
        .then(function (result) {
          dsf.layer.closeLoading(_loading);
          self.dsf.layer.toast(self.text + "成功", true);
          self.cancel();
          setTimeout(() => {
            self.$emit("change");
          }, 100)
        });
    },
    show({ text }) {
      this.personSelectData = [];
      //console.log(this.formData, this.metaData.parameters);
      let urldata = {
        pId: this.metaData.parameters
          ? this.metaData.parameters.pId
          : this.formData.pid || this.formData.pId,
        flowId: this.metaData.parameters
          ? this.metaData.parameters.flowId
          : this.formData.flowId,
        pk: this.metaData.parameters
          ? this.metaData.parameters.pk
          : this.formData.info_d || this.formData.info_id,
        pnId: this.metaData.parameters
          ? this.metaData.parameters.pnId
          : this.formData.pnid || this.formData.pnId,
      };
      dsf.http.get("fn/flow/getGPNodeProcess", urldata).then(({ data }) => {
        //console.log(data)
        if (data.code == "200") {
          let columns = [];
          this.SendRequest = data.data.SendRequest;
          data.data.processArray.forEach((item) => {
            columns.push({
              text: item.Sender.UserName + `(${item.PARENT_NODENAME})`,
              ...item,
            });
          });
          this.columns = columns;
          //console.log(this.columns)
          if (this.columns.length == 1) {
            this.personSelectData = columns;
          }
          this.initHeight();
        }
      });
      this.text = text || "";
      this.message =
        text == "退回" ? dsf.config.setting["SYS-MOBILE-FORM-0005"] || "" : "";
      this.showDialog = true;
      return new Promise((submitAfter) => {
        this.submitAfter = submitAfter;
      });
    },
    initHeight() {
      this.$nextTick(() => {
        if (this.isShowUser) {
          this.h = this.$refs.content.offsetHeight - 270;
        } else {
          this.h = this.$refs.content.offsetHeight - 160;
        }
      });
    },
    close() {
      this.showDialog = false;
      this.h = 0;
    },
    showPersonModel() {
      this.secPeo = !this.secPeo;
    },
    onConfirm(val) {
      this.personSelectData = [];
      this.personSelectData.push(val);
      //console.log(val)
      this.showPersonModel();
    },
    closePerson(item, index) {
      this.personSelectData.splice(index, 1);
    },
    submitFun() {
      this.submitAfter();
      if (this.text == "退回") {
        //this.sendBack();
        this.sendBackNew();
      }else{
        this.sendBackNew();
      }
      //this.cancel()
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;

  .footer {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
    height: 50px;
    padding: 10px;
  }
}

.itemSheet {
  font-size: 16x;
}

.disfr {
  display: flex;
}

.fc {
  display: flex;
  flex-direction: column;
}

.ac {
  align-items: center;
}

.jsb {
  justify-content: space-between;
}

.jc {
  justify-content: center;
}

.flex1 {
  flex: 1;
}

.content {
  padding: 15px;
}

.sheetBox {
  font-size: var(--font_size_3);

  .van-cell__value {
    height: 24px;
    background: #e5e5e5;
  }

  .dateRange {
    .line {
      width: 20px;
      height: 1px;
      background: #cecece;
      margin: 0 15px;
    }
  }
}

.peopleSec {
  height: 36px;
  padding-left: 10px;
  border: 1px solid rgb(235, 239, 245);
  border-radius: 3px;
  overflow-x: scroll;
  overflow-y: hidden;

  .secItem {
    padding: 4px 10px;
    margin: 0 4px;
    white-space: nowrap;
    background: white;
    border-radius: 18px;
  }
}

.btnBox {
  padding: 15px;
}

.searchSheet {
  height: 500px;

  .van-action-sheet__content {
    height: 100%;
  }
}

.sheetBox {
  overflow-y: auto;

  .van-cell {
    padding: 10px 0;
  }

  .van-field__body {
    border-radius: 5px;
    overflow: hidden;
  }

  .van-field__control {
    height: 36px;
    background: #ebeff5;
    padding-left: 10px;
  }

  .peopleSec {
    span {
      margin: 0 5px;
      white-space: nowrap;
    }
  }

  .peopleSec + .van-button {
    height: 36px;
  }
}

.btnBox {
  .van-button--normal {
    padding: 0 40px;
  }
}

.selectSearch {
  display: flex;
  flex-direction: column;

  .van-action-sheet__content {
    flex: 1;
    overflow-y: auto;
    padding: 0 15px;

    .van-checkbox {
      margin: 15px 0;
    }
  }
}

.reason {
  padding: 0.1rem;
  border: 1px solid #ebeff5;
}
</style>
