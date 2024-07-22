<template>
    <div>
        <template v-if="itemdata.params.showType == '九宫格菜单样式'">
            <my-application-components-dian-qi :itemdata="itemdata"></my-application-components-dian-qi>
        </template>
        <template v-else>
            <div class=""
                :style="{ backgroundImage: itemdata.params.bgImgUrl?.length ? `url(${dsf.url.getWebPath(itemdata.params.bgImgUrl)})` : '' }"
                :class="['WorkerHeaderComponents', itemdata.params.bgImgUrl?.length ? '' : 'topBg', { noHeaderMenu: !isShowHeaderMenu }]">
                <div class="flex ac search-container">
                    <van-search v-model="keyword" placeholder="搜索" left-icon="" @search="search" :clearable="false">
                        <template #left-icon>
                            <i class="iconfont iconsousuo1" style="color: #fff"></i>
                        </template>
                        <!-- <template #right-icon>
          <img src="static/images/platform/voice.png" alt="" @click="goVoice">
        </template> -->
                    </van-search>
                    <img src="static/images/platform/scan.png" alt="" @click="scan" />
                    <!-- <van-popover v-if="actions.length > 0" v-model="showPopover" trigger="click" :actions="actions" @select="onSelect"
        placement="bottom-end">
        <template #reference>
          <van-icon name="add-o" color="#fff" size="0.48rem" style="margin-left: 0.2rem" />
        </template>
      </van-popover> -->
                </div>
                <van-swipe class="my-swipe" :loop="false" indicator-color="#fff" v-show="isShowHeaderMenu">
                    <van-swipe-item v-for="(group, index) in menus" :key="index">
                        <div class="flex fw" style="margin: 0.5rem 0 0.4rem">
                            <div v-for="(item, index) in group" :key="index" class="menu" @click="go(item)">
                                <img :src="dsf.url.getWebPath(item.icon)" alt="" />
                                <p>{{ item.appName }}</p>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
                <van-overlay :show="show" @click="show = false" z-index="9999">
                    <div class="wrapper" @click.stop>
                        <img src="static/images/platform/qrcode.png" alt="" />
                    </div>
                </van-overlay>
            </div>
        </template>
    </div>
</template>

<script>
import HeaderMenu from "@/components/SquMenu/headerMenu"
import MyApplicationComponentsDianQi from "@/components/project/dianqi/components/workbench/MyApplicationComponents";
export default {
    components: {
        HeaderMenu,
        MyApplicationComponentsDianQi
    },
    props: ["itemdata"],
    data() {
        return {
            show: false,
            keyword: "",
            showPopover: false,
            menus: [],
            isShowHeaderMenu: true
        }
    },
    activated() {
        this.showPopover = false
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            dsf.http.post("fn/application/portal/authorizedApp?userTerminal=1").then(res => {
                if (res.data.code == 200) {
                    let datas = res.data.data
                    for (let i = 0; i < datas.length; i += 4) {
                        this.menus.push(datas.slice(i, i + 4))
                    }
                }
            })
        },
        greeting(hour) {
            if (hour >= 0 && hour <= 10) {
                return "早上好"
            } else if (hour > 10 && hour <= 14) {
                return "中午好"
            } else if (hour > 14 && hour <= 18) {
                return "下午好"
            } else if (hour > 18 && hour <= 24) {
                return "晚上好"
            }
        },
        replaceText(text) {
            return dsf.util.getReplaceUrl(text).replace("[timeGreeting]", this.greeting(moment().hour()))
        },
        search() {
            // this.$router.push(`/commonList?fileType=zhcx&keyword=${this.keyword}&title=文件查询`)
            this.$router.push({
                path: "/globalSearch",
                query: {
                    keyword: this.keyword
                }
            });
            this.keyword = ""
        },
        go(item) {
            let that = this
            if (!item.pageLink) {
                dsf.layer.toast('请配置应用地址')
                return
            }
            setTimeout(() => {
                dsf.middleground.openUrl({
                    url: item.mobileUrl,
                    title: item.appName,
                    getCodeParams: { "appId": item.id }
                })
            }, 100)
        },
        scan() {
            dsf.util.haddlerSacnCodeType((res) => {
                console.log(res.text)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.topBg {
    @include background-theme("normal");
}

.WorkerHeaderComponents {
    background-size: 100%;
    padding: 10px 10px 16px;

    .wrapper {
        width: 50vw;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .text {
        color: #fff;
        font-size: 21px;
        padding-left: 26px;
        margin: 40px 0 100px;
    }

    .search-container {
        // margin-bottom: 10px;

        .van-search {
            padding: 0;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.2);
            flex: 1;

            .van-search__content {
                background-color: transparent;

                ::v-deep input {
                    color: #fff;

                    &::placeholder {
                        color: #fff;
                    }
                }
            }
        }

        img {
            width: 22px;
            margin-left: 8px;
        }
    }

    .menu {
        width: 25%;
        text-align: center;
        color: #fff;
        margin-bottom: 15px;

        img {
            width: 44px;
            height: 44px;
            display: inline-block;
            margin-bottom: 5px;
        }
    }
}
</style>
