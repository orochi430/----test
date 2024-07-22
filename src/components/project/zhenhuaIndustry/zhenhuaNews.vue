<template>
    <div class="news">
        <!-- <div class="news_top">
            <header>
                <van-tabs v-model="active" swipe-threshold="3" @click="onClick" sticky>
                    <van-tab :title=item.name v-for="(item, index) in newsTabs" :key="index">
                        <commonempty v-if="swiperData == undefined || swiperData.length <= 0" description="暂无轮播图数据" />
                        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-else>
                            <van-swipe-item v-for="(ele, ind) in swiperData" :key="ind" @click="imageLink(ele)">
                                <div class="swipernews_data">
                                    <img :src=ele.imageUrl alt="">
                                    <p>{{ ele.bt }}</p>
                                </div>
                            </van-swipe-item>
                        </van-swipe>
                        <div class="newlist_data">
                            <commonempty v-if="contentList == undefined || contentList.length <= 0"
                                description="暂无新闻列表数据" />
                            <div class="singlenew_data" v-for="(v, i) in contentList" :key="i" v-else @click="newsLink(v)">
                                <div class="singlenew_data_left">
                                    <p class="singlenew_title">{{ v.bt }}</p>
                                    <p class="singlenew_time">{{ v.fbsj }}</p>
                                </div>
                                <div class="singlenew_data_right">
                                    <img :src=v.imageUrl alt="" :class="{ noBorder: !v.imageUrl }">
                                </div>
                            </div>
                            <div class="newlist_morelink" @click="goLink(moreLink, item)">
                                <p>查看更多</p>
                                <van-icon name="arrow" color="var(--normal)" />
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </header>
        </div>
        <div class="news_bottom">
            <ZHTabsComponents :userId=userInfo.user_id></ZHTabsComponents>
        </div> -->
        <ZHTabsComponents :userId="userInfo.user_id" :currentActive="swiperActive"></ZHTabsComponents>
    </div>
</template>

<script>
import ZHTabsComponents from './components/ZHTabsComponents.vue'

export default {
    data() {
        return {
            userInfo: dsf.util.loadSessionStore("user"),
            active: 0,
            newsTabs: [],
            currentId: '',
            contentList: [],
            swiperData: [],
            moreLink: '',
            mobile: dsf.util.loadSessionStore("user").mobile,
            swiperActive: ''
        };
    },
    components: {
        ZHTabsComponents,
    },
    mounted() {
        // this.initNewsData()
        console.log('this.$route.params.active: ', this.$route.params.active);
        console.log('this.$route: ', this.$route);
        console.log('this.$route: ', this.$route.params.active);
        this.swiperActive = this.$route.params.active

        console.log('父组件this.swiperActive: ', this.swiperActive);
    },
    methods: {
        // initNewsData() {
        //     let self = this
        //     dsf.http.post("fn/proxyRequest/forwardResource?proxyPageId=231008132002U6AgDtIxt7Jnrg2GA7T&proxyComponentInterfaceKey=columnTabs&proxyComponentName=ZhzgWorkerNewsComponents", {
        //         "columnId": "230810175020a83AibJsZNqUdeVNFvc",
        //         "showRoot": "0",
        //         "userId": this.userInfo.user_id,
        //         "x-auth-token": dsf.util.loadSessionStore("loginToken")
        //     }, { "headers": { "Content-Type": 'application/json' } }).then((res) => {
        //         if (res.status == 200) {
        //             res.data.data.forEach(item => {
        //                 let obj = {}
        //                 obj.name = item.showName
        //                 obj.moreUrl = item.moreUrl
        //                 obj.id = item.id
        //                 self.newsTabs.push(obj)
        //             })
        //             self.currentId = self.newsTabs[0].id
        //             self.moreLink = self.newsTabs[0].moreUrl

        //             self.initNewsListData(self.currentId)
        //         } else {
        //             dsf.layer.toast(res.data.message)
        //         }
        //     }).catch((err) => {
        //         console.log('新闻杂志的tab页签columnTabs_err: ', err);
        //         dsf.layer.toast(res.data.message)
        //     })
        // },
        // initNewsListData(currentId) {
        //     let self = this
        //     dsf.http.post("fn/proxyRequest/forwardResource?proxyPageId=231008132002U6AgDtIxt7Jnrg2GA7T&proxyComponentInterfaceKey=columnTabsNewsData&proxyComponentName=ZhzgWorkerNewsComponents", {
        //         "columnId": currentId,
        //         "imageLimit": 3,
        //         "contentLimit": 3,
        //         "userId": this.userInfo.user_id,
        //         "x-auth-token": dsf.util.loadSessionStore("loginToken")
        //         // } // 原来接口请求参数
        //     }, { "headers": { "Content-Type": 'application/json' } }).then((res) => {
        //         if (res.status == 200) {
        //             self.contentList = res.data.data.contentList
        //             self.swiperData = res.data.data.imageList
        //         }
        //     })
        // },
        // onClick(name, title) {
        //     this.moreLink = this.newsTabs.find(ele => ele.name == title).moreUrl
        //     let obj = this.newsTabs.find(ele => ele.name == title)
        //     this.contentList = []
        //     this.swiperData = []
        //     this.initNewsListData(obj.id)
        // },
        // goLink(url, item) {
        //     // 新闻公告查看更多：
        //     console.log('item: ', item);
        //     console.log('url: ', url);
        //     let objectA = { treeId: item.id }
        //     let tmpUrl = dsf.base64.encode('/commonList?fileType=xwgg&secQuery=' + JSON.stringify(objectA));
        //     console.log('tmpUrl: ', tmpUrl);
        //     let urlLink = `${dsf.config.login.oaRootPath}/fn/mobileSso/redirectAuth?code=${this.mobile}&state=${tmpUrl}&field=mobile`;
        //     console.log('urlLink: ', urlLink);
        //     dsf.util.openWebviewToUrl({ url: urlLink, title: "新闻公告" })
        // },
        // imageLink(ele) {
        //     // 图片点击函数
        //     console.log('ele: ', ele);
        //     console.log('ele.bt: ', ele.bt);

        //     dsf.util.openWebviewToUrl({ url: ele.url, title: ele.bt })
        // },
        // newsLink(item) {
        //     // 新闻点击函数：
        //     console.log('item: ', item);
        //     console.log('item.bt: ', item.bt);
        //     dsf.util.openWebviewToUrl({ url: item.url, title: item.bt })
        // }
    }
}
</script>

