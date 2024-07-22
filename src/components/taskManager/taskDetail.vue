<template>
<div class="taskDetail" :class="isOverdue?'overdueForm':'noOverdueForm'">
    <div class="header" :class="{'active':toTop>=20}" v-if="!isApp">
        <div class="heaer_left">
            <span class="title">任务详情</span>
            <span class="subTitle" v-if="taskForMy">({{taskForMy}})</span>
        </div>
        <div class="heaer_right">
            <van-image v-for="(item,index) in commonButtons" :key="index" @click="doEvent(item.action)" :src="'./static/images/taskManager/'+item.icon+'.png'"></van-image>
        </div>
    </div>
    <div class="header" :class="{'active':toTop>=20}" v-if="isApp">
        <div class="heaer_left">
            <van-icon name="arrow-left" @click="goBack" />
            <span class="title">任务详情</span>
            <span class="subTitle" v-if="taskForMy">({{taskForMy}})</span>
        </div>
        <div class="heaer_right" v-if="commonButtons.length>0">
            <van-image v-for="(item,index) in commonButtons" :key="index" @click="doEvent(item.action)" :src="'./static/images/taskManager/'+item.icon+'.png'" v-show="item.name=='催办'"></van-image>
            <el-dropdown ref="eldropdown" trigger="click">
                <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="padding: 0 !important;">
                    <el-dropdown-item v-for="(item,index) in commonButtons" :key="index" v-show="item.name!='催办'&&item.name!='关闭'">
                        <van-image @click.stop="doEvent(item.action)" :src="'./static/images/taskManager/'+item.icon+'.png'"></van-image>
                        <span @click.stop="doEvent(item.action)">{{item.name}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
    <div class="contains" ref="resListRef" @scroll="resLisScroll">
        <div class="taskTop">
            <div class="mytask">
                <div class="mytask_title">
                    <div>
                        <img :src="`static/images/taskManager/icon${mainInfo['C-TASKMAN-TASK-0005'].value}.png`" alt="" v-if="mainInfo['C-TASKMAN-TASK-0005']">
                        <span>{{mainInfo['C-TASKMAN-TASK-0006']?mainInfo['C-TASKMAN-TASK-0006'].value:''}}</span>
                    </div>
                    <p v-if="isOverdue">逾 期</p>
                </div>
                <div class="mytask_schedule">
                    <span :class="{'mytask_schedule_status':true,'blue':taskStatus == '1','grey':taskStatus == '2','green':taskStatus == '3','red':isOverdue}">{{mainInfo['C-TASKMAN-TASK-0004']?mainInfo['C-TASKMAN-TASK-0004'].text:''}}</span>
                    <van-progress stroke-width="10" :percentage="mainInfo['C-TASKMAN-TASK-0007']?Math.round(mainInfo['C-TASKMAN-TASK-0007'].value):0" :color="taskStatus == '1'?'#1064CD':(taskStatus == '2'?'#C0C2C3':'#14C154')" track-color="#F5F5F5" :show-pivot="false" v-if="!isOverdue" />
                    <van-progress stroke-width="10" :percentage="mainInfo['C-TASKMAN-TASK-0007']?Math.round(mainInfo['C-TASKMAN-TASK-0007'].value):0" color="#EE0A24" track-color="#F5F5F5" :show-pivot="false" v-else />
                    <span :class="{'mytask_schedule_status_text':true,'blue':taskStatus == '1','grey':taskStatus == '2','green':taskStatus == '3','red':isOverdue}">{{mainInfo['C-TASKMAN-TASK-0007'] ? Math.round(mainInfo['C-TASKMAN-TASK-0007'].value) : 0}}%</span>
                </div>
            </div>
            <div class="mybuttons" v-if="mainButtons.length>0">
                <p v-for="(item,index) in mainButtons" :key="index" @click="doEvent(item.action)">
                    <!-- <van-icon name="label" /> -->
                    <van-image :src="'./static/images/taskManager/'+item.icon+'.png'"></van-image>
                    <span class="btn-name">{{item.name}}</span>
                </p>
            </div>
            <div class="formdata">
                <div class="commform">
                    <span class="title">负责人</span>
                    <span class="text">{{mainInfo['C-TASKMAN-TASK-0001']?mainInfo['C-TASKMAN-TASK-0001'].text:''}}</span>
                </div>
                <div class="commform" @click="showCollaborator">
                    <span class="title">协同人</span>
                    <span class="text">{{mainInfo['C-TASKMAN-TASK-0002']?mainInfo['C-TASKMAN-TASK-0002'].text:''}}</span>
                    <van-icon name="arrow" />
                </div>
                <div class="commform">
                    <span class="title">开始时间</span>
                    <span class="text" :class="{'active':showTime}">{{mainInfo['C-TASKMAN-TASK-0009']?mainInfo['C-TASKMAN-TASK-0009'].value:''}}</span>
                </div>
                <div class="commform">
                    <span class="title">结束时间</span>
                    <span class="text" :class="{'active':showTime}">{{mainInfo['C-TASKMAN-TASK-0010']?mainInfo['C-TASKMAN-TASK-0010'].value:''}}</span>
                </div>
                <div class="commform">
                    <span class="title">逾期提醒</span>
                    <span class="text1">{{mainInfo['C-TASKMAN-TASK-0012']?mainInfo['C-TASKMAN-TASK-0012'].text:''}}</span>
                </div>
                <div class="commform" v-if="mainInfo['C-TASKMAN-TASK-0011'] && mainInfo['C-TASKMAN-TASK-0011'].value">
                    <span class="title">任务描述</span>
                    <span class="text active">{{mainInfo['C-TASKMAN-TASK-0011']?mainInfo['C-TASKMAN-TASK-0011'].value:''}}</span>
                </div>
                <div class="subform" v-if="fileList.length>0">
                    <div class="commform" @click="showFile=!showFile">
                        <span class="title">附件({{ fileList.length }})</span>
                        <van-icon name="arrow" :class="{'active':showFile}" />
                    </div>
                </div>
                <div class="subform" v-if="showFile">
                    <div class="commform">
                        <div class="files">
                            <div v-for="(item,index) in fileList" :key="index" @click="openFile(item)">
                                <p>
                                    <van-image :src="'./static/images/fileType/'+item.fileType+'.png'">
                                        <template v-slot:error>
                                            <img :src="'./static/images/fileType/cloud.png'" />
                                        </template>
                                    </van-image>
                                    <span>{{item.fileName}}</span>
                                </p>
                                <van-icon name="back-top" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="subform topborder">
                    <div class="commform" @click="showRemark=!showRemark">
                        <span class="title">我的备注（仅您自己可见）</span>
                        <van-icon name="arrow" :class="{'active':showRemark}" />
                    </div>
                    <div class="remark" v-if="showRemark">
                        <van-field v-model.trim="myProgress.remark" rows="2" autosize type="textarea" show-word-limit @blur="saveRemark"></van-field>
                        <!-- <van-button size="small" type="primary" @click="saveRemark">保存备注</van-button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="taskTab">
            <van-tabs v-model="active" color="#0091FF">
                <van-tab title="推进记录">
                    <recordHistory :recordData="propel"></recordHistory>
                </van-tab>
                <van-tab title="成员进度">
                    <teamRecord :progressData="collaborate"></teamRecord>
                </van-tab>
                <van-tab title="评论">
                    <comment :taskId="taskId" :commentData="commentData" @saveComment="initAttachInfo" :isApp="isApp"></comment>
                </van-tab>
            </van-tabs>
        </div>
    </div>
    <div class="myJinzhan" v-if="showMyProgressBtn" @click="showRecord">
        <p class="myjd">
            <span class="text">我的进展</span>
            <span :class="{'wck':myProgress.progressState == '1','tjz':myProgress.progressState == '2','ykn':myProgress.progressState == '3','ywc':myProgress.progressState == '4','percent':true}">{{myProgress.percentage}}%</span>
        </p>
        <p class="status">
            <span :class="{'wck':myProgress.progressState == '1','tjz':myProgress.progressState == '2','ykn':myProgress.progressState == '3','ywc':myProgress.progressState == '4'}">{{myProgress.progressStateText}}</span>
            <!-- 任务中止或完成后不允许修改个人进展 -->
            <van-icon name="arrow" v-if="taskStatus == '1'" />
        </p>
    </div>
    <!-- PC协同人列表:overlay-style="{backgroundColor: 'rgba(0, 0, 0, 0)'}" :style="{ height: '60%',width:'80%',borderRadius: '6px',boxShadow:'0 0 15px #ccc' }" -->
    <van-popup v-model="showTeamPC" class="teamPcPop" round overlay-class="overlayClass">
        <collaboratorList :taskId="pk" :isApp="isApp"></collaboratorList>
    </van-popup>
    <!-- 移动端协同人列表 -->
    <van-popup v-model="showTeamApp" position="bottom" :style="{ height: '100%'}" :overlay="false">
        <collaboratorList :taskId="pk" :isApp="isApp" @close="closeTeamApp"></collaboratorList>
    </van-popup>
    <!-- 个人进展 -->
    <van-popup v-model="showMyRecord" position="bottom" closeable :overlay-style="{backgroundColor: 'rgba(0, 0, 0, 0)'}" :style="{boxShadow:'0px -2px 1px 0px rgba(0,0,0,0.1)' }">
        <div class="headPop_title">个人进展</div>
        <myRecode :taskId="taskId" :myProgress="myProgress" @updateProgress="updateProgress" :isApp="isApp" v-if="showMyRecord" :userProportion="userProportion"></myRecode>
    </van-popup>
    <!-- 更新状态 -->
    <van-popup v-model="showUpdateStatus" closeable position="bottom" :overlay-style="{backgroundColor: 'rgba(0, 0, 0, 0)'}" :style="{boxShadow:'0px -2px 1px 0px rgba(0,0,0,0.1)' }">
        <div class="headPop_title">更新状态
            <van-icon name="question-o" size="20" color="#999999" @click="showTip = true" />
        </div>
        <updateStatus v-if="showUpdateStatus" :taskId="taskId" :taskStatus="taskStatus" @updateStatus="updateStatus" :isApp="isApp"></updateStatus>
    </van-popup>
    <van-popup round v-model="showTip" class="tipdiog" :overlay="false">
        <div class="tian">
            <div class="pop_header">
                <span></span>
                <van-icon name="cross" @click="showTip=false" />
            </div>
            <div class="contains-box">
                <p class="tit">整体完成</p>
                <p>只有任务的负责人有权限整体完成任务，点击"整体完成"后，任务将被整体标记为完成。如需要编辑或重新开始任务，可操作重启任务。</p>
                <p class="tit">中止</p>
                <p>推进状态为推进中当前个人的中止代表中途暂停任务。如需要编辑或重新开始任务，可操作重启任务。</p>
            </div>
        </div>
    </van-popup>
    <van-popup v-model="showFileReview" position="bottom" :style="{ height: '100%'}" :overlay="false">
        <div class="fileIframe">
            <van-nav-bar title="预览">
                <template #right>
                    <van-icon name="cross" size="14" @click="closeFileDiog" />
                </template>
            </van-nav-bar>
            <div class="iframeContent" v-if="showFileReview">
                <iframe id="iframe" :src="fileUrl" frameborder="0" scrolling="none" width="100%" height="100%"></iframe>
            </div>
        </div>
    </van-popup>
    <iframe style="display:none" id="showOtherFile" :src="otherFileUrl"></iframe>
</div>
</template>

<script>
import Vue from "vue"
import recordHistory from './recordHistory.vue'
import teamRecord from './teamRecord.vue'
import myRecode from './myRecode'
import comment from './comment.vue'
import updateStatus from './updateStatus.vue'
import collaboratorList from './collaboratorList.vue'
import dsf from '../../common'
import $ from 'jquery'
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon
} from 'element-ui'

Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Icon)
import {
    mapState
} from "vuex";
export default {
    name: 'taskDetail',
    components: {
        recordHistory,
        teamRecord,
        myRecode,
        comment,
        updateStatus,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Icon,
        collaboratorList
    },
    data() {
        return {
            user: {},
            showFile: false,
            showRemark: false,
            showMS: false,
            showTime: false,
            active: 0,
            showMyRecord: false,
            showTeamApp: false,
            showTeamPC: false,
            showTip: false,
            xtr: 2,
            recordUpdate: false,
            showUpdateStatus: false,
            percent: 100,
            moduleId: "230103192045EncoYZoaQ9Zee0afJmh",
            pk: this.$route.params.pk,
            taskId: this.$route.params.pk,
            listId: "230105153446TgUC3NjwR3polqywEQp",
            mainInfo: {}, //初始化表单基本信息
            fileList: [],
            propel: [], //推进记录
            collaborate: [], //成员进展
            mainButtons: [], //主要按钮
            commonButtons: [], //次要按钮
            taskStatus: '1', //任务状态值(1:进行中，2:已中止, 3:已完成)
            isOverdue: 0, //任务是否逾期(1 逾期  0 不逾期)
            collaborationList: [], //子表-协同人
            myProgress: {
                remark: '', //我的备注
                percentage: '', //任务进度
                progressState: '', //进展状态（1：未查看，2：推进中，3:有困难，4:已完成）
                progressStateText: ''
            },
            myProgressStatus: '', //（1：未查看，2：推进中，3:有困难，4:已完成）
            taskForMy: '', //（1我负责的）（2我协同的）（3我创建的）
            commentData: [], //评论列表
            groupId: '', //创建群生成的群id。
            taskRelevantPerson: [], //任务所有相关人
            isApp: false, //是否为IM APP
            toTop: 0, //默认滚动高度
            collaboratorTabs: [{
                    tab: '未查看',
                    type: 1,
                    list: []
                },
                {
                    tab: '推进中',
                    type: 2,
                    list: []
                },
                {
                    tab: '有困难',
                    type: 3,
                    list: []
                },
                {
                    tab: '已完成',
                    type: 4,
                    list: []
                }
            ],
            collaboratorList: [], //当前类型协同人列表
            personalPropel: {
                "propulsor": "",
                "progressState": 0,
                "propel": [],
                "percentage": 0,
                "propulsorId": "",
                "progressStateText": ""
            }, //个人推进记录
            showMyProgressBtn: false, //我的进展按钮
            userProportion: 0, //当前人权重占比
            showFileReview: false,
            fileUrl: "",
            isIm: false,
            otherFileUrl: "",
            subStatus: false
        };
    },
    computed: {
        ...mapState({
            iframeHistory: (state) => state.iframeHistory
        })
    },
    watch: {},
    methods: {
        openFile(item) {
            let loginToken = dsf.util.loadSessionStore("loginToken");
            let url = ""
            item.fileName = item.fileName.toLowerCase()
            //如果是PC全部调用下载的接口 移动端判断是不是文档 再判断是否调用

            if (this.isApp && (item.fileName.includes(".doc") || item.fileName.includes(".docx") || item.fileName.includes(".pdf"))) {
                url = dsf.url.getServerUrl(
                    `fn/office/openMobileOffice?fileId=${item.id}&moduleId=${this.moduleId}&x-auth-token=${loginToken}`
                )
                this.fileUrl = url
                this.showFileReview = true
                setTimeout(() => {
                    this.$nextTick(() => {
                        document.getElementById("iframe").contentWindow.location.reload(true);
                    })
                }, 200);
            } else {
                url = dsf.url.getServerUrl(
                    `fn/file/download?fileId=${item.id}&moduleId=${this.moduleId}&fileName=${item.fileName}&x-auth-token=${loginToken}`
                )
                this.otherFileUrl = ""
                document.getElementById("showOtherFile").contentWindow.location.reload(true);
                this.otherFileUrl = url
                setTimeout(() => {
                    this.$nextTick(() => {
                        document.getElementById("showOtherFile").contentWindow.location.reload(true);
                    })
                }, 200);
            }

        },
        closeFileDiog() {
            this.showFileReview = false
            this.fileUrl = ""
        },
        goBack() {
            if (this.isApp && window.native && window.native.isNative()) {
                window.native.back()
                return
            }
            let self = this
            let oldUrl = this.$route.fullPath
            if (this.$route.query.backTo) {
                location.href = this.$route.query.backTo
            } else {
                let count = -1
                let currentHistory = this.iframeHistory[this.$route.fullPath]
                if (currentHistory) {
                    count = currentHistory - history.length //如果是iframe内部跳转的话   两个length肯定不一样，否则是一样的
                    this.$vuex.commit("clearHistory", {
                        url: this.$route.fullPath
                    })
                    count = count < 0 ? count - 1 : -1
                }

                this.$router.go(count);
            }
            //防止IM加载之后导致无法返回的问题
            setTimeout(() => {
                let newUrl = this.$route.fullPath
                console.log(oldUrl, newUrl)
                if (oldUrl == newUrl) {
                    self.$router.go(-1);
                }
            }, 100);
        },
        // 获取表单基本信息
        initMainInfo() {
            let that = this
            dsf.http.get(`/fn/xform/getInfo?moduleId=${this.moduleId}&pk=${this.pk}&listId=${this.listId}&validateByList=1&method=privilege&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                if (res.data.data) {
                    let data = res.data.data;
                    let struct = res.data.struct;
                    that.mainInfo = data.main;
                    that.taskStatus = that.mainInfo['C-TASKMAN-TASK-0004'].value; //任务状态
                    that.isOverdue = new Date(that.mainInfo["C-TASKMAN-TASK-0010"].value).getTime() < new Date().getTime() && (that.taskStatus == '1' || that.taskStatus == '2') ? 1 : 0; //逾期状态
                    that.commonButtons = struct.buttons.commonButtons;
                    that.mainButtons = struct.buttons.mainButtons;

                    if (data.attach && data.attach['attach-1']) {
                        data.attach['attach-1'].forEach(item => {
                            item.fileType = item.fileName.split(".")[item.fileName.split(".").length - 1]
                        })
                        that.fileList = data.attach['attach-1'];
                    }

                    let subform = data.subform; //子表
                    if (subform && subform['230104141614cpP7QzEu7EOo9EVnjCV']) {
                        //协同人表
                        let teamlist = subform['230104141614cpP7QzEu7EOo9EVnjCV'];
                        let sum = 0; //总权重
                        let curPerWeight = 0; //当前协同人权重
                        that.userProportion = 0; //当前协同人权重占比
                        teamlist.forEach(ele => {
                            if (ele['C-TASKINFO-COLLABORATE-0004'] && ele['C-TASKINFO-COLLABORATE-0004'].value) {
                                if (ele['C-TASKINFO-COLLABORATE-0001'] && ele['C-TASKINFO-COLLABORATE-0001'].value && ele['C-TASKINFO-COLLABORATE-0001'].value == that.user.user_id) {
                                    curPerWeight = Number(ele['C-TASKINFO-COLLABORATE-0004'].value);
                                }
                                sum += Number(ele['C-TASKINFO-COLLABORATE-0004'].value);
                            }
                        })
                        that.userProportion = curPerWeight / sum;
                        console.log(that.userProportion)
                    }

                    if (that.mainInfo['C-TASKMAN-TASK-0001'] && that.mainInfo['C-TASKMAN-TASK-0001'].value == that.user.user_id) {
                        that.taskForMy = '我负责的'
                    } else if (that.mainInfo['C-TASKMAN-TASK-0003'] && that.mainInfo['C-TASKMAN-TASK-0003'].value == that.user.user_id) {
                        that.taskForMy = '我创建的'
                    } else if (that.mainInfo['C-TASKMAN-TASK-0002'] && that.mainInfo['C-TASKMAN-TASK-0002'].value) {
                        if (that.mainInfo['C-TASKMAN-TASK-0002'].value.split(',').includes(that.user.user_id)) {
                            that.taskForMy = '我协同的'
                        }
                    }
                    if (that.mainInfo['C-TASKMAN-TASK-0002'] && that.mainInfo['C-TASKMAN-TASK-0002'].value) {
                        if (that.mainInfo['C-TASKMAN-TASK-0002'].value.split(',').includes(that.user.user_id)) {
                            that.showMyProgressBtn = true;
                        }
                    }
                    that.getMyTaskInfo(); //获取我的任务信息

                    // 整合所有任务相关人
                    if (that.mainInfo['C-TASKMAN-TASK-0001'] && that.mainInfo['C-TASKMAN-TASK-0002']) {
                        let userIds = [];
                        let userNames = [];
                        if (that.mainInfo['C-TASKMAN-TASK-0002'].value.split(',').includes(that.mainInfo['C-TASKMAN-TASK-0001'].value)) {
                            //协同人是否包含负责人
                            userIds = that.mainInfo['C-TASKMAN-TASK-0002'].value.split(',');
                            userNames = that.mainInfo['C-TASKMAN-TASK-0002'].text.split(',');
                        } else {
                            userIds = that.mainInfo['C-TASKMAN-TASK-0002'].value.split(',').concat(that.mainInfo['C-TASKMAN-TASK-0001'].value);
                            userNames = that.mainInfo['C-TASKMAN-TASK-0002'].text.split(',').concat(that.mainInfo['C-TASKMAN-TASK-0001'].text);
                        }
                        userIds.forEach((ele, i) => {
                            let obj = {
                                "userId": ele, //用户id
                                "userName": userNames[i], //用户名称
                                "userAvatar": "", //用户头像
                            }
                            that.taskRelevantPerson.push(obj)
                        });
                        console.log(that.taskRelevantPerson);
                    }
                }
            })
        },
        // 获取任务附属信息
        initAttachInfo() {
            let that = this
            dsf.http.get(`/ctrl/taskman/task/getTaskExtends?taskId=${this.taskId}&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                if (res.data.data) {
                    let data = res.data.data;
                    that.propel = data.propel; //推进记录
                    that.collaborate = data.collaborate; //成员进展
                    that.commentData = data.comment; //评论
                }
            })
        },
        // 获取我的任务信息
        async getMyTaskInfo() {
            let that = this
            await dsf.http.get(`/ctrl/taskman/collaborate/getMyTask?taskId=${this.taskId}&timer=` + new Date().getTime()).then(res => {
                console.log(res.data.data)
                if (res && res.data.data) {
                    let data = res.data.data;
                    that.myProgress = res.data.data;
                }
            })
        },
        doEvent(name) {
            this[name]()
            if (this.$refs.eldropdown) {
                this.$refs.eldropdown.hide()
            }
        },
        //个人进展
        ["TaskMan.progress"]() {
            this.showMyRecord = true;
        },
        //更新状态
        ["TaskMan.updateTaskStatus"]() {
            this.showUpdateStatus = true;
        },
        // 立即沟通
        ["TaskMan.chat"]() {
            if (window.top.sendNotePaper) { //如果运行在OA中，mainInfo按钮，调这个方法
                let names = this.mainInfo['C-TASKMAN-TASK-0001'].text
                let values = this.mainInfo['C-TASKMAN-TASK-0001'].value
                if (this.mainInfo['C-TASKMAN-TASK-0002'].value) {
                    names += ',' + this.mainInfo['C-TASKMAN-TASK-0002'].text
                    values += ',' + this.mainInfo['C-TASKMAN-TASK-0002'].value
                }
                window.top.sendNotePaper(values, names);
            } else if (window.native) { //如果运行在IM中，立即沟通按钮，调这个方法
                let postdata = {
                    taskId: this.taskId
                }
                let that = this;
                dsf.http.post(`/ctrl/taskman/chat/create?timer=` + new Date().getTime(), postdata).then(res => {
                    console.log(res)
                    if (res && res.data.type == 'success') {
                        let data = res.data.data;
                        that.groupId = data.groupId;
                        console.log(that.groupId)
                        if (that.groupId) {
                            window.native && window.native.chatTo({
                                "conversationType": "GROUP",
                                "toId": that.groupId,
                                // "toName": "张三",
                                // "messageId": "11111"
                            })
                        }
                    } else {
                        dsf.layer.toast(res.data.message);
                    }
                })
            } else {
                this.$router.push({
                    path: "/TabCommonForm/Note/0/180725205942uc2zjrqnTt5sg7ReWmV",
                    query: {
                        formType: "fileTask",
                        formPk: this.taskId
                    }
                })
            }
        },
        // 任务删除
        ["TaskMan.delete"]() {
            let postdata = {
                taskId: this.taskId,
                isDismissGroup: true, //是否解散群聊
            }
            let that = this;
            let message = '请确认是否要删除本任务？'
            if (window.native) {
                message = '任务删除，群聊将被解散，确认删除吗？'
            }
            dsf.layer.confirm({
                message: message,
                className: 'delDialog',
            }, () => {
                dsf.http.post(`/ctrl/taskman/task/del?timer=` + new Date().getTime(), postdata).then(res => {
                    console.log(res)
                    if (res && res.data.code == '200') {
                        dsf.layer.toast('删除任务成功！');
                        that['TaskMan.close'](); //关闭侧边弹窗 IM
                    } else {
                        dsf.layer.toast('删除任务失败！');
                    }
                })
            }, () => {})

        },
        // 关闭抽屉/侧边弹窗
        ['TaskMan.close']() {
            if (window.location.href.indexOf("taskRuntime=idm") >= 0) {
                if (window.top.closeLastTaskLayer) {
                    window.top.closeLastTaskLayer()
                }
            } else if (window.location.href.indexOf("taskRuntime=layui") >= 0) {
                if (window.top.layer) {
                    var index = top.layer.getFrameIndex(window.name);
                    top.layer && top.layer.close(index);
                }
            } else {
                if (window.native) {
                    window.native.hidePanel()
                } else if (window.top.closeLastTaskLayer) {
                    window.top.closeLastTaskLayer()
                } else if (window.top.layer) {
                    var index = top.layer.getFrameIndex(window.name);
                    top.layer && top.layer.close(index);
                } else {
                    //chrome中关闭
                    this.goBack()
                }
            }

        },
        // 编辑跳转
        ['TaskMan.edit']() {
            this.$router.push({
                name: 'addTask', //新建任务-IM内嵌页面
                params: {
                    title: 'null',
                    pk: this.pk
                }
            });
        },
        // 催办
        ['TaskMan.urge']() {
            let options = {
                title: '新建催办', //可选
                data: {
                    "users": this.taskRelevantPerson,
                }
            }
            console.log(options)
            this.urgePerson(options); //催办
        },
        // 转发
        ['TaskMan.forward']() {
            let that = this;
            let options = {
                title: '转发'
            }
            if (window.native && window.native.showSelectUsers) {
                window.native.showSelectUsers(options, (action, data) => {
                    console.log("转发回调的用户users：", JSON.stringify(data));
                    if (data && data.users && data.users.length > 0) {
                        let ids = ""
                        data.users.forEach(item => {
                            if (ids) {
                                ids += ',' + item.userId
                            } else {
                                ids = item.userId
                            }
                        })
                        dsf.http.post(`/ctrl/taskman/task/forward?timer=` + new Date().getTime(), {
                            taskId: that.pk,
                            toUserIds: ids
                        }).then(res => {
                            console.log(res)
                            if (res && res.data.code == '200') {
                                console.log(res.data.message)
                            } else {
                                console.log(res.data.message);
                            }
                        })
                    }
                })
            } else {
                dsf.layer.toast('未找到转发的事件！');
            }
        },
        // 重启任务
        ['TaskMan.restart']() {
            console.log(this.subStatus)
            if (this.subStatus) {
                return
            }
            this.subStatus = true
            this.$toast.loading({
                message: "提交中...",
                forbidClick: true,
                duration: 0,
                overlay: true,
            });
            let that = this;
            dsf.http.post(`/ctrl/taskman/task/restart?taskId=${that.pk}&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                this.subStatus = false
                if (res && res.data.code == '200') {
                    dsf.layer.toast('任务重启成功！');
                    that.initMainInfo();
                    that.initAttachInfo();
                } else {
                    dsf.layer.toast('任务重启失败！');
                }
            })
        },
        // 更新任务状态
        updateStatus() {
            this.showUpdateStatus = false;
            this.initMainInfo();
            this.initAttachInfo();
            // window.location.reload()
        },
        showCollaborator() {
            if (this.isApp) {
                this.showTeamApp = true;
            } else {
                this.showTeamPC = true;
            }
        },
        // 更新个人进展
        updateProgress() {
            this.showMyRecord = false;
            this.initMainInfo();
            this.initAttachInfo();
            // window.location.reload()
        },
        //催办IM
        urgePerson(options) {
            window.native && window.native.createRemind(options);
        },
        resLisScroll() {
            this.toTop = this.$refs.resListRef.scrollTop;
        },
        //保存备注
        saveRemark() {
            if (!this.myProgress.remark) {
                return
            }
            let that = this;
            dsf.http.post(`/ctrl/taskman/collaborate/saveRemark?timer=` + new Date().getTime(), {
                taskId: that.pk,
                remark: that.myProgress.remark
            }).then(res => {
                if (res && res.data.code == '200') {
                    dsf.layer.toast('保存备注成功！')
                } else {
                    dsf.layer.toast('保存备注失败！')
                }
            })
        },
        closeTeamApp() {
            this.showTeamApp = false;
        },
        showRecord() {
            if (this.taskStatus == '1') {
                this.showMyRecord = true;
            }
        }
    },
    created() {
        this.user = dsf.util.loadSessionStore("user");
        console.log(this.user)
        // $('#appTop').remove();
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            //这里说明是移动端
            this.isApp = true
        } else {
            //这里说明是pc端
            this.isApp = false
        }

        if (navigator.userAgent.indexOf("mobileIM") >= 0) {
            this.isApp = true
            this.isIm = true
        }
    },
    mounted() {
        this.initMainInfo();
        this.initAttachInfo();
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.taskDetail {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .contains {
        width: 100%;
        height: 100vh;
        overflow-y: auto;
        background: #FFF;
        box-sizing: border-box;
        padding-bottom: 50px;

        &::-webkit-scrollbar {
            width: 4px;
            height: 60px;
            background-color: transparent;
            cursor: pointer;
        }

        &::-webkit-scrollbar-thumb {
            height: 60px;
            background-color: #ebebeb;
            border-radius: 2px;
        }

    }

    .header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        box-sizing: border-box;
        padding: 0 20px;
        z-index: 10;

        &.active {
            background-image: linear-gradient(180deg, #D6E9FF, #D6E9FF);
        }

        .heaer_left {
            display: flex;
            align-items: center;

            .van-icon {
                font-size: var(--font_size_3);
                color: #999;
                margin-right: 10px;
                margin-top: 4px;
            }

            .title {
                font-size: var(--font_size_3);
                color: #333;
            }

            .subTitle {
                font-size: var(--font_size_3);
                color: #999;
                margin-left: 10px;
            }
        }

        .heaer_right {
            display: flex;
            align-items: center;

            .van-icon {
                margin-left: 10px;
                font-size: var(--font_size_3);
                color: #666;
            }

            span {
                margin-left: 10px;
                color: #666;
            }

            &>.van-image {
                width: 14px;
                height: 14px;
                margin-left: 15px;
                cursor: pointer;
            }

        }
    }

    .taskTop {

        box-sizing: border-box;
        padding: 50px 20px 0 20px;
        width: 100%;
        border-bottom: 10px solid #F5F5F5;

        .mytask {
            width: 100%;
            height: auto;

            .mytask_title {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                div {
                    display: flex;
                    align-items: center;

                    .van-icon {
                        font-size: var(--font_size_3);
                        color: #0091FF;
                        margin-right: 10px;
                    }

                    span {
                        font-size: var(--font_size_2);
                        color: #333;
                    }

                    img {
                        width: 14px;
                        height: 14px;
                        margin-right: 10px;
                    }
                }

                p {
                    font-size: var(--font_size_4);
                    color: #EE0A24;
                    padding: 3px 5px;
                    background: #FED7D9;
                    flex-shrink: 0;
                }
            }

            .mytask_schedule {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .van-progress {
                    // flex: 1;
                    // margin: 0 10px;
                    width: calc(100% - 90px);
                }

                .mytask_schedule_status {
                    font-size: var(--font_size_4);
                    // color: #0091FF;
                    width: 40px;
                }

                .mytask_schedule_status_text {
                    font-size: var(--font_size_4);
                    // color: #0091FF;
                    width: 30px;
                }

                span.blue {
                    color: #1064CD;
                }

                span.grey {
                    color: #C0C2C3;
                }

                span.green {
                    color: #14C154;
                }

                span.red {
                    color: #EE0A24;
                }
            }
        }

        .mybuttons {
            width: 100%;
            height: 46px;
            background: #FFFFFF;
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.06);
            border-radius: 8px;
            margin-top: 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &>p {
                display: flex;
                align-items: center;
                flex: 1;
                border-right: 1px solid #ebebee;
                justify-content: center;

                &:last-child {
                    border: none;
                }

                .van-icon {
                    font-size: var(--font_size_2);
                    color: #0091FF;
                }

                &>span.icon {
                    font-size: var(--font_size_2);
                    color: #0091FF;
                }

                &>span.btn-name {
                    font-size: var(--font_size_3);
                    color: #333;
                    margin-left: 5px;
                    cursor: pointer;
                }

                .van-image {
                    width: 18px;
                    height: 18px;
                }
            }
        }

        .formdata {
            width: 100%;
            height: auto;
            margin-top: 5px;

            .commform {
                width: 100%;
                min-height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {
                    min-width: 80px;
                    flex-shrink: 0;
                    font-size: var(--font_size_3);
                    color: #999;
                    height: 50px;
                    display: flex;
                    align-items: center;
                }

                .text {
                    flex: 1;
                    font-size: var(--font_size_3);
                    color: #333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 20px;

                    &.active {
                        height: auto;
                        text-overflow: inherit;
                        white-space: normal;
                        margin-top: 15px;
                        margin-bottom: 15px;
                    }
                }

                .text1 {
                    flex: 1;
                    font-size: var(--font_size_3);
                    color: #333;
                    margin-right: 20px;
                }

                .van-icon {
                    font-size: var(--font_size_3);
                    color: #ccc;
                    transform: rotate(0deg);
                    transition: all .2s linear;
                    cursor: pointer;

                    &.active {
                        transform: rotate(90deg);
                        transition: all .2s linear;
                    }
                }
            }

            &>.commform {}

            .subform {
                display: flex;
                flex-direction: column;

                &.topborder {
                    border-top: 1PX solid #e1e1e1;
                }

                .remark {
                    border: 1PX solid #ebebeb;
                    border-radius: 10px;
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    margin-bottom: 15px;

                    .van-button {
                        margin: 0 5px 5px 0;
                    }
                }

                .files {
                    width: 100%;
                    min-height: 40px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;

                    &.active {
                        height: auto;

                        p {
                            border-bottom: 1PX solid #ebebeb;

                            &:last-child {
                                border: none;
                            }
                        }
                    }

                    &>div {
                        width: 100%;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        font-size: var(--font_size_4);
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        flex-shrink: 0;
                        border-bottom: 1PX solid #ebebeb;
                        justify-content: space-between;

                        &:last-child {
                            border: none;
                        }

                        .van-image {
                            width: 12px;
                            height: 14px;
                            margin-right: 10px;
                        }

                        .van-icon {
                            font-size: var(--font_size_4);
                            transform: rotate(180deg);
                            color: #999;
                        }

                        &>span {
                            font-size: var(--font_size_4);
                            color: #333;
                        }
                    }
                }
            }
        }
    }

    .taskTab {
        background: #FFF;
        margin-bottom: 50px;

        ::v-deep .van-tab {
            flex: none;
            margin-left: 20px;
        }
    }

    .myJinzhan {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        box-sizing: border-box;
        border-top: 1PX solid #ebebeb;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFF;
        z-index: 4;

        .myjd {
            display: flex;
            align-items: center;

            &>span {
                line-height: 24px;
            }

            .text {
                font-size: var(--font_size_3);
                color: #333333;
            }

            .percent {
                font-size: var(--font_size_3);
                // color: #239FFF;
                margin-left: 15px;

                &.wck {
                    color: #C0C2C3;
                }

                &.tjz {
                    color: #1064CD;
                }

                &.ykn {
                    color: #EB6A0E;
                }

                &.ywc {
                    color: #25C560;
                }
            }
        }

        .status {
            display: flex;
            align-items: center;

            &>span {
                margin-right: 15px;
                font-size: var(--font_size_3);
                color: #ccc;
                // background: #F0F5FF;
                // border: 1px solid rgba(222, 232, 251, 1);
                border-radius: 4px;
                width: 75px;
                height: 30px;
                font-size: var(--font_size_4);
                // color: #0091FF;
                display: flex;
                align-items: center;
                justify-content: center;

                &.wck {
                    background: #F1F1F1;
                    border: 1px solid rgba(229, 229, 229, 1);
                    color: #999999;
                }

                &.tjz {
                    background: #F0F5FF;
                    border: 1px solid rgba(222, 232, 251, 1);
                    color: #0091FF;
                }

                &.ykn {
                    background: #f3efe9;
                    border: 1px solid rgba(247, 234, 216, 1);
                    color: #EB6A0E;
                }

                &.ywc {
                    background: #F0FFF6;
                    border: 1px solid rgba(216, 247, 229, 1);
                    color: #0DBF4F;
                }
            }

            .van-icon {
                cursor: pointer;
            }
        }
    }

    &.noOverdueForm {
        .header {
            &.active {
                background-image: linear-gradient(180deg, #D6E9FF, #D6E9FF);
            }
        }

        .taskTop {
            background-image: linear-gradient(180deg, #D6E9FF, #FFFFFF);
        }

    }

    &.overdueForm {
        .header {
            &.active {
                background-image: linear-gradient(180deg, #ffdddd, #ffdddd);
            }
        }

        .taskTop {
            background-image: linear-gradient(180deg, #ffdddd, #FFFFFF);
        }
    }

}

.collaboratorlist {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .head {
        height: 50px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: var(--font_size_2);
        color: #333333;
        border-bottom: 1PX solid #ebebeb;
    }

    .users_tab {
        width: 100%;
        height: calc(100% - 50px);
        overflow: hidden;

        .van-tabs {
            // margin-top: 40px;
        }

        .users_list {
            width: 100%;
            height: calc(100% - 80px);
            overflow-y: auto;
            box-sizing: border-box;
            padding: 0 20px;

            &>div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex: 1;
                overflow: hidden;
                margin-top: 20px;

                .van-image {
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                }

                .dept {
                    flex: 1;
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    margin-right: 20px;
                    overflow: hidden;

                    .username {
                        .name {
                            font-size: var(--font_size_3);
                            color: #333333;
                            line-height: 24px;
                        }

                        .tag {
                            width: 40px;
                            height: 22px;
                            background: #FFFFFF;
                            border: 1px solid rgba(0, 145, 255, 1);
                            font-size: var(--font_size_4);
                            color: #0091FF;
                            text-align: center;
                            line-height: 22px;
                        }
                    }

                    .deptname {
                        width: 100%;
                        font-size: var(--font_size_3);
                        color: #999999;
                        line-height: 24px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }

                .buttons {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;

                    &>span {
                        margin-left: 15px;
                        font-size: var(--font_size_3);
                        color: #1064CD;
                    }
                }

            }
        }
    }
}

.taskList {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .head {
        height: 50px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: var(--font_size_2);
        color: #333333;
        border-bottom: 1PX solid #ebebeb;
    }

    .taskContent {
        width: 100%;
        height: calc(100% - 50px);
        overflow-y: auto;

        .myjz {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 20px;

            .text {
                font-size: var(--font_size_3);
                color: #333333;
            }

            .status {
                margin-left: 15px;
                font-size: var(--font_size_3);
                color: #ccc;
                // background: #F0F5FF;
                // border: 1px solid rgba(222, 232, 251, 1);
                border-radius: 4px;
                width: 75px;
                height: 30px;
                font-size: var(--font_size_4);
                // color: #0091FF;
                display: flex;
                align-items: center;
                justify-content: center;

                &.wck {
                    background: #F1F1F1;
                    border: 1px solid rgba(229, 229, 229, 1);
                    color: #999999;
                }

                &.tjz {
                    background: #F0F5FF;
                    border: 1px solid rgba(222, 232, 251, 1);
                    color: #0091FF;
                }

                &.ykn {
                    background: #f3efe9;
                    border: 1px solid rgba(247, 234, 216, 1);
                    color: #EB6A0E;
                }

                &.ywc {
                    background: #F0FFF6;
                    border: 1px solid rgba(216, 247, 229, 1);
                    color: #0DBF4F;
                }
            }

        }

        .percent {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            box-sizing: border-box;
            padding: 0 20px;

            .van-slider {
                flex: 1;
            }

            &>span {
                font-size: var(--font_size_4);
                // color: #14C154;
                flex-shrink: 0;
                margin-left: 20px;

                &.wck {
                    color: #999999;
                }

                &.tjz {
                    color: #0091FF;
                }

                &.ykn {
                    color: #EB6A0E;
                }

                &.ywc {
                    color: #0DBF4F;
                }
            }
        }
    }
}

.pop-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 15px 20px;

    p {
        display: flex;
        align-items: center;
        font-size: var(--font_size_3);
        color: #333333;
        font-weight: 500;

        .van-icon {
            margin-left: 10px;
        }
    }
}

.headPop_title {
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: var(--font_size_3);
    color: #333333;
    border-bottom: 1PX solid #ebebeb;

    .van-icon {
        margin-left: 5px;
        cursor: pointer;
    }
}

.tipdiog {
    width: 80%;
    // height: 80%;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;

    .tian {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .pop_header {
            width: 100%;
            height: 40px;
            flex-shrink: 0;
            box-sizing: border-box;
            padding: 0 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1PX solid #504f4f;

            &>span {
                font-size: var(--font_size_3);
                color: #FFF;
                font-weight: bold;
            }

            &>.van-icon {
                font-size: var(--font_size_3);
                color: #FFF;
            }
        }

        .contains-box {
            width: 100%;
            flex: 1;
            box-sizing: border-box;
            padding: 0 15px 15px 15px;
            overflow-y: auto;

            &>p {
                font-size: var(--font_size_4);
                color: #FFF;
                line-height: 24px;
                text-indent: 2em;
                ;

                &.tit {
                    text-indent: 0;
                    margin: 10px 0;
                }
            }
        }
    }
}

.fileIframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .van-nav-bar {
        flex-shrink: 0;
    }

    .iframeContent {
        width: 100%;
        flex: 1;
        overflow: hidden;
    }

    ::v-deep .van-icon {
        font-size: var(--font_size_3);
        color: #999;
    }
}

::v-deep .van-tab__text {
    font-size: var(--font_size_3) !important;
}

::v-deep .van-tab.van-tab--active {
    color: #0091FF !important;
}

::v-deep .van-tabs__line {
    background: #0091FF !important;
}

::v-deep .van-checkbox__icon--checked .van-icon {
    background-color: #0091FF;
    border-color: #0091FF;
}

::v-deep .el-dropdown-menu__item {
    border-bottom: 1PX solid #ebebeb;
    display: flex;
    align-items: center;
    height: 40px;

    &:last-child {
        border: none
    }

    .van-image {
        width: 14px;
        height: 14px;
        margin-right: 8px;
    }
}

::v-deep .el-dropdown-menu {
    padding: 0 !important;
}

::v-deep .el-icon-more {
    font-size: var(--font_size_3);
    color: #999;
}

::v-deep .van-tabs__wrap {
    border: 1PX solid rgba(245, 245, 245, 1);
}

::v-deep.taskDetail .overlayClass {
    background: rgba(0, 0, 0, 0);
}

::v-deep.taskDetail .teamPcPop {
    height: 60%;
    width: 80%;
    border-radius: 6px;
    box-shadow: 0 0 15px #ccc;
}
</style>
