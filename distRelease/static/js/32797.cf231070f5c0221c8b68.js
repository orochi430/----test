"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[32797],{21516:function(e,n,t){t.r(n);var a=t(73473),r=t.n(a),c=t(90541),a={initHandle:function(e,n,t){},saveAfter:function(e,n,t){var a,o;e.$eventBus.refresh(e),e.pk?c.Z.layer.toast("表单保存成功"):(a=t.main.A0001.value,o=t.main.A0004.value,c.Z.layer.toast("表单保存成功",void 0,function(){e.$router.replace({path:"/commonForm/".concat(o,"/").concat(a)})}))},saveFilter:function(a,e,o,n){return new(r())(function(n,t){c.Z.http.post("fn/followerController/checkExists",{followerId:a.main["c-rq-space-follower-user-006"].value}).then(function(e){e.data.data?t("跟进人已存在!"):o.pk?n():c.Z.http.post("fn/commonTool/getIdByTableName",{tableName:"rq_space_follower_user",dbName:"ImBzServiceConnection"}).then(function(e){e=e.data.data.id;o.$set(a.main,"A0001",{value:e}),n()})})})}};n.default=a}}]);