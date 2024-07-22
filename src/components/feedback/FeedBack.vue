<template>
<div class="receipt">
    <div class="form-frame">
        <div class="form-contain">
            <van-form @submit="onSubmit('',1)">
                <!-- <van-field v-model="fkdw" readonly input-align="right" label="*反馈单位" placeholder="请输入">
                    <template #label>
                        <span><label class="mast-input">*</label>反馈单位</span>
                    </template>
                </van-field> -->
                <van-field v-model="fkr" readyonly input-align="right" label="*反馈人" placeholder="请选择" @click="selectUser">
                    <template #label>
                        <span><label class="mast-input">*</label>反馈人</span>
                    </template>
                </van-field>
                <van-popup v-model="showPicker" position="bottom" round>
                    <van-datetime-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" type="datetime" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>

                <van-field :value="fksj" input-align="right" readonly clickable name="calendar" placeholder="请选择" @click="showPicker = true">
                    <template #label>
                        <span><label class="mast-input">*</label>反馈时间</span>
                    </template>
                </van-field>
                <van-field class="reset files" rows="2" label="*反馈情况">
                    <template #label>
                        <span><label class="mast-input">*</label>反馈情况</span>
                    </template>
                    <template #input>
                        <div class="dofile" style="width:100%">
                            <textarea v-model="fkqk" maxlength="300"></textarea>
                        </div>
                    </template>
                </van-field>
                <van-field class="files" style="flex-direction: column;" input-align="right" name="uploader">
                    <template #label>
                        <span>下一步工作：</span>
                    </template>
                    <template #input>
                        <div class="dofile" style="width:100%">
                            <textarea v-model="xybgz" maxlength="300"></textarea>
                        </div>
                    </template>
                </van-field>
                <van-field style="margin-top:15px" input-align="right" name="uploader">
                    <template #label>
                        <span><label class="mast-input">*</label>附件：</span>
                    </template>
                    <template #input>
                        <div></div>
                    </template>
                    <template #right-icon>
                        <van-uploader :after-read="afterRead" class="upload-btn">
                            <van-icon color="#1989fa" class="iconfont iconjiahao" />
                        </van-uploader>
                    </template>
                </van-field>
                <div class="upload-files">
                    <div v-for="(item,index) in attach_1" :key="index" class="file-list">
                        <i class="iconfont iconfile"></i>
                        <span>{{ item.title }}</span>
                        <van-icon color="#999999" name="clear" @click="removeFile(item)" />
                    </div>
                </div>
                <div class="submit">
                    <van-button square block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
            <van-popup :close-on-click-overlay="false" v-model="showPerson" :style="{ height: '80%' }" position="bottom" round>
                <selectPerson :extra="{tabs:[{key:'self_unit'}],multiple:false,rootObject:5}" :type="0" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
            </van-popup>
        </div>
    </div>
    <!-- <form-frame title="反馈">
        <template slot="default">

        </template>
    </form-frame> -->
</div>
</template>

