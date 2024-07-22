<template>
<div v-if="noticeList.length" class="ds-notice">
    <div class="card_2">
        <img src="@/assets/imgs/information.png" alt="">
        <div class="content">
            <span v-for="item in noticeList" :key="item.id" class="ellipsis" @click="toDialog(item)">{{item.content}}</span>
        </div>
        <!-- <van-swipe vertical :show-indicators="false" loop autoplay="3000" :height="48">
            <van-swipe-item v-for="(item, index) in noticeList" v-if="index % 2 == 0" :key="item.id">
                <div class="ellipsis"><span style="line-height: 0.48rem">{{noticeList[index].itemsContent}}</span></div>
                <div class="ellipsis" v-if="noticeList[index + 1]"><span style="line-height: 0.48rem">{{noticeList[index + 1].itemsContent}}</span></div>
            </van-swipe-item>
        </van-swipe> -->
        <span class="more flex ac jc" @click="goRoute"><van-icon name="arrow" /></span>
    </div>
</div>
</template>

<script>
export default {
    name: "Notice",
    props: ['type'],
    data() {
        return {
            noticeList: []
        };
    },
    created() {
        this.getNoticeList()
    },
    activated() {
        this.getNoticeList()
    },
    methods: {
        // 获取首页通知公告;
        getNoticeList() {
            var params = {
                start: 1,
                limit: 2,
            };
            dsf.http
                .post("fn/remind/queryMobileData", params)
                .then(res => {
                    if (res.status == "200") {
                        // 通知公告;
                        this.noticeList = res.data.datas.map(item => {
                          return {
                            id: item.dataValue.id,
                            content: item.dataValue.content
                          }
                        });
                    } else {
                        this.dsf.layer.toast(res.message);
                    }
                })
                .error(res => {
                    this.dsf.layer.toast(res.message);
                })
        },
        // 路由跳转;
        goRoute() {
            this.$router.push({
                path: "/commonList?fileType=xxtx&title=消息提醒"
            });
            dsf.util.saveToLocalStore("isRead", "");
        },
        toDialog(item) {
            dsf.http.post("fn/remind/read?ids=" + item.id).then(res => {
              dsf.layer.alert({ message: item.content });
            })
        }
    }
};
</script>>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
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
    .card_2 {
        padding: 16px;
        margin: 10px 10px 0;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        color: #666;
        img {
            width: 50px;
            height: auto;
        }
        .more {
            float: right;
            font-size: 10px;
            color: #fff;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            @include background-theme('normal');
            box-shadow: 0 1px 20px 0 rgba(166,201,235,0.26);
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
