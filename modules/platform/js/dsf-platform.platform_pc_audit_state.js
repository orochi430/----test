/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[33],{1002:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dsf-audit-state-list-form"},[a("div",{staticClass:"dsf-audit-state-list-form-left"},[a("dsf-view-part",{ref:"reportForm",staticClass:"report-form-view",staticStyle:{height:"100%"},attrs:{path:t.reportFormUrl},on:{"view-created":t.initFormViewCreated,ready:t.reportFormReady}})],1),a("div",{staticClass:"dsf-audit-state-list-form-right"},[t.tableHeight?a("dsf-el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{height:t.tableHeight,data:t.tableData,border:""},on:{"row-click":t.rowClick}},[a("el-table-column",{attrs:{label:"公式编号"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.mandatoryType.flag)+" ")]}}],null,!1,2219879570)}),a("el-table-column",{attrs:{label:"错误说明"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.message)+" ")]}}],null,!1,3196663828)}),a("el-table-column",{attrs:{label:"错误级别"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.mandatoryType.text)+" ")]}}],null,!1,3538505155)}),a("el-table-column",{attrs:{label:"用户说明"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(" "+t._s(a.remark)+" ")]}}],null,!1,3780610973)})],1):t._e()],1)])},i=[],o=dsf.component({name:"DsfAuditStateListForm",ctrlCaption:"审核状态列表详情页",mixins:[$mixins.control],data:function(){return{tableData:[],loading:!1,tableHeight:0}},computed:{id:function(){return this.$route.query.id},n:function(){return this.$route.query.n||this.$route.query.namespace},p:function(){return this.$route.query.p||this.$route.query.pname},reportFormUrl:function(){var t=this.n,e=this.p;if(!t||!e||!this.id)return"";var a={isview:1,id:this.id},r="#/pc/".concat(t.replace(/\./g,"/"),"/").concat(e||"form");return r+="?"+dsf.url.queryStringStringify(a),r}},methods:{getTableData:function(){var t=this;this.loading=!0,dsf.http.get("formula/queryFormError",{namespace:this.n,pageName:this.p,dataId:this.id,taskId:this.$route.query.taskId,dataType:this.$route.query.dataType||1}).done((function(e){var a=e.data,r=e.success,i=e.message;r?t.tableData=(null===a||void 0===a?void 0:a.auditFields)||[]:dsf.layer.message(i,!1)})).catch((function(){dsf.layer.message("服务器未知错误",!1)})).finally((function(){t.loading=!1}))},initFormViewCreated:function(t){var e=t.args,a=e.view;this.$scrollToError=a.$scrollToError,this.pushError=a.pushError},reportFormReady:function(){this.isFormReady=!0},rowClick:function(t,e,a){1==this.isFormReady&&this.auditStateTableRowClick(t,e,a)},auditStateTableRowClick:function(t){var e,a=this;t.fields.forEach((function(r){var i=$(a.$refs.reportForm.$el);r.fields.forEach((function(o){var s="".concat(r.tableName,".").concat(o);if(r.isSubTable){var n=i.find('[form-name="'.concat(r.tableName,'"]'))[0].__vue__,l=n.value,u=l[r.index];s="".concat(r.tableName,".").concat(o,"-").concat(u.$hash),e||(e=!0)}a.$scrollToError({target:s}),a.pushError(new window.$$ValidateError(t.message,s,t)),a.$nextTick((function(){i.find('[form-name="'.concat(s,'"]')).addClass("ds-form-item-audit-state-foucs"),setTimeout((function(){i.find('[form-name="'.concat(s,'"]')).removeClass("ds-form-item-audit-state-foucs")}),400)}))}))}))}},created:function(){this.id&&this.getTableData()},mounted:function(){this.tableHeight=$(this.$el).find(".dsf-audit-state-list-form-right")[0].clientHeight-1}}),s=o,n=(a(741),a(0)),l=Object(n["a"])(s,r,i,!1,null,null,null);e["default"]=l.exports},551:function(t,e,a){var r=a(742);"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=a(19).default;i("bbd9d66a",r,!0,{sourceMap:!1,shadowMode:!1})},741:function(t,e,a){"use strict";a(551)},742:function(t,e,a){"use strict";a.r(e)}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_pc_audit_state.js.map