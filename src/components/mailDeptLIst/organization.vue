<template>
<div class="organization fc pt10">
    <div v-show="!search">
        <!-- 面包屑 -->
        <div class="organizationBox flex1 mb10" v-if="breadList.length > 0">
            <div class="organizationitem disfr ac ofa">
                <div class="disfr ac wsp" v-for="(item, index) in breadList" @click="index < breadList.length - 1 ? toNext(item, index) : ''" :key="index">
                    <span :class="index < breadList.length - 1 ? 'normalColor' : ''">{{
                item.name
            }}</span>
                    <van-icon name="arrow" v-show="index < breadList.length - 1" />
                </div>
            </div>
        </div>
        <!-- 二级结构 -->
        <!-- 树节点 -->
        <div class="organizationBox flex1" v-show="isShowOrg">
            <div class="organizationitem disfr jsb ac" @click="toNext(organization, true)">
                <van-icon class="org-icon" name="cluster-o" />
                <span class="org-name">{{ organization.name }}</span>
                <van-icon name="arrow" />
            </div>
            <div class="organizationitem disfr jsb ac organizationSecitem" v-for="(item, index) in organization.depts" :key="index" @click="toNext(item, true)">
                <span class="org-icon">
                    <span class="sec-item"></span>
                </span>
                <span class="org-name">{{ item.name }}</span>
                <van-icon name="arrow" />
            </div>
        </div>
        <!-- 部门列表 showPersonFirst=false ，部门显示优先-->
        <div class="organizationBox flex1" v-show="groupList.length && !isShowOrg && !dsf.config.addressList.showPersonFirst">
            <div class="organizationitem borderBottom disfr jsb ac" v-for="(item, index) in groupList" :key="index" @click="toNext(item)">
                <span class="orgtitle flex ae">
                    <span class="elps">{{ item.name }}&nbsp;</span>
                    <span v-if="item.userCount > 0 && !dsf.config.mailList.isHideCount">({{ item.userCount }})</span>
                </span>
                <van-icon name="arrow" v-if="item.userCount > 0" />
            </div>
        </div>
        <!-- 用户列表 -->
        <div class="organizationPerson flex1" v-show="userList.length > 0 && !isShowOrg">
            <div class="personInfo disfr ac" v-for="(item, index) in userList" :key="index" @click="toDetail(item)">
                <img v-if="item.photoSrc" class="userImg" :src="getPhotoSrc(item.photoSrc)" />
                <div v-else class="userImg">{{ item.userName | filterName }}</div>
                <div class="itemContent fc jsb flex ellipsis">
                    <div class="flex jb">
                        <span class="personName ellipsis minWid">{{ item.userName }}</span>
                        <span v-if="item.zhiw || true" class="personName ellipsis minWid right">{{ item.zhiw }}</span>
                    </div>
                    <span class="personNum" v-if="item.mobile && !dsf.config.addressList.isFideMobile">{{ item.mobile | filterMobile(item) }}</span>
                </div>
                <!-- <div class="itemContent fc jsb">
            <span class="post">{{ item.zhiw }} 职位</span>
            <span class="personNum">aa</span
            >
          </div> -->

            </div>
        </div>
        <!-- 常用联系人 -->
        <div class="commonusertitle" v-if="commonUserList.length > 0 && isShowCommonUser">
            常用联系人
        </div>
        <div class="organizationPerson flex1" v-if="commonUserList.length > 0 && isShowCommonUser">
            <div class="personInfo disfr ac" v-for="(item, index) in commonUserList" :key="index" @click="toDetail(item)">
                <img v-if="item.photoSrc" class="userImg" :src="getPhotoSrc(item.photoSrc)" />
                <div v-else class="userImg">{{ item.userName | filterName }}</div>
                <div class="itemContent fc jsb">
                    <span class="personName">{{ item.userName }}</span>
                    <span class="personNum" v-if="item.mobile && !dsf.config.addressList.isFideMobile">{{ item.mobile | filterMobile(item) }}</span>
                </div>
            </div>
        </div>

        <!-- 部门列表 showPersonFirst=true ，人员显示优先-->
        <div class="organizationBox flex1" v-show="groupList.length && !isShowOrg && dsf.config.addressList.showPersonFirst">
            <div class="organizationitem borderBottom disfr jsb ac" v-for="(item, index) in groupList" :key="index" @click="toNext(item)">
                <span class="orgtitle flex ae">
                    <span class="elps">{{ item.name }}&nbsp;</span>
                    <span v-if="item.userCount > 0 && !dsf.config.mailList.isHideCount">({{ item.userCount }})</span>
                </span>
                <van-icon name="arrow" v-if="item.userCount > 0" />
            </div>
        </div>

        <!-- <dsf-fab
        v-if="currentIndex > 0"
        :fab-items="mainButtons"
        title-key="name"
        @clickItem="btnAction"
      >
      </dsf-fab> -->
    </div>
    <div v-show="search">
        <div class="organizationPerson flex1" v-show="searchUserList.length > 0">
            <div class="personInfo disfr ac" v-for="(item, index) in searchUserList" :key="index" @click="toDetail(item)">
                <img v-if="item.photoSrc" class="userImg" :src="getPhotoSrc(item.photoSrc)" />
                <div v-else class="userImg">{{ item.userName | filterName }}</div>
                <div class="itemContent fc jsb flex ellipsis">
                    <span class="personName ellipsis minWid">{{ item.userName }}</span>
                    <span class="personNum ellipsis" v-if="item.mobile && !dsf.config.addressList.isFideMobile">{{ item.mobile | filterMobile(item)
            }}</span>
                </div>
                <div class="org-name">{{ item.orgName }}</div>
            </div>
        </div>
        <commonempty v-if="searchUserList.length==0"></commonempty>
    </div>
</div>
</template>

<script>
import "./iconfont.css";
import tableMixin from "./tableMixin";
import dsfFab from "@/components/dsfFab/dsfFab";

export default {
    mixins: [tableMixin],
    props: {
        keyword: {
            type: String,
            default: "",
        },
        initOrgId: {
            type: String,
            default: "",
        },
        isShowCount: {
            type: Boolean,
            default: true,
        },
        url: {
            type: String,
            default: "",
        },
        searchUrl: {
            type: String,
            default: "",
        },
    },
    components: {
        dsfFab,
    },
    data() {
        return {
            hasChild: true,
            organization: {},
            commonUserList: [],
            userList: [],
            allData: [],
            timeout: null,
            userInfo: null,
            groupList: [],
            breadList: [],
            search: false,
            searchUserList: [],
            isShowOrg: true,
            isShowCommonUser: true,
            currentIndex: 0,
            hasgoDetial: false
        };
    },
    created() {
        this.userInfo = dsf.util.loadSessionStore("user");
        this.init();
        this.mainButtons = [{
            action: "save",
            icon: "iconreply",
            name: "返回",
        }, ];
    },
    // activated() {
    //   console.log(this.breadList.length - 1)
    //   let self = this;
    //   window.addEventListener("popstate", this.bindPageChange);
    //   if (this.breadList.length >= 2) {
    //     this.hasgoDetial = true;
    //     history.pushState(null, null, document.URL);
    //   }
    // },
    // deactivated() {
    //   console.log('000')
    //   this.hasgoDetial = false;
    //   window.removeEventListener("popstate", this.bindPageChange);
    // },
    // destroyed() {
    //   this.hasgoDetial = false;
    //   window.removeEventListener("popstate", this.bindPageChange);
    // },
    watch: {
        keyword(val) {
            this.debounce(() => {
                if (val) {
                    this.getSearchUserList();
                } else {
                    this.search = false;
                    this.init();
                }
            }, 1500);
        },
    },
    methods: {
        addPopstate() {
            console.log('add')
            // if (dsf.config.mailList.showAllOrg&&this.breadList.length >2) {
            window.addEventListener("popstate", this.bindPageChange);
            // }
            console.log("breadList.length", this.breadList.length)
            if (this.breadList.length >= 2) {
                window.addressIndex++
                this.hasgoDetial = true;
                history.pushState(null, null, document.URL);
            }
        },
        removePopstate() {
            console.log('remove')
            this.hasgoDetial = false;
            console.log(history)
            window.removeEventListener("popstate", this.bindPageChange);
        },
        bindPageChange() {
            let self = this;
            if (self.breadList.length > 2) {
                history.pushState(null, null, document.URL);
                self.btnAction();
            } else if (self.breadList.length == 2) {
                if (dsf.config.mailList.showAllOrg) {
                    history.back()
                } else {
                    self.btnAction()
                }
            }
        },
        btnAction(val) {
            let self = this;
            self.toNext(self.breadList[self.breadList.length - 2]);
        },
        getPhotoSrc(path) {
            return dsf.url.getWebPath(path) + `&time=${new Date().getTime()}`;
        },
        chooseBread(num, data) {
            this.toNext(data);
        },
        chooseGroup(data) {
            this.toNext(data, false);
        },
        init() {
            let self = this;
            dsf.http.post("/fn/reportContacts/mobileIndex", {}).then((res) => {
                console.log(res.data);
                self.organization = res.data.data;
                self.commonUserList = res.data.data.users.length > 0 ? res.data.data.users : [];
                if (dsf.config.mailList.showAllOrg)
                    this.toNext(self.organization, true);
            });
        },

        toNext(data, index) {
            let self = this;

            if (this.hasgoDetial == false) {
                this.hasgoDetial = true;
                history.pushState(null, null, document.URL);
            }

            if (data.name == "全部") {
                if (dsf.config.mailList.showAllOrg) {
                    this.toNext(self.organization, true);
                    return
                }
                self.breadList = [];
                self.isShowOrg = true;
                self.isShowCommonUser = true;
                self.currentIndex = 0;
                window.addressIndex = 0
                // console.log('0')
                //点击全部默认显示当前组织的部门结构；
                return;
            } else {
                self.isShowOrg = false;
                self.isShowCommonUser = false;
                self.currentIndex++;
                window.addressIndex++
            }
            self.breadList = [];
            self.groupList = [];
            self.userList = [];
            let tempdata = self.allData.find(item => item.orgId == data.id)
            if (tempdata) {
                self.breadList = [...[], ...tempdata.breadList];
                self.groupList = [...[], ...tempdata.groupList];
                self.userList = [...[], ...tempdata.userList];
                self.$nextTick(() => {
                    window.scrollTo(0, 0);
                })
                return
            }
            self.$toast.loading("加载中");
            dsf.http
                .post(self.url, {
                    orgId: data.id,
                })
                .then((res) => {
                    self.$toast.clear();
                    let resData = res.data.data;
                    //console.log(resData);
                    self.breadList = [{
                            name: "全部",
                            id: "0",
                        },
                        ...resData.navs,
                    ];
                    console.log("breadListLength", this.breadList, this.breadList.length);
                    self.groupList = resData.depts;
                    self.userList = resData.users;
                    self.allData.push({
                        orgId: data.id,
                        breadList: dsf.util.deepCopy(self.breadList),
                        groupList: dsf.util.deepCopy(self.groupList),
                        userList: dsf.util.deepCopy(self.userList)
                    })
                });
        },
        deepCopy(data) {
            return JSON.parse(JSON.stringify(data));
        },
        changeCrumbs(data) {
            let obj = this.deepCopy(data);
        },
        getData(id = "", ifFirst) {
            this.$toast.loading({});
            dsf.http
                .post(this.url, {
                    orgId: id,
                })
                .then((res) => {
                    let resData = res.data.data;
                    this.organization = resData.depts;
                    this.userList = resData.users;
                    this.$toast.clear();
                });
        },
        returnOrg(data, index) {
            this.getData(data.id);
        },
        toDetail(data) {
            this.$router.push({
                name: "mailDetail",
                query: {
                    title: "通讯录",
                    userdata: JSON.stringify(data),
                },
            });
            // console.log(data)
            // this.$router.push({
            //     path: "/commonForm/230525104842KAyV11ldvCTy0yoy788/" + data.userId,
            //     query: {
            //         showTitle: "修改个人信息"
            //     }
            // })
        },
        //搜索单个人
        getSearchUserList() {
            let self = this;
            self.$toast.loading("加载中");
            this.searchUserList = []
            let params =
                this.keyword == "" ? {} : {
                    keyword: this.keyword,
                };
            dsf.http.post(this.searchUrl, params).then((res) => {
                self.$toast.clear();
                this.search = true;
                this.searchUserList = res.data.data;
            });
        },
    },
    filters: {
        filterName(name) {
            return name.slice(name.length - 2);
        },
        filterMobile(str, item) {
            return item.mobileDesensitizationSafeContent || str;
        },
        userAvatar(name) {
            return name.slice(0, 1);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.normalColor {
    @include font-theme("normal", true);
}

.pa {
    position: absolute;
}

.pr {
    position: relative;
}

.pt10 {
    padding-top: 10px;
}

.commonusertitle {
    z-index: 1;
    box-sizing: border-box;
    padding: 0 0.32rem;
    //font-family: PingFangSC-Medium;
    @include font-theme("normal");
    font-weight: 550;
    font-size: var(--font_size_3);
    line-height: 0.64rem;
    background-color: transparent;
}

.van-icon-arrow {
    margin: 0px 5px;
    color: rgb(201, 201, 201) !important;
}

.organization {
    width: 100%;
    height: 100%;
    font-size: var(--font_size_2);
    display: flex;
    flex-direction: column;
    background: rgb(245, 245, 245);

    .header-container {
        height: 1.6rem;
        width: 100%;

        .header {
            position: fixed;
            z-index: 2;
            top: 0.88rem;
            width: 100%;
        }
    }

    .mb10 {
        margin-bottom: 10px;
    }

    .disfr {
        display: flex;
    }

    .fc {
        display: flex;
        flex-direction: column;
    }

    .jsb {
        justify-content: space-between;
    }

    .flex1 {
        flex: 1;
    }

    .columnScroll {
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .rowScroll {
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .titleCrumbs {
        padding: 15px;
        // height: 20px;
        overflow-x: scroll;
        overflow-y: hidden;
        font-size: var(--font_size_2);
        border-top: 15px solid rgba(0, 0, 0, 0.04);
        border-bottom: 15px solid rgba(0, 0, 0, 0.04);
        background: white;

        .crumbsItem {
            margin-right: 15px;
            white-space: nowrap;
        }

        .crumbsItemSec {
            color: #1677ff;
        }

        .crumsText {
            margin-right: 15px;
        }

        .crumsNext {
            margin-top: 2px;
        }
    }

    .organizationBox {
        padding: 0 15px;
        background: white;

        .borderBottom {
            border-bottom: 1px solid #cfcfcf;
        }

        .organizationitem {
            padding: 10px 0;
            // height: 24px;
            font-size: var(--font_size_2);

            .orgtitle {
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 90%;
                overflow-x: hidden;
            }

            .org-name {
                flex: 1;
            }

            .org-icon {
                display: inline-block;
                width: 34px;
                height: inherit;
                font-size: 22px;
                padding-right: 10px;
                @include font-theme("normal");
            }
        }

        .organizationSecitem {
            position: relative;

            .sec-item {
                display: inline-block;
                width: 5px;
                height: 5px;
                position: absolute;
                @include border-theme(1px, solid, "normal");
                top: 0.38rem;
                left: 0.42rem;
            }

            &::before {
                content: "";
                display: inline-block;
                width: 0.24rem;
                height: 0.44rem;
                position: absolute;
                border-left: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                top: 0;
                left: 0.2rem;
            }

            &::after {
                content: "";
                display: inline-block;
                width: 0.24rem;
                height: 0.44rem;
                position: absolute;
                border-left: 1px solid #ddd;
                bottom: 0;
                left: 0.2rem;
            }
        }

        .organizationSecitem:last-child {
            &::after {
                display: none;
            }
        }
    }

    .organizationPerson {
        padding: 0 15px;
        background: white;

        img.userImg {
            background: none;
        }

        .personInfo {
            padding: 15px 0;
            height: 61px;
            border-bottom: 1px solid #cfcfcf;

            .personName {
                font-size: var(--font_size_1);
                color: black;
                margin-bottom: 4px;
            }

            // .post {
            //   font-size: var(--font_size_1);
            //   color: black;
            //   margin-bottom: 4px;
            // }

            .personNum {
                font-size: 13px;
                color: #666666;
            }
        }
    }

    .left_line {
        position: absolute;
        left: -21px;
        top: -25px;

        :nth-child(1) {
            // border: 1px solid #DDDDDD;
            @include border-theme(1px, solid, "normal");
            height: 53px;
            width: 1px;
        }

        :nth-child(2) {
            // border: 1px solid  #DDDDDD;
            @include border-theme(1px, solid, "normal");
            width: 11px;
            height: 1px;
        }

        :nth-child(3) {
            // border: 2px solid  #1677FF;

            @include border-theme(2px, solid, "normal");
            width: 7px;
            height: 7px;
            position: absolute;
            top: 50px;
            left: 11px;
        }
    }
}

.ofa {
    overflow: auto;
}

.wsp {
    white-space: pre;
}

// @font-face {
//   font-family: "iconfont"; /* Project id  */
//   src: url('iconfont.ttf?t=1623825205805') format('truetype');
// }

// .iconfont {
//   font-family: "iconfont" !important;
//   font-size: var(--font_size_2);
//   font-style: normal;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }

// .icon-shuxingzujian:before {
//   content: "\e60d";
// }

.organization {
    font-size: var(--font_size_2);

    .disfr {
        display: flex;
    }

    .fc {
        display: flex;
        flex-direction: column;
    }

    .jsb {
        justify-content: space-between;
    }

    .flex1 {
        flex: 1;
    }

    .minWid {
        min-width: 86px;
    }

    .secFab {
        width: 47px;
        height: 47px;
        background: #cccccc;
        text-align: center;
        line-height: 47px;
        font-size: 25px;
        color: white;
        border-radius: 47px;
        position: fixed;
        right: 35px;
        bottom: 330px;
    }

    .userImg {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 6px;
        @include background-theme("normal");
        color: #ffffff;
        text-align: center;
        line-height: 40px;
    }

    img.userImg {
        background: none;
    }

    .personInfo {
        padding: 15px;
        height: 61px;
        background: white;
        border-bottom: 0.5px solid #f4f4f4;

        .personName {
            font-size: var(--font_size_1);
            color: black;
        }

        .personNum {
            margin-top: 4px;
            font-size: 13px;
            color: #666666;
        }

        .org-name {
            margin-left: 20px;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .itemContent {
        // max-width: 150px;
        flex: 1;

        .right {
            font-size: var(--font_size_3) !important;
            text-align: right;
        }
    }
}

.icon-shuzhuangtu_o {
    @include font-theme("normal", true);
}
</style>
