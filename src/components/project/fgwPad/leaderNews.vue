<template>
<div class="contain">
    <div class="newsLeft">
        <div class="lefttop">
            <div class="swiperbox">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item,index) in imgnews" :key="'imgnews'+index" @click="goDetail(item)">
                        <img :src="dsf.url.getWebPath(item.IMAGEURL)" />
                        <p><span>{{ item.TITLE }}</span></p>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="leaftNews">
                <p v-for="(item,index) in commNews" :key="'news'+index" @click="goDetail(item)"><span>{{ item.TITLE }}</span></p>
            </div>
        </div>
        <div class="tongzhi">
            <div @click="goDzgg">
                <img src="static/images/project/fgwPad/gg.png" alt="" srcset="">
                <p>
                    <img src="static/images/project/fgwPad/dzgg.png" alt="" srcset="" />
                    <span>电子公告</span>
                </p>
            </div>
        </div>
    </div>
    <div class="newsRight">
        <div class="newslist">
            <div class="titleimg">
                委内要闻
            </div>
            <div class="newsTab">
                <p class="tab">
                    <!-- <span class="active">委工作动态</span> -->
                </p>
                <p class="more" @click="goWnDetail" v-if="weinei.length>0">更多</p>
            </div>
            <div class="newsArt" v-for="(arc,i) in weinei" :key="'tab'+i">
                <div class="newsArtItem" v-for="(item,index) in arc.arcList" :key="'tz'+index" @click="goDetail(item)">
                    <div class="title" :class="{'new': arc.whetherNew}">
                        <span>{{ item.bt }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="newslist">
            <div class="newsTab">
                <p class="tab">
                    <span :class="{'active':wnIndex==index}" @click="wnIndex=index" v-for="(item,index) in tongzhi" :key="item.id">{{ item.tabName }}</span>
                </p>
                <p class="more" v-if="tongzhi.length>0" @click="goTzDetail">更多</p>
            </div>
            <div class="newsArt" v-for="(item,index) in tongzhi" :key="'w'+index">
                <div class="newsArtItem" v-for="(arc,i) in item.arcList" :key="arc.id" @click="goDetail(arc)">
                    <div class="title" :class="{'new': arc.whetherNew}">
                        <label v-if="arc.kind">[{{ arc.kind }}]</label>
                        <span>{{ arc.bt }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'leaderNews',
    components: {

    },
    data() {
        return {
            commNews: [],
            imgnews: [],
            tongzhi: [],
            weinei: [],
            wnIndex: 0,
            listId: "",
            moduleId: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        changeTab(item, index) {
            this.tabIndex = index
        },
        initNews() {
            let self = this;
            dsf.http.post(`fn/developmentOffice/insiderNews`, {
                    kind: 2
                })
                .done(res => {
                    console.log(res)
                    if (res.code == "200") {
                        self.commNews = res.data.commNews
                        self.imgnews = res.data.imgnews
                        self.tongzhi = res.data.tongzhi
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
                    LMTYPE: this.tongzhi[0].id,
                    title: this.tongzhi[0].tabName
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

            // "http://localhost:8881/DreamOne/dist/index.html?x-auth-token=230526152119pYia0h8IFcPIW6XqjAZ-72443476626d443cab220cc0c250d892#/commonForm/230619170717dWMCZMyThtuH1kZNj9o/230707141843tkxE2MrNKyn6kFWo2cx?listId=230704145448HJFIEmKONh0QPtjFcYh"


            // http://localhost:8881/DreamOne/dist/index.html?x-auth-token=230526152119pYia0h8IFcPIW6XqjAZ-72443476626d443cab220cc0c250d892#/commonList/230704145448HJFIEmKONh0QPtjFcYh/230619170717dWMCZMyThtuH1kZNj9o?LMTYPE=tztb&title=%E9%80%9A%E7%9F%A5%E9%80%9A%E6%8A%A5


        },
        goDzgg() {

            this.$router.push({
                name: "commonList",
                params: {
                    listId: this.listId,
                    moduleId: this.moduleId
                },
                query: {
                    LMTYPE: "dzgg",
                    title: "电子公告"
                }
            });
        }
    },
    created() {},
    mounted() {
        this.initNews()
    },
    activated(){
        this.initNews()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.contain {
    width: 100%;
    height: calc(100vh - 75px);
    box-sizing: border-box;
    padding: 20px 25px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .newsLeft {
        width: 510px;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .lefttop {
            width: 510px;
            height: 390px;
            background: #FFFFFF;
            box-shadow: inset 0 0 50px 0 #92C9FF;
            border-radius: 10px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .tongzhi {
            width: 100%;
            flex: 1;
            background: #FFFFFF;
            box-shadow: inset 0 0 50px 0 #92C9FF;
            border-radius: 10px;
            overflow: auto;
            margin-top: 20px;

            div {
                width: 100%;
                height: 164px;
                position: relative;

                &>img {
                    width: 100%;
                    height: 100%;
                }

                &>p {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 32px;
                        height: 32px;
                    }

                    span {
                        font-size: 26px;
                        color: #FFFFFF;
                        margin-top: 10px;
                    }
                }
            }
        }

        .leaftNews {
            width: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 10px 20px;

            p {
                display: flex;
                align-items: center;
                height: 40px;

                &::before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    flex-shrink: 0;
                    background: #999999;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                span {
                    font-size: var(--font_size_0);
                    color: #333333;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: block;
                }
            }
        }

        .swiperbox {
            width: 510px;
            height: 290px;
            overflow: hidden;
            flex-shrink: 0;

            /deep/ .van-swipe__indicators {
                right: 15px;
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
                width: 510px;
                height: 290px;
                position: relative;

                img {
                    width: 100%;
                    height: 290px;
                }

                p {
                    position: absolute;
                    height: 38px;
                    background: rgba($color: #000000, $alpha: 0.5);
                    box-sizing: border-box;
                    padding: 0 135px 0 15px;
                    overflow: hidden;
                    bottom: 0;
                    z-index: 1;
                    left: 0;
                    right: 0;

                    span {
                        display: block;
                        line-height: 38px;
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

    .newsRight {
        width: 700px;
        height: 100%;
        background: #FFFFFF;
        box-shadow: inset 0 0 50px 0 #92C9FF;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }

    .newslist {
        margin: 0 20px;
        box-sizing: border-box;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        border-bottom: 1PX solid #e6e6e6;
        position: relative;

        &:last-child {
            border: none;
        }

        &.leftarc {
            background: #FFFFFF;
            box-shadow: inset 0 0 50px 0 #92C9FF;
            border-radius: 10px;
            margin-top: 20px;
        }

        .titleimg {
            width: 115px;
            height: 59px;
            background: url('../../../../static/images/project/fgwPad/news.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 22px;
            color: #FFFFFF;
            position: absolute;
            left: -35px;
            line-height: 42px;
        }

        .newsTab {
            width: 100%;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;

            .tab {
                display: flex;
                align-items: center;

                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 44px;
                    padding: 0 10px;
                    font-size: var(--font_size_0);
                    margin-right: 10px;

                    &.active {
                        background: rgba(2, 84, 178, 0.09);
                        border-radius: 5px;
                        color: #0254B2;
                        font-weight: bold;
                    }
                }
            }

            .more {
                font-size: var(--font_size_0);
                color: #666666;
                cursor: pointer;
            }
        }

        .newsArt {
            width: 100%;
            margin-top: 20px;
            flex: 1;
            overflow-y: auto;

            .newsArtItem {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-bottom: 30px;
                cursor: pointer;

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

                    &>label {
                        font-size: 22px;
                        color: #0086D9;
                        flex-shrink: 0;
                        margin-right: 10px;
                    }

                    span {
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 22px;
                        color: #333333;
                        width: 100%;

                    }

                    &.new {
                        font-weight: bold;

                        &::before {
                            content: 'NEW';
                            background: rgba(227, 0, 0, 0.10);
                            border: 1PX solid #E30000;
                            border-radius: 2px;
                            width: 44px;
                            height: 22px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: var(--font_size_2);
                            color: #E30000;
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
