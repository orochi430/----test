<template>
    <div>
        <div class="subform" ref="subform" v-if="formMeta">
            <!-- <van-sticky :container="container" :offset-top="offsetTop" z-index="8" :class="{'readonly-sticky': readonly}"> -->
            <!-- <div class="disfr ac jsb subTitle">
                <span style="font-size: var(--font_size_2);" v-if="formMeta && formMeta.controls[0].showLabel">{{ formMeta.controls[0].label
                }}</span>
                <span v-else></span>
                <div v-if="!readonly">
                    <debounce-click v-for="(item, index) in buttons" :key="index">
                        <van-button @click.stop="handleActionClick(item)" :icon="item.icon" size="small"
                            native-type="button" type="info"><span v-if="!item.icon">{{item.text}}</span></van-button>
                    </debounce-click>
                </div>
            </div> -->
            <div class="disfr ac jsb subTitle">
                <div>
                    <span class="left-icon"></span>
                    <span class="title" v-html="formMeta.controls[0].label"></span>
                </div>
                <div v-if="!readonly">
                    <i v-if="buttons.length == 1" class="iconfont icontianjia"
                        @click.stop="handleActionClick(buttons[0])"></i>
                    <van-popover v-else-if="buttons.length > 1" v-model="showPopover" trigger="click" placement="bottom-end"
                        :actions="buttons" @select="popoverClick">
                        <template #reference>
                            <i class="iconfont icongengduo3" @click.stop="showPopover = true"></i>
                        </template>
                    </van-popover>
                </div>
            </div>
            <!-- </van-sticky> -->
            <!-- 卡片式子表 -->
            <template v-if="subFormStyle == 'card'" style="">
                <div class="card" :id="'id' + index + formId" v-for="(cardItm, index) in formData.rows" :key="index"
                    v-show="cardItm.action != 'Deleted'">
                    <div class="card-btn">
                        <span v-if="metaData.extra.mobileShowType == '1'" @click="toSubform(cardItm)">查看</span>
                        <span v-else @click="toggleOpen(cardItm)">{{ cardItm.isOpen ? '收起' : '展开' }}</span>
                        <span v-if="isShowOperateColumn && !readonly" @click="deleteCard(index)">删除</span>
                    </div>
                    <van-row class="box flex" v-for="(item, idx) in cardItm.structControl" :key="item.controlId">
                        <van-col :span="24" style="padding: 0">
                            <div :class="{ divider: isMobileForm && idx < cardItm.structControl.length - 1 }">
                                <!-- {{ item.show }}----{{ item.propertyShow }} -->
                                <!-- 嵌套表单  特殊处理 item.controlType=='controlNestedForm'-->
                                <form-layout :rowCteNum="1"
                                    v-if="item.show && item.propertyShow && item.controlType == 'controlNestedForm'"
                                    ref="nestedForm" :lastControl="idx - 1 >= 0 ? structControl[idx - 1] : ''"
                                    :controlData="getData(index, item)" :subFormIndex="index" :pformData="cardItm"
                                    :pformMeta="formMeta" :topformData="topformData" :topformMeta="topformMeta"
                                    :metaData="item" :formId="formId" :isSubForm="true"
                                    :isMobileForm="isMobileForm"></form-layout>
                                <form-layout :rowCteNum="1" v-else-if="item.show && item.propertyShow"
                                    :lastControl="idx - 1 >= 0 ? structControl[idx - 1] : ''" :pformData="cardItm"
                                    :pformMeta="formMeta" :controlData="getData(index, item)" :topformData="topformData"
                                    :topformMeta="topformMeta" :subFormIndex="index" :metaData="item" :formId="formId"
                                    :isSubForm="true" :allFile="item.controlType == 'controlFileUpload' ? item.allFile : []"
                                    :relationList="item.controlType == 'controlFileRelation' ? getSubRelationList(index, item) : []"
                                    :isMobileForm="isMobileForm">
                                </form-layout>
                            </div>
                        </van-col>
                    </van-row>
                    <!-- <debounce-click v-if="isShowOperateColumn && !readonly">
                      <van-icon name="cross" class="deleteIcon" @click="deleteCard(index)" />
                    </debounce-click> -->
                </div>
            </template>
            <!-- 表格式子表 -->
            <div class="card cardHorizontal" v-else-if="subFormStyle == 'table'">
                <van-row class="cardRow rowTitle" type="flex" justify="space-between">
                    <template v-for="item in structControl"> <!--:key="item.controlId"-->
                        <van-col v-if="item.show && item.propertyShow" :span="getColSpan(item)" class="titleCenter"
                            :class='[item.validator.required ? "label-active" : ""]'>
                            {{ item.label }}
                        </van-col>
                    </template>
                </van-row>
                <van-row class="cardRow rowItem" :id="'id' + index + formId" v-for="(cardItm, index) in formData.rows"
                    :key="index" type="flex" justify="space-between" align="center" v-show="cardItm.action != 'Deleted'">
                    <template v-for="(item, idx) in cardItm.structControl"> <!--:key="item.controlId"-->
                        <van-col v-if="item.show && item.propertyShow" :span="getColSpan(item)">
                            {{ item.visible }}
                            <form-layout :rowCteNum="1" :lastControl="idx - 1 >= 0 ? structControl[idx - 1] : ''"
                                subFormLayout="textCenter" :controlData="getData(index, item)" :pformData="cardItm"
                                :pformMeta="formMeta" :topformData="topformData" :topformMeta="topformMeta"
                                :subFormIndex="index" :metaData="item" :formId="formId" :isSubForm="true"
                                :allFile="item.controlType == 'controlFileUpload' ? item.allFile : []"
                                :relationList="item.controlType == 'controlFileRelation' ? getSubRelationList(index, item) : []">
                            </form-layout>
                        </van-col>
                    </template>

                    <debounce-click v-if="isShowOperateColumn && !readonly">
                        <van-icon name="cross" class="deleteIconRow" @click="deleteCard(index)" />
                    </debounce-click>
                </van-row>
            </div>
        </div>

        <!-- 从列表选择 -->
        <van-popup v-model="commonPop" :get-container="'#app'" position="bottom"
            style="height: 100%; background-color: #f5f5f5">
            <DefaultList v-if="commonPop" :params="commonPopParam" :no-load-js="true" :check-type-pop="checkType"
                :checkable="true" oppset-top="0px" @cancelCheck="commonPop = false" @confirmCheck="commonPopChoose">
            </DefaultList>
        </van-popup>
        <!-- 从树结构选择 -->
        <van-popup :get-container="'#app'" v-model="treePop" position="bottom" :style="{ height: '100%' }">
            <control-user-list :extra="treePopParam" :selectType="treePopParam.selectType" @close="treePop = false"
                @getSelectUser="getSelect" :topformMeta="topformMeta"></control-user-list>
        </van-popup>
        <!-- 从物品列表（带图片）选择 -->
        <van-popup v-model="goodsPop" :get-container="'#app'" position="bottom"
            style="height: 100%; background-color: #f5f5f5">
            <goodsList v-if="goodsPop" :params="commonPopParam"  @close="goodsPop = false" />
        </van-popup>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import DebounceClick from '@/components/common/debounceClick.jsx'
