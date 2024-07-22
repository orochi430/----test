<template>
<div class="snapshot-container" ref="snapshotContainer">
    <div class="snapshot-box">
        <!-- 右侧操作 -->
        <!-- <div class="iconBox flex dc">
            <img src="../../assets/imgs/full.png" alt="" @click="fullScreen" v-if="isShowFullScreen">
        </div> -->
        <div v-if="errored">
            <commonempty image="error" :description="errorMsg">
                <van-button round type="danger" class="bottom-button" v-if="isRetry">自动重试({{count}}s)</van-button>
            </commonempty>
        </div>
        <div v-if="!errored && imgs.length>0" class="container" ref="container" style="background: #fff;">
            <div class="pageContainers">
                <!-- v-focus  -->
                <div class="pinch-zooms" v-for="(img, idx) in imgs" :key="idx" :id="'pages'+idx" :data-pid="idx+1" ref="pinchZooms">
                    <!-- <span>{{idx+1}}/{{imgs.length}}</span> -->
                    <!-- <img v-lazy="img" ref="viewImg" class="view-img" /> -->
                    <img v-show="img.show" v-lazy="img.path" ref="viewImg" class="view-img" />
                </div>
            </div>
        </div>
        <div class="catalogue" @click="show=true">
            <van-icon name="coupon-o" size="24" />
        </div>
        <van-popup v-model="show" position="left" class="file_popup" get-container="body" :overlay-style="{'z-index':'9999'}">
            <div class="pages">
                <p>跳转至：</p>
                <!-- <a :href="'#pages'+idx" @click="show=false" v-for="(img, idx) in imgs" :key="idx+'x'">第{{idx+1}}页</a> -->
                <a v-for="idx in pageLengths" :key="idx+'x'" @click="goPageNums(idx)">第{{idx}}页</a>
            </div>
        </van-popup>
    </div>
</div>
</template>

<script>
let scrollary = [];
let total = [0]; //默认滑动后续不再加载图片首页
// 节流
const throttle = (fn, delay) => {
    let timeout = null
    return function () {
        let args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                fn.apply(this, args)
            }, delay)
        }
    }
}
import Vue from 'vue'
import $ from 'jquery'
Vue.directive('focus', {
    inserted: function (el) {
        // 聚焦元素
        new RTP.PinchZoom(el, {});
    }
})
import '@/common/pinchzoom.js'
import SignatureMobile from '../../common/signatureMobile/SignatureMobile.esm.js'
import TouchMoveScale from '../../common/signatureMobile/touchmove.js'
// import '../../common/signatureMobile/style/signatureMobile.min.css'
import B64 from "@/common/base64";

