<!-- 发送节点异步--jf -->
<template>
<div v-show="showDialog" class="send-file">
    <van-nav-bar :title="popTitle" left-text="取消" @click-left="cancel">
        <template #right>
            <div class="flex ac" v-if="
            dsf.config.commonFlow &&
            dsf.config.commonFlow.nodeNeedSignBtn &&
            isShowSignBtnBox
          ">
                <van-button type="info" size="mini" v-if="isShowSignBtn" @click="handleSign">签名</van-button>
                <van-button type="info" size="mini" v-else @click="handleSign">取消签名</van-button>
            </div>
        </template>
    </van-nav-bar>
    <div class="_content" v-show="showContent">
        <idealEdit
          ref="idealEdit"
          v-show="formData.allowEditOpinion > 0 && !isShowWriteOpintionBtn"
          class="idealEdit"
          :isShowHandWrite="dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite"
          rows="3"
          @handWrite="openWritePopup"
        ></idealEdit>
        <div class="handleWriteBox" v-if="
                dsf.config.commonFlow &&
                dsf.config.commonFlow.needHandWrite &&
                formData.allowEditOpinion > 0 &&
                !isShowWriteOpintionBtn
            ">
            <div class="writeContent">
                <img v-if="imgUrl" :src="imgUrl" alt="" :style="{ width: dsf.config.commonFlow.opinionImgWidth || '50%' }" />
                <!-- <span v-else>暂无签名</span> -->
            </div>
        </div>
        <div class="_send_who">
            <p class="top_title disfr jsb">
                <span>您即将发给</span>
                <van-tag v-if="nowNodeType == 'redirect'" class="returnBtn" type="primary" size="small" @click="goBackNode()">
                    返回</van-tag>
            </p>
            <div class="_allOptions" v-if="
            dsf.config.commonFlow &&
            dsf.config.commonFlow.nodeDisplayType == 'showAll'
          ">
                <div v-for="(item, inx) in deptAndUsers" :key="inx" :class="{
              '_option _gray': !item.checked,
              _option: true,
            }" @click="checkNode(inx, 'man')">
                    <div class="_top">
                        <div class="title">{{ item.title }}</div>
                        <div class="num" v-if="
                  item.nodeType != '2' &&
                  item.nodeType != '3' &&
                  item.IsAutoSend != '1'
                ">
                            已选人数（{{ getCheckNum(item) }}）
                        </div>
                        <div class="right" v-if="item.IsAutoSend == '1'">
                            <div class="_num">（自动发送节点）</div>
                        </div>
                        <div class="right addbox" v-else>
                            <van-icon @click.stop="showSecPerson(item, inx)" name="plus" class="_head_img" size="16" />
                        </div>
                    </div>
                    <div class="_bottom">
                        <div v-for="(itx, index) in item.secHeadInfo || item.headInfo" :key="index" class="_select" v-if="getClass(itx, item)">
                            <!-- <img :class="{ state: getClass(itx, item), header: true }" :src="getFavicon(itx)" :title="itx.FullDeptName" alt onerror=""/> -->
                            <span class="userImg">{{
                  itx.name.slice(itx.name.length - 2)
                }}</span>
                            <span class="_font elps">{{ itx.name
                  }}<span v-if="itx.Type == 2">({{ itx.DeptName }})</span></span>
                            <van-icon name="cross" @click.stop="checkUser(itx, item, inx ,$event)"></van-icon>
                        </div>
                    </div>
                    <!-- <div v-if="getCheckNum(item) > 16" @click="item.isOpen = !item.isOpen">
                        {{item.isOpen ? '收起' : '展开'}}
                    </div> -->
                </div>
            </div>
            <div class="_options" v-else>
                <div v-for="(item, inx) in deptAndUsers" :key="inx" :class="{
              '_option _gray': !item.checked,
              _option: true,
            }" @click="checkNode(inx, 'man')">
                    <div class="_title">
                        <div class="_fon ds_font4_m">{{ item.title }}</div>
                        <div class="_num" v-if="
                  item.nodeType != '2' &&
                  item.nodeType != '3' &&
                  item.IsAutoSend != '1'
                ">
                            {{ item.checkedUserList.length + "人审核" }}
                        </div>
                    </div>
                    <div class="_righ" v-if="item.IsAutoSend == '1'">
                        <div class="_num">（自动发送节点）</div>
                    </div>
                    <div class="_righ" v-if="
                item.IsAutoSend != '1' &&
                isShowDefaultUser &&
                item.nodeType != '2' &&
                item.nodeType != '3'
              ">
                        <div v-for="(itx, index) in item.secHeadInfo || item.headInfo" :key="index" :class="getIconClass(itx)" @click="checkUser(itx, item, inx ,$event)" v-if="index < 3">
                            <img :class="{ state: itx.checked, header: true }" :src="getFavicon(itx)" :title="itx.FullDeptName" alt :onerror="default_img" />
                            <van-icon v-if="!itx.checked" name="checked" class="noChecked" />
                            <van-icon v-if="itx.checked" name="checked" />
                            <div class="_font ds_font6">
                                {{ itx.name
                  }}<span v-if="itx.Type == 2">({{ itx.DeptName }})</span>
                            </div>
                        </div>
                        <i @click.stop="showSecPerson(item, inx)" class="iconfont iconjiahao addicon" />
                        <!-- <i class="_head_noimg" v-else>&nbsp;</i> -->
                    </div>
                    <div class="_righ" v-if="
                item.IsAutoSend != '1' &&
                !isShowDefaultUser &&
                item.nodeType != '2' &&
                item.nodeType != '3'
              ">
                        <div v-for="(itx, index) in item.secHeadInfo" :key="index" :class="getIconClass(itx)" @click.stop="delUser(itx, item, index)" v-if="index < 3">
                            <img :class="{ state: itx.checked, header: true }" :src="getFavicon(itx)" :title="itx.FullDeptName" alt :onerror="default_img" />
                            <van-icon v-if="!itx.checked" name="checked" class="noChecked" />
                            <van-icon v-if="itx.checked" name="checked" />
                            <div class="_font ds_font6">
                                {{ itx.name
                  }}<span v-if="itx.Type == 2">({{ itx.DeptName }})</span>
                            </div>
                        </div>
                        <i @click.stop="showSecPerson(item, inx)" class="iconfont iconjiahao addicon" />
                    </div>
                    <van-icon @click="showSelect" name="arrow" size="20" v-if="item.nodeType == '3'" />
                </div>
            </div>
            <div class="_check" style="display: none">
                <!-- <span class="_circle"></span> -->
                <van-checkbox v-model="checked"></van-checkbox>
                <span class="ds_font6" @click="checked = !checked">发送时钉</span>
            </div>
        </div>
        <p v-if="isShowSmsBox" class="top_title disfr jsb">
            <span>提醒方式</span>
        </p>
        <div v-if="isShowSmsBox" class="sms-container">
            <van-checkbox-group v-model="smsResult" ref="checkboxGroup" direction="horizontal">
                <!-- <div class="diaItem" v-for="(item, index) in smsMethodRange" :key="index"> -->
                <van-checkbox v-for="(item, index) in smsMethodRange" :key="index" :name="item.value" icon-size="0.28rem">{{ item.text }}
                </van-checkbox>
                <!-- </div> -->
            </van-checkbox-group>
            <!-- <van-checkbox v-model="isOpenSms">短信提醒</van-checkbox> -->
            <van-field v-model="smsContent" rows="2" autosize type="textarea" placeholder="请输入短信提醒内容" />
        </div>
        <div class="_footer">
            <debounce-click v-if="formData.allowEditOpinion > 0 && !isShowWriteOpintionBtn">
                <van-button type="default" class="_btn _no_send" @click="saveOpinion({}, false)">{{ cancalName }}
                </van-button>
            </debounce-click>
            <debounce-click>
                <van-button type="theme" class="_btn _send" @click="sendFileFlow()">{{
            submitName
          }}</van-button>
            </debounce-click>
        </div>
    </div>
    <van-popup :close-on-click-overlay="false" v-model="showSelect" get-container="#app" :style="{ height: '100%' }" position="bottom">
        <secPerson ref="secPerson" v-if="showSelect" :Multiplayer="Multiplayer" :selectPersons="selectPersons" :checkData="checkData" :LineNodeData="LineNodeData" @cancePerson="showSelect = false" :response="Response"  @secOk="secOk">
        </secPerson>
    </van-popup>

    <van-popup v-if="getHW_Type == 'self'" v-model="showWrite" get-container="#app" position="bottom" round>
        <hw :formData="formData" @closeWritePopup="closeWritePopup"></hw>
    </van-popup>

    <div v-show="getHW_Type == 'jg' && showWrite">
        <hwJG ref="HWJG" :hwtype="getHW_Type" :formData="formData" :formMeta="formMeta" @closeWritePopup="closeWritePopup"></hwJG>
    </div>
</div>
</template>

