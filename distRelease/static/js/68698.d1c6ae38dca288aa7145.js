"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[68698],{90240:function(e,a,n){n.r(a);var t=n(73473),u=n.n(t),I=n(90541),d=n(62596),l=n(25108),t={},i=!1,R=!1;t.handle=function(e,a){},t.initHandle=function(e,a,n){var t;a.controls.find(function(e){return"C-RBS-VISITOR-005"==e.metaId}).extra.minDate=new Date,a.controls.find(function(e){return"C-RBS-VISITOR-005"==e.metaId}).extra.maxDate=I.Z.date.addDate(new Date,2),n.$route.query.paras&&(t=JSON.parse(d.Z.decode(decodeURIComponent(n.$route.query.paras))),a.controls.forEach(function(e,a,n){"C-RBS-VISITOR-011"==e.metaId&&(e.defaultValue.value=t.deptId,e.defaultValue.text=decodeURI(t.deptName),e.defaultValue.schema="5::".concat(t.deptId)),"C-RBS-VISITOR-012"==e.metaId&&(e.defaultValue.value=t.userId,e.defaultValue.text=decodeURI(t.userName),e.defaultValue.schema="1::".concat(t.userId)),"C-RBS-VISITOR-013"==e.metaId&&(e.defaultValue.value=t.tel)}))},t.saveFilter=function(n,e,a,t){return new(u())(function(a,e){try{("save"==t||"send"==t)&&(n.main.B0001&&n.main["C-RBS-VISITOR-006"]&&n.main["C-RBS-VISITOR-001"]&&!n.main.B0001.value&&(n.main.B0001.value="关于".concat(n.main["C-RBS-VISITOR-006"].value).concat(n.main["C-RBS-VISITOR-001"].value,"的来访信息")),n.main["C-RBS-VISITOR-017"]&&!n.main["C-RBS-VISITOR-017"].value&&(n.main["C-RBS-VISITOR-017"].value="-1",n.main["C-RBS-VISITOR-017"].text="未确认"),n.main["C-RBS-VISITOR-009"])&&"1"==n.main["C-RBS-VISITOR-009"].value&&n.main["C-RBS-VISITOR-010"]&&!n.main["C-RBS-VISITOR-010"].value?e("车牌号不能为空！"):a()}catch(e){a()}})},t.saveAfter=function(e,a,n){i=!0},t.leaveHandle=function(e,a,n,t){l.log(a.parameters),!R&&i&&"0"==a.parameters.nodeId&&(R=!0,t.next("/PeopleDaily/VisitAuthCode/".concat(e.main.B0001.value)))},a.default=t}}]);