<script>
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import store from "@/common/util";
export default {
    name: 'FeedBack',
    components: {
        selectPerson
    },
    data() {
        return {
            attach_1: [],
            showPerson: false,
            fkdw: store.loadSessionStore("user").deptName, //反馈单位
            fkr: store.loadSessionStore("user").name, //反馈人
            fksj: "", //反馈时间
            fkqk: '', //反馈情况
            xybgz: "",
            showPicker: false,
            fileList: [],
            minDate:new Date(new Date().getFullYear() - 40, 0, 1),//可选择的最小日期
            maxDate:new Date(new Date().getFullYear() + 10, 11, 31),//可选择的最大日期
            currentDate: new Date(),
            param: {

            },
            maininfo: {},
            moduleId: "190323160728t7fGwtjvQyVf8pQATUC",
            formId: "190325100957tjblcgSwSkWskJbreNy",
            info_id: "",
            masterId:"",
            Invited: {
                id: store.loadSessionStore("user").deptId,
                str: store.loadSessionStore("user").deptName
            }
        };
    },
    computed: {},
    watch: {},
    created() {

        // this.param = this.$route.query.params
        //this.initData()
    },
    mounted() {

        console.log('mounted==>',this.$route.params.data.dataValue)

        if (!this.$route.params.data) {
            this.$toast.fail("参数错误")
            this.$router.go(-1)
            return
        }
        let param = this.$route.params.data.dataValue
        this.info_id = param.id
        this.moduleId = param.moduleId
        this.masterId=param.masterId
        this.getUserList()
        dsf.http.post("fn/mobileAttachment/getUploadAttachmentType", {
            flowId: "",
            moduleId: this.moduleId
        }).then((data) => {
            console.log("上传类型", data)
        })

        this.fksj = dsf.date.format(new Date(), "yyyy-mm-dd hh:ii:00")
    },
    destroyed() {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onSubmit(callback, num) {

            if (!this.fkdw) {
                this.$toast.fail("请输入反馈单位")
                return
            }
            if (!this.fkr) {
                this.$toast.fail("请选择反馈人")
                return
            }
            if (!this.fksj) {
                this.$toast.fail("请选择反馈时间")
                return
            }
            if (!this.fkqk) {
                this.$toast.fail("请输入反馈情况")
                return
            }
            console.log("===提交")
            // let params = {
            //   fkdw: this.fkdw, //反馈单位
            //   fkr: this.fkr, //反馈人
            //   fksj: this.fksj, //反馈时间
            //   fkqk: this.fkqk, //反馈情况
            //   fileList: this.fileList
            // }
            // console.log(params)
            // this.dsf.http.post('fn/workSchedule/getNewWeekDataNew', params).done((d) => {
            //   this.dsf.layer.toast('模拟Get请求成功', true)
            //   if (d) {
            //     this.dsf.http.get('fn/supervise/approval/feedBack', {
            //       pk: d
            //     }).done((d) => {
            //       this.dsf.layer.toast('模拟Get请求成功', true)
            //     }).error((response) => {
            //       this.dsf.layer.toast('模拟Get请求失败', false)
            //     }).always((res) => {})
            //   }
            // }).error((response) => {
            //   this.dsf.layer.toast('模拟Get请求失败', false)
            // }).always((res) => {})
            //         反馈单位  C-DB-FK-0002
            // 反馈人  C-DB-FK-0001
            // 反馈时间  C-DB-FK-0004
            // 反馈情况  C-DB-FK-0006
            // this.maininfo['C-DB-FK-0002'] = {};
            this.maininfo['C-DB-FK-0001'] = {};
            this.maininfo['C-DB-FK-0004'] = {};
            this.maininfo['C-DB-FK-0006'] = {};
            this.maininfo['C-DB-FK-0007'] = {};
            //this.maininfo['C-DB-FK-0002'].value = this.fkdw;
            this.maininfo['C-DB-FK-0007'].value = this.xybgz;
            this.maininfo['C-DB-FK-0004'].value = this.fksj;
            this.maininfo['C-DB-FK-0006'].value = this.fkqk;
            let newObj = {}
            Object.keys(this.maininfo).forEach((obj, index) => {
                newObj[obj] = {}
                newObj[obj].values = [{
                    "key": "value",
                    "value": this.maininfo[obj].value
                }]
                if (this.maininfo[obj].hasOwnProperty("text")) {
                    newObj[obj].values.push({
                        "key": "text",
                        "value": this.maininfo[obj].text
                    })
                }
            })

            newObj["C-DB-FK-0001"] = {}
            /* newObj["C-DB-FK-0001"] = {
                "values": [{
                    "key": "text",
                    "value": this.Invited.str || ""
                }, {
                    "key": "value",
                    "value": this.Invited.id || ""
                }]
            } */
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
            let that = this
            dsf.http
                .post("/fn/xform/save", params)
                .then(function (data) {
                    if (data.data.code == 200) {
                        dsf.http.post("fn/supervise/approval/feedBack",{
                            pk:that.info_id,fid:that.masterId
                        }).then(function (result){
                            console.log(result)
                            if(result.data.code=='200'){
                                that.$toast.success("提交成功")
                                if (num == 1) {
                                    that.$router.go("-1")
                                    return
                                }
                                if (callback) {
                                    callback(data)
                                }
                            }
                        })
                    } else {
                        that.$toast.fail("保存失败")
                        //that.$toast.clear()
                    }
                    console.log(data)
                });
        },
        getUserList() {
            // fn/xform/data?pk=200511112501nzdwnaz3P1uxylO61wC
            let that = this;
            dsf.http
                .get("/fn/xform/data?pk=" + this.info_id + "&moduleId=" + this.moduleId, {})
                .then(function (res) {
                    that.maininfo = res.data.main;
                    console.log(that.maininfo)
                });
        },
        onConfirm(date) {
            this.fksj = dsf.date.format(date, "yyyy-mm-dd hh:ii:00");
            this.showPicker = false;
        },
        // afterRead(file) {
        //   // 此时可以自行将文件上传至服务器
        //   console.log(file);
        // },
        initData() {
            // this.dsf.http.get('fn/supervise/approval/feedBack', {
            //   pk: this.$route.query.params.id
            // }).done((d) => {
            //   this.dsf.layer.toast('模拟Get请求成功', true)
            // }).error((response) => {
            //   this.dsf.layer.toast('模拟Get请求失败', false)
            // }).always((res) => {})
            // let url = `fn/supervise/approval/feedBack?pk=${JSON.parse(this.$route.query.params).id}`;
            // dsf.http.get(url, {}).then(function (res) {
            //   console.log(res)
            //   let {
            //     data
            //   } = res;
            //   if (res.status === 200 ) {
            //     self.listData = data.data;
            //   } else {
            //     self.dsf.layer.toast(res.message);
            //   }
            // });
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
                this.Invited = this.getUserNames(data);
                this.fkr = this.Invited.str
            }
        },
        selectUser() {
            this.showPerson = true;
            console.log("选人");
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
                start: -1,
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
            let that = this;
            this.$toast.loading({
                message: '删除中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });
            let params = {
                pk: item.infoId,
                fileId: item.id,
                moduleId: item.moduleId,
                mid: item.moduleId,
                nrType: item.type,
                fileName: item.title
            }
            dsf.http
                .post("/fn/mobileFileUpload/delete", params)
                .then(function (data) {
                    that.getWebFiles()
                });

        }
    },
}
</script>

<style lang="scss" scoped>
/* .form-frame .van-cell.reset {
    flex-direction: column;
  }

  .form-frame .van-cell.reset>>>.van-field__control {
    padding-left: 6px;
    padding-top: 7px;
  } */

.meeting-upload {
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

.submit {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 65px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.van-button {
    width: 90%;
    border-radius: 3px;
    font-size: var(--font_size_1);
}
</style>
