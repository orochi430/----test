<template>
<div class="indexList pt10" :style="barHeight">
    <div v-if="isSeach">
        <div class="personInfo disfr ac" v-for="(item,index) in userList" :key="index" @click="toDetail(item)">
            <img v-if="item.photoSrc" class="userImg" :src="getPhotoSrc(item.photoSrc)" />
            <div v-else class="userImg">{{item.userName | userAvatar}}</div>
            <div class="itemContent fc jsb flex ellipsis">
                <span class="personName ellipsis minWid">{{item.userName}}</span>
                <span class="personNum ellipsis" v-if="item.mobile && !dsf.config.addressList.isFideMobile">{{item.mobile}}</span>
            </div>
            <div class="org-name">{{item.orgName}}</div>
        </div>
    </div>
    <div v-else>
        <div class="secFab" v-show="secIndexShow">{{secIndex}}</div>
        <!-- 面包屑 -->

            <div v-for="(itm,key,index) in peopleList" :key="index">
                <!-- <van-index-anchor :index="key">{{key}}</van-index-anchor> -->
                <div class="disfr ">
                    <div class="personInfo disfr ac" @click="toDetail(itm)">
                        <img v-if="itm.photoSrc" class="userImg" :src="getPhotoSrc(itm.photoSrc)" />
                        <div v-else class="userImg">{{itm.userName | userAvatar}}</div>
                        <div class="itemContent fc jsb flex ellipsis">
                            <span class="personName ellipsis minWid">{{itm.userName | filterName}}</span>
                            <span class="personNum ellipsis" v-if="itm.mobile && !dsf.config.addressList.isFideMobile">{{itm.mobile}}</span>
                        </div>
                        <div class="org-name">{{itm.orgName}}</div>
                    </div>
                    <div class="personInfoRight"></div>
                </div>
            </div>
        <commonempty v-if="peopleList.length==0"></commonempty>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import dsf from '../../common';
