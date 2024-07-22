<template>
    <div class="ds-moduleIndex">
        <div class="appBox" v-if="!settingModel">
            <!-- 常用服务 -->
            <div class="card">
                <div class="title">
                    <span>常用服务</span>
                    <span style="float:right;font-size: var(--font_size_4);color:#666" @click="settingModel = !settingModel">
                        <van-icon name="setting-o" />管理
                    </span>
                </div>
                <div class="dsf-list" v-if="myMenus.length > 0">
                    <div :key="subIndex" v-for="(subItem, subIndex) in myMenus" v-show="subItem.isshow"
                        class="menu" @click="goRoute(subItem)">
                        <img :src="subItem.img" alt />
                        <div class="right">
                          <p class="name" v-html="subItem.name"></p>
                          <p class="sub elps">{{subItem.gntsyText}}</p>
                        </div>
                        <!-- <p v-html="subItem.name"></p> -->
                        <!-- <div class="badge" v-if="subItem.badgeNum">{{ subItem.badgeNum <
                                99 ? subItem.badgeNum : '99+'
                        }}</div> -->
                        </div>
                    </div>
                    <div class="noApp" @click="settingModel = !settingModel" v-if="myMenus.length < 1">
                        请增加应用<span>+</span>
                    </div>
                </div>
                <!-- 应用 -->
                <template v-for="(item, index) in mainMenu">
                    <div class="item-cell" :class="{ card: item.child.length }" :key="index"
                        v-if="item.child.filter(subItem => { return subItem.isshow && subItem.hasMyMenu == 0 }).length > 0">
                        <div class="title" v-if="item.child.length > 0 && !isHideTitle">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="dsf-list" v-if="item.child.length > 0"
                            :style="{ marginTop: isHideTitle ? '0.3rem' : 0 }">
                            <div :key="subIndex" v-for="(subItem, subIndex) in item.child"
                                v-show="subItem.isshow && subItem.hasMyMenu == 0" class="menu" @click="goRoute(subItem)">
                                <img :src="subItem.img" alt />
                                <div class="right">
                                    <p class="name" v-html="subItem.name"></p>
                                    <p class="sub elps">{{subItem.gntsyText}}</p>
                                </div>
                                <!-- <div class="badge" v-if="subItem.badgeNum">{{ subItem.badgeNum <
                                        99 ? subItem.badgeNum : '99+'
                                }}</div> -->
                                </div>
                            </div>
                        </div>
                </template>
            </div>
            <menu-setting v-if="settingModel" @cancel="cancel" @done="getMenu(); settingModel = false; "
                :menus="mainMenu" :commonMenus="myMenus"></menu-setting>

            <van-dialog v-model="showTip" close="closeTip" :message="showTipMessage">
                <!-- <div v-html="showTipMessage"></div> -->
            </van-dialog>
            <van-dialog v-model="showSubmenu" :show-confirm-button="false" :closeOnClickOverlay="true">
                <template #title>
                    <div style="padding-bottom: 0.32rem">{{ submenu.name }}</div>
                </template>
                <div class="dsf-list" v-if="submenu.child.length > 0" :style="{ marginTop: isHideTitle ? '0.3rem' : 0 }">
                    <div :key="subIndex" v-for="(item, subIndex) in submenu.child" class="menu"
                        @click="showSubmenu = false; goRoute(item)" style="width:33%">
                        <img :src="item.img" alt />
                        <p>{{ item.name }}</p>
                        <!-- <div class="badge" v-if="item.badgeNum">{{item.badgeNum < 99?item.badgeNum:'99+'}}</div> -->
                    </div>
                </div>
            </van-dialog>
        </div>
</template>

