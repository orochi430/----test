"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[47091],{47091:function(t,n,e){e.r(n),e.d(n,{default:function(){return a}});var s=e(88561),n=(e(25108),{data:function(){var t;return{dragOptions:{delay:50,scrollFn:this.scrollFn},isShaky:!1,myMenus:[],mainMenu:[],myMenusTemp:[],mainMenuTemp:[],isRepeatShow:!(null==(t=dsf.config.appSelect)||!t.isRepeatShow),isSetUserShortcutDing:!!dsf.config.appSelect.setUserShortcutDing,myMenusName:(null==(t=dsf.config.appSelect)?void 0:t.selectName)||"我的应用"}},components:{draggable:function(){return e.e(9980).then(e.t.bind(e,82021,23))}},computed:{rowNum:function(){return this.$store.state.applications.rowNum}},mounted:function(){var t=this;t.isSetUserShortcutDing,s.Z.loadLocalStore("mySettingDQ")&&(t.myMenus=s.Z.loadLocalStore("mySettingDQ")),t.myMenusTemp=dsf.util.deepCopy(t.myMenus),t.getAllMenus()},methods:{restore:function(){var n=this,e=dsf.layer.loading("重置中...");dsf.http.get("fn/application/portal/resetUserCustomApp").done(function(t){"success"==t.type?(dsf.layer.closeLoading(e),n.$router.back()):dsf.layer.toast(t.message,!1)}).error(function(t){return dsf.layer.toast("操作失败，请稍后重试",!1)})},scrollFn:function(t,n,e,s,a){},onMove:function(t){var n=t.relatedContext,t=t.draggedContext,n=n.element,t=t.element;return!(n&&n.fixed||t.fixed)},chooseFn:function(){this.isShaky=!this.isShaky},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=16*Math.random()|0;return("x"==t?n:3&n|8).toString(16)})},deleteSelect:function(n,t){this.myMenus.splice(t,1),n.isshow=!0,this.mainMenu.forEach(function(t){t.child.forEach(function(t){t.name==n.name&&(t.hasMyMenu=!1,t.isshow=!0)})})},add:function(t,n,e){t.hasMyMenu||(this.myMenus.length==2*this.rowNum?dsf.layer.toast("最多新增".concat(2*this.rowNum,"个自定义菜单"),!1):(this.myMenus.push(dsf.util.deepCopy(t)),t.hasMyMenu=!0,t.isshow=this.isRepeatShow||!0))},done:function(){var n=this,e=dsf.layer.loading("保存中...");dsf.http.post("fn/application/portal/setUserCustomApp",{appIds:this.myMenus.map(function(t){return t.id}).join(",")}).done(function(t){200==t.code?(dsf.layer.closeLoading(e),s.Z.saveToLocalStore("mySettingDQ",n.myMenus),n.$router.back()):dsf.layer.toast(t.message,!1)}).error(function(t){return dsf.layer.toast("操作失败，请稍后重试",!1)})},getAllMenus:function(){var e=this;dsf.http.post("fn/application/portal/authorizedApp").done(function(t){"success"==t.type&&(e.mainMenu=[{name:"已授权应用",child:t.data.map(function(n){return{id:n.id,name:n.appName,url:n.mobileUrl,isshow:!0,img:dsf.url.getWebPath(n.iconPath),guid:e.guid(),hasMyMenu:e.myMenus.some(function(t){return t.id==n.id})}})}],e.mainMenuTemp=dsf.util.deepCopy(e.mainMenu))})}}}),a=(0,e(51900).Z)(n,function(){var a=this,i=a._self._c;return i("div",{staticClass:"selectAppBox"},[i("div",{staticClass:"card"},[i("div",{staticClass:"title showIcon"},[i("span",[a._v(a._s(a.myMenusName))]),a._v(" "),i("span",{staticClass:"flex ac",staticStyle:{float:"right","font-size":"var(--font_size_3)",color:"#666"},on:{click:a.done}},[i("van-icon",{attrs:{name:"success"}}),a._v("完成\n\t\t\t")],1),a._v(" "),i("span",{staticClass:"flex ac",staticStyle:{float:"right","font-size":"var(--font_size_3)",color:"#666","padding-right":"0.2rem"},on:{click:a.restore}},[i("van-icon",{attrs:{name:"replay"}}),a._v("重置\n\t\t\t")],1)]),a._v(" "),i("div",{staticClass:"myAppBox"},[i("draggable",{attrs:{move:a.onMove,options:a.dragOptions},on:{start:a.chooseFn,end:a.chooseFn},model:{value:a.myMenus,callback:function(t){a.myMenus=t},expression:"myMenus"}},[i("transition-group",{staticClass:"dsf-list cells",attrs:{type:"transition",tag:"div",name:"flip-list"}},a._l(a.myMenus,function(n,e){return i("div",{key:n.guid,class:["menu","menu_".concat(a.rowNum)],style:{width:"".concat(100/a.rowNum,"%")}},[i("img",{class:{shaky:a.isShaky},attrs:{src:n.img}}),a._v(" "),i("p",[a._v(a._s(n.name))]),a._v(" "),i("div",{staticClass:"icon-container",staticStyle:{"background-color":"#cfcfcf"}},[i("van-icon",{attrs:{name:"minus",color:"#fff"},on:{mousedown:function(t){return t.stopPropagation(),a.deleteSelect(n,e)}}})],1)])}),0)],1)],1)]),a._v(" "),i("div",{staticClass:"f_b"},a._l(a.mainMenu,function(s,t){return 0<s.child.length?i("div",{key:t,staticClass:"card candan-item"},[i("div",{staticClass:"title showIcon"},[i("span",[a._v(a._s(s.name))])]),a._v(" "),i("div",{staticClass:"dsf-list cells"},a._l(s.child,function(n,e){return i("div",{key:e,class:["menu","menu_".concat(a.rowNum)],style:{width:"".concat(100/a.rowNum,"%")},on:{click:function(t){return a.add(n,e,s)}}},[i("img",{attrs:{src:n.img}}),a._v(" "),i("p",[a._v(a._s(n.name))]),a._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!n.hasMyMenu,expression:"!subItem.hasMyMenu"}],staticClass:"icon-container"},[i("van-icon",{attrs:{name:"plus",color:"#fff"}})],1)])}),0)]):a._e()}),0)])},[],!1,null,"3f694cae",null).exports}}]);