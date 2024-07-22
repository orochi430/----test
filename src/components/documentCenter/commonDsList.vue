<template>
    <div :class="[mobileStyle == '2' ? 'ds-listRow' : (isBtnDrawerShow ? 'ds-drawer-list' : 'ds-list')]">
        <div class="ds-drawer-tips" v-if="isBtnDrawerShow && showTips && openSwipeNum < 3">
            <i></i>
            <span>左滑显示按钮操作</span>
        </div>
        <div v-for="(item, index) in data" :key="item.id || `item-${index}`" class="ds-item">
            <component :is="mobileStyle == '2' ? 'DsfListRow' : (isBtnDrawerShow ? 'DsfDrawerCard' : 'DsfCard')" @openSwipe="openSwipe">
                <div slot="tabspageCheck" v-if="showCheck">
                    <van-checkbox v-model="item.checked" icon-size="16px" @change="checkChange(item)"></van-checkbox>
                </div>
                <div slot="content" v-if="htmlTemplate" @click="link(item, index)">
                    <DsListTemplate :html="htmlTemplate" :dataValue="item.dataValue" @columnClick="templateColumnClick(arguments)"></DsListTemplate>
                </div>
                <template v-else>
                    <div slot="header" @click="link(item, index)"
                        :class="{ 'clamp': dsf.config.commonList && dsf.config.commonList.titleEllipsis }"
                        v-if="item['dataValue'][getTitle().showMetaColumn] || $route.query.needSerial">
                        <span v-if="$route.query.needSerial">{{ index + 1 }}、</span>
                        <template
                            v-if="!(dsf.config.commonList && dsf.config.commonList.isFideReadStatusIcon) && isShowReadStatus(item)">
                            <span v-if="readStatusType == 'triangle'" class="readStatus-triangle"
                                :style="{ borderColor: readStatusColor }"></span>
                            <span v-else-if="noGreenIcon == undefined" class="isStatus"
                                :style="item['dataValue'].readStyle || { backgroundColor: readStatusColor }"></span>
                        </template>
                        <img v-if="item.dataValue.backReason" src="static/images/platform/tui.png" class="jinji" />
                        <img v-if="showJinJi(item)" :src="showJinJi(item)" class="jinji" />
                        <template v-for="(column, index) in iconBeforeTitles">
                            <span v-if="item['dataValue'][column.showMetaColumn]" :key="`iconBeforeTitle-${index}`"
                                class="iconBeforeTitle" :style="item['dataValue'].iconBeforeTitleStyle">{{
                                item['dataValue'][column.showMetaColumn] }}</span>
                        </template>
                        <span
                            :style="item['dataValue'].titleStyle || { color: getTitle().color || '', 'word-wrap': 'break-word', 'word-break': 'break-all' }"
                            :class="{ 'col-title': isShowReadStatus(item) }" v-html="item['dataValue'][getTitle().showMetaColumn]"></span>
                    </div>
                    <div slot="content" @click="link(item, index)" class="content">
                        <slot :item="item" name="item-content">
                            <div v-if="showImgList.length > 0" class="flex1">
                                <div class="clearFloat">
                                    <div class="listImg">
                                        <img :src="getListImg(item)">
                                    </div>
                                    <div class="smallTitle">
                                        <template v-for="(column, index) in needTitles">
                                            <div :key="`needTitles-${index}`" class="subTitle">
                                                <span class="name label ellipsis">
                                                    <Icon v-if="column.icon" :class="['iconfont', column.icon]"
                                                        :key="`needTitles-${index}`" />{{ column.showName }}：
                                                </span>
                                                <span :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                    class="label val elips"
                                                    v-html="item['dataValue'][column.showMetaColumn]"></span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="flex1">
                                <div v-if="needBoldTitle.length > 0" class="needBoldTitle">
                                    <template v-for="(column, index) in needBoldTitle">
                                        <div :key="`needTitles-${index}`" class="subTitle"
                                            v-if="!(!isShowNullColumn && !item['dataValue'][column.showMetaColumn])">
                                            <span class="name label ">
                                                <Icon v-if="column.icon" :class="['iconfont', column.icon]"
                                                    :key="`needTitles-${index}`" />{{ column.showName }}：<span
                                                    :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                    class="label val"
                                                    v-html="item['dataValue'][column.showMetaColumn]"></span>
                                            </span>
                                        </div>
                                    </template>
                                </div>
                                <div v-if="needTitleSubs.length > 0" class="aSubTitles">
                                    <template v-for="(column, index) in needTitleSubs">
                                        <div :key="`aSubTitles-${index}`" class="subTitle">
                                            <span class="label">{{ column.showName }}：</span>
                                            <span :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                class="label">{{
                                                item['dataValue'][column.showMetaColumn]
                                                }}</span>
                                        </div>
                                    </template>
                                </div>
                                <div v-if="aSubTitles.length > 0" class="aSubTitles">
                                    <template v-for="(column, index) in aSubTitles">
                                        <div :key="`aSubTitles-${index}`" class="subTitle" :style="{flex: aSubTitles.length==3 ? '1' : ''}">
                                            <Icon v-if="column.icon && item['dataValue'][column.showMetaColumn]" :class="['iconfont', column.icon]" />
                                            <DsListTemplate v-if="column.mobileCellText" :html="column.mobileCellText" :dataValue="item.dataValue"></DsListTemplate>
                                            <span v-else-if="!column.mobileCellText && showSubTitle"
                                                :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                class="label">{{
                                                column.showName
                                                }}:</span>
                                            <span v-else :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                class="label" v-html="item['dataValue'][column.showMetaColumn]"></span>
                                        </div>
                                    </template>
                                </div>
                                <div v-if="needTitles.length > 0" class="needTitles">
                                    <template v-for="(column, index) in needTitles">
                                        <div :key="`needTitles-${index}`" class="subTitle"
                                            v-if="!(!isShowNullColumn && !item['dataValue'][column.showMetaColumn])">
                                            <span class="name label ellipsis">
                                                <Icon v-if="column.icon" :class="['iconfont', column.icon]"
                                                    :key="`needTitles-${index}`" />{{ column.showName }}：
                                            </span>
                                            <span :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                class="label val elips"
                                                v-html="item['dataValue'][column.showMetaColumn]"></span>
                                        </div>
                                    </template>
                                </div>
                                <div v-if="needTitlesSingleLine.length > 0" class="needTitles needTitlesSingleLine">
                                    <template v-for="(column, index) in needTitlesSingleLine">
                                        <div :key="`needTitlesSingleLine-${index}`" class="subTitle"
                                            v-if="!(!isShowNullColumn && !item['dataValue'][column.showMetaColumn])">
                                            <p
                                                :class="{ showImgP: column.showMetaColumn == 'address' || column.showMetaColumn == 'seatNum' }">
                                                <span class="name label ellipsis">
                                                    <Icon v-if="column.icon" :class="['iconfont', column.icon]"
                                                        :key="`needTitlesSingleLine-${index}`" />{{ column.showName }}:
                                                </span>
                                                <span :style="{ color: column.color }" class="label val elips"
                                                    v-html="item['dataValue'][column.showMetaColumn]"></span>
                                                <i v-show="column.showMetaColumn == 'address' && item['dataValue']['addressImg']"
                                                    :class="{ showAddImg: item['dataValue']['addressImg'] }"
                                                    @click.stop="showMeetingAdd(item)"></i>
                                                <i v-show="column.showMetaColumn == 'seatNum' && (item['dataValue']['ryId']||item['dataValue']['seatFileId'])"
                                                    :class="{ showSeatImg: item['dataValue']['seatNum'] }"
                                                    @click.stop="showMeetingSeat(item)"></i>
                                            </p>
                                        </div>
                                    </template>
                                </div>
                                <div v-if="titleLinkTo.length > 0" class="needTitles">
                                    <template v-for="(column, index) in titleLinkTo">
                                        <div :key="`titleLinkTo-${index}`" class="subTitle" style="line-height:0.6rem"
                                            @click.stop="subtitleLinkTo(item, column.showMetaColumn)">
                                            <span class="name label ellipsis">
                                                <Icon v-if="column.icon" :class="['iconfont', column.icon]"
                                                    :key="`titleLinkTo-${index}`" />
                                                {{ column.showName }}：
                                            </span>
                                            <span
                                                :style="item['dataValue'].subtitleStyle || { color: column.color, flex: 1 }"
                                                class="label val elips"
                                                v-html="item['dataValue'][column.showMetaColumn]"></span>
                                            <van-icon name="share-o" />
                                        </div>
                                    </template>
                                </div>
                                <div v-if="needIconTitles.length > 0" class="needIconTitles">
                                    <template v-for="(column, index) in needIconTitles">
                                        <div :key="`needIconTitles-${index}`" class="subTitle">
                                            <span class="name label ellipsis">
                                                <div v-if="isShowColumn(column, item)" :key="`titleIcon-${index}`"
                                                    class="s_moduleIcon" :style="titleIconColor(item, column)">
                                                    <span>{{ item['dataValue'][column.showMetaColumn].substr(0, 1) }}</span>
                                                </div>
                                                {{ column.showName }}：
                                            </span>
                                            <span :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                class="label val elips">{{
                                                item['dataValue'][column.showMetaColumn]
                                                }}</span>
                                        </div>
                                    </template>
                                </div>
                                <div v-if="bSubTitles.length > 0" class="bSubTitles">
                                    <template v-for="(column, index) in bSubTitles">
                                        <div v-if="isShowColumn(column, item)" :key="`bSubTitles-${index}`"
                                            class="subTitle">
                                            <Icon v-if="column.icon" :class="['iconfont', column.icon]" />
                                            <span v-if="showSubTitle"
                                                :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                class="label">{{
                                                column.showName
                                                }}:</span>
                                            <span :style="item['dataValue'].subtitleStyle || { color: column.color }"
                                                :class="['label', `ds-elips-${column.showRows || 1}`]">{{
                                                item['dataValue'][column.showMetaColumn]
                                                }}</span>
                                        </div>
                                    </template>
                                </div>
                                <ControlProgress v-if="showProgress" :StartTime="item['dataValue'][StartTime]"
                                    :EndTime="item['dataValue'][EndTime]"></ControlProgress>
                            </div>
                            <div v-if="titleIcon.length > 0">
                                <template v-for="(column, index) in titleIcon">
                                    <div v-if="isShowColumn(column, item)" :key="`titleIcon-${index}`" class="moduleIcon"
                                        :style="titleIconColor(item, column)">
                                        <span>{{ item['dataValue'][column.showMetaColumn].substr(0, 1) }}</span>
                                    </div>
                                </template>
                            </div>
                        </slot>
                        <slot :item="item" name="item-extend"></slot>
                    </div>
                </template>
                <div :slot="dsf.config.commonList && dsf.config.commonList.btnToggleShow ? 'footermin' : 'footer'"
                    v-if="isShowListBtn && filterBtn(item.buttons) && dsf.config.commonList && !dsf.config.commonList.isBtnDrawerShow">
                    <slot :item="{}" name="item-footer">
                        <DsfButtonToolbox :buttons="item.buttons || {}" :more="true" size="small"
                            @commonClick="(action) => { handleCommonClick(action, item, index) }"
                            @mainClick="(action) => { handleMainClick(action, item, index) }" />
                    </slot>
                </div>
                <div slot="rightIcon" v-if="statusIcon.length > 0">
                    <template v-for="(column, index) in statusIcon">
                        <DsListTemplate v-if="isShowColumn(column, item)" :html="column.mobileCellText" :dataValue="item.dataValue"></DsListTemplate>
                        <!-- <div v-if="isShowColumn(column, item)" :key="`statusIcon-${index}`" class="moduleIcon">
                            <span>{{ item['dataValue'][column.showMetaColumn].substr(0, 1) }}</span>
                        </div> -->
                    </template>
                </div>
                <div slot="rightbtn" v-if="isShowListBtn && filterBtn(item.buttons) && dsf.config.commonList && dsf.config.commonList.isBtnDrawerShow" >
                    <slot :item="{}" name="item-footer">
                        <DsfButtonSwipe :buttons="item.buttons || {}" :more="true" size="small"
                            @commonClick="(action) => { handleCommonClick(action, item, index) }"
                            @mainClick="(action) => { handleMainClick(action, item, index) }"  />
                    </slot>
                </div>
            </component>
        </div>
        <commonempty v-if="!data.length && !$parent.loading"></commonempty>
        <commonDialog v-if="componentName != ''" ref="commonDialog" :componentName="componentName" :list-data="rowData"
            @closeCallback="closeCallback"></commonDialog>
        <!-- 播放弹框 -->
        <van-popup :style="{ height: '100%' }" v-model="video.showVideo" :close-on-click-overlay="false" lock-scroll
            position="bottom" get-container="#app">
            <div v-if="video.showVideo">
                <VPlayer :video="video"></VPlayer>
            </div>
        </van-popup>
    </div>
