"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[85566],{50351:function(t,e,a){a.r(e);var n=a(25108),a={},s="",o="",u="",r="",i=[],d=[];a.handle=function(t,e){},a.initHandle=function(t,e,a){a.$bus.on("inputRadio",function(t){n.log(t),t.metaData.metaId&&(3==t.value?dsf.http.post("fn/gtjMeeting/getCurrentDeptParticipants",{pk:a.$route.query.oldpk,deptId:dsf.util.loadSessionStore("user").deptId}).then(function(t){t.data.data&&(s=(a.$route.query.cancelsignup?(t.data.data.forEach(function(t){t.userId!=dsf.util.loadSessionStore("user").user_id&&i.push(t.userName)}),r=i.join(","),t.data.data.forEach(function(t){t.userId!=dsf.util.loadSessionStore("user").user_id&&d.push(t.userId)}),d):(r=t.data.data.map(function(t){return t.userName}).join(","),t.data.data.map(function(t){return t.userId}))).join(","),a.$set(a.formData.main,"C-MEETINGTZ-TODO-002",{text:r,value:s}))}):(r=[],s="",i=[],d=[],a.$set(a.formData.main,"C-MEETINGTZ-TODO-002",{text:"",value:"",schema:""})))}),a.$bus.on("selectUserBus",function(t){o=t.value})},a.confirmAssign=function(t,e,a){3==a.formData.main["C-MEETINGTZ-TODO-022"].value&&(u=o||s,a.formData.main["C-MEETINGTZ-TODO-002"].text?dsf.http.post("fn/gtjMeeting/checkConflict",{pk:a.$route.query.oldpk,userIds:s}).then(function(t){t.data.data?dsf.layer.confirm({title:"冲突提醒",message:t.data.data,confirmButtonText:"继续派会",cancelButtonText:"重新选人"},function(){dsf.http.post("fn/meetingapi/meeting/entrustMember",{pk:a.$route.query.oldpk,oldUsers:s,member:u,reason:a.formData.main["C-MEETINGTZ-TODO-009"].value}).then(function(t){"success"==t.data.type?dsf.layer.toast("派会成功","",function(){a.$router.back()}):dsf.layer.toast("派会失败","",function(){a.$router.back()})})},function(){dsf.layer.toast("请重新选人！")}):dsf.http.post("fn/meetingapi/meeting/entrustMember",{pk:a.$route.query.oldpk,oldUsers:s,member:u,reason:a.formData.main["C-MEETINGTZ-TODO-009"].value}).then(function(t){"success"==t.data.type?dsf.layer.toast("派会成功","",function(){a.$router.back()}):dsf.layer.toast("派会失败","",function(){a.$router.back()})})}):dsf.layer.toast("请选择委托人员!"))},e.default=a}}]);