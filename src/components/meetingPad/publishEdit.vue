<template>
  <div class="publish-container">
    <div class="top">
      <van-cell
        title="消息发布"
        class="top-back"
        icon="arrow-left"
        center
        @click="$router.back()"
      ></van-cell>
    </div>
    <div class="content">
      <div class="textarea-con">
        <van-field
          v-model="messageInfo"
          type="textarea"
          autosize
          name="正文"
          border
          placeholder="请输入正文"
        ></van-field>
      </div>
      <div class="range-con">
        <span>发布范围</span>
        <van-radio-group v-model="rangeRadio">
          <van-radio name="1">全体</van-radio>
          <van-radio name="2">其他</van-radio>
        </van-radio-group>
      </div>
      <div
        v-if="rangeRadio === '2'"
        class="range-con"
        @click="() => (personSelectShow = !personSelectShow)"
      >
        <span>接收人</span>
        <van-field v-model="jsrText" placeholder="请选择" readonly />
        <van-icon name="arrow" />
      </div>
      <div class="btn-con">
        <van-button type="info" @click="sendClick">发送</van-button>
        <van-button type="default" @click="$router.back()">取消</van-button>
      </div>
    </div>
    <van-overlay :show="personSelectShow">
      <div class="person-select-wrapper" @click.stop>
        <div class="person-select-header">
          <van-cell
            title="选择接收人"
            class="top-back"
            icon="arrow-left"
            center
            @click="cacelClick"
          ></van-cell>
        </div>
        <div class="person-select-content">
          <el-input v-model="filterText" placeholder="搜索"> </el-input>
          <el-tree
            ref="tree"
            :data="personSelectList"
            :props="defaultProps"
            :filter-node-method="filterNode"
            default-expand-all
            show-checkbox
          ></el-tree>
        </div>
        <div class="person-select-footer">
          <van-button type="info" @click="getCheckedKeys">保存</van-button>
          <van-button
            type="default"
            @click="cacelClick"
            >取消</van-button
          >
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import Vue from "vue";
import { Tree, Input } from "element-ui";
Vue.use(Tree);
Vue.use(Input);
export default {
  data() {
    return {
      meeting: dsf.util.loadSessionStore("meeting"),
      messageInfo: "",
      rangeRadio: "1",
      personSelectShow: false,
      personSelectList: [],
      defaultProps: {
        children: "children",
        label: "showName"
      },
      filterText: "",
      jsr: "",
      jsrText: "",
      jsrSchema: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getData();
  },
  methods: {
    cacelClick(){
      this.personSelectShow = !this.personSelectShow;
      this.$refs.tree.setCheckedKeys([]);
    },
    sendClick() {
      if(!this.messageInfo.trim()){
        dsf.layer.toast("消息不能为空！", false);
        return
      }
      const params = {
        fid: this.meeting.id,
        fbfw: this.rangeRadio,
        fbfwText: this.rangeRadio == "1" ? "全部" : "其他人",
        bt: this.messageInfo.trim()
      };
      if (this.rangeRadio == "2") {
        if(!this.jsr || !this.jsrText || !this.jsrSchema){
          dsf.layer.toast("接收人不能为空！", false);
          return
        }
        params.jsr = this.jsr;
        params.jsrText = this.jsrText;
        params.jsrSchema = this.jsrSchema;
      }
      dsf.http
        .post(`ctrl/conferenceMessage/addHyMessage`, params)
        .done(result => {
          if (result.data) {
            this.publishMessage(result.data)
          }
        })
        .error(error => {
          console.log("error", error);
        });
    },
    publishMessage(pks){
      dsf.http
        .post(`/fn/conferenceMessage/v2/batchSend`, {
          pks
        })
        .done(result => {
          if (result.code=="200") {
            dsf.layer.toast("发布成功", true);
            this.$router.push({path:"/meetingPad/index/publish"})
          }
        })
        .error(error => {
          console.log("error", error);
        });
    },
    getCheckedKeys() {
      const checkedNode = this.$refs.tree.getCheckedNodes();
      const jsr = [];
      const jsrText = [];
      const jsrSchema = [];
      checkedNode.forEach(item => {
        const id = item.id.split('_')
        if(id[0] === "user"){
          jsr.push(id[1]);
          jsrText.push(item.showName);
          jsrSchema.push("1::" + id[1]);
        }
      });
      this.jsr = jsr.join(",");
      this.jsrText = jsrText.join(",");
      this.jsrSchema = jsrSchema.join(",");
      this.personSelectShow = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.showName.indexOf(value) !== -1;
    },
    getData() {
      dsf.http
        .get(
          `fn/conferenceOrg/user-select/data?meetingId=${this.meeting.id}&action=self_unit&choiceOrg=true`,
          {}
        )
        .done(result => {
          if (result.data) {
            this.personSelectList = result.data.departmentList;
          }
        })
        .error(error => {
          console.log("error", error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.publish-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    flex: 1;
    border: 1px solid #dcdcdc;
    display: flex;
    flex-direction: column;

    .textarea-con {
      padding: 48px 63px;
      padding-bottom: 0;
      flex: 1;

      .van-cell.van-field {
        border: none;
        border-bottom: 1px solid #dcdcdc;
        padding: 0;
        height: 100%;

        ::v-deep .van-field__body {
          height: 100%;
          align-items: flex-start;

          .van-field__control {
            height: 100%!important;
          }
        }
      }
    }

    .range-con {
      display: flex;
      justify-content: space-between;
      height: 160px;
      align-items: center;
      padding: 0 63px;
      font-size: 40px;
      color: #666666;

      .van-radio-group {
        display: flex;
        .van-radio {
          margin-left: 30px;
        }
        .van-radio__label {
          color: #666666;
        }

        ::v-deep .van-radio__icon {
          height: auto;

          .van-icon {
            width: 0.88rem;
            height: 0.88rem;
            line-height: 0.88rem;
          }

          &.van-radio__icon--checked .van-icon {
            border-color: #3b74db;
            background: #3b74db;
          }
        }
      }

      ::v-deep .van-field {
        flex: 1;
        width: auto;

        .van-field__control {
          text-align: right;
        }
      }
    }

    .btn-con {
      border-top: 20px solid #f7f7f7;
      display: flex;
      justify-content: center;
      padding: 25px;
      ::v-deep .van-button {
        width: 30%;
        height: 2rem;
        font-size: 32px;
        font-size: 40px;

        &:first-child {
          margin-right: 40px;
          background: #3b74db;
          border-color: #3b74db;
        }
        &:last-child {
          color: #3b74db;
        }
      }
    }
  }

  .person-select-wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .person-select-content {
      padding: 0 0.64rem;
      height: 100%;
      border-top: 2px solid #f7f7f7;
      border-bottom: 2px solid #f7f7f7;
      overflow: scroll;

      .el-input {
        margin: 0.64rem 0;
      }

      ::v-deep .el-tree {
        .el-tree-node__label {
          font-size: 0.76rem;
        }

        .el-tree-node {
          .is-leaf + .el-checkbox .el-checkbox__inner {
            display: inline-block;
          }
          .el-checkbox .el-checkbox__inner {
            display: none;
          }
        }
      }
    }
    .person-select-footer {
      display: flex;
      justify-content: center;
      padding: 0.5rem;
      ::v-deep .van-button {
        width: 30%;
        height: 2rem;
        font-size: 0.8rem;

        &:first-child {
          margin-right: 40px;
          background: #3b74db;
          border-color: #3b74db;
        }
        &:last-child {
          color: #3b74db;
        }
      }
    }
  }
}
::v-deep .van-radio__icon .van-icon {
  width: 50px;
  height: 50px;
}
.van-radio__icon {
  height: auto;
  font-size: 32px;
  line-height: auto;
}
</style>
