"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[49622],{49622:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var e={name:"topicFeedback",components:{},data:function(){return{active:0,yfk:0,wfk:0,List:[],flag:!1,checkAll:!0}},computed:{},watch:{active:function(t){this.getData()}},methods:{infoClick:function(t){-1!=t.status&&this.$router.push({path:"/commonList/210811150517FCnrNOnLfIKfGy2od3e/210607181937YJxUC5fve4y7q3SH5hJ",query:{secQuery:'{"masterId": "'.concat(this.$route.query.pk,'","fillDept":"').concat(t.deptId,'"}')}})},checkChange:function(t){var e=this.List.find(function(t){return-1==t.status&&!t.checked});this.checkAll=!!e},btn1Click:function(t){var e=this,a="",c=!1;2!=t?(this.List.forEach(function(t){-1==t.status&&(t.checked=!!e.checkAll)}),this.checkAll=!1):(this.List.forEach(function(t,e){t.checked&&("已上报"==t.statusName&&(c=!0),a+=""==a?t.id:","+t.id)}),c?dsf.layer.toast("存在已上报人员，请重新选择"):a?dsf.http.post("fn/meetingTopic/urgeRemindYtzx",{solicitId:this.$route.query.pk,type:t,fillTopicIds:a}).done(function(t){t.code,dsf.layer.toast(t.message)}):dsf.layer.toast("请至少选择一个部门"))},getNum:function(e){var a=this;dsf.http.post("/fn/meetingTopic/getTopicSolicitFeedbackData",{solicitId:this.$route.query.pk,type:1==e?"wfk":"yfk"}).done(function(t){"200"==t.code?1==e?a.wfk=t.data.length:a.yfk=t.data.length:dsf.layer.toast(t.message)})},getData:function(){var e=this,a=this;dsf.http.post("/fn/meetingTopic/getTopicSolicitFeedbackData",{solicitId:this.$route.query.pk,type:0==this.active?"all":1==this.active?"wfk":"yfk"}).done(function(t){"200"==t.code?t.data&&(e.List=[],t.data.forEach(function(t){e.$set(t,"checked",!1)}),a.List=t.data,a.flag=!0):dsf.layer.toast(t.message)})}},created:function(){},mounted:function(){var t=this;this.$nextTick(function(){t.getData(),t.getNum(1),t.getNum(2)})},destroyed:function(){}},a=(0,i(51900).Z)(e,function(){var a=this,c=a._self._c;return a.flag?c("div",{staticClass:"meetEnter"},[c("van-tabs",{attrs:{color:"#0075CD"},model:{value:a.active,callback:function(t){a.active=t},expression:"active"}},[c("van-tab",{attrs:{title:"全部（".concat(a.yfk+a.wfk,"）")}}),a._v(" "),c("van-tab",{attrs:{title:"未反馈（".concat(a.wfk,"）")}}),a._v(" "),c("van-tab",{attrs:{title:"已反馈（".concat(a.yfk,"）")}})],1),a._v(" "),0<a.List.length?c("div",{staticClass:"content"},a._l(a.List,function(e,t){return c("div",{key:t,staticClass:"card"},[c("div",{staticClass:"title"},[a.active<2?c("van-checkbox",{attrs:{"icon-size":"14px",shape:"square"},on:{change:function(t){return a.checkChange(e)}},model:{value:e.checked,callback:function(t){a.$set(e,"checked",t)},expression:"item.checked"}}):a._e(),a._v(" "),c("div",{staticClass:"topic",on:{click:function(t){return a.infoClick(e)}}},[c("img",{attrs:{src:i(10749),alt:""}}),a._v(" "),c("span",[a._v(a._s(e.deptName)+" ")]),a._v(" "),c("label",{class:{active:"未上报"!=e.statusName},attrs:{for:""}},[a._v(a._s("未上报"==e.statusName?"未反馈":"已上报"==e.statusName?"已反馈":e.statusName))])])],1)])}),0):c("div",{staticClass:"content"},[c("commonempty",{staticClass:"meeting-empty",attrs:{image:i(96996),description:"暂无反馈情况"}})],1),a._v(" "),a.active<2?c("div",{staticClass:"footer"},[c("button",{staticClass:"btn1",on:{click:function(t){return a.btn1Click(1)}}},[a._v("\n      "+a._s(a.checkAll?"全选":"全不选")+"\n    ")]),a._v(" "),c("button",{staticClass:"btn2",on:{click:function(t){return a.btn1Click(2)}}},[a._v("催办")])]):a._e()],1):a._e()},[],!1,null,"da3a08e4",null).exports},10749:function(t,e,a){t.exports=a.p+"static/img/hy-dept.28f5070..png"},96996:function(t,e,a){t.exports=a.p+"static/img/img_hyap.6dd1a5b..png"}}]);