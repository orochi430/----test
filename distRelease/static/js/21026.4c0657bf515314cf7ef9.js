"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[21026],{21026:function(e,s,t){t.r(s),t.d(s,{default:function(){return n}});var a=t(25108),s={name:"situation_control",data:function(){return{promise_show:!1,promise_message:{},three_handle:{1:{can_handle:!0,message:"",skip:!1},2:{can_handle:!0,message:"",skip:!1},3:{can_handle:!0,message:"",skip:!1}}}},created:function(){var s=this;["1","2","3"].forEach(function(e){s.checkFill(e)})},methods:{checkFill:function(s){var t=this;dsf.http.get("action?EpidemicAppAction=1",{moduleType:s,userId:dsf.util.loadSessionStore("user").user_id}).then(function(e){e=e.data;e.code=200,t.three_handle[s]={skip:e.data.flag,message:e.message,can_handle:e.data.writeFlag},a.log(t.three_handle)})},concreteHandle:function(e){if(this.three_handle[e].skip)switch(e){case"1":this.skipToPage("/messageSurvey");break;case"2":this.skipToPage("/greenCodeUpload");break;case"3":this.getPromise()}else dsf.layer.toast(this.three_handle[e].message)},getPromise:function(){var s=this;dsf.http.get("action?EpidemicAppAction=5",{userId:dsf.util.loadSessionStore("user").user_id}).then(function(e){var e=e.data;200==e.code&&(s.promise_message=e.data,s.promise_message.date||(e=new Date,s.promise_message.date="".concat(e.getFullYear(),"-").concat(9<e.getMonth()+1?e.getMonth()+1:"0"+(e.getMonth()+1),"-").concat(9<e.getDate()?e.getDate():"0"+e.getDate())),s.promise_show=!0),a.log(s.promise_message)})},sureRead:function(){var s=this;this.promise_message.flag||dsf.http.get("action?EpidemicAppAction=6",{userId:dsf.util.loadSessionStore("user").user_id,name:this.promise_message.name,date:this.promise_message.date}).then(function(e){e=e.data;200==e.code&&(s.checkFill("3"),dsf.layer.toast(e.message),s.promise_show=!1)})},skipToPage:function(e){this.$router.push({path:e,query:{}})}}},n=(0,t(51900).Z)(s,function(){var s=this,e=s._self._c;return e("div",{staticClass:"situation_control"},[e("div",{staticClass:"single_item"},[e("img",{attrs:{src:"static/images/greatWisdom/message.png",alt:""},on:{click:function(e){return s.concreteHandle("1")}}}),s._v(" "),s.three_handle[1].can_handle?s._e():e("van-icon",{staticClass:"can_handle",attrs:{name:"warning-o"}})],1),s._v(" "),e("div",{staticClass:"single_item"},[e("img",{attrs:{src:"static/images/greatWisdom/code.png",alt:""},on:{click:function(e){return s.concreteHandle("2")}}}),s._v(" "),s.three_handle[2].can_handle?s._e():e("van-icon",{staticClass:"can_handle",attrs:{name:"warning-o"}})],1),s._v(" "),e("div",{staticClass:"single_item"},[e("img",{attrs:{src:"static/images/greatWisdom/promise.png",alt:""},on:{click:function(e){return s.concreteHandle("3")}}}),s._v(" "),s.three_handle[3].can_handle?s._e():e("van-icon",{staticClass:"can_handle",attrs:{name:"warning-o"}})],1),s._v(" "),s.promise_show?e("div",{staticClass:"promise"},[e("div",{staticClass:"content"},[e("p",{staticClass:"close"},[e("van-icon",{attrs:{name:"cross"},on:{click:function(e){s.promise_show=!1}}})],1),s._v(" "),e("h5",[s._v("承诺书")]),s._v(" "),e("div",{staticClass:"word_content"},[e("iframe",{attrs:{src:s.promise_message.content,frameborder:"0",title:"承诺书内容"}}),s._v(" "),e("div",{staticStyle:{"text-align":"right"}},[e("p",[s._v(s._s(s.promise_message.name))]),s._v(" "),e("p",{staticClass:"date"},[s._v(s._s(s.promise_message.date))])])]),s._v(" "),e("van-button",{attrs:{disabled:s.promise_message.flag,type:"info"},on:{click:s.sureRead}},[s._v("\n        我已阅读，确认提交\n      ")])],1)]):s._e()])},[],!1,null,"0349889a",null).exports}}]);