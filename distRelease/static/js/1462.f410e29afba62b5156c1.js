"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[1462],{1462:function(t,e,n){n.r(e),n.d(e,{default:function(){return l}});var i=n(66250),e=n(8450),s=n.n(e),e=n(33453),o=n.n(e),a=n(88561),r=n(25108),e={props:["menus","commonMenus"],data:function(){return{dragOptions:{delay:50,scrollFn:this.scrollFn},isShaky:!1,myMenus:this.commonMenus,mainMenu:[]}},components:{draggable:function(){return n.e(9980).then(n.t.bind(n,82021,23))}},mounted:function(){var n=this;this.myMenus.length;this.menus.forEach(function(t){t.child.forEach(function(e){0<n.myMenus.filter(function(t){return t.name==e.name}).length?e.isshow=!1:e.isshow=!0,e.guid=n.guid()})}),this.mainMenu=JSON.parse(s()(this.menus))},methods:{scrollFn:function(t,e,n,s,i){},onMove:function(t){var e=t.relatedContext,t=t.draggedContext,e=e.element,t=t.element;return!(e&&e.fixed||t.fixed)},chooseFn:function(){this.isShaky=!this.isShaky},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})},deleteSelect:function(e,t){this.myMenus.splice(t,1),e.isshow=!0,this.mainMenu.forEach(function(t){t.child.forEach(function(t){t.name==e.name&&(t.isshow=!0)})}),r.log("tag",this.myMenus.length)},add:function(t,e,n){t.isshow=!1,this.myMenus.push(t),r.log("tag",this.myMenus.length)},done:function(){var e=this;a.Z.saveToLocalStore("mySetting",this.myMenus.filter(function(t){return 1!=t.empty})),dsf.http.post("fn/newFile/setUserShortcutDing",{ids:this.myMenus.map(function(t){return t.id}).join(","),pageId:this.$route.query.currentPortalId}).then(function(t){200==t.data.code&&e.$emit("done")})},cancel:function(){this.$emit("cancel")}}},c=n(51900),e=(0,c.Z)(e,function(){var i=this,o=i._self._c;return o("div",{staticClass:"selectAppBox"},[o("van-nav-bar",{attrs:{title:"管理常用服务","left-text":"取消","right-text":"完成"},on:{"click-left":i.cancel,"click-right":i.done}}),i._v(" "),o("div",{staticClass:"candan-item"},[i._m(0),i._v(" "),o("div",{staticClass:"myAppBox"},[o("draggable",{attrs:{move:i.onMove,options:i.dragOptions},on:{start:i.chooseFn,end:i.chooseFn},model:{value:i.myMenus,callback:function(t){i.myMenus=t},expression:"myMenus"}},[o("transition-group",{staticClass:"cells",attrs:{type:"transition",tag:"div",name:"flip-list"}},i._l(i.myMenus,function(e,n){return o("div",{key:e.guid,staticClass:"item-cell"},[e.empty?o("van-icon",{attrs:{name:"add-o",size:"50",color:"#ddd"}}):i._e(),i._v(" "),e.empty?i._e():o("img",{class:{shaky:i.isShaky},attrs:{src:e.img}}),i._v(" "),o("div",{staticClass:"right"},[o("p",{staticClass:"name",domProps:{innerHTML:i._s(e.name)}}),i._v(" "),o("p",{staticClass:"sub elps"},[i._v(i._s(e.gntsyText))])]),i._v(" "),o("div",{staticClass:"icon-container"},[e.empty?i._e():o("van-icon",{attrs:{name:"clear",color:"#F55540"},on:{mousedown:function(t){return t.stopPropagation(),i.deleteSelect(e,n)}}})],1)],1)}),0)],1)],1)]),i._v(" "),o("div",{staticClass:"f_b"},i._l(i.mainMenu,function(s,t){return o("div",{key:t,staticClass:"candan-item"},[0<s.child.length?o("div",{staticClass:"title"},[o("span",[i._v(i._s(s.name))])]):i._e(),i._v(" "),0<s.child.length?o("div",{staticClass:"cells"},i._l(s.child,function(e,n){return o("div",{directives:[{name:"show",rawName:"v-show",value:e.isshow,expression:"subItem.isshow"}],key:n,staticClass:"item-cell",on:{click:function(t){return i.add(e,n,s)}}},[o("img",{attrs:{src:e.img}}),i._v(" "),o("div",{staticClass:"right"},[o("p",{staticClass:"name",domProps:{innerHTML:i._s(e.name)}}),i._v(" "),o("p",{staticClass:"sub elps"},[i._v(i._s(e.gntsyText))])]),i._v(" "),o("div",{staticClass:"icon-container"},[e.empty?i._e():o("van-icon",{attrs:{name:"add",color:"#188CF9"}})],1)])}),0):i._e()])}),0)],1)},[function(){var t=this._self._c;return t("div",{staticClass:"title"},[t("span",[this._v("常用服务")]),this._v(" "),t("span",{staticStyle:{float:"right","font-size":"var(--font_size_4)",color:"#666"}},[this._v("\n            长按拖动排序\n        ")])])}],!1,null,"10aecddb",null).exports,u=n(25108),l=(0,c.Z)({name:"moduleIndex",data:function(){return{isHideTitle:!1,user:dsf.util.loadSessionStore("user")||{},default_img:'this.src="'+n(94243)+'"',meetingMenu:[],studyMenu:[],partyBuildMenu:[],docManagenMenu:[],SupervisionMenu:[],letMaMenu:[],streeTownMenu:[],settingModel:!1,isShowMyMenus:!1,mainMenu:[],myMenus:[],searchVal:"",local_menu:[],showTipMessage:"",showTip:!1,showSubmenu:!1,submenu:{name:"",child:[]}}},watch:{searchVal:function(e){""!=e?(this.mainMenu.forEach(function(t){t.child.forEach(function(t){-1==t.name.indexOf(e)?t.isshow=!1:t.isshow=!0})}),this.myMenus.forEach(function(t){-1==t.name.indexOf(e)?t.isshow=!1:t.isshow=!0})):(this.mainMenu.forEach(function(t){t.child.forEach(function(t){t.isshow=!0})}),this.myMenus.forEach(function(t){t.isshow=!0}))}},methods:{closeTip:function(){this.showTipMessage="",this.showTip=!1},cancel:function(){this.settingModel=!1},getMenu:function(){var s=this;return(0,i.Z)(o().mark(function t(){var n,e;return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=s,e=[],t.next=4,dsf.http.post("fn/newFile/shortcutDing",{type:"common",pageId:s.$route.query.currentPortalId}).then(function(t){u.log(t);t=t.data.data.map(function(t){return{id:t.id,name:t.shortcutName,badge:t.tip,router:t.actUrl.trim(),img:dsf.url.getServerUrl(t.shortcutIcon),props:t.agentId,type:t.shortcutType,showClickTip:t.gntsyText,child:[],style:dsf.config.homePage.menuSetting&&dsf.config.homePage.menuSetting.itemStyle?dsf.config.homePage.menuSetting.itemStyle:"{}",isshow:!0,badgeNum:t.badgeNum,gntsyText:t.gntsyText,guid:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})}});t.forEach(function(e){e.isshow=!0,e.badgeNum=0,e.badge&&""!=e.badge&&dsf.http.post(e.badge,{}).then(function(t){e.badgeNum=t.data.badge})}),s.myMenus=t});case 4:dsf.http.post("fn/newFile/shortcutDing",{pageId:s.$route.query.currentPortalId}).then(function(t){(function n(t,s){t.forEach(function(t){if(!(t.displayPosition.indexOf("work")<0)){var e=t.agentid;try{""!=e&&(e=JSON.parse(e))}catch(t){e={}}e={id:t.id,name:t.shortcutName,badge:t.tip,router:t.actUrl.trim(),img:dsf.url.getServerUrl(t.shortcutIcon),props:e,type:t.shortcutType,showClickTip:t.gntsyText,child:[],gntsyText:t.gntsyText,style:dsf.config.homePage.menuSetting&&dsf.config.homePage.menuSetting.itemStyle?dsf.config.homePage.menuSetting.itemStyle:"{}"};s.push(e),0<t.children.length&&n(t.children,e.child)}})})(t.data.data,e),e.forEach(function(t){t.child.forEach(function(e){e.badgeNum=0,e.isshow=!0;var t=n.myMenus.filter(function(t){return t.name==e.name});e.hasMyMenu=t.length})}),n.mainMenu=e,n.isHideTitle=1==n.mainMenu.length&&dsf.config.appSelect.isHideTitle});case 5:case"end":return t.stop()}},t)}))()},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})},openDDApp:function(t){dd.biz.microApp.openApp({agentId:t,onSuccess:function(t){},onFail:function(t){}})},goRoute:function(t){var e;0<t.child.length?(this.showSubmenu=!0,this.submenu=t):""==t.router||null==t.router?t.showClickTip?dsf.layer.alert({message:t.showClickTip}):dsf.layer.alert({message:"当前菜单配置错误，请联系管理员！"}):t.type&&3==t.type?this.openDDApp(t.router):2==t.type?(e=dsf.util.getReplaceUrl(t.router),dsf.config.ddSetting.isDing?dd.biz?dd.biz.util.openLink({url:t.router,onSuccess:function(t){},onFail:function(t){}}):dd.openLink({url:t.router}).then(function(t){u.log(t)}).catch(function(t){}):t.props&&"1"==t.props.OpenWebView?xsfWindow.openWebView({title:t.name,url:e,colorString:"#111111"}):t.props&&"1"==t.props.OpenLocationHref?location.href=e:this.$router.push({name:"dsfIframe",params:{url:e,title:t.name},query:{url:e,title:t.name}})):t.props?t.props.props?this.$router.push({path:t.router,query:JSON.parse(s()(t.props))}):(t.router.indexOf("ssoToOther"),this.$router.push({name:t.router,params:JSON.parse(s()(t.props))})):this.$router.push({path:dsf.util.getReplaceUrl(t.router),query:{title:t.name}})}},components:{menuSetting:e},mounted:function(){this.getMenu()},activated:function(){this.getMenu()}},function(){var n=this,s=n._self._c;return s("div",{staticClass:"ds-moduleIndex"},[n.settingModel?n._e():s("div",{staticClass:"appBox"},[s("div",{staticClass:"card"},[s("div",{staticClass:"title"},[s("span",[n._v("常用服务")]),n._v(" "),s("span",{staticStyle:{float:"right","font-size":"var(--font_size_4)",color:"#666"},on:{click:function(t){n.settingModel=!n.settingModel}}},[s("van-icon",{attrs:{name:"setting-o"}}),n._v("管理\n                ")],1)]),n._v(" "),0<n.myMenus.length?s("div",{staticClass:"dsf-list"},n._l(n.myMenus,function(e,t){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.isshow,expression:"subItem.isshow"}],key:t,staticClass:"menu",on:{click:function(t){return n.goRoute(e)}}},[s("img",{attrs:{src:e.img,alt:""}}),n._v(" "),s("div",{staticClass:"right"},[s("p",{staticClass:"name",domProps:{innerHTML:n._s(e.name)}}),n._v(" "),s("p",{staticClass:"sub elps"},[n._v(n._s(e.gntsyText))])])])}),0):n._e(),n._v(" "),n.myMenus.length<1?s("div",{staticClass:"noApp",on:{click:function(t){n.settingModel=!n.settingModel}}},[n._v("\n                    请增加应用"),s("span",[n._v("+")])]):n._e()]),n._v(" "),n._l(n.mainMenu,function(t,e){return[0<t.child.filter(function(t){return t.isshow&&0==t.hasMyMenu}).length?s("div",{key:e,staticClass:"item-cell",class:{card:t.child.length}},[0<t.child.length&&!n.isHideTitle?s("div",{staticClass:"title"},[s("span",[n._v(n._s(t.name))])]):n._e(),n._v(" "),0<t.child.length?s("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},n._l(t.child,function(e,t){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.isshow&&0==e.hasMyMenu,expression:"subItem.isshow && subItem.hasMyMenu == 0"}],key:t,staticClass:"menu",on:{click:function(t){return n.goRoute(e)}}},[s("img",{attrs:{src:e.img,alt:""}}),n._v(" "),s("div",{staticClass:"right"},[s("p",{staticClass:"name",domProps:{innerHTML:n._s(e.name)}}),n._v(" "),s("p",{staticClass:"sub elps"},[n._v(n._s(e.gntsyText))])])])}),0):n._e()]):n._e()]})],2),n._v(" "),n.settingModel?s("menu-setting",{attrs:{menus:n.mainMenu,commonMenus:n.myMenus},on:{cancel:n.cancel,done:function(t){n.getMenu(),n.settingModel=!1}}}):n._e(),n._v(" "),s("van-dialog",{attrs:{close:"closeTip",message:n.showTipMessage},model:{value:n.showTip,callback:function(t){n.showTip=t},expression:"showTip"}}),n._v(" "),s("van-dialog",{attrs:{"show-confirm-button":!1,closeOnClickOverlay:!0},scopedSlots:n._u([{key:"title",fn:function(){return[s("div",{staticStyle:{"padding-bottom":"0.32rem"}},[n._v(n._s(n.submenu.name))])]},proxy:!0}]),model:{value:n.showSubmenu,callback:function(t){n.showSubmenu=t},expression:"showSubmenu"}},[n._v(" "),0<n.submenu.child.length?s("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},n._l(n.submenu.child,function(e,t){return s("div",{key:t,staticClass:"menu",staticStyle:{width:"33%"},on:{click:function(t){n.showSubmenu=!1,n.goRoute(e)}}},[s("img",{attrs:{src:e.img,alt:""}}),n._v(" "),s("p",[n._v(n._s(e.name))])])}),0):n._e()])],1)},[],!1,null,"113565b5",null).exports},94243:function(t,e,n){t.exports=n.p+"static/img/tatj.f7e58b3..png"}}]);