</template>

<script>
import DsfListRow from "./DsfListRow";
import DsfCard from "./DsfCard";
import DsfDrawerCard from "./DsfDrawerCard";
import DsfButtonGroup from "./DsfButtonGroup";
import DsListTemplate from "./dsListTemplate";
import DsfButtonToolbox from "./DsfButtonToolbox";
import DsfButtonSwipe from "./DsfButtonSwipe";
import ControlProgress from "./controlProgress";
// import VPlayer from "@/components/common/VideoPlayer";
// import commonDialog from "@/components/commonForm/tabComponents/commonDialog.vue";
import { ImagePreview } from "vant";
import {
    Icon
} from "vant";

export default {
    components: {
        DsfListRow,
        DsfCard,
        DsfButtonGroup,
        DsfButtonToolbox,
        Icon,
        ControlProgress,
        'VPlayer': () => import('@/components/common/VideoPlayer'),
        DsListTemplate,
        DsfButtonSwipe,
        DsfDrawerCard,
        'commonDialog': () => import('@/components/commonForm/tabComponents/commonDialog.vue')
    },
    props: {
        linkTo: {
            type: Object
        },
        data: {
            type: Array,
            default: () => []
        },
        params: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Array,
            default: () => []
        },
        type: {
            type: String
        },
        isHiddenBtn: {
            type: Boolean,
            default: () => undefined
        },
        noGreenIcon: {
            type: String,
            default: () => undefined
        },
        tabsPage: {
            type: Boolean
        },
        clickTabIndex: {
            type: Number
        },
        routeKey: {
            type: String
        },
        showCheck: { //是否显示选择项
            type: Boolean,
            default: () => false
        },
        checkType: { //选择类型  单选还是多选
            type: String,
            default: 'checkBox'
        },
        keyColumn: {
            type: String
        },
        listId: {
            type: String
        },
        listmoduleId: {
            type: String
        },
        showSubTitle: {
            type: Boolean,
            default: () => false
        },
        mobileStyle: {
            type: String | Number
        },
        spHandleJs: {
            type: Object,
            default: () => {
            }
      },
      justShowCard: {
        type: Boolean,
        default: () => false
      },
      showTips: {
        type: Boolean,
        default: () => false
      }
    },
    watch: {
        showCheck() {
            console.log("this.showCheck=", this.showCheck)
        },
        spHandleJs: {
            /*
            把initHandle放到监听里面，为了解决项目组的特殊JS异步加载时
            无法获取到spHandleJs对象的bug
            2022年9月16日17:01:00 @luy
            */
            handler(newValue, oldValue) {
                if (newValue) {
                    if (this.spHandleJs?.initHandle) {
                        this.spHandleJs.initHandle(this);
                    }
                }
            },
            deep: true,
            immediate: true
        },
    },
    data() {
        return {
            video: {
                showVideo: false,
                videoTitle: "",
            },
            showProgress: false,
            showImgListColumn: "",
            alwaysShowStatus: false,
            readStatusKey: '', // 阅读状态字段
            haveReadVal: '', // 已读状态值
            isShowNullColumn: true, // 是否显示值为空的项
            key: '',
            openSwipeNum: Number(dsf.util.loadLocalStore('openSwipeNum')) || 0,
            readStatusType: dsf.config.commonList?.readStatusType || '',
            readStatusColor: dsf.config.commonList?.readStatusColor || '',
            componentName: "",
            rowData: ""
        };
    },
    created() {
    },
    mounted() {
    },
    computed: {
      isBtnDrawerShow() {
        return !this.justShowCard && dsf.config.commonList && dsf.config.commonList.isBtnDrawerShow
      },
        isShowReadIcon() {
          return !(this.noGreenIcon || this.params.hideReadStatus)
        },
        htmlTemplate() {
            let column = this.columns.find(it => it.showCategory == 'userTemplate')
            return column && column.mobileDisplayContent ? column.mobileDisplayContent.replace(/cksp/g, 'click.stop') : ''
        },
        showImgList() {
            let temp = this.columns.filter(it => /^imageLabel$/i.test(it.showCategory)); // 带图片的列表
            if (temp.length) {
                this.showImgListColumn = temp[0].showMetaColumn
            }
            return temp
        },
        needTitleSubs() {
            return this.columns.filter(it => /^needTitleSub$/i.test(it.showCategory)); // 带标题不占单行
        },
        needBoldTitle() {
            return this.columns.filter(it => /^needBoldTitle$/i.test(it.showCategory)); // 带标题加粗显示占单行
        },
        aSubTitles() {
            return this.columns.filter(it => /^subTitle\w?$/i.test(it.showCategory)); // 带图标不占单行
        },
        bSubTitles() {
            return this.columns.filter(it => /^content$/i.test(it.showCategory)); // 纯内容单行
        },
        titleLinkTo() {
            return this.columns.filter(it => /^titleLinkTo$/i.test(it.showCategory)); // 带标题单行
        },
        needTitles() {
            return this.columns.filter(it => /^needTitle$/i.test(it.showCategory)); // 带标题单行
        },
        needIconTitles() {
            return this.columns.filter(it => /^needIconTitle\w?$/i.test(it.showCategory)); // 右下角单字图标
        },
        isShowListBtn() {
            return this.isHiddenBtn == undefined ? true : false;
        },
        titleIcon() {
            return this.columns.filter(it => /^titleIcon\w?$/i.test(it.showCategory)); // 标题前展示成标签样式
        },
        iconBeforeTitles() {
            return this.columns.filter(it => /^iconBeforeTitle\w?$/i.test(it.showCategory)); // 标题前显示图标
        },
        needTitlesSingleLine() {
            return this.columns.filter(it => /^needTitles\w?$/i.test(it.showCategory)); // 带标题单行,内容也单行
        },
        statusIcon() {
            return this.columns.filter(it => /^statusIcon\w?$/i.test(it.showCategory)); // 标题前展示成标签样式
        },
    },
    methods: {
        getListImg(item) {
            if (item.dataValue[this.showImgListColumn].indexOf("http") == 0) {
                return item.dataValue[this.showImgListColumn]
            } else {
                return dsf.url.getServerUrl(`fn/file/downloadImage?fileName=${item.dataValue[this.showImgListColumn]}`)
            }

        },
        //选择项改变时触发，当单选按钮并且是选中状态触发回调，否则复选时一直触发该回调函数
        checkChange(item) {
            if (this.checkType == "radio" && item.checked) {
                this.$emit("checkClick", item);
            } else if (this.checkType == "checkBox") {
                this.$emit("checkClick", item);
            }
        },
        isShowColumn(column, item) {
            return (
                item["dataValue"][column.showMetaColumn] ||
                item["dataValue"][column.showMetaColumn] === 0
            );
        },
        showJinJi(item) {
            let urgent = ""
            if (item.dataValue.jjcd != undefined) {
                urgent = item.dataValue.jjcd
            } else if (item.dataValue.urgent != undefined) {
                urgent = item.dataValue.urgent
            } else if (item.dataValue.isUrgent != undefined) {
                urgent = item.dataValue.isUrgent
            } else {
                return ""
            }
            const urgentConfig = dsf.config.commonList?.urgent
            if (urgentConfig && Array.isArray(urgentConfig)) {
                return urgentConfig.find(item => item.codeValue == urgent)?.imgUrl
            } else {
                const jinjiPng='static/images/platform/jinji.svg';
                const tejiPng='static/images/platform/teji.svg';
                if (item.dataValue.jjcd == 2) {
                    return jinjiPng
                } else if (item.dataValue.jjcd == 3) {
                    return tejiPng
                }
            }
            return ""
        },
        isShowReadStatus(item) {
            let self = this;
            if (self.alwaysShowStatus) return true; // 江苏烟草未读邮件列表都为未读，无字段区分，默认都显示未读状态样式
            if (self.readStatusKey && self.haveReadVal) { // 特殊列表阅读状态字段
                return item['dataValue'] && item['dataValue'][self.readStatusKey] != self.haveReadVal
            }
            if (self.$route.query.fileType == "xxtx") {
                return item['dataValue'] && item['dataValue']['readStatus'] != 1
            }
            if (self.$route.query.fileType == "hytz" || (self.params.fileType && self.params.fileType.includes("hytz"))) {
                return item['dataValue'] && item['dataValue']['readStatus'] != true
            }
            if (self.$route.query.fileType == "tzgg") {
                return item['dataValue'] && item['dataValue']['status'] != '2'
            } else if ('isRead' in item.dataValue) {
                return item['dataValue'] && !item['dataValue']['isRead']
            }
            if ('readStatus' in item.dataValue) {
                return item['dataValue'] && (item['dataValue']['readStatus'] != '2')
            } else if ('C-BJ-0004' in item.dataValue) {
                return item['dataValue'] && item['dataValue']['C-BJ-0004'] != '2'
            } else {
                return false
            }
        },
        link(item, index) {
            //将选中行的数据传给commondialog
            this.rowData = item
            let scrollTop = document.documentElement.scrollTop
            this.$emit('itemClick', { index, scrollTop })
            if (this.showCheck) {
                if (item.checked === undefined) {
                    this.$set(item, 'checked', !item.checked)
                } else {
                    item.checked = !item.checked
                }
                return
            }
            // 配置项特殊跳转
            let linkToQuery = {

            }
            // listJson配置的跳转参数
            if (this.linkTo) {
                if (this.linkTo.query) { // 有跳转参数
                    if (this.linkTo.isFixedValue) { // 参数是固定值
                        for (let [k, v] of Object.entries(this.linkTo.query)) {
                            linkToQuery[k] = v
                        }
                    } else {
                        for (let [k, v] of Object.entries(this.linkTo.query)) {
                            //只有value在行数据内的才替换  否则不替换,使用原来的值   2022年9月1日13:35:23 @ly
                            if (item.dataValue.hasOwnProperty(v)) {
                                linkToQuery[k] = item.dataValue[v]
                            } else {
                                linkToQuery[k] = v
                            }
                        }
                    }
                }
                if (this.linkTo.path && this.linkTo.path != '/commonForm') {
                    this.$router.push({
                        path: this.linkTo.path,
                        query: linkToQuery
                    })
                    return
                }
            }
            if (this.$route.query.notLink || this.params?.notLink) return
            if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
                dsf.layer.toast("该文件只能在电脑端处理")
                return
            }
            if ('isRead' in item.dataValue && !item.dataValue.isRead) {
                item.dataValue.isRead = true
            }
            if (this.keyColumn == "") return;
            if (this.$route.query.fileType == "weidaka") {
                return
            }
            let itemValue = item.dataValue;
            let pkValue = ""
            let pk_A0001 = Object.entries(itemValue).find(item => item[0].includes("A0001"))
            let pk = itemValue[this.keyColumn] || itemValue.info_id || itemValue.id || (pk_A0001 ? pk_A0001[1] : "")
            let moduleValue_A0004 = Object.entries(itemValue).find(item => item[0].includes("A0004"))
            let moduleValue = moduleValue_A0004 ? moduleValue_A0004[1] : ""
            // console.log(moduleValue, pk)
            let fileType = this.$route.query.fileType || this.params.fileType;
            let moduleId = itemValue.moduleId || moduleValue || this.listmoduleId;
            let masterId = itemValue.masterId || "";
            let params = moduleId + "/" + pk;
            if (this.type == "gw" || fileType == "gw") {
                let isEnterTodo = 1;
                params += "/" + isEnterTodo;
            }
            if (this.type) {
                params += `?type=${this.type}`;
            }

            if (fileType) {
                params += `?type=${fileType}`;
            }

            if (this.$route.name == "SigninList") {
                //收文登记
                params += `?&listId=1903161124289nXBk8iVSmTMGYxn9bi&exchangeList=signedList`;
            }
            if (this.type == "db" || fileType == "ToOversee") {
                //首页tab督办
                params += `&masterId=${masterId}`;
            }
            if (itemValue.distribId) {//只要列表里面有这个参数，就传给表单页面
                //首页tab待阅
                params += `&distribId=${itemValue.distribId}`;
                if (itemValue.readStatus != "2") {
                    itemValue.readStatus = "2";
                    dsf.http.post('fn/mobileToRead/markRead', {
                        pks: itemValue.distribId
                    }).then(res => { })
                }
            }
            if (this.spHandleJs && this.spHandleJs.link && !this.tabsPage) {
                this.spHandleJs.link(this.listId, moduleId, pk, this, itemValue)
                return
            }

            let query = {
                listId: this.$route.query.listId || this.params?.listId || this.listId,
                method: this.$route.query.method || this.params?.method,
                formId: this.$route.query.formId || this.params?.formId,
                validateByList: this.$route.query.validateByList || this.params?.validateByList,
                dataIndex: item.dataValue.dataIndex
            }

            if (itemValue.todoId && itemValue.todoId.indexOf("_") > -1) {//todoId是待办使用的，目前有列表返回todoId但是格式不正确，增加判断
                query.todoId = itemValue.todoId;
            }
            if (this.$route.query.activeTab) { // activeTab打开表单时激活哪个tab页
                query.activeTab = this.$route.query.activeTab;
            }
            if (this.$route.query.validateByList) { // validateByList校验表单权限
                query.validateByList = this.$route.query.validateByList;
            }
            if (dsf.config.specialList && dsf.config.specialList.previewPage && dsf.config.specialList.previewPage.findIndex(item => item && this.listId && item == this.listId) > -1) {
                console.log("/previewPage/" + params)
                this.$router.push({
                    path: "/previewPage/" + params,
                    query: {
                        listId: this.listId,
                        method: this.$route.query.method
                    }
                })
                return
            }
            if (this.tabsPage) {
                item.dataValue['C-BJ-0004']=2//便笺改成已读
                this.$router.push({
                    path: "/TabCommonForm/" + this.routeKey + "/" + this.clickTabIndex + "/" + params
                });
            } else {
                this.$router.push({
                    path: "/commonForm/" + params,
                    query: Object.assign(this.$route.name != "commonForm"?query : {}, linkToQuery)
                });
            }
        },
        getTitle() {
            const target = this.columns.find(it => it.showCategory === "mainTitle");
            return target || {};
        },
        handleCommonClick(action, item, index) {
            console.log(action)
            if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
                dsf.layer.toast("该文件只能在电脑端处理")
                return
            }
            this.$emit("commonClick", action, item, index);
        },
        handleMainClick(action, item, index) {
            if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
                dsf.layer.toast("该文件只能在电脑端处理")
                return
            }
            this.rowData = item
            this.$emit("mainClick", action, item, index);
        },
        filterBtn(data) {
            if ((data && data.commonButton && data.commonButton.length > 0) || (data && data.mainButtons && data.mainButtons.length >
                0)) {
                return true
            } else {
                return false
            }
        },
        titleIconColor(item, column) {
            let start = item['dataValue'][column.showMetaColumn].substr(0, 1)
            if (dsf.config.listTitleIcon && Object.keys(dsf.config.listTitleIcon).indexOf(start) > -1) {
                let color = dsf.config.listTitleIcon[start]
                return {
                    backgroundColor: this.colorRgba(color, 0.12),
                    color: color,
                    borderColor: color,
                }
            }
            return ''
        },
        colorRgba: (sHex, alpha = 1) => {
            // 十六进制颜色值的正则表达式
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
            /* 16进制颜色转为RGB格式 */
            let sColor = sHex.toLowerCase()
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = '#'
                    for (let i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                    }
                    sColor = sColorNew
                }
                //  处理六位的颜色值
                var sColorChange = []
                for (let i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
                }
                return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
            } else {
                return sColor
            }
        },
        subtitleLinkTo(item, showMetaColumn) {
            if (this.spHandleJs && this.spHandleJs.subtitleLinkTo) {
                this.spHandleJs.subtitleLinkTo(item, showMetaColumn, this)
            }
        },
        templateColumnClick(params) {
            this.subtitleLinkTo(params[0], params[1])
        },
        //查看会议地址
        showMeetingAdd(item) {
            if ('addressImg' in item.dataValue && item.dataValue.addressImg != '') {
                //let url = 'http://192.168.7.165:8080/DreamWeb/' + item.dataValue.addressImg;
                let url = dsf.url.getServerUrl(item.dataValue.addressImg)
                let images = [];
                images.push(url);
                ImagePreview({
                    images: images,
                    startPosition: 0
                });
                // dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${file.fileId}&moduleId=${file.moduleId}&nodeId=${file.nodeId}&flowId=${file.flowId}&filename=${file.fileName}`)

            }
        },
        //查看会议座位
        showMeetingSeat(item) {
            if(item.dataValue.seatFileId){
                let url = dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${item.dataValue.seatFileId}&moduleId=${item.dataValue.moduleId}&nodeId=${item.dataValue.nodeId}&flowId=${item.dataValue.flowId}&filename=${item.dataValue.fileName}`);
                let images = [];
                images.push(url);
                ImagePreview({
                    images: images,
                    startPosition: 0
                });
            }else{
                let url = dsf.url.getServerUrl(`p1105/190105112112w29SDA3bDIEFCTSKWkd/seatDesign/index.html#/mobileView/hw/${item.dataValue.id}/${item.dataValue.ryId}`)
                this.$router.push({
                    name: "dsfIframe",
                    params: {
                        url: url,
                        title: "我的位置"
                    }
                });
            }
        },
        openSwipe(num){
            this.openSwipeNum = num;
      },
      closeCallback(data, actionName) {
            this.componentName = "";
            if (this.spHandleJs["closeDialogCallback"]) {
                this.spHandleJs["closeDialogCallback"](
                    data,
                    actionName,
                    this.rowData,
                    this
                );
            }
        },
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.iconfont {
  vertical-align: middle;
}
.col-title {
    // @include bold;
    font-weight: bold;
    // margin-left: 12px;
}

