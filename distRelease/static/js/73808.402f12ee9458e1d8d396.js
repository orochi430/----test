"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[73808],{41775:function(t,e,n){n.d(e,{Z:function(){return c}});n(23307);var e=n(81392),s=n(26243),o=n.n(s),s=n(79529),l=n.n(s),s=n(46297),a=n(84628),i=n(50856),r=n(25108),s={components:{DsCard:s.Z,DsButtonGroup:a.Z,DsButtonToolbox:i.Z,Icon:e.Z},props:{tabObj:{type:Object},data:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},type:{type:String},keyColumn:{type:String},formMethod:{type:String},isHiddenBtn:{type:Boolean,default:function(){}}},data:function(){return{}},created:function(){},computed:{aSubTitles:function(){return r.log(this.columns.filter(function(t){return/^subTitle\w?$/i.test(t.showCategory)})),this.columns.filter(function(t){return/^subTitle\w?$/i.test(t.showCategory)})},bSubTitles:function(){return this.columns.filter(function(t){return/^content$/i.test(t.showCategory)})},needTitles:function(){return this.columns.filter(function(t){return/^needTitle\w?$/i.test(t.showCategory)})},titleIcon:function(){return this.columns.filter(function(t){return/^titleIcon\w?$/i.test(t.showCategory)})}},mounted:function(){r.log(this.bSubTitles)},methods:{isShowColumn:function(t,e){return e.dataValue[t.showMetaColumn]||0===e.dataValue[t.showMetaColumn]},isShowListBtn:function(t){var e=null==this.isHiddenBtn,n=!1,n=!(!t.buttons||!(t.buttons.commonButtons&&0<t.buttons.commonButtons.length||t.buttons.mainButtons&&0<t.buttons.mainButtons.length));return e&&n},link:function(t){var e,n,s,o;t.dataValue.allowMobile&&1!=t.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):("isRead"in t.dataValue&&!t.dataValue.isRead&&(t.dataValue.isRead=!0),e=(t=t.dataValue)[this.keyColumn]||t.info_id||t.id||t.A0001||t.fid||t["SW_XZD.A0001"],n=this.keyColumn?this.keyColumn.split(".")[0]+".A0004":"",n=t.moduleId||t.A0004||t["SW_XZD.A0004"]||t[n],"db"==this.type&&(n=t.masterModuleId||t.moduleId||t.A0004),o=t.masterId||"",n=n+"/"+e,s={},"gw"==this.type&&(n+="/1",s.todoId=t.todoId),this.type&&(n+="?type=".concat(this.type)),"SigninList"==this.$route.name&&(n+="?&listId=1903161124289nXBk8iVSmTMGYxn9bi&exchangeList=signedList"),"db"==this.type&&(o&&(n+="&masterId=".concat(o)),r.log(this.formMethod),this.formMethod)&&(n+="&formMethod=info"),"dy"==this.type&&(n+="&distribId=".concat(t.distribId),dsf.http.post("fn/mobileToRead/markRead",{pks:t.distribId}).then(function(t){r.log(t)})),this.tabObj&&this.tabObj.targetUrl?(o=this.tabObj.targetUrl.replace("[pk]",e),this.$router.push({path:o})):this.$router.push({path:"/commonForm/"+n,query:s}))},getTitle:function(){return this.columns.find(function(t){return"mainTitle"===t.showCategory})||{}},handleCommonClick:function(t,e,n){e.dataValue.allowMobile&&1!=e.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):this.$emit("commonClick",t,e,n)},handleMainClick:function(t,e,n){e.dataValue.allowMobile&&1!=e.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):this.$emit("mainClick",t,e,n)},titleIconColor:function(t,e){t=t.dataValue[e.showMetaColumn].substr(0,1);return dsf.config.listTitleIcon&&-1<o()(dsf.config.listTitleIcon).indexOf(t)?(e=dsf.config.listTitleIcon[t],{backgroundColor:this.colorRgba(e,.12),color:e,borderColor:e}):""},colorRgba:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,n=t.toLowerCase();if(n&&/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(n)){if(4===n.length){for(var s="#",o=1;o<4;o+=1)s+=n.slice(o,o+1).concat(n.slice(o,o+1));n=s}for(var a=[],i=1;i<7;i+=2)a.push(l()("0x"+n.slice(i,i+2)));return"rgba("+a.join(",")+","+e+")"}return n}}},c=(0,n(51900).Z)(s,function(){var s=this,o=s._self._c;return o("div",{staticClass:"ds-list"},[s._l(s.data,function(n,e){return o("div",{key:n.id||"item-".concat(e),staticClass:"ds-item"},[o("DsCard",["isRead"in n.dataValue&&!n.dataValue.isRead?o("span",{staticClass:"isStatus"}):s._e(),s._v(" "),"readStatus"in n.dataValue&&"2"!=n.dataValue.readStatus?o("span",{staticClass:"isStatus"}):s._e(),s._v(" "),n.dataValue[s.getTitle().showMetaColumn]?o("div",{class:{ellipsis:s.dsf.config.commonList&&s.dsf.config.commonList.titleEllipsis},attrs:{slot:"header"},on:{click:function(t){return s.link(n)}},slot:"header"},[o("span",{class:{"col-title":"isRead"in n.dataValue&&!n.dataValue.isRead||"readStatus"in n.dataValue&&"2"!=n.dataValue.readStatus},style:{color:s.getTitle().color||"","word-wrap":"break-word","word-break":"break-all"}},[s._v("\n                "+s._s(n.dataValue[s.getTitle().showMetaColumn]))])]):s._e(),s._v(" "),o("div",{staticClass:"content",attrs:{slot:"content"},on:{click:function(t){return s.link(n)}},slot:"content"},[s._t("item-content",function(){return[o("div",{staticClass:"flex1"},[0<s.aSubTitles.length?o("div",{staticClass:"aSubTitles"},[s._l(s.aSubTitles,function(t,e){return[s.isShowColumn(t,n)?o("div",{key:"aSubTitles-".concat(e),staticClass:"subTitle"},[t.icon?o("Icon",{class:["iconfont",t.icon]}):s._e(),s._v(" "),o("span",{staticClass:"label",style:{color:t.color}},[s._v(s._s(n.dataValue[t.showMetaColumn]))])],1):s._e()]})],2):s._e(),s._v(" "),0<s.bSubTitles.length?o("div",{staticClass:"bSubTitles"},[s._l(s.bSubTitles,function(t,e){return[s.isShowColumn(t,n)?o("div",{key:"bSubTitles-".concat(e),staticClass:"subTitle"},[t.icon?o("Icon",{class:["iconfont",t.icon]}):s._e(),s._v(" "),o("span",{class:["label","ds-elips-".concat(t.showRows||1)],style:{color:t.color}},[s._v(s._s(n.dataValue[t.showMetaColumn]))])],1):s._e()]})],2):s._e(),s._v(" "),0<s.needTitles.length?o("div",{staticClass:"needTitles"},[s._l(s.needTitles,function(t,e){return[s.isShowColumn(t,n)?o("div",{key:"needTitles-".concat(e),staticClass:"subTitle"},[o("span",{staticClass:"name label ellipsis"},[s._v(s._s(t.showName))]),s._v(" "),o("span",{staticClass:"label val elips",style:{color:t.color}},[s._v(s._s(n.dataValue[t.showMetaColumn]))])]):s._e()]})],2):s._e()]),s._v(" "),0<s.titleIcon.length?o("div",[s._l(s.titleIcon,function(t,e){return[s.isShowColumn(t,n)?o("div",{key:"titleIcon-".concat(e),staticClass:"moduleIcon",style:s.titleIconColor(n,t)},[o("span",[s._v(s._s(n.dataValue[t.showMetaColumn].substr(0,1)))])]):s._e()]})],2):s._e()]},{item:n}),s._v(" "),s._t("item-extend",null,{item:n})],2),s._v(" "),s.isShowListBtn(n)?o("div",{attrs:{slot:"footer"},slot:"footer"},[s._t("item-footer",function(){return[o("DsButtonToolbox",{attrs:{buttons:n.buttons||{},more:!0,size:"small"},on:{commonClick:function(t){s.handleCommonClick(t,n,e)},mainClick:function(t){s.handleMainClick(t,n,e)}}})]},{item:{}})],2):s._e()])],1)}),s._v(" "),s.data.length||s.$parent.loading?s._e():o("commonempty")],2)},[],!1,null,"7d9709ac",null).exports},73808:function(t,e,n){n.r(e),n.d(e,{default:function(){return B}});var e=n(26243),o=n.n(e),e=n(62680),a=n.n(e),e=n(95366),i=n.n(e),e=n(6919),s=n.n(e),l=n(5044),r=n(66250),c=n(77193),e=n(79529),u=n.n(e),e=n(73473),d=n.n(e),e=n(33453),f=n.n(e),e=n(20629),h=n(41775),m=n(50856),p=n(9303),g=n(30819),b=n(63560),v=n(96345),w=n(46385),y=n(38496),k=n(91369),C=n(7843),S=n(88561),_=n(2728),T=n(25108);function I(e,t){var n,s=o()(e);return a()&&(n=a()(e),t&&(n=n.filter(function(t){return i()(e,t).enumerable})),s.push.apply(s,n)),s}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach(function(t){(0,c.Z)(e,t,n[t])}):s()?Object.defineProperties(e,s()(n)):I(Object(n)).forEach(function(t){Object.defineProperty(e,t,i()(n,t))})}return e}var h={components:{DsList:h.Z,DsfButtonToolbox:m.Z,workFlowDialog:g.Z,selectPerson:b.default,sendFile:v.Z,SeparateRead:w.default,signFile:y.default,signFilePerson:k.default,AskLeave:C.default},mixins:[p.Z],props:{index:{type:String,default:"gw"},animated:{type:Boolean,default:!0},hide:{type:Boolean,default:!1}},data:function(){return{finished:!1,loading:!1,isLoading:!1,finishedTips:"没有更多了",start:1,showPopup:!1,showFlowBack:!1,tab:"gw",tabs:[],componentId:"DsList",data:[],columns:[],listButtons:{},showPerson:!1,selected:null,showFyyj:!1,showFlowSend:!1,keyColumn:"",distribIds:""}},computed:P(P({},(0,e.rn)({isShowAppFooter:function(t){return t.isShowAppFooter},isShowAppHeader:function(t){return t.isShowAppHeader}})),{},{fetchOptions:function(){var t,e,n,s=this;return 0<this.tabs.length?(t=(n=this.tabs.find(function(t){return t.name===s.tab})).params,e=n.url,n=n.nosend,{url:e,params:P({start:this.start,page:this.start,limit:15},t),nosend:null!=n&&n}):{}},hasBottom:function(){var t=this.listButtons.commonButton||[],e=this.listButtons.mainButtons||[];return(t.length||e.length)&&this.data.length}}),mounted:function(){var n=this;return(0,r.Z)(f().mark(function t(){var e;return f().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=dsf.util.loadSessionStore("todo_center_tab"),n.tab=e||n.index,n.$eventBus.onRefresh(n,function(){n.onRefresh()}),t.next=5,n.initTabs();case 5:n.getBadge();case 6:case"end":return t.stop()}},t)}))()},activated:function(){this.showFlowSend=!1,this.setTitle()},methods:{setTitle:function(){_.Z.setTitle("待办中心")},initTabs:function(){var n=this;return(0,r.Z)(f().mark(function t(){var e;return f().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=dsf.config.homePage.todoCenter,T.log(e),n.tabs=e;case 3:case"end":return t.stop()}},t)}))()},handleFlowSendChange:function(){this.showFlowSend=!1,this.onRefresh()},handleFlowBackChange:function(){this.showFlowBack=!1,this.onRefresh()},getContainer:function(){return document.body},getPercent:function(t){t=(t.item.dataValue||{}).process||"";return u()(t.replace("%",""),10)||0},getColor:function(t){t=t.item.dataValue||{},t=new Date(t.bjrq).getTime();return(new Date).getTime()<t?"#F66C6C":"#67C23B"},tabChange:function(){dsf.util.saveToSessionStore("todo_center_tab",this.tab),this.onRefresh()},handleActionClick:function(){(this["action-".concat(arguments[0])]||function(){}).apply(void 0,(0,l.Z)(Array.prototype.slice.call(arguments,1)))},getReplaceParams:function(t){return t?t.replace("[user_id]",S.Z.loadSessionStore("user").user_id).replace("[userid]",S.Z.loadSessionStore("user").user_id).replace("[name]",S.Z.loadSessionStore("user").name).replace("[deptId]",S.Z.loadSessionStore("user").deptId).replace("[deptName]",S.Z.loadSessionStore("user").deptName).replace("[logName]",S.Z.loadSessionStore("user").logName).replace("[mobile]",S.Z.loadSessionStore("user").mobile).replace("[root_dept_id]",S.Z.loadSessionStore("user").root_dept_id).replace("[unitId]",S.Z.loadSessionStore("user").unitId):""},fetchData:function(){var i=this,t=(this.loading=!0,this.fetchOptions),e=t.url,t=t.params,e=this.getReplaceParams(e);T.log(e),dsf.http.post(e,t).then(function(t){var e=t.status,t=t.data,n=(dsf.noRefreshTitle=!1,t.showColumn),s=t.datas,s=void 0===s?[]:s,o=t.listButtons,a=t.total;200===e?(i.keyColumn=t.keyColumn,i.start+=1,i.data=[].concat((0,l.Z)(i.data),(0,l.Z)(s)),i.columns=n||[],o&&o.commonButton&&o.commonButton.length&&(o.commonButton=o.commonButton.filter(function(t){return"custom1"!=t.action})),i.listButtons=o||{},i.tabs[i.tabs.findIndex(function(t){return t.name==i.tab})].count=a,(null==s||i.data.length===a||0===s.length||s.length<15)&&(i.finished=!0),i.data.forEach(function(t){i.fetchOptions.nosend&&(t.buttons.mainButtons=t.buttons.mainButtons.filter(function(t){return"faSong"!=t.action})),""!=i.distribIds&&(i.distribIds+=","),i.distribIds+=t.dataValue.distribId}),s.length<i.start&&((null==s||0===s.length)&&0===i.start?i.finishedTips="暂无数据":i.finishedTips="没有更多了")):(i.dsf.layer.toast(message),i.finished=!0,i.finishedTips=message)}).catch(function(t){t=t.message;i.finished=!0,i.dsf.layer.toast(t),i.finishedTips=t}).finally(function(){i.loading=!1,i.isLoading=!1})},onLoad:function(){this.fetchData()},onRefresh:function(){this.finished=!1,this.loading=!0,this.data=[],this.start=1,this.fetchData()},getBadge:function(){var o=this;return(0,r.Z)(f().mark(function t(){var n,s;return f().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=o.tabs,s=[],n.forEach(function(t){var e=o.getReplaceParams(t.url);s.push(dsf.http.post(e,t.countParams))}),t.next=5,d().all(s);case 5:t.sent.forEach(function(t,e){t&&(n[e].count=t.data.total)}),o.tabs=n;case 8:case"end":return t.stop()}},t)}))()},cancePerson:function(){this.showPerson=!1},getSelectUser:function(n){var t,e,s,o,a,i,l=this;T.log("我的",n),0<n.length&&(n.forEach(function(t,e){t.children&&0<t.children.length&&n.splice(e,1)}),t=n.map(function(t){return t.id.replace("person_","")}),e={},this.isTransfer?1<n.length?dsf.layer.toast("请选择一个人",!0):(s=this.getType(),o=dsf.util.loadSessionStore("user"),a=dsf.layer.loading("取消中"),i=this.selected.dataValue,1===s?dsf.changeUser.flowChangeUser({param:{pk:i.info_id,pId:i.pid,pnId:i.pnid,fromUserId:o.user_id,userId:t.join(","),userName:n.map(function(t){return t.name}).join(","),deptId:n.map(function(t){return t.pid}).join(","),deptName:""},thenFun:function(){return l.onRefresh&&l.onRefresh()},finallyFun:function(){return dsf.layer.closeLoading(a)}}):3===s&&dsf.changeUser.superviseChangeUser({param:{pk:i.info_id||i.id,userId:t.join(",")},thenFun:function(){return l.onRefresh&&l.onRefresh()},finallyFun:function(){return dsf.layer.closeLoading(a)}})):this.isDing?dsf.dd.Ding({users:t,type:2,alertType:2,alertDate:{format:"yyyy-MM-dd HH:mm",value:"2020-05-13 20:00"},attachment:{images:[""]},text:this.selected.dataValue.bt||this.selected.item.dataValue.B0001,bizType:0,onSuccess:function(){this.dsf.layer.toast("操作成功")},onFail:function(){this.dsf.layer.toast("操作失败")}}):dsf.http.post("fn/meeting/sendMeetingSq",{pk:this.selected.dataValue.info_id,userIds:t,bt:this.selected.dataValue.bt}).then(function(t){"success"==t.data.type&&dsf.layer.toast("操作成功",!0)}).catch(function(t){e={msg:"操作异常",type:!1}}).finally(function(t){e.msg&&dsf.layer.toast(e.msg,e.type)}))},closeSendFile:function(){this.showFlowSend=!1}}},B=(0,n(51900).Z)(h,function(){var e=this,n=e._self._c;return n("div",{class:["ds-todocenter",e.hasBottom?"has-bottom":"",{hide:e.hide}]},[n("van-sticky",{attrs:{"offset-top":e.dsf.util.getOffsetTop()}},[e.hide?e._e():n("div",{staticClass:"search-wrap"},[n("router-link",{staticClass:"search",attrs:{to:"/commonList/200827143925vksrrlGEd1ZTyiwa7tm/200826154812jQpt0dBmNzZXaNnLhTR"}},[n("i",{staticClass:"iconfont iconsousuo i1"}),e._v(" "),n("span",[e._v("搜索")])])],1)]),e._v(" "),1<e.tabs.length?n("van-tabs",{staticClass:"tabs",attrs:{ellipsis:!1,animated:e.animated,"swipe-threshold":6,sticky:"","offset-top":e.isShowAppHeader?e.dsf.util.getOffsetTop("2.08rem"):e.dsf.util.getOffsetTop("0.92rem")},on:{change:e.tabChange},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},e._l(e.tabs,function(t){return n("van-tab",{key:t.name,attrs:{name:t.name,title:t.title,badge:t.count||"",disabled:e.loading}},[e.tab===t.name?n("van-pull-refresh",{attrs:{"success-text":"刷新成功"},on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[n("van-list",{attrs:{finished:e.finished,"finished-text":e.data.length?e.finishedTips:"",offset:10},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[n("DsList",{ref:"dslist",refInFor:!0,attrs:{type:e.tab,tabObj:t,data:e.data,columns:e.columns,"key-column":e.keyColumn,formMethod:"info"},on:{mainClick:e.handleActionClick,commonClick:e.handleActionClick},scopedSlots:e._u(["dbs"===e.tab?{key:"item-extend",fn:function(t){return[n("div",{staticClass:"progress-wrap"})]}}:null],null,!0)})],1)],1):e._e()],1)}),1):e._l(e.tabs,function(t){return n("van-pull-refresh",{key:t.name,attrs:{"success-text":"刷新成功"},on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[n("van-list",{attrs:{finished:e.finished,"finished-text":e.data.length?e.finishedTips:"",offset:10},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[n("DsList",{ref:"dslist",refInFor:!0,attrs:{type:e.tab,tabObj:t,data:e.data,columns:e.columns,"key-column":e.keyColumn,formMethod:"info"},on:{mainClick:e.handleActionClick,commonClick:e.handleActionClick},scopedSlots:e._u(["dbs"===e.tab?{key:"item-extend",fn:function(t){return[n("div",{staticClass:"progress-wrap"})]}}:null],null,!0)})],1)],1)}),e._v(" "),e.hasBottom?n("div",{staticClass:"footer"},[n("DsfButtonToolbox",{attrs:{isFormBtn:!0,more:!0,buttons:e.listButtons},on:{mainClick:e.handleActionClick,commonClick:e.handleActionClick}})],1):e._e(),e._v(" "),n("van-popup",{style:{height:"90vh"},attrs:{"get-container":e.getContainer,"close-on-click-overlay":!1,"lock-scroll":"",position:"bottom",round:""},model:{value:e.showPerson,callback:function(t){e.showPerson=t},expression:"showPerson"}},[e.showPerson?n("selectPerson",{attrs:{type:0},on:{getSelectUser:e.getSelectUser,cancePerson:e.cancePerson}}):e._e()],1),e._v(" "),n("van-popup",{staticStyle:{height:"90vh"},attrs:{"get-container":e.getContainer,"close-on-click-overlay":!1,"lock-scroll":"",position:"bottom",round:""},model:{value:e.showFlowSend,callback:function(t){e.showFlowSend=t},expression:"showFlowSend"}},[n("sendFile",{directives:[{name:"show",rawName:"v-show",value:e.showFlowSend,expression:"showFlowSend"}],ref:"sendFile",attrs:{"form-data":e.selected},on:{change:e.handleFlowSendChange,close:e.closeSendFile}})],1),e._v(" "),n("van-popup",{staticStyle:{height:"90vh"},attrs:{"get-container":e.getContainer,"close-on-click-overlay":!1,"lock-scroll":"",position:"bottom",round:""},model:{value:e.showFlowBack,callback:function(t){e.showFlowBack=t},expression:"showFlowBack"}},[n("work-flow-dialog",{ref:"wfDialog",attrs:{"form-data":e.selected},on:{change:e.handleFlowBackChange,close:function(t){e.showFlowBack=!1}}})],1),e._v(" "),e.showFyyj?n("separate-read",{ref:"readPop"}):e._e(),e._v(" "),n("sign-file",{ref:"signFile"}),e._v(" "),n("sign-file-person",{ref:"signFilePerson"}),e._v(" "),n("ask-leave",{ref:"askLeave"})],2)},[],!1,null,null,null).exports},7843:function(t,e,n){n.r(e),n.d(e,{default:function(){return a}});var e=n(73473),s=n.n(e),e=n(63560),o=n(88561),e={name:"AskLeave",components:{selectPerson:e.default},data:function(){return{isShow:!1,resolve:function(){},reject:function(){},data:null,showPerson:!1,congressPersons:[],congressPersonIds:"",congressPerson:"",leaveReason:""}},methods:{init:function(){var t=o.Z.loadSessionStore("user"),t=[{id:t.user_id,pid:t.deptId,name:t.name}];this.data=null,this.showPerson=!1,this.congressPersons=t,this.congressPersonIds=t[0].id,this.congressPerson=t[0].name,this.leaveReason=""},show:function(t){var n=this;return this.init(),this.data=t,this.isShow=!0,new(s())(function(t,e){n.resolve=t,n.reject=e})},cancel:function(){this.isShow=!1,this.reject("流程被中断")},submit:function(){var t,e=this;this.congressPersons.length?this.leaveReason.length?(t=dsf.layer.loading(),dsf.http.post("fn/mobilePDMeeting/attendMeeting",{attendance:-1,meetingtzId:this.data.meetingtzId,leaveReason:this.leaveReason,userName:this.congressPerson,userId:this.congressPersonIds,"x-auth-token":o.Z.loadSessionStore("loginToken")}).done(function(t){"200"===t.code?(e.isShow=!1,e.resolve(t)):dsf.layer.toast("请求异常")}).error(function(){dsf.layer.toast("请求异常")}).always(function(){dsf.layer.closeLoading(t)})):dsf.layer.toast("请填写请假理由"):dsf.layer.toast("请选择代会人员")},getUserNames:function(t){var e=[],n=[],t=t.map(function(t){return e.push(t.name),n.push(t.attrs.idValue),{id:t.attrs.idValue,pid:t.attrs.pidValue,name:t.name}});return{names:e.join(","),ids:n.join(","),persons:t}},getSelectUser:function(t){var e,n;0<t.length&&(e=(t=this.getUserNames(t)).names,n=t.ids,t=t.persons,this.congressPerson=e,this.congressPersonIds=n,this.congressPersons=t)}}},a=(0,n(51900).Z)(e,function(){var e=this,t=e._self._c;return t("div",{staticClass:"ds-ask-leave"},[t("van-popup",{staticClass:"ds-ask-leave-pop",attrs:{position:"bottom","get-container":"#app",round:""},model:{value:e.isShow,callback:function(t){e.isShow=t},expression:"isShow"}},[t("div",{staticClass:"header"},[t("van-nav-bar",{attrs:{title:"请假","left-text":"取消"},on:{"click-left":e.cancel}})],1),e._v(" "),t("div",{staticClass:"body"},[t("div",{staticClass:"congressPerson"},[t("van-field",{attrs:{readyonly:"","input-align":"left",label:"代会人员:",placeholder:"请选择"},on:{click:function(t){e.showPerson=!0}},scopedSlots:e._u([{key:"label",fn:function(){return[t("span",[t("label",{staticClass:"mast-input"}),e._v("代会人员：\n          ")])]},proxy:!0}]),model:{value:e.congressPerson,callback:function(t){e.congressPerson=t},expression:"congressPerson"}})],1),e._v(" "),t("van-field",{attrs:{rows:"2",autosize:"",label:"请假理由:",type:"textarea",placeholder:"请输入请假理由"},model:{value:e.leaveReason,callback:function(t){e.leaveReason=t},expression:"leaveReason"}})],1),e._v(" "),t("div",{staticClass:"footer"},[t("van-button",{attrs:{type:"theme"},on:{click:e.submit}},[e._v("提交")])],1)]),e._v(" "),t("van-popup",{style:{height:"90%"},attrs:{"close-on-click-overlay":!1,position:"bottom","get-container":"#app",round:""},model:{value:e.showPerson,callback:function(t){e.showPerson=t},expression:"showPerson"}},[t("selectPerson",{on:{getSelectUser:e.getSelectUser,cancePerson:function(t){e.showPerson=!1}}})],1)],1)},[],!1,null,null,null).exports}}]);