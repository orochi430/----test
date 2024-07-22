<template>
<div class="addTask">
    <van-nav-bar :title="$route.params.pk?'修改任务':'新建任务'" @click-left="goBack" v-if="isApp">
        <template #left>
            <van-icon name="arrow-left" />
        </template>
    </van-nav-bar>
    <div class="header" v-if="!isApp">
        <span>{{$route.params.pk?'修改任务':'新建任务'}}</span>
        <van-icon name="cross" @click="closeWindow" />
    </div>
    <div class="formData">
        <div class="task_title">
            <input spellcheck="false" type="text" placeholder="请输入任务名称" maxlength="50" v-model="formData['C-TASKMAN-TASK-0006'].value">
        </div>
        <div class="fileds">
            <div class="title required">负责人</div>
            <div class="right">
                <span class="text" v-if="formData['C-TASKMAN-TASK-0001'].text">{{formData['C-TASKMAN-TASK-0001'].text}}</span>
                <span class="btn" @click="show=true">更改</span>
            </div>
        </div>
        <div class="fileds">
            <div class="title">协同人</div>
            <div class="right">
                <span class="text" v-if="xietongText">{{xietongText}}</span>
                <span class="btn" @click="showXt=true">
                    <van-icon name="add-o" />
                    添加协同人
                </span>
            </div>
        </div>
        <div class="xietong">
            <div class="xt_top">
                <div class="pingjun" :class="{'active':average}" @click="doAverage">平均分配</div>
                <div class="tips" @click="showTip=true">
                    <span>任务权重分配</span>
                    <van-icon name="question-o" />
                </div>
            </div>
            <div class="xtList">
                <div v-for="(item,index) in xtUserList" :key="index" v-show="item.action!='Deleted'">
                    <span class="username">{{item.name}}（{{item.attrs.orgNameLV1Text}}）</span>
                    <van-stepper v-model="item.percent" min="0" max="10" :disabled="average" />
                    <van-icon name="cross" @click="removeUser(item,index)" />
                </div>
            </div>
        </div>
        <div class="fileds">
            <div class="title required">类型</div>
            <div class="types">
                <div :class="{'active':typeIndex==1}" @click="setType(1)">
                    <van-image src="./static/images/taskManager/icon1.png"></van-image>
                </div>
                <div :class="{'active':typeIndex==2}" @click="setType(2)">
                    <van-image src="./static/images/taskManager/icon2.png"></van-image>
                </div>
                <div :class="{'active':typeIndex==3}" @click="setType(3)">
                    <van-image src="./static/images/taskManager/icon3.png"></van-image>
                </div>
                <div :class="{'active':typeIndex==4}" @click="setType(4)">
                    <van-image src="./static/images/taskManager/icon4.png"></van-image>
                </div>
            </div>
        </div>
        <div class="fileds">
            <div class="title required">开始时间</div>
            <div class="timers">
                <div @click="showPickerStart=true">
                    <input spellcheck="false" type="text" readonly placeholder="开始时间" v-model="formData['C-TASKMAN-TASK-0009'].value">
                    <van-image src="./static/images/taskManager/timer.png"></van-image>
                </div>
            </div>
        </div>
        <div class="fileds">
            <div class="title required">结束时间</div>
            <div class="timers">
                <div @click="showPickerEnd=true">
                    <input spellcheck="false" type="text" readonly placeholder="结束时间" v-model="formData['C-TASKMAN-TASK-0010'].value">
                    <van-image src="./static/images/taskManager/timer.png"></van-image>
                </div>
            </div>
        </div>
        <div class="fileds">
            <div class="title">逾期提醒</div>
            <div class="right">
                <span class="text" v-if="formData['C-TASKMAN-TASK-0012'].text">
                    {{formData['C-TASKMAN-TASK-0012'].text}}
                </span>
                <span class="btn" @click="showRemind=true">
                    <van-icon name="add-o" />
                    添加提醒
                </span>
            </div>
        </div>
        <div class="fileds">
            <div class="title">任务描述</div>
            <div class="right">
                <input spellcheck="false" type="text" placeholder="请输入" maxlength="200" v-model="formData['C-TASKMAN-TASK-0011'].value">
            </div>
        </div>
        <div class="fileds fileds1">
            <div class="title">附件({{ fileList.length }})</div>
            <div class="right">
                <div class="files">
                    <div class="fileList">
                        <div v-for="(item,index) in fileList" :key="index">
                            <van-image :src="'./static/images/fileType/'+item.fileType+'.png'">
                                <template v-slot:error>
                                    <img :src="'./static/images/fileType/cloud.png'" />
                                </template>
                            </van-image>
                            <span>{{item.title}}</span>
                            <van-icon name="delete-o" @click="deleteFile(item,index)" />
                        </div>
                    </div>
                    <van-uploader :after-read="afterRead" :multiple="true" accept="*">
                        <span class="btn">
                            <van-icon name="add-o" />
                            添加附件
                        </span>
                    </van-uploader>
                </div>
            </div>
        </div>
        <div class="fileds_remark">
            <div class="title">
                <div class="title_text">我的备注(仅您自己可见)</div>
                <van-icon :class="{'active':showRemark}" name="arrow-up" @click="showRemark=!showRemark" />
            </div>
            <input spellcheck="false" v-show="showRemark" type="text" placeholder="请输入" maxlength="150" v-model="formData['C-TASKMAN-TASK-0014'].value">
        </div>
    </div>
    <div class="footerbtn">
        <van-button type="info" color="#1064CD" @click="saveData" size="small">确定</van-button>
    </div>
    <van-popup v-model="showPickerStart" round position="bottom">
        <van-datetime-picker v-model="start_timer" type="datetime" title="选择完整时间" @confirm="confirmStart" @cancel="cancelPopup" />
    </van-popup>
    <van-popup v-model="showPickerEnd" round position="bottom">
        <van-datetime-picker v-model="end_timer" type="datetime" title="选择完整时间" @confirm="confirmEnd" @cancel="cancelPopup" />
    </van-popup>
    <van-dialog v-model="showRemind" title="逾期提醒" @confirm="remindHandder">
        <div class="remList">
            <van-checkbox-group v-model="remindList">
                <van-checkbox :name="item.codeValue" v-for="(item,index) in remind" :key="item.id" @click="remindChange(item,index)">{{item.codeName}}</van-checkbox>
            </van-checkbox-group>
        </div>
    </van-dialog>
    <van-popup :get-container="getContainer" v-model="show" position="bottom" :style="{ height: '100%' }">
        <control-user-list :showBack="false" :metaId="zrrMetaData.metaId" :extra="zrrMetaData.extra" :selectType="0" @close="close" :default-select-array="zrrDefaultSelectArray" @getSelectUser="getSelectUserZrr" :topformMeta="topformMeta"></control-user-list>
    </van-popup>
    <van-popup :get-container="getContainer" v-model="showXt" position="bottom" :style="{ height: '100%' }">
        <control-user-list :showBack="false" v-if="showXt" :metaId="xtrMetaData.metaId" :extra="xtrMetaData.extra" :selectType="0" @close="close" :default-select-array="xtrDefaultSelectArray" @getSelectUser="getSelectUserXtr" :topformMeta="topformMeta"></control-user-list>
    </van-popup>
    <van-popup round v-model="showTip" class="tipdiog" :overlay="false">
        <div class="tian">
            <div class="pop_header">
                <span>协同人管理</span>
                <van-icon name="cross" @click="showTip=false" />
            </div>
            <div class="contains">
                <p>通过任务负责人设置执行权重、协同人设置个人进度、系统自动
                    计算任务总;进度三个步聚来实现任务可视化进度管理，从而高效助力
                    任务目标的达成。</p>
                <p class="tit">一、如何分配任务执行权重</p>
                <p>仅任务负麦人可以调整任务协同人的执行权重。系統默认所有协
                    同人的进度对任务总进度的影响是一致的，权重均是5，即同一任务下
                    所有协同人执行权重占比保持相同。任务负责人可根据协同人对任务
                    总进度的影响大小，调整协同人的权重。分为0-10一共11个档位，其
                    中0代表该协同人的推进进度对任务总进度无影响，10代表该协同人的
                    准进进度对任务总进度的影响最大。</p>
                <p class="tit">二、协同人标记个人推进进度数据</p>
                <p>协同人可根据实际进展，从0%-100%标记推进进度。</p>
                <p class="tit">三、系统自动计算任务总进度数据</p>
                <p>任务总进度=协同人1的进度*协同人1的权重占比＋协同人2的进度
                    *协同人2的权重占比+…十协同人n的进度*协同人n的权重占比。</p>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
