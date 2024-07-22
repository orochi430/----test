/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[13],{1185:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ds-control ds-datagrid mobile ds-no-padding",style:t.getStyle},[t.showSearch?n("div",{staticClass:"ds-datagrid-search"},[t._t("search-before",null,{owner:t._self}),n("van-search",{attrs:{placeholder:t.searchPlaceholder,shape:"round"},on:{search:t.search,input:t.inputSearch},model:{value:t.searchStr,callback:function(e){t.searchStr=e},expression:"searchStr"}}),t._t("search-after",null,{owner:t._self})],2):t._e(),t.superSearchInfo.length||t.customerOrder.length?n("dsf-mobile-super-search",{style:t.getSuperSearchStyle,attrs:{"is-design":t.isDesign,owner:t._self,"search-item-setting":t.superSearchInfo,"customer-order":t.customerOrder},on:{loaded:t.superSearchLoadedHandler,change:t.superSearchChangeHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("super-search",null,{owner:t._self},e)]}}],null,!0)}):t._e(),t.isDesign?[n("div",{directives:[{name:"show",rawName:"v-show",value:"grid"===t.layoutType,expression:"layoutType === 'grid'"}]},[t.showCheckbox&&!t.isSingleChecked?n("div",{staticClass:"ds-datagrid-item check-all"},[n("van-checkbox",{attrs:{shape:"square"},model:{value:t.checkAll,callback:function(e){t.checkAll=e},expression:"checkAll"}},[t._v("全选")]),n("span",{staticClass:"tips"},[t._v("已选 0 个")])],1):t._e()])]:["grid"===t.layoutType&&t.showCheckbox&&!t.isSingleChecked?n("div",{staticClass:"ds-datagrid-item check-all"},[n("van-checkbox",{attrs:{value:t.checkAll,shape:"square"},on:{click:t.handleSelectionAll},nativeOn:{click:function(t){t.stopPropagation()}}},[t._v("全选")]),n("span",{staticClass:"tips"},[t._v("已选 "+t._s(t.multipleSelection.length)+" 个")])],1):t._e()],n("div",{directives:[{name:"mobile-scroll",rawName:"v-mobile-scroll"}],ref:"wrap",staticClass:"ds-datagrid-wrap",class:{"has-search":t.showSearch},style:t.getWrapStyle},[t.showHeaderSlot?n("div",{staticClass:"ds-datagrid-head",attrs:{"slot-name":"head"}},[t._t("head")],2):t._e(),t.isDesign?[n("div",{directives:[{name:"show",rawName:"v-show",value:"grid"===t.layoutType,expression:"layoutType === 'grid'"}]},[n("div",{staticClass:"ds-datagrid-item"},[t._t("data-item",(function(){return[t.showCheckbox?n("van-checkbox",{attrs:{shape:t.isSingleChecked?"round":"square"}}):t._e(),n("DsfMobilGridLayout",{attrs:{areas:t.areas,"is-design":t.isDesign,"design-only-slot":!0,owner:t._self,"grid-rows":t.contentLayout.heights,"grid-columns":t.contentLayout.widths,"grid-template":t.matrix},scopedSlots:t._u([t._l(t.areas,(function(e){return{key:e.name,fn:function(){return[n("div",{key:e.name,staticClass:"grid-area-content",class:e.setting.class,style:{padding:e.setting.padding,height:e.setting.height}},[n("div",{staticClass:"grid-area-content-cell",attrs:{"slot-name":e.name}},[t._t(e.name)],2)])]},proxy:!0}}))],null,!0)}),t.isButtonBar?n("div",{staticClass:"ds-datagrid-item-footer",style:t.rowFooterStyle()},[t._t("row-footer",(function(){return[t.rowButtons.length<=0?n("span",{staticClass:"ds-datagrid-item-footer-title"},[t._v("按钮栏")]):t._e(),n("DsfMobileButtonBar",{attrs:{align:t.rowButtonsAlign,"more-button-text":t.rowButtonsMoreButtonText,"more-button-style":t.rowButtonsMoreButtonStyle,"max-number":t.rowButtonsMaxNumber,buttons:t.rowButtons,size:"small"}})]}))],2):t._e(),n("div",{staticClass:"data-item-hidden",attrs:{"slot-name":"data-item-hidden"}},[t._t("data-item-hidden",(function(){return[n("span",[t._v("隐藏区(该区域实际运行时不会输出此段内容)")])]}))],2)]})),n("div",{directives:[{name:"show",rawName:"v-show",value:t.rangeWrap.show,expression:"rangeWrap.show"}],staticClass:"selected-range",style:{height:t.rangeWrap.height+"px",width:t.rangeWrap.width+"px",top:t.rangeWrap.top+"px",left:t.rangeWrap.left+"px"}})],2)]),n("div",{directives:[{name:"show",rawName:"v-show",value:"cardList"===t.layoutType,expression:"layoutType === 'cardList'"}]},[n("dsf-mobile-platform-card-box",{attrs:{"is-design":t.isDesign,"column-number":t.cardListColumnNumber,"column-width":t.cardListColumnWidth,"margin-top":t.cardListMarginTop,padding:t.cardListPadding,checkbox:t.showCheckbox,"max-check-num":t.isSingleChecked?1:0},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"ds-datagrid-slot",attrs:{"slot-name":"gridList"}},[t._t("gridList",null,null,e)],2)]}}],null,!0)}),n("div",{staticClass:"data-item-hidden",attrs:{"slot-name":"data-item-hidden"}},[t._t("data-item-hidden",(function(){return[n("span",[t._v("隐藏区(该区域实际运行时不会输出此段内容)")])]}))],2)],1)]:[n("van-pull-refresh",{attrs:{disabled:t.disabledRefresh},on:{refresh:t.onRefresh},scopedSlots:t._u([{key:"default",fn:function(){return["grid"===t.layoutType?[n("van-checkbox-group",{ref:"checkboxGroup",on:{change:t.checkboxGroupChange},model:{value:t.multipleSelectionCopy,callback:function(e){t.multipleSelectionCopy=e},expression:"multipleSelectionCopy"}},[n("van-list",{ref:"list",class:[t.splitWidthHorizontal],style:{padding:t.$padding},attrs:{finished:t.finished,"finished-text":t.data&&t.data.length>0?t.finishedText:"","immediate-check":!1},on:{load:t.onLoad},scopedSlots:t._u([{key:"default",fn:function(){return[t._l(t.data,(function(e,a){return n("DsfMobileSlideWarp",{key:e._id||t.dsf.uuid(),style:{"margin-top":t.dsf.pxToRem(t.dataMarginTop)},attrs:{"open-slide":t.isButtonBar&&"slide"==t.buttonBarType},scopedSlots:t._u([t.isButtonBar&&"slide"==t.buttonBarType?{key:"right",fn:function(){return[n("DsfMobileButtonBar",{attrs:{size:"small",local:e,"emit-prefix":"row-button","more-button-text":t.rowButtonsMoreButtonText,"more-button-style":t.rowButtonsMoreButtonStyle,"max-number":t.rowButtons.length>3?2:3,align:t.rowButtonsAlign,buttons:t.rowButtons}})]},proxy:!0}:null],null,!0)},[n("div",{staticClass:"ds-datagrid-item",style:{"border-radius":t.$borderRadius},on:{click:function(a){return t.itemClickHandler(e,a)}}},[t._t("data-item",(function(){return[t.showCheckbox?n("van-checkbox",{attrs:{name:e,shape:t.isSingleChecked?"round":"square",disabled:e.disabled||t.renderDisabled(e)},on:{click:function(a){return t.handleSelection(e)}},nativeOn:{click:function(t){t.stopPropagation()}}}):t._e(),n("DsfMobilGridLayout",{attrs:{areas:t.areas,"is-design":t.isDesign,"design-only-slot":!0,"grid-rows":t.contentLayout.heights,"grid-columns":t.contentLayout.widths,"grid-template":t.matrix},scopedSlots:t._u([t._l(t.areas,(function(i){return{key:i.name,fn:function(){return[n("div",{key:i.name,staticClass:"grid-area-content",class:i.setting.class,style:{"over-flow":"hidden",color:i.setting.color,padding:i.setting.padding,height:i.setting.height}},[n("div",{staticClass:"grid-area-content-cell"},[n("div",{staticClass:"grid-area-conent-wrap",class:["ds-multi-ellipsis-"+i.setting.lineNum],style:{"max-height":i.setting.height,"line-height":i.setting.lineHeight}},[t._t(i.name,null,null,{row:e,$index:a,_self:t._self})],2)])])]},proxy:!0}}))],null,!0)}),t.isButtonBar&&!t.buttonBarType?n("div",{staticClass:"ds-datagrid-item-footer",style:t.rowFooterStyle()},[t._t("row-footer",(function(){return[n("DsfMobileButtonBar",{attrs:{size:"small",local:e,"emit-prefix":"row-button","more-button-text":t.rowButtonsMoreButtonText,"more-button-style":t.rowButtonsMoreButtonStyle,"max-number":t.rowButtonsMaxNumber,align:t.rowButtonsAlign,buttons:t.rowButtons}})]}),null,{row:e,$index:a,_self:t._self})],2):t._e()]}),null,{row:e,$index:a,_self:t._self})],2)])})),t.finished&&t.data&&0===t.data.length?n("div",{staticClass:"nodata"},[n("img",{attrs:{src:a(65),alt:""}})]):t._e()]},proxy:!0}],null,!0),model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}})],1)]:"cardList"===t.layoutType?[n("van-list",{ref:"list",class:[t.splitWidthHorizontal],style:{padding:t.$padding},attrs:{finished:t.finished,"finished-text":t.data&&t.data.length>0?t.finishedText:"","immediate-check":!1},on:{load:t.onLoad},scopedSlots:t._u([{key:"default",fn:function(){return[n("dsf-mobile-platform-card-box",{attrs:{data:t.data,loading:t.loading||t.refreshing,"column-number":t.cardListColumnNumber,"column-width":t.cardListColumnWidth,"margin-top":t.cardListMarginTop,padding:t.cardListPadding,checkbox:t.showCheckbox,"max-check-num":t.isSingleChecked?1:0},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("gridList",null,null,e)]}}],null,!0)})]},proxy:!0}]),model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}})]:t._e()]},proxy:!0}]),model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}})]],2)],2)},i=[],r=a(4),s=a.n(r),o=a(3),l=a.n(o),c=a(2),u=a.n(c),d=a(1),h=a.n(d),p=a(467);function f(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function g(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?f(Object(a),!0).forEach((function(e){l()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var m="_id",y="grid-area-",v=dsf.component({name:"DsfMobileDataGrid",ctrlCaption:"数据列表",mixins:[$mixins.layout,$mixins.list,$mixins.dataResult],components:{DsfMobilGridLayout:p["a"]},provide:function(){return{$list:this,$buttonOwner:this}},data:function(){return{rangeWrap:{show:!1,width:0,height:0,top:0,left:0,cells:[],selected:[],dataListMap:{}},isreload:!1,loading:!1,finished:!1,refreshing:!1,currentPage:0,matrix:null,searchStr:"",checkAll:!1,multipleSelectionCopy:[],superValue:[],preSelection:[],isScrollToTop:!1}},props:{layoutType:{type:String,default:"grid"},showSearch:{type:Boolean,default:!0},buttonBarType:{default:null},isInputSearch:{type:Boolean,default:!1},showCheckbox:{type:Boolean,default:!1},isSingleChecked:{type:Boolean,default:!1},disabledRefresh:{type:Boolean,default:!1},isSearchResetSelect:{type:Boolean,default:!0},topBottom:{type:String,default:""},padding:{type:Array,default:function(){return["8","8","8","8"]}},dataMarginTop:{type:String,default:function(){return"10px"}},borderRadius:{type:Array,default:function(){return["0","0"]}},isButtonBar:{type:Boolean,default:!0},cardListColumnNumber:{type:Number,default:2},cardListColumnWidth:{type:String,default:"150px"},cardListMarginTop:{type:String,default:"25px"},cardListPadding:{type:Array,default:function(){return["0","25px","0","25px"]}},rowButtonsAlign:{type:String,default:"right"},rowButtons:{type:Array,default:function(){return[]}},rowButtonsMaxNumber:{type:Number,default:2},rowButtonsMoreButtonStyle:{type:String,default:""},rowButtonsMoreButtonText:{type:String,default:"更多"},rowClickToUrl:{type:String,default:""},pageSize:{type:Number,default:15},searchInfo:{type:Array,default:function(){return[]}},superSearchInfo:{type:Array,default:function(){return[]}},defaultOrder:{type:Array,default:function(){return[]}},customerOrder:{type:Array,default:function(){return[]}},browseScope:{type:Object,default:function(){return{scope:"2",unit:[]}}},searchPlaceholder:{type:String,default:"请输入搜索关键词"},finishedText:{type:String,default:"没有更多了"},contentLayout:{type:Object,default:function(){return{grid:[],widths:[],heights:[],setting:{}}}},cellSerial:{type:Number,default:0},mountedRequestData:{type:Boolean,default:!0},slots:{type:Array,default:function(){return[{name:"head",controls:[]},{name:"default",controls:[]},{name:"gridList",controls:[],scope:"scope",dataKey:"row",repeat:!0,textProxy:!0},{name:"data-item",controls:[],scope:"scope",dataKey:"row",repeat:!0},{name:"data-item-hidden",controls:[],scope:"scope",dataKey:"row",repeat:!0}]}},data:{type:Array,default:function(){return[]}},getSearchStr:{type:Function,default:null},total:{type:String,default:"0"},isQueryTotal:{type:Boolean,default:!1},renderDisabled:{type:Function,default:function(t){return!1}},getAttachRequestParams:{type:Function,default:null},getFilter:{type:Function,default:function(){return{}}},showHeaderSlot:{type:Boolean,default:!1},isSuperSearchSticky:{type:Boolean,default:!1},isInnserScrollBar:{type:Boolean,default:!0}},computed:{$isSuperSearchSticky:function(){return!this.isInnserScrollBar&&this.isSuperSearchSticky},multipleSelection:{get:function(){var t=this.preSelection||[];return t.length>0?[].concat(u()(this.multipleSelectionCopy),u()(t)):u()(this.multipleSelectionCopy)},set:function(t){var e=this;if(this.isSingleChecked){var a=t.length>1?1:0;this.multipleSelectionCopy=t.splice(a,1)||[]}else{this.multipleSelectionCopy=t||[];var n=this.data.filter((function(t){return!t.disabled&&!e.renderDisabled(t)}));this.checkAll=t.length===n.length&&0!==this.data.length}this.$dispatch("selection",this.multipleSelectionCopy)}},areas:function(){var t=this.matrix,e=[];return t&&_.each(t,(function(t){_.each(t,(function(t){dsf.array.ensure(e,t,(function(e){return e.name==t.name}))}))})),e},$borderRadius:function(){return[this.pxToRem(this.borderRadius[0]),this.pxToRem(this.borderRadius[0]),this.pxToRem(this.borderRadius[1]),this.pxToRem(this.borderRadius[1])].join(" ")},$padding:function(){var t=this.padding;return[this.pxToRem(t[0]),this.pxToRem(t[1]),this.pxToRem(t[2]),this.pxToRem(t[3])].join(" ")},splitWidthHorizontal:function(){return"split-small"==this.topBottom?"split-horizontal--8":"split-medium"==this.topBottom?"split-horizontal--10":"split-big"==this.topBottom?"split-horizontal--15":""},getStyle:function(){var t=g(g({},this.getHeightStyle),this.getScrollStyle);return t},getWrapStyle:function(){var t=g(g({},this.getHeightStyle),this.getScrollStyle);return t},getHeightStyle:function(){var t={},e=this.isDesign,a=this.isInnserScrollBar;return t.height=e||a?"100%":"auto",t},getScrollStyle:function(){var t={},e=this.isDesign,a=this.isInnserScrollBar;return t.overflow=e||a?"auto":"visible",t},getSuperSearchStyle:function(){var t={};return!this.isDesign&&this.$isSuperSearchSticky&&(t["position"]="sticky",t["top"]="0px",t["z-index"]="10"),t}},created:function(){var t=this;this.debounceSearch=_.debounce(s()(h.a.mark((function e(){return h.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.onRefresh();case 2:t.$emit("search");case 3:case"end":return e.stop()}}),e)}))),100)},mounted:function(){var t=this;this.isDesign||(this.mountedRequestData&&this.$nextTick((function(){var e,a;null!==(e=t.superSearchInfo)&&void 0!==e&&e.length||null!==(a=t.customerOrder)&&void 0!==a&&a.length||(t.currentPage=1,t.loadData(),t.queryDataCount())})),this.defaultSelected())},methods:{setViewSeleted:function(t){var e=this,a=_.map(t.value,(function(t){return t.value}));a.length?_.forEachRight(this.multipleSelection,(function(n,i){var r=t.mapDataFn(n);if(r){var s=r.value;a.includes(s)||e.multipleSelectionCopy.splice(i,1)}})):this.multipleSelectionCopy=[],this.loadSelected()},resize:function(){this.isDesign&&this.rangeWrap.cells.length>0&&k.call(this,this.rangeWrap.cells)},checkboxGroupChange:function(t){var e=this;this.isSingleChecked&&this.$nextTick((function(){var t;e.multipleSelection.length&&(null===(t=e.$vm.$parent)||void 0===t||t.$emit("select-change",e.multipleSelection))}))},onLoad:function(){this.currentPage++,this.loadData()},rowFooterStyle:function(){if(!this.isDesign)return{"margin-right":this.pxToRem(-1*this.padding[1]),"margin-bottom":this.pxToRem(-1*this.padding[2]),"margin-left":this.pxToRem(-1*this.padding[3])}},defaultSelected:function(t){this.loadSelected(t)},loadSelected:function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=this.isSingleChecked,n=this.$choiceParams,i=this.data;if(dsf.isObject(e)&&(e=[e]),null!==n&&void 0!==n&&n.value&&(e=[].concat(u()(n.value),u()(e))),null!==(t=e)&&void 0!==t&&t.length){a&&(e=[e[0]]);var r={};_.each(e,(function(t){var e=t.value||t._value||t[m]||t.id;r[e]=l()(l()(l()({},m,e),"name",t.text||t._text||t.name||t._name||t.label||t._label),"$makeup",!0)})),this.preSelection=_.values(r),this.updateSelection(i)}},updateSelection:function(t){var e=this.preSelection;if(null!==e&&void 0!==e&&e.length){var a=this.multipleSelectionCopy;_.each(t,(function(t){var n=_.findIndex(e,(function(e){return e[m]===t[m]}));n>-1&&(e.splice(n,1),_.find(a,(function(e){return e[m]===t[m]}))||a.push(t))}))}},onRefresh:function(){var t=this;return s()(h.a.mark((function e(){var a;return h.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.checkAll,t.isSearchResetSelect?a=!1:t.preSelection=t.multipleSelection,t.multipleSelection=[],t.checkAll=a,t.refreshing=!0,t.finished=!1,t.data.splice(0,t.data.length),t.loading=!0,e.next=10,t.loadData();case 10:t.queryDataCount();case 11:case"end":return e.stop()}}),e)})))()},search:function(){var t=this;return s()(h.a.mark((function e(){return h.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.isDesign&&!t.isInputSearch){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.onRefresh();case 4:t.$emit("search");case 5:case"end":return e.stop()}}),e)})))()},inputSearch:function(){!this.isDesign&&this.isInputSearch&&this.debounceSearch()},getQueryInfo:function(){var t,e=[];this.getSearchStr&&(this.searchStr=this.getSearchStr());var a={searchValue:(this.searchStr||"").split(/\s+/g).join(" ")};if(this.searchInfo&&_.each(this.searchInfo,(function(t){"1"==t.type&&(a[t.code]=t.valueExpress)})),this.superValue&&_.each(this.superValue,(function(t,e){a[e]=t})),this.defaultOrder){var n=_.map(this.customerOrder,(function(t){return t.sortType?{code:t.field,sort:t.sortType}:void 0}));n=_.filter(n,(function(t){return t}));var i=_.map(this.defaultOrder,(function(t){var e=_.findIndex(n,(function(t){return t.code==t.field}));if(e<0)return{code:t.field,sort:t.sortType}}));e=[].concat(u()(n),u()(i))}return{order:e,query:a,filter:(null===this||void 0===this||null===(t=this.getFilter)||void 0===t?void 0:t.call(this))||[]}},doLayout:function(){},getCellSetting:function(t){return this.contentLayout.setting&&this.contentLayout.setting[t.name]?this.contentLayout.setting[t.name]:{}},getCellFontColor:function(t){var e=this.getCellSetting(t);return e.color},getCellPadding:function(t){var e=this.getCellSetting(t),a=[this.pxToRem(e.paddingTop||0),this.pxToRem(e.paddingRight||0),this.pxToRem(e.paddingBottom||0),this.pxToRem(e.paddingLeft||0)];return a.join(" ")},getCellClass:function(t){var e=this.getCellSetting(t);return[e?e.fontSize:"ds-font5",e?e.align:"left",e?e.verticalAlign:"middle",e&&1==e.bold?"bold":""]},getLineNum:function(t){var e=this.getCellSetting(t);return e&&e.lineNum?e.lineNum:"auto"},getLineHeight:function(t){var e=this.getCellSetting(t);return e&&e.lineHeight?this.pxToRem(e.lineHeight||"normal"):"auto"},getCellHeight:function(t){var e="auto",a=this.getCellSetting(t);return a&&a.height&&(e=this.pxToRem(a.height||"auto")),this.isDesign&&"auto"==e?"100%":e},loadData:function(){var t=this;return s()(h.a.mark((function e(){return h.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$isPrototype){e.next=4;break}return e.abrupt("return",t.loadStaticData());case 4:return e.next=6,t.loadServerData();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})))()},loadStaticData:function(){var t=this;this.loading=!0,this.refreshing&&(this.currentPage=1),setTimeout((function(){var e=t.$getRealStaticValue(t.staticValue),a=t.$getPageList(e,t.currentPage,t.pageSize);t.$emit("update:data",t.data.concat(a)),t.loading=!1,t.data.length>=e.length&&(t.finished=!0),t.refreshing=!1}),300)},queryDataCount:function(){var t=this;return s()(h.a.mark((function e(){var a,n,i,r,s,o;return h.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.isQueryTotal){e.next=19;break}if(!t.$isPrototype){e.next=6;break}a=t.$getRealStaticValue(t.staticValue),t.$emit("update:total",(null===a||void 0===a?void 0:a.length)||"0"),e.next=19;break;case 6:if(n=t.getQueryInfo(),i={pageNum:t.currentPage,pageSize:t.pageSize,query:JSON.stringify(n.query),filter:JSON.stringify(n.filter),namespace:t.$vm.nameSpace,pageName:t.$vm.pageName},r="meta/list/count",!t.getAttachRequestParams){e.next=13;break}return e.next=12,dsf.mix(i,t.getAttachRequestParams(i)||{});case 12:i=e.sent;case 13:return dsf.mix(i,t.queryString),e.next=16,t.$http.get(r,i,!0);case 16:s=e.sent,o=s.data.count,t.$emit("update:total",o);case 19:case"end":return e.stop()}}),e)})))()},loadServerData:function(){var t=this;return s()(h.a.mark((function e(){var a,n,i,r,s;return h.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$vm){e.next=14;break}if(t.loading=!0,t.refreshing&&(t.currentPage=1),a=t.getQueryInfo(),n={pageNum:t.currentPage,pageSize:t.pageSize,query:JSON.stringify(a.query),order:JSON.stringify(a.order),filter:JSON.stringify(a.filter),namespace:t.$vm.nameSpace,pageName:t.$vm.pageName},i="meta/list/data",!t.getAttachRequestParams){e.next=10;break}return e.next=9,dsf.mix(n,t.getAttachRequestParams(n)||{});case 9:n=e.sent;case 10:return dsf.mix(n,t.queryString),r=null,s=!1,e.abrupt("return",t.$http.get(i,n,!0).then((function(e){var a=e.data;if(2e4!=a.state)throw a;if(r=a.data,r.forEach((function(t){if(!t._id)throw"数据列表_id不存在, 请检查接口数据"})),t.refreshing||1==t.currentPage){var n;t.dataListMap={};var i=_.keyBy(r,"_id");for(var s in i)t.dataListMap[s]=!0;(n=t.data).splice.apply(n,[0,t.data.length].concat(u()(r)))}else _.each(r,(function(e){t.dataListMap[e._id]||(t.data.push(e),t.dataListMap[e._id]=!0)}));t.updateSelection(r),t.$nextTick((function(){t.$dispatch("data-loaded",t.data)}))})).catch((function(t){if(s=!0,"string"==dsf.type(t)||t.message){var e=t.message||t;dsf.layer.message(e,!1)}})).finally((function(){s&&(t.finished=!0),"array"==dsf.type(r)&&r.length<t.pageSize&&(t.finished=!0),t.$nextTick((function(){t.loading=!1,t.refreshing&&(t.refreshing=!1)}))})));case 14:case"end":return e.stop()}}),e)})))()},reloadData:function(){var t=this;return s()(h.a.mark((function e(){return h.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.isreload){e.next=13;break}return e.prev=1,t.isreload=!0,e.next=5,t.onRefresh();case 5:e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),dsf.error(e.t0);case 10:return e.prev=10,t.isreload=!1,e.finish(10);case 13:case"end":return e.stop()}}),e,null,[[1,7,10,13]])})))()},handleSelectionAll:function(){var t=this,e=this.checkAll=!this.checkAll;this.$refs.checkboxGroup.toggleAll({checked:e,skipDisabled:!0}),e||(this.preSelection=[],this.multipleSelection=[]),this.$nextTick((function(){t.$emit("handleSelectionAll",t.multipleSelection,t.data)}))},handleSelection:function(t){var e=this,a=-1===_.findIndex(this.multipleSelection,(function(e){return e._id===t._id}));this.isSingleChecked&&(this.multipleSelectionCopy=a?[]:[t]),this.$nextTick((function(){e.$emit("handleSelection",a,e.multipleSelection,t)}))},itemClickHandler:function(t,e){if(this.$listeners["row-click"])this.$dispatch("row-click",t);else if(this.rowClickToUrl){var a=this.$replace(this.rowClickToUrl,t);a=dsf.url.toRoutePath(a),this.$router.push({path:a})}},superSearchLoadedHandler:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];!this.isDesign&&this.mountedRequestData&&(this.superValue=t,this.currentPage=1,this.onRefresh())},superSearchChangeHandler:function(t,e){this.superValue=t,e&&this.search()},getReturnValue:function(){return this.multipleSelection}},watch:{"contentLayout.grid":{handler:function(t){if(this.isDesign){S.call(this),this.matrix=x.call(this),w.call(this);var e=this.contentLayout.widths.slice(0),a=this.contentLayout.heights.slice(0);dsf.array.removeAll(this.contentLayout.widths),dsf.array.removeAll(this.contentLayout.heights);for(var n=0;n<this.matrix.length;n++){a[n]?this.contentLayout.heights[n]=a[n]:this.contentLayout.heights[n]="auto";for(var i=0;i<this.matrix[n].length;i++)e[i]?this.contentLayout.widths[i]=e[i]:this.contentLayout.widths[i]="auto"}}else this.matrix=x.call(this)},immediate:!0},"contentLayout.setting":{handler:function(t){if(this.isDesign){S.call(this),this.matrix=x.call(this),w.call(this);var e=this.contentLayout.widths.slice(0),a=this.contentLayout.heights.slice(0);dsf.array.removeAll(this.contentLayout.widths),dsf.array.removeAll(this.contentLayout.heights);for(var n=0;n<this.matrix.length;n++){a[n]?this.contentLayout.heights[n]=a[n]:this.contentLayout.heights[n]="auto";for(var i=0;i<this.matrix[n].length;i++)e[i]?this.contentLayout.widths[i]=e[i]:this.contentLayout.widths[i]="auto"}}else this.matrix=x.call(this)}},"data.length":function(t){var e=this;if(t){var a=this.data.filter((function(t){return!t.disabled&&!e.renderDisabled(t)}));this.checkAll=this.multipleSelectionCopy.length===a.length&&0!==this.data.length}else this.checkAll=!1},data:{handler:function(t){for(var e=0;e<t.length;e++)"$editing"in t[e]||(t[e].$editing=!1),!("$editing"in t[e])&&this.$set(t[e],"$editing",!1),!("$hash"in t[e])&&this.$set(t[e],"$hash",dsf.uuid()),"$order"in t[e]?this.$set(t[e],"$order",e):t[e]["$order"]=e,t[e].$index=e}}},design:{isMask:!1,metadata:{isDeep:!1,create:function(t){var e,a,n=this,i=[];dsf.designer.recursionLayoutTree(this,null,null,(function(e){if(e!=n){var a=e.$options.design||{},r=a.metadata||{},s=r.create&&r.create.call(e,t);if(s&&s.metadata){i.push(s);var o=!dsf.isDef(r.isDeep)||r.isDeep;if(!o)return!1}}}));for(var r={},s=[],o=[],l=0;l<this.searchInfo.length;l++){var c=this.searchInfo[l],u=null,d="";"datetime"==c.dataType&&(d="yyyy-MM-dd HH:mm:ss","ymd"==c.format?d="yyyy-MM-dd":"ym"==c.format?d="yyyy-MM":"y"==c.format&&(d="yyyy")),"0"==c.type?(u={code:c.code,operator:c.operation,valueKey:"searchValue",from:"searchInput",dataType:c.dataType||"string",format:d},s.push(u)):(u={code:c.code,operator:c.operation,valueKey:c.code,from:"default",dataType:c.dataType||"string",format:d},o.push(u),c.metadata_fullcode=u.code)}var h={logic:"or",items:[]};(e=h.items).push.apply(e,s);var p={logic:"and",items:[]};(a=p.items).push.apply(a,o);var f={logic:"and",items:[]};f.items.push(h),f.items.push(p);var g={logic:"and",items:[]};_.each(this.superSearchInfo,(function(t){var e=null,a="",n=null;if("enum"==t.searchType){var i,r=[];if((null===t||void 0===t||null===(i=t.children)||void 0===i?void 0:i.length)>0?(r=_.map(t.children,(function(t){return 1==t.join})),r=r.slice(0,1)):r=[t],1==r.length){e=r[0].field,a=r[0].operator,n=r[0].field,"in"!=a&&"eq"!=a||(a="in");var s={code:e,operator:"in"==a||"eq"==a?"in":a,valueKey:e,dataType:"like"==a?"enum":"string",format:""};g.items.push(s)}}else if("text"==t.searchType)e=t.code,a=t.operator,n=t.code,g.items.push({code:e,operator:a,valueKey:n,dataType:"string",format:""});else if("number"==t.searchType)e=t.code,a=t.operator,n=t.code,g.items.push({code:e,operator:a,valueKey:n,dataType:"number",format:""});else if("datetime"==t.searchType){var o;"ymd"==t.model?"yyyy-MM-dd":"ym"==t.model&&"yyyy-MM";var l=[];if((null===t||void 0===t||null===(o=t.children)||void 0===o?void 0:o.length)>0?(l=_.map(t.children,(function(t){return 1==t.join})),l=l.slice(0,1)):l=[t],1==l.length){var c="yyyy-MM-dd HH:mm:ss";"ymd"==t.model?c="yyyy-MM-dd":"ym"==t.model&&(c="yyyy-MM"),g.items.push({code:l[0].field,operator:l[0].operator,valueKey:l[0].field,dataType:"datetime",format:c})}}})),f.items.push(g),r=f;var m={query:r,browseScope:this.browseScope,self:this};return[m].concat(i)}},settingMenus:function(){return u()($mixins.list.design.settingMenus()||[])},contextMenuHandler:function(t){var e=I.call(this,$(t.target));if(e&&e.length){var a=_.findIndex(this.rangeWrap.selected,(function(t){return t.gridIndex==~~e.attr("index")}));if(a<0){this.downCell=e;var n=C.call(this,this.downCell,null);k.call(this,n)}return[{text:"合并单元格",disabled:!1,handler:H},{text:"拆分单元格",disabled:!1,handler:j},"-",{text:"插入行(前)",disabled:!1,handler:z},{text:"插入行(后)",disabled:!1,handler:F},{text:"插入列(前)",disabled:!1,handler:E},{text:"插入列(后)",disabled:!1,handler:V},"-",{text:"删除整行",disabled:!1,handler:G},{text:"删除整列",disabled:!1,handler:K},"-",{text:"单元格格式",disabled:!1,handler:q}]}},clearMouseDownHandler:function(){this.isDown=!1,R.call(this)},mouseDownHandler:function(t,e,a){if(this.isDesign&&0===t.button){this.isDown=!0,this.downCell=I.call(this,$(t.target));var n=C.call(this,this.downCell,null);k.call(this,n),t.stopPropagation()}},mouseMoveHandler:function(t){if(this.isDown){var e=I.call(this,$(t.target)),a=this.downCell&&this.downCell.length?this.downCell:null;if(e&&a){var n=C.call(this,this.downCell,e);k.call(this,n),t.stopPropagation()}}},mouseUpHandler:function(){this.isDown=!1}}});function x(){for(var t=[],e=this.contentLayout.grid,a=0;a<e.length;a++){t[a]||(t[a]=[]);for(var n=0;n<e[a].length;n++)t[a][n]=null,this.contentLayout.widths[n]||(this.contentLayout.widths[n]="auto")}for(var i={},r=0;r<e.length;r++)for(var s=e[r],o=0;o<s.length;o++){var l=s[o];if(i[l]){var c=Math.abs(r-i[l].rowIndex)+1,u=Math.abs(o-i[l].colIndex)+1;i[l].rowSpan=c,i[l].colSpan=u}else i[l]={areaName:y+l,name:l,rowIndex:r,colIndex:o,rowSpan:1,colSpan:1};i[l].setting={padding:this.getCellPadding(i[l]),height:this.getCellHeight(i[l]),lineHeight:this.getLineHeight(i[l]),color:this.getCellFontColor(i[l]),class:this.getCellClass(i[l]),lineNum:this.getLineNum(i[l])};var d=i[l];t[r][o]=d}return t}function S(){var t=this.cellSerial;if(this.contentLayout.grid.length<=0)for(var e=0;e<3;e++){for(var a=[],n=0;n<4;n++){t++;var i=dsf.math.numToEnglishLetter(t);a.push(i)}this.contentLayout.grid.push(a)}this.$emit("update:cellSerial",t)}function w(){var t=this;this.slots.slice(0);if(dsf.array.removeWith(this.slots,(function(t){return 0==t.name.indexOf(y)})),this.matrix)for(var e=0;e<this.matrix.length;e++)for(var a=function(){var a=t.matrix[e][n],i=_.find(t.slots,(function(t){return t.name==a.name}));i||(i={name:a.name,controls:[],scope:"scope",dataKey:"row",repeat:!0,textProxy:!0},t.slots.push(i)),i.controls=i?i.controls:[]},n=0;n<this.matrix[e].length;n++)a()}function b(t){var e=[];return t=t||this.matrix,_.each(t,(function(t){var a=[];_.each(t,(function(t){a.push(t.name.replace(y,""))})),e.push(a)})),e}function k(t){var e,a;if(this.isDesign){if(!t||!t.length)return this.rangeWrap.show=!1,void(this.rangeWrap.cells=[]);var n=(window.$designerSscale||100)/100,i=[],r=[],s=[],o=[],l=t.map((function(t){var e=t.position(),a=e.top,l=void 0===a?0:a,c=e.left,u=void 0===c?0:c;if(l/=n,u/=n,l&&u){i.push(l),r.push(u),s.push(l+t.height()),o.push(u+t.width());var d=~~t.attr("index"),h=~~t.attr("row-index"),p=~~t.attr("col-index"),f=t.attr("name");return{areaName:y+f,name:f,gridIndex:d,rowIndex:~~h,colIndex:~~p}}}));i=Math.min.apply(Math,u()(i)),r=Math.min.apply(Math,u()(r)),s=Math.max.apply(Math,u()(s)),o=Math.max.apply(Math,u()(o)),this.rangeWrap={show:!0,width:o-r,height:s-i-1,top:i-4,left:r-4,selected:l,cells:t},null===(e=this.$designer)||void 0===e||null===(a=e.recordPageChange)||void 0===a||a.call(e)}}function C(t,e){if(e&&t.get(0)!=e.get(0)){var a=T.call(this,t,e),n=a.minRowIndex,i=a.maxRowIndex,r=a.minColIndex,s=a.maxColIndex;return L.call(this,n,i,r,s)}return t?[$(t)]:[]}function T(t,e){var a=~~e.attr("row-index"),n=~~e.attr("col-index"),i=~~e.attr("rowspan")-1,r=~~e.attr("colspan")-1,s=~~t.attr("row-index"),o=~~t.attr("col-index"),l=~~t.attr("rowspan")-1,c=~~t.attr("colspan")-1,u=Math.min(s,a),d=Math.max(s+l,a+i),h=Math.min(o,n),p=Math.max(o+c,n+r);return D.call(this,u,d,h,p)}function L(t,e,a,n){for(var i=[],r=t;r<=e;r++)for(var s=a;s<=n;s++){var o=M.call(this,r,s);o&&i.push(o)}return i}function D(t,e,a,n){var i=L.call(this,t,e,a,n),r=[],s=[],o=[],l=[];i.forEach((function(t){o.push(+t.attr("row-index")),l.push(+t.attr("col-index")),r.push(+t.attr("row-index")+ +t.attr("rowspan")-1),s.push(+t.attr("col-index")+ +t.attr("colspan")-1)}));var c=Math.min.apply(Math,o),u=Math.max.apply(Math,r),d=Math.min.apply(Math,l),h=Math.max.apply(Math,s);return c==t&&u==e&&d==a&&h==n?{minRowIndex:c,maxRowIndex:u,minColIndex:d,maxColIndex:h}:D.call(this,c,u,d,h)}function M(t,e){var a=this.matrix[t][e];if(a){var n=y+a.name,i=this.$el.querySelector("."+n);return $(i)}return null}function B(t){var e=this,a=[];return _.each(t,(function(t){var n=y+t.name,i=e.$el.querySelector("."+n);i&&a.push($(i))})),a}function R(){this.downCell=null,this.rangeWrap={show:!1,width:0,height:0,top:-10,left:-10,selected:[],cells:[]}}function I(t){for(var e=0;e<t.length;e++){var a=t.eq(e);a.hasClass("grid-area")||(a=a.closest(".grid-area"));var n=a.closest(".ds-datagrid");if(this.$el===n.get(0))return a}return null}function A(t,e,a,n){var i=this,r=dsf.mix(!0,[],this.matrix),s=this.matrix[t][a];if(s)for(var o=t;o<=e;o++)for(var l=a;l<=n;l++)r[o][l]=s;var c=b.call(this,r);this.contentLayout.grid=c,this.$nextTick((function(){var t=B.call(i,i.rangeWrap.selected);k.call(i,t)}))}function P(t){var e=[];return t.forEach((function(t){var a=t.get?t:$(t),n=+a.attr("rowspan"),i=+a.attr("colspan");(n>1||i>1)&&e.push(a)})),e}function N(t){var e=this,a=dsf.mix(!0,[],this.matrix),n=this.cellSerial;t.forEach((function(t){for(var e=~~t.attr("row-index"),i=~~t.attr("col-index"),r=~~t.attr("colspan")-1,s=~~t.attr("rowspan")-1,o=t.attr("name"),l=e,c=e+s;l<=c;l++)for(var u=i,d=i+r;u<=d;u++)a[l][u]=l==e&&u==i?{name:o}:{name:dsf.math.numToEnglishLetter(++n)}})),this.$emit("update:cellSerial",n);var i=b.call(this,a);this.contentLayout.grid=i,this.$nextTick((function(){var t=B.call(e,e.rangeWrap.selected);k.call(e,t)}))}function O(t,e){for(var a=this,n=dsf.mix(!0,[],this.matrix),i=[],r=0,s=n[t],o=0;o<s.length;o++)r++;for(var l=this.cellSerial,c=0;c<r;c++){var u=s[c],d=u.rowIndex,h=d+u.rowSpan-1,p={};p.name=d<t&&h>=t?u.name:dsf.math.numToEnglishLetter(++l),i.push(p)}n.splice("before"==e?t:t+1,0,i);var f=b.call(this,n);this.contentLayout.grid=f,this.$emit("update:cellSerial",l),this.$nextTick((function(){var t=B.call(a,a.rangeWrap.selected);k.call(a,t)}))}function W(t,e){for(var a=this,n=dsf.mix(!0,[],this.matrix),i=this.cellSerial,r=0;r<n.length;r++){var s=n[r],o={},l=s[t],c=l.colIndex,u=c+l.colSpan-1;o.name=c<t&&u>=t?l.name:dsf.math.numToEnglishLetter(++i),s.splice("before"==e?t:t+1,0,o)}var d=b.call(this,n);this.contentLayout.grid=d,this.$emit("update:cellSerial",i),this.$nextTick((function(){var t=B.call(a,a.rangeWrap.selected);k.call(a,t)}))}function H(){var t=B.call(this,this.rangeWrap.selected),e=t[0],a=t[t.length-1],n=~~a.attr("row-index"),i=~~a.attr("col-index"),r=~~a.attr("rowspan"),s=~~a.attr("colspan"),o=~~e.attr("row-index"),l=~~e.attr("col-index");A.call(this,o,n+r-1,l,i+s-1)}function q(){var t=this,e=B.call(this,this.rangeWrap.selected),a=[];_.each(e,(function(e,n){var i=~~e.attr("row-index"),r=~~e.attr("col-index"),s=t.matrix[i][r];a.push(s)}));var n=this;this.$openDialog({title:"单元格设置",content:"DesGridLayoutCellSetting",width:"40vw",height:"60vh",params:{cells:a,owner:n},btns:[{text:"确定",handler:function(t){var e=t.yes();n.contentLayout.setting||n.$set(n.contentLayout,"setting",{}),_.each(e,(function(t,e){n.$set(n.contentLayout.setting,e,t)}));var a=b.call(n);n.contentLayout.grid=a,n.$nextTick((function(){var t=B.call(n,n.rangeWrap.selected);k.call(n,t)}))}},{text:"取消"}]})}function j(){var t=B.call(this,this.rangeWrap.selected),e=P.call(this,t);N.call(this,e)}function z(){var t=B.call(this,this.rangeWrap.selected),e=t[0],a=~~e.attr("row-index");O.call(this,a,"before")}function F(){var t=B.call(this,this.rangeWrap.selected),e=t[t.length-1],a=~~e.attr("row-index")+~~e.attr("rowspan")-1;O.call(this,a,"after")}function E(){var t=B.call(this,this.rangeWrap.selected),e=t[0],a=~~e.attr("col-index");W.call(this,a,"before")}function V(){var t=B.call(this,this.rangeWrap.selected),e=t[t.length-1],a=~~e.attr("col-index")+~~e.attr("colspan")-1;W.call(this,a,"after")}function G(){var t=this,e=B.call(this,this.rangeWrap.selected),a=e[0],n=e[e.length-1],i=~~a.attr("row-index"),r=~~n.attr("row-index")+~~n.attr("rowspan")-1,s=r-i+1,o=dsf.mix(!0,[],this.matrix);o.splice(i,s);var l=b.call(this,o);this.contentLayout.grid=l,this.$nextTick((function(){var e=B.call(t,t.rangeWrap.selected);k.call(t,e)}))}function K(){for(var t=this,e=B.call(this,this.rangeWrap.selected),a=e[0],n=e[e.length-1],i=+a.attr("col-index"),r=+n.attr("col-index")+ +n.attr("colspan")-1,s=r-i+1,o=dsf.mix(!0,[],this.matrix),l=0;l<o.length;l++)o[l].splice(i,s);var c=b.call(this,o);this.contentLayout.grid=c,this.$nextTick((function(){var e=B.call(t,t.rangeWrap.selected);k.call(t,e)}))}var J=v,Q=a(0),U=Object(Q["a"])(J,n,i,!1,null,null,null);e["default"]=U.exports},467:function(t,e,a){"use strict";var n=function(t,e){var a=e._c;return a("div",{staticClass:"ds-grid-layout mobile",style:e.$options.getStyle(e)},[e._l(e.props.areas,(function(t,n){return[e.props.isDesign?a("div",{key:t.areaName,ref:"gridAreas",refInFor:!0,class:["grid-area",t.areaName],style:e.$options.getAreaStyle(e,t),attrs:{index:n,"grid-index":t.index,"row-index":t.rowIndex,"col-index":t.colIndex,colspan:t.colSpan,rowspan:t.rowSpan,name:t.name}},[e._t(t.name,null,{area:t})],2):a("div",{key:t.areaName,ref:"gridAreas",refInFor:!0,staticClass:"grid-area",style:e.$options.getAreaStyle(e,t),attrs:{index:n,name:t.name}},[e._t(t.name,null,{area:t})],2)]})),e.props.isDesign?[e._l(e.props.gridTemplate,(function(t,e){return[a("div",{key:"-"+e,class:["grid-area","area-bracket","e-"+e,"ds-pointer-none"],style:{"grid-area":"e-"+e,border:"none"}})]}))]:e._e()],2)},i=[],r={name:"DsfMobileDataGridItemLayout",props:{isDesign:{type:Boolean,default:!1},gridTemplate:{type:Array,default:function(){return[]}},gridColumns:{type:Array,default:function(){return[]}},gridRows:{type:Array,default:function(){return[]}},areas:{type:Array,default:function(){return[]}}},getAreaStyle:function(t,e){var a={"grid-area":e.areaName};return t.props.isDesign&&(a["min-height"]=t.$options.getRowHeight(t,e.rowIndex,e.colIndex,e.colspan,e.rowspan)),a},getTemplate:function(t){var e=t.props.gridTemplate,a=_.map(e,(function(e,a){var n=_.map(e,(function(t){return t.areaName}));return t.props.isDesign&&n.push("e-"+a),"'"+n.join(" ")+"'"}));return a.join(" ")},getStyle:function(t){var e=t.props.gridColumns,a=t.props.gridRows;t.props.isDesign&&(e=JSON.parse(JSON.stringify(e)),e.push("0"));var n={height:"100%","grid-template-columns":_.map(e,(function(t){return dsf.pxToRem(t)})).join(" "),"grid-template-areas":t.$options.getTemplate(t)};return!t.parent.isDesign&&a.length&&(n["grid-template-rows"]=_.map(a,(function(t){return dsf.pxToRem(t)})).join(" ")),n},getRowHeight:function(t,e,a,n,i){return t.parent.isDesign?n>1&&i>1?"auto":dsf.pxToRem(t.props.gridRows[e]):"auto"}},s=r,o=a(0),l=Object(o["a"])(s,n,i,!0,null,null,null);e["a"]=l.exports}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_mobile_datagrid.js.map