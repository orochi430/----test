<template>
<div class="store-container" :style="{ height: `calc(100vh - ${dsf.util.getOffsetTop()} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'})` }">
    <div class="store-head">
        <van-search v-model="keyword" placeholder="请输入检索词" left-icon="" @search="search" :clearable="false">
            <template #left-icon>
                <i class="iconfont iconsousuo i1" style="color: #fff;" @click="search(keyword)"></i>
            </template>
        </van-search>
        <div class="hot-words">
            热门搜索：
            <span v-for="(item, index) in hotWords" :key="index" @click="search(item.hotWord)">{{ item.hotWord }}</span>
        </div>
    </div>
    <div class="main-conatiner">
        <div class="swiper-container">
            <van-swipe class="my-swipe" :autoplay="5000" :show-indicators="false">
                <van-swipe-item v-for="(item,index) in categoriesList" :key="index">
                    <div class="icon-list">
                        <div v-for="(el,i) in item" :key="i" @click="search(el.text)">
                            <img :src="dsf.url.getWebPath(el.icon)" alt="">
                            <p>{{el.text}}</p>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="common-card">
            <div class="card-title">
                <p>
                    <img src="./img/icon-line.png" alt="">
                    <span>推荐应用</span>
                </p>
                <img src="./img/icon-more.png" alt="" class="more" @click="goMore('recommend')">
            </div>
            <div class="list-box" v-if="recommendApp && recommendApp.length > 0">
                <common-item v-for="(item, index) in recommendApp" :key="index" :data="item.dataValue"></common-item>
            </div>
            <commonempty v-else description="暂无数据" />
        </div>
        <div class="common-card">
            <div class="card-title">
                <p>
                    <img src="./img/icon-line.png" alt="">
                    <span>热门应用</span>
                </p>
                <img src="./img/icon-more.png" alt="" class="more" @click="goMore('hot')">
            </div>
            <div class="list-box" v-if="hotApp && hotApp.length > 0">
                <common-item v-for="(item, index) in hotApp" :key="index" :data="item.dataValue"></common-item>
            </div>
            <commonempty v-else description="暂无数据" />
        </div>
        <div class="common-card">
            <div class="card-title">
                <p>
                    <img src="./img/icon-line.png" alt="">
                    <span>应用列表</span>
                </p>
                <img src="./img/icon-more.png" alt="" class="more" @click="goMore('all')">
            </div>
            <div class="list-box" v-if="allApp && allApp.length > 0">
                <common-item v-for="(item, index) in allApp" :key="index" :data="item.dataValue"></common-item>
            </div>
            <commonempty v-else description="暂无数据" />
        </div>
    </div>
</div>
</template>

