"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[49070],{29481:function(n,e,t){t.r(e);var a=t(8450),r=t.n(a),s=t(90541),c=t(25108),a={};function i(i,e,u){var o,n=u.formMeta.controls.find(function(n){return n.metaId==e});n&&n.privilege.editable&&(o=JSON.parse(r()(i)),s.Z.http.post("/fn/common/queryInfo",{uid:i.value}).done(function(n){var t,a;"success"==n.type&&(t=n.data,o.text=i.value.split(",").map(function(e,n){return(a=t.find(function(n){return n.userid==e}))?"".concat(a.deptname,"-").concat(a.uname):i.text.split(",")[n]}).join(","),u.$set(u.formData.main,e,o))}).error(function(n){c.log("queryInfo-error =",n)}))}a.initHandle=function(e,t,a){e.main["C-QT-CUSTOM-0041"]&&e.main["C-QT-CUSTOM-0041"].value&&i(e.main["C-QT-CUSTOM-0041"],"C-QT-CUSTOM-0041",a),a.$bus.on("selectUserBus",function(n){"C-QT-CUSTOM-0040"==n.metaData.metaId?(c.log("selectUserBus",n,e,t,a),i(n,"C-QT-CUSTOM-0040",a)):"C-QT-CUSTOM-0041"==n.metaData.metaId&&(c.log("selectUserBus",n,e,t,a),i(n,"C-QT-CUSTOM-0041",a))})},e.default=a}}]);