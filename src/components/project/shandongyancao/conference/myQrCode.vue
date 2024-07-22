<template>
<div :style="{minHeight: `calc(100vh - ${isShowAppHeader ? '0.92rem' : '0px'})`}" class="container">
    <div class="top">
        <img src="static/images/peopleCongress/icon_head.png" alt="">
        <span style="font-size:0.38rem">{{ meetingInfo.userName }}</span>
        <span v-if="false">{{ meetingInfo.gender }}</span>
        <span class="job">{{ meetingInfo.userType }}</span>
    </div>
    <div class="card">
        <div class="cell flex jb">
            <img src="static/images/peopleCongress/wdsfp-icon-OrganizationalUnit.png" alt="">
            <span>单位部门：</span><span style="flex:1">{{ meetingInfo.dept }}</span>
        </div>
        <div class="cell flex jb ae">
            <img src="static/images/peopleCongress/wdsfp-icon-ContactNumber.png" alt="">
            <span>联系电话：</span><span style="flex:1;line-height:0.4rem">{{ meetingInfo.mobile }}</span>
        </div>
        <div class="code">
            <div><img :src="code" alt="" @click="refreshQrCode"></div>
            <!-- <div class="sub">管理员扫描我的二维码可用于签到</div> -->
        </div>
    </div>
</div>
</template>

<script>
import store from "@/common/util";
import oaScoketJs from "@/common/oaScoket";
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            code: '',
            title: this.$route.query.title,
            loading: null,
            meetingInfo: store.loadSessionStore("meeting"),
            timeInterval: null,
            qrcodeInvalid: dsf.config.setting['SYS-MOBILE-QRCODEINVALID-0002'] || 1,
            oaScoket: {}
        }
    },
    computed: {
        ...mapState({
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    created() {
        let self = this;
        if (self.title) {
            dsf.url.setTitle(decodeURI(self.title))
        }
        self.refreshQrCode();
        // self.queryStatus();
        self.openMySocket();
    },
    beforeRouteLeave(to, from, next) {
        oaScoketJs.close();
        next();
    },
    methods: {
        // 获取我的二维码
        getMyQrCode() {
            // console.log('getMyQrCode()')
            let self = this;
            if (self.$route.name == 'peopleCongressQrCode') {
                self.loading = dsf.layer.loading();
                dsf.http
                    .get(`fn/peopleCongress/myQrCode`)
                    .done(result => {
                        if (result.code == 200 && result.data) {
                            self.code = `${result.data}&ran=${Math.random()}`;
                        }
                    })
                    .error(error => {})
                    .always(() => {
                        dsf.layer.closeLoading(self.loading);
                    });
            } else {
                clearInterval(self.timeInterval);
            }
        },
        // 计算入住天数
        calcDays(startDate, endDate) {
            return parseInt(dsf.date.diffDays(
                dsf.date.parse(startDate),
                dsf.date.parse(endDate)
            ));
        },
        // 定时刷新二维码
        refreshQrCode() {
            // console.log('refreshQrCode()')
            let self = this;
            self.getMyQrCode();
            clearInterval(self.timeInterval);
            self.timeInterval = setInterval(() => {
                self.getMyQrCode();
            }, self.qrcodeInvalid * 60 * 1000);
        },
        // 查询扫码状态
        queryStatus() {
            let self = this;
            // console.log('queryStatus()')
            if (self.$route.name == 'peopleCongressQrCode') {
                dsf.http
                    .get(`fn/peopleCongress/codeScanningStatus`)
                    .done(result => {
                        if (result.code == 200) {
                            self.code = '';
                            clearInterval(self.timeInterval);
                            dsf.layer.toast(result.message, true, () => self.$router.go(-1));
                        } else if (result.code == 500) {
                            dsf.layer.alert({
                                title: '错误',
                                message: result.message
                            }, () => {
                                self.refreshQrCode();
                                setTimeout(self.queryStatus, 3 * 1000);
                            });
                        } else if (result.code == 100) {
                            setTimeout(self.queryStatus, 3 * 1000);
                        } else {
                            dsf.layer.alert({
                                title: '错误',
                                message: result.message
                            }, () => {
                                self.refreshQrCode();
                                setTimeout(self.queryStatus, 3 * 1000);
                            });
                        }
                    })
                    .error(error => {})
                    .always(() => {});
            }
        },
        // 打开websocket
        openMySocket() {
            let self = this;
            oaScoketJs.close();
            self.oaScoket = oaScoketJs.getInstance(self);
            self.oaScoket.onScanCodeAfter(store.loadSessionStore("user").userId, result => {
                console.log('onScanCodeAfter');
                if (result.data.code == 200) {
                    clearInterval(self.timeInterval);
                    dsf.layer.toast(result.data.message, true, () => self.$router.go(-1));
                } else if (result.data.code == 500) {
                    dsf.layer.alert({
                        title: '错误',
                        message: result.data.message
                    }, () => {
                        self.refreshQrCode();
                    });
                } else if (result.data.code == 100) {
                    //setTimeout(self.queryStatus, 3 * 1000);
                } else {
                    dsf.layer.alert({
                        title: '错误',
                        message: result.data.message
                    }, () => {
                        self.refreshQrCode();
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    overflow: hidden;
    background-color: #C30E12;
    position: relative;
}

.top {
    margin: 32px 16px 16px;
    display: flex;
    align-items: center;
    color: #fff;

    img {
        width: 60px;
        height: 60px;
        margin: 0 16px;
    }

    span {
        margin-right: 16px;
    }

    .job {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        font-size: var(--font_size_4);
        padding: 4px 10px;
    }
}

.card {
    margin: 16px;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 16px;

    .cell {
        position: relative;
        border-bottom: 1px solid #ddd;
        padding: 16px 0;
        font-size: 15px;

        img {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin: 2px 0;
        }
    }

    .code {
        padding: 16px 0;
        text-align: center;

        img {
            display: inline-block;
            width: 5rem;
            height: 5rem;
            margin: 16px 0;
        }

        .sub {
            color: #666;
            padding: 16px 0;
        }
    }
}
</style>
