"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[9180],{51357:function(e,a,n){n.r(a);var t=n(8450),o=n.n(t),l=n(25108),t={};t.logicDeleteXForm=function(a,n){var t=n.data.findIndex(function(e){return e.dataValue.A0001==a.dataValue.A0001}),e=new Array,d={pk:a.dataValue.A0001,moduleId:n.moduleId},u=(e.push(d),{data:o()(e),moduleId:n.moduleId});dsf.layer.confirm({message:"是否确认删除",confirmButtonText:"确认"},function(){dsf.http.post("fn/recycle/logic",u).then(function(e){l.log(e),dsf.layer.toast(e.data.message),200==e.data.code&&n.data.splice(t,1)})})},a.default=t}}]);