"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[12169],{12169:function(n,t,e){e.r(t),e.d(t,{default:function(){return s}});var o=e(25108),t={name:"fileNotFound",data:function(){return{desc:"该文件已被删除",user:dsf.util.loadSessionStore("user")}},created:function(){this.init()},methods:{close:function(){var n;null!=(n=window.dd)&&n.closePage()},init:function(){var n;dsf.http.get("fn/govUser/toBeDoneByUser",{user_id:null==(n=this.user)?void 0:n.user_id}).done(function(n){"success"==n.type&&o.log("getInbox-success")}).error(function(n){o.log("getInbox-err",n)})}}},s=(0,e(51900).Z)(t,function(){var n=this,t=n._self._c;return t("div",{staticClass:"fileNotFound-page"},[t("commonempty",{attrs:{image:"error",description:"该文件已被删除"}},[t("van-button",{staticClass:"bottom-button",attrs:{type:"primary",round:""},on:{click:n.close}},[n._v("返回")])],1)],1)},[],!1,null,"7623531a",null).exports}}]);