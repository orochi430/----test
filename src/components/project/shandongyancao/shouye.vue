<template>
    <div class="system">
        <div class="top">
            <div class="title">
                <img src="../../../../static/images/shandongyancao/conference/logo1.png" alt="">
                <p>稿件管理系统</p>
            </div>
            <div class="my">
                <div class="my_con">
                    <div class="con1" v-for="item in menuList" :key="item.menuID" @click="goMenu(item.menuID)">
                        <img :src="item.imgUrl" alt="">
                        <span v-html="item.menuText"></span>
                        <div class="badge" v-if="item.badgeNum">{{item.badgeNum <= 99?item.badgeNum:'99+'}}>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ds-moduleIndex">
                <div class="appBox" v-if="!settingModel">
                    <!-- 我的应用 -->
                    <div class="card">
                        <div :class="['title1', !(itemdata.params.showIcon === false) ? 'showIcon' : '']">
                            <img src="../../../../static/images/shandongyancao/conference/copy.png" alt="">
                            <span>{{ dsf.config.appSelect ? (dsf.config.appSelect.selectName || '常用功能') :
                            '常用功能'}}</span>
                            <span style="float:right;font-size: var(--font_size_4);color:#666"
                                @click="settingModel = !settingModel">
                                <van-icon name="setting-o" /> 管理
                            </span>
                        </div>
                        <div class="dsf-list" v-if="myMenus.length > 0">
                            <div :key="subIndex" v-for="(subItem, subIndex) in myMenus" v-show="subItem.isshow"
                                :class="['menu', `menu_${rowNum}`]" @click="goRoute(subItem)"
                                :style="{ width: `${100 / rowNum}%` }">
                                <img :src="subItem.img" alt :onerror="default_img" />
                                <p v-html="subItem.name"></p>
                                <div class="badge" v-if="subItem.badgeNum">{{ subItem.badgeNum | badgeCount }}
                                </div>
                            </div>
                        </div>
                        <div class="noApp" @click="settingModel = !settingModel" v-if="myMenus.length < 1">
                            请增加应用<span>+</span>
                        </div>
                    </div>
                    <!-- 应用 -->
                </div>
                <menu-setting v-else @cancel="cancel" @done="getMenu(); settingModel = false; " :menus="mainMenu"
                    :myMenus="myMenus" :rowNum="rowNum"></menu-setting>
            </div>
            <div class="db" v-show="!settingModel" v-for="(item,index2) in 2" :key="index2">
                <div class="gl">
                    <div class="left">
                        <img src="../../../../static/images/shandongyancao/conference/copy.png" alt="">
                        <span>{{ item==1 ? "待办":"已办"}}</span>
                    </div>
                    <div class="right" @click="getMore(item==1 ?'gw':'ybwj')">
                        <span>更多</span>
                        <img src="../../../../static/images/shandongyancao/conference/ljbf.png" alt="">
                    </div>
                </div>
                <div class="news">
                    <div class="news_con" v-for="(ele,index) in item==1?db:yb" :key="index">
                        <div class="co" @click="goForm(item,ele)">
                            <span>{{ele.dataValue.bt}}</span>
                        </div>
                        <div class="dsh">
                            <div class="le gw" >
                                <span class="mkmc">{{ele.dataValue.moduleName}}</span>
                                <div  v-if="item==1">
                                   <van-icon name="friends-o" size="18px" color="#9CA8BB"/>
                                <span>{{item==1?ele.dataValue.name:""}}</span>
                                </div>
                            </div>
                            <div class="re gw">
                                <img src="../../../../static/images/shandongyancao/conference/time.png" alt="">
                                <span>{{ item==1? ele.dataValue.time.slice(5) : ele.dataValue.flowTime.slice(5)}}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menuSetting from "@/components/documentCenter/menuSetting";