<script>
import CommonCard from './commonCard.vue';
import CommonItem from './commonItem.vue';
export default {
    name: 'index',
    components: {
        CommonCard,
        CommonItem
    },
    props: {},
    data() {
        return {
            moduleId: '190105143853JG60tzYub8kZVlHz41r',
            keyword: '',
            hotWords: [],
            categoriesList: [],
            recommendApp: [],
            hotApp: [],
            allApp: []
        }
    },
    computed: {},
    watch: {},
    created() {
        this.getHotWords();
        this.getCategory();
        this.getRecommendList();
        this.getHotList();
        this.getAllList();
    },
    mounted() {

    },
    methods: {
        search(value) {
            this.$router.push({
                path: `/searchResult`,
                query: {
                    key: value
                }
            })
        },
        goMore(type) {
            this.$router.push({
                path: `/myApp`,
                query: {
                    type: type
                }
            })
        },
        // 热词
        getHotWords() {
            let that = this;
            dsf.http.get("fn/application/store/hotwords")
                .then(res => {
                    if (res && res.data && res.data.code == 200 && res.data.data) {
                        that.hotWords = res.data.data;
                    }
                })
                .catch(res => {})
                .finally(() => {});
        },
        // 获取分类
        getCategory() {
            let that = this;
            let newArr = [];
            dsf.http.get("fn/application/store/getCategory")
                .then(res => {
                    if (res && res.data && res.data.code == 200 && res.data.data) {
                        newArr = res.data.data;
                        let len = newArr.length;
                        let lineNum = Math.ceil(len / 10);
                        for (let i = 0; i < lineNum; i++) {
                            let tempElement = newArr.slice(i * 10, (i + 1) * 10);
                            that.categoriesList.push(tempElement);
                        }
                    }
                })
                .catch(res => {})
                .finally(() => {});
        },
        // 推荐应用
        getRecommendList() {
            let that = this;
            let obj = {
                "moduleId": this.moduleId,
                "page": 1,
                "limit": 3,
                "query_S-APP-0056": "1",
            }
            dsf.http.post("fn/application/store/230518151804YdPmKWxiYAZ7HQHj7Ko/mobile/q", obj)
                .then(res => {
                    if (res && res.status == 200 && res.data && res.data.datas) {
                        that.recommendApp = res.data.datas;
                        that.recommendApp.forEach(item => {
                            item.dataValue['S-APP-0110'] = Number(item.dataValue['S-APP-0110']);
                        })
                    }
                })
                .catch(res => {})
                .finally(() => {});
        },
        // 热门应用
        getHotList() {
            let that = this;
            let obj = {
                "moduleId": this.moduleId,
                "page": 1,
                "limit": 3,
                "query_S-APP-0056": "1",
            }
            dsf.http.post("fn/application/store/230518180238gDkLQrJ3dNXmQmRUmYn/mobile/q", obj)
                .then(res => {
                    if (res && res.status == 200 && res.data && res.data.datas) {
                        that.hotApp = res.data.datas;
                        that.hotApp.forEach(item => {
                            item.dataValue['S-APP-0110'] = Number(item.dataValue['S-APP-0110']);
                        })
                    }
                })
                .catch(res => {})
                .finally(() => {});
        },
        // 所有应用
        getAllList() {
            let that = this;
            let obj = {
                "moduleId": this.moduleId,
                "page": 1,
                "limit": 10,
                "query_S-APP-0056": "1", //使用终端：1 移动
                "query_S-APP-0096": "", //行业
                "query_S-APP-0087": "", //分类
            }
            dsf.http.post("fn/application/store/230518181204g9QDOvekP21o3FtcX82/mobile/q", obj)
                .then(res => {
                    if (res && res.status == 200 && res.data && res.data.datas) {
                        that.allApp = res.data.datas;
                        that.allApp.forEach(item => {
                            item.dataValue['S-APP-0110'] = Number(item.dataValue['S-APP-0110']);
                        })
                    }
                })
                .catch(res => {})
                .finally(() => {});
        }
    }
}
</script>

<style lang="scss" scoped>
.store-container {
    width: 100%;
    height: auto;

    .store-head {
        width: 100%;
        height: 189px;
        background: url(img/bg.png) no-repeat center top;
        background-size: 100% 100%;
        padding: 10px;
        box-sizing: border-box;

        .van-search {
            height: 30px;
            padding: 0;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.26);

            .van-search__content {
                background-color: transparent;
                height: 100%;
                padding: 0 0 0 10px;

                ::v-deep input {
                    color: #fff;

                    &::placeholder {
                        color: #fff;
                    }
                }
            }
        }

        .hot-words {
            // display: flex;
            font-size: var(--font_size_4);
            color: #FFFFFF;
            margin-top: 5px;

            span {
                text-decoration: underline #fff solid;
                margin-right: 10px;
            }
        }
    }

    .main-conatiner {
        width: 100%;
        height: auto;
        padding: 10px;
        box-sizing: border-box;
        margin-top: -30px;

        .swiper-container {
            width: 100%;
            height: 154px;
            background: #FFFFFF;
            box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
            border-radius: 4px;
            padding: 16px;
            box-sizing: border-box;
            margin-bottom: 10px;

            .van-swipe-item {
                width: 100%;

                .icon-list {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;

                    div {
                        width: 20%;
                        height: 50%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;

                        img {
                            width: 34px;
                            height: 34px;
                        }

                        p {
                            font-size: var(--font_size_4);
                            color: #333333;
                            margin-top: 3px;
                        }
                    }
                }
            }
        }

        .common-card {
            width: 100%;
            height: auto;
            padding: 10px;
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
            border-radius: 5px;
            margin-bottom: 10px;
            // max-height: 100vh;

            .card-title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                // padding: 10px 0;
                margin-bottom: 10px;

                p {
                    display: flex;
                    align-items: center;

                    img {
                        width: 5px;
                        height: 18px;
                        margin-right: 5px;
                    }

                    span {
                        font-size: var(--font_size_1);
                        color: #333333;
                        font-weight: 600;
                    }
                }

                .more {
                    width: 15px;
                    height: 15px;
                }
            }
        }

    }
}
</style>
