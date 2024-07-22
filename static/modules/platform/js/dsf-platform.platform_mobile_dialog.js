/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[14],{1173:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return"popup"==t.type?o("div",[o("van-popup",t._g(t._b({ref:"dialog",staticClass:"ds-dialog mobile",style:{width:t.width,height:t.height},attrs:{className:t.className,"get-container":"body"},on:{closed:t.closeHander,opened:t.openedHandler},model:{value:t.dialogShow,callback:function(e){t.dialogShow=e},expression:"dialogShow"}},"van-popup",t.$attrs,!1,!0),t.$listeners),[t.hasHeader?o("div",{directives:[{name:"mobile-top-safe",rawName:"v-mobile-top-safe"}],staticClass:"ds-dialog-header"},[o("div",{staticClass:"ds-dialog-header-inner"},[t.showClose?o("div",{staticClass:"ds-dialog-header-close"},[t._t("cancel")],2):t._e(),o("div",{class:[{"m-left":t.showClose},"ds-dialog-header-title"]},[t._t("title")],2),o("div",{staticClass:"ds-dialog-header-buttons"},[t._t("buttons")],2)])]):t._e(),o("div",{staticClass:"ds-dialog-body"},[t._t("default")],2),o("div",{staticClass:"ds-dialog-footer"},[o("div",{staticClass:"ds-dialog-footer-inner"},[t.hasFooter?t._t("buttonBar"):t._e()],2),"top"!=t.$attrs.position?o("div",{staticClass:"bottom-safe-area"}):t._e()])])],1):(t.type="dialog")?o("div",[o("van-dialog",t._g(t._b({staticClass:"ds-dialog mobile",class:t.className,style:{width:t.width},attrs:{"get-container":"body","show-confirm-button":t.showConfirmButton,"show-cancel-button":t.showCancelButton,"cancel-button-text":t.cancelButtonText,"confirm-button-text":t.confirmButtonText},on:{confirm:t.confirm,cancel:t.confirmCancel,closed:t.closeHander},scopedSlots:t._u([{key:"title",fn:function(){return[t._t("title")]},proxy:!0}],null,!0),model:{value:t.dialogShow,callback:function(e){t.dialogShow=e},expression:"dialogShow"}},"van-dialog",t.$attrs,!1,!0),t.$listeners),[[t._t("default")],o("div",{staticClass:"van-hairline--top van-dialog__footer"},[t._t("dialog-buttons")],2)],2)],1):t._e()},n=[],a={name:"DsfMobileDialog",inheritAttrs:!1,provide:function(){return{$dialog:this}},props:{type:{type:String,default:function(){return"popup"}},dialogArgs:{type:Object,default:function(){return null}},showConfirmButton:{type:Boolean,default:!1},showCancelButton:{type:Boolean,default:!1},confirmButtonText:{type:String,default:"确定"},cancelButtonText:{type:String,default:"取消"},width:{type:String,default:"auto"},height:{type:String,default:"auto"},openerVm:{type:Object,default:function(){return null}},hasHeader:{type:Boolean,default:!1},hasFooter:{type:Boolean,default:!1},visible:{type:Boolean,default:!1},dialogSure:{type:Function,default:dsf.noop},showClose:{type:Boolean,default:!0}},data:function(){return{dialogShow:!1}},computed:{className:function(){var t=[];return this.$attrs.className&&t.push(this.$attrs.className),t}},watch:{visible:function(t){var e=this;this.$nextTick((function(){e.dialogShow=t}))}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){var t=this;this.$nextTick((function(){t.dialogShow=t.visible}))},beforeDestroy:function(){},destroyed:function(){var t;null===this||void 0===this||null===(t=this.$el)||void 0===t||null===(t=t.parentNode)||void 0===t||t.removeChild(this.$el)},methods:{openedHandler:function(){this.topSafeAreaAdapter()},topSafeAreaAdapter:function(){var t,e=this;dsf.ui.topSafeAreaAdapter(null===this||void 0===this||null===(t=this.$refs)||void 0===t||null===(t=t.dialog)||void 0===t?void 0:t.$el),_.each(this.$children||[],(function(t){e.chileResize(t)}))},chileResize:function(t){var e=this;dsf.isFunction(null===t||void 0===t?void 0:t.resize)&&t.resize(),_.each((null===t||void 0===t?void 0:t.$children)||[],(function(t){e.chileResize(t)}))},closeHander:function(){},close:function(){this.$emit("update:visible",!1)},confirm:function(){this.$emit("confirm-sure")},confirmCancel:function(){this.$emit("confirm-cancel"),this.$nextTick((function(){}))}}},l=a,s=o(0),d=Object(s["a"])(l,i,n,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_mobile_dialog.js.map