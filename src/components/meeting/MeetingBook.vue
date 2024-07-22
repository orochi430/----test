<template>
<div class="ds-meeting-book">
    <!--    <van-nav-bar fixed title="预订" left-arrow @click-left="$router.back()" />-->
    <van-popup v-model="showStartTimePicker" position="bottom">
        <van-datetime-picker :min-date="minDate" :max-date="maxDate" :formatter="formatter" type="datetime" @confirm="onConfirm($event, 'startTime')" @cancel="showStartTimePicker = false" />
    </van-popup>
    <van-popup v-model="showEndTimePicker" position="bottom">
        <van-datetime-picker :min-date="minDate" :max-date="maxDate" :formatter="formatter" type="datetime" @confirm="onConfirm($event, 'endTime')" @cancel="showEndTimePicker = false" />
    </van-popup>
    <van-popup v-model="showStartTimePicker1" position="bottom">
        <van-datetime-picker :min-date="minDate" :max-date="maxDate" :formatter="formatter" type="date" @confirm="onConfirm($event, 'startTime')" @cancel="showStartTimePicker1 = false" />
    </van-popup>
    <van-popup v-model="showEndTimePicker1" position="bottom">
        <van-datetime-picker :min-date="minDate" :max-date="maxDate" :formatter="formatter" type="date" @confirm="onConfirm($event, 'endTime')" @cancel="showEndTimePicker1 = false" />
    </van-popup>
    <van-form @submit="onSubmit('',1)">
        <van-cell-group>
            <van-field class="meeting-textarea" name="meeting" label="会议" left-icon="i iconfont iconricheng">
                <template #input>
                    <textarea class="textr" style="text-align:left; height:72px !important;" v-model="form.meeting" maxlength="200" placeholder="请输入会议标题"></textarea>
                </template>
            </van-field>
        </van-cell-group>
        <van-cell-group>
            <van-field name="isAllDay" label="全天" left-icon="i iconfont iconshijian">
                <template #right-icon>
                    <van-switch v-model="form.isAllDay" size="16" />
                </template>
            </van-field>
            <div class="time-Range">
                <div :style="{opacity: form.startTime ? 1 : 0.7 }" class="time-Range-item time-Range-start" @click="chooseStartTime">
                    <div class="time-Range-day">{{ form.startTime | dateFilter }}</div>
                    <div v-show="!form.isAllDay" class="time-Range-time">{{ form.startTime | timeFilter('开始时间') }}</div>
                </div>
                <div :style="{opacity: form.endTime ? 1 : 0.7 }" class="time-Range-item time-Range-end" @click="chooseEndTime">
                    <div class="time-Range-day">{{ form.endTime | dateFilter }}</div>
                    <div v-show="!form.isAllDay" class="time-Range-time">{{ form.endTime | timeFilter('结束时间') }}</div>
                </div>
            </div>
        </van-cell-group>
        <!-- <van-cell-group>
            <van-field v-model="form.address" name="address" left-icon="i iconfont icondingwei" right-icon="i iconfont iconaddress-dark" placeholder="请输入会议地点" />
        </van-cell-group> -->
        <van-cell-group>
            <van-cell :title="form.room" icon="i iconfont iconmeeting-room" is-link @click="selectRoom" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="form.hyzc" name="address" readonly left-icon="i iconfont iconhuiyi" placeholder="选择会议主持" is-link @click="selectUser(0)" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="form.chld" name="address" readonly left-icon="i iconfont iconyaoqingcanyuren" placeholder="选择参会领导" is-link @click="selectUser(1)" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="form.chdw" name="address" readonly left-icon="i iconfont iconfasongren_danwei" placeholder="选择参会单位" is-link @click="selectUser(2)" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="form.chry" name="address" readonly left-icon="i iconfont iconyidao" placeholder="选择参会人员" is-link @click="selectUser(3)" />
        </van-cell-group>
        <van-cell-group>
            <van-cell :title="form.timetips" class="timetips" icon="i iconfont icontixing" is-link @click="tipsSetting" />
        </van-cell-group>
        <van-field style="margin-top:15px" input-align="right" name="uploader">
            <template #label>
                <span>
                    <!-- <label class="mast-input">*</label> -->
                    附件：
                </span>
            </template>
            <template #input>
                <div></div>
            </template>
            <template #right-icon>
                <van-uploader class="upload-btn" :after-read="afterRead" accept="">
                    <van-icon color="#1989fa" class="iconfont iconjiahao" />
                </van-uploader>
            </template>
        </van-field>
        <div class="upload-files">
            <div class="file-list" v-for="(item,index) in attach_1" :key="index">
                <i class="iconfont iconfile"></i>
                <span>{{item.title}}</span>
                <van-icon color="#999999" name="clear" @click="removeFile(item)" />
            </div>
        </div>
        <div class="footer">
            <van-button type="info" native-type="submit()">发布会议通知</van-button>
        </div>
    </van-form>
    <van-popup :close-on-click-overlay="false" v-model="showPerson" :style="{ height: '100%' }" position="bottom">
        <selectPerson v-if="showPerson" :type="meeting_type" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
    </van-popup>
    <van-popup v-model="show" :style="{ height: '80%' }" position="bottom">
        <tips-setting @getData="getData"></tips-setting>
    </van-popup>
    <van-popup v-model="roomshow" :style="{ height: '80%' }" position="bottom">
        <van-cell v-for="item in meetingData" :value="item.name" :key="item.id" @click="sureRoom(item)" />
    </van-popup>
    <van-popup :get-container="getContainer" v-model="showPopup" :close-on-click-overlay="false" :style="{ height: '90%' }" lock-scroll position="bottom">
        <!-- 公文发送 -->
        <send-workflow v-if="showFlowSend" ref="sendFile" :form-data="dataValue" @close="closeForm" @golist="onRefresh" />
    </van-popup>
