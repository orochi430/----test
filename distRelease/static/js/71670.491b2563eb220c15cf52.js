"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[71670],{88430:function(t,a,e){e.r(a);e(90541);var i=e(25108),e={link:function(t,a,e,n,d){i.log(d),n.$router.push({path:"/commonForm/".concat(d.noticeModuleId,"/").concat(d.noticeId,"?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1"),query:{moduleId:d.moduleId,listId:"MeetingList",method:"viewTz",validateByList:"1",showNodeId:"-1",pk:d.id}})},dataFilter:function(t,e){i.log(t),t.forEach(function(t){var a=t.dataValue.startDate+" ~ "+t.dataValue.endDate.substr(10);moment(new Date(t.dataValue.startDate)).format("YYYYMMDD")!=moment(new Date(t.dataValue.endDate)).format("YYYYMMDD")&&(a=t.dataValue.startDate+" ~ "+t.dataValue.endDate.substr(5)),e.$set(t.dataValue,"startDate",a)})}};a.default=e}}]);