/***
 * 1、通过moduleId调取getInfo接口获取表单初始化数据
 * 2、子表的基础数据在 struct=>subform=>230104141614cpP7QzEu7EOo9EVnjCV=>controls[0]=>defaultValue
 * 3、子表如果是添加 需要在子表基础数据上添加一个 "action":"Added"
 * 3、附件直接使用 attach-1  这里的数字 0 表示正文  1 是附件  默认就用1即可
 * 4、
 */
import {
    mapState
} from "vuex";
import controlUserList from "@/components/commonForm/controls/controlUserList";
import controlDateTime from "@/components/commonForm/controls/controlDateTime";
import $ from 'jquery'
export default {
    name: 'addTask',
    components: {
        controlUserList,
        controlDateTime
    },
    data() {
        return {
            showTip: false,
            showPickerStart: false,
            showPickerEnd: false,
            start_timer: new Date(),
            end_timer: new Date(),
            showRemark: true,
            showRemind: false,
            average: false,
            remindList: [],
            topformMeta: {},
            moduleId: "230103192045EncoYZoaQ9Zee0afJmh",
            listId: "230105153446TgUC3NjwR3polqywEQp",
            formId: "",
            pk: "",
            value: 5,
            typeIndex: 3,
            xtUserList: [],
            mainInfo: {}, //初始化数据之后得到的基本数据
            remind: [], //提醒数据源
            remindSourceList: [],
            taskType: [], //任务类型数据
            multinfos: {}, //子表数据，保存的时候的结构
            subform: {}, //子表数据，可通过初始化获得
            remindform: {}, //提醒子表数据，可通过初始化获得
            subFormPk: "230104141614cpP7QzEu7EOo9EVnjCV", //子表组件
            remindPk: "23011315492100HEvTzuBArvJJpPekU", //子表组件
            attaches: { //附件基础结构
                "attach-1": {
                    "rows": []
                }
            },
            remark: "",
            xietongText: "",
            fileList: [],
            formData: {
                "C-TASKMAN-TASK-0006": {
                    value: ""
                }, //任务名称
                "C-TASKMAN-TASK-0009": {
                    value: ""
                }, //开始时间
                "C-TASKMAN-TASK-0010": {
                    value: ""
                }, //结束时间
                "C-TASKMAN-TASK-0001": { //负责人
                    "value": "",
                    "text": "",
                    "schema": ""
                },
                "C-TASKMAN-TASK-0002": { //协同人
                    "value": "",
                    "text": "",
                    "schema": ""
                },
                "C-TASKMAN-TASK-0003": { //创建人
                    "value": "",
                    "text": "",
                    "schema": ""
                },
                "C-TASKMAN-TASK-0005": { //任务类型
                    value: "",
                    text: ""
                },
                "C-TASKMAN-TASK-0012": { //逾期提醒
                    value: "",
                    text: ""
                },
                "C-TASKMAN-TASK-0011": {
                    value: ""
                }, //任务描述
                "C-TASKMAN-TASK-0014": {
                    value: ""
                } //协同备注
            },
            show: false,
            showXt: false,
            zrrMetaData: {
                metaId: "",
                extra: {}
            },
            zrrDefaultSelectArray: [],
            xtrMetaData: {
                metaId: "",
                extra: {}
            },
            xtrDefaultSelectArray: [],
            usertext: {},
            isApp: false,
            user: dsf.util.loadSessionStore("user"),
            isIm: false,
            startMetaData: {},
            endMetaData: {}
        };
    },
    computed: {
        ...mapState({
            iframeHistory: (state) => state.iframeHistory
        })
    },
    watch: {},
    methods: {
        goBack() {
            if (window.native && window.native.isNative()) {
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
        getContainer() { //指定弹出窗口的挂载位置
            return document.body;
        },
        initUpdateForamData() {
            let that = this;
            dsf.http
                .get("/fn/xform/getInfo?listId=" + this.listId + "&validateByList=1&method=edit&pk=" + this.pk + "&moduleId=" + this.moduleId + "&timer=" + new Date().getTime(), {})
                .then(function (res) {
                    console.log(res)
                    if (res.data && res.data.data) {
                        that.topformMeta = res.data.struct
                        that.mainInfo = res.data.data.main
                        that.formId = res.data.struct.parameters.formId
                        that.subform = res.data.struct.subform[that.subFormPk].controls[0].defaultValue
                        that.remindform = res.data.struct.subform[that.remindPk].controls[0].defaultValue
                        //获取责任人人员选择控件基本信息
                        res.data.struct.controls.forEach(item => {
                            if (item.metaId == "C-TASKMAN-TASK-0001") {
                                that.zrrMetaData = item
                            }
                            if (item.metaId == "C-TASKMAN-TASK-0002") {
                                that.xtrMetaData = item
                            }
                            if (item.metaId == "C-TASKMAN-TASK-0009") {
                                that.startMetaData = item
                            }
                            if (item.metaId == "C-TASKMAN-TASK-0010") {
                                that.endMetaData = item
                            }
                        })

                        let result = res.data.data
                        if (result.attach && result.attach['attach-1']) {
                            let fileList = []
                            result.attach['attach-1'].forEach(item => {
                                fileList.push({
                                    ...item,
                                    title: item.fileName,
                                    fileType: item.fileName.split(".")[item.fileName.split(".").length - 1]
                                })
                            })
                            that.fileList = fileList
                        }
                        if (result.main) {
                            that.mainInfo = result.main
                            that.typeIndex = result.main["C-TASKMAN-TASK-0005"].value
                            that.start_timer = new Date(result.main["C-TASKMAN-TASK-0009"].value)
                            that.end_timer = new Date(result.main["C-TASKMAN-TASK-0010"].value)
                            that.setType(result.main["C-TASKMAN-TASK-0005"].value)

                            Object.keys(result.main).forEach(item => {
                                if (that.formData[item]) {
                                    that.formData[item] = result.main[item]
                                }
                            })
                            console.log(that.formData)

                            let newVal = result.main["C-TASKMAN-TASK-0001"]
                            let idArray = newVal.value.split(',')
                            let nameArray = newVal.text.split(',')
                            let schemaArray = newVal.schema ? newVal.schema.split(',') : ''
                            for (let i = 0; i < idArray.length; i++) {
                                if (idArray[i]) {
                                    that.zrrDefaultSelectArray.push({
                                        name: nameArray[i],
                                        showName: nameArray[i],
                                        id: idArray[i],
                                        pid: schemaArray[i] ? schemaArray[i].split('::')[1] : '',
                                        type: 1,
                                        checked: true,
                                        attrs: {
                                            orgNameLV1Text: nameArray[i],
                                            deptId: schemaArray[i] ? schemaArray[i].split('::')[1] : '',
                                            pidValue: schemaArray[i] ? schemaArray[i].split('::')[1] : '',
                                            idValue: idArray[i],
                                        }
                                    })
                                }
                            }
                            console.log(that.zrrDefaultSelectArray)
                        }

                        if (result.subform && result.subform[that.subFormPk]) {
                            let xietongText = ""
                            result.subform[that.subFormPk].forEach(item => {
                                let newVal = item["C-TASKINFO-COLLABORATE-0001"]
                                let idArray = newVal.value.split(',')
                                let nameArray = newVal.text.split(',')
                                let schemaArray = newVal.schema ? newVal.schema.split(',') : ''
                                //这里其实就只有一条 因为一个协同人就是一个数据
                                for (let i = 0; i < idArray.length; i++) {
                                    if (idArray[i]) {
                                        if (xietongText) {
                                            xietongText += ',' + nameArray[i]
                                        } else {
                                            xietongText = nameArray[i]
                                        }
                                        let obj = {
                                            name: nameArray[i],
                                            showName: nameArray[i],
                                            id: idArray[i],
                                            pid: schemaArray[i] ? schemaArray[i].split('::')[1] : '',
                                            type: 1,
                                            checked: true,
                                            attrs: {
                                                orgNameLV1Text: item["A0025"].value,
                                                deptId: item["A0017"].value,
                                                pidValue: item["A0017"].value,
                                                idValue: idArray[i],
                                            },
                                            action: "Updated",
                                            value: item[that.subFormPk].value,
                                            "C-TASKINFO-COLLABORATE-0006": {
                                                "values": [{
                                                    "key": "value",
                                                    "value": item["C-TASKINFO-COLLABORATE-0006"].value
                                                }, {
                                                    "key": "text",
                                                    "value": item["C-TASKINFO-COLLABORATE-0006"].text
                                                }]
                                            }
                                        }
                                        that.xtrDefaultSelectArray.push(obj)
                                        that.xtUserList.push({
                                            percent: item["C-TASKINFO-COLLABORATE-0004"].value,
                                            ...obj
                                        })
                                    }
                                }
                            })
                            that.xietongText = xietongText
                        }
                        if (result.subform && result.subform[that.remindPk]) {
                            let values = []
                            let texts = []
                            result.subform[that.remindPk].forEach(item => {
                                values.push(item["C-TASKMAN-REMIND-0001"].value)
                                texts.push(item["C-TASKMAN-REMIND-0001"].text)
                                that.remindSourceList.push({
                                    id: item[that.remindPk].value,
                                    action: "Updated",
                                    text: item["C-TASKMAN-REMIND-0001"].text,
                                    value: item["C-TASKMAN-REMIND-0001"].value,
                                    readText: item["C-TASKMAN-REMIND-0002"].text,
                                    readValue: item["C-TASKMAN-REMIND-0002"].value
                                })
                            })
                            debugger
                            that.remindList = values
                            that.$set(that.formData["C-TASKMAN-TASK-0012"], "value", values.join(","))
                            that.$set(that.formData["C-TASKMAN-TASK-0012"], "text", texts.join(","))
                        }

                    }
                });
        },
        initMainInfo() {
            let that = this
            dsf.http.get(`/fn/xform/getInfo?listId=${this.listId}&moduleId=${this.moduleId}&isEnterTodo=-1&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                if (res.data.data) {
                    let data = res.data.data
                    that.topformMeta = res.data.struct
                    that.mainInfo = data.main
                    that.pk = res.data.struct.parameters.pk
                    that.formId = res.data.struct.parameters.formId
                    that.subform = res.data.struct.subform[that.subFormPk].controls[0].defaultValue
                    that.remindform = res.data.struct.subform[that.remindPk].controls[0].defaultValue

                    //获取责任人人员选择控件基本信息
                    res.data.struct.controls.forEach(item => {
                        if (item.metaId == "C-TASKMAN-TASK-0001") {
                            that.zrrMetaData = item
                        }
                        if (item.metaId == "C-TASKMAN-TASK-0002") {
                            that.xtrMetaData = item
                        }
                        if (item.metaId == "C-TASKMAN-TASK-0005") {
                            // that.$set(that.formData["C-TASKMAN-TASK-0005"], "value", item.defaultValue.value)
                            // that.$set(that.formData["C-TASKMAN-TASK-0005"], "text", item.defaultValue.text)
                            that.setType(item.defaultValue.value)
                        }
                        if (item.metaId == "C-TASKMAN-TASK-0009") {
                            that.startMetaData = item
                        }
                        if (item.metaId == "C-TASKMAN-TASK-0010") {
                            that.endMetaData = item
                        }
                    })

                }
            })
        },
        initDataSource() { //初始化数据源
            let that = this
            //任务类型
            dsf.http.get(`/fn/codemanage/getCodeListByFId?fId=230104142110La7JQ4v2916ZAF6zHo8&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    that.taskType = res.data.data
                }
            })
            //逾期提醒
            dsf.http.get(`/fn/codemanage/getCodeListByFId?fId=230104142538xOGp2Q50ICw9Cp3oNsv&timer=` + new Date().getTime()).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    that.remind = res.data.data
                }
            })
        },
        confirmStart(val) {
            this.$set(this.formData['C-TASKMAN-TASK-0009'], "value", moment(new Date(val)).format("YYYY-MM-DD HH:mm"))
            this.showPickerStart = false
        },
        confirmEnd(val) {
            this.$set(this.formData['C-TASKMAN-TASK-0010'], "value", moment(new Date(val)).format("YYYY-MM-DD HH:mm"))
            this.showPickerEnd = false
        },
        setType(code) {
            this.typeIndex = code
            this.taskType.forEach(item => {
                if (item.codeValue == code) {
                    this.$set(this.formData["C-TASKMAN-TASK-0005"], "value", item.codeValue)
                    this.$set(this.formData["C-TASKMAN-TASK-0005"], "text", item.codeName)
                }
            })
        },
        cancelPopup() {
            this.showPickerStart = false
            this.showPickerEnd = false
        },
        checkReminExist(id) {
            return this.remind.findIndex(item => {
                return item.codeValue == id
            })
        },
        remindChange(item, index) {
            if (item.codeValue == "1" && this.remindList.includes("1")) {
                this.remindList = ["1"]
            } else {
                this.remindList = this.remindList.filter(obj => {
                    return obj != "1"
                })
            }
        },
        remindHandder() {
            let texts = []
            if (this.$route.params.pk) { //这里是修改
                this.remindSourceList.forEach(item => {
                    let isExit = this.remindList.some(obj => {
                        return obj == item.value
                    })
                    if (isExit) {
                        if (item.action != "Added") {
                            item.action = "Updated"
                        }
                    } else {
                        item.action = "Deleted"
                    }
                })

                this.remindList.forEach(item => {
                    let isExit = this.remindSourceList.some(obj => {
                        return obj.value == item
                    })
                    let index = this.remind.findIndex(obj => {
                        return obj.codeValue == item
                    })
                    if (!isExit) {
                        this.remindSourceList.push({
                            action: "Added",
                            text: this.remind[index].codeName,
                            value: item,
                            readText: "否",
                            readValue: "-1"
                        })
                    }
                    texts.push(this.remind[index].codeName)
                })

            } else {
                let remindSourceList = []
                this.remind.forEach(item => {
                    this.remindList.forEach(obj => {
                        if (obj == item.codeValue) {
                            texts.push(item.codeName)
                            remindSourceList.push({
                                action: "Added",
                                text: item.codeName,
                                value: obj,
                                readText: "否",
                                readValue: "-1"
                            })
                        }
                    })
                })
                this.remindSourceList = remindSourceList
            }
            console.log(this.remindSourceList)

            this.$set(this.formData["C-TASKMAN-TASK-0012"], "value", this.remindList.join(","))
            this.$set(this.formData["C-TASKMAN-TASK-0012"], "text", texts.join(","))
            console.log(this.formData["C-TASKMAN-TASK-0012"])
        },
        async afterRead(file) {
            this.$toast.loading({
                message: "上传中...",
                forbidClick: true,
                duration: 0,
                overlay: true,
            });
            if (!Array.isArray(file)) {
                file = [file]
            }

            let arr = []
            file.forEach(item => {
                arr.push(this.doFileRead(item))
            })

            let res = await Promise.all(arr);
            console.log(res)
            if (res.length == file.length) {
                dsf.layer.toast("上传成功！")
            } else {
                dsf.layer.toast("上传失败！")
            }
        },
        async doFileRead(file) {
            let self = this;
            return new Promise((resolve, reject) => {
                let url =
                    "/fn/mobileAttachment/upload?fileId=&moduleId=" +
                    this.moduleId +
                    "&mid=" +
                    this.moduleId +
                    `&pId=&pnId=&nodeName=` +
                    encodeURI("拟稿") +
                    "&nrType=1" +
                    "&pk=" +
                    this.pk +
                    "&mainPk=" +
                    "&newFileFlag=0";
                dsf.http.upload(url, {}, file).then(function (data) {
                    console.log("uploaded", data.data);
                    if (data.data.result) {
                        let uploadFile = data.data.data;
                        let obj = {
                            id: uploadFile.fileId,
                            title: uploadFile.fileName,
                            size: uploadFile.showFileSize || "",
                            infoId: self.pk,
                            moduleId: self.moduleId,
                            isHandwrite: -1,
                            canDelete: 1,
                            canDownLoad: 1,
                            canEdit: 1,
                            type: 1,
                            name: `附件${self.fileList.length + 1}`,
                            fileType: uploadFile.fileName.split(".")[uploadFile.fileName.split(".").length - 1]
                        };
                        obj.navtiveUrl = uploadFile.filePath;
                        self.fileList.push(obj)
                        console.log("fileData", obj);
                        resolve(true)
                    } else {
                        reject(false)
                    }
                });
            })

        },
        deleteFile(data, index) {
            console.log(data);
            let that = this
            dsf.layer.confirm({
                message: '是否确认删除',
                confirmButtonText: '确认'
            }, () => {
                let params = {
                    pk: this.pk,
                    fileId: data.id,
                    nrType: 1,
                    moduleId: this.moduleId,
                    fileName: data.title,
                    nodeName: "",
                    pnId: "",
                    pId: ""
                }
                dsf.http.post(`/fn/mobileFileUpload/delete`, params)
                    .then((res) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            that.fileList.splice(index, 1)
                            dsf.layer.toast(res.data.message);
                        } else {
                            dsf.layer.toast(res.data.message);
                        }
                    });
            })
        },
        close(isShow) {
            this.show = isShow;
        },
        getSelectUserZrr(selectArr) {
            console.log(selectArr);
            let obj = {}
            selectArr.forEach(item => {
                obj = {
                    name: item.name,
                    showName: item.showName,
                    id: item.id.replace("person_", ""),
                    pid: item.pid,
                    type: 1,
                    checked: true,
                    attrs: {
                        orgNameLV1Text: item.attrs.orgNameLV1Text,
                        deptId: item.attrs.deptId,
                        pidValue: item.attrs.pidValue,
                        idValue: item.attrs.idValue,
                    }
                }
                this.$set(this.formData["C-TASKMAN-TASK-0001"], "value", item.id.replace("person_", ""))
                this.$set(this.formData["C-TASKMAN-TASK-0001"], "text", item.name)
                this.$set(this.formData["C-TASKMAN-TASK-0001"], "schema", "1::" + item.pid)
            })
            console.log(JSON.stringify(obj))
            this.zrrDefaultSelectArray = [obj]
            this.show = false
        },
        initRespons() {
            //初始化责任人数据
            let user = dsf.util.loadSessionStore("user");
            console.log(user)
            this.zrrDefaultSelectArray = [{
                name: user.name,
                showName: user.name,
                id: user.user_id.replace("person_", ""),
                pid: user.deptId,
                type: 1,
                checked: true,
                attrs: {
                    orgNameLV1Text: user.deptName,
                    deptId: user.deptId,
                    pidValue: user.deptId,
                    idValue: user.user_id.replace("person_", "")
                }
            }]
            this.$set(this.formData["C-TASKMAN-TASK-0001"], "value", user.user_id.replace("person_", ""))
            this.$set(this.formData["C-TASKMAN-TASK-0001"], "text", user.name)
            this.$set(this.formData["C-TASKMAN-TASK-0001"], "schema", "1::" + user.deptId)

            //初始化协同人数据
            this.xtrDefaultSelectArray = [{
                name: user.name,
                showName: user.name,
                id: user.user_id.replace("person_", ""),
                pid: user.deptId,
                type: 1,
                checked: true,
                attrs: {
                    orgNameLV1Text: user.deptName,
                    deptId: user.deptId,
                    pidValue: user.deptId,
                    idValue: user.user_id.replace("person_", "")
                }
            }]
            this.xtUserList = [{
                name: user.name,
                showName: user.name,
                id: user.user_id.replace("person_", ""),
                pid: user.deptId,
                type: 1,
                checked: true,
                attrs: {
                    orgNameLV1Text: user.deptName,
                    deptId: user.deptId,
                    pidValue: user.deptId,
                    idValue: user.user_id.replace("person_", "")
                },
                percent: 5,
                action: "Added",
                value: ""
            }]
            this.xietongText = user.name
        },
        checkUserExit(id) {

        },
        getSelectUserXtr(selectArr) {
            /*
             * 1、如果是新建的话 这里直接重新置空再赋值即可
             * 2、如果这里是编辑
             * 2.1 先循环selectArr 将xtUserList中不在selectArr的人全部action制成 Deleted  在里面的人制成 Updated  新增的人添加进去
             */
            if (this.$route.params.pk) { //这里是修改
                this.xtrDefaultSelectArray = []
                let names = ""
                //将xtUserList中不在selectArr的人全部action制成 Deleted
                this.xtUserList.forEach(item => {
                    let isExit = selectArr.some(obj => {
                        return obj.id == item.id
                    })
                    if (isExit) {
                        if (item.action != "Added") {
                            item.action = "Updated"
                        }
                    } else {
                        item.action = "Deleted"
                    }
                })
                //将selectArr中多出来的人添加到xtUserList
                selectArr.forEach(item => {
                    let id = item.id.replace("person_", "")
                    let obj = {
                        name: item.name,
                        showName: item.showName,
                        id: id,
                        pid: item.pid,
                        type: 1,
                        checked: true,
                        attrs: {
                            orgNameLV1Text: item.attrs.orgNameLV1Text || item.attrs.orgNameLV1Text,
                            deptId: item.attrs.deptId,
                            pidValue: item.attrs.pidValue,
                            idValue: item.attrs.idValue,
                        },
                    }
                    this.xtrDefaultSelectArray.push(obj)
                    let isExit = this.xtUserList.some(user => {
                        return user.id == item.id
                    })
                    if (!isExit) {
                        this.xtUserList.push({
                            percent: 5,
                            ...item,
                            action: "Added",
                            value: ""
                        })
                    }

                    if (!names) {
                        names = item.name
                    } else {
                        names += "," + item.name
                    }
                })

                this.xietongText = names

            } else {
                this.xtUserList = []
                this.xtrDefaultSelectArray = []
                let names = ""
                selectArr.forEach((item, index) => {
                    let id = item.id.replace("person_", "")
                    let obj = {
                        name: item.name,
                        showName: item.showName,
                        id: id,
                        pid: item.pid,
                        type: 1,
                        checked: true,
                        attrs: {
                            orgNameLV1Text: item.attrs.orgNameLV1Text || item.attrs.orgNameLV1Text,
                            deptId: item.attrs.deptId,
                            pidValue: item.attrs.pidValue,
                            idValue: item.attrs.idValue,
                        },
                    }
                    this.xtUserList.push({
                        percent: 5,
                        ...item,
                        action: "Added",
                        value: ""
                    })
                    this.xtrDefaultSelectArray.push(obj)

                    if (!names) {
                        names = item.name
                    } else {
                        names += "," + item.name
                    }
                })
                this.xietongText = names
            }

            this.showXt = false
        },
        removeUser(item, index) {
            if (this.$route.params.pk) {
                this.$set(this.xtUserList[index], "action", "Deleted")
            } else {
                this.xtUserList.splice(index, 1)
            }

            this.xtrDefaultSelectArray.splice(index, 1)
            let arr = this.xietongText.split(",").filter(obj => {
                return obj != item.name
            })
            this.xietongText = arr.join(",")

        },
        doAverage() {
            this.average = !this.average
            this.xtUserList.forEach((item, index) => {
                if (this.average) {
                    this.$set(item, "percent", 5)
                }
            })
        },
        getXtUserSource() {
            let that = this
            let subformStruct = {
                "C-TASKINFO-COLLABORATE-0001": {},
                "C-TASKINFO-COLLABORATE-0004": {
                    "values": [{
                        "key": "value",
                        "value": "0"
                    }]
                },
                "C-TASKINFO-COLLABORATE-0008": {
                    "values": [{
                        "key": "value",
                        "value": "1"
                    }]
                }
            }
            Object.keys(this.subform).forEach(item => {
                if (item == this.subFormPk) {
                    subformStruct[item] = {
                        "values": [{
                                "key": "foreign",
                                "value": this.subform[item].foreign
                            },
                            {
                                "key": "value",
                                "value": ""
                            }
                        ]
                    }
                } else {
                    subformStruct[item] = {
                        "values": [{
                            "key": "value",
                            "value": this.subform[item].value
                        }]
                    }

                }
            })

            let multinfos = {
                [this.subFormPk]: {
                    "rows": []
                }
            }

            return new Promise((resolve, reject) => {
                let postdata = {
                    size: this.xtUserList.length,
                    multiple: true
                };
                dsf.http.get("fn/common/generateUUID?timer=" + new Date().getTime(), postdata).then(({
                    data
                }) => {
                    let uuidArray = data.data.UUID;
                    let ids = ""
                    let text = ""
                    let schema = ""

                    this.xtUserList.forEach((item, index) => {
                        let obj = JSON.parse(JSON.stringify(subformStruct))
                        if (item.action == "Added") {
                            obj[this.subFormPk].values[1].value = uuidArray[index]
                            obj["C-TASKINFO-COLLABORATE-0006"] = {
                                "values": [{
                                        "key": "value",
                                        "value": "1"
                                    },
                                    {
                                        "key": "text",
                                        "value": "未查看"
                                    }
                                ]
                            }
                        } else {
                            obj[this.subFormPk].values[1].value = item.value
                            obj["C-TASKINFO-COLLABORATE-0006"] = item["C-TASKINFO-COLLABORATE-0006"]
                        }
                        console.log(uuidArray[index])
                        obj["C-TASKINFO-COLLABORATE-0004"].values[0].value = item.percent
                        obj["C-TASKINFO-COLLABORATE-0001"] = {
                            "values": [{
                                "key": "value",
                                "value": item.id
                            }, {
                                "key": "text",
                                "value": item.name
                            }, {
                                "key": "schema",
                                "value": "1::" + item.pid
                            }]
                        }
                        obj["C-TASKINFO-COLLABORATE-0002"] = {
                            "values": [{
                                "key": "text",
                                "value": item.attrs.orgNameLV1Text
                            }]
                        }
                        obj["action"] = item.action
                        multinfos[this.subFormPk].rows.push(obj)
                        console.log(obj["C-TASKINFO-COLLABORATE-0006"])
                        if (obj["action"] != 'Deleted') {
                            if (ids == "") {
                                ids = item.id
                                text = item.name
                                schema = "1::" + item.pid
                            } else {
                                ids += "," + item.id
                                text += "," + item.name
                                schema += ",1::" + item.pid
                            }
                        }
                    });
                    this.$set(this.formData["C-TASKMAN-TASK-0002"], "value", ids)
                    this.$set(this.formData["C-TASKMAN-TASK-0002"], "text", text)
                    this.$set(this.formData["C-TASKMAN-TASK-0002"], "schema", schema)
                    resolve(multinfos)
                })
            })
        },
        getRemindSource() {
            let that = this
            let subformStruct = {}
            Object.keys(this.remindform).forEach(item => {
                if (item == this.remindPk) {
                    subformStruct[item] = {
                        "values": [{
                                "key": "foreign",
                                "value": this.remindform[item].foreign
                            },
                            {
                                "key": "value",
                                "value": ""
                            }
                        ]
                    }
                } else {
                    subformStruct[item] = {
                        "values": [{
                            "key": "value",
                            "value": this.remindform[item].value
                        }]
                    }

                }
            })

            let multinfos = {
                [this.remindPk]: {
                    "rows": []
                }
            }

            return new Promise((resolve, reject) => {
                let postdata = {
                    size: this.remindSourceList.length,
                    multiple: true
                };
                dsf.http.get("/fn/common/generateUUID?timer=" + new Date().getTime(), postdata).then(({
                    data
                }) => {
                    let uuidArray = data.data.UUID;
                    this.remindSourceList.forEach((item, index) => {
                        let obj = JSON.parse(JSON.stringify(subformStruct))
                        obj["C-TASKMAN-REMIND-0001"] = {
                            "values": [{
                                "key": "value",
                                "value": item.value
                            }, {
                                "key": "text",
                                "value": item.text
                            }]
                        }
                        obj["C-TASKMAN-REMIND-0002"] = {
                            "values": [{
                                "key": "value",
                                "value": item.readValue
                            }, {
                                "key": "text",
                                "value": item.readText
                            }]
                        }
                        obj.action = item.action
                        if (item.action == "Added") {
                            obj[this.remindPk].values[1].value = uuidArray[index]
                        } else {
                            obj[this.remindPk].values[1].value = item.id
                        }
                        multinfos[this.remindPk].rows.push(obj)

                    });
                    resolve(multinfos)
                })
            })
        },
        async saveData() {
            let that = this
            if (!this.formData["C-TASKMAN-TASK-0006"].value) {
                this.$toast.fail('请输入任务名称');
                return
            }
            if (!this.formData["C-TASKMAN-TASK-0009"].value) {
                this.$toast.fail('请选择开始时间');
                return
            }
            if (!this.formData["C-TASKMAN-TASK-0010"].value) {
                this.$toast.fail('请选择结束时间');
                return
            }

            if (new Date(this.formData["C-TASKMAN-TASK-0009"].value).getTime() >= new Date(this.formData["C-TASKMAN-TASK-0010"].value).getTime()) {
                this.$toast.fail('结束时间必须大于开始时间');
                return
            }

            let multinfos = await this.getXtUserSource()
            let remindinfos = await this.getRemindSource()
            multinfos = Object.assign(multinfos, remindinfos)
            console.log(multinfos)

            let mainInfo = Object.assign(this.mainInfo, this.formData)
            console.log(mainInfo)

            let mainData = {}
            Object.keys(mainInfo).forEach(item => {
                mainData[item] = {
                    "values": []
                }
                Object.keys(mainInfo[item]).forEach(obj => {
                    mainData[item].values.push({
                        "key": obj,
                        "value": mainInfo[item][obj]
                    })
                })
            })

            let formData = {
                "moduleId": this.moduleId,
                "formId": this.formId,
                "pk": this.pk,
                "__DATA": JSON.stringify({
                    "maininfo": mainData,
                    "multinfos": multinfos
                })
            }
            this.$toast.loading({
                message: "保存中...",
                forbidClick: true,
                duration: 0,
                overlay: true
            });
            dsf.http
                .post("/fn/xform/save", formData)
                .then(function (data) {
                    if (data.data.type == "success") {
                        //that.$toast.success("保存成功");
                        that.saveRemark()
                    } else {
                        that.$toast.fail("保存失败");

                    }
                });
            console.log(formData)
        },
        saveRemark() {
            let that = this
            dsf.http
                .post("/fn//taskman/collaborate/saveRemark", {
                    taskId: this.pk,
                    remark: this.formData["C-TASKMAN-TASK-0014"].value
                })
                .then(function (data) {
                    if (data.data.type == "success") {
                        that.$eventBus.refresh(that)
                        that.$toast.success("保存成功");
                        setTimeout(() => {
                            if (that.isApp) {
                                if (window.native && window.native.isNative()) {
                                    window.native.back()
                                } else {
                                    that.goBack()
                                }
                            } else {
                                that.closeWindow()
                            }
                        }, 1500)
                    } else {
                        that.$toast.fail("保存失败");
                    }
                });
        },
        closeWindow() {
            if (window.native) {
                window.native.hidePanel()
            } else {
                if (window.top.closeLastTaskLayer) {
                    window.top.closeLastTaskLayer()
                } else if (window.top.layer) {
                    var index = top.layer.getFrameIndex(window.name);
                    top.layer && top.layer.close(index);
                } else {
                    //chrome中关闭
                    this.goBack()
                }
            }
        }
    },
    created() {
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
        this.initDataSource(); //初始化数据源
        if (this.$route.params.pk) {
            this.pk = this.$route.params.pk;
            this.initUpdateForamData()
        } else {
            this.initRespons(); //初始化责任人数据

            //设置默认的创建人
            this.$set(this.formData["C-TASKMAN-TASK-0003"], "value", this.user.user_id)
            this.$set(this.formData["C-TASKMAN-TASK-0003"], "text", this.user.name)
            this.$set(this.formData["C-TASKMAN-TASK-0003"], "schema", "1::" + this.user.deptId)

            //设置逾期提醒
            this.$set(this.formData["C-TASKMAN-TASK-0012"], "text", "任务截止时,截止前1小时,截止前1天")
            this.$set(this.formData["C-TASKMAN-TASK-0012"], "value", "2,7,9")
            this.remindSourceList = [{
                    text: "任务截止时",
                    value: "2",
                    action: "Added",
                    readText: "否",
                    readValue: "-1"
                },
                {
                    text: "截止前1小时",
                    value: "7",
                    action: "Added",
                    readText: "否",
                    readValue: "-1"
                },
                {
                    text: "截止前1天",
                    value: "9",
                    action: "Added",
                    readText: "否",
                    readValue: "-1"
                }
            ]

            this.remindList = ["2", "7", "9"]

            if (this.$route.params.title && this.$route.params.title != 'null') {
                let data = JSON.parse(decodeURIComponent(this.$route.params.title))
                this.$set(this.formData["C-TASKMAN-TASK-0006"], "value", data.text)
            }
            this.initMainInfo(); //初始化基础结构数据
        }
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.addTask {
    width: 100%;
    height: 100%;
    background: #FFF;
    overflow: hidden;

    ::v-deep .van-nav-bar__title {
        font-weight: bolder;
        font-size: var(--font_size_3);
    }

    ::v-deep .van-icon-arrow-left {
        font-size: var(--font_size_3);
        color: #666;
    }

    .header {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1PX solid #ebebeb;
        align-items: center;

        &>span {
            font-size: var(--font_size_3);
            color: #333333;
        }

        &>.van-icon {
            font-size: var(--font_size_3);
            color: #999999;
            cursor: pointer;
        }
    }

    .formData {
        width: 100%;
        height: calc(100vh - 50px);
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0 20px 50px 20px;

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

        .task_title {
            width: 100%;
            height: 50px;
            margin-top: 10px;

            input {
                height: 40px;
                background: #F8F8F8;
                border: 1px solid rgba(241, 242, 243, 1);
                border-radius: 8px;
                width: 100%;
                resize: none;
                outline: none;
                font-size: var(--font_size_3);
                color: #333;
                box-sizing: border-box;
                padding: 0 10px;
            }
        }

        .fileds {
            width: 100%;
            min-height: 50px;
            border-bottom: 1PX solid rgba(245, 245, 245, 1);
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title {
                width: 70px;
                display: flex;
                align-items: center;
                font-size: var(--font_size_3);
                color: #999999;
                flex-shrink: 0;
                justify-content: flex-start;
                line-height: 26px;

                &.required::before {
                    content: '*';
                    font-size: var(--font_size_3);
                    color: #E02020;
                    margin-top: 5px;
                }
            }

            .right {
                flex: 1;
                margin-left: 15px;
                display: flex;
                align-items: center;
                overflow: hidden;

                .text {
                    font-size: var(--font_size_3);
                    color: #333;
                    margin-right: 20px;
                    line-height: 26px;
                }

                .btn {
                    font-size: var(--font_size_3);
                    color: #1064CD;
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    cursor: pointer;

                    .van-icon {
                        font-size: var(--font_size_3);
                        color: #1064CD;
                        margin-right: 10px;
                        margin-top: 3px;
                    }
                }

                input {
                    height: 40px;
                    background: #F8F8F8;
                    border: 1px solid rgba(241, 242, 243, 1);
                    border-radius: 8px;
                    width: 100%;
                    resize: none;
                    outline: none;
                    font-size: var(--font_size_3);
                    color: #333;
                    box-sizing: border-box;
                    padding: 0 10px;
                }

                .files {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                    align-items: flex-start;

                    .fileList {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;

                        &>div {
                            display: flex;
                            align-items: center;
                            height: 50px;

                            &>span {
                                font-size: var(--font_size_3);
                                color: #333333;
                                flex: 1;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }

                            .van-image {
                                width: 12px;
                                height: 14px;
                                margin-right: 10px;
                            }

                            .van-icon {
                                font-size: var(--font_size_4);
                                color: #1064CD;
                                margin-left: 15px;
                            }
                        }
                    }
                }
            }

            &.fileds1 {
                align-items: flex-start;

                .title {
                    line-height: 50px;
                }

                .btn {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 20px;
                }
            }

            .types {
                width: 100%;
                height: 56px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding-left: 15px;

                &>div {
                    width: 30px;
                    height: 30px;
                    background: #FFFFFF;
                    border-radius: 4px;
                    border: 1PX solid rgba(241, 242, 243, 1);
                    position: relative;
                    font-size: var(--font_size_4);
                    color: #333;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-right: 15px;
                    cursor: pointer;

                    .van-image {
                        width: 18px;
                        height: 18px;
                    }

                    &.active {
                        border: 1PX solid rgba(16, 100, 205, 1);
                        color: #1064CD;

                        &::before {
                            width: 20px;
                            height: 20px;
                            content: '';
                            background: #1064CD;
                            transform: rotate(-45deg);
                            position: absolute;
                            right: -10px;
                            top: -10px;
                            z-index: 1;
                        }

                        &::after {
                            content: '✔';
                            color: #FFF;
                            font-size: 10px;
                            position: absolute;
                            right: -3px;
                            top: -4px;
                            z-index: 2;
                            transform: scale(0.8) rotate(30deg);
                        }
                    }
                }
            }

            .timers {
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding-left: 15px;
                flex: 1;

                &>div {
                    flex: 1;
                    height: 40px;
                    background: #F8F8F8;
                    border: 1px solid rgba(241, 242, 243, 1);
                    border-radius: 8px;
                    box-sizing: border-box;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    overflow: hidden;

                    input {
                        font-size: var(--font_size_3);
                        color: #333;
                        background: none;
                        height: 40px;
                        width: 100%;
                    }

                    .van-image {
                        width: 12px;
                        height: 12px;
                    }
                }

                &>span {
                    font-size: var(--font_size_3);
                    color: #999999;
                    margin: 0 20px;
                    flex-shrink: 0;
                }
            }
        }

        .xietong {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin-top: 15px;

            .xt_top {
                display: flex;
                align-items: center;

                .pingjun {
                    width: 85px;
                    height: 30px;
                    background: #FFFFFF;
                    border-radius: 4px;
                    border: 1PX solid rgba(241, 242, 243, 1);
                    position: relative;
                    font-size: var(--font_size_4);
                    color: #333;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    cursor: pointer;

                    &.active {
                        border: 1PX solid rgba(16, 100, 205, 1);
                        color: #1064CD;

                        &::before {
                            width: 20px;
                            height: 20px;
                            content: '';
                            background: #1064CD;
                            transform: rotate(-45deg);
                            position: absolute;
                            right: -10px;
                            top: -10px;
                            z-index: 1;
                        }

                        &::after {
                            content: '✔';
                            color: #FFF;
                            font-size: 10px;
                            position: absolute;
                            right: -3px;
                            top: -4px;
                            z-index: 2;
                            transform: scale(0.8) rotate(30deg);
                        }
                    }
                }

                .tips {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                    cursor: pointer;

                    .van-icon {
                        font-size: var(--font_size_3);
                        color: #999999;
                    }

                    span {
                        font-size: var(--font_size_4);
                        color: #999999;
                        margin-right: 5px;
                    }
                }
            }

            .xtList {
                display: flex;
                flex-direction: column;

                &>div {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .username {
                        flex: 1;
                        height: 30px;
                        background: #F8F8F8;
                        border: 1px solid rgba(241, 242, 243, 1);
                        border-radius: 4px;
                        font-size: var(--font_size_4);
                        color: #333333;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        padding: 0 8px;
                    }

                    .van-stepper {
                        flex-shrink: 0;
                        margin-left: 20px;
                    }

                    .van-icon {
                        font-size: var(--font_size_3);
                        color: #999;
                        margin-left: 20px;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .fileds_remark {
        width: 100%;
        margin-bottom: 50px;

        .title {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title_text {
                font-size: var(--font_size_3);
                color: #999999;
            }

            .van-icon {
                font-size: var(--font_size_3);
                color: #999999;
                transform: rotate(90deg);
                transition: all linear .2s;
                cursor: pointer;

                &.active {
                    transform: rotate(180deg);
                    transition: all linear .2s;
                }
            }
        }

        input {
            height: 40px;
            background: #F8F8F8;
            border: 1px solid rgba(241, 242, 243, 1);
            border-radius: 8px;
            width: 100%;
            resize: none;
            outline: none;
            font-size: var(--font_size_3);
            color: #333;
            box-sizing: border-box;
            padding: 0 10px;
        }
    }

    .footerbtn {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFF;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 50px;
        border-top: 1PX solid #ebebeb;
    }
}

.remList {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px;

    .van-checkbox {
        margin-top: 10px;
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
            height: 50px;
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

        .contains {
            width: 100%;
            flex: 1;
            box-sizing: border-box;
            padding: 15px;
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
</style>
