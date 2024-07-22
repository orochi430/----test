<template>
  <div class="container">
    <van-field class="input-box" v-model="opinionContent" :rows="2" type="textarea" :name="metaData && metaData.metaId ? metaData.metaId : ''" />
    <div class="choose">
      <span>常用批示语</span>
      <span @click="showPicker = true">
        请选择
        <van-icon name="arrow-down" />
      </span>
    </div>
    <div class="tag-wrap">
      <span class="tag" v-for="(item, index) in tags" v-if="index < 3" @click="opinionContent = item.context"> {{ item.context }}</span>
    </div>
    <div style="margin: 10px" v-if="showSend">
      <van-button type="primary" block @click="send()">发送</van-button>
    </div>
    <van-popup v-model="showPicker" round position="bottom" get-container="#app">
      <van-picker
        title="常用批示语"
        show-toolbar
        :columns="tags"
        @cancel="showPicker = false"
        confirm-button-text="维护"
        @confirm="showIdeal = true"
        value-key="context"
        ref="tagPicker"
      />
      <div style="margin: 10px">
        <van-button type="primary" block @click="onConfirm()">确认</van-button>
      </div>
    </van-popup>
    <van-popup v-model="showIdeal" position="bottom" round style="height: 80%" get-container="#app">
      <div class="ideal" style="width: 100%; height: 100%">
        <van-nav-bar title="意见维护" left-text="取消" :right-text="`共${this.tags.length}条`" @click-left="showIdeal = false"></van-nav-bar>
        <draggable group="people" class="list-group" ghost-class="ghost" chosenClass="chosen" v-model="tags" animation="200" handle=".sort" @sort="onEnd">
          <div class="list-group-item" v-for="(item, index) in tags" :key="index">
            <span>{{ item.context }}</span>
            <van-icon v-if="!dsf.config.commonForm.hideSendOpinionOrder && item.type != -1" name="sort" color="#666666" size="15" class="sort" />
            <van-icon v-if="item.type != -1" name="close" size="20" @click.stop="clearTags(item)" />
          </div>
        </draggable>
        <div class="footer-btn">
          <input type="text" v-model="newValue" placeholder="请输入意见" />
          <van-button type="primary" @click="addTemplate">添加</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import draggable from "vuedraggable"
