"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[15601],{15601:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});var e=n(8450),i=n.n(e),a=n(25108),e={name:"appMenuCenter",props:["limitcount","menudata"],data:function(){return{isHideTitle:!1,user:dsf.util.loadSessionStore("user")||{},default_img:'this.src="'+n(94243)+'"',settingModel:!1,mainMenu:[],searchVal:"",showSubmenu:!1,submenu:{name:"",child:[]}}},watch:{menudata:function(){this.buildMenu(this.menudata)}},methods:{goMore:function(){this.$router.push({path:"/appMenuCenter"})},cancel:function(){this.settingModel=!1},getMenu:function(){var e=this;dsf.http.post("fn/newFile/shortcutDing",{}).then(function(t){t=t.data;e.buildMenu(t.data)})},buildMenu:function(t){var e=this,n=[];(function n(t,i){t.forEach(function(t){if(!(t.displayPosition.indexOf("work")<0)){var e=t.agentid;try{""!=e&&(e=JSON.parse(e))}catch(t){e={}}e={name:t.shortcutName,badge:t.tip,router:t.actUrl.trim(),img:t.shortcutIcon,props:e,type:t.shortcutType,showClickTip:t.gntsyText,child:[]};i.push(e),0<t.children.length&&n(t.children,e.child)}})})(t,n),n.forEach(function(t){t.child.forEach(function(i){i.badgeNum=0,i.isshow=!0,i.badge&&""!=i.badge&&dsf.http.postUrls(i.badge,{}).then(function(t){if(Array.isArray(t)&&0<t.length)for(var e=0;e<t.length;e++){var n=t[e];i.badgeNum+=n.data.total||n.data.badge||n.data.data}else i.badgeNum+=t.data.total||t.data.badge||t.data.data})})}),e.mainMenu=n,e.isHideTitle=null!=e.limitcount&&0<e.limitcount},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})},openDDApp:function(t){dd.biz.microApp.openApp({agentId:t,onSuccess:function(t){},onFail:function(t){}})},goRoute:function(t){var e;0<t.child.length?(this.showSubmenu=!0,this.submenu=t,a.log(this.submenu)):t.type&&3==t.type?this.openDDApp(t.router):2==t.type?dsf.config.ddSetting.isDing?dd.biz.util.openLink({url:t.router,onSuccess:function(t){},onFail:function(t){}}):(e=dsf.util.getReplaceUrl(t.router),this.$router.push({name:"dsfIframe",params:{url:e}})):t.props?t.props.props?this.$router.push({path:t.router,query:JSON.parse(i()(t.props))}):this.$router.push({name:t.router,params:JSON.parse(i()(t.props))}):this.$router.push({path:t.router})}},created:function(){null==this.menudata&&this.getMenu()}},s=(0,n(51900).Z)(e,function(){var n=this,i=n._self._c;return i("div",{staticClass:"ds-moduleIndex"},[n.settingModel?n._e():i("div",{staticClass:"appBox"},n._l(n.mainMenu,function(t,e){return i("div",{key:e,staticClass:"item-cell",class:{card:t.child.length}},[0<t.child.length&&!n.isHideTitle?i("div",{staticClass:"title"},[i("span",[n._v(n._s(t.name))])]):n._e(),n._v(" "),0<t.child.length?i("div",{staticClass:"dsf-list",style:{marginTop:n.isHideTitle?"0.3rem":0}},n._l(t.child,function(e,t){return i("div",{directives:[{name:"show",rawName:"v-show",value:e.isshow,expression:"subItem.isshow"}],key:t,staticClass:"menu",on:{click:function(t){return n.goRoute(e)}}},[i("img",{attrs:{src:e.img,alt:""}}),n._v(" "),i("p",[n._v(n._s(e.name))]),n._v(" "),e.badgeNum?i("div",{staticClass:"badge"},[n._v(n._s(e.badgeNum<99?e.badgeNum:"99+"))]):n._e()])}),0):n._e()])}),0)])},[],!1,null,"353210fb",null).exports},94243:function(t,e,n){t.exports=n.p+"static/img/tatj.f7e58b3..png"}}]);