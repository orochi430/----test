"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[31395],{81631:function(e,t,n){n.r(t);var a=n(66250),r=n(33453),u=n.n(r),i=n(25108),r={};r.initHandle=function(){var r=(0,a.Z)(u().mark(function e(t,n,r){var a,s;return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:s=function(e,t){i.log(e),r.$set(e,"c-meetingchry-002",{value:t.userId,text:t.userName,schema:"1::"+t.deptId}),r.$set(e,"c-meetingchry-004",{value:t.deptId,text:t.deptName,schema:"5::"+t.deptId}),r.$set(e,"c-meetingchry-0010",{value:t.userMobile}),r.$set(e,"B0001",{value:t.zw})},0<=(a=n.buttons.mainButtons.findIndex(function(e){return"viewMeetingSign"==e.action}))&&r.formButtons.mainButtons.splice(a,1),r.$bus.on("subFormTreeSelect",function(n){i.log(n),n.selectArr.forEach(function(e,t){dsf.http.post("fn/meetingNotice/getUserDept",{userId:e.id,deptId:e.attrs.deptId}).then(function(e){var t;i.log(e.data),"200"==e.data.code&&(t=e.data.data,r.$refs.formTab[0].$refs[n.subFormId][0].$refs.subform.addCard(!1).then(function(e){s(e,t)}).then(function(){RenderList()}))})})});case 4:case"end":return e.stop()}},e)}));return function(e,t,n){return r.apply(this,arguments)}}(),t.default=r}}]);