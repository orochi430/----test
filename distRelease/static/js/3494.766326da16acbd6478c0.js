"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[3494],{84045:function(e,a,n){n.r(a);var s=n(25108),n={};function i(a,n,e){dsf.http.post("/fn/superviseV6/approval/getResponsibleMobile",{userId:e}).then(function(e){200==e.data.code&&(e=e.data.data.responsibleMobile,n.$set(a.main,"C-DB-0022",{value:e}))})}n.initHandle=function(a,e,n){var t;a.main["C-DB-0022"].value||(t=a.main["C-DB-0016"].value,i(a,n,t)),a.main["C-DB-0054"]&&a.main["C-DB-0054"].value||n.$set(a.main,"C-DB-0054",{value:"1",text:"待确认"}),n.$bus.$off("selectUserBus").on("selectUserBus",function(e){s.log("busObj.metaData",e.metaData),"C-DB-0016"===e.metaData.metaId&&(s.log("busObj",e),i(a,n,e.value))})},a.default=n}}]);