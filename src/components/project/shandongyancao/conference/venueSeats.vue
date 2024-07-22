<template>
<div>
    <div class="top-info">
        <div class="avatar">
            <img :src="avatar" :onerror="default_avatar" />
        </div>
        <div class="info">
            <div class="name">{{ meetingInfo.userName }}<!-- （{{ meetingInfo.userType }}） -->
            </div>
            <div class="title">
                <span class="elps">{{ meetingInfo.title }}</span>
            </div>
            <div class="time">
                {{ meetingInfo.startDate | dateFormat }}
                至
                {{ meetingInfo.endDate | dateFormat }}
                <!-- 共{{ days }}天 -->
            </div>
        </div>
        <div class="bg"><img src="static/images/peopleCongress/bg.png" /></div>
    </div>
    <div class="card-container">
        <template v-if="list.length > 0">
            <div v-for="(item,idx) in list" :key="idx" class="card">
                <div class="title">{{ dsf.date.format(item.date, "d日") }}　{{ item.title }}</div>
                <div class="content"><img src="static/images/peopleCongress/icon-location.png" alt=""> 地址：{{ item.address }}</div>
                <div class="content flex jb ac">
                    <img src="static/images/peopleCongress/icon-seat.png" alt="">
                    <span style="flex:1">会场座位：{{ item.seat && item.seat != '排座' ? item.seat : '' }}</span>
                    <span class="tag" @click="toSeats(item)">座位图</span>
                </div>
            </div>
        </template>
        <template v-else>
            <commonempty :image="require('static/images/peopleCongress/img_empty.png')" class="file-empty" description="暂无数据" />
        </template>
    </div>
</div>
</template>

<script>
import store from "@/common/util";
export default {
    filters: {
        //日期格式化
        dateFormat: function (val) {
            if (!val) return "";
            /*  
                关云龙 2021-10-8
                会议时间描述修改，目前的是01-24至01-30共7天，描述不严谨；需调整为“会议时间：1月24日至1月30日上午”。14:00 开始表示下午，含14:00，默认00:00 表示全天。

                00:00 全天
                00:01-13:59 上午
                14:00-23:59 下午 
            */
            let str = dsf.date.format(val, "m月d日");
            let temp = dsf.date.parse(val);
            let allDay = dsf.date.parse(dsf.date.format(val, "yyyy-mm-dd") + " 00:00");
            let pm = dsf.date.parse(dsf.date.format(val, "yyyy-mm-dd") + " 14:00");
            if (temp.getTime() == allDay.getTime()) {
                // str += "全天";
            } else if (temp < pm) {
                str += "上午";
            } else {
                str += "下午";
            }
            return str;
        }
    },
    data() {
        return {
            default_avatar:
                +require("static/images/peopleCongress/icon_head.png") + '"',
            avatar: require("static/images/peopleCongress/icon_head.png"),
            list: [],
            meetingInfo: store.loadSessionStore("meeting"),
            loading: null
        }
    },
    created() {
        let self = this;
        self.getVenueSeats();
    },
    methods: {
        getVenueSeats() {
            let self = this;
            self.loading = dsf.layer.loading();
            dsf.http
                .post(`fn/peopleCongress/venueSeats`, {
                    meetingId: self.meetingInfo.id
                })
                .done(result => {
                    if (result.code == 200 && result.data) {
                        self.list = result.data;
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        toSeats(item) {
            // http://localhost:8080/DreamWeb/seatDesign/index.html#/mobileView/hw/211221170520gH1KB8GHvrkwZfx8rZV/200715112344zkHLfPWCW5OCfrrVebb
            let url = dsf.url.getServerUrl(`seatDesign/index.html#/mobileView/hw/${item.meetingId}/${item.meetingUserId}`);
            switch(item.meetingId){
                case '220114142839exoPSLaY3cnUWcYvJoI':
                    url = 'static/images/peopleCongress/seat_1.png';
                    break;
                case '2201141502269HLoCJs4GPcyvO69leE':
                case '220114150942SRJZM2pLkaPmKY9loL3':
                    url='static/images/peopleCongress/seat_2.png';
                    break;
                default:
                    url = '';
            }
            // this.$router.push({
            //     path: '/iframe',
            //     query: {
            //         url: url,
            //         title: '会场座位'
            //     }
            // })
            if(url){
                location.href = url;
            }else{
                dsf.layer.toast("暂无数据！");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.top-info {
    height: 3rem;
    display: flex;
    padding: 0.7rem 0.3rem 0;
    position: relative;

    .opinion {
        position: absolute;
        top: 0.24rem;
        right: 0.3rem;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid #FFFFFF;
        border-radius: 24px;
        padding: 0.1rem 0.16rem;
        font-size: var(--font_size_4);
        color: #fff;
        z-index: 2;
    }

    .bg {
        position: absolute;
        width: 100%;
        height: 3rem;
        top: 0;
        right: 0;
        z-index: 1;
        overflow: hidden;
    }

    .bg img {
        height: 100%;
    }

    .pin {
        position: absolute;
        right: 0.3rem;
        bottom: -0.3rem;
        z-index: 2;
        width: 1rem;
        height: 1rem;
    }

    .avatar {
        width: 1rem;
        height: 1rem;
        border: 1px solid #ffffff;
        border-radius: 50%;
        overflow: hidden;
        z-index: 2;
    }

    .info {
        color: #fff;
        padding-left: 0.3rem;
        z-index: 2;
        flex: 1;
        overflow: hidden;

        .name {
            font-size: 0.38rem;
            font-weight: bold;
            line-height: 0.5rem;
            padding: 3px 0;
        }

        .title {
            display: flex;

            span {
                flex: 1;
            }

            img {
                display: inline-block;
                width: 20px;
            }
        }

        .time {
            padding-top: 0.24rem;
            opacity: 0.8;
        }
    }
}

.card-container {
    transform: translateY(-40px);
    position: relative;
    z-index: 2;

    .card {
        background-color: #fff;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
        border-radius: 10px;
        margin: 16px;
        padding: 16px;

        .title {
            font-weight: 600;
            font-size: var(--font_size_2);
            padding-bottom: 16px;
            border-bottom: 1px solid #cfcfcf;
        }

        .content {
            padding-top: 16px;

            img {
                display: inline-block;
                width: 16px;
            }
        }
    }
}

.file-empty {
    // display: flex;
    // flex-direction: row;
    padding: 4rem 0;

    ::v-deep .van-empty__image {
        flex: none;
        height: 2.2rem;
    }

    ::v-deep .van-empty__description {
        padding: 0;
    }
}

.tag {
    display: inline-block;
    background-color: rgba(50, 136, 255, 0.12);
    color: #3288FF;
    border-radius: 3px;
    line-height: 21px;
    padding: 0 10px;
    font-size: var(--font_size_4);
}
</style>
