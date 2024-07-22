<template>
    <van-popup v-model="show" :style="{ height: '100%' }" :overlay="false">
        <van-button @click="show = false" class="p-close" :disabled="dis">关闭</van-button>

        <div class="pswiper-container">
            <div class="main">
                <div class="toptips" v-if="showPop">
                    <span>观看{{ count }}秒后自动关闭，{{ count1 }}秒后可点击关闭</span>
                </div>
                <van-swipe v-if="isSrc == '图片' || !isSrc" class="my-swipe" :autoplay="autoplay" indicator-color="white">
                    <van-swipe-item v-for="(ele, index) in dataList" :key="index">
                        <img :src="ele" />
                    </van-swipe-item>
                </van-swipe>
                <video style="height: 500px; object-fit: cover" loop controls muted autoplay :src="dataList[0]"
                    v-else></video>
                <div @click="isShow = true" class="pimg">
                    <img src="../../../../../static/images/hljMedicine/site.png" alt="" />
                </div>
                <van-popup v-model="isShow" :overlay="false" round closeable close-icon="close">
                    <div class="change">
                        <div class="content">
                            <p>设置</p>
                            <div class="lb">
                                <span>轮播频率</span>
                                <select v-model="selected" @change="changeTime">
                                    <option :value="item" v-for="(item, index) in list" :key="index">
                                        {{ item }}
                                    </option>
                                </select>
                                <span>秒</span>
                            </div>
                        </div>
                    </div>
                </van-popup>
            </div>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: "Pswiper",
    data() {
        return {
            show: true,
            count: 30,
            count1: 6,
            isShow: false,
            dis: true,
            list: ["2", "4", "6", "8"],
            selected: 2,
            dataList: [],
            isSrc: "",
            autoplay: 2000,
            showPop: true,
            Inter: ()=>{}
        };
    },
    props: {
        hljConfig: {
            type: Object,
            default: () => {
                return ({});
            },
        },
    },
    created() {
        dsf.http.get("ctrl/material/getFileInfor").then((res) => {
            this.isSrc = res.data.data.sclxText;
            this.dataList = res.data.data.idList.map((itme) => {
                return this.getPhotoSrc(`/ctrl/material/fileFlow?fileId=${itme}`);
            });
        });
    },
    methods: {
        getPhotoSrc(path) {
            return dsf.url.getWebPath(path);
        },
        changeTime() {
            this.autoplay = parseInt(this.selected) * 1000;
            dsf.util.saveToLocalStore("swiperSet",this.selected)
        },
    },
    mounted() {
        this.list = this.hljConfig.swiperSelect;
        this.selected = Number(dsf.util.loadLocalStore("swiperSet")?dsf.util.loadLocalStore("swiperSet"):2)
        this.autoplay = parseInt(this.selected) * 1000;
    },
    watch: {
        showPop: {
            handler(newV) {
                console.log(newV);
                if (newV) {
                    this.Inter = setInterval(() => {
                        if (this.count > 0) {
                            this.count--;
                        } else {
                            this.show = false;
                            this.isShow = false;
                            clearInterval(this.Inter);
                        }
                        if (this.count1 > 0) {
                            this.count1--;
                        } else {
                            this.dis = false;
                        }
                    }, 1000);
                }else{
                    clearInterval(this.Inter);
                }
            },
            immediate: true,
        },
    }
};
</script>

<style lang="scss" scoped>
.van-popup {
    ::v-deep .p-close {
        width: 75px !important;
        height: 45px;
        background: #cccccc;
        border-radius: 48px !important;
        position: absolute;
        top: 10px;
        right: 12px;
        z-index: 9;
        opacity: 0.5;

        .van-button__text {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #000;
            letter-spacing: 0;
            font-weight: 400;
        }
    }
}

.pswiper-container {
    width: 100vw;
    height: 100vh;

    .main {
        width: 100%;
        height: 100%;
        position: relative;
        background: url("../../../../../static/images/hljMedicine/bg-close.png");

        .toptips {
            position: fixed;
            top: 23px;
            left: 35%;
            text-align: center;
            line-height: 21px;

            span {
                font-size: 15px;
                color: #ffffff;
            }
        }

        .pimg {
            width: 25px;
            height: 25px;
            position: absolute;
            right: 110px;
            top: 23px;

            img {
                width: 25px;
                height: 25px;
            }
        }

        .change {
            width: 400px;
            height: 280px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .content {
                width: 100%;
                height: 100%;

                p {
                    width: 100%;
                    text-align: center;
                    display: block;
                    height: 35%;
                    border-bottom: 1px solid rgba(151, 151, 151, 1);
                    font-size: var(--font_size_0);
                    color: #333333;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10%;
                }

                .lb {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    span {
                        font-size: 15px;
                        color: #333333;
                        text-align: center;
                        line-height: 66px;
                        font-weight: 400;
                    }

                    select {
                        width: 100px;
                        height: 50px;
                        padding-left: 4%;
                        border: 1px solid rgba(151, 151, 151, 1);
                        border-radius: 8px;
                        background: none;
                        margin: 0 15px;
                        font-size: 22px;
                        color: #333333;
                        appearance: none;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        background: url("../../../../../static/images/hljMedicine/trangle.png") no-repeat;
                        background-size: 20% 20%;
                        background-position: right 10px center;
                    }
                }
            }
        }

        .my-swipe {
            .van-swipe-item {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    height: calc(100% - 250px);
                }
            }
        }
    }
}
</style>
