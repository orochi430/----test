"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[20445],{69881:function(n,e,t){t.r(e);var i=t(66250),r=t(33453),u=t.n(r),r=t(56369),a=t.n(r),f=t(90541),c=t(25108),r={initHandle:function(n){n.readStatusKey="un.Unify-Note-User-0003",n.haveReadVal=1}};r.link=function(){var o=(0,i.Z)(u().mark(function n(e,t,i,r,o){return u().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,f.Z.http.post("ctrl/unifyOfficeInfo/requestChangeRead",{dataId:o["n.A0001"],type:"unifynote",appCode:o["n.Unify-Note-0012"]}).then(function(n){o["un.Unify-Note-User-0003"]=1});case 2:c.log(3,o),o["n.Unify-Note-0003"]?window.wx?wx.invoke("openUrl",{type:0,url:o["n.Unify-Note-0003"]},function(n){n.err_msg}):window.dd?a().openLink({url:o["n.Unify-Note-0003"]}).then(function(n){c.log(n)}).catch(function(n){}):r.$router.push({path:"/iframe",query:{url:o["n.Unify-Note-0003"]}}):f.Z.layer.toast("无跳转地址");case 4:case"end":return n.stop()}},n)}));return function(n,e,t,i,r){return o.apply(this,arguments)}}(),e.default=r}}]);