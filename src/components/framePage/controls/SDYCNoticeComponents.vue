<template>
<div v-if="noticeList.length" class="ds-notice">
    <div v-if="type == '一条轮播式' || type == '轮播式'" class="card">
        <div class="top">
            <span class="title">通知公告</span>
            <span class="more" @click="goRoute">更多</span>
        </div>
        <van-swipe vertical :show-indicators="false" autoplay="3000">
            <van-swipe-item v-for="item in noticeList" :key="item.id" class="clamp" @click="toForm(item)">{{item.bt}}</van-swipe-item>
        </van-swipe>
    </div>
    <div v-else-if="type == '二条轮播式'" class="card_2" @click="goRoute">
        <img src="@/assets/imgs/notice.png" alt="">
        <div class="content">
            <span v-for="item in noticeList" :key="item.id" class="ellipsis">{{item.bt}}</span>
        </div>
        <!-- <van-swipe vertical :show-indicators="false" :loop="false" autoplay="3000" :height="24">
            <van-swipe-item v-for="item in noticeList" :key="item.id" class="ellipsis"><span style="line-height: 0.48rem">{{item.itemsContent}}</span></van-swipe-item>
        </van-swipe> -->
        <span class="more">更多<van-icon name="arrow" /></span>
    </div>
    <div class="notice" v-else>
        <van-notice-bar :scrollable="isScroll" left-icon="volume-o" @click="goRoute">{{ noticeText }}</van-notice-bar>
    </div>
</div>
</template>

<script>
export default {
    name: "Notice",
    props: ['itemdata'],
    data() {
        return {
            type: this.itemdata.params.showType,
            unread: true,
            isScroll: true,
            noticeText: "",
            noticeList: []
        };
    },
    created() {
        this.getNoticeList();
    },
    methods: {
        // 获取首页通知公告;
        getNoticeList() {
            var params = {
                page: 1,
                // limit: this.type == '二条轮播式' ? 2 : 15,
                key: "",
                homepage: true
            };
            dsf.http
                .post("fn/sdycMobile/getNoticeData", params)
                .then(res => {
                    if (res.status == "200") {
                        // 通知公告;
                        this.noticeList = res.data.datas.map(item => item.dataValue);
                        if (!dsf.util.loadLocalStore("noticeList")) {
                            // 首次存入数据
                            dsf.util.saveToLocalStore(
                                "noticeList",
                                this.noticeList
                            );
                            dsf.util.saveToLocalStore("isRead", "1");
                        } else {
                            var oldList = JSON.parse(dsf.util.loadLocalStore("noticeList"));
                            if (oldList.length !== this.noticeList.length) {
                                dsf.util.saveToLocalStore("isRead", "1");
                                dsf.util.saveToLocalStore(
                                    "noticeList",
                                    this.noticeList
                                );
                            } else {
                                var flag = this.noticeList.some((item, index) => {
                                    return item.id === oldList[index].id;
                                });
                                if (!flag) {
                                    dsf.util.saveToLocalStore("isRead", "1");
                                    dsf.util.saveToLocalStore(
                                        "noticeList",
                                        this.noticeList
                                    );
                                }
                            }
                        }
                    } else {
                        this.dsf.layer.toast(res.message);
                    }
                })
                .error(res => {
                    this.dsf.layer.toast(res.message);
                })
                .always(() => {
                    this.unread = Boolean(dsf.util.loadLocalStore("isRead"));
                });
        },
        // 路由跳转;
        goRoute() {
            this.$router.push({
                path: "/commonList?fileType=SDYCtzgg"
            });
            dsf.util.saveToLocalStore("isRead", "");
        },
        toForm(item) {
            dsf.http.post("fn/notice/markRead", {
                pks: item.id,
                moduleId: item.moduleId,
                noticeId: item.noticeId
            }).then(res => {
                item.readStatus = 2
            })
            if (item.noticeType == 7) { // 会议通知
                this.$router.push({
                    path: `/commonForm/${item.moduleId}/${item.noticeId}?toFormId=220609100046nUzuCvYEOgp0gHAEOpN&method=viewMobile&listId=1808061608052gwg6wWGsNdiXr1yOCx&toNodeId=12`
                })
            } else if(item.businessId) { // 节假日排班
                this.$router.push({
                    path: `/commonForm/${item.moduleId}/${item.businessId}?formId=220610154224A6QZgAepSvyf25z5eIW&listId=210909145711N72320aox0yjkdcTIgu&method=notice`
                })
            } else if (item.url) { // 日常排班
                this.$router.push({
                    path: `${item.url}?date=${item.year}-${item.month}`
                })
            } else {
                this.$router.push({
                    path: `/commonForm/${item.moduleId}/${item.noticeId}?toFormId=200827194705FRBR9creSLC68ZNU7AY&method=viewMobile&listId=1808061608052gwg6wWGsNdiXr1yOCx&toNodeId=-1`
                })
            }
        }
    }
};
</script>>

<style lang="scss" scoped>
.ds-notice {
    width: 100%;

    .notice {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        background-color: #f8f8f7;
        color: #f96a0e;
        padding: 10px 0px 10px 0px;

        .van-notice-bar {
            height: 36px;
            padding: 0px 15px;
            font-size: var(--font_size_2);
            color: #ff6a00;
        }

        .my-icon {
            position: absolute;
            left: 24px;
            top: 20px;
            z-index: 100;
        }

        .van-icon-icontongzhi-o::before {
            content: "\e606";
        }

        .ds-Unread {
            position: absolute;
            right: 5px;
            top: 24px;
            width: 8px;
            height: 8px;
            background: #ff3b30;
            border-radius: 50%;
        }
    }
    .card {
        padding: 16px;
        margin: 10px 10px 0;
        background: #FFF5F0;
        border: 1px solid rgba(223,223,223,1);
        box-shadow: 0px 2px 16px 0px rgba(218,218,218,0.5);
        border-radius: 5px;
        .top {
            padding-bottom: 10px;
            .title {
                color: #fff;
                padding: 3px 10px;
                background: #FFB521;
                border-radius: 14px;
            }
            .more {
                float: right;
                font-size: var(--font_size_4);
                color: #666666;
            }
        }
        .van-swipe {
            height: 40px;
            .van-swipe-item {
                height: 40px;
            }
        }
    }
    .card_2 {
        padding: 16px;
        margin: 10px 10px 0;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        color: #666;
        img {
            width: 40px;
            height: 40px;
        }
        .van-swipe {
            padding: 0 10px;
            height: 44px;
            flex: 1;
            .van-swipe-item {
                line-height: 24px;
            }
        }
        .content {
            flex:1;
            overflow:hidden;
            padding: 0 0.2rem;
            span {
                display:inline-block;
                width: 100%;
                vertical-align: middle;
                &:not(:last-child) {
                    padding-bottom: 3px;
                }
            }
        }
    }
}
</style>
