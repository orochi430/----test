"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[71771],{4095:function(e,t,a){a.r(t);var n=a(73473),l=a.n(n),i=a(25108),n={};n.initHandle=function(e,t,a){var n,o,d;a.relationList[0]&&a.relationList[0].document.length||(n=a,o="文件关联",d=2,new(l())(function(t,a){dsf.http.post("ctrl/filerelation/select/checkedJson",{pks:n.$route.query.relationId,infoId:n.pk,relaType:d,relaName:o}).then(function(e){200==e.data.code?t(e.data.data):a()})}).then(function(e){dsf.http.post("fn/mobileRelationFile/save",{relaMode:1,relaIds:e[0].relaId,pk:a.pk,moduleId:a.moduleId,fileRelaId:a.relationList[0].fileRelaId}).then(function(e){200==e.data.code&&dsf.http.get("fn/mobileRelationFile/getFormRelationFiles",{pk:a.pk,moduleId:a.moduleId,nodeId:t.parameters.nodeId,flowId:t.parameters.flowId}).then(function(e){a.$set(a,"relationList",e.data.rows)})})})),i.log(a),i.log(a.$refs),dsf.http.post("ctrl/superviseV6/approval/getEvaluateResponsibleUnit",{sourcePk:a.$route.query.sourcePk}).then(function(e){200==e.data.code&&(i.log(e.data),e.data.data.codeList)&&e.data.data.codeList.forEach(function(t,e){a.$refs.formTab[0].$refs["210702160321DBzcmz5Zm8ICv8iESZy"][0].$refs.subform.addCard(!1).then(function(e){a.$set(e,"C-EVALUATE-SUB-0001",{value:t.value,text:t.text})})})})},t.default=n}}]);