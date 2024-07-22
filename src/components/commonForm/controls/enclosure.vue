<template>
  <div class="ds-enclosure-pre" ref="enclosurePre">
    <!-- tab形式展示 -->
    <div v-if="!isControl" style="height: inherit">
      <div
        v-if="fileList.length > 0 && dsf.config.commonForm.btnToggleShowFile"
        class="btn-toggle-container"
      >
        <div class="btn-box">
          <span
            v-for="(item, index) in fileList"
            :class="getActive(index, item)"
            :key="index"
            @click="toggleFile(item)"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <div
        v-if="
          fileList.length > 0 && ifFile(fileUrl) && !dsf.config.commonForm.tabPaneShowFile
        "
        :class="{ fullScreen: isFullScreen }"
        :style="{
          position: isFullScreen ? '' : 'relative',
          width: '100%',
          height: dsf.config.commonForm.btnToggleShowFile
            ? 'calc(100% - 0.76rem)'
            : '100%',
          overflow: 'auto',
        }"
      >
        <enclosure-preview
          v-if="dsf.config.commonForm.LocalDocPreview && checkShowPreview"
          :file="popFile"
          :isPreview="isPreview"
          :form-info="fileData"
          ref="tabEnclosurePreview"
          :formMeta="formMeta"
          :isShowFullScreen="true"
          :isTabType="true"
          @fullScreen="fullScreen"
          @goPreview="goPreview"
          @goHandWrite="goHandWrite"
          @closePop="closePop"
          @isShowEnclosureBtn="isShowEnclosureBtn"
        ></enclosure-preview>
        <iframe
          v-if="!dsf.config.commonForm.LocalDocPreview"
          id="filePreview"
          :src="fileUrl"
          :key="fileUrl"
          frameborder="0"
          @load="changeFrameHeight()"
        />
        <!-- <div class="iconBox flex dc">
                    <img src="../../../assets/imgs/full.png" alt="" @click="fullScreen">
                    <div v-if="fileObj.isHandwrite > 0 && formMeta.parameters.openHandwrite > 0">
                        <img v-if="isPreview" src="../../../assets/imgs/edit.png" alt=""
                            @click="isFullScreen = false; goHandWrite()">
                        <img v-if="!isPreview" src="../../../assets/imgs/preview.png" alt=""
                            @click="isFullScreen = false; goPreview()">
                    </div>
                    <van-popover v-model="showPopover" trigger="click" placement="left" v-if="isPreview">
                        <van-checkbox-group v-model="personScreen" ref="checkboxGroup" @change="changeInstructorSel">
                            <van-checkbox v-for="(item,index) in instructorsList" :key="item.createUserId" :name="item.createUName" icon-size="16px">{{item.createUName}}</van-checkbox>
                        </van-checkbox-group>
                        <template #reference>
                            <img src="../../../assets/imgs/screen.png" alt="" @click.stop="isShowPopover">
                        </template>
                    </van-popover>
                </div> -->
      </div>
      <div v-else-if="!dsf.config.commonForm.tabPaneShowFile && !ifFile(fileUrl)">
        <img :src="fileUrl" alt="" />
      </div>
      <div v-else-if="dsf.config.commonForm.tabPaneShowFile" style="background: white">
        <enclosure-item
          v-for="(item, index) in list"
          :key="index"
          :file-data="item"
          :form-info="fileData"
          :formMeta="formMeta"
          @open="openFile"
          @openHandWrite="openHandWrite"
          @closePop="closePop"
          @addFile="addFile"
          @deleteFile="deleteFile"
          :previewId="fileObj.id"
          :form-data="formData"
        />
        <van-image-preview
          v-model="imgPreview"
          :images="previewImg"
          closeable
          :metaData="metaData"
        ></van-image-preview>
      </div>
      <commonempty v-else-if="fileList.length < 1" description="暂无文件预览" />
      <div
        v-if="!dsf.config.commonForm.tabPaneShowFile && isShowFileBtn"
        class="ds-enclosure-button"
      >
        <!--悬浮按钮-->
        <div v-if="dsf.config.commonForm.txtButtonShowFiles" class="__e_buttonTxt" @click="showBox">
          文件<br/>列表
        </div>
        <div v-else class="__e_button" @click="showBox">
          <i class="iconfont iconattachment"></i>
        </div>
      </div>
      <!-- <div v-if="fileObj.isHandwrite>0" class="ds-enclosure-button">
            <div class="__e_writebutton" @click="goHandWrite">
                签批
            </div>
        </div> -->
    </div>
    <!-- 表单控件展示 -->
    <div v-else>
      <enclosure-item
        v-for="(item, index) in list"
        :key="index"
        :is-control="true"
        :file-data="item"
        :formMeta="formMeta"
        :form-info="fileData"
        @open="openFile"
        @openHandWrite="openHandWrite"
        @closePop="closePop"
        @addFile="addFile"
        @deleteFile="deleteFile"
        :previewId="fileObj.id"
        :form-data="formData"
        :metaData="metaData"
      />
      <van-image-preview
        v-model="imgPreview"
        :images="previewImg"
        closeable
      ></van-image-preview>
    </div>

    <van-popup
      v-model="isShow"
      :get-container="'#app'"
      position="bottom"
      style="max-height: 80%"
      round
      class="relevant-popup"
    >
      <div class="popup-title">相关文件</div>
      <div class="popup-content">
        <!--列表为空时-->
        <div v-show="!fileList.length && list.length < 1" class="__file_empty">
          <commonempty description="暂无附件" />
        </div>
        <!--列表不为空-->
        <div class="__file_list">
          <enclosure-item
            v-for="(item, index) in list"
            :key="index"
            :file-data="item"
            :form-info="fileData"
            :formMeta="formMeta"
            @open="openFile"
            @openHandWrite="openHandWrite"
            @closePop="closePop"
            @addFile="addFile"
            @deleteFile="deleteFile"
            :showClickIcon="true"
            :previewId="fileObj.id"
            :form-data="formData"
            :metaData="metaData"
          />
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="videoPreview"
      :style="{ height: '100%' }"
      position="bottom"
      get-container="#app"
    >
      <van-nav-bar @click-left="videoPreview = false">
        <template #left> <van-icon name="arrow-left" /><span>返回</span> </template>
      </van-nav-bar>
      <div class="videoBox" style="" @click="videoPreview = false">
        <video
          v-if="videoPreview"
          autoplay
          name="media"
          style="width: 100%; height: 200px"
          controls
        >
          <source :src="previewVideo" type="video/mp4" />
        </video>
      </div>
    </van-popup>
    <van-popup
      v-model="fileShow"
      :get-container="'#app'"
      position="bottom"
      class="filePop closefilePop"
    >
      <van-sticky>
        <van-nav-bar
          :title="popFile.title"
          @click-left="closeFileShow()"
          @click-right="closeFileShow()"
        >
          <template v-if="appTopMenu" #left>
            <van-icon name="arrow-left" /><span>返回</span>
          </template>
          <template v-else #right>
            <!-- <van-icon name="cross" /> -->
            <span>关闭文件</span>
          </template>
        </van-nav-bar>
      </van-sticky>
      <enclosure-preview
        v-if="dsf.config.commonForm.LocalDocPreview && fileShow"
        :file="popFile"
        :isPreview="isPreview"
        :form-info="fileData"
        ref="enclosurePreview"
        :formMeta="formMeta"
        @goPreview="goPreview"
        @goHandWrite="goHandWrite"
        @closePop="closePop"
      ></enclosure-preview>
      <iframe
        v-if="!dsf.config.commonForm.LocalDocPreview"
        id="filePreview"
        :src="fileUrl"
        :key="`${popFile.id}_${new Date()}`"
        frameborder="0"
        @load="changeFrameHeight()"
      />

      <div
        v-if="
          fileShow &&
          canPopFileEdit &&
          dsf.config.commonForm.canEditFile &&
          ifFileEdit(popFile.title)
        "
        class="btn-container"
      >
        <van-button class="btn" type="info" @click="openFile(fileUrl, popFile, 'edit')"
          >编辑</van-button
        >
      </div>
    </van-popup>

    <van-popup
      v-model="writeShow"
      :get-container="'#app'"
      position="bottom"
      class="filePop iframePop"
    >
      <van-nav-bar :title="writeFile.title" @click-left="writeShow = false">
        <template #left> <van-icon name="arrow-left" /><span>返回</span> </template>
      </van-nav-bar>
      <iframe
        v-if="writeShow"
        id="filePreview"
        :src="writeFile.handwritingUrl"
        :key="`${writeFile.id}_${new Date()}`"
        frameborder="0"
        @load="changeFrameHeight()"
      />
      <!-- <div v-if="canPopFileEdit" class="btn-container">
            <van-button class="btn" type="info" @click="openFile(fileUrl, popFile, 'edit')">编辑</van-button>
        </div> -->
    </van-popup>
    <van-popup
      v-model="wdztShow"
      :get-container="'#app'"
      position="bottom"
      class="filePop closefilePop"
    >
      <van-sticky>
        <van-nav-bar
          :title="fileObj.title"
          @click-left="wdztShow = false"
          @click-right="wdztShow = false"
        >
          <template v-if="appTopMenu" #left>
            <van-icon name="arrow-left" /><span>返回</span>
          </template>
          <template v-else #right>
            <!-- <van-icon name="cross" /> -->
            <span>关闭文件</span>
          </template>
        </van-nav-bar>
      </van-sticky>
      <WdztFileOpen v-if="wdztShow" :wdztParams="wdztParams"></WdztFileOpen>
    </van-popup>
    <van-popup
      v-model="aoxiongShow"
      :get-container="'#app'"
      position="bottom"
      class="filePop closefilePop"
    >
      <van-sticky>
        <van-nav-bar
          :title="fileObj.title"
          @click-left="aoxiongShow = false"
          @click-right="aoxiongShow = false"
        >
          <template v-if="appTopMenu" #left>
            <van-icon name="arrow-left" /><span>返回</span>
          </template>
          <template v-else #right>
            <!-- <van-icon name="cross" /> -->
            <span>关闭文件</span>
          </template>
        </van-nav-bar>
      </van-sticky>
      <aoxiongFileOpen
        v-if="aoxiongShow"
        :msg.sync="aoxiongShow"
        :aoxiongParams="aoxiongParams"
      ></aoxiongFileOpen>
    </van-popup>
  </div>
