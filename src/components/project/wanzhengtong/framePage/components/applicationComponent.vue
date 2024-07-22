<template>
<div class="application-component">
    <div class="title">常用服务</div>
    <div class="box">
        <div :key="subIndex" v-for="(subItem, subIndex) in myMenus" v-show="subItem.isshow" class="menu" @click="goRoute(subItem)">
            <img :src="subItem.img" alt />
            <div class="right">
                <p class="name" v-html="subItem.name"></p>
                <p class="sub elps">{{subItem.gntsyText}}</p>
            </div>
            <!-- <div class="badge" v-if="subItem.badgeNum">{{ subItem.badgeNum <
                    99 ? subItem.badgeNum : '99+'
            }}</div> -->
        </div>
        <div class="menu" @click="$router.push(`/wanApplicationCenter?currentPortalId=${currentPortalId}`)">
            <img src="static/images/wanzhengtong/more.png" alt />
            <div class="right">
                <p class="name">更多服务</p>
                <p class="sub elps">去应用中心找服务</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['currentComponent', 'currentPortalId'],
    data() {
        return {
            myMenus: []
        }
    },
    created() {
        this.getMenu()
    },
    activated() {
        this.getMenu()
    },
    methods: {
        async getMenu() {
        //获取应用
            let that = this;
            var mainMenuNow = [];
            await dsf.http.post("fn/newFile/shortcutDing", { type: 'common', pageId: this.currentPortalId }).then((res) => {
                console.log(res);
                let mySettingMenu = res.data.data.map(item => {
                    return {
                        name: item.shortcutName,
                        badge: item.tip,
                        router: item.actUrl.trim(),
                        img: dsf.url.getServerUrl(item.shortcutIcon),
                        props: item.agentId,
                        type: item.shortcutType,
                        showClickTip: item.gntsyText,
                        child: [],
                        style: (dsf.config.homePage.menuSetting && dsf.config.homePage.menuSetting.itemStyle) ? dsf.config.homePage.menuSetting.itemStyle : "{}",
                        isshow: true,
                        badgeNum: item.badgeNum,
                        gntsyText: item.gntsyText,
                        guid: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                            var r = (Math.random() * 16) | 0,
                                v = c == "x" ? r : (r & 0x3) | 0x8;
                            return v.toString(16);
                        }),
                    }
                })
                this.myMenus = mySettingMenu;
            })
        },
        openDDApp(agentId) {
            dd.biz.microApp.openApp({
                agentId: agentId,
                onSuccess: function (result) { },
                onFail: function (err) { },
            });
        },
        goRoute(item) {
            if (item.child.length > 0) {
                //打开三级菜单
                this.showSubmenu = true
                this.submenu = item
            } else if (item.router == "" || item.router == undefined) {
                //无菜单地址出提醒
                if (item.showClickTip) {
                    dsf.layer.alert({
                        message: item.showClickTip,
                    });
                } else {
                    dsf.layer.alert({
                        message: "当前菜单配置错误，请联系管理员！",
                    });
                }
            } else if (item.type && item.type == 3) {
                //打开钉钉应用
                this.openDDApp(item.router);
            } else if (item.type == 2) {
                //打开第三方链接
                let url = dsf.util.getReplaceUrl(item.router);
                if (dsf.config.ddSetting.isDing) { // 钉钉跳转
                    if (dd.biz) { //区分普通钉和政务钉
                        dd.biz.util.openLink({
                            url: item.router,
                            onSuccess: function (result) { },
                            onFail: function (err) { },
                        });
                    } else {
                        dd.openLink({
                            url: item.router
                        }).then(res => {
                            console.log(res)
                        }).catch(err => { })
                    }
                } else if (item.props && item.props.OpenWebView == "1") {
                    xsfWindow.openWebView({
                        "title": item.name,
                        "url": url,
                        "colorString": "#111111"
                    });
                } else if (item.props && item.props.OpenLocationHref == "1") {
                    location.href = url
                } else {// 其他方式均嵌入iframe
                    this.$router.push({
                        name: "dsfIframe",
                        params: {
                            url: url,
                            title: item.name
                        },
                        query: {
                            url: url,
                            title: item.name
                        }
                    });
                }
            } else {
                if (item.props) {
                    if (item.props.props) {
                        this.$router.push({
                            path: item.router,
                            query: JSON.parse(JSON.stringify(item.props))
                        });
                    } else {
                        if (item.router.indexOf("ssoToOther") > -1) {
                            this.$router.push({
                                name: item.router,
                                params: JSON.parse(JSON.stringify(item.props))
                            });
                        } else {
                            this.$router.push({
                                name: item.router,
                                params: JSON.parse(JSON.stringify(item.props))
                            });
                        }
                    }
                } else {
                    this.$router.push({
                        path: dsf.util.getReplaceUrl(item.router),
                        query: {
                            title: item.name
                        }
                    });
                }
            }
        },
    }
}
</script>
<style lang='scss' scoped>
.application-component {
    margin: 15px;
    .title {
        padding-bottom: 15px;
        font-size: var(--font_size_2);
        font-weight: 600;
    }
    .box {
        background-color: #fff;
        box-shadow: 0 1px 20px 0 rgba(166,201,235,0.26);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px;
        .menu {
            width: 49%;
            display: flex;
            padding: 10px 0;
            img {
                width: 34px;
                height: 34px;
                padding-right: 5px;
                box-sizing: content-box;
            }
            .right {
                flex: 1;
                overflow: hidden;
                .name {
                    font-weight: 600;
                }
                .sub {
                    font-size: 11px;
                    color: #999;
                }
            }
        }
    }
}
</style>