<script>
import {
    Dialog
} from "vant";
import enclosureItem from "@/components/enclosure/EnclosureItem";
import EnclosurePre from "./../enclosure/EnclosurePre";
import {
    slider
} from "../../assets/styles/schedule.scss";
import secPerson from "@/components/todoFile/secPersonAsync";
import idealEdit from "@/components/todoFile/idealEdit";
import DebounceClick from "@/components/common/debounceClick.jsx";
import hw from "@/components/common/OpinionHandWrite";
import hwJG from "@/components/common/OpinionHandWriteJG";
export default {
    name: "sendFileAsync",
    components: {
        enclosureItem,
        EnclosurePre,
        secPerson,
        DebounceClick,
        hw,
        hwJG,
        idealEdit,
    },
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        formMeta: {
            type: Object,
            default: () => {
                return {};
            },
        },
        formParams: {
            type: Object,
            default: () => {
                return {};
            },
        },
        currentOpintion: {
            type: String,
            default: null,
        },
        sendFileOpintion: {
            type: String,
            default: null
        },
        isShowWriteOpintionBtn: {
            type: Boolean,
            default: false,
        },
        sendParameters: {
            type: Object,
            default: () => {
                return {};
            },
        },
        currentAction:{
            type:String,
            default:""
        }
    },
    data() {
        return {
            popTitle: "发送",
            cancalName: "保存",
            submitName: "发送",
            checked: false,
            showDialog: false,
            deptAndUsers: [],
            defaultIcon: require("../../assets/imgs/workflow/icon_institution_level_two.png"),
            tags: ["已阅。", "同意。", "阅。"],
            value: dsf.config.setting["SYS-MOBILE-FORM-0009"] ?
                dsf.config.setting["SYS-MOBILE-FORM-0009"] : "",
            fileUrl: "", // 预览文件的链接
            checkedUserList: [], //选中人员的数组
            checkedNodeIndex: -1, //选中的节点
            Response: {},
            node_list: [],
            filelistArr: [],
            nowNodeType: "normal",
            nodeIsyu: false, //是否是与节点
            lineNum: 0, //全部环节数
            default_img: 'this.src="' + require("../../assets/imgs/defaultUser.png") + '"',
            showSelect: false,
            selectPersons: [],
            selectIndex: null,
            Multiplayer: null,
            lineData: null,
            imgUrl: "",
            showWrite: false,
            isShowSignBtn: false,
            errorMessage: "",
            isShowSmsBox: false, //是否显示短信提醒盒子
            // isOpenSms: false, //是否开启短信提醒
            smsContent: "", //短信内容
            showMore: false,
            havetoHandWrite: dsf.config.setting["SYS-MOBILE-FORM-0011"] || "-1", //手写签批必签
            showContent: false,
            smsResult: [],
            smsMethodRange: [{
                // 发送提醒方式，后台更新前默认只有短信提醒，后台更新后根据接口getFlowNode返回的smsMethodRange
                text: "短信提醒",
                value: 1,
            }, ],
            deptNoUserData: [],
            LineNodeData: [],
            AgainClickArr: [],   // 每个节点的选中状态，1为选中，2为未选中
            checkData: [],
            showIdeal: false,
            lineIds: "",
            mj:0,
            isSecret:0
        };
    },
    computed: {
        tempTags() {
            return this.showMore ? this.tags : this.tags.slice(0, 2);
        },
        isShowDefaultUser() {
            return !(dsf.config.commonFlow.sendNeedDefaultUser == false);
        },
        getHW_Type() {
            return dsf.config.setting.hasOwnProperty("SYS-MOBILE-FORM-0003") ?
                dsf.config.setting["SYS-MOBILE-FORM-0003"] || "self" :
                "self";
        },
    },
    watch: {
        showDialog(nv, ov) {
            if (nv) {
                this.imgUrl = "";
                // this.value = "";
                //页面加载流程节点数据
                this.getFlowNodes();
                if (dsf.config.commonFlow.isDefaultShowOpinition) {
                    this.getDefaultOpinition();
                }
                //如果填写了意见，但是没有保存点击取消，意见会临时存在commonform里面，再次打开的时候会再重新渲染到页面
                this.$nextTick(()=>{
                    if (this.sendFileOpintion&&this.sendFileOpintion.length&&this.$refs.idealEdit) {
                        this.$refs.idealEdit.value = this.sendFileOpintion;
                    }
                })
                //this.getfileList();//暂时发现该接口没有用到 暂时注释，2021年11月16日14:52:12   @ly
            }
        },
        //此处不知道为什么要监控lineNum，改变时就调用checkNode，改变就调用会影响我默认选中的节点，暂时注释 2021年11月26日21:10:41 @ly
        // lineNum(nv) {
        //     if (nv == 0) {
        //         dsf.layer.closeLoading(this._loading);
        //         this.checkNode(0, "auto");
        //     }
        // },

        currentOpintion: {
            handler(nv, ov) {
                if (nv && this.$refs.idealEdit) {
                    this.$refs.idealEdit.value = nv;
                }
            },
            immediate: true,
        },

        // showDialog(val) {
        //   if (val) {
        //     console.log(val);
        //   } else {
        //     this.removeListenBack();
        //   }
        // },
    },
    created() {
        if (dsf.config.commonFlow.sendBtnSetting) {
            this.cancalName = dsf.config.commonFlow.sendBtnSetting.cancelName;
            // 弹窗标题 和 提交按钮名称取相同值
            this.popTitle = this.submitName = dsf.config.commonFlow.sendBtnSetting.submitName;
        }
    },
    mounted() {
        let self = this;
        this.getSineStatus();
        // if (this.$parent.$parent.showPopUp) {
        //   this.listenBack();
        // }
        // window.addEventListener("beforeunload", (e) => {
        //   console.log("刷新");
        //   self.removeListenBack();
        // });
    },
    destroyed() {
        let self = this;
        // window.removeEventListener("popstate", self.goback, false);
    },
    methods: {
        listenBack() {
            let self = this;
            history.pushState(null, null, document.URL);
            window.addEventListener("popstate", self.goback, false);
        },
        removeListenBack() {
            console.log("移除监听事件");
            let self = this;
            window.removeEventListener("popstate", self.goback, false);
        },
        goback() {
            if (this.showSelect) {
                console.log("关闭了选人");
                this.showSelect = false;
                this.showDialog = true;
                // this.listenBack();
                return;
            }
            if (this.$parent.$parent.showPopUp) {
                console.log("关闭了节点");
                // this.removeListenBack();
                this.$parent.$parent.showPopUp = false;
                return;
            }
        },

        getDefaultOpinition() {
            dsf.http
                .post("fn/mobileFormComment/getH5CurrentComment", {
                    pk: this.formData.info_id || this.formMeta.parameters.pk,
                    pid: this.formData.pid || this.formMeta.parameters.pId,
                    pnid: this.formData.pnid || this.formMeta.parameters.pnId,
                    moduleId: this.formData.moduleId || this.formMeta.parameters.moduleId,
                })
                .then(({
                    data
                }) => {
                    if (data.data.opinion) {
                        this.$refs.idealEdit.value = data.data.opinion;
                        if (data.data.handWritePic) this.imgUrl = dsf.url.getServerUrl(`fn/file/downloadFile?fileName=${data.data.handWritePic}`)
                    }
                });
        },
        getSineStatus() {
            //是否需要自动签名按钮
            if (!dsf.config.commonFlow || !dsf.config.commonFlow.nodeNeedSignBtn)
                return;
            dsf.http
                .post("fn/opinionSignCheck/mobileControlCheck", {
                    todoId: this.formData.todoId || this.formParams.todoId,
                    nodeName: this.formData.nodeName || this.formMeta.parameters.nodeName,
                    pk: this.formData.info_id || this.formParams.pk,
                })
                .then(({
                    data
                }) => {
                    if (data.data.checkVal) {
                        this.isShowSignBtnBox = true;
                        this.isShowSignBtn = data.data.checkVal == 1 ? true : false;
                    }
                })
                .catch((err) => {
                    console.log("mobileControlCheck-err", err);
                    dsf.layer.toast("获取签名状态失败");
                });
        },
        handleSign() {
            dsf.http
                .post("fn/opinionSignCheck/todoUpdSign", {
                    pid: this.formData.pid,
                    pnid: this.formData.pnid,
                    isSign: this.isShowSignBtn ? 1 : 0,
                    pk: this.formData.info_id,
                })
                .then(({
                    data
                }) => {
                    dsf.layer.toast(data.message);
                    this.isShowSignBtn = !this.isShowSignBtn;
                })
                .catch((err) => {
                    console.log("todoUpdSign-err", err);
                    dsf.layer.toast("操作失败");
                });
        },
        openWritePopup() {
            //打开手写弹框
            this.showWrite = true;
            if (this.getHW_Type == "jg") {
                this.$refs.HWJG.buttonHWClick();
            }
        },
        delHandWrite() { // 清除手写签批
            dsf.http.post(`fn/mobileHandWritingData/delete?pnid=${this.formData.pnid}&pid=${this.formData.pid}`).then(res => {
                if (res.data.result) {
                    this.imgUrl = ''
                    dsf.layer.toast('清除成功')
                }
            })
        },
        closeWritePopup(imgdata) {
            //关闭手写弹框
            debugger
            this.showWrite = false;
            if (imgdata) {
                this.imgUrl = imgdata;
            }
        },
        initCheckUser() {
            //发送选人初始化时默认选中配置的人员
            let self = this;
            // this.checkedUserList = [];
            if (self.deptAndUsers && self.deptAndUsers.length > 0) {
                try {
                    self.deptAndUsers.forEach((nodeUser) => {
                        if (nodeUser.IsAutoSend == "1") return false;
                        if (!nodeUser.checked) return false;
                        try {
                            nodeUser.headInfo.forEach((item, index) => {
                                if (item.Selected == "1") {
                                    this.$set(item, "checked", true);
                                    nodeUser.checkedUserList.push(item);
                                    if (nodeUser.Multiplayer == 0) {
                                        throw new Error();
                                    }
                                }
                            });
                        } catch (e) {
                            console.log("跳出循环", e);
                        }
                    });
                } catch (error) {
                    console.log("跳出循环", error);
                }
            }
        },
        secOk(arr) {
            console.log("deptAndUsers", this.deptAndUsers);
            let self = this;
            var nodeUser = this.deptAndUsers[this.selectIndex];
            let secHeadInfo = [];
            if (arr) {
                //所有人员选中状态初始化false，等待真正选择的人进行重置它的选择状态 checkUser  2022年1月21日01:47:48 @ly
                // nodeUser.headInfo.forEach((item, index) => {
                //   item.checked = false;
                // });
                // nodeUser.headInfo.forEach((item, index) => {
                //     if (item.Type == "2") {
                //         if (arr.findIndex((ar) => item.id == ar.id && ar.DeptID == item.DeptID && ar.RoleID == item.RoleID) > -1) {
                //             secHeadInfo.push(item);
                //    selectIndexarr         this.checkUser(item, nodeUser);
                //         }
                //     } else {
                //         if (arr.findIndex((ar) => item.id == ar.id && ar.DeptID == item.DeptID) > -1) {
                //             secHeadInfo.push(item);
                //             this.checkUser(item, nodeUser);
                //         }
                //     }
                // });

                // 以上代码循环选人树进行比对不会按照选择顺序传入接口，导致流程串行模式失效
                // 当从选人树确定时返回所有选中节点，需将选中数组置空，重新循环选中节点
                nodeUser.checkedUserList = [];
                arr.forEach((item, index) => {
                    item.checked = false;
                    secHeadInfo.push(item);
                    this.checkUser(item, nodeUser);
                });

                this.deptAndUsers[this.selectIndex].secHeadInfo = secHeadInfo;
            }
        },
        async showSecPerson(data, index) {
            console.log(data,this.lineData)
            // 直接点击+切换节点时，先执行切换节点操作，解决之前节点选人未清除
            if (index != this.selectIndex) this.checkNode(index, "man", true);
            /*
                  此处应该用node_list
                  因为在加载时  node_list与lineData相同，但是当有跳转节点时lineData与node_list就不一致了，
                  因为node_list被替换成了需要跳转后的节点，所以这里获取数据时要改成node_list
                  @ly  2021年12月22日  bugfree 82060 【横琴管委会协同办公管理平台】新版移动办公跳转节点无法多选bug
                  */
            var self = this;
            let secTree;
            this.LineNodeData = this.lineData[data.originalIndex];
            let obj = {
                sendRequestID: self.Response.SendRequestID,
                lineIDs: data.lineID || "",
                // lineIDs: data.lineID || "",
            };
            await dsf.http
                .post("/fn/mobileFlow/getFlowNodeUserByNode", obj)
                .then(function (result) {
                    secTree = JSON.parse(
                        JSON.stringify(result.data.data[0].SendRangeTree.Node)
                    );
                    if (!Array.isArray(secTree)) {
                        secTree = [secTree];
                    }
                    if (secTree.length > 0) {
                        secTree.forEach((item) => {
                            item.lineAllData = {
                                SendRequestID: self.Response.SendRequestID,
                                LineID: result.data.data[0].LineID,
                                NodeID: result.data.data[0].NodeID,
                                RangeOtherUser: result.data.data[0].RangeOtherUser,
                                RangeRule: result.data.data[0].RangeRule,
                            };
                            if (item.Node) {
                                if (!Array.isArray(item.Node)) {
                                    item.Node = [item.Node];
                                }

                                item.Node.forEach((ele) => {
                                    ele.lineAllData = {
                                        SendRequestID: self.Response.SendRequestID,
                                        LineID: result.data.data[0].LineID,
                                        NodeID: result.data.data[0].NodeID,
                                        RangeOtherUser: result.data.data[0].RangeOtherUser,
                                        RangeRule: result.data.data[0].RangeRule,
                                    };
                                });
                            }
                        });
                    }
                });
            let allData = {
                attrs: {
                    noselect: true,
                },
                id: this.lineData[data.originalIndex].LineID,
                isopen: false,
                checked: false,
                showName: this.lineData[data.originalIndex].ShowName,
            };
            this.mapTree(secTree, data.checkedUserList);
            if (Array.isArray(secTree)) {
                allData.children = secTree;
            } else {
                allData.children = [secTree];
            }
            // if (Array.isArray(self.deptNoUserData)) {
            //   allData.children = self.deptNoUserData;
            // } else {
            //   allData.children = [self.deptNoUserData];
            // }
            console.log("allData", allData);
            this.selectPersons = allData.children;
            this.checkData = data.checkedUserList;
            //   if (Array.isArray(secTree)) {
            //         secTree.forEach((ele) => {
            //           ele.children = ele.Node;
            //         });
            //         self.selectPersons = secTree;
            //       } else {
            //         secTree.children = secTree.Node;
            //         self.selectPersons = [secTree];
            //       }
            this.Multiplayer = data.Multiplayer > 0 ? true : false;
            // data.headInfo.forEach((item, index) => {
            //   item.showName = item.UserName;
            //   item.attrs = {};
            //   item.children = [];
            // });
            this.selectIndex = index;
            this.showSelect = true;
        },
        getDefaultCheckTreeNode(item, checkedUserList) {
            // let checkedUserList = this.checkedUserList;
            let result = false;
            if (item.Type == "2") {
                if (
                    checkedUserList.findIndex(
                        (itx) =>
                        itx.id == item.id &&
                        itx.DeptID == item.DeptID &&
                        itx.RoleID == item.RoleID
                    ) > -1
                ) {
                    result = true;
                }
            } else {
                if (
                    checkedUserList.findIndex(
                        (itx) => itx.id == item.id && itx.DeptID == item.DeptID
                    ) > -1
                ) {
                    result = true;
                }
            }
            return result;
            // console.log("item",item);
            // console.log("this.checkedUserList",this.checkedUserList);
            // return false;
        },
        mapTree(data, checkedUserList) {
            if (data instanceof Array) {
                data.forEach((item) => {
                    //item.checked = false;
                    item.checked = this.getDefaultCheckTreeNode(item, checkedUserList);
                    item.showName = item.name;
                    item.attrs = {
                        noselect: true,
                    };
                    if (item.Node) {
                        if (item.Node instanceof Array) {
                            this.mapTree(item.Node, checkedUserList);
                            this.$set(item, "isopen", false);
                            item.children = item.Node;
                        } else {
                            this.mapTree(item.Node, checkedUserList);
                            this.$set(item, "isopen", false);
                            item.children = [item.Node];
                        }
                    } else {
                        if (item.Type != '1'&&item.Type != '2') {
                            item.attrs = {
                                noselect: true,
                            };
                        }else{
                            item.attrs = {
                                noselect: false,
                            };
                        }
                        
                        item.children = [];
                    }
                    //console.log("item",item);
                });
            } else {
                
                //data.checked = false;
                data.checked = this.getDefaultCheckTreeNode(data, checkedUserList);
                data.showName = data.name;
                data.attrs = {
                    //noselect: false,
                    noselect: true, //heshen 此处应该默认为true 第一个部门节点上不显示checkbox,
                };
                if (data.Node) {
                    if (data.Node instanceof Array) {
                        this.mapTree(data.Node, checkedUserList);
                        this.$set(data, "isopen", false);
                        data.children = data.Node;
                    } else {
                        this.mapTree(data.Node, checkedUserList);
                        this.$set(data, "isopen", false);
                        data.children = [data.Node];
                    }
                } else {
                    if (data.Type != '1'&&data.Type != '2') {
                        data.attrs = {
                                noselect: true,
                            };
                        }else{
                            data.attrs = {
                                noselect: false,
                            };
                        }
                    data.children = [];
                }
                // console.log("data", data);
            }
        },
        cancel() {
            this.showDialog = false;
            this.showContent = false;
            this.selectIndex = null;
            let temp=this.$refs.idealEdit?this.trimTip(this.$refs.idealEdit.value):""
            this.$emit("close",temp);
            if (this.$refs.idealEdit) {
                this.$refs.idealEdit.value=""
            }
        },
        show(from) {
            if (from == "isList" && this.$refs.idealEdit) {
                this.$refs.idealEdit.value = "";
            }
            this.showDialog = true;
        },
        deleteUser(index, node) {
            node.headInfo.splice(index, 1);
        },
        getFavicon(user) {
            if (user.Photo) {
                return dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`);
            } else {
                return require("../../assets/imgs/defaultUser.png")
            }
        },
        //文件列表
        getfileList() {
            //console.error("文件列表");
            var self = this;
            let params = {
                info_id: this.formData.id, // 文件id
                infoId: this.formData.id, // 文件id
                moduleId: this.formData.moduleId, // 模块id
                nodeId: "", // 流程节点id
                start: 1, // 开始页码
                limit: 100, // 每页条数
            };
            let loginToken = dsf.util.loadSessionStore("loginToken");
            this.filelistArr = [];
            dsf.http
                .post("/fn/mobileAttachment/getFormAttachment", params)
                .then(function (result) {
                    if (result && result.data && result.data.rows) {
                        var timestamp = new Date().getTime();
                        result.data.rows.forEach((item) => {
                            let arr = [];
                            if (item.document) {
                                item.document.forEach(
                                    ({
                                        id,
                                        infoId,
                                        title,
                                        type,
                                        moduleId,
                                        showFileSize,
                                        isHandwrite,
                                    }) => {
                                        let obj = {
                                            id,
                                            title,
                                            size: showFileSize || "",
                                            url: dsf.url.openOffice(
                                                encodeURIComponent(
                                                    dsf.url.getServerUrl(
                                                        `fn/file/download?infoId=${infoId}&fileId=${id}&fileName=${title}&nrType=${type}&moduleId=${moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${title}`
                                                    )
                                                )
                                            ),
                                            infoId,
                                            moduleId,
                                            isHandwrite,
                                        };
                                        arr.push(obj);
                                    }
                                );
                                item.file = arr;
                            } else {
                                item.file = [];
                            }
                            if ((item.file && item.file.length) || item.canEdit > 0) {
                                item.show = true;
                            } else {
                                item.show = false;
                            }
                        });
                        self.filelistArr = result.data.rows;
                    }
                });
        },
        checkNextDb(callback) {
            let param = this.$store.state.searchParam
            param.dataIndex = this.$route.query.dataIndex || 0
            console.log(param)

            dsf.http
                .post("/fn/mobileToDo/getToDoByIndex", param)
                .then(function (result) {
                    console.log(result.data.data);
                    if (result && result.data && result.data.data) {
                        let item = result.data.data
                        callback({
                            path: `/commonForm/${item.moduleId}/${item.info_id}/1?type=gw&todoId=${item.todoId}`,
                            hasData: true
                        })

                    } else {
                        callback({
                            hasData: false
                        })
                    }
                });
        },
        goBackList() {
            setTimeout(() => {
                this.$emit("close");
                this.$emit("change", this.lineIds);
                this.$emit("golist");
            }, 500);
        },
        sendAfterAction(lineIds) {
            this.lineIds = lineIds || ""
            let self = this;
            if (this.$refs.idealEdit) {
                this.$refs.idealEdit.value = "";
            }

            self.closePop();
            if(this.currentAction == "copyOpinion"  || this.currentAction == "xform.copySend"){
                // this.$router.go(0)
                this.$emit("initData")
                return
            }

            let actionType = dsf.util.loadLocalStore("actionType") || "1"
            if (dsf.config.commonForm.showFormSetting && this.$route.name == "commonForm" && this.$route.query.type && this.$route.query.type == "gw") {
                if (actionType == "0" || actionType == "1") {
                    //待办处理完毕之后直接关闭或者返回列表 都是默认返回列表处理
                    self.goBackList()
                } else if (actionType == "2") {
                    //待办处理之后连续处理 直接跳到下一条
                    self.checkNextDb(res => {
                        if (res.hasData) {
                            self.$router.replace({
                                path: res.path
                            });
                            self.$eventBus.refresh(self);
                        } else {
                            self.goBackList()
                        }
                    })
                } else {
                    //如果有下一条就弹出窗口提供选择 是否下一条 或者是关闭返回列表
                    self.checkNextDb(res => {
                        if (res.hasData) {
                            self.curPath = res.path
                            self.$emit("showNext", res.path)
                        } else {
                            self.dsf.layer.toast("文件已办理完毕", true, () => {
                                self.goBackList()
                            });
                        }
                    })
                }
                return
            }

            // 代办表单点击发送后跳转到下一个代办
            if (self.sendParameters.sendToNext == "1") {
                dsf.http
                    .post("/fn/mobileToDoAndRead/getToDoAndReadList2", {
                        limit: 10,
                        _content: "",
                        key: "",
                        page: 1,
                        showTotal: true,
                        fileType: "gw",
                        isFirst: 1,
                        start: 1,
                    })
                    .then(function (result) {
                        console.log(result);
                        if (result && result.data && result.data.datas) {
                            let data = result.data.datas.filter((ele) => {
                                return ele.dataValue.allowMobile != "-1";
                            });
                            if (data.length > 0) {
                                self.$router.replace({
                                    path: `/commonForm/${data[0].dataValue.moduleId}/${data[0].dataValue.info_id}/1?type=gw&todoId=${data[0].dataValue.todoId}`,
                                });
                                self.$eventBus.refresh(self);
                            } else {
                                // 没有下一条待办调回列表
                                setTimeout(() => {
                                    self.$emit("close");
                                    self.$emit("change", lineIds);
                                    self.$emit("golist");
                                }, 500);
                            }
                        }
                    });
            } else {
                // 直接返回列表
                setTimeout(() => {
                    self.$emit("close");
                    self.$emit("change", lineIds);
                    self.$emit("golist");
                }, 500);
            }
        },
        //获取流程节点
        getFlowNodes() {
            this._loading = dsf.layer.loading();
            var self = this;
            var obj = {
                type: this.formData.sendType || this.formData.type || "SR_SEND",
                pid: this.formData.pid,
                pnid: this.formData.pnid,
                wfId: this.formData.flowId,
                infoId: this.formData.info_id || this.formData.infoId,
                bt: this.formData.bt,
                moduleName: this.formData.moduleName,
                moduleId: this.formData.moduleId,
                lazyExpand: true,
                // ,
                // disableAutoSend: 1,//禁止后台自动发送
            };
            if(this.formData.opinionContent){
                obj.opinionContent = this.formData.opinionContent
            }
            //如果要求意见必填，并且没有填写意见，禁止自动发送操作
            if (!this.checkOpinion("notip")) {
                obj.disableAutoSend = 1;
            }

            if (this.formData.opinionRequired > 0) {
                //意见必填时 接口忽略验证意见
                obj.ignoreOpinion = 1;
            }

            if (this.formData.nextLineId) {
                obj.nextLineId = this.formData.nextLineId;
            }
            if (this.formData.direction) {
                obj.direction = this.formData.direction;
            }
            if (this.formData.determineUser) {
                obj.determineUser = this.formData.determineUser;
            }
            if (this.formData.nextNodeId) {
                obj.nextNodeId = this.formData.nextNodeId;
            }
            if (this.formData.endOtherLink != undefined) {
                obj.endOtherLink = this.formData.endOtherLink;
            }
            if (this.formData.isBackTrack != undefined) {
                obj.isBackTrack = this.formData.isBackTrack;
            }
            if (this.formData.intelligenceSend != undefined) {
              obj.intelligenceSend = this.formData.intelligenceSend;
            }
            let postUrl = "/fn/mobileFlow/getFlowNode";
            //如果是意见驱动表单   去掉该参数likeAndBranch
            if (!this.formData.hasControlOpinionTagView) {
                // postUrl += "?likeAndBranch=1";
            }

            this.deptAndUsers = [];
            dsf.http
                .post(postUrl, obj)
                .then(function (result) {
                    // data返回null,弹出错误提示
                    if (!result.data.data) {
                        dsf.layer.toast(result.data.message, undefined, () => {
                            self.closePop();
                        });
                        return;
                    }
                    //likeAndBranch该参数作用：流程返回节点自动返回人员
                    let nextNodeStatus = result.data.data.ResponseObject[0].Status;
                    let nextNode = result.data.data.ResponseObject[0].NextNodes;
                    self.mj = result.data.data.ResponseObject[0].mj;  //当前文件密级
                    self.isSecret = result.data.data.ResponseObject[0].isSecret;  //是否为涉密系统
                    //这个地方的状态获取前三位数，最后一位数可能会变化 2021年6月3日16:49:13  谢总说的。
                    //10000有后续节点，返回直接返送到后续节点的结果
                    //20000出提示  无法发送
                    //30000只有节点没有人（或分支），需要调用获取人员接口
                    //40000有节点有人 （与分支）
                    //50000已完成发送
                    //51000办理完毕
                    //60000  办结
                    //70000    80000   特殊按钮操作，普通发送按钮不会出现这样的情况
                    if (nextNodeStatus.indexOf("2000") > -1) {
                        self.dsf.layer.toast("流程发送出错，请检查配置!", undefined, () => {
                            self.sendAfterAction();
                        });
                        return;
                    } else if (nextNodeStatus.indexOf("6000") > -1) {
                        self.dsf.layer.toast("该文件已办理完毕", true, () => {
                            self.sendAfterAction();
                        });
                        return;
                    } else if (
                        nextNodeStatus.indexOf("1000") > -1 ||
                        nextNodeStatus.indexOf("5000") > -1 ||
                        nextNodeStatus.indexOf("5100") > -1
                    ) {
                        dsf.layer.closeLoading(self._loading);
                        //如果只有一个节点并且是办结节点nodeType=2  提示办结成功，否则要根据返回的节点进行循环处理发送后的提示信息 2022年8月16日15:47:34 @luy
                        if (nextNode.Line.length == 1 && nextNode.Line[0].nodeType == 2) {
                            self.dsf.layer.toast("该文件已办理完毕", true, () => {
                                self.sendAfterAction();
                            });
                        } else if (nextNode.Line.length) {
                            //循环处理该nextNode.Line
                            let sendMessage = "";
                            nextNode.Line.forEach((lineItem) => {
                                if (lineItem.RecipientList && lineItem.RecipientList.Node) {
                                    sendMessage += self.getAutoSendNodeMessage(
                                        lineItem.RecipientList
                                    );
                                }
                                //咨询过谢总，只要RecipientList节点的人员显示，不要SendRangeTree
                                // else if (lineItem.SendRangeTree && lineItem.SendRangeTree.Node) {
                                //     sendMessage += self.getAutoSendNodeMessage(lineItem.SendRangeTree.Node)
                                // }
                            });
                            if (sendMessage.length && !dsf.config.commonForm.sendWithNoTips) {
                                Dialog.alert({
                                    title: "该文件已成功发送至",
                                    message: sendMessage,
                                }).then(() => {
                                    // dialogclosed = true
                                });
                                setTimeout(() => {
                                    Dialog.close();
                                    self.sendAfterAction();
                                }, 3000);
                            } else {
                                self.dsf.layer.toast("该文件已办理完毕", true, () => {
                                    self.sendAfterAction();
                                });
                            }
                        }
                        return;
                    } else if (nextNodeStatus == "90000") {
                        self.dsf.layer.toast(
                            result.data.data.ResponseObject[0].ErrorMessage,
                            undefined,
                            () => {
                                self.sendAfterAction();
                            }
                        );
                        return;
                    }

                    self.$parent.$parent.$refs["sendPop"].$el.style.display = "block";

                    self.showContent = true;
                    self.Response = result.data.data.ResponseObject[0];
                    self.node_list = self.Response.NextNodes.Line;
                    if (self.Response.OutLineType && self.Response.OutLineType == "1") {
                        self.nodeIsyu = true;
                    }
                    self.lineData = self.node_list;
                    // 单节点设置自动发送
                    if (self.lineData.length == 1 && self.lineData[0].IsAutoSend == "1") {
                        // 如果意见必填，则手动将自动发送取消（认为是非自动发送）
                        if (!self.checkOpinion("notip")) {
                            self.lineData[0].IsAutoSend = "-1";
                        } else {
                            self.autoSend(self.lineData[0].LineID);
                            dsf.layer.closeLoading(self._loading);
                            return;
                        }
                    }
                    self.lineData.forEach((cell, index) => {
                        self.lineNum++;
                        //办结节点不要调接口  会导致文件自动办结
                        if (
                            (cell.NodeType == "0" ||
                                cell.NodeType == "1" ||
                                cell.NodeType == "7") &&
                            cell.IsAutoSend != "1"
                        ) {
                            self.getFlowNodeUserByNodeInfo(cell, index);
                            //self.getFlowNodeUsers(cell.LineID);
                        } else {
                            self.lineNum--;
                            //办结节点 或者跳转节点
                            self.deptAndUsers.push({
                                title: cell.ShowName,
                                lineID: cell.LineID,
                                IsAutoSend: cell.IsAutoSend,
                                nodeType: cell.NodeType,
                                num: "0人审批",
                                headInfo: [],
                                isAdd: false,
                                checked: false,
                                Multiplayer: 0, //0 单选 1多选
                                originalIndex: index,
                                checkedUserList: [],
                            });
                            if (self.lineNum == 0) {
                                self.checkNode(0, "auto");
                            }
                            // this.$nextTick(()=>{
                            //   self.lineNum--;
                            // })
                        }
                    });
                    if (result.data.data.isSms != -1) {
                        //-1:不显示提醒
                        self.isShowSmsBox = true;
                        self.smsContent = result.data.data.sms;
                        // self.isOpenSms = dsf.config.commonFlow.defaultSendSms || false;
                        if (result.data.data.smsMethodRange) {
                            // 发送提醒方式，后台更新前默认只有短信提醒，后台更新后根据接口getFlowNode返回的smsMethodRange
                            self.smsMethodRange = result.data.data.smsMethodRange; // 提醒选项
                            self.smsMethodRange.forEach((item) => {
                                // 选项是否默认选中
                                if (item.checked) self.smsResult.push(item.value);
                            });
                        } else {
                            if (dsf.config.commonFlow.defaultSendSms) self.smsResult.push(1); // 后台更新前短信提醒默认选中配置
                        }
                    }

                    self.$nextTick(function () {
                        // let arr = [];
                        // self.lineData.forEach((item, index) => {
                        //     self.deptAndUsers.forEach((itm, inx) => {
                        //         if (
                        //             item.LineID == itm.lineID &&
                        //             arr.filter((it) => it.lineID == itm.lineID).length < 1
                        //         ) {
                        //             arr.push(itm);
                        //         }
                        //     });
                        // });
                        // self.deptAndUsers = arr;
                        self.initCheckUser(); //加载默认选中人员
                        //最后关闭加载层
                        dsf.layer.closeLoading(self._loading);
                    });
                })
                .catch((err) => {
                    console.log(err);
                    dsf.layer.closeLoading(self._loading);
                });
        },
        //同步获取人员
        getFlowNodeUserByNodeInfo(lineInfo, index) {
            let self = this;
            if (lineInfo) {
                let formUsers = [];
                formUsers.push({
                    title: lineInfo.ShowName,
                    num: "0人审批",
                    lineID: lineInfo.LineID,
                    headInfo: [],
                    nodeType: lineInfo.NodeType,
                    isAdd: false,
                    checked: "",
                    Multiplayer: lineInfo.Multiplayer.IsEnabled, //0 单选 1多选
                    originalIndex: index,
                    checkedUserList: [],
                });
                self.deptAndUsers = Array.from(
                    new Set(self.deptAndUsers.concat(formUsers))
                );
                self.lineNum--;
            }
        },
        //获取节点人员
        getFlowNodeUsers(lineID, isAutoSend, index) {
            var self = this;
            let obj = {
                sendRequestID: self.Response.SendRequestID,
                lineIDs: lineID || "",
                pk:this.formData.info_id || this.formMeta.parameters.pk,
                moduleId: this.formData.moduleId,
                flowId: this.formData.flowId,
                nodeId: this.formData.nodeId,
                pId: this.formData.pid,
                pnId: this.formData.pnid
            };
            dsf.http
                .post("/fn/mobileFlow/getFlowNodeUserByNode", obj)
                .then(function (result) {
                    if (result.data.result) {
                        let nextNodeStatus = result.data.data[0].status;
                        let isGo=false;//如果是自动发送并且没有发送成功，需要继续选人发送判断
                        if (isAutoSend) {
                            let nextNodeStatus = result.data.data[0].status;
                            if (
                                nextNodeStatus.indexOf("1000") > -1 ||
                                nextNodeStatus.indexOf("5000") > -1 ||
                                nextNodeStatus.indexOf("5100") > -1
                            ) {
                                let RecipientList = result.data.data[0].RecipientList;
                                let sendNode = result.data.data[0].SendRangeTree.Node;
                                self.deptNoUserData = result.data.data[0].SendRangeTree.Node;
                                if (RecipientList || sendNode) {
                                    // 自动发送的节点提示信息
                                    // self.sendAfterAction();
                                    let sendMessage = "";
                                    if (RecipientList) {
                                        sendMessage = self.getAutoSendNodeMessage(RecipientList);
                                    } else {
                                        sendMessage = self.getAutoSendNodeMessage(sendNode);
                                    }
                                    if (sendMessage.length && !dsf.config.commonForm.sendWithNoTips) {
                                        Dialog.alert({
                                            title: "该文件已成功发送至",
                                            message: sendMessage,
                                        }).then(() => {
                                            // dialogclosed = true
                                            self.sendAfterAction();
                                        });
                                        setTimeout(() => {
                                            Dialog.close();
                                            self.sendAfterAction();
                                        }, 3000);
                                    }
                                } else {
                                    self.dsf.layer.toast("发送成功", true);
                                    self.sendAfterAction();
                                }
                                return;
                            } else if(nextNodeStatus.indexOf("4000")>-1){
                                isGo=true
                            } else {
                                self.dsf.layer.toast("自动发送失败");
                                return;
                            }
                        }

                        result.data.data.forEach((nodeItem, newindex) => {
                            if(isGo){
                                nodeItem.IsAutoSend = "-1";//需要选人发送就改成非自动发送节点
                            }
                            let arr = [];
                            let formUsers = [];
                            let nodeUsers = [];
                            if (nodeItem.NodeType == "1" && nodeItem.IsAutoSend != "1") {
                                let startData = new Array().concat(nodeItem.SendRangeTree.Node);
                                startData.map((i, numi) => {
                                    //节点下人员
                                    nodeUsers = nodeUsers.concat(
                                        Array.from(new Set(self._initUserlist(i, arr)))
                                    );
                                    nodeUsers = Array.from(new Set(nodeUsers));
                                });
                                formUsers.push({
                                    title: nodeItem.ShowName,
                                    num: "0人审批",
                                    headInfo: nodeUsers,
                                    lineID: nodeItem.LineID,
                                    nodeType: nodeItem.NodeType,
                                    isAdd: false,
                                    checked: nodeUsers.filter(
                                            (chkItem) => chkItem.Selected == "1"
                                        ).length ?
                                        true : false,
                                    Multiplayer: nodeItem.Multiplayer.IsEnabled, //0 单选 1多选
                                    originalIndex: newindex,
                                });
                                self.deptAndUsers = Array.from(
                                    new Set(self.deptAndUsers.concat(formUsers))
                                );
                            } else {
                                //办结节点 或者跳转节点
                                self.deptAndUsers.push({
                                    title: nodeItem.ShowName,
                                    lineID: nodeItem.LineID,
                                    IsAutoSend: nodeItem.IsAutoSend,
                                    nodeType: nodeItem.NodeType,
                                    num: "0人审批",
                                    headInfo: [],
                                    isAdd: false,
                                    checked: false,
                                    Multiplayer: 0, //0 单选 1多选
                                    originalIndex: newindex,
                                });
                            }
                        });
                    } else {
                        dsf.layer.toast(result.data.message);
                    }
                });
        },
        //获取所有角色
        // _initRoleList(option, arr){
        // 	if (option.RoleID) {
        // 		arr.push(option);
        // 	}
        // 	return Array.from(new Set(arr));
        // },
        // 获取所有联系人
        _initUserlist(option, arr) {
            if (option.UserID) {
                //节点类型为用户
                arr.push(option);
            } else if (option.RoleID && option.Type == "2") {
                //节点类型为角色
                arr.push(option);
            } else {
                if (option.Node instanceof Array) {
                    option.Node.map((i) => {
                        this._initUserlist(i, arr);
                    });
                } else if (option.Node) {
                    this._initUserlist(option.Node, arr);
                } else {
                    console.log("空部门");
                }
            }
            return Array.from(new Set(arr));
        },
        autoSend(lineId) {
            if (!this.checkOpinion()) {
                return;
            }
            // 手写签批必签
            if (
                dsf.config.commonFlow &&
                dsf.config.commonFlow.needHandWrite &&
                this.formData.allowEditOpinion > 0 &&
                this.havetoHandWrite == 1
            ) {
                if (!this.imgUrl) {
                    dsf.layer.toast("请签名", false);
                    return;
                }
            }
            this.getFlowNodeUsers(lineId, true);
        },
        //发送流程
        sendFlow(info) {
            debugger
            let self = this;
            let arr = [];
            let isBanJie = false;
            self.node_list.map((i) => {
                //解决bug 办结
                if (i.NodeType == "2") {
                    isBanJie = true;
                } else {
                    isBanJie = false;
                }
                info.nodeInfo.forEach((node) => {
                    if (i.ShowName == node.title) {
                        let checkedUser = [];
                        checkedUser = node.checkedUserList;
                        i["RecipientList"] = {};
                        i["RecipientList"]["Node"] = isBanJie ? [] : checkedUser;
                        arr.push(i);
                    }
                });
            });
            arr.forEach((a) => {
                // SendMode=1串行，SendMode=0并行，Multiplayer.SendMode=1串行，Multiplayer.SendMode=0并行
                a["SendMode"] = a.Multiplayer.SendMode;
                a["exInfo"] = "";
                //节点不需要以下2个参数，会造成传输文件过大，后台会自行根据节点信息重新获取
                a["RangeRule"] = {};
                a["SendRangeTree"] = {};
                //补全参数
                /* a["NodeID"] = arr[0]["NodeID"];
                                a["LineName"] = arr[0]["LineName"];
                                a["NodeName"] = arr[0]["NodeName"];
                                a["LineID"] = arr[0]["LineID"]; */
            });
            // 发送
            let obj = {
                ResponseObject: {
                    SendRequestID: self.Response.SendRequestID,
                    SendParams: {
                        isSms: self.smsResult.length ? self.smsResult.join(",") : -1,
                        sms: self.smsResult.length ? self.smsContent : "",
                        Line: arr,
                    },
                },
            };
            let sendData={
                __DATA: JSON.stringify(obj),
                pk:this.formData.info_id || this.formMeta.parameters.pk,
                moduleId: this.formData.moduleId,
                flowId: this.formData.flowId,
                nodeId: this.formData.nodeId,
                pId: this.formData.pid,
                pnId: this.formData.pnid
            }
            // self.dsf.layer.toast("发送成功", true);
            // self.showDialog = false;
            // self.$emit("close");
            // self.$emit("change");
            // self.$emit("golist");
            // return;
            dsf.http
                .post("/fn/mobileFlow/sendFlow", sendData)
                .then(function (result) {
                    dsf.layer.closeLoading(self._loadingSend);
                    if (result.data && result.data.result) {
                        dsf.layer.toast("发送成功", true);
                        let lineIds = arr.map((line) => line.LineID);
                        self.sendAfterAction(lineIds);
                    }else{
                        dsf.layer.toast(result.data.message, false)
                    }
                })
                .catch(() => {
                    dsf.layer.closeLoading(self._loadingSend);
                });
        },
        //保存意见
        saveOpinion(info, isSend = true) {
            debugger
            this._loadingSend = dsf.layer.loading();
            // this.removeListenBack();
            this.$emit("close");
            var self = this;
            if (this.formData.allowEditOpinion > 0 && !this.isShowWriteOpintionBtn) {
                var obj = {
                    __DATA: JSON.stringify({
                        info_id: this.formData.info_id,
                        pid: new String(this.formData.pid),
                        pnid: new String(this.formData.pnid),
                        opinion: info.contentValue || this.$refs.idealEdit.value,
                        type: "g_inbox",
                    }),
                };
                dsf.http
                    .post(
                        `/fn/mobileSaveOpinion/saveOpinion?flowId=${this.formData.flowId}&nodeId=${this.formData.nodeId}&moduleId=${this.formData.moduleId}`,
                        obj
                    )
                    .then(function (result) {
                        if (!result.data.result) {
                            self.dsf.layer.toast(result.data.message, false);
                        } else if (isSend) {
                            self.sendFlow(info);
                        } else {
                            if(info.contentValue || self.sendFileOpintion || self.imgUrl){
                                self.$emit("initData");
                            }
                            dsf.layer.closeLoading(self._loadingSend);
                        }
                    })
                    .catch(() => {
                        dsf.layer.closeLoading(self._loadingSend);
                    });
            } else if (isSend) {
                self.sendFlow(info);
            }
        },
        delUser(user, item, index) {
            var self = this;
            item.secHeadInfo.splice(index, 1);
            if (item.headInfo.length > 0) {
                this.$set(
                    item.headInfo.find((item) => item.UserID == user.UserID),
                    "checked",
                    false
                );
            }

            let nowCheckItem = {};
            if (!this.nodeIsyu) {
                //或节点处理逻辑
                this.deptAndUsers.forEach((item, num) => {
                    if (self.checkedNodeIndex != num) {
                        self.$set(item, "checked", false);
                        if (item.headInfo.length > 0) {
                            item.headInfo.forEach((row) => {
                                self.$set(row, "checked", false);
                            });
                        }

                        item.checkedUserList = [];
                    } else {
                        nowCheckItem = item;
                        self.$set(item, "checked", true);
                        //判断节点下人员数量  只有一个时默认选中
                        if (item.headInfo.length == 1) {
                            self.$set(item.headInfo[0], "checked", true);
                            item.checkedUserList = [item.headInfo[0]];
                        }
                    }
                });
            } else {
                //与节点处理
                this.deptAndUsers.forEach((item, num) => {
                    if (index == num) {
                        nowCheckItem = item;
                        if (!item.checked) {
                            self.$set(item, "checked", true);
                            //判断节点下人员数量  只有一个时默认选中
                            if (item.headInfo.length == 1) {
                                self.$set(item.headInfo[0], "checked", true);
                                item.checkedUserList = [item.headInfo[0]];
                            }
                        } else {
                            self.$set(item, "checked", false);
                            if (item.headInfo.length > 0) {
                                item.headInfo.forEach((row) => {
                                    self.$set(row, "checked", false);
                                });
                            }

                            item.checkedUserList = [];
                        }
                    }
                });
            }
            this.checkedUserList = [];
            this.deptAndUsers.forEach((item) => {
                if (item.headInfo.length > 0) {
                    item.headInfo.forEach((user) => {
                        if (user.checked) {
                            if (user.Type == "2") {
                                if (
                                    this.checkedUserList.findIndex(
                                        (u) =>
                                        u.UserID == user.UserID &&
                                        u.DeptID == user.DeptID &&
                                        u.RoleID == user.RoleID
                                    ) == -1
                                ) {
                                    this.checkedUserList.push(user);
                                }
                            } else {
                                if (
                                    this.checkedUserList.findIndex(
                                        (u) => u.UserID == user.UserID && u.DeptID == user.DeptID
                                    ) == -1
                                ) {
                                    this.checkedUserList.push(user);
                                }
                            }
                        }
                    });
                }
            });
        },
        checkUser(user, item, nodeIndex ,$event) {
             //用于判断涉密系统中是否是大于或者等于当前文件密级
             if (this.isSecret == 1 && user.MJ < this.mj) {
                dsf.layer.toast('高密级文件不能发送给低密级等级人员')
                return
            }

            var self = this;
            if (
                item.checkedUserList &&
                item.checkedUserList.length == 0 &&
                item.secHeadInfo &&
                item.secHeadInfo.length > 0 &&
                $event
            ) {
                item.secHeadInfo.forEach((ele) => {
                    if (ele.checked) {
                        item.checkedUserList.push(ele);
                    }
                });
                this.$set(item, "headInfo", item.secHeadInfo);
            }
            //设置选中节点下标
            if(nodeIndex || nodeIndex==0){
                this.checkedNodeIndex = nodeIndex
            }
            // if (this.nodeIsyu && $event) {
            //     $event.stopPropagation();
            // }
            //此处应该不区分与分支还是或分支   只要有事件函数就阻止冒泡事件 2022年1月21日02:07:50 @Ly
            if ($event) {
                $event.stopPropagation();
            }

            //将节点选中  此处事件冒泡
            //console.log("item.checked",item.checked)
            if (!item.checked) {
                this.deptAndUsers.forEach((base, num) => {
                    if (base.lineID == item.lineID) {
                        //此处改成线的id，用名字判断会有bug 2022年1月14日11:03:44 @luy
                        self.$set(base, "checked", true);
                        self.checkedNodeIndex = num;
                    } else {
                        if (!this.nodeIsyu) {
                            //非与节点时候需要清空另外节点人员和选中
                            console.log("base", base);
                            if (item.nodeType != "7") {
                                if (base.nodeType != "7") {
                                    self.$set(base, "checked", false);
                                    base.headInfo.forEach((h) => {
                                        self.$set(h, "checked", false);
                                    });
                                    // base.checkedUserList = [];
                                }
                            }
                        }
                    }
                });
            }
            if (
                item.Multiplayer == "0" &&
                item.checkedUserList.length > 0 &&
                (!user.checked || typeof user.checked == "undefined")
            ) {
                //单选
                // item.headInfo.forEach((u) => {
                //   this.$set(u, "checked", false);
                // });
                item.checkedUserList = [];
            }
            this.$set(user, "checked", !user.checked);
            if (user.checked) {
                if (user.Type == "2") {
                    //按部门+角色发送
                    if (
                        self.checkedUserList.length == 0 ||
                        self.checkedUserList.findIndex((u) => {
                            return (
                                u.UserID == user.UserID &&
                                u.RoleID == user.RoleID &&
                                u.DeptID == user.DeptID
                            );
                        }) == -1
                    ) {
                        item.checkedUserList.push(user);
                    }
                } else if (
                    !item.checkedUserList.find(
                        (u) => u.UserID == user.UserID && u.DeptID == user.DeptID
                    )
                )
                    item.checkedUserList.push(user);
            } else {
                let idx = item.checkedUserList.findIndex(
                    (u) => u.UserID == user.UserID && u.DeptID == user.DeptID
                );
                item.checkedUserList.splice(idx, 1);
            }
            // this.checkedUserList = [];
            // this.deptAndUsers.forEach((item) => {
            //     item.headInfo.forEach((user) => {
            //         if (user.checked) {
            //             if (user.Type == "2") {
            //                 //按部门+角色发送
            //                 if (self.checkedUserList.length == 0 || self.checkedUserList.findIndex((u) => {
            //                         return u.UserID == user.UserID && u.RoleID == user.RoleID && u.DeptID == user.DeptID;
            //                     }) == -1) {
            //                     self.checkedUserList.push(user);
            //                 }
            //             } else {
            //                 if (self.checkedUserList.findIndex((u) => u.UserID == user.UserID && u.DeptID == user.DeptID) == -1) {
            //                     self.checkedUserList.push(user);
            //                 }
            //             }
            //         }
            //     });
            // });
        },
        //计算数量
        getCheckNum(item) {
            let result = 0;
            if (!item.checked) {
                return result;
            }
            if (item.headInfo.length > 0) {
                item.headInfo.forEach((cell) => {
                    if (cell.checked) {
                        result++;
                    }
                });
            }

            //console.log("calc");
            return result;
        },
        //判断样式
        getClass(item, parent) {
            if (!parent.checked) {
                return false;
            }
            let self = this;
            //console.log("time");
            let result = false;
            for (let i = 0; i < parent.checkedUserList.length; i++) {
                if (item.Type == "2") {
                    //按部门+角色发送
                    //console.log("item.id == this.checkedUserList[i].id",item.id == parent.checkedUserList[i].id)
                    console.log(
                        "item.DeptID==this.checkedUserList[i].DeptID",
                        item.DeptID + "," + parent.checkedUserList[i].DeptID
                    );
                    if (
                        item.id == parent.checkedUserList[i].id &&
                        item.DeptID == parent.checkedUserList[i].DeptID &&
                        item.RoleID == parent.checkedUserList[i].RoleID
                    ) {
                        result = true;
                        break;
                    }
                } else {
                    if (
                        item.id == parent.checkedUserList[i].id &&
                        item.DeptID == parent.checkedUserList[i].DeptID
                    ) {
                        result = true;
                        break;
                    }
                }
            }
            return result;
        },
        goBackNode() {
            this.node_list = [];
            this.selectIndex = 0;
            this.deptAndUsers = [];
            this.checkedUserList = [];
            this.nowNodeType = "normal";
            this.nodeIsyu = false;
            this.getFlowNodes();
        },
        getIconClass(itx) {
            if (itx.isHaveIcon) {
                if (itx.judge) {
                    return "_head_img _icon_fault";
                }
                return "_head_img _icon_right";
            }
            return "_head_img";
        },
        async checkNode(index, handleType, params) {
            var self = this;
            self.checkedNodeIndex = index;
            let tempNode = this.deptAndUsers.find((item, itemIndex) => {
                return index == itemIndex;
            });
            if (tempNode && tempNode.IsAutoSend == "1") {
                if (handleType == "man") {
                    self.autoSend(tempNode.lineID);
                }
                return;
            }

            let nowCheckItem = {};
            if (!this.nodeIsyu) {
                //或节点处理逻辑
                if (tempNode.nodeType != "7") {
                    this.deptAndUsers.forEach((item, num) => {
                        // delete item.secHeadInfo;
                        if (index != num) {
                            if (item.nodeType != "7") {
                                self.$set(item, "checked", false);
                                // item.headInfo.forEach((row) => {
                                //   self.$set(row, "checked", false);
                                // });
                                item.checkedUserList = [];
                            }
                        } else {
                            nowCheckItem = item;
                            self.$set(item, "checked", true);
                            //判断节点下人员数量  只有一个时默认选中
                            // if (item.headInfo.length == 1) {
                            //   self.$set(item.headInfo[0], "checked", true);
                            //   item.checkedUserList = [item.headInfo[0]];
                            // }
                        }
                    });
                } else {
                    nowCheckItem = tempNode;
                    self.$set(tempNode, "checked", true);
                    //判断节点下人员数量  只有一个时默认选中
                    // if (tempNode.headInfo.length == 1) {
                    //   self.$set(tempNode.headInfo[0], "checked", true);
                    //   tempNode.checkedUserList = [tempNode.headInfo[0]];
                    // }
                }
            } else {
                //与节点处理
                this.deptAndUsers.forEach((item, num) => {
                    if (index == num) {
                        if (!item.checked) {
                            self.$set(item, "checked", true);
                            //判断节点下人员数量  只有一个时默认选中
                            if (item.headInfo.length == 1) {
                                self.$set(item.headInfo[0], "checked", true);
                                item.checkedUserList = [item.headInfo[0]];
                            }
                        } else {
                            self.$set(item, "checked", false);
                            if (item.headInfo.length > 0) {
                                item.headInfo.forEach((row) => {
                                    self.$set(row, "checked", false);
                                });
                            }

                            item.checkedUserList = [];
                        }
                    }
                });
            }
            if (tempNode.nodeType == "7") {
                if (self.AgainClickArr.length == 0) {
                  self.deptAndUsers.forEach((ele, i) => {
                    self.AgainClickArr.push('2');
                  });
                }
                //抄送节点可取消选中
                if (!params && tempNode.checkedUserList.length > 0 && self.AgainClickArr[index] == 1) {
                    self.$set(tempNode, "checked", false);
                    self.$set(tempNode, "checkedUserList", []);
                    self.selectIndex = null;
                    self.$delete(tempNode, "secHeadInfo");
                }
                // 抄送节点可取消选中，但浅拷贝，无法判断第一次点击还是第二次点击，加参数判断
                if (!params && self.AgainClickArr[index] == 1) {
                    self.$set(tempNode, "checked", false);
                    self.$set(tempNode, "checkedUserList", []);
                    self.AgainClickArr[index] = 2;
                } else {
                    self.$set(tempNode, "checked", true);
                    self.AgainClickArr[index] = 1;
                }
            }
            // 重新选中节点，之前选中的人员重新选中
            if (
                tempNode.checkedUserList &&
                tempNode.checkedUserList.length == 0 &&
                tempNode.secHeadInfo &&
                tempNode.secHeadInfo.length > 0
            ) {
                tempNode.secHeadInfo.forEach((ele) => {
                    if (ele.checked) {
                        tempNode.checkedUserList.push(ele);
                    }
                });
                self.$set(tempNode, "headInfo", tempNode.secHeadInfo);
            }

            // this.checkedUserList = [];
            // this.deptAndUsers.forEach((item) => {
            //     item.headInfo.forEach((user) => {
            //         if (user.checked) {
            //             if (user.Type == "2") {
            //                 if (item.checkedUserList.findIndex((u) => u.RoleID == user.RoleID && u.UserID == user.UserID && u.DeptID == user.DeptID) == -1) {
            //                     item.checkedUserList.push(user);
            //                 }
            //             } else {
            //                 if (item.checkedUserList.findIndex((u) => u.UserID == user.UserID && u.DeptID == user.DeptID) == -1) {
            //                     item.checkedUserList.push(user);
            //                 }
            //             }

            //         }
            //     });
            // });

            if (nowCheckItem.nodeType == "3" && handleType != "auto") {
                //如果是跳转节点，显示后续节点
                let nowCheckItemNextNodeLines = "";
                let nextLine = [];
                this.node_list.forEach((line) => {
                    if (line.LineID == nowCheckItem.lineID) {
                        //此处改成线的id，用名字判断会有bug 2022年1月14日11:03:44 @luy
                        nextLine = line.NextNodes.Line;

                        nextLine.forEach((nextNode, index) => {
                            nowCheckItemNextNodeLines += nextNode.LineID + ",";
                        });

                        if (line.OutLineType && line.OutLineType == "1") {
                            //后续是与节点
                            this.nodeIsyu = true;
                        }
                    }
                });
                await self.getFlowNodeUsers(nowCheckItemNextNodeLines, false, index);

                this.node_list = [];
                this.deptAndUsers = [];
                this.nowNodeType = "redirect";
                this.node_list = nextLine;
                //此处不需要循环调用，已经在上面第五行代码一次性调用完成。2022年1月20日16:54:59 @ly
                // nextLine.forEach((cell, index) => {
                //     //办结节点不要调接口  会导致文件自动办结
                //     if (cell.NodeType == "1" && cell.IsAutoSend != "1") {
                //         self.lineNum++;
                //        // self.getFlowNodeUsers(cell.LineID, false, index);
                //     } else {
                //         //办结节点 或者跳转节点
                //         self.deptAndUsers.push({
                //             title: cell.ShowName,
                //             lineID: cell.LineID,
                //             IsAutoSend: cell.IsAutoSend,
                //             nodeType: cell.NodeType,
                //             num: "0人审批",
                //             headInfo: [],
                //             isAdd: false,
                //             checked: false,
                //             Multiplayer: 0, //0 单选 1多选
                //             originalIndex: index
                //         });
                //     }
                // });
            }
        },
        trimTip(idealEditValue) {
            return idealEditValue.replace(/(^\s*)|(\s*$)/g, ""); // 去除首尾空格
        },
        checkOpinion(notip) {
            if (this.formParams.isSign == 1 || !this.formParams.sendCheck) {
                //如果是签字意见或者意见验证过意见的  直接返回true  验证通过，发送界面不做校验
                return true;
            }
            if (this.isShowWriteOpintionBtn) {
                if (
                    this.currentOpintion.length < 1 &&
                    this.formData.opinionRequired > 0
                ) {
                    if (notip == undefined) {
                        dsf.layer.toast("请填写审批意见", false);
                    }
                    return false;
                }
            } else if (
                this.$refs.idealEdit &&
                !this.trimTip(this.$refs.idealEdit.value).length&&
                this.formData.allowEditOpinion &&
                this.formData.opinionRequired > 0
            ) {
                if (notip == undefined) {
                    dsf.layer.toast("请填写审批意见", false);
                }
                this.$refs.idealEdit.errorMessage = "请填写审批意见";
                return false;
            }
            return true;
        },
        sendFileFlow() {
            if (!this.checkOpinion()) {
                return;
            }
            // 手写签批必签
            if (
                dsf.config.commonFlow &&
                dsf.config.commonFlow.needHandWrite &&
                this.formData.allowEditOpinion > 0 &&
                this.havetoHandWrite == 1
            ) {
                if (!this.imgUrl) {
                    dsf.layer.toast("请签名", false);
                    return;
                }
            }
            let isEnd = false;
            let nodeInfo = [];
            this.deptAndUsers.forEach((boom, index) => {
                if ((boom.nodeType == "2" || boom.IsAutoSend == "1") && boom.checked) {
                    isEnd = true;
                }
                if (boom.checked) {
                    nodeInfo.push(boom);
                }
            });
            if (nodeInfo.length == 0 && !isEnd) {
                self.dsf.layer.toast("未选中发送环节", false);
                return;
            }

            if (nodeInfo.some((item) => item.checkedUserList.length == 0) && !isEnd) {
                self.dsf.layer.toast("未选中人员", false);
                return;
            }

            this.saveOpinion({
                nodeName: this.deptAndUsers[this.checkedNodeIndex]["title"],
                checkedUser: this.checkedUserList,
                contentValue: this.$refs.idealEdit ? this.$refs.idealEdit.value : "",
                nodeInfo: nodeInfo,
            });
        },
        closePop() {
            // this.removeListenBack();
            this.$emit("close");
            this.showDialog = false;
            this.showContent = false;
        },
        getAutoSendNodeMessage(Node) {
            // 获取自动发送节点提示信息，递归
            let message = "";
            let check = function (node) {
                if (!node.Node) {
                    message += `${node.DeptName} ${node.UserName || ""}\n`;
                } else {
                    if (!Array.isArray(node.Node)) {
                        check(node.Node);
                    } else {
                        node.Node.forEach((item) => check(item));
                    }
                }
            };
            check(Node);
            return message;
        },
        idealClick() {
            this.showIdeal = !this.showIdeal;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.van-nav-bar {
    height: 44px;
    @include font-theme("normal");

    .van-nav-bar__title {
        @include font_4;
        color: #000;
    }

    .van-icon-arrow-left {
        color: #000;
        font-weight: 600;
        font-size: 1.5em;
    }
}

::v-deep.van-field {
    .van-cell__value {
        @include font_6;
        color: $fontColor;
    }
}

::v-deep.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
    border: none;
}

.send-file {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #f3f3f3;
    text-align: initial;
    z-index: 999;

    .van-nav-bar {
        border-bottom: 2px solid #f1f2f4;
    }

    * {
        box-sizing: border-box;
    }

    .opinionRequired {
        border: 1px solid #ef8e8e;
    }

    .disfr {
        display: flex;
    }

    .jsb {
        justify-content: space-between;
    }

    .returnBtn {
        margin-right: 15px;
        line-height: 24px;
    }

    ._content {
        height: calc(100% - 44px);
        overflow-y: auto;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 1.66rem;
        .idealEdit {
          margin: 10px;
          background-color: #fff;
        }
        ._file_preview {
            @include background-theme("button_auxiliary_bgcolor");
            margin-bottom: 15px;
            padding: 8px 15px 8px;
            // height: 273px;
            display: flex;
            flex-direction: column;
            max-height: 270px;
            overflow-y: scroll;

            ._sure_pre {
                position: fixed;
            }
        }
        .top_title {
            margin: 10px;
            @include font-theme("normal");
        }

        ._send_who {
            .disableStatus {
                display: none !important;
            }

            ._options {
                ._option {
                    border: 2px solid;
                    @include border-color-theme("normal");
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    @include background-theme("button_auxiliary_bgcolor");
                    padding: 10px;
                    margin: 0 10px 10px;
                    border-radius: 3px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    ._title {
                        width: 100px;
                        display: flex;
                        flex-flow: column;
                        flex-shrink: 0;

                        ._num {
                            margin-top: 5px;
                            font-size: var(--font_size_4);
                            color: $fontColor_sub;
                        }
                    }

                    ._righ {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-end;
                        align-items: flex-start;
                        padding-left: 15px;
                        box-sizing: border-box;

                        i {
                            @include font-theme("normal");
                        }
                      .addicon {
                          font-size: var(--font_size_0);
                          border: 1px dashed;
                          border-radius: 3px;
                          padding: 6px;
                        }
                        ._head_img {
                            display: flex;
                            flex-flow: column;
                            // justify-content: center;
                            align-items: center;
                            max-width: 43px;
                            // margin: 0.24rem 0;
                            margin-right: 10px;
                            position: relative;

                            &:last-child {
                                margin-right: 0;
                            }

                            img {
                                height: 34px;
                                width: 34px;
                                border-radius: 3px;
                                // margin-bottom: 5px;
                            }

                            .van-icon-clear {
                                position: absolute;
                                top: -6px;
                                right: -1px;
                                font-size: var(--font_size_3);
                            }

                            .van-icon-checked {
                                position: absolute;
                                top: -6px;
                                right: -1px;
                                font-size: var(--font_size_3);
                                color: green;
                            }

                            .noChecked {
                                color: #cecece;
                            }
                        }

                        ._icon_fault {
                            position: relative;
                            display: inline-block;

                            // &:after {
                            //   content: "";
                            //   position: absolute;
                            //   top: 0;
                            //   right: 0;
                            //   width: 13px;
                            //   height: 13px;
                            //   background: url("./../../assets/imgs/wait.png");
                            //   background-size: 100% 100%;
                            // }
                        }

                        ._icon_right {
                            position: relative;
                            display: inline-block;

                            // &:after {
                            //   content: "";
                            //   position: absolute;
                            //   top: 0;
                            //   right: 0;
                            //   width: 13px;
                            //   height: 13px;
                            //   background: url("./../../assets/imgs/finish.png");
                            //   background-size: 100% 100%;
                            // }
                        }
                    }
                }

                img.header {
                    opacity: 0.2;

                    &.state {
                        opacity: 1;
                    }
                }

                ._gray {
                    border: none;

                    ._title {
                        ._fon {
                            color: #999;
                        }

                        ._num {
                            color: #999;
                        }
                    }

                    ._righ {
                        i {
                            color: rgba(43, 139, 241, 0.4);
                        }
                        .addicon {
                          font-size: var(--font_size_0);
                          border: 1px dashed;
                          border-radius: 3px;
                          padding: 6px;
                          color: #999;
                        }
                        ._head_noimg {
                            width: 40px;
                        }

                        ._head_img {
                            img {
                                opacity: 0.2;

                                &.state {
                                    opacity: 1;
                                }
                            }

                            ._font {
                                color: #999;
                                text-align: center;
                                width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }

            ._check {
                display: flex;
                margin: 0.3rem;
                align-items: center;

                ._circle {
                    width: 17px;
                    height: 17px;
                    border-radius: 50%;
                    border: 2px solid #cfcfcf;
                    margin-right: 5px;
                }

                .van-icon {
                    width: 16px;
                    height: 16px;
                    font-size: var(--font_size_4);
                    margin-right: 6px;
                }

                span {
                    margin-left: 0.15rem;
                }
            }

            ._allOptions {
                ._option {
                    border: 1px solid;
                    @include border-color-theme("normal");
                    background-color: #fff;
                    padding: 10px 16px;

                    &:not(:last-child) {
                        margin-bottom: 15px;
                    }

                    ._top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .title {
                            padding-right: 10px;
                            font-weight: 600;
                        }

                        .num {
                            @include font-theme("normal");
                            flex: 1;
                        }

                        .right {
                            @include font-theme("normal");
                        }

                        .addbox {
                            padding: 4px 20px;
                            border: 1px solid;
                            border-radius: 30px;
                            @include border-color-theme("normal");
                        }
                    }

                    ._bottom {
                        display: flex;
                        flex-wrap: wrap;
                        margin: 0 -4px;

                        ._select {
                            width: calc(25% - 4px);
                            background-color: #eee;
                            border-radius: 30px;
                            padding: 4px 2px;
                            margin: 4px 2px;
                            font-size: var(--font_size_4);
                            display: flex;
                            align-items: center;

                            img {
                                width: 16px;
                                height: 16px;
                                display: inline-block;
                            }

                            ._font {
                                flex: 1;
                                font-size: 13px;
                            }

                            .userImg {
                                display: inline-block;
                                width: 24px;
                                height: 24px;
                                @include background-theme("normal");
                                border-radius: 50%;
                                font-size: 10px;
                                color: #fff;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                    }
                }

                ._gray {
                    border: none;
                }
            }
        }

        .handleWriteBox {
            padding: 0 15px 15px;
            background: white;
            font-size: var(--font_size_2);
            margin: -10px 10px 10px;

            .writeContent {
                text-align: center;

                img {
                    display: inline-block;
                }
            }

            .writeBtn {
                text-align: right;
                // margin-top: 10px;
            }
        }
    }

    ._footer {
        bottom: 0;
        height: 1.2rem;
        width: 100%;
        position: fixed;
        @include background-theme("button_auxiliary_bgcolor");
        display: flex;
        align-items: center;
        padding: 0 12px;

        ._btn {
            flex: 1;
            border-radius: 3px;

            &:not(:first-child) {
                margin-left: 10px;
            }
        }
    }
}

.esignBtnBox {
    display: flex;

    ::v-deep .van-button {
        flex: 1;
        margin: 10px;
    }
}

.esignBox {
    // padding: 10px 10px 0;

    .esignTitle {
        text-align: center;
    }

    .esignWrap {
        overflow: hidden;
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.09);
    }
}

.sms-container {
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.08);
    border-radius: 3px;

    ::v-deep .van-cell {
        padding: 0;
        margin-top: 10px;
        border: 1px solid #f5f5f5;

        .van-field__body {
            padding: 5px;
        }
    }
}
</style>
