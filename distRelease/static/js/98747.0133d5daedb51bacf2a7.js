"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[98747],{98747:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var t=n(8450),a=n.n(t),o=n(88561),s=n(25108),t={name:"mztLogin",mounted:function(){var t=this,n=dsf.layer.loading();"app"==o.Z.getClientName()?document.addEventListener("deviceready",function(){s.log("deviceready_emergency_login"),$sharedPreferences.get("KOAL_CA_UIKIT_TICKET",function(e){s.log("result",e),e?dsf.http.post("/fn/mobileProjectAuth/auth",{ticket:e}).then(function(e){s.log("checkticket值",e),dsf.layer.closeLoading(n),1==e.data.rcode?(dsf.util.saveToSessionStore("user",e.data.data),dsf.util.saveToSessionStore("loginToken",e.data.data.auth.token),dsf.util.saveToLocalStore("loginToken",e.data.data.auth.token),dsf.util.saveToLocalStore("user",a()(e.data.data)),dsf.util.logIn(function(){t.$router.replace("/index")})):dsf.layer.toast("登录失败")}).catch(function(e){dsf.layer.closeLoading(n),s.log("获取用户信息失败",e)}):dsf.layer.toast("系统正在跳转登录页,请稍等",function(){t.$router.replace("testLogin")})},function(e){dsf.layer.closeLoading(n),dsf.layer.toast("系统正在跳转登录页,请稍等",function(){t.$router.replace("/testLogin")})})}):(dsf.layer.closeLoading(n),t.$router.replace("testLogin"))}},i=(0,n(51900).Z)(t,function(){return(0,this._self._c)("div",{staticClass:"mztLogin"})},[],!1,null,"1dc4dc45",null).exports}}]);