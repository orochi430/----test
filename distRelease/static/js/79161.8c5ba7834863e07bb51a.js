"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[79161],{46861:function(n,e,o){o.r(e);var i=o(25108),o={link:function(n,e,o,t,d){i.log(d),d.vodId&&d.vodId.toString().length&&dsf.http.post("fn/vedioMeeting/queryPlayConnection?vodId=".concat(d.vodId)).then(function(n){n=n.data;i.log(n),n.playUrl&&n.playUrl.length?(t.video.showVideo=!0,t.video.videoTitle="视频播放",t.video.src=n.playUrl):dsf.layer.toast("当前会议视频暂无播放地址",!1)})}};e.default=o}}]);