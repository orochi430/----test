"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[30847,15601],{52974:function(t,e,n){n.d(e,{Z:function(){return s}});var e={name:"Squmenu",props:["fontsize","menudata"],data:function(){return{menuList:[]}},watch:{menudata:function(){this.buildMenu(this.menudata)}},created:function(){null==this.menudata&&this.getMenu()},methods:{getMenu:function(){var e=this;dsf.http.post("fn/newFile/shortcutDing").then(function(t){t=t.data;e.buildMenu(t.data)})},buildMenu:function(t){var n=this;t.forEach(function(t){t.children.forEach(function(t){if(!(t.displayPosition.indexOf("shortcut")<0)){var e=t.agentid;try{""!=e&&(e=JSON.parse(e))}catch(t){e={}}e={menuID:t.id,menuText:t.shortcutName,router:t.actUrl.trim(),type:t.shortcutType,params:e,imgUrl:t.shortcutIcon,showClickTip:t.gntsyText,badge:t.tip,badgeNum:0};n.menuList.push(e)}})}),n.$nextTick(function(){n.menuList.forEach(function(s){s.badge&&""!=s.badge&&dsf.http.postUrls(s.badge,{}).then(function(t){if(Array.isArray(t)&&0<t.length)for(var e=0;e<t.length;e++){var n=t[e];s.badgeNum+=n.data.total||n.data.badge||n.data.data}else s.badgeNum+=t.data.total||t.data.badge||t.data.data})})})},openDDApp:function(t){dd.biz.microApp.openApp({agentId:t,onSuccess:function(t){},onFail:function(t){}})},goMenu:function(n){var s=this;this.menuList.forEach(function(t){var e;t.menuID==n&&(""==t.router||null==t.router?t.showClickTip&&dsf.layer.alert({message:t.showClickTip}):t.type&&3==t.type?s.openDDApp(t.router):2==t.type?dsf.config.ddSetting.isDing?dd.biz.util.openLink({url:t.router,onSuccess:function(t){},onFail:function(t){}}):(e=dsf.util.getReplaceUrl(t.router),s.$router.push({path:"iframe",query:{url:e}})):t.params?s.$router.push({name:t.router,params:t.params}):s.$router.push({path:t.router}))})}}},s=(0,n(51900).Z)(e,function(){var n=this,t=n._self._c;return t("div",{staticClass:"ds-squemenu"},[t("div",{staticClass:"dsf-list"},n._l(n.menuList,function(e){return t("div",{key:e.menuID,staticClass:"menu",on:{click:function(t){return n.goMenu(e.menuID)}}},[t("img",{attrs:{src:e.imgUrl,alt:""}}),n._v(" "),t("p",{style:n.fontsize?"font-size:"+n.fontsize:"",domProps:{innerHTML:n._s(e.menuText)}}),n._v(" "),e.badgeNum?t("div",{staticClass:"badge"},[n._v(n._s(e.badgeNum<=99?e.badgeNum:"99+"))]):n._e()])}),0)])},[],!1,null,"e791112c",null).exports},30819:function(t,e,n){n.d(e,{Z:function(){return u}});var e=n(26243),o=n.n(e),e=n(62680),i=n.n(e),e=n(95366),a=n.n(e),e=n(6919),s=n.n(e),r=n(77193),e=n(73473),c=n.n(e);function l(e,t){var n,s=o()(e);return i()&&(n=i()(e),t&&(n=n.filter(function(t){return a()(e,t).enumerable})),s.push.apply(s,n)),s}var e={name:"WorkFlowDialog",props:{formData:{type:Object,default:function(){return{}}},metaData:{type:Object,default:function(){return{}}}},data:function(){return{text:"退回",message:"",showDialog:!1,submitAfter:function(){},h:0,isNeedWrite:dsf.config.setting["SYS-FLOW-0038"]||0,personSelectData:[],secPeo:!1,columns:[],SendRequest:{}}},created:function(){},mounted:function(){},computed:{isShowUser:function(){return 1<this.columns.length||dsf.config.commonFlow.onePersonBackIsShow}},methods:{cancel:function(){this.showDialog=!1,this.h=0,this.$emit("close")},sendBack:function(){var e=this,t={pid:this.formData.pid||this.formData.pId,pnid:this.formData.pnid||this.formData.pnId,wfId:this.formData.flowId,backReason:this.message},n=dsf.layer.loading(this.text+"中");dsf.http.post("/fn/mobileFlow/sendBack",t).then(function(t){dsf.layer.closeLoading(n),e.dsf.layer.toast(e.text+"成功",!0),e.cancel(),setTimeout(function(){e.$emit("change")},100)})},sendBackNew:function(){var e,t,n=this,s=!0;n.metaData.buttons.mainButtons.some(function(t){"NoopinionBack"==t.action&&(s=!1)}),""==n.message.trim()&&1==n.isNeedWrite&&1==s?dsf.layer.toast("请输入退回原因"):n.personSelectData.length<1&&n.isShowUser?dsf.layer.toast("请选择退回人员"):(e=dsf.layer.loading(n.text+"中"),t={TPID:n.SendRequest.tpid,CurLinkID:n.personSelectData[0].LinkID,WFID:n.SendRequest.wfid,backType:1,Remark:n.message,inherit:"",MultSendBackMod:n.SendRequest.multSendBackMod,IsMergeTodo:n.SendRequest.isMergeTodo,NGR:0,SendBackTo:n.SendRequest.sendBackTo},dsf.http.post("/fn/flow/submitSendBackNode",t).then(function(t){dsf.layer.closeLoading(e),n.dsf.layer.toast(n.text+"成功",!0),n.cancel(),setTimeout(function(){n.$emit("change")},100)}))},show:function(t){var n=this,t=t.text,e=(this.personSelectData=[],{pId:this.metaData.parameters?this.metaData.parameters.pId:this.formData.pid||this.formData.pId,flowId:(this.metaData.parameters||this.formData).flowId,pk:this.metaData.parameters?this.metaData.parameters.pk:this.formData.info_d||this.formData.info_id,pnId:this.metaData.parameters?this.metaData.parameters.pnId:this.formData.pnid||this.formData.pnId});return dsf.http.get("fn/flow/getGPNodeProcess",e).then(function(t){var e,t=t.data;"200"==t.code&&(e=[],n.SendRequest=t.data.SendRequest,t.data.processArray.forEach(function(t){e.push(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):s()?Object.defineProperties(e,s()(n)):l(Object(n)).forEach(function(t){Object.defineProperty(e,t,a()(n,t))})}return e}({text:t.Sender.UserName+"(".concat(t.PARENT_NODENAME,")")},t))}),n.columns=e,1==n.columns.length&&(n.personSelectData=e),n.initHeight())}),this.text=t||"",this.message="退回"==t&&dsf.config.setting["SYS-MOBILE-FORM-0005"]||"",this.showDialog=!0,new(c())(function(t){n.submitAfter=t})},initHeight:function(){var t=this;this.$nextTick(function(){t.isShowUser?t.h=t.$refs.content.offsetHeight-270:t.h=t.$refs.content.offsetHeight-160})},close:function(){this.showDialog=!1,this.h=0},showPersonModel:function(){this.secPeo=!this.secPeo},onConfirm:function(t){this.personSelectData=[],this.personSelectData.push(t),this.showPersonModel()},closePerson:function(t,e){this.personSelectData.splice(e,1)},submitFun:function(){this.submitAfter(),this.text,this.sendBackNew()}}},u=(0,n(51900).Z)(e,function(){var s=this,t=s._self._c;return t("div",{directives:[{name:"show",rawName:"v-show",value:s.showDialog,expression:"showDialog"}],staticClass:"ds-workflow_dialog"},[t("div",{staticClass:"header"},[t("van-nav-bar",{attrs:{title:s.text+"理由","left-text":"取消"},on:{"click-left":function(t){return s.cancel()}}})],1),s._v(" "),t("div",{ref:"content",staticClass:"content"},[s.isShowUser?t("div",{ref:"user",staticClass:"sheetBox"},[t("p",{staticClass:"reasonLabel"},[s._v("退回人员")]),s._v(" "),t("div",{staticClass:"disfr ac",staticStyle:{padding:"10px 0"}},[t("div",{staticClass:"peopleSec disfr ac flex1"},[s._l(s.personSelectData,function(e,n){return t("van-tag",{key:n,attrs:{closeable:"",size:"large",type:"primary"},on:{close:function(t){return s.closePerson(e,n)}}},[s._v("\n            "+s._s(e.text)+"\n          ")])}),s._v("\n            \n        ")],2),s._v(" "),t("van-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"default"},on:{click:s.showPersonModel}},[s._v("选择人员")])],1),s._v(" "),t("p",{staticClass:"reasonLabel",staticStyle:{"margin-bottom":"0.2rem"}},[s._v("退回原因")])]):s._e(),s._v(" "),t("van-field",{ref:"reason",staticClass:"reason",attrs:{rows:"5",type:"textarea",placeholder:"请输入"+s.text+"理由",border:""},model:{value:s.message,callback:function(t){s.message=t},expression:"message"}})],1),s._v(" "),t("div",{staticClass:"footer"},[t("van-button",{attrs:{type:"theme",block:""},on:{click:s.submitFun}},[s._v("确认"+s._s(s.text))])],1),s._v(" "),t("van-popup",{style:{height:"50vh"},attrs:{position:"bottom",round:""},model:{value:s.secPeo,callback:function(t){s.secPeo=t},expression:"secPeo"}},[t("div",{staticStyle:{width:"100%"}},[t("van-picker",{attrs:{title:"请选择退回人员","show-toolbar":"",columns:s.columns},on:{confirm:s.onConfirm,cancel:s.showPersonModel}})],1)])],1)},[],!1,null,"447cfcb4",null).exports},15601:function(t,e,n){n.r(e),n.d(e,{default:function(){return i}});var e=n(8450),s=n.n(e),o=n(25108),e={name:"appMenuCenter",props:["limitcount","menudata"],data:function(){return{isHideTitle:!1,user:dsf.util.loadSessionStore("user")||{},default_img:'this.src="'+n(94243)+'"',settingModel:!1,mainMenu:[],searchVal:"",showSubmenu:!1,submenu:{name:"",child:[]}}},watch:{menudata:function(){this.buildMenu(this.menudata)}},methods:{goMore:function(){this.$router.push({path:"/appMenuCenter"})},cancel:function(){this.settingModel=!1},getMenu:function(){var e=this;dsf.http.post("fn/newFile/shortcutDing",{}).then(function(t){t=t.data;e.buildMenu(t.data)})},buildMenu:function(t){var e=[];(function n(t,s){t.forEach(function(t){if(!(t.displayPosition.indexOf("work")<0)){var e=t.agentid;try{""!=e&&(e=JSON.parse(e))}catch(t){e={}}e={name:t.shortcutName,badge:t.tip,router:t.actUrl.trim(),img:t.shortcutIcon,props:e,type:t.shortcutType,showClickTip:t.gntsyText,child:[]};s.push(e),0<t.children.length&&n(t.children,e.child)}})})(t,e),e.forEach(function(t){t.child.forEach(function(s){s.badgeNum=0,s.isshow=!0,s.badge&&""!=s.badge&&dsf.http.postUrls(s.badge,{}).then(function(t){if(Array.isArray(t)&&0<t.length)for(var e=0;e<t.length;e++){var n=t[e];s.badgeNum+=n.data.total||n.data.badge||n.data.data}else s.badgeNum+=t.data.total||t.data.badge||t.data.data})})}),this.mainMenu=e,this.isHideTitle=null!=this.limitcount&&0<this.limitcount},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})},openDDApp:function(t){dd.biz.microApp.openApp({agentId:t,onSuccess:function(t){},onFail:function(t){}})},goRoute:function(t){var e;0<t.child.length?(this.showSubmenu=!0,this.submenu=t,o.log(this.submenu)):t.type&&3==t.type?this.openDDApp(t.router):2==t.type?dsf.config.ddSetting.isDing?dd.biz.util.openLink({url:t.router,onSuccess:function(t){},onFail:function(t){}}):(e=dsf.util.getReplaceUrl(t.router),this.$router.push({name:"dsfIframe",params:{url:e}})):t.props?t.props.props?this.$router.push({path:t.router,query:JSON.parse(s()(t.props))}):this.$router.push({name:t.router,params:JSON.parse(s()(t.props))}):this.$router.push({path:t.router})}},created:function(){null==this.menudata&&this.getMenu()}},i=(0,n(51900).Z)(e,function(){var n=this,s=n._self._c;return s("div",{staticClass:"ds-moduleIndex"},[n.settingModel?n._e():s("div",{staticClass:"appBox"},n._l(n.mainMenu,function(t,e){return s("div",{key:e,staticClass:"item-cell",class:{card:t.child.length}},[0<t.child.length&&!n.isHideTitle?s("div",{staticClass:"title"},[s("span",[n._v(n._s(t.name))])]):n._e(),n._v(" "),0<t.child.length?s("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},n._l(t.child,function(e,t){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.isshow,expression:"subItem.isshow"}],key:t,staticClass:"menu",on:{click:function(t){return n.goRoute(e)}}},[s("img",{attrs:{src:e.img,alt:""}}),n._v(" "),s("p",[n._v(n._s(e.name))]),n._v(" "),e.badgeNum?s("div",{staticClass:"badge"},[n._v(n._s(e.badgeNum<99?e.badgeNum:"99+"))]):n._e()])}),0):n._e()])}),0)])},[],!1,null,"353210fb",null).exports},30847:function(t,e,n){n.r(e),n.d(e,{default:function(){return u}});var s=n(5044),e=n(39946),o=n(15601),i=n(52974),a=n(9303),r=n(96345),c=n(30819),l=n(25108),i={components:{Squmenu:i.Z,DsList:e.Z,appMenuCenter:o.default,sendFile:r.Z,workFlowDialog:c.Z},mixins:[a.Z],data:function(){return{name:dsf.util.loadSessionStore("user").name,todo:{list:[],keyColumn:"",columns:[]},notice:{list:[],keyColumn:"",columns:[]},menuList:[],showFlowSend:!1,showFlowBack:!1,selected:{},noticeSpHandleJS:{}}},created:function(){this.getMenu(),this.getNoticeList(),this.getTodoList(),this.noticeSpHandleJS.link=function(t,e,n,s,o){s.$router.push({path:"/commonForm/".concat(o.moduleId,"/").concat(o.noticeId,"?method=view&listId=1808061608052gwg6wWGsNdiXr1yOCx")})}},methods:{handleFlowSendChange:function(){this.showFlowSend=!1,this.getTodoList()},handleFlowBackChange:function(){this.showFlowBack=!1,this.getTodoList()},handleActionClick:function(){(this["action-".concat(arguments[0])]||function(){}).apply(void 0,(0,s.Z)(Array.prototype.slice.call(arguments,1)))},getMenu:function(){var e=this;dsf.http.post("fn/newFile/shortcutDing").then(function(t){t=t.data;e.menuList=t.data})},goMore:function(){this.$router.push({path:"/appMenuCenter"})},getNoticeList:function(){var o=this;dsf.http.post("/fn/mobileInterfaceController/notice?page=0&limit=3").then(function(t){var t=t.data,e=(l.log(t),t.showColumn),n=t.datas,s=t.keyColumn;t.total,t.listButtons,t.mobileStyle,t.showTable,t.showDefault;o.notice.list=void 0===n?[]:n,o.notice.keyColumn=s,o.notice.columns=e||[]})},getTodoList:function(){var o=this;dsf.http.post("/fn/mobileInterfaceController/urgentToDo?page=0&limit=3&urgents=2,3").then(function(t){var t=t.data,e=(l.log(t),t.showColumn),n=t.datas,s=t.keyColumn;t.total,t.listButtons,t.mobileStyle,t.showTable,t.showDefault;o.todo.list=void 0===n?[]:n,o.todo.keyColumn=s,o.todo.columns=e||[]})}}},u=(0,n(51900).Z)(i,function(){var e=this,t=e._self._c;return t("div",{staticClass:"contanier"},[t("div",{staticClass:"welcome"},[e._v("欢迎您，"+e._s(e.name))]),e._v(" "),t("div",{staticClass:"search flex jb ac",on:{click:function(t){return e.$router.push("/commonList/200827143925vksrrlGEd1ZTyiwa7tm/200826154812jQpt0dBmNzZXaNnLhTR")}}},[t("span",[e._v("请输入关键词")]),e._v(" "),t("i",{staticClass:"iconfont iconsousuo i1"})]),e._v(" "),t("div",{staticClass:"card"},[t("Squmenu",{attrs:{fontsize:"0.28rem",menudata:e.menuList}})],1),e._v(" "),e.todo.list.length?t("div",{staticClass:"card"},[t("div",{staticClass:"title"},[t("span",[e._v("紧急待办")]),e._v(" "),t("van-icon",{attrs:{name:"ellipsis"},on:{click:function(t){return e.$router.push("/commonList?fileType=xizangJJDB")}}})],1),e._v(" "),t("DsList",{attrs:{data:e.todo.list,noGreenIcon:"true",mobileStyle:"2",keyColumn:e.todo.keyColumn,columns:e.todo.columns},on:{mainClick:e.handleActionClick,commonClick:e.handleActionClick}})],1):e._e(),e._v(" "),e.notice.list.length?t("div",{staticClass:"card"},[t("div",{staticClass:"title"},[t("span",[e._v("通知公告")]),e._v(" "),t("van-icon",{attrs:{name:"ellipsis"},on:{click:function(t){return e.$router.push("/commonList?fileType=xizangTZGG")}}})],1),e._v(" "),t("DsList",{attrs:{data:e.notice.list,noGreenIcon:"true",mobileStyle:"2",keyColumn:e.notice.keyColumn,columns:e.notice.columns,spHandleJs:e.noticeSpHandleJS},on:{mainClick:e.handleActionClick,commonClick:e.handleActionClick}})],1):e._e(),e._v(" "),t("div",{staticClass:"card"},[t("div",{staticClass:"title"},[t("span",[e._v("我的应用")]),e._v(" "),t("van-icon",{attrs:{name:"ellipsis"},on:{click:e.goMore}})],1),e._v(" "),t("appMenuCenter",{attrs:{limitcount:"12",menudata:e.menuList}})],1),e._v(" "),t("van-popup",{staticStyle:{height:"90vh"},attrs:{"get-container":"#app","lock-scroll":"",position:"bottom",round:""},model:{value:e.showFlowSend,callback:function(t){e.showFlowSend=t},expression:"showFlowSend"}},[t("sendFile",{directives:[{name:"show",rawName:"v-show",value:e.showFlowSend,expression:"showFlowSend"}],ref:"sendFile",attrs:{"form-data":e.selected},on:{change:e.handleFlowSendChange,close:function(t){e.showFlowSend=!1}}})],1),e._v(" "),t("van-popup",{staticStyle:{height:"90vh"},attrs:{"get-container":"#app","lock-scroll":"",position:"bottom",round:""},model:{value:e.showFlowBack,callback:function(t){e.showFlowBack=t},expression:"showFlowBack"}},[t("work-flow-dialog",{ref:"wfDialog",attrs:{"form-data":e.selected},on:{change:e.handleFlowBackChange,close:function(t){e.showFlowBack=!1}}})],1)],1)},[],!1,null,"4f23624c",null).exports},94243:function(t,e,n){t.exports=n.p+"static/img/tatj.f7e58b3..png"}}]);