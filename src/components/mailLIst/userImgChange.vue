<template>
    <div class="box">
        <!-- <div class="currentImgBox">

<img class="currentImg border" :src="logoImg" alt="">

<input type="file" class="avatar-upload" accept="image/*" @change="handleAvatar" ref="avatarInput">

</div> -->
        <div class="content">
            <img :src="logoImg" class="my-avatar" :onerror="default_avatar" />
        </div>
        <div class="replace-btn">
            <span>更换头像</span>
            <input ref="avatarInput" type="file" @change="handleAvatar" />
           
        </div>
        <div v-show="isShowCropper && cropperImg" class="cropper-container">
            <van-nav-bar title="裁剪图片" left-text="返回" left-arrow @click-left="hideCropper">
                <template #right>
                    <span class="color_green font_17" @click="uploadAvatar">使用</span>
                </template>
            </van-nav-bar>
            <div class="content">
                <img ref="avatar" :src="cropperImg" class="my-avatar" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
export default {
    data() {
        return {
            user: dsf.util.loadSessionStore("user"),
            uploadImg: "",
            id: "",
            pageInfo: "",
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
            logoImg: "",
            cropper: null, //cropper实例
            isShowCropper: false, //是否显示裁剪弹层
            avatarName: "", //上传的头像名字
            cropperImg: "", //编辑用户上传头像预览图
            fileSizeLimit: dsf.config.myInfo.avatarLimit ?? 2 //上传头像大小限制，默认2M
        };
    },
    created() {
        this.getLogoImg();
     },
    methods: {
        getLogoImg() {
            this.logoImg = this.user?.photo || require('static/images/EnterpriseServices/default-avatar.png'); //dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${dsf.util.loadSessionStore("user").user_id}&time=${new Date().getTime()}`)
        },
        initCropper() {
            let cropper = new Cropper(this.$refs.avatar, {
                viewMode: 1,
                aspectRatio: 1,
                guides: false, //不显示虚线
                center: false, //不显示中心指示器
                background: false, //不显示透明图层
                rotatable: false, //不可旋转图片
                minCropBoxWidth: 150, //裁剪框最小宽度
                minCropBoxHeight: 150, //裁剪框最小高度
                //cropBoxResizable: false, //是否可以修改裁剪框尺寸
                dragMode: "move" //可以拖动图片
            });
            this.cropper = cropper;
        },
        returnFun() {
            this.$router.go(-1);
        },
        hideCropper() {
            this.isShowCropper = false;
        },
        beforeAvatarUpload(file) {
            const isJPG =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/jpg";
            const isLt2M = file.size / 1024 / 1024 < this.fileSizeLimit;
            if (!isJPG) {
                this.$toast("图片仅支持 JPG/PNG 格式!");
            }
            if (!isLt2M) {
                this.$toast("图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        handleAvatar(data) {
            let file = data.target.files[0];
            if (!this.beforeAvatarUpload(file)) return;
            this.cropperImg = URL.createObjectURL(file);
            this.avatarName = file.name;
            this.$refs.avatarInput.value = ""; //清空input值,否则连续选择同一张图片时无法触发change事件
            this.isShowCropper = true;
            setTimeout(() => {
                if (this.cropper) {
                    this.cropper.replace(this.cropperImg);
                } else {
                    this.initCropper();
                }
            });
        },
        // 将base64转换为file
        dataURLtoFile(dataurl) {
            // console.log(dataurl)
            let arr = dataurl.split(",");
            let mime = arr[0].match(/:(.*?);/)[1];
            let bytes = atob(arr[1]); // 解码base64
            let n = bytes.length;
            let ia = new Uint8Array(n);
            while (n--) {
                ia[n] = bytes.charCodeAt(n);
            }
            return new File([ia], this.avatarName, {
                type: mime
            });
        },
        uploadAvatar() {
            let self = this;
            self.$toast.loading({
                message: "上传中...",
                forbidClick: true
            });
            // this.cropper.getCroppedCanvas().toBlob(async blob => {
            //     blob.name = this.avatarName;
            //     const file = new File([blob], blob.name, {
            //         type: blob.type
            //     });
            //     dsf.http.upload("/fn/mobilePhoto/upload", file).then(res => {
            //         setTimeout(() => {
            //             this.$toast.clear();
            //             this.logoImg = dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${ dsf.util.loadSessionStore("user").user_id}&time=${new Date().getTime()}`);
            //             this.isShowCropper = false;
            //         }, 500);
            //     });
            // });
            //上面的方法在APP中不起作用。换成上传base64格式的文件
            self.afterImg = self.cropper.getCroppedCanvas().toDataURL('image/jpeg')
            let objFile = {
                fileName: self.avatarName,
                imageData: self.afterImg
            }
            //江苏国资委iOS走特殊逻辑 2022年12月21日13:59 @luy
            if (dsf.util.checkSystem() == "ios" && dsf.util.getClientName() == "app"&&dsf.config.projectName=="jsgzw") {
                $iaction.encrypt(
                    {
                        "action": "uploadHeadicon",
                        "filename": self.avatarName,
                        "base64img": self.afterImg,
                        "serverurl": dsf.url.getRootPath() + `fn/mobilePhoto/upload?x-auth-token=${dsf.util.loadSessionStore("loginToken")}`
                    }, (s) => {
                        console.log(s)
                        setTimeout(() => {
                            self.$toast.clear();
                            self.logoImg = dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${self.user.user_id}&time=${new Date().getTime()}`);
                            self.isShowCropper = false;
                            self.user.photo = dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${self.user.user_id}`);
                            dsf.util.saveToSessionStore("user", self.user);
                        }, 500);
                    }, (e) => {
                        console.log(e)
                    });
            } else {
                dsf.http.post("/fn/mobilePhoto/uploadBase64", objFile).then(res => {
                    setTimeout(() => {
                        self.$toast.clear();
                        self.logoImg = dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${self.user.user_id}&time=${new Date().getTime()}`);
                        self.isShowCropper = false;
                        self.user.photo = dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${self.user.user_id}`);
                        dsf.util.saveToSessionStore("user", self.user);
                        if(dsf.util.getClientName()=="mobileIM"){
                            window.native?.notice({
                                type:"OA-NOTICE",
                                action:"updateImg",
                            })
                        }
                    }, 500);
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.box {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    z-index: 2021;
    font-size: var(--font_size_2);
    width: 100%;
    height: calc(100vh - 46px);
    background-color: #f5f5f5;
}

.currentImgBox {
    position: relative;
    height: calc(100vh - 51px);
    background: white;
    padding: 60px 0 20px;
}

.currentImg {
    width: 300px;
    margin: 0 auto;
    height: 300px;
    border-radius: 50%;
}

.selectWrap {
    padding: 0 0 0 10px;
}

.imgSlectBox {
    padding: 10px 0;
}

.imgWrap {
    position: relative;
    width: 80px;
    height: 80px;
    margin-right: 10px;
}

.imgWrap>img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.avatar-upload {
    position: absolute;
    z-index: 2;
    top: 60px;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    opacity: 0;
    left: 0;
}

.content {
    flex: 1;
    overflow: hidden;
    position: relative;

    .my-avatar {
        display: block;
        position: absolute;
        width: 100vw;
        // height: 75vw;
        transform: translateY(-50%);
        top: 50%;
    }
}

.replace-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 30px;

    span {
        font-size: 15px;
        color: #fdfdfd;
        // background: linear-gradient(to left, rgba(255, 255, 255, .08) 0%, rgba(255, 255, 255, .16) 100%);
        //background-color: #1989fa;
        @include background-theme("normal");
        border-radius: 20px;
        padding: 9px 18px;
    }

    input {
        position: absolute;
        width: 95px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
    }
}

.cropper-container {
    position: fixed;
    top: 0;
    z-index: 9;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #000;
}

::v-deep .cropper-point {
    display: none;
}

::v-deep .cropper-view-box {
    outline: 2px solid #fff;
    outline-color: #fff;
}

::v-deep .cropper-line {
    background-color: #fff;
}
</style>
