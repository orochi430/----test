"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[81142],{96875:function(t,n,a){a.r(n);var m,l=a(522),e=a(43562),f=a.n(e),e=a(73473),o=a.n(e),u=a(90541),e={},i=!1;e.initHandle=function(r,c,s){var n=0;s.formData.multinfos["2012291621475Nx2r9znfrssYuHd8do"].rows.forEach(function(t){n+=Number(t["201229102037KPKpUHuJI0O7jVQSW53"].value)}),m=n,s.$set(s.formData.main["220419185254ZFkN4SQqH0C1Q7JBcIO"],"value",m),i=!!s.$route.query.cpydNum,c.controls.forEach(function(t){"controlSubFormPrimary"==t.controlType&&(t.controlType="controlSubFormPrimaryCPYD")}),s.$bus.on("inpBus",function(e){if(null!=e.subFormIndex&&"201229101800AuyqpP4yjv7vbphegCh"==e.metaData.metaId){for(var o,n=0,u=f()(c.subform);n<u.length;n++)!function(){var t=(0,l.Z)(u[n],2),a=t[0];t[1].controls.forEach(function(t,n){t.controlId==e.metaData.controlId&&(o=a)})}();r.subform[o][e.subFormIndex]&&r.subform[o][e.subFormIndex]["2012211022246DnydH3mxIVZzlx1nzl"]&&(t=Number(e.value)*Number(r.subform[o][e.subFormIndex]["2012211022246DnydH3mxIVZzlx1nzl"].value),s.$set(s.formData.subform[o][e.subFormIndex]["201229102037KPKpUHuJI0O7jVQSW53"],"value",String(t)));var t,a=0;s.formData.multinfos[o].rows.forEach(function(t){a+=Number(t["201229102037KPKpUHuJI0O7jVQSW53"].value)}),m=a,s.$set(s.formData.main["220419185254ZFkN4SQqH0C1Q7JBcIO"],"value",String(m))}})},e.saveFilter=function(a,t,n){return new(o())(function(n,t){try{new Date(a.main["201215110840O0QMozB2smlUxxYzxqq"].value).getTime()+144e5<(new Date).getTime()?t("已超过截止时间,无法预订"):n()}catch(t){n()}})},e.custom1=function(t,n,a){new Date(t.main["201215110840O0QMozB2smlUxxYzxqq"].value).getTime()+144e5<(new Date).getTime()?u.Z.layer.toast("已超过截止时间,无法取消"):(t=t.main.A0003.value,u.Z.http.post("fn/cpyd/cancel",{sourceId:t}).then(function(t){200==t.data.code?(u.Z.layer.toast("操作成功"),a.backSucces()):u.Z.layer.toast("取消失败")}))},e.saveAfter=function(n,t,a){a=a.main.A0003.value;u.Z.http.post("fn/cpyd/updateYdrs",{sourceId:a}).then(function(t){t=t.data;i=!0,t.data?(u.Z.layer.toast("保存成功"),n.backSucces()):u.Z.layer.toast("更新菜品发布预定人数出错!")})},e.leaveHandle=function(t,n,a,e){i||u.Z.http.post("fn/cpyd/updateCpyd",{pk:a.$route.params.pk}).then(function(t){t.data.data||u.Z.layer.toast("更新出错")})},n.default=e}}]);