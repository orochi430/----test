"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[78777],{78777:function(e,s,t){t.r(s),t.d(s,{default:function(){return n}});var a=t(25108),s={data:function(){return{errored:!1,active:0,btns:[{id:1,name:"扫码登记",img:"static/images/jiangxiDRC/scan-1.png",activeImg:"static/images/jiangxiDRC/scan-2.png",type:"scan"},{id:2,name:"扫码查看",img:"static/images/jiangxiDRC/query-1.png",activeImg:"static/images/jiangxiDRC/query-2.png",type:"query"},{id:3,name:"固定资产查询",img:"static/images/jiangxiDRC/fixed-assets-1.png",activeImg:"static/images/jiangxiDRC/fixed-assets-2.png",type:"showAll"},{id:4,name:"个人资产查询",img:"static/images/jiangxiDRC/person-assets-1.png",activeImg:"static/images/jiangxiDRC/person-assets-2.png",type:"showMine"}],myBtns:[],role:"0",entryModuleId:dsf.config.homePage.asset.form.entry.moduleId,entryListId:dsf.config.homePage.asset.form.entry.listId,checkModuleId:dsf.config.homePage.asset.form.check.moduleId,checkListId:dsf.config.homePage.asset.form.check.listId}},created:function(){a.log("getClientName =",dsf.util.getClientName());dsf.config.homePage.asset||(this.errored=!0),this.getMyFuncs(),a.log("dsf.dd",dsf.dd)},methods:{act:function(e,s){var t=this;switch(t.active=s,e.type){case"scan":t.scan();break;case"query":t.query();break;case"showAll":t.showAll();break;case"showMine":t.showMine();break;default:t.scan()}},scan:function(){var s=this;"app"==dsf.util.getClientName()?xsfBarcode.scan(function(e){a.log("scan",e),e.cancelled||s.warehouse(e.text)},function(e){alert("扫码失败: "+e)}):dsf.dd?dsf.dd.scan(function(e){a.log("scan",e),s.warehouse(e.text)},function(e){a.log(e)}):dsf.layer.alert({message:"需在app或赣政通中进行扫码"})},warehouse:function(s){var t=this;s?dsf.http.post("fn/assets/checkCode",{code:s}).done(function(e){"success"==e.type?"0"==e.data?t.$router.push({path:"/commonForm/".concat(t.entryModuleId),query:{code:s,listId:t.entryListId,method:"ydedit"}}):dsf.layer.alert({message:"该条码已完成入库登记"}):dsf.layer.alert({message:"".concat(e.message)})}).error(function(e){a.log("error =",e),dsf.layer.alert({message:"".concat(e)})}):dsf.layer.alert({message:"无效的条形码"})},query:function(){var s=this;"app"==dsf.util.getClientName()?xsfBarcode.scan(function(e){a.log("scan",e),e.cancelled||s.checkAsset(e.text)},function(e){alert("扫码失败: "+e)}):dsf.dd?dsf.dd.scan(function(e){a.log("scan",e),s.checkAsset(e.text)},function(e){a.log("scan-err",e)}):dsf.layer.alert({message:"需在app中进行扫码"})},checkAsset:function(e){var s=this;e?dsf.http.post("fn/assets/getPKByCode",{code:e}).done(function(e){"success"==e.type?s.$router.push({path:"/commonForm/".concat(s.checkModuleId,"/").concat(e.data),query:{listId:s.checkListId,method:"ydview"}}):dsf.layer.alert({message:"".concat(e.message)})}).error(function(e){a.log("getPKByCode-error =",e),dsf.layer.alert({message:"".concat(e.message)})}):dsf.layer.alert({message:"无效的条形码"})},showAll:function(){var e,s=this,t="";(t=s.menus&&s.menus.authorized&&(e=s.menus.authorized.find(function(e){return e.role==s.role}))?e.url:t)?s.$router.push({path:t}):dsf.layer.alert({message:"请配置链接地址"})},showMine:function(){var e=this,s="";(s=e.menus?e.menus.personal:s)?e.$router.push({path:s}):dsf.layer.alert({message:"请配置链接地址"})},getMyFuncs:function(){var e=this;dsf.http.get("fn/assets/myFuncs").done(function(t){"success"==t.type?(a.log("myFuncs",t),e.role=t.jslx,e.myBtns=e.btns.filter(function(e,s){return t.data.includes(e.id)})):dsf.layer.toast("".concat(t.message))}).error(function(e){a.log("myFuncs-error =",e)}).always(function(){})}}},n=(0,t(51900).Z)(s,function(){var a=this,e=a._self._c;return e("div",{staticClass:"container"},[a.errored?e("commonempty",{attrs:{image:"error",description:"请检查配置"}}):e("div",[a.dsf.config.homePage.asset.isHideWelcomeWords?a._e():e("div",{staticClass:"title"},[e("div",{staticClass:"top"},[e("span",[a._v("欢迎使用")]),e("strong",{staticStyle:{"padding-left":"16px"}},[a._v("固定资产管理系统")])]),a._v(" "),e("div",{staticClass:"bottom"},[a._v("统一计划，分级管理")])]),a._v(" "),e("div",{staticClass:"bg"},[e("img",{attrs:{src:"static/images/jiangxiDRC/bg.png",alt:"","data-img":"scan-2","data-img2":"scan-1"}})]),a._v(" "),e("div",{staticClass:"btn"},a._l(a.myBtns,function(s,t){return e("div",{key:t,staticClass:"btn-saoma",class:{active:a.active==t},on:{click:function(e){return a.act(s,t)}}},[e("div",{staticClass:"left"},[a._v(a._s(s.name))]),a._v(" "),e("div",{staticClass:"right"},[e("img",{attrs:{src:a.active==t?s.activeImg:s.img,alt:""}})])])}),0),a._v(" "),e("div",{staticClass:"blank"}),a._v(" "),a.dsf.config.homePage.asset.isHideCpoyright?a._e():e("div",{staticClass:"p-bottom"},[a._v("\n      江西省发展和改革委员会\n    ")])])],1)},[],!1,null,"7fcd3747",null).exports}}]);