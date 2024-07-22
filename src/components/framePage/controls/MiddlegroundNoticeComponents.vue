<template>
    <div v-if="noticeList.length" class="ds-notice">
        <div v-if="type == '一条轮播式' || type == '轮播式'" class="card">
            <div class="top">
                <span class="title">通知公告</span>
                <span class="more" @click="goRoute">更多</span>
            </div>
            <van-swipe vertical :show-indicators="false" autoplay="3000">
                <van-swipe-item v-for="item in noticeList" :key="item.id" class="clamp" @click="toForm(item)">{{
        item['n.Unify-Notice-0009'] }}</van-swipe-item>
            </van-swipe>
        </div>
        <div v-else-if="type == '二条轮播式'" class="card_2" @click="goRoute">
            <img src="static/images/platform/notice.png" alt="" />
            <van-swipe vertical :show-indicators="false" loop autoplay="3000" :height="48">
                <van-swipe-item v-for="(item, index) in noticeList" v-if="index % 2 == 0" :key="item.id">
                    <div class="ellipsis">
                        <span style="line-height: 0.48rem">{{ noticeList[index]['n.Unify-Notice-0009'] }}</span>
                    </div>
                    <div class="ellipsis" v-if="noticeList[index + 1]">
                        <span style="line-height: 0.48rem">{{ noticeList[index + 1]['n.Unify-Notice-0009'] }}</span>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <span class="more flex ac jc">
                <van-icon name="arrow" color="#fff" /></span>
        </div>
        <div class="notice" v-else>
            <van-notice-bar background="#fff" :scrollable="isScroll" @click="goRoute" mode="link">
                <template #left-icon>
                    <i class="iconfont icontongzhigonggao"
                        style="color: var(--normal); font-size: 0.36rem; margin-right: 0.12rem"></i>
                </template>
                {{ noticeText }}
            </van-notice-bar>
        </div>
    </div>
</template>

<script>
import oaScoketJs from "@/common/oaScoket";
import store from "@/common/util";
export default {
    name: "framePageHomeNotice",
    props: ["itemdata"],
    data() {
        return {
            type: this.itemdata.params.showType,
            isScroll: true,
            noticeText: "",
            noticeList: [],
            oaScoket: null
        }
    },
    created() {
        let self = this
        this.getNoticeList()
        oaScoketJs.close();
        this.oaScoket = oaScoketJs.getInstance(this);
        console.log(this.oaScoket)
        this.oaScoket.onReceivedTodo(
            store.loadSessionStore("user").user_id,
            (data) => {
                self.getNoticeList();
            }
        );
    },
    activated() {
        this.getNoticeList()
    },
    methods: {
        sendMessage() {
            // 发送消息到服务器
            this.socket.emit('message', 'Hello WebSocket!');
        },
        getNoticeList() {
            dsf.http.post(dsf.config.listJson?.find(item => item.fileType == "tzgg")?.homepageUrl || 'fn/list/210527161957rOqq8K5AdDLrNBqQIkp/mobile/q?moduleId=210526190113N1Nxycuf1n1qtul7pwM&isFirst=1', {
                page: 1,
                limit: 15,
            }).then(res => {
                if (res.data.datas.length) {
                    this.noticeList = res.data.datas.map(item => item.dataValue)
                    this.noticeText = this.noticeList.map(item => item['n.Unify-Notice-0009']).join(',')
                }
            })
        },
        // 路由跳转;
        goRoute() {
            this.$router.push({
                path: "/commonList/210527161957rOqq8K5AdDLrNBqQIkp/210526190113N1Nxycuf1n1qtul7pwM"
            })
        },
        async toForm(item) {
            await dsf.http.post('ctrl/unifyOfficeInfo/requestChangeRead', {
                dataId: item['n.A0001'],
                type: 'unifynotice',
                appCode: item['n.Unify-Notice-0023']
            }).then(res => {
                item['un.Unify-Notice-User-0003'] = 1
            })
            // 如果是中台自己的表单则使用路由跳转
            if (item['n.Unify-Notice-0003'].indexOf(`${location.host}${location.pathname}`) > -1) {
                this.$router.push(item['n.Unify-Notice-0003'].split('#')[1]);
            } else {
                dsf.middleground.openUrl({
                    url: item['n.Unify-Notice-0003'],
                    title: item['n.Unify-Notice-0009'],
                    getCodeParams: { "appCode": item["n.Unify-Notice-0023"] || 'OA' }
                })
            }
        }
    },
}
</script>

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
        box-shadow: 0px 2px 16px 0px rgba(218, 218, 218, 0.5);

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
        border: 1px solid rgba(223, 223, 223, 1);
        box-shadow: 0px 2px 16px 0px rgba(218, 218, 218, 0.5);
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
            flex: 1;
            overflow: hidden;
            padding: 0 0.2rem;

            span {
                display: inline-block;
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
