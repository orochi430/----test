"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[90102],{90102:function(t,s,i){i.r(s),i.d(s,{default:function(){return a}});var n=i(25108),s={data:function(){return{isShowData:!1,isShowIntro:!0,isShowTime:!1,isShowRicheng:!1,time:0}},methods:{init:function(){this.isShowData=!1,this.isShowIntro=!0,this.isShowTime=!1,this.isShowRicheng=!1},gtouchstart:function(){this.isShowData=!1,this.isShowIntro=!1,this.isShowTime=!0,this.isShowRicheng=!1},gtouchend:function(){this.isShowData=!0,this.isShowIntro=!1,this.isShowTime=!1,this.isShowRicheng=!1,this.glowIn()},glowIn:function(){var t=this;document.querySelectorAll(".glowIn").forEach(function(n){var t=n.textContent.split("");n.textContent="",t.forEach(function(t,s){var i=document.createElement("span");i.textContent=t,i.style.animationDelay="".concat(.05*s,"s"),n.append(i)})}),setTimeout(function(){t.isShowRicheng=!0},2e3)},link:function(){n.log("1111111111111"),this.$router.replace({path:"/commonForm/180719094152MnF6C2hEPtqIvhjJIxo",query:{startTime:dsf.config.yanshi.voiceAssistantStartTime,endTime:dsf.config.yanshi.voiceAssistantEndTime,bt:"部门会议"}})}}},a=(0,i(51900).Z)(s,function(){var s=this,t=s._self._c;return t("div",[t("div",{directives:[{name:"show",rawName:"v-show",value:s.isShowData,expression:"isShowData"}],staticClass:"data"},[t("div",{staticClass:"glowIn"},[s._v(s._s(s.dsf.config.yanshi.voiceAssistantText))]),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:s.isShowRicheng,expression:"isShowRicheng"}],staticClass:"richeng"},[t("div",[s._v("为您创建日程，请确认：")]),s._v(" "),t("div",[s._v("召开部门会议")]),s._v(" "),t("div",{staticClass:"flex jb ac"},[t("span",[s._v("\n          "+s._s(s.dsf.config.yanshi.voiceAssistantStartTime)),t("br"),s._v(s._s(s.dsf.config.yanshi.voiceAssistantWeekDay)+"\n        ")]),s._v(" "),t("van-icon",{attrs:{name:"arrow",size:"26"}}),s._v(" "),t("span",[s._v("\n          "+s._s(s.dsf.config.yanshi.voiceAssistantEndTime)),t("br"),s._v(s._s(s.dsf.config.yanshi.voiceAssistantWeekDay)+"\n        ")])],1),s._v(" "),t("div",{staticClass:"btn-box flex jb ac"},[t("van-button",{attrs:{type:"default"},on:{click:s.init}},[s._v("取消")]),s._v(" "),t("van-button",{attrs:{type:"info"},on:{click:s.link}},[s._v("确定")])],1)])]),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:s.isShowIntro,expression:"isShowIntro"}],staticClass:"intro"},[t("h2",[s._v("Hi,我是小梦")]),s._v(" "),t("h5",[s._v("有什么能帮助您的吗？")])]),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:s.isShowTime,expression:"isShowTime"}],staticClass:"time-box"},[s._m(0)]),s._v(" "),t("div",{staticClass:"circle",on:{touchstart:function(t){return s.gtouchstart()},touchmove:function(t){return s.gtouchmove()},touchend:function(t){return s.gtouchend()}}},[t("img",{attrs:{src:i(70652),alt:""},on:{touchmove:function(t){t.preventDefault()}}})])])},[function(){var t=this,s=t._self._c;return s("span",{staticClass:"start-taste-line"},[s("hr",{staticClass:"hr1"}),t._v(" "),s("hr",{staticClass:"hr2"}),t._v(" "),s("hr",{staticClass:"hr3"}),t._v(" "),s("hr",{staticClass:"hr4"}),t._v(" "),s("hr",{staticClass:"hr5"}),t._v(" "),s("hr",{staticClass:"hr6"}),t._v(" "),s("hr",{staticClass:"hr7"}),t._v(" "),s("hr",{staticClass:"hr8"}),t._v(" "),s("hr",{staticClass:"hr9"}),t._v(" "),s("hr",{staticClass:"hr10"})])}],!1,null,"53da0ade",null).exports},70652:function(t,s,i){t.exports=i.p+"static/img/yuyin.1376f79..svg"}}]);