</template>

<script>
import EnclosureItem from "@/components/enclosure/EnclosureItem";
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
import EnclosureItemToWPS from "@/components/enclosure/EnclosureItemToWPS";
import WdztFileOpen from "@/components/commonForm/controls/wdztFileOpen"
import aoxiongFileOpen from "@/components/commonForm/controls/aoxiongFileOpen"
import B64 from "@/common/base64";
let exclusiveInvoke = null
if (dsf.util.getClientName().includes("ding")) {
  import("gdt-jsapi/exclusiveInvoke").then(res => {
    exclusiveInvoke = res.default
  })
}
export default {
    name: "Enclosure",
    components: {
        EnclosureItem,
        EnclosureItemToWPS,
        'EnclosurePreview': () => import('@/components/enclosure/EnclosurePreview'),
        WdztFileOpen,
        aoxiongFileOpen
    },
    props: {
        fileData: {
            type: Object,
            default: () => { }
        },
        isControl: {
            type: Boolean,
            default: false
        },
        allFile: {
            type: Array,
            default: () => []
        },
        formMeta: {
            type: Object,
            default: () => { }
        },
        headTab: {
            type: String,
            default: ""
        },
        tabName: {
            type: String,
            default: ""
        },
        formData:{
            type: Object,
            default: () => { }
      },
      metaData: {
          type: Object,
        }
    },
    data() {
        return {
            // dataValue: {
            //     info_id: "",
            //     moduleId: "",
            // },
            wdztShow: false,
            aoxiongShow: false,
            aoxiongParams: {
                signId:"",
                currentFileId:""
            },
            appTopMenu: dsf.config.appTopMenu.value,
            user: dsf.util.loadSessionStore("user"),
            isShow: false,
            overflow: document.body.style.overflow,
            typeConfig: {
                img: "iconpicture",
                text: "iconfile",
            },
            // // 请求加载
            // loading: false,
            // // 是否最后一页
            // isLast: false,
            // // 请求异常
            // isError: false,
            // // 请求参数
            // params: {
            //     info_id: "", // 文件id
            //     infoId: "", // 文件id
            //     moduleId: "", // 模块id
            //     nodeId: "", // 流程节点id
            //     start: 0, // 开始页码
            //     limit: 100, // 每页条数
            //     flowId: "",
            // },
            fileObj: {},
            list: [],
            fileUrl: "",
            isdisabled: false,
            showUpload: false,
            urlIndex: "0",
            fileList: [],
            imgPreview: false,
            previewImg: [],
            videoPreview: false,
            previewVideo: null,
            inDreasSoft: navigator.userAgent.includes("DreamSoft"),
            currentFile: null,
            fileShow: false,
            popFile: {}, //弹窗文件
            canPopFileEdit: false,
            writeFile: {},
            writeShow: false,
            isFullScreen: false,
            isPreview: true, //true 预览  false 签批
            showPopover: false,
            personScreen: [],
            instructorsList: [], //批示人列表
            fileTimer: null,
            isShowFileBtn: true,//签批时不显示文件切换按钮
        };
    },
    computed: {
        fullUrl() {
            return dsf.url.openOffice(encodeURIComponent(this.fileUrl));
        },
        getActive() {
            return (index, item) => {
                return item.actived ? "actived" : ""
            }
        },
        checkShowPreview() {
            return this.headTab == this.tabName
        }
    },
    watch: {
        isShow(to) {
            if (to) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = this.overflow;
            }
        },
        allFile: {
            handler(newVal, oldVal) {
                this.list = newVal
                this.list.forEach(row => {
                    this.fileList = this.fileList.concat(row.file)
                })
            },
            deep: true,
        },
        fileShow: {
            handler(newVal, oldVal) {
                if (newVal) {
                    if (this.$refs.enclosurePreview && this.$refs.enclosurePreview.count && this.$refs.enclosurePreview.count >= 0) {
                        this.$refs.enclosurePreview.init();
                    }
                }
            },
            deep: true,
        }
    },
    created() {
        console.log("headTab" + this.headTab);
        this.list = this.allFile
        console.log("全部的呈批文件",this.allFile)
        this.list.forEach(row => {
            this.fileList = this.fileList.concat(row.file)
        })
        if (this.fileList.length > 0) {
            let firstFile = this.fileList[0];
            this.popFile = this.fileList[0];
            this.fileObj = this.fileList[0];
            if (this.formMeta?.parameters) {
                let params = this.formMeta.parameters;
                if (params.isopenHandwrite == '1') {
                    //配置表单模块  直接开启手写签批单
                    this.fileList.some(item => {
                        if (item.type == '-5') {//手写签批单
                            firstFile = item;
                            this.popFile = item;
                            this.fileObj = item;
                            this.isPreview = false;
                            return true;
                        }
                    })
                }
                // viewAttachUseSignMode系统设置里预览使用签批模式
                if (params.viewAttachUseSignMode > 0 && this.fileList[0]?.isHandwrite > 0) {
                    this.isPreview = false;
                }
            }

            // let index = firstFile.navtiveUrl.lastIndexOf(".");
            // let suffix = firstFile.navtiveUrl.substr(index + 1).toLowerCase();
            // if (suffix == "ofd" && !dsf.config.commonForm.tabPaneShowFile) {
            //     this.openFile(firstFile.url, firstFile)
            // } else {
            if (this.fileObj.navtiveUrl.indexOf("http") == 0) {
                this.fileUrl = this.fileObj.navtiveUrl;
            } else {
                this.fileUrl = this.fileObj.url;
            }
            this.fileObj.actived = true;
            // }
        }

    },
    mounted() {

    },
    destroyed() {
        document.body.style.overflow = this.overflow;
    },
    methods: {
        toggleFile(item) {
            if (this.fileList.length <= 1) return;
            this.fileUrl = item.url;
            this.fileObj = item;
            this.fileList.forEach(item => item.actived = false);
            item.actived = true;
        },
        ifFile(fileurl) {
            return !(fileurl.includes(".png") || fileurl.includes(".jpg") || fileurl.includes(".mp4") || fileurl.includes(".jpeg") || fileurl.includes(".bmp") || fileurl.includes(".gif"))
        },
        emptyEvent() {
            // 空事件
        },
        showBox() {
            this.isShow = true;
        },
        closeBox() {
            this.isShow = false;
        },
        XsfOpenFile(ofdUrl, part) {
            // console.log(ofdUrl, part, "XsfOpenFile");
            $WPS.open(dsf.url.getRootPath() + ofdUrl, part.title,
                function (result) {
                    console.log(result)
                    // alert(result);
                },
                function (error) {
                    console.log(error)
                    // alert("open failed: " + error);
                }
            );
            // xsfWPS.open(dsf.url.getRootPath() + ofdUrl,
            //     part.title,
            //     true,
            //     false,
            //     function (result) {
            //         //alert("open seccess"+JSON.stringify(result));
            //     },
            //     function (error) {
            //         //alert("open failed: " + JSON.stringify(error));
            //     }
            // );
        },
        // 过滤所有特殊字符
        stripscript (s) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*——|{}‘；：”“'？↵\r\n ]");
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                rs = rs + s.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },
        wpsOpen(part, fileUrl, suffix) {
            let self = this
            //console.log(fileUrl, part);
            let rootPath = dsf.url.getRootPath()
            let downUrl = rootPath + fileUrl;
            console.log(encodeURI(downUrl))
            let fileName = this.stripscript(part.title);
            console.log(fileName)
            var param = {
                keepCallback: true,
                downUrl: encodeURI(downUrl),
                saveUrl: rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${this.fileData.pnId}&nodeName=${this.fileData.nodeName}&fileType=1&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`,
                fileName: fileName,
                openWithWPS: true,
                uploadFile: true,
                openMode: part.canEdit > 0 ? "EditMode" : "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
                enterReviseMode: part.isRevise == "1" ? true : false,
                showReviewingPaneRightDefault: part.isNoModify == "1" ? true : false,
                userName: this.user.name
            };
            console.log(param);
            if ((self.$route.query.isdjOpen||self.$route.query.isShuKeOpen)&&!self.$route.query.webViewBack) {//标识是否是从点聚插件再次打开我们的页面
                window.androidMethod.openNative(JSON.stringify({ action: "$WPS.downAndOpen", data: param }))
            } else {
                $WPS.downAndOpen(param, function (data) {
                    console.log(data);
                    if (data.result == "success" && data.action == "upload") { //上传成功刷新
                        self.fileUrl = ""
                        setTimeout(() => {
                            self.fileUrl = part.url + "&temp=" + new Date()
                            console.log(self.fileUrl, "重置url成功");
                        }, 500);
                    }
                }, function (data) {
                    console.log("错误回调", data);
                });
            }
        },
        // 粤政易wps
        yzyWpsOpenFile(part, url, suffix) {
            let temp = dsf.url.getRootPath();
            let param = {
                download_url: temp + part.initUrl + "&md5=1",
                upload_url: temp + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${this.fileData.pnId}&nodeName=${this.fileData.nodeName}&fileType=${part.type}&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`,
                file_id: part.id,
                open_mode: part.canEdit == "1" ? "EditMode" : "ReadOnly",
                other: "",
                settings: `EnterReviseMode=true&UserName=${this.user.name}`
            };
            // console.log(JSON.stringify(param));
            console.log(param);
            param = B64.encode(JSON.stringify(param));
            // console.log(param);
            //wps预览存在问题；
            wx.invoke(
                //珠海使用wps预览
                "request3rdApp", {
                scheme: "ksoapp", //内部调用格式：{scheme}://wxworklocal?token=xxx&seq=xxx&param={param}，统一通过scheme
                //唤起，seq表示请求id，回传时使用。token也就是code，第三方app后台可以调用通过code获取
                //用户信息的接口获取用户账号。参看“开放登录”--“OAuth2.0网页授权”部分
                needToken: 1, // 是否需要传递登录票据给第三方App，0:不需要 1:需要
                param: param,
            },
                function (res) {
                    console.log(JSON.stringify(res));
                    // if (res.err_msg != "request3rdApp:ok") {
                    //     //alert(res.err_msg);//错误信息输出
                    // }
                }
            );
        },
        goHandWrite() {
            this.isPreview = false;
            this.isFullScreen = false;
            // this.isSignature = true;
            this.openHandWrite(this.fileObj)
        },
        openHandWrite(item) {
            let self = this;
            self.isShow = false;
            self.popFile = item;
            self.fileObj = item;
            if (dsf.config.commonForm.LocalDocPreview) {
                this.isPreview = false;
                if (this.isControl || dsf.config.commonForm.tabPaneShowFile) {
                    this.fileShow = true;
                }
            } else {
                self.writeFile = item
                self.writeShow = true
                window.onExist = function () {
                    setTimeout(() => {
                        self.fileUrl = `${item.url}&temp=` + Math.random();
                        self.writeShow = false;
                    }, 1500);
                }
            }
        },
        iSignature(part, fileUrl, suffix) {
            let self = this;
            //console.log("调用了金格打开", part);
            let rootPath = dsf.url.getRootPath()
            let write_photo = ""; //window.location.href.split("dist")[0] + "fn/getimage/downloadImage?userid=" + window.GLOBAL.currentUserInfo.user_id;
            let opinions = [];
            let can_edit = String(part.canEdit) === "1" ? true : false;
            const save_url = rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${this.fileData.pnId}&nodeName=${this.fileData.nodeName}&fileType=1&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
            const down_url = rootPath + fileUrl;

            let obj = {
                userName: self.user?.name,
                canEdit: can_edit,
                downUrl: down_url,
                fileName: part.title,
                saveUrl: save_url,
                openWithWPS: true,
                opinions: opinions,
                writePhoto: write_photo,
                pid: this.fileData.pId,
                pnid: this.fileData.pnId,
                fileId: part.id,
                copyRight: dsf.config.commonForm.iSignature.keyCode
            };
            console.log("调用金格传的参数", obj);
            $WPS.PDFHandWrite(JSON.stringify(obj), function (res) {
                if (String(res) === "send") {
                    self.isShow = false;
                    self.$bus.emit("iSignatureSend", {
                        act: "send"
                    })
                }
            },
                function (err) {
                    alert("open failed: " + err);
                }
            );
        },
        async dianJuFileOpen(part, fileUrl, suffix) {
            let self = this, templateUrl = "";
            let can_edit = String(part.canEdit) === "1" ? true : false;
            let rootPath = dsf.url.getRootPath();
            const save_url = rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${this.fileData.pnId}&nodeName=${this.fileData.nodeName}&fileType=1&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
            const down_url = rootPath + fileUrl;

            //[乌海oa]增页模板 xiaocy 20221228
            if (dsf.config.commonForm.dianJu?.needTemplate) {
                await dsf.http.get("fn/dianju/getofd", {
                    pk: part.infoId
                }).done(res => {
                    console.log("getofd-res", res);
                    if (res.type == "success") {
                        templateUrl = res.data;
                    }
                })
            }
            let obj = {
                fileUrl: down_url,
                title: part.title,
                canEdit: can_edit,
                uploadUrl: save_url,
                keyId: part.id,
                userName: self.user?.name,
                templateUrl: templateUrl
            };
            console.log("点聚参数", obj);
            let isOpenSign = await this.isSignFileLock(part.id);
            console.log("isOpenSign", isOpenSign);
            if(dsf.config.projectName=="mztOA"){
                obj.djAccount =(await this.getDianJuAcount()) || "";
            }
            if (!isOpenSign) {
                console.log("调用点聚sdk");
                if (self.$route.query.isdjOpen) {//标识是否是从点聚插件中再次打开点聚页面
                    obj.sendBtn = false;//控制附件打开点聚时是否显示发送按钮,true显示，false不显示，默认是true
                    obj.backBtn = false;//控制附件打开点聚时是否显示退回按钮,true显示，false不显示，默认是true
                    window.androidMethod.openNative(JSON.stringify({ action: "xsfCommon.dianJuSdk", data: obj }))
                } else {
                    //签批之后的回调函数
                    let backFunc = function (result) {
                        result = JSON.parse(result);
                        console.log("打开点聚的回调参数", result)
                        // alert("open seccess"+JSON.stringify(result));
                        /*
                        {"message":"dianjuUploadSuccess","result":true}
                        dianjuUploadSuccess :表示上传成功，给你回调这个，你就可以调用发送接口
                        dianjuOpenSuccess ：表示点聚打开成功
                        dianjuOpenError ：表示点聚打开出错，一般是文件下载失败
                        */
                        if (result.message == "dianjuUploadSuccess") {
                            self.fileUrl = "";
                            setTimeout(() => {
                                self.fileUrl = part.url + "&temp=" + new Date()
                                console.log(self.fileUrl, "重置url成功");
                            }, 500);
                            self.isShow = false;
                            self.$bus.emit("iSignatureSend", {
                                act: "send"
                            })
                        } else if (result.message == "dianjuOpenSuccess") {
                            // 轮询文件加锁接口
                            self.continueLockFile(part.id);
                        } else if (result.message == "dianjuOpenError") {
                            dsf.layer.alert({
                                message: "文件打开失败:" + down_url,
                            });
                        }
                        /*
                            {"message":"dianjuFileClose","result":true,"type":"finish"}
                            result:为false，表示文件下载失败，也就是点聚签批界面打开失败，其余情况均为true
                            type值各种类型：
                            open： 插件调用的时候回调，不管文件是否正常打开，都为open
                            send:由签批界面发送按钮触发的页面关闭
                            finish：除发送按钮触发关闭之外的所有情况
                        */
                        else if (result.message == 'dianjuFileClose') {
                            if (!(result.type == 'open' && result.result)) {
                                //根据type判断，只要是open,且result为true，那就是加锁，其余情况回调，就是解锁
                                self.destroyFileInterval(part.id)
                            } else if (result.type == 'send') {//签批界面的发送按钮回调
                                self.isShow = false;
                                self.$bus.emit("iSignatureSend", {
                                    act: "send"
                                })
                            }
                        }

                    }
                    //钉钉中内嵌点聚的sdk打开方式 2023年12月7日22:20:06@luy
                    if (dsf.util.getClientName().includes("ding")) {
                        console.log("exclusiveInvoke1");
                        let tabData=[{
                            title: part.title,
                            type: "sign",
                            fileUrl: down_url,
                            fileName: part.title,
                            uploadUrl: save_url,
                            canEdit: can_edit,
                            templateUrl: "",
                            fileID: part.id,
                            useFingerWrite:"true"
                        }]
                        let dingDianJuData={
                            keyId: part.id,
                            userName: self.user?.name,
                            tab: tabData,
                            djAccount:dsf.config.commonForm.dianJu.djAccount,
                            // mainButtons:[],
                            // unifyMessage:"",
                            // closeDianju: closeDianju,
                            // logUrl,
                            checkFileMd5:false
                            // mdUrl,
                        };
                        exclusiveInvoke({
                            api: "dianju.open",
                            params: {
                                data: JSON.stringify(dingDianJuData),
                                //   , token: "xxxxx"
                            },
                        }).then((res) => {
                            console.log("exclusiveInvoke2",res);
                            backFunc(res)
                        });
                    } else {
                        console.log("dianJuSdk");
                        xsfCommon.dianJuSdk(JSON.stringify(obj), backFunc, function error(error) {
                            console.log("open failed: ", error);
                        });
                    }
                }

            }
        },
        //获取点聚设备授权码
        async getDianJuAcount() {
        let result = "";
        await dsf.http
            .post("ctrl/thirdPartyInterfaces/getDianJuAcount")
            .then((res) => {
            console.log("isLock-res", res);
            if (res.data.code == "200") {
                result = res.data.data.djAccount;
            } else {
                dsf.layer.toast(res.data.message);
            }
            })
            .error((err) => {
            // dsf.layer.toast(err);
            console.log(err);
            });
        return result;
        },
        async shukeFileOpen(part, fileUrl, suffix) {
            let self = this;
            let rootPath = dsf.url.getRootPath();
            const down_url = rootPath + fileUrl;
            //let sendUrl = `${rootPath}fn/sdszfMobileCtrl/signSend?pk=${part.infoId || part.pk}&pid=230103165412vXDnyYaO4LyaEPfM6lF&pnid=230103165415430eH2rb0q8mlmzUhm9&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
            const backUrl = rootPath + `fn/swMobileCtrl/sendBack?infoId=${part.infoId || part.pk}&pid=${this.fileData.pId}&pnid=${this.fileData.pnId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
            const save_url = rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${this.fileData.pnId}&nodeName=${this.fileData.nodeName}&fileType=1&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
            let write_photo = rootPath + "fn/getimage/downloadImage?userid=" + this.user.user_id;
            // let can_edit = String(part.canEdit) === "1" ? true : false;
            let can_edit = String(part.isHandwrite) === "1" ? true : false;//20221130修改--有签批权限的时候就置为true
            let isStamp = false;
            let externalStorage = dsf.config.commonForm.shuke.externalStorage ? dsf.config.commonForm.shuke.externalStorage : false;
            let screenshots = dsf.config.commonForm.shuke.screenshots ? dsf.config.commonForm.shuke.screenshots : false;
            let foldingScreen = dsf.config.commonForm.shuke.foldingScreen ? dsf.config.commonForm.shuke.foldingScreen : '';
            let penPad = dsf.config.commonForm.shuke.penPad ? dsf.config.commonForm.shuke.penPad : '';
            let project = dsf.config.commonForm.shuke.project ? dsf.config.commonForm.shuke.project : '';
            let opinions = [];
            let btnList = [
                { title: "发送", tag: "send" },
                // { title: "退回", tag: "tuihui" },
                { title: "暂存", tag: "zancun" },
                { title: "手写", tag: "shouxie" },
                { title: "文字", tag: "wenzi" },
                { title: "撤回", tag: "chehui" },
                { title: "恢复", tag: "huifu" },
                { title: "擦除", tag: "cachu" },
                { title: "笔写", tag: "bixie" },
                { title: "笔锋调节", tag: "bftj" },
                { title: "页码", tag: "yema" },
            ];
            await dsf.http.get("fn/mobileUsedOpinion/find", {}).done(res => {
                 res.rows.forEach((item) => {
                    opinions.push(item.context);
                });
            })
            let obj = {
                downUrl: down_url,
                backUrl: '',
                sendUrl: '',
                title:part.title||"",
                writePhoto: write_photo,
                externalStorage: externalStorage,// 文件是否放在外部存储，默认内部存储
                saveUrl: save_url,
                handTip: (this.formData.main['B0033']&&this.formData.main['B0033'].value) || '',
                fileName: part.title,
                userName: self.user?.name,
                foldingScreen: foldingScreen,//折叠屏设备适配，传设备型号，多个用英文逗号隔开
                penPad: penPad,//笔写设备型号适配，传设备型号，多个用英文逗号隔开
                stamp: {//戳记功能
                    getCJInfo: rootPath + `fn/SZFcj/getCJInfo?userId=${this.user.user_id}&swh=${this.fileData.swh}&fromList=${this.fileData.urlPath}`,//戳记维护信息查询接口
                    downloadCJInfo: rootPath + `fn/SZFcj/downloadCJInfo?userId=${this.user.user_id}&swh=${this.fileData.swh}&fromList=${this.fileData.urlPath}`,//戳记维护信息图片下载接口
                    isStamp: isStamp ? true : false,//根据权限
                },
                screenshots: screenshots,//是否允许截屏，录屏
                canEdit: can_edit,
                project: project,
                isForceUpload:dsf.config.commonForm.shuke.isForceUpload||false,
                floatTabExpand:dsf.config.commonForm.shuke.floatTabExpand,
                pid: this.fileData.pId,
                pnid: this.fileData.pnId,
                fileId: part.id,
                opinions: opinions,//常用意见，数组格式
                nodeOpinion: this.fileData.nodeOpinion || '',//签批建议，采用按钮填充的意见文本
                copyRight: dsf.config.commonForm.shuke.keyCode,
                buttonState:dsf.config.commonForm.shuke.buttonState,
                btnList: dsf.config.commonForm.shuke.btnList||btnList,
                enabledScale:dsf.config.commonForm.shuke.enabledScale,
                showCollapse:dsf.config.commonForm.shuke.showCollapse,
                 // send：发送按钮
                    // back: 退回按钮
                    // Sign：署名按钮
                    // addBlank：增页按钮
                    // Record：记录按钮
                    // rectWrite：区域手写
                    // Text:文字签批
                    // signFontSize：署名文字大小
                    // signDate:署名日期选择
                btNameTips:dsf.config.commonForm.shuke.btNameTips||[],
                secretData:{//署名相关，signKey：授权key,signSecret：授权signSecret
                    signKey:dsf.config.commonForm.shuke.secretData?.signKey,
                    signSecret:dsf.config.commonForm.shuke.secretData?.signSecret
                },
                docWaterMark:{
                  "showWaterMark":dsf.config.commonForm.shuke?.showWaterMark?.showWaterMark ?? true,
                  "color":dsf.config.commonForm.shuke?.showWaterMark?.color||"#4da9a9a9",
                  "content":dsf.config.commonForm.shuke?.showWaterMark?.content||"",
                  "degree":-30,
                  "dateFormat":"yyyy/MM/dd",
                  "space":100,
                  "fontSize":dsf.config.commonForm.shuke?.showWaterMark?.fontSize || 12,
                },
                btnLeftPadding :dsf.config.commonForm.shuke.btnStyleSet?.btnLeftPadding,   //设置顶部图标内间距
                btnDrawablePadding :dsf.config.commonForm.shuke.btnStyleSet?.btnDrawablePadding,  //设置图标文字间距
                btnFontSize :dsf.config.commonForm.shuke.btnStyleSet?.btnFontSize,  //设置文字大小
                btnEraserLight:dsf.config.commonForm.shuke.btnStyleSet?.btnEraserLight ,
                TimerTaskUrl:dsf.config.commonForm.shuke.TimerTaskUrl,
                TimerTaskPeriod:dsf.config.commonForm.shuke.TimerTaskPeriod
            };
            console.log("调用数科传的参数", obj, '===',this.fileData,'-----',this.formData);
            if (dsf.util.getClientName() == 'wechat') {
                wx.invoke('ext_sySignSdk_startSign', {
                    data: obj
                }, (res) => {
                    if (res.result == "true") {
                        if (JSON.parse(res.data).type == 'send' || JSON.parse(res.data).type == 'back') {
                            this.isShow = false;
                            if (!dsf.config.commonForm.shuke.isCommitCallBack==false) {
                                this.$bus.emit("iSignatureSend", {
                                    act: JSON.parse(res.data).type
                                })
                            }
                        }
                    }
                });
            } else {
                $suwell.openSuWell(JSON.stringify(obj), (res) => {
                  this.$bus.emit("addUrlTimer");
                    if (JSON.parse(res).type === "send" || JSON.parse(res).type === "back") {
                        this.isShow = false;
                        if (!dsf.config.commonForm.shuke.isCommitCallBack==false) {
                            this.$bus.emit("iSignatureSend", {
                                act: JSON.parse(res.data).type
                            })
                        }
                    }
                }, (err) => {
                    this.no_fileClick = false; //是否允许文件点击，山东金格签批
                    alert("open failed: " + err);
                });
            }
        },
        // 判断文件是否锁住状态,其他人无法继续签批
        async isSignFileLock(fileId) {
            let isLocked = false;
            // 是否开启了第三方插件拦截多人签批功能
            if (dsf.config.commonForm.isInterceptMultiPersonSign) {
                await dsf.http
                    .post("fn/office/isLock", {
                        fileId: fileId,
                    })
                    .then(res => {
                        console.log("isLock-res", res);

                        if (res.data.type == 'error') {
                            // 别人在操作
                            dsf.layer.alert({
                                message: "当前文件正在由" + res.data.data.uname + "办理，请稍后处理。",
                            });
                            isLocked = true;
                        }
                    })
            }
            return isLocked;
        },
        // 文件修改签批过程定时轮询
        continueLockFile(fileId) {
            // 是否开启了第三方插件拦截多人签批功能
            if (dsf.config.commonForm.isInterceptMultiPersonSign) {
                this.fileTimer = setInterval(() => {
                    dsf.http
                        .post("fn/office/continueLock", {
                            fileId: fileId,
                        })
                        .then((res) => {
                            console.log(res, '文件定时上锁')
                        })
                }, 30000);
            }
        },
        shGovShuke(item) {
            let type = item.title.substr(item.title.lastIndexOf(".") + 1)
            let file = {
              id: item.id,
              title: (type != "ofd" && type != "pdf") ? item.title.substr(0, item.title.lastIndexOf(".")) + ".pdf" : item.title,
              isHandleWrite: true,
              isAfterReading: false,
              openToPage: item.pagination || 0
            }
            let formData = {
              info_id: this.formMeta.parameters.pk,
              moduleId: this.formMeta.parameters.moduleId,
              nodeId: this.formMeta.parameters.nodeId,
              nodeName: this.formMeta.parameters.nodeName,
              flowId: this.formMeta.parameters.flowId,
              pId: this.formMeta.parameters.pId,
              pnId: this.formMeta.parameters.pnId,
              type: 'todo'
            }
            try {
              dsf.shuke.shGovShuke(file, formData, (shukeRes) => {
                console.log(shukeRes)
                if (shukeRes.openTime) {
                  item.pagination = shukeRes.currentPage
                  dsf.http.post('/fn/approvalFileInformation/save', {
                    infoId: this.formMeta.parameters.pk,
                    fileId: item.id,
                    startTime: moment(Number(shukeRes.openTime)).format('yyyy-MM-DD hh:mm:ss'),
                    endTime: moment(Number(shukeRes.closeTime)).format('yyyy-MM-DD hh:mm:ss'),
                    pagination: shukeRes.currentPage,
                    readingTime: Math.floor((shukeRes.closeTime - shukeRes.openTime) / 1000)
                  }).then(res => { })
                }
                if (shukeRes.type == 'send' || shukeRes.type == 'save') {
                  this.$bus.emit("iSignatureSend", {
                    act: "send"
                  })
                }
              })
            } catch (error) {
              this.openFile(item.url, item)
            }
        },
        // 文件解锁
        destroyFileInterval(fileId) {
            clearInterval(this.fileTimer);
            this.fileTimer = null;
            if (dsf.config.commonForm.isInterceptMultiPersonSign) {
                dsf.http
                    .post("fn/office/unLock", {
                        fileId: fileId,
                    })
                    .then((res) => {
                        console.log(res, '文件解锁')
                    })
            }
        },
        // 删除当前用户对应当前文件的所有附件锁
        destroyFileIntervalAll(pk) {
            clearInterval(fileTimer);
            fileTimer = null;
            if (dsf.config.commonForm.isInterceptMultiPersonSign) {
            dsf.http
                .post("fn/office/releaseLock", {
                pk: pk,
                })
                .then((res) => {
                console.log(res, "所有文件解锁成功");
                });
            }
        },
        openFile(url, item, edit) {
            if (this.formMeta?.parameters) {
                let params = this.formMeta.parameters;
                // viewAttachUseSignMode系统设置里预览使用签批模式
                this.isPreview = (params.viewAttachUseSignMode > 0 && item.isHandwrite > 0) ? false : true
            }
            this.fileObj = item;
            this.canPopFileEdit = item.canEdit != -1 && !edit;
            const index = item.navtiveUrl.lastIndexOf(".");
            const suffix = item.navtiveUrl.substr(index + 1);
            const toLowerSuffix = suffix.toLowerCase();
            //图片数组
            let imgArr = ["png", "jpg", "jpeg", "bmp", "gif"];
            if (toLowerSuffix == "mp4") { //视频直接播放
                this.videoPreview = true;
                this.previewVideo = url;
            } else if (item.navtiveUrl.indexOf("http") == 0 && item.navtiveUrl.indexOf("response-content-type=image") > -1) { //图片直接预览，两种模式，一个弹层，一个直接显示
                this.localImgPreview(item.navtiveUrl);
            } else if (imgArr.indexOf(toLowerSuffix) > -1) { //图片直接预览，两种模式，一个弹层，一个直接显示
                this.localImgPreview(url);
            } else if (edit == "iSignature") { //启用金格的手写签批
                this.iSignature(item, item.initUrl, suffix);
            } else if (edit == "dianJu") { //启用点聚的手写签批
                this.dianJuFileOpen(item, item.initUrl, suffix);
            } else if (edit == "shuke" && !(dsf.config.commonForm?.shuke?.fileTypes?.indexOf(suffix)<=-1)) {//启用数科的手写签批
                if (dsf.util.getClientName() == 'wechat' && dsf.config.projectName == 'shGovYth') {
                  this.shGovShuke(item)
                } else {
                  this.shukeFileOpen(item, item.initUrl, suffix);
                }
            } else if (dsf.config.commonForm.wdzt?.isEnable) {//启用文档中台预览
                let param = { edit: edit, fileId: item.id, fileName: item.title, infoId: item.infoId, moduleId: item.moduleId, pId: this.fileData.flowId, pnId: this.fileData.nodeId }
                this.wdztShow = true
                this.wdztParams = param
            } else if (dsf.config.commonForm.aoxiong?.isEnable && suffix=="pdf" && item.isHandwrite > 0) {//启用傲雄签批
                let initUrl= `fn/office/downloadFile?infoId=${item.infoId}&fileId=${item.id}&fileName=${item.title}&nrType=${item.type}&moduleId=${item.moduleId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&fullfilename=${item.title}&file=${item.title}`;
                let save_url =
                `fn/aosController/saveFile?fileId=${item.id}&moduleId=${
                item.moduleId
                }&pnId=${this.formMeta.parameters.pnId}&nodeName=${this.formMeta.parameters.nodeName}&pk=${
                item.infoId
                }`;
                let param = { save_url,initUrl,thirdBizId:item.id,edit: edit, fileId: item.id, fileName: item.title, infoId: item.infoId, moduleId: item.moduleId, pId: this.fileData.flowId, pnId: this.fileData.nodeId }
                this.aoxiongShow = true
                this.aoxiongParams = Object.assign(this.aoxiongParams,param)
            } else if (dsf.config.commonForm.yzyWps) { //是否启用粤政易wps，只有在粤政易App中有效
                if (dsf.config.commonForm.LocalPdfPreview && edit != 'edit') {
                    this.localFilePreviewOrEdit(url, item, edit, suffix);
                } else {
                    this.yzyWpsOpenFile(item, url, toLowerSuffix);
                }
            } else if (navigator.userAgent.includes("DreamSoft")) { //公司打包App中
                if (dsf.config.commonForm.xsfWPSofd && toLowerSuffix == "ofd") {
                    this.XsfOpenFile(item.initUrl, item);
                } else if (dsf.config.commonForm.nativeWps) {
                    if (dsf.config.commonForm.LocalPdfPreview && edit != 'edit' || toLowerSuffix == "ofd") {
                        this.localFilePreviewOrEdit(url, item, edit, suffix);
                    } else {
                        this.wpsOpen(item, item.initUrl, suffix);
                    }
                } else if (dsf.config.commonForm.dianJu?.isEnable && toLowerSuffix == "ofd" && edit != 'edit') {
                    if (dsf.config.commonForm.LocalPdfPreview || this.$route.query.LocalPdfPreview) {
                        this.localFilePreviewOrEdit(url, item, edit, suffix);
                    } else {
                        this.dianJuFileOpen(item, item.initUrl, suffix);
                    }
                } else {
                    this.canPopFileEdit = item.canEdit != -1 && edit != 'edit'
                    this.localFilePreviewOrEdit(url, item, edit, suffix);
                }
            } else {
                this.canPopFileEdit = item.canEdit != -1 && edit != 'edit'
                this.localFilePreviewOrEdit(url, item, edit, suffix);
            }
        },
        localImgPreview(url) { //本地图片预览
            if (this.isControl || dsf.config.commonForm.tabPaneShowFile) { // 为表单控件则弹层预览
                this.imgPreview = true;
                this.previewImg = [url];
            } else { // tab则图片直接展示
                this.fileUrl = url;
                this.isShow = false;
            }
        },
        localFilePreviewOrEdit(url, item, edit, suffix) { //本地文件预览、编辑
            if (edit == 'edit') {
                this.fileUrl = item.editUrl;
            } else {
                this.fileUrl = url;
            }
            if (dsf.config.commonForm.webViewPreview) {
                let rootPath = dsf.url.getRootPath()
                let tempurl = rootPath + this.fileUrl.replace("../", "")
                dsf.util.openWebviewToUrl({ url: tempurl, title: item.title })
            } else if (this.isControl || dsf.config.commonForm.tabPaneShowFile) { // 为表单控件则弹层预览
              if (!edit && dsf.config.commonForm.locationHrefToFile && (suffix == 'ofd' || suffix == 'pdf')) { // wx使用底座预览
                  dsf.layer.loading()
                  dsf.http.get("/fn/fileToken/get").then(res => {
                    dsf.layer.clear()
                    console.log(res.data)
                    if (res.data.data) {
                      let url = dsf.url.getRootPath() + `fn/fileToPdf/download?fileId=${item.id}&token=${res.data.data}&userId=${dsf.util.loadSessionStore("user").user_id}`
                      wx.invoke(
                      "openUrl",
                      {
                        type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
                        url: url
                      },
                      function (res) {
                        if (res.err_msg != "openUrl:ok") {
                          //错误处理
                        }
                      }
                    )
                    }
                  })
                } else {
                  this.fileShow = true
                  this.popFile = item
                  this.isPreview = true;
                }
            } else {
                // this.isShow = false;
                if (dsf.config.commonForm.LocalDocPreview) this.popFile = item;
            }
        },
        closePop() {
            this.isShow = false;
        },
        addFile(data) {
            this.fileList.push(data);
            this.fileUrl = data.url;
            this.fileObj = data;
            if (!dsf.config.commonForm.tabPaneShowFile && !this.isControl) { // 表单控件和相关文件tab列表显示时不打开
                this.openFile(this.fileUrl, this.fileObj)
            }
        },
        deleteFile(obj) {
            this.fileList = obj.filelist;
            this.fileList.forEach((item, index) => {
                if (item.id == obj.fileData.id) {
                    this.fileList.splice(index, 1);
                }
            });
            if (this.fileObj.id == obj.fileData.id) {
                this.fileUrl = this.fileList[0] ? this.fileList[0].url : "";
                this.fileObj = this.fileList[0] ? this.fileList[0] : {};
            }
            if (this.fileList.length > 0) {
                if (!dsf.config.commonForm.tabPaneShowFile && !this.isControl)
                    this.openFile(this.fileUrl, this.fileObj)
            } else {
                this.popFile = {}
            }
        },
        goPreview() {
            // if(this.formMeta.parameters.viewAttachUseSignMode>0)
            //     return;
            this.isPreview = true;
            this.isFullScreen = false;
        },
        fullScreen() {
            this.isFullScreen = !this.isFullScreen;
            let topdistance = 0;
            if (dsf.config.appTopMenu ?.value) topdistance = 46;
            if (document.querySelector('.smt-tab')) {
                document.querySelector('.smt-tab').style.top = JSON.stringify(this.isFullScreen ? 0 : topdistance + 50) + 'px';
            }
        },
        closeFileShow() {
            this.fileShow = false;
            // this.isPreview = true;
            if (this.$refs.enclosurePreview)  this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
            this.$bus.emit("addUrlTimer");
        },
        changeFrameHeight(){
            console.log("changeFrameHeight高度变化")
            let that = this;
            this.$nextTick(() => {
                try {
                    let parentHeight = that.$refs.enclosurePre.offsetHeight;
                    console.log("parentHeight高度变化"+parentHeight)
                    document.querySelector("#filePreview").style.height = parentHeight + 'px';
                } catch (e) {
                    //跨域获取不到
                    throw new Error("自定义错误setIframeHeight Error");
                }
            })

        },
        isShowEnclosureBtn(val){
            this.isShowFileBtn = val;
        },
        ifFileEdit(title) {
            const index = title.lastIndexOf(".");
            const suffix = title.substr(index + 1);
            let typeList = ['doc','docx','wps','xls','xlsx','et','ppt','pptx']
            return typeList.some(item => item == suffix)
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.van-nav-bar {
  @include font-theme("normal");

  .van-icon {
    @include font-theme("normal");
    @include font_5;
    margin-right: 3px;
  }
}

.verticalScroll {
  overflow-y: scroll;
  overflow-x: hidden;
}

.ds-enclosure-pre {
  width: 100%;
  // height: calc(100vh - 147px);
  height: 100%;
  // background-color: #fff;

  // margin-top: 13px;
  * {
    box-sizing: border-box;
  }

  iframe {
    width: 100%;
    height: 100%;
  }

  .videoBox {
    background-color: rgba(0, 0, 0, 0.8);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .btn-toggle-container {
    //height: 100%;
    display: flex;
    flex-direction: column;

    .btn-box {
      display: flex;
      width: 100%;
      overflow-x: auto;

      span {
        display: inline-block;
        text-align: center;
        margin: 5px 2px;
        border-radius: 24px;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        white-space: nowrap;
        padding: 0 10px;
        font-size: var(--font_size_3);
        line-height: 26px;
        @include font-theme("normal");
      }

      .actived {
        @include background-theme("normal");
        @include font-theme("button_auxiliary_bgcolor");
      }
    }

    .btn-box-right {
      display: flex;
      position: absolute;
      right: 5px;

      span {
        margin: 5px 0 5px 5px;
        @include font-theme("normal");
        @include border-color-theme("normal");
        border: 1px solid;
        padding: 2px 5px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

// 附件-悬浮按钮
.ds-enclosure-button {
  margin: 0 !important;
  padding: 0 !important;
  height: 0 !important;
  width: 0 !important;
  @include font_4();
  // position: relative;
  z-index: 10000;

  * {
    box-sizing: border-box;
  }

  .__e_ {
    &button {
      display: block;
      width: 40px;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      @include background-theme("normal");
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.29);
      position: absolute;
      bottom: 45px;
      right: 24px;
      z-index: 1;

      i {
        display: inline-block;
        font-size: 24px;
        transform: rotate(-45deg);
      }
    }
    &buttonTxt {
      display: block;
      width: 44px;
      height: 44px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      border-radius: 10%;
      @include background-theme("normal");
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.29);
      position: absolute;
      bottom: 45px;
      right: 24px;
      z-index: 1;
      padding: 4px;
    }
  }

  .__file_ {
    &empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #aaa;
    }

    &list {
      padding: 12px 0;
      display: flex;
      flex-direction: column;
    }
  }

  .__list_loading {
    text-align: center;
  }
}

.relevant-popup {
  display: flex;
  flex-direction: column;

  .popup-title {
    text-align: center;
    font-size: var(--font_size_2);
    // font-weight: bold;
    padding: 0.3rem;
    border-bottom: 5px solid #f1f2f4;
  }

  .popup-content {
    flex: 1;
    overflow: scroll;
  }
}

.fontTheme {
  @include font-theme("normal");
}

.filePop {
  height: 100%;
  display: flex;
  flex-direction: column;

  iframe {
    flex: 1;
  }

  .btn-container {
    background-color: #fff;
    width: 100%;
    padding: 12px;

    .btn {
      width: 100%;
    }
  }
}

.fullScreen {
  position: fixed;
  top: 0;
  z-index: 999;
}

.iconBox {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 2px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  img {
    margin: 8px 6px;
    width: 0.48rem;
    height: 0.48rem;
  }
}

::v-deep.van-popover--light {
  .van-popover__content {
    box-shadow: 0 2px 12px #666 !important;
  }
}

.van-checkbox {
  margin: 10px;
}
</style>