.item-bottom {
    display: flex;
    justify-content: space-between;
}
.readStatus-triangle {
    position: absolute;
    top: 0;
    left: 0;
    border-top: 12px solid background-theme("normal");
    border-right: 12px solid transparent !important;
    border-bottom: 12px solid transparent !important;
    border-left: 12px solid background-theme("normal");
}
.isStatus {
    // width: 10px;
    // height: 10px;
    // border-radius: 5px;
    // background: #13C940;
    // display: inline-block;
    display: inline-block;
    // position: absolute;
    left: 0.12rem;
    top: 0.14rem;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 0.1rem;
    display: inline-block;
    @include background-theme("normal")
}


.bot-l,
.bot-r {
    width: 50%;
}

.bot-l {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $fontColor_sub;
    @include font_4;
}

.col-3 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .col-it {
        box-sizing: border-box;
        margin-bottom: 10px;
        padding-left: 0;

        i {
            position: relative;
            top: 0;
            left: 0;
        }

        i+span {
            margin-left: 5px;
        }
    }
}

.col-3+.col-1 {
    margin-top: -10px;
}

.col-m {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .col-it {
        box-sizing: border-box;
        padding-left: 0;
        flex-basis: calc(33.33% - 10px);

        i {
            position: relative;
            top: 0;
            left: 0;
        }

        i+span {
            margin-left: 5px;
        }

        &:nth-child(3n) {
            justify-content: flex-end;
        }

        &:nth-child(3n + 2) {
            justify-content: center;
        }

        &:nth-child(n + 4) {
            margin-top: 10px;
        }
    }
}

