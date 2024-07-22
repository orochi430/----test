<template>
  <div class="list">
    <van-popup
      v-model="showScr"
      :close-on-click-overlay="true"
      class="file-preview"
      lock-scroll
      position="bottom"
      style="height: 100vh"
    >
      <div class="in-list" v-if="openList">
        <div class="card" @click="cancel(dialogIndex)">
          <div><van-icon name="arrow-left" /> <span>组织架构排序</span></div>
          <p>人员选择</p>
        </div>

        <div class="in-box">
          <div class="search" v-if="false">
            <p>请选择联系人</p>
            <div>
              <i class="el-icon-search"></i>
              <input type="text" placeholder="请输入" />
              <span>搜 索</span>
            </div>
          </div>
          <div class="com-tit">
            <span>选择方式</span>
            <i></i>
          </div>
          <ul class="tab-ul">
            <li
              @click="tabClick(1, 'self_unit')"
              :class="{ active: tabNum == 1 }"
            >
              <i class="icon iconfont iconzhongyaohuiyi"></i>
              <span>会议人员</span>
            </li>
            <li
              @click="tabClick(2, 'private_group')"
              :class="{ active: tabNum == 2 }"
            >
              <i class="icon iconfont iconbumen"></i>
              <span>我的群组</span>
            </li>
          </ul>
          <div class="com-tit com-tit1">
            <span>参会人员</span>
            <div>
              <van-checkbox
                v-model="isLocked"
                v-if="dialogIndex != 1"
                shape="square"
                icon-size="20px"
                >强制共享</van-checkbox
              >
              <van-checkbox
                v-model="checked"
                v-if="dialogIndex != 1"
                shape="square"
                icon-size="20px"
                >全选</van-checkbox
              >
            </div>
          </div>
          <div class="tree">
            <template v-if="Object.keys(list).length > 0">
              <div
                class="tree-item"
                v-for="(item, key, index) in list"
                :key="index"
              >
                <div class="tree-tit">
                  <i
                    class="icon iconfont iconarrow-right-drop-circle-outline"
                  ></i>
                  <span>{{ key }}</span>
                </div>
                <ul class="tree-item-ul">
                  <li
                    v-for="(it, i) in item"
                    :key="i"
                    @click.stop="infoClick(it)"
                  >
                    <van-checkbox
                      v-model="it.checked"
                      shape="square"
                      icon-size="20px"
                      disabled
                      ><p class="p">
                        {{ it.name
                        }}<label for="" class="label" v-if="it.attrs.dwzw"
                          >（{{ it.attrs.dwzw }}）</label
                        ><i class="i" v-if="dialogIndex == 1 && it.checked"
                          >共享中</i
                        >
                      </p></van-checkbox
                    >
                    <span>单位：{{ key }}</span>
                    <div>
                      <label
                        for=""
                        v-if="
                          promoter.user_id != it.attrs.idValue &&
                          (dialogIndex == 1) & !it.checked
                        "
                        @click.stop="againSameScreen(it)"
                        >邀请人员</label
                      >
                      <i :class="{ active: it.attrs.signValue == '1' }">{{
                        it.attrs.signValue == "1" ? "已签到" : "未签到"
                      }}</i>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
            <commonempty
              v-else
              class="empty"
              description="暂无人员数据"
            ></commonempty>
          </div>
        </div>
        <div class="footer">
          <div class="line"></div>
          <div>
            <label for="">已选择</label>
            <div>
              <span v-for="(ele, i) in checkData" :key="i">{{ ele.name }}</span>
            </div>
          </div>
          <button
            :class="{ active: dialogIndex == 1 }"
            @click="openSameScreen(dialogIndex)"
          >
            确定 （{{ checkData.length }}/{{ personData.length }}）
          </button>
        </div>
      </div>
      <div class="in-list" v-if="openIframe">
        <iframe :src="dsf.url.getWebPath(SameUrl)"></iframe>
      </div>
    </van-popup>
    <div class="mask" :class="{ active: showRemainDialog }">
      <div class="diolag">
        <p>{{ dialogData[dialogIndex].title }}</p>
        <div>
          <span @click="cancelDiolog(dialogIndex)">取消</span>
          <span @click="openUser(dialogIndex)">{{
            dialogData[dialogIndex].button
          }}</span>
        </div>
      </div>
    </div>
    <div class="mask" :class="{ active: showScrDialog }">
      <div class="diolag">
        <p v-if="meetingObj.sendUserId != promoter.user_id">
          {{ meetingObj.sendUserName }}发送了一条同屏分享，是否参加({{
            this.timer
          }}s后自动关闭)
        </p>
        <p v-else>
          您开启的同屏正在共享中...，是否再次进入({{ this.timer }}s后自动关闭)
        </p>
        <div>
          <span @click="remove">取消</span>
          <span @click="openScr()">参加</span>
        </div>
      </div>
    </div>
    <div
      class="same-box"
      :class="{
        openhalf: sameboxNum == 2,
        open: sameboxNum == 1,
        close: sameboxNum == 0,
      }"
    >
      <div>
        <!-- 继续邀请人员后，点击重新进入会议 -->
        <i class="icon iconfont iconhuiyitongzhi" @click="againOpen"></i>
        <i
          class="icon iconfont iconfaqiqunliao"
          v-if="
            !meetingObj.sendUserId ||
            (meetingObj.sendUserId && meetingObj.sendUserId == promoter.user_id)
          "
          @click="showDialog(1)"
        ></i>
        <i
          class="icon iconfont iconpower"
          v-if="
            (meetingObj?.isLocked == '-1' &&
              meetingObj.sendUserId != promoter.user_id) ||
            meetingObj.sendUserId == promoter.user_id ||
            isSend
          "
          @click="showDialog(2)"
        ></i>
      </div>
      <div @click="sameBoxClick">
        {{ meetingObj.sendUserName || promoter.name }}发起的同屏，共享中...
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/common/util";
export default {
  components: {},
  props: {
    accept: {
      type: Boolean,
      default: false,
    },
    meetingObj: {
      //会议同屏数据
      type: Object,
      default: {
        meetingId: "",
        topicId: "",
        fileId: "",
        mode: "",
        sendUserId: "", //发起人id，如果为空，则为发起同屏，若有值则为接收同屏
        sendUserName: "", //发起人名字
        personnelUserid: "", //上一次发起携带的同屏人员,主持人掉线
        isLocked: "-1", //强制共享  1：是  -1 ：否
      },
    },
  },
  data() {
    return {
      showScr: false,
      showRemainDialog: false,
      sameFile: {},
      action: "self_unit",
      checked: false,
      tabNum: 1,
      personData: [],
      show: false,
      partyArr: [],
      sameFile: [],
      list: {},
      checkData: [],
      flag: true,
      openList: false,
      openIframe: false,
      SameUrl: "",
      ids: "", // 邀请同屏人员id
      sameboxNum: 3, //上方同屏操作样式状态 0：收起，1：展开，2：收缩
      promoter: dsf.util.loadSessionStore("user"),
      dialogIndex: 0, // 三个弹框index
      isLocked: false, // 强制共享  true：是  false ：否
      isSend: false, // 当前为发起人，一直显示关闭按钮
      dialogData: [
        {
          title: "是否开启同屏共享",
          button: "开启同屏",
        },
        {
          title: "是否继续邀请人员",
          button: "邀请",
        },
        {
          title: "是否关闭同屏",
          button: "关闭",
        },
      ],
      timer: 10,
      inter1: null, // 图标栏的定时器
      inter2: null, // 接收同屏的弹框计时器
      showScrDialog: true,
    };
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        this.checkData = [];
        for (let key in newVal) {
          newVal[key].forEach((ele) => {
            if (ele.checked) this.checkData.push(ele);
          });
        }
      },
      deep: true,
    },
    checked: {
      handler: function (newVal, oldVal) {
        if (this.dialogIndex == 1) {
          return;
        }
        for (let key in this.list) {
          this.list[key].forEach((ele) => {
            ele.checked = newVal;
          });
        }
      },
      deep: true,
    },
    action: {
      handler: function (newVal, oldVal) {
        this.getData();
      },
      deep: true,
    },
    sameboxNum: {
      handler: function (newVal, oldVal) {
        if (newVal == 1) {
          this.inter1 = setInterval(() => {
            this.timer--;
            if (this.timer < 1) {
              this.showRemainDialog = true;
              this.sameboxNum = 2;
              clearInterval(this.inter1);
            }
          }, 1000);
        } else {
          setTimeout(() => {
            this.timer = 10;
          }, 1000);
          clearInterval(this.inter1);
        }
      },
      deep: true,
    },
    showScrDialog: {
      handler: function (newVal, oldVal) {
        if (!newVal) {
          this.inter2 = setInterval(() => {
            this.timer--;
            if (this.timer < 1) {
              this.showScrDialog = true;
              this.showRemainDialog = true;
              clearInterval(this.inter2);
            }
          }, 1000);
        } else {
          setTimeout(() => {
            this.timer = 10;
          }, 1000);
          clearInterval(this.inter2);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getData();
    if (this.accept) {
      console.log("接收人打开同屏");
      console.log(this.meetingObj);
      if (this.meetingObj.sendUserId) {
        //存在发起人id，则为发起人掉线或接收人进入同屏
        // this.showBox(true, false, true, true, 2)
        this.SameUrl = `/p1000/idm/index.html?meetingId=${this.meetingObj.meetingId}&topicId=${this.meetingObj.topicId}&fileId=${this.meetingObj.fileId}&mode=${this.meetingObj.mode}#/preview/231017141823jg9mxImk7iStWUTpGPm`;
        if (this.meetingObj.isLocked == 1) {
          // 强制同屏
          this.showBox(true, false, true, true, 2);
        } else {
          this.showScrDialog = false;
        }
      } else {
        this.showScrDialog = false;
        this.showRemainDialog = true;
      }
    } else {
      console.log("发起人打开同屏");
      this.showBox(true, true, false, true, 2);
    }
  },
  methods: {
    showBox(showScr, openList, openIframe, showRemainDialog, params) {
      this.showScr = showScr; // 打开同屏弹框
      this.openList = openList; // 打开选人列表
      this.openIframe = openIframe; // 打开同屏页面
      this.showRemainDialog = showRemainDialog; // 打开提示弹框
      this.sameboxNum = params; // 上方收缩栏状态
    },
    sameBoxClick() {
      if (this.sameboxNum == 1) {
        this.sameboxNum = 2;
      } else {
        this.sameboxNum = 1;
      }
    },
    cancelDiolog(index) {
      //关闭提示弹框
      if (index == 0) {
        //即关闭提示弹框，也关闭同屏弹框
        this.closeSameScreen();
        setTimeout(() => {
          this.$emit("showSameClick");
        }, 100);
      } else {
        //只关闭弹框
        this.showRemainDialog = true;
      }
    },
    againOpen() {
      this.showBox(true, false, true, true, 2);
    },
    showDialog(index) {
      this.dialogIndex = index;
      this.showRemainDialog = false;
      this.sameboxNum = 2;
    },
    cancel(params) {
      if (params == 0) {
        //关闭同屏
        setTimeout(() => {
          this.$emit("showSameClick");
        }, 100);
      } else {
        // 直接关闭选人弹框
        this.showBox(true, false, true, true, 2);
      }
    },
    openUser(params) {
      console.log(params);
      if (
        this.meetingObj.sendUserId &&
        this.meetingObj.sendUserId != this.promoter.user_id
      ) {
        //接收人关闭直接关闭弹框，不能结束同屏
        setTimeout(() => {
          this.$emit("showSameClick");
        }, 100);
      } else {
        //发起人的关闭操作，三个提示框
        if (params == 0) {
          //发起同屏
          this.showBox(true, true, false, true, 2);
        } else if (params == 1) {
          //邀请人员
          this.showBox(true, true, false, true, 2);
        } else {
          //关闭弹框，结束同屏
          console.log("主持人关闭");
          this.closeSameScreen();
          setTimeout(() => {
            this.$emit("showSameClick");
          }, 100);
        }
      }
    },
    screenClick(data) {
      this.showRemainDialog = !this.showRemainDialog;
      console.log(data);
      this.sameFile = data.files;
    },
    getData() {
      let self = this;
      this.personData = [];
      this.partyArr = [];
      this.list = {};
      dsf.http
        .post(
          `/fn/conferenceOrg/user-select/data?meetingId=${this.meetingObj.meetingId}&action=${this.action}&choiceOrg=true`,
          {}
        )
        .done((res) => {
          console.log(res.data);
          if (res.code == 200 && res.data.departmentList) {
            self.loopData(res.data.departmentList);
            let arr = [...new Set(self.partyArr)];
            arr.forEach((item) => {
              let value = [];
              self.personData.forEach((it) => {
                if (
                  self.meetingObj.personnelUserid?.includes(it.attrs.idValue)
                ) {
                  self.$set(it, "checked", true);
                  self.checkData.push(it);
                } else {
                  self.$set(it, "checked", false);
                }

                if (it.attrs.fullDeptName == item) {
                  value.push(it);
                }
              });
              self.$set(self.list, item, value);
            });
            console.log(this.personData);
          } else {
          }
        });
    },
    loopData(data) {
      data.forEach((ele) => {
        if (ele.type == "1") {
          this.partyArr.push(ele.attrs.fullDeptName);
          if (ele.attrs.idValue != this.promoter.user_id) {
            this.personData.push(ele);
          }
        } else {
          if (ele.children.length > 0) {
            this.loopData(ele.children);
          }
        }
      });
    },
    tabClick(i, action) {
      this.tabNum = i;
      this.action = action;
    },
    infoClick(it) {
      if (this.dialogIndex != 1) {
        it.checked = !it.checked;
      }
    },
    againSameScreen(it) {
      // 继续邀请人员
      let loading = dsf.layer.loading("邀请中");
      dsf.http
        .post(`fn/conferenceMobile/addPersonnelSameScreen`, {
          meetingId: this.meetingObj.meetingId,
          personnelUserid: it.attrs.idValue,
          isLocked: this.isLocked ? "1" : "-1",
        })
        .done((res) => {
          if (res.code == 200) {
            dsf.layer.closeLoading(loading);
            it.checked = true;
            dsf.layer.toast("已邀请");
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    closeSameScreen() {
      // 主持人关闭同屏
      if (this.meetingObj.sendUserId == this.promoter.user_id || this.isSend) {
        dsf.http
        .post(`fn/conferenceMobile/endSameScreen`, {
          meetingId: this.meetingObj.meetingId,
        })
        .done((res) => {
          if (res.code == 200 && res.data) {
            dsf.layer.toast(res.message);
          }
        });
      }
    },
    openSameScreen(index) {
      if (this.checkData.length == 0) {
        dsf.layer.toast("请选择人员");
        return;
      }
      if (index == 0) {
        // 开启同屏邀请
        // let loading = dsf.layer.loading('发起同屏中')
        this.isSend = true;
        this.ids = "";
        this.checkData.forEach((ele, i) => {
          if (i == 0) this.ids += ele.attrs.idValue;
          else this.ids += "," + ele.attrs.idValue;
        });
        dsf.http
          .post(`fn/conferenceMobile/startSameScreen`, {
            meetingId: this.meetingObj.meetingId,
            personnelUserid: this.ids,
            fileId: this.meetingObj.fileId,
            isLocked: this.meetingObj.isLocked || this.isLocked ? "1" : "-1",
          })
          .done((res) => {
            console.log(res);
            if (res.code == "200") {
              setTimeout(() => {
                this.sameboxNum = 2;
              }, 500);
              this.openList = false;
              this.openIframe = true;
              this.SameUrl = `/p1000/idm/index.html?meetingId=${this.meetingObj.meetingId}&topicId=${this.meetingObj.topicId}&fileId=${this.meetingObj.fileId}&mode=${this.meetingObj.mode}#/preview/231017141823jg9mxImk7iStWUTpGPm`;
              // dsf.layer.closeLoading(loading)
            } else {
              dsf.layer.toast(res.message);
            }
          });
      }
    },
    //  接受同屏的相关逻辑

    openScr() {
      this.showBox(true, false, true, true, 2);
      this.showScrDialog = true;
      console.log(this.showRemainDialog);
    },
    remove() {
      this.$emit("showSameClick");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.list {
  position: relative;

  .same-box {
    position: fixed;
    top: -180px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s;
    z-index: 3000;

    &.open {
      top: 0;
    }

    &.openhalf {
      top: -100px;
    }

    &.close {
      top: -170px;
    }

    div {
      &:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 500px;
        height: 90px;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.27);
        border-radius: 0 0 10px 10px;

        .icon {
          margin: 0 40px;
          font-size: 50px;
          color: #fff;
        }

        .iconpower {
          font-size: 68px;
        }
      }

      &:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 420px;
        height: 70px;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.27);
        border-radius: 0 0 10px 10px;
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .in-list {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 50px 40px 30px;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &.active {
      opacity: 0;
    }
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 40px;
    height: 50px;
    > div {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
    }
    span {
      margin-left: 10px;
      font-size: 40px;
      color: #333333;
    }
    p {
      font-size: 48px;
      color: #333333;
      letter-spacing: 2px;
    }
  }

  iframe {
    padding: 20px 0;
    width: 100%;
    height: calc(100% - 90px);
  }

  .search {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    p {
      font-size: 44px;
      color: #333333;
      font-weight: 600;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 40px 0 30px 0;
      padding-left: 20px;
      width: 80%;
      height: 100px;
      background: #f5f6f9;
      border-radius: 4px;

      input {
        margin-left: 30px;
        padding-right: 100px;
        flex: 1;
        height: 100%;
        font-size: 40px;
        color: #a6a6a6;
        background: transparent !important;
      }

      span {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 100%;
        font-size: 40px;
        color: #3389e0;

        &::before {
          position: absolute;
          content: "";
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 1px;
          height: 22px;
          background: #979797;
        }
      }
    }
  }

  .com-tit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px 0 60px;
    width: 100%;
    height: 120px;
    background: #f3f3f3;

    span {
      position: relative;
      font-size: 40px;
      color: #333333;
      font-weight: 600;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -15px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        transform: translate(0, -50%);
        @include background-theme("normal");
      }
    }

    /deep/.van-checkbox__label {
      margin-left: 18px;
      padding-top: 4px;
      line-height: 50px !important;
      @include font-theme("normal");
    }
  }

  .com-tit1 {
    span {
      &::before {
        display: none;
        content: ".";
      }
    }
    div {
      display: flex;
      align-items: center;
    }
    /deep/.van-checkbox {
      margin-left: 30px;
    }
    /deep/.van-checkbox__label {
      font-weight: bold;
    }
  }

  .tab-ul {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;

    li {
      display: flex;
      align-items: center;
      margin: 0 80px;

      i {
        margin-right: 15px;
        color: #333333;
        font-size: 44px;
      }

      span {
        font-size: 40px;
        color: #333333;
        font-weight: bold;
      }

      &.active {
        span {
          @include font-theme("normal");
        }

        i {
          @include font-theme("normal");
        }
      }
    }
  }

  .tree {
    .tree-item {
      .tree-tit {
        display: flex;
        align-items: center;
        padding: 40px 0 18px 8px;

        i {
          font-size: 44px;
          @include font-theme("normal");
        }

        span {
          margin-left: 10px;
          font-size: 40px;
          color: #333333;
          font-weight: 500;
        }
      }

      .tree-item-ul {
        width: 100%;

        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          width: 100%;
          height: 130px;
          border-bottom: 1px solid #e5e5e5;

          /deep/.van-checkbox__label {
            margin-left: 28px !important;
            padding-top: 3px;
            line-height: 50px !important;
            font-size: 40px;
            color: #333333;
          }
          .p {
            display: flex;
            align-items: center;
            justify-content: start;
            .label {
              font-size: 40px;
              color: #666666;
            }
            .i {
              display: block;
              margin-left: 10px;
              padding: 3px 10px;
              font-size: 32px;
              color: #666666;
              background: #fff4ed;
              color: #fa6400;
              border: 2px solid rgba(250, 100, 0, 1);
              border-radius: 4px;
            }
          }

          .van-checkbox {
            width: 40%;
          }

          span {
            flex: 1;
            font-size: 40px;
            color: #666666;
          }

          > div {
            display: flex;
            align-items: center;

            i {
              margin-left: 50px;
              color: #333333;

              &.active {
                @include font-theme("normal");
              }
            }

            > label {
              margin: 0 40px;
              width: 210px;
              height: 80px;
              line-height: 80px;
              text-align: center;
              font-size: 40px;
              color: #fff;
              background: #32c5ff;
              border: 0.5px solid rgba(210, 210, 210, 1);
              box-shadow: 0px 0px 3px 2px rgba(244, 244, 244, 0.5);
              border-radius: 4px;
            }
          }
        }
      }
    }
  }

  .in-box {
    padding-bottom: 100px;
    width: 100%;
    flex: 1;
    overflow: auto;
  }

  .footer {
    position: relative;
    width: 100%;
    min-height: 130px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 30px;

    .line {
      position: absolute;
      top: 0;
      left: -40px;
      right: -40px;
      height: 10px;
      box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
    }

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 80px;
      width: 400px;
      height: 100px;
      border: 1.33px solid rgba(220, 220, 220, 1);
      border-radius: 8px;
      font-size: 40px;
      font-weight: 600;
      background: #3b74db;
      color: #ffffff;
      letter-spacing: 5px;

      &.active {
        opacity: 0.2;
      }
    }

    > div {
      display: flex;
      align-items: start;
      flex: 1;

      label {
        display: flex;
        align-items: center;
        margin: 10px 0;
        margin-right: 26px;
        padding: 0 40px;
        height: 72px;
        font-size: 40px;
        color: #333333;
        font-weight: 600;
      }

      > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        max-height: 200px;
        overflow: auto;
      }

      span {
        display: flex;
        align-items: center;
        margin: 10px 0;
        margin-right: 26px;
        padding: 0 40px;
        height: 72px;
        background: #f5faff;
        border: 1px solid rgba(210, 210, 210, 0.5);
        box-shadow: 0px 0px 3px 2px rgba(244, 244, 244, 0.5);
        border-radius: 5px;
        font-size: 40px;
        color: #333333;
      }
    }
  }

  /deep/.van-empty__image {
    width: 400px !important;
    height: 400px !important;
  }

  /deep/.van-empty__description {
    font-size: 44px;
  }
}

.file-preview {
  overflow: hidden;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
  transition: all 1s;
  z-index: 5000;

  &.active {
    opacity: 0;
    z-index: -1;
  }

  &.zindex {
  }

  .diolag {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 25%;
    overflow: hidden;
    font-size: 0.32rem;
    background-color: #fff;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.27);
    border-radius: 16px;
    z-index: 1001;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70%;
      font-size: 40px;
      color: #333;
      text-align: center;
      font-weight: bold;
      letter-spacing: 4px;
    }

    > div {
      display: flex;
      align-items: center;
      flex: 1;
      border-top: 1px solid #e7e7e7;
      position: relative;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        font-size: 40px;
        color: #999999;
        letter-spacing: 2px;

        &:last-child {
          @include font-theme("normal");
        }
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 20px;
        background: #e7e7e7;
      }
    }
  }
}
</style>
