"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[53095],{96707:function(e,n,t){t.r(n);var s=t(54397),a=t(25108),t={link:function(e,n,t,o,i){var u;a.log(i),"未开始"==i.meetingId||"进行中"==i.meetingId?o.$parent.$parent.$parent.$refs.meetingDialog.show({number:i.meetingroom,pd:i.password,bt:i.bt}).then(function(e){a.log(e);e={meetingNum:e.number,password:e.pd,micMute:e.checked,videoMute:e.checked1,title:e.bt};a.log(e),(0,s.b)(e)}):"已结束"==i.meetingId?(u={meetingNumber:i.meetingroom,hykssjValue:i.hykssjValue,hyjssjValue:i.hyjssjValue},dsf.http.post("fn/vedioMeeting/judgeVdeoList",u).then(function(e){a.log(e),"200"!=e.data.code?dsf.layer.toast("当前会议暂无可播放的视频",!1):o.$router.push({path:"/commonList?fileType=hysp",query:u})})):dsf.layer.toast("当前会议暂时无法加入",!1)}};n.default=t},54397:function(e,n,t){t.d(n,{b:function(){return u}});var n=t(8450),o=t.n(n),i=t(25108),u=function(n){function t(n){$XYLink.execute(["joinMeeting",n],function(e){i.log(4),e.status||dsf.layer.toast("加入会议：".concat(n.meetingNum,"失败,").concat(e.msg),!1)},function(e){i.log(e)})}i.log(1),$XYLink.execute(["getConnectStatus",{}],function(e){i.log(2),e.connected?t(n):(e={userName:(e=dsf.util.loadSessionStore("user")).name,userId:e.user_id,userData:[{user:e},{loginToken:dsf.util.loadSessionStore("loginToken")}]},$XYLink.execute(["loginById",e],function(e){i.log(3),t(n)},function(e){i.log(e)}))},function(e){i.log(o()(e)),alert(o()(e))})}}}]);