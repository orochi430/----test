<!--
 * @Author: ly
 * @Date: 2022年2月18日14:49:06
 * @Description:
 -->
<template>
<div class="ds-moduleIndex">
    <div class="appBox" v-if="!settingModel">
        <!-- 应用 -->
        <div class="item-cell" :class="{card : item.child.length}" :key="index" v-for="(item, index) in mainMenu">
            <div class="title" v-if="item.child.length > 0 && !isHideTitle">
                <span>{{ item.name }}</span>
            </div>
            <div class="dsf-list" v-if="item.child.length > 0" :style="{marginTop: isHideTitle ? '0.3rem' : 0}">
                <div :key="subIndex" v-for="(subItem, subIndex) in item.child" v-show="subItem.isshow" class="menu" @click="goRoute(subItem)">
                    <img :src="subItem.img" alt />
                    <p>{{ subItem.name }}</p>
                    <div class="badge" v-if="subItem.badgeNum">{{subItem.badgeNum < 99?subItem.badgeNum:'99+'}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "appMenuCenter",
    props: ["limitcount", "menudata"],
    data() {
        return {
            isHideTitle: false,
            user: dsf.util.loadSessionStore("user") || {},
            default_img: 'this.src="' + require("static/squMenu/tatj.png") + '"',
            settingModel: false,
            mainMenu: [],
            searchVal: "",
            showSubmenu: false,
            submenu: {
                name: '',
                child: []
            }
        };
    },
    watch: {
        menudata() {
            this.buildMenu(this.menudata);
        }
    },
    methods: {
        goMore() {
            this.$router.push({
                path: '/appMenuCenter'
            })
        },
        cancel() {
            //取消选择
            this.settingModel = false;
        },
        getMenu() {
            //获取应用
            dsf.http.post("fn/newFile/shortcutDing", {}).then((res) => {
                let result = res.data;
                this.buildMenu(result.data);
            });
        },
        buildMenu(result) {
            let that = this;
            var mainMenuNow = [];
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
                        name: item.shortcutName,
                        badge: item.tip,
                        router: item.actUrl.trim(),
                        img: item.shortcutIcon,
                        props: agentId,
                        type: item.shortcutType,
                        showClickTip: item.gntsyText,
                        child: []
                    };
                    menu.push(child)
                    if (item.children.length > 0) forFunc(item.children, child.child)
                })
            }
            forFunc(result, mainMenuNow)
            mainMenuNow.forEach((main) => {
                main.child.forEach((subItem) => {
                    subItem.badgeNum = 0;
                    subItem.isshow = true;
                    //测试多个地址获取角标
                    //subItem.badge = "fn/list/200826155007pd4W94ENgSqoEeeuL4P/mobile/q?moduleId=200826154812jQpt0dBmNzZXaNnLhTR&isFirst=1,fn/list/200826164523j2KpCndxX5HWLAPkJoV/mobile/q?moduleId=200826154812jQpt0dBmNzZXaNnLhTR&isFirst=1";
                    if (subItem.badge && subItem.badge != "") {
                        dsf.http.postUrls(subItem.badge, {}).then((result) => {
                            if (Array.isArray(result) && result.length > 0) {
                                for (let index = 0; index < result.length; index++) {
                                    const element = result[index];
                                    subItem.badgeNum += element.data.total || element.data.badge || element.data.data;
                                }
                            } else
                                subItem.badgeNum += result.data.total || result.data.badge || result.data.data;
                        });
                    }
                });
            });
            that.mainMenu = mainMenuNow;
            that.isHideTitle = that.limitcount != undefined && that.limitcount > 0;
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
                onSuccess: function (result) {},
                onFail: function (err) {},
            });
        },
        goRoute(item) {
            if (item.child.length > 0) {
                this.showSubmenu = true
                this.submenu = item
                console.log(this.submenu)
                return
            }
            //app路径跳转
            if (item.type && item.type == 3) {
                //eval("this." + item.router + "()");
                this.openDDApp(item.router);
            } else if (item.type == 2) {
                //window.open(item.router);
                if (dsf.config.ddSetting.isDing) { // 钉钉跳转
                    dd.biz.util.openLink({
                        url: item.router, //要打开链接的地址
                        onSuccess: function (result) {},
                        onFail: function (err) {},
                    });
                } else { // 非钉钉嵌入iframe
                    let url = dsf.util.getReplaceUrl(item.router);
                    this.$router.push({
                        name: "dsfIframe",
                        params: {
                            url: url
                        }
                    })
                }
            } else {
                if (item.props) {
                    if (item.props.props) {
                        this.$router.push({
                            path: item.router,
                            query: JSON.parse(JSON.stringify(item.props)),
                        });
                    } else {
                        this.$router.push({
                            name: item.router,
                            params: JSON.parse(JSON.stringify(item.props)),
                        });
                    }
                } else {
                    this.$router.push({
                        path: item.router
                    });
                }
            }
        }
    },
    created() {
        if (this.menudata != undefined) {} else {
            this.getMenu();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-moduleIndex {
    // background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: scroll;

    .dsf-list {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        // padding: 0 0px 0.64rem;
        width: 100%;
        height: 100%;

        .menu {
            display: inline-block;
            width: 25%;
            text-align: center;
            margin-bottom: 15px;
            position: relative;

            img {
                display: inline-block;
                width: 48px;
                height: 48px;
                vertical-align: middle;
                margin-bottom: 6px;
                border: none;
            }

            p {
                //font-size: var(--font_size_2);
                font-size: var(--font_size_3);
                color: #333333;
                letter-spacing: 1px;
            }

            .badge {
                width: fit-content;
                transform: scale(0.8);
                position: absolute;
                left: 60%;
                top: -5px;
                font-size: var(--font_size_4);
                background-color: #EE0A24;
                color: #FFF;
                padding: 0 7px;
                border-radius: 10px;
            }
        }

        // .menu:nth-child(n + 4) {
        // 	margin-bottom: 0;
        // }
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

.title {
    padding: 8px 15px;
    box-sizing: border-box;
    position: relative;
    @include font_2;
    font-weight: bold;
    margin-bottom: 10px;

    span {
        margin-left: 5px;
        font-size: 19px;
        color: #333;
    }

    &::before {
        content: "";
        display: block;
        width: 5px;
        height: 20px;
        position: absolute;
        top: 50%;
        transform: translate(-5px, -50%);
        @include background-theme("normal");
    }
}

.dsf-list::before {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.card {
    background-color: #FFF;
    margin: 10px 5px;
    border-radius: 6px;
    padding: 10px 5px 5px;
}
</style>
