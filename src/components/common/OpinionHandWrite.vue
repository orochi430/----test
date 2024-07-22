<template>
    <div>
        <div class="esignBox" ref="esignBox">
            <!-- v-if="this.formData.flowId != '0'"    此处不知道为什么要这个判断，已去掉 -->
            <van-nav-bar ref="esignNav" title="请签写" left-text="关闭" right-text="保存" @click-left="closePop"
                @click-right="handleGenerate"></van-nav-bar>
            <div class="esignWrap" :style="{ 'height': isFullScreen ? `${esignHeight + 2}px` : '300px' }">
                <!-- <vue-esign key="halfScreen" v-if="!isFullScreen" ref="esignHalf" :width="width" :height="300"
                    :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor"></vue-esign>
                <vue-esign key="fullScreen" v-else ref="esignFull" :width="width" :height="esignHeight" :isCrop="isCrop"
                    :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor"></vue-esign> -->
                <!-- <VueSignaturePad width="100%" height="100%" ref="signaturePad" :options="options" /> -->
                <!-- 新插件SignaturePad 240226 -->
                <canvas class="canvasId" ref="canvasBox" :width="width" :height="isFullScreen ? esignHeight : 300" />
            </div>
            <div class="esignBtnBox" ref="esignBtnBox">
                <van-button type="default" @click="undo">撤回</van-button>
                <van-button type="default" @click="handleReset">清空画板</van-button>
                <van-button type="primary" @click="isShowThicknessPicker = true">画笔粗细</van-button>
                <van-button type="info" @click="toggleFullScreen">{{ isFullScreen ? '竖屏书写' : '横屏书写' }}</van-button>
            </div>
        </div>
        <van-popup v-model="isShowThicknessPicker" position="bottom" round>
            <van-picker title="笔画粗细" default-index="2" show-toolbar confirm-button-text=" " cancel-button-text="关闭"
                :columns="thicknessList" @change="thicknessChange" @cancel="isShowThicknessPicker = false" />
        </van-popup>
        <img :src="tempImgUrl" alt="" ref="tempImg" style="display: none" />
    </div>
</template>

