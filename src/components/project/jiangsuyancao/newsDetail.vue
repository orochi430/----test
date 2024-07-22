<template>
<div ref="newsdetail">
    <van-nav-bar title="新闻详情" v-if="$route.query.showHeader == 1" left-text="返回" left-arrow @click-left="$router.go(-1)" fixed placeholder></van-nav-bar>
    <div class="detail">
        <div class="title">{{ news.title }}</div>
        <div class="time">
            <span>发布日期：{{ news.time }}</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;浏览人数：{{ news.views }}</span>
        </div>
        <!-- <img v-if="news.image" :src="news.image" alt="" style="padding-bottom: 0.2rem"> -->
        <div class="content" v-html="news.content" :style="{fontSize: fontSize + 'rem'}"></div>
        <!-- <div style="text-align: right;padding: 0.2rem 0">{{ news.publisher }}</div> -->
    </div>
</div>

</template>
<script>
import { Slider } from 'vant';
import VueMaterial from 'vue-material';
// import VueSocketIO from 'vue-socket.io'
export default {
    components: {[Slider.name]: Slider},
    data() {
        return {
            fontSize: 0.32,
            loading: null,
            news: {
                title: null,
                time: null,
                views: null,
                image: null,
                content: null,
                publisher: null,
            }
        }
    },
    created() {
        this.getNewsDetail();
    },
    mounted() {
        let self = this
        let store = {
            scale: 1
        };
        let detailEl = this.$refs.newsdetail
        detailEl.addEventListener('touchstart', function (event) {
            let touches = event.touches;
            let events = touches[0];
            let events2 = touches[1];
            
            // 第一个触摸点的坐标
            store.pageX = events.pageX;
            store.pageY = events.pageY;

            store.moveable = true;

            if (events2) {
                event.preventDefault();
                store.pageX2 = events2.pageX;
                store.pageY2 = events2.pageY;
            }

            store.originScale = store.scale || 1;
        });
        detailEl.addEventListener('touchmove', function (event) {
            if (!store.moveable) {
                return;
            }

            let touches = event.touches;
            let events = touches[0];
            let events2 = touches[1];
            // 双指移动
            if (events2) {
                event.preventDefault();
                // 第2个指头坐标在touchmove时候获取
                if (!store.pageX2) {
                    store.pageX2 = events2.pageX;
                }
                if (!store.pageY2) {
                    store.pageY2 = events2.pageY;
                }

                // 获取坐标之间的举例
                let getDistance = function (start, stop) {
                    return Math.hypot(stop.x - start.x, stop.y - start.y);
                };
                // 双指缩放比例计算
                let zoom = getDistance({
                    x: events.pageX,
                    y: events.pageY
                }, {
                    x: events2.pageX,
                    y: events2.pageY
                }) /
                getDistance({
                    x: store.pageX,
                    y: store.pageY
                }, {
                    x: store.pageX2,
                    y: store.pageY2
                });
                // 应用在元素上的缩放比例
                let newScale = store.originScale * zoom;
                // 最大缩放比例限制
                if (newScale > 2) {
                    newScale = 2;
                }
                // 记住使用的缩放值
                store.scale = newScale;
                // 字体缩放
                self.fontSize = 0.32 * newScale
            }
        });

        detailEl.addEventListener('touchend', function () {
            store.moveable = false;

            delete store.pageX2;
            delete store.pageY2;
        });
        detailEl.addEventListener('touchcancel', function () {
            store.moveable = false;

            delete store.pageX2;
            delete store.pageY2;
        });
    },
    methods: {
        getNewsDetail() {
            let loading = dsf.layer.loading()
            dsf.http.post(`fn/news/detail`, {
                id: this.$route.query.id,
                type: this.$route.query.type
            }).then(res => {
                if (res.data.code == 200) {
                    this.news = res.data.data;
                    this.news.time = this.$route.query.time
                }
                dsf.layer.closeLoading(loading)
                this.$nextTick(() => {
                    let detailEl = this.$el.querySelector('.content')
                    let pEls = this.$el.querySelectorAll('.content p')
                    for (let i = 0; i < pEls.length; i++) {
                        if (pEls[i].style.textAlign == 'center') {
                            pEls[i].style.textIndent = 0
                        }
                    }
                })
            }).error(error => {
                dsf.layer.toast("数据获取失败！");
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';
.detail {
    min-height: 100%;
    background-color: #fff;
    padding: 20px;

    .title {
        font-size: 18px;
        // text-align: center;
    }

    .time {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        color: #999;
    }
    .content {
        ::v-deep img {
            width: auto !important;
            display: inline-block;
        }
    }
}
</style>