<style lang="scss" scoped>
.news {
    width: 100%;
    //display: flex;
    //flex-direction: column;

    // .news_top {
    //     header {
    //         width: 100%;
    //         display: flex;
    //         align-items: center;

    //         ::v-deep .van-tabs {
    //             width: 100%;
    //             .van-tabs__wrap {
    //                 border-bottom: 1px solid rgb(221, 221, 221);
    //             }
    //             .van-tabs__nav {
    //                 overflow-x: auto;

    //                 .van-tab--active {
    //                     color: var(--normal) !important;
    //                     font-family: PingFangSC-Medium;
    //                     font-size: 16px;
    //                     font-weight: 700;
    //                 }

    //                 .van-tab {
    //                     // width: 125px;
    //                     font-family: PingFangSC-Regular;
    //                     font-size: 16px;
    //                     color: #686A6F;
    //                     font-weight: 400;
    //                     margin-right: 30px;
    //                 }

    //                 .van-tabs__line {
    //                     background-color: var(--normal) !important;
    //                 }
    //             }

    //             .my-swipe {
    //                 margin-top: 10px;
    //                 .van-swipe-item {
    //                     color: #fff;
    //                     font-size: 15px;
    //                     line-height: 300px;
    //                     text-align: center;
    //                     background-color: #39a9ed;
    //                     height: 194px;
    //                     font-family: PingFangSC-Medium;
    //                     font-weight: 700;

    //                     .swipernews_data {
    //                         width: 100%;
    //                         height: 100%;
    //                         position: relative;

    //                         img {
    //                             width: 100%;
    //                             height: 100%;
    //                         }

    //                         p {
    //                             position: absolute;
    //                             bottom: 30px;
    //                             width: 90%;
    //                             margin-left: 5%;
    //                             white-space: nowrap;
    //                             overflow: hidden;
    //                             text-overflow: ellipsis;
    //                         }
    //                     }
    //                 }

    //                 .van-swipe__indicators {
    //                     .van-swipe__indicator {
    //                         border-radius: 0;
    //                     }
    //                 }
    //             }

    //             .newlist_data {
    //                 width: 100%;
    //                 margin-top: 20px;
    //                 padding: 3.2%;

    //                 .singlenew_data {
    //                     display: flex;
    //                     // position: relative;
    //                     margin-bottom: 18px;
    //                     border-bottom: 1px solid rgba(239, 241, 245, 1);
    //                     padding-bottom: 16.5px;
    //                     justify-content: space-between;

    //                     .singlenew_data_left {
    //                         width: 65%;
    //                         display: flex;
    //                         flex-direction: column;
    //                         justify-content: space-between;
    //                         max-height: 80px;

    //                         .singlenew_title {
    //                             text-overflow: -o-ellipsis-lastline;
    //                             overflow: hidden; //溢出内容隐藏
    //                             text-overflow: ellipsis; //文本溢出部分用省略号表示
    //                             display: -webkit-box; //特别显示模式
    //                             -webkit-line-clamp: 2; //行数
    //                             line-clamp: 2;
    //                             -webkit-box-orient: vertical; //盒子中内容竖直排列
    //                             font-family: PingFangSC-Regular;
    //                             font-size: 14px;
    //                             color: #222325;
    //                             font-weight: 400;
    //                         }

    //                         .singlenew_time {
    //                             font-family: PingFangSC-Regular;
    //                             font-size: 13px;
    //                             color: #8F9297;
    //                             font-weight: 400;
    //                         }
    //                     }

    //                     .singlenew_data_right {
    //                         width: 25%;
    //                         height: 60px;

    //                         img {
    //                             height: 60px;
    //                             width: 100%;
    //                             object-fit: cover;
    //                         }

    //                         .noBorder:not([src]) {
    //                             opacity: 0;
    //                         }
    //                     }
    //                 }

    //                 // .singlenew_data::after {
    //                 //     content: '';
    //                 //     width: 100%;
    //                 //     height: 2px;
    //                 //     position: absolute;
    //                 //     bottom: 0;
    //                 //     top: 105px;
    //                 //     background-color: rgba(239, 241, 245, 1);
    //                 // }


    //                 .newlist_morelink {
    //                     height: 40px;
    //                     display: flex;
    //                     align-items: center;
    //                     justify-content: center;

    //                     p {
    //                         font-family: PingFangSC-Regular;
    //                         font-size: 14px;
    //                         // color: #1570E6;
    //                         color: var(--normal);
    //                         text-align: center;
    //                         font-weight: 400;
    //                     }

    //                     img {
    //                         width: 15px;
    //                         height: 15px;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // .news_bottom {
    //     // height: 100px;
    //     flex: 1;
    //     background: url(../../../../static/images/project/zhenhuaIndustry/tzgg_back.png) no-repeat;
    //     background-size: 100% 100%;
    // }
}
</style>