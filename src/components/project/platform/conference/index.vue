<template>
<div>
    <div v-if="errored" class="init-div">
        {{ errorMsg }}
    </div>
    <commonempty v-else-if="bOk" description="您近期无会议安排" />
    <div v-else>
        <div v-if="JSON.stringify(meetingInfo) == '{}'">
            <commonempty :image="require('static/images/peopleCongress/img_hyap.png')" class="meeting-empty" description="您近期无会议安排" />
        </div>
        <div v-else-if="meetingInfo" class="MeetingBox">
            <div class="info card">
                <div class="flex jb title">
                    <span class="flex">{{ meetingInfo.title }}<span v-if="meetingInfo.hylx == 1 && isSign == 1" class="signtag" @click="showSign = true">已签到</span></span>
                    <img src="@/assets/imgs/conference/home-exchange.png" alt="" @click="goMeetingList">
                </div>
                <div>
                    <span class="ingtag" v-if="inProgress">进行中</span>
                    <span class="sub">{{ meetingInfo.startDateTime }} 至 {{ meetingInfo.endDateTime }}</span>
                </div>
                <div class="sub flex ab">
                    <span v-if="meetingInfo.address" style="flex-shrink: 0;">会议地点：</span><span @click='showMyAddr'>{{ meetingInfo.address }}</span>
                    <span v-show="!meetingInfo.showDetail" style="flex-shrink: 0;" class="dline" @click='showMySeat'>
                        <template v-if="meetingInfo.seat">{{ meetingInfo.seat }}</template>
                        <template v-else-if="meetingInfo.seatFileId">查看座位图</template>
                    </span>
                </div>
                <collapseTransition>
                    <div v-show="meetingInfo.showDetail">
                        <div class="sub" v-if="meetingInfo.seat || meetingInfo.seatFileId">
                            <span>我的位置：</span>
                            <span class="dline" @click='showMySeat' v-if="meetingInfo.seat">{{ meetingInfo.seat }}</span>
                            <span class="dline" @click='showMySeat' v-else>查看座位图</span>
                        </div>
                        <div class="sub" v-if="meetingInfo.moderator">
                            <span>主持人：</span><span>{{ meetingInfo.moderator }}</span>
                        </div>
                        <div class="sub" v-if="meetingInfo.meetingContent">
                            <span>会议内容：</span><span>{{ meetingInfo.meetingContent }}</span>
                        </div>
                    </div>
                </collapseTransition>
                <div @click="showInfoDetail" class="arrow" :class="{'down': !meetingInfo.showDetail}">
                    <img src="@/assets/imgs/conference/arrow.png" alt="">
                </div>
                <div class="btn" v-if="meetingNum > 1">
                    <span @click="goMeeting('pre', hasPreMeeting)" :class="{'canClick': hasPreMeeting}">上一场</span>
                    <span @click="goMeeting('next', hasNextMeeting)" :class="{'canClick': hasNextMeeting}">下一场</span>
                </div>
            </div>
            <van-notice-bar class="notice" color="#FF6010" background="#FFF9ED" v-if="notice.length">
                <template #left-icon>
                    <img src="@/assets/imgs/conference/voice.png" alt="">
                </template>
                <template #right-icon>
                    <van-icon name="arrow" @click="toNoticeList"/>
                </template>
                <span v-for="(item, index) in notice" @click="noticeGo(item)">{{item.title}}</span>
                
            </van-notice-bar>
            <div class="menu card" v-if="showMenus.length > 0">
                <div class="flex fw">
                    <div v-for="(item, index) in showMenus" :key="index" class="menu-item flex dc ac" @click="goUrl(item)">
                        <img :src="item.img" alt="">
                        <span>{{item.name}}</span>
                    </div>
                    <!-- <div class="menu-item flex dc ac" @click="goUrl({'url': '/commonForm/2309261533084McuxrMrlgFwifxwlxT?fid=230920134922iRveGHJRN7xfiloVbM5'})">
                        <img :src="this.menus[12].img" alt="">
                        <span>{{ this.menus[12].name }}</span>
                    </div>
                    <div class="menu-item flex dc ac" @click="goUrl({'url': '/commonTabs/platFormMyService?fid=230920134922iRveGHJRN7xfiloVbM5'})">
                        <img :src="this.menus[13].img" alt="">
                        <span>{{ this.menus[13].name }}</span>
                    </div> -->
                </div>
            </div>
            <div class="schedule" v-if="allSchedules.length > 0">
                <div class="top flex jb">
                    <img src="@/assets/imgs/conference/home-schedule.png" alt="">
                    <span class="flex1">会议议程</span>
                    <van-icon name="arrow" @click='enterDetail'/>
                </div>
                <div class="card">
                    <div class="schedule-dates" v-if="allSchedules.length > 1">
                        <span class="schedule-date" :class="{'active-date': currentScheduleIndex == index}" v-for="(date, index) in allSchedules" @click="currentScheduleIndex = index">
                            {{date.date}}
                        </span>
                    </div>
                    <div v-for="(item, idx) in allSchedules[currentScheduleIndex].agendas" :key="idx" class="schedule-item flex jb ab">
                        <span class="time">{{item.time}}</span>
                        <div class="content flex1 flex dc" @click="enterDetail(item, idx)">
                            <div>{{item.title}}</div>
                            <collapseTransition>
                                <div v-show="item.isopen" v-html="item.content" style="padding-top: 0.2rem"></div>
                            </collapseTransition>
                        </div>
                        <van-icon :name="item.isopen ? 'arrow-up' : 'arrow-down'" @click="item.isopen = !item.isopen"/>
                    </div>
                </div>
            </div>
            <div class="topic currentTopic" v-if="currentTopics.length > 0">
                <div class="top flex jb ac">
                    <img src="@/assets/imgs/conference/home-file.png" alt="">
                    <span class="flex1">进行中的议题</span>
                </div>
                <topic-item :topics="currentTopics" :showAllTopic="!showMyTopic" :meetingId="meetingInfo.id" @openFile="openFile"></topic-item>
                <topic-item :topics="nextTopics" :nextCss="true" :showAllTopic="!showMyTopic" :meetingId="meetingInfo.id" @openFile="openFile"></topic-item>
            </div>
            <div class="topic" v-if="allMeetingTopics.length > 0">
                <div class="top flex jb ac">
                    <img src="@/assets/imgs/conference/home-file.png" alt="">
                    <span class="flex1">会议议题</span>
                    <span class="sub" style="padding-right: 0.2rem">我的议题</span>
                    <van-switch v-model="showMyTopic" size="16px"  inactive-color="#B7B7B7"/>
                </div>
                <topic-item :topics="allMeetingTopics" :showAllTopic="!showMyTopic" :meetingId="meetingInfo.id" @openFile="openFile"></topic-item>
            </div>
            <div class="file" v-if="allFiles.length > 0">
                <div class="top">
                    <img src="@/assets/imgs/conference/home-file.png" alt="">
                    <span>会议文件</span>
                </div>
                <div class="card">
                    <div v-for="(item, index) in allFiles" :key="index" class="file-item flex as" @click="openFile(item)">
                        <div style="flex-shrink: 0;">
                            <img v-if="item.type == 'folder'" src="@/assets/imgs/conference/folder.png" alt="">
                            <img v-else :src="dsf.util.getFileTypeIcon(item.fileName)" alt="">
                        </div>
                        <span>{{item.fileName}}</span>
                    </div>
                </div>
            </div>
            <div class="signin" v-if="isShowSignBtn" @click="goSign">去签到</div>
        </div>
    </div>
    <signinPopup :showSign.sync="showSign" :isSign="isShowSignBtn" :signtime="signtime" :currentSigninDetail="currentSigninDetail" @signIn="signin"></signinPopup>
    <enclosurePopup v-if="meetingInfo" ref="enclosurePopup"></enclosurePopup>
    <!-- 投票 -->
    <voteBallot v-if="voteTopicId" :topicId="voteTopicId" :meetingId="meetingInfo.id"></voteBallot>
