<template>
<div class="box">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <div class="itemSheet">
        <p class="reasonLabel" v-if="columns.length > 1 || dsf.config.commonFlow.onePersonBackIsShow">请选择退回人员</p>
        <div class="disfr ac" style="padding:10px 0;" v-if="columns.length > 1 || dsf.config.commonFlow.onePersonBackIsShow">
            <div class="peopleSec disfr ac flex1">
                <van-tag closeable size="large" type="primary" @close="closePerson(item,index)" v-for="(item,index) in personSelectData" :key="index">
                    {{item.text}}
                </van-tag>
                &nbsp;&nbsp;
            </div>
            <van-button @click="showPersonModel" style="margin-left:10px;" size="small" type="default">选择人员</van-button>
        </div>
        <p class="reasonLabel">请输入退回原因</p>
        <div class="reasonBox reason">
            <van-field v-model="reasonMessage" type="textarea" rows="5" placeholder="请输入退回原因" />
        </div>

        <div class="checks" v-if="smsMethodRange.length>0">
            <div class="clists">
                <van-checkbox-group direction="horizontal" v-model="result">
                    <van-checkbox :name="item.value" v-for="(item,index) in smsMethodRange" :key="index">{{item.text}}</van-checkbox>
                </van-checkbox-group>
            </div>
            <van-field class="reason" ref="reason" v-model="sms" type="textarea" :placeholder="'请输入提醒信息'" border />
        </div>
    </div>

    <div class="footer">
        <van-checkbox v-model="isBackTrack" shape="square" v-show="nowButtonParameters.autoReturn != -1">处理完毕自动返回</van-checkbox>
        <van-button type="theme" block @click="submitFun">确认退回</van-button>
    </div>
    <van-popup v-model="secPeo" :style="{ height: '50vh' }" position="bottom" round>
        <div style="width:100%;">
            <van-picker title="请选择退回人员" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPersonModel" />
        </div>
    </van-popup>
</div>
</template>

