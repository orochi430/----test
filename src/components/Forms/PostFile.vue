<template>
<div class="receipt">
    <form-frame title="发文">
        <template slot="default">
            <van-form @submit="onSubmit">
                <van-field input-align="right" type="textarea" style="height:48px" rows="2" v-model="title" placeholder="请输入标题">
                    <template #label>
                        <span><label class="mast-input">*</label>标题：</span>
                    </template>
                </van-field>
                <van-field readonly label="主送单位：" placeholder="点击选择主送单位">
                    <template #input>
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="zs" :options="orglist" />
                        </van-dropdown-menu>
                    </template>
                </van-field>
                <van-field readonly label="抄送单位：" placeholder="点击选择抄送单位：">
                    <template #input>
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="cs" :options="orglist" />
                        </van-dropdown-menu>
                    </template>
                </van-field>
                <van-field readonly label="会签单位：" placeholder="点击选择会签单位">
                    <template #input>
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="hq" :options="orglist" />
                        </van-dropdown-menu>
                    </template>
                </van-field>
                <van-field input-align="right" name="sfgk" label="是否公开：">
                    <template #input>
                        <van-radio-group v-model="isopen" direction="horizontal">
                            <van-radio name="0">否</van-radio>
                            <van-radio name="1">是</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field input-align="right" name="jjcd" label="加急程度：">
                    <template #input>
                        <van-radio-group v-model="jjcd" direction="horizontal">
                            <van-radio name="0">普通</van-radio>
                            <van-radio name="1">平急</van-radio>
                            <van-radio name="2">加急</van-radio>
                            <van-radio name="3">特急</van-radio>
                            <van-radio name="4">特提</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field input-align="right" v-model="phone" type="tel" label="联系电话：" placeholder="请输入联系电话" />
                <van-field input-align="right" name="stepper" label="打印份数：">
                    <template #input>
                        <van-stepper v-model="printnum" />
                    </template>
                </van-field>
                <van-field input-align="right" name="uploader">
                    <template #label>
                        <span><label class="mast-input">*</label>正文：</span>
                    </template>
                    <template #input>
                        <div style="width:100%">
                            <div class="upload-files">
                                <div class="file-list" v-for="(item,index) in attach_0" :key="index">
                                    <i class="iconfont iconfile"></i>
                                    <span>{{item.title}}</span>
                                    <van-icon name="clear" @click="removeFile(item)" />
                                </div>
                            </div>
                            <van-uploader class="upload-btn" :after-read="afterRead">
                                <span class="add-file">
                                    <van-icon name="plus" /></span>
                            </van-uploader>
                        </div>
                    </template>
                </van-field>
                <van-field input-align="right" name="uploader" label="附件：">
                    <template #input>
                        <div style="width:100%">
                            <div class="upload-files">
                                <div class="file-list" v-for="(item,index) in attach_1" :key="index">
                                    <i class="iconfont iconfile"></i>
                                    <span>{{item.title}}</span>
                                    <van-icon name="clear" @click="removeFile(item)" />
                                </div>
                            </div>
                            <van-uploader class="upload-btn" :after-read="afterRead1" accept="doc,docx">
                                <span class="add-file">
                                    <van-icon name="plus" />
                                </span>
                            </van-uploader>
                        </div>
                    </template>
                </van-field>
            </van-form>
        </template>
        <template slot="button">
            <DsButtonToolbox :buttons="buttons" @mainClick="handleLeftClick" />
        </template>
    </form-frame>
    <div class="select-user" v-if="showDialog">
        <van-nav-bar title="人员选择" @click-right="closeDialog">
            <template #right>
                <van-icon name="cross" />
            </template>
        </van-nav-bar>
        <selectPerson @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
    </div>
</div>
</template>

