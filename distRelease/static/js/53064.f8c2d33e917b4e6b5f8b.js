"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[53064],{73803:function(t,a,e){e.r(a);e={link:function(t,a,e,n,d){var i=e,s="",h=d["hykq001.B0001"],u=d["hykq001.C-ERP-BMKQ-0002"];dsf.http.post("fn/leave/getLeaveByHyId",{hyId:i}).then(function(t){var t=t.data,a={};t.data.id?(s=t.data.id,a={listId:"200917151324kJBgElfgnRXaYuM8AoV",validateByList:"1"},"0"==t.data.status?a.method="edit":a.method="view"):(a.masterid=i,a.bt=h,a.kssj=u),n.$router.push({path:"/commonForm/200910163553dOPeZXSHV7QsMuQZH9S/"+s,query:a})}).catch(function(t){})}};a.default=e}}]);