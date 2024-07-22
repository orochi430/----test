<template>
<div class="receipt">
    <form-frame title="意见回执">
        <template slot="default">
            <van-form @submit="onSubmit">
                <van-field input-align="right" v-model="title" placeholder="请输入签发人">
                    <template #label>
                        <span><label class="mast-input">* </label>签发人：</span>
                    </template>
                </van-field>
                <van-field input-align="right" :value="qftime" readonly clickable name="calendar" placeholder="请选择日期" @click="showCalendar=true">
                    <template #label>
                        <span><label class="mast-input">* </label>签发时间：</span>
                    </template>
                </van-field>
                <van-calendar v-model="showCalendar" @confirm="onConfirm" first-day-of-week="1"/>
                <van-field input-align="right" type="textarea" rows="5" v-model="opinion" placeholder="请输入意见">
                    <template #label>
                        <span><label class="mast-input">* </label>意见</span>
                    </template>
                    <!-- <template #input>
                        <textarea class="" rows="5" placeholder="请输入意见" v-model="opinion" maxlength="500"></textarea>
                    </template> -->
                </van-field>
                <van-field name="uploader">
                    <template #label>
                        <span><label class="mast-input"></label>附件：</span>
                    </template>
                    <template #input>
                        <div class="dofile" style="width:100%">
                            <div class="upload-files">
                                <div class="file-list" v-for="(item,index) in attach_1" :key="index">
                                    <i class="iconfont iconfile"></i>
                                    <span>{{item.title}}</span>
                                    <van-icon name="clear" @click="removeFile(item)" />
                                </div>
                            </div>
                            <van-uploader class="upload-btn" :after-read="afterRead" accept=".jpg, .gif, .png, .jpeg, .txt, .pdf, .doc, .docx, .xls, .xlsx">
                                <span class="add-file">
                                    <van-icon name="plus" /></span>
                            </van-uploader>
                        </div>
                    </template>
                </van-field>
            </van-form>
        </template>
        <template slot="button">
            <div class="sendbtn" @click="doSend('',1)">提交</div>
        </template>
    </form-frame>
</div>
</template>

