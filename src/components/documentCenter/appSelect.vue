<!--
 * @Author: RONGWEI PENG
 * @Date: 2020-05-14 23:24:29
 * @LastEditTime: 2020-05-15 04:00:05
 * @LastEditors: Do not edit
 * @FilePath: \xzDing\src\components\moduleIndex.vue
 * @Description:
 -->
<template>
<div class="ds-moduleIndex">
    <div class="appBox" v-if="!settingModel">
        <van-sticky v-if="isShowMyMenus">
            <form action="javascript:return true" @submit.prevent>
                <van-search :clearable="false" v-model="searchVal" :show-action="true" :offset="100" shape="round" placeholder="搜索">
                    <template #action>
                        <van-icon name="wap-nav" @click="settingModel = !settingModel" />
                    </template>
                </van-search>
            </form>
        </van-sticky>
        <!-- 我的应用 -->
        <div class="card" v-if="isShowMyMenus">
            <div class="title">
                <span>我的应用</span>
            </div>
            <div class="dsf-list" v-if="myMenus.length > 0">
                <div :key="subIndex" v-for="(subItem, subIndex) in myMenus" v-show="subItem.isshow" class="menu" @click="goRoute(subItem)">
                    <img :src="subItem.img" alt :onerror="default_img" />
                    <p>{{ subItem.name }}</p>
                    <div class="badge" v-if="subItem.badgeNum">{{subItem.badgeNum < 99?subItem.badgeNum:'99+'}}</div>
                </div>
            </div>
            <div class="noApp" @click="settingModel = !settingModel" v-if="myMenus.length < 1">
                请增加应用<span>+</span>
            </div>
        </div>
        <!-- 轮播 -->
        <app-swiper :swiper="appSwiper"></app-swiper>
        <!-- 应用 -->
        <div class="item-cell" :class="{card : item.child.length}" :key="index" v-for="(item, index) in mainMenu">
            <div class="title" v-if="item.child.length > 0 && !isHideTitle">
                <span>{{ item.name }}</span>
            </div>
            <div class="dsf-list" v-if="item.child.length > 0" :style="{marginTop: isHideTitle ? '0.3rem' : 0}">
                <div :key="subIndex" v-for="(subItem, subIndex) in item.child" v-show="subItem.isshow && subItem.hasMyMenu == 0" class="menu" @click="goRoute(subItem)">
                    <img :src="subItem.img" alt />
                    <p>{{ subItem.name }}</p>
                    <div class="badge" v-if="subItem.badgeNum">{{subItem.badgeNum < 99?subItem.badgeNum:'99+'}}</div>
                </div>
            </div>
        </div>
    </div>
    <menu-setting v-if="settingModel" @cancel="cancel" @done=" getMenu(); settingModel = false; " :menus="mainMenu" :myMenus="myMenus"></menu-setting>
    <!-- <van-dialog v-model="showSubmenu" :show-confirm-button="false" :closeOnClickOverlay="true" class="submenuDialog">
        <template #title>
            <div style="padding-bottom: 0.32rem">{{submenu.name}}</div>
        </template>
        <div class="dsf-list" v-if="submenu.child.length > 0" :style="{marginTop: isHideTitle ? '0.3rem' : 0}">
            <div :key="subIndex" v-for="(item, subIndex) in submenu.child" class="menu" @click="showSubmenu = false;goRoute(item)" style="width:33%">
                <img :src="item.img" alt />
                <p>{{ item.name }}</p>
            </div>
        </div>
    </van-dialog> -->
    <van-overlay :show="showSubmenu" @click="showSubmenu = false" class-name="submenuOverlay" :lock-scroll="false">
        <div class="submenuContainer">
            <div class="submenuTitle">{{ submenu.name }}</div>
            <div class="submenuBox">
                <div class="dsf-list" v-if="submenu.child.length > 0" :style="{ marginTop: isHideTitle ? '0.3rem' : 0}">
                    <div :key="subIndex" v-for="(item, subIndex) in submenu.child" class="menu"
                        @click="showSubmenu = false; goRoute(item)" style="width:33%">
                        <img :src="item.img" alt />
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </van-overlay>
</div>
</template>

