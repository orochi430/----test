"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[95092],{95092:function(t,n,e){e.r(n),e.d(n,{default:function(){return y}});var n=e(8450),c=e.n(n),n=e(43562),u=e.n(n),a=e(66250),i=e(5044),n=e(33453),o=e.n(n),s=e(25108),n={props:{url:{type:String}},data:function(){return{datas:[],finished:!1,loading:!1,start:1}},activated:function(){this.onRefresh()},methods:{onRefresh:function(){this.datas=[],this.finished=!1,this.loading=!0,this.start=1,this.fetchData()},onLoad:function(){this.fetchData()},fetchData:function(){var n=this;this.url&&dsf.http.post(this.url,{limit:5,page:this.start}).then(function(t){t.data.datas&&(n.datas=[].concat((0,i.Z)(n.datas),(0,i.Z)(t.data.datas)),n.start+=1,n.datas.length==t.data.total)&&(n.finished=!0)}).catch(function(t){n.finished=!0}).finally(function(){n.loading=!1})},link:function(n){var e=this;return(0,a.Z)(o().mark(function t(){return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n.A0001&&n.A0004?(e.$router.push("/commonForm/".concat(n.A0004,"/").concat(n.A0001)),t.next=11):t.next=4;break;case 4:if(n["S-UNIFY-TASK-00028"])return t.next=7,dsf.http.post("ctrl/unifyOfficeInfo/requestChangeRead",{dataId:n["S-BASE-0001"],type:"todounify",appCode:n["S-UNIFY-TASK-0002.value"]}).then(function(t){n["S-UNIFY-TASK-00014"]=1});t.next=10;break;case 7:window.dd?dd.openLink({url:n["S-UNIFY-TASK-00028"]}).then(function(t){s.log(t)}).catch(function(t){}):e.$router.push({path:"/iframe",query:{url:n["S-UNIFY-TASK-00028"],title:n["S-UNIFY-TASK-0005"]}}),t.next=11;break;case 10:dsf.layer.toast("该文件建议在电脑端处理");case 11:case"end":return t.stop()}},t)}))()}}},r=e(51900),n=(0,r.Z)(n,function(){var e=this,a=e._self._c;return a("div",{staticClass:"todo-list"},[a("van-list",{attrs:{finished:e.finished,offset:"300"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.datas,function(n,t){return a("div",{key:t,staticClass:"card",on:{click:function(t){return e.link(n.dataValue)}}},[a("div",{staticClass:"sub"},[Number(n.dataValue["S-UNIFY-TASK-00010"])?a("img",{staticStyle:{height:"0.3rem",width:"auto","padding-right":"4px"},attrs:{src:"static/images/wanzhengtong/urgent_".concat(n.dataValue["S-UNIFY-TASK-00010"],".png")}}):e._e(),e._v(" "),a("span",{staticClass:"dept elps"},[a("img",{attrs:{src:"static/images/wanzhengtong/dept.png",alt:""}}),e._v(e._s(n.dataValue["S-UNIFY-TASK-00020"]||n.dataValue.B0056))]),e._v(" "),a("span",{staticClass:"time"},[a("i",{staticClass:"iconfont iconclock"}),e._v(e._s(n.dataValue["S-UNIFY-TASK-00025"]||n.dataValue.B0005))])]),e._v(" "),a("div",{staticClass:"title elps"},[e._v(e._s(n.dataValue["S-UNIFY-TASK-0005"]||n.dataValue.B0001))])])}),0),e._v(" "),e.datas.length||e.loading?e._e():a("commonempty")],1)},[],!1,null,"e9bcdd34",null).exports,l=e(25108),n=(0,r.Z)({components:{TodoList:n},props:["currentComponent","currentPortalId"],data:function(){return{menus:[],active:"",menuType:dsf.util.loadLocalStore("menuType")||"card"}},computed:{total:function(){return this.menus.reduce(function(t,n){return t+n.count},0)}},created:function(){this.getMenu();var n=this;window.dd&&dd.ready(function(){document.addEventListener("resume",function(t){t.preventDefault(),l.log("事件：resume"),n.getMenu()},!1)})},activated:function(){this.getMenu()},methods:{getMenu:function(){var n=this;dsf.http.get(this.currentComponent.action,{pageId:this.currentPortalId}).then(function(t){200==t.data.code&&(n.menus=t.data.data,n.menus.forEach(function(t){n.analysUrl(t),t.datas=[]}))})},goLink:function(t){t.mobielUrl&&(0==t.mobielUrl.indexOf("http")?window.dd?dd.openLink({url:t.mobielUrl}).then(function(t){l.log(t)}).catch(function(t){}):this.$router.push({path:"/iframe",query:{url:t.mobielUrl,title:t.typeName}}):this.$router.push({path:t.mobielUrl,query:{title:t.typeName}}))},analysUrl:function(t){var n,e,a,i,o,s,r;t.dataUrl?t.listUrl=t.dataUrl:0==(s=t.mobielUrl).indexOf("/commonList")?(e=(n=s.split("?")[0]).split("/")[2],a=n.split("/")[3],s=s.split("?")[1].split("&"),i={},s.forEach(function(t){t=t.split("=");i[t[0]]=t[1]}),o="",i.secQuery&&((s=JSON.parse(i.secQuery)).pageId=this.currentPortalId,i.secQuery=c()(s),u()(s).forEach(function(t){o+="&".concat(t[0],"=").concat(t[1])})),r="",u()(i).forEach(function(t,n){r+="".concat(0==n?"?":"&").concat(t[0],"=").concat(t[1])}),t.mobielUrl=n+r,t.listUrl="fn/list/".concat(e,"/mobile/q?moduleId=").concat(a).concat(o)):t.listUrl=""},changeType:function(){"card"==this.menuType?this.menuType="list":this.menuType="card",dsf.util.saveToLocalStore("menuType",this.menuType),this.getMenu()}}},function(){var e=this,a=e._self._c;return a("div",{staticClass:"wan-todo"},[a("div",{staticClass:"title"},[a("img",{staticStyle:{width:"1.96rem",height:"auto"},attrs:{src:"static/images/wanzhengtong/todoTitle.png",alt:""}}),e._v(" "),a("span",[e._v(e._s(e.total))]),e._v(" "),a("van-icon",{staticStyle:{padding:"0 0.2rem"},attrs:{size:"20",color:"#666",name:"plus"},on:{click:function(t){return e.$router.push("/commontabs/Grtxtab")}}}),e._v(" "),a("img",{staticStyle:{width:"0.34rem",height:"auto"},attrs:{src:"card"==e.menuType?"static/images/wanzhengtong/todoList.png":"static/images/wanzhengtong/todoCard.png",alt:""},on:{click:e.changeType}})],1),e._v(" "),e.menus.length?["card"==e.menuType?a("div",{staticClass:"menu"},e._l(e.menus,function(n){return a("div",{key:n.typeName,style:{backgroundImage:"url(".concat(e.dsf.url.getServerUrl(n.imgUrl),")")},on:{click:function(t){return e.goLink(n)}}},[a("div",{staticClass:"name"},[e._v(e._s(n.typeName))]),e._v(" "),a("div",{staticClass:"badgeNum"},[e._v(e._s(n.count))])])}),0):"list"==e.menuType?a("div",{staticClass:"tabs"},[a("van-tabs",{attrs:{swipeable:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.menus,function(t,n){return a("van-tab",{key:n,attrs:{title:t.typeName,badge:t.count||""}},[a("todo-list",{attrs:{url:t.listUrl}})],1)}),1)],1):e._e()]:a("commonempty")],2)},[],!1,null,"d913606a",null).exports,d=e(25108),p=(0,r.Z)({props:["currentComponent","currentPortalId"],data:function(){return{list:[]}},created:function(){this.getList()},activated:function(){this.getList()},methods:{getList:function(){var n=this;dsf.http.post("fn/list/220715155311GHDuGKDlXzrQUEFWuZp/mobile/q?moduleId=210526190113N1Nxycuf1n1qtul7pwM&isFirst=1",{page:1,limit:30,pageId:this.currentPortalId}).then(function(t){t.data.datas.length&&(n.list=t.data.datas.map(function(t){return t.dataValue}))})},to:function(n){var e=this;return(0,a.Z)(o().mark(function t(){return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,dsf.http.post("ctrl/unifyOfficeInfo/requestChangeRead",{dataId:n["n.A0001"],type:"unifynotice",appCode:n["n.Unify-Notice-0023"]}).then(function(t){n["un.Unify-Notice-User-0003"]=1});case 2:window.dd?-1<n["n.Unify-Notice-0003"].indexOf("".concat(location.host).concat(location.pathname))?e.$router.push(n["n.Unify-Notice-0003"].split("#")[1]):dd.openLink({url:n["n.Unify-Notice-0003"]}).then(function(t){d.log(t)}).catch(function(t){}):-1<n["n.Unify-Notice-0003"].indexOf("".concat(location.host).concat(location.pathname))?e.$router.push(n["n.Unify-Notice-0003"].split("#")[1]):e.$router.push({path:"/iframe",query:{url:n["n.Unify-Notice-0003"],title:n["n.Unify-Notice-0009"]}});case 3:case"end":return t.stop()}},t)}))()}}},function(){var e=this,a=e._self._c;return a("div",{staticClass:"wan-notice"},[a("img",{attrs:{src:"static/images/wanzhengtong/notice.png",alt:""}}),e._v(" "),0==e.list.length?a("div",{staticClass:"content"},[a("p",[e._v("暂无数据")])]):e._e(),e._v(" "),a("van-swipe",{attrs:{vertical:"","show-indicators":!1,loop:!0,autoplay:"3000",touchable:!1,height:24}},e._l(e.list,function(n,t){return a("van-swipe-item",{key:t,staticClass:"ellipsis",on:{click:function(t){return e.to(n)}}},[a("span",{staticStyle:{"line-height":"0.44rem"}},[e._v(e._s(n["n.Unify-Notice-0009"]))])])}),1),e._v(" "),a("div",{staticClass:"arrow",on:{click:function(t){return e.$router.push("/commonList/210527161957rOqq8K5AdDLrNBqQIkp/210526190113N1Nxycuf1n1qtul7pwM")}}},[a("van-icon",{attrs:{name:"arrow",color:"#fff",size:"10"}})],1)],1)},[],!1,null,"681b58c6",null).exports,f=e(25108),g=(0,r.Z)({props:["currentComponent","currentPortalId"],data:function(){return{myMenus:[]}},created:function(){this.getMenu()},activated:function(){this.getMenu()},methods:{getMenu:function(){var n=this;return(0,a.Z)(o().mark(function t(){return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=4,dsf.http.post("fn/newFile/shortcutDing",{type:"common",pageId:n.currentPortalId}).then(function(t){f.log(t);t=t.data.data.map(function(t){return{name:t.shortcutName,badge:t.tip,router:t.actUrl.trim(),img:dsf.url.getServerUrl(t.shortcutIcon),props:t.agentId,type:t.shortcutType,showClickTip:t.gntsyText,child:[],style:dsf.config.homePage.menuSetting&&dsf.config.homePage.menuSetting.itemStyle?dsf.config.homePage.menuSetting.itemStyle:"{}",isshow:!0,badgeNum:t.badgeNum,gntsyText:t.gntsyText,guid:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=16*Math.random()|0;return("x"==t?n:3&n|8).toString(16)})}});n.myMenus=t});case 4:case"end":return t.stop()}},t)}))()},openDDApp:function(t){dd.biz.microApp.openApp({agentId:t,onSuccess:function(t){},onFail:function(t){}})},goRoute:function(t){var n;0<t.child.length?(this.showSubmenu=!0,this.submenu=t):""==t.router||null==t.router?t.showClickTip?dsf.layer.alert({message:t.showClickTip}):dsf.layer.alert({message:"当前菜单配置错误，请联系管理员！"}):t.type&&3==t.type?this.openDDApp(t.router):2==t.type?(n=dsf.util.getReplaceUrl(t.router),dsf.config.ddSetting.isDing?dd.biz?dd.biz.util.openLink({url:t.router,onSuccess:function(t){},onFail:function(t){}}):dd.openLink({url:t.router}).then(function(t){f.log(t)}).catch(function(t){}):t.props&&"1"==t.props.OpenWebView?xsfWindow.openWebView({title:t.name,url:n,colorString:"#111111"}):t.props&&"1"==t.props.OpenLocationHref?location.href=n:this.$router.push({name:"dsfIframe",params:{url:n,title:t.name},query:{url:n,title:t.name}})):t.props?t.props.props?this.$router.push({path:t.router,query:JSON.parse(c()(t.props))}):(t.router.indexOf("ssoToOther"),this.$router.push({name:t.router,params:JSON.parse(c()(t.props))})):this.$router.push({path:dsf.util.getReplaceUrl(t.router),query:{title:t.name}})}}},function(){var e=this,a=e._self._c;return a("div",{staticClass:"application-component"},[a("div",{staticClass:"title"},[e._v("常用服务")]),e._v(" "),a("div",{staticClass:"box"},[e._l(e.myMenus,function(n,t){return a("div",{directives:[{name:"show",rawName:"v-show",value:n.isshow,expression:"subItem.isshow"}],key:t,staticClass:"menu",on:{click:function(t){return e.goRoute(n)}}},[a("img",{attrs:{src:n.img,alt:""}}),e._v(" "),a("div",{staticClass:"right"},[a("p",{staticClass:"name",domProps:{innerHTML:e._s(n.name)}}),e._v(" "),a("p",{staticClass:"sub elps"},[e._v(e._s(n.gntsyText))])])])}),e._v(" "),a("div",{staticClass:"menu",on:{click:function(t){return e.$router.push("/wanApplicationCenter?currentPortalId=".concat(e.currentPortalId))}}},[a("img",{attrs:{src:"static/images/wanzhengtong/more.png",alt:""}}),e._v(" "),e._m(0)])],2)])},[function(){var t=this._self._c;return t("div",{staticClass:"right"},[t("p",{staticClass:"name"},[this._v("更多服务")]),this._v(" "),t("p",{staticClass:"sub elps"},[this._v("去应用中心找服务")])])}],!1,null,"fbf73a12",null).exports,h=e(25108),m=(0,r.Z)({data:function(){return{}},methods:{to:function(t){dsf.config.wanzhengtong&&dsf.config.wanzhengtong.dataBase&&dsf.config.wanzhengtong.dataBase[t]&&(window.dd?dd.openLink({url:dsf.config.wanzhengtong.dataBase[t]}).then(function(t){h.log(t)}).catch(function(t){}):this.$router.push({path:"/iframe",query:{url:dsf.config.wanzhengtong.dataBase[t]}}))}}},function(){var n=this,t=n._self._c;return t("div",{staticClass:"database-component"},[t("div",{staticClass:"title"},[n._v("资料库")]),n._v(" "),t("div",{staticClass:"menus"},[t("div",{staticClass:"left",style:{backgroundImage:"url('static/images/wanzhengtong/资料库1.png')"},on:{click:function(t){return n.to("xijingping")}}},[n._m(0)]),n._v(" "),t("div",{staticClass:"right"},[t("div",{style:{backgroundImage:"url('static/images/wanzhengtong/资料库2.png')"},on:{click:function(t){return n.to("stateCouncil")}}},[t("span",[n._v("国务院文件库")])]),n._v(" "),t("div",{style:{backgroundImage:"url('static/images/wanzhengtong/资料库3.png')"},on:{click:function(t){return n.to("anhui")}}},[t("span",[n._v("安徽省文件库")])]),n._v(" "),t("div",{style:{backgroundImage:"url('static/images/wanzhengtong/资料库4.png')"},on:{click:function(t){return n.to("government")}}},[t("span",[n._v("政务知识库")])])])])])},[function(){var t=this._self._c;return t("span",[this._v("习近平系列重要"),t("br"),this._v("讲话数据库")])}],!1,null,"37d59a48",null).exports,v=e(25108),y=(0,r.Z)({components:{todoComponent:n,noticeComponent:p,applicationComponent:g,databaseComponent:m},filters:{greeting:function(t){return 0<=t&&t<=10?"早上好":10<t&&t<=14?"中午好":14<t&&t<=18?"下午好":18<t&&t<=24?"晚上好":void 0}},data:function(){return{backgroundImage:"static/images/wanzhengtong/top.png",currentDept:"",currentPortalId:"",name:dsf.util.loadSessionStore("user").name,actions:[],showPopover:!1,currentComponents:[],isLoading:!1,refreshTime:""}},created:function(){this.getMobilePortalPages()},watch:{currentPortalId:function(t,n){this.getMobilePortalComponents(t)}},methods:{getMobilePortalPages:function(){var n=this,e=dsf.layer.loading();dsf.http.post("ctrl/unifyOfficeInfo/getMobilePortalPages").then(function(t){200==t.data.code&&0<t.data.data.length?(n.actions=t.data.data.map(function(t){return{text:t.pageName,id:t.id,background:t.background}}),n.currentDept=n.actions[0].text,n.currentPortalId=n.actions[0].id,n.backgroundImage=dsf.url.getServerUrl(n.actions[0].background)):n.$router.replace("/wanError?CODE=G02&TEL=".concat(dsf.config.setting["SYS-MOBILE-YW-0001"])),dsf.layer.closeLoading(e)}).error(function(t){dsf.layer.closeLoading(e)})},getMobilePortalComponents:function(t){var n=this,e=dsf.layer.loading();dsf.http.post("ctrl/unifyOfficeInfo/getMobilePortalComponents",{pageId:t}).then(function(t){200==t.data.code&&(n.currentComponents=t.data.data),dsf.layer.closeLoading(e)}).error(function(t){dsf.layer.closeLoading(e)})},onSelect:function(t){this.currentDept=t.text,this.currentPortalId=t.id,this.backgroundImage=dsf.url.getServerUrl(t.background),dsf.http.post("fn/unifyOfficeInfo/setMobilePortal",{pageId:t.id}).then(function(t){})},onRefresh:function(){this.refreshTime=(new Date).getTime(),this.isLoading=!1,this.getMobilePortalComponents(this.currentPortalId)},toSetting:function(){this.$router.push("/wanSetting")},toService:function(){window.dd?dd.openLink({url:"https://static.ahzwfw.gov.cn/wzt-ics-h5/#/"}).then(function(t){v.log(t)}).catch(function(t){}):this.$router.push({path:"/iframe",query:{url:"https://static.ahzwfw.gov.cn/wzt-ics-h5/#/"}})}}},function(){var n=this,e=n._self._c;return e("van-pull-refresh",{on:{refresh:n.onRefresh},model:{value:n.isLoading,callback:function(t){n.isLoading=t},expression:"isLoading"}},[e("div",{staticClass:"container"},[e("div",{staticClass:"wan-header",style:{backgroundImage:"url(".concat(n.backgroundImage,")")}},[e("van-icon",{attrs:{name:"setting-o",size:"22"},on:{click:n.toSetting}}),n._v(" "),e("div",[e("img",{attrs:{src:"static/images/wanzhengtong/service.png",alt:""},on:{click:n.toService}})]),n._v(" "),e("div",{staticClass:"dept"},[e("van-popover",{attrs:{trigger:"click",actions:n.actions,placement:"bottom-end"},on:{select:n.onSelect},scopedSlots:n._u([{key:"reference",fn:function(){return[n._v("\r\n            "+n._s(n.currentDept)),e("van-icon",{attrs:{name:"arrow-down"}})]},proxy:!0}]),model:{value:n.showPopover,callback:function(t){n.showPopover=t},expression:"showPopover"}})],1),n._v(" "),e("div",{staticClass:"name"},[n._v("\r\n        "+n._s(n._f("greeting")((new Date).getHours()))+"，"+n._s(n.name)+"\r\n      ")])],1),n._v(" "),n._l(n.currentComponents,function(t){return e(t.componentCode,{key:"".concat(t.id,"_").concat(n.currentPortalId,"_").concat(n.refreshTime),ref:t.componentCode,refInFor:!0,tag:"component",attrs:{currentComponent:t,currentPortalId:n.currentPortalId}})}),n._v(" "),e("div",{staticStyle:{height:"1rem"}},[e("div",{staticClass:"footer"},[n._v("客服电话："+n._s(n.dsf.config.setting["SYS-MOBILE-YW-0001"]))])])],2)])},[],!1,null,"0ef03d36",null).exports}}]);