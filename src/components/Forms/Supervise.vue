<template>
<div class="receipt">
    <form-frame title="督办">
        <template slot="default">
            <van-form @submit="onSubmit">
                <van-field class="files" input-align="right" rows="2">
                    <template #label>
                        <span><label class="mast-input">*</label>督办标题：</span>
                    </template>
                    <template #input>
                        <textarea class="textr" style="text-align:left; height:72px !important;" v-model="title" maxlength="200" placeholder="请输入督办标题"></textarea>
                    </template>
                </van-field>
                <van-field readonly input-align="right" name="radio" right-icon="arrow" placeholder="请选择类型" @click="showDBtype=true" v-model="dbtype_name">
                    <template #label>
                        <span><label class="mast-input">*</label>督办类型：</span>
                    </template>
                </van-field>
                <van-popup :close-on-click-overlay='false' v-model="showDBtype" position="bottom" :style="{ height: '80%' }" round>
                    <div class="per_list">
                        <div class="p_list">
                            <p v-for="(item,index) in dbTypeList" :key="index" @click="doDBTypeSelect(index)">
                                <span :class="{active:item.checked}">{{item.name}}</span>
                                <van-icon v-if="item.checked" name="success" color="#1989fa" />
                            </p>
                        </div>
                    </div>
                </van-popup>
                <van-field class="files" input-align="right" placeholder="" label="督办要求：">
                    <template #input>
                        <textarea class="textr" style="text-align:left; height:72px !important;" v-model="dbyq" maxlength="200" placeholder="请输入督办要求"></textarea>
                    </template>
                </van-field>
                <van-field readonly input-align="right" v-model="zbbm" placeholder="请输入主办单位" @click="selectUser(0)" right-icon="arrow">
                    <template #label>
                        <span><label class="mast-input">*</label>主办单位：</span>
                    </template>
                </van-field>
                <van-field readonly input-align="right" v-model="xbbm" placeholder="请输入协办单位" @click="selectUser(1)" right-icon="arrow">
                    <template #label>
                        <span>协办单位：</span>
                    </template>
                </van-field>
                <van-field readonly input-align="right" name="radio" right-icon="arrow" placeholder="请选择紧急程度" @click="showJJCDtype=true" v-model="jjcd_name">
                    <template #label>
                        <span><label class="mast-input">*</label>紧急程度：</span>
                    </template>
                </van-field>
                <van-popup :close-on-click-overlay='false' v-model="showJJCDtype" position="bottom" :style="{ height: '80%' }" round>
                    <div class="per_list">
                        <div class="p_list">
                            <p v-for="(item,index) in jjcdTypeList" :key="index" @click="doJJCDTypeSelect(index)">
                                <span :class="{active:item.checked}">{{item.name}}</span>
                                <van-icon v-if="item.checked" name="success" color="#1989fa" />
                            </p>
                        </div>
                    </div>
                </van-popup>
                <van-field input-align="right" :value="blqx" readonly clickable name="calendar" placeholder="点击选择日期" @click="showCalendar=true">
                    <template #label>
                        <span><label class="mast-input">*</label>办理期限：</span>
                    </template>
                </van-field>
                <van-popup v-model="showCalendar" position="bottom" round>
                    <van-datetime-picker :min-date="minDate" :max-date="maxDate" :formatter="formatter" type="date" @confirm="onConfirmBlqx($event, 'startTime')" @cancel="showCalendar = false" />
                </van-popup>
                <van-field input-align="right" name="checkboxGroup" label="是否定期反馈：">
                    <template #input>
                        <van-radio-group v-model="sfdq" direction="horizontal">
                            <van-radio name="1">是</van-radio>
                            <van-radio name="0">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field input-align="right" :value="fkrq" readonly clickable name="calendar" label="下次反馈日期：" placeholder="点击选择日期" @click="showCalendar1=true" />
                <van-popup v-model="showCalendar1" position="bottom" round>
                    <van-datetime-picker :min-date="minDate" :max-date="maxDate" :formatter="formatter" type="date" @confirm="onConfirmFkrq($event, 'startTime')" @cancel="showCalendar1 = false" />
                </van-popup>

                <van-field readonly input-align="right" name="radio" right-icon="arrow" placeholder="请选择反馈周期" @click="showFKZQtype=true" v-model="fkzq_name">
                    <template #label>
                        <span>反馈周期：</span>
                    </template>
                </van-field>
                <van-popup :close-on-click-overlay='false' v-model="showFKZQtype" position="bottom" :style="{ height: '80%' }" round>
                    <div class="per_list">
                        <div class="p_list">
                            <p v-for="(item,index) in fkzqTypeList" :key="index" @click="doFKZQTypeSelect(index)">
                                <span :class="{active:item.checked}">{{item.name}}</span>
                                <van-icon v-if="item.checked" name="success" color="#1989fa" />
                            </p>
                        </div>
                    </div>
                </van-popup>
                <!-- <van-field input-align="right" name="stepper" label="办结提醒：">
                    <template #input>
                        <van-stepper min="0" v-model="bjtx" />
                    </template>
                </van-field>
                <van-field input-align="right" name="stepper" label="反馈提醒：">
                    <template #input>
                        <van-stepper min="0" v-model="fktx" />
                    </template>
                </van-field> -->
                <van-field input-align="right" name="uploader">
                    <template #label>
                        <span>附件：</span>
                    </template>
                    <template #input>
                        <div></div>
                    </template>
                    <template #right-icon>
                        <van-uploader class="upload-btn" :after-read="afterRead">
                            <van-icon class="iconfont iconjiahao" />
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
            </van-form>
        </template>
        <template slot="button">
            <div class="sendbtn" @click="doSend('',1)">提交</div>
        </template>
    </form-frame>

    <van-popup :close-on-click-overlay="false" v-model="showPerson" :style="{ height: '100%' }" position="bottom">
        <selectPerson v-if="showPerson" :extra="{tabs:[{key:'self_org'}]}" :type="meeting_type" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
    </van-popup>
    <!-- <van-popup :close-on-click-overlay='false' v-model="showPerson" position="bottom" :style="{ height: '80%' }">
        <div class="per_list">
            <div class="p_list">
                <p v-for="(item,index) in personList" :key="index" @click="doSelect(index)">
                    <span :class="{active:item.checked}">{{item.name}}</span>
                    <van-icon v-if="item.checked" name="success" color="#1989fa" />
                </p>
            </div>
            <div class="s_button">
                <van-button @click="showPerson=false" type="default">关闭</van-button>
                <van-button type="info" @click="submitPerson()">确定</van-button>
            </div>
        </div>
    </van-popup> -->
    <van-popup :get-container="getContainer" v-model="showPopup" :close-on-click-overlay="false" :style="{ height: '90%' }" lock-scroll position="bottom">
        <!-- 公文发送 -->
        <send-workflow v-if="showFlowSend" ref="sendFile" :form-data="dataValue" @close="showFlowSend = false;showPopup=false" @golist="onRefresh" />
    </van-popup>