</div>
</template>
<script>
import collapseTransition from "./components/collapseTransition.jsx";
import topicItem from "./components/topicItem";
import enclosurePopup from "./components/enclosurePopup";
import signinPopup from "./components/signinPopup";
import {
    Badge
} from "vant";
import {
    ImagePreview
} from "vant";
import voteBallot from "@/components/commonDialog/voteBallot";
export default {
    components: {
        [Badge.name]: Badge,
        collapseTransition,
        topicItem,
        enclosurePopup,
        signinPopup,
        voteBallot
    },
    data() {
        return {
            id: this.$route.params.id,
            files: [],
            schedules: [],
            allSchedules: [],
            allMeetingTopics: [],
            currentTopics: [],
            nextTopics: [],
            allFiles: [],
            noticeText: "",
            notice: [],
            meetingInfo: null,
            meetings: {},
            loading: null,
            errored: false,
            errorMsg: '发生错误，请稍后重试或联系系统管理员！',
            isFirstLoad: false, // 是否初次加载
            menus: dsf.config?.platformMeetingConfig.homePage.menu,
            showMenus: [],
            showPicker: false,
            text: '会议议程',
            popFile: {},
            showFile: false,
            filename: '',
            isPreview: true,
            imgPreview: false,
            previewImg: [],
            bOk:false,
            showMyTopic: true,
            isShowSignBtn: false,
            isSign: false,
            signtime: '',
            showSign: false,
            currentSigninDetail: {},
            currentScheduleIndex: 0,
            voteTopicId: '',
            meetingNum: 0, //我的会议数量
            hasPreMeeting: false,
            hasNextMeeting: false,
            meetingIds: [],
            meetingIndex: 0, //当前会议下标
        };
    },
    computed: {
        // 会议持续天数
        days: function () {
            return parseInt(dsf.date.diffDays(
                dsf.date.parse(this.meetingInfo.startDateTime),
                dsf.date.parse(this.meetingInfo.endDateTime)
            ) + 1);
        },
        // 是否显示菜单（仅代表大会需要）
        isShowMenu: function () {
            return this.$route.params.key == "1" || true
        },
        inProgress() {
            if (this.meetingInfo.startDateTime) {
                let curTime = new Date().getTime()
                return curTime > dsf.date.parse(this.meetingInfo.startDateTime).getTime() && curTime < dsf.date.parse(this.meetingInfo.endDateTime).getTime()
            } else {
                return false
            }
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.$router.go(-1)
    },
    created() {
        this.loading = dsf.layer.loading();
        // if (this.$route.query.id) {
        //     this.meetingDetails(this.$route.query.id);
        // } else {
            this.loadData();
        // }
    },
    mounted() {
        if (this.$route.query.scheduleId) {
            this.doSign(this.$route.query.id, this.$route.query.scheduleId)
        }
    },
    watch: {
        allMeetingTopics(val) {
        //     console.log(val);
          this.$nextTick(()=>{
              if (document.querySelector(".currentTopic")) {
                var currentTopic = document.querySelector(".currentTopic");
                var MeetingBox = document.querySelector(".MeetingBox");
                MeetingBox.scrollTo({
                  top: currentTopic.offsetTop,
                  behavior: "smooth",
                });
              }
            })
        },
    },
    activated() {
        // 刷新首页
        // if (!this.isFirstLoad) {
        //     this.loadData();
        // }
        // this.isFirstLoad = false;
        if (this.meetingInfo?.id) {
            if(this.meetingInfo.id == this.$route.query.id) {
                this.getToBeSigninDetail(this.meetingInfo.id)
                this.getTopic(this.meetingInfo.id)
                this.getVote(this.meetingInfo.id)
            } else {
                this.loadData();
            }
        }
    },
    methods: {
        goSign(){
            if(this.currentSigninDetail.signinType == 2){
                dsf.util.scanQRCode((res) => {
                    console.log(res)
                    if (res?.startsWith('meetingsign_')) {
                        let Arr = res.split('&')
                        Arr.forEach(ele=>{
                            if(ele.includes('meetingId=')) types = ele.split('=')[1]
                            if(ele.includes('scheduleId=')) moduleId = ele.split('=')[1]
                        })
                        if (meetingId != this.$route.query.id) {
                            this.$router.push(`/conferenceIndex?id=${meetingId}&scheduleId=${scheduleId}`)
                        }else{
                            this.doSign(meetingId, scheduleId)
                        }
                    }
                })
            }else{
                this.showSign = true
            }
            
        },
        doSign(meetingId, scheduleId) {
          dsf.http.post('fn/conferenceSignIn/doSign', { 
            meetingId: meetingId,
            scheduleId: scheduleId
          }).then(res => {
            if (res.data.code == 200) {
              dsf.layer.toast('签到成功')
              this.signin()
              this.showSign = true
            } else {
              dsf.layer.toast(res.data.message)
            }
          }).error(error => {
            dsf.layer.toast(error)
          })
        },
        loadData() {
            // this.allSchedule = ['1'];
            this.errored = false;
            this.bOk = false;
            dsf.http.post(`fn/conferenceMobile/meetingList`).done(res => {
                this.meetingNum = res.datas.length;
                if(res.datas.length > 0) {
                    res.datas.forEach(el => {
                        this.meetingIds.push(el.dataValue.id);
                    })
                    // console.log(this.meetingIds)
                    if (this.$route.query.id) {
                        this.meetingDetails(this.$route.query.id);
                    } else {
                        let meetingId = res.datas[0].dataValue.id;
                        this.meetingDetails(meetingId);
                    }
                } else {
                    this.bOk = true;
                }
            })
            .error(error => {
                this.errored = true;
                this.errorMsg = '数据获取失败，请稍后重试！';
                console.log("meetingInfo-error", error);
            })
            
        },
        meetingDetails(meetingId){
            let url = `fn/conferenceMobile/meetingInfo`;
            // 获取会议信息
            dsf.http.post(url, {meetingId: meetingId}).then(res => {
                if (res.data.type == "success") {
                    this.meetingInfo = res.data.data;
                    dsf.util.saveToSessionStore("meeting", this.meetingInfo);
                    this.isSign = this.meetingInfo.signValue
                    this.signtime = this.meetingInfo.signtime
                    this.$set(this.meetingInfo, 'showDetail', false)
                    this.setMenu(this.meetingInfo);
                    this.meetingIndex = this.meetingIds.indexOf(meetingId);
                    this.hasPreMeeting = this.meetingIndex < this.meetingIds.length - 1;
                    this.hasNextMeeting = this.meetingIndex > 0;

                    return Promise.all([
                        this.getNotice(this.meetingInfo.id), 
                        this.getAgendas(this.meetingInfo.id), 
                        this.getTopic(this.meetingInfo.id),
                        this.getFiles(this.meetingInfo.id),
                        this.getToBeSigninDetail(this.meetingInfo.id),
                        this.getVote(this.meetingInfo.id)
                    ])
                } else {
                    throw new Error(res.data.message)
                }
            }).catch(error => {
                this.errored = true;
                this.errorMsg = error.message;
                console.log("loadData-error", error);
                // dsf.layer.toast("数据获取失败！");
            })
            .always(() => {
                dsf.layer.closeLoading(this.loading);
            });
        },
        //处理会议日程和会议议题
        getAgendas(meetingId) {
            return dsf.http.post('fn/conferenceMobile/myScheduleTimeline', {meetingId: meetingId}).then(res => {
                if (res.data.code == 200) {
                    this.allSchedules = res.data.data;
                    this.allSchedules.forEach(date => {
                        date.date = date.date.split('\(')[0].replace('月', '.').replace('日', '')
                        date.agendas.forEach(item => {
                            this.$set(item, 'isopen', false)
                        })
                    })
                }
            })
        },
        getTopic(meetingId) {
            return dsf.http.post('fn/conferenceMobile/meetingTopics', {meetingId: meetingId}).then(res => {
                if (res.data.code == 200) {
                    let nextIndex
                    this.allMeetingTopics = res.data.data;
                    this.currentTopics = []
                    this.nextTopics = []
                    this.allMeetingTopics.forEach((topic, index) => {
                        this.$set(topic, 'showAllFiles', false)
                        let time = topic.ytJssj?.substr(5, 5)
                        let sjtime = topic.ytJssj?.substr(5, 5)
                        if(time){
                            this.$set(topic, 'startTime', time.replace('-', '/'))
                        }
                        if(sjtime){
                            this.$set(topic, 'sjstartTime', sjtime.replace('-', '/'))
                        }
                        topic.files?.forEach(file => {
                            file.id = file.fileId
                            file.isHandwrite = '1'
                        })
                        if (topic.conductText == '进行中') {
                            this.currentTopics.push(topic)
                            nextIndex = index + 2
                        }
                    })
                    if (this.allMeetingTopics[nextIndex]) {
                        let obj = this.allMeetingTopics[nextIndex]
                        let arr = obj.title.split('：')
                        console.log(arr);
                        obj.title = '下一议题：' + arr[1]
                        console.log(obj);
                        this.nextTopics.push(obj)
                    }
                }
            })
        },
        getFiles(meetingId) {
            this.allFiles = [];
            return dsf.http.post('fn/conferenceMobile/files', {meetingId: meetingId, folderId: meetingId, folderModuleId: '', type: 'files'}).then(res => {
                if (res.data.code == 200) {
                    // this.allFiles = res.data.data.files
                    if (res.data.data.folders && res.data.data.folders.length > 0) {
                            let arr = res.data.data.folders.map(item => {
                                return Object.assign({}, item, {
                                        type: "folder",
                                        fileName: item.folderName
                                    })
                            });
                            this.allFiles.push(...arr);
                        }
                        // 文件
                        if (res.data.data.files && res.data.data.files.length > 0) {
                            let arr = res.data.data.files.map(item => {
                                return  Object.assign({}, item, {
                                        type: item.fileName.substr(item.fileName.lastIndexOf(".") + 1),
                                        isHandwrite: "1",
                                        id: item.fileId
                                    })
                            });
                            this.allFiles.push(...arr);
                        }
                }
            })
        },
        // 获取通知公告
        getNotice(meetingId) {
            return dsf.http.post(`fn/conferenceMessage/notice`, {
                meetingId: meetingId,
                count: 6
            }).done(result => {
                if (result.code == 200) {
                    // self.noticeText = news.map(item => item.title).join(",");
                    // this.noticeText = result.data[0].title;
                    // this.notice = result.data[0];
                    this.notice = result.data
                }
            }).error(error => {
                console.log("getNotice-error", error);
            });
        },

        //进入会议列表
        goMeetingList() {
            this.$router.push('/commonList?fileType=hylb')
        },
        goUrl(item) {
            console.log(item);
            if (item.url) {
                if (item.id == "czzn") { // 文件预览f
                    let file = {
                        id: this.meetingInfo.znFileId,
                        fileId: this.meetingInfo.znFileId,
                        name: this.meetingInfo.znFileName,
                        infoId: this.meetingInfo.znFileId,
                        moduleId: this.meetingInfo.moduleId,
                        isHandwrite: "-1",
                        flowId: this.meetingInfo.flowId,
                        nodeId: this.meetingInfo.nodeId,
                        fileName: this.meetingInfo.znFileName || ''
                    };
                    this.openFile(file)
                } else {
                    this.$router.push(item.url);
                }
            } else if (item.id == "sphy") {
                this.startWithConfNew({pk: this.meetingInfo.id, moduleId: this.meetingInfo.moduleId})
            } else {
                dsf.layer.toast(`功能开发中！`);
            }
        },
        setMenu(meetingInfo) {
            let url, badge = 0;
            this.showMenus = [];
            console.log(meetingInfo)
            let moduleArr = meetingInfo.showModule.split(',');
            let moduleName = meetingInfo.showModuleName.split(',');
            moduleArr.forEach((item, index) => {
                let imgUrl = "";
                let menuIndex = this.menus.findIndex(menuItem => menuItem.id == item);
                if (menuIndex != -1) {
                    if (item == "hyxx" && meetingInfo.msgUnReadCount > 0) {
                        badge = meetingInfo.msgUnReadCount;
                    } else {
                        badge = this.menus[menuIndex].badge;
                    }
                    if (this.menus[menuIndex].grant == 1) { // 授权
                        if (item == "hyxx" && meetingInfo.isSendMessage == true) {
                            url = this.menus[menuIndex].urls.find(url => url.role == 1).url;
                        } else {
                            url = this.menus[menuIndex].urls.find(url => url.role == 0).url;
                        }
                    } else {
                        if (item == "czzn" && meetingInfo.znFileName) {
                            if (dsf.util.isImage(meetingInfo.znFileName)) {
                                imgUrl = dsf.url.getServerUrl(`fn/mobileFileDownload/download?fileId=${meetingInfo.znFileId}&moduleId=${meetingInfo.moduleId}&nodeId=${meetingInfo.nodeId}&flowId=${meetingInfo.flowId}&filename=${meetingInfo.znFileName}`);
                            }
                            url = dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${meetingInfo.znFileId}&moduleId=${meetingInfo.moduleId}&nodeId=${meetingInfo.nodeId}&flowId=${meetingInfo.flowId}&filename=${meetingInfo.znFileName}`);
                        } else {
                            url = this.menus[menuIndex].url;
                        }
                    }
                    this.showMenus.push({
                        id: item,
                        img: this.menus[menuIndex].img,
                        name: moduleName[index],
                        url: dsf.util.getReplaceUrl(url, meetingInfo),
                        imgUrl: imgUrl,
                        badge: badge
                    })
                }

            })
        },
        noticeGo(notice) {
            this.$router.push({
                path: `/conference/notice`,
                query: {
                    moduleId: `220805144232vEngwl5cKAqX8AQE43x`,
                    pk: notice.id,
                    fid: this.meetingInfo.id
                }
            });
        },
        //查看座次
        showMySeat() {
            if (this.meetingInfo.seatFileId) {
                let url = dsf.url.getServerUrl(`fn/mobileFileDownload/download?fileId=${this.meetingInfo.seatFileId}&moduleId=${this.meetingInfo.moduleId}&nodeId=${this.meetingInfo.nodeId}&flowId=${this.meetingInfo.flowId}&filename=${this.meetingInfo.fileName}`);
                let images = [];
                images.push(url);
                ImagePreview({
                    images: images,
                    startPosition: 0
                });
            } else {
                let url = dsf.url.getServerUrl(`p1105/190105112112w29SDA3bDIEFCTSKWkd/seatDesign/index.html#/mobileView/hw/${this.meetingInfo.id}/${this.meetingInfo.ryId}`)
                this.$router.push({
                    name: "dsfIframe",
                    params: {
                        url: url,
                        title: "我的位置"
                    }
                });
            }
        },
        showMyAddr() {
            if (this.meetingInfo.addressImg) {
                let url = dsf.url.getServerUrl(this.meetingInfo.addressImg)
                let images = [];
                images.push(url);
                ImagePreview({
                    images: images,
                    startPosition: 0
                });
            } else {
                dsf.layer.toast(`请先上传会议室位置图片！`);
            }
        },
        //进入会议议程
        enterDetail(item, index) {
            let id = item ? item.id : this.allSchedules[0].agendas[0].id
            // console.log(item.agendas[0].id);
            this.$router.push({
                path: `/scheduleDetails/${this.meetingInfo.id}`,
                query: {
                    id: id,
                    index: index
                }
            })
        },
        getToBeSigninDetail(meetingId) { // 获取待签到提醒，只有状态为-1时才显示去签到按钮
            dsf.http.post('fn/conferenceSignIn/getUserCurrentToBeSignInDetail', {meetingId: meetingId}).then(res => {
                if (res.data.code == 200) {
                    this.currentSigninDetail = res.data.data;
                    this.isShowSignBtn = this.currentSigninDetail.signValue == '-1'
                }
            })
        },
        signin() {
            this.isShowSignBtn = false
            this.showSign = false
            this.isSign = 1
            this.signtime = dsf.date.format(new Date(), 'yyyy-mm-dd hh:ii')
        },
        showInfoDetail() {
            this.meetingInfo.showDetail = !this.meetingInfo.showDetail
        },
        toNoticeList() {
            let url = '/commonList/220805151958YDvJC1dKNborQu59aYL/220805144232vEngwl5cKAqX8AQE43x?secQuery={\"fid\":\"[id]\"}'
            this.$router.push(dsf.util.getReplaceUrl(url, this.meetingInfo))
        },
        openFile(file) {
            if (file.type == "folder") {
                this.$router.push({
                    name: "conferenceDir",
                    params: {
                        meetingId: this.meetingInfo.id,
                        folderid: file.folderId,
                        folderModuleId: file.folderModuleId
                    }
                });
            } else {
                this.$refs.enclosurePopup.open(file)
            }
        },
        getVote(meetingId) { // 获取投票议题
            dsf.http.post('fn/meetingVote/getVoteByMeetingId', {meetingId: meetingId}).then(res => {
                if (res.data.code == 200 && Array.isArray(res.data.data)) {
                    this.voteTopicId = res.data.data[0]
                }
            })
        },
        startWithConfNew(item) {
            dsf.video.startWithConfNew(item)
        },
        goMeeting(type, isClick){
            if(isClick) {
                if(type == 'pre') {
                    this.meetingDetails(this.meetingIds[this.meetingIndex + 1])
                } else {
                    this.meetingDetails(this.meetingIds[this.meetingIndex - 1])
                }
            } else {
                return
            }
        }
    }
};
</script>

<style lang="scss" scoped>

.as {
  align-items: flex-start;
}
.ab {
  align-items: baseline;
}
.home {
  font-size: 15px;
}
.flex1 {
  flex: 1;
}
.ingtag {
    padding: 3px 5px;
    background: rgba(0,145,255,0.23);
    border-radius: 4px;
    font-size: var(--font_size_4);
    color: #0075CD;
    margin-right: 6px;
    display: inline-block;
}
.sub {
    font-size: 13px;
    font-weight: normal;
    color: #666666;
}
.type-tag {
    border: 1px solid #4DA4FB;
    border-radius: 19px;
    color: #4DA4FB;
    font-size: var(--font_size_4);
    padding: 3px 5px;
    margin: 0 5px 5px 0;
    display: inline-block;
}
.arrow {
    text-align: center;
    margin-top: 10px;
    img {
        width: 12px;
        height: 8px;
        display: inline-block;
    }
    &.down {
        transform: rotate(180deg);
    }
}
.header {
  background-color: #0075CD;
  padding: 10px 10px 50px;
  margin-bottom: -50px;
}
.top {
    font-size: var(--font_size_2);
    color: #333333;
    font-weight: 800;
    display: flex;
    align-items: center;
    margin: 10px;
    img {
      width: 20px;
      margin-right: 6px;
    }
  }
.card {
  background: #FFFFFF;
  box-shadow: 0 1px 10px 4px rgba(191,191,191,0.26);
  border-radius: 7px;
  margin: 10px;
  padding: 16px;
  
}
.info {
    word-break: break-all;
  div:not(:first-child) {
    margin-top: 10px;
  }
  .title {
    font-size: var(--font_size_2);
    color: #0062AB;
    font-weight: 800;
    align-items: baseline;
    .flex {
      align-items: baseline;
    }
    img {
      width: 14px;
    }
  }
  .signtag {
    padding: 3px 5px;
    background: #43d6b6;
    border-radius: 4px;
    font-size: var(--font_size_4);
    color: #fff;
    margin: 0 10px;
    flex-shrink: 0;
  }
  
  .dline {
    font-size: 13px;
    color: #0075CD;
    border-bottom: 1px solid #0075CD;
    // margin-left: 15px;
  }
}
.notice {
  background: #FFF9ED;
  margin: 0 10px;
  padding: 0 16px;
  font-size: 15px;
  color: #FF6010;
  img {
    width: 16px;
    margin-right: 10px;
  }
}
.signin {
  position: fixed;
  right: 0;
  bottom: 160px;
  background: #F7B500;
  box-shadow: 0px 0px 9px 4px rgba(203,203,203,0.5);
  border-radius: 50px 0px 0px 50px;
  padding: 6px 10px;
  color: #fff;
}
.menu {
    padding: 16px 0;
    .menu-item {
        width: 25%;
        img {
            width: 36px;
            height: 36px;
            margin: 10px;
        }
    }
}
.schedule-dates {
    display: flex;
    width: 100%;
    overflow-x: auto;
    .schedule-date {
        flex-shrink: 0;
        background-color: #f4f4f4;
        padding: 10px 16px;
    }
    .active-date {
        background: #0069D3;
        box-shadow: 0px 2px 6px 3px rgba(88,159,230,0.58);
        border-radius: 6px;
        color: #fff;
        z-index: 1;
    }
}
.schedule-item {
//   &:nth-child(2) {
//     padding-top: 16px;
//   }
  .time {
    display: inline-block;
    padding-right: 10px;
    width: 100px;
    text-align: center;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      background: #0069D2;
      border-radius: 50%;
      top: 50%;
      right: 0;
      transform: translateY(-50%) translateX(50%);
    }
    &:before {
      content: '';
      background: #FFFFFF;
      border: 1px solid rgba(0,105,210,1);
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      top: 50%;
      right: 0;
      transform: translateY(-50%) translateX(50%);
    }
  }
  .content {
    padding: 10px 16px;
    border-left: 1px solid rgba(227,227,227,1);
  }
}
.file-item {
    &:not(:first-child) {
        padding-top: 16px;
    }
    img {
        width: 16px;
        margin-right: 10px;
        display: inline-block;
    }
    span {
        font-size: 15px;
        color: #666666;
        word-break: break-all;
    }
}
.wrapper {
  background-color: rgba(255,255,255,0.9);
  width: 70%;
  margin: 50% auto;
  border-radius: 16px;
  padding: 30px;
  position: relative;
  .van-icon {
      position: absolute;
      right: 15px;
      top: 15px;
    }
  .circle {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin: 20px auto;
    text-align: center;
    background-image: linear-gradient(#35c4fd, rgb(0, 123, 227));
    color: #fff;
    box-shadow: 0px 0px 15px 4px rgba(0, 123, 227,0.5);
    .title {
      font-size: var(--font_size_2);
      font-weight: 600;
      padding-bottom: 10px;
    }
  }
  .isSign {
    background-image: linear-gradient(#43d6b6, rgb(42, 196, 253));
    box-shadow: 0px 0px 15px 4px rgba(42, 196, 253,0.5);

  }
}
.MeetingBox{
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}

.btn{
    display: flex;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #E5E5E5;
    span{
        flex: 1;
        color: #E5E5E5;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        &:nth-child(1){
            border-right: 1px solid #E5E5E5;
        }

        &.canClick {
            color: #0062AB;
        }
    }
}
</style>
