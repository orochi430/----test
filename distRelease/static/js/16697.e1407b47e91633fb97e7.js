"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[16697],{16697:function(t,e,n){n.r(e),n.d(e,{default:function(){return o}});var e={data:function(){return{type:1,radios:[{id:1,text:"日常使用"},{id:2,text:"平台功能"},{id:3,text:"意见建议"},{id:4,text:"其他"}],content:"",reply:"",loading:null,showSelGrp:!1,groupCols:[],orgId:"",orgName:"",btnDisabled:!1}},created:function(){var t=this;t.loading=dsf.layer.loading(),t.$route.params.id?t.getSuggestionDetail():t.getMeetingOrgs()},mounted:function(){},methods:{submit:function(){var e=this;e.content?(e.btnDisabled=!0,dsf.http.post("fn/peopleCongress/suggestionSubmit",{type:e.type,typeName:"",orgId:e.orgId,orgName:e.orgName,content:e.content,meetingId:e.$route.params.meetingId}).done(function(t){200==t.code&&dsf.layer.toast("您的意见已提交！",!0,function(){e.$router.go(-1)})}).error(function(t){dsf.layer.toast("提交失败！"),e.btnDisabled=!1}).always(function(){})):dsf.layer.toast("请填写意见建议内容！")},getSuggestionDetail:function(){var e=this;dsf.http.post("fn/peopleCongress/suggestionDetail",{suggestionId:e.$route.params.id}).done(function(t){200==t.code&&t.data&&(e.type=t.data.type,e.content=t.data.content,e.reply=t.data.reply)}).error(function(t){}).always(function(){dsf.layer.closeLoading(e.loading)})},getMeetingOrgs:function(){var e=this;dsf.http.post("fn/peopleCongress/meetingOrgs",{meetingId:e.$route.params.meetingId}).done(function(t){var n;200==t.code&&t.data&&(n=[],t.data.map(function(t,e){t.children||(t.children=[]),t.children.unshift({id:"",name:""}),n.push(t)}),e.groupCols=n)}).error(function(t){}).always(function(){dsf.layer.closeLoading(e.loading)})},onGrpConfirm:function(t,e){var n=this;n.showSelGrp=!1,n.groupCols[e[0]].children[e[1]].id?(n.orgId=n.groupCols[e[0]].children[e[1]].id,n.orgName=n.groupCols[e[0]].children[e[1]].name):(n.orgId=n.groupCols[e[0]].id,n.orgName=n.groupCols[e[0]].name),n.submit()}}},o=(0,n(51900).Z)(e,function(){var e=this,t=e._self._c;return t("div",{staticClass:"feedback flex"},[t("div",{staticClass:"notice"},[e._v("\n        请对会务有关工作提出您的意见建议。谢谢！\n    ")]),e._v(" "),e.$route.params.id?t("div",{staticClass:"flex1 flex"},[t("div",{staticClass:"feedback-box"},[t("div",{staticClass:"title"},[e._v("反馈内容")]),e._v(" "),t("div",{staticClass:"text"},[e._v(e._s(e.content))]),e._v(" "),e.reply?t("div",[t("van-divider"),e._v(" "),t("div",{staticClass:"title"},[e._v("回复内容")]),e._v(" "),t("div",{staticClass:"text",domProps:{innerHTML:e._s(e.reply)}})],1):e._e()])]):[t("div",{staticClass:"feedback-box"},[t("div",{staticClass:"title"},[e._v("意见建议内容")]),e._v(" "),t("van-field",{attrs:{placeholder:"请输入内容",type:"textarea",rows:"8"},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1)],e._v(" "),e.$route.params.id?e._e():t("div",{staticClass:"btn-container"},[t("van-button",{staticClass:"btn",attrs:{disabled:e.btnDisabled,type:"info"},on:{click:function(t){e.showSelGrp=!0}}},[e._v("提交建议意见")])],1),e._v(" "),t("van-popup",{style:{height:"50vh"},attrs:{position:"bottom",round:""},model:{value:e.showSelGrp,callback:function(t){e.showSelGrp=t},expression:"showSelGrp"}},[t("div",{staticStyle:{width:"100%"}},[t("van-picker",{attrs:{columns:e.groupCols,title:"发送给","show-toolbar":"","value-key":"name"},on:{confirm:e.onGrpConfirm,cancel:function(t){e.showSelGrp=!1}}})],1)])],2)},[],!1,null,"40f05bb5",null).exports}}]);