</div>
</template>

<script>
import FormFrame from './FormFrame'
import DsButtonToolbox from '../documentCenter/DsfButtonToolbox';
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import sendWorkflow from "@/components/todoFile/sendFile.vue";
export default {
    name: 'Supervise',
    components: {
        FormFrame,
        DsButtonToolbox,
        selectPerson,
        sendWorkflow
    },
    data() {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 2);
        return {
            minDate: new Date(),
            maxDate,
            meeting_type: 3,
            showFlowSend: true,
            showPopup: false,
            showPerson: false,
            showCalendar: false,
            showCalendar1: false,
            text: "",
            value: '',
            radio: "",
            showPicker: false,
            checkboxGroup: [],
            stepper: 1,
            info_id: "",
            moduleId: "190323145209SuSc9CTjs9rg88i22T1",
            formId: "200829153408KvvMhdUexGMhAz7bFBC",
            maininfo: {},
            title: "",
            dbyq: "",
            zbbm: "",
            xbbm: "",
            dbtype: "0",
            dbtype_name: "会议决议",
            showDBtype: false,
            jjcd: "0",
            jjcd_name: "普通",
            showJJCDtype: false,
            sfdq: "0",
            bjtx: "0",
            fktx: "0",
            blqx: "",
            fkrq: "",
            fkzq: "0",
            fkzq_name: "周",
            showFKZQtype: false,
            buttons: {
                commonButton: [],
                mainButtons: [{
                    action: "send",
                    name: "保存"
                }]
            },
            attach_0: [],
            attach_1: [],
            doing: false,
            zbbm_user_date: {},
            xbbm_user_date: {},
            cur_index: 0,
            personList: [],
            zbbm_list: [],
            xbbm_list: [],
            current_list: [],
            dbTypeList: [{
                    value: "0",
                    name: "会议决议"
                },
                {
                    value: "1",
                    name: "党组会"
                },
                {
                    value: "2",
                    name: "领导批示"
                },
                {
                    value: "3",
                    name: "公文督办"
                }
            ],
            jjcdTypeList: [{
                    value: "0",
                    name: "普通"
                },
                {
                    value: "1",
                    name: "平急"
                },
                {
                    value: "2",
                    name: "加急"
                },
                {
                    value: "3",
                    name: "特急"
                }
            ],
            fkzqTypeList: [{
                    value: "0",
                    name: "周"
                },
                {
                    value: "1",
                    name: "月"
                },
                {
                    value: "2",
                    name: "季度"
                }
            ],
            dataValue: {

            }
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.initFormData()
        // this.getUserList()
        this.getPersonList()
        let info_id = this.$route.params.info_id
        if (info_id) {
            this.info_id = info_id
        }
    },
    destroyed() {},
    methods: {
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
        getContainer() {
            return document.body;
        },
        onRefresh() {
            this.$store.commit('refreshRouteByReg', ['/meetingCenter', '/todocenter', '/']);
            this.$router.go(-1);
        },
        getPersonList(param) {
            let that = this;
            let url = "fn/user/select/data";
            let postData = {
                action: "self_org",
                types: "org",
                rootObject: 2,
                async: false
            }
            dsf.http
                .post(url, postData)
                .then(function (result) {
                    if (result && result.data && result.data.data) {
                        let personList = result.data.data.departmentList[0].children
                        personList.forEach((obj, index) => {
                            obj.checked = false
                        })
                        that.personList = personList
                        console.log("人员选择控件", that.personList);
                    }
                }).finally(() => {

                })
        },
        cancePerson() {
            this.showPerson = false;
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
            if (data.length > 0) {
                if (this.cur_index == 0) {
                    this.zbbm_list = data
                    this.zbbm_user_date = this.getUserNames(data)
                    this.zbbm = this.zbbm_user_date.str
                } else {
                    this.xbbm_list = data
                    this.xbbm_user_date = this.getUserNames(data)
                    this.xbbm = this.xbbm_user_date.str
                }
            }
        },
        selectUser(index) {
            let that = this
            this.cur_index = index
            this.showPerson = true;
            this.personList.forEach((obj, index) => {
                obj.checked = false
                let data = []
                if (that.cur_index == 0) {
                    data = that.zbbm_list
                } else {
                    data = that.xbbm_list
                }
                data.forEach((o, i) => {
                    if (o.id == obj.id) {
                        obj.checked = true
                    }
                })
            })
        },
        submitPerson() {
            let data = []
            this.personList.forEach((obj, index) => {
                if (obj.checked) {
                    data.push(obj)
                }
            })
            this.getSelectUser(data)
            this.showPerson = false;
        },
        doSelect(index) {
            this.personList[index].checked = !this.personList[index].checked
            console.log(this.personList[index])
        },
        getUserList() {
            var that = this;
            dsf.http
                .get("/fn/xform/data?pk=200515045939bar84ZZlm59WX26Xeoc&moduleId=" + this.moduleId, {})
                .then(function (data) {
                    console.log(data)
                });

        },
        onClickLeft() {
            this.$router.go(-1)
        },
        onSubmit() {

        },
        onConfirmBlqx(time, name) {
            this.blqx = dsf.date.format(time, "yyyy-mm-dd");
            this.showCalendar = false;
        },
        onConfirmFkrq(time, name) {
            this.fkrq = dsf.date.format(time, "yyyy-mm-dd");
            this.showCalendar1 = false;
        },
        onConfirm(date) {
            this.blqx = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.showCalendar = false;
        },
        onConfirm1(date) {
            this.fkrq = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.showCalendar1 = false;
        },
        onConfirmJJCD(value) { //紧急程度
            this.jjcd = value;
            this.showPicker = false;
        },
        initFormData() {
            var that = this;
            let url = "/fn/xform/data?pk=&moduleId=" + this.moduleId
            if (this.info_id) {
                url = "/fn/xform/data?pk=" + this.info_id + "&moduleId=" + this.moduleId
            }
            dsf.http
                .get(url, {})
                .then(function (data) {
                    if (data && data.data && data.data.main) {
                        that.maininfo = data.data.main
                        that.info_id = that.maininfo['A0001'].value
                    }
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
                                that.dataValue.moduleName = "督办立项"
                                that.dataValue.info_id = that.info_id
                            }
                        });

                });

        },
        handleLeftClick(name) {
            // eslint-disable-next-line no-console
            console.log(name);
            if (name == "send") {
                this.doSend()
            }
        },
        doSend(callback, num) {
            if (this.doing) {
                return
            }
            this.doing = true
            this.maininfo["B0001"] = {}
            this.maininfo["C-DB-0020"] = {}
            this.maininfo["C-DB-0007"] = {}
            this.maininfo["C-DB-0001"] = {}
            this.maininfo["C-DB-0002"] = {}
            this.maininfo["B0006"] = {}
            this.maininfo["B0019"] = {}
            this.maininfo["C-DB-0014"] = {}
            this.maininfo["C-DB-0011"] = {}
            this.maininfo["C-DB-0031"] = {}
            this.maininfo["C-DB-0030"] = {}
            this.maininfo["C-DB-0006"] = {}
            this.maininfo['A0005'] = {};

            if (!this.title) {
                this.$toast.fail("请输入督办标题")
                this.doing = false
                return
            }
            if (!this.dbtype) {
                this.$toast.fail("请选择督办类型")
                this.doing = false
                return
            }
            if (!this.zbbm) {
                this.$toast.fail("请输入主办单位")
                this.doing = false
                return
            }
            if (!this.blqx) {
                this.$toast.fail("请选择办理期限")
                this.doing = false
                return
            }

            this.maininfo["B0001"].value = this.title

            this.maininfo["C-DB-0007"].value = this.dbyq
            this.maininfo["B0019"].value = this.blqx
            this.maininfo["C-DB-0014"].value = this.fkrq
            this.maininfo["C-DB-0011"].value = this.fkzq
            this.maininfo["C-DB-0031"].value = this.bjtx
            this.maininfo["C-DB-0030"].value = this.fktx
            this.maininfo["C-DB-0006"].value = "督办"
            this.maininfo["A0005"].value = "督办立项"

            let newObj = {}
            Object.keys(this.maininfo).forEach((obj, index) => {
                newObj[obj] = {
                    "values": [{
                        "key": "value",
                        "value": this.maininfo[obj].value
                    }]
                }
            })

            newObj["C-DB-0001"] = {}
            newObj["C-DB-0001"] = {
                "values": [{
                    "key": "text",
                    "value": this.zbbm_user_date.str || ""
                }, {
                    "key": "value",
                    "value": this.zbbm_user_date.id || ""
                }]
            }
            newObj["C-DB-0002"] = {}
            newObj["C-DB-0002"] = {
                "values": [{
                    "key": "text",
                    "value": this.xbbm_user_date.str || ""
                }, {
                    "key": "value",
                    "value": this.xbbm_user_date.id || ""
                }]
            }

            newObj["C-DB-0020"] = {}
            newObj["C-DB-0020"] = {
                "values": [{
                    "key": "text",
                    "value": this.dbtype || ""
                }, {
                    "key": "value",
                    "value": this.dbTypeList[this.dbtype].name || ""
                }]
            }

            newObj["C-DB-0020"] = {}
            newObj["C-DB-0020"] = {
                "values": [{
                    "key": "text",
                    "value": this.dbTypeList[this.dbtype].name || ""
                }, {
                    "key": "value",
                    "value": this.dbtype || 0
                }]
            }

            newObj["B0006"] = {}
            newObj["B0006"] = {
                "values": [{
                    "key": "text",
                    "value": this.jjcdTypeList[this.jjcd].name || ""
                }, {
                    "key": "value",
                    "value": this.jjcd || 0
                }]
            }

            this.maininfo["B0006"].value = this.jjcd

            for (var i = 1; i <= 39; i++) {
                let str = "A00" + (i < 10 ? '0' + i : i)
                if (!newObj[str]) {
                    newObj[str] = {}
                    newObj[str].values = [{
                        "key": "value",
                        "value": ""
                    }]
                }
            }

            let params = {
                moduleId: this.moduleId,
                pk: this.info_id,
                formId: this.formId,
                __DATA: JSON.stringify({
                    maininfo: newObj
                })
            }

            this.dataValue.bt = this.title
            console.log(JSON.stringify(this.dataValue))
            console.log(JSON.stringify(newObj))
            let that = this;
            dsf.http
                .post("/fn/xform/save", params)
                .then(function (data) {
                    that.doing = false
                    console.log(data)
                    if (data.data.code == 200) {
                        that.$toast.success("保存成功")
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

                    // that.$toast.clear()
                });
        },
        //上传文件
        doFileRead(file, filetype) {
            let self = this;
            let url =
                "/fn/mobileAttachment/upload?fileId=&moduleId=" + this.moduleId + "&mid=" + this.moduleId + "&pId=0&pnId=0&nodeName=" + encodeURI("拟稿") + "&nrType=" + filetype + "&pk=" + this.info_id + "&newFileFlag=0";

            dsf.http
                .upload(url, {}, file)
                .then(function (data) {
                    console.log(data)
                    self.getWebFiles()

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
            this.doSend(function (obj) {
                that.doFileRead(file, 1)
            })

        },
        getWebFiles() {
            let params = {
                info_id: this.info_id,
                infoId: this.info_id,
                moduleId: this.moduleId,
                mid: this.moduleId,
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
                            that.attach_1 = obj.document
                        })
                    }
                    that.$toast.clear()
                });
        },
        removeFile(item) {
            this.$toast.loading({
                message: '删除中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });
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
                    that.getWebFiles()
                });

        },
        doDBTypeSelect(index) {
            this.dbtype = index
            this.dbtype_name = this.dbTypeList[index].name
            this.showDBtype = false
        },
        doJJCDTypeSelect(index) {
            this.jjcd = index
            this.jjcd_name = this.jjcdTypeList[index].name
            this.showJJCDtype = false
        },
        doFKZQTypeSelect(index) {
            this.fkzq = index
            this.fkzq_name = this.fkzqTypeList[index].name
            this.showFKZQtype = false
        }
    },
}
</script>
