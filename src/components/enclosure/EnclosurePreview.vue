<template>
<div v-if="isSinglePre && isPreview" class="single-preview" :style="{ height: `calc(100vh - ${dsf.util.getOffsetTop()} - ${isShowAppFooter ? '1.2rem' : '0px'} - ${isTabType ? '0.88rem' : '0px'})` }">
    <single-preview :imgs="fileImgs"></single-preview>
</div>
<div class="preview-container" ref="previewContainer" v-else>
    <div class="preview-box" :id="timestamp" :ref="timestamp">
        <!-- 右侧操作 -->
        <div class="iconBox flex dc">
            <img src="../../../static/images/platform/voice.png" v-if="dsf.util.getClientType() == 'iPad'&&dsf.config.meetProjectconfig?.fileSameScreenFlag" alt="" @click="showSameClick">
            <img src="../../assets/imgs/full.png" alt="" @click="fullScreen" v-if="isShowFullScreen">
            <div v-if="file.isHandwrite > 0 && (formMeta||(!formMeta && isSignature))">
                <img v-if="isPreview" src="../../assets/imgs/edit.png" alt="" @click="writeOrPreview('w')">
                <img v-if="!isPreview" src="../../assets/imgs/preview.png" alt="" @click="writeOrPreview('p')">
            </div>
            <van-popover v-model="showPopover" trigger="click" placement="left" v-if="isPreview && (!isShowCurPerson|| (!isShowCurPerson && formMeta && formMeta.parameters && !formMeta.parameters.isShowCurPerson)) && (signConfigObj && signConfigObj.handWriteHis != '1') && instructorsList.length > 0  && !isHideInstructor">
                <p class="instructor">批示人</p>
                <van-checkbox-group v-model="personScreen" ref="checkboxGroup" @change="changeInstructorSel">
                    <van-checkbox v-for="item in instructorsList" :key="item.createUserId" :name="item.createUserId" icon-size="16px">{{item.createUName}}</van-checkbox>
                </van-checkbox-group>
                <template #reference>
                    <img src="../../assets/imgs/filter.png" alt="" @click.stop="isShowPopover">
                    <i class="dot" v-if="personScreen.length<instructorsList.length"></i>
                </template>
            </van-popover>
        </div>
        <div v-if="errored" style="text-align: center;">
            <commonempty :description="errorMsg"></commonempty>
            <van-button round type="primary" class="bottom-button" v-if="isRetry">自动重试({{count}}s)</van-button>
        </div>
        <div v-if="!errored && imgs.length>0" class="container" ref="container" style="background: #fff;">
            <!--  :style="{height: (!isPreview&&isSignature)?'14.8vw':'0vw'}" -->
            <div id="headerDiv" style="display: none;"></div>
            <div class="pageContainer" ref="pageContainer">
                <div class="pageViewer" ref="pageViewer" v-focus>
                    <div :class="['pinch-zoom',isFileImgMargin?'imgHasMargin':'imgNoMargin']" v-for="(img, idx) in imgs" :key="idx" :id="'page'+idx" :data-pid="idx+1" ref="pinchZoom">
                        <!-- <span>{{idx+1}}/{{imgs.length}}</span> -->
                        <img v-show="img.show" v-lazy="img.path" ref="viewImg" class="view-img" />
                        <!-- <embed :src="img" ref="viewImg" class="view-img" /> -->
                    </div>
                </div>
            </div>
            <!-- <div class="pageContainer" v-if="isPreview && !isSignature">
                <div class="pinch-zoom" v-for="(img, idx) in imgs" v-focus :key="idx" :id="'page'+idx" :data-pid="idx+1">
                    <span>{{idx+1}}/{{imgs.length}}</span>
                    <img v-lazy="img" ref="viewImg" class="view-img" />
                </div>
            </div> -->
        </div>
        <div class="catalogue" @click="show=true" v-show="isPreview && !errored">
            <van-icon name="coupon-o" />
        </div>
        <van-popup v-model="show" position="left" class="file_popup" get-container="body" :overlay-style="{'z-index':'9999'}">
            <div class="pages">
                <p>跳转至：</p>
                <!-- <a :href="'#page'+idx" @click="show=false" v-for="(img, idx) in imgs" :key="idx+'x'">第{{idx+1}}页</a> -->
                <a v-for="idx in pageLength" :key="idx+'x'" @click="goPageNum(idx)">第{{idx}}页</a>
            </div>
        </van-popup>
    </div>
    <van-popup v-model="showTableDialog" :style="{ height: '100%' }" position="bottom" get-container="#app">
        <van-sticky>
            <van-nav-bar @click-left="closeRecord" title="批注记录">
                <template #left>
                    <van-icon name="arrow-left" /><span>返回</span>
                </template>
            </van-nav-bar>
        </van-sticky>
        <div class="table-list" v-if="commentRecordList && commentRecordList.length>0">
            <div class="list-item" v-for="(item,index) in commentRecordList" :key="index">
                <div class="item-content">
                    <img v-lazy="item.base64" ref="contentImg" class="content-img" @click="imgPreview(item.base64)" />
                </div>
                <div class="item-text">
                    <div>
                        <p>
                            <van-icon name="user-o" />{{item.createUName}}
                        </p>
                    </div>
                    <div>
                        <p>
                            <van-icon name="clock-o" />{{item.createTime}}
                        </p>
                    </div>
                    <div>
                        <p>
                            <van-icon name="description" />第{{item.pageNum}}页
                        </p>
                        <span @click="goSnapshot(item)">快照查看</span>
                    </div>
                </div>
            </div>
        </div>
        <commonempty description="暂无批注记录" v-else />
    </van-popup>
    <!-- 快照查看 -->
    <van-popup v-model="showSnapshot" :style="{ height: '100%' }" position="bottom" get-container="#app">
        <van-sticky>
            <van-nav-bar @click-left="showSnapshot = false" title="快照查看">
                <template #left>
                    <van-icon name="arrow-left" /><span>返回</span>
                </template>
            </van-nav-bar>
        </van-sticky>
        <snapshot-preview :file="file" :form-info="formInfo" :formMeta="formMeta" :isShowFullScreen="true" :snapshotTime="recordTime" :curFileId="curFileId" :curPage="currentPage"></snapshot-preview>
    </van-popup>
    <van-image-preview v-model="showImgPreview" :images="previewImgs" closeable></van-image-preview>
    <screen-person v-if="showSame" @showSameClick="showSameClick" :meetingObj="meetingObj" :files="file"></screen-person>
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
// 防抖
const debounce = (fn, wait) => {
    let disabled = true;
    return function () {
        if (!disabled) return;
        disabled = false;
        fn.apply(this, arguments);
        setTimeout(() => {
            disabled = true;
        }, wait);
    };
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
import SnapshotPreview from "@/components/enclosure/SnapshotPreview";
import SinglePreview from "@/components/enclosure/SinglePreview";
import screenPerson from "../meetingPad/components/screenPerson.vue";
import('@/common/signatureMobile/style/signatureMobile.min.css')
import {
    mapState
} from "vuex";
export default {
    name: "EnclosurePreview",
    components: {
        SnapshotPreview,
        SinglePreview,
        screenPerson
    },
    props: {
        file: {
            type: Object,
            default: undefined
        },
        formInfo: {
            type: Object,
            require: true,
        },
        isPreview: { // 是否预览  true预览  false签批
            type: Boolean
        },
        officeModuleId: {
            type: String,
            default: ''
        },
        formMeta: { //用来拿到表单控件值
            type: Object,
            default: () => {}
        },
        isShowFullScreen: { //是否需要全屏按钮
            type: Boolean
        },
        isSignature: { //是否需有签批功能（非表单时配置）
            type: Boolean
        },
        isShowCurPerson: { //是否只显示当前人签批信息
            type: Boolean,
            default: false
        },
        isTabType: {
            type: Boolean,
            default: false
        },
        RouteLeave: {
            type: Boolean,
            default: true
        },
        leaderUser: { //只显示当前一个人的签批数据，传人员id
            type: String,
            default: ''
        },
        isShowAddPage: { //插件上是否展示增页按钮
            type: Boolean,
            default: true
        },
        meetingObj: { //会议同屏数据
            type: Object,
            default: () => {}
        },

    },
    data() {
        return {
            sumAry: [],
            dsfLoading: null,
            errored: false, //文件加载失败
            errorMsg: "", //文件错误提示
            imgs: [],
            show: false,
            signMobile: null,
            allNotionData: [], //全部用户的全部图层数据
            currentUserNotionData: [], //当前用户的全部图层数据
            otherUserNotionData: [], //非当前用户的全部图层数据
            addNotionData: [], //全部的增页图层数据
            count: -1,
            timer: null,
            allPageData: [], //所有页面签批数据
            autoLoadNameAndDate: "",
            currentScrollDom: 0, // 当前滚动到某页的dom
            commentRecordList: [], //批注记录
            showTableDialog: false,
            showImgPreview: false,
            previewImgs: [],
            showPopover: false,
            personScreen: [], //选中的批示人
            instructorsList: [], //批示人列表
            curFileId: '', //当前文件正确的id（签批模式下）
            showSnapshot: false, //文件快照
            recordTime: '',
            currentPage: 1,
            signConfigObj: {}, //签名信息及各个配置项
            pageLength: 0,
            isRetry: false, //文件预览是否重试
            timestamp: '',
            saveLoading: null,
            oldScrollTop: 0, //上一次滚动结束后的滚动距离
            scrollTop: 0, //当前的滚动距离
            user: dsf.util.loadSessionStore("user"),
            userCurSignData: [], //接口返回的当前用户的签批数据
            delPageId: [], //删除的增页的id
            fileImgs: [],
            showSame: false, //开启同屏
            signCurTabIndex: dsf.config.commonForm.dreamSign && dsf.config.commonForm.dreamSign.signCurTabIndex || -1, //签批插件默认选中的tab(不选中:-1, 手写:1, 文字:2, 签名:3)
            isHideInstructor: dsf.config.commonForm.dreamSign && dsf.config.commonForm.dreamSign.isHideInstructor, //是否隐藏批示人按钮
            isFileImgMargin: dsf.config.commonForm.dreamSign && dsf.config.commonForm.dreamSign.isFileImgMargin, //预览图片是否显示边距
        };
    },
    created() {
        let self = this;
        self.updateFileId();
        this.timestamp = 'box' + new Date().getTime();
    },
    watch: {
        listenChange(newVal, oldVal) {
            $("#headerDiv").hide();
            if (newVal && newVal['file'] != oldVal['file']) { //文件变化
                $('.preview-container .signature-mobile-vertical').remove(); //清除插件
                this.signMobile = null;
                this.updateFileId();
            } else if (newVal && newVal['file'] === oldVal['file']) {
                if (newVal['isPreview'] == false) {
                    // if (!this.isShowCurPerson || (this.formMeta && this.formMeta.parameters && !this.formMeta.parameters.isShowCurPerson)) {
                    // $('.preview-container .signature-mobile-vertical').remove();
                    // this.initSignatureMobile(); //文件不变，预览变签批，且不只显示当前人签批信息时，重新加载插件及数据
                    // } else {
                    $("#headerDiv").show();
                    this.signMobile.show();
                    this.isShowDelBtn(true); //显示删除增页的按钮
                    this.signMobile.changeBoardLock(false); //画板解锁
                    // }
                } else {
                    // if (document.querySelector('.preview-container')) document.querySelector('.preview-container').style.overflow = 'auto'; //防止页面不允许滑动
                    // if (this.$refs.previewContainer)
                    //     this.$refs.previewContainer.style.overflow = 'auto';
                    if ($('.preview-container .signature-mobile-vertical').length > 0) {
                        this.signMobile.hide(); //文件不变，签批变预览，只隐藏插件
                        this.signMobile.changeBoardDisplay(false);
                        this.isShowDelBtn(false); //隐藏删除增页的按钮
                        this.resetSignData(); // 签批变预览时，没有保存的批注数据删除，重新回填数据
                    } else {
                        this.init(); //签批退出保存后刷新页面及数据
                    }
                }
            }
            if (newVal['isPreview'] == false) {
                this.$emit('isShowEnclosureBtn', false)
            } else {
                this.$emit('isShowEnclosureBtn', true)
            }
        },
        scrollTop(newVal, oldVal) {
            setTimeout(() => {
                if (newVal == $('.preview-container').scrollTop()) {
                    // console.log("滚动结束")
                    this.oldScrollTop = newVal;
                    this.getPageNum();
                }
            }, 50)
            if (this.scrollTop == oldVal) {
                // console.log("滚动开始")
            }
        }
    },
    computed: {
        // 同时监听两个属性变化
        listenChange() {
            const {
                file,
                isPreview
            } = this
            return {
                file,
                isPreview
            }
        },
        isSinglePre() {
            return dsf.config.commonForm.thanPageSinglePre && this.imgs.length > dsf.config.commonForm.thanPageSinglePre
        },
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        }),
    },
    mounted() {},
    beforeRouteLeave(to, from, next) {
        // console.log(1111231654654654);
        next()
    },
    methods: {
        showSameClick() { // 开启关闭同屏
            this.showSame = !this.showSame
        },
        // 预览时加载签批数据或有签批功能时更新文件id
        updateFileId() {
            let self = this;
            let isSign = self.file.isHandwrite > 0 ? 1 : 0;
            self.dsfLoading = dsf.layer.loading();
            if ((!self.formMeta && self.isSignature) || isSign) {
                var param = {
                    infoId: self.file.infoId || '',
                    referId: self.file.id,
                    moduleId: self.file.moduleId,
                    fileId: self.file.id,
                    // addHandWrite: 1, //1 表示当前文件可以签批
                    officeModuleId: self.officeModuleId || '',
                    fileName: self.file.fileName || ''
                }
                if (self.isSignature || !self.isPreview) {
                    param['addHandWrite'] = 1; //只预览时不传该值
                }
                dsf.http
                    .get(`fn/hm/form/getFileInfo`, param)
                    .done(res => {
                        if (res.type == "success") {
                            self.curFileId = res.data.qpFileId;
                            self.init();
                            self.$emit('closePop')
                        } else {
                            self.errored = true;
                            self.errorMsg = res.message + "，请联系管理员！";
                            if ($('.preview-container .signature-mobile-vertical')) {
                                $('.preview-container .signature-mobile-vertical').remove()
                            }
                        }
                    })
                    .always(() => {
                        dsf.layer.closeLoading(self.dsfLoading);
                    });
            } else {
                self.curFileId = self.file.id;
                self.init();
            }
        },
        // 图片预览+加载签批插件
        init() {
            let self = this;
            // self.errored = false;
            self.currentScrollDom = 0;
            self.imgs = [];
            self.dsfLoading = dsf.layer.loading();
            $('.preview-container .container').empty()
            $('.preview-container .signature-mobile-vertical').remove();
            // if (document.querySelector('.preview-container')) document.querySelector('.preview-container').style.overflow = 'auto'; //防止页面不允许滑动
            // if (self.$refs.previewContainer)
            //     self.$refs.previewContainer.style.overflow = 'auto';
            dsf.http
                .get(`fn/office/image/previewAll`, {
                    fileId: self.curFileId,
                    filename: self.file.fileName || "",
                    initDataSource: "",
                    officeModuleId: self.officeModuleId, //移动网盘的预览该值必须传
                })
                .done(res => {
                    if (res.type == "success") {
                        self.$emit('closePop')
                        self.errored = false;
                        self.isRetry = false;
                        let data = []
                        res.data.pages.forEach((item, index) => {
                            data.push({
                                path: dsf.url.getWebPath(item.url),
                                // show: [0, 1, 2].includes(index) ? true : false
                                show: true
                            })
                        })
                        self.imgs = data
                        self.fileImgs = self.imgs.map(item => item.path);
                        // console.log(self.imgs)
                        self.$nextTick(() => {
                            if (self.$refs.previewContainer)
                                self.$refs.previewContainer.addEventListener('scroll', self.handleScroll.bind(this, self), true)
                            if (self.$refs.pinchZoom && self.$refs.pinchZoom.length >= res.data.pages.length) {
                                dsf.layer.closeLoading(self.dsfLoading);
                                if (self.formMeta || (!self.formMeta && self.isSignature)) {
                                    total = [0]; //默认滑动后续不再加载图片首页
                                    self.getPageItem();
                                    //非表单时需要签批功能，也会加载签批插件及数据
                                    self.getCurrentUserSignatureInfo(() => {
                                        self.initSignatureMobile();
                                    })
                                } else {
                                    self.sortPageNum()
                                }
                                // self.touchZoom();
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
            let domAll = document.querySelectorAll('.pinch-zoom');
            domAll.forEach(ele => {
                scrollary.push(ele.offsetTop)
            })
        },
        //自动重试
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
        touchZoom() {
            let that = this;
            // 双指缩放
            new TouchMoveScale({
                touchDom: that.$refs['pageContainer'],
                transformDom: that.$refs['pageContainer'],
                transformData: {
                    x: 0,
                    y: 0,
                    scale: 1
                },
                minScale: 1,
                maxScale: 5,
                isSign: false
            })
        },
        // 初始化签批插件
        initSignatureMobile(selector) {
            let self = this;
            if (!selector) {
                selector = "pinchZoom";
            }
            //参数1：载体dom，目前只支持传null，传null会直接把dom插到body根目录，使用fiexd定位
            //参数2：是否横屏，true:横屏模式，false：竖屏模式
            //参数3：手写签批配置项，暂时为{}即可，无需传其他参数
            //参数4：画板载体集合，只适用于竖屏
            //参数5：是否开启遮罩，只适用于竖屏，暂无效
            //参数6：isAutoSign是否自动署名 zoomNum:放大比例 ispad:是否pad端  autographObject:插入文字的字体字号颜色（读取服务器中上次用户的选择）
            let isPad = dsf.util.getClientType() == 'iPad' ? true : false;
            let autoLoadNameAndDate = (this.formMeta && this.formMeta.parameters && this.formMeta.parameters.autoLoadNameAndDate > 0) ? true : false;
            // document.querySelector('.preview-box') self.$refs[self.timestamp]
            if (self.$refs[selector]) {
                // console.log(document.querySelectorAll('.pinch-zoom').length, '检查dom个数');
                this.signMobile = new SignatureMobile(self.$refs[self.timestamp], false, {}, self.$refs[selector], false, {
                    isAutoSign: autoLoadNameAndDate,
                    zoomNum: 2,
                    ispad: isPad,
                    isPaging: true, // 开启插件分页加载canvas
                    toolFont: ['手写', '文字', '签名', '增页', '记录', '保存'],
                    autographObject: {
                        fontFamily: self.signConfigObj['GW-GENERAL-0033'] ? self.signConfigObj['GW-GENERAL-0033'] : '',
                        fontSize: self.signConfigObj['GW-GENERAL-0034'] ? (self.signConfigObj['GW-GENERAL-0034'].includes('px') ? self.signConfigObj['GW-GENERAL-0034'] : self.signConfigObj['GW-GENERAL-0034'] + 'px') : '',
                        color: self.signConfigObj['GW-GENERAL-0035'] ? self.signConfigObj['GW-GENERAL-0035'] : ''
                    }
                });
                // 用户签名图片
                if (this.signConfigObj.imageData && this.signConfigObj.imageData != "") {
                    this.signMobile.autographImage = this.signConfigObj.imageData;
                } else {
                    this.signMobile.autographFont = this.signConfigObj.signUserName
                }
                // this.signMobile.autographImage = require('../../assets/imgs/sign.jpg')
                this.signMobile.autographDate = this.signConfigObj.signTimeShort; //设置签名日期
                this.signMobile.autographDateFont = `${this.signConfigObj['SYS-OPINION-0013'] ? (this.signConfigObj['SYS-OPINION-0013'].includes('px') ? this.signConfigObj['SYS-OPINION-0013'] : this.signConfigObj['SYS-OPINION-0013'] + 'px') : ''} ${this.signConfigObj['SYS-OPINION-0012'] ? this.signConfigObj['SYS-OPINION-0012'] : ''}`; //设置签名日期的字号和字体
                this.signMobile.autographDateColor = this.signConfigObj['SYS-OPINION-0014'] ? this.signConfigObj['SYS-OPINION-0014'] : ''; //设置签名日期的字体颜色

                let btnAry = this.signConfigObj['SYS-OPINION-0015'] == undefined ? [0, 1, 2, 3, 4] : (this.signConfigObj['SYS-OPINION-0015'] ? this.signConfigObj['SYS-OPINION-0015'].split(',').map(Number) : []); //签批插件可用按钮 0手写批注 1插入文字，2插入签名，3增页，4批注记录；多个,分隔"
                this.signMobile.hiddenToolIndexList = [0, 1, 2, 3, 4].filter(item => !btnAry.includes(item)); //要隐藏的索引值 对应关系是：[手写,文字,签名,增页,记录,退出]

                // 展示列表时或弹出层显示时，工具栏距顶变为46px
                let topdistance = 0;
                if (this.$store.state.isShowAppHeader)
                    topdistance = 46;
                document.querySelector('.smt-tab').style.top = JSON.stringify(this.isTabType ? topdistance + 50 : 46) + 'px';

                //只显示当前人批注时不添加【批注记录】模块 （会议或备忘录使用时）
                let arr = JSON.parse(JSON.stringify(this.signMobile.hiddenToolIndexList));
                if (this.isShowCurPerson || (this.formMeta && this.formMeta.parameters && this.formMeta.parameters.isShowCurPerson)) {
                    if (!this.signMobile.hiddenToolIndexList.includes(4)) {
                        arr.push(4)
                    }
                    this.signMobile.hiddenToolIndexList = arr; //要隐藏的索引值 对应关系是：[手写,文字,签名,增页,记录,退出]
                }
                if (!this.isShowAddPage && !this.signMobile.hiddenToolIndexList.includes(3)) {
                    arr.push(3);
                    this.signMobile.hiddenToolIndexList = arr;
                }

                //签名展示模式（canvas则是使用canvas绘制，其他则是使用图片+文本拼接）
                this.signMobile.autographType = "canvas";
                //多画板签批情况下的层级
                this.signMobile.baseZIndex = 99;
                // $("#headerDiv").show();
                //当前签批显示的元素起始索引
                this.signMobile.currentElementDataStartZIndex = 20;

                //显示顶部插件 (openHandwrite对应个人设置里面开启手写签批)
                $("#headerDiv").height($('.smt-tab').height());
                if ((this.formMeta || (!this.formMeta && this.isSignature)) && !this.isPreview) {
                    this.signMobile.show();
                    $("#headerDiv").show();
                    // $("#headerDiv").height($('.smt-tab').height());
                }
                //设置默认选中的tab，设置index(签批：1，文字：2，签名：3)
                this.signMobile.currentTabIndex = this.isPreview == false ? this.signCurTabIndex : -1;
                //增加了使用具体像素转换，可以传宽度和高度，不传会自动获取宽高
                //参数1：width:number|null
                //参数2：height:number|null
                this.signMobile.setContainerWH();
                this.signMobile.activeShow = function (val) {
                    // if (document.querySelector('.preview-container'))
                    // document.querySelector('.preview-container').style.overflow = val ? 'hidden' : 'auto'; //手写时不允许滑动页面

                    // if (self.$refs.previewContainer)
                    //     self.$refs.previewContainer.style.overflow = val ? 'hidden' : 'auto';
                }
                this.setAddsheets(selector); //插件的增页回调
                this.setCompleteHandle(); //指定保存退出签批的回调
                this.getCurrentUserOpinionList(); //获取当前用户常用意见列表
                this.setOpinionEdit(); //指定常用意见的编辑回调
                this.setOpinionAdd(); // 添加常用意见模板
                this.setOpinionDel(); // 常用意见删除
                this.getAllNotionData(selector); //获取全部签批图层的数据
                this.recordHandle(); // 批注记录
            }
        },
        getMaxNum(val) {
            let resulrAry = [...new Set(scrollary)]
            let ary = resulrAry.filter(item => val >= item).slice(-1);
            return resulrAry.indexOf(ary[0]);
        },
        // 获取当前滚动到页面索引
        getPageNum() {
            let currentScrollDom = this.getMaxNum($('.preview-container').scrollTop())
            let i = Math.max(currentScrollDom, 0);
            let num = i + 1;
            this.currentScrollDom = i;
            if (this.signMobile)
                this.signMobile._limitCanvaspage = num;
            // if (!total.includes(i)) {
            //     this.scrollBackData(num);
            // }!total.includes(i) && total.push(i)
        },
        // 首先判断当前dom是否已经包含了要添加的类
        // hasClass(el, className) {
        //     let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        //     return reg.test($(el).className)
        // },
        // 滚动回填数据
        // scrollBackData(val) {
        //     let dom = document.querySelectorAll('.pinch-zoom')[val - 1];
        //     if (dom && !this.hasClass(dom, '.signature-element-class')) {
        //         this.renderCanvasData({
        //             currentUserData: this.currentUserNotionData,
        //             otherUserData: this.otherUserNotionData
        //         })
        //     }
        // },
        handleScroll: throttle((self) => {
            if (self.$refs['pinchZoom'] && self.$refs['pinchZoom'].length != 1) {
                self.$nextTick(() => {
                    if ($('.preview-container').scrollTop() == 0) {
                        self.currentScrollDom = 0;
                    }
                    // else {
                    //     $('.preview-container .pinch-zoom').each(function (i, ele) {
                    //         if ($('.preview-container').scrollTop() > ($('.preview-container .pinch-zoom').outerHeight(true) * i)) {
                    //             self.currentScrollDom = i;
                    //         }
                    //     })
                    // }
                    // self.imgs.forEach((item, index) => {
                    //     if ([self.currentScrollDom, self.currentScrollDom + 1, self.currentScrollDom - 1, self.currentScrollDom + 2, self.currentScrollDom - 2].includes(index)) {
                    //         self.$set(item, "show", true)
                    //     } else {
                    //         self.$set(item, "show", false)
                    //     }
                    // })
                    self.scrollTop = $('.preview-container').scrollTop();

                    // self.getPageNum();
                    // let dom = self.$refs['pinchZoom'][self.currentScrollDom];
                    // if (dom && !$(dom).has(".signature-element-class").length) {
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
        //获取全部签批图层的数据
        getAllNotionData(selector) {
            let self = this;
            self.userCurSignData = [];
            self.delPageId = [];
            // dsf.layer.loading();
            self.dsfLoading = dsf.layer.loading();
            var data = {
                papersId: self.curFileId, //文件id
                flowId: self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
                // nodeId: self.formInfo ? self.formInfo.nodeId : (self.file.nodeId?self.file.nodeId:''),
                userId: "",
                moduleId: self.formInfo ? self.formInfo.moduleId : (self.file.moduleId ? self.file.moduleId : ''),
            }
            if (self.leaderUser) {
                data['leaderUser'] = self.leaderUser;
            }
            dsf.http.get('fn/hm/notation/data/all', data)
                .then(res => {
                    dsf.layer.closeLoading(self.dsfLoading);
                    if (res && res.data && res.data.type == 'success') {
                        var allData = res.data.data.all;
                        var currentUserData = res.data.data.userData;
                        var currentUserDataIds = currentUserData.length > 0 ? currentUserData.map(item => item.id) : self.user.user_id;
                        var otherUserData = allData.filter(item => !currentUserDataIds.includes(item.id))
                        self.insetChoosePeople(res.data.data); //批注人筛选
                        var addPageData = [];
                        let allPageData = []; // 获取签批所有数据
                        allData.forEach(item => {
                            var itemPacket = JSON.parse(item.packetContent);
                            itemPacket.forEach((_item, num) => {
                                _item.createUserId = item.createUserId;
                                _item.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId; //是否当前用户的增页
                            });
                            allPageData.push(...itemPacket)
                            addPageData = addPageData.concat(itemPacket.filter(function (_item, index) {
                                return _item.addPageId != '';
                            }))
                        });
                        self.allPageData = allPageData;
                        self.addNotionData = addPageData;
                        // console.log(self.allPageData, '回显数据');
                        currentUserData.map(item => {
                            if (item.packetContent && item.packetContent != "") {
                                var packet = JSON.parse(item.packetContent); //全部画板的数据
                                self.userCurSignData = JSON.parse(JSON.stringify(packet)); //获取当前人全部的签批数据
                                if (packet && packet.length > 0) {
                                    packet.forEach(k => {
                                        k.createUserId = item.createUserId
                                        k.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId
                                        k.id = item.id
                                    })
                                }
                                self.$set(item, 'packetContent', JSON.stringify(packet))
                            }
                            return item
                        });
                        //处理非自己的数据
                        otherUserData.forEach(function (item, index) {
                            if (item.packetContent && item.packetContent != "") {
                                var packet = JSON.parse(item.packetContent); //全部画板的数据
                                if (packet && packet.length > 0) {
                                    packet.forEach(k => {
                                        k.createUserId = item.createUserId
                                        k.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId
                                        k.id = item.id
                                    })
                                }
                                self.$set(item, 'packetContent', JSON.stringify(packet))
                            }
                        })
                        self.allNotionData = allData;
                        self.currentUserNotionData = currentUserData;
                        self.otherUserNotionData = otherUserData;

                        if (self.leaderUser) {
                            let signData = allData.filter(item => item.id == self.leaderUser);
                            signData.forEach(function (item, index) {
                                if (item.packetContent && item.packetContent != "") {
                                    var packet = JSON.parse(item.packetContent);
                                    if (packet && packet.length > 0) {
                                        packet.forEach(k => {
                                            k.createUserId = item.createUserId
                                            k.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId
                                            k.id = item.id
                                        })
                                    }
                                    self.$set(item, 'packetContent', JSON.stringify(packet))
                                }
                            })
                            self.renderCanvasData({
                                currentUserData: self.leaderUser == self.user.user_id ? signData : [],
                                otherUserData: self.leaderUser == self.user.user_id ? [] : signData
                            })
                        } else {
                            self.renderCanvasData({
                                currentUserData: currentUserData,
                                otherUserData: otherUserData
                            })
                        }
                        let newary = JSON.parse(JSON.stringify(allPageData));
                        let selfId = self.user.user_id;
                        let selfCurrentData = newary.filter(item => item.createUserId == selfId),
                            otherCurrentData = newary.filter(item => item.createUserId != selfId);
                        // self.signMobile.setPageHistoryData(selfCurrentData, otherCurrentData); //插件回填自己和他人的数据
                        if (!self.isShowCurPerson || (!self.isShowCurPerson && self.formMeta && self.formMeta.parameters && !self.formMeta.parameters.isShowCurPerson)) {
                            self.signMobile.setPageHistoryData(selfCurrentData, otherCurrentData); //插件回填自己和他人的数据
                        } else {
                            self.signMobile.setPageHistoryData(selfCurrentData, []); //只显示当前人信息时不回显其他人数据
                        }
                    } else {
                        dsf.layer.toast("获取失败");
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.dsfLoading);
                });
        },
        // 页码排序
        sortPageNum() {
            this.$nextTick(() => {
                this.pageLength = $('.pinch-zoom').length;
                $('.page-num').remove();
                let style1 = 'width: 60px;height: 24px;display: flex;align-items: center;justify-content: center;background: #FFF;border-radius: 12px;font-size: var(--font_size_3);color: #999;position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);box-shadow: 0 0 10px #ccc;';
                let style2 = 'width: 90px;height: 36px;display: flex;align-items: center;justify-content: center;background: #FFF;border-radius: 18px;font-size: 18px;color: #999;position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);box-shadow: 0 0 10px #ccc;';
                let style = dsf.util.getClientType() == 'iPad' ? style2 : style1;
                $('.pinch-zoom').each((index, ele) => {
                    let html = `<span class="page-num" style="${style}">${index+1}/${this.pageLength}</span>`;
                    $(ele).prepend(html)
                })
            })
        },
        goPageNum(index) {
            this.show = false;
            let element = document.querySelectorAll('.pinch-zoom')[index - 1]
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100)

        }, // 获取批注记录
        renderRecord(data) {
            let pageData = JSON.parse(JSON.stringify(data));
            let self = this;
            self.dsfLoading = dsf.layer.loading();
            self.commentRecordList = [];
            let dom = this.$refs.pinchZoom;
            let pageArr = [];
            dom.forEach(item => {
                pageArr.push(item.getAttribute('data-pid'));
            })
            var data = {
                papersId: self.curFileId, //文件id
                flowId: self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
                // nodeId: self.formInfo ? self.formInfo.nodeId : (self.file.nodeId?self.file.nodeId:''),
                userId: "",
            }
            let recordArr = [];
            dsf.http.get('fn/hm/notation/data/history', data)
                .then(res => {
                    if (res && res.data && res.data.type == 'success') {
                        var allData = res.data.data.all;
                        allData.forEach(item => {
                            var itemPacket = JSON.parse(item.packetContent);
                            if (itemPacket && itemPacket.length > 0) {
                                itemPacket.forEach((_item, num) => {
                                    let curPageNum = pageArr.findIndex(num => num == (_item.addPageId || _item.papersPage)) || '';
                                    _item.createUName = item.createUName;
                                    _item.createTime = item.createTime;
                                    if (_item.packetContent) {
                                        _item.data = _item.packetContent;
                                    }
                                    if (_item.data && _item.data.length > 0) {
                                        _item.data.forEach((ele, i) => {
                                            ele.createUName = _item.createUName;
                                            ele.createTime = _item.createTime;
                                            ele.pageNum = curPageNum + 1;
                                            if (!ele.randomEditiId) {
                                                ele['randomEditId'] = ele.randomId;
                                            }
                                            recordArr.push(ele);
                                        })
                                    }
                                })
                            }
                        })
                        let newArr = recordArr.filter((item, index) => index === recordArr.findIndex((ele) => item.randomEditId === ele.randomEditId));
                        self.commentRecordList = newArr;
                        dsf.layer.closeLoading(self.dsfLoading);
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.dsfLoading);
                });

            // pageData.forEach(item => {
            //     var itemPacket = JSON.parse(item.packetContent);
            //     itemPacket.forEach((_item, num) => {
            //         let curPageNum = pageArr.findIndex(num => num == (_item.addPageId || _item.papersPage)) || '';
            //         if (_item.packetContent) {
            //             _item.data = _item.packetContent;
            //         }
            //         if (_item.data && _item.data.length > 0) {
            //             _item.data.forEach((ele, i) => {
            //                 let obj = {
            //                     index: i + 1,
            //                     time: ele.updateDate || '',
            //                     name: item.createUName || '',
            //                     content: ele.base64 || '',
            //                     pageNum: curPageNum + 1,
            //                 }
            //                 self.commentRecordList.push(obj)
            //             })
            //         }
            //     });
            // });
        },
        // 获取全部批示人
        insetChoosePeople(row) {
            const {
                all,
                userData
            } = row;
            this.instructorsList = all.map(item => ({
                id: item.id,
                createUName: item.createUName,
                createUserId: item.createUserId,
                active: true
            }))
            this.personScreen = this.instructorsList.map(item => {
                if (item.active)
                    return item.createUserId
            })
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
                isSelf,
                isBack,
            } = option;
            var pageItem = document.querySelector('.pinch-zoom');
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
            if (isSelf) {
                var deleteButton = document.createElement("div");
                deleteButton.className = "delete-page-btn mine-delete-btn";
                deleteButton.style = "position: absolute;z-index:999;right:0;top:5vw;background:#C33E32;width:90px;height:28px;line-height:28px;color:#FFFFFF;text-align:center;font-size: var(--font_size_3);cursor:pointer;"
                deleteButton.innerHTML = '删除增页';
                newPageElement.appendChild(deleteButton); //添加删页按钮
                $(deleteButton).click(self.deletePageHandler).mousedown(function (e) {
                    e.stopPropagation();
                });
            }

            var pagesList = this.$refs['pageViewer'];
            switch (addPosition.site) {
                case '1':
                    if (isBack) {
                        let current = addPosition.pid ? $(`.preview-container .pinch-zoom[data-pid=${addPosition.pid}]`)[0] : ''
                        if (current) {
                            pagesList.insertBefore(newPageElement, current)
                        } else {
                            pagesList.prepend(newPageElement);
                        }
                    } else {
                        const dom = document.querySelectorAll('.pinch-zoom')[addPosition.target]
                        pagesList.prepend(newPageElement); //插入首页
                        addPosition.pid = dom.getAttribute('data-pid')
                    }
                    break
                case '2': // 插入页前
                    if (isBack) {
                        let current = addPosition.pid ? $(`.preview-container .pinch-zoom[data-pid=${addPosition.pid}]`)[0] : ''
                        if (!current) {
                            this.sumAry.push(item);
                        } else {
                            pagesList.insertBefore(newPageElement, current)
                        }
                    } else {
                        const dom = document.querySelectorAll('.pinch-zoom')[addPosition.target]
                        pagesList.insertBefore(newPageElement, dom)
                        addPosition.pid = dom.getAttribute('data-pid')
                    }
                    break
                case '3': // 插入页后
                    if (isBack) {
                        if (addPosition.pid) {
                            let current = addPosition.pid ? $(`.preview-container .pinch-zoom[data-pid=${addPosition.pid}]`)[0] : ''
                            if (!current) {
                                this.sumAry.push(item);
                            } else {
                                pagesList.insertBefore(newPageElement, current)
                            }
                        } else {
                            pagesList.appendChild(newPageElement); //插入尾页
                        }
                    } else {
                        let domAfter = document.querySelectorAll('.pinch-zoom')[addPosition.target + 1];
                        if (domAfter) {
                            pagesList.insertBefore(newPageElement, domAfter);
                            addPosition.pid = domAfter.getAttribute('data-pid')
                        } else {
                            pagesList.appendChild(newPageElement); //插入尾页
                        }
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
            let dom = document.querySelectorAll('.pinch-zoom');
            this.signMobile.changeInfoPageDom(dom); //重新计算页面dom
            this.getPageItem();
            callback && callback(board)
        },
        isShowDelBtn(type) {
            if ($('.delete-page-btn').length > 0) {
                $('.delete-page-btn').each(item => {
                    if (type) {
                        $('.mine-delete-btn')[item].style.display = 'block'
                    } else {
                        $('.delete-page-btn')[item].style.display = 'none';

                    }
                })
            }
        },
        //删除增页
        deletePageHandler(e) {
            let self = this;
            var target = e.currentTarget.parentElement;
            dsf.layer.confirm({
                message: '确定要删除增页吗？',
                className: 'delDialog',
            }, () => {
                dsf.http.get("fn/hm/addPage/del", {
                        id: target.dataset.pid
                    })
                    .then(res => {
                        if (res && res.data && res.data.type == 'success') {
                            self.signMobile.deleteChildBoard(target);
                            target.remove();
                            self.delPageId.push(target.dataset.pid)
                            dsf.layer.toast("删除成功");
                            self.sortPageNum()
                        } else {
                            dsf.layer.toast("删除失败");
                        }
                    })
                    .error(error => {})
                    .always(() => {

                    });
            }, () => {})
        },
        //插件的增页回调
        setAddsheets(selector) {
            let self = this;
            let _loading = dsf.layer.loading();
            self.signMobile.addsheetsHandle = function (val) {
                var currentLength = document.querySelectorAll('[data-new="1"]').length;
                var data = {
                    papersId: self.curFileId,
                    showOrder: currentLength + 1
                }
                dsf.http.get("fn/hm/addPage/save", data)
                    .then(res => {
                        if (res && res.data && res.data.type == 'success') {
                            self.handleCreateNewPage(res.data.data, res.data.data.id, {
                                addPosition: {
                                    target: self.currentScrollDom,
                                    site: val.val,
                                    pid: ''
                                },
                                isMove: true,
                                isSelf: true,
                                isBack: false
                            }, function () {
                                dsf.layer.toast("增页成功");
                                self.sortPageNum()
                            })
                        } else {
                            dsf.layer.toast("操作失败");
                        }
                    })
                    .error(error => {})
                    .always(() => {
                        dsf.layer.closeLoading(_loading);
                    });
            }
        },
        //保存之前对比多人签批数据
        async getCoverData(curUserData) {
            let self = this;
            let flag = false; //无覆盖
            let otherPacketData = []; //其他人签批图层数据
            let curPacketData = []; //当前所有签批图层数据
            let curSignData = JSON.parse(JSON.stringify(curUserData));
            let otherUserNotionData = JSON.parse(JSON.stringify(this.otherUserNotionData));

            // 当前人已签批的内容
            curSignData.forEach(item => {
                if (item.data) {
                    item['packetContent'] = item.data;
                    delete item.data;
                }
                if (item.packetContent && item.packetContent.length > 0) {
                    item.packetContent.forEach(ele => {
                        ele['paperPageId'] = item.papersPage || item.addPageId;
                    })
                    curPacketData.push(...item.packetContent)
                }
            })
            // 其他人已签批的内容
            otherUserNotionData.forEach(item => {
                if (item.packetContent && item.packetContent != "") {
                    var packet = JSON.parse(item.packetContent); //全部画板的数据
                    if (packet && packet.length > 0) {
                        packet.forEach(k => {
                            if (k.data) {
                                k['packetContent'] = k.data;
                                delete k.data;
                            }
                            if (k.packetContent && k.packetContent.length > 0) {
                                k.packetContent.forEach(ele => {
                                    ele['paperPageId'] = k.papersPage || k.addPageId;
                                })
                                curPacketData.push(...k.packetContent)
                            }
                        })
                    }
                }
            })
            let curAllRandomId = curPacketData.map(item => item.randomId); //当前所有图层randomId
            var data = {
                papersId: self.curFileId, //文件id
                flowId: self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
                // nodeId: self.formInfo ? self.formInfo.nodeId : (self.file.nodeId?self.file.nodeId:''),
                userId: "",
                moduleId: self.formInfo ? self.formInfo.moduleId : (self.file.moduleId ? self.file.moduleId : ''),
            }
            if (self.leaderUser) {
                data['leaderUser'] = self.leaderUser;
            }
            await dsf.http.get('fn/hm/notation/data/all', data)
                .then(res => {
                    if (res && res.data && res.data.type == 'success') {
                        var allData = res.data.data.all;
                        var currentUserData = res.data.data.userData;
                        var currentUserDataIds = currentUserData.length > 0 ? currentUserData.map(item => item.id) : this.user.user_id;
                        var otherUserData = allData.filter(item => !currentUserDataIds.includes(item.id))
                        otherUserData.forEach(function (item, index) {
                            if (item.packetContent && item.packetContent != "") {
                                var packet = JSON.parse(item.packetContent); //全部画板的数据
                                if (packet && packet.length > 0) {
                                    packet.forEach(ele => {
                                        if (ele.data) {
                                            ele['packetContent'] = ele.data;
                                            delete ele.data;
                                        }
                                        if (ele.packetContent && ele.packetContent.length > 0) {
                                            ele.packetContent = ele.packetContent.filter(val => !curAllRandomId.includes(val.randomId));
                                            ele.packetContent.forEach(k => {
                                                k['paperPageId'] = ele.papersPage || ele.addPageId;
                                            })
                                            otherPacketData.push(...ele.packetContent);
                                        }

                                    })
                                }
                                self.$set(item, 'packetContent', JSON.stringify(packet))
                            }
                        })
                        // 回显其他人已保存的数据
                        self.renderCanvasData({
                            otherUserData: otherUserData
                        })
                    }
                })
            otherPacketData.some(item => {
                curPacketData.some(ele => {
                    flag = (ele.paperPageId == item.paperPageId) ? self.checkIntersect(ele, item) : false;
                    return flag; //true跳出循环
                })
                return true;
            })
            if (flag) {
                dsf.layer.alert({
                    message: '签批内容有重叠，请调整位置！',
                    className: 'delDialog',
                }, () => {

                })
            } else {
                self.saveNotion(curUserData);
            }

        },
        checkIntersect(rectA, rectB) {
            let maxX, maxY, minX, minY;

            maxX = rectA.minXRatio + rectA.widthRatio >= rectB.minXRatio + rectB.widthRatio ? rectA.minXRatio + rectA.widthRatio : rectB.minXRatio + rectB.widthRatio;
            maxY = rectA.minYRatio + rectA.heightRatio >= rectB.minYRatio + rectB.heightRatio ? rectA.minYRatio + rectA.heightRatio : rectB.minYRatio + rectB.heightRatio;
            minX = rectA.minXRatio <= rectB.minXRatio ? rectA.minXRatio : rectB.minXRatio;
            minY = rectA.minYRatio <= rectB.minYRatio ? rectA.minYRatio : rectB.minYRatio;
            //true 有覆盖
            if (maxX - minX <= rectA.widthRatio + rectB.widthRatio && maxY - minY <= rectA.heightRatio + rectB.heightRatio) {
                return true
            } else {
                return false
            }
        },
        //指定保存退出签批的回调(保存全部画板数据)
        setCompleteHandle(val) {
            let self = this;
            // let pnId = (self.formMeta && self.formMeta.parameters && self.formMeta.parameters.pnId) ? self.formMeta.parameters.pnId : "";
            $('.smt-tab-exit').click(() => {
                self.saveLoading = dsf.layer.loading('保存中');
            })
            if (val) {
                // 表单发送时调用
                var result = self.signMobile.getAllData(); //returnData签批数据  option字体信息
                console.log(result, '保存数据');
                self.handleSaveData(result.returnData); // 处理签批完保存的数据
                self.saveFontStyle(result.option)
            } else {
                self.signMobile.completeHandle = function (result, option) {
                    console.log(result, '保存数据--只会返回自己的')
                    self.handleSaveData(result); // 处理签批完保存的数据
                    self.saveFontStyle(option);
                    return true;
                }
            }
        },
        // 处理签批完保存的数据
        handleSaveData(result) {
            let addIdAry = this.userCurSignData.map(ele => ele.addPageId).filter(id => id && id.trim()); //历史所有增页的id
            let addNewPage = []; //新增的增页数据
            let afterDelData = []; //删除增页操作后的数据
            if (this.userCurSignData.length >= result.length) {
                result.forEach(ele => {
                    if (ele.addPageId && !addIdAry.includes(ele.addPageId)) {
                        ele['packetContent'] = ele.data;
                        delete ele.data;
                        addNewPage.push(ele);
                    }
                })
                this.userCurSignData.forEach(item => {
                    result.forEach(ele => {
                        // 增页用addPageId比较
                        if ((item.papersPage && ele.papersPage && item.papersPage == ele.papersPage) || (!item.papersPage && !ele.papersPage && item.addPageId == ele.addPageId)) {
                            item.packetContent = ele.data || ele.packetContent;
                        }
                    })
                    if (!this.delPageId.includes(item.addPageId)) { //有删除的增页时，保存数据中要去掉
                        afterDelData.push(item)
                    }
                })
            } else {
                result.forEach(ele => {
                    ele['packetContent'] = ele.data;
                    delete ele.data;
                });
            }

            if (this.isShowCurPerson || (this.formMeta && this.formMeta.parameters && this.formMeta.parameters.isShowCurPerson)) { //
                if (this.userCurSignData.length >= result.length) {
                    let allSaveData = afterDelData.concat(addNewPage); //保存给接口数据
                    this.saveNotion(allSaveData);
                } else {
                    this.saveNotion(result);
                }
            } else {
                if (this.userCurSignData.length >= result.length) {
                    let allSaveData = afterDelData.concat(addNewPage); //保存给接口数据
                    this.getCoverData(allSaveData);
                } else {
                    this.getCoverData(result);
                }
            }
        },
        // 保存图层
        saveNotion(data, val) {
            let self = this;
            // let packet = JSON.parse(data.packetContent);
            // packet.forEach(ele => {
            //     ele['packetContent'] = ele.data;
            //     delete ele.data;
            // });
            let obj = {
                "imgData": "",
                "type": 3,
                "content": '',
                "papersId": self.curFileId,
                "flowId": self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
                "nodeId": self.formInfo ? self.formInfo.nodeId : (self.file.nodeId ? self.file.nodeId : ''),
                "packetContent": JSON.stringify(data),
                "moduleId": self.formInfo ? self.formInfo.moduleId : (self.file.moduleId ? self.file.moduleId : ''),
                // "pnId": pnId
            }
            if (self.currentUserNotionData && self.currentUserNotionData.length > 0) {
                obj["id"] = self.currentUserNotionData[0].id; //传id为update,不传为insert
            }
            obj['pnId'] = (self.formMeta && self.formMeta.parameters && self.formMeta.parameters.pnId) ? self.formMeta.parameters.pnId : "";
            // data.packetContent = JSON.stringify(packet);

            // let saveloading = dsf.layer.loading('保存中...');
            console.log(obj)
            dsf.http.post("fn/hm/notation/save", obj)
                .then(res => {
                    // $(".delete-page-btn").hide();
                    if (res && res.data && res.data.type == 'success') {
                        $("#headerDiv").hide();
                        $('.preview-container .signature-mobile-vertical').remove();
                        dsf.layer.closeLoading(self.saveLoading);
                        dsf.layer.toast('保存成功', true, function () {
                            setTimeout(() => {
                                self.writeOrPreview('p');
                            }, 1500)
                        })
                    } else {
                        dsf.layer.toast("获取失败");
                        dsf.layer.closeLoading(self.saveLoading);
                    }
                })
                .error(error => {
                    console.log(error)
                })
                .always(() => {
                    dsf.layer.closeLoading(self.saveLoading);
                });
        },
        //获取当前用户常用意见列表
        getCurrentUserOpinionList() {
            let self = this;
            dsf.http.post("fn/hm/customOpinion/list", {}).then(res => {
                if (res && res.data && res.data.code == 0) {
                    self.signMobile.opinionList = res.data.data;
                }
            });
        },
        // 获取签名信息
        getCurrentUserSignatureInfo(callback) {
            let self = this;
            dsf.http.get("fn/hm/sign/config", {}).then(res => {
                if (res && res.data && res.data.type == 'success') {
                    self.signConfigObj = res.data.data;
                    callback && callback();
                }
            });
        },
        // 常用意见保存
        customOpinionSave(object) {
            let self = this;
            dsf.http.post("fn/hm/customOpinion/save", object)
                .then(result => {
                    if (result && result.data && result.data.msg == 'success') {
                        dsf.layer.toast("保存成功");
                        self.signMobile.opinionList = result.data.list;
                    } else {
                        dsf.layer.toast(result.data.msg);
                    }
                });
        },
        //指定常用意见的编辑回调
        setOpinionEdit() {
            let self = this;
            self.signMobile.opinionEditHandler = function (object) {
                self.customOpinionSave(object)
            }
        },
        // 添加常用意见模板
        setOpinionAdd() {
            let self = this;
            self.signMobile.opinionAddHandler = function (object) {
                self.customOpinionSave(object)
            }
        },
        // 常用意见删除
        setOpinionDel() {
            let self = this;
            self.signMobile.opinionDelHandler = function (object, fn) {
                dsf.layer.confirm({
                    message: '确定要删除意见吗？',
                    className: 'delDialog',
                }, () => {
                    fn(true)
                    dsf.http.get("fn/hm/customOpinion/del", {
                        "id": object.id
                    }).then(res => {
                        if (res && res.data.msg == 'success') {
                            dsf.layer.toast("删除成功");
                        } else {
                            dsf.layer.toast("删除失败");
                        }
                    })
                }, () => {
                    fn(false)
                })
            }
        },
        // 批注记录
        recordHandle() {
            let self = this;
            self.signMobile.recordHandle = function (object, isSelect) {
                self.showTableDialog = isSelect ? true : false;
                if (self.showTableDialog) {
                    if (!self.isShowCurPerson || (!self.isShowCurPerson && self.formMeta && self.formMeta.parameters && !self.formMeta.parameters.isShowCurPerson)) { //只显示当前人批注时不加载【批注记录】，否则加载
                        self.$nextTick(() => {
                            self.renderRecord(self.allNotionData); //批注记录
                        })
                    }
                }
            };
        },
        // 关闭批注记录弹框
        closeRecord() {
            this.showTableDialog = false;
            $(".smt-tab-item").each(function () {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active')
                }
                if ($(this).hasClass('xn-active')) {
                    $(this).removeClass('xn-active')
                }
            });
        },
        imgPreview(url) {
            this.showImgPreview = true;
            this.previewImgs[0] = url;
        },
        isShowPopover() {
            this.showPopover = !this.showPopover;
            if (this.instructorsList.length <= 0) {
                dsf.layer.toast('暂无人员批示！');
            }
        },
        // 批示人筛选变化
        changeInstructorSel(names) {
            let currentId = this.currentUserNotionData.length > 0 ? this.currentUserNotionData[0].createUserId : '';
            let renderData = this.allNotionData.filter(item => names.includes(item.createUserId)); //选择批示人的信息
            let currentObj = [],
                otherObj = [];
            let obj = this.allNotionData.filter(item => !this.currentUserNotionData.map(k => k.createUserId).includes(item.createUserId)); //除当前登录人的其余人员信息
            if (names.length > 0) {
                currentObj = renderData.filter(item => item.createUserId === currentId);
                otherObj = renderData.filter(item => item.createUserId !== currentId)
                // 先清除数据
                this.renderCanvasData({
                    currentUserData: this.currentUserNotionData,
                    otherUserData: obj,
                    currentFlag: true,
                    isTips: true
                });
                if (currentObj.length > 0 && otherObj.length > 0) {
                    this.renderCanvasData({
                        currentUserData: currentObj,
                        otherUserData: otherObj,
                        isTips: true
                    });
                } else if (currentObj.length > 0 && otherObj.length === 0) { // 如果自己的有 把别人的清空
                    this.renderCanvasData({
                        currentUserData: currentObj,
                        otherUserData: [],
                        isTips: true
                    })
                } else if (currentObj.length === 0 && otherObj.length > 0) { // 如果别人的有 把自己的清空
                    this.renderCanvasData({
                        currentUserData: [],
                        otherUserData: otherObj,
                        isTips: true
                    })
                }
            } else {
                this.renderCanvasData({
                    currentUserData: this.currentUserNotionData,
                    otherUserData: obj,
                    currentFlag: true,
                    isTips: true
                })
            }
        },
        // 重新渲染图层数据currentUserData：自己数据, otherUserData：别人数据, addPageData currentFlag: true 隐藏画布，isTips：批示人点击
        renderCanvasData(option) {
            let {
                currentUserData,
                otherUserData,
                currentFlag,
                isTips
            } = option;
            let self = this;
            // console.log(self.currentScrollDom);
            if (currentUserData && currentUserData.length > 0) {
                //将当前用户的数据图层初始化到画板上
                currentUserData.forEach(item => {
                    if (item.packetContent && item.packetContent != "") {
                        // var packet = new Array(); //全部画板的数据
                        let packetAry = JSON.parse(item.packetContent);
                        // console.log(packetAry, "回显自己数据");
                        if (packetAry && packetAry.length > 0) {
                            packetAry.forEach(function (detail) {
                                // if (!detail.data) {
                                //     detail.data = detail.packetContent;
                                // }
                                if (isTips) {
                                    let ary = detail.packetContent || detail.data;
                                    if (ary.length > 0) {
                                        ary.forEach(k => {
                                            if (k.randomId && document.querySelector(`.signature-element-class[data-pid="${k.randomId}"]`)) {
                                                let dom = document.querySelector(`.signature-element-class[data-pid="${k.randomId}"]`)
                                                dom.style.display = currentFlag ? 'none' : 'block'
                                            }
                                        })
                                    }
                                    if (detail.addPageId) { // 增页
                                        if (document.querySelector(`.pinch-zoom[data-pid="${detail.addPageId}"]`)) {
                                            document.querySelector(`.pinch-zoom[data-pid="${detail.addPageId}"]`).style.display = currentFlag ? 'none' : 'flex'
                                        }
                                    }
                                } else {
                                    if (detail.addPageId) {
                                        if (!document.querySelector(`.pinch-zoom[data-pid="${detail.addPageId}"]`)) { // 如果已经增页过了就不需要再创建增页dom
                                            self.handleCreateNewPage(detail, detail.addPageId, {
                                                addPosition: detail.addPosition,
                                                isSelf: detail.isSelf,
                                                isBack: true
                                            }, function (row) {
                                                if (self.isPreview) {
                                                    self.isShowDelBtn(false)
                                                }
                                            })
                                        }
                                    }
                                }
                            });
                            if (!isTips) {
                                if (this.sumAry.length > 0) {
                                    this.sumAry.forEach((k) => {
                                        self.handleCreateNewPage(k, k.addPageId, {
                                            addPosition: k.addPosition,
                                            isSelf: k.isSelf,
                                            isBack: true
                                        }, function (row) {
                                            if (self.isPreview) {
                                                self.isShowDelBtn(false)
                                            }
                                        })
                                    })
                                }
                                // packetAry && self.signMobile.initCurrentData(packetAry);
                            }
                        }
                    }
                })
            }
            if (otherUserData && otherUserData.length > 0 && (!this.isShowCurPerson || (!this.isShowCurPerson && this.formMeta && this.formMeta.parameters && !this.formMeta.parameters.isShowCurPerson))) {
                otherUserData.forEach(item => {
                    if (item.packetContent && item.packetContent != "") {
                        // var packet = new Array(); //全部画板的数据
                        let packetAry = JSON.parse(item.packetContent);
                        // console.log(packetAry, "回显其他数据");
                        if (packetAry && packetAry.length > 0) {
                            packetAry.forEach(function (detail) {
                                // if (!detail.data) {
                                //     detail.data = detail.packetContent;
                                // }
                                if (isTips) {
                                    let ary = detail.packetContent || detail.data;
                                    if (ary.length > 0) {
                                        ary.forEach(k => {
                                            if (k.randomId && document.querySelector(`.signature-element-history-class img[data-pid="${k.randomId}"]`)) {
                                                let dom = document.querySelector(`.signature-element-history-class img[data-pid="${k.randomId}"]`)
                                                dom.style.display = currentFlag ? 'none' : 'block'
                                            }
                                        })
                                    }
                                    if (detail.addPageId) { // 渲染增页
                                        if (document.querySelector(`.pinch-zoom[data-pid="${detail.addPageId}"]`)) {
                                            document.querySelector(`.pinch-zoom[data-pid="${detail.addPageId}"]`).style.display = currentFlag ? 'none' : 'flex'
                                        }
                                    }
                                } else {
                                    if (detail.addPageId) {
                                        if (!document.querySelector(`.pinch-zoom[data-pid="${detail.addPageId}"]`)) { // 如果已经增页过了就不需要再创建增页dom
                                            self.handleCreateNewPage(detail, detail.addPageId, {
                                                addPosition: detail.addPosition,
                                                isSelf: false,
                                                isBack: true
                                            }, function (row) {
                                                if (self.isPreview) {
                                                    self.isShowDelBtn(false)
                                                }
                                            })
                                        }
                                    }
                                }
                            });
                            if (!isTips) {
                                if (this.sumAry.length > 0) {
                                    this.sumAry.forEach((k) => {
                                        self.handleCreateNewPage(k, k.addPageId, {
                                            addPosition: k.addPosition,
                                            isSelf: false,
                                            isBack: true
                                        }, function (row) {
                                            if (self.isPreview) {
                                                self.isShowDelBtn(false)
                                            }
                                        })
                                    })
                                }
                                // packetAry && self.signMobile.rendererHistoryData(packetAry);
                            }
                        }
                    }
                })
            }
            this.sortPageNum()
        },
        fullScreen() {
            this.$emit("fullScreen")
        },
        writeOrPreview: debounce(function (name) {
            if (name == 'p') {
                this.$emit("goPreview");
            } else if (name == 'w') {
                this.$emit("goHandWrite")
            }
        }, 2000),
        // 快照查看
        goSnapshot(item) {
            this.showSnapshot = true;
            this.recordTime = item.createTime;
            this.currentPage = Number(item.pageNum);
        },
        // 自动记录插入文字的字体字号颜色于服务端
        saveFontStyle(option) {
            let obj = {
                fontFamily: option.fontFamily,
                fontSize: option.fontSize,
                color: option.color
            }
            dsf.http.post("fn/hm/sign/saveConfig", {
                    data: JSON.stringify(obj)
                })
                .then(res => {
                    console.log(res)
                })
                .error(error => {
                    console.log(error)
                })
                .always(() => {});
        },
        // 同一文件，签批变预览时，没有保存的批注数据删除，重新回填数据
        resetSignData() {
            // 去除顶部工具栏选中，防止继续手写
            $(".smt-tab-item").each(function () {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active')
                }
                if ($(this).hasClass('xn-active')) {
                    $(this).removeClass('xn-active')
                }
            });
            let randomIdAry = []; //页面签批数据的所有randomId
            this.allPageData.forEach(item => {
                if (item && item.packetContent) {
                    item.packetContent.forEach(j => {
                        randomIdAry.push(j.randomId)
                    })
                }
            })
            this.signMobile.sourceSignaturePool.map(item => {
                item.data = item.data.filter(el => randomIdAry.includes(el.randomId) && !el.addType)
            })
            // 清除所有签批数据
            var existsEle = document.querySelectorAll(".signature-element-class");
            if (existsEle) {
                for (var i = 0; i < existsEle.length; i++) {
                    var element = existsEle[i];
                    element.remove();
                }
            }
            let newary = JSON.parse(JSON.stringify(this.allPageData));
            let selfId = this.leaderUser ? this.leaderUser : this.user.user_id;
            let selfCurrentData = newary.filter(item => item.createUserId == selfId),
                otherCurrentData = newary.filter(item => item.createUserId != selfId);
            if (!this.isShowCurPerson || (!this.isShowCurPerson && this.formMeta && this.formMeta.parameters && !this.formMeta.parameters.isShowCurPerson)) {
                this.signMobile.setPageHistoryData(selfCurrentData, otherCurrentData); //插件回填自己和他人的数据
            } else {
                this.signMobile.setPageHistoryData(selfCurrentData, []); //只显示当前人信息时不回显其他人数据
            }
        },
    },
    beforeDestroy() {
        this.destroyInterval();
        window.removeEventListener('scroll', this.handleScroll, true)
        document.body.style.backgroundColor = '#f7f7f7'
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.preview-container {
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

        span.van-popover__wrapper {
            position: relative;

            i.dot {
                width: 6px;
                height: 6px;
                display: block;
                border-radius: 50%;
                @include background-theme(normal);
                position: absolute;
                top: 5px;
                right: 5px;
            }
        }
    }

    .pageContainer {
        position: relative;
        width: 100%;
        height: 100%;
        // overflow: auto;
        transition: all .3s;

        .pageViewer {
            width: 100%;
        }
    }

    .pinch-zoom {
        position: relative;
        // height: 500px;
        display: flex;
        justify-content: center;
        // margin-bottom: 5vw;
        // padding: 5vw 0 0 0;
        // width: 90vw;
        // min-height: calc(90vw * 1.413);
        // margin-left: 5vw;
        transform: scale(1, 1) translate(0px, 0px);

        &.imgHasMargin {
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

            .view-img {
                width: 90vw;
                height: 100%;
                // height: 500px;
                // margin: 5vw auto;
                box-shadow: darkgrey 0px 1px 3px 0px;
            }
        }

        &.imgNoMargin {
            width: 100vw;
            padding: 0;
            min-height: calc(100vw * 1.413);
            margin-left: 0vw;

            &::before {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0vw;
                box-sizing: border-box;
                border-bottom: 1PX solid #ebebeb;
                z-index: 0;
                content: '';
            }

            .view-img {
                width: 100vw;
                height: 100%;
                // box-shadow: darkgrey 0px 1px 3px 0px;
            }
        }

        span.page-num {
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

    }

    .addPage {
        // width: 90vw;
        height: 500px;
        background-color: #FFF;
        margin: 0 auto;
        box-shadow: darkgrey 0px 1px 3px 0px;
        transform: scale(1, 1) translate(0px, 0px) !important;
    }

    // #headerDiv {
    //     margin-bottom: 10px;
    // }

    .recordTitle {
        width: 100%;
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
            @include font-theme("normal");
            @include font_4;
        }

        .van-icon {
            position: absolute;
            right: 10px;
            @include font-theme("normal");
        }
    }

    .tableDialog {
        width: 100%;
        // height: calc(100% - 40px);
        // overflow-y: auto;
        table-layout: fixed;
        border-collapse: collapse;

        thead {
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            display: table;
            width: 100%;
            table-layout: fixed;

            th {
                // background: #ccc;
                @include background-theme('normal');
                height: 40px;
                color: #FFF;
            }
        }

        tbody {
            display: table;
            width: 100%;
            table-layout: fixed;

            td {
                max-height: 100px;
                min-height: 60px;
                text-align: center;
                padding: 10px 0;

                .content-img {
                    width: 90%;
                    max-height: 100px;
                }

                &:last-child {
                    @include font-theme("normal");
                }
            }
        }
    }

    .bottom-button {
        @include background-theme(normal);
    }
}

.pages {
    width: 30vw;
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
        // height: 32px;
        border-bottom: 1PX solid #ebebeb;
        display: flex;
        align-items: center;
        font-size: var(--font_size_3);
        color: #333;
        padding: 10px 0;
    }
}

@media screen and (max-width:999px) {
    .catalogue {
        width: 40PX;
        height: 40PX;
        background: #FFF;
        border-radius: 50%;
        box-shadow: 0 0 10px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 15PX;
        top: 150PX;
        z-index: 999;

        i {
            font-size: 24PX;
        }
    }

    .pages {
        width: 30vw;
        height: 100vh;
        box-sizing: border-box;
        padding: 10PX;
        background: #FFF;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        p {
            font-size: 16PX;
            font-weight: bold;
            color: #333;
            margin-bottom: 15PX;
        }

        a {
            width: 100%;
            // height: 32px;
            border-bottom: 1PX solid #ebebeb;
            display: flex;
            align-items: center;
            font-size: 16PX;
            color: #333;
            padding: 10PX 0;
        }
    }
}

@media screen and (min-width:1000px) {
    .catalogue {
        width: 60PX;
        height: 60PX;
        background: #FFF;
        border-radius: 50%;
        box-shadow: 0 0 10px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 30PX;
        top: 200PX;
        z-index: 999;

        i {
            font-size: 28PX;
        }
    }

    .pages {
        width: 30vw;
        height: 100vh;
        box-sizing: border-box;
        padding: 20px;
        background: #FFF;
        display: flex;
        flex-direction: column;
        overflow-y: auto;

        p {
            font-size: 18PX;
            font-weight: bold;
            color: #333;
            margin-bottom: 20PX;
        }

        a {
            width: 100%;
            // height: 32px;
            border-bottom: 1PX solid #ebebeb;
            display: flex;
            align-items: center;
            font-size: 18PX;
            color: #333;
            padding: 15PX 0;
        }
    }
}

.file_popup {
    z-index: 10000 !important;
}

::v-deep.preview-container .pinch-zoom canvas {
    width: 100% !important;
}

::v-deep.preview-container .van-image-preview__image {
    background: #FFF;
}

.van-checkbox {
    margin: 10px;
}

.van-nav-bar {
    @include font-theme("normal");

    .van-icon {
        @include font-theme("normal");
        @include font_5;
        margin-right: 3px;
    }

    .van-nav-bar__title {
        font-weight: bold;
    }
}

.table-list {
    width: 100%;
    // height: 100%;
    background: #f5f5f5;
    padding: 15px;
    box-sizing: border-box;

    .list-item+.list-item {
        margin-top: 15px;
    }

    .list-item {
        width: 100%;
        background-color: #ffffff;
        border-radius: 7px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        box-sizing: border-box;

        .item-content {
            width: 100px;
            margin-right: 10px;

            img {
                width: 100%;
                max-height: 60px;
            }
        }

        .item-text {
            flex: 1;

            div {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 5px 0;

                p {
                    color: #666;
                    font-size: var(--font_size_3);

                    .van-icon {
                        margin-right: 5px;
                        font-size: var(--font_size_2);
                    }
                }

                span {
                    @include font-theme("normal");
                    font-size: var(--font_size_3);
                }
            }

        }
    }

}

.instructor {
    font-size: var(--font_size_2);
    color: #333;
    padding: 10px 10px 0 10px;
}

::v-deep.preview-container .van-empty__description {
    overflow-wrap: anywhere;
}

.xizang_loadingtext {
    color: #d4d4d4;
    font-weight: 400;
    font-size: 10px;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 100px;
}

.single-preview {
    width: 100%;
    // height: 100%;
    // overflow: auto;
    position: relative;
}

.iconlaptop-windows {
    height: 40px;
    font-size: 30px;
    color: #ffffff;
}
</style>
