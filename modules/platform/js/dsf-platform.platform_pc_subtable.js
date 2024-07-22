/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[66],{1076:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ds-control ds-subtable",class:e.getCss.concat([{"show-empty-text":e.showEmptyText}]),attrs:{"current-page":e.currentPage}},[e.showLabel||e.buttonBars.length?n("div",{staticClass:"ds-subtable-tools"},[e.showLabel?n("dsf-title",{staticClass:"ds-no-padding",staticStyle:{float:"left",padding:"0px","margin-top":"5px"},attrs:{value:e.label,"font-type":3,"show-weight":!0,"show-underline":!(!e.showLabel||!e.label)&&e.labelShowUnderline,"show-color-lump":!(!e.showLabel||!e.label)&&e.labelShowColorLump}},[e._t("head-left")],2):e._e(),n("div",{staticClass:"head-right-item",staticStyle:{float:"right"}},[e.showSearch?n("div",{staticClass:"head-right-item-search",staticStyle:{"margin-left":"10px"}},[n("el-input",{staticClass:"search-input",attrs:{placeholder:e.searchPlaceholder},model:{value:e.searchStr,callback:function(t){e.searchStr=t},expression:"searchStr"}}),e._m(0)],1):e._e(),e._t("head-right"),e.buttonBars.length?n("DsfButtonBar",{staticClass:"ds-no-padding",attrs:{owner:e._self,local:e.local,buttons:e.buttonBars,"render-button":e.renderButton,"max-number":e.buttonsMaxNumber,"more-button-text":e.buttonsMoreButonText,"more-button-style":e.buttonsMoreButtonStyle,size:"small"}}):e._e()],2)],1):e._e(),e.isDesign?n("div",{staticClass:"ds-subtable-box ds-subtable-block-box"},[e.isShowCheckboxColumn&&!e.isSingleChecked?n("el-checkbox",[e._v("全选")]):e._e(),n("el-checkbox-group",{style:{maxHeight:e.contentMaxHeight},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[n("div",{staticClass:"ds-subtable-block",class:{hideCheckBox:!e.isShowCheckboxColumn}},[e.subTitle||e.isShowIndexColumn||e.isShowOperateColumn&&!e.$$readOnly||e.isShowCheckboxColumn?n("div",{staticClass:"ds-subtable-block_header"},[n("el-checkbox",{attrs:{label:"0"}},[e._v(e._s(e.subTitle)+e._s(e.isShowIndexColumn?1:""))]),e.isShowOperateColumn&&!e.$$readOnly?n("DsfSubTableButtons",{attrs:{scope:{row:e.designerValue[0]},owner:e._self,"is-design":e.isDesign}}):e._e()],1):e._e(),n("div",{staticClass:"ds-subtable-block_content"},[e._t("table-column-A")],2)])])],1):e.isDesign?e._e():n("div",{staticClass:"ds-subtable-box ds-subtable-block-box",on:{click:function(e){e.stopPropagation()}}},[e.isShowCheckboxColumn&&!e.isSingleChecked&&e.list&&e.list.length?n("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v(" 全选"+e._s(e.checked.length?"（已选"+e.checked.length+"）":"")+" ")]):e._e(),e.list&&e.list.length?n("el-checkbox-group",{style:{maxHeight:e.contentMaxHeight},on:{change:e.handleSelectionChange},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},e._l(e.list,(function(t,i){return n("div",{key:e.setRowKey(t),staticClass:"ds-subtable-block",class:{hideCheckBox:!e.isShowCheckboxColumn,editing:t.$editing}},[e.subTitle||e.isShowIndexColumn||e.isShowOperateColumn&&!e.$$readOnly||e.isShowCheckboxColumn?n("div",{staticClass:"ds-subtable-block_header"},[n("el-checkbox",{attrs:{label:t,disabled:!!e.selectable&&e.selectable(t,i)}},[e._v(" "+e._s(e.getSubTitle(t))+e._s(e.isShowIndexColumn?e.indexMethod(i):"")+" ")]),e.$isLeastOne||!t.$editing||e._self.foreverEditor?[e.isShowOperateColumn&&!e.$$readOnly?n("DsfSubTableButtons",{attrs:{scope:{row:t,$index:i},owner:e._self,"is-design":e.isDesign}}):e._e()]:[[n("DsfButton",{staticClass:"ds-subtable-button",attrs:{"btn-style":"icon-text",size:"small",icon:"dui",title:"确定"},on:{click:function(n){return e.rowEditCompleteHandler({row:t})}}}),n("DsfButton",{staticClass:"ds-subtable-button",attrs:{"btn-style":"icon-text",size:"small",icon:"cancel",title:"撤销"},on:{click:function(n){return e.rowEditCancelHandler({row:t})}}})]]],2):e._e(),n("div",{staticClass:"ds-subtable-block_content",on:{dblclick:function(n){return e.rowDblClickHander(t)}}},[e._t("table-column-A",null,null,{row:t})],2)])})),0):n("dsf-empty-data",{directives:[{name:"show",rawName:"v-show",value:e.showEmptyText,expression:"showEmptyText"}]})],1),e.showPagination&&e.isDesign?n("div",{staticClass:"ds-subtable-footer"},[n("el-pagination",{attrs:{"hide-on-single-page":!1,total:1,background:"",layout:"total,prev,pager,next,jumper"}})],1):e.showPagination&&!e.isDesign?n("div",{staticClass:"ds-subtable-footer"},[n("el-pagination",{ref:"pagination",attrs:{"hide-on-single-page":!0,"current-page":e.currentPage,"page-count":e.pageCount,"page-size":e.pageSize,total:e.allList.length,"pager-count":e.pagerCount,background:"",layout:"total,prev,pager,next,jumper"},on:{"current-change":e.currentChange}})],1):e._e()])},l=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"search-button"},[n("i",{staticClass:"iconfont icon-fangdajing"})])}],s=dsf.component((function(){var e=dsf.getEsModule(n(932));return{name:"DsfSubTableBlock",mixins:[e],ctrlCaption:"块状子表",props:{subTitle:{type:String,default:"数据"},contentMaxHeight:{type:String,default:"auto"}},data:function(){return{checkAll:!1,checked:[],isIndeterminate:!1}},watch:{allList:function(e,t){var n,i=this;if(null!==(n=this.checked)&&void 0!==n&&n.length){var l=e.length;if(l){var s=_.map(e,(function(e){return e.$hash}));_.forEachRight(this.checked,(function(e,t){s.includes(e.$hash)||i.checked.splice(t,1)}));var a=this.checked.length;a?a==l?(this.checkAll=!0,this.isIndeterminate=!1):(this.checkAll=!1,this.isIndeterminate=!0):(this.checkAll=!1,this.isIndeterminate=!1)}else this.checked=[],this.isIndeterminate=!1}}},methods:{handleCheckAllChange:function(e){if(this.isIndeterminate=!1,e){var t=[];_.forEach(this.allList,(function(e){t.push(e)})),this.checked=t}else this.checked=[];this.multipleSelection=this.checked},handleSelectionChange:function(e){if(this.isShowCheckboxColumn){this.isSingleChecked&&(this.checked=[_.last(e)]),this.multipleSelection=this.checked;var t=this.checked.length;0==t?(this.isIndeterminate=!1,this.checkAll=!1):t==this.list.length?(this.isIndeterminate=!1,this.checkAll=!0):(this.isIndeterminate=!0,this.checkAll=!1)}else this.checked=[]},getSubTitle:function(e){return this.$replace(this.subTitle,this.$expressParams(this,e))}}}})),a=s,o=n(0),r=Object(o["a"])(a,i,l,!1,null,null,null);t["default"]=r.exports},932:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ds-control ds-subtable",class:e.getCss.concat([{"show-empty-text":e.showEmptyText}]),attrs:{"current-page":e.currentPage}},[e.showLabel||e.buttonBars.length?n("div",{staticClass:"ds-subtable-tools"},[e.showLabel?n("dsf-title",{staticClass:"ds-no-padding",staticStyle:{float:"left",padding:"0px","margin-top":"5px"},attrs:{value:e.label,"font-type":3,"show-weight":!0,"show-underline":!(!e.showLabel||!e.label)&&e.labelShowUnderline,"show-color-lump":!(!e.showLabel||!e.label)&&e.labelShowColorLump}},[e._t("head-left")],2):e._e(),n("div",{staticClass:"head-right-item",staticStyle:{float:"right"}},[e.showSearch?n("div",{staticClass:"head-right-item-search",staticStyle:{"margin-left":"10px"}},[n("el-input",{staticClass:"search-input",attrs:{placeholder:e.searchPlaceholder},model:{value:e.searchStr,callback:function(t){e.searchStr=t},expression:"searchStr"}}),e._m(0)],1):e._e(),e._t("head-right"),e.buttonBars.length?n("DsfButtonBar",{staticClass:"ds-no-padding",attrs:{owner:e._self,local:e.local,buttons:e.buttonBars,"render-button":e.renderButton,"max-number":e.buttonsMaxNumber,"more-button-text":e.buttonsMoreButonText,"more-button-style":e.buttonsMoreButtonStyle,size:"small"}}):e._e()],2)],1):e._e(),e.isDesign?n("div",{staticClass:"ds-subtable-box"},[n("dsf-el-table",{ref:"table",class:{disabledCheckHead:e.isSingleChecked},attrs:{"show-header":e.tableHeadVisible,data:e.designerValue,"default-expand-all":!0,"row-key":e.setRowKey,"header-cell-class-name":e.headerCellClassName,"cell-class-name":e.cellClassName,height:e.tableHeight,"max-height":e.tableMaxHeight,border:e.tableBorder}},[e.isShowCheckboxColumn?n("el-table-column",{key:"selectionColumn",attrs:{type:"selection",width:e.selectionColumnWidth,resizable:!1,"header-align":"center",align:"center","reserve-selection":!0}}):e._e(),e.isShowIndexColumn?n("el-table-column",{key:"indexColumn",attrs:{type:"index",label:"序号",width:e.indexColumnWidth,resizable:!1,"header-align":"center",align:"center"}}):e._e(),e._t("default"),e.isReDrawHander?e._e():[e.isExpandView?n("DsfSubTableColumn",{attrs:{column:{type:"expand",label:"",columnId:"expand-view"}},scopedSlots:e._u([{key:"expand-view",fn:function(t){return[n("div",{staticClass:"ds-subtable-expand-view",attrs:{"slot-name":"expand-view"}},[e._t("expand-view",null,null,t)],2)]}}],null,!0)}):e._e(),e._l(e.designColumns,(function(t,i){return n("DsfSubTableColumn",{key:i,ref:"header",refInFor:!0,attrs:{column:t},scopedSlots:e._u([e._l(e.getLastColumns(t),(function(t){return{key:t.columnId,fn:function(){return[e._t(t.columnId)]},proxy:!0}}))],null,!0)})}))],e.isShowOperateColumn&&!e.$$readOnly?n("el-table-column",{key:"operateColumn",attrs:{resizable:!1,label:"操作",width:e.operateColumnWidth,"header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("DsfSubTableButtons",{attrs:{scope:t,owner:e._self,"is-design":e.isDesign}})]}}],null,!1,4108921960)}):e._e()],2)],1):e.isDesign?e._e():n("div",{staticClass:"ds-subtable-box",on:{click:function(e){e.stopPropagation()}}},[n("dsf-el-table",{ref:"table",class:{disabledCheckHead:e.isSingleChecked},attrs:{"show-header":e.tableHeadVisible,data:e.list,"row-key":e.setRowKey,"row-class-name":e.setRowClass,height:e.tableHeight,"max-height":e.tableMaxHeight,"cell-class-name":e.cellClassName,"cell-style":e.renderCellStyle,"highlight-current-row":e.highlightCurrentRow,border:e.tableBorder,"tree-props":e.treeProps,selectable:e.selectable,"span-method":e.spanMethod},on:{"row-dblclick":function(t){return e.rowDblClickHander(t)},"current-change":e.tableCurrentChange,select:e.handleSelection,"select-all":e.handleSelectionAll,"selection-change":e.handleSelectionChange},nativeOn:{focus:function(t){return e.editBlurHandler.apply(null,arguments)}},scopedSlots:e._u([{key:"empty",fn:function(){return[e._t("default",(function(){return[n("dsf-empty-data",{directives:[{name:"show",rawName:"v-show",value:e.showEmptyText,expression:"showEmptyText"}]})]}))]},proxy:!0}],null,!0)},[e.isShowCheckboxColumn?n("el-table-column",{attrs:{type:"selection",fixed:!!e.isFixedCheckboxColumn||e.columnIsFixed,label:"选择框",width:e.selectionColumnWidth,resizable:!1,"header-align":"center",align:"center","reserve-selection":!0}}):e._e(),e.isShowIndexColumn?n("el-table-column",{attrs:{type:"index",fixed:!!e.isFixedIndexColumn||e.columnIsFixed,index:e.indexMethod,label:"序号",resizable:!1,width:e.indexColumnWidth,"header-align":"center",align:"center"}}):e._e(),e._t("default"),e.isReDrawHander?e._e():[e.isExpandView?n("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"ds-subtable-expand-view"},[e._t("expand-view",null,null,t)],2)]}}],null,!0)}):e._e(),e._l(e.realColumns,(function(t,i){return[n("DsfSubTableColumn",{key:i,ref:"header",refInFor:!0,attrs:{column:t},scopedSlots:e._u([e._l(e.getLastColumns(t),(function(t){return{key:t.columnId,fn:function(n){return[e._t(t.columnId,null,null,n)]}}}))],null,!0)})]}))],e.isShowOperateColumn&&!e.$$readOnly?n("el-table-column",{attrs:{type:"",fixed:!(!e.isFixedOperateColumn&&!e.columnIsFixed)&&"right",label:"操作",width:e.operateColumnWidth,resizable:!1,"header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.$isLeastOne||!t.row.$editing||t._self.foreverEditor?[n("DsfSubTableButtons",{attrs:{scope:t,owner:e._self,"is-design":e.isDesign}})]:[t.row.$leastrow?e._e():[n("DsfButton",{staticClass:"ds-subtable-button",staticStyle:{padding:"8px","min-width":"auto"},attrs:{"btn-style":"icon-text",size:"small",icon:"dui",title:"确定"},on:{click:function(n){return e.rowEditCompleteHandler(t)}}}),n("DsfButton",{staticClass:"ds-subtable-button",staticStyle:{padding:"8px","min-width":"auto"},attrs:{"btn-style":"icon-text",size:"small",icon:"cancel",title:"撤销"},on:{click:function(n){return e.rowEditCancelHandler(t)}}})]]]}}],null,!1,2761685891)}):e._e()],2)],1),e.showPagination&&e.isDesign?n("div",{staticClass:"ds-subtable-footer"},[n("el-pagination",{attrs:{"hide-on-single-page":!1,total:1,background:"",layout:"total,prev,pager,next,jumper"}})],1):e.showPagination&&!e.isDesign?n("div",{staticClass:"ds-subtable-footer"},[n("el-pagination",{ref:"pagination",attrs:{"hide-on-single-page":!0,"current-page":e.currentPage,"page-count":e.pageCount,"page-size":e.pageSize,total:e.allList.length,"pager-count":e.pagerCount,background:"",layout:"total,prev,pager,next,jumper"},on:{"current-change":e.currentChange}})],1):e._e()])},l=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"search-button"},[n("i",{staticClass:"iconfont icon-fangdajing"})])}],s=n(4),a=n.n(s),o=n(2),r=n.n(o),u=n(3),d=n.n(u),c=n(1),h=n.n(c);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){d()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=60,b=60,g=130,v=void 0,w=void 0;document.addEventListener("mousedown",(function(e){v=e.target,clearTimeout(w),w=setTimeout((function(){return v=void 0}),200)})),document.addEventListener("click",(function(e){if(v===e.target&&v.contains(e.target)){var t=document.querySelectorAll(".ds-subtable");_.each(t,(function(e){var t,n=null===e||void 0===e?void 0:e.__vue__;n&&(n.foreverEditor||null===n||void 0===n||null===(t=n.editAllEnd)||void 0===t||t.call(n))}))}v=void 0}));var y={DEFAULT:"default",GENERAL:"general"},x=dsf.component({name:"DsfSubTable",mixins:[$mixins.list,$mixins.oneToMany],ctrlCaption:"子表",components:{DsfSubTableButtons:Vue.defineLazyComponent((function(){return n(937)}))},props:{colSpan:{type:[String,Number],default:"24"},tableBorder:{type:Boolean,default:!0},tableHeadVisible:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!1},labelShowUnderline:{type:Boolean,default:!0},labelShowColorLump:{type:Boolean,default:!0},value:{type:Array,default:function(){return[]}},isEditabled:{type:Boolean,default:function(){return!0}},columns:{type:Array,default:function(){return[]}},isShowOperateColumn:{type:Boolean,default:!0},isFixedOperateColumn:{type:Boolean,default:!1},isShowIndexColumn:{type:Boolean,default:!0},isFixedIndexColumn:{type:Boolean,default:!1},indexColumnWidth:{type:Number,default:m},operateColumnWidth:{type:Number,default:g},foreverEditor:{type:Boolean,default:!1},slots:{type:Array,default:function(){return[{name:"default",scope:"scope",controls:[]}]}},showPagination:{type:Boolean,default:!1},pagerCount:{type:Number,default:5},pageSize:{type:Number,default:15},buttonBars:{type:Array,default:function(){return[]}},renderButton:{type:Function,default:null},buttonsMoreButonText:{type:String,default:"更多"},buttonsMoreButtonStyle:{type:String,default:""},buttonsMaxNumber:{type:Number,default:4},removeRowBefore:{type:Function,default:function(e){e()}},renderRowButton:{type:Function,default:dsf.noop},renderHeader:{type:Function,default:dsf.noop},filterData:{type:Function,default:null},exportOptions:{type:[Object,Array],default:function(){return{"rule-1":[]}}},isLeastOne:{type:Boolean,default:!1},tableHeight:{type:[String,Number],required:!1},tableMaxHeight:{type:[String,Number],required:!1},isUseDialogEdit:{type:Boolean,default:!1},editDialogUrl:{type:String,default:""},editDialogTitle:{type:String,default:""},editDialogWidth:{type:String,default:""},editDialogHeight:{type:String,default:""},editDialogButtons:{type:Array,default:function(){return[{text:"确定",handler:"editDialogYes",isUser:!1},{text:"下一条",handler:"editDialogNext",isUser:!1},{text:"关闭",handler:"",isUser:!1}]}},getRowIndex:{type:Function,default:null},treeProps:{type:Object,default:function(){return{children:null,hasChildren:null}}},showSearch:{type:Boolean,default:!1},searchPlaceholder:{type:String,default:"请输入检索关键字"},searchFields:{type:String,default:""},showEmptyText:{type:Boolean,default:!1},renderCellClassName:{type:Function,default:null},renderCellStyle:{type:Function,default:null},renderRowSubControl:{type:Function,default:null},isExpandView:{type:Boolean,default:!1},isShowCheckboxColumn:{type:Boolean,default:!1},isSingleChecked:{type:Boolean,default:!1},isFixedCheckboxColumn:{type:Boolean,default:!1},selectionColumnWidth:{type:Number,default:b},selectable:{type:Function,default:null},endEditTriggerValidate:{type:Boolean,default:!1},spanMethod:{type:Function,required:!1},isUseRowButtons:{type:Boolean,default:!1},rowButtons:{type:Array,default:function(){return[]}},rowButtonsMaxNumber:{type:Number,default:4},rowButtonsMoreText:{type:String,default:""},rowButtonsMoreStyle:{type:String,default:"icon-text"},autoOrder:{type:Boolean,default:!0},tableExportResult:{type:Array,default:function(){return[]}}},data:function(){return{isReDrawHander:!1,currentPage:1,drawTable:!1,editingData:null,oldData:{},deleted:[],dataWatch:[],elTable:null,subControls:{},subControlsArray:[],templateData:[{_id:dsf.uuid()}],tableWidth:0,pageChanging:!1,pagereloaded:!1,currerPageErrors:[],validateTempTable:"",searchStr:"",highlightCurrentRow:!!this.$listeners["current-change"],defaultRowButtons:[{text:"",icon:"tianxie",id:"edit",title:"编辑",handler:this.rowEditHandler},{text:"",id:"delete",title:"删除",icon:"shanchu",handler:this.rowDeleteHandler},{text:"",id:"up",icon:"shang",title:"上移",handler:this.rowUpHandler},{text:"",id:"down",icon:"xia",title:"下移",handler:this.rowDownHandler}],filterInfo:[]}},computed:{designColumns:function(){var e=this.columns,t=[],n={};return dsf.deepForEach(e,(function(e,i,l,s){var a=dsf.mix(!0,{},e,{fixed:!1});a.children=[],n[a.id]=a,s?n[s.id]&&(n[s.id].children||(n[s.id].children=[]),n[s.id].children.push(a)):t.push(a)})),t},realColumns:function(){var e=this,t=this.columns,n=[],i={};return dsf.deepForEach(t,(function(t,l,s,a){var o=!1!==e.renderTableHandler(t);if(o){var r=dsf.mix(!0,{},t);dsf.setObjAttr(r,"__data__",t),r.children=[],i[r.id]=r,a?i[a.id]&&(i[a.id].children||(i[a.id].children=[]),i[a.id].children.push(r)):n.push(r)}})),n},columnIsFixed:function(){var e=this.realColumns,t=!1,n=_.filter(e||[],(function(e){return e.fixed}));return t=n.length>0,t},pageCount:function(){return Math.ceil(this.allList.length/this.pageSize)},designerValue:function(){var e=this.$isPrototype,t=this.staticData,n=this.templateData;return e?t||n||[]:n},list:function(){var e=this.allList,t=this.showPagination,n=this.pageSize,i=this.currentPage;return t&&(e=this.$getPageList(e,i,n)),e},allList:function(){var e,t=this,n=this.value;if(this.filterData&&(n=this.filterData(n)),null!==(e=this.filterInfo)&&void 0!==e&&e.length){var i=[];_.forEach(n,(function(e){var n=[];_.forEach(t.filterInfo,(function(t){n.push(t.match(e[t.field],e))})),_.every(n)&&i.push(e)})),n=i}var l=this.searchStr;if(!this.filterData&&this.showSearch&&l&&this.searchFields){var s=this.searchFields.split(",");n=_.filter(n,(function(e){return!!_.find(s,(function(n){var i,s=t.$replace("@[".concat(n,"]"),e);return dsf.isString(s)?s.indexOf(l)>-1:dsf.isObject(s)?(null===s||void 0===s||null===(i=s.text)||void 0===i?void 0:i.indexOf(l))>-1:!!dsf.isArray(s)&&!!_.find(s,(function(e){return dsf.isString(e)?e.indexOf(l)>-1:!!dsf.isObject(e)&&(null===e||void 0===e||null===(t=e.text)||void 0===t?void 0:t.indexOf(l))>-1;var t}))}))}))}return n},getColumnSlots:function(){return _.filter(slots,(function(e){return 0==e.name.indexOf("column-")}))},columnMaps:function(){var e={};return this.deep((function(t,n,i,l){e[l]||(e[l]=[]),e[l].push(t)}),this.columns),e},allowEdit:function(){var e=this.$$readOnly,t=this.foreverEditor,n=this.isEditabled;return!e&&(!!t||n)},$isLeastOne:function(){return this.isLeastOne&&this.value&&1==this.value.length}},beforeCreate:function(){this.outputColumns=[]},created:function(){C.call(this),this.isDesign&&this.refreshHeader(),dsf.isDef(this.renderRowButton)&&!dsf.isFunction(this.renderRowButton)&&this.$emit("update:renderRowButton",dsf.noop)},mounted:function(){this.elTable=this.$refs.table},beforeUpdate:function(){this.outputColumns=[]},updated:function(){this.doLayout()},methods:{setFilterInfo:function(){var e=[];_.forEach(this.realColumns,(function(t){var n;if(null!==t&&void 0!==t&&null!==(n=t.filterInfo)&&void 0!==n&&n.value){var i,l=function(e){return e},s=t.filterInfo.value.dataType,a=t.filterInfo.type,o=t.filterInfo.value.value,r=t.filterInfo.field;"datetime"==s&&("ymd"==a?l=function(e){return new Date(dsf.date.format(new Date(e),"yyyy-mm-dd")).getTime()}:"ym"==a&&(l=function(e){return new Date(dsf.date.format(new Date(e),"yyyy-mm")).getTime()}));var u=null;"enum"==a?u=function(e,t){var n=e;if(dsf.isUnDef(e)){var i,l=r.split("."),s=l[1].split("_");n=null===t||void 0===t||null===(i=t[l[0]+"."+[null===s||void 0===s?void 0:s[0]]])||void 0===i?void 0:i[null===s||void 0===s?void 0:s[1]]}return o.split(" ").includes(n)}:("number"==a&&(l=function(e){return+e}),u=function(e){var n=!1;switch(t.filterInfo.value.operation){case"eq":n=l(e)==l(o);break;case"gt":n=l(e)>l(o);break;case"gteq":n=l(e)>=l(o);break;case"lt":n=l(e)<l(o);break;case"lteq":n=l(e)<=l(o);break;case"between":n=l(e)>=l(o[0])&&l(e)<=l(o[1]);break;case"gtlt":n=l(e)>l(o[0])&&l(e)<l(o[1]);break}return n}),e.push(p(p({},(null===t||void 0===t||null===(i=t.filterInfo)||void 0===i?void 0:i.value)||{}),{},{field:r,match:u}))}})),this.filterInfo=e},tableCurrentChange:function(e,t){this.$dispatch("current-change",{row:e,oldRow:t})},getChildErrors:function(){var e=this.$el.querySelectorAll(".ds-error"),t=[];return e.forEach((function(e){e.__vue__&&e.__vue__.isFormControl&&e.__vue__.errors.length>0&&t.push(e.__vue__.errors)})),t},indexMethod:function(e){if(this.getRowIndex)return this.getRowIndex(e);this.$vm;var t=e;return t=this.showPagination?(this.currentPage-1)*this.pageSize+e+1:e+1,t},isDefaultRow:function(e){return!(!this.isLeastOne||this.$$readOnly)&&e.$type==y.DEFAULT},pushRow:function(e,t){var n,i=this,l=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=[];if("array"===dsf.type(e))s=e;else{if("object"!==dsf.type(e))return dsf.layer.message("子表追加行数据格式错误！",!1),void dsf.error("子表追加行数据格式错误，必须为Object对象");s=[e]}(n=this.value).push.apply(n,r()(s)),this.$nextTick((function(){t&&i.pageCount!=i.currentPage&&(i.currentPage=i.pageCount),l&&i.editBegin(_.last(s))}))},insertRow:function(e,t,n){var i,l=this,s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];dsf.isArray(e)?(i=this.value).splice.apply(i,[t,0].concat(r()(e))):this.value.splice(t,0,e);this.$nextTick((function(){if(n){var i=l.value[t],a=_.findIndex(l.list,(function(e){return e==i})),o=Math.floor(a/l.pageSize);o<=0&&(o=1),o!=l.currentPage&&(l.currentPage=o)}s&&l.editBegin(e)}))},removeRow:function(e,t){this.editAllEnd(),t?(dsf.array.remove(this.value,e),this.deleted.push(e)):dsf.array.remove(this.value,e),!this.list.length&&this.currentPage>1&&this.currentPage--},removeRows:function(e){var t=this;_.eachRight(e,(function(e){e._id?t.removeRow(e,!0):t.removeRow(e,!1)}))},clearRows:function(){var e=this;_.eachRight(this.value,(function(t){t._id?e.removeRow(t,!0):e.removeRow(t,!1)}))},getLastColumns:function(e){var t=[];return this.deep((function(e){e.children&&e.children.length?(e.columnId="",e.isLast=!1):(e.isLast=!0,t.push(e))}),e),t},deep:function(e,t){var n=function t(n,i){var l=0;_.each(n,(function(n,s){e&&e(n,s,l,i),t(n.children,i+1),l++}))},i=t||this.columns;i="array"!==dsf.type(i)?[i]:i,n(i,0)},currentChange:function(e){var t=this;return a()(h.a.mark((function n(){return h.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.currentPage=e;case 1:case"end":return n.stop()}}),n)})))()},setRowKey:function(e){return e.$hash},setRowClass:function(){},doLayout:function(){this.elTable=this.$refs.table,this.elTable&&this.elTable.doLayout()},headerCellClassName:function(e){var t=[];if(this.isDesign){var n=e.columnIndex;if(0===e.rowIndex&&this.isShowIndexColumn&&(n-=1),this.columnMaps){var i=this.columnMaps[e.rowIndex],l=i[n];l&&l.hide&&l.label==e.column.label&&t.push("ds-design-hide")}}return t.join(" ")},cellClassName:function(e){var t=[];if(this.isDesign){var n=e.columnIndex,i=this.getLastColumns();this.isShowIndexColumn&&(n-=1);var l=i[n];l&&l.hide&&t.push("ds-design-hide")}else if(this.renderCellClassName){var s=this.renderCellClassName(e);s=s||[],t.push.apply(t,r()(s))}return t},cellStyle:function(e){if(!this.isDesign&&this.renderCellStyle){var t=this.renderCellStyle(e);return t||{}}},setExpandViewSlot:function(){var e=_.find(this.slots,(function(e){return"expand-view"==e.name}));e||this.slots.push({name:"expand-view",scope:"scope",dataKey:"row",repeat:!0,textProxy:!1,controls:[dsf.designer.createComponent("dsf.subtablecellcontent",{"slot-name":"default"})]})},refreshHeader:function(){var e=this,t=this.getLastColumns(),n={};_.each(t,(function(t,i){var l=t.columnId,s=_.find(e.slots,(function(e){return e.name==l}));if(s)s.name=l;else{var a=s={name:l,scope:"scope",controls:[dsf.designer.createComponent("dsf.subtablecellcontent",{"slot-name":"default"})]};e.slots.push(a),s=a}t.columnId=l,s.scope="scope",s.repeat=!0,s.textProxy=!1,s.dataKey="row",n[s.name]=1})),this.setExpandViewSlot(),this.slots=this.slots.sort((function(e,n){var i=_.findIndex(t,(function(t){return t.columnId==e.name})),l=_.findIndex(t,(function(e){return e.columnId==n.name}));return i>l?1:-1})),_.eachRight(this.slots,(function(t){0!=t.name.indexOf("table-column-")&&0!=t.name.indexOf("column-")||n[t.name]||dsf.array.remove(e.slots,t)}))},rowDeleteHandler:function(e){var t=this,n=this.removeRowBefore,i=dsf.toPromise(n,e.row),l=function(){dsf.layer.confirm({message:"确认是否要删除？"}).then((function(){t.removeRow(e.row,!0),t.$dispatch("remove-row",e.row)})).catch((function(e){console.error(e)}))};i.then((function(e){(!0===e||dsf.isUnDef(e))&&l.call(t)})).catch((function(e){console.error(e)}))},rowEditHandler:function(e){this.isUseDialogEdit?this.openDialogEdit({row:e.row}):(this.editBegin(e.row),this.$dispatch("row-edit-begin",e.row))},rowEditCompleteHandler:function(e){var t=this;return a()(h.a.mark((function n(){return h.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.editAllEnd(),t.$dispatch("row-edit-end",e.row);case 2:case"end":return n.stop()}}),n)})))()},rowEditCancelHandler:function(e){var t=this,n=e.row,i=n.$hash,l=this.oldData[i];for(var s in e.row)dsf.isDef(l[s])?"$editing"!==s&&(e.row[s]=l[s]):e.row[s]=null;this.$nextTick((function(){t.editAllEnd()}))},rowDblClickHander:function(e){e.$editing||this.rowEditHandler({row:e}),this.$dispatch("row-dblclick",e)},rowUpHandler:function(e){var t=this,n=e.$index;S.call(this,e,"up",(function(){0==n&&t.currentPage>1&&t.currentPage--})),this.$dispatch("order",this.value)},rowDownHandler:function(e){var t=this,n=e.$index;S.call(this,e,"down",(function(){n>=t.list.length-1&&t.currentPage>1&&t.currentPage++})),this.$dispatch("order",this.value)},editBegin:function(e){var t=this;if(!this.isUseDialogEdit&&this.allowEdit){this.foreverEditor||this.editAllEnd(),this.oldData[e.$hash]=dsf.mix(!0,{},e),e.$editing=!0;var n=this.getSubControls(e.$hash);_.each(n,(function(n){t.updateSubControls(n.props,n,e)}))}},editAllEnd:function(){for(var e=this,t=[],n=function(){var n=e.value[i];n.$editing&&t.push(n),n.$editing=!1,e.isLeastOne&&e.$isLeastOne&&(dsf.isUnDef(n._id)?n.$editing=!0:n.$editing=!1);var l=e.getSubControls(n.$hash);_.each(l,(function(t){e.updateSubControls(t.props,t,n)})),delete e.oldData[n.$hash]},i=0;i<this.value.length;i++)n();this.endEditTriggerValidate&&!this.isDesign&&this.$vm&&this.designId&&_.each(t,(function(t){e.rowDataValidate(t)}))},updateSubControls:function(e,t,n){this.addSubControls(t);var i=t.local;if(!this.isDesign&&i&&e.isFormControl){var l,s;if(e.metadata_fullcode){var a=e.metadata_fullcode,o=this.getVmDefaultValue(a);void 0===i[a]&&dsf.isDef(o)&&this.$vm.$set(i,a,o)}return this.$vm&&null!==(l=this.$vm)&&void 0!==l&&l.$setControlPropsByWorkFlow&&this.$vm.$setControlPropsByWorkFlow(e,"formControl"),dsf.isUnDef(e.defaultReadOnly)&&(e.defaultReadOnly=e.readOnly),e.isFormControl&&(!this.$$readOnly&&this.foreverEditor&&(i.$editing=!0),e.defaultReadOnly||(this.$$readOnly?e.readOnly=!0:this.foreverEditor?e.readOnly=!1:this.isUseDialogEdit?e.readOnly=!0:(e.readOnly=!i.$editing,this.isDefaultRow(i)?e.readOnly=!1:e.readOnly=!i.$editing))),null===(s=this.renderRowSubControl)||void 0===s||s.call(this,e,n),e}},rowDataValidate:function(e){if(!this.isDesign&&this.$vm&&this.designId){var t,n=e.$hash,i=(null===this||void 0===this?void 0:this.childMetaDataCodes)||[],l=(null===this||void 0===this||null===(t=this.$vm)||void 0===t?void 0:t.$postFieldMap)||{};_.each(i,(function(e){var t=e+"-"+n,i=l[t];i&&i.emitFormValidate(i?null===i||void 0===i?void 0:i.value:null)}))}},getSubControls:function(e){for(var t=[],n=0;n<this.subControlsArray.length;n++){var i=this.subControlsArray[n];i.indexOf(e)>0&&t.push(this.subControls[i])}return t},removeSubControls:function(e,t){if(e.designId&&(t||e.local.$hash)){var n=e.designId+"-"+(t||e.local.$hash);this.subControls[n]&&(this.subControls[n]=null,delete this.subControls[n],dsf.array.remove(this.subControlsArray,n))}},addSubControls:function(e){if(e.designId&&e.local.$hash){var t=e.$designId;this.subControls[t]=e,dsf.array.ensure(this.subControlsArray,t)}},editBlurHandler:function(){},renderTableHandler:function(e){var t=this.renderHeader||dsf.noop;if(!0===e.hide)return!1;var n=t(e);return!1!==n&&e.isLast&&dsf.array.ensure(this.outputColumns,e),n},resize:function(){this.doLayout()},search:function(){var e=this;if(!this.isDesign)return new Promise((function(t,n){setTimeout(a()(h.a.mark((function n(){return h.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.reloadData(1);case 2:e.$emit("search"),t();case 4:case"end":return n.stop()}}),n)}))),200)}))},openDialogEdit:function(e){for(var t=this,n=[],i=this,l=function(){var l=t.editDialogButtons[s];if(!e.isAddNew&&"editDialogNext"==l.handler)return 1;n.push({text:l.text,handler:function(t){return a()(h.a.mark((function n(){var s,a,o,r;return h.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=null,l.isUser){n.next=11;break}if(l.handler||(s=null),!l.customerFn){n.next=6;break}return n.next=6,l.customerFn(t,e);case 6:return n.next=8,null===i||void 0===i||null===(a=i[l.handler])||void 0===a?void 0:a.call(i,t,e);case 8:s=n.sent,n.next=14;break;case 11:return n.next=13,null===i||void 0===i||null===(o=i.$vm)||void 0===o||null===(r=o[l.handler])||void 0===r?void 0:r.call(o,t,e);case 13:s=n.sent;case 14:return i.$nextTick((function(){i.editAllEnd()})),n.abrupt("return",s);case 16:case"end":return n.stop()}}),n)})))()}})},s=0;s<this.editDialogButtons.length;s++)l();var o=dsf.mix(!0,{},e.row);for(var r in o)r.startsWith("$")&&delete o[r];this.$openDialog({title:this.editDialogTitle,width:this.editDialogWidth,height:this.editDialogHeight,params:{path:this.$replace(this.editDialogUrl,o),choiceParams:e.row,localData:o},btns:n})},editDialogYes:function(e,t){var n=this;return a()(h.a.mark((function i(){return h.a.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,n.editDialogReturnValueHandler(e,t);case 2:return i.abrupt("return",i.sent);case 3:case"end":return i.stop()}}),i)})))()},editDialogNext:function(e,t){var n=this;return a()(h.a.mark((function i(){var l;return h.a.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,n.editDialogReturnValueHandler(e,t);case 2:return l=i.sent,l&&n.$nextTick((function(){var t;null===e||void 0===e||null===(t=e.$refs)||void 0===t||null===(t=t.view)||void 0===t||t.$viewDataReset()})),i.abrupt("return",!1);case 5:case"end":return i.stop()}}),i)})))()},editDialogReturnValueHandler:function(e,t){var n=this;return a()(h.a.mark((function i(){var l,s,a,o,r,u,d,c;return h.a.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(l=t.row,s=t.isAddNew,a=t.firstRowInser,o=n,null===e||void 0===e||!e.yes){i.next=10;break}return i.next=7,e.yes();case 7:if(r=i.sent,r){for(c in{},l=s?{}:l,o.metadataDict)void 0!==r[c]&&o.$set(l,c,r[c]);s&&(!0===a?n.insertRow(l,0,!0):n.pushRow(l,!0)),null===n||void 0===n||null===(u=n.$vm)||void 0===u||null===(d=u.resetValidate)||void 0===d||d.call(u)}return i.abrupt("return",r);case 10:case"end":return i.stop()}}),i)})))()},handleSelection:function(e,t){if(this.isSingleChecked){var n=!!_.find(e,(function(e){return e._id===t._id})),i=n?[t]:[];this.multipleSelection=i,this.$emit("select",i,t)}else this.$emit("select",e,t)},handleSelectionChange:function(e){var t;this.isSingleChecked?e.length>1?this.elTable.clearSelection():null!==e&&void 0!==e&&e.length||null===(t=this.multipleSelection)||void 0===t||!t.length||this.elTable.toggleRowSelection(this.multipleSelection[0],!0):this.multipleSelection=e},handleSelectionAll:function(e){this.$emit("select-all",e)},getSelectedRows:function(){return this.multipleSelection},setSelectedRows:function(e){var t,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n&&this.isSingleChecked&&(this.multipleSelection=[e]),null===(t=this.elTable)||void 0===t||t.toggleRowSelection(e,n)},clearSelection:function(){var e;this.multipleSelection=[],null===(e=this.elTable)||void 0===e||e.clearSelection()}},beforeDestroy:function(){},watch:{value:{handler:function(e,t){if(e){var n;if(this.separateTotalRowFromValue(e))return;if(null!==this&&void 0!==this&&null!==(n=this.$vm)&&void 0!==n&&n.$isReady&&e.length<=0)return void this.createLeastOneRow();for(var i=0;i<e.length;i++){var l=e[i];l.$index=i,this.attachMustFieldToData(l),this.setRowDefaultValue(l),this.updateIndexDataField(l,l.$index+1)}this.$isLeastOne&&dsf.isUnDef(e[0]._id)&&this.editBegin(e[0]),t&&e&&this.emitValueChange(e)}},immediate:!0},columns:{handler:function(){var e=this;this.refreshHeader(),this.isReDrawHander=!0,this.$nextTick((function(){e.isReDrawHander=!1}))},deep:!0},isExpandView:{handler:function(){var e=this;this.refreshHeader(),this.isReDrawHander=!0,this.$nextTick((function(){e.isReDrawHander=!1}))}},"elTable.bodyWidth":function(e){var t=this.elTable.$el.querySelector(".el-table__body-wrapper");this.tableWidth=t.offsetWidth},"$vm.$isReady":function(e){e&&this.createLeastOneRow()},"$system.setting.fontSize":{handler:function(e,t){var n=["bigFont_1","bigFont_2","bigFont_3"];n.indexOf(e)>=0?(this.$emit("update:indexColumnWidth",m+20),this.$emit("update:operateColumnWidth",this.operateColumnWidth+30),this.$emit("update:selectionColumnWidth",b+20)):(this.$emit("update:indexColumnWidth",m),this.$emit("update:operateColumnWidth",this.operateColumnWidth),this.$emit("update:selectionColumnWidth",b)),this.$refs.table&&this.$refs.table.doLayout()},immediate:!0},allList:{handler:function(e,t){(null===e||void 0===e?void 0:e.length)!=(null===t||void 0===t?void 0:t.length)&&(this.currentPage=1)},deep:!0}},design:{settingMenus:function(){return[].concat(r()($mixins.list.design.settingMenus()||[]),[{text:"表头设置",command:"header-setting",handler:D}])},toMobile:{childComponentAddToMobileSubTable:function(e,t,n){var i=_.find(e.slots,(function(e){return"default"==e.name}));i&&i.controls.push(t)}}}});function C(){if(this.isDesign&&0==this.columns.length)for(var e=4,t=0;t<e;t++)k.call(this,{label:"列".concat(t),level:0,columnId:"table-column-"+dsf.math.numToEnglishLetter(t+1)})}function S(e,t,n){var i=this.list[e.$index],l=_.findIndex(this.value,(function(e){return e==i})),s="up"==t?l-1:l+1,a=this.value[s];a&&(i.$order=s,a.$order=l,this.$set(this.value,s,i),this.$set(this.value,l,a),n&&n(e))}function k(e,t,n){var i={label:"",columnId:"",level:0,isLast:!1,hide:!1,headerAlign:"center",align:"center",resizable:!1,width:"auto",children:[]},l=dsf.mix({},i,e);return n?dsf.isUnDef(t)?(n.children.push(l),l.level=n.level+1):n.children.splice(t,0,l):dsf.isUnDef(t)?this.columns.push(l):this.columns.splice(t,0,l),l}function D(e,t){dsf.designer.triggerDialogPropty("columns")}var $=x,B=n(0),O=Object(B["a"])($,i,l,!1,null,null,null);t["default"]=O.exports},937:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.owner.isUseRowButtons?n("div",[e.isDesign?[n("DsfButtonBar",{staticClass:"ds-no-padding operate-column",attrs:{size:"small","max-number":e.owner.rowButtonsMaxNumber,"more-button-text":e.owner.rowButtonsMoreText,"more-button-style":e.owner.rowButtonsMoreStyle,buttons:e.owner.rowButtons,"emit-prefix":"row-button",local:e.scope.row,align:"center"}})]:[n("DsfButtonBar",{staticClass:"ds-no-padding operate-column",attrs:{size:"small","render-button":e.renderRowButton,"max-number":e.owner.rowButtonsMaxNumber,"more-button-text":e.owner.rowButtonsMoreText,"more-button-style":e.owner.rowButtonsMoreStyle,buttons:e.scope.row.$buttons,"emit-prefix":"row-button",local:e.scope.row,"slot-scope-data":e.scope,align:"center"}})]],2):n("div",[e._l(e.owner.defaultRowButtons,(function(t){return[e.isDesign?[e.showDefaultButtons(t.id)?n("DsfButton",{key:t.id,staticStyle:{"min-width":"auto"},attrs:{"btn-style":"icon-text",icon:t.icon,title:t.title}}):e._e()]:[e.showDefaultButtons(t.id)?n("DsfButton",{key:t.id,class:[t.id+"-button-"+e.scope.row.$hash],staticStyle:{"min-width":"auto"},attrs:{"btn-style":"icon-text",icon:t.icon,title:t.title},on:{click:function(n){return t.handler(e.scope)}}}):e._e()]]}))],2)},l=[],s={name:"DsfSubTableButtons",data:function(){return{}},props:{isDesign:{type:Boolean,default:!1},owner:{type:Object,default:function(){return null}},scope:{type:Object,default:function(){return{}}}},methods:{showDefaultButtons:function(e){var t=this.owner,n=t.allowEdit,i=t.foreverEditor,l=t.renderRowButton,s=t.$isLeastOne,a=t.isUseDialogEdit;return this.isDesign?"edit"!=e||n&&!i:"edit"==e?s?!!a:n&&!i&&!1!==l.call(this.owner,e,this.scope.row):!1!==l.call(this.owner,e,this.scope.row)},renderRowButton:function(e,t,n){var i=!0,l=this.owner,s=l.$isLeastOne,a=l.allowEdit,o=l.foreverEditor,r=l.renderRowButton;if(i=r===dsf.noop||dsf.isUnDef(r)?t:!1!==r.call(this.owner,e,n),"system_subtable_row_edit"==e.actionName)if(s)i=!1;else if(i){var u=a&&!o;i=u}return i}}},a=s,o=n(0),r=Object(o["a"])(a,i,l,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_pc_subtable.js.map