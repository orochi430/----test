"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[54985],{83390:function(t,n,e){e.r(n);var c=e(25108),e={handle:function(t,n){},initHandle:function(t,e,n){c.log("会议通知16节点"),dsf.http.post("/fn/meetingNotice/getTopic",{pk:n.formData.main.A0001.value}).then(function(t){c.log(t),200==t.data.code&&0<t.data.data.length&&(c.log(n.formTabs),n.formTabs.push({enable:!0,name:"meettingTopic",title:"会议议题"}))}),0==e.parameters.nodeId||"-2"==e.parameters.nodeId||t.main.B0003.value||(o=["会议届次"],e.controls.forEach(function(t){o.includes(t.label)&&(t.show=0)})),null!=(i=dsf.config.meetProjectconfig)&&i.BGTsingUpInfo&&e.parameters.todoId&&(a=["开始时间","结束时间","会议类型"],e.controls.forEach(function(t){a.includes(t.label)&&(t.show=0)}),n.$watch(function(){return n.formData.main["c-meetingtz-030"].value},function(t,n){t||e.controls.forEach(function(t){"c-meetingtz-030"==t.metaId&&(t.show=0)})},{deep:!0,immediate:!0})),-1==t.main["c-meetingtz-016"].value&&1==n.$route.query.noticeType&&0<=(i=n.formButtons.mainButtons.findIndex(function(t){return"转交"==t.name}))&&n.formButtons.mainButtons.splice(i,1);["出席领导","列席领导","出席部门","列席部门","出席单位","出席人员","列席人员","特邀人员","外单位人员","列席单位","工作人员"].forEach(function(n){e.controls.forEach(function(t){t.label==n&&(t.show=0)})}),dsf.http.post("/fn/meetingType/getMeetingType",{meetingTypeId:t.main["c-meetingtz-004"].value}).then(function(t){200==t.data.code&&t.data.data&&(c.log(t),(t=t.data.data).chdxText)&&t.chdxText.split(",").forEach(function(n){e.controls.forEach(function(t){t.label==n&&(t.show=1)}),"出席部门"==n&&e.controls.forEach(function(t){"通知部门"==t.label&&(t.show=1)})})});var o,a,i=dsf.util.loadLocalStore("user");0<=t.main["c-meetingtz-049"].value.indexOf(i.user_id)&&2!=n.$route.query.noticeType&&0<=(t=n.formButtons.mainButtons.findIndex(function(t){return"报名"==t.name}))&&n.formButtons.mainButtons.splice(t,1)},viewMeetingSign:function(t,n,e){e.$router.push({path:"/commonForm/".concat(e.$route.query.signUpModuleId,"/").concat(e.$route.query.signUpPk,"?listId=MeetingBmList&method=viewBmb&validateByList=1&tzlx=").concat(e.$route.query.hyTzlx)})}};n.default=e}}]);