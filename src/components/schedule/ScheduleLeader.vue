<template>
    <div class="ds-schedule-add">
        <!-- <van-nav-bar fixed title="日程" left-arrow @click-left="$router.back()" /> -->
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
                <van-field v-model="form.schedule" :rules="rules.schedule" class="meeting-textarea" name="schedule" label="日程" type="textarea" left-icon="i iconfont iconricheng" placeholder="请输入" autosize />
            </van-cell-group>
            <van-cell-group>
                <van-field name="isAllDay" label="全天" left-icon="i iconfont iconshijian" readonly>
                    <template #right-icon>
                        <van-switch v-model="form.isAllDay" size="16" @change="switchStatus" />
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
            <van-cell-group>
                <van-field v-model="form.address" name="address" left-icon="i iconfont icondingwei" right-icon="i iconfont iconaddress-dark" placeholder="请输入日程地点" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="form.invited.str" name="invited" left-icon="i iconfont iconyaoqingcanyuren" placeholder="邀请参与人" is-link readonly @click="selectUser" />
            </van-cell-group>
            <van-cell-group>
                <!-- <van-cell title="15分钟前,应用内提醒" icon="i iconfont icontixing" is-link /> -->
                <van-field v-model="form.remind" name="remind" left-icon="i iconfont icontixing" placeholder is-link readonly @click="tipsSetting" />
            </van-cell-group>
            <van-cell-group>
                <van-field class="meeting-upload" name="file" label="附件" left-icon="i iconfont iconjiahao" placeholder="请输入" autosize>
                    <!-- <template #input>
                    <van-uploader v-model="form.file" upload-icon="plus" accept=".jpg, .gif, .png, .jpeg, .txt, .pdf, .doc, .docx, .xls, .xlsx" multiple />
                </template> -->
                    <template #label>
                        <span><label class="mast-input"></label>附件</span>
                    </template>
                    <template #input>
                        <div class="dofile" style="width:100%">
                            <div class="upload-files">
                                <div v-for="(item,index) in attach_1" :key="index" class="file-list">
                                    <i class="iconfont iconfile"></i>
                                    <span>{{ item.title }}</span>
                                    <van-icon name="clear" @click="removeFile(item)" />
                                </div>
                            </div>
                            <van-uploader :after-read="afterRead" class="upload-btn" accept=".jpg, .gif, .png, .jpeg, .txt, .pdf, .doc, .docx, .xls, .xlsx">
                                <span class="add-file">
                                    <van-icon name="plus" />
                                </span>
                            </van-uploader>
                        </div>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="footer" style="display:none">
                <van-button type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <!-- <div class="select-user" v-if="showPerson">
      <van-nav-bar title="人员选择" @click-right="closePerson">
        <template #right>
          <van-icon name="cross" />
        </template>
      </van-nav-bar>
      <selectPerson @getSelectUser="getSelectUser"></selectPerson>
    </div>-->
        <van-popup v-model="showPerson" :close-on-click-overlay="false" :style="{ height: '100%' }" position="bottom">
            <selectPerson :type="0" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
        </van-popup>
        <van-popup v-model="showRemind" :style="{ height: '80%' }" position="bottom">
            <tips-setting @getData="getData"></tips-setting>
        </van-popup>
    </div>
</template>