<script>
import FormFrame from '../Forms/FormFrame'
import DsButtonToolbox from '../documentCenter/DsfButtonToolbox';
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
export default {
    name: 'OpinionReceipt',
    components: {
        FormFrame,
        DsButtonToolbox,
        selectPerson
    },
    data() {
        return {
            showCalendar: false,
            text: "",
            value: '',
            radio: "",
            showPicker: false,
            checkboxGroup: [],
            stepper: 1,
            info_id: "",
            moduleId: "2003171029240Q1Eg5iPoVkCkgCTlFW",
            formId: "200317113020yCL9RkixwdnpsJLj3Vc",
            maininfo: {},
            feedbackId: "",
            feedbackModuleId: "",
            rcvRecordId: "",
            title: "",
            opinion: "",
            qftime: "",
            isSave: "",
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
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        let feedbackId = this.$route.query.feedbackId;
        let feedbackModuleId = this.$route.query.feedbackModuleId;
        let rcvRecordId = this.$route.query.rcvRecordId;
        console.log("feedbackId" + feedbackId);
        console.log("feedbackModuleId" + feedbackModuleId);
        console.log("rcvRecordId" + rcvRecordId);

        
        this.feedbackId = feedbackId;
        this.feedbackModuleId = feedbackModuleId;
        this.rcvRecordId = rcvRecordId;
        this.initFormData()
        // this.getUserList()
    },
    destroyed() {},
    methods: {
        // getUserList() {
        //     var that = this;
        //     dsf.http
        //         .get("/fn/xform/data?pk=200515045939bar84ZZlm59WX26Xeoc&moduleId=2005131819079PyGXaUaHgivaFEdNzc", {})
        //         .then(function (data) {
        //             console.log(data)
        //         });

        // },
        onClickLeft() {
            this.$router.go(-1)
        },
        onSubmit() {

        },
        onConfirm(date) {
            this.qftime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.showCalendar = false;
        },

        initFormData() {
            // let url = "/fn/xform/data?moduleId=" + "2003171029240Q1Eg5iPoVkCkgCTlFW" + "&pk=" + "200517185439RszSHg4vXfmyFCztXl8";
            let url = "/fn/xform/data?moduleId=" + this.feedbackModuleId + "&pk=" + this.feedbackId;
            var that = this;
            dsf.http
                .get(url, {})
                .then(function (data) {
                    if (data && data.data && data.data.main) {
                        that.maininfo = data.data.main
                        // that.info_id = that.maininfo['A0001'].value
                    }
                    console.log(that.maininfo)
                });
            // dsf.http
            //     .post("/fn/remoteExchange/feedbackByServer", {
            //         rcvRecordId: "200517145527XdDOWVHdPeyxQBwlhga"
            //     })
            //     .then(function (data) {
            //         console.log(data.data);
            //         that.rcvRecordId = "200517145527XdDOWVHdPeyxQBwlhga";
            //         that.feedbackId = data.data.data.feedbackId;
            //         that.feedbackModuleId = data.data.data.feedbackModuleId;
            //     });
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
            this.maininfo["B0009"] = {}
            this.maininfo["B0021"] = {}
            this.maininfo["C-R-FEEDBACK-0001"] = {}

            if (!this.title) {
                this.$toast.fail("请输入签发人")
                this.doing = false
                return
            }
            if (!this.qftime) {
                this.$toast.fail("请选择日期")
                this.doing = false
                return
            }
            if (!this.opinion) {
                this.$toast.fail("请输入意见")
                this.doing = false
                return
            }

            this.maininfo["B0009"].value = this.title
            this.maininfo["B0021"].value = this.qftime
            this.maininfo["C-R-FEEDBACK-0001"].value = this.opinion

            let newObj = {}
            Object.keys(this.maininfo).forEach((obj, index) => {
                newObj[obj] = {
                    "values": [{
                        "key": "value",
                        "value": this.maininfo[obj].value
                    }]
                }
                if (this.maininfo[obj].hasOwnProperty("text")) {
                    newObj[obj].values.push({
                        "key": "text",
                        "value": this.maininfo[obj].text
                    })
                }

            })

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
                // moduleId: this.moduleId,
                moduleId: this.feedbackModuleId,
                // pk: this.info_id,
                pk: this.feedbackId,
                formId: this.formId,
                __DATA: JSON.stringify({
                    maininfo: newObj
                })
            }
            console.log(JSON.stringify(newObj))
            let that = this;
            dsf.http
                .post("/fn/xform/save", params)
                .then(function (data) {
                    that.doing = false
                    console.log(data)
                    if (data.data.type == "success") {
                        that.$toast.success("保存成功");
                        that.isSave = "success";
                        console.log(that.isSave);
                        // that.isSave = "success";
                        if (num == 1) {
                            that.doSubmit(that.isSave, num);
                            // that.$router.go("-1")
                        }
                    } else {
                        that.$toast.fail("保存失败");

                    }

                    if (callback) {
                        callback(data)
                    }
                    // that.$toast.clear()
                });

            if (this.isSave == "success") {
                console.log("调用发送反馈");
            }
            // setTimeout(() => {
            //     console.log(this.isSave);
            //     console.log("222222222222");
            //     if (this.isSave == "success") {
            //         console.log("调用发送反馈");
            //         let url = "fn/remoteExchange/feedback";
            //         let params = {
            //             rcvRecordId: this.rcvRecordId,
            //             feedbackId: this.feedbackId,
            //             feedbackModuleId: this.feedbackModuleId
            //         }
            //         dsf.http
            //             .post(url, params)
            //             .then(function (data) {
            //                 that.doing = false
            //                 console.log(data);
            //                 if (data.data.type == "success") {
            //                     that.$toast.success("发送成功");
            //                     if (num == 1) {
            //                         that.$router.go("-1")
            //                     }
            //                 } else {
            //                     that.$toast.fail("发送失败");
            //                 }
            //             });
            //     }
            // }, 1000);

        },
        doSubmit(isSave, num) {
            // console.log(this.isSave);
            console.log("222222222222");
            let that = this;
            if (isSave == "success") {
                console.log("调用发送反馈");
                let url = "fn/remoteExchange/feedback";
                let params = {
                    rcvRecordId: this.rcvRecordId,
                    feedbackId: this.feedbackId,
                    feedbackModuleId: this.feedbackModuleId
                }
                dsf.http
                    .post(url, params)
                    .then(function (data) {
                        // that.doing = false
                        console.log(data);
                        if (data.data.type == "success") {
                            that.$toast.success("发送成功");
                            if (num == 1) {
                                that.$router.go("-1")
                            }
                        } else {
                            that.$toast.fail("发送失败");
                        }
                    });
            }
        },
        //上传文件
        doFileRead(file, filetype) {
            let self = this;
            let url =
                "/fn/mobileAttachment/upload?fileId=&moduleId=" + this.feedbackModuleId + "&mid=" + this.feedbackModuleId + "&pId=0&pnId=0&nodeName=" + encodeURI("拟稿") + "&nrType=" + filetype + "&pk=" + this.feedbackId + "&newFileFlag=0";

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
                // info_id: this.info_id,
                // infoId: this.info_id,
                // moduleId: this.moduleId,
                info_id: this.feedbackId,
                infoId: this.feedbackId,
                moduleId: this.feedbackModuleId,
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
                            that.attach_1 = obj.document;
                            console.log(that.attach_1)
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
                    that.getWebFiles()
                });

        }
    },
}
</script>
