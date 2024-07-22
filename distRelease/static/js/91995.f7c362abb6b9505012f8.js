"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[91995,82791],{82791:function(t,n,e){e.r(n),e.d(n,{default:function(){return i}});var n=e(27921),o=e.n(n),n=e(85579),c=e.n(n),n=e(22013),g=e.n(n);function u(t,n){var e,i,s,a,r=void 0!==c()&&t[g()]||t["@@iterator"];if(r)return i=!(e=!0),{s:function(){r=r.call(t)},n:function(){var t=r.next();return e=t.done,t},e:function(t){i=!0,s=t},f:function(){try{e||null==r.return||r.return()}finally{if(i)throw s}}};if(Array.isArray(t)||(r=function(t,n){var e;if(t)return"string"==typeof t?d(t,n):"Map"===(e="Object"===(e=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:e)||"Set"===e?o()(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?d(t,n):void 0}(t))||n&&t&&"number"==typeof t.length)return r&&(t=r),a=0,{s:n=function(){},n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:n};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,i=new Array(n);e<n;e++)i[e]=t[e];return i}var n={name:"signDetail",data:function(){return{default_avatar:'this.src="'+e(42370)+'"',activePage:0,hasSignNum:0,unSignNum:0,hasSignList:[],unSignList:[],user:dsf.util.loadSessionStore("user"),meeting:dsf.util.loadSessionStore("meeting")}},mounted:function(){this.init()},methods:{init:function(){this.getSignDetail(),this.getHasSign(),this.getUnSign()},getSignDetail:function(){var s=this;dsf.http.post("fn/conferenceSignIn/signInTabs",{meetingId:this.meeting.id}).then(function(t){var n,e=u(t.data.data);try{for(e.s();!(n=e.n()).done;){var i=n.value;"1"===i.type?s.hasSignNum=i.count:s.unSignNum=i.count}}catch(t){e.e(t)}finally{e.f()}})},getHasSign:function(){var o=this;dsf.http.post("fn/conferenceSignIn/signInDetails",{meetingId:this.meeting.id,type:1}).then(function(t){o.hasSignList=[];var n,e=u(t.data.data);try{for(e.s();!(n=e.n()).done;){var i,s=n.value,a=u(s.users);try{for(a.s();!(i=a.n()).done;){var r=i.value;r.department=s.unitName,o.hasSignList.push(r)}}catch(t){a.e(t)}finally{a.f()}}}catch(t){e.e(t)}finally{e.f()}})},getUnSign:function(){var o=this;dsf.http.post("fn/conferenceSignIn/signInDetails",{meetingId:this.meeting.id,type:-1}).then(function(t){o.unSignList=[];var n,e=u(t.data.data);try{for(e.s();!(n=e.n()).done;){var i,s=n.value,a=u(s.users);try{for(a.s();!(i=a.n()).done;){var r=i.value;r.department=s.unitName,o.unSignList.push(r)}}catch(t){a.e(t)}finally{a.f()}}}catch(t){e.e(t)}finally{e.f()}})},remindAll:function(){dsf.http.post("/fn/conferenceSignIn/signInMessageReminder",{meetingId:this.meeting.id}).then(function(t){"success"===t.data.type?dsf.layer.toast("提醒成功"):dsf.layer.toast("提醒失败，请检查网络！")})}}},i=(0,e(51900).Z)(n,function(){var n=this,e=n._self._c;return e("div",{staticClass:"container"},[e("div",{staticClass:"container-header"},[e("div",{staticClass:"top"},[e("van-cell",{attrs:{title:"签到管理",icon:"arrow-left",center:""},on:{click:function(t){return n.$router.back()}}})],1),n._v(" "),e("div",{staticClass:"container-tabs"},[e("van-tabs",{staticClass:"container-header-tabs",attrs:{animated:"",type:"card"}},[e("van-tab",{attrs:{title:"已签到（"+n.hasSignNum+"）"}},[e("van-list",n._l(n.hasSignList,function(t){return e("van-cell",{key:t.id},[e("div",{staticClass:"person-card"},[e("img",{attrs:{src:n.dsf.url.getWebPath(t.img),onerror:n.default_avatar,alt:""}}),n._v(" "),e("div",{staticClass:"person-card-name"},[n._v(n._s(t.name))]),n._v(" "),e("div",{staticClass:"person-card-phone"},[n._v(n._s(t.phone))]),n._v(" "),e("div",{staticClass:"person-card-department"},[n._v("\n                  "+n._s(t.department)+"\n                ")]),n._v(" "),e("div",{staticClass:"person-card-singText"},[n._v("\n                  签到时间: "+n._s(t.time)+"\n                ")])])])}),1)],1),n._v(" "),e("van-tab",{attrs:{title:"未签到（"+n.unSignNum+"）"}},[n._l(n.unSignList,function(t){return e("van-cell",{key:t.id},[e("div",{staticClass:"person-card"},[e("img",{attrs:{src:n.dsf.url.getWebPath(t.img),onerror:n.default_avatar,alt:""}}),n._v(" "),e("div",{staticClass:"person-card-name"},[n._v(n._s(t.name))]),n._v(" "),e("div",{staticClass:"person-card-phone"},[n._v(n._s(t.phone))]),n._v(" "),e("div",{staticClass:"person-card-department"},[n._v("\n                "+n._s(t.department)+"\n              ")]),n._v(" "),e("div",{staticClass:"person-card-singText"},[n._v(n._s(t.singText))])])])}),n._v(" "),e("div",{staticClass:"btn-container"},[e("van-button",{staticClass:"remindBtn",on:{click:n.remindAll}},[n._v(" 一键提醒 ")])],1)],2)],1)],1)])])},[],!1,null,"05487cf5",null).exports},91995:function(t,n,e){e.r(n),e.d(n,{default:function(){return s}});e(44884);var n=e(82791),i=e(25108),n={name:"signIn",components:{signDetail:n.default},data:function(){return{geoLocation:{},address:"定位中……",time:"00:00:00",user:dsf.util.loadSessionStore("user"),meeting:dsf.util.loadSessionStore("meeting"),timeInterval:{},nowDateYMD:"",onTime:!1,isSign:!1,scheduleId:"",startTime:"",endTime:"",signText:"",signInData:{}}},computed:{},mounted:function(){this.init()},methods:{init:function(){var n=this;this.nowDateYMD=this.getDate(),this.time=this.getTime(),this.showTime(),dsf.http.post("fn/conferenceSignIn/getUserCurrentSignInDetail",{meetingId:this.meeting.id}).then(function(t){n.signInData=t.data.data,n.scheduleId=n.signInData.scheduleId;t=n.signInData.time.split(" - ");n.startTime=t[0],n.endTime=t[1],n.signText=n.isOnTime(),n.isSign="已签到"===n.signInData.signText}).error(function(t){i.log(t)})},getIsSign:function(){this.isSign=!1},isOnTime:function(){var t=this.startTime.length<6?this.getDate2():this.getDate();return this.onTime=t>=this.startTime&&t<=this.endTime,t<this.startTime?"会议未开始":t>this.endTime?"已超时":this.onTime?"签到":void 0},showTime:function(){var t=this;this.timeInterval=setInterval(function(){t.time=t.getTime()},1e3)},getTime:function(){var t=new Date;return(10<=t.getHours()?t.getHours():"0"+t.getHours())+":"+(10<=t.getMinutes()?t.getMinutes():"0"+t.getMinutes())+":"+(10<=t.getSeconds()?t.getSeconds():"0"+t.getSeconds())},getDate:function(){var t=new Date;t.getFullYear();return(10<=t.getMonth()+1?t.getMonth()+1:"0"+(t.getMonth()+1))+"-"+(10<=t.getDate()?t.getDate():"0"+t.getDate())+" "+(10<=t.getHours()?t.getHours():"0"+t.getHours())+":"+(10<=t.getMinutes()?t.getMinutes():"0"+t.getMinutes())+":"+(10<=t.getSeconds()?t.getSeconds():"0"+t.getSeconds())},getDate2:function(){var t=new Date;return(10<=t.getHours()?t.getHours():"0"+t.getHours())+":"+(10<=t.getMinutes()?t.getMinutes():"0"+t.getMinutes())},doSign:function(){var n=this;dsf.http.post("fn/conferenceSignIn/doSign",{meetingId:this.meeting.id,scheduleId:this.scheduleId}).done(function(t){"success"===t.type?(n.isSign=!0,n.signInData.signtime=n.getDate()):dsf.layer.toast(t.message)}).error(function(t){i.log("doSign-error",t),dsf.layer.toast("签到失败！")})}},beforeDestroy:function(){clearInterval(this.timeInterval)}},s=(0,e(51900).Z)(n,function(){var n=this,t=n._self._c;return t("div",[t("div",{staticClass:"container"},[n._m(0),n._v(" "),n._m(1),n._v(" "),t("div",{staticClass:"sign-card"},[t("van-button",{ref:"signBtn",attrs:{type:"primary",disabled:n.isSign||!n.onTime},on:{click:function(t){n.isSign||n.doSign()}}},[t("div",{directives:[{name:"show",rawName:"v-show",value:!n.isSign,expression:"!isSign"}],staticClass:"sign-card-text"},[n._v(n._s(n.signText))]),n._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:n.isSign,expression:"isSign"}],staticClass:"sign-card-text"},[n._v("已签到")]),n._v(" "),t("div",{staticClass:"sign-card-time"},[n._v(n._s(n.time))])]),n._v(" "),t("div",{staticClass:"signTime"},[t("ul",[t("li",{directives:[{name:"show",rawName:"v-show",value:n.signInData.time,expression:"signInData.time"}]},[t("span",[n._v("可签到时间:")]),n._v(" "),t("b",[n._v(n._s(n.signInData.time))])]),n._v(" "),t("li",{directives:[{name:"show",rawName:"v-show",value:n.isSign,expression:"isSign"}]},[t("span",[n._v("已签到时间:")]),n._v(" "),t("b",[n._v(n._s(n.signInData.signtime))])])])])],1)])])},[function(){var t=this._self._c;return t("div",{staticClass:"bg-image"},[t("img",{attrs:{src:"static/images/meetingPad/signIn-bg.png",alt:""}})])},function(){var t=this._self._c;return t("div",{staticClass:"signIn-header"},[t("div",{staticClass:"signIn-header-text"},[this._v("\n          签到\n        ")])])}],!1,null,"32580246",null).exports},42370:function(t,n,e){t.exports=e.p+"static/img/avatar.2072ed9..png"}}]);