export default {
    name: "shouye",
    components: {
        menuSetting
    },
    data() {
        return {
            menuList: [],
            db: [],
            yb: [],
            itemdata: {
                name: "ApplicationCenterComponents",
                params: {
                    "padRowNumber": "5",
                    "mobileRowNumber": "4",
                    "showIcon": true
                }
            },
            isHideTitle: false,
            user: dsf.util.loadSessionStore("user") || {},
            default_img: 'this.src="static/squMenu/tatj.png"',
            meetingMenu: [],
            studyMenu: [],
            partyBuildMenu: [],
            docManagenMenu: [],
            SupervisionMenu: [],
            letMaMenu: [],
            streeTownMenu: [],
            settingModel: false,
            mainMenu: [],
            myMenus: [],
            searchVal: "",
            local_menu: [],
            showSubmenu: false,
            submenu: {
                name: '',
                child: []
            }
        };
    },
    created() {
        this.getMenu1()

        dsf.http.post('fn/mobileToDoAndRead/getToDoAndReadList2', {
            limit: 3,
            page: 1,
            showTotal: true,
            fileType: 'gw',
            start: 1,
        }).then(({ data }) => {
            this.db = data.datas
        })
        dsf.http.post('fn/personalcenter/mobileQueryData?sourceType=17', {
            sourceType: 17,
            limit: 3,
            page: 1,
            start: 1,
        }).then(({ data }) => {
            this.yb = data.datas
        })

    },
    methods: {
        goForm(item, ele) {
            let path = ""
            let query = {}
            if (item == 1) {
                path=`/${ele.dataValue.moduleId}/${ele.dataValue.info_id}/1`,
                query={
                    todoId: ele.dataValue.todoId,
                    type: 'gw'
                }
            } else {
                path=`/${ele.dataValue.moduleId}/${ele.dataValue.infoId}/-1`,
                query={
                    type: 'ybwj'
                }
            }
            this.$router.push({
                    path: '/commonForm' + path,
                    query
                })
        },
        getMore(qu) {
            this.$router.push({
                name: 'commonList',
                query: { fileType: qu }
            })
        },
        getMenu1() {
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
                onSuccess: function (result) { },
                onFail: function (err) { },
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
                                onSuccess: function (result) { },
                                onFail: function (err) { },
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
        },
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
                            onSuccess: function (result) { },
                            onFail: function (err) { },
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
                            onSuccess: function (result) { },
                            onFail: function (err) { },
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
                            onSuccess: function (result) { },
                            onFail: function (err) { },
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
                            onSuccess: function (result) { },
                            onFail: function (err) { },
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
                            onSuccess: function (result) { },
                            onFail: function (err) { },
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
                            onSuccess: function (result) { },
                            onFail: function (err) { },
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
                            onSuccess: function (result) { },
                            onFail: function (err) { },
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
        async getMenu() {
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
            } else {
                await dsf.http.post("fn/newFile/shortcutDing", { type: 'common' }).then((res) => {
                    // console.log(res);
                    let mySettingMenu = res.data.data.map(item => {
                        return {
                            name: item.shortcutName,
                            badge: item.tip,
                            router: item.actUrl ? item.actUrl.trim() : '',
                            img: item.shortcutIcon,
                            props: item.agentId,
                            type: item.shortcutType,
                            showClickTip: item.gntsyText,
                            child: [],
                            style: (dsf.config.homePage.menuSetting && dsf.config.homePage.menuSetting.itemStyle) ? dsf.config.homePage.menuSetting.itemStyle : "{}",
                            isshow: true,
                            badgeNum: item.badgeNum,
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
                    dsf.util.saveToLocalStore("mySetting", this.myMenus);
                })
            }

            dsf.http.post("fn/newFile/shortcutDing", {}).then((res) => {
                let result = res.data;
                // 递归菜单
                let forFunc = function (list, menu) {
                    list.forEach(item => {
                        if (item.displayPosition.indexOf("work") < 0) return
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
                            router: item.actUrl ? item.actUrl.trim() : '',
                            img: item.shortcutIcon,
                            props: agentId,
                            type: item.shortcutType,
                            showClickTip: item.gntsyText,
                            child: [],
                            style: (dsf.config.homePage.menuSetting && dsf.config.homePage.menuSetting.itemStyle) ? dsf.config.homePage.menuSetting.itemStyle : "{}"
                        };
                        menu.push(child)
                        if (item.children.length > 0) forFunc(item.children, child.child)
                    })
                }
                forFunc(result.data, mainMenuNow)

                that.getBadge(mainMenuNow)
                that.mainMenu = mainMenuNow;
                that.isHideTitle = that.mainMenu.length == 1 && dsf.config.appSelect.isHideTitle
            });

        },
        getBadge(mainMenuNow) {
            let that = this
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
                                    if (element.data.total && !isNaN(element.data.total)) {
                                        subItem.badgeNum += parseInt(element.data.total)
                                    } else if (element.data.badge && !isNaN(element.data.badge)) {
                                        subItem.badgeNum += parseInt(element.data.badge)
                                    } else if (element.data.data && !isNaN(element.data.data)) {
                                        subItem.badgeNum += parseInt(element.data.data)
                                    } else if (element.data.data.badge && !isNaN(element.data.data.badge)) {
                                        subItem.badgeNum += parseInt(element.data.data.badge)
                                    }
                                }
                            } else {
                                if (result.data.total && !isNaN(result.data.total)) {
                                    subItem.badgeNum += parseInt(result.data.total)
                                } else if (result.data.badge && !isNaN(result.data.badge)) {
                                    subItem.badgeNum += parseInt(result.data.badge)
                                } else if (result.data.data && !isNaN(result.data.data)) {
                                    subItem.badgeNum += parseInt(result.data.data)
                                } else if (result.data.data.badge && !isNaN(result.data.data.badge)) {
                                    subItem.badgeNum += parseInt(result.data.data.badge)
                                }
                            }

                        });
                    }
                });
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
    computed: {
        rowNum() {
            return dsf.config.clientType == 'mobile' ? (this.itemdata.params.mobileRowNumber || 4) : (this.itemdata.params.padRowNumber || 4)
        }
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
    filters: {
        badgeCount(val) {
            if (val > 100) {
                return "99+"
            }
            if (val < 1) {
                return ""
            }
            return val
        }
    },
    mounted() {
        this.isShowMyMenus = dsf.config.appSelect ? dsf.config.appSelect.isShowMyMenus : true;
        this.getMenu();
    },
    activated() {
        this.getBadge(this.mainMenu)
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.gl {
    width: 100%;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;

    .left {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 5px;
            height: 15px;
            margin-right: 5px;
        }

        span {
            font-size: var(--font_size_2);
            color: #333333;
            font-weight: bold;
        }
    }

    .right {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 13px;
            height: 13px;
        }

        span {
            font-size: var(--font_size_4);
            color: #999999;
            letter-spacing: 0;
            font-weight: 400;
        }
    }
}