<script>
import SignaturePad from 'signature_pad';
export default {
    name: "hwFile",
    components: {},
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        isForm: {
            type: String,
            default: () => {
                return "";
            },
        },
        base64Img: {
            type: String,
            default: () => {
                return "";
            },
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
            width: document.body.clientWidth,
            options: {
                penColor: "#000",
                minWidth: 1, //控制画笔最小宽度
                maxWidth: 1, //控制画笔最大宽度
            },
            config:{
                penColor: "#000000",   //笔刷颜色
                minWidth: 3, //画笔的笔锋
                maxWidth: 3, //画笔的粗细
            },
            signaturePad: null,
        }
    },
    created() { },
    mounted() {
        this.$nextTick(() => {
            this.esignHeight = document.body.offsetHeight - this.$refs.esignNav.$el.scrollHeight - this.$refs.esignBtnBox.clientHeight;
            this.getCanvas();
            if(this.base64Img){
                // let canvas = this.$refs[this.isFullScreen ? 'esignFull' : 'esignHalf'].$el;
                let canvas = this.$refs["canvasBox"];
                let ctx = canvas.getContext("2d");
                //创建一个image元素
                let image = new Image();
                //用src设置图片的地址
                image.src = this.base64Img;
                //onload一下
                image.onload = function () {
                    ctx.drawImage(image, 1, 1);
                }
            }
        })
    },
    methods: {
        getCanvas() { //初始化signaturePad实例
            // var canvas = document.querySelector('.canvasId');
            this.signaturePad = new SignaturePad(this.$refs['canvasBox'], this.config);
        },
        toggleFullScreen() { //切换全屏/半屏
            this.isFullScreen = !this.isFullScreen;
            this.isShowEsignBox = false;
            this.signaturePad.clear();
            if (this.isFullScreen) {
                this.addExplainWatermark();
            } else {
                let watermark = this.$refs.esignBox.querySelector('.watermark');
                if (watermark) {
                    watermark.parentNode.removeChild(watermark);
                }
            }
        },
        addExplainWatermark() {
            //全屏时添加说明性水印展示
            this.shuiyin_div = document.createElement("div");
            this.shuiyin_div.className = "watermark";
            var style = this.shuiyin_div.style;
            style.position = "absolute";
            style.left = 0;
            style.top = `${this.$refs.esignNav.$el.scrollHeight}px`;
            style.width = "100%";
            style.height = `${this.esignHeight}px`;
            style.opacity = "0.3";
            style.background = "url(" + this.textToImg() + ")";
            style.zIndex = 9;
            style.pointerEvents = "none";
            this.$refs.esignBox.appendChild(this.shuiyin_div);
        },
        textToImg() {
            //水印添加
            let canvas = document.createElement("canvas");
            canvas.height = 250;
            let ctx = canvas.getContext("2d");
            var fontSize = 35;
            ctx.font = `${fontSize}px Georgia`;
            var [txt, xText, yText] = ["手写示例:张三", 80, 145];
            var {
                width: wText
            } = ctx.measureText(txt);
            var hText = fontSize;
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = "#000";
            ctx.translate(xText + wText / 2, yText - hText / 2);
            let deg = (Math.PI / 180) * 90;
            ctx.rotate(deg, deg);
            /**
            1. 中心点移动到文字正中
            2. 坐标(0,0)时，中心点为文字左下角点
            3. 所以：横坐标左移一半长，纵坐标下移一半宽
            */
            ctx.fillText(txt, -wText / 2, hText / 2);
            var dataUrl = canvas.toDataURL("image/png");
            return dataUrl;
        },
        async Rotate(res) {
            //旋转
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = 500;
            canvas.height = 500;
            canvas.style.background = "#000";
            // 设置矩形的坐标和宽高
            var obj = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                w: 200,
                h: 200,
            };
            ctx.fillStyle = "#fff";
            // 设置旋转中心圆点到绘制的中心位置
            ctx.translate(obj.x, obj.y);
            ctx.rotate((-90 * Math.PI) / 180);
            ctx.translate(-obj.x, -obj.y);
            ctx.fillRect(obj.x - obj.w / 2, obj.y - obj.h / 2, obj.w, obj.h);
            this.tempImgUrl = res;
            let cb = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        let imgUrl = res;
                        let imgW = this.$refs.tempImg.width;
                        let imgH = this.$refs.tempImg.height;
                        resolve(this.getBase64(imgUrl, imgW, imgH));
                    }, 100);
                });
            };
            let need_url = await cb();
            return need_url;
        },
        getBase64(imgUrl, imgW, imgH) {
            //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
            return new Promise((resolve, reject) => {
                var Img = new Image(),
                    dataURL = "",
                    deg = -90;
                Img.src = imgUrl;
                let that = this;
                Img.onload = function () {
                    //要先确保图片完整获取到，这是个异步事件
                    var canvas = document.createElement("canvas"), //创建canvas元素
                        ctx = canvas.getContext("2d"),
                        //确保canvas的尺寸和图片一样
                        width = imgW,
                        height = imgH,
                        w = deg % 180 == 0 ? width : height,
                        h = deg % 180 == 0 ? height : width,
                        obj = {
                            x: w / 2,
                            y: h / 2,
                            w: width,
                            h: height,
                        };
                    canvas.width = w;
                    canvas.height = h;
                    ctx.translate(obj.x, obj.y);
                    ctx.rotate((deg * Math.PI) / 180);
                    ctx.translate(-obj.x, -obj.y);
                    ctx.drawImage(
                        Img,
                        obj.x - obj.w / 2,
                        obj.y - obj.h / 2,
                        obj.w,
                        obj.h
                    ); //将图片绘制到canvas中
                    dataURL = canvas.toDataURL(); //转换图片为dataURL（转换成base64）
                    resolve(dataURL);
                };
            });
        },
        thicknessChange(el, value, index) { //选择画笔粗细
            this.lineWidth = value.lineWidth;
            this.signaturePad.minWidth = value.lineWidth/2;
            this.signaturePad.maxWidth = value.lineWidth/2;
        },
        handleReset() { //清空画板
            // this.$refs[this.isFullScreen ? 'esignFull' : 'esignHalf'].reset();
            this.signaturePad.clear();
        },
        undo() { //撤回
            var data = this.signaturePad.toData();
			if (data) {
				data.pop();
				this.signaturePad.fromData(data);
			}
        },
        async handleGenerate() { // 获取base64
            if (this.signaturePad.isEmpty()) {  // 判断画布是否为空
                this.resultImg = ""
                this.imgUrl = ""
                this.closePop();
            } else {
                let res = this.signaturePad.toDataURL();
            
            // this.$refs[this.isFullScreen ? 'esignFull' : 'esignHalf']
                // .generate()
                // .then(async (res) => {
                    if (this.isFullScreen) {
                        res = await this.Rotate(res);
                    }
                    // 转成文件
                    // var file = this.dataURLtoFile(res);
                    //莫名其妙的file类型在某些安卓手机不支持了，故换成uploadbase64接口
                    let objFile = {
                        fileName: 'easign.png',
                        imageData: res
                    }
                    let url =
                        `fn/mobileHandWritingData/uploadBase64?pnid=${this.formData.pnId || this.formData.pnid}&pid=${this.formData.pId || this.formData.pid}&infoId=${this.formData.pk || this.formData.id}`;
                    if (this.isForm == "1") {
                        url += "&temp=1"
                    }
                    //江苏国资委iOS走特殊逻辑 2022年12月21日13:59 @luy
                    if (dsf.util.checkSystem() == "ios" && dsf.util.getClientName() == "app" && dsf.config.projectName == "jsgzw") {
                        let url =
                            `fn/mobileHandWritingData/upload?pnid=${this.formData.pnId || this.formData.pnid}&pid=${this.formData.pId || this.formData.pid}&infoId=${this.formData.pk || this.formData.id}`;
                        if (this.isForm == "1") {
                            url += "&temp=1"
                        }
                        console.log("开始调取插件方法");
                        $iaction.encrypt(
                            {
                                "action": "uploadHeadicon",
                                "filename": 'easign.png',
                                "base64img": res,
                                "serverurl": dsf.url.getRootPath() + url + `&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`
                            }, (data) => {
                                console.log("调取插件方法回调函数返回值：", data);
                                if (data.result) {
                                    this.resultImg = data.data
                                    this.imgUrl = dsf.url.getServerUrl(`fn/file/downloadFile?fileName=${data.data.handwritePic}`)
                                    this.closePop()
                                }
                            }, (e) => {
                                console.log(e)
                            });
                    } else {
                        dsf.http.post(url, objFile).then(({
                            data
                        }) => {
                            console.log(data);
                            if (data.result) {
                                this.resultImg = data.data
                                this.imgUrl = dsf.url.getServerUrl(`fn/file/downloadFile?fileName=${data.data.handwritePic}`)
                                dsf.layer.toast('手写内容已保存')
                                this.closePop()
                            }
                        });
                    }
                
                // })
                // .catch((err) => {
                //     // this.$toast('内容不能为空！');
                //     this.resultImg = ""
                //     this.imgUrl = ""
                //     this.closePop()
                // });
            }
        },
        // 将base64转换为file
        dataURLtoFile(dataurl) {
            let arr = dataurl.split(",");
            let mime = arr[0].match(/:(.*?);/)[1];
            let bytes = atob(arr[1]); // 解码base64
            let n = bytes.length;
            let ia = new Uint8Array(n);
            while (n--) {
                ia[n] = bytes.charCodeAt(n);
            }
            return new File([ia], "easign.png", {
                type: mime,
            });
        },
        closePop() {
            //this.$parent.showWrite=false;
            if (this.isForm == "1") {
                this.$emit("closeWritePopup", this.resultImg);
            } else {
                this.$emit("closeWritePopup", this.imgUrl);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.esignBtnBox {
    display: flex;

    ::v-deep .van-button {
        flex: 1;
        margin: 10px;
        padding: 0;
        text-align: center;
    }
}

.esignBox {
    // padding: 10px 10px 0;

    .esignTitle {
        text-align: center;
    }

    .esignWrap {
        overflow: hidden;
        background: white;
        border: 1px solid rgba(0, 0, 0, .09);
    }
}
</style>
