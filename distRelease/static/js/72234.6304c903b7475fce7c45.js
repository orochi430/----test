"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[72234],{3538:function(t,e,n){n.r(e);var a=n(90541),i=n(25108),n={link:function(t,e,n,i,o){a.Z.http.post("/fn/meetingNotice/updateReader",{pk:o.id}).then(function(t){o.readStatus=!0,i.$router.push({path:"/commonForm/".concat(o.noticeModuleId,"/").concat(o.noticeId,"?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1"),query:{signUpPk:o.id,signUpModuleId:o.moduleId,sendStatus:o.sendStatus?1:-1,noticeType:o.noticeType}})})},dataFilter:function(t,e){i.log(t),t.forEach(function(t){})}};e.default=n}}]);