"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[54201],{54201:function(t,e,o){o.r(e),o.d(e,{default:function(){return a}});var n=o(25108),e={data:function(){return{tipsText:""}},mounted:function(){dsf.util.clearSession();var o=this;window.getTodoData=function(e){dsf.http.post("/fn/mobileProjectAuth/auth?logName=".concat(e.logName)).then(function(t){t=t.data;n.log("fn/lxLogin/mloginGetInfo",t),"500"==t.code?o.tipsText=t.data.message:1==t.data.rcode?(store.saveToSessionStore("user",t.data.data),store.saveToSessionStore("loginToken",t.data.data.auth.token),o.$router.push({path:"/commonForm"+"".concat(e.moduleId,"/").concat(e.pk),query:{type:gw,todoId:e.todoId,isEnterTodo:1},replace:!0})):o.tipsText="当前系统登录异常，请联系管理员！"})},TodoData.postMessage("")}},a=(0,o(51900).Z)(e,function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"tips"},[t._v(t._s(t.tipsText))])])},[],!1,null,"10f30e8a",null).exports}}]);