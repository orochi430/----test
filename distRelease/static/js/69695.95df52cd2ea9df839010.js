"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[69695],{9933:function(e,t,a){a.r(t);var n=a(73473),c=a.n(n),d=a(90541),o=a(2728),m=a(25108),n={beforeInitAsync:function(e,t,a){t.parameters.todoId&&(a.isShowForm=!1,o.Z.setTitle("会议通知"),d.Z.http.post("/fn/meetingNotice/getNoticeDataByInbox",{pk:e.main.A0001.value,pnId:t.parameters.pId}).then(function(e){e&&e.data&&"200"==e.data.code&&e.data.data&&"190121161348OthBI4s3sEhvfuDJ5FD"==e.data.data.noticeModuleId&&t.parameters.todoId?(m.log("跳转到通知单"),a.$router.replace({path:"/commonForm/".concat(e.data.data.noticeModuleId,"/").concat(e.data.data.noticeId,"?listId=MeetingList&method=viewTzD&validateByList=1&bmStatus=1"),query:{signUpPk:e.data.data.id,signUpModuleId:e.data.data.moduleId,sendStatus:e.data.data.sendStatus?1:-1,noticeType:e.data.data.noticeType,hyTzlx:e.data.data.noticeType,hytzStatus:e.data.data.hytzStatus}}),a.isShowForm=!0):m.log("不用跳转")}))}};n.initHandle=function(r,a,i){m.log("单位报名"),m.log(i.$route.query),m.log(d.Z.util.loadSessionStore("user")),i.$route.query.userId&&(e=i.$route.query.userId.split(","),n=i.$route.query.deptId.split(","),e.forEach(function(e,t){getUser(e,n[t],"200820104728nFPSM393YR9lLLDqjVy")})),i.formTabs&&0<=(e=i.formTabs.findIndex(function(e){return"流转情况"==e.title}))&&i.formTabs.splice(e,1);var n,e,o="";function u(){var e,t,n=["c-meetingchry-003","c-meetingchry-004","c-meetingchry-002","c-meetingchry-0010"];r&&r.main["c-meetingtz-057"].value&&(n=r.main["c-meetingtz-057"].value.split(","));for(e in a.subform)!function(a){i.formData.multinfos[a]&&i.$watch(function(){return i.formData.multinfos[a].rows},function(e,t){m.log(e),"210812180520LFh4HCmmYKhau77Bubo"!=(o=a)&&r.multinfos[a].rows.forEach(function(e){e.structControl.forEach(function(e){e.show=n.includes(e.metaId)?1:0})})},{deep:!0,immediate:!0})}(e);for(t in a.subform)"210812180520LFh4HCmmYKhau77Bubo"!=t&&a.subform[t].controls.forEach(function(e){e.privilege.visible=!!n.includes(e.metaId)})}function s(e,t){m.log(e),i.$set(e,"c-meetingchry-002",{value:t.userId,text:t.userName,schema:"1::"+t.deptId}),i.$set(e,"c-meetingchry-004",{value:t.deptId,text:t.deptName,schema:"5::"+t.deptId}),i.$set(e,"c-meetingchry-003",{value:t.unitId,text:t.unitName,schema:"5::"+t.unitId}),i.$set(e,"c-meetingchry-0010",{value:t.userMobile}),i.$set(e,"c-meetingchry-0011",{value:t.deptUserOrder}),i.$set(e,"c-meetingchry-0017",{value:t.deptGlobalShoworder}),i.$set(e,"B0001",{value:t.zw||""}),t.orgIdLV1&&i.$set(e,"c-meetingchry-0012",{value:t.orgIdLV1,text:t.orgNameLV1,schema:"5::"+t.orgIdLV1}),t.orgIdLV2&&i.$set(e,"c-meetingchry-0013",{value:t.orgIdLV2,text:t.orgNameLV2,schema:"5::"+t.orgIdLV2}),t.orgIdLV3&&i.$set(e,"c-meetingchry-0014",{value:t.orgIdLV3,text:t.orgNameLV3,schema:"5::"+t.orgIdLV3}),t.orgIdLV4&&i.$set(e,"c-meetingchry-0015",{value:t.orgIdLV4,text:t.orgNameLV4,schema:"5::"+t.orgIdLV4}),t.orgIdLV5&&i.$set(e,"c-meetingchry-0016",{value:t.orgIdLV5,text:t.orgNameLV5,schema:"5::"+t.orgIdLV5})}i.$bus.on("selectUserBus",function(e){var t;"c-meetingchry-002"==e.metaData.metaId&&(t=e.value,d.Z.http.post("fn/meetingNotice/getUserDept",{userId:t}).then(function(a){200==a.data.code&&(r.multinfos[o].rows.forEach(function(e,t){e["c-meetingchry-002"].value==a.data.data.userId&&r.multinfos[o].rows.splice(t,1)}),s(r.multinfos[o].rows[e.subFormIndex],a.data.data))}))}),u(),i.$bus.on("subFormTreeSelect",function(a){var e,t=[],n=[];for(e in r.multinfos)r.multinfos[e].rows.forEach(function(e){t.push(e["c-meetingchry-002"].value)});a.selectArr.forEach(function(e){t.includes(e.id)||n.push(e)});var o=n.map(function(e){return t=e.id,e=e.attrs.deptId,d.Z.http.post("fn/meetingNotice/getUserDept",{userId:t,deptId:e}).then(function(e){return e.data.data});var t});c().all(o).then(function(e){var t;null!=(t=i.$refs)&&null!=(t=t.formTab[0])&&t.$refs[a.subFormId][0]&&i.$refs.formTab[0].$refs[a.subFormId][0].$refs.subform.addMultipleCard(o.length).then(function(a){m.log(a),e.forEach(function(e,t){s(a[t],e)})}).then(function(){u()})})})},n.saveFilter=function(e,t,a){if(m.log(e),0!=e.multinfos["200820104728nFPSM393YR9lLLDqjVy"].rows.length)return new(c())(function(t,e){try{t()}catch(e){t()}});d.Z.layer.toast("请选择参会人员！")},t.default=n}}]);