<script>
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import TipsSetting from "@/components/meeting/TipsSetting";
export default {
    name: "ScheduleLeader",
    components: {
        selectPerson,
        TipsSetting
    },
    filters: {
        dateFilter (time) {
            if (time) {
                return dsf.date.format(time, "mm月dd日 DD");
            }
            return "请选择";
        },
        timeFilter (time, tips) {
            if (time) {
                return dsf.date.format(time, "hh:ii");
            }
            return tips;
        }
    },
    data () {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 2);
        return {
            minDate: new Date(),
            maxDate,
            showStartTimePicker: false,
            showEndTimePicker: false,
            showStartTimePicker1: false,
            showEndTimePicker1: false,
            uploader: [],
            showPerson: false,
            showRemind: false,
            moduleId: "200203104738Me2hIuO6x5hHyzLKNhY",
            formId: "200203104738nZsmlZoj1cD9pwKnUil",
            info_id: "",
            form: {
                schedule: "",
                isAllDay: false,
                address: "",
                remind: "15分钟前,应用内提醒",
                startTime: null,
                endTime: null,
                invited: "",
                file: []
            },
            rules: {
                schedule: [{
                    required: true,
                    message: "请填写日程名称"
                }]
            },
            attach_1: [],
            sdate: '',
            edate: '',
            AllDay: {
                text: "非全天事项",
                value: "-1"
            }
        };
    },
    mounted () {
        let id = this.$route.params.id;
        //   if(!id){
        //       this.$toast.fail("参数错误");
        //       return
        //   }
        this.info_id = id;
        this.initData();
    },
    created () { },
    methods: {
        switchStatus (value) {
            this.maininfo["C-RC-0005"] = {};
            // if (value) {
            //     this.maininfo["C-RC-0005"].value = "1";
            //     console.log(this.maininfo["C-RC-0005"].value);
            // } else {
            //     this.maininfo["C-RC-0005"].value = "-1";
            //     console.log(this.maininfo["C-RC-0005"].value);
            // }
            if (value) {
                this.AllDay.value = "1";
                this.AllDay.text = "全天事项";
                console.log(this.AllDay);
            } else {
                this.AllDay.value = "-1";
                this.AllDay.text = "非全天事项";
                console.log(this.AllDay);
            }
        },
        onConfirm (time, name) {
            this.maininfo["C-RC-0003"] = {};
            this.maininfo["C-RC-0004"] = {};
            this.$set(this.form, name, time);
            // if (name == "startTime") {
            //     this.maininfo["C-RC-0003"].value = dsf.date.format(
            //         time,
            //         "yyyy-mm-dd hh:ii:00"
            //     );
            //     console.log(this.maininfo["C-RC-0003"].value);
            // }
            // if (name == "endTime") {
            //     this.maininfo["C-RC-0004"].value = dsf.date.format(
            //         time,
            //         "yyyy-mm-dd hh:ii:00"
            //     );
            //     console.log(this.maininfo["C-RC-0004"].value);
            // }
            if (name == 'startTime') {
                this.sdate = dsf.date.format(time, "yyyy-mm-dd hh:ii:00");
                console.log(this.sdate)

            } else {
                this.edate = dsf.date.format(time, "yyyy-mm-dd hh:ii:00");
                console.log(this.edate)

            }
            this.showStartTimePicker = false;
            this.showEndTimePicker = false;
            this.showStartTimePicker1 = false;
            this.showEndTimePicker1 = false;
        },
        onSubmit (callback, num) {
            console.log(this.form);
            console.log("===表单最终提交数据");
            // console.log(this.form)
            this.maininfo["B0001"] = {};
            this.maininfo["C-RC-0005"] = {};
            this.maininfo["C-RC-0003"] = {};
            this.maininfo["C-RC-0004"] = {};
            this.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"] = {};
            this.maininfo["C-RC-0008"] = {};
            this.maininfo["C-RC-0024"] = {};
            this.maininfo["C-RC-0015"] = {};
            this.maininfo["C-RC-0017"] = {};
            this.maininfo["C-RC-0016"] = {};
            this.maininfo["C-RC-0024"] = {};

            this.maininfo["B0001"].value = this.form.schedule;
            // this.maininfo["C-RC-0005"].value = this.AllDay;
            this.maininfo['C-RC-0003'].value = this.sdate;
            this.maininfo['C-RC-0004'].value = this.edate;
            this.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"].value = this.form.address;
            // this.maininfo["C-RC-0008"].value = "";
            this.maininfo["C-RC-0024"].value = "";
            this.maininfo["C-RC-0015"].value = "";
            this.maininfo["C-RC-0017"].value = "";
            this.maininfo["C-RC-0016"].value = "提醒";
            this.maininfo["C-RC-0024"].value = "1";

            let newObj = {};
            // Object.keys(this.maininfo).forEach((obj, index) => {
            //     newObj[obj] = {};
            //     newObj[obj].values = [{
            //         key: "value",
            //         value: this.maininfo[obj].value
            //     }];
            // });
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
            newObj["C-RC-0008"] = {};
            newObj["C-RC-0008"].values = [{
                key: "schema",
                value: this.form.invited.schema
            }, {
                key: "text",
                value: this.form.invited.str
            },
            {
                key: "value",
                value: this.form.invited.id
            }
            ];
            newObj["C-RC-0002"] = {};
            newObj["C-RC-0002"].values = [{
                key: "text",
                value: "普通日程"
            },
            {
                key: "value",
                value: "1"
            }
            ];
            newObj["C-RC-0005"] = {};
            newObj["C-RC-0005"].values = [{
                key: "text",
                value: this.AllDay.text
            },
            {
                key: "value",
                value: this.AllDay.value
            }
            ];
            newObj["C-RC-0006"] = {};
            newObj["C-RC-0006"].values = [{
                key: "text",
                value: "公开"
            },
            {
                key: "value",
                value: "1"
            }
            ];
            console.log(JSON.stringify(newObj));
            let params = {
                moduleId: this.moduleId,
                pk: this.info_id,
                formId: this.formId,
                __DATA: JSON.stringify({
                    maininfo: newObj
                })
            };
            console.log(params);
            console.log(JSON.stringify(params));
            let that = this;
            dsf.http.post("/fn/xform/save", params).then(function (data) {
                console.log(data);
                if (data.data.type == 'success') {
                    that.$toast.success("保存成功");
                    if (num == 1) {
                        that.$router.go("-1")
                    }
                } else {
                    that.$toast.fail("提交失败,请重新提交");
                }
                // that.$toast.success("保存成功")

                if (callback) {
                    callback(data);
                }
            });
        },
        formatter (type, val) {
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
        chooseStartTime () {
            if (this.form.isAllDay) {
                this.showStartTimePicker = false;
                this.showStartTimePicker1 = true;
            } else {
                this.showStartTimePicker1 = false;
                this.showStartTimePicker = true;
            }
        },
        chooseEndTime () {
            if (this.form.isAllDay) {
                this.showEndTimePicker = false;
                this.showEndTimePicker1 = true;
            } else {
                this.showEndTimePicker1 = false;
                this.showEndTimePicker = true;
            }
        },
        tipsSetting () {
            //   this.$router.push({
            //     name: "TipsSetting"
            //   });
            this.showRemind = true;
        },
        getData (data) {
            console.log(data);
            this.showRemind = false;
            this.form.remind = data;
        },
        getUserNames (data) {
            var str = "";
            var id = "";
            var schema = "";
            data.forEach((obj, index) => {
                if (str == "") {
                    str = obj.name;
                } else {
                    str += "," + obj.name;
                }
                if (id == "") {
                    id = obj.id;
                } else {
                    id += "," + obj.id;
                }
                if (schema == "") {
                    schema = "1::" + obj.id;
                } else {
                    schema += "," + "1::" + obj.id;
                }
            });
            return {
                str,
                id,
                schema
            };
        },
        getSelectUser (data) {
            console.log("我的", data);
            if (data.length > 0) {
                this.form.invited = this.getUserNames(data);
            }
        },
        cancePerson () {
            this.showPerson = false;
        },
        selectUser () {
            this.showPerson = true;
            console.log("选人");
        },
        closePerson () {
            this.showPerson = !this.showPerson;
        },
        initData () {
            //   let scheduleId = this.$route.params.id;
            //   let scheduleId = "2005131417599ldwi6DSVWOvLwy8mlS";
            //   if (scheduleId != null) {
            //     let url = "fn/workSchedule/getScheduleDetail?pk=" + scheduleId;
            //     this.dsf.http
            //       .get(url, {})
            //       .then(args => {
            //         console.log(args);
            //         if (args.data.data && args.data.type == "success") {
            //           const data = args.data.data;
            //           this.form.schedule = data.bt;
            //           this.form.address = data.place;
            //           this.form.invited = data.attendants_text;
            //           this.form.startTime = data.start_time;
            //           this.form.endTime = data.end_time;
            //           this.form.remind = data.remind_time_text + data.remind_type_text;
            //         }
            //       })
            //       .catch(error => {
            //         this.finished = true;
            //         console.log(`${url} 接口请求失败 错误码:${error}`);
            //       });
            //   }
            let url = "/fn/xform/data?moduleId=200203104738Me2hIuO6x5hHyzLKNhY&pk=";
            if (this.info_id) {
                url =
                    "/fn/xform/data?moduleId=200203104738Me2hIuO6x5hHyzLKNhY&pk=" +
                    this.info_id;
            }
            let that = this;

            dsf.http.get(url, {}).then(function (args) {
                if (args && args.data && args.data.main) {
                    that.maininfo = args.data.main;
                    that.info_id = that.maininfo["A0001"].value;
                    if (that.maininfo["B0001"]) {
                        that.form.schedule = that.maininfo["B0001"].value
                    }
                    if (that.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"]) {
                        that.form.address = that.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"].value
                    }
                    if (that.maininfo["C-RC-0003"]) {
                        that.form.startTime = that.maininfo["C-RC-0003"].value
                        that.sdate = that.maininfo["C-RC-0003"].value
                    }
                    if (that.maininfo["C-RC-0004"]) {
                        that.form.endTime = that.maininfo["C-RC-0004"].value
                        that.edate = that.maininfo["C-RC-0004"].value
                    }
                    if (
                        that.maininfo["C-RC-0005"] &&
                        that.maininfo["C-RC-0005"].value == "1"
                    ) {
                        that.form.isAllDay = true;
                    } else {
                        that.form.isAllDay = false;
                    }
                    if (that.maininfo["C-RC-0008"]) {
                        that.form.invited = {
                            str: that.maininfo["C-RC-0008"].text,
                            id: that.maininfo["C-RC-0008"].value,
                            schema: that.maininfo["C-RC-0008"].schema
                        };
                    }
                }
                console.log(that.maininfo);
                that.getWebFiles()
            });

            dsf.http.post("fn/mobileAttachment/getUploadAttachmentType", {
                flowId: "",
                moduleId: this.moduleId
            }).then((data) => {
                console.log("上传类型", data)
            })
        },
        //上传文件
        doFileRead (file, filetype) {
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
        afterRead (file) {
            let that = this
            this.$toast.loading({
                message: '上传中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });
            this.onSubmit(function (obj) {
                that.doFileRead(file, 0)
            })

        },
        getWebFiles () {
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
                            that.attach_1 = obj.document;
                            console.log(that.attach_1);
                        })
                    }
                    that.$toast.clear()
                });
        },
        removeFile (item) {
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
};
</script>

<style lang="scss">
// @import "../../assets/font/font.css";
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.ds-schedule-add {
    // padding-top: 46px;
    color: #333;
    @include font_4();

    * {
        box-sizing: border-box;
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
            // line-height: 32px;

            &-arrow-left {
                color: #333;
                font-weight: 600;
                font-size: 1.5em;
            }
        }

        &-field {
            &__control {
                padding-left: 10px;
            }
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
            margin-top: 5px;
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
            @include background-theme('normal');
        }
    }
}
</style>