<script>
import axios from "axios";
export default {
    props: ["metaData", "formData", "nowButtonParameters"],
    data() {
        return {
            searchValue: "",
            personSelectData: [],
            secPeo: false,
            columns: [],
            reasonMessage: "",
            result: [],
            sms: "",
            userInfo: "",
            smsMethodRange: [],
            isBackTrack: this.nowButtonParameters.autoReturn == 1,
            isRequired: dsf.config.commonForm.returnNodeRequired != undefined ? dsf.config.commonForm.returnNodeRequired : true
        }
    },
    methods: {
        onClickLeft() {
            this.$emit("onClickLeft")
        },
        showPersonModel() {
            this.secPeo = !this.secPeo
        },
        onConfirm(val) {
            this.personSelectData = []
            this.personSelectData.push(val)
            // console.log(val)
            this.showPersonModel()
        },
        closePerson(item, index) {
            this.personSelectData.splice(index, 1);
        },
        submitFun() {
            if (this.reasonMessage.trim() == "" && this.isRequired) {
                dsf.layer.toast("请输入退回原因")
                return
            }
            if (this.personSelectData.length < 1) {
                dsf.layer.toast("请选择退回人员")
                return
            }
            let _loading = dsf.layer.loading()
            let params = {
                sendType: "SR_SPECIAL",
                pk: this.metaData.pk,
                isSms: this.result.join(","),
                sms: this.sms,
                isBackTrack: this.isBackTrack ? 1 : 99,
                pId: this.metaData.pId,
                pnId: this.metaData.pnId,
                nextNodeId: this.personSelectData[0].wfNodeId,
                opinionType: 4,
                opinionContent: this.reasonMessage,
                nextHandleType: 'SR_BACKSEND',
                receiverList: [{
                    type: 1,
                    userId: this.personSelectData[0].userId,
                    userName: this.personSelectData[0].uName,
                    deptId: this.personSelectData[0].deptId,
                    deptName: this.personSelectData[0].deptName,
                    isSms: this.result.join(","),
                    sms: this.sms
                }]
            }
            if (this.$route.query.agencyType == 2) {
              params.agencyType = this.$route.query.agencyType
              params.determineUser = this.$route.query.agencyUserId
              params.determineUserName = this.$route.query.agencyUserName
            }
            let opts = {
                timeout: 20000,
                responseType: "json",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": dsf.util.loadSessionStore("loginToken")
                },
            }
            let url = dsf.url.getWebPath("fn/flow/sendRequest")
            axios.post(url, params, opts)
                .then(({
                    data
                }) => {
                    if (data.code == "200") {
                        dsf.layer.closeLoading(_loading)
                        dsf.layer.toast("退回成功")
                        this.$emit("backSendSuc")
                    }
                })

        }
    },
    computed: {
    title() {
      return dsf.config.commonFlow.title||"退回";
    },
  },
    created() {
        this.userInfo = dsf.util.loadSessionStore("user");
        console.log(this.userInfo)
        this.sms = this.userInfo.name + '于' + moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + '给您退回了：' + this.formData["B0001"].value

        console.log(this.formData)
        let that = this
        dsf.http.get("fn/flow/getGPNodeList", {
            pk: this.metaData.pk,
            sendType: 'SR_BACKSEND',
            pId: this.metaData.pId,
            pnId: this.metaData.pnId,
            moduleId: this.metaData.moduleId,
            returnNodeId: this.nowButtonParameters?.nodeId || ''
        }).then(({
            data
        }) => {
            console.log(data)
            if (data.code == "200") {
                let columns = []
                data.data.forEach(item => {
                    columns.push({
                        text: item.receiver,
                        ...item
                    })
                })
                this.columns = columns
                this.personSelectData.push(this.columns[0])
                if (data.smsMethodRange) {
                    data.smsMethodRange.forEach(item => {
                        if (item.checked) {
                            that.result.push(item.value)
                        }
                    })
                    that.smsMethodRange = data.smsMethodRange
                }
                console.log(this.columns)
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .footer {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        .van-checkbox {
            padding-bottom: 20px;
        }
    }
}

.reason {
    border: 1px solid #ebeff5;
    margin-top: 10px;

    .van-field {
        padding: 0 !important;

    }

    ::v-deep textarea {
        box-sizing: border-box;
        padding: 10px !important;
    }
}

.itemSheet {
    font-size: 16x;

}

.disfr {
    display: flex;
}

.fc {
    display: flex;
    flex-direction: column;
}

.ac {
    align-items: center;
}

.jsb {
    justify-content: space-between;
}

.jc {
    justify-content: center;
}

.flex1 {
    flex: 1;
}

.itemSheet {
    padding: 15px;
    font-size: var(--font_size_3);

    .van-cell__value {
        height: 24px;
        background: #e5e5e5;
    }

    .dateRange {
        .line {
            width: 20px;
            height: 1px;
            background: #cecece;
            margin: 0 15px;
        }
    }
}

.peopleSec {
    height: 36px;
    padding-left: 10px;
    border: 1px solid rgb(235, 239, 245);
    border-radius: 3px;
    overflow-x: scroll;
    overflow-y: hidden;

    .secItem {
        padding: 4px 10px;
        margin: 0 4px;
        white-space: nowrap;
        background: white;
        border-radius: 18px;
    }
}

.btnBox {
    padding: 15px;
}

.searchSheet {
    height: 500px;

    .van-action-sheet__content {
        height: 100%;
    }
}

.itemSheet {
    overflow-y: auto;
    flex: 1;
    .van-cell {
        padding: 10px 0;
    }

    .van-field__body {
        border-radius: 5px;
        overflow: hidden;
    }

    .van-field__control {
        height: auto !important;
        background: #ebeff5;
        padding-left: 10px;
        border: 0 !important;
    }
    .reasonBox {
        .van-field__control {
            height: auto !important;
            border: 0 !important;
        }
    }
    .peopleSec {
        span {
            margin: 0 5px;
            white-space: nowrap;
        }
    }

    .peopleSec+.van-button {
        height: 36px;
    }

}

.btnBox {
    .van-button--normal {
        padding: 0 40px;
    }
}

.selectSearch {
    display: flex;
    flex-direction: column;

    .van-action-sheet__content {
        flex: 1;
        overflow-y: auto;
        padding: 0 15px;

        .van-checkbox {
            margin: 15px 0;
        }
    }
}



.checks {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

    .clists {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .reason {
        margin-top: 5px;
        padding: 0 !important;
    }
}
</style>
