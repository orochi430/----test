"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[58374,56229,51669],{56229:function(e,t,a){a.r(t),a.d(t,{default:function(){return b}});var o,t=a(62680),r=a.n(t),t=a(95366),s=a.n(t),t=a(6919),n=a.n(t),i=a(66250),c=a(77193),t=a(33453),u=a.n(t),t=a(8450),l=a.n(t),t=a(26243),d=a.n(t),t=a(20629),f=a(2728),p=a(25108);function h(t,e){var a,n=d()(t);return r()&&(a=r()(t),e&&(a=a.filter(function(e){return s()(t,e).enumerable})),n.push.apply(n,a)),n}function m(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?h(Object(a),!0).forEach(function(e){(0,c.Z)(t,e,a[e])}):n()?Object.defineProperties(t,n()(a)):h(Object(a)).forEach(function(e){Object.defineProperty(t,e,s()(a,e))})}return t}var t={props:["value","tabKey","checkable","checkType","oppsetTop","tabOppsetTop"],name:"customTabs",model:{prop:"value",event:"input"},components:{defaultList:function(){return Promise.all([a.e(17672),a.e(50856),a.e(63560),a.e(63450),a.e(9303),a.e(74023),a.e(96345),a.e(39946),a.e(1696),a.e(14355)]).then(a.bind(a,14355))},tabTodo:function(){return Promise.all([a.e(17672),a.e(50856),a.e(63560),a.e(9303),a.e(74023),a.e(96345),a.e(33274),a.e(28038)]).then(a.bind(a,33274))},jiangsuyancaoTable:function(){return Promise.all([a.e(26573),a.e(9193)]).then(a.bind(a,26573))},commonForm:function(){return Promise.all([a.e(17672),a.e(42152),a.e(50856),a.e(63560),a.e(63450),a.e(9303),a.e(74023),a.e(96345),a.e(49852),a.e(39946),a.e(1696),a.e(14355),a.e(59655),a.e(86720),a.e(40954),a.e(58930),a.e(13852),a.e(85027),a.e(59146),a.e(80809)]).then(a.bind(a,32444))},ElecHomePage:function(){return a.e(16848).then(a.bind(a,16848))},diskFile:function(){return Promise.all([a.e(97805),a.e(82060),a.e(89590)]).then(a.bind(a,45411))},cdReportIndex:function(){return a.e(8124).then(a.bind(a,8124))}},data:function(){return{active:0,tabParams:{},tabsPage:!1,clickTabIndex:0,routeKey:"",tabsConfig:null,tempKeyWord:"",realKeyWord:"",docTitle:"",showDetailBadge:!1,sticky:!0,goSearchRoute:this.$route.query.goSearch}},computed:m({},(0,t.rn)({isShowAppFooter:function(e){return e.isShowAppFooter},isShowAppHeader:function(e){return e.isShowAppHeader}})),activated:function(){f.Z.setTitle(this.docTitle),this.refreshBadge(this.active),this.tabsConfig.url&&1==this.tabsConfig.tabslist.length&&(this.oppsetTop=dsf.util.getOffsetTop("0.92rem"))},created:function(){var n=this;return(0,i.Z)(u().mark(function e(){var t,a;return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((o=n).$route.query.active&&(n.active=Number(n.$route.query.active)),t=dsf.config.commonTabs,n.routeKey=n.tabKey||n.$route.params.key,n.tabsConfig=t[n.routeKey],n.tabsConfig.url)return e.next=8,dsf.http.post(n.tabsConfig.url).then(function(e){200==e.data.code&&(n.tabsConfig.tabslist=e.data.data,1==n.tabsConfig.tabslist.length)&&(n.sticky=!1,setTimeout(function(){$(".commontabs > .van-tabs__wrap").css("display","none"),n.oppsetTop=dsf.util.getOffsetTop("0.92rem")},100))});e.next=8;break;case 8:n.tabsConfig&&(n.docTitle=n.$route.query.title||n.tabsConfig.remark,n.showDetailBadge=n.tabsConfig.showDetailBadge||!1,f.Z.setTitle(n.docTitle),n.tabParams=JSON.parse(l()(n.tabsConfig)),a=[],n.tabParams.tabslist.forEach(function(e){var t=m({},e);t.params&&d()(t.params).forEach(function(e){t.params[e]=dsf.util.getReplaceUrl(t.params[e])}),t.badgeUrl&&(t.badgeUrl=dsf.util.getReplaceUrl(t.badgeUrl),dsf.http.get(t.badgeUrl).then(function(e){n.$delete(t,"badge");e=e.data.total||e.data.badge||e.data.data;n.$set(t,"badge",e)})),t.countUrl&&(t.countUrl=dsf.util.getReplaceUrl(t.countUrl),dsf.http.get(t.countUrl).then(function(e){n.$delete(t,"count");e=e.data.total||e.data.badge||e.data.data;n.$set(t,"count",e)})),t.privilege?null!=(e=dsf.util.loadSessionStore("user"))&&e.privileges.some(function(e){return e.name==t.privilege})&&a.push(t):null!=(e=dsf.util.loadSessionStore("user"))&&e.privileges.some(function(e){return e.name==t.noPrivilege})||a.push(t)}),n.tabParams.tabslist=a),n.$eventBus.onRefreshBadge(n,function(e){n.refreshBadge(e)});case 10:case"end":return e.stop()}},e)}))()},filters:{badgeCount:function(e){return 100<e?o.showDetailBadge?e:"99+":e<1?"":e}},methods:{refreshBadge:function(a){var n=this;this.tabParams.tabslist.forEach(function(t,e){!t.badgeUrl||null!=a&&a!=e||dsf.http.get(t.badgeUrl).then(function(e){e=e.data.total||e.data.badge||e.data.data;n.$set(t,"badge",e)}),!t.countUrl||null!=a&&a!=e||dsf.http.get(t.countUrl,{}).then(function(e){e=e.data.total||e.data.badge||e.data.data;n.$set(t,"count",e)})})},tabChange:function(e,t){p.log(e+"---"+t),this.clickTabIndex=e},onSearch:function(){this.realKeyWord=this.tempKeyWord},onFocus:function(){this.goSearchRoute&&this.$router.push({name:this.goSearchRoute})},cancelCheck:function(){this.$emit("cancelCheck")},confirmCheck:function(e){this.$emit("confirmCheck",e)}},deactivated:function(){var e,t,a=this,n=this;["jiangsuyancaoNewsDetail"].filter(function(e){return e==a.$route.name}).length,dsf.config.setting["SYS-MOBILE-FORM-0020"]&&(e=dsf.config.setting["SYS-MOBILE-FORM-0020"].split(","),t=!1,e.forEach(function(e){n.$route.path.toLowerCase()==e&&(t=!0)}),t)&&(n.$eventBus.Off(this,"refreshBadge"),n.$deleteCache(this))},beforeRouteLeave:function(e,t,a){var n;"commonList"!=e.name&&"index"!=e.name&&"wanHome"!=e.name&&!e.name.toLowerCase().includes("index")||(this.$eventBus.Off(this,"refreshBadge"),n=this,setTimeout(function(){n.$deleteCache(n)},500)),a()}},b=(0,a(51900).Z)(t,function(){var a=this,n=a._self._c;return n("div",{attrs:{id:"common-tabs"}},[a.tabsConfig&&a.tabsConfig.showSearchBox?n("van-search",{attrs:{"show-action":"",placeholder:"请输入查询信息","left-icon":"",clearable:!1},on:{search:a.onSearch,focus:a.onFocus},scopedSlots:a._u([{key:"right-icon",fn:function(){return[n("div",{staticClass:"flex ac",on:{click:a.onSearch}},[n("van-icon",{attrs:{name:"search",size:"0.44rem"}})],1)]},proxy:!0},{key:"action",fn:function(){},proxy:!0}],null,!1,2275234293),model:{value:a.tempKeyWord,callback:function(e){a.tempKeyWord=e},expression:"tempKeyWord"}}):a._e(),a._v(" "),n("van-tabs",{staticClass:"commontabs",attrs:{sticky:a.sticky,"offset-top":a.tabOppsetTop?a.dsf.util.getOffsetTop(a.tabOppsetTop):a.dsf.util.getOffsetTop(),swipeable:"","swipe-threshold":""},on:{change:a.tabChange},model:{value:a.active,callback:function(e){a.active=e},expression:"active"}},a._l(a.tabParams.tabslist,function(e,t){return n("van-tab",{key:t,attrs:{title:"tabs"+e.name,badge:a._f("badgeCount")(e.badge),name:t},scopedSlots:a._u([{key:"title",fn:function(){return[e.icon?n("van-icon",{attrs:{name:e.icon}}):a._e(),a._v(" "),n("span",[a._v(a._s(e.name))]),e.count?n("span",[a._v("("+a._s(a._f("badgeCount")(e.count))+")")]):a._e()]},proxy:!0}],null,!0)},[a._v(" "),"defaultList"==e.goRoute?n("keep-alive",[n("default-list",{attrs:{currentTabs:t,params:e,tabsPage:a.tabsPage,clickTabIndex:a.clickTabIndex,routeKey:a.routeKey,mainKeyWord:a.realKeyWord,oppsetTop:a.oppsetTop||(a.isShowAppHeader?"1.8rem":"0.88rem"),checkable:a.checkable,"check-type-pop":a.checkType},on:{cancelCheck:a.cancelCheck,confirmCheck:a.confirmCheck}})],1):"jiangsuyancaoTable"==e.goRoute?n("jiangsuyancao-table",{attrs:{params:e,oppsetTop:a.isShowAppHeader?"1.8rem":"0.88rem"}}):"elecHomePage"==e.goRoute?n("keep-alive",[n("ElecHomePage",{attrs:{clickTabIndex:a.clickTabIndex,currentTabs:t,tabParams:a.tabParams.tabslist[a.clickTabIndex]}})],1):"commonForm"==e.goRoute?n("commonForm",{attrs:{currentTabs:t,clickTabIndex:a.clickTabIndex,_moduleId:e.params.moduleId,_pk:e.params.pk,_formId:e.params.formId,_params:e.params||{}}}):"diskFile"==e.goRoute?n("diskFile",{attrs:{currentTabs:t,clickTabIndex:a.clickTabIndex,params:e,mainKeyWord:a.realKeyWord}}):"cdReportIndex"==e.goRoute?n("keep-alive",[n("cdReportIndex",{attrs:{currentTabs:t,clickTabIndex:a.clickTabIndex,params:e,mainKeyWord:a.realKeyWord}})],1):n("tab-todo",{attrs:{params:e}})],1)}),1)],1)},[],!1,null,"e00f8b7e",null).exports},34626:function(e,t,a){a.r(t),a.d(t,{default:function(){return n}});var t={name:"xizangInviteForm",components:{commonForm:a(32444).default}},n=(0,a(51900).Z)(t,function(){return(0,this._self._c)("commonForm",{attrs:{_moduleId:this.$route.params.moduleId}})},[],!1,null,null,null).exports}}]);