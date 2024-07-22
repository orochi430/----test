/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[47],{1155:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"page-home-template1-menu"},[e._l(e.menuList,(function(t){return[i("div",{key:t.menu_id,staticClass:"menu-item",class:{active:t.menu_id===e.activeKey},style:{width:e.menuWidth},on:{mouseenter:function(i){return e.$emit("item-change",t,i)},mouseleave:function(t){return e.$emit("item-change",null,t)}}},[i("div",{staticClass:"menu-item-label",on:{click:function(i){return i.stopPropagation(),e.linkTo(t)}}},[i("i",{staticClass:"menu-icon iconfont",class:[t.menu_icon||"icon-shezhi"]}),i("span",[e._v(e._s(t.menu_name))])])])]}))],2)},o=[],s=i(40),l={name:"DsfTemplate1HomeMenu",inject:["homeRoot"],props:{lastLevelClick:{type:Boolean,default:!1}},created:function(){this.homeRoot.setHomeControl("DsfTemplate1HomeMenu",this)},beforeDestroy:function(){this.homeRoot.removeHomeControl("DsfTemplate1HomeMenu",this)},computed:{menuList:function(){return this.homeRoot.$menuList||[]},activeKey:function(){return this.homeRoot.menuKey.length>0?this.homeRoot.menuKey[0]:""},menuWidth:function(){return(100/this.menuList.length).toFixed(3)+"%"}},methods:{linkTo:function(e){var t,i,n,o,l,r;e&&(this.lastLevelClick?e.children&&e.children.length||!e.menu_url||(null!==(t=this.homeRoot)&&void 0!==t&&t.isPreview?null===(i=this.homeRoot)||void 0===i||null===(n=i.isPreviewLinkTo)||void 0===n||n.call(i,e):s["a"].openPage.call(this.homeRoot,e)):null!==(o=this.homeRoot)&&void 0!==o&&o.isPreview?null===(l=this.homeRoot)||void 0===l||null===(r=l.isPreviewLinkTo)||void 0===r||r.call(l,s["a"].findMenu(e)):s["a"].openPage.call(this.homeRoot,s["a"].findMenu(e)))}}},r=l,a=i(0),h=Object(a["a"])(r,n,o,!1,null,null,null);t["default"]=h.exports},557:function(e,t,i){var n=i(754);"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i(19).default;o("565833ef",n,!0,{sourceMap:!1,shadowMode:!1})},753:function(e,t,i){"use strict";i(557)},754:function(e,t,i){"use strict";i.r(t)},964:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"page-home-template1-header"},[i("div",{staticClass:"page-home-template1-header-info"},[i("div",{staticClass:"logo-box"},[e._t("logo",(function(){return[i("a",{attrs:{href:e.indexUrl}},[e.$logo?i("img",{staticClass:"logo",attrs:{src:e._f("imgFormat")(e.$logo),alt:""}}):e._e(),e.title&&e.title.length?i("div",{staticClass:"site-name"},[e._v(e._s(e.title))]):e._e()])]}))],2),i("div",{staticClass:"header-right"},[e.hideDropdown?i("dsf-page-home-header-user",{staticClass:"header-user",scopedSlots:e._u([{key:"before",fn:function(){return[i("div",{staticClass:"header-user-info"},[i("div",{staticClass:"username"},[e._v(e._s(e.userName))])])]},proxy:!0}],null,!1,2035310697)}):i("dsf-page-home-header-user-info-panel",{ref:"headerUserInfoPanel",attrs:{"dropdown-config":e.dropdownConfig,"custom-user-edit":e.customUserEdit}},[i("template",{slot:"reference"},[i("dsf-page-home-header-user",{staticClass:"header-user",scopedSlots:e._u([{key:"before",fn:function(){return[i("div",{staticClass:"header-user-info"},[i("div",{staticClass:"username"},[e._v(e._s(e.userName))])])]},proxy:!0}])})],1)],2)],1)]),i("div",{staticClass:"page-home-template1-header-menu"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.showBt,expression:"showBt"}],staticClass:"header-menu-bt __left",attrs:{disabled:e.disabledLeft},on:{click:function(t){return t.stopPropagation(),e.doPagination(1)}}},[i("i",{staticClass:"iconfont icon-arrow-left2"})]),i("div",{ref:"box",staticClass:"header-menu-box"},[i("dsf-template1-home-menu",{ref:"content",attrs:{"last-level-click":e.lastLevelClick},on:{"hook:mounted":e.handleMenuLoad,"item-change":e.menuItemChange}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.showBt,expression:"showBt"}],staticClass:"header-menu-bt __right",attrs:{disabled:e.disabledRight},on:{click:function(t){return t.stopPropagation(),e.doPagination(-1)}}},[i("i",{staticClass:"iconfont icon-arrow-right2"})]),i("home-menu-down-children",{class:["__"+e.textAlign],attrs:{"last-level-click":e.lastLevelClick}})],1)])},o=[],s=i(8),l=i.n(s),r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"menu-down-children",class:{show:e.show},style:e.style,on:{mouseenter:e.mouseenter,mouseleave:e.mouseleave}},[i("div",{ref:"box",staticClass:"box"},[i("transition",{attrs:{name:"el-zoom-in-top"}},[i("home-menu-down-item",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],ref:"homeMenuDownItem",attrs:{"last-level-click":e.lastLevelClick,menus:e.list}})],1)],1)])},a=[],h=i(4),u=i.n(h),c=i(1),d=i.n(c),m=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"menu-down-box"},[e._l(e.menus,(function(t){return[i("div",{key:t.menu_id,staticClass:"menu-down-item",on:{click:function(i){return i.stopPropagation(),e.linkTo(t)}}},[i("div",{staticClass:"menu-down-item-label"},[e.hasIcon?i("i",{staticClass:"iconfont menu-icon",class:[t.menu_icon]}):e._e(),i("span",[e._v(e._s(t.menu_name))]),t.children&&t.children.length?i("dsf-icon",{staticClass:"menu-arrow",attrs:{name:"arrow-right-new"}}):e._e()],1),t.children&&t.children.length?i("home-menu-down-item",{attrs:{menus:t.children,level:e.level+1,"is-children":""}}):e._e()],1)]}))],2)},f=[],v=i(40),p={name:"HomeMenuDownItem",inject:["homeRoot"],props:{lastLevelClick:{type:Boolean,default:!1},level:{type:Number,default:2},menus:{type:Array,default:function(){return[]}},isChildren:{type:Boolean,default:!1}},computed:{hasIcon:function(){var e;if(null===(e=this.menus.children)||void 0===e||!e.length)return!1;var t=dsf.config.setting_public_default_menu_icon;return!(!t&&!_.find(this.menus.children,(function(e){return!!e.menu_icon})))}},mounted:function(){this.isChildren&&(this.$el.parentElement.onmouseenter=this.show,this.$el.parentElement.onmouseleave=this.hide)},methods:{show:function(){if(this.$el.style.display="block","visible"!==this.$el.style.visibility){this.$el.style.visibility="hidden";var e=this.$el.getBoundingClientRect(),t=e.width,i=this.$el.parentElement.getBoundingClientRect(),n=i.left,o=i.width;o+t+n+5>window.innerWidth?(this.$el.classList.remove("right"),this.$el.classList.add("left")):(this.$el.classList.remove("left"),this.$el.classList.add("right")),this.$el.style.visibility="visible"}},hide:function(){this.$el.style.display="none"},linkTo:function(e){var t,i,n,o,s,l;e&&(this.lastLevelClick?e.children&&e.children.length||!e.menu_url||(null!==(t=this.homeRoot)&&void 0!==t&&t.isPreview?null===(i=this.homeRoot)||void 0===i||null===(n=i.isPreviewLinkTo)||void 0===n||n.call(i,e):v["a"].openPage.call(this.homeRoot,e)):null!==(o=this.homeRoot)&&void 0!==o&&o.isPreview?null===(s=this.homeRoot)||void 0===s||null===(l=s.isPreviewLinkTo)||void 0===l||l.call(s,v["a"].findMenu(e)):v["a"].openPage.call(this.homeRoot,v["a"].findMenu(e)))}}},g=p,w=i(0),b=Object(w["a"])(g,m,f,!1,null,null,null),C=b.exports,y={name:"HomeMenuDownChildren",components:{HomeMenuDownItem:C},inject:["homeRoot"],props:{lastLevelClick:{type:Boolean,default:!1}},data:function(){return{list:[],hoverItem:null,show:!1,top:0,right:0}},computed:{style:function(){return{transform:"translate(-".concat(this.right,"px, ").concat(this.top,"px)")}}},mounted:function(){this.$parent.$on("item-change",this.itemChange)},beforeDestroy:function(){this.$parent.$off("item-change",this.itemChange)},methods:{itemChange:function(e,t){e?this.showMenuChildren(e,t):this.hideMenuChildren(t)},showMenuChildren:function(e,t){var i,n=this;if(null!==(i=e.children)&&void 0!==i&&i.length){clearTimeout(this._t1),clearTimeout(this._t2),this.setHoverItem(t.target);var o=t.target.getBoundingClientRect(),s=o.left,l=o.width;this.bottom=0,this.right=window.innerWidth-s-l/2,this.list=e.children,this.show?this.proofread():this._t2=setTimeout((function(){n.show=!0,n.proofread()}),10)}else this.hideMenuChildren()},hideMenuChildren:function(e){var t=this;clearTimeout(this._t1),this._t1=setTimeout((function(){t.show=!1,t.setHoverItem(null),t._t1=setTimeout((function(){t.list=[]}),200)}),200)},proofread:function(){var e=this;return u()(d.a.mark((function t(){var i,n,o,s,l;return d.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$nextTick();case 2:i=window.innerWidth,n=e.right,o=e.$refs.box.offsetWidth,s=n-o/2,l=n+o/2,l>i&&(e.right-=l-i,s-=l-i),s<0&&(e.right-=s);case 8:case"end":return t.stop()}}),t)})))()},mouseenter:function(){clearTimeout(this._t1)},mouseleave:function(){this.hideMenuChildren()},setHoverItem:function(e){var t;null===(t=this.hoverItem)||void 0===t||t.removeAttribute("hover"),null===e||void 0===e||e.setAttribute("hover",!0),this.hoverItem=e}}},$=y,x=Object(w["a"])($,r,a,!1,null,null,null),R=x.exports,k=!1,L={name:"DsfTemplate1HomeHeader",components:{HomeMenuDownChildren:R},inject:["homeRoot"],props:{dropdownConfig:{type:Array,default:function(){return[]}},textAlign:{type:String,default:"center"},lastLevelClick:{type:Boolean,default:!1},hideDropdown:{type:Boolean,default:!1},user_name:{default:function(){return"欢迎您,"+dsf.session.get("user_name")}},customUserEdit:{type:Function,default:null}},data:function(){return{logo:dsf.config.setting_public_logo_image,title:dsf.config.setting_public_logo_title,topMap:{smallFont:132,bigFont:140,bigFont_1:144,bigFont_2:148,bigFont_3:152},showBt:!0,disabledLeft:!1,disabledRight:!1,downMenus:[]}},computed:{userName:function(){return this.homeRoot.isPreview?"欢迎您,"+decodeURIComponent(dsf.url.queryString("userName")||""):this.user_name},indexUrl:function(){return location.href.replace(/#.*/,"")},$logo:function(){return this.$replace(dsf.url.getWebPath(this.logo))}},watch:{"dsf.themeConfig.setting.fontSize":function(e){this.homeRoot.setPosition("top",this.topMap[e]?this.topMap[e]+"px":"136px")}},created:function(){this.watchWidth=_.debounce(this._watchWidth,50),this.homeRoot.setHomeControl("DsfTemplate1HomeHeader",this);var e=this.topMap[dsf.themeConfig.setting.fontSize];this.homeRoot.setPosition("top",e?e+"px":"136px")},mounted:function(){var e=this;this.homeRoot.$el.style.overflow="hidden",this.watchWidth=_.debounce(this._watchWidth,100),this.__resizeObserver1=new ResizeObserver((function(t){var i=l()(t,1),n=i[0];n&&e.watchWidth()})),this.__resizeObserver1.observe(this.$refs.box)},beforeDestroy:function(){var e,t;null===(e=this.__resizeObserver1)||void 0===e||e.disconnect(),null===(t=this.__resizeObserver2)||void 0===t||t.disconnect(),this.homeRoot.removeHomeControl("DsfTemplate1HomeHeader",this)},methods:{handleMenuLoad:function(){var e=this;this.__resizeObserver2=new ResizeObserver((function(t){var i=l()(t,1),n=i[0];n&&e.watchWidth()})),this.__resizeObserver2.observe(this.$refs.content.$el)},_watchWidth:function(){var e=this;this.$nextTick((function(){var t=e.$refs.box,i=t.scrollWidth,n=t.offsetWidth;e.showBt=i>n,e.showBt&&e.updateBtStatus()}))},doPagination:function(e){var t=this;if(!k){k=!0;var i=this.$refs.box,n=i.scrollLeft,o=i.scrollWidth,s=i.offsetWidth,l=0;e>0?(l=n-s+120,l<0&&(l=0)):(l=n+s-120,l>o&&(l=o)),this.$refs.box.scrollTo({left:l,behavior:"smooth"}),setTimeout((function(){t.updateBtStatus(),k=!1}),500)}},updateBtStatus:function(){var e=this.$refs.box,t=e.scrollLeft,i=e.scrollWidth,n=e.offsetWidth;this.disabledLeft=!1,this.disabledRight=!1,t<2?this.disabledLeft=!0:n+t>=i-2&&(this.disabledRight=!0)},menuItemChange:function(e,t){this.$emit("item-change",e,t)}}},M=L,T=(i(753),Object(w["a"])(M,n,o,!1,null,null,null));t["default"]=T.exports}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_pc_home_template1.js.map