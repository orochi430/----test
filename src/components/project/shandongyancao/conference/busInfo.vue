<template>
<div :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}" class="container">
    <template v-if="list.length > 0">
        <div style="padding: 16px;">
            <div v-for="(day, idxDay) in list" :key="idxDay" :id="idxDay">
                <div class="date">{{ day.date }}</div>
                <div class="businfo">
                    <van-collapse v-model="activeNames" :border="false">
                        <van-collapse-item v-for="(item, idxSkd) in day.schedule" :key="idxSkd" :title="`${item.time} ${item.title}`" :name="`${idxDay}-${idxSkd}`">
                            <van-cell-group inset>
                                <van-cell :value="item.position">
                                    <template #title>
                                        <img src="static/images/peopleCongress/icon-location.png" alt="">
                                        <span>上车位置</span>
                                    </template>
                                </van-cell>
                                <van-cell center>
                                    <template #title>
                                        <img src="static/images/peopleCongress/ccxx-icon-ContactPerson.png" alt="">
                                        <span>联系人</span>
                                    </template>
                                    <template #default>
                                        <span>{{ `${item.linkmanName} ${item.linkmanTel}` }}</span>
                                    </template>
                                    <template #right-icon>
                                        <img v-if="item.linkmanTel" src="static/images/peopleCongress/ccxx-icon-phonenumber.png" alt="" style="width: 0.52rem;height: 0.52rem;" @click="phoneTo(item.linkmanTel)">
                                    </template>
                                </van-cell>
                                <van-cell>
                                    <template #title>
                                        <img src="static/images/peopleCongress/ccxx-icon-VehicleInformation.png" alt="">
                                        <span>车辆信息</span>
                                    </template>
                                    <template #label>
                                        <div class="flex fw">
                                            <div v-for="(bus, idxBus) in item.buses" :key="idxBus" class="bus">
                                                {{ bus.name }} {{ bus.number }}
                                            </div>
                                        </div>

                                    </template>
                                </van-cell>
                            </van-cell-group>
                        </van-collapse-item>
                    </van-collapse>
                    <div class="left-line"></div>
                </div>
            </div>
        </div>

        <div class="btn-contanier">
            <div class="flex jb" style="color:rgb(255, 119, 81);font-size: var(--font_size_2)" @click="showRemind = !showRemind">主席团乘车温馨提示
                <van-icon :name="showRemind?'arrow-down':'arrow-up'" />
            </div>
            <div v-show="showRemind" class="tips" v-html="tips"></div>
        </div>
    </template>
    <template v-else>
        <commonempty :image="require('static/images/peopleCongress/img_empty.png')" class="file-empty" description="暂无数据" />
    </template>
</div>
</template>

<script>
import store from "@/common/util";
export default {
    data() {
        return {
            activeNames: [],
            list: [],
            loading: null,
            meetingInfo: store.loadSessionStore("meeting"),
            currDivId: '',
            showRemind: true,
            tips: '<p>第1次、第3次主席团会议期间，主席团与代表团统一乘车。</p><p>第2次、第4次、第5次主席团会议期间，主席团乘坐主席团专用车。</p>'
        }
    },
    created() {
        let self = this;
        self.getBusInfo();
    },
    methods: {
        getBusInfo() {
            let self = this;
            self.loading = dsf.layer.loading();
            dsf.http
                .post(`fn/peopleCongress/busInfo`, {
                    meetingId: self.meetingInfo.id
                })
                .done(result => {
                    if (result.code == 200 && result.data) {
                        self.list = result.data;
                        self.list.sort((a, b) => dsf.date.parse(a.date) - dsf.date.parse(b.date));
                    }
                    return self.list;
                })
                .done(result => {
                    if (result && result.length > 0) {
                        self.initActiveNames();
                        if (self.currDivId) { // 页面滚动到当天的面板
                            document.getElementById(self.currDivId).scrollIntoView();
                        }
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        phoneTo(tel) {
            window.location.href = `tel:${tel}`;
        },
        initActiveNames() {
            let self = this;
            let toDay = dsf.date.toDay();
            for (let i = 0; i < self.list.length; i++) {
                // 仅展开当天和未来日期的面板
                if (toDay.getTime() <= dsf.date.parse(self.list[i].date).getTime()) {
                    for (let j = 0; j < self.list[i].schedule.length; j++) {
                        self.activeNames.push(`${i}-${j}`);
                        self.currDivId = self.currDivId || i;
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    background-color: #fff;

    .date {
        font-size: var(--font_size_2);
        font-weight: 600;
        padding-left: 10px;
        border-left: 5px solid #e91619;
    }

    .van-collapse {
        ::v-deep .van-collapse-item__title {
            padding: 16px 0 16px 16px;
            font-size: var(--font_size_2);
            font-weight: 600;
            position: relative;
            overflow: initial;

            &::before {
                content: ' ';
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(-50%, -50%);
                background-color: #fff;
                border-radius: 50%;
                width: 12px;
                height: 12px;
                border: 1px solid #ddd;
                z-index: 2;
            }
        }

        ::v-deep .van-collapse-item__content {
            padding: 0 16px;
        }

        .van-cell-group {
            background-color: #f5f6f7;
            border-radius: 5px;
            overflow: hidden;

            .van-cell {
                background-color: inherit;

                &::after {
                    border-bottom: 1px solid #ddd;
                }

                img {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                }

                // .van-cell__title {
                //     flex: inherit;
                // }
            }
        }
    }

    .bus {
        font-size: var(--font_size_3);
        padding-left: 16px;
        width: 50%;
        line-height: 30px;
    }

    .businfo {
        position: relative;

        .left-line {
            position: absolute;
            width: 1px;
            height: calc(100% - 26px);
            left: 0;
            top: 26px;
            background-color: #ddd;
        }
    }
}

.file-empty {
    // display: flex;
    // flex-direction: row;
    padding: 5rem 0;

    ::v-deep .van-empty__image {
        flex: none;
        height: 2.2rem;
    }

    ::v-deep .van-empty__description {
        padding: 0;
    }
}

.btn-contanier {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #FFF8B7;
    padding: 16px;
    border-radius: 10px 10px 0 0;
    z-index: 3;

    .tips {
        padding-top: 0.2rem;
        font-size: 0.29rem;

        ::v-deep p {
            line-height: 20px;
        }
    }
}
</style>
