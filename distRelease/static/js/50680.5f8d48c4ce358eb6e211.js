"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[50680],{17969:function(e,n,t){t.r(n);var o=t(73473),r=t.n(o),t={};function u(){var t=dsf.util.loadSessionStore("meeting");return new(r())(function(n,e){dsf.http.post("fn/conferenceMemorandum/addMemorandum",{meetingId:t.id}).done(function(e){200!=e.code?dsf.layer.toast(e.message):n(e.data)}).error(function(e){dsf.layer.toast(e)})})}t.createRow=function(e,n){u().then(function(e){n.$router.push({path:"/conference/memo",query:{fileId:e.id,isAdd:1,type:1}})})},t.createMemorandumText=function(e,n){u().then(function(e){n.$router.push({path:"/conference/memo",query:{fileId:e.id,isAdd:1,type:2}})})},t.link=function(e,n,t,o,r){o.$router.push({path:"/conference/memo",query:{fileId:r.A0001,type:r["C-HWXT-MEETING-MEMORANDUM-0002"]||"1"}})},n.default=t}}]);