.col-2 {
    display: flex;
    justify-content: flex-start;

    .col-it {
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-left: 0;
        overflow: hidden;
    }

    .col-it+.col-it {
        margin-left: 15px;
    }
}

.col-3,
.col-2,
.col-1 {
    padding: 5px 0;
}

.col-1 {
    .col-it+.col-it {
        margin-top: 10px;
    }
}

.col-it {
    color: $fontColor_sub;
    position: relative;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;

    i {
        position: absolute;
        left: 0;
        top: 2px;
    }

    .label {
        @include font_5;
    }
}

.ds-list {
    // background: #f5f5f5;
    padding: 10px;
    box-sizing: border-box;

    .ds-item+.ds-item {
        margin-top: 10px;
    }
}

.ds-drawer-list {
    // background: #f5f5f5;
    padding: 10px;
    box-sizing: border-box;

    .ds-drawer-tips{
        display: flex;
        align-items: center;
        justify-content: end;
        margin-bottom: 10px;

        i{
            width: 9px;
            height: 9px;
            background: #E02020;
            margin-right: 4px;
            border-radius: 50%;
        }

        span{
            font-size: var(--font_size_4);
            color: #333333;
            font-weight: 400;
        }
    }

    .ds-item+.ds-item {
        margin-top: 10px;
    }
}

