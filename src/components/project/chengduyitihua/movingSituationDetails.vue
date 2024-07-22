<template>
  <div style="height: 100%">
    <div class="moving-situation-details">
      <van-row v-if="parameters.formTemplateName == '移动表单带表格线'">
        <van-col :span="$store.state.clientType == 'mobile' ? 7 : 4">
          <div
            style="
              font-weight: 800;
              font-size: var(--font_size_2);
              padding: 0 0.12rem 0.3rem;
              text-align: center;
            "
          >
            流转情况
          </div>
        </van-col>
      </van-row>
      <div class="_content">
        <div class="_item" v-for="(item, index) in contentData" :key="index">
          <div class="_head">
            <img
              :src="dsf.url.getWebPath(item.photoImg) || defaultIcon"
              alt
              :onerror="`this.src='${defaultIcon}'`"
            />
            <van-icon v-if="item.status < 0" name="checked" color="#13BA84" />
            <van-icon v-else name="more" color="#e30000" />
            <!-- <span :class="(index+1)<=active?'finish':(index+2)==active?'wait':''"></span> -->
          </div>
          <div
            class="_con"
            :class="{
              red:
                item.status > 0 &&
                dsf.config.commonFlow.showUrgingBtn &&
                (!item.children || item.children.length == 0),
            }"
          >
            <span class="_titles">
              <i class="_title ds_font4">{{ item.nodeName }}</i>
              <i class="_time ds_font6">{{ item.eDate.substring(5) }}</i>
            </span>
            <span style="color: #999" v-if="item.fduserName"
              >发送人：{{ item.fduserName }}({{
                item.rDate.substring(5)
              }})</span
            >
            <div class="btn">
              <span class="_name ds_font6"
                ><span v-if="item.fduserName">接收人：</span
                >{{ item.userName }}</span
              >
              <van-button
                class="cuiban"
                v-if="
                  item.status > 0 &&
                  dsf.config.commonFlow.showUrgingBtn &&
                  (!item.children || item.children.length == 0)
                "
                type="warning"
                size="small"
                @click="cuiban(item)"
                ><img
                  src="static/images/project/chengduyitihua/cuiban.png"
                  alt=""
                  class="cuibanimg"
                />
                催办</van-button
              >
            </div>

            <span
              class="_detail ds_font6"
              :style="{
                color: parameters.nodeId == item.nodeId ? '#e30000' : '',
              }"
              >{{ getStatus(item) }}</span
            >
            <p>
              <span class="_detail ds_font6" v-if="item.content"
                >"{{ item.content }}"</span
              >
              <a
                v-if="item.content && dsf.config.commonFlow.showCopyOpinionBtn"
                @click="handleClick('copyel_' + index, item.content)"
                :class="'copyel copyel_' + index"
                >复制意见</a
              >
            </p>
            <span class="_detail ds_font6" v-if="item.preContent">{{
              item.preContent
            }}</span>
            <div
              class="content"
              v-if="item.hasHandWriteImg && item.hasHandWrite"
            >
              <img
                style="width: 150px"
                :src="dsf.url.getWebPath(item.hasHandWriteImg)"
                alt=""
              />
            </div>

            <div v-if="item.children" class="_content _content-children">
              <div
                v-for="(node, index) in item.children"
                :key="index"
                class="_item subitem"
              >
                <div class="_head">
                  <img
                    :src="dsf.url.getWebPath(node.photoImg) || defaultIcon"
                    alt
                    :onerror="`this.src='${defaultIcon}'`"
                  />
                  <!-- <van-icon v-if="node.status < 0||node.pDate.length>0" name="checked" color="#13BA84" />
                            <van-icon v-else name="more" color="#E6A23C" /> -->
                  <!-- <span :class="(index+1)<=active?'finish':(index+2)==active?'wait':''"></span> -->
                </div>
                <div
                  class="_con"
                  :class="{
                    red: node.status > 0 && dsf.config.commonFlow.showUrgingBtn,
                  }"
                >
                  <span class="_titles">
                    <i class="_title ds_font4 flex ac">
                      {{ node.userName }}
                      <div class="status">
                        {{
                          node.status < 0 || node.pDate.length > 0
                            ? "已读"
                            : "未读"
                        }}
                      </div>
                    </i>
                    <i class="_time ds_font6">{{ node.pDate.substring(5) }}</i>
                  </span>
                  <!-- <span class="_name ds_font6">{{node.userName}}</span> -->
                  <!-- <span class="_detail ds_font6" style="display: flex; justify-content: space-between;" :style="{color: parameters.nodeId == node.nodeId ? '#e30000' : ''}">
                                {{ getStatus(node) }}
                            </span> -->
                  <p>
                    <span class="_detail ds_font6" v-if="node.content"
                      >"{{ node.content }}"</span
                    >
                    <a
                      v-if="
                        node.content && dsf.config.commonFlow.showCopyOpinionBtn
                      "
                      @click="handleClick('copyel1_' + index, node.content)"
                      :class="'copyel copyel1_' + index"
                      >复制意见</a
                    >
                  </p>

                  <span class="_detail ds_font6" v-if="node.preContent">{{
                    node.preContent
                  }}</span>
                  <div
                    class="content"
                    v-if="node.hasHandWriteImg && node.hasHandWrite"
                  >
                    <img
                      style="width: 150px"
                      :src="dsf.url.getWebPath(node.hasHandWriteImg)"
                      alt=""
                    />
                  </div>
                  <van-button
                    class="cuiban"
                    v-if="
                      node.status > 0 && dsf.config.commonFlow.showUrgingBtn
                    "
                    type="warning"
                    size="small"
                    @click="cuiban(node)"
                    ><img
                      src="static/images/project/chengduyitihua/cuiban.png"
                      alt=""
                      class="cuibanimg"
                    />
                    催办</van-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="showCB"
      position="bottom"
      round
      :style="{ height: '70%' }"
    >
      <div class="cb_contain">
        <van-nav-bar
          class="cbnav"
          title="催办信息发送"
          right-text="关闭"
          @click-right="closePop"
        ></van-nav-bar>
        <div class="cbinfo">
          <!-- <textarea
            placeholder="请输入催办信息"
            class="text"
            v-model.trim="message"
          ></textarea> -->
          <van-field v-model.trim="message" rows="1"  :autosize= "{maxHeight: 175}" label="" type="textarea" placeholder="请输入催办信息" />
          <div class="tipText">催办消息将以下面的形式发送：</div>
          <div class="cbtype">
            <van-checkbox-group v-model="result" direction="horizontal">
              <van-checkbox
                icon-size="16px"
                :name="item.codeValue"
                v-for="item in typeList"
                :key="item.codeValue"
                >{{ item.codeName }}</van-checkbox
              >
            </van-checkbox-group>
          </div>
          <!-- <div class="defaultText">
                    {{ defaultText }}
                </div> -->
        </div>
        <div class="btoms">
          <van-button type="primary" size="small" @click="doCBAction"
            ><img
              src="static/images/project/chengduyitihua/cuiban.png"
              alt=""
              class="cuibanimg"
            />
            催办</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "movingSituationDetails",
  data() {
    return {
      active: 2,
      contentData: [],
      defaultIcon: require("../../../assets/imgs/workflow/icon_institution_level_two.png"),
      showCB: false,
      message: "",
      result: [],
      typeList: [],
      defaultText: "",
      curNode: {},
    };
  },
  created() {},
  mounted() {},
  methods: {
    cuiban(node) {
      this.curNode = node;
      console.log(this.parameters);
      //加载催办提醒方式和提醒模板
      let infoId = this.parameters.pk; //文件id
      let moduleId = this.parameters.moduleId; //文件的模块id
      dsf.http
        .post(`ctrl/flowmonitor/getUrgeRemindConfig`, {
          infoId: infoId,
          moduleId: moduleId,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.type == "success") {
            if (data.data) {
              var smsMethodType = data.data.smsMethodType;
              this.message = data.data.sms;
              if (smsMethodType) {
                this.typeList = smsMethodType;
                this.result = smsMethodType.map((item) => item.codeValue);
              }
              this.showCB = true;
            }
          } else {
            console.log("get urge config error!");
          }
        });
    },
    doCBAction() {
      var docid = this.parameters.pk; //文件id
      var moduleId = this.parameters.moduleId; //模块id
      var bt = this.message; //催办内容
      var remindType = this.result; //提醒方式
      var pnId = this.curNode.id || this.parameters.pnId; //催办环节
      if (!bt) {
        dsf.layer.toast("请输入催办内容！");
        return true;
      }
      // if (remindType.length == 0) {
      //   dsf.layer.toast("请选择提醒方式！");
      //   return true;
      // }

      dsf.http
        .post(`fn/remind2512/remindTodo`, {
          moduleId: moduleId,
          pk: docid,
          content: bt,
          remindModes: remindType.join(","),
          pnIds: pnId,
          nodeId:this.curNode.nodeId,
          userId:this.curNode.userId
        })
        .then(({ data }) => {
          console.log(data);
          if (data.type == "success") {
            dsf.layer.toast("催办成功！");
            this.closePop();
          } else {
            console.log("get urge config error!");
          }
        });
    },
    getStatus(node) {
      if (node.nodeType == "7") {
        // return node.fduserName ? `抄送人：${node.fduserName}` : '(抄送)';
        return "(抄送)";
      } else if (node.status > 0) {
        return dsf.config.commonForm.moveingDetailText
          ? "(" + dsf.config.commonForm.moveingDetailText + ")"
          : "";
      }
      return "";
    },
    handleClick(cls, text) {
      const clipboard = new Clipboard("." + cls, {
        text: () => text,
      });

      clipboard.on("success", (e) => {
        dsf.layer.toast("复制成功");
      });

      clipboard.on("error", (e) => {
        dsf.layer.toast("复制失败");
      });

      clipboard.onClick(event);
    },
    closePop() {
      this.showCB = false;
      this.message = "";
      this.result = [];
      this.typeList = [];
      this.defaultText = "";
      this.curNode = {};
    },
  },
  props: {
    flowInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    parameters: {
      type: Object,
    },
  },
  watch: {
    flowInfo: {
      handler(nv, ov) {
        var self = this;
        if (nv.passedNodes) {
          let copyPassedNodes = nv.passedNodes.filter(
            (item) => item.nodeType == 7
          );
          let nodeGroup = {};
          nv.passedNodes.forEach((item, index) => {
            if (item.nodeType != 7) {
              self.contentData.push(item);
            } else {
              if (index > 0) {
                if (!nodeGroup[item.fid]) {
                  nodeGroup[item.fid] = {
                    children: [item],
                    nodeName: `抄送人：` + item.fduserName,
                    nodeId: item.nodeId,
                    nodeType: 7,
                    content: "",
                    deptId: "",
                    deptName: "",
                    eDate: "",
                    hasHandWrite: false,
                    orgNameLv1: "",
                    orgNameLv2: "",
                    orgNameLv3: "",
                    orgNameLv4: "",
                    orgNameLv5: "",
                    pDate: "",
                    photoImg: "",
                    rDate: "",
                    signImg: "",
                    userId: "",
                  };
                } else {
                  nodeGroup[item.fid].children.push(item);
                }
              }

              // 合并抄送节点 -- 旧版
              // if (index > 0 && nv.passedNodes[index - 1].nodeType != 7) {
              //   self.contentData.push({
              //     nodeName: `${copyPassedNodes.length}位抄送人`,
              //     nodeId: item.nodeId,
              //     userName: "抄送人",
              //     status: copyPassedNodes.every((item) => item.pDate)
              //       ? "-1"
              //       : "1",
              //     children: copyPassedNodes,
              //     nodeType: 7,
              //     content: "",
              //     deptId: "",
              //     deptName: "",
              //     eDate: "",
              //     hasHandWrite: false,
              //     orgNameLv1: "",
              //     orgNameLv2: "",
              //     orgNameLv3: "",
              //     orgNameLv4: "",
              //     orgNameLv5: "",
              //     pDate: "",
              //     photoImg: "",
              //     rDate: "",
              //     signImg: "",
              //     userId: "",
              //   });
              // }
            }
          });
          console.log(nodeGroup);

          Object.keys(nodeGroup).forEach((key) => {
            let item = nodeGroup[key];
            item.userName =
              "接收人：" + item.children.map((obj) => obj.userName).join("、");
            item.status = item.children.every((obj) => obj.pDate) ? "-1" : "1";
            self.contentData.push(item);
          });
        }
        // else {
        //     self.contentData = nv.passedNodes ? nv.passedNodes : [];
        //     self.contentData.forEach(element => {

        //     });
        // }
        this.active = self.contentData.length;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
::v-deep .van-field__body{
  padding-right: 2px;
  ::-webkit-scrollbar {
      width: 3px;
      background-color: #eee;
  }
  ::-webkit-scrollbar-track {
      background-color: #eee;
  }
  ::-webkit-scrollbar-thumb {
      background: #ccc;
  }

}
.moving-situation-details {
  margin-top: 0 !important;
  background: #f0f3f8;
  padding-top: 10px;
  height: 100%;
  overflow: auto;
}
._con {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 10px;
  background: #fff;
  position: relative;
}
.red {
  background: rgba(255, 225, 225, 0.6);
  border: 2px solid #ff9393;
}
.btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cuiban {
    width: 60px;
    height: 0.5rem;
    // position: absolute;
    padding: 0;
    // right: 10px;
    // top: 50%;
    // transform: translateY(-50%);
    .cuibanimg {
      width: 18px;
      height: 18px;
      display: inline-block;
    }
  }
}

._content-children {
  ._item {
    margin: 0 !important;

    &:last-child {
      padding: 0;
    }

    &:first-child {
      padding-top: 16px !important;
    }

    ._con {
      border-radius: 4px;
      border: 1px solid #ccc;
      padding: 10px;
      .status {
        border: 1px solid;
        border-radius: 3px;
        @include font-theme("normal");
        @include border-color-theme("normal");
        padding: 0 4px;
        margin: 0 8px;
        font-size: var(--font_size_4);
      }
    }
  }

  .subitem {
    padding-bottom: 20px !important;
  }
}

.copyel {
  text-decoration: underline;
  margin-left: 10px;
  color: var(--normal);
}

.cb_contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cbnav {
    width: 100%;
    flex-shrink: 0;
  }

  .cbinfo {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    background: #fff;

    .text {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      padding: 15px;
      font-size: var(--font_size_6);
      color: #333;
      line-height: 24px;
    }

    .tipText {
      width: 100%;
      height: 40px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      font-size: var(--font_size_4);
      color: #333;
      box-sizing: border-box;
      padding: 0 15px;
    }

    .cbtype {
      border-top: 1px solid #ebebeb;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;

      .van-checkbox {
        margin-right: 20px;
        margin: 5px 20px 5px 0;
      }
    }

    .defaultText {
      border-top: 1px solid #ebebeb;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 15px;
      font-size: var(--font_size_6);
      color: #000;
      line-height: 24px;
    }
  }

  .btoms {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-top: 1px solid #ebebeb;

    .van-button {
      width: 100%;
      height: 40px;
      img {
        width: 20px;
        height: 20px;
        display: inline-block;
      }
    }
  }
}
</style>
