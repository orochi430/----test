"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[84909],{40891:function(e,t,n){n.r(t);var a=n(73473),l=n.n(a),o=n(25108),a={};function s(e,t){t[0].show=0,t[1].show=0,t[2].show=0,o.log(void 0!==e||""!==e),void 0!==e&&""!==e&&(t[e-1].show=1)}a.initHandle=function(e,t,n){n.relationList[0]&&n.relationList[0].document.length||(a=n,o="文件关联",d=2,new(l())(function(t,n){dsf.http.post("ctrl/filerelation/select/checkedJson",{pks:a.$route.query.relationId,infoId:a.pk,relaType:d,relaName:o}).then(function(e){200==e.data.code?t(e.data.data):n()})}).then(function(e){dsf.http.post("fn/mobileRelationFile/save",{relaMode:e[0].relaMode,relaIds:e[0].relaId,pk:n.pk,moduleId:n.moduleId,fileRelaId:n.relationList[0].fileRelaId}).then(function(e){200==e.data.code&&dsf.http.get("fn/mobileRelationFile/getFormRelationFiles",{pk:n.pk,moduleId:n.moduleId,nodeId:t.parameters.nodeId,flowId:t.parameters.flowId}).then(function(e){n.$set(n,"relationList",e.data.rows)})})}));var a,o,d,i=t.controls.filter(function(e){return-1<e.metaId.indexOf("attach")});s(e.main["C-DB-FK-0024"].value,i),n.$bus.on("inputRadio",function(e){"C-DB-FK-0024"==e.metaData.metaId&&s(e.value,i)})},a.saveAfter=function(e,t,n){dsf.http.post("fn/superviseV6/approval/syncFeedbackPeriodsId",{id:e.pk}).then(function(e){200!=e.data.code&&dsf.layer.toast(e.data.message)})},t.default=a}}]);