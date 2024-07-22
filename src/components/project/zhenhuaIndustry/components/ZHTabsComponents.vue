<template>
    <div class="DY-tabs">
        <div class="card">
            <div class="top">
                <div v-for="(item, index) in  tabList " :key="index" class="tags" :id="'item' + index">
                    <van-badge :content="item.badge" max="99">
                        <p :class="{ title: index == active }" @click="handelToogel(item, index)">{{ item.tagTitle }}</p>
                    </van-badge>
                    <!-- <span v-else :class="{ title: index == active }" @click="handelToogel(item, index)">{{ item.tagTitle
                    }}</span> -->
                </div>
            </div>
            <div class="showList" v-for="( cells, index ) in  tabList " :key="index" v-show="active == index"
                :style="minHeight">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list :finished="finished" :finished-text="finishedTips" v-model="loading" @load="onLoad"
                        offset="200">
                        <div v-for="( item, index ) in  cells.data " :key="index" class="content">
                            <div class="content_left">
                                <div class="titleCon" @click="goForm(item)">{{ item.title }}</div>
                                <div class="value">{{ item.time }}</div>
                            </div>
                            <div class="content_right" v-if="item.imgUrl">
                                <img :src="item.imgUrl" alt="">
                            </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
                <commonempty v-if="cells.data == undefined || cells.data.length <= 0" description="暂无新闻列表数据" />
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: "ZHTabsComponents",
    props: {
        userId: {
            type: String
        },
        currentActive: {
            type: String
        }
    },
    watch: {
        currentActive: {
            handler(newF, oldF) {
                if (newF) {
                    this.initNoticeData()

                }
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            active: 0,
            tabList: [],
            currentTabId: '',
            currentTabUrl: '',
            page: 0,
            loading: false,
            finished: false,
            refreshing: false,
            finishedTips: ''
        };
    },
    mounted() {
    },
    computed: {
        minHeight() {
            let h = (this.rows = dsf.config.ZHnews.showRows * 32);
            return `min-height:${h}px`;
        },
    },
    methods: {
        onRefresh() {
            this.finished = false;
            this.loading = true;
            this.onLoad();
        },
        onLoad() {
            if (this.refreshing) {
                this.page = 0;
                this.refreshing = false;
            }
            this.fetchData()
            console.log(1)
        },
        // 获取每一个tab页下面的内容：
        async fetchData() {
            let self = this;
            self.page += 1
            let start = (self.page - 1) * 15
            console.log('start: ', start);
            console.log(111111111)
            await dsf.http.post(self.currentTabUrl, {
                "columnId": self.currentTabId,
                "start": start,
                "limit": 15,
                "userId": this.userId,
                "x-auth-token": dsf.util.loadSessionStore("loginToken")
            }, { "headers": { "Content-Type": 'application/json' } }).then((res) => {
                console.log('获取tab下面内容的res: ', res);
                if (res.status == 200) {
                    let dataArr = []
                    res.data.data.forEach(el => {
                        dataArr.push({
                            title: el.bt,
                            time: el.fbsj,
                            url: el.url,
                            id: el.id,
                            imgUrl: el.imageUrl
                        })
                    })
                    // 当前tab的对象：
                    let currentTab = self.tabList.find(item => item.id == self.currentTabId)
                    currentTab.data = [...currentTab.data, ...dataArr]
                    self.loading = false
                    if (res.data.data.length < 15 || res.data.data.length == 0) {
                        this.finished = true;
                        this.finishedTips = "没有更多了";
                    }
                } else {
                    dsf.layer.toast(res.data.message)
                }
            }).catch((err) => {
                console.log('列表刷新接口报错err: ', err);
            })
        },
        initNoticeData() {
            let self = this
            dsf.http.post("fn/website/api/mobile/columnTabs", {
                "columnId": "230810175020a83AibJsZNqUdeVNFvc,230824121807qGW0USYTzgWE21UFSwV",
                "showRoot": "1",
                "userId": this.userId,
                "x-auth-token": dsf.util.loadSessionStore("loginToken")
            }, { "headers": { "Content-Type": 'application/json' } }).then((res) => {
                if (res.status == 200) {
                    res.data.data.forEach(ele => {
                        let obj = {}
                        obj.tagTitle = ele.name
                        obj.moreUrl = ele.moreUrl
                        obj.id = ele.id
                        obj.data = []
                        obj.tabUrl = "fn/website/api/mobile/getColumnContent"
                        self.tabList.push(obj)
                    })
                    for (let i = 0; i < self.tabList.length; i++) {
                        if (self.tabList[i].id == self.currentActive) {
                            self.currentTabId = self.tabList[i].id
                            self.currentTabUrl = self.tabList[i].tabUrl
                            self.active = i;
                            console.log('self.active: ', self.active);
                            console.log("11111111111111", self.tabList)
                        }
                    }
                    self.$nextTick(() => {
                        document.getElementById(`item${this.active}`).scrollIntoView({
                            behavior: "instant",
                            block: "nearest"
                        }
                        )
                    })

                } else {
                    dsf.layer.toast(res.data.message)
                }
            }).catch((err) => {
                console.log('获取新闻页通知公告的接口报错err: ', err);
            })
        },
        handelToogel(item, index) {
            this.loading = true
            this.active = index;
            this.tabList[index].data = []
            this.currentTabId = item.id
            this.currentTabUrl = item.tabUrl
            this.page = 0
            this.refreshing = false;
            this.finished = false
            this.fetchData()
            console.log(2)
        },
        change() {
            this.icoChange = !this.icoChange
        },
        // 查看更多：
        // goRoute() {
        //     let url = this.tabList[this.active].moreLink;
        //     let title = this.tabList[this.active].tagTitle;
        //     if (url.length) {
        //         if (url.indexOf("https") == 0 || url.indexOf("http") == 0) {
        //             this.$router.push({
        //                 name: "dsfIframe",
        //                 params: {
        //                     url: url,
        //                     title: title,
        //                 },
        //                 query: {
        //                     url: url,
        //                     title: title,
        //                 },
        //             });
        //         } else {
        //             this.$router.push(url);
        //         }
        //     } else {
        //         dsf.layer.toast("当前暂无更多");
        //     }
        // },
        goForm(item) {
            console.log('item: ', item);
            if (item.url.indexOf('weixin') > -1) {
                dsf.util.openWebviewToUrl({ url: item.url, title: item.title })
            } else if (item.url) {
                console.log('item.url: ', item.url);
                // dsf.http.post('/fn/fileToken/get', {}).then((res) => {
                //     if (res.data && res.data.code == 200) {
                //         let newUrl = item.url.split("?")[1].split("&")
                //         console.log('newUrl: ', newUrl);
                //         let tempUrl = `${dsf.config.login.oaRootPath}/ctrl/office/forwardPreview?${newUrl[0]}&${newUrl[1]}&${newUrl[2]}&token=${res.data.data}`
                //         console.log('tempUrl: ', tempUrl);
                //         dsf.util.openWebviewToUrl({ url: tempUrl, title: item.title })
                //     }
                // })
                dsf.util.openWebviewToUrl({ url: item.url, title: item.title })
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.DY-tabs {
    .card {

        .top {
            box-sizing: border-box;
            position: relative;
            padding-right: 0.1rem;
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 20px 15px 20px 15px;

            .tags {
                flex-shrink: 0;
                float: left;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 15px;
                color: #686A6F;

                p {
                    font-family: PingFangSC-Regular;
                    position: relative;
                    width: 100px;
                    height: 26.7px;
                    text-align: center;
                    margin-right: 16px;
                    line-height: 26.7px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    border: 1px solid #8F9297;
                    border-radius: 27.5px;
                }

                .title {
                    font-family: PingFangSC-Regular;
                    position: relative;
                    width: 100px;
                    height: 26.7px;
                    // color: var(--normal);
                    // background: var(--normal) .9;
                    background: #E9F2FE;
                    border: 1px solid rgba(9, 106, 230, .5);
                    // border: 1px solid var(--normal);
                    color: #096AE6;
                    border-radius: 27.5px;
                    text-align: center;
                    margin-right: 16px;
                    line-height: 26.7px;
                    padding: 0 10px;
                    font-weight: 700;
                }

            }

            .van-icon {
                display: block;
                float: right;
                font-size: 0.24rem;
                color: rgb(102, 102, 102);
                margin-top: 2%;
            }
        }

        .showList {
            width: 93%;
            margin: 0 auto;
            border-radius: 6px;
            background-color: #fff;
            margin-bottom: 20px;
            background-image: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
            box-shadow: 0px 1px 20px 0px rgba(166, 201, 235, 0.26);

            .van-pull-refresh {
                .van-list {
                    .content {
                        display: flex;
                        padding: 10px 25px;
                        font-size: 0.3rem;
                        border-bottom: 1px solid #EFF1F5;
                        margin-bottom: 10px;
                        margin-top: 10px;
                        min-height: 90px;

                        .content_left {
                            flex: 1;
                            margin-right: 5px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .titleCon {
                                width: 100%;
                                margin: 0 auto;
                                min-height: 20px;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #222325;
                                font-weight: 400;
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                text-overflow: -o-ellipsis-lastline;
                                overflow: hidden; //溢出内容隐藏
                                text-overflow: ellipsis; //文本溢出部分用省略号表示
                                display: -webkit-box; //特别显示模式
                                -webkit-line-clamp: 2; //行数
                                line-clamp: 2;
                                -webkit-box-orient: vertical; //盒子中内容竖直排列

                                &:before {
                                    position: absolute;
                                    display: block;
                                    width: 2px;
                                    height: 2px;
                                    border-radius: 50%;
                                    background: #222325;
                                    content: '';
                                    left: -5px;
                                    top: 50%;
                                    margin-top: -1px;
                                }
                            }

                            .value {
                                font-family: PingFangSC-Regular;
                                font-size: 13px;
                                color: #8F9297;
                                font-weight: 400;
                            }


                        }

                        .content_right {
                            width: 35%;
                            height: 70px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                    }

                    .content:nth-last-of-type(1) {
                        .value {
                            border: 0;
                        }
                    }
                }
            }
        }
    }
}

::-webkit-scrollbar {
    display: none;
}
</style>