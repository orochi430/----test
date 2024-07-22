<template>
<div class="front-container">
    <div class="front-title">
        <h1>会议选择</h1>
    </div>
    <div class="front-wrapper">
        <div class="front-top">
            <div class="front-top-meet-type">
                <div class="title">会议类型</div>
                <el-select v-model="meetType" placeholder="请选择" @change="getData">
                    <el-option v-for="item in meetTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="front-top-meet-status">
                <div class="title">会议状态</div>
                <el-select v-model="meetStatus" placeholder="请选择" @change="getData">
                    <el-option v-for="item in meetStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="front-con">
            <div class="left">
                <meetingList v-if="meetingInfo" :list="meetingLists" :active-id="meetingInfo.id" @updateAcitve="updateAcitve" />
            </div>
            <div class="right">
                <div class="title">会议简介</div>
                <meetingInfo v-if="meetingInfo" ref="meetingInfo" :meeting="meetingInfo" class="meeting-info"></meetingInfo>
                <div class="meeting-info-btn" @click="enter">
                    进入会议室
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import {
    Select,
    Option
} from "element-ui";
Vue.use(Select);
Vue.use(Option);
import meetingList from "./components/meetingList";
import meetingInfo from "./components/meetingInfo";
export default {
    components: {
        meetingList,
        meetingInfo
    },
    data() {
        return {
            meetingLists: [],
            meetingInfo: null,
            meetType: "",
            meetTypeOptions: [],
            meetStatus: "",
            meetStatusOptions: [{
                    value: "",
                    label: "全部"
                },
                {
                    value: "1",
                    label: "进行中"
                },
                {
                    value: "-1",
                    label: "已结束"
                }
            ]
        };
    },
    created() {
        this.getMeetingType();
        this.getData();
    },
    methods: {
        enter() {
            if (!dsf.config.login.defaultUrl) {
                this.$router.push({
                    name: "meetingPadAppcenter",
                    query: {
                        meetingId: this.meetingInfo.id
                    }
                })
            } else {
                this.$router.push({
                    name: `${dsf.config.login.defaultUrl}`,
                    query: {
                        meetingId: this.meetingInfo.id
                    }
                })
            }

        },
        updateAcitve(item) {
            this.meetingInfo = item;
            this.$refs.meetingInfo.getData(item)
        },
        getMeetingType() {
            dsf.http
                .post(`fn/conferenceMobile/meetingType`, {})
                .done(result => {
                    if (result.code == 200 && result.data) {
                        result.data.forEach(item => {
                            item.label = item.text;
                        });
                        this.meetTypeOptions = result.data;
                    }
                })
                .error(error => {
                    dsf.layer.toast("数据获取失败！", false);
                })
                .always(() => {});
        },
        getData() {
            dsf.http
                .post(`fn/conferenceMobile/meetingList`, {
                    query_meetingType: this.meetType,
                    query_meetingStatus: this.meetStatus
                })
                .done(result => {
                    if (result && result.datas) {
                        this.meetingLists = [];
                        result.datas.forEach(item => {
                            this.meetingLists.push(item.dataValue)
                        })
                        if (this.meetingLists.length > 0) {
                            this.meetingInfo = this.meetingLists[0]
                        }
                    }
                })
                .error(error => {
                    dsf.layer.toast("数据获取失败！", false);
                })
                .always(() => {
                    // dsf.layer.closeLoading(self.loading);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.front-container {
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 32px 32px;
    background-color: #3389e0;

    .front-title {
        font-size: 70px;
        text-align: center;
        color: #fff;
        height: 156px;
        line-height: 156px;

        h1 {
            font-weight: 500;
        }
    }

    .front-wrapper {
        background-color: #fff;
        height: calc(100% - 156px);
        padding: 32px 40px;

        .front-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 48px;

            .front-top-meet-type,
            .front-top-meet-status {
                display: flex;
                align-items: center;

                .title {
                    padding-bottom: 0;
                }
            }

            ::v-deep .el-select {
                width: 6.56rem;
                margin-left: 0.52rem;

                .el-input__inner {
                    height: 1.6rem;
                    line-height: 1.6rem;
                }

                .el-input .el-select__caret {
                    line-height: 1.6rem;
                }
            }
        }

        .front-con {
            display: flex;
            height: calc(100% - 2.56rem);

            .left {
                display: flex;
                flex-direction: column;
                box-sizing: content-box;
                flex: 3;
                height: 100%;
                max-width: 1450px;

                .info {
                    flex: 1;
                    overflow: hidden;
                }
            }

            .right {
                flex: 2;
                height: 100%;
                border: 1px solid #dcdcdc;
                padding: 34px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                .title {
                    padding: 0 40px;
                    width: 100%;
                }
            }
        }
    }

    .title {
        font-size: 0.88rem;
        font-weight: 600;
        padding-bottom: 0.72rem;
        color: #333;
    }

    .meeting-info-btn {
        background: #3B74DB;
        border-radius: 8px;
        color: #fff;
        text-align: center;
        font-size: 40px;
        width: 95%;
        height: 100px;
        line-height: 100px;
    }
}
</style>
