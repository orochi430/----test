<template>
<div>
    <div v-for="item in newsList" :key="item.title" class="news" @click="link(item)">
        <div class="icon"><img :src="iconSrc(item)" alt=""></div>
        <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="time">{{ item.sDate | dateFormat }}</div>
        </div>
        <van-icon name="arrow" />
    </div>
</div>
</template>

<script>
// import {
//     news
// } from './test'
export default {
    filters: {
        //日期格式化
        dateFormat: function (value) {
            if (!value) return "";
            return dsf.date.format(value, "yyyy-mm-dd");
        }
    },
    data() {
        return {
            newsList: [],
            loading: null
        }
    },
    computed: {
        iconSrc() {
            return (item) => {
                let type = item.type;
                switch (type) {
                    case 1:
                        type = "information";
                        break;
                    case 2:
                        type = "notice";
                        break;
                    default:
                        type = "information";
                }
                return require(`static/images/peopleCongress/icon_${type}.png`);
            }
        }
    },
    created() {
        this.getNewsList();
    },
    mounted() {
        this.loading = dsf.layer.loading();
    },
    methods: {
        link(item) {
            let self = this;
            if (item.isRead) {
                self.$router.push({
                    name: 'peopleCongressNewsDetail',
                    params: {
                        newsId: item.id
                    }
                })
            } else {
                // 调用已读接口
                dsf.http
                    .post(`fn/peopleCongress/setNewsRead`, {
                        newsId: self.$route.params.newsId
                    })
                    .done(result => {
                        //console.log(result);
                        if (result.code == 200) {
                            self.$router.push({
                                name: 'peopleCongressNewsDetail',
                                params: {
                                    newsId: item.id
                                }
                            })
                        }
                    })
                    .error(error => {
                        // console.log(error);
                        dsf.layer.toast("操作失败！");
                    })
                    .always(() => {
                        // dsf.layer.closeLoading(self.loading);
                    });
            }
        },
        getNewsList() {
            let self = this;
            dsf.http
                .post(`fn/peopleCongress/newsList`, {
                    meetingId: self.$route.params.meetingId
                })
                .done(result => {
                    // result = result.data;
                    //console.log(result);
                    if (result.code == 200 && result.data) {
                        self.newsList = result.data;
                    }
                })
                .error(error => {
                    // console.log(error);
                    // dsf.layer.toast("数据获取失败！");
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.news {
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

        .title {
            font-size: var(--font_size_2);
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