</div>
</template>

<script>
// selectPerson
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import TipsSetting from '@/components/meeting/TipsSetting'
import sendWorkflow from "@/components/sendFlow/sendFile.vue";
export default {
    name: 'MeetingBook',
    components: {
        selectPerson,
        TipsSetting,
        sendWorkflow
    },
    filters: {
        dateFilter(time) {
            if (time) {
                return dsf.date.format(time, 'mm月dd日 DD');
            }
            return '请选择';
        },
        timeFilter(time, tips) {
            if (time) {
                return dsf.date.format(time, 'hh:ii');
            }
            return tips;
        }
    },
    data() {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 2);
        return {
            showFlowSend: true,
            showPopup: false,
            attach_1: [],
            minDate: new Date(),
            maxDate,
            showStartTimePicker: false,
            showEndTimePicker: false,
            showStartTimePicker1: false,
            showEndTimePicker1: false,
            form: {
                meeting: '',
                isAllDay: false,
                address: '',
                startTime: null,
                endTime: null,
                room: '会议室，老宋办公室',
                room_data: "",
                Invited: '',
                Invited_data: {},
                timetips: '15分钟前,应用内提醒',
                uploader: [],
                hyzc: "",
                chld: "",
                chdw: "",
                chry: ""
            },
            rules: {
                meeting: [{
                    required: true,
                    message: '请填写会议标题'
                }]
            },
            meetingData: [], //会议室
            show: false,
            showPerson: false,
            roomshow: false,
            // routerType: this.$route.params.type, //0:会议室预订   1:会议申请
            maininfo: {

            },
            moduleId: "200514112152rWCht6hUiXVRuSKXPMZ",
            formId: "200514112152F5P6eHVjGZo3WXAlvtw",
            info_id: "",
            sdate: '',
            edate: '',
            meeting_type: 0,
            Invited_data: {},
            cur_index: 0,
            hyzc_list: "",
            chld_list: "",
            chdw_list: "",
            chry_list: "",
            dataValue: {}
        }
    },
    created() {
        this.initData();
        this.postData();
    },
    mounted() {
        this.meeting_type = this.$route.query.type
        this.getUserList()
    },
    methods: {
        getContainer() {
            return document.body;
        },
        onRefresh() {
            this.$store.commit('refreshRouteByReg', ['/meetingCenter', '/todocenter', '/']);
            this.$router.go(-1);
        },
        onConfirm(time, name) {
            console.log(time)
            this.$set(this.form, name, time);
            // this.mainInfo.startTime = dsf.date.format(time, "yyyy-mm-dd hh:ii:00");
            if (name == 'startTime') {
                this.sdate = dsf.date.format(time, "yyyy-mm-dd hh:ii");
            } else {
                this.edate = dsf.date.format(time, "yyyy-mm-dd hh:ii");
            }
            console.log(this.sdate)
            this.showStartTimePicker = false;
            this.showEndTimePicker = false;
            this.showStartTimePicker1 = false;
            this.showEndTimePicker1 = false;
        },
        // form: {
        //     meeting: '',
        //     isAllDay: false,
        //     address: '',
        //     startTime: null,
        //     endTime: null,
        //     room: '会议室，老宋办公室',
        //     Invited: '',
        //     timetips: '15分钟前,应用内提醒',
        //     uploader: [],
        //   },
        onSubmit(callback, num) {
            console.log("===表单最终提交数据")
            // console.log(this.form)
            this.maininfo['B0001'] = {}; //会议名称
            this.maininfo['c-meetingtz-019'] = {}; //开始时间
            this.maininfo['c-meetingtz-020'] = {}; //结束时间
            this.maininfo['c-meetingtz-030'] = {}; //会议地点
            this.maininfo['c-meetingtz-004'] = {}; //会议类型
            this.maininfo['c-meetingtz-011'] = {}; //会议主持
            this.maininfo['c-meetingtz-014'] = {}; //参会领导
            this.maininfo['c-meetingtz-028'] = {}; //参会部门
            this.maininfo['c-meetingtz-013'] = {}; //参会人员
            this.maininfo['c-meetingtz-029'] = {}; //备注
            this.maininfo['c-meetingtz-012'] = {}; //联系人
            this.maininfo["A0005"] = {};
            this.maininfo['B0001'].value = this.form.meeting;
            this.maininfo['c-meetingtz-019'].value = this.sdate;
            this.maininfo['c-meetingtz-020'].value = this.edate;
            this.maininfo['c-meetingtz-004'].value = "普通会议";
            this.maininfo['c-meetingtz-029'].value = "";
            this.maininfo['c-meetingtz-012'].value = "";
            this.maininfo['A0005'].value = "会议室预定";

            let newObj = {}
            Object.keys(this.maininfo).forEach((obj, index) => {
                newObj[obj] = {}
                newObj[obj].values = [{
                    "key": "value",
                    "value": this.maininfo[obj].value
                }]
            })

            //会议地点
            newObj["c-meetingtz-010"] = {}
            newObj["c-meetingtz-010"] = {
                "values": [{
                    "key": "text",
                    "value": this.form.room_data.name || ""
                }, {
                    "key": "value",
                    "value": this.form.room_data.id || ""
                }]
            }

            //会议主持
            newObj["c-meetingtz-011"] = {}
            newObj["c-meetingtz-011"] = {
                "values": [{
                    "key": "text",
                    "value": this.hyzc_list.str || ""
                }, {
                    "key": "value",
                    "value": this.hyzc_list.id || ""
                }]
            }

            //参会领导
            newObj["c-meetingtz-014"] = {}
            newObj["c-meetingtz-014"] = {
                "values": [{
                    "key": "text",
                    "value": this.chld_list.str || ""
                }, {
                    "key": "value",
                    "value": this.chld_list.id || ""
                }]
            }
            //参会部门
            newObj["c-meetingtz-043"] = {}
            newObj["c-meetingtz-043"] = {
                "values": [{
                    "key": "text",
                    "value": this.chdw_list.str || ""
                }, {
                    "key": "value",
                    "value": this.chdw_list.id ? this.chdw_list.id : ""
                }, {
                    "key": "schema",
                    "value": this.chdw_list.id || ""
                }]
            }
            //参会部门
            newObj["c-meetingtz-013"] = {}
            newObj["c-meetingtz-013"] = {
                "values": [{
                    "key": "text",
                    "value": this.chry_list.str || ""
                }, {
                    "key": "value",
                    "value": this.chry_list.id || ""
                }]
            }
            this.dataValue.bt = this.form.meeting
            // console.log(newObj['A0001'].value)
            let params = {
                moduleId: this.moduleId,
                // pk: newObj['A0001'][0].value,
                pk: this.info_id,
                formId: this.formId,
                __DATA: JSON.stringify({
                    maininfo: newObj
                })
                // __DATA: {
                //   "maininfo": JSON.stringify(newObj)
                // }
            }
            console.log(params)
            console.log(JSON.stringify(newObj))
            let that = this;
            dsf.http
                .post("/fn/xform/save", params)
                .then(function (data) {
                    if (data.data.code == 200) {
                        console.log(data)
                        if (num == 1) {
                            that.showPopup = true
                            that.showFlowSend = true;
                            that.$nextTick(() => {
                                that.$refs.sendFile.show();
                            })
                        }
                        if (callback) {
                            callback(data)
                        }
                    } else {
                        that.$toast.fail("保存失败," + data.data.message)
                        //that.$toast.clear()
                    }
                });
        },
        sendMeetingSq() {
            let that = this;
            dsf.http
                .get("fn/newMobileMeeting/sendMeetingSq", {
                    pk: this.info_id
                })
                .then(function (res) {
                    //that.$toast.success("通知发送成功")
                    //that.$router.go("-1")
                    console.log("通知发送成功")
                });
        },
        closeForm() {
            this.showFlowSend = false;
            this.showPopup = false
            // this.sendMeetingSq()前台不需要调用
        },
        getUserList() {
            // fn/xform/data?pk=200511112501nzdwnaz3P1uxylO61wC
            let that = this;
            dsf.http
                .get("/fn/xform/data?pk=&moduleId=" + this.moduleId, {})
                .then(function (res) {
                    console.log("===请求表单数据接口")
                    console.log(res.data.main)
                    that.maininfo = res.data.main;
                    that.info_id = res.data.main["A0001"].value
                    console.log(that.maininfo)

                    let flowUrl = "/fn/flow/getFlowDraftData";
                    dsf.http
                        .post(flowUrl, {
                            moduleId: that.moduleId,
                            flowId: ""
                        })
                        .then(function (data) {
                            if (data && data['data'].code == 200) {
                                let res = data['data'].data
                                that.dataValue.sendType = "SR_SEND"
                                that.dataValue.pid = res.pId
                                that.dataValue.pnid = res.pnId
                                that.dataValue.flowId = res.flowId
                                that.dataValue.moduleId = that.moduleId
                                that.dataValue.moduleName = "会议室申请"
                                that.dataValue.info_id = that.info_id
                            }
                        });
                });
        },
        formatter(type, val) {
            if (type === "year") {
                return `${val}年`;
            } else if (type === "month") {
                return `${val}月`;
            } else if (type === "day") {
                return `${val}日`;
            } else if (type === "hour") {
                return `${val}时`;
            } else if (type === "minute") {
                return `${val}分`;
            }
            return val;
        },
        tipsSetting() {
            // this.$router.push({
            //   name: 'TipsSetting'
            // })
            this.show = true
        },
        getData(data) {
            console.log(data)
            this.show = false;
            this.form.timetips = data;
        },
        cancePerson() {
            this.showPerson = false;
        },
        chooseStartTime() {
            if (this.form.isAllDay) {
                this.showStartTimePicker = false;
                this.showStartTimePicker1 = true;
            } else {
                this.showStartTimePicker1 = false;
                this.showStartTimePicker = true;
            }
        },
        chooseEndTime() {
            if (this.form.isAllDay) {
                this.showEndTimePicker = false;
                this.showEndTimePicker1 = true;
            } else {
                this.showEndTimePicker1 = false;
                this.showEndTimePicker = true;
            }
        },
        getUserNames(data) {
            var str = "";
            var id = "";
            data.forEach((obj, index) => {
                if (str == "") {
                    str = obj.name;
                    id = obj.id;
                } else {
                    str += "," + obj.name;
                    id += "," + obj.id;
                }
            });
            return {
                str,
                id
            };
        },
        getSelectUser(data) {
            console.log("我的", data);
            if (data && data.length > 0) {
                if (this.cur_index == 0) {
                    this.hyzc_list = this.getUserNames(data)
                    this.form.hyzc = this.hyzc_list.str
                } else if (this.cur_index == 1) {
                    this.chld_list = this.getUserNames(data)
                    this.form.chld = this.chld_list.str
                } else if (this.cur_index == 2) {
                    this.chdw_list = this.getUserNames(data)
                    this.form.chdw = this.chdw_list.str
                } else if (this.cur_index == 3) {
                    this.chry_list = this.getUserNames(data)
                    this.form.chry = this.chry_list.str
                }
            }
        },
        selectUser(index) {
            this.showPerson = true;
            this.cur_index = index
            this.meeting_type = this.cur_index == 2 ? 1 : 0
            index==2?this.meeting_type=3:""
            console.log("选人");
        },
        closePerson() {
            this.showPerson = !this.showPerson;
        },
        selectRoom() {
            console.log("选会议室")
            this.roomshow = true;
        },
        sureRoom(item) {
            this.form.room = item.name;
            this.form.room_data = item
            this.roomshow = false;
        },
        initData() {
            console.log(this.$route.query)
            this.form.room = this.$route.query.name
            this.form.room_data = {
                name: this.$route.query.name,
                id: this.$route.query.id
            }
        },
        postData() {
            let _loading = dsf.layer.loading();
            dsf.http.post('fn/meeting/meetingRoomJson', {
                date: this.$route.query.date
            }).done(res => {
                if (res.code + '' === '200') {
                    console.log(res.data)
                    this.postDataSuccess(res.data);
                }
            }).error(() => {
                dsf.layer.toast('请求异常');
            }).always(() => {
                dsf.layer.closeLoading(_loading);
            });
        },
        postDataSuccess(list) {
            console.log(list)
            this.meetingData = list;
        },
        //上传文件
        doFileRead(file, filetype) {
            let self = this;
            let url =
                "/fn/mobileAttachment/upload?fileId=&moduleId=" + this.moduleId + "&mid=" + this.moduleId +
                "&pId=0&pnId=0&nodeName=" + encodeURI("拟稿") + "&nrType=" + filetype + "&pk=" + this.info_id +
                "&newFileFlag=0";

            dsf.http
                .upload(url, {}, file)
                .then(function (data) {
                    console.log(data)
                    if(data.data.result){//上传成功
                        dsf.layer.toast('上传成功');
                        self.getWebFiles()
                    }else{
                        dsf.layer.toast(data.data.message);
                    }


                });
        },
        afterRead(file) {
            let that = this
            this.$toast.loading({
                message: '上传中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });
            this.onSubmit(function (obj) {
                that.doFileRead(file, 1)
            })

        },
        getWebFiles() {
            let params = {
                info_id: this.info_id,
                infoId: this.info_id,
                moduleId: this.moduleId,
                nodeId: "",
                start: 0,
                limit: 100
            }
            let that = this
            dsf.http
                .post("/fn/mobileAttachment/getFormAttachment", params)
                .then(function (data) {
                    console.log(data.data)
                    if (data && data.data && data.data.rows) {
                        data.data.rows.forEach((obj, index) => {
                            if (obj.attachType == '1') {
                                that.attach_1 = obj.document
                            }
                        })
                    }
                    that.$toast.clear()
                });
        },
        removeFile(item) {
            console.log(item)
            let params = {
                pk: item.infoId,
                fileId: item.id,
                moduleId: item.moduleId,
                mid: item.moduleId,
                nrType: item.type,
                fileName: item.title
            }
            let that = this
            dsf.http
                .post("/fn/mobileFileUpload/delete", params)
                .then(function (data) {
                    if(data.data.result){
                        dsf.layer.toast(data.data.message);
                        that.getWebFiles()
                    }

                });

        }
    },
}
</script>

<style lang="scss">
// @import "../../assets/font/font.css";
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.up {
    margin-top: 15px;
    overflow: auto;
    height: auto !important;
}

.ds-meeting-book {
    /*padding-top: 46px;*/
    color: #333;
    @include font_4();

    * {
        box-sizing: border-box;
    }

    textarea {
        width: 100%;
        height: 48px;
        line-height: 24px;
        text-align: right
    }

    .iconfont {
        font-size: 1.15em;
        color: #333 !important;
    }

    .van {
        &-nav-bar {
            z-index: 200;
        }

        &-cell {
            height: 52px;
            line-height: 32px;

            &.timetips {
                height: auto;
            }

            &:after {
                left: 0;
            }

            &-group {
                margin-top: 15px;
            }

            &__title {
                @include font_4();
                line-height: 32px;
                padding-left: 10px;
            }
        }

        &-icon {


            &-arrow-left {
                color: #333;
                font-weight: 600;
                font-size: 1.5em;
            }
        }

        &-field {
            &__control {}
        }

        &-switch {
            box-sizing: content-box;
        }
    }

    .meeting-textarea {
        flex-direction: column;
        height: auto;

        .van-field__label {
            position: absolute;
            left: 36px;
            top: 10px;
        }

        .van-cell__value {
            padding-left: 20px;
        }
    }

    .time-Range {
        display: flex;
        flex-direction: row;
        height: 68px;

        &-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 50%;
            height: 100%;
            text-align: center;
        }
    }

    .meeting-upload {
        flex-direction: column;
        height: auto;

        .van-field__label {
            position: absolute;
            left: 36px;
            top: 10px;
        }

        .van-cell__value {
            margin-top: 5px;
            padding-left: 20px;
        }

        .van-uploader__preview-image,
        .van-uploader__file,
        .van-uploader__upload {
            width: 48px;
            height: 48px;
            background-color: #eee;
            border-radius: 3px;
            border: 1px solid #eee;
        }
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 65px;
        background: #fff;
        padding: 0 15px;
        margin-top: 15px;

        .van-button {
            width: 100%;
            height: 48px;
            border-radius: 3px;
            font-size: var(--font_size_1);
            @include background-theme("normal");
        }
    }
}

.file-list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        width: 70%;
        overflow: hidden;
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 10px;
    }
}
</style>
