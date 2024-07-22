<template>
<div v-show="list && list.length > 0" class="box notice-bar" @click="clickBar">
    <div class="dsf-info-panel ds_control">
        <div class="dsf-info-panel-title-box">
            <div class="dsf-info-panel-title ellipsis flex jb ac">
                <div class="dsf-info-panel-title-line"></div>
                <span>日程中心</span>
                <van-icon name="arrow" class="dsf-right-icon" />
            </div>
        </div>
        <div class="notic_content flex jb ac">
            <div class="right ja ac dc" v-if="hasSch.length == 3">
                <p v-for="(item, index) in hasSch" :key="index" :class="{today: index == 0, next: index != 0,three: index==2}">{{ item }}</p>
                <!-- <p class="next">{{ next }}</p> -->
            </div>
            <div class="right ja ac dc pd" v-else-if="hasSch.length == 2">
                <p v-for="(item, index) in hasSch" :key="index" :class="{today: index == 0, next: index != 0}">{{ item }}</p>
                <!-- <p class="next">{{ next }}</p> -->
            </div>
            <div class="right ja ac flex dc" v-else>
                <p v-for="(item, index) in hasSch" :key="index" :class="{today: index == 0, next: index != 0}">{{ item }}</p>
                <!-- <p class="next">{{ next }}</p> -->
            </div>
            <div class="left">
                <p v-for="(item, index) in list" :key="index" class="van-ellipsis" v-if="index<3">
                    <span class="point"></span>
                    <span>{{ item.time }} {{ item.content }}</span>
                </p>
                <!-- <div class="no-data">
            <i class="iconfont icon iconzanwushuju"></i>
            <p>暂无日程数据</p>
          </div>-->
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {  
    name: "Schedule",
    data() {
        return {
            hasSch: [],
            today: "5月4日",
            next: "5月8日",
            list: [],
            scheduleListUrl: dsf.config.homePage.schedule.scheduleList
        };
    },
    created() {
        this.initData();
    },
    methods: {
        clickBar() {
            if (dsf.config.homePage && dsf.config.homePage.schedule && dsf.config.homePage.schedule.scheduleDetailUrl) {
                this.$router.push(dsf.config.homePage.schedule.scheduleDetailUrl);
            } else
                this.$router.push({
                    name: "ScheduleCenter"
                });
        },
        initData() {
            const params = {
                sdate: moment(new Date()).format("YYYY-MM-DD"),
                edate: moment(new Date()).format("YYYY-MM-DD"),
                count: 3,
                type: "personal"
            };
            this.hasSch = [];
            this.list = [];
            this.dsf.http
                .get(this.scheduleListUrl, params)
                .then(res => {
                    if (res.data.type === "success") {
                        const data = res.data.data;
                        data.forEach(item => {
                            if (item.schedule && item.schedule.length > 0) {
                                const date = moment(item.date).format("MM-DD");
                                // if (this.hasSch.indexOf(date) === -1) {
                                //   this.hasSch.push(date);
                                // }
                                this.hasSch.push(date); //需要二次处理;
                                if (this.hasSch.length == 3) {
                                    if (
                                        this.hasSch[0] == this.hasSch[1] &&
                                        this.hasSch[1] == this.hasSch[2]
                                    ) {
                                        // 全部为一天的数据;
                                        this.hasSch[1] = this.hasSch[2] = "";
                                    } else {
                                        for (var i = 0; i < this.hasSch.length; i++) {
                                            for (var j = i + 1; j < this.hasSch.length; j++) {
                                                if (this.hasSch[i] == this.hasSch[j]) {
                                                    this.hasSch[j] = "";
                                                }
                                            }
                                        }
                                    }
                                } else if (this.hasSch.length == 2) {
                                    for (var i = 0; i < this.hasSch.length; i++) {
                                        for (var j = i + 1; j < this.hasSch.length; j++) {
                                            if (this.hasSch[i] == this.hasSch[j]) {
                                                this.hasSch[j] = "";
                                            }
                                        }
                                    }

                                }
                                item.schedule.map(sch => {
                                    sch.date = date;
                                });
                                this.list.push(...item.schedule);
                            }
                        });
                    }
                })
                .error(response => {
                    //this.dsf.layer.toast("数据请求失败，请稍后再试");
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.today {
    height: 35px;
    line-height: 35px !important;
}

.next {
    height: 40px;
    line-height: 40px !important;
}

.three {
    height: 35px;
    line-height: 35px !important;
}

.pd {
    box-sizing: border-box;
    padding: 25px 0px;

    .today {
        height: 30px;
        line-height: 25px !important;
    }

    .next {
        height: 40px;
        line-height: 40px !important;
    }
}
</style>
