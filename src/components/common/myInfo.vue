<template>
    <div id="my-info">
        <div class="content">
            <div class="info-container">
                <!-- <img class="bg-img" src="static/images/bg-mine.png" alt=""> -->
                <div class="avatar"><img :src="avatar" :onerror="default_avatar" @click="editAvatar()" /></div>
                <span class="m-top_10 font_17" style="font-weight:bold" v-if="userInfo">{{ userInfo.name }}</span>
                <span class="m-top_10" v-if="userInfo">{{
                    dsf.config.login.showField ? userInfo[dsf.config.login.showField] : userInfo.deptName }}</span>
            </div>
            <van-list class="m-top_10" v-for="(item, index) in menuList" :key="index">
                <van-cell v-for="(itm, idx) in item" :key="`${index}_${idx}`">
                    <div class="flex ac jb" v-if="itm.type == 'route'" @click="goRoute(itm.routeUrl, itm)">
                        <i class="iconfont font_20" :class="[itm.icon]"
                            :style="{ padding: '0 10px', color: itm.color }"></i>
                        <span class="font_16" style="flex:1">{{ itm.menuText }}</span>
                        <van-icon class="font_14" color="#999" name="arrow" />
                    </div>
                    <div class="flex ac jb" v-else-if="itm.type == 'switch'">
                        <i class="iconfont font_20" :class="[itm.icon]"
                            :style="{ padding: '0 10px', color: itm.color }"></i>
                        <span class="font_16" style="flex:1">{{ itm.menuText }}</span>
                        <van-switch v-if="itm.model == 'autoLogin'" v-model="autoLogin" size="24px" />
                        <van-switch v-if="itm.model == 'openFingerprint'" v-model="openFingerprint" size="24px" />
                    </div>
                    <div class="flex ac jb" v-else-if="itm.type == 'normal'">
                        <i class="iconfont font_20" :class="[itm.icon]"
                            :style="{ padding: '0 10px', color: itm.color }"></i>
                        <span class="font_16" style="flex:1">{{ itm.menuText }}</span>
                        <span>{{ version }} </span>
                    </div>
                </van-cell>
            </van-list>
        </div>
        <div v-if="exitButton.isShow" class="exit-btn-container">
          <div class="exitButton" :style="{bottom: $store.state.isShowAppFooter ? '1.2rem' :0}">
            <van-button type="info" @click="exit">{{ exitButton.buttonName }}</van-button>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyInfo",
    data() {
        return {
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
            avatar: "",
            userInfo: dsf.util.loadSessionStore("user"),
            exitButton: {
                isShow: false,
                buttonName: "退出登录"
            },
            menuList: [],
            isAutoLogin: dsf.util.loadLocalStore('autoLogin'),
            isOpenFingerprint: dsf.util.loadLocalStore('openFingerprint'),
            phone_system: dsf.util.checkSystem(),
            clientName: dsf.util.getClientName(),
            version: ""
        }
    },
    computed: {
        autoLogin: {
            get() {
                return this.isAutoLogin
            },
            set(val) {
                dsf.util.saveToLocalStore('autoLogin', val)
                this.isAutoLogin = val
            }
        },
        openFingerprint: {
            get() {
                return this.isOpenFingerprint
            },
            set(val) {
                // this.isOpenFingerprint=false;
                // dsf.util.saveToLocalStore('openFingerprint', val)
                //如果选择了指纹登录，默认启用
                let self = this;
                if (self.clientName == "app") {
                    if (val) {
                        xsfCommon.setFingerprint("", function success(res) {
                            dsf.util.saveToLocalStore('openFingerprint', val)
                            self.isOpenFingerprint = val
                            console.log("openFingerprint res", res)
                        },
                            function error(err) {
                                alert(err);
                            }
                        );
                    } else {
                        //其他选项都关闭指纹登录
                        xsfCommon.cancerFingerprint("", function success(result) {
                            dsf.util.saveToLocalStore('openFingerprint', val)
                            self.isOpenFingerprint = val
                        },
                            function error(err) {
                                // alert(err);
                            }
                        );
                    }
                } else {
                    dsf.layer.toast("当前菜单仅支持在App中使用")
                }

            }
        }

    },
    created() {
        this.init();
    },
    activated() {
        this.userInfo = dsf.util.loadSessionStore("user")
        this.init();
    },
    mounted() {
        if(dsf.util.getClientName()=="mobileIM"){
            window.native.onNoticeCallback = res =>{
                console.log("收到消息",res);
                 if(res.type == "OA-NOTICE" && res.action == "updateImg"){
                    this.getavatar()
                 }
            }
        }

    },
    methods: {
        getavatar() {
            if (dsf.config.myInfo?.interGetImg){
               this.avatar = dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${this.userInfo.user_id}&time=${new Date().getTime()}`)
            }else{
              this.avatar = this.userInfo?.photo || require('static/images/EnterpriseServices/default-avatar.png');
            }

        },
        async init() {
            this.exitButton = dsf.config.myInfo.exitButton;
            this.menuList = dsf.config.myInfo.menus
            this.getavatar();
            this.getVersion();
        },
        goRoute(url, item) {
            if (url == "function") {
                console.log(item)
                if (this[item.params.name]) {
                    this[item.params.name](item);
                }
            } else if (url.toLowerCase().startsWith("http")) {
                this.$router.push({
                    path: "/iframe",
                    query: { url }
                })
            } else {
                this.$router.push(dsf.util.getReplaceUrl(url))
            }
        },
        getstationinfo(item) {
            let self = this
            dsf.http.post("fn/mobile/getstationinfo", { userId: this.$user.user_id }).then((data) => {
                data = data.data
                console.log(data)
                if (data.code == 200) {
                    self.$router.push({
                        path: `/commonForm/${data.data.moduleID}/${data.data.pk}`,
                        query: {
                            formId: data.data.formId,
                            listId: "openForm",
                            method: "view",
                            validateByList: 1
                        }
                    })
                }
            })
        },
        updateVpnData(item) {
            if (this.clientName == "app") {
                xsfCommon.changeVPNPassword("", function (result) {
                    // alert("open seccess");
                },
                    function (error) {
                        // alert("open failed: " + error);
                    }
                );
            } else {
                dsf.layer.toast("当前菜单仅支持在App中使用")
            }
        },
        clearCache(item) {
            let self = this;
            if (self.clientName == "app") {
                if (self.phone_system == "android") {
                    $iaction?.execute?.({ method: "clearCache", param: {} }, function (s) {
                        console.log("clearCache", s);
                        dsf.layer.toast("操作成功");
                    }, function (e) {
                        console.log("clearCache-err", e);
                        dsf.layer.toast("操作失败");
                    })
                } else if (self.phone_system == "ios") {
                    $iaction?.encrypt?.({ "action": "clearCache" }, function (s) {
                        console.log("clearCache", s);
                        dsf.layer.toast("操作成功");
                    }, function (e) {
                        console.log("clearCache-err", e);
                        dsf.layer.toast("操作失败");
                    });
                }
            } else {
                dsf.layer.toast("当前菜单仅支持在App中使用")
            }
        },
        editAvatar() {
            this.$router.push({
                path: "/userImgChange"
            })
        },
        exit() {
            let self = this;
            dsf.layer.confirm({
                message: '是否确认退出登录',
                confirmButtonText: '确认',
            }, () => {
                dsf.util.logOut();
            })
        },
        getVersion() {
            let self = this;
            if (self.clientName == "app") {
                if (self.phone_system == "android") {
                    new Promise((resolve, reject) => {
                        cordova.getAppVersion.getVersionNumber(function (args) {
                            resolve(args)
                        }, function (err) {
                            reject(err)
                        });
                    }).then(res => {
                        self.version = res;
                    })
                } else if (self.phone_system == "ios") {
                    new Promise((resolve, reject) => {
                        $iaction.encrypt({ "action": "getAppVersion" }, function (args) {
                            resolve(args)
                        }, function (err) {
                            reject(err)
                        });
                    }).then(res => {
                        self.version = res;
                    })
                }
            } else if (self.clientName == "mobileIM") {
                window.native?.getAppVersion(res => self.version = res);
            } else {
                self.version = "请于App中查看";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

#my-info {
    // height: 100%;
    width: 100%;
    overflow: hidden;
    font-size: var(--font_size_2);
    // display: flex;
    // flex-direction: column;
    // padding-bottom: 1.2rem;

    .content {
        flex: 1;
        overflow-y: scroll;
        overflow-x: hidden;
    }
}

.info-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    justify-content: center;
    color: #FFF;
    padding: 30px 0;
    background: url('../../../static/images/bg-mine.png') no-repeat bottom;
    background-size: contain;
    @include background-theme('normal');

    .avatar {
        margin: 0 auto;
        border: 2px solid #FFF;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        overflow: hidden;
        z-index: 2;

        img {
            width: 100%;
            height: 100%;
        }
    }

    span {
        z-index: 2;
    }

    .bg-img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }
}

.exit-btn-container {
    height: 60px;
    .exitButton {
      width: 100%;
      position: fixed;
      background-color: #FFF;
      padding: 8px 10px;
      border-bottom: 1px solid rgba(0, 0, 0, .05);
    }
    .van-button--normal {
        width: 100%;
        border-radius: 4px;

        .van-button__text {
            font-size: var(--font_size_2);
        }
    }

    .van-button--info {
        @include background-theme('normal');
        @include border-color-theme('normal');
    }
}

.font_16 {
    font-size: var(--font_size_2);
}

.font_17 {
    font-size: var(--font_size_1);
}

.font_18 {
    font-size: 18px;
}

.font_20 {
    font-size: var(--font_size_0);
}

.font_bold {
    font-weight: bold;
}

.m-top_10 {
    margin-top: 10px;
}

.m-top_15 {
    margin-top: 15px;
}
</style>