export default {
    name: "SnapshotPreview",
    props: {
        file: {
            type: Object,
            default: undefined
        },
        formInfo: {
            type: Object,
            require: true,
        },
        formMeta: { //用来拿到表单控件值
            type: Object,
            default: () => {}
        },
        isShowFullScreen: { //是否需要全屏按钮
            type: Boolean
        },
        snapshotTime: { //快照查看时间
            type: String,
            default: ''
        },
        curFileId: { //当前文件正确的id（签批模式下）
            type: String,
            default: ''
        },
        curPage: { //当前滑动页码
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            sumAry: [],
            dsfLoading: null,
            errored: false,
            errorMsg: "",
            imgs: [],
            show: false,
            signMobile: null,
            allNotionData: [], //全部用户的全部图层数据
            currentUserNotionData: [], //当前用户的全部图层数据
            otherUserNotionData: [], //非当前用户的全部图层数据
            addNotionData: [], //全部的增页图层数据
            count: -1,
            timer: null,
            autoLoadNameAndDate: "",
            currentScrollDom: 0, // 当前滚动到某页的dom
            user: dsf.util.loadSessionStore("user") || {},
            pageLengths: 0,
            isRetry: false, //文件预览是否重试
            signConfigObj: {}, //签名信息及各个配置项
            oldScrollTop: 0, //上一次滚动结束后的滚动距离
            scrollTop: 0, //当前的滚动距离
        };
    },
    created() {
        let self = this;
        self.init();
    },
    watch: {
        listenChange(val) {
            this.init();
        },
        scrollTop(newVal, oldVal) {
            setTimeout(() => {
                if (newVal == $('.snapshot-container').scrollTop()) {
                    // console.log("滚动结束")
                    this.oldScrollTop = newVal;
                    this.getPageNum();
                }
            }, 50)
        },
        curPage: {
            handler(val) {
                if (val > 0) {
                    setTimeout(() => {
                        $('.snapshot-container .pinch-zooms')[val - 1].scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        }); //平滑滚动到图层对应位置
                    }, 100)
                }
            },
            immediate: true,
            deep: true

        }
    },
    computed: {
        // 同时监听两个属性变化
        listenChange() {
            const {
                curFileId,
                snapshotTime
            } = this
            return {
                curFileId,
                snapshotTime
            }
        }
    },
    mounted() {},
    methods: {
        // 图片预览+加载签批插件
        init() {
            let self = this;
            self.imgs = [];
            self.dsfLoading = dsf.layer.loading();
            $('.snapshot-container .container').empty()
            dsf.http
                .get(`fn/office/image/previewAll`, {
                    fileId: self.curFileId,
                    filename: "",
                    initDataSource: "",
                    officeModuleId: '', //移动网盘的预览该值必须传
                })
                .done(res => {
                    if (res.type == "success") {
                        self.errored = false;
                        self.isRetry = false;
                        // self.imgs = res.data.pages.map(item =>
                        //     dsf.url.getWebPath(item.url)
                        // );
                        let data = []
                        res.data.pages.forEach((item, index) => {
                            data.push({
                                path: dsf.url.getWebPath(item.url),
                                show: [0, 1, 2].includes(index) ? true : false
                            })
                        })
                        self.imgs = data
                        self.$nextTick(() => {
                            self.$refs.snapshotContainer.addEventListener('scroll', self.handleScroll.bind(this, self), true)
                            if (self.$refs.pinchZooms.length >= res.data.pages.length) {
                                dsf.layer.closeLoading(self.dsfLoading);
                                total = [0]; //默认滑动后续不再加载图片首页
                                self.getPageItem();
                                self.getCurrentUserSignatureInfo(() => {
                                    self.initSignatureMobile();
                                })
                            }
                        })
                    } else {
                        self.errored = true;
                        self.errorMsg = res.message;
                        if (self.errorMsg === "文件解析中,请耐心等待" || (res.data && res.data.status == 0)) {
                            self.isRetry = true;
                            self.countDown(); //自动重试
                            // self.$emit('closePop')
                        }
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.dsfLoading);
                });
        },
        // 获取所有pinch-zoom顶部距离
        getPageItem() {
            scrollary = [];
            let domAll = document.querySelectorAll('.pinch-zooms');
            domAll.forEach(ele => {
                scrollary.push(ele.offsetTop)
            })
        },
        getMaxNum(val) {
            let resulrAry = [...new Set(scrollary)]
            let ary = resulrAry.filter(item => val >= item).slice(-1);
            return resulrAry.indexOf(ary[0]);
        },
        // 获取当前滚动到页面索引
        getPageNum() {
            let currentScrollDom = this.getMaxNum($('.snapshot-container').scrollTop())
            let i = Math.max(currentScrollDom, 0);
            let num = i + 1;
            this.signMobile._limitCanvaspage = num;
            // if (!total.includes(i)) {
            //     this.scrollBackData(num);
            // }!total.includes(i) && total.push(i)
        },
        countDown() {
            const TIME_COUNT = 3;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        clearInterval(this.timer);
                        this.timer = null; //三秒后关闭
                        this.init();
                    }
                }, 1000);
            }
        },
        destroyInterval() {
            clearInterval(this.timer);
            this.timer = null;
        },
        // 获取签名信息
        getCurrentUserSignatureInfo(callback) {
            let self = this;
            dsf.http.get("fn/hm/sign/config", {}).then(res => {
                if (res && res.data && res.data.type == 'success') {
                    self.signConfigObj = res.data.data;
                    // console.log(self.signConfigObj)
                    callback && callback();
                }
            });
        },
        // 初始化签批插件
        initSignatureMobile(selector) {
            let self = this;
            if (!selector) {
                selector = "pinch-zooms";
            }
            //参数1：载体dom，目前只支持传null，传null会直接把dom插到body根目录，使用fiexd定位
            //参数2：是否横屏，true:横屏模式，false：竖屏模式
            //参数3：手写签批配置项，暂时为{}即可，无需传其他参数
            //参数4：画板载体集合，只适用于竖屏
            //参数5：是否开启遮罩，只适用于竖屏，暂无效
            //参数6：isAutoSign是否自动署名 zoomNum:放大比例 ispad:是否pad端  autographObject:插入文字的字体字号颜色（读取服务器中上次用户的选择）
            let isPad = dsf.util.getClientType() == 'iPad' ? true : false;

            this.signMobile = new SignatureMobile(document.querySelector('.snapshot-box'), false, {}, document.querySelectorAll("." + selector), false, {
                zoomNum: 2,
                ispad: isPad,
                isPaging: true, // 开启插件分页加载canvas
            });

            //签名展示模式（canvas则是使用canvas绘制，其他则是使用图片+文本拼接）
            this.signMobile.autographType = "canvas";
            //多画板签批情况下的层级
            this.signMobile.baseZIndex = 999;
            //当前签批显示的元素起始索引
            this.signMobile.currentElementDataStartZIndex = 99;

            //增加了使用具体像素转换，可以传宽度和高度，不传会自动获取宽高
            //参数1：width:number|null
            //参数2：height:number|null
            this.signMobile.setContainerWH();

            this.getAllNotionData(selector);
        },
        //获取全部签批图层的数据
        getAllNotionData(selector) {
            let self = this;
            // dsf.layer.loading();
            self.dsfLoading = dsf.layer.loading();
            var data = {
                papersId: self.curFileId, //文件id
                flowId: self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
                // nodeId: self.formInfo ? self.formInfo.nodeId : (self.file.nodeId?self.file.nodeId:''),
                userId: "",
                createTime: self.snapshotTime
            }
            dsf.http.get('fn/hm/notation/data/history', data)
                .then(res => {
                    dsf.layer.closeLoading(self.dsfLoading);
                    if (res && res.data && res.data.type == 'success') {
                        var allData = res.data.data.all;
                        let newAllData = []; //接收处理之后的结果
                        let idArr = []; //接收循环过的id
                        allData.forEach(item => {
                            if (idArr.indexOf(item.createUserId) === -1) {
                                newAllData.push({
                                    createUserId: item.createUserId,
                                    createUName: item.createUName,
                                    packetContent: JSON.parse(item.packetContent),
                                });
                                idArr.push(item.createUserId);
                            } else {
                                newAllData.forEach(ele => {
                                    if (ele.createUserId === item.createUserId) {
                                        let packet = JSON.parse(item.packetContent)
                                        packet.forEach(val => {
                                            ele.packetContent.push(val);
                                        })
                                        // console.log(ele.packetContent)
                                    }
                                })
                            }
                        })
                        newAllData.forEach(val => {
                            let packet = val.packetContent;
                            let newArr = []
                            if (packet) {
                                newArr = packet.reverse().filter((item, index) => {
                                    let status = packet.findIndex((ele) => {
                                        if (ele.papersPage) {
                                            return item.papersPage == ele.papersPage
                                        } else {
                                            return item.addPageId == ele.addPageId
                                        }
                                    })
                                    if (index == status) {
                                        return item
                                    }
                                }).reverse()
                            }
                            self.$set(val, 'packetContent', newArr)
                        })
                        var currentUserDataId = res.data.data.userData[0] ? res.data.data.userData[0].createUserId : self.user.user_id;
                        var currentUserData = newAllData.filter(function (item, index) {
                            return currentUserDataId.includes(item.createUserId);
                        })
                        var otherUserData = newAllData.filter(function (item, index) {
                            return !currentUserDataId.includes(item.createUserId);
                        })
                        console.log(currentUserData);
                        console.log(otherUserData);
                        self.$nextTick(() => {
                            self.renderCanvasData({
                                currentUserData: currentUserData,
                                otherUserData: otherUserData
                            })
                        })
                    } else {
                        dsf.layer.toast("获取失败");
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.dsfLoading);
                });
        },
        // 重新渲染图层数据currentUserData：自己数据, otherUserData：别人数据, addPageData currentFlag: true 隐藏画布，isTips：批示人点击
        renderCanvasData(option) {
            let {
                currentUserData,
                otherUserData,
            } = option;
            let self = this;
            if (currentUserData && currentUserData.length > 0) {
                //将当前用户的数据图层初始化到画板上
                currentUserData.forEach(item => {
                    if (item.packetContent && item.packetContent.length > 0) {
                        // var packet = new Array(); //全部画板的数据
                        let packetAry = item.packetContent;
                        if (packetAry && packetAry.length > 0) {
                            packetAry.forEach(function (detail) {
                                if (!detail.data) {
                                    detail.data = detail.packetContent;
                                }
                                if (detail.addPageId) {
                                    if (!document.querySelector(`.pinch-zooms[data-pid="${detail.addPageId}"]`)) { // 如果已经增页过了就不需要再创建增页dom
                                        self.handleCreateNewPage(detail, detail.addPageId, {
                                            addPosition: detail.addPosition,
                                            // isSelf: detail.isSelf,
                                        }, function (row) {

                                        })
                                    }
                                }
                            });
                            if (this.sumAry.length > 0) {
                                this.sumAry.forEach((k) => {
                                    self.handleCreateNewPage(k, k.addPageId, {
                                        addPosition: k.addPosition,
                                        // isSelf: k.isSelf,
                                    }, function (row) {

                                    })
                                })
                            }
                            packetAry && self.signMobile.initCurrentData(packetAry);
                        }
                    }
                })
            }
            if (otherUserData && otherUserData.length > 0) {
                otherUserData.forEach(item => {
                    if (item.packetContent && item.packetContent.length > 0) {
                        // var packet = new Array(); //全部画板的数据
                        let packetAry = item.packetContent;
                        if (packetAry && packetAry.length > 0) {
                            packetAry.forEach(function (detail) {
                                if (!detail.data) {
                                    detail.data = detail.packetContent;
                                }
                                if (detail.addPageId) {
                                    if (!document.querySelector(`.pinch-zooms[data-pid="${detail.addPageId}"]`)) { // 如果已经增页过了就不需要再创建增页dom
                                        self.handleCreateNewPage(detail, detail.addPageId, {
                                            addPosition: detail.addPosition,
                                            // isSelf: false,
                                        }, function (row) {

                                        })
                                    }
                                }
                            });
                            if (this.sumAry.length > 0) {
                                this.sumAry.forEach((k) => {
                                    self.handleCreateNewPage(k, k.addPageId, {
                                        addPosition: k.addPosition,
                                        // isSelf: false,
                                    }, function (row) {

                                    })
                                })
                            }
                            packetAry && self.signMobile.rendererHistoryData(packetAry);
                        }
                    }
                })
            }
            console.log(self.curPage)
            this.sortPageNum();
            setTimeout(() => {
                $('.snapshot-container .pinch-zooms')[self.curPage - 1].scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                }); //平滑滚动到图层对应位置
            }, 100)
        },
        /**
         * @Desc 增页
         * @params data[object] 增页id option：{addPosition: 增页数据, isMove: 是否滑动到位置, isSelf: 是否是自己的增页, isBack：是否回填} callback(增页的页面)
         * @params addPosition:{target: 页面索引, site: 按钮操作序号,  pid: 页面id}
         */
        handleCreateNewPage(item, id, option, callback) {
            let self = this;
            var {
                addPosition,
                isMove,
                // isSelf,
            } = option;
            var pageItem = document.querySelector('.pinch-zooms');
            var newPageElement = pageItem.cloneNode(true); //深拷贝一页的dom
            newPageElement.dataset.pid = id; //设置增页id
            newPageElement.dataset.new = '1'; //标记是增页
            newPageElement.innerHTML = '';
            newPageElement.removeAttribute('id');
            newPageElement.style.height = pageItem.offsetHeight + 'px';
            var franme = document.createElement('div');
            // 增页背景图片
            if (this.signConfigObj.bgImgUrl) {
                franme.style = `width: 100%; height: 100%; background:url('${dsf.url.getWebPath(this.signConfigObj.bgImgUrl)}') center top;background-size:100% 100%;`
            } else {
                franme.style = "width: 100%; height: 100%; border:1PX solid #f00 !important; z-index: 1"
            }
            newPageElement.appendChild(franme);
            var pagesList = document.querySelector(".pageContainers");

            switch (addPosition.site) {
                case '1':
                    let current1 = $(`.snapshot-container .pinch-zooms[data-pid=${addPosition.pid}]`)[0];
                    if (current1) {
                        pagesList.insertBefore(newPageElement, current1)
                    } else {
                        pagesList.prepend(newPageElement);
                    }
                    break
                case '2': // 插入页前
                    let current2 = $(`.snapshot-container .pinch-zooms[data-pid=${addPosition.pid}]`)[0];
                    if (!current2) {
                        this.sumAry.push(item);
                    } else {
                        pagesList.insertBefore(newPageElement, current2)
                    }
                    break
                case '3': // 插入页后
                    if (addPosition.pid) {
                        let current3 = addPosition.pid ? $(`.snapshot-container .pinch-zooms[data-pid=${addPosition.pid}]`)[0] : '';
                        if (!current3) {
                            this.sumAry.push(item);
                        } else {
                            pagesList.insertBefore(newPageElement, current3)
                        }
                    } else {
                        pagesList.appendChild(newPageElement); //插入尾页
                    }
                    break
                case '4':
                    pagesList.appendChild(newPageElement); //插入尾页
                    break
            }
            if (isMove) {
                setTimeout(() => {
                    newPageElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest"
                    }); //平滑滚动到增页位置
                }, 100)
            }
            //参数1：页dom
            //参数2：是否启用遮罩，暂时无用
            //参数3：要加载初始化进入画板的图片base64，没有传空即可
            //参数4：增页ID
            let board = self.signMobile.newChildBoard(newPageElement, false, '', id, {
                addPosition: addPosition
            });
            let dom = document.querySelectorAll('.pinch-zooms');
            this.signMobile.changeInfoPageDom(dom); //重新计算页面dom
            this.getPageItem();
            callback && callback(board)
        },
        handleScroll: throttle((self) => {
            let that = this;
            if (self.$refs['pinchZooms'] && self.$refs['pinchZooms'].length != 1) {
                self.$nextTick(() => {
                    if ($('.snapshot-container').scrollTop() == 0) {
                        self.currentScrollDom = 0;
                    } else {
                        $('.snapshot-container .pinch-zooms').each(function (i, ele) {
                            if ($('.snapshot-container').scrollTop() > ($('.pinch-zooms').outerHeight(true) * i)) {
                                self.currentScrollDom = i;
                            }
                        })
                    }
                    self.imgs.forEach((item, index) => {
                        if ([self.currentScrollDom, self.currentScrollDom + 1, self.currentScrollDom - 1, self.currentScrollDom + 2, self.currentScrollDom - 2].includes(index)) {
                            self.$set(item, "show", true)
                        } else {
                            self.$set(item, "show", false)
                        }
                    })
                    self.scrollTop = $('.snapshot-container').scrollTop();
                    // let dom = self.$refs['pinchZooms'][self.currentScrollDom];
                    // if (!$(dom).has(".signature-element-class").length) {
                    //     setTimeout(() => {
                    //         self.renderCanvasData({
                    //             currentUserData: self.currentUserNotionData,
                    //             otherUserData: self.otherUserNotionData
                    //         })
                    //     }, 100)
                    // }
                })
            }
        }, 500),
        // 页码排序
        sortPageNum() {
            this.$nextTick(() => {
                this.pageLengths = $('.pinch-zooms').length;
                $('.page-nums').remove();
                let style1 = 'width: 60px;height: 24px;display: flex;align-items: center;justify-content: center;background: #FFF;border-radius: 12px;font-size: var(--font_size_3);color: #999;position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);box-shadow: 0 0 10px #ccc;';
                let style2 = 'width: 90px;height: 36px;display: flex;align-items: center;justify-content: center;background: #FFF;border-radius: 18px;font-size: 18px;color: #999;position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);box-shadow: 0 0 10px #ccc;';
                let style = dsf.util.getClientType() == 'iPad' ? style2 : style1;
                $('.pinch-zooms').each((index, ele) => {
                    let html = `<span class="page-nums" style="${style}">${index+1}/${this.pageLengths}</span>`;
                    $(ele).prepend(html)
                })
            })
        },
        goPageNums(index) {
            this.show = false;
            let element = document.querySelectorAll('.pinch-zooms')[index - 1]
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            }, 100)
        },
    },
    beforeDestroy() {
        this.destroyInterval();
        window.removeEventListener('scroll', this.handleScroll, true)
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.snapshot-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;

    .iconBox {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 2px;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        z-index: 2000;

        img {
            margin: 8px 6px;
            width: 0.48rem;
            height: 0.48rem;
        }
    }

    .catalogue {
        width: 40px;
        height: 40px;
        background: #FFF;
        border-radius: 50%;
        box-shadow: 0 0 10px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 10px;
        top: 150px;
        z-index: 999;
    }

    .pinch-zooms {
        position: relative;
        // height: 500px;
        display: flex;
        justify-content: center;
        // margin-bottom: 5vw;
        padding: 5vw 0 0 0;
        width: 90vw;
        min-height: calc(90vw * 1.413);
        margin-left: 5vw;

        &::before {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 5vw;
            box-sizing: border-box;
            border: 1PX solid #ebebeb;
            z-index: 0;
            content: '';
        }

        span.page-nums {
            display: block;
            width: 60px;
            height: 24px;
            display: flex;
            align-items: center;
            background: #FFF;
            border-radius: 12px;
            font-size: var(--font_size_3);
            color: #999;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 0 10px #ccc;
            justify-content: center;
        }

        .view-img {
            width: 90vw;
            height: 100%;
            // height: 500px;
            // margin: 5vw auto;
            box-shadow: darkgrey 0px 1px 3px 0px;
        }
    }

}

.pages {
    width: 150px;
    height: 100vh;
    box-sizing: border-box;
    padding: 10px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    p {
        font-size: var(--font_size_2);
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
    }

    a {
        width: 100%;
        height: 32px;
        border-bottom: 1PX solid #ebebeb;
        display: flex;
        align-items: center;
        font-size: var(--font_size_3);
        color: #333;
    }
}

.file_popup {
    z-index: 10000 !important;
}

::v-deep canvas {
    width: 100% !important;
}

::v-deep.snapshot-container .van-image-preview__image {
    background: #FFF;
}
</style>