<script>
import menuSetting from "./menuSetting";
import appSwiper from './appSwiper'
export default {
    name: "moduleIndex",
    data() {
        return {
            isHideTitle: false,
            user: dsf.util.loadSessionStore("user") || {},
            default_img: 'this.src="' + require("static/squMenu/tatj.png") + '"',
            appSwiper: dsf.config.appSwiper || {},
            meetingMenu: [{
                    menuID: "3",
                    menuText: "会议室预定",
                    routeUrl: "/reserveMeeting",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/hy-hysyd.png"),
                },
                {
                    menuID: "4",
                    menuText: "会议申请",
                    routeUrl: "/meeting/apply",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/hy-hysq.png"),
                },
                {
                    menuID: "5",
                    menuText: "会议管理",
                    routeUrl: "/meetingManage",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/hy-hygl.png"),
                },
                // {
                //   menuID: "1",
                //   menuText: "视频会议",
                //   routeUrl: "/openSchedule",
                //   type: "route",
                //   params: null,
                //   imgUrl: require("@/assets/imgs/appCenter/hy-sphy.png")
                // },
                // {
                //   menuID: "2",
                //   menuText: "电话会议",
                //   routeUrl: "",
                //   type: "route",
                //   params: null,
                //   imgUrl: require("@/assets/imgs/appCenter/hy-dhhy.png")
                // },

                {
                    menuID: "6",
                    menuText: "会议签到",
                    routeUrl: "/inConstruction",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/hy-hyqd.png"),
                },
            ],
            studyMenu: [{
                    menuID: "8",
                    menuText: "信息公开",
                    routeUrl: "/msgdisclosure",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/xx-xxgk.png"),
                },
                {
                    menuID: "9",
                    menuText: "电子刊物",
                    routeUrl: "/electronic",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/xx-dzkw.png"),
                },
            ],
            partyBuildMenu: [
                // {
                //   menuID: "10",
                //   menuText: "云上党建",
                //   routeUrl: "",
                //   type: "url",
                //   params: null,
                //   imgUrl: require("@/assets/imgs/appCenter/dj-ysdj.png")
                // },
                {
                    menuID: "11",
                    menuText: "i党建",
                    routeUrl: "http://ipb.dreamdt.cn:81/iPB/dist/index.html#/authLogin/15000583554",
                    type: "url",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/dj-idj.png"),
                },
                {
                    menuID: "7",
                    menuText: "学习邦",
                    routeUrl: "http://ipb2.dreamdt.cn:81/dsfa/nc/mobile/dist/webmobile/index.html?v=1.10#/",
                    type: "url",
                    imgUrl: require("@/assets/imgs/appCenter/xx-xxb.png"),
                },
                {
                    menuID: "12",
                    menuText: "党建直播",
                    routeUrl: "/openSchedule",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/dj-djzb.png"),
                },
            ],
            docManagenMenu: [{
                    menuID: "13",
                    menuText: "收文登记",
                    routeUrl: "/signinlist",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/gwgl-swdj.png"),
                },
                {
                    menuID: "14",
                    menuText: "发文起草",
                    routeUrl: "/postlist",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/gwgl-fwqc.png"),
                },
                {
                    menuID: "15",
                    menuText: "公文检索",
                    routeUrl: "/search",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/gwgl-gwjs.png"),
                },
                {
                    menuID: "16",
                    menuText: "公文统计",
                    routeUrl: "/inConstruction",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/gwgl-gwtj.png"),
                },
            ],
            SupervisionMenu: [{
                    menuID: "17",
                    menuText: "督办立项",
                    routeUrl: "/supervise",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/dcdb-dblx.png"),
                },
                {
                    menuID: "18",
                    menuText: "督办管理",
                    routeUrl: "/inspectorList",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/dcdb-dbgl.png"),
                },
                {
                    menuID: "19",
                    menuText: "督办反馈",
                    routeUrl: "/inspectorFeedback",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/dcdb-dbfk.png"),
                },
                {
                    menuID: "20",
                    menuText: "督办统计",
                    routeUrl: "/inConstruction",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/dcdb-dbtj.png"),
                },
            ],
            letMaMenu: [{
                    menuID: "21",
                    menuText: "来电受理",
                    isShow: false,
                    routeUrl: "/",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/xfgl-ldsl.png"),
                },
                {
                    menuID: "22",
                    menuText: "来信受理",
                    isShow: false,
                    routeUrl: "/",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/xfgl-lxsl.png"),
                },
                {
                    menuID: "23",
                    menuText: "来访受理",
                    isShow: false,
                    routeUrl: "/",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/xfgl-lfsl.png"),
                },
            ],
            streeTownMenu: [{
                    menuID: "24",
                    menuText: "政策咨询",
                    routeUrl: "http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=191032&dd_func_wk=false#/zxWt?flType=0",
                    type: "url",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/jzztc-zczx.png"),
                },
                {
                    menuID: "25",
                    menuText: "问题沟通",
                    routeUrl: "http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=191032&dd_func_wk=false#/zxWt?flType=1",
                    type: "url",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/jzztc-wtgt.png"),
                },
                {
                    menuID: "26",
                    menuText: "村村通",
                    routeUrl: "/openSchedule",
                    type: "route",
                    params: null,
                    imgUrl: require("@/assets/imgs/appCenter/jzztc-cct.png"),
                },
            ],
            settingModel: false,
            isShowMyMenus: false,
            mainMenu: [],
            myMenus: [],
            searchVal: "",

            local_menu: [
                //本地列表（赞配）
                {
                    child: [{
                        badge: "",
                        badgeNum: 0,
                        hasMyMenu: 0,
                        img: "",
                        isshow: true,
                        name: "民主测评",
                        props: "",
                        router: "/democracyList",
                        type: undefined,
                    }, ],
                    name: "本地列表"
                },
            ],
            showSubmenu: false,
            submenu: {
                name:'',
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
        goMeetingMenu(id) {
            this.meetingMenu.forEach((item) => {
                if (item.menuID == id) {
                    if (item.type == "url") {
                        window.location.href = item.routeUrl;
                    } else if (item.type == "route") {
                        this.$router.push(item.routeUrl);
                    } else {
                        let params = {
                            ...item.params,
                            onSuccess: function (result) {},
                            onFail: function (err) {},
                        };
                        console.log(params);
                        dd.biz.microApp.openApp(params);
                    }
                }
            });
        },
        gostudyMenu(id) {
            this.studyMenu.forEach((item) => {
                if (item.menuID == id) {
                    if (item.type == "url") {
                        window.location.href = item.routeUrl;
                    } else if (item.type == "route") {
                        this.$router.push(item.routeUrl);
                    } else {
                        let params = {
                            ...item.params,
                            onSuccess: function (result) {},
                            onFail: function (err) {},
                        };
                        dd.biz.microApp.openApp(params);
                    }
                }
            });
        },
        goPartyBuildMenu(id) {
            this.partyBuildMenu.forEach((item) => {
                if (item.menuID == id) {
                    if (item.type == "url") {
                        window.location.href = item.routeUrl;
                    } else if (item.type == "route") {
                        this.$router.push(item.routeUrl);
                    } else {
                        let params = {
                            ...item.params,
                            onSuccess: function (result) {},
                            onFail: function (err) {},
                        };
                        dd.biz.microApp.openApp(params);
                    }
                }
            });
        },
        goDocManagenMenu(id) {
            this.docManagenMenu.forEach((item) => {
                if (item.menuID == id) {
                    if (item.type == "url") {
                        window.location.href = item.routeUrl;
                    } else if (item.type == "route") {
                        this.$router.push(item.routeUrl);
                    } else {
                        let params = {
                            ...item.params,
                            onSuccess: function (result) {},
                            onFail: function (err) {},
                        };
                        dd.biz.microApp.openApp(params);
                    }
                }
            });
        },
        goSupervisionMenu(id) {
            this.SupervisionMenu.forEach((item) => {
                if (item.menuID == id) {
                    if (item.type == "url") {
                        window.location.href = item.routeUrl;
                    } else if (item.type == "route") {
                        this.$router.push(item.routeUrl);
                    } else {
                        let params = {
                            ...item.params,
                            onSuccess: function (result) {},
                            onFail: function (err) {},
                        };
                        dd.biz.microApp.openApp(params);
                    }
                }
            });
        },
        goLetMaMenu(id) {
            this.letMaMenu.forEach((item) => {
                if (item.menuID == id) {
                    if (item.type == "url") {
                        window.location.href = item.routeUrl;
                    } else if (item.type == "route") {
                        this.$router.push(item.routeUrl);
                    } else {
                        let params = {
                            ...item.params,
                            onSuccess: function (result) {},
                            onFail: function (err) {},
                        };
                        dd.biz.microApp.openApp(params);
                    }
                }
            });
        },
        goStreeTownMenuu(id) {
            this.streeTownMenu.forEach((item) => {
                if (item.menuID == id) {
                    if (item.type == "url") {
                        window.location.href = item.routeUrl;
                    } else if (item.type == "route") {
                        this.$router.push(item.routeUrl);
                    } else {
                        let params = {
                            ...item.params,
                            onSuccess: function (result) {},
                            onFail: function (err) {},
                        };
                        dd.biz.microApp.openApp(params);
                    }
                }
            });
        },
        cancel() {
            //取消选择
            this.settingModel = false;
        },
        getMenu() {
            //获取应用
            let that = this;
            var mainMenuNow = [];
            if (dsf.util.loadLocalStore("mySetting")) {
                let mySettingMenu = dsf.util.loadLocalStore("mySetting")
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
                console.log(this.myMenus);
            }
            //process.env.NODE_ENV
            if ("production" == "production") {
                //生产远程
                dsf.http.post("fn/newFile/shortcutDing", {}).then((res) => {
                    let result = res.data;
                    // 递归菜单
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
                    forFunc(result.data, mainMenuNow)
                    // result.data.forEach((item) => {
                    // if (item.displayPosition.indexOf("work") < 0) return
                    //     let level1Menu = {
                    //         name: item.shortcutName,
                    //         child: [],
                    //     };
                    //     item.children.forEach((child) => {
                    //     if (child.displayPosition.indexOf("work") < 0) return
                    //         let agentId = child.agentid;
                    //         try {
                    //             if (agentId != "") {
                    //                 agentId = JSON.parse(agentId);
                    //             }
                    //         } catch (e) {
                    //             agentId = {};
                    //         }
                    //         let level2Menu = {
                    //             name: child.shortcutName,
                    //             badge: child.tip,
                    //             router: child.actUrl,
                    //             img: child.shortcutIcon,
                    //             props: agentId,
                    //             type: child.shortcutType,
                    //         };
                    //         level1Menu.child.push(level2Menu);
                    //     });
                    //     mainMenuNow.push(level1Menu);
                    // });
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
                    that.isHideTitle = that.mainMenu.length == 1 && dsf.config.appSelect.isHideTitle
                    console.log(that.mainMenu.length == 1 && dsf.config.appSelect.isHideTitle)
                    //console.log(that.mainMenu, res);
                });
            } else {
                //本地配置
                // that.mainMenu = mainConfig.mainMenuConfig;
                that.mainMenu = this.local_menu;
            }
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
                if(dsf.config.ddSetting.isDing) { // 钉钉跳转
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
        },
    },
    components: {
        menuSetting,
        appSwiper
    },
    mounted() {
        this.isShowMyMenus = dsf.config.appSelect ? dsf.config.appSelect.isShowMyMenus : true;
        this.getMenu();
    },
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
                font-size: 15px;
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
.submenuOverlay {
    backdrop-filter: blur(10px);
    background-color: rgba(175,175,175,0.6);
    z-index: 99;
    .submenuContainer {
        width: calc(100% - 40px);
        padding: 0 10px;
        margin: 20px;
        background: rgba(255,255,255,0.7);
        border-radius: 20px;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        .submenuTitle {
            color: #fff;
            font-size: 24px;
            font-weight: 600;
            position: absolute;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
        }
        .submenuBox {
            max-height: calc(4 * 118px);
            overflow: auto;
        }
        .menu {
            min-height: 118px;
            padding: 15px 0;
            margin: 0;
            border-bottom: 1px solid #d8d8d8;
            // 移动端二级菜单页面打开后图标文字未居中显示
            // 修改期望：二级菜单打开后图标与字体居中显示
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
                color: #666;
            }
        }
    }
}
</style>
