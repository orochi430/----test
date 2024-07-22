<template>
<div class="ds-squemenu">
    <div class="dsf-list">
        <div v-for="(item, index) in menuList" :key="index" class="menu" @click="goRoute(item)">
            <img :src="item.img" alt />
            <p>{{ item.name }}</p>
        </div>
    </div>
</div>
</template>

<script>
//  import menuList from './menu';
export default {
    name: "Squmenu",
    data() {
        return {
            menuList: [],
        };
    },
    mounted() {
      if(this.$route.query.shortcutName) dsf.url.setTitle(this.$route.query.shortcutName)
      this.getMenu()
    },
    methods: {
        getMenu() {
          dsf.http.post("fn/newFile/shortcutDing").then(({
            data
          }) => {
            let specialMenu = data.data.find(item => item.shortcutName == this.$route.query.shortcutName)
            let forFunc = function(list, menu) {
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
                    if(item.children.length > 0) forFunc(item.children, child.child)
                })
            }
            forFunc(specialMenu.children, this.menuList)
          })
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
            if (item.props && item.props.OpenWebView == "1") {
                let url = dsf.util.getReplaceUrl(item.router);
                xsfWindow.openWebView({
                    "title": item.name,
                    "url": url,
                    "colorString": "#111111"
                });
            } else if (item.router.indexOf("http") == 0 || item.router.indexOf("https") == 0) {
                let url = dsf.util.getReplaceUrl(item.router);
                this.$router.push({
                    name: "dsfIframe",
                    params: {
                        url: url,
                        title: item.name
                    }
                });
            } else if (item.router == "" || item.router == undefined) {
                //app路径跳转
                if (item.showClickTip) {
                    dsf.layer.alert({
                        message: item.showClickTip,
                    });
                    // this.showTipMessage = item.showClickTip;
                    // this.showTip = true;
                }
            } else if (item.type && item.type == 3) {
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
                        path: 'iframe',
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
                        path: item.router,
                        query: {
                            title: item.name
                        }
                    });
                }
            }
        },
    }
};
</script>

<style lang="scss" scoped>

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

            img {
                display: inline-block;
                width: 48px;
                margin-bottom: 5px;
            }

            p {
                font-size: var(--font_size_3);
                color: #333333;
                letter-spacing: 1px;
            }
        }

        // .menu:nth-child(n + 4) {
        //   margin-bottom: 0;
        // }
    }
}
</style>
