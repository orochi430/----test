<template>
<div>
    <div v-if="errored" class="init-div">{{ tips }}</div>
    <!-- <div v-else class="init-div">
        <div v-if="loading">正在登录...</div>
        <div v-else>登录成功！</div>
    </div> -->
</div>
</template>

<script>
// import store from "@/common/util";
export default {
    data() {
        return {
            renda: null,
            errored: true,
            tips: '您暂无权限使用该系统！',
            code: this.$route.params.code
        };
    },
    created() {
        let self = this;
        switch (self.code) {
            case "401":
                self.tips = "您进行了未授权的访问,请重新登录！";
                break;
            default:
                break;
        }
    },
    mounted() { 
        let self = this;
        self.loadJsSdk((renda) => {
            self.renda = renda;
            self.navigateToApp();
        })
    },
    methods: {
        // 加载小程序JsSdk
        loadJsSdk(callback) {
            let self = this;
            let userAgent = navigator.userAgent,
                // isAndroid =  userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1,
                // isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                isMyWx = /miniProgram/i.test(userAgent) && /micromessenger/i.test(userAgent),
                isMyZfb = userAgent.includes('AlipayClient');

            let appScript = document.createElement("script");
            appScript.type = "text/javascript";
            if (isMyWx) {
                // 微信小程序 JS-SDK
                // document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"><\/script>');
                appScript.src = "./static/js/jweixin-1.6.0.js";
            } else if (isMyZfb) {
                // 支付宝小程序 JS-SDK
                // document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>');
                appScript.src = "https://appx/web-view.min.js";
            }
            document.head.appendChild(appScript);
            // 江西数字人大前端js sdk
            let sdkScript = document.createElement("script");
            sdkScript.type = "text/javascript";
            sdkScript.src = "https://szrd.jxrd.gov.cn/jsApi/sdk.mini.js"; // https://szrd.digitaljx.com/jsApi/sdk.mini.js
            document.head.appendChild(sdkScript);
            sdkScript.onload = () => {
                if (callback) {
                    callback(renda);
                }
            };
        },
        // 返回小程序
        navigateToApp(key, seconds) {
            key = key || "home";
            seconds = seconds || 3;
            let self = this;
            if (self.renda && (self.renda.isWx || self.renda.isZfb) && self.renda.navigateToApp) {
                setTimeout(function () {
                    // self.$router.go(-1);
                    self.renda.navigateToApp(key);
                }, seconds * 1000);
            }
        }
    },
};
</script>

<style scoped>
.init-div {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -20px;
    top: 50%;
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
}
</style>
