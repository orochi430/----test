"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[99287],{98639:function(e,a,n){n.r(a);var r=n(73473),o=n.n(r),l=n(90541),s=n(25108),r={};function c(e){var a=e.formData.main["C-LEAVE-0001"].value,n=e.formMeta.controls.find(function(e){return"C-LEAVE-0011"==e.metaId}),r=e.formTabs.find(function(e){return"relevantFile"==e.name}),t=e.$refs.formTab[0].$refs["C-LEAVE-0011"][0].$refs.control.controlData;switch(a){case"1":e.$set(e.formData.main["C-LEAVE-0011"],"value",""),t.placeholder="请输入",n.show=0,r&&(r.enable=!1);break;case"5":t.placeholder="请说明具体事由",n.show=1,r&&(r.enable=!1);break;case"10":t.placeholder="请说明会议地点及会议名称",n.show=1,r?r.enable=!0:e.formTabs.push({name:"relevantFile",title:"相关文件",enable:!0});break;case"15":t.placeholder="请说明班次名称",n.show=1,r&&(r.enable=!1);break;case"20":t.placeholder="请说明上课地点及班次名称",n.show=1,r&&(r.enable=!1);break;case"25":t.placeholder="请说明调研地点及内容",n.show=1,r&&(r.enable=!1);break;case"30":t.placeholder="请说明具体事由",n.show=1,r&&(r.enable=!1);break;case"35":t.placeholder="请说明其他事由",n.show=1,r&&(r.enable=!1);break;default:e.$set(e.formData.main["C-LEAVE-0011"],"value",""),t.placeholder="请输入",n.show=0,r&&(r.enable=!1)}}r.handle=function(e,a){},r.initHandle=function(e,a,n){s.log("会议请假单",e,a,n);var a=n.$route.query.masterid,r=n.$route.query.bt,t=n.$route.query.kssj;a&&(n.$set(n.formData.main.B0035,"value",a),n.$set(n.formData.main.B0001,"value",r),n.$set(n.formData.main["C-LEAVE-0002"],"value",t)),n.$watch(function(){return e.main["C-LEAVE-0001"]},function(e,a){c(n)},{deep:!0}),c(n)},r.saveFilter=function(e,a,t,n){return new(o())(function(n,r){"10"!=t.formData.main["C-LEAVE-0001"].value&&n();var e=t.$refs.relevantFile[0].$refs.enclosure.allFile||null,e=(e&&e.length&&n(),{info_id:t.pk,infoId:t.pk,moduleId:t.moduleId,nodeId:a.parameters.nodeId,start:0,limit:10,flowId:a.parameters.flowId});l.Z.http.post("fn/mobileAttachment/getFormAttachment",e).then(function(e){var a=0;e.data.rows.forEach(function(e){e.document&&0<e.document.length&&a++}),0<a?n():r("请上传附件")}).error(function(e){s.log(e),r("获取附件异常")})})},a.default=r}}]);