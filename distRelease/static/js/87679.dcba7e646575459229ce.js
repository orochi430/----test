"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[87679],{45896:function(e,n,t){t.r(n);var a=t(66250),i=t(33453),u=t.n(i),o=t(90541),i=(t(56369),t(62596),t(80129),{initHandle:function(e){e.readStatusKey="un.Unify-Note-User-0003",e.haveReadVal=1}});i.link=function(){var r=(0,a.Z)(u().mark(function e(n,t,a,i,r){return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r["n.Unify-Note-0003"])return e.next=3,o.Z.http.post("ctrl/unifyOfficeInfo/requestChangeRead",{dataId:r["n.A0001.value"],type:"unifynote",appCode:r["n.Unify-Note-0012.value"]}).then(function(e){r["un.Unify-Note-User-0003"]=1});e.next=6;break;case 3:o.Z.middleground.openUrl({url:r["n.Unify-Note-0003"],title:r["n.Unify-Note-0005.value"],getCodeParams:{appCode:r["n.Unify-Note-0012.value"]}}),e.next=7;break;case 6:o.Z.layer.toast("该文件建议在电脑端处理");case 7:case"end":return e.stop()}},e)}));return function(e,n,t,a,i){return r.apply(this,arguments)}}(),n.default=i}}]);