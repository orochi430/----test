(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[26599],{82072:function(t,e){"use strict";e.Z={methods:{test:function(){dsf.layer.toast("调用成功")}}}},19446:function(t,e,s){"use strict";s.d(e,{Z:function(){return o}});var e=s(25540),n=s(77508),i=s(70538),n={components:{applicationItem:n.Z,collapseTransition:e.Z},props:{menu:{type:Object,default:function(){return{badge:"",child:[],img:"",name:"",props:"",router:"",showClickTip:"",imgStyle:"{}",style:"{}",type:""}}},showIcon:{type:Boolean,default:!0},isHideTitle:{type:Boolean,default:!1},maxRows:{type:Number},rowNum:{type:Number,default:4},padStyle:{type:Boolean,default:!1}},data:function(){return{showMoreMenu:!1,isMaxRowsMenu:!1}},computed:{isShowCard:function(){return this.menu.child.some(function(t){return t.isshow})},isShowComponent:function(){return""!=this.menu.props&&""!=this.menu.props.components},alwaysShowChildren:function(){var t=this.maxRows?this.maxRows*this.rowNum:this.menu.child.length;return this.menu.child.filter(function(t){return t.isshow}).slice(0,t)},collapseChildren:function(){var t=this.maxRows?this.maxRows*this.rowNum:this.menu.child.length;return this.menu.child.filter(function(t){return t.isshow}).slice(t)}},beforeCreate:function(){var n=s(69759);n.keys().forEach(function(t){var e=n(t),t=(t=t.replace(/^\.\//,"").replace(/\.\w+$/,"")).charAt(0).toUpperCase()+t.slice(1);i.default.component(t,e.default||e)})},created:function(){this.maxRows&&this.menu.child.filter(function(t){return t.isshow}).length>this.rowNum*this.maxRows&&(this.showMoreMenu=!0,this.isMaxRowsMenu=!0)},mounted:function(){},methods:{collapse:function(){this.showMoreMenu=!this.showMoreMenu}}},o=(0,s(51900).Z)(n,function(){var n=this,s=n._self._c;return n.isShowCard?s("div",{staticClass:"card"},[n.isHideTitle?n._e():s("div",{class:["title",n.showIcon?"showIcon":"","flex","jb","ac"]},[s("span",[n._v(n._s(n.menu.name))]),n._v(" "),n.isMaxRowsMenu&&!n.isShowComponent?s("span",{staticClass:"maxRowsMenu",on:{click:function(t){return n.collapse()}}},[n._v("\n      "+n._s(n.showMoreMenu?"展开":"收缩")+"\n      "),s("van-icon",{staticStyle:{"margin-left":"5px"},attrs:{name:n.showMoreMenu?"arrow-down":"arrow-up"}})],1):n._e()]),n._v(" "),n.isShowCard&&n.isShowComponent?s(n.menu.props.components,{tag:"component",attrs:{menu:n.menu}}):s("div",[s("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},n._l(n.alwaysShowChildren,function(t,e){return t.isshow?s("application-item",{key:e,attrs:{rowNum:n.rowNum,data:t,padStyle:n.padStyle}}):n._e()}),1),n._v(" "),n.isMaxRowsMenu?s("collapseTransition",[s("div",{directives:[{name:"show",rawName:"v-show",value:!n.showMoreMenu,expression:"!showMoreMenu"}],staticClass:"dsf-list",staticStyle:{display:"flex"},style:{marginTop:n.isHideTitle?"0.3rem":0,paddingTop:"0.1rem"}},n._l(n.collapseChildren,function(t,e){return t.isshow?s("application-item",{key:e,attrs:{rowNum:n.rowNum,data:t,padStyle:n.padStyle}}):n._e()}),1)]):n._e()],1)],1):n._e()},[],!1,null,"794c1528",null).exports},77508:function(t,e,n){"use strict";n.d(e,{Z:function(){return a}});var e=n(79529),o=n.n(e),e=n(8450),s=n.n(e),e=n(82072),i=n(25108),e={name:"applicationItem",mixins:[e.Z],props:{data:{type:Object,default:function(){return{badge:"",child:[],img:"",name:"",props:"",router:"",showClickTip:"",imgStyle:"{}",style:"{}",type:""}}},rowNum:{type:Number,default:4},padStyle:{type:Boolean,default:!1},needTip:{type:Boolean,default:!0},isSubMenu:{type:Boolean,default:!1}},data:function(){return{showSubmenu:!1,submenu:{name:"",child:[]},maxPopMenuLength:dsf.config.appSelect.maxPopMenuLength,rowNumber:0,screenWidth:null,reOpenSubmenu:!1}},watch:{screenWidth:{handler:function(t){this.rowNumber=Math.round(t/220)},immediate:!0,deep:!0}},computed:{singleRowPopMenu:function(){return!!this.maxPopMenuLength&&this.submenu.child.length>this.maxPopMenuLength}},filters:{badgeCount:function(t){return 100<t?"99+":t<1?"":t}},created:function(){this.getBadge()},mounted:function(){this.screenWidth=document.body.clientWidth,window.addEventListener("resize",this.renderResize,!1)},activated:function(){this.getBadge(),this.reOpenSubmenu&&(this.goRoute(this.data),this.reOpenSubmenu=!1)},methods:{renderResize:function(){this.screenWidth=document.body.clientWidth},getBadge:function(){var i=this;this.data.badgeNum=0,this.data.badge&&dsf.http.postUrls(this.data.badge,{}).then(function(t){for(var e=0;e<t.length;e++){var n=t[e].data,s=n.total||n.badge||(null==(s=n.data)?void 0:s.badge)||n.data;i.data.badgeNum+=isNaN(s)?0:o()(s)}})},goRoute:function(t){var e=this;t.props&&t.props.action?this[t.props.action]?this[t.props.action]():dsf.layer.toast("请开发对应方法"):setTimeout(function(){e.isSubMenu&&(e.$parent.$parent.reOpenSubmenu=!0),0<t.child.length?(e.showSubmenu=!0,e.submenu=t):""==t.router||null==t.router?e.needTip&&dsf.layer.alert({message:t.showClickTip||"当前菜单配置错误，请联系管理员！"}):t.type&&3==t.type?e.openDDApp(t.router):2==t.type?t.props&&"1"==t.props.authorize?dsf.middleground.openUrl({url:t.router,title:t.name,isOpenWebview:"1"==t.props.OpenWebView,getCodeParams:{appCode:t.props.appCode}}):dsf.config.ddSetting.isDing?dd.biz?dd.biz.util.openLink({url:t.router,onSuccess:function(t){},onFail:function(t){}}):dd.openLink({url:t.router}).then(function(t){i.log(t)}).catch(function(t){}):window.wx?wx.invoke("openUrl",{type:0,url:t.router},function(t){t.err_msg}):t.props&&"1"==t.props.OpenWebView?dsf.util.openWebviewToUrl({url:t.router,title:t.name}):t.props&&"1"==t.props.OpenLocationHref?location.href=t.router:e.$router.push({name:"dsfIframe",query:{url:t.router,title:t.name}}):t.props?t.props.props&&e.$router.push({path:t.router,query:JSON.parse(s()(t.props))}):e.$router.push({path:t.router,query:{title:t.name}})},100)},openDDApp:function(t){dd.biz.microApp.openApp({agentId:t,onSuccess:function(t){},onFail:function(t){}})}}},a=(0,n(51900).Z)(e,function(){var n=this,s=n._self._c;return s("div",{class:["menu","menu_".concat(n.rowNum),{padStyle:n.padStyle}],style:{width:n.padStyle?"".concat(100/n.rowNumber,"%"):"".concat(100/n.rowNum,"%")}},[n.padStyle?s("div",{staticClass:"padStyle_box",on:{click:function(t){return n.goRoute(n.data)}}},[s("img",{staticClass:"padStyle_img",style:n.data.imgStyle,attrs:{src:n.data.img,alt:""}}),n._v(" "),s("span",{staticClass:"padStyle_text",style:n.data.style,domProps:{innerHTML:n._s(n.data.name)}}),n._v(" "),n.data.badgeNum?s("div",{staticClass:"badge"},[n._v("\n      "+n._s(n._f("badgeCount")(n.data.badgeNum))+"\n    ")]):n._e()]):s("div",{on:{click:function(t){return n.goRoute(n.data)}}},[s("img",{style:n.data.imgStyle,attrs:{src:n.data.img,alt:""}}),n._v(" "),s("p",{style:n.data.style,domProps:{innerHTML:n._s(n.data.name)}}),n._v(" "),n.data.badgeNum?s("div",{staticClass:"badge"},[n._v("\n      "+n._s(n._f("badgeCount")(n.data.badgeNum))+"\n    ")]):n._e()]),n._v(" "),s("van-popup",{staticClass:"submenuContainer",attrs:{"overlay-class":"submenuOverlay","get-container":"#app"},on:{click:function(t){n.showSubmenu=!1,n.reOpenSubmenu=!1}},model:{value:n.showSubmenu,callback:function(t){n.showSubmenu=t},expression:"showSubmenu"}},[s("div",{staticClass:"submenuTitle"},[n._v(n._s(n.submenu.name))]),n._v(" "),s("div",{staticClass:"submenuBox"},[0<n.submenu.child.length?s("div",{class:[n.singleRowPopMenu?"singleRow":"dsf-list"]},n._l(n.submenu.child,function(t,e){return s("application-item",{key:e,attrs:{data:t,rowNum:n.singleRowPopMenu?1:3,isSubMenu:!0}})}),1):n._e()])])],1)},[],!1,null,"3070b062",null).exports},7427:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return a}});n(99780),n(59231),n(70140);var e=n(27593),s=(n(69773),n(27398)),i=n(77508),o=n(70538);o.default.use(s.Z),o.default.use(e.Z);var s={components:{applicationItem:i.Z},props:{menu:{type:Object,default:function(){return{badge:"",child:[],img:"",name:"",props:"",router:"",showClickTip:"",imgStyle:"{}",style:"{}",type:""}}},showIcon:{type:Boolean,default:!0},isHideTitle:{type:Boolean,default:!1},maxRows:{type:Number},rowNum:{type:Number,default:4}},data:function(){return{showMoreMenu:!1,isMaxRowsMenu:!1,jwloginsso:dsf.config.login.jwloginsso||"",classinfo:{classname:"",classid:"",selname:"",selid:"",classlist:[],showPicker:!1,bclistIndex:0,defaultIndex:0},menunumlist:[]}},computed:{isShowCard:function(){return this.menu.child.some(function(t){return t.isshow})},alwaysShowChildren:function(){var t=this.maxRows?this.maxRows*this.rowNum:this.menu.child.length;return this.menu.child.filter(function(t){return t.isshow}).slice(0,t)},collapseChildren:function(){var t=this.maxRows?this.maxRows*this.rowNum:this.menu.child.length;return this.menu.child.filter(function(t){return t.isshow}).slice(t)},pageSize:function(){return(this.maxRows||2)*this.rowNum},pages:function(){return Math.ceil(this.alwaysShowChildren.length/this.pageSize)},menuList:function(){for(var t=this.alwaysShowChildren,e=[],n=this.pageSize,s=0;s<this.pages;s++)e.push(t.slice(s*n,s*n+n));return e}},created:function(){this.maxRows&&this.menu.child.filter(function(t){return t.isshow}).length>this.rowNum*this.maxRows&&(this.showMoreMenu=!0,this.isMaxRowsMenu=!0),this.getJwMessage()},mounted:function(){},methods:{collapse:function(){this.showMoreMenu=!this.showMoreMenu},getJwMessage:function(){var n=this;window.addEventListener("message",function(t){var e;t.data&&t.data.type&&("getNum"==(t=t.data).type&&(e=t.list,n.menunumlist=e,n.setMenuNum()),"getClass"==t.type&&(n.classinfo.classlist=[],t.list.forEach(function(t,e){1==t.checked&&(n.classinfo.classname=t.bcmc,n.classinfo.classid=t.bcid,n.classinfo.defaultIndex=e),n.classinfo.classlist.push({bcmc:t.bcmc,bcid:t.bcid})})),"turnBcSuccess"==t.type&&(dsf.layer.closeLoading(n.loadingIndx),n.classinfo.classname=n.classinfo.selname,n.classinfo.classid=n.classinfo.selid,n.classinfo.showPicker=!1),"turnBcFailed"==t.type)&&(dsf.layer.closeLoading(n.loadingIndx),dsf.layer.toast("班次切换失败",!1))})},showClassPicker:function(){this.classinfo.selname=this.classinfo.classname,this.classinfo.selid=this.classinfo.classid,this.classinfo.showPicker=!0},selClass:function(t){this.classinfo.selname=t.bcmc,this.classinfo.selid=t.bcid},confirmClass:function(){this.loadingIndx=dsf.layer.loading("切换中...");var t=$(".hideiframe")[0].contentWindow,e={type:"turnbc",id:this.classinfo.selid};t.postMessage(e,"*")},cancleClass:function(){this.classinfo.showPicker=!1},setMenuNum:function(){var t,s,i=this,e=this,n=e.menunumlist;e.alwaysShowChildren.length>e.pageSize?(t=e.menuList,n.forEach(function(e){var n=e.appsubscript;t.forEach(function(t){t.forEach(function(t){t.name==n&&i.$set(t,"badgeNum",e.number)})})})):(s=e.alwaysShowChildren,n.forEach(function(e){var n=e.appsubscript;s.forEach(function(t){t.name==n&&i.$set(t,"badgeNum",e.number)})}))}}},a=(0,n(51900).Z)(s,function(){var n=this,s=n._self._c;return s("div",[n.classinfo.classname?s("div",{staticClass:"tabClass"},[s("label",{staticClass:"classname"},[n._v(n._s(n.classinfo.classname))]),n._v(" "),s("van-button",{staticClass:"btn",attrs:{type:"info"},on:{click:n.showClassPicker}},[n._v("切换")])],1):n._e(),n._v(" "),n.alwaysShowChildren.length>n.pageSize?s("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},[s("van-swipe",{attrs:{loop:!1}},n._l(n.menuList,function(t,e){return s("van-swipe-item",{key:e},n._l(t,function(t,e){return s("application-item",{key:e,attrs:{data:t}})}),1)}),1)],1):s("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},n._l(n.alwaysShowChildren,function(t,e){return t.isshow?s("application-item",{key:e,attrs:{data:t}}):n._e()}),1),n._v(" "),s("van-popup",{staticClass:"class-popup",style:{height:"100%"},attrs:{position:"bottom",round:""},model:{value:n.classinfo.showPicker,callback:function(t){n.$set(n.classinfo,"showPicker",t)},expression:"classinfo.showPicker"}},[s("div",{staticClass:"tit-box"},[s("h5",[n._v("选择班次")]),n._v(" "),s("div",{staticClass:"btns"},[0<n.classinfo.classlist.length?s("span",{staticClass:"sure-btn",on:{click:n.confirmClass}},[n._v("确认")]):n._e(),n._v(" "),s("span",{staticClass:"cancle-btn",on:{click:n.cancleClass}},[n._v("取消")])])]),n._v(" "),s("div",{staticClass:"bcist-con"},[0<n.classinfo.classlist.length?s("ul",{staticClass:"sidebar-content"},[n._l(n.classinfo.classlist,function(e,t){return[s("li",{key:t,class:[n.classinfo.selid==e.bcid?"active":""],on:{click:function(t){return n.selClass(e)}}},[n._v(n._s(e.bcmc))])]})],2):s("div",{staticClass:"sidebar-content nodata"},[s("commonempty")],1)])]),n._v(" "),n.jwloginsso?s("iframe",{staticClass:"hideiframe",attrs:{src:n.jwloginsso}}):n._e()],1)},[],!1,null,"560de626",null).exports},87772:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return s}});var e={components:{applicationItem:n(77508).Z},props:{menu:{type:Object,default:function(){return{badge:"",child:[],img:"",name:"",props:"",router:"",showClickTip:"",imgStyle:"{}",style:"{}",type:""}}},showIcon:{type:Boolean,default:!0},isHideTitle:{type:Boolean,default:!1},maxRows:{type:Number},rowNum:{type:Number,default:4}},data:function(){return{showMoreMenu:!1,isMaxRowsMenu:!1,jwloginsso:dsf.config.login.jwloginsso||"",menunumlist:[]}},computed:{isShowCard:function(){return this.menu.child.some(function(t){return t.isshow})},alwaysShowChildren:function(){var t=this.maxRows?this.maxRows*this.rowNum:this.menu.child.length;return this.menu.child.filter(function(t){return t.isshow}).slice(0,t)},collapseChildren:function(){var t=this.maxRows?this.maxRows*this.rowNum:this.menu.child.length;return this.menu.child.filter(function(t){return t.isshow}).slice(t)}},created:function(){this.maxRows&&this.menu.child.filter(function(t){return t.isshow}).length>this.rowNum*this.maxRows&&(this.showMoreMenu=!0,this.isMaxRowsMenu=!0),this.getJwMessage()},mounted:function(){},methods:{collapse:function(){this.showMoreMenu=!this.showMoreMenu},getJwMessage:function(){var e=this;window.addEventListener("message",function(t){t.data&&t.data.type&&"getNum"==(t=t.data).type&&(t=t.list,e.menunumlist=t,e.setMenuNum())})},setMenuNum:function(){var s=this,t=this.menunumlist,i=this.alwaysShowChildren;t.forEach(function(e){var n=e.appsubscript;i.forEach(function(t){t.name==n&&s.$set(t,"badgeNum",e.number)})})}}},s=(0,n(51900).Z)(e,function(){var n=this,s=n._self._c;return s("div",[s("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},n._l(n.alwaysShowChildren,function(t,e){return t.isshow?s("application-item",{key:e,attrs:{data:t}}):n._e()}),1),n._v(" "),n.jwloginsso?s("iframe",{staticClass:"hideiframe",attrs:{src:n.jwloginsso}}):n._e()])},[],!1,null,"d2b909bc",null).exports},26599:function(t,e,n){"use strict";n.d(e,{Z:function(){return w}});var e=n(26243),i=n.n(e),e=n(62680),o=n.n(e),e=n(95366),a=n.n(e),e=n(6919),s=n.n(e),u=n(66250),r=n(77193),e=n(73473),l=n.n(e),e=n(33453),c=n.n(e),e=n(77508),d=n(25108),e={components:{applicationItem:e.Z},props:{title:{type:String,default:"我的应用"},showIcon:{type:Boolean,default:!0},menu:{type:Array,default:function(){return[]}},countNum:{type:Number||null,default:null},rowNum:{type:Number,default:4}},data:function(){return{}},created:function(){d.log("this.countNum: ",this.countNum)},methods:{toSet:function(){this.$router.push({path:"/myMenuSetting".concat(this.countNum?"?num="+this.countNum:"")})}}},h=n(51900),e=(0,h.Z)(e,function(){var n=this,s=n._self._c;return s("div",{staticClass:"card"},[s("div",{class:["title",n.showIcon?"showIcon":"","flex","jb","ac"]},[s("span",[n._v(n._s(n.title))]),n._v(" "),s("span",{staticClass:"right flex ac",on:{click:function(t){return n.toSet()}}},[s("van-icon",{attrs:{name:"setting-o"}})],1)]),n._v(" "),0<n.menu.length?s("div",{staticClass:"dsf-list"},n._l(n.menu,function(t,e){return t.isshow?s("application-item",{key:e,attrs:{rowNum:n.rowNum,data:t}}):n._e()}),1):s("div",{staticClass:"noApp",on:{click:function(t){return n.toSet()}}},[n._v("\n    请增加应用\n    "),s("span",[n._v("+")])])])},[],!1,null,"1ec71e66",null).exports,m=n(19446),n=n(20629);function p(e,t){var n,s=i()(e);return o()&&(n=o()(e),t&&(n=n.filter(function(t){return a()(e,t).enumerable})),s.push.apply(s,n)),s}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):s()?Object.defineProperties(e,s()(n)):p(Object(n)).forEach(function(t){Object.defineProperty(e,t,a()(n,t))})}return e}var m={components:{applicationCard:m.Z,myApplicationCard:e},props:["itemdata"],data:function(){var t;return{myMenus:[],maxRows:dsf.config.appSelect.maxRows,isShowMyMenus:!(null==(t=dsf.config.appSelect)||!t.isShowMyMenus),myMenusIndex:(null==(t=dsf.config.homePage)||null==(t=t.menuSetting)?void 0:t.myMenuIndex)||0,isShowTab:!(null==(t=dsf.config.appSelect)||!t.isShowTab),active:0,isRepeatShow:!(null==(t=dsf.config.appSelect)||!t.isRepeatShow),isSetUserShortcutDing:!!dsf.config.appSelect.setUserShortcutDing,fontMultiple:dsf.util.loadLocalStore("multiple")}},computed:f(f({showIcon:function(){return this.itemdata.params.showIcon},padStyle:function(){var t;return!(null==(t=this.itemdata.params)||!t.usePadRowStyle)&&(null==(t=this.itemdata.params)?void 0:t.usePadRowStyle)},rowNum:function(){var t="mobile"==dsf.config.clientType?Number(this.itemdata.params.mobileRowNumber)||4:Number(this.itemdata.params.padRowNumber)||4,t=6<=this.fontMultiple?t-1:t;return this.$store.dispatch("applications/setRowNum",t),t},countNum:function(){var t;return null!=(t=this.itemdata.params)&&t.showMenuCount?Number(this.itemdata.params.showMenuCount):null},showType:function(){var t;return null==(t=this.itemdata.params)?void 0:t.showType},myMenusName:function(){var t;return(null==(t=this.itemdata.params)?void 0:t.showName)||(null==(t=dsf.config.appSelect)?void 0:t.selectName)||"我的应用"},justShowMyMenus:function(){var t;return null==(t=this.itemdata.params)?void 0:t.justShowMyMenus}},(0,n.rn)({storeMainMenu:function(t){return t.applications.menus},storeMyMenu:function(t){return t.applications.myMenus}})),{},{mainMenu:function(){var e=this;return this.showType?this.storeMainMenu.filter(function(t){return t.name==e.showType}):this.storeMainMenu},isHideTitle:function(){return 1==this.mainMenu.length&&dsf.config.appSelect.isHideTitle},outsideTitle:function(){var t;return!(null==(t=this.itemdata.params)||!t.outsideTitle)},positionTab:function(){var t;return(null==(t=this.itemdata.params)?void 0:t.positionTab)||{}},offsetTop:function(){return this.positionTab.offsetTop||0},isShowEmpty:function(){var t;return!(!this.mainMenu.length||(t=this.mainMenu.reduce(function(t,e){return t+e.child.length},0),this.isShowMyMenus)||this.justShowMyMenus||t)&&(null==(t=this.itemdata.params)?void 0:t.isShowEmpty)}}),created:function(){this.getMenu()},mounted:function(){this.positionTab.alwaysShow||setTimeout(function(){$(".menu-tab .van-tabs__wrap").css("display","none")},100)},activated:function(){this.isSetUserShortcutDing?this.myMenus=this.storeMyMenu:this.myMenus=dsf.util.loadLocalStore("mySetting"),this.fontMultiple=dsf.util.loadLocalStore("multiple")},methods:{getMenu:function(){var e=this;return(0,u.Z)(c().mark(function t(){return c().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getMyMenus();case 2:e.getAllMenus();case 3:case"end":return t.stop()}},t)}))()},getMyMenus:function(){var s=this;return new(l())(function(n,t){s.isSetUserShortcutDing?dsf.http.post("fn/newFile/shortcutDing",{type:"common"}).then(function(t){var e=[];s.forFunc(t.data.data,e),s.myMenus=e,s.$store.dispatch("applications/setMyMenus",e),n()}):dsf.util.loadLocalStore("mySetting")?(s.myMenus=dsf.util.loadLocalStore("mySetting"),n()):dsf.http.post("fn/newFile/shortcutDing",{type:"common"}).then(function(t){var e=[];s.forFunc(t.data.data,e),s.myMenus=e,dsf.util.saveToLocalStore("mySetting",s.myMenus),n()})})},getAllMenus:function(){var n=this;this.storeMainMenu.length||dsf.http.post("fn/newFile/shortcutDing",{}).then(function(t){var e=[],t=t.data.data.filter(function(t){return-1<t.displayPosition.indexOf("work")});n.forFunc(t,e),n.$store.dispatch("applications/setMenus",e)})},forFunc:function(t,s){var i=this;t.forEach(function(t){var e,n;-1!=t.displayPosition.indexOf("work")&&(e=i.setMenuItem(t),(n=i.myMenus.find(function(t){return t.name==e.name}))&&(n.isExist=!0,e.hasMyMenu=!0),e.isshow=i.isRepeatShow||!e.hasMyMenu,s.push(e),0<(null==(n=t.children)?void 0:n.length))&&i.forFunc(t.children,e.child)})},setMenuItem:function(e){try{e.agentid&&(e.agentid=JSON.parse(e.agentid))}catch(t){e.agentid={}}return{name:e.shortcutName,badge:e.tip,badgeNum:0,router:e.actUrl?dsf.util.getReplaceUrl(e.actUrl.trim()):"",img:e.shortcutIcon,props:e.agentid,type:e.shortcutType,showClickTip:e.gntsyText,child:[],imgStyle:dsf.config.homePage.menuSetting&&dsf.config.homePage.menuSetting.imgStyle?dsf.config.homePage.menuSetting.imgStyle:"{}",style:dsf.config.homePage.menuSetting&&dsf.config.homePage.menuSetting.itemStyle?dsf.config.homePage.menuSetting.itemStyle:"{}",isshow:!0,id:e.id,guid:this.guid()}},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})},change:function(t){t.isFixed&&this.$refs.tabs.resize()}}},w=(0,h.Z)(m,function(){var n=this,s=n._self._c;return s("div",{staticClass:"text"},[n.isShowTab?[n.isShowMyMenus||n.justShowMyMenus?s("my-application-card",{class:{"title-outside":n.outsideTitle},attrs:{menu:n.myMenus,showIcon:n.showIcon,isHideTitle:n.isHideTitle,title:n.myMenusName,rowNum:n.rowNum,countNum:n.countNum}}):n._e(),n._v(" "),n.justShowMyMenus?n._e():s("van-tabs",{ref:"tabs",class:["menu-tab",{"theme-tab":n.positionTab.useTheme}],attrs:{"line-width":n.active.length+"em",scrollspy:"",sticky:"","offset-top":n.dsf.util.getOffsetTop(n.offsetTop)},on:{scroll:n.change},model:{value:n.active,callback:function(t){n.active=t},expression:"active"}},n._l(n.mainMenu,function(t,e){return 0<t.child.filter(function(t){return t.isshow}).length?s("van-tab",{key:e,attrs:{title:t.name,name:t.name}},[s("application-card",{class:{"title-outside":n.outsideTitle},attrs:{menu:t,showIcon:n.showIcon,isHideTitle:n.isHideTitle,maxRows:n.maxRows,rowNum:n.rowNum,padStyle:n.padStyle}})],1):n._e()}),1),n._v(" "),n.isShowEmpty?s("van-empty",{attrs:{description:"暂无菜单权限",image:"static/images/empty.png"}}):n._e()]:s("div",[n.justShowMyMenus?s("my-application-card",{class:{"title-outside":n.outsideTitle},attrs:{menu:n.myMenus,showIcon:n.showIcon,isHideTitle:n.isHideTitle,title:n.myMenusName,rowNum:n.rowNum,countNum:n.countNum}}):n._e(),n._v(" "),n._l(n.mainMenu,function(t,e){return n.justShowMyMenus?n._e():[n.isShowMyMenus&&n.myMenusIndex==e?s("my-application-card",{class:{"title-outside":n.outsideTitle},attrs:{menu:n.myMenus,showIcon:n.showIcon,isHideTitle:n.isHideTitle,rowNum:n.rowNum,title:n.myMenusName}}):n._e(),n._v(" "),s("application-card",{class:{"title-outside":n.outsideTitle},attrs:{menu:t,showIcon:n.showIcon,isHideTitle:n.isHideTitle,maxRows:n.maxRows,rowNum:n.rowNum,padStyle:n.padStyle}})]}),n._v(" "),n.isShowEmpty?s("van-empty",{attrs:{description:"暂无菜单权限",image:"static/images/empty.png"}}):n._e()],2)],2)},[],!1,null,"454de464",null).exports},69759:function(t,e,n){var s={"./classmanage.vue":7427,"./setbadgenum.vue":87772};function i(t){t=o(t);return n(t)}function o(t){if(n.o(s,t))return s[t];throw(t=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",t}i.keys=function(){return Object.keys(s)},i.resolve=o,(t.exports=i).id=69759},25540:function(t,e){"use strict";const n="0.3s height ease-in-out",s={beforeEnter(t){t.style.transition=n,t.dataset||(t.dataset={}),t.style.height=0},enter(t){0!==t.scrollHeight?t.style.height=t.scrollHeight+"px":t.style.height="",t.style.overflow="hidden"},afterEnter(t){t.style.transition="",t.style.height=""},beforeLeave(t){t.dataset||(t.dataset={}),"flex"!==t.style.display&&(t.style.display="block"),t.style.height=t.scrollHeight+"px",t.style.overflow="hidden"},leave(t){0!==t.scrollHeight&&(t.style.transition=n,t.style.height=0)},afterLeave(t){t.style.transition="",t.style.height=""}};e.Z={name:"CollapseTransition",functional:!0,render(t,{children:e}){return t("transition",{on:s},e)}}}}]);