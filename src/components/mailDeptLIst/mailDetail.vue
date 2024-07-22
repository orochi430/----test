<template>
    <div class="mailDetail">
        <div class="header">
            <div class="title">
                <div class="name">{{ userdata.userName }}</div>
                <!-- 陕西项目说这个机构显示了2次，需要去掉一个 -->
                <!-- <div class="unit" v-if="navs.length">{{navs[0].name}}</div> -->
            </div>
            <div class="photo">
                <!-- <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="getPhotoSrc(userdata.photoSrc)"
                @click="previewPhoto(getPhotoSrc(userdata.photoSrc))"
                :error-icon="default_avatar"
                /> -->
                <img v-if="userdata.photoSrc" :src="getPhotoSrc(userdata.photoSrc)" :onerror="default_avatar"
                    @click="previewPhoto(getPhotoSrc(userdata.photoSrc))" />
                <div v-else class="userImg">{{ userdata.userName | filterName }}</div>
            </div>
        </div>

        <div class="orgName" v-if="navs.length">{{ navs[0].name }}</div>
        <div v-for="(item, key) in showProps" :key="key" class="propBox">
            <div class="infoItem disfr" v-if="item.prop == 'userName'">
                <div class="info flex1 fc jsb">
                    <span class="infoText">{{ item.text }}</span>
                    <span class="infoName">{{ userdata.userName }}</span>
                </div>
                <!-- <div class="itemIcon disfr ac">
          <van-icon name="phone-o" size="32" color="#1989fa" />
          <van-icon name="chat-o" size="32" color="#1989fa" />
        </div> -->
            </div>
            <div class="infoItem disfr" v-else-if="item.prop == 'tel'">
                <div class="info flex1 fc jsb">
                    <span class="infoText">{{ item.text }}</span>
                    <span class="infoName infoColor" @click='goPhonePop(userdata.tel)'>{{ userdata.tel }}</span>
                    <div class="itemIcon" v-if="userdata.tel">
                        <img @click='phoneTo(userdata.tel)' src="../../assets/imgs/tel.png" alt="">
                    </div>
                </div>
                <!-- <div class="itemIcon disfr ac">
                <img @click='phoneTo(userdata.tel)' src="../../assets/imgs/tel.png" alt="">
            </div> -->
            </div>
            <div class="infoItem disfr" v-else-if="item.prop == 'mobile'">
                <div class="info flex1 fc jsb">
                    <span class="infoText">{{ item.text }}</span>
                    <span class="infoName infoColor" @click='goPhonePop(userdata.mobile)'>{{
                        userdata.mobile |
                            filterMobile(userdata)
                    }}</span>
                </div>
                <div class="itemIcon disfr ac" v-if="userdata.mobile">
                    <img @click='phoneTo(userdata.mobile)' src="../../assets/imgs/mailDetail_phone.png" alt="">
                    <i @click='smsTo(userdata.mobile)' class="iconfont iconletter infoName infoColor"></i>
                </div>
            </div>
            <div class="infoItem disfr" v-else-if="item.prop == 'email'">
                <div class="info flex1 fc jsb">
                    <span class="infoText">{{ item.text }}</span>
                    <span class="infoName infoColor">{{ userdata.email | filterEmail(userdata) }}</span>
                </div>
                <div class="itemIcon disfr ac">
                    <!-- <img src="../../assets/imgs/mail.png" alt=""> -->
                </div>
            </div>
            <div class="infoItem disfr" v-else-if="item.prop == 'orgName'">
                <div class="info flex1 fc jsb">
                    <span class="infoText">{{ item.text }}</span>
                    <span class="infoName">{{ deptname }}</span>
                </div>
            </div>
            <div class="infoItem disfr" v-else>
                <div class="info flex1 fc jsb">
                    <span class="infoText">{{ item.text }}</span>
                    <span class="infoName">{{ userdata[item.prop] }}</span>
                </div>
            </div>
        </div>
        <div class="btn-container" v-if="dsf.config.IMSetting && dsf.config.IMSetting.OATOIM">
            <van-button class="btn" type="info" @click="goChat">发消息
            </van-button>
        </div>
        <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action
            @cancel="onCancel" />
    </div>
