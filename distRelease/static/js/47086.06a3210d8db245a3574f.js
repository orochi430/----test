"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[47086],{23614:function(t,e,a){a.r(e);var d=a(90541),o=a(25108),a={link:function(t,e,a,n,u){o.log(u),d.Z.http.post("/fn/meetingNotice/updateReader",{pk:u.id}).then(function(t){o.log(22),u.readStatus=!0,n.$router.push({path:"/commonForm/".concat(u.noticeModuleId,"/").concat(u.noticeId,"?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1"),query:{signUpPk:u.id,signUpModuleId:u.moduleId,sendStatus:u.sendStatus?1:-1,noticeType:u.noticeType,hyTzlx:u.noticeType,hytzStatus:u.hytzStatus}})})},dataFilter:function(t,a){o.log(t),t.forEach(function(t){var e=t.dataValue.startDate+" ~ "+t.dataValue.endDate.substr(10);moment(new Date(t.dataValue.startDate)).format("YYYYMMDD")!=moment(new Date(t.dataValue.endDate)).format("YYYYMMDD")&&(e=t.dataValue.startDate+" ~ "+t.dataValue.endDate.substr(5)),a.$set(t.dataValue,"startDate",e)})}};e.default=a}}]);