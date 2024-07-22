<template>
    <div class="ds-moduleIndex">
        <div class="information flex ac jb">
            <div class="left">
                <img src="static/images/project/nyncb/logo01.png" />
            </div>
            <div class="right flex ac">
                <img src="static/images/project/nyncb/user.png" />
                <span class="elps">{{ userName }}</span>
            </div>
        </div>
        <transition name="bounce">
            <div v-show="showMenu" class="popup">
                <div class="mainMenu">
                    <div class="title flex ac jb">
                        <span>全部应用</span>
                        <van-icon name="cross" color="#333" size="30px" style="font-weight: 900;"
                            @click="showMenu = false" />
                    </div>
                    <div :class="[direction ? 'directionMenu2' : '', 'dsf-list']" v-if="mainMenu.length > 0">
                        <div :key="subIndex" v-for="(subItem, subIndex) in mainMenu[0].child" v-show="subItem.isshow"
                            class="menu menu_6" @click="goRoute(subItem)">
                            <img :src="subItem.img" />
                            <p :style="subItem.style" v-html="subItem.name"></p>
                            <div class="badge" v-if="subItem.badgeNum">
                                {{ subItem.badgeNum | badgeCount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <div class="overlay" v-show="showMenu" @click="showMenu = false"></div>

        <div :class="[direction ? 'direction' : '', 'officeMenu']" v-show="!showMenu"
            :style="{ 'padding': direction ? '0 .4rem' : '0 .6rem' }">
            <div class="title">
                <span>{{ officeMenu.name }}</span>
            </div>
            <div :class="[direction ? 'directionMenu' : '', 'dsf-list']" v-if="officeMenu.child.length > 0">
                <div :key="subIndex" v-for="(subItem, subIndex) in officeMenu.child" v-show="subItem.isshow"
                    class="menu menu_6" @click="goRoute(subItem)">
                    <img :src="subItem.img" />
                    <p :style="subItem.style" v-html="subItem.name"></p>
                    <div class="badge" v-if="subItem.badgeNum">
                        {{ subItem.badgeNum | badgeCount }}
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="todo">
                    <div class="title">
                        <span>待办中心</span>
                        <img src="static/images/project/nyncb/more.png" @click="goTodoList(1)" />
                    </div>
                    <commonempty class="empty" description="暂无待办数据" v-if="todo && todo.length == 0"></commonempty>
                    <div class="todoFlex" v-else>
                        <div class="todoList flex ac" v-for="(item, index) in todo" :key="index" @click="goForm(item)"
                            :style="{
                                borderBottom: index == 2 ? 'none' : '1px solid #d8d8d8'
                            }">
                            <img :src="
                                `static/images/project/nyncb/${item.dataValue.isRead ? 'item1' : 'item'
                                }.png`
                            " alt="" />
                            <div class="todoRight">
                                <div class="todoTitle flex ac">
                                    <img v-if="item.dataValue.jjcd != 0 && item.dataValue.jjcd"
                                        src="static/images/project/nyncb/te.png" />
                                    <img v-if="item.dataValue.mj != 0 && item.dataValue.mj"
                                        src="static/images/project/nyncb/mi.png" />
                                    <span class="elps">{{ item.dataValue.bt }}</span>
                                </div>
                                <div class="todoContent flex jb ac">
                                    <span><img src="static/images/project/nyncb/个人.png" alt="" />{{
                                        item.dataValue.userAndNode
                                    }}</span><span><img src="static/images/project/nyncb/时间.png" alt="" />{{
    item.dataValue.time
}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="todo">
                    <div class="title">
                        <span>领导日程</span>
                        <img src="static/images/project/nyncb/more.png" @click="goTodoList(2)" />
                    </div>
                    <commonempty class="empty" description="暂无日程数据" v-if="personal && personal.length == 0"></commonempty>
                    <div v-else class="todoFlex">
                        <div class="todoList flex ac" v-for="(item, index) in personal" :key="index" @click="goForm(item)"
                            :style="{
                                borderBottom: index == 2 ? 'none' : '1px solid #d8d8d8'
                            }">
                            <div class="todoRight">
                                <div class="todoContent flex jb ac">
                                    <span style="color: #409CF8"><img src="static/images/project/nyncb/time.png" alt="" />{{
                                        item.time
                                    }}</span>
                                    <span><img src="static/images/project/nyncb/个人.png" />{{ item.attendant }}</span>
                                </div>
                                <div class="todoTitle elps marginAuto">{{ item.content }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <van-overlay :show="showSubmenu" @click="showSubmenu = false" class-name="submenuOverlay" :lock-scroll="false">
            <div class="mainMenu submenuBox">
                <div class="submenuTitle">
                    <span>{{ submenu.name }}</span>
                    <!-- <van-icon name="cross" color="#333" size="30px" style="font-weight: 900;" @click="showSubmenu = false" /> -->
                </div>
                <div :class="[direction ? 'directionMenu2' : '', 'dsf-list', 'submenuMain']">
                    <div :key="subIndex" v-for="(item, subIndex) in submenu.child" class="menu menu_6"
                        @click="showSubmenu = false; goRoute(item);">
                        <img :src="item.img" />
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
export default {
    name: "nyncbindex",
    data() {
        return {
            isHideTitle: false,
            user: dsf.util.loadSessionStore("user") || {},
            default_img: 'this.src="static/squMenu/tatj.png"',
            mainMenu: [],
            showSubmenu: false,
            submenu: {
                name: "",
                child: []
            },
            officeMenu: {
                name: "",
                child: []
            },
            showMenu: false,
            todo: [],
            personal: [],
            userName: "",
            deptName: "",
            direction: true, // 横屏false，竖屏true
        };
    },
    watch: {
        direction: {
            handler(newValue, oldValue) {
                let h = document.documentElement.clientHeight
                let w = document.documentElement.clientWidth
                if (oldValue == undefined && w > h) {
                    console.log("第一次进去为横屏")
                    this.direction = false
                }
            },
            immediate: true,
        },
    },
    filters: {
        badgeCount(val) {
            if (val > 100) {
                return "99+";
            }
            if (val < 1) {
                return "";
            }
            return val;
        }
    },
    methods: {
        async getMenu() {
            //获取应用
            let that = this;
            var mainMenuNow = [];
            dsf.http.post("fn/newFile/shortcutDing", {}).then(res => {
                let result = res.data;
                // 递归菜单
                let forFunc = function (list, menu) {
                    list.forEach(item => {
                        if (item.displayPosition.indexOf("work") < 0) return;
                        let agentId = item.agentid;
                        try {
                            if (agentId) {
                                agentId = JSON.parse(agentId);
                            }
                        } catch (e) {
                            agentId = {};
                        }
                        let child = {
                            name: item.shortcutName,
                            badge: item.tip,
                            router: item.actUrl ? item.actUrl.trim() : "",
                            img: item.shortcutIcon,
                            props: agentId,
                            type: item.shortcutType,
                            showClickTip: item.gntsyText,
                            child: [],
                            style:
                                dsf.config.homePage.menuSetting &&
                                    dsf.config.homePage.menuSetting.itemStyle
                                    ? dsf.config.homePage.menuSetting.itemStyle
                                    : "{}"
                        };
                        menu.push(child);
                        if (item.children.length > 0) forFunc(item.children, child.child);
                    });
                };
                forFunc(result.data, mainMenuNow);

                that.getBadge(mainMenuNow);

                that.officeMenu.child.push(...mainMenuNow[0].child.slice(0, 5));
                that.officeMenu.name = mainMenuNow[0].name;
                that.officeMenu.child.push({
                    name: "更多",
                    router: "showMainMenu",
                    img: "static/images/project/nyncb/更多.png",
                    type: 1,
                    child: [],
                    style: {
                        fontWeight: "bold"
                    },
                    isshow: true
                });

                that.mainMenu = mainMenuNow;
                that.isHideTitle =
                    that.mainMenu.length == 1 && dsf.config.appSelect.isHideTitle;
            });
        },
        getBadge(mainMenuNow) {
            function setBadge(subItem, result) {
                for (let index = 0; index < result.length; index++) {
                    const element = result[index].data;
                    if (element.hasOwnProperty("total") && !isNaN(element.total)) {
                        subItem.badgeNum += parseInt(element.total);
                    } else if (
                        element.hasOwnProperty("badge") &&
                        !isNaN(element.badge)
                    ) {
                        subItem.badgeNum += parseInt(element.badge);
                    } else if (
                        element.hasOwnProperty("data") &&
                        !isNaN(element.data)
                    ) {
                        subItem.badgeNum += parseInt(element.data);
                    } else if (
                        element.data?.hasOwnProperty("badge") &&
                        !isNaN(element.data.badge)
                    ) {
                        subItem.badgeNum += parseInt(element.data.badge);
                    }
                }
            }
            let that = this;
            mainMenuNow.forEach(main => {
                main.child.forEach(subItem => {
                    subItem.badgeNum = 0;
                    subItem.isshow = true;
                    if (subItem.badge && subItem.badge != "") {
                        dsf.http.postUrls(subItem.badge, {}).then(result => {
                            let res = Array.isArray(result) ? result : [result]
                            if(res.filter(Boolean).length > 0) setBadge(subItem, res)
                        });
                    }
                });
            });
        },
        openDDApp(agentId) {
            dd.biz.microApp.openApp({
                agentId: agentId,
                onSuccess: function (result) { },
                onFail: function (err) { }
            });
        },
        goRoute(item) {
            if (item.child.length > 0) {
                //打开三级菜单
                this.showSubmenu = true;
                this.submenu = item;
            } else if (item.router == "showMainMenu") {
                this.showMenu = true;
            } else if (item.router == "" || item.router == undefined) {
                //无菜单地址出提醒
                if (item.showClickTip) {
                    dsf.layer.alert({
                        message: item.showClickTip
                    });
                } else {
                    dsf.layer.alert({
                        message: "当前菜单配置错误，请联系管理员！"
                    });
                }
            } else if (item.type && item.type == 3) {
                //打开钉钉应用
                this.openDDApp(item.router);
            } else if (item.type == 2) {
                //打开第三方链接
                let url = dsf.util.getReplaceUrl(item.router);
                if (dsf.config.ddSetting.isDing) {
                    // 钉钉跳转
                    if (dd.biz) {
                        //区分普通钉和政务钉
                        dd.biz.util.openLink({
                            url: item.router,
                            onSuccess: function (result) { },
                            onFail: function (err) { }
                        });
                    } else {
                        dd.openLink({ url: item.router })
                    }
                } else if (item.props?.OpenWebView == "1") {
                    xsfWindow.openWebView({
                        title: item.name,
                        url: url,
                        colorString: "#111111"
                    });
                } else if (item.props?.OpenLocationHref == "1") {
                    location.href = url;
                } else {
                    // 其他方式均嵌入iframe
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
        getList() {
            dsf.http
                .post("fn/mobileToDoAndRead/getToDoAndReadList2", {
                    limit: 3,
                    page: 1,
                    showTotal: true,
                    fileType: "gw",
                    start: 1
                })
                .then(({ data }) => {
                    if (data.datas) {
                        this.todo = data.datas;
                    }
                });
            let day = moment(new Date()).format("YYYY-MM-DD");

            dsf.http
                .post("fn/ldrc/org/getMobileWeekData", {
                    sdate: day,
                    edate: day,
                    type: "leader"
                })
                .then(({ data }) => {
                    this.personal = data?.data[0]?.schedule.slice(0, 3)
                    this.personal.forEach(item => { item.time = day + " " + item.time });
                });
        },
        goTodoList(flag) {
            if (flag == 1) {
                this.$router.push({
                    name: "commonList",
                    query: { fileType: "gw" }
                });
            } else if (flag == 2) {
                this.$router.push({
                    path: "commonSchedule/default"
                });
            }
        },
        goForm(ele) {
            let path = "";
            let query = {};
            if (ele.dataValue) {
                path = `${ele.dataValue.moduleId}/${ele.dataValue.info_id}`;
                query = {
                    todoId: ele.dataValue.todoId,
                    type: "gw"
                };
            } else {
                path = `${ele.moduleId}/${ele.agendaId}`;
            }

            this.$router.push({
                path: "/commonForm/" + path,
                query
            });
        },
        isPortrait() {
            if (window.orientation === 180 || window.orientation === 0) {
                this.direction = true;
            }
            if (window.orientation === 90 || window.orientation === -90) {
                this.direction = false;
            }
        }
    },
    created() {
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.isPortrait, false);
        // this.isShowMyMenus = dsf.config.appSelect
        //     ? dsf.config.appSelect.isShowMyMenus
        //     : true;
        this.getMenu();
        this.getList();
        this.deptName = dsf.util.loadSessionStore("user")?.deptName;
        this.userName = `${dsf.util.loadSessionStore("user")?.name}（${this.deptName
            }）`;
    },
    activated() {
        this.getBadge(this.mainMenu);
        this.getList();
    },
    beforeDestroy() {
        window.removeEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.isPortrait, false);
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.ds-moduleIndex {
    position: relative;
    background-image: url("../../../../static/images/project/nyncb/bgm.png");
    background-repeat: no-repeat;
    background-size: cover;
    height: calc(100vh - 1.2rem);
    width: 100vw;
    overflow: auto;

    .information {
        width: 100%;
        height: 1rem;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
        padding: 0.5rem 15px;
        box-sizing: border-box;

        span {
            font-size: var(--font_size_2);
            color: #fff;
            line-height: 0.8rem;
            margin-left: 5px;
        }

        .left {
            img {
                height: 0.7rem;
                width: auto;
            }
        }

        .right {
            max-width: 35%;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 20px;
            padding-left: 8px;

            img {
                width: 0.5rem;
                height: 0.5rem;
            }
        }
    }

    .officeMenu {
        height: calc(100vh - 2.2rem);
        width: 100vw;

        .dsf-list {
            justify-content: space-evenly;
            margin-left: -20px;
            margin-right: -20px;
        }

        .list {
            min-height: 230px;
            display: flex;
            justify-content: space-between;

            .todo {
                width: 49%;
                margin-bottom: 15px;
                background: #ffffff;
                box-shadow: inset 0 0 100px 0 #b1d6fa;
                border-radius: 20px;
                padding: 10px 15px;
                box-sizing: border-box;

                .empty {
                    padding: 0;
                }

                .title {
                    padding: 0 0 0 .3rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    span {
                        color: #000;
                    }

                    img {
                        width: 18px;
                    }

                    span::before {
                        background: #0778e9;
                    }
                }

                .todoFlex {
                    .todoList {

                        img {
                            width: 8%;
                            margin-right: 15px;
                        }

                        .todoRight {
                            overflow: hidden;
                            width: 100%;

                            .todoTitle {
                                width: 100%;
                                margin-top: 10px;
                                margin-bottom: 5px;
                                color: #333;
                                font-weight: 600;
                                font-size: var(--font_size_2);

                                img {
                                    display: inline-block;
                                    width: 16px;
                                    padding-right: 2px;
                                }
                            }

                            .todoContent {
                                padding-top: 5px;
                                padding-bottom: 10px;
                                box-sizing: border-box;

                                span {
                                    color: #999;

                                    img {
                                        display: inline-block;
                                        vertical-align: middle;
                                        position: relative;
                                        top: -2px;
                                        width: 15px;
                                        margin-right: 8px;
                                    }
                                }
                            }

                            .marginAuto {
                                padding-top: 5px;
                                padding-bottom: 10px;
                                margin: auto;
                            }

                            .paddingAuto {
                                margin-top: 10px;
                                margin-bottom: 5px;
                                padding: auto;
                            }
                        }
                    }
                }
            }
        }
    }

    .mainMenu {
        .dsf-list {
            flex-wrap: wrap;
            margin-left: -15px;
            margin-right: -15px;

            .menu {
                margin-bottom: 20px;

                p {
                    color: #333;
                }

                img {
                    border-radius: 9px;
                }
            }
        }

        .title {
            padding-left: 20px;

            span {
                color: #333;
            }

            span::before {
                content: "";
                background: #0778e9;
            }
        }
    }

    .dsf-list {
        display: flex;

        .menu {
            display: inline-block;
            width: 16.5%;
            text-align: center;
            position: relative;
            margin-bottom: 15px;

            img {
                display: inline-block;
                margin-bottom: 10px;
            }

            p {
                font-size: var(--font_size_3);
                color: white;
            }

            .badge {
                width: fit-content;
                position: absolute;
                left: 60%;
                top: -5px;
                font-size: var(--font_size_4);
                background-color: #ee0a24;
                color: #fff;
                padding: 0 4px;
                border-radius: 10px;
                line-height: 0.4rem;
                height: 0.4rem;
                min-width: 0.4rem;
            }
        }

        .menu_6 {
            img {
                width: 60px;
                height: 60px;
            }

            p {
                font-size: var(--font_size_2);
            }
        }
    }

    .title {
        margin: 0 auto;
        position: relative;
        padding: 15px 0 10px 15px;

        span {
            /* line-height: 35px !important; */
            font-size: var(--font_size_0);
            letter-spacing: 1px;
            color: #fff;
            font-weight: 600;
        }

        span::before {
            content: "";
            display: inline-block;
            background: #ffffff;
            border-radius: 6px;
            width: 6px;
            height: 22px;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
    }
}

.dsf-list::before {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.submenuOverlay {
    backdrop-filter: blur(10px);
    background-color: rgba(175, 175, 175, 0.6);
    z-index: 101;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    .submenuBox {
        padding: 0 50px;
        z-index: 102;
        position: relative;
        top: 50%;
        transform: translateY(-90%);

        .submenuTitle {
            text-align: center;
            font-size: 0.45rem;
            letter-spacing: 0.02rem;
            color: #fff;
            font-weight: 600;
        }

        .submenuMain {
            margin-top: 20px;
            padding-top: 0.4rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 20px;
        }
    }
}

.popup {
    margin: auto;
    position: absolute;
    inset: 1rem 0px 0px;
    width: 95%;
    height: 80%;
    padding: 0 15px;
    background-color: #fff;
    border-radius: 20px;
    z-index: 100;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    width: 100vw;
    height: calc(100vh - 1.2rem);
    z-index: 99;
}

.direction {
    .list {
        flex-wrap: wrap;

        .todo {
            width: 100% !important;
        }
    }
}

.directionMenu {
    flex-wrap: wrap;

    .menu {
        width: 33% !important;
    }
}

.directionMenu2 {
    flex-wrap: wrap;

    .menu {
        width: 25% !important;
    }
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>
