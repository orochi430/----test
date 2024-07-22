<template>
<div v-if="errored" class="init-div">获取数据失败！</div>
<div v-else>
    <div v-if="news&&news.files&&news.files.length > 0">
        <van-tabs v-model="active">
            <van-tab title="详情">
                <div v-if="news" class="detail">
                    <div class="title">{{ news.title }}</div>
                    <div class="time">{{ news.sDate }}</div>
                    <div class="content" v-html="news.content"></div>
                </div>
                <div v-else class="init-div">
                    加载中…
                </div>
            </van-tab>
            <van-tab title="附件">
                <template v-for="file in files">
                    <file-item :key="file.id" :file="file" :is-show-count="false"></file-item>
                </template>
            </van-tab>
        </van-tabs>
    </div>
    <div v-else-if="news" class="detail">
        <div class="title">{{ news.title }}</div>
        <div class="time">{{ news.sDate }}</div>
        <div class="content" v-html="news.content"></div>
    </div>
    <div v-else class="init-div">
        加载中…
    </div>
</div>
</template>

<script>
import fileItem from './components/fileItem'
export default {
    components: {
        fileItem
    },
    data() {
        return {
            errored: false,
            loading: null,
            // title: '大会联络组成员及联络图信息',
            // date: '2021-08-16',
            // content: '<p>&nbsp;&nbsp;&nbsp;&nbsp;会议是汉语词汇，拼音是huì yì，意思是指有组织、有领导、有目的的议事活动，它是在限定的时间和地点，按照一定的程序进行的。会议一般包括议论、决定、行动3个要素。因此，必须做到会而有议、议而有决、决而有行，否则就是闲谈或议论，不能成为会议。会议是一种普遍的社会现象，几乎有组织的地方都会有会议，会议的主要功能包括决策、控制、协调和教育等功能。</p>',
            news: null,
            active: 0,
            files: []
        }
    },
    created() {
        this.loading = dsf.layer.loading();
        this.getNewsDetail();
    },
    mounted() {
        // this.setRead();
    },
    methods: {
        getNewsDetail() {
            let self = this;
            dsf.http
                .post(`fn/peopleCongress/newsDetail`, {
                    newsId: self.$route.params.newsId
                })
                .done(result => {
                    // result = result.data;
                    //console.log(result);
                    if (result.code == 200 && result.data) {
                        self.news = result.data;
                        // console.log(self.news);
                        if(result.data.files && result.data.files.length>0){
                            let arr = [];
                            result.data.files.map(item => {
                                arr.push(
                                    Object.assign({}, item, {
                                        type: item.fileName.substr(item.fileName.lastIndexOf(".") + 1)
                                    })
                                );
                            });
                            self.files.push(...arr);
                        }
                    }
                })
                .error(error => {
                    self.errored = true;
                    // console.log(error);
                    // dsf.layer.toast("数据获取失败！");
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        setRead() {
            let self = this;
            dsf.http
                .post(`fn/peopleCongress/setNewsRead`, {
                    newsId: self.$route.params.newsId
                })
                .done(result => {
                    // result = result.data;
                    //console.log(result);
                    if (result.code == 200) {
                        // self.news = result.data;
                    }
                })
                .error(error => {
                    // console.log(error);
                    dsf.layer.toast("设置已读失败！");
                })
                .always(() => {
                    // dsf.layer.closeLoading(self.loading);
                });
        }
    },
}
</script>

<style lang="scss" scoped>
.detail {
    min-height: 100%;
    background-color: #fff;
    padding: 16px;

    .title {
        font-size: var(--font_size_0);
        text-align: center;
        word-break: break-all;
    }

    .time {
        font-size: var(--font_size_4);
        padding: 10px 0;
        color: #999;
        text-align: center;
    }
}

.init-div {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -20px;
    top: 50%;
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
}
</style>
