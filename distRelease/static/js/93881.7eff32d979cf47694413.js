"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[93881],{93881:function(t,e,a){a.r(e),a.d(e,{default:function(){return p}});var e=a(26243),s=a.n(e),e=a(62680),i=a.n(e),e=a(95366),o=a.n(e),e=a(6919),n=a.n(e),r=a(77193),e=a(20629),u=a(14355),c=[{key:"Note",remark:"便签模块",tabslist:[{name:"收件箱",icon:"",apiurl:"",goRoute:"",listId:"1807271502471mZfA8mah6Q3fprnIVz",params:{moduleId:"180725205942uc2zjrqnTt5sg7ReWmV",formId:"1807271502471mZfA8mah6Q3fprnIVz",receiveUserId:"[userid]"},isBadge:!0,badgeUrl:"fn/mobileNote/getBadge?type=5",count:""},{name:"发件箱",icon:"",apiurl:"",goRoute:"",listId:"180727104749mEj2tlzumG5xILtyWoR",params:{moduleId:"180725205942uc2zjrqnTt5sg7ReWmV",formId:"180727104749mEj2tlzumG5xILtyWoR",status:1,actionType:1,userId:"[userid]"},isBadge:!1,badgeUrl:"fn/mobileNote/getBadge?type=1",count:""},{name:"草稿箱",icon:"",apiurl:"",goRoute:"",listId:"180726211007WCqjA6vmt7HaNaInl7U",params:{moduleId:"180725205942uc2zjrqnTt5sg7ReWmV",formId:"180726211007WCqjA6vmt7HaNaInl7U",userId:"[userid]",actionType:1,status:0},isBadge:!1,badgeUrl:"fn/mobileNote/getBadge?type=3",count:""}]}],l=a(2728),d=a(25108);function f(e,t){var a,n=s()(e);return i()&&(a=i()(e),t&&(a=a.filter(function(t){return o()(e,t).enumerable})),n.push.apply(n,a)),n}var u={props:["value","Note"],name:"customTabs",model:{prop:"value",event:"input"},components:{defaultList:u.default},computed:function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach(function(t){(0,r.Z)(e,t,a[t])}):n()?Object.defineProperties(e,n()(a)):f(Object(a)).forEach(function(t){Object.defineProperty(e,t,o()(a,t))})}return e}({},(0,e.rn)({isShowAppFooter:function(t){return t.isShowAppFooter},isShowAppHeader:function(t){return t.isShowAppHeader}})),data:function(){return{active:0,tabParams:{},tabsPage:!1,clickTabIndex:0,routeKey:"",docTitle:""}},created:function(){var a=this,t=(this.docTitle=this.$route.query.title||"便笺",l.Z.setTitle(this.docTitle),this.routeKey=this.$route.params.Note||this.Note,c.filter(function(t){return t.key==a.routeKey}));0<t.length?(this.tabsPage=!0,this.tabParams=t[0],this.tabParams.tabslist.map(function(e){e.isBadge&&dsf.http.get(e.badgeUrl,{}).then(function(t){a.$delete(e,"count");t=Number(t.data.total);a.$set(e,"count",t)})})):this.tabsPage=!1,this.$eventBus.onRefreshBadge(this,function(t){a.refreshBadge(t)})},activated:function(){d.log(this.docTitle),l.Z.setTitle(this.docTitle)},filters:{badgeCount:function(t){return 100<t?"99+":t<1?"":t}},methods:{refreshBadge:function(a){var n=this;this.tabParams.tabslist.forEach(function(e,t){e.isBadge&&t==a&&dsf.http.get(e.badgeUrl,{}).then(function(t){n.$delete(e,"count");t=Number(t.data.total);n.$set(e,"count",t)})})},tabChange:function(t,e){switch(d.log(t+"---"+e),t){case 0:this.clickTabIndex=0;break;case 1:this.clickTabIndex=1;break;case 2:this.clickTabIndex=2}}}},p=(0,a(51900).Z)(u,function(){var a=this,n=a._self._c;return n("div",{staticClass:"customTabBox"},[n("van-tabs",{attrs:{sticky:"","offset-top":a.dsf.util.getOffsetTop()},on:{change:a.tabChange},model:{value:a.active,callback:function(t){a.active=t},expression:"active"}},a._l(a.tabParams.tabslist,function(t,e){return n("van-tab",{key:e,attrs:{title:"tabs"+t.name,badge:a._f("badgeCount")(t.count)},scopedSlots:a._u([{key:"title",fn:function(){return[n("van-icon",{attrs:{name:t.icon}}),a._v(" "),n("span",[a._v(a._s(t.name))])]},proxy:!0}],null,!0)},[a._v(" "),n("keep-alive",[n("default-list",{attrs:{params:t,currentTabs:e,tabsPage:a.tabsPage,clickTabIndex:a.clickTabIndex,routeKey:a.routeKey,oppsetTop:a.isShowAppHeader?"1.8rem":"0.88rem"}})],1)],1)}),1)],1)},[],!1,null,null,null).exports}}]);