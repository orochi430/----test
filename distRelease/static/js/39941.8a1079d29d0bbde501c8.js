"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[39941],{22580:function(a,t,e){e.r(t);e={link:function(a,t,e,o,n){},fillInProjectInfo:function(e,o){var n;dsf.http.post("/fn/resumption/toadyForm?projectId="+e.dataValue.A0001,{}).then(function(a){var t;200==a.data.code&&(n=a.data.data.pk,t={projectName:e.dataValue["C-PROJECT-MAINTAIN-001"],B0054:e.dataValue["B0054.value"],CPROJECTMAINTAIN006:e.dataValue["C-PROJECT-MAINTAIN-006.value"]},a.data.data.initDataSource&&1==a.data.data.initDataSource&&(t.initDataSource=a.data.data.initDataSource),o.$router.push({path:"/commonForm/220509172517m6bynFnIjv7yMk28uzq/"+n,query:t}))})},fillInProjectInfoByWeek:function(e,o){var n;dsf.http.post("/fn/resumption/toWeekForm?projectId="+e.dataValue.A0001,{}).then(function(a){var t;200==a.data.code&&(n=a.data.data.pk,t={listId:"220509201313UNAlxxeSZoGWEXImCr1",method:"edit",projectName:e.dataValue["C-PROJECT-MAINTAIN-001"],projectName007t:e.dataValue["C-PROJECT-MAINTAIN-007.text"],projectName007v:e.dataValue["C-PROJECT-MAINTAIN-007.value"],projectName008t:e.dataValue["C-PROJECT-MAINTAIN-008.text"],projectName008v:e.dataValue["C-PROJECT-MAINTAIN-008.value"]},a.data.data.initDataSource&&1==a.data.data.initDataSource&&(t.initDataSource=a.data.data.initDataSource),o.$router.push({path:"/commonForm/220509172517m6bynFnIjv7yMk28uzq/"+n,query:t}))})}};t.default=e}}]);