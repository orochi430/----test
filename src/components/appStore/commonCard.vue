<template>
<div class="common-card" :style="{ height: `${cardHeight}` }">
    <div class="card-title" v-if="title">
        <p>
            <img src="./img/icon-line.png" alt="">
            <span>{{title}}</span>
        </p>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div v-for="(item,index) in appList" :key="index" class="list-box" @click="goDetail(item)">
                <div class="top-content">
                    <div class="app-info">
                        <img :src="item.icon" alt="">
                        <div>
                            <p>{{item['text']}}</p>
                            <span>{{item['module']}}</span>
                        </div>
                    </div>
                    <van-rate v-model="item['rate']" :size="12" color="#F19927" void-icon="star" void-color="#eee" readonly />
                </div>
                <div class="bottom-content">
                    <span>发布时间：{{item['time']}}</span>
                    <span>使用量：{{item['used'] || 0}}</span>
                </div>
            </div>
        </van-list>
    </van-pull-refresh>
    <commonempty v-if="!appList.length && !loading"></commonempty>
</div>
</template>

<script>
export default {
    name: 'commonCard',
    components: {},
    props: {
        title: {
            default: '',
            type: String
        },
        type: { //应用的类型值（推荐，热门，所有，我的）
            default: '',
            type: String
        },
        keyword: {
            default: '',
            type: String
        },
        cardHeight: { //卡片高度
            default: '',
            type: String
        }
    },
    data() {
        return {
            appList: [],
            pageIndex: 1,
            pageSize: 10,
            loading: false,
            finished: false,
            refreshing: false,
            url: '',
            apiObj: {}
        }
    },
    computed: {
        cardType: {
            get() {
                return this.type;
            },
            set() {} //添加一个空setter防止报错
        }
    },
    watch: {

    },
    created() {
        this.initUrl();
    },
    mounted() {},
    methods: {
        initUrl() {
            let obj = {
                    "moduleId": '190105143853JG60tzYub8kZVlHz41r',
                    "query_S-APP-0056": '1',
                    "zdfw": '1', //终端范围-移动端
                },
                newObj = {}
            switch (this.cardType) {
                case 'all': //所有
                    this.url = 'fn/application/store/230518181204g9QDOvekP21o3FtcX82/mobile/q';
                    newObj = {
                        "_content": this.keyword,
                        "query_S-APP-0096": "",
                        "query_S-APP-0087": "",
                    }
                    this.apiObj = {
                        ...obj,
                        ...newObj
                    }
                    break;
                case 'recommend': //推荐
                    this.url = 'fn/application/store/230518151804YdPmKWxiYAZ7HQHj7Ko/mobile/q';
                    this.apiObj = obj;
                    break;
                case 'hot': //热门
                    this.url = 'fn/application/store/230518180238gDkLQrJ3dNXmQmRUmYn/mobile/q';
                    this.apiObj = obj;
                    break;
                case 'my': //我的
                    this.url = 'fn/list/230518192726S3IUYa85cukZZxi88yz/mobile/q';
                    newObj = {
                        "listId": '230518192726S3IUYa85cukZZxi88yz',
                    }
                    this.apiObj = {
                        ...obj,
                        ...newObj
                    }
                    break;
                case 'applying': //申请中
                    this.url = 'fn/list/230519141156TOWA7ZDldtH2J6qMG0D/mobile/q';
                    newObj = {
                        "_content": this.keyword,
                        "listId": '230519141156TOWA7ZDldtH2J6qMG0D',
                    }
                    this.apiObj = {
                        ...obj,
                        ...newObj
                    }
                    break;
                case 'applyPass': //已通过
                    this.url = 'fn/list/230518192726S3IUYa85cukZZxi88yz/mobile/q';
                    newObj = {
                        "_content": this.keyword,
                        "listId": '230518192726S3IUYa85cukZZxi88yz',
                    }
                    this.apiObj = {
                        ...obj,
                        ...newObj
                    }
                    break;
                case 'applyReject': //已拒绝
                    this.url = 'fn/list/230519141254N97FnClw8F6KVxrkfT2/mobile/q';
                    newObj = {
                        "_content": this.keyword,
                        "listId": '230519141254N97FnClw8F6KVxrkfT2',
                    }
                    this.apiObj = {
                        ...obj,
                        ...newObj
                    }
                    break;
                default:
                    break;
            }
        },
        getList() {
            let self = this;
            if (this.refreshing) {
                this.appList = [];
                this.pageIndex = 1;
                this.refreshing = false;
            }
            let obj = Object.assign(this.apiObj, {
                "page": this.pageIndex,
                "limit": this.pageSize,
            })
            dsf.http.post(this.url, obj)
                .then(res => {
                    self.loading = false;
                    if (res && res.status == 200 && res.data && res.data.datas) {
                        let data = res.data.datas.map(item => {
                            return {
                                id: item.dataValue['S-BASE-0001'] || item.dataValue['app.S-BASE-0001'],
                                icon: dsf.url.getServerUrl(`fn/file/downloadImage?fileName=${item.dataValue['S-APP-0026']||item.dataValue['app.S-APP-0026']}`),
                                text: item.dataValue['S-APP-0001'] || item.dataValue['app.S-APP-0001'],
                                module: item.dataValue['S-APP-0066'] || item.dataValue['app.S-APP-0066'],
                                rate: Number(item.dataValue['S-APP-0110'] || item.dataValue['app.S-APP-0110']),
                                time: item.dataValue['S-APP-0108'] || item.dataValue['app.S-APP-0108'],
                                used: item.dataValue['S-APP-0109'] || item.dataValue['app.S-APP-0109']
                            }
                        })
                        if (self.appList.length > 0) {
                            self.appList = [...self.appList, ...data]
                        } else {
                            self.appList = data
                        }
                        self.pageIndex++;
                        if (self.appList.length == res.data.total || res.data.datas.length < self.pageSize) {
                            self.finished = true;
                        }
                    } else {
                        // self.dsf.layer.toast(res.message);
                        self.finished = true;
                    }
                })
                .catch(res => {
                    // self.dsf.layer.toast(res.message);
                })
                .finally(() => {
                    self.finished = true;
                    self.loading = false;
                });
        },
        onLoad() {
            this.getList();
        },
        onRefresh() {
            this.finished = false;
            this.loading = true;
            this.refreshing = true;
            // this.appList = [];
            this.pageIndex = 1;
            this.getList();
        },
        goDetail(item) {
            this.$router.push({
                path: `/applicationDetail/${item.id}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.common-card {
    width: 100%;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
    border-radius: 5px;
    // margin-bottom: 10px;
    max-height: 100vh;
    overflow: auto;

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

    .list-box {
        // width: 100%;
        // height: auto;

        // li {
        width: 100%;
        // height: 72px;
        background: #FFFFFF;
        border: 0.5px solid rgba(216, 216, 216, 0.72);
        border-radius: 2px;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;

        &:last-child {
            margin: 0;
        }

        .top-content {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .app-info {
                display: flex;
                width: calc(100% - 80px);

                img {
                    width: 34px;
                    height: 34px;
                    margin-right: 10px;
                }

                &>div {
                    width: calc(100% - 50px);

                    p {
                        font-size: var(--font_size_3);
                        color: #333333;
                        font-weight: 500;
                    }

                    span {
                        font-size: 10px;
                        color: #666666;
                        font-weight: 400;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        display: block;
                        width: 100%;
                    }
                }
            }

            .van-rate {
                max-width: 80px;
                margin-top: 5px;
            }
        }

        .bottom-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;

            span {
                font-size: 10px;
                color: #666666;
                font-weight: 400;
            }
        }

        // }
    }
}
</style>