export default {
  props: ["formMeta", "metaData"],
  components: {
    "draggable": () => import("vuedraggable"),
  },
  data() {
    return {
      opinionContent: "",
      showPicker: false,
      showIdeal: false,
      tags: [],
      formData: null,
      newValue: "",
      opinionObj: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.formData = this.formMeta.parameters
      let user = dsf.util.loadSessionStore("user")
      let userId = user.user_id
      let userName = user.name
      let duserId = user.user_id
      let duserName = user.name
      if (this.$route.query.todoId) {
        if (this.$route.query.agencyType == "2") {
          userId = this.$route.query.agencyUserId
          userName = this.$route.query.agencyUserName
          duserId = this.$route.query.agencyUserId
          duserName = this.$route.query.agencyUserName
        } else if (this.$route.query.agencyType == "1") {
          duserId = this.$route.query.agencyUserId
          duserName = this.$route.query.agencyUserName
        }
      }
      this.flowKey = `flow-${this.formData.pk}-${this.formData.pId}-${this.formData.pnId}`
      this.opinionObj = {
          id: this.formData.pnId,
          fid: this.formData.fPnId,
          infoId: this.formData.pk,
          pid: this.formData.pId,
          pnid: this.formData.pnId,
          nodeId: this.formData.nodeId,
          wfId: this.formData.flowId,
          opinionContent: this.opinionContent,
          handwritePic: "",
          handwriteThumb: "",
          nodeName: this.formData.nodeName,
          isSign: "0",
          signName: "",
          signTime: "",
          opinionUsers: "",
          opinionUsersText: "",
          duserId: duserId,
          duserName: duserName,
          userId: userId,
          userName: userName,
          opinionFiles: []
      }
    })
  },
  mounted() {
    this.getDefaultOpinition()
    this.getAdvice()
  },
  computed: {
    showSend() {
      return this.formMeta.buttons?.commonButtons.find(btn => btn.action == "send") || this.formMeta.buttons?.mainButtons.find(btn => btn.action == "send")
    }
  },
  watch: {
    opinionContent(val) {
      this.opinionObj.opinionContent = val;
      this.$emit("controlEditOpinion", {key: this.flowKey, value: this.opinionObj});
    }
  },
  methods: {
    getDefaultOpinition() {
      dsf.http
        .post("fn/mobileFormComment/getH5CurrentComment", {
          pk: this.formMeta.parameters.pk,
          pid: this.formMeta.parameters.pId,
          pnid: this.formMeta.parameters.pnId,
          moduleId: this.formMeta.parameters.moduleId
        })
        .then(({ data }) => {
          if (data.data.opinion) {
            this.opinionContent = data.data.opinion
          }
        })
    },
    // 获取常见意见模板
    getAdvice() {
      dsf.http.get("fn/mobileUsedOpinion/find").then(res => {
        this.tags = res.data.rows
      })
    },
    onConfirm() {
      this.opinionContent = this.$refs.tagPicker.getColumnValue(0).context
      this.showPicker = false
    },
    send() {
      this.$bus.$emit("handleFormBtn", { action: "send" })
    },
    clearTags(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除吗？"
        })
        .then(() => {
          dsf.http.get("fn/mobileUsedOpinion/delete?id=" + item.id).then(() => {
            this.getAdvice()
          })
        })
    },
    onEnd() {
      console.log(this.tags);
      this.tags.forEach((ele) => {
        this.ids += ele.id + ",";
      });
      dsf.http
        .post("/fn/mobileUsedOpinion/moveIndex", {
          templateIds: this.ids,
        })
        .then(() => {
          this.getAdvice();
        });
    },
    addTemplate() {
      if (this.tags.find(item => this.newValue == item.context)) {
        dsf.layer.toast("模板内容已重复")
        return
      }
      if (this.newValue != "" && this.newValue.trim().length > 0) {
        dsf.http
          .post("fn/mobileUsedOpinion/add", {
            __DATA: JSON.stringify({
              opinion: this.newValue
            })
          })
          .then(data => {
            this.getAdvice()
            this.newValue = ""
          })
      } else {
        dsf.layer.toast("请输入内容")
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  font-size: var(--font_size_3);
}
.input-box {
  border-radius: 2px;
  border: 1px solid #666;
  padding: 6px;
  margin: 10px 0;
}
.choose {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
.tag-wrap {
  margin: 16px 0;
  .tag {
    padding: 6px 10px;
    background-color: #f4f4f4;
    border-radius: 2px;
    margin: 6px 6px 6px 0;
    display: inline-block;
  }
}
.ideal {
  position: relative;
  overflow: hidden;

  .van-nav-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 50px;
    border-bottom: 2px solid #f1f2f4;
  }
  .chosen {
    background-color: var(--normal);
    span {
      color: #fff;
    }
  }
  .list-group {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    padding: 0 10px;
    width: 100%;
    overflow: auto;

    .list-group-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 8px;
      height: 45px;
      border-bottom: 2px solid #f1f2f4;
      > span {
        margin-right: 5px;
        flex: 1;
        font-size: var(--font_size_2);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        width: 20px;
      }
      .van-icon-close {
        margin-left: 15px;
      }
    }
  }

  .footer-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 50px;

    input {
      padding: 0 5px;
      // width: calc(100% - 70px);
      flex: 1;
      margin-right: 10px;
      height: 40px !important;
      border: 2px solid #f1f2f4 !important;

      &::-webkit-input-placeholder {
        color: #cfd0d2;
      }
    }

    .van-button {
      padding: 0 12px;
      height: 38px;
    }
  }

  .flip-list-move {
    -webkit-transition: -webkit-transform 0.5s;
    transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
    transition: transform 0.5s, -webkit-transform 0.5s;
  }

  .no-move {
    -webkit-transition: -webkit-transform 0s;
    transition: -webkit-transform 0s;
    transition: transform 0s;
    transition: transform 0s, -webkit-transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
