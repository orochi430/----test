<template>
    <div class="newsCom">
        <div class="newsCom_title">热点关注</div>
        <main>
            <header>
                <van-tabs v-model="active" swipe-threshold="3" @click="onClick" sticky>
                    <van-tab :title=item.name v-for="(item, index) in newsTabs" :key="index">
                        <div class="newlist_data">
                            <commonempty v-if="contentList == undefined || contentList.length <= 0" description="暂无列表数据" />
                            <div class="singlenew_data" v-for="(v, i) in contentList" :key="i" v-else @click="newsLink(v)">
                                <div class="singlenew_data_left">
                                    <p class="singlenew_title">{{ v.bt }}</p>
                                    <p class="singlenew_time">{{ v.fbsj }}</p>
                                </div>
                                <div class="singlenew_data_right" v-show="v.imageUrl">
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
        </main>
    </div>
</template>

<script>
export default {
    props: ['itemdata'],
    data() {
        return {
            userInfo: dsf.util.loadSessionStore("user"),
            newsTabs: [],
            currentId: '',
            contentList: [],
            moreLink: '',
            active: 0
        }
    },
    created() {
        this.initNewsData()
    },
    methods: {
        initNewsData() {
            let self = this
            dsf.http.post("fn/proxyRequest/forwardResource?proxyPageId=230923105225VWEmb6JoFZcjmKK774t&proxyComponentInterfaceKey=newsColumnTabs&proxyComponentName=ZhzgWorkerNewsComponents", {
                "columnId": "230810175020a83AibJsZNqUdeVNFvc,230824121807qGW0USYTzgWE21UFSwV",
                "showRoot": "1",
                "userId": this.userInfo.user_id,
                "x-auth-token": dsf.util.loadSessionStore("loginToken")
            }, { "headers": { "Content-Type": 'application/json' } }).then((res) => {
                if (res.status == 200) {
                    res.data.data.forEach(item => {
                        let obj = {}
                        obj.name = item.showName
                        obj.moreUrl = item.moreUrl
                        obj.id = item.id
                        self.newsTabs.push(obj)
                    })
                    self.currentId = self.newsTabs[0].id
                    self.moreLink = self.newsTabs[0].moreUrl

                    self.initNewsListData(self.currentId)
                } else {
                    dsf.layer.toast(res.data.message)
                }
            }).catch((err) => {
                console.log('新闻杂志的tab页签columnTabs_err: ', err);
                dsf.layer.toast(res.data.message)
            })
        },
        initNewsListData(currentId) {
            let self = this
            dsf.http.post("fn/proxyRequest/forwardResource?proxyPageId=230923105225VWEmb6JoFZcjmKK774t&proxyComponentInterfaceKey=newsColumnContent&proxyComponentName=ZhzgWorkerNewsComponents", {
                "columnId": currentId,
                // "imageLimit": 3,
                // "contentLimit": 3,
                "start": 0,
                "limit": 3,
                "userId": this.userInfo.user_id,
                "x-auth-token": dsf.util.loadSessionStore("loginToken")
            }, { "headers": { "Content-Type": 'application/json' } }).then((res) => {
                if (res.status == 200) {
                    // self.contentList = res.data.data.contentList
                    console.log('res: ', res);
                    self.contentList = res.data.data
                }
            })
        },
        onClick(name, title) {
            this.moreLink = this.newsTabs.find(ele => ele.name == title).moreUrl
            let obj = this.newsTabs.find(ele => ele.name == title)
            this.contentList = []
            this.swiperData = []
            this.initNewsListData(obj.id)
        },
        newsLink(item) {
            // 新闻点击函数：
            console.log('item: ', item);
            console.log('item.bt: ', item.bt);
            if (item.url) {
                if (item.url.indexOf('weixin') > -1) {
                    dsf.util.openWebviewToUrl({ url: item.url, title: item.bt })
                } else {
                    dsf.http.post('/fn/fileToken/get', {}).then((res) => {
                        if (res.data && res.data.code == 200) {
                            let newUrl = item.url.split("?")[1].split("&")
                            console.log('newUrl: ', newUrl);
                            let tempUrl = `${dsf.config.login.oaRootPath}/ctrl/office/forwardPreview?${newUrl[0]}&${newUrl[1]}&${newUrl[2]}&token=${res.data.data}`
                            console.log('tempUrl: ', tempUrl);
                            dsf.util.openWebviewToUrl({ url: tempUrl, title: item.bt })
                        }
                    })
                }
            }

        },
        goLink(url, item) {
            // 新闻公告查看更多：需要跳转到新闻二级页面并跳转到点击的tab
            console.log('item: ', item);
            // let urlLink = dsf.url.getRootPath() + `zhenhuaNews/${item.id}`
            // console.log('urlLink: ', urlLink);
            // let objectA = { treeId: item.id }
            // let tmpUrl = dsf.base64.encode('/commonList?fileType=xwgg&secQuery=' + JSON.stringify(objectA));
            // console.log('tmpUrl: ', tmpUrl);
            // let urlLink = `${dsf.config.login.oaRootPath}/fn/mobileSso/redirectAuth?code=${this.mobile}&state=${tmpUrl}&field=mobile`;
            // console.log('urlLink: ', urlLink);
            // dsf.util.openWebviewToUrl({ url: urlLink, title: item.name })
            
            let u = dsf.base64.encode(`/zhenhuaNews/${item.id}`);
            let tp = `${dsf.config.login.oaRootPath}/fn/mobileSso/redirectAuth?code=${dsf.util.loadSessionStore('user').mobile}&state=${u}&field=mobile`
            console.log('tp: ', tp);
            dsf.util.openWebviewToUrl({ url: tp, title: item.name })


        },
    }
}
</script>

