"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[58346],{58346:function(e,n,t){t.r(n),t.d(n,{default:function(){return i}});var a,r,l,s=t(13682),c=t(25108),n={data:function(){return{searchMenu:{apps:[],dings:[]},searchVal:""}},computed:{},created:function(){this.searchVal=this.$route.query.searchVal,this.initData()},methods:{initData:function(){var n=this;c.log((0,s.Z)(this.searchVal)),dsf.http.get("fn/application/portal/searchAppAndShortcutDing?searchText=".concat(this.searchVal)).then(function(e){"200"==e.data.code&&(n.searchMenu=e.data.data)})},onSearch:(a=function(e){c.log("231234",e),this.searchVal=e,this.initData()},function(){var e=this,n=arguments;l=l||setTimeout(function(){l=null,a.apply(e,n)},r)}),onCancel:function(){this.searchVal="",this.initData()},openMenu:function(e){c.log("menu",e),1==e.appType?this.$router.push({path:e.mobileUrl,query:{title:e.name}}):"app"==e.type?e.mobileUrl?setTimeout(function(){dsf.middleground.openUrl({url:e.mobileUrl,title:e.appName,getCodeParams:{appCode:e.appCode}})},100):dsf.layer.toast("请配置应用地址"):e.appCode?dsf.middleground.openUrl({url:e.mobileUrl,title:e.appName,getCodeParams:{appCode:e.appCode}}):this.$router.push({name:"dsfIframe",query:{url:e.mobileUrl,title:e.name}})}}},i=(l=null,t(51900).Z)(n,function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-list"},[e("van-search",{attrs:{"show-action":"",placeholder:"请输入搜索关键词"},on:{search:t.onSearch,cancel:t.onCancel,input:t.onSearch},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}}),t._v(" "),t.searchMenu.apps.length?e("van-cell-group",{staticClass:"searchCell",attrs:{title:"我的应用"}},t._l(t.searchMenu.apps,function(n){return e("van-cell",{key:n.mobileUrl,attrs:{center:"",title:n.name,value:"",label:""},scopedSlots:t._u([{key:"icon",fn:function(){return[e("van-icon",{attrs:{name:t.dsf.url.getWebPath(n.icon)}})]},proxy:!0},{key:"extra",fn:function(){return[e("span",{on:{click:function(e){return t.openMenu(n)}}},[t._v("打开")])]},proxy:!0}],null,!0)})}),1):t._e(),t._v(" "),t.searchMenu.dings.length?e("van-cell-group",{staticClass:"searchCell",attrs:{title:"常用功能"}},t._l(t.searchMenu.dings,function(n){return e("van-cell",{key:n.mobileUrl,attrs:{center:"",title:n.name,value:"",label:""},scopedSlots:t._u([{key:"icon",fn:function(){return[e("van-icon",{attrs:{name:n.icon}})]},proxy:!0},{key:"extra",fn:function(){return[e("span",{on:{click:function(e){return t.openMenu(n)}}},[t._v("打开")])]},proxy:!0}],null,!0)})}),1):t._e(),t._v(" "),0==t.searchMenu.apps.length&&0==t.searchMenu.dings.length?e("commonempty"):t._e()],1)},[],!1,null,"e8e91598",null).exports}}]);