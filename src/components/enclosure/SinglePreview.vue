<template>
<div class="SinglePreview">
    <div class="preview-swipe">
        <van-swipe class="my-swipe" :show-indicators="false" :loop="false" @change="onChange" ref="mySwipe">
            <van-swipe-item v-for="(img,i) in imgs" :key="i" v-focus ref="mySwipeItem">
                <img v-lazy="img" ref="viewImg" class="view-img" />
                <span :class="dsf.util.getClientType() == 'iPad' ? 'pad-pagenum' : 'pagenum'">{{i + 1}}/{{imgs.length}}</span>
            </van-swipe-item>
        </van-swipe>
        <i class="iconfont iconarrow-left" @click="turnLeft" v-show="index != 1"></i>
        <i class="iconfont iconarrow-right" @click="turnRight" v-show="index < imgs.length"></i>
        <!-- <p class="pre-page" @click="turnLeft"></p> -->
        <!-- <p class="next-page" @click="turnRight"></p> -->
    </div>
    <div class="catalogue" @click="showPageNum=true">
        <van-icon name="coupon-o" />
    </div>
    <van-popup v-model="showPageNum" position="left" class="file_popup" get-container="body">
        <div class="pages">
            <p>跳转至：</p>
            <a v-for="idx in imgs.length" :key="idx" @click="goPageNum(idx)">第{{idx}}页</a>
        </div>
    </van-popup>
</div>
</template>

<script>
import Vue from 'vue'
import '@/common/pinchzoom.js'

Vue.directive('focus', {
    inserted: function (el) {
        // 聚焦元素
        new RTP.PinchZoom(el, {});
    }
})
export default {
    name: 'SinglePreview',
    components: {},
    props: {
        imgs: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            show: true,
            index: 1,
            images: [],
            showPageNum: false,
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        onChange(index) {
            this.index = index + 1;
        },
        turnLeft() {
            let transform = this.$refs.mySwipeItem[this.index - 1].$el.style.transform;
            let scale = transform.substr(transform.indexOf('(') + 1, 1);
            if (Number(scale) > 1) {
                dsf.layer.toast("请先停止缩放页面！");
            } else {
                this.$refs.mySwipe.prev();
            }
        },
        turnRight() {
            let transform = this.$refs.mySwipeItem[this.index - 1].$el.style.transform;
            let scale = transform.substr(transform.indexOf('(') + 1, 1)
            if (Number(scale) > 1) {
                dsf.layer.toast("请先停止缩放页面！");
            } else {
                this.$refs.mySwipe.next();
            }
        },
        goPageNum(num) {
            this.$refs.mySwipe.swipeTo(num - 1);
            this.showPageNum = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

* {
    touch-action: pan-y; // 启用单指垂直平移手势
}

.SinglePreview {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-shrink: 0; //固定元素,不被挤压
    flex-direction: column;
    // overflow: auto;

    .preview-swipe {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // flex-shrink: 0; 
        overflow-y: auto;

        .my-swipe {
            width: 100vw;
            height: auto;
            overflow-y: auto;

            .van-swipe-item {
                width: 100vw;
                height: auto;
                min-height: calc(100vw * 1.413);
                margin: 10px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
                box-sizing: border-box;

                img {
                    width: 90%;
                    // height: calc(100% - 10px);
                    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.16); // 阴
                }
            }

            span {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #FFF;
                color: #999;
                box-shadow: 0 0 10px #ccc;
                margin: 10px 0;
            }

            .pagenum {
                width: 60px;
                height: 24px;
                border-radius: 12px;
                font-size: var(--font_size_3);
            }

            .pad-pagenum {
                width: 90px;
                height: 36px;
                border-radius: 18px;
                font-size: 18px;
            }
        }

        .iconfont {
            font-size: 40px;
            @include font-theme("normal");
        }

        .iconarrow-left {
            position: absolute;
            left: 1%;
            top: 50%;
        }

        .iconarrow-right {
            position: absolute;
            right: 1%;
            top: 50%;
        }

        p.pre-page {
            position: absolute;
            left: 5%;
            bottom: 8%;
            width: 20%;
            height: 20%;
        }

        p.next-page {
            position: absolute;
            right: 5%;
            bottom: 8%;
            width: 20%;
            height: 20%;
        }
    }

}

@media screen and (max-width:999px) {
    .catalogue {
        width: 40PX;
        height: 40PX;
        background: #FFF;
        border-radius: 50%;
        box-shadow: 0 0 10px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 2%;
        top: 2%;
        z-index: 999;

        i {
            font-size: 24PX;
        }
    }

    .pages {
        width: 30vw;
        height: 100vh;
        box-sizing: border-box;
        padding: 10PX;
        background: #FFF;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        p {
            font-size: 16PX;
            font-weight: bold;
            color: #333;
            margin-bottom: 15PX;
        }

        a {
            width: 100%;
            // height: 32px;
            border-bottom: 1PX solid #ebebeb;
            display: flex;
            align-items: center;
            font-size: 16PX;
            color: #333;
            padding: 10PX 0;
        }
    }
}

@media screen and (min-width:1000px) {
    .catalogue {
        width: 60PX;
        height: 60PX;
        background: #FFF;
        border-radius: 50%;
        box-shadow: 0 0 10px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 2%;
        top: 2%;
        z-index: 999;

        i {
            font-size: 28PX;
        }
    }

    .pages {
        width: 30vw;
        height: 100vh;
        box-sizing: border-box;
        padding: 20px;
        background: #FFF;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        p {
            font-size: 18PX;
            font-weight: bold;
            color: #333;
            margin-bottom: 20PX;
        }

        a {
            width: 100%;
            // height: 32px;
            border-bottom: 1PX solid #ebebeb;
            display: flex;
            align-items: center;
            font-size: 18PX;
            color: #333;
            padding: 15PX 0;
        }
    }
}
</style>
