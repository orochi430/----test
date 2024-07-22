<template>
<div style="position:absolute;">
    <div id="pos0"></div>
</div>
</template>

<script>
import Signature from 'static/js/kinggrid/signature.all.mobile.min.js'
export default {
    name: "hwFile",
    components: {},
    props: {
        formMeta: {
            type: Object,
            default: () => {
                return {};
            },
        },
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        hwtype: {
            type: String,
            default: "jg"
        }
    },
    data() {
        return {
            iframeUrl: "",
            lineWidth: 6,
            lineColor: "#000000",
            bgColor: "white",
            resultImg: "",
            isCrop: false,
            imgUrl: "",
            thicknessList: [{
                text: '特细',
                lineWidth: 2
            }, {
                text: '细',
                lineWidth: 4
            }, {
                text: '粗',
                lineWidth: 6
            }, {
                text: '特粗',
                lineWidth: 8
            }],
            isShowThicknessPicker: false,
            isFullScreen: false,
            esignHeight: 300,
            tempImgUrl: "",
            shuiyin_div: null, //动态添加的水印dom
            isShowSignBtnBox: false, //是否显示签名按钮盒子
            isShowSignBtn: false,
            user: {}
        }
    },
    created() {
        if (this.hwtype != "jg") {
            return
        }
        let documentid = this.$route.name == "commonList" ? this.formData.info_id : this.formMeta.parameters.pk
        if (process.env.NODE_ENV === "development") {
            Signature.dynamicLoadCss("../../../static/js/kinggrid/dialog/kgDialog/ui-dialog.css");
            Signature.dynamicLoadCss("../../../static/js/kinggrid/core/kinggrid.plus.css");
            Signature.dynamicLoadCss("../../../static/js/kinggrid/core/kinggrid.plus.mobile.css");
        } else {
            Signature.dynamicLoadCss("static/js/kinggrid/dialog/kgDialog/ui-dialog.css");
            Signature.dynamicLoadCss("static/js/kinggrid/core/kinggrid.plus.css");
            Signature.dynamicLoadCss("static/js/kinggrid/core/kinggrid.plus.mobile.css");
        }
        this.user = dsf.util.loadSessionStore("user");
        //console.log(this.formMeta, this.formData);
        dsf.http.post("fn/handWrite/config", {}).then((data) => {
            //console.log(data)
            let Signaturedata = data.data.data;
            Signature.init({ //初始化属性
                keysn: Signaturedata.keysn,
                languagesPath: process.env.NODE_ENV === "development" ? "../../../static/js/kinggrid/languages" : "static/js/kinggrid/languages",
                certType: 'server', //设置证书在签章服务器
                sealType: 'server', //设置印章从签章服务器取
                serverUrl: Signaturedata.serverUrl, //H5官网演示地址
                // showNoPW: true,
                // showSealsDlg:false,
                // password: "123456"
                sealTag: "GM",
                documentid: documentid //设置文档ID          
            });
        });
    },
    computed: {},
    mounted() {},
    methods: {
        buttonHWClick() {
            let self = this;
            let signatureCreator = Signature.create();
            let signatureParams = {
                onBegin: function () {},
                onEnd: function () {}
            }
            if (dsf.config.commonFlow && dsf.config.commonFlow.JG_HandWrite_Setting) {
                Object.assign(signatureParams, dsf.config.commonFlow.JG_HandWrite_Setting)
            } else {
                Object.assign(signatureParams, {
                    "image_height": "6.7",
                    "image_width": "10",
                    "noCutting": true,
                    "lineSize": 4,
                    "buttonText": "签批"
                })
            }

            signatureCreator.handWriteDlg(signatureParams, function (param) {
                //console.log(param);
                //alert(param.imageData);
                let _moduleId = self.formData.moduleId;
                let newFileFlag = self.$route.name == "commonList" ? 0 : self.$route.params.pk ? 0 : 1;
                let _infoId = self.$route.name == "commonList" ? self.formData.info_id : self.formMeta.parameters.pk;
                let _flowId = self.formData.flowId;
                let _nodeId = self.$route.name == "commonList" ? self.formData.nodeId : self.formMeta.parameters.nodeId;
                let _nodeName = self.$route.name == "commonList" ? self.formData.nodeName : self.formMeta.parameters.nodeName;
                let _createUserId = self.user.user_id;
                let _pnid = self.$route.name == "commonList" ? self.formData.pnid : self.formMeta.parameters.pnId;
                let _pid = self.$route.name == "commonList" ? self.formData.pid : self.formMeta.parameters.pId;
                // var data = {
                //     'moduleId': _moduleId,
                //     'newFileFlag': newFileFlag,
                //     'infoId': _infoId,
                //     'flowId': _flowId,
                //     'nodeId': _nodeId,
                //     'mainPk': _infoId,
                //     'createUserId': _createUserId,
                //     'nodeName': encodeURIComponent(_nodeName),
                //     'pnid': _pnid,
                //     'pid': _pid,
                //     'temp': newFileFlag,
                //     'imageData': param.imageData,
                //     'handWriteSignatureid': 123
                // };
                // dsf.http.post("fn/handWrite/updateHmImg", data).then(function (result) {
                //     console.log(result);
                //     if ("success" == result.data.type) {
                //         dsf.layer.toast("签批成功");
                //         self.imgUrl = dsf.url.getServerUrl(result.data.data.handwritePicUrl);
                //         self.closePop();
                //     } else {
                //         dsf.layer.toast("签批失败");
                //     }
                // });

                signatureCreator.runHW(param, {
                    protectedItems: [], //设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                    position: 'handWritePos', //设置盖章定位dom的ID，必须设置
                    okCall: function (fn) { //点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                        // console.log("盖章ID：" + this.getSignatureid());
                        // console.log("盖章数据：" + this.getSignatureData());
                        //console.log(self.formMeta, self.formData);
                        var data = {
                            'moduleId': _moduleId,
                            'newFileFlag': newFileFlag,
                            'infoId': _infoId,
                            'flowId': _flowId,
                            'nodeId': _nodeId,
                            'mainPk': _infoId,
                            'createUserId': _createUserId,
                            'nodeName': encodeURIComponent(_nodeName),
                            'pnid': _pnid,
                            'pid': _pid,
                            'temp': newFileFlag,
                            'imageData': param.imageData,
                            'handWriteSignatureid': this.getSignatureid()
                        };
                        signatureCreator.saveSignature(_infoId, this.getSignatureid(), this.getSignatureData());
                        dsf.http.post("fn/handWrite/updateHmImg", data).then(function (result) {
                            //console.log(result);
                            if ("success" == result.data.type) {
                                dsf.layer.toast("签批成功");
                                self.imgUrl = dsf.url.getServerUrl(result.data.data.handwritePicUrl);
                                self.closePop();
                            } else {
                                dsf.layer.toast("签批失败");
                            }
                        });
                    },
                    cancelCall: function () { //点击取消后的回调方法
                        //console.log("取消！")
                    }
                });

            });
        },
        closePop() {
            //this.$parent.showWrite=false;
            this.$emit("closeWritePopup", this.imgUrl);
        }
    }
}
</script>