<script>
import menuSetting from "./applicationSetting";
export default {
    name: "moduleIndex",
    data() {
        return {
            isHideTitle: false,
            user: dsf.util.loadSessionStore("user") || {},
            default_img: 'this.src="' + require("static/squMenu/tatj.png") + '"',
            meetingMenu: [],
            studyMenu: [],
            partyBuildMenu: [],
            docManagenMenu: [],
            SupervisionMenu: [],
            letMaMenu: [],
            streeTownMenu: [],
            settingModel: false,
            isShowMyMenus: false,
            mainMenu: [],
            myMenus: [],
            searchVal: "",
            local_menu: [],
            showTipMessage: "",
            showTip: false,
            showSubmenu: false,
            submenu: {
                name: '',
                child: []
            }
        };
    },
    watch: {
        searchVal(value) {
            if (value != "") {
                this.mainMenu.forEach((item) => {
                    item.child.forEach((subItem) => {
                        if (subItem.name.indexOf(value) == -1) {
                            subItem.isshow = false;
                        } else {
                            subItem.isshow = true;
                        }
                    });
                });
                this.myMenus.forEach((item) => {
                    if (item.name.indexOf(value) == -1) {
                        item.isshow = false;
                    } else {
                        item.isshow = true;
                    }
                });
            } else {
                this.mainMenu.forEach((item) => {
                    item.child.forEach((subItem) => {
                        subItem.isshow = true;
                    });
                });

                this.myMenus.forEach((item) => {
                    item.isshow = true;
                });
            }
        },
    },
    methods: {
        closeTip() {
            this.showTipMessage = "";
            this.showTip = false;
        },
        cancel() {
            //取消选择
            this.settingModel = false;
        },
        async getMenu() {
            //获取应用
            let that = this;
            var mainMenuNow = [];
            await dsf.http.post("fn/newFile/shortcutDing", { type: 'common', pageId: this.$route.query.currentPortalId }).then((res) => {
                console.log(res);
                let mySettingMenu = res.data.data.map(item => {
                    return {
                        id: item.id,
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
                mySettingMenu.forEach((subItem) => {
                    subItem.isshow = true;
                    subItem.badgeNum = 0;
                    if (subItem.badge && subItem.badge != "") {
                        dsf.http.post(subItem.badge, {}).then((result) => {
                            subItem.badgeNum = result.data.badge;
                        });
                    }
                });
                this.myMenus = mySettingMenu;
            })

            dsf.http.post("fn/newFile/shortcutDing", {pageId: this.$route.query.currentPortalId}).then((res) => {
                let result = res.data;
                // 递归菜单
                let forFunc = function (list, menu) {
                    list.forEach(item => {
                        if (item.displayPosition.indexOf("work") < 0) return
                        let agentId = item.agentid;
                        try {
                            if (agentId != "") {
                                agentId = JSON.parse(agentId);
                            }
                        } catch (e) {
                            agentId = {};
                        }
                        let child = {
                            id: item.id,
                            name: item.shortcutName,
                            badge: item.tip,
                            router: item.actUrl.trim(),
                            img: dsf.url.getServerUrl(item.shortcutIcon),
                            props: agentId,
                            type: item.shortcutType,
                            showClickTip: item.gntsyText,
                            child: [],
                            gntsyText: item.gntsyText,
                            style: (dsf.config.homePage.menuSetting && dsf.config.homePage.menuSetting.itemStyle) ? dsf.config.homePage.menuSetting.itemStyle : "{}"
                        };
                        menu.push(child)
                        if (item.children.length > 0) forFunc(item.children, child.child)
                    })
                }
                forFunc(result.data, mainMenuNow)
                mainMenuNow.forEach((main) => {
                    main.child.forEach((subItem) => {
                        subItem.badgeNum = 0;
                        subItem.isshow = true;
                        let hasMyMenu = that.myMenus.filter(
                            (mymenuItem) => {
                                return mymenuItem.name == subItem.name;
                            }
                        );
                        subItem.hasMyMenu = hasMyMenu.length;
                    });
                });
                that.mainMenu = mainMenuNow;
                that.isHideTitle = that.mainMenu.length == 1 && dsf.config.appSelect.isHideTitle
            });

        },
        guid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = (Math.random() * 16) | 0,
                        v = c == "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
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
    },
    components: {
        menuSetting
    },
    mounted() {
        this.getMenu();
    },
    activated() {
        this.getMenu();
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.ds-moduleIndex {
    // background-color: #fff;
    overflow: scroll;
    min-height: 100vh;
    background-color: #fff;
    .card {
        margin: 15px;
        .title {
            padding-bottom: 15px;
            font-size: var(--font_size_2);
            font-weight: 600;
        }
    }
    .dsf-list {
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

    .noApp {
        font-size: 22px;
        font-weight: 700;
        padding-left: 20px;
        padding-bottom: 20px;

        span {
            display: inline-block;
            color: rgb(33, 150, 243);
            margin-left: 20px;
            transform: scale(1.5);
        }
    }
}

</style>
