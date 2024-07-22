<template>
<div class="ds-squemenu">
    <div class="dsf-list">
        <div v-for="item in menuList" :key="item.menuID" class="menu" @click="goMenu(item.menuID)">
            <img :src="item.imgUrl" alt />
            <p :style="fontsize?'font-size:'+fontsize:''" v-html="item.menuText"></p>
            <div class="badge" v-if="item.badgeNum">{{item.badgeNum <= 99?item.badgeNum:'99+'}}</div>
        </div>
    </div>
</div>
</template>

<script>
//  import menuList from './menu';
export default {
    name: "Squmenu",
    props: ["fontsize", "menudata"],
    data() {
        return {
            menuList: []
        };
    },
    watch: {
        menudata() {
            this.buildMenu(this.menudata);
        }
    },
    created() {
        if (this.menudata != undefined) {} else {
            this.getMenu()
        }
    },
    methods: {
        getMenu() {
            dsf.http.post("fn/newFile/shortcutDing").then(({
                data
            }) => {
                this.buildMenu(data.data);
            })

        },
        buildMenu(mList) {
            let self = this
            mList.forEach((item) => {
                item.children.forEach((child) => {
                    if (child.displayPosition.indexOf("shortcut") < 0) return
                    let agentId = child.agentid;
                    try {
                        if (agentId != "") {
                            agentId = JSON.parse(agentId);
                        }
                    } catch (e) {
                        agentId = {};
                    }
                    let menuItem = {
                        "menuID": child.id,
                        "menuText": child.shortcutName,
                        "router": child.actUrl.trim(),
                        "type": child.shortcutType,
                        "params": agentId,
                        "imgUrl": child.shortcutIcon,
                        "showClickTip": child.gntsyText,
                        "badge": child.tip,
                        "badgeNum": 0
                    };

                    self.menuList.push(menuItem);
                });
            });
            self.$nextTick(() => {
                self.menuList.forEach((subItem) => {
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
            })
        },
        openDDApp(agentId) {
            dd.biz.microApp.openApp({
                agentId: agentId,
                onSuccess: function (result) {},
                onFail: function (err) {},
            });
        },
        goMenu(id) {
            this.menuList.forEach(item => {
                if (item.menuID == id) {
                    if (item.router == "" || item.router == undefined) {
                        if (item.showClickTip) {
                            dsf.layer.alert({
                                message: item.showClickTip,
                            });
                        }
                    } else if (item.type && item.type == 3) {
                        this.openDDApp(item.router);
                    } else if (item.type == 2) {
                        if (dsf.config.ddSetting.isDing) { // 钉钉跳转
                            dd.biz.util.openLink({
                                url: item.router, //要打开链接的地址
                                onSuccess: function (result) {},
                                onFail: function (err) {},
                            });
                        } else { // 非钉钉嵌入iframe
                            let url = dsf.util.getReplaceUrl(item.router);
                            this.$router.push({
                                path: 'iframe',
                                query: {
                                    url: url
                                }
                            })
                        }
                    } else if (item.params) {
                        this.$router.push({
                            name: item.router,
                            params: item.params
                        });
                    } else {
                        this.$router.push({
                            path: item.router
                        });
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-squemenu {
    // margin-top: 10px;
    background-color: #fff;
    width: 100%;
    height: auto;

    .dsf-list {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 15px 0px;
        padding-bottom: 0;
        width: 100%;
        height: 100%;

        .menu {
            width: 25%;
            text-align: center;
            margin-bottom: 15px;
            position: relative;
            img {
                display: inline-block;
                width: 48px;
                margin-bottom: 5px;
            }

            p {
                font-size: var(--font_size_2);
                color: #333333;
                letter-spacing: 1px;
            }
            .badge {
                width: fit-content;
                position: absolute;
                left: 60%;
                top: -5px;
                font-size: var(--font_size_4);
                background-color: #EE0A24;
                color: #FFF;
                padding: 0 4px;
                border-radius: 10px;
                line-height: 0.4rem;
                height: 0.4rem;
                min-width: 0.4rem;
            }
        }

        // .menu:nth-child(n + 4) {
        //   margin-bottom: 0;
        // }
    }
}
</style>
