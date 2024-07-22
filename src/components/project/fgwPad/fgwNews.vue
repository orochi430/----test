<template>
<div class="fgwDB" :class="{ 'verticalx': vertical }">
    <fgwheader @reflush="initNews"></fgwheader>
    <div class="fcontain" :class="{ 'vertical': vertical }">
        <div class="swipernews">
            <div class="swiperbox" v-if="showSwiper">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item,index) in imgnews" :key="'imgnews'+index" @click="goDetail(item)">
                        <img :src="dsf.url.getWebPath(item.IMAGEURL)" />
                        <p><span>{{ item.TITLE }}</span></p>
                    </van-swipe-item>
                </van-swipe>
                <div class="swipermore" @click="haddleNewsClick">更多</div>
            </div>
            <div class="newslist">
                <div class="newsTab">
                    <p class="tab">
                        <span :class="{'active':wnIndex==index}" @click="wnIndex=index" v-for="(item,index) in weinei" :key="item.id">{{ item.tabName }}</span>
                    </p>
                    <p class="more" @click="goWnDetail">
                        <img src="static/images/project/fgwPad/more.png" alt="">
                        <span>更多</span>
                    </p>
                </div>
                <div class="newsArt" v-for="(item,index) in weinei" :key="'w'+index" v-show="wnIndex==index">
                    <div class="newsArtItem" v-for="(arc,i) in item.arcList" :key="arc.id" @click="goDetail(arc)">
                        <div class="title" :class="{'new': arc.whetherNew}">
                            <span class="bt">{{ arc.bt }}</span>
                            <span class="timer">{{ arc.time }}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="newsRight bomarc">
            <div class="newslist">
                <div class="newsTab">
                    <p class="tab">
                        <span :class="{'active':tzIndex==index}" @click="tzIndex=index" v-for="(item,index) in tongzhi" :key="item.id">{{ item.tabName }}</span>
                    </p>
                    <p class="more" @click="goTzDetail">
                        <img src="static/images/project/fgwPad/more.png" alt="">
                        <span>更多</span>
                    </p>
                </div>
                <div class="newsArt" v-for="(item,index) in tongzhi" :key="'tz'+index" v-show="tzIndex==index">
                    <div class="newsArtItem" v-for="(arc,i) in item.arcList" :key="arc.id" @click="goDetail(arc)">
                        <div class="title" :class="{'new': arc.whetherNew}">
                            <label v-if="arc.TYPE">[{{ arc.TYPE }}]</label>
                            <span class="bt">{{ arc.bt }}</span>
                            <span class="timer">{{ arc.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import fgwheader from './header.vue';
export default {
    name: 'fgwNews',
    components: {
        fgwheader
    },
    data() {
        return {
            kind: 1,
            commNews: [],
            imgnews: [],
            tongzhi: [],
            weinei: [],
            wnIndex: 0,
            tzIndex: 0,
            listId: "",
            moduleId: "",
            picNewsId: "",
            picNewsName: "",
            vertical:false,
            showSwiper:true
        };
    },
    computed: {},
    watch: {},
    methods: {
        checkScreen() {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            if (width > height) {
                this.vertical = false
            } else {
                this.vertical = true
            }
        },
        changeTab(item, index) {
            this.tabIndex = index
        },
        initNews() {
            this.commNews = []
            this.imgnews = []
            this.tongzhi = []
            this.weinei = []
            let self = this;
            dsf.http.post(`fn/developmentOffice/insiderNews`, {
                    kind: this.kind
                })
                .done(res => {
                    console.log(res)
                    if (res.code == "200") {
                        self.commNews = res.data.commNews
                        self.imgnews = res.data.imgnews
                        self.picNewsId = res.data.picNewsId
                        self.picNewsName = res.data.picNewsName

                        res.data.tongzhi.forEach(item => {
                            item.arcList.forEach(obj => {
                                obj.time = moment(new Date(obj.time)).format("YYYY-MM-DD")
                            })
                        });

                        self.tongzhi = res.data.tongzhi

                        res.data.weinei.forEach(item => {
                            item.arcList.forEach(obj => {
                                obj.time = moment(new Date(obj.time)).format("YYYY-MM-DD")
                            })
                        });
                        self.weinei = res.data.weinei

                        self.listId = res.data.listId
                        self.moduleId = res.data.moduleId
                    }
                }).error(err => {

                })
        },
        goDetail(item) {
            this.$router.push({
                name: "commonForm",
                params: {
                    pk: item.id,
                    moduleId: this.moduleId
                },
                query: {
                    listId: this.listId
                }
            });
        },
        goTzDetail() {
            this.$router.push({
                name: "commonList",
                params: {
                    listId: this.listId,
                    moduleId: this.moduleId
                },
                query: {
                    LMTYPE: this.tongzhi[this.tzIndex].id,
                    title: this.tongzhi[this.tzIndex].tabName
                }
            });
        },
        haddleNewsClick() {
            this.$router.push({
                name: "commonList",
                params: {
                    listId: this.listId,
                    moduleId: this.moduleId
                },
                query: {
                    LMTYPE: this.picNewsId,
                    title: this.picNewsName
                }
            });
        },
        goWnDetail() {
            this.$router.push({
                name: "commonList",
                params: {
                    listId: this.listId,
                    moduleId: this.moduleId
                },
                query: {
                    LMTYPE: this.weinei[this.wnIndex].id,
                    title: this.weinei[this.wnIndex].tabName
                }
            });
        },
        initData() {
            let that = this
            dsf.http.post(`/fn/developmentOffice/getUserInfo`, {}, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .done(res => {
                    let user = res.data
                    if (user && user.roleIds) {
                        if (user.roleIds.indexOf("230627095759f5cY667vnP31Rv0eK8c") >= 0) {
                            that.leaderType = 3
                        } else if (user.roleIds.indexOf("230627095352FHXYAXqiebsqC4ARTHS") >= 0) {
                            that.leaderType = 2
                        } else {
                            that.leaderType = 1
                        }
                        that.kind = parseInt(that.leaderType) - 1
                    }
                    that.initNews()
                }).error(err => {
                    alert("未获取到用户信息")
                })

        }
    },
    created() {},
    mounted() {
        this.initData()
        this.checkScreen()
        window.addEventListener("resize", () => {
            this.checkScreen()
            // window.location.reload()
            this.showSwiper = false
            setTimeout(() => {
                this.showSwiper = true
                this.$nextTick()
            }, 500);
        })
    },
    activated() {
        this.initData()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.fgwDB {
    width: 100vw;
    height: 100vh;
    background: url(../../../../static/images/project/fgwPad/body-bg.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 30px 30px 35px 30px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &.verticalx {
        padding: 20px 15px 15px 15px;
    }

    .fcontain {
        width: 100%;
        margin-top: 12px;
        height: calc(100vh - 122px);
        border-radius: 10px;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        &.vertical{
            .swipernews{
                display: flex;
                flex-direction: column;
                height: auto;
                height: 630px;
                overflow: hidden;
                .swiperbox{
                    width: 100%;
                    height: 284px;
                    margin-right: 0;
                }
                .newslist{
                    margin-top: 15px;
                }
            }
            .bomarc{
                height:calc(100% - 645px);
                flex: 1;
            }
        }

        .newsRight {
            width: 100%;
            flex: 1;
            margin-top: 15px;

            &.bomarc {
                height: calc(100% - 369px);
                overflow: hidden;
            }
        }

        .swipernews {
            width: 100%;
            height: 354px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;

            .swiperbox {
                width: 544px;
                height: 354px;
                border-radius: 10px;
                overflow: hidden;
                flex-shrink: 0;
                margin-right: 15px;
                position: relative;

                /deep/ .van-swipe__indicators {
                    right: 80px;
                    left: auto;
                    transform: translateX(0);
                    bottom: 15px;

                    .van-swipe__indicator {
                        width: 8px;
                        height: 8px;
                        opacity: 1 !important;

                        &.van-swipe__indicator--active {
                            width: 22px;
                            height: 8px;
                            border-radius: 4px;
                            background: #FC1212 !important;
                        }
                    }
                }

                .my-swipe .van-swipe-item {
                    width: 544px;
                    height: 354px;
                    position: relative;

                    img {
                        width: 100%;
                        height: 354px;
                    }

                    p {
                        position: absolute;
                        height: 43px;
                        background: rgba($color: #000000, $alpha: 0.5);
                        box-sizing: border-box;
                        padding: 0 205px 0 15px;
                        overflow: hidden;
                        bottom: 0;
                        z-index: 1;
                        left: 0;
                        right: 0;

                        span {
                            display: block;
                            line-height: 43px;
                            font-size: var(--font_size_2);
                            color: #FFFFFF;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }

        .swipermore {
            position: absolute;
            right: 10px;
            width: 60px;
            height: 25px;
            background: #F21111;
            border-radius: 12px;
            z-index: 2;
            bottom: 8px;
            text-align: center;
            line-height: 26px;
            color: #FFF;
            font-size: var(--font_size_2);
        }
    }

    .newslist {
        width: 100%;
        flex: 1;
        overflow: hidden;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        flex-direction: column;
        background: #FFF;
        border-radius: 12px;
        height: 100%;

        &.leftarc {
            background: #FFFFFF;
            box-shadow: inset 0 0 50px 0 #92C9FF;
            border-radius: 10px;
            margin-top: 20px;
        }

        .newsTab {
            width: 100%;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
            border-bottom: 1px solid #999999;
            box-sizing: border-box;
            padding-bottom: 10px;

            .tab {
                display: flex;
                align-items: center;

                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 42px;
                    padding: 0 10px;
                    font-size: var(--font_size_0);
                    margin-right: 20px;
                    background: #EAEFF5;
                    border-radius: 4px;

                    &.active {
                        background: #0044B4;
                        border-radius: 5px;
                        color: #FFF;
                        font-weight: bold;
                    }
                }
            }

            .more {
                display: flex;
                align-items: center;
                margin-top: 6px;

                img {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                    margin-top: 3px;
                }

                span {
                    font-size: var(--font_size_0);
                    color: #708EFF;
                    margin-left: 5px;
                }
            }
        }

        .newsArt {
            width: 100%;
            margin-top: 10px;
            height: calc(100% - 54px);
            overflow-y: auto;

            .newsArtItem {
                width: 100%;
                display: flex;
                flex-direction: column;
                cursor: pointer;
                border-bottom: 1px solid #ebebeb;
                height: 50px;
                align-items: center;

                .msg {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 10px;

                    p {
                        display: flex;
                        align-items: center;

                        img {
                            width: 16px;
                            height: 16px;
                        }

                        span {
                            font-size: var(--font_size_3);
                            color: #666666;
                            margin-left: 10px;
                        }
                    }
                }

                .title {
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 100%;

                    &>label {
                        font-size: var(--font_size_1);
                        color: #0086D9;
                        flex-shrink: 0;
                        margin-right: 10px;
                        font-weight: bold;
                    }

                    .bt {
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: var(--font_size_0);
                        color: #333333;
                        width: 100%;
                        font-weight: normal !important;
                    }

                    .timer {
                        font-size: var(--font_size_0);
                        font-size: 20px;
                        color: #666666;
                        font-weight: normal !important;
                        flex-shrink: 0;
                        margin-left: 30px;
                    }

                    &::before {
                        content: '';
                        width: 20px;
                        height: 20px;
                        flex-shrink: 0;
                        margin-right: 10px;
                    }

                    &.new {
                        font-weight: bold;

                        &::before {
                            content: '新';
                            background: #F21111;
                            border-radius: 2px;
                            width: 20px;
                            height: 20px;
                            display: block;
                            text-align: center;
                            line-height: 20px;
                            justify-content: center;
                            font-size: var(--font_size_3);
                            color: #FFF;
                            flex-shrink: 0;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