import controlUserList from './controlUserList.vue'
import goodsList from './goodsList.vue'
import DefaultList from "@/components/documentCenter/DefaultList"
import buttonHandle from '../subButtonHandle'
export default {
    name: "controlSubFormPrimary",
    props: ["metaData", "formMeta", "formData", "formId", "foreign", "pformData", "pformMeta", "topformData", "topformMeta", "formParams"],
    mixins: [buttonHandle],
    data() {
        return {
            subForm: null,
            cardCount: 1,
            container: null,
            subFormData: null,
            SubFormPrimary: null,
            readonly: false,
            structControl: [],
            showPerson: false,
            extra: {},
            showSubFormTitle: false,
            subFormStyle: "card",//子表展现形式table：表格式，card：卡片式，默认卡片式的
            commonPop: false,
            commonPopParam: {},
            checkType: 'radio',
            relatedKey: {},
            subctrArr: [],
            treePopParam: {},
            treePop: false,
            offsetTop: 0,
            showPopover: false,
            goodsPop: false
        }
    },
    computed: {
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        }),
        buttons() {
            if (this.metaData.extra.buttons) {
                return this.metaData.extra.buttons.map(item => {
                    return {
                        icon: item.icon == 'icon-hao' ? 'plus' : item.icon,
                        text: item.text,
                        actionName: item.actionName,
                        actionArgs: item.actionArgs
                    }
                })
            } else {
                return [{
                    icon: 'plus',
                    text: '新增',
                    actionName: 'x-subform-add',
                    actionArgs: ''
                }]
            }
        },
        isMobileForm() { // 接口返回formType==3则表示配置的pad表单，如果无formType则依旧根据设备类型显示
            return dsf.config.clientType == 'mobile' || !(!this.topformMeta.parameters.hasOwnProperty('formType') || this.topformMeta.parameters.formType != 3)
        },
        isShowOperateColumn() { // 是否显示子表项操作按钮
            return !(this.SubFormPrimary.extra.isShowOperateColumn == "false")
        }
    },
    components: {
        DebounceClick,
        controlUserList,
        DefaultList,
        goodsList,
        formLayout: () => import('../formLayout.vue'),
        // ...allComps
    },
    watch: {
        'SubFormPrimary.privilege.editable': {
            handler(newVal, oldVal) {
                this.readonly = !newVal
            }
        }
    },
    beforeCreate() { // 组件之间循环引用
        this.$options.components.formLayout = require('../formLayout.vue').default
    },
    mounted() {
        this.container = this.$refs.subform
        this.$nextTick(function () {
            this.$eventBus.emitSubformOnload(this, {
                formId: this.formId,
            });
            this.offsetTop = $('.commonForm')[0].getBoundingClientRect().top
        })
    },
    created() {
        let self = this
        if (this.formMeta) {
            this.structControl = this.formMeta.controls.filter(itm => itm.controlType != "controlSubFormPrimary" && itm.controlType != "controlHidden")
            this.SubFormPrimary = this.formMeta.controls.filter(itm => itm.controlType == "controlSubFormPrimary")[0]
        }
        if (this.SubFormPrimary) {
            if (this.SubFormPrimary.extra["subform-style"]) {
                this.subFormStyle = this.SubFormPrimary.extra["subform-style"]
                this.showSubFormTitle = false
            }
            if (this.formParams.isNewFile && this.SubFormPrimary.extra['default-rows']) { // 拟稿时子表默认个数
                for (let i = 0; i < this.SubFormPrimary.extra['default-rows']; i++) {
                    this.addCard(false)
                }
            }
            if (this.SubFormPrimary.privilege) { // 子表是否只读不可编辑
                this.readonly = !this.SubFormPrimary.privilege.editable
            }
            let readonlyList = ['201125171531HhP41e8lrLw0T7kuFXK', '201230170107FTM46tEGeG4rwLX9mDr', '1905311647221BSf1doWPYLsr8nAdqB']; //dxq 带班统计子表\菜品预订子表 无法配置子表不可增加 写死 后期去掉
            if (readonlyList.includes(this.$route.params.moduleId)) {
                this.readonly = true
            }
            self.loadPropertyJoinHandle()
            this.structControl.forEach((item, index) => {
                if (!self.SubFormPrimary.defaultValue[item.metaId]) {
                    self.SubFormPrimary.defaultValue[item.metaId] = {
                        value: ""
                    }
                }
                self.$set(item, "show", 1)
                self.$set(item, "propertyShow", 1)

                // 属性联动被操作对象默认都不显示
                for (let i = 0; i < self.topformMeta.propertyJoin.length; i++) {
                    let propertyJoinTemp = self.topformMeta.propertyJoin[i]
                    //如果当前规则有多个属性联动控件需要逗号拆分循环操作 2022年7月5日16:31:58@ly
                    let operateTargetArr = propertyJoinTemp.operateTarget.split(',')
                    operateTargetArr.forEach(elementTarget => {
                        let elementTargetArr = elementTarget.split(':')
                        /*
                        elementTargetArr.length长度大于1说明是子表的属性联动规则，子表的需要拆分特殊处理
                        elementTargetArr[0]为子表id
                        elementTargetArr[1]为子表需要联动的控件metaId
                        2022年7月5日16:25:02@ly
                            */
                        if (elementTargetArr.length > 1 && elementTargetArr[0] == self.SubFormPrimary.metaId && elementTargetArr[1] == item.metaId && propertyJoinTemp.operation == "1") {
                            //self.notVaildateMetas.push(item.metaId)
                            self.$set(item, "show", 0)
                            self.$set(item, "propertyOperateTarget", 1)// 给控件加属性标识为属性联动的被操作对象
                        }
                    });
                }

                if (item.controlType == "controlHidden") {
                    self.$set(item, "show", 0)
                }
                if (item.privilege && !item.privilege.visible) {
                    self.$set(item, "show", 0)
                }

                if (self.SubFormPrimary.extra["subform-style"] && self.SubFormPrimary.extra["subform-style"] != "card") {
                    self.$set(item, "showLable", false)
                }

                if (item.controlType == "controlFileUpload") {
                    let allFile = Object.assign(item.extra, { file: [] })
                    self.$set(item, "allFile", [allFile])
                }
                //初始化的时候给控件加上监听，如果原始控件的属性editable改变了，
                //需要把所有复制的rows.structControl里面的所有属性都变更
                //@luy 2022年7月12日
                self.$watch(function () {
                    return item.privilege.editable
                }, function (n, o) {
                    // console.log(n, o)
                    self.formData.rows.forEach(elementRow => {
                        elementRow.structControl.forEach(elementCtr => {
                            if (item.metaId == elementCtr.metaId) {
                                self.$set(elementCtr.privilege, "editable", n)
                            }
                        });
                    });
                }, { deep: true })
            })

            self.formData.rows.forEach((element, index) => {
                self.$set(element, "isOpen", true)
                self.$set(element, "structControl", self.deepCopy(self.structControl))
                if (this.metaData.extra.defaultOpen != 1 && this.subFormStyle != 'table') self.toggleOpen(element)
                self.loadWatch(element, true)
                element.structControl.forEach(ctr => {
                    //  如果是打开新表单方式，则控件不允许编辑
                    if (this.metaData.extra.mobileShowType == '1') {
                        ctr.privilege.editable = false
                    }
                    if (ctr.controlType == "controlFileUpload") {
                        self.$set(ctr, "allFile", this.getSubAllFile(index, ctr))
                    }
                })
            });
        }
    },
    methods: {
        popoverClick(item) {
            this.showPopover = false
            setTimeout(() => {
                this.handleActionClick(item)
            }, 50)
        },
        loadPropertyJoinHandle() {
            let self = this
            //属性联动JS方法
            if (self.topformMeta.propertyJoin && self.topformMeta.propertyJoin.length > 0) {
                let subFormId = self.SubFormPrimary.metaId
                self.topformMeta.subform[subFormId].controls.forEach(ctr => {
                    let tc = self.topformMeta.propertyJoin.filter(item => item.triggerCondition == `${subFormId + ":" + ctr.metaId}`);
                    if (tc.length) {
                        self.subctrArr.push({
                            ctrMetaId: ctr.metaId,
                            tcArr: tc
                        })
                    }
                })
            }
        },
        //操作是否显示的函数
        operatorCtr(it, currentRowData) {
            let self = this
            let operateTargetList = it.operateTarget ? it.operateTarget.split(",") : [];
            operateTargetList.forEach(element => {
                let elementTargetArr = element.split(':')
                let showCtr = null
                //判断是子表的属性联动
                if (elementTargetArr.length > 1) {
                    showCtr = currentRowData.structControl.find(item => item.metaId == elementTargetArr[1]);
                }
                if (showCtr) {
                    if (it.operation == "5") { //大于-1才删除
                        self.$set(showCtr, "show", 1)
                        if (self.formData.notVaildateMetas?.indexOf(showCtr.metaId) > -1) {
                          //大于-1才删除
                          self.formData.notVaildateMetas.splice(self.formData.notVaildateMetas.indexOf(showCtr.metaId), 1)
                        }
                    } else if (it.operation == "1") { //已经存在则不添加
                        self.$set(showCtr, "show", 0)
                        if (self.formData.notVaildateMetas?.indexOf(showCtr.metaId) < 0) {
                          //已经存在则不添加
                          self.formData.notVaildateMetas.push(showCtr.metaId)
                        }
                    } else if (it.operation == "7") {
                        if (currentRowData[showCtr.metaId].hasOwnProperty("text")) {
                            self.$set(currentRowData, showCtr.metaId, {
                                text: "",
                                value: ""
                            })
                        } else {
                            self.$set(currentRowData[showCtr.metaId], "value", "")
                        }
                    }
                }
            });
        },
        //检验是否显示
        checkShow(newVal, propertyJoin, newData) {
            //循环处理联动规则
            propertyJoin.forEach(item => {
                //解决下拉多选时选择多个时属性联动无效的bug 2022年7月13日@ly
                if (item.operator == "1") {//item.operator == "1"    属于   用规则值与控件值进行比较，控件值有一个值在规则值当中就满足条件
                    let selectedValues = item.selectedValues.split(",");
                    selectedValues.forEach(element => {
                        if (newVal.value.split(",").indexOf(element) > -1) {
                            this.operatorCtr(item, newData)
                        }
                    });
                }
                else if (item.operator == "2") {//item.operator == "2"   不属于    用控件值与规则值进行比较，控件值要全部不在规则值当中才满足条件
                    let newVals = newVal.value.split(",");
                    let isGo = true
                    newVals.forEach(element => {
                        if (item.selectedValues.split(",").indexOf(element) > -1) {
                            isGo = false;//如果存在一个不满足不属于的值就给false   不再走联动操作
                        }
                    });
                    if (isGo) {
                        this.operatorCtr(item, newData)
                    }
                }

            });
        },
        loadWatch(newData, isInit = false) {
            let self = this
            if (self.topformMeta.propertyJoin && self.topformMeta.propertyJoin.length > 0) {
                if (isInit) {
                    self.subctrArr.forEach(item => {
                        self.checkShow(newData[item.ctrMetaId], item.tcArr, newData)
                    })
                }
                self.$watch(function () {
                    return newData
                }, function (n, o) {
                    console.log(n, o)
                    self.subctrArr.forEach(item => {
                        self.checkShow(n[item.ctrMetaId], item.tcArr, newData)
                    })
                }, {
                    deep: true
                })
            }
        },
        getTopHeight() {
            let height = 0
            if (this.isShowAppHeader) {
                // height += 0.92
                height += document.querySelector(".van-nav-bar__content").offsetHeight
            }
            height += document.querySelector(".van-tabs__wrap").offsetHeight
            return height + "px"
        },
        getColSpan(item) {
            // console.log(item)
            let colSpan = item.extra?.width || parseInt(24 / this.structControl.length)
            return colSpan
        },
        getData(index, item) {
            return this.formData.rows[index][item['metaId']]
        },
        getSubAllFile(index, ctr) { // 子表附件 只支持单类型controlFileUpload
            let loginToken = dsf.util.loadSessionStore("loginToken");
            let timestamp = new Date().getTime()
            let rows = []
            let row = ctr.extra
            row.file = []

            if (this.formData.rows[index].attach && this.formData.rows[index].attach[ctr.metaId]) {
                row.file = this.formData.rows[index].attach[ctr.metaId].map(item => {
                    let itemUrl = dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${item.id}&moduleId=${this.$route.params.moduleId}&nodeId=${this.topformMeta.parameters.nodeId}&flowId=${this.topformMeta.parameters.flowId}&x-auth-token=${loginToken}`)
                    if (!this.ifFile(item.fileName)) {
                        itemUrl = dsf.url.getServerUrl(
                            `fn/mobileFileDownload/download?fileId=${item.id}&moduleId=${this.$route.params.moduleId}&fileName=${item.fileName}`
                        );
                    }
                    console.log(item)
                    return {
                        id: item.id,
                        title: item.fileName,
                        type: 0,
                        attachType: row.attachType,
                        size: dsf.util.filesizeTostr(Number(item.fileSize)),
                        navtiveUrl: item.filePath,
                        url: itemUrl,
                        initUrl: `fn/file/download?infoId=${item.infoId}&fileId=${item.id}&fileName=${item.fileName}&nrType=${item.type}&moduleId=${this.$route.params.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${item.fileName}`,
                        editUrl: dsf.url.getServerUrl(`fn/mobileOffice/wordEdit?fileId=${item.id}&moduleId=${this.$route.params.moduleId}&nodeId=${this.topformMeta.parameters.nodeId}&flowId=${this.topformMeta.parameters.flowId}&x-auth-token=${loginToken}`),
                        infoId: item.infoId,
                        moduleId: this.$route.params.moduleId,
                        isHandwrite: row.isHandwrite,
                        canEdit: row.canEdit,
                        canDownLoad: item.canDownLoad,
                        name: item.fileName,
                        icon: 'insert_drive_file'
                    }
                })
            }
            rows.push(row)
            return this.deepCopy(rows)
        },
        getSubRelationList(index, ctr) { // 子表关联文件，仅支持查看
            let rows = []
            let row = ctr.extra
            row.canShow = 1
            row.document = []
            if (this.formData.rows[index].relationFile?.[`relationFile-${row.relaValue}`]) {
                row.document = this.formData.rows[index].relationFile[`relationFile-${row.relaValue}`].map(item => {
                    return {
                        fileId: item.fileId,
                        fileRelaId: row.fileRelaId,
                        info_id: item.relaId,
                        isShowRela: true,
                        itemsContents: item.relaBt,
                        moduleId: item.relaModuleId,
                        moduleName: item.relaModuleName,
                        nodeId: '',
                        pk: item.relaId,
                        relaId: this.foreign
                    }
                })
            }
            rows.push(row)
            return this.deepCopy(rows)
        },
        ifFile(title) {
            return !(title.includes(".png") || title.includes(".jpg") || title.includes(".mp4") || title.includes(".jpeg") || title.includes(".bmp") || title.includes(".gif") || title.includes(".mp4"))
        },
        deepCopy(data) {
            return JSON.parse(JSON.stringify(data))
        },
        'x-subform-add'() {
            if (this.metaData.extra.mobileShowType == '1') {
                this.toNewSubform()
                return
            } else {
                this.addCard()
            }
        },
        addCard(scroll = true) {
            let self = this;
            return new Promise(resolve => {
                dsf.http.get("fn/common/generateUUID?size=1").then(({
                    data
                }) => {
                    let newData = {}
                    if (self.SubFormPrimary) {
                        newData = self.deepCopy(self.SubFormPrimary.defaultValue)
                    }
                    newData[self.formId] = {}
                    newData[self.formId].value = data.data.UUID
                    newData[self.formId].foreign = self.foreign
                    newData['A0032'].value = self.formData.rows.length + 1 // 子表序号
                    newData.action = "Added"
                    newData.isOpen = true
                    self.$set(newData, "structControl", self.deepCopy(self.structControl))
                    self.formData.rows.push(newData)
                    //加载watch
                    self.loadWatch(newData)

                    self.$bus.emit("subFormAdd", {//子表新增触发函数
                        newData, subFormId: self.formId, index: self.formData.rows.length - 1
                    });
                    if (scroll !== false) {
                        self.$nextTick(() => {
                            setTimeout(() => {
                                self.$el.querySelector(`#id${self.formData.rows.length - 1}${self.formId}`).scrollIntoView({
                                    behavior: "smooth",
                                    block: 'center'
                                });
                            }, 100)
                        })
                    }
                    resolve(newData)
                })
            })
            // return false
        },
        deleteCard(index) {
            //如果当前子表数据是add没有保存到数据库的直接删除，否则提示是否要删除
            if (this.formData.rows.length > 0) {
                if (this.formData.rows[index].action == "Added") {
                    this.formData.rows.splice(index, 1)
                } else if (this.formData.rows[index].action == "Updated") {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '确定要删除吗？'
                    }).then(() => {
                        this.formData.rows[index].action = "Deleted"
                    }
                    ).catch(() => { });
                }
                this.$bus.emit("subFormDelete", {//子表删除触发函数
                    subFormIndex: index, subFormId: this.formId
                })
            }
        },
        addMultipleCard(size) { // 一次添加多条子表数据
            let self = this
            return new Promise(resolve => {
                dsf.http.post("fn/common/generateUUID", { size: size, multiple: true }).then(({
                    data
                }) => {
                    let newDataArr = []
                    for (let i = 0; i < data.data.UUID.length; i++) {
                        let newData = {}
                        if (self.SubFormPrimary) {
                            newData = self.deepCopy(self.SubFormPrimary.defaultValue)
                        }
                        newData[self.formId] = {}
                        newData[self.formId].value = data.data.UUID[i]
                        newData[self.formId].foreign = self.foreign
                        newData['A0032'].value = self.formData.rows.length + 1 // 子表序号
                        newData.action = "Added"
                        self.$set(newData, "structControl", self.deepCopy(self.structControl))
                        self.formData.rows.push(newData)
                        newDataArr.push(newData)
                        self.$bus.emit("subFormAdd", {//子表新增触发函数
                            newData, subFormId: self.formId
                        });
                        //加载watch
                        self.loadWatch(newData)
                    }
                    resolve(newDataArr)
                })
            })
        },
        handleActionClick(val) {
            if (this[val.actionName]) {
                this[val.actionName](val.actionArgs)
            } else {
                dsf.layer.toast("当前按钮未定义：" + val.actionName, false);
            }
        },
        // 打开选择列表
        listSelect(val) {
            // 参数配置格式：{
            //     "listParams":{"moduleId": "","listId":""}, // 列表参数，开发列表配置 "listParams":{"params": {"fileType": "hybm"}}
            //     "multiple":true, // 多选，单选时可不配
            //     "relatedKeyValue": {"B0001":{"value":"A0001.value","text":"A0001.text"}} // 子表元数据对象对应列表数据key
            // }
            // TODO 暂未考虑带出选人控件所需元数据对象值
            val = this.replaceMainVal(val)
            let args = JSON.parse(val.replace(/'/g, "\""))
            this.relatedKeyValue = args.relatedKeyValue || {}
            this.checkType = args.multiple ? 'checkBox' : 'radio'
            this.commonPopParam = args.listParams
            this.commonPop = true
        },
        // 选择列表数据新增子表
        commonPopChoose(checkItems) {
            this.commonPop = false
            let self = this
            let addCallback
            if (JSON.stringify(this.relatedKeyValue) != '{}') { // 如果有对应赋值关系，则会执行新增后赋值的回调函数
                addCallback = function (newData, checkItem) {
                    Object.keys(self.relatedKeyValue).forEach(item => {
                        let obj = {}
                        if (self.relatedKeyValue[item].value) obj.value = checkItem[self.relatedKeyValue[item].value]
                        if (self.relatedKeyValue[item].text) obj.text = checkItem[self.relatedKeyValue[item].text]
                        self.$set(newData, item, obj)
                    })
                }
                this.addMultipleCard(checkItems.length).then(newDataArr => {
                    for (let i = 0; i < newDataArr.length; i++) {
                        addCallback(newDataArr[i], checkItems[i].dataValue)
                    }
                })
            }
            // 如果没有对应赋值关系，则在subFormSelect事件中自行调用addcard方法新增
            this.$bus.emit("subFormSelect", {//子表选择触发函数
                checkItems, subFormId: this.formId
            });
        },
        // 打开树结构选择
        treeSelect(val) {
            // 参数配置格式：
            // {
            //    "multiple": false, //  multiple：是否多选，
            //     "selectType": 0, // 0:用户选择，1：代码选择
            //     "tabs": [{ "name": "", "action": "fn/code/select/data?codeKeys=190305100343J8stQq8likZyVhI3uo9&rootTitle=会办部门"}] // tabs 可配多个tab页，action为数据接口，name为tab页标题
            // }
            let args = JSON.parse(val.replace(/'/g, "\""))
            args.tabs.forEach(item => {
                item.action = this.replaceMainVal(item.action)
            })
            this.treePopParam = args
            this.treePop = true
        },
        // 选择树结构数据新增子表
        async getSelect(selectArr) {
            this.treePop = false
            console.log(selectArr)
            let startIndex = this.formData.rows.length // 选择后开始插入的序号
            this.$bus.emit("subFormTreeSelect", { //子表选择触发函数
                selectArr, subFormId: this.formId
            });
        },
        replaceMainVal(str) { // 替换主表元数据值
            let regex2 = /\[(.+?)\]/g; // [] 中括号
            if (str.match(regex2)) { // 替换接口action中的参数 有匹配才替换[]中的参数
                str.match(regex2).forEach(element => {
                    if (element.indexOf('[main:') > -1) { // [main:] 替换为主表元数据值
                        let key = element.replace("[main:", "").replace("]", "")
                        str = str.replace(element, this.topformData.main[key].value)
                    }
                });
            }
            return str
        },
        toggleOpen(item) {
            if (item.isOpen) {
                item.structControl.forEach((ctr, index) => {
                    if (index > 0) ctr.propertyShow = 0
                })
            } else {
                item.structControl.forEach((ctr, index) => { ctr.propertyShow = 1 })
            }
            item.isOpen = !item.isOpen
        },
        toNewSubform() {
            let subformModuleId = this.SubFormPrimary.defaultValue['A0004'].value
            console.log(subformModuleId)
            function saveCallback(VueData) {
                let specialSaveObj = JSON.stringify({ fid: VueData.formParams.pk })
                if (!VueData.$route.params.pk) { // 拟稿情况下先将路由替换成带pk的，否则跳转后再返回又到新的拟稿表单
                    VueData.$router.replace({
                        path: `/commonForm/${VueData.moduleId}/${VueData.formParams.pk}`,
                        query: VueData.$route.query
                    })
                }
                VueData.$router.push({
                    path: `/commonForm/${subformModuleId}`,
                    query: {
                        specialSaveObj: specialSaveObj,
                        fid: VueData.formParams.pk
                    }
                })
            }
            this.$bus.emit("saveFormBus", {
                metaData: this.metaData,
                callback: saveCallback
            });
        },
        toSubform(item) {
            let subformModuleId = item['A0004'].value
            let subformPk = item[this.formId].value
            console.log(subformModuleId)
            function saveCallback(VueData) {
                let specialSaveObj = JSON.stringify({ fid: VueData.formParams.pk })
                VueData.$router.push({
                    path: `/commonForm/${subformModuleId}/${subformPk}`,
                    query: {
                        specialSaveObj: specialSaveObj,
                        fid: VueData.formParams.pk
                    }
                })
            }
            this.$bus.emit("saveFormBus", {
                metaData: this.metaData,
                callback: saveCallback
            });
        },
        goodsSelect(val) {
            console.log("commonPopParam", JSON.parse(val.replace(/'/g, "\"")));
            this.commonPopParam = JSON.parse(val.replace(/'/g, "\""))
            this.goodsPop = true
        }
    }

}
</script>

<style lang="scss" scoped>
.subform {
    width: 100%;
    box-sizing: border-box;
    // padding:10px 15px;
    // background:white;
    font-size: var(--font_size_2);

    .disfr {
        display: flex;
    }

    .fc {
        display: flex;
        flex-direction: column;
    }

    .jc {
        justify-content: center;
    }

    .ac {
        align-items: center;
    }

    .jsb {
        justify-content: space-between
    }

    .subTitle {

        // padding: 15px;
        // background: white;
        // ::v-deep .van-button:not(:last-child) {
        //     margin-right: 8px;
        // }
        // margin: 0 0 10px;
        .left-icon {
            display: inline-block;
            height: 14px;
            width: 4px;
            border-radius: 2px;
            margin: 0 5px;
            background-color: var(--normal);
        }

        .title {
            font-size: var(--font_size_1);
            color: #333;
            font-weight: 600;
        }

        .iconfont {
            font-size: 22px;
            color: var(--normal);
            padding-right: 5px;
        }
    }

    .card {
        position: relative;
        margin: 10px 0 0;
        // margin-top: 0;
        // padding: 10px 0;
        // padding-top: 20px;
        // border-radius: 10px;
        // border: 1px solid #e5e5e5;
        // min-height: 300px;
        background: white;
        overflow: hidden;
        border: 1px solid #e6e6e6;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
        border-radius: 3px;

        &-btn {
            padding: 10px;
            border-bottom: 1px solid #D5D5D5;
            display: flex;
            justify-content: space-between;
            flex-direction: row-reverse;
            color: var(--normal);
            font-size: var(--font_size_3);
        }

        .rowTitle {
            background-color: white;
        }

        .cardRow {
            border-bottom: 1px solid #e5e5e5;

            .van-button--small {
                height: 0.4rem !important;
                width: 0.4rem !important;
            }

            .titleCenter {
                text-align: center
            }

            .label-active {
                &:before {
                    // position: absolute;
                    color: #ee0a24;
                    // left: 8px;
                    content: '*';
                }
            }
        }

        .deleteIcon {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 22px;
            z-index: 2;
        }

        .deleteIconRow {
            font-size: 18px;
        }

        .delateBox {
            margin: 10px 0;
        }

        .deleteBtn {
            width: 80%;
        }
    }

    .cardHorizontal {
        padding-top: 10px;

        .rowTitle {
            padding: 0px 10px 10px 10px;
        }

    }

    .addBox {
        padding: 0 15px;

        .addBtn {
            width: 100%;
        }
    }
}

.subform {
    .readonly-sticky {
        .van-sticky--fixed {
            position: static !important;
        }
    }

    .van-sticky--fixed {
        .subTitle {
            background: white;
            padding: 15px;
        }

        .subTitle::after {
            position: absolute;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            border-bottom: 1px solid #bbb;
            border-top: 1px solid #bbb;
            -webkit-transform: scale(.5);
            transform: scale(.5);
        }
    }

    .cardHorizontal {
        .noPadding {
            padding: 0 0.12rem;
        }

        .rowItem {
            padding: 0.2rem;
            position: relative;

            .deleteIconRow {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
}

// .divider>div {
//     position: relative;
//     &::after {
//         position: absolute;
//         box-sizing: border-box;
//         content: ' ';
//         pointer-events: none;
//         right: 16px;
//         bottom: 0;
//         left: 16px;
//         border-bottom: 1px solid #cfcfcf;
//         -webkit-transform: scaleY(0.5);
//         transform: scaleY(0.5);
//     }
// }
</style>
