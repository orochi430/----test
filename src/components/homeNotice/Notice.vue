<template>
<div v-if="noticeList.length" class="ds-notice">
    <div v-if="type == '一条轮播式' || type == '轮播式'" class="card">
        <div class="top">
            <span class="title">通知公告</span>
            <span class="more" @click="goRoute">更多</span>
        </div>
        <van-swipe vertical :show-indicators="false" autoplay="3000">
            <van-swipe-item v-for="item in noticeList" :key="item.id" class="clamp" @click="toForm(item)">{{item.itemsContent}}</van-swipe-item>
        </van-swipe>
    </div>
    <div v-else-if="type == '二条轮播式'" class="card_2" @click="goRoute">
        <img src="static/images/platform/notice.png" alt="">
        <van-swipe vertical :show-indicators="false" loop autoplay="3000" :height="48">
            <van-swipe-item v-for="(item, index) in noticeList" v-if="index % 2 == 0" :key="item.id">
                <div class="ellipsis"><span style="line-height: 0.48rem">{{noticeList[index].itemsContent}}</span></div>
                <div class="ellipsis" v-if="noticeList[index + 1]"><span style="line-height: 0.48rem">{{noticeList[index + 1].itemsContent}}</span></div>
            </van-swipe-item>
        </van-swipe>
        <span class="more flex ac jc"><van-icon name="arrow" color="#fff" /></span>
    </div>
    <div class="notice" v-else>
        <van-notice-bar background="#fff" :scrollable="isScroll" @click="goRoute" mode="link">
          <template #left-icon>
            <i class="iconfont icontongzhigonggao" style="color: var(--normal);font-size: 0.36rem;margin-right: 0.12rem"></i>
          </template>
          {{ noticeText }}
        </van-notice-bar>
    </div>
</div>
</template>

<script>
export default {
    // name: "Notice",
    props: ['type'],
    data() {
        return {
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
                start: 0,
                limit: 6,
                key: "",
                homepage:true
            };
            dsf.http
                .post("fn/mobileNotice/getList", params)
                .then(res => {
                    if (res.status == "200") {
                        // 通知公告;
                        this.noticeList = res.data.rows;
                        if (!dsf.util.loadLocalStore("noticeList")) {
                            // 首次存入数据
                            dsf.util.saveToLocalStore(
                                "noticeList",
                                this.noticeList
                            );
                            dsf.util.saveToLocalStore("isRead", "1");
                        } else {
                            var oldList = dsf.util.loadLocalStore("noticeList");
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
                        this.noticeList.forEach((item, index) => {
                            var conact = index !== this.noticeList.length - 1 ? "；" : "";
                            this.noticeText += item.itemsContent + conact;
                        });
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
                path: "/commonList?fileType=tzgg"
            });
            dsf.util.saveToLocalStore("isRead", "");
        },
        toForm(item) {
            this.$router.push({
                path: `/commonForm/${item.moduleId}/${item.info_id}?method=${item.method}&listId=${item.listId}`
            })
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
        background-color: #fff;
        // color: #f96a0e;
        // padding: 10px 0px 10px 0px;
        margin: 0.2rem;
        width: calc(100% - 0.4rem);
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0px 2px 16px 0px rgba(218,218,218,0.5);
        .van-notice-bar {
            // height: 36px;
            padding: 0;
            font-size: var(--font_size_3);
            background-color: #fff;
            color: #333;
            margin: 0.1rem 0.2rem;
            ::v-deep .van-notice-bar__left-icon {
              color: var(--normal);
              font-size: 18px;
            }
            ::v-deep .van-notice-bar__right-icon {
              color: #999;
            }
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
        padding: 15px;
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
        padding: 15px;
        margin: 10px 10px 0;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        color: #666;
        img {
            width: 38px;
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
        .more {
          border-radius: 50%;
          // background-color: var(--normal);
          float: right;
          width: 16px;
          height: 16px;
          font-size: 10px;
        }
    }
}
</style>
