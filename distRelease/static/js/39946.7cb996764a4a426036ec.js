"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[39946],{46297:function(t,e,n){n.d(e,{Z:function(){return o}});var o=(0,n(51900).Z)({},function(t,e){return t("div",{staticClass:"ds-card"},[e._t("default"),e._v(" "),t("div",{staticClass:"tabspage"},[e.$slots.tabspageCheck?t("div",{staticClass:"tabspageCheck"},[e._t("tabspageCheck")],2):e._e(),e._v(" "),t("div",{staticStyle:{flex:"1",overflow:"hidden"}},[e.$slots.header?t("div",{staticClass:"ds-card-header"},[e._t("header")],2):e._e(),e._v(" "),e.$slots.content?t("div",{staticClass:"ds-card-content"},[e._t("content")],2):e._e()]),e._v(" "),e.$slots.rightIcon?t("div",{staticClass:"rightIcon"},[e._t("rightIcon")],2):e._e()]),e._v(" "),e.$slots.footer?t("div",{staticClass:"ds-card-footer"},[e._t("footer")],2):e._e(),e._v(" "),e.$slots.footermin?t("div",{staticClass:"ds-card-footer ds-card-footer2"},[e._t("footermin")],2):e._e()],2)},[],!0,null,"1b02e7ea",null).exports},39946:function(Z,t,e){e.d(t,{Z:function(){return N}});e(85684);var o=e(43567),g=e(522),t=(e(23307),e(81392)),n=e(43562),C=e.n(n),n=e(18428),w=e.n(n),n=e(26243),s=e.n(n),n=e(79529),l=e.n(n),n=e(51900),a=(0,n.Z)({},function(t,e){return t("div",{staticClass:"ds-listRow"},[e._t("default"),e._v(" "),e.$slots.tabspageCheck?t("div",{staticClass:"tabspageCheck"},[e._t("tabspageCheck")],2):e._e(),e._v(" "),t("div",{staticClass:"tabspage"},[e.$slots.header?t("div",{staticClass:"ds-listRow-header"},[e._t("header")],2):e._e(),e._v(" "),e.$slots.content?t("div",{staticClass:"ds-listRow-content"},[e._t("content")],2):e._e(),e._v(" "),e.$slots.footer?t("div",{staticClass:"ds-listRow-footer"},[e._t("footer")],2):e._e()])],2)},[],!0,null,"0c59df24",null).exports,i=e(46297),r=(0,n.Z)({data:function(){return{canOpen:!0}},methods:{openSwipe:function(){this.canOpen=!1;var t=Number(dsf.util.loadLocalStore("openSwipeNum"))||0;t<4&&dsf.util.saveToLocalStore("openSwipeNum",t+1),this.$emit("openSwipe",t+1)}}},function(){var e=this,t=e._self._c;return t("div",{staticClass:"ds-drawer-card"},[t("van-swipe-cell",{attrs:{"stop-propagation":!0},on:{open:e.openSwipe,close:function(t){e.canOpen=!0}},scopedSlots:e._u([{key:"right",fn:function(){return[e.$slots.rightbtn?t("div",{staticClass:"ds-card-rightbtn"},[e._t("rightbtn")],2):e._e()]},proxy:!0}],null,!0)},[e._t("default"),e._v(" "),t("div",{class:["tabspage",{canOpen:e.canOpen&&e.$slots.rightbtn}]},[e.$slots.tabspageCheck?t("div",{staticClass:"tabspageCheck"},[e._t("tabspageCheck")],2):e._e(),e._v(" "),t("div",{staticStyle:{flex:"1",overflow:"hidden"}},[e.$slots.header?t("div",{staticClass:"ds-card-header"},[e._t("header")],2):e._e(),e._v(" "),e.$slots.content?t("div",{staticClass:"ds-card-content"},[e._t("content")],2):e._e()]),e._v(" "),e.$slots.rightIcon?t("div",{staticClass:"rightIcon"},[e._t("rightIcon")],2):e._e()])],2)],1)},[],!1,null,"384794e8",null).exports,c=e(84628),u=(e(76393),e(2113)),d=(e(74268),e(55948)),m=e(70538),h={name:"controlProgress",props:{StartTime:{type:String,default:""},EndTime:{type:String,default:""}},data:function(){return{controlData:{strokeWidth:"10",percent:0,color:"#1989fa",showPivot:!1,pivotText:"80",surplus:0}}},watch:{},created:function(){this.RenderTimer()},methods:{RenderTimer:function(){var t=moment().format("YYYY-MM-DD"),e=Number((new Date(this.EndTime)-new Date(this.StartTime)+1)/864e5).toFixed(0),n=0<(n=Number((new Date(t)-new Date(this.StartTime)+1)/864e5).toFixed(0))?n:0;this.controlData.surplus=Number((new Date(this.EndTime)-new Date(t))/864e5).toFixed(0),this.controlData.surplus=0<this.controlData.surplus?this.controlData.surplus:0,0<this.controlData.surplus?this.controlData.percent=100*Number(n/e).toFixed(2):this.controlData.percent=100}}},f=(0,n.Z)(h,function(){var t=this,e=t._self._c;return e("div",{staticClass:"progressContainer"},[e("div",{staticClass:"progressItemLeft"},[e("van-progress",{attrs:{percentage:t.controlData.percent,"stroke-width":t.controlData.strokeWidth,"show-pivot":t.controlData.showPivot,"pivot-text":t.controlData.pivotText}})],1),t._v(" "),e("div",{staticClass:"progressItemRight"},[t._v("\n        剩余"+t._s(t.controlData.surplus)+"天\n    ")])])},[],!1,null,"bb86112a",null).exports,h={name:"dsListTemplate",components:{Icon:t.Z,Collapse:d.Z,CollapseItem:u.Z},props:{html:String,dataValue:{type:Object,default:{}}},data:function(){return{}},mounted:function(){},methods:{},render:function(t){var e=this;return t(m.default.extend({template:e.html,components:{ControlProgress:f},data:function(){return{dataValue:e.dataValue,activeName:"1"}},methods:{column:function(t){e.$emit("columnClick",{dataValue:e.dataValue},t)},getDateFieldContent:function(t){var e=(new Date).getTime(),n=new Date(t).getTime(),e=l()((e-n)/1e3),n="";return e<60?n="1分钟内":60<=e&&e<3600?n="".concat(l()(e/60),"分钟前"):3600<=e&&e<86400?n="".concat(l()(e/3600),"小时前"):86400<=e&&e<345600?n="".concat(l()(e/86400),"天前"):345600<=e&&(n=t.split(" ")[0]),n}}}),{})}},d=(0,n.Z)(h,void 0,void 0,!1,null,null,null).exports,u=e(50856),h=e(62680),p=e.n(h),h=e(95366),v=e.n(h),h=e(6919),b=e.n(h),_=e(77193),y=e(5044),h=(e(84832),e(59978)),T=(e(16779),e(67763)),k=(e(73474),e(74755)),S=e(73473),I=e.n(S),S=e(18868),V=e(25108);function L(e,t){var n,o=s()(e);return p()&&(n=p()(e),t&&(n=n.filter(function(t){return v()(e,t).enumerable})),o.push.apply(o,n)),o}function B(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach(function(t){(0,_.Z)(e,t,n[t])}):b()?Object.defineProperties(e,b()(n)):L(Object(n)).forEach(function(t){Object.defineProperty(e,t,v()(n,t))})}return e}var D,x,$,S={data:function(){return{btnSty:!1,moreBtn:[],isShowMoreBtn:!1,isShowSub:!1,subButtons:[],showNum:3,show:!1}},components:{DebounceClick:S.Z,DsfButtonGroup:c.Z,Icon:t.Z,Popup:k.Z,Grid:T.Z,GridItem:h.Z},props:{buttons:{type:Object,default:function(){}},more:{type:Boolean,default:!1},size:{type:String,default:"normal"}},mounted:function(){},computed:{iconSize:function(){return"small"===this.size?"0.4rem":"0.48rem"},commonButtons:function(){return this.buttons.commonButton||this.buttons.commonButtons?(0,y.Z)(this.buttons.commonButton||this.buttons.commonButtons):[]},mainButtons:function(){return this.buttons.mainButtons?(0,y.Z)(this.buttons.mainButtons):[]},allButtons:function(){var t=this.buttons.commonButton||this.buttons.commonButtons?(0,y.Z)(this.buttons.commonButton||this.buttons.commonButtons):[],e=this.buttons.mainButtons?(0,y.Z)(this.buttons.mainButtons):[],t=t.map(function(t){return B(B({},t),{},{type:"common"})}),e=e.map(function(t){return B(B({},t),{},{type:"main"})});return[].concat((0,y.Z)(e),(0,y.Z)(t))},showData:function(){var n=[],t=(this.allButtons.slice(0,this.showNum-1).forEach(function(t,e){n.push(t)}),this.allButtons);return(this.showMore?n:t).reverse()},moreData:function(){var n=[];return this.allButtons.slice(this.showNum-1).forEach(function(t,e){n.push(t)}),n},showMore:function(){return this.more&&this.allButtons.length>this.showNum}},methods:{getContainer:function(){return document.body},comfirmDialog:function(n){return new(I())(function(t,e){n.parameters&&n.parameters.find(function(t){return"isComfirm"==t.key&&1==t.value})?dsf.layer.confirm({message:n.parameters.find(function(t){return"comfirmText"==t.key}).value.replace(/\\n/gm,"<br/>"),confirmButtonText:"确认"},function(){t()}):t()})},getIconColor:function(t){return 0<=["已关注","已置顶","取消关注","取消置顶","取消收藏","已收藏","取消"].indexOf(t.name)||-1<t.name.indexOf("已")?{color:"#F1B902"}:t.parameters&&t.parameters.find(function(t){return"color"==t.key})?{color:t.parameters.find(function(t){return"color"==t.key}).value}:void 0},onBtnClick:(D=function(t){var e=this;V.log(t),this.comfirmDialog(t).then(function(){"common"==t.type?e.$emit("commonClick",t.action):e.$emit("mainClick",t.action)})},x=1e3,$=!0,function(){$&&($=!1,D.apply(this,arguments),setTimeout(function(){$=!0},x))}),onMoreClick:function(t){var e=this;setTimeout(function(){e.onBtnClick(t)},200)}}},k=(0,n.Z)(S,function(){var n=this,o=n._self._c;return o("div",{staticClass:"ds-button-swipe"},[o("div",{staticClass:"ds-button-toolbox"},[o("div",{staticClass:"dsf-button-list"},[n.showMore?[o("div",{staticClass:"dsf-button-item",style:{color:1==n.showNum?"var(--normal)":"",background:"#CCCCCC"},on:{click:function(t){n.show=!0}}},[o("van-icon",{attrs:{name:"ellipsis",size:n.iconSize,color:"#ffffff"}}),n._v(" "),o("span",{class:n.dsf.config.commonList&&n.dsf.config.commonList.btnToggleShow?"":"btn-text"},[n._v("更多")])],1)]:n._e(),n._v(" "),n._l(n.showData,function(e,t){return o("debounce-click",{key:e.action},[o("div",{staticClass:"dsf-button-item",on:{click:function(t){return n.onBtnClick(e)}}},[o("Icon",{class:["iconfont",e.icon],attrs:{size:n.iconSize,color:"#ffffff"}}),n._v(" "),o("span",{class:n.dsf.config.commonList&&n.dsf.config.commonList.btnToggleShow?"":"btn-text"},[n._v(n._s(e.name))])],1)])})],2)]),n._v(" "),o("van-popup",{attrs:{"get-container":n.getContainer,"lock-scroll":!0,round:"","close-icon-position":"top-right",position:"bottom"},model:{value:n.show,callback:function(t){n.show=t},expression:"show"}},[o("div",{staticClass:"popup-title"},[o("Icon",{staticClass:"iconfont iconxialajiantou",attrs:{slot:"icon",size:"0.4rem",color:"#000000"},on:{click:function(t){n.show=!1}},slot:"icon"}),n._v("更多\n        ")],1),n._v(" "),o("div",{staticClass:"popup-btn"},[o("Grid",{attrs:{"column-num":4,clickable:"",border:!1}},n._l(n.moreData,function(e){return"liuChengShiPin"!=e.action||n.dsf.config.ddSetting.isDing?o("GridItem",{key:e.action,on:{click:function(t){n.show=!1,n.onMoreClick(e)}}},[o("Icon",{class:["iconfont",e.icon],style:n.getIconColor(e),attrs:{slot:"icon",size:n.iconSize},slot:"icon"}),n._v(" "),o("span",{staticClass:"grid-text",attrs:{slot:"text"},slot:"text"},[n._v(n._s(e.name))])],1):n._e()}),1)],1)])],1)},[],!1,null,"1ecc9381",null).exports,M=e(25108),T={components:{DsfListRow:a,DsfCard:i.Z,DsfButtonGroup:c.Z,DsfButtonToolbox:u.Z,Icon:t.Z,ControlProgress:f,VPlayer:function(){return e.e(46316).then(e.bind(e,46316))},DsListTemplate:d,DsfButtonSwipe:k,DsfDrawerCard:r,commonDialog:function(){return Promise.all([e.e(17672),e.e(42152),e.e(63560),e.e(63450),e.e(9303),e.e(74023),e.e(96345),e.e(49852),e.e(1696),e.e(14355),e.e(86720),e.e(40954)]).then(e.bind(e,40954))}},props:{linkTo:{type:Object},data:{type:Array,default:function(){return[]}},params:{type:Object,default:function(){return{}}},columns:{type:Array,default:function(){return[]}},type:{type:String},isHiddenBtn:{type:Boolean,default:function(){}},noGreenIcon:{type:String,default:function(){}},tabsPage:{type:Boolean},clickTabIndex:{type:Number},routeKey:{type:String},showCheck:{type:Boolean,default:function(){return!1}},checkType:{type:String,default:"checkBox"},keyColumn:{type:String},listId:{type:String},listmoduleId:{type:String},showSubTitle:{type:Boolean,default:function(){return!1}},mobileStyle:{type:String|Number},spHandleJs:{type:Object,default:function(){}},justShowCard:{type:Boolean,default:function(){return!1}},showTips:{type:Boolean,default:function(){return!1}}},watch:{showCheck:function(){M.log("this.showCheck=",this.showCheck)},spHandleJs:{handler:function(t,e){t&&null!=(t=this.spHandleJs)&&t.initHandle&&this.spHandleJs.initHandle(this)},deep:!0,immediate:!0}},data:function(){var t;return{video:{showVideo:!1,videoTitle:""},showProgress:!1,showImgListColumn:"",alwaysShowStatus:!1,readStatusKey:"",haveReadVal:"",isShowNullColumn:!0,key:"",openSwipeNum:Number(dsf.util.loadLocalStore("openSwipeNum"))||0,readStatusType:(null==(t=dsf.config.commonList)?void 0:t.readStatusType)||"",readStatusColor:(null==(t=dsf.config.commonList)?void 0:t.readStatusColor)||"",componentName:"",rowData:""}},created:function(){},mounted:function(){},computed:{isBtnDrawerShow:function(){return!this.justShowCard&&dsf.config.commonList&&dsf.config.commonList.isBtnDrawerShow},isShowReadIcon:function(){return!(this.noGreenIcon||this.params.hideReadStatus)},htmlTemplate:function(){var t=this.columns.find(function(t){return"userTemplate"==t.showCategory});return t&&t.mobileDisplayContent?t.mobileDisplayContent.replace(/cksp/g,"click.stop"):""},showImgList:function(){var t=this.columns.filter(function(t){return/^imageLabel$/i.test(t.showCategory)});return t.length&&(this.showImgListColumn=t[0].showMetaColumn),t},needTitleSubs:function(){return this.columns.filter(function(t){return/^needTitleSub$/i.test(t.showCategory)})},needBoldTitle:function(){return this.columns.filter(function(t){return/^needBoldTitle$/i.test(t.showCategory)})},aSubTitles:function(){return this.columns.filter(function(t){return/^subTitle\w?$/i.test(t.showCategory)})},bSubTitles:function(){return this.columns.filter(function(t){return/^content$/i.test(t.showCategory)})},titleLinkTo:function(){return this.columns.filter(function(t){return/^titleLinkTo$/i.test(t.showCategory)})},needTitles:function(){return this.columns.filter(function(t){return/^needTitle$/i.test(t.showCategory)})},needIconTitles:function(){return this.columns.filter(function(t){return/^needIconTitle\w?$/i.test(t.showCategory)})},isShowListBtn:function(){return null==this.isHiddenBtn},titleIcon:function(){return this.columns.filter(function(t){return/^titleIcon\w?$/i.test(t.showCategory)})},iconBeforeTitles:function(){return this.columns.filter(function(t){return/^iconBeforeTitle\w?$/i.test(t.showCategory)})},needTitlesSingleLine:function(){return this.columns.filter(function(t){return/^needTitles\w?$/i.test(t.showCategory)})},statusIcon:function(){return this.columns.filter(function(t){return/^statusIcon\w?$/i.test(t.showCategory)})}},methods:{getListImg:function(t){return 0==t.dataValue[this.showImgListColumn].indexOf("http")?t.dataValue[this.showImgListColumn]:dsf.url.getServerUrl("fn/file/downloadImage?fileName=".concat(t.dataValue[this.showImgListColumn]))},checkChange:function(t){("radio"==this.checkType&&t.checked||"checkBox"==this.checkType)&&this.$emit("checkClick",t)},isShowColumn:function(t,e){return e.dataValue[t.showMetaColumn]||0===e.dataValue[t.showMetaColumn]},showJinJi:function(t){var e="";if(null!=t.dataValue.jjcd)e=t.dataValue.jjcd;else if(null!=t.dataValue.urgent)e=t.dataValue.urgent;else{if(null==t.dataValue.isUrgent)return"";e=t.dataValue.isUrgent}var n=null==(n=dsf.config.commonList)?void 0:n.urgent;return n&&Array.isArray(n)?null==(n=n.find(function(t){return t.codeValue==e}))?void 0:n.imgUrl:2==t.dataValue.jjcd?"static/images/platform/jinji.svg":3==t.dataValue.jjcd?"static/images/platform/teji.svg":""},isShowReadStatus:function(t){var e=this;return!!e.alwaysShowStatus||(e.readStatusKey&&e.haveReadVal?t.dataValue&&t.dataValue[e.readStatusKey]!=e.haveReadVal:"xxtx"==e.$route.query.fileType||"hytz"==e.$route.query.fileType||e.params.fileType&&e.params.fileType.includes("hytz")?t.dataValue&&1!=t.dataValue.readStatus:"tzgg"==e.$route.query.fileType?t.dataValue&&"2"!=t.dataValue.status:"isRead"in t.dataValue?t.dataValue&&!t.dataValue.isRead:"readStatus"in t.dataValue?t.dataValue&&"2"!=t.dataValue.readStatus:"C-BJ-0004"in t.dataValue&&t.dataValue&&"2"!=t.dataValue["C-BJ-0004"])},link:function(t,e){var n=this,o=(this.rowData=t,document.documentElement.scrollTop);if(this.$emit("itemClick",{index:e,scrollTop:o}),this.showCheck)void 0===t.checked?this.$set(t,"checked",!t.checked):t.checked=!t.checked;else{var s,a,i,l,r={};if(this.linkTo){if(this.linkTo.query)if(this.linkTo.isFixedValue)for(var c=0,u=C()(this.linkTo.query);c<u.length;c++){var d=(0,g.Z)(u[c],2),m=d[0],d=d[1];r[m]=d}else for(var h=0,f=C()(this.linkTo.query);h<f.length;h++){var p=(0,g.Z)(f[h],2),v=p[0],p=p[1];t.dataValue.hasOwnProperty(p)?r[v]=t.dataValue[p]:r[v]=p}if(this.linkTo.path&&"/commonForm"!=this.linkTo.path)return void this.$router.push({path:this.linkTo.path,query:r})}this.$route.query.notLink||null!=(e=this.params)&&e.notLink||(t.dataValue.allowMobile&&1!=t.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):("isRead"in t.dataValue&&!t.dataValue.isRead&&(t.dataValue.isRead=!0),""!=this.keyColumn&&"weidaka"!=this.$route.query.fileType&&(o=t.dataValue,e=C()(o).find(function(t){return t[0].includes("A0001")}),e=o[this.keyColumn]||o.info_id||o.id||(e?e[1]:""),s=(s=C()(o).find(function(t){return t[0].includes("A0004")}))?s[1]:"",l=this.$route.query.fileType||this.params.fileType,s=o.moduleId||s||this.listmoduleId,a=o.masterId||"",i=s+"/"+e,"gw"!=this.type&&"gw"!=l||(i+="/1"),this.type&&(i+="?type=".concat(this.type)),l&&(i+="?type=".concat(l)),"SigninList"==this.$route.name&&(i+="?&listId=1903161124289nXBk8iVSmTMGYxn9bi&exchangeList=signedList"),"db"!=this.type&&"ToOversee"!=l||(i+="&masterId=".concat(a)),o.distribId&&(i+="&distribId=".concat(o.distribId),"2"!=o.readStatus)&&(o.readStatus="2",dsf.http.post("fn/mobileToRead/markRead",{pks:o.distribId}).then(function(t){})),this.spHandleJs&&this.spHandleJs.link&&!this.tabsPage?this.spHandleJs.link(this.listId,s,e,this,o):(l={listId:this.$route.query.listId||(null==(l=this.params)?void 0:l.listId)||this.listId,method:this.$route.query.method||(null==(a=this.params)?void 0:a.method),formId:this.$route.query.formId||(null==(s=this.params)?void 0:s.formId),validateByList:this.$route.query.validateByList||(null==(e=this.params)?void 0:e.validateByList),dataIndex:t.dataValue.dataIndex},o.todoId&&-1<o.todoId.indexOf("_")&&(l.todoId=o.todoId),this.$route.query.activeTab&&(l.activeTab=this.$route.query.activeTab),this.$route.query.validateByList&&(l.validateByList=this.$route.query.validateByList),dsf.config.specialList&&dsf.config.specialList.previewPage&&-1<dsf.config.specialList.previewPage.findIndex(function(t){return t&&n.listId&&t==n.listId})?(M.log("/previewPage/"+i),this.$router.push({path:"/previewPage/"+i,query:{listId:this.listId,method:this.$route.query.method}})):this.tabsPage?(t.dataValue["C-BJ-0004"]=2,this.$router.push({path:"/TabCommonForm/"+this.routeKey+"/"+this.clickTabIndex+"/"+i})):this.$router.push({path:"/commonForm/"+i,query:w()("commonForm"!=this.$route.name?l:{},r)})))))}},getTitle:function(){return this.columns.find(function(t){return"mainTitle"===t.showCategory})||{}},handleCommonClick:function(t,e,n){M.log(t),e.dataValue.allowMobile&&1!=e.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):this.$emit("commonClick",t,e,n)},handleMainClick:function(t,e,n){e.dataValue.allowMobile&&1!=e.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):(this.rowData=e,this.$emit("mainClick",t,e,n))},filterBtn:function(t){return!!(t&&t.commonButton&&0<t.commonButton.length||t&&t.mainButtons&&0<t.mainButtons.length)},titleIconColor:function(t,e){t=t.dataValue[e.showMetaColumn].substr(0,1);return dsf.config.listTitleIcon&&-1<s()(dsf.config.listTitleIcon).indexOf(t)?(e=dsf.config.listTitleIcon[t],{backgroundColor:this.colorRgba(e,.12),color:e,borderColor:e}):""},colorRgba:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,n=t.toLowerCase();if(n&&/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(n)){if(4===n.length){for(var o="#",s=1;s<4;s+=1)o+=n.slice(s,s+1).concat(n.slice(s,s+1));n=o}for(var a=[],i=1;i<7;i+=2)a.push(l()("0x"+n.slice(i,i+2)));return"rgba("+a.join(",")+","+e+")"}return n},subtitleLinkTo:function(t,e){this.spHandleJs&&this.spHandleJs.subtitleLinkTo&&this.spHandleJs.subtitleLinkTo(t,e,this)},templateColumnClick:function(t){this.subtitleLinkTo(t[0],t[1])},showMeetingAdd:function(t){var e;"addressImg"in t.dataValue&&""!=t.dataValue.addressImg&&(t=dsf.url.getServerUrl(t.dataValue.addressImg),(e=[]).push(t),(0,o.Z)({images:e,startPosition:0}))},showMeetingSeat:function(t){var e,n;t.dataValue.seatFileId?(n=dsf.url.getServerUrl("fn/office/openMobileOffice?fileId=".concat(t.dataValue.seatFileId,"&moduleId=").concat(t.dataValue.moduleId,"&nodeId=").concat(t.dataValue.nodeId,"&flowId=").concat(t.dataValue.flowId,"&filename=").concat(t.dataValue.fileName)),(e=[]).push(n),(0,o.Z)({images:e,startPosition:0})):(n=dsf.url.getServerUrl("p1105/190105112112w29SDA3bDIEFCTSKWkd/seatDesign/index.html#/mobileView/hw/".concat(t.dataValue.id,"/").concat(t.dataValue.ryId)),this.$router.push({name:"dsfIframe",params:{url:n,title:"我的位置"}}))},openSwipe:function(t){this.openSwipeNum=t},closeCallback:function(t,e){this.componentName="",this.spHandleJs.closeDialogCallback&&this.spHandleJs.closeDialogCallback(t,e,this.rowData,this)}}},N=(0,n.Z)(T,function(){var o=this,s=o._self._c;return s("div",{class:["2"==o.mobileStyle?"ds-listRow":o.isBtnDrawerShow?"ds-drawer-list":"ds-list"]},[o.isBtnDrawerShow&&o.showTips&&o.openSwipeNum<3?s("div",{staticClass:"ds-drawer-tips"},[s("i"),o._v(" "),s("span",[o._v("左滑显示按钮操作")])]):o._e(),o._v(" "),o._l(o.data,function(n,e){return s("div",{key:n.id||"item-".concat(e),staticClass:"ds-item"},[s("2"==o.mobileStyle?"DsfListRow":o.isBtnDrawerShow?"DsfDrawerCard":"DsfCard",{tag:"component",on:{openSwipe:o.openSwipe}},[o.showCheck?s("div",{attrs:{slot:"tabspageCheck"},slot:"tabspageCheck"},[s("van-checkbox",{attrs:{"icon-size":"16px"},on:{change:function(t){return o.checkChange(n)}},model:{value:n.checked,callback:function(t){o.$set(n,"checked",t)},expression:"item.checked"}})],1):o._e(),o._v(" "),o.htmlTemplate?s("div",{attrs:{slot:"content"},on:{click:function(t){return o.link(n,e)}},slot:"content"},[s("DsListTemplate",{attrs:{html:o.htmlTemplate,dataValue:n.dataValue},on:{columnClick:function(t){return o.templateColumnClick(arguments)}}})],1):[n.dataValue[o.getTitle().showMetaColumn]||o.$route.query.needSerial?s("div",{class:{clamp:o.dsf.config.commonList&&o.dsf.config.commonList.titleEllipsis},attrs:{slot:"header"},on:{click:function(t){return o.link(n,e)}},slot:"header"},[o.$route.query.needSerial?s("span",[o._v(o._s(e+1)+"、")]):o._e(),o._v(" "),o.dsf.config.commonList&&o.dsf.config.commonList.isFideReadStatusIcon||!o.isShowReadStatus(n)?o._e():["triangle"==o.readStatusType?s("span",{staticClass:"readStatus-triangle",style:{borderColor:o.readStatusColor}}):null==o.noGreenIcon?s("span",{staticClass:"isStatus",style:n.dataValue.readStyle||{backgroundColor:o.readStatusColor}}):o._e()],o._v(" "),n.dataValue.backReason?s("img",{staticClass:"jinji",attrs:{src:"static/images/platform/tui.png"}}):o._e(),o._v(" "),o.showJinJi(n)?s("img",{staticClass:"jinji",attrs:{src:o.showJinJi(n)}}):o._e(),o._v(" "),o._l(o.iconBeforeTitles,function(t,e){return[n.dataValue[t.showMetaColumn]?s("span",{key:"iconBeforeTitle-".concat(e),staticClass:"iconBeforeTitle",style:n.dataValue.iconBeforeTitleStyle},[o._v(o._s(n.dataValue[t.showMetaColumn]))]):o._e()]}),o._v(" "),s("span",{class:{"col-title":o.isShowReadStatus(n)},style:n.dataValue.titleStyle||{color:o.getTitle().color||"","word-wrap":"break-word","word-break":"break-all"},domProps:{innerHTML:o._s(n.dataValue[o.getTitle().showMetaColumn])}})],2):o._e(),o._v(" "),s("div",{staticClass:"content",attrs:{slot:"content"},on:{click:function(t){return o.link(n,e)}},slot:"content"},[o._t("item-content",function(){return[0<o.showImgList.length?s("div",{staticClass:"flex1"},[s("div",{staticClass:"clearFloat"},[s("div",{staticClass:"listImg"},[s("img",{attrs:{src:o.getListImg(n)}})]),o._v(" "),s("div",{staticClass:"smallTitle"},[o._l(o.needTitles,function(t,e){return[s("div",{key:"needTitles-".concat(e),staticClass:"subTitle"},[s("span",{staticClass:"name label ellipsis"},[t.icon?s("Icon",{key:"needTitles-".concat(e),class:["iconfont",t.icon]}):o._e(),o._v(o._s(t.showName)+"：\n                                            ")],1),o._v(" "),s("span",{staticClass:"label val elips",style:n.dataValue.subtitleStyle||{color:t.color},domProps:{innerHTML:o._s(n.dataValue[t.showMetaColumn])}})])]})],2)])]):s("div",{staticClass:"flex1"},[0<o.needBoldTitle.length?s("div",{staticClass:"needBoldTitle"},[o._l(o.needBoldTitle,function(t,e){return[o.isShowNullColumn||n.dataValue[t.showMetaColumn]?s("div",{key:"needTitles-".concat(e),staticClass:"subTitle"},[s("span",{staticClass:"name label"},[t.icon?s("Icon",{key:"needTitles-".concat(e),class:["iconfont",t.icon]}):o._e(),o._v(o._s(t.showName)+"："),s("span",{staticClass:"label val",style:n.dataValue.subtitleStyle||{color:t.color},domProps:{innerHTML:o._s(n.dataValue[t.showMetaColumn])}})],1)]):o._e()]})],2):o._e(),o._v(" "),0<o.needTitleSubs.length?s("div",{staticClass:"aSubTitles"},[o._l(o.needTitleSubs,function(t,e){return[s("div",{key:"aSubTitles-".concat(e),staticClass:"subTitle"},[s("span",{staticClass:"label"},[o._v(o._s(t.showName)+"：")]),o._v(" "),s("span",{staticClass:"label",style:n.dataValue.subtitleStyle||{color:t.color}},[o._v(o._s(n.dataValue[t.showMetaColumn]))])])]})],2):o._e(),o._v(" "),0<o.aSubTitles.length?s("div",{staticClass:"aSubTitles"},[o._l(o.aSubTitles,function(t,e){return[s("div",{key:"aSubTitles-".concat(e),staticClass:"subTitle",style:{flex:3==o.aSubTitles.length?"1":""}},[t.icon&&n.dataValue[t.showMetaColumn]?s("Icon",{class:["iconfont",t.icon]}):o._e(),o._v(" "),t.mobileCellText?s("DsListTemplate",{attrs:{html:t.mobileCellText,dataValue:n.dataValue}}):!t.mobileCellText&&o.showSubTitle?s("span",{staticClass:"label",style:n.dataValue.subtitleStyle||{color:t.color}},[o._v(o._s(t.showName)+":")]):s("span",{staticClass:"label",style:n.dataValue.subtitleStyle||{color:t.color},domProps:{innerHTML:o._s(n.dataValue[t.showMetaColumn])}})],1)]})],2):o._e(),o._v(" "),0<o.needTitles.length?s("div",{staticClass:"needTitles"},[o._l(o.needTitles,function(t,e){return[o.isShowNullColumn||n.dataValue[t.showMetaColumn]?s("div",{key:"needTitles-".concat(e),staticClass:"subTitle"},[s("span",{staticClass:"name label ellipsis"},[t.icon?s("Icon",{key:"needTitles-".concat(e),class:["iconfont",t.icon]}):o._e(),o._v(o._s(t.showName)+"：\n                                        ")],1),o._v(" "),s("span",{staticClass:"label val elips",style:n.dataValue.subtitleStyle||{color:t.color},domProps:{innerHTML:o._s(n.dataValue[t.showMetaColumn])}})]):o._e()]})],2):o._e(),o._v(" "),0<o.needTitlesSingleLine.length?s("div",{staticClass:"needTitles needTitlesSingleLine"},[o._l(o.needTitlesSingleLine,function(t,e){return[o.isShowNullColumn||n.dataValue[t.showMetaColumn]?s("div",{key:"needTitlesSingleLine-".concat(e),staticClass:"subTitle"},[s("p",{class:{showImgP:"address"==t.showMetaColumn||"seatNum"==t.showMetaColumn}},[s("span",{staticClass:"name label ellipsis"},[t.icon?s("Icon",{key:"needTitlesSingleLine-".concat(e),class:["iconfont",t.icon]}):o._e(),o._v(o._s(t.showName)+":\n                                            ")],1),o._v(" "),s("span",{staticClass:"label val elips",style:{color:t.color},domProps:{innerHTML:o._s(n.dataValue[t.showMetaColumn])}}),o._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:"address"==t.showMetaColumn&&n.dataValue.addressImg,expression:"column.showMetaColumn == 'address' && item['dataValue']['addressImg']"}],class:{showAddImg:n.dataValue.addressImg},on:{click:function(t){return t.stopPropagation(),o.showMeetingAdd(n)}}}),o._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:"seatNum"==t.showMetaColumn&&(n.dataValue.ryId||n.dataValue.seatFileId),expression:"column.showMetaColumn == 'seatNum' && (item['dataValue']['ryId']||item['dataValue']['seatFileId'])"}],class:{showSeatImg:n.dataValue.seatNum},on:{click:function(t){return t.stopPropagation(),o.showMeetingSeat(n)}}})])]):o._e()]})],2):o._e(),o._v(" "),0<o.titleLinkTo.length?s("div",{staticClass:"needTitles"},[o._l(o.titleLinkTo,function(e,t){return[s("div",{key:"titleLinkTo-".concat(t),staticClass:"subTitle",staticStyle:{"line-height":"0.6rem"},on:{click:function(t){return t.stopPropagation(),o.subtitleLinkTo(n,e.showMetaColumn)}}},[s("span",{staticClass:"name label ellipsis"},[e.icon?s("Icon",{key:"titleLinkTo-".concat(t),class:["iconfont",e.icon]}):o._e(),o._v("\n                                            "+o._s(e.showName)+"：\n                                        ")],1),o._v(" "),s("span",{staticClass:"label val elips",style:n.dataValue.subtitleStyle||{color:e.color,flex:1},domProps:{innerHTML:o._s(n.dataValue[e.showMetaColumn])}}),o._v(" "),s("van-icon",{attrs:{name:"share-o"}})],1)]})],2):o._e(),o._v(" "),0<o.needIconTitles.length?s("div",{staticClass:"needIconTitles"},[o._l(o.needIconTitles,function(t,e){return[s("div",{key:"needIconTitles-".concat(e),staticClass:"subTitle"},[s("span",{staticClass:"name label ellipsis"},[o.isShowColumn(t,n)?s("div",{key:"titleIcon-".concat(e),staticClass:"s_moduleIcon",style:o.titleIconColor(n,t)},[s("span",[o._v(o._s(n.dataValue[t.showMetaColumn].substr(0,1)))])]):o._e(),o._v("\n                                            "+o._s(t.showName)+"：\n                                        ")]),o._v(" "),s("span",{staticClass:"label val elips",style:n.dataValue.subtitleStyle||{color:t.color}},[o._v(o._s(n.dataValue[t.showMetaColumn]))])])]})],2):o._e(),o._v(" "),0<o.bSubTitles.length?s("div",{staticClass:"bSubTitles"},[o._l(o.bSubTitles,function(t,e){return[o.isShowColumn(t,n)?s("div",{key:"bSubTitles-".concat(e),staticClass:"subTitle"},[t.icon?s("Icon",{class:["iconfont",t.icon]}):o._e(),o._v(" "),o.showSubTitle?s("span",{staticClass:"label",style:n.dataValue.subtitleStyle||{color:t.color}},[o._v(o._s(t.showName)+":")]):o._e(),o._v(" "),s("span",{class:["label","ds-elips-".concat(t.showRows||1)],style:n.dataValue.subtitleStyle||{color:t.color}},[o._v(o._s(n.dataValue[t.showMetaColumn]))])],1):o._e()]})],2):o._e(),o._v(" "),o.showProgress?s("ControlProgress",{attrs:{StartTime:n.dataValue[o.StartTime],EndTime:n.dataValue[o.EndTime]}}):o._e()],1),o._v(" "),0<o.titleIcon.length?s("div",[o._l(o.titleIcon,function(t,e){return[o.isShowColumn(t,n)?s("div",{key:"titleIcon-".concat(e),staticClass:"moduleIcon",style:o.titleIconColor(n,t)},[s("span",[o._v(o._s(n.dataValue[t.showMetaColumn].substr(0,1)))])]):o._e()]})],2):o._e()]},{item:n}),o._v(" "),o._t("item-extend",null,{item:n})],2)],o._v(" "),o.isShowListBtn&&o.filterBtn(n.buttons)&&o.dsf.config.commonList&&!o.dsf.config.commonList.isBtnDrawerShow?s("div",{attrs:{slot:o.dsf.config.commonList&&o.dsf.config.commonList.btnToggleShow?"footermin":"footer"},slot:o.dsf.config.commonList&&o.dsf.config.commonList.btnToggleShow?"footermin":"footer"},[o._t("item-footer",function(){return[s("DsfButtonToolbox",{attrs:{buttons:n.buttons||{},more:!0,size:"small"},on:{commonClick:function(t){o.handleCommonClick(t,n,e)},mainClick:function(t){o.handleMainClick(t,n,e)}}})]},{item:{}})],2):o._e(),o._v(" "),0<o.statusIcon.length?s("div",{attrs:{slot:"rightIcon"},slot:"rightIcon"},[o._l(o.statusIcon,function(t,e){return[o.isShowColumn(t,n)?s("DsListTemplate",{attrs:{html:t.mobileCellText,dataValue:n.dataValue}}):o._e()]})],2):o._e(),o._v(" "),o.isShowListBtn&&o.filterBtn(n.buttons)&&o.dsf.config.commonList&&o.dsf.config.commonList.isBtnDrawerShow?s("div",{attrs:{slot:"rightbtn"},slot:"rightbtn"},[o._t("item-footer",function(){return[s("DsfButtonSwipe",{attrs:{buttons:n.buttons||{},more:!0,size:"small"},on:{commonClick:function(t){o.handleCommonClick(t,n,e)},mainClick:function(t){o.handleMainClick(t,n,e)}}})]},{item:{}})],2):o._e()],2)],1)}),o._v(" "),o.data.length||o.$parent.loading?o._e():s("commonempty"),o._v(" "),""!=o.componentName?s("commonDialog",{ref:"commonDialog",attrs:{componentName:o.componentName,"list-data":o.rowData},on:{closeCallback:o.closeCallback}}):o._e(),o._v(" "),s("van-popup",{style:{height:"100%"},attrs:{"close-on-click-overlay":!1,"lock-scroll":"",position:"bottom","get-container":"#app"},model:{value:o.video.showVideo,callback:function(t){o.$set(o.video,"showVideo",t)},expression:"video.showVideo"}},[o.video.showVideo?s("div",[s("VPlayer",{attrs:{video:o.video}})],1):o._e()])],2)},[],!1,null,"77c375ee",null).exports},79156:function(t,e,n){n.d(e,{Z:function(){return s}});var o=n(78149);function s(t){if(o(t))return t}},26511:function(t,e,n){function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,{Z:function(){return o}})},522:function(t,e,n){n.d(e,{Z:function(){return i}});var o=n(79156),u=n(85579),d=n(22013);var s=n(33422),a=n(26511);function i(t,e){return(0,o.Z)(t)||function(t,e){var n=null==t?null:void 0!==u&&t[d]||t["@@iterator"];if(null!=n){var o,s,a,i,l=[],r=!0,c=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;r=!1}else for(;!(r=(o=a.call(n)).done)&&(l.push(o.value),l.length!==e);r=!0);}catch(t){c=!0,s=t}finally{try{if(!r&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(c)throw s}}return l}}(t,e)||(0,s.Z)(t,e)||(0,a.Z)()}}}]);