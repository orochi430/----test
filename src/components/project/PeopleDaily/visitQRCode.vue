<template>
<div>
    <div v-if="errored" class="init-div">{{ errorMsg }}</div>
    <div v-else class="initial-div">
        <!-- <div v-if="loading">正在登录...</div>
        <div v-else>
            登录成功！
        </div> -->
        <img :src="imgSrc" />
        <!-- （长按保存图片） -->
        <van-button type="info" @click="share()">分享</van-button>
    </div>
</div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
    data() {
        return {
            // loading: true,
            errored: false,
            errorMsg: "",
            imgSrc: "",
            paras: this.$route.params.paras
        };
    },
    created() {
        let self = this;
        self.createQRCode();
    },
    mounted() {},
    methods: {
        // 生成二维码
        createQRCode() {
            let self = this;
            // let user = store.loadSessionStore("user") || store.loadLocalStore("user");
            // if (user) {
            // let paras = {
            //     deptId: user.deptId,
            //     deptName: encodeURI(user.deptName),
            //     userId: user.user_id,
            //     userName: encodeURI(user.name),
            //     tel: user.tel
            // };
            console.log(self.paras);
            // paras = encodeURIComponent(JSON.stringify(paras));
            // self.paras = encodeURIComponent(B64.encode(JSON.stringify(self.paras)));
            let url =  dsf.url.getRootPath() + `dist/index.html#/loginPeopleDaily?paras=${self.paras}`;
            console.log(url);
            url = encodeURIComponent(url);
            self.imgSrc = dsf.url.getServerUrl(`fn/genrateQr?url=${url}`);
            // } else {
            //     self.errored = true;
            //     self.errorMsg = "未授权的访问，请重新登录！";
            // }
        },
        // 分享
        share() {
            import("dingtalk-jsapi").then((dd) => {
                dd.biz.util.share({
                    type: 0, //分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
                    url: location.href,
                    title: "分享访客登记单",
                    content: "访客登记单",
                    image: self.imgSrc,
                    onSuccess: function () {
                        //onSuccess将在调起分享组件成功之后回调
                        /**/
                    },
                    onFail: function (err) {}
                })
            })
        }
    }
};
</script>

<style scoped>
.initial-div {
    /* position: absolute; */
    width: 100%;
    height: 100vh;
    line-height: 20px;
    /* margin-top: -20px; */
    /* top: 50%; */
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