<script>
import FormFrame from './FormFrame'
import DsButtonToolbox from '../documentCenter/DsfButtonToolbox';
import selectPerson from '@/components/selectPerson/DsfSelectPerson'
export default {
    name: 'PostFile',
    components: {
        FormFrame,
        DsButtonToolbox,
        selectPerson
    },
    data() {
        return {
            showCalendar: false,
            showDialog: false,
            cur_index: 0,
            text: "",
            value: '',
            radio: "",
            showPicker: false,
            checkboxGroup: [],
            stepper: 1,
            zs: "",
            cs: "",
            hq: "",
            title: "",
            printnum: "1",
            isopen: "0",
            phone: "",
            jjcd: '0',
            moduleId: "200113151945A52p5tF0hUVkN2RlogI",
            formId: "200113151945r3kUZoCHSaGmNuQE4Db",
            info_id: "",
            buttons: {
                commonButton: [{
                        icon: "icondayin1",
                        action: "dataview",
                        name: "打印"
                    },
                    {
                        icon: "icongoutong",
                        action: "batchaction",
                        name: "沟通"
                    },
                    {
                        icon: "icongengduo1",
                        action: "batchaction2",
                        name: "更多"
                    }
                ],
                mainButtons: [{
                    action: "send",
                    name: "发送"
                }]
            },
            maininfo: {},
            attach_0: [],
            attach_1: [],
            orglist: [{
                text: "各镇人民政府",
                value: "0"
            }, {
                text: "县政府各部门",
                value: "1"
            }, {
                text: "各直属机构",
                value: "2"
            }, {
                text: "各派出机构",
                value: "3"
            }, {
                text: "各园（区）",
                value: "4"
            }]
        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onSubmit() {

        },
        onConfirm(date) {
            this.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.showCalendar = false;
        },
        onConfirmJJCD(value) { //紧急程度
            this.jjcd = value;
            this.showPicker = false;
        },
        getUserList() {
            var that = this;
            dsf.http
                .get("/fn/xform/data?pk=&moduleId=200113151945A52p5tF0hUVkN2RlogI", {})
                .then(function (data) {
                    if (data && data.data && data.data.main) {
                        that.maininfo = data.data.main
                        that.info_id = that.maininfo['A0001'].value

                    }
                    console.log(that.maininfo)
                });

        },
        doSend() {

            if (!this.title) {
                this.$toast.fail("请输入标题")
                return
            }
            this.maininfo['B0001'] = {}
            this.maininfo['B0015'] = {}
            this.maininfo['B0006'] = {}
            this.maininfo['B0012'] = {}
            this.maininfo['B0014'] = {}
            this.maininfo['B0013'] = {}

            this.maininfo['B0001'].value = this.title
            this.maininfo['B0015'].value = this.isopen
            this.maininfo['B0006'].value = this.jjcd
            this.maininfo['B0012'].value = this.phone
            this.maininfo['B0014'].value = this.printnum
            this.maininfo['B0013'].value = "2020-05-15 09:09:12"

            let newObj = {}
            Object.keys(this.maininfo).forEach((obj, index) => {

                newObj[obj] = {
                    "values": [{
                        "key": "value",
                        "value": this.maininfo[obj].value
                    }]
                }
            })

            if (this.zs) {
                newObj['C-GW-FW-0001'] = {}
                newObj['C-GW-FW-0001'].values = [{
                    "key": "text",
                    "value": this.orglist[this.zs].text
                }, {
                    "key": "value",
                    "value": this.zs
                }]
            }
            if (this.cs) {
                newObj['C-GW-FW-0002'] = {}
                newObj['C-GW-FW-0002'].values = [{
                    "key": "text",
                    "value": this.orglist[this.cs].text
                }, {
                    "key": "value",
                    "value": this.cs
                }]
            }
            if (this.hq) {
                newObj['C-GW-FW-0104'] = {}
                newObj['C-GW-FW-0104'].values = [{
                    "key": "text",
                    "value": this.orglist[this.hq].text
                }, {
                    "key": "value",
                    "value": this.hq
                }]
            }

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
            console.log(JSON.stringify(newObj))
            dsf.http
                .post("/fn/xform/save", params)
                .then(function (data) {
                    console.log(data)
                });
        },
        handleLeftClick(name) {
            // eslint-disable-next-line no-console
            console.log(name);
            if (name == "send") {
                this.doSend()
            }
        },
        handleRightClick(name) {
            // eslint-disable-next-line no-console
            console.log(name);
        },
        afterReadMain(file) {
            console.log(file)
        },
        closeDialog() {
            this.showDialog = !this.showDialog
        },
        getUserNames(data) {
            let str = ""
            let id = ""

            data.forEach((obj, index) => {
                if (str == "") {
                    str = obj.name
                } else {
                    str += "," + obj.name
                }

                if (id == "") {
                    id = obj.id
                } else {
                    id += "," + obj.id
                }

            })
            let values = [{
                "key": "text",
                "value": str
            }, {
                "key": "value",
                "value": id
            }]
            if (this.cur_index == 0) {
                this.maininfo['C-GW-FW-0001'].values = values
            } else if (this.cur_index == 1) {
                this.maininfo['C-GW-FW-0002'].values = values
            } else if (this.cur_index == 2) {
                this.maininfo['C-GW-FW-0104'].values = values
            }
            return str
        },
        getSelectUser(data) {
            console.log("我的", data)
            if (data.length > 0) {
                if (this.cur_index == 0) {
                    this.zs = this.getUserNames(data)
                    console.log(this.zs)
                } else if (this.cur_index == 1) {
                    this.cs = this.getUserNames(data)
                } else if (this.cur_index == 2) {
                    this.hq = this.getUserNames(data)
                }
            }
        },
        cancePerson(){
        	this.showDialog = false;
        },
        selectUser(index) {
            this.showDialog = true
            this.cur_index = index
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
            this.doFileRead(file, 22)
        },
        afterRead1(file) {
            this.doFileRead(file, 1)
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
                            if (obj.attachType == "0") {
                                that.attach_0 = obj.document
                            }
                            if (obj.attachType == "1") {
                                that.attach_1 = obj.document
                            }
                        })
                    }
                });
        },
        removeFile(item) {
            console.log(item)
            let params = {
                pk: item.infoId,
                fileId: item.id,
                moduleId: item.moduleId,
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
    created() {},
    mounted() {
        this.getUserList()
        // this.getWebFiles()
    },
    destroyed() {},
}
</script>
