<template>
<div>
    <van-sticky offset-top="0rem" style="border-bottom:1px solid #f5f5f5">
        <van-search v-model="keyword" :show-action="false" sticky placeholder="搜索词"></van-search>
    </van-sticky>
    <div v-if="list.length > 0">
        <div v-for="item in onSearch(keyword)" :key="item.id" class="opnion" @click="link(item)">
            <!-- <div class="icon"><img src="" alt=""></div> -->
            <div class="info">
                <div class="title">
                    <span class="text ellipsis">{{ item.content }}</span>
                    <van-tag v-if="!item.isReplied" round size="medium" color="rgba(233,22,25,0.1)" text-color="#E91619">未回复</van-tag>
                    <van-tag v-else round size="medium" color="rgba(102,102,102,0.1)" text-color="#666">已回复</van-tag>
                </div>
                <div class="time">{{ item.date }}</div>
            </div>
        </div>
    </div>
    <commonempty v-else :image="require('static/images/peopleCongress/img_zwfk.png')" class="opinion-empty" description="暂无建议" />
    <div class="blank"></div>
    <div class="btn-container">
        <van-button class="btn" type="info" @click="$router.push({name: 'peopleCongressFeedback', params: { meetingId: $route.params.meetingId }})">意见建议</van-button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            keyword: '',
            list: [],
            loading: null,
            isFirstLoad: false // 是否初次加载
        }
    },
    created() {
        let self = this;
        self.isFirstLoad = true;
        self.loading = dsf.layer.loading();
        self.getSuggestionsList();
        // 刷新事件监听
        // self.$eventBus.OnrefreshNPC(self, () => {
        //     self.getSuggestionsList();
        // });
    },
    mounted() {},
    activated() {
        let self = this;
        // 刷新意见列表
        if (!self.isFirstLoad) {
            // self.list = [];
            self.loading = dsf.layer.loading();
            self.getSuggestionsList();
        }
        self.isFirstLoad = false;
    },
    methods: {
        link(item) {
            this.$router.push({
                name: 'peopleCongressFeedback',
                params: {
                    // meetingId: this.$route.params.meetingId,
                    id: item.id
                }
            })
        },
        getSuggestionsList() {
            // console.log("getSuggestionsList");
            let self = this;
            dsf.http
                .post(`fn/peopleCongress/suggestionsList`, {
                    meetingId: self.$route.params.meetingId
                })
                .done(result => {
                    //console.log(result);
                    if (result.code == 200 && result.data) {
                        self.list = result.data;
                    }
                })
                .error(error => {
                    // console.log(error);
                    // dsf.layer.toast("数据获取失败！");
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        onSearch(keyword) { // 检索
            return this.list.filter(item => item.content.includes(keyword))
        }
    }
}
</script>

<style lang="scss" scoped>
.blank {
    height: 1.36rem;
}

.btn-container {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;

    .btn {
        width: 100%;
        background-color: #E91619;
        border: none;
    }
}

.opinion-empty {
    padding: 2rem 0;

    ::v-deep .van-empty__image {
        height: 2.6rem;
    }
}

.opnion {
    display: flex;
    align-items: center;
    padding: 0.24rem 0.32rem;
    background-color: #fff;
    position: relative;

    .icon {
        width: 0.8rem;
        height: 0.8rem;
        margin-right: 0.32rem;
    }

    .info {
        flex: 1;
        overflow: hidden;

        .title {
            font-size: var(--font_size_2);
            display: flex;

            .text {
                flex: 1;
            }
        }

        .time {
            font-size: var(--font_size_4);
            color: #999;
            padding-top: 0.2rem;
        }

        .content {
            font-size: var(--font_size_3);
            color: #666;
            padding-top: 0.2rem;
        }
    }

    &::before {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid #ddd;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }

    &:last-child::before {
        border: 0;
    }
}
</style>
