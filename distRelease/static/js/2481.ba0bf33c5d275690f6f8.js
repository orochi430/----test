"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[2481],{9562:function(e,t,o){o.r(t);o={};function n(e,t,o){e={topicId:e.dataValue.id,topicType:o};dsf.http.post("/fn/conferenceMobile/updateTopicType",e).done(function(e){200==e.code?(dsf.layer.toast(e.message),t.onRefresh()):dsf.layer.toast(e.message)}).error(function(e){dsf.layer.toast(e)})}function i(e,t,o){dsf.http.post("fn/meetingVote/openVote",{topicId:e.dataValue.id,type:o}).done(function(e){"200"==e.code&&(dsf.layer.toast(e.message),t.onRefresh())}).error(function(e){dsf.layer.toast(e)})}o.link=function(e,t,o,n,i){var s=n.$route.query.id;n.$router.push({path:"/commonForm/210607181937YJxUC5fve4y7q3SH5hJ/".concat(i.id,"?listId=MeetingList&method=viewYt&showNodeId=13&validateByList=1&meetingId=").concat(s,"&pk=").concat(i.id)})},o.startTopic=function(e,t){n(e,t,1)},o.endTopic=function(e,t){n(e,t,-1)},o.remindUser=function(e,t){t={meetingId:t.$route.query.id,topicId:e.dataValue.id};dsf.http.post("/fn/conferenceMobile/remindTopicUsers",t).done(function(e){e.code,dsf.layer.toast(e.message)}).error(function(e){dsf.layer.toast(e)})},o.openVot=function(e,t){i(e,t,"1")},o.closeVot=function(e,t){i(e,t,"-1")},o.votStatistics=function(e,t){var o=t.$route.query.id;t.$router.push({path:"/meetingcast",query:{meetingId:o,topicId:e.dataValue.id}})},t.default=o}}]);