.system {
    width: 100vw;

    .top {
        width: 100%;
        height: 208px;
        background: url('../../../../static/images/shandongyancao/conference/backg.png') no-repeat;
        background-size: 100% 100%;

        .title {
            box-sizing: border-box;
            padding-top: 30px;
            margin-bottom: 21px;
            text-align: center;
            position: relative;

            img {
                width: 22px;
                position: absolute;
                left: 12px;
            }

            p {
                font-family: PingFangSC-Semibold;
                font-size: var(--font_size_2);
                color: #483C22;
                font-weight: 600;
            }
        }

        .my {
            width: 100%;
            height: 68px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 13px;

            .my_con {
                min-width: 200px;
                height: 100%;
                display: flex;
                align-items: center;
                // justify-content: space-around;
                box-sizing: border-box;
                padding: 0 24px;

                .con1 {
                    width: 100px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;

                    img {
                        width: 40px;
                        margin-bottom: 4px;
                    }

                    span {
                        font-family: PingFangSC-Regular;
                        font-size: 13px;
                        color: #333333;
                        text-align: center;
                        font-weight: 400;
                    }
                }
            }
        }

        .db {
            width: 100%;
            padding-bottom: 1px;

            .gl {
                box-sizing: border-box;
                padding: 0 25px;
                margin-bottom: 10px;

                img:last-child {
                    width: 5px;
                    height: 8px;
                    margin-left: 5px;
                }
            }

            .news {
                box-sizing: border-box;
                padding: 0 12px;

                .news_con {
                    background: #FFFFFF;
                    box-shadow: 0px 1px 20px 0px rgba(166, 201, 235, 0.26);
                    box-sizing: border-box;
                    padding: 10px 20px;
                    margin-bottom: 12px;
                    border-radius: 8px;

                    .co {
                        width: 100%;
                        height: 40px;
                        box-sizing: border-box;
                        padding-right: 18px;
                        margin-bottom: 12px;

                        span:nth-child(1) {
                            font-size: var(--font_size_1);
                            color: #333333;
                            font-weight: bold;
                            overflow: hidden;
                            width: 6.3rem;
                            height: 0.86rem;
                            display: -webkit-inline-box;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            line-clamp: 2;
                            word-break: break-all;
                            -webkit-box-orient: vertical;
                        }

                        img {
                            display: inline-block;
                            width: 56px;
                            height: 15px;
                        }
                    }

                    .dsh {
                        width: 100%;
                        height: 16px;

                        .le {
                            float: left;
                        }

                        .re {
                            float: right;
                        }

                        .gw {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            img {
                                width: 19px;
                                margin-right: 2px;
                            }

                            span {
                                padding-left: 2px;
                                font-size: 13px;
                                color: #9CA8BB;
                            }
                        }
                    }
                }
            }

        }
    }
}

.ds-moduleIndex {
    // background-color: #fff;
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
                width: 40px;
                margin-bottom: 4px;
                vertical-align: middle;
            }

            p {
                font-size: var(--font_size_3);
                color: #333333;
                letter-spacing: 1px;
            }
        }

        .menu_5 {
            img {
                width: 40px;
                height: 40px;
            }

            p {
                font-size: var(--font_size_4);
            }
        }

        // .menu:nth-child(n + 4) {
        // 	margin-bottom: 0;
        // }
    }

    .noApp {
        font-size: var(--font_size_0);
        font-weight: 700;
        padding-left: 20px;
        padding-bottom: 15px;

        span {
            display: inline-block;
            color: #E2B25E;
            margin-left: 10px;
            transform: scale(1.3);
        }
    }
}

.title1 {
    padding: 2px 10px;
    position: relative;
    margin-bottom: 10px;

    span:nth-child(2) {
        font-size: var(--font_size_2);
        color: #333333;
        font-weight: bold;
        margin-left: 10px;
    }

    img {
        display: inline;
        width: 5px;
        height: 15px;
        margin-right: 5px;
        position: absolute;
        top: 5px;
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
    margin: 10px;
    border-radius: 6px;
    padding: 10px 5px 0;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);
}

.submenuOverlay {
    backdrop-filter: blur(10px);
    background-color: rgba(175, 175, 175, 0.6);
    z-index: 99;

    .submenuContainer {
        width: calc(100% - 40px);
        padding: 0 10px;
        margin: 20px;
        background: rgba(255, 255, 255, 0.7);
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

            p {
                color: #666;
            }
        }
    }
}

.mkmc {
    display: inline-block;
    font-size: var(--font_size_4);
    border: 1px #E2B25E solid;
    border-radius: 5px;
    color: #E2B25E !important;
    min-width:30px;
    padding: 2px;
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
</style>