<style lang="scss" scoped>
.newsCom {
    padding: 12px;
    padding-bottom: 0;
    margin: 1.5vh auto;
    font-size: 0.28rem;
    margin: 0.3rem 0.2rem;
    background: #ffffff;
    box-shadow: 0 1px 20px 0 rgba(166, 201, 235, 0.48);
    border-radius: 10px;

    .newsCom_title {
        font-family: PingFangSC-Semibold;
        font-size: var(--font_size_1);
        color: #333333;
        font-weight: 600;
        position: relative;
        padding-left: 10px;
    }

    main {
        margin-top: 12px;

        header {
            width: 100%;
            display: flex;
            align-items: center;

            ::v-deep .van-tabs {
                width: 100%;

                .van-tabs__wrap {}

                .van-tabs__nav {
                    overflow-x: auto;

                    .van-tab {
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: #686A6F;
                        font-weight: 400;
                        // margin-right: 30px;
                        margin-right: 10px;
                        height: 26.7px;
                        line-height: 26.7px;
                        border: 1px solid #82797d;
                        border-radius: 27.5px;
                    }

                    .van-tab--active {
                        font-family: PingFangSC-Medium;
                        font-size: 16px;
                        font-weight: 700;
                        background: #E9F2FE;
                        border: 1px solid rgba(9, 106, 230, .5);
                        border-radius: 27.5px;
                        text-align: center;
                        margin-right: 10px;
                        line-height: 26.7px;
                        padding: 0 10px;
                        color: #096AE6;
                        height: 26.7px;
                    }


                    .van-tabs__line {
                        display: none;
                    }
                }

                .newlist_data {
                    width: 100%;
                    // margin-top: 10px;
                    padding: 3.2%;
                    padding-bottom: 0;

                    .singlenew_data {
                        display: flex;
                        // position: relative;
                        margin-bottom: 18px;
                        border-bottom: 1px solid rgba(239, 241, 245, 1);
                        padding-bottom: 16.5px;
                        justify-content: space-between;

                        .singlenew_data_left {
                            // width: 65%;
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            max-height: 80px;

                            .singlenew_title {
                                text-overflow: -o-ellipsis-lastline;
                                overflow: hidden; //溢出内容隐藏
                                text-overflow: ellipsis; //文本溢出部分用省略号表示
                                display: -webkit-box; //特别显示模式
                                -webkit-line-clamp: 2; //行数
                                line-clamp: 2;
                                -webkit-box-orient: vertical; //盒子中内容竖直排列
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #222325;
                                font-weight: 400;
                                margin-bottom: 15px;
                                font-size: 16px;
                            }

                            .singlenew_time {
                                font-family: PingFangSC-Regular;
                                font-size: 13px;
                                color: #8F9297;
                                font-weight: 400;
                                // margin-top: 25px;
                            }
                        }

                        .singlenew_data_right {
                            // width: 25%;
                            // height: 73px;
                            width: 96px;
                            margin-left: 5px;

                            img {
                                height: 70px;
                                width: 100%;
                                object-fit: cover;
                            }

                            .noBorder:not([src]) {
                                opacity: 0;
                            }
                        }
                    }

                    .singlenew_data:nth-of-type(3) {
                        margin-bottom: 0;
                    }

                    .newlist_morelink {
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        p {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            // color: #1570E6;
                            color: var(--normal);
                            text-align: center;
                            font-weight: 400;
                        }

                        img {
                            width: 15px;
                            height: 15px;
                        }
                    }
                }
            }
        }
    }
}
</style>