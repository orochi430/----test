"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[52264],{99640:function(t,e,a){a.r(e);var n=a(73473),o=a.n(n),n=a(79529),I=a.n(n),s=a(90541),T=a(25108),n=(T.log("11"),{});function E(){var t=new Date,e=t.getFullYear(),a=t.getMonth()+1,t=t.getDate();return e+"-"+u(a)+"-"+u(t)}function u(t){return t=I()(t)<10?"0"+t:t}n.handle=function(t,e,a){},n.initHandle=function(e,a,I){T.log(I),T.log(e.opinion),"1"==I.$route.query.gly?(I.$set(e.main["C-MEETING-TOPIC-0072"],"value",1),I.$set(e.main["C-MEETING-TOPIC-0021"],"value",2),I.$set(e.main["C-MEETING-TOPIC-0021"],"text","已上报")):(I.$set(e.main["C-MEETING-TOPIC-0072"],"value","-1"),I.$set(e.main["C-MEETING-TOPIC-0021"],"value",1),I.$set(e.main["C-MEETING-TOPIC-0021"],"text","待通过")),"1"==e.main["C-MEETING-TOPIC-0072"].value?a.controls.forEach(function(t){"C-MEETING-TOPIC-0064"==t.metaId&&I.$set(t,"show",1),"C-MEETING-TOPIC-0065"==t.metaId&&I.$set(t,"show",1),"C-MEETING-TOPIC-0066"==t.metaId&&I.$set(t,"show",1),"C-MEETING-TOPIC-0067"==t.metaId&&I.$set(t,"show",1),"B0038"==t.metaId&&I.$set(t,"show",1)}):a.controls.forEach(function(t){"C-MEETING-TOPIC-0064"==t.metaId&&I.$set(t,"show",0),"C-MEETING-TOPIC-0065"==t.metaId&&I.$set(t,"show",0),"C-MEETING-TOPIC-0066"==t.metaId&&I.$set(t,"show",0),"C-MEETING-TOPIC-0067"==t.metaId&&I.$set(t,"show",0),"B0038"==t.metaId&&I.$set(t,"show",0)}),I.$watch(function(){return I.formData.main["C-MEETING-TOPIC-0064"].value},function(t,e){T.log(t),"1"==t?a.controls.forEach(function(t){"C-MEETING-TOPIC-0048"==t.metaId&&I.$set(t,"show",1),"C-MEETING-TOPIC-0008"==t.metaId&&I.$set(t,"show",1),"C-MEETING-TOPIC-0051"==t.metaId&&I.$set(t,"show",1),"C-MEETING-TOPIC-0044"==t.metaId&&I.$set(t,"show",1)}):a.controls.forEach(function(t){"C-MEETING-TOPIC-0048"==t.metaId&&I.$set(t,"show",0),"C-MEETING-TOPIC-0008"==t.metaId&&I.$set(t,"show",0),"C-MEETING-TOPIC-0051"==t.metaId&&I.$set(t,"show",0),"C-MEETING-TOPIC-0044"==t.metaId&&I.$set(t,"show",0)})},{deep:!0,immediate:!0}),a.controls.forEach(function(t){"B0019"==t.metaId&&I.$set(t,"show",0)});var t,n=!1;for(t in e.opinion)0<e.opinion[t][0].opinionContent.length&&(n=!0);0!=a.parameters.nodeId&&"-2"!=a.parameters.nodeId||a.controls.forEach(function(t){"审批意见"==t.label&&I.$set(t,"show",0)}),"-7"!=a.parameters.nodeId&&"-1"!=a.parameters.nodeId&&"17"!=a.parameters.nodeId||n||a.controls.forEach(function(t){"审批意见"==t.label&&I.$set(t,"show",0)}),T.log(new Date),"-1"==e.main["C-MEETING-TOPIC-0021"].value&&(a.buttons={commonButtons:[],mainButtons:[]},I.$set(I.formButtons,"commonButtons",[]),I.$set(I.formButtons,"mainButtons",[])),I.$route.query.hylx&&(I.$set(e.main["C-MEETING-TOPIC-0042"],"value",I.$route.query.hylx),I.$set(e.main["C-MEETING-TOPIC-0042"],"text",I.$route.query.hylxText),a.controls.forEach(function(t){"C-MEETING-TOPIC-0042"==t.metaId&&I.$set(t.privilege,"editable",!1)})),I.$route.query.masterId&&I.$set(e.main.B0035,"value",I.$route.query.masterId),I.$route.query.sfzx&&(I.$set(e.main["C-MEETING-TOPIC-0043"],"value",1),I.$set(e.main["C-MEETING-TOPIC-0043"],"text","是")),I.$bus.on("checkVal",function(t){T.log(t),"C-MEETING-TOPIC-0042"==t.metaData.metaId&&s.Z.http.post("/fn/meetingType/getMeetingType",{meetingTypeId:t.value}).then(function(t){200==t.data.code&&t.data.data&&(t=t.data.data,I.$set(e.main,"C-MEETING-TOPIC-0008",{value:t.chbm,text:t.chbmText,schema:t.chbmSchema}))}),"C-MEETING-TOPIC-0048"==t.metaData.metaId&&s.Z.http.post("/fn/meetingTopicType/getTopicTypes",{pks:t.value}).then(function(t){var a,n,o;200==t.data.code&&t.data.data&&(t=t.data.data,o=n=a="",t.forEach(function(t,e){a+=0==e?t.defaultDept:","+t.defaultDept,n+=0==e?t.defaultDeptText:","+t.defaultDeptText,o+=0==e?t.defaultDeptSchema:","+t.defaultDeptSchema}),I.$set(e.main,"C-MEETING-TOPIC-0008",{value:a,text:n,schema:o}))})})},n.saveFilter=function(a,t,n,e){return new(o())(function(t,e){60<a.main["C-MEETING-TOPIC-0006"].value?e("汇报时长不得超过60分钟,请重新填写"):(T.log(E()),n.$set(a.main.B0019,"value",E()),t())})},e.default=n}}]);