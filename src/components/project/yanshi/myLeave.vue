<template>
<div class="myLeave" :style="{ height: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'})` }">
    <div class="leave-head">
        <div class="info-container">
            <div class="info-img">
                <img :src="avatar" :onerror="default_avatar" />
            </div>
            <div class="info-text">
                <p>{{userInfo.name}}</p>
                <p>{{userInfo.unitName}}</p>
                <p>{{userInfo.deptName}}</p>
            </div>
        </div>
        <div class="leave-statistics">
            <van-circle v-model="currentRate" :rate="currentRate" :speed="100" :stroke-width="60" color="#FF8F00" size="80px">
                <template #default>
                    <div class="pie-text">
                        <p>
                            <label style="color: #FF8F00;">{{statistics.thisYearUsed}}</label>/{{statistics.thisYear}}
                        </p>
                        <span>今年年假</span>
                    </div>
                </template>
            </van-circle>
            <van-circle v-model="lastRate" :rate="lastRate" :speed="100" :stroke-width="60" color="#0091FF" size="80px">
                <template #default>
                    <div class="pie-text">
                        <p>
                            <label style="color: #0091FF;">{{statistics.lastYearUsed}}</label>/{{statistics.lastYear}}
                        </p>
                        <span>去年年假</span>
                    </div>
                </template>
            </van-circle>
        </div>
    </div>
    <div class="leave-select">
        <div class="" @click="showYear = true">
            年度：{{year}}年
            <img src="./yanshi/select.png" alt="">
        </div>
        <div class="" @click="showType = true">
            分类：{{type.text}}
            <img src="./yanshi/select.png" alt="">
        </div>
    </div>
    <div class="leave-content" v-if="leaveList && leaveList.length > 0">
        <div class="leave-line"></div>
        <div class="list-container">
            <div class="leave-list" v-for="(item,index) in leaveList" :key="index">
                <p>
                    <img src="./yanshi/dot.png" alt="">
                    <span>{{item.month}}</span>
                </p>
                <ul>
                    <li v-for="(el,i) in item.list" :key="i">
                        <span>{{el.startTimeStr}}～{{el.endTimeStr}}</span>
                        <span>{{el.leaveDays}}天</span>
                        <span>{{el.leaveTypeText}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <commonempty v-else description="暂无请假数据" />
    <van-popup v-model="showYear" position="bottom" get-container="#app">
        <van-picker show-toolbar :columns="yearOptions" @confirm="confirmYear" @cancel="showYear = false" />
    </van-popup>
    <van-popup v-model="showType" position="bottom" get-container="#app">
        <van-picker show-toolbar :columns="typeOptions" @confirm="confirmType" @cancel="showType = false" />
    </van-popup>
</div>
</template>

<script>
export default {
    name: 'myLeave',
    components: {},
    props: {},
    data() {
        return {
            userInfo: dsf.util.loadSessionStore("user"),
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
            avatar: "",
            showYear: false,
            showType: false,
            currentRate: 0,
            lastRate: 0,
            year: '2023',
            type: {
                text: '全部',
                value: 0
            },
            yearOptions: [{
                text: '2019年',
                value: '2019'
            }, {
                text: '2020年',
                value: '2020'
            }, {
                text: '2021年',
                value: '2021'
            }, {
                text: '2022年',
                value: '2022'
            }, {
                text: '2023年',
                value: '2023'
            }],
            typeOptions: [],
            statistics: {
                "lastYearUsed": 0,
                "lastYear": 0,
                "thisYearUsed": 0,
                "thisYear": 0
            },
            leaveList: []
        }
    },
    computed: {

    },
    watch: {},
    created() {

    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            this.avatar = this.userInfo && this.userInfo.photo || require('static/images/EnterpriseServices/default-avatar.png');
            this.getType();
            this.getLeaveInfo();
            this.getStatistic();
        },
        getLeaveInfo() {
            let that = this;
            let url = 'fn/leave/statistic/leaveDetails'; //"ctrl/leaveController/getLeaveList"
            dsf.http.get(url, {
                year: this.year,
                type: this.type.value
            }).then((res) => {
                // console.log(res)
                if (res && res.data && res.data.code == 200 && res.data.data) {
                    if (res.data.data) {
                        that.leaveList = res.data.data;
                    }
                }
            })
        },
        getType() {
            let that = this;
            let url = 'fn/leave/type/selectType'; //"ctrl/leaveController/getLeaveType"
            dsf.http.get(url, {}).then((res) => {
                // console.log(res)
                if (res && res.data && res.data.code == 200) {
                    that.typeOptions = res.data.data.map(el => {
                        return {
                            text: el.name || el.text,
                            value: el.value
                        }
                    });
                }
            })
        },
        getStatistic() {
            let that = this;
            let url = 'fn/leave/statistic/yearLeaveStatistic';
            dsf.http.get(url, {}).then((res) => {
                // console.log(res)
                if (res && res.data && res.data.code == 200) {
                        that.statistics = res.data.data;
                        that.currentRate = (that.statistics.thisYearUsed / that.statistics.thisYear) * 100;
                        that.lastRate = (that.statistics.lastYearUsed / that.statistics.lastYear) * 100;
                }
            })
        },
        confirmYear(value, index) {
            this.year = value.value;
            this.showYear = false;
            this.getLeaveInfo();
        },
        confirmType(value, index) {
            this.type = value;
            this.showType = false;
            this.getLeaveInfo();
        },
    }
}
</script>

<style lang="scss" scoped>
.myLeave {
    width: 100%;
    // height: 100%;
    // overflow-y: auto;

    .leave-head {
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: url(./yanshi/headbg.png) no-repeat center top;
        background-size: 100% 100%;
        padding: 0 15px;
        box-sizing: border-box;

        .info-container {
            display: flex;
            // align-items: center;
            height: 73px;

            .info-img {
                width: 73px;
                height: 73px;
                border: 1px solid #fff;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 12px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .info-text {
                p {
                    color: #333333;
                    font-weight: 400;
                    font-size: var(--font_size_3);
                    margin-bottom: 5px;
                    max-width: 85px;

                    &:nth-child(1) {
                        font-size: var(--font_size_2);
                        font-weight: bold;
                        margin-bottom: 7.5px;
                    }
                }
            }
        }

        .leave-statistics {
            .van-circle {
                // margin-left: 10px;
            }

            .pie-text {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                p {
                    font-size: var(--font_size_4);
                    color: #333333;
                    line-height: 20px;
                    font-weight: 400;

                    label {
                        font-size: var(--font_size_3);
                        line-height: 20px;
                        font-weight: 500;
                    }
                }

                span {
                    font-size: var(--font_size_4);
                    color: #666666;
                    font-weight: 400;
                    margin-top: 3px;
                }
            }
        }
    }

    .leave-select {
        width: 100%;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        box-sizing: border-box;

        &>div {
            display: flex;
            align-items: center;
            font-size: var(--font_size_3);
            color: #0071C1;
            letter-spacing: 0;
            font-weight: 400;

            img {
                width: 8px;
                height: 5px;
                margin-left: 5px;
            }
        }
    }

    .leave-content {
        background: #FFFFFF;
        box-shadow: 0px 0px 4px 1px rgba(204, 204, 204, 0.5);
        border-radius: 4px;
        margin: 0 10px 10px 10px;
        position: relative;
        height: calc(100% - 168px);
        overflow: hidden;

        .leave-line {
            width: 1px;
            height: 100%;
            background: #0071C1;
            position: absolute;
            left: 23px;
            top: 0;
            bottom: 0;
        }

        .list-container {
            height: 100%;
            overflow-y: auto;

            .leave-list {
                width: 100%;
                height: auto;
                padding-top: 25px;
                box-sizing: border-box;

                p {
                    display: flex;
                    align-items: center;
                    padding-left: 15px;
                    // margin-top: 23px;

                    img {
                        width: 16px;
                        height: 16px;
                        z-index: 1;
                    }

                    span {
                        font-size: 15px;
                        color: #333333;
                        letter-spacing: 0;
                        font-weight: 600;
                        margin-left: 12px;
                    }
                }

                ul {
                    display: flex;
                    flex-direction: column;
                    margin: 0 10px 0 43px;

                    li {
                        width: 100%;
                        height: 39px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 12px;
                        box-sizing: border-box;
                        background: #ECF5FF;
                        border-radius: 20px;
                        margin-top: 10px;

                        span {
                            font-size: var(--font_size_3);
                            color: #333333;
                            letter-spacing: 0;
                            font-weight: 400;

                            &:nth-child(2) {
                                color: #FA6400;
                            }

                            &:nth-child(3) {
                                color: #0071C1;
                                font-weight: 600;
                            }
                        }

                    }
                }

                &:last-child {
                    padding-bottom: 10px;
                }
            }
        }
    }
}
</style>
