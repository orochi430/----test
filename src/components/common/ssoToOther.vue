<template>
    <div>
    </div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
    created() {
        let self = this;
        let user = dsf.util.loadSessionStore("user");
        let appname = this.$route.params.appname;
        let appkey = this.$route.params.appkey;
        let url = this.$route.params.url;
        console.log(this.$route.params)
        debugger
        switch (appkey) {
            case "DJGL":
                let timespan = dsf.getCurrentTime();
                let key = "dreamdtipb";
                let token = dsf.md5(user.logName + timespan + key);
                url += `?loginName=${user.logName}&timestamp=${timespan}&token=${token}`;
                if (dsf.util.getClientName() == "app") {
                    window.closeWeb = function () {
                        //console.log('1');
                        self.$router.go(-1);
                        //console.log('2');
                    }
                    xsfWindow.openWebView({
                        "title": appname,
                        "url": url,
                        "colorString": "#111111",
                        "closeWeb": "closeWeb"
                    });
                } else {
                    this.$router.replace({
                        name: "dsfIframe",
                        params: {
                            url: url,
                            title: appname
                        }
                    });
                }
                break;
            case "LangChao":
                const lcScript = document.createElement('script');
                lcScript.type = 'text/javascript';
                lcScript.src = 'static/js/crypto-js.js';;
                document.body.appendChild(lcScript);
                lcScript.onload = () => {
                    function encrypt(info) {
                        var result = 'olvEsTYBHLQiWCsX';
                        var p = CryptoJS.enc.Utf8.parse;
                        var encrypt = CryptoJS.AES.encrypt;
                        var cy = CryptoJS;
                        var key = p(result + result);
                        var iv = p(result);
                        var encrypt_ked = encrypt(JSON.stringify(info), key, {
                            keySize: 128 / 8,
                            iv: iv,
                            mode: cy.mode.CBC,
                            padding: cy.pad.Pkcs7
                        }).toString();
                        return encrypt_ked;
                    }

                    var paramdata = {
                        "code": user.mobile,
                        "date": new Date().toISOString(),
                        "span": "1000"
                    };
                    console.log(paramdata);
                    var encryptdata = encodeURIComponent(encrypt(paramdata));
                    console.log(encryptdata);
                    url = url.replace("[req]", encryptdata);
                    console.log(url);
                    location.href = url
                    // this.$router.replace({
                    //     name: "dsfIframe",
                    //     params: {
                    //         url: url,
                    //         title: appname
                    //     }
                    // });
                }
                break;
            case "oaToJw":
                location.href = url
                break;
            default:
                dsf.layer.toast("当前系统未对接！");
                break;
        }
    },
    methods: {},
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