</template>

<script>
import urlJs from "@/common/url";
import chatJS from "@/common/chat";
import { ImagePreview } from 'vant';
import Clipboard from 'clipboard'

export default {
    components: {
        [ImagePreview.Component.name]: ImagePreview.Component,
    },
    data() {
        return {
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
            userdata: null,
            showProps: [],
            docTitle: '',
            navs: [],
            deptname: "",
            actions: [],
            show: false,
            selectNumber: "",
            btnCopy: null
        }
    },
    methods: { // 复制的方法
        copyText(text) { // text: 要复制的内容， callback: 回调
            let self = this
            self.btnCopy.on('success', function (e) {
                dsf.layer.toast('复制成功');
                e.clearSelection();
                self.btnCopy.destroy()
            });

            self.btnCopy.on('error', function (e) {
                dsf.layer.toast('复制失败')
                self.btnCopy.destroy()
            });
        },
        actionCilck(item) {
            if (item.name == "拨打电话") {
                this.phoneTo(this.selectNumber)
            } else if (item.name == "保存到手机通讯录") {
                /*
                phoneNumber:电话号码
                name：联系人姓名，可为空
                type：0 新建联系人，1 保存到已有联系人

                两种方案：
                1.和微信一样弹窗选项 新建联系人，保存到已有联系人
                2.和钉钉一样，直接保存到已有联系人（选人界面有新建选项）
                */
                $iaction.savePhoneNumber({
                    "phoneNumber": this.selectNumber,
                    "name": this.userdata.userName,
                    "type": 0
                }, function (s) { }, function (e) { });

            } else if (item.name == "复制") {
                this.copyText(this.selectNumber)
            }
        },
        goChat() {
            let url = `${dsf.config.IMSetting.OATOIM}#/SSOLogin?toid=${this.userdata.userId}`
            //如果已经有imAccessToken就用imAccessToken进行单点登录，否则使用logname
            if (dsf.util.loadSessionStore("imAccessToken")) {
                url += `&accessToken=${dsf.util.loadSessionStore("imAccessToken")}`
            } else {
                url += `&logname=${dsf.util.loadSessionStore('user').logName}`
            }
            if (dsf.util.getClientName() == "app") {
                let checkIM = chatJS.getIMId();
                if (checkIM) {
                    chatJS.toPrivateChat(this.userdata.userId)
                } else {
                    xsfWindow.openWebView({
                        "title": "即时通讯",
                        "url": url,
                        "colorString": "#111111",
                    });
                }

            } else {
                dsf.layer.toast("当前菜单仅支持在App中使用")
                // this.$router.push({
                //     path: 'iframe',
                //     query: {
                //         url: url
                //     }
                // })
            }

        },
        previewPhoto(path) {
            ImagePreview({
                images: [path],
                closeable: true,
            })
        },
        getPhotoSrc(path) {
            return dsf.url.getWebPath(path)
        },
        phoneTo(tel) {
            window.location.href = `tel:${tel}`
        },
        smsTo(tel) {
            window.location.href = `sms:${tel}`
        },
        toImgChange() {
            // this.$router.push({path:"/userImgChange"})
        },
        setTitle() { //修改钉钉的内置浏览器title
            if (this.$route.query && this.$route.query.title) {
                urlJs.setTitle(this.$route.query.title);
            } else {
                urlJs.setTitle(" ");
            }
        },
        goPhonePop(item) {
            let self = this
            self.selectNumber = item
            self.show = true
            self.$nextTick(() => {
                document.querySelectorAll(".actionStyle").forEach(element => {
                    element.setAttribute("data-clipboard-text", item)
                });
                self.btnCopy = new Clipboard(document.querySelectorAll(".actionStyle"));
            })
        },
        onCancel() {

        }
    },
    created() {
        let self = this;

        self.actions.push({
            name: '拨打电话',
            className: "actionStyle",
            callback: this.actionCilck
        })
        if (dsf.util.checkSystem() == "android" && dsf.util.getClientName() == "app") {
            self.actions.push({
                name: '保存到手机通讯录',
                className: "actionStyle",
                callback: this.actionCilck
            })
        }
        self.actions.push({
            name: '复制',
            className: "actionStyle",
            callback: this.actionCilck
        })
        //console.log(this.$route.params)
        this.showProps = dsf.config.mailList.mailDetailShow.filter(item => item.ifShow)
        this.userdata = JSON.parse(this.$route.query.userdata)
        //this.docTitle = this.userdata.userName;
        self.$toast.loading("加载中");
        dsf.http.post("/fn/contacts/getMobileUserDetail", {
            userId: this.userdata.userId,
            pk: this.userdata.pk ? this.userdata.pk : ""
        }).then((res) => {
            self.$toast.clear()
            this.userdata = res.data.data
            this.navs = res.data.data.navs
            this.navs.forEach((element, index) => {
                if (this.deptname != "") this.deptname += "-";
                if (index > 0) this.deptname += element.name
            });

        })
        this.setTitle();
    },
    filters: {
        filterName(name) {
            return name.slice(name.length - 2);
        },
        filterMobile(str, user) {
            return user.mobileDesensitizationSafeContent || str;
        },
        filterEmail(str, user) {
            return user.emailDesensitizationSafeContent || str;
        },
        userAvatar(name) {
            return name.slice(name.length - 2);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.mailDetail {
    font-size: var(--font_size_2);
    background: white;

    .van-action-sheet__cancel {
        color: red !important;
    }

    .actionStyle {
        @include font-theme('normal');
    }

    .header {
        display: flex;
        padding: 30px 15px;
        border-bottom: 1px solid #e1e1e1;

        .title {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
                font-size: 24px;
                font-weight: bold;
            }
        }

        .photo {
            width: 75px;
            height: 75px;
            border-radius: 10px;
            overflow: hidden;

            .userImg {
                width: 75px;
                height: 75px;
                margin-right: 10px;
                border-radius: 6px;
                @include background-theme("normal");
                color: #ffffff;
                text-align: center;
                line-height: 70px;
                font-size: 30px;
            }

            img.userImg {
                background: none;
            }
        }
    }

    .orgName {
        padding: 15px;
        font-size: var(--font_size_0);
    }

    .disfr {
        display: flex;
        align-items: center;
    }

    .fc {
        display: flex;
        // flex-direction: column;
    }

    .jsb {
        justify-content: space-between;
    }

    .flex1 {
        flex: 1;
    }

    .infoItem {
        // height:51px;
        padding: 15px 0;
        margin: 0 15px;
        border-bottom: 1px solid #e1e1e1;

        .itemIcon {
            i {
                margin: 0 8px;
            }

            img {
                width: 16px;
                height: 16px;
                margin: 0 8px;
            }
        }

    }

    .propBox:nth-of-type(3) {
        .infoItem {
            border-top: none;
        }
    }

    .infoText {
        // color: #999999;
        // margin-bottom: 10px;
        width: 75px;
    }

    .unit {
        color: #999;
    }

    .infoName {
        flex: 1;
        color: #999;
    }

    .infoColor {
        color: #3296fa !important;
        flex: 1;
    }
}

.titleBg {
    // height:267px;
    height: 75vw;
    background: #0c4089;
    position: relative;

    span {
        font-size: 24px;
        color: white;
        position: absolute;
        bottom: 45px;
        left: 15px;
    }

    img {
        width: 100%;
        height: 100%;
    }
}

.btn-container {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;

    .btn {
        width: 100%;
    }
}

// .titleBg+div {
//     height: 15px;
//     background: #f4f4f4;
// }
</style>
