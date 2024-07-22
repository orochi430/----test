<template>
<div v-if="mealInfo" :style="{minHeight: `calc(100vh - ${isShowAppHeader ? '0.92rem' : '0px'})`}" class="container">
    <div>
        <div v-for="(item, index) in mealInfo.list" :key="index" :id="index" class="card">
            <div class="title flex jb" @click="item.isHistorical = !item.isHistorical">
                <span>{{ item.date }}</span>
                <van-icon :name="!item.isHistorical?'arrow-up':'arrow-down'" />
            </div>
            <template v-if="!item.isHistorical">
                <div v-for="(meal,idx) in item.meals" :key="idx" class="meal">
                    <div class="time flex jb ac">
                        <span class="meal-icon">
                            <img :src="`static/images/peopleCongress/cyxx-${meal.type}.png`" alt="" style="width:0.32rem;height: 0.32rem">
                        </span>
                        <!-- <span style="padding: 0 8px">{{ meal.startTime }} - {{ meal.endTime }}</span> -->
                        <span style="padding: 0 8px">{{ startTimes[meal.type] }} - {{ endTimes[meal.type] }}</span>
                        <span style="flex:1">
                            <van-tag :color="meal.state == '已过期' ? 'rgba(153,153,153,0.15)' : meal.state == '已使用' ? 'rgba(255,135,29,.15)' : 'rgba(50,136,255,.15)'" :text-color="meal.state == '已过期' ? '#999' : meal.state == '已使用' ? '#FF871D' : '#3288FF'" round type="primary" size="large">{{ meal.state }}</van-tag>
                        </span>
                        <span>{{ meal.type == '1' ? '早餐' : meal.type == '2' ? '中餐' : '晚餐' }}</span>
                    </div>
                    <!-- <div v-for="addr in meal.position" :key="addr.name" class="addr">
                        <img src="static/images/peopleCongress/icon-location.png" alt="" style="width:0.32rem;height: 0.32rem">
                        <span>{{ addr.name }}</span>
                    </div> -->
                    <div v-if="meal.position" class="addr">
                        <img src="static/images/peopleCongress/icon-location.png" alt="" style="width:0.32rem;height: 0.32rem">
                        <span>{{ meal.position }}</span>
                    </div>
                    <img class="bg" src="static/images/peopleCongress/cyxx-img-seal.png" alt="">
                </div>
            </template>
        </div>
    </div>
    <div class="btn-contanier">
        <div class="flex jb" style="color:#FFA92A;font-size: var(--font_size_2)" @click="showRemind = !showRemind">用餐温馨提示
            <van-icon :name="showRemind?'arrow-down':'arrow-up'" />
        </div>
        <div v-show="showRemind" style="padding-top:10px;font-size:15px" v-text="mealInfo.tips"></div>
        <div class="btn flex ac jc" @click="$router.push({ path: '/peopleCongressQrCode', query: { title: encodeURI('电子餐券') }})">
            <van-icon name="coupon-o" />电子餐券</div>
    </div>
</div>
<commonempty v-else :image="require('static/images/peopleCongress/img_empty.png')" class="file-empty" description="暂无数据" />
</template>

<script>
import {
    mapState
} from 'vuex'
import store from "@/common/util";
export default {
    data() {
        return {
            showRemind: true,
            mealInfo: null,
            meetingInfo: store.loadSessionStore("meeting"),
            loading: null,
            startTimes: {'1':'07:00','2':'11:40','3':'17:20'},
            endTimes: {'1':'08:30','2':'13:10','3':'18:50'},
            currDivId: ''
        }
    },
    computed: {
        ...mapState({
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    created() {
        let self = this;
        self.getDiningInfo();
    },
    methods: {
        getDiningInfo() {
            let self = this;
            self.loading = dsf.layer.loading();
            dsf.http
                .post(`fn/peopleCongress/diningInfo`, {
                    meetingId: self.meetingInfo.id
                })
                .done(result => {
                    if (result.code == 200 && result.data) {
                        self.mealInfo = result.data;
                    }
                    return self.mealInfo;
                })
                .done(result => {
                    if (result && result.list && result.list.length > 0) {
                        // 页面定位到当天
                        self.currDivId = result.list.findIndex((item) => !item.isHistorical);
                        if (self.currDivId) {
                            document.getElementById(self.currDivId).scrollIntoView();
                        }
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
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

.card {
    margin: 16px;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 16px;

    .title {
        font-size: 22px;
        font-weight: 600;
        padding: 16px 0;
        border-bottom: 1px solid #ddd;
    }

    .meal {
        padding: 16px 0;
        position: relative;

        .time {
            font-size: var(--font_size_0);
            font-weight: 600;
        }

        .meal-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            text-align: center;
            background-color: #C30E12;
            border-radius: 50%;
        }

        .addr {
            font-size: var(--font_size_2);
            color: #666;
            padding-top: 10px;
        }

        &:not(:last-child) {
            border-bottom: 1px dashed #ddd;
        }

        .bg {
            position: absolute;
            width: 80px;
            height: 60px;
            right: 0;
            bottom: 16px;
        }
    }

    img {
        display: inline-block;
    }

    &:last-of-type {
        margin-bottom: 160px;
    }
}

.btn-contanier {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #FFF8EC;
    padding: 16px;
    border-radius: 10px 10px 0 0;

    .btn {
        background-color: #C30E12;
        color: #fff;
        font-size: var(--font_size_2);
        line-height: 50px;
        margin-top: 16px;
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
</style>
