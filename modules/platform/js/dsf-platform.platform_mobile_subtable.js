/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[28],{1174:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ds-control ds-navtab mobile",class:{"ds-no-padding":!t.showPadding},style:{height:t.isDesign?"100%":t.tabHeight}},[n("van-tabs",{attrs:{closable:t.enableDelete,border:"","lazy-render":t.$lazyRender},on:{click:t.tabClick,disabled:t.tabDisabled},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[t._t("default",(function(){return t._l(t.$tabs,(function(e){return n("van-tab",{key:e.name,style:{padding:t.$padding},attrs:{disabled:t.isdisable(e),name:e.name},scopedSlots:t._u([{key:"title",fn:function(){return[t._v(" "+t._s(e.title)+" "),Number(t.badgeList[e.name])?n("span",{staticClass:"ds-navtab-item-badge"},[t._v(" "+t._s(t._f("badgeFilter")(t.badgeList[e.name]))+" ")]):t._e()]},proxy:!0}],null,!0)},[n("div",{staticClass:"ds-navtab-content",attrs:{"slot-name":e.name}},[t._t(e.name)],2)])}))}))],2)],1)},i=[],a=dsf.component({name:"DsfMobileNavTab",ctrlCaption:"选项卡",mixins:[$mixins.tabControl],filters:{badgeFilter:function(t){return t=Number(t)||0,t<100?t:"99+"}},props:{badgeUrl:{type:String,default:""},tabDisabled:{type:Function,default:dsf.noop},lazyRender:{type:Boolean,default:!0}},data:function(){return{badgeList:{}}},computed:{$lazyRender:function(){return!this.isDesign&&this.lazyRender},$tabs:function(){var t=this;return this.isDesign?this.slots:_.filter(this.slots,(function(e){return!t.isHide(e)}))},$padding:function(){var t=this.contentPadding;return[dsf.pxToRem(t[0]),dsf.pxToRem(t[1]),dsf.pxToRem(t[2]),dsf.pxToRem(t[3])].join(" ")}},created:function(){this.getBadgeList()},methods:{formScrollIntoViewErrorControl:function(t){var e=$(t).closest(".ds-navtab-content").attr("slot-name");this.tabChange({name:e})},getBadgeList:function(){var t=this,e=this.badgeUrl,n=this.isDesign;if(!n){if(!e)return this.badgeList={};var s=this.$replace(this.badgeUrl,this.local);this.$http.get(s).then((function(e){var n=e.data;n&&n.success?t.badgeList=n.data||{}:t.badgeList={}})).catch((function(){t.badgeList={}}))}},reloadData:function(){this.getBadgeList(),this.$childrenReloadData()}}}),l=a,o=n(0),d=Object(o["a"])(l,s,i,!1,null,null,null);e["default"]=d.exports},1227:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ds-control mobile ds-subtable ds-no-padding",class:t.getCss},[n("div",{staticClass:"ds-subtable-conent-wrap"},[t.isDesign?t._l(t.templateData,(function(e,s){return n("div",{key:e.$hash,staticClass:"ds-subtable-item"},[n("div",{staticClass:"ds-subtable-item-header"},[n("div",{staticClass:"ds-subtable-item-index"},[t._t("index",(function(){return[n("span",[t._v(t._s(t.label||"标题")+"("+t._s(s+1)+")")])]}),null,{row:e,$index:s})],2),n("div",{staticClass:"ds-subtable-item-delete"},[n("a",[t._v(t._s(t.getDeleteButtonText(null)))])])]),n("div",{staticClass:"ds-subtable-item-content",attrs:{"slot-name":"default"}},[t._t("default",null,null,{row:e,$index:s})],2),n("div",{staticClass:"ds-subtable-item-footer"},[t._t("foot",(function(){return[n("dsf-mobile-button",{attrs:{"none-line":"",type:"plain",icon:"hao",size:"small"}},[t._v(t._s(t.getAddButtonText(e)))])]}))],2)])})):[t.list.length<=0?[n("div",{staticClass:"ds-subtable-item null-data"},[t.readOnly?t._e():n("div",{staticClass:"ds-subtable-item-footer"},[t._t("foot",(function(){return[n("dsf-mobile-button",{attrs:{"none-line":"",type:"plain",icon:"hao",size:"small"},on:{click:function(e){return t.addRowHandler()}}},[t._v(t._s(t.getAddButtonText(null)))])]}))],2)])]:t._l(t.list,(function(e,s){return n("div",{key:e.$hash,staticClass:"ds-subtable-item"},[n("div",{staticClass:"ds-subtable-item-header"},[n("div",{staticClass:"ds-subtable-item-index",attrs:{id:e.$hash}},[t._t("index",(function(){return[n("span",[t._v(t._s(t.getRowName(e)))])]}),null,{row:e,$index:s})],2),t.readOnly||0==s&&t.isLeastOne&&1==t.list.length||!t.isShowDeleteButton(e)?t._e():n("div",{staticClass:"ds-subtable-item-delete"},[n("a",{on:{click:function(n){return t.removeRowHandler(e)}}},[t._v(t._s(t.getDeleteButtonText(null)))])])]),n("div",{staticClass:"ds-subtable-item-content",attrs:{"slot-name":"default"}},[t._t("default",null,null,{row:e,$index:s})],2),t.readOnly||s!=t.list.length-1?t._e():n("div",{staticClass:"ds-subtable-item-footer"},[t._t("foot",(function(){return[n("dsf-mobile-button",{attrs:{"none-line":"",type:"plain",icon:"hao",size:"small"},on:{click:function(e){return t.addRowHandler()}}},[t._v(t._s(t.getAddButtonText(e)))])]}))],2)])}))]],2)])},i=[],a=dsf.component({name:"DsfMobileSubTable",ctrlCaption:"子表",mixins:[$mixins.list,$mixins.oneToMany],data:function(){return{templateData:[{_id:dsf.uuid()}],subControls:{},deleted:[]}},props:{label:{type:String,default:"标题"},filterData:{type:Function,default:null},slots:{type:Array,default:function(){return[{name:"default",controls:[],scope:"scope",dataKey:"row",repeat:!0}]}},addButtonText:{type:[String,Function],default:""},deleteButtonText:{type:[String,Function],default:""},showDeleteButtonText:{type:[String,Function],default:""},isLeastOne:{type:Boolean,default:!0},rowName:{type:[String,Function],default:null},value:{type:Array,default:function(){return[]}},showEmptyText:{type:Boolean,default:!1}},computed:{list:function(){var t=this.value||[];return this.filterData&&(t=this.filterData(t)),t}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},methods:{isShowDeleteButton:function(t){if(this.showDeleteButtonText){if(dsf.isString(this.showDeleteButtonText)){var e=this.$expressParams(t);return this.$eval(this.showDeleteButtonText,e)}return!dsf.isFunction(this.showDeleteButtonText)||this.showDeleteButtonText(t)}return!0},updateSubControls:function(t,e){this.addSubControls(e);var n=e.local;if(!this.isDesign&&n&&t.isFormControl){var s;if(t.metadata_fullcode){var i,a=t.metadata_fullcode,l=null===this||void 0===this||null===(i=this.$vm)||void 0===i?void 0:i.$getDefaultValue(a);void 0===n[a]&dsf.isDef(l)&&this.$vm.$set(n,a,l)}this.$vm&&null!==(s=this.$vm)&&void 0!==s&&s.$setControlPropsByWorkFlow&&this.$vm.$setControlPropsByWorkFlow(t,"formControl"),dsf.isUnDef(t.defaultReadOnly)&&(t.defaultReadOnly=t.readOnly),t.isFormControl&&(t.defaultReadOnly||(t.readOnly=this.readOnly))}},getSubControls:function(t){var e=[];for(var n in this.subControls)n.indexOf(t)>0&&e.push(this.subControls[n]);return e},addSubControls:function(t){if(t.designId&&t.local.$hash){var e=t.$designId;this.subControls[e]=t}},getRowName:function(t){return"function"==dsf.type(this.rowName)?this.rowName(t):this.rowName?this.rowName+(t?"("+(t.$index+1)+")":""):this.label+(t?"("+(t.$index+1)+")":"")},getAddButtonText:function(t){if("string"==dsf.type(this.addButtonText)){var e=this.addButtonText;return e||"增加"+this.label}if("function"==dsf.type(this.addButtonText))return this.addButtonText(t)},getDeleteButtonText:function(t){if("string"==dsf.type(this.deleteButtonText)){var e=this.deleteButtonText;return e||"删除"}if("function"==dsf.type(this.deleteButtonText))return this.this.deleteButtonText(t)},addRow:function(t,e){var n=this.value||[];dsf.isUnDef(e)?n.push(t||{}):n.splice(e+1,0,t||{}),this.emitValueChange(n)},addRowHandler:function(t,e){dsf.isUnDef(e)?this.addRow(t||{},null):this.addRow(t||{},e<0?-1:e)},removeRow:function(t,e){var n=this.value||[];e&&this.deleted.push(t),dsf.array.remove(n,t)},removeRowHandler:function(t){var e=this;document,dsf.layer.confirm({message:"确定要删除"+this.getRowName(t)+"?"}).then((function(){e.removeRow(t,!0)})).catch((function(){}))}},beforeDestroy:function(){},destroyed:function(){},watch:{value:{handler:function(t,e){var n;if(null!==this&&void 0!==this&&null!==(n=this.$vm)&&void 0!==n&&n.$isReady&&t.length<=0)this.createLeastOneRow();else if(t){for(var s=0;s<t.length;s++){var i=t[s];i.$index=s,this.attachMustFieldToData(i),this.setRowDefaultValue(i),this.updateIndexDataField(i,i.$index+1)}e&&t&&this.emitValueChange(t)}},immediate:!0},"$vm.$isReady":function(t){t&&this.createLeastOneRow()}}}),l=a,o=n(0),d=Object(o["a"])(l,s,i,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_mobile_subtable.js.map