import tableMixin from './tableMixin'
const groupBy = require("lodash/groupBy.js"); //以后lodash函数按需引入,减少打包体积
export default {
    mixins: [tableMixin],
    props: {
        keyword: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        searchUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isShowCount: true,
            peopleList: {},
            indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W",
                "X", "Y", "Z"
            ],
            secIndex: "",
            secIndexShow: false,
            timeout: null,
            stickyHeight: 0,
            barHeight: {
                height: '',
                overflow: 'auto'
            },
            preNode: null,
            organization: [],
            breadList: [],
            isSeach: false,
            userList: [],
            hasUser: false,
            hasgoDetial: false,
        }
    },
    created() {
        this.init()
    },
    mounted() {
        let docFontsize = document.documentElement.style.fontSize.split('px')[0]
        let headerHeight = this.isShowAppHeader ? 46 / 50 * docFontsize : 0;
        let footHeight = this.isShowAppFooter ? 60 / 50 * docFontsize : 0;
        let searchHeight = 52 / 50 * docFontsize;
        let tabhHeight = 44 / 50 * docFontsize;
        this.stickyHeight = headerHeight + searchHeight + tabhHeight;
        this.barHeight.height = window.innerHeight - footHeight - this.stickyHeight + 'px';
    },
    // activated() {
    //     console.log('g-' + (this.breadList.length - 1))
    //     window.addEventListener("popstate", this.bindPageChange);
    //     if (this.breadList.length >= 2) {
    //         this.hasgoDetial = true;
    //         history.pushState(null, null, document.URL);
    //     }
    //     if (this.secIndex != "") {
    //         this.$refs.indexList.scrollTo(this.secIndex);
    //     }
    // },
    // deactivated() {
    //     this.hasgoDetial = false;
    //     window.removeEventListener("popstate", this.bindPageChange);
    // },
    // destroyed() {
    //     this.hasgoDetial = false;
    //     window.removeEventListener("popstate", this.bindPageChange);
    // },
    watch: {
        keyword() {
            this.debounce(() => {
                if (this.keyword != "") {
                    this.search()
                } else {
                    this.isSeach = false
                    this.init()
                }
            }, 1500)
        }
    },
    computed: {
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    methods: {
        addPopstate() {
            console.log('add')
            window.addEventListener("popstate", this.bindPageChange);
            if (this.breadList.length >= 2) {
                window.addressIndex++
                this.hasgoDetial = true;
                history.pushState(null, null, document.URL);
            }
            if (this.secIndex != "") {
                this.$refs.indexList.scrollTo(this.secIndex);
            }
        },
        removePopstate() {
            console.log('remove')
            this.hasgoDetial = false;
            window.removeEventListener("popstate", this.bindPageChange);
        },
        bindPageChange() {
            let self = this;
            if (self.breadList.length > 2) {
                history.pushState(null, null, document.URL);
                self.chooseBread(self.breadList[self.breadList.length - 2]);
            } else if (self.breadList.length == 2) {
                self.chooseBread(self.breadList[self.breadList.length - 2]);
            }
        },
        getPhotoSrc(path) {
            return dsf.url.getWebPath(path) + `&time=${new Date().getTime()}`
        },
        chooseBread(item) {
            if (item.id == 0) {
                window.addressIndex = 0
                this.init()
            } else {
                window.addressIndex++
                this.toNext(item)
            }
        },
        toNext(data) {
            let self = this
            if (this.hasgoDetial == false) {
                this.hasgoDetial = true;
                history.pushState(null, null, document.URL);
            }
            if (data.hasChildren) {
                self.$toast.loading("加载中");
                dsf.http.post(self.url, {
                    groupId: data.id
                }).then((res) => {
                    self.$toast.clear()
                    let resData = res.data.data
                    self.organization = resData.depts
                    self.breadList = resData.navs
                    //处理人员
                    let data = res.data.data.users
                    if (data.length) {
                        self.hasUser = true
                    }
                    self.showUser(data);
                })
            }
        },
        selectBar(val) {
            this.secIndex = val
            this.secIndexShow = true
            if (this.timeout) {
                clearTimeout(this.timeout)
            }
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.requireFn()
            }, 800)
        },
        requireFn() {
            this.secIndexShow = false
        },
        toDetail(data) {
            console.log(data)
            this.$router.push({
                path: "/commonForm/230525104842KAyV11ldvCTy0yoy788/" + data.userId,
                query: {
                  title: "个人信息",
                  method: 'openByUnit',
                  listId: '230525105514bonIeXKeHhxlZtralQz',
                  validateByList:1
                }
            })
            // this.$router.push({
            //     name: "mailDetail",
            //     query: {
            //         userdata: JSON.stringify(data)
            //     }
            // })
        },
        search() {
            let self = this
            self.$toast.loading("加载中");
            dsf.http.post(this.searchUrl, {
                keyword: this.keyword
            }).then((res) => {
                self.$toast.clear()
                self.isSeach = true
                self.userList = res.data.data
            })
        },
        // showUser(data) {
        //     var arr = groupBy(data, function (val) {
        //         return val.pinyinInitial.slice(0, 1).toUpperCase()
        //     })
        //     let personObj = {}
        //     this.indexList = Object.keys(arr).sort()
        //     this.indexList.forEach((item, index) => {
        //         //personObj[item] = arr[item]
        //         personObj[item] = arr[item].sort((a, b) => {
        //             return a.userName.localeCompare(b.userName, "zh");
        //         })
        //     })
        //     this.peopleList = personObj
        // },
        init() {
            let self = this
            self.breadList = [];
            dsf.http.post(this.url, {}).then((userdata) => {
                //console.log(userdata.data.data.users);
                self.hasUser = false
                let data = userdata.data.data
                if (data.length) {
                    self.hasUser = true
                }
                this.peopleList = data
                // self.showUser(data);
            });
        }
    },
    filters: {
        userAvatar(name) {
            return name.slice(0, 1)
        },
        filterName(name) {
            return name.length > 4 ? name.slice(0, 4) + '...' : name;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.normalColor {
    @include font-theme("normal", true);
}

.van-icon-arrow {
    margin: 0px 5px;
    color: rgb(201, 201, 201) !important;
}

.ofa {
    overflow: auto;
}

.wsp {
    white-space: pre;
}

.mb10 {
    margin-bottom: 10px;
}

.pt10 {
    padding-top: 10px;
}

.indexList {
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
        background: #CCCCCC;
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
        border-radius: 42px;
        @include background-theme("normal");
        color: #FFFFFF;
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
        border-bottom: 1px solid #cfcfcf;
        width: 100%;

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

    .personInfoRight {
        min-width: 50px;
        background: white;
        border-bottom: 1px solid #cfcfcf;
    }

    .itemContent {
        max-width: 150px;
    }
}
</style><style lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.indexList {
    .van-index-bar__sidebar {
        width: 0;
        left: calc(100% - 20px);
        height: 0;
        position: sticky;

        .van-index-bar__index {
            width: 16px;
            height: 16px;
            border-radius: 16px;
            line-height: 16px;
            text-align: center;
            padding: 0;
            margin: 2px 0px;
            font-size: 11px;
        }

        .van-index-bar__index--active {
            @include background-theme("normal");
            color: white
        }

    }

    .van-index-anchor--sticky {
        @include font-theme("normal");
        top: -1px !important;
    }

    .organizationBox {
        padding: 0 15px;
        background: white;

        .organizationitem {
            padding: 15px 0;
            font-size: var(--font_size_1);
            border-bottom: 1px solid #cfcfcf;
        }

        .organizationitem:last-child {
            border: none;
        }
    }
}

// .indexList ::v-deep  .van-index-bar__sidebar{
//     width: 0;
//     left: calc(100% - 20px);
//     height: 0;
//     position: sticky;
// }
</style>
