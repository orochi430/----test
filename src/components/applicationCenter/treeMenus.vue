<template>
<div class="treeMenus">
    <div class="menus">
        <div class="list" v-for="(item,index) in currentMenu.children" :key="index" @click="goRoute(item)">
            <p class="img"><img :src="item.shortcutIcon" alt="" srcset=""></p>
            <p class="names">
                <span>{{ item.shortcutName }}</span>
                <span></span>
            </p>
            <van-icon color="#ccc" size="16px" name="arrow" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'treeMenus',
    components: {},
    data() {
        return {
            currentMenu: {},
            allMenus: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        getMenuRollById(node) {
            if (node.id === this.$route.query.menuId) {
                return node;
            } else {
                var children = node.children;
                for (var i = 0; i < children.length; i++) {
                    var content = this.getMenuRollById(children[i]);
                    if (content) {
                        return content;
                    }
                }
            }
        },
        getMenu() {
            if (!this.$route.query.menuId) {
                return
            }
            //获取应用
            let that = this;
            dsf.http.post("fn/newFile/shortcutDing", {}).then((res) => {
                console.log(res);
                if (res.data && res.data.code == 200 && res.data.data) {
                    that.allMenus = res.data.data
                    let currentMenu = that.getMenuRollById({
                        id: "===",
                        children: res.data.data
                    })
                    console.log(currentMenu)
                    if (currentMenu.children && currentMenu.children.length == 0) {
                        dsf.layer.alert({
                            message: "当前菜单配置错误，不允许直接配置叶子菜单节点，请联系管理员！"
                        })
                    } else {
                        that.currentMenu = currentMenu
                        that.$store.commit("changePageTitle", currentMenu.shortcutName)
                    }
                }
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
            item.router = item.actUrl ? dsf.util.getReplaceUrl(item.actUrl.trim()) : ""
            setTimeout(() => {
                if (item.children && item.children.length > 0) {
                    this.$router.push({
                        name: "treeMenus",
                        query: {
                            menuId: item.id
                        }
                    })
                } else if (item.router == "" || item.router == undefined) {
                    //无菜单地址出提醒
                    dsf.layer.alert({
                        message: item.showClickTip || "当前菜单配置错误，请联系管理员！"
                    })
                } else if (item.type && item.type == 3) {
                    //打开钉钉应用
                    this.openDDApp(item.router)
                } else if (item.type == 2) {
                    //打开第三方链接
                    if (dsf.config.ddSetting.isDing) {
                        // 钉钉跳转
                        if (dd.biz) {
                            //区分普通钉和政务钉
                            dd.biz.util.openLink({
                                url: item.router,
                                onSuccess: function (result) {},
                                onFail: function (err) {}
                            })
                        } else {
                            dd.openLink({
                                    url: item.router
                                })
                                .then(res => {
                                    console.log(res)
                                })
                                .catch(err => {})
                        }
                    } else if (window.wx) {
                        wx.invoke(
                            "openUrl", {
                                type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
                                url: item.router //url地址
                            },
                            function (res) {
                                if (res.err_msg != "openUrl:ok") {
                                    //错误处理
                                }
                            }
                        )
                    } else if (item.props && item.props.OpenWebView == "1") {
                        xsfWindow.openWebView({
                            title: item.name,
                            url: item.router,
                            colorString: "#111111"
                        })
                    } else if (item.props && item.props.OpenLocationHref == "1") {
                        location.href = item.router
                    } else {
                        // 其他方式均嵌入iframe
                        this.$router.push({
                            name: "dsfIframe",
                            query: {
                                url: item.router,
                                title: item.name
                            }
                        })
                    }
                } else {
                    if (item.props) {
                        if (item.props.props) {
                            this.$router.push({
                                path: item.router,
                                query: JSON.parse(JSON.stringify(item.props))
                            })
                        }
                    } else {
                        this.$router.push({
                            path: item.router,
                            query: {
                                title: item.name
                            }
                        })
                    }
                }
            }, 100)
        },
    },
    created() {},
    mounted() {
        this.getMenu()
    },
    activated() {

    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.treeMenus {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 15px;

    .menus {
        width: 100%;
        height: auto;
        background: #FFF;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 10px;

        .list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 10px 0;
            border-bottom: 1PX solid #ebebeb;

            .img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .names {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 10px;

                span:nth-child(1) {
                    font-size: 16px;
                    font-weight: bold;
                }

                span:nth-child(2) {
                    font-size: 12px;
                    color: #797979;
                    margin-top: 3px;
                }
            }
        }
    }
}
</style>