.ds-listRow {
    padding-top: 15px;

    .ds-item:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }
}
</style>
<style lang="scss">
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.ds-item {
@for $i from 1 through 5 {
    .ds-elips-#{$i} {
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        display: -webkit-box;
        -webkit-line-clamp: $i;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
    }
}

.row-it {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    box-sizing: border-box;

    .name {
        display: inline-block;
        width: 40%;
    }

    .val {
        display: inline-block;
        width: 60%;
        text-align: right;
        color: $fontColor_sub;
    }

    .elips {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .label {
        @include font_5;
    }
}

.subTitle {
    padding: 4px 0;
    color: #666;
    font-size: var(--font_size_4);
    .iconfont {
      font-size: var(--font_size_4);
      vertical-align: baseline;
    }
}

.aSubTitles {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .subTitle {
        padding-right: 6px;
        // max-width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.bSubTitles {
    .subTitle {
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
        i {
            padding-right: 4px;
        }
        .label {
            flex: 1;
        }
    }
}

.needTitles {
    .subTitle {
        display: flex;
        justify-content: space-between;

        .name {
            flex-shrink: 0;
            // max-width: 50%;
        }

        .val {
            // text-align: right;
        }
    }
}

.needTitlesSingleLine {
    position: relative;

    .subTitle {
        display: flex;
        justify-content: start;
    }

    .statusText {
        position: absolute;
        top: 50%;
        right: 0;
        padding: 10px;
        border-radius: 50%;
        border: 1px solid #ccc;
        transform: translateY(-50%);
    }

    .showImgP {
        flex: 1;
        display: flex;
        flex-direction: row;
    }

    .showAddImg,
    .showSeatImg {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: auto;
        flex-shrink: 0;
    }

    .showAddImg {
        background: url('../../../static/images/platform/conference/address.png') no-repeat;
        background-size: cover;
    }

    .showSeatImg {
        background: url('../../../static/images/platform/conference/seat.png') no-repeat;
        background-size: cover;
    }
}

.needBoldTitle {
    .subTitle {
        display: inline-block;
        justify-content: space-between;
        color: #000;

        .name {
            flex-shrink: 0;
            // max-width: 50%;
            font-weight: bold;
        }

        .val {
            text-align: left;
            font-weight: bold;
        }
    }
}

.needIconTitles {
    .subTitle {
        display: flex;
        justify-content: space-between;

        .name {
            flex-shrink: 0;
            max-width: 50%;
        }

        .val {
            text-align: right;
        }
    }
}

.jinji {
    width: auto;
    height: 16px;
    // padding-right: 2px;
    // margin-left: 20px;
    display: inline;
    line-height: normal;
    margin-bottom: 2px;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    overflow: hidden;

    .moduleIcon {
        font-size: var(--font_size_2);
        text-align: center;
        width: 0.52rem;
        height: 0.52rem;
        // padding-bottom: 100%;
        border: 1px solid;
        margin-left: 0.2rem;
        border-radius: 3px;
        @include border-color-theme('normal');
        @include font-theme('normal');
        @include opacity-background-theme('normal');

        span {
            vertical-align: baseline;
        }
    }
}

.s_moduleIcon {
    font-size: var(--font_size_4);
    text-align: center;
    width: 0.32rem;
    height: 0.32rem;
    border: 1px solid;
    border-radius: 3px;
    display: inline-block;
    @include border-color-theme('normal');
    @include font-theme('normal');
    @include opacity-background-theme('normal');

    span {
        vertical-align: baseline;
    }
}

.flex1 {
    flex: 1;
    width: 100%;

    .clearFloat::after {
        display: block;
        content: '';
        clear: both;
    }

    .listImg {
        float: left;
        width: 30%;
        padding: 5px;
    }

    .smallTitle {
        float: right;
        width: 65%;
    }
}

.iconBeforeTitle {
    @include background-theme('normal');
    margin-right: 2px;
    font-size: var(--font_size_3);
    line-height: 20px;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    word-break: break-all;
}
.ds-card-rightbtn{
  height: 100%;
  div{
    height: 100%;
  }
}
}
</style>
