"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[98757],{37462:function(e,t,i){i.r(t),i.d(t,{default:function(){return n}});var t=i(34755),s=i(5287),t={components:{topicItem:t.Z,enclosurePopup:s.Z},props:{allMeetingTopics:{type:Array},meetingId:{type:String},modal:{type:String,default:"form"}},data:function(){return{activeName:0,loading:null,meetingTopics:[],isNoData:!1}},watch:{allMeetingTopics:function(e,t){this.meetingTopics=e}},created:function(){this.getMyAgendas()},mounted:function(){},methods:{getMyAgendas:function(){var t=this;this.isNoData=!1,this.allMeetingTopics?this.meetingTopics=this.allMeetingTopics:(this.loading=dsf.layer.loading(),dsf.http.post("fn/conferenceMobile/meetingTopics",{meetingId:this.$route.params.id}).done(function(e){200==e.code&&e.data?(t.meetingTopics=e.data,t.meetingTopics.forEach(function(e){e.files.forEach(function(e){e.id=e.fileId,e.isHandwrite="1"})})):t.isNoData=!0}).error(function(e){}).always(function(){dsf.layer.closeLoading(t.loading)}))},openFile:function(e){this.$refs.enclosurePopup.open(e)}}},n=(0,i(51900).Z)(t,function(){var e=this,t=e._self._c;return t("div",{staticClass:"meetIngTopics",class:{index:"form"!==e.modal}},[t("topic-item",{attrs:{topics:e.meetingTopics},on:{openFile:e.openFile}}),e._v(" "),e.isNoData?t("commonempty"):e._e(),e._v(" "),t("enclosurePopup",{ref:"enclosurePopup"})],1)},[],!1,null,null,null).exports},8826:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var t=[function(){var e=this._self._c;return e("div",{staticClass:"yicheng"},[e("img",{attrs:{src:n(8835),alt:""}}),this._v(" "),e("span",[this._v("会议议程")])])},function(){var e=this._self._c;return e("div",{staticClass:"yicheng"},[e("img",{attrs:{src:n(75e3),alt:""}}),this._v(" "),e("span",[this._v("会议议题")])])}],i=n(37462),s=n(33843),a=n(25108);moment.locale("zh-cn");var i={name:"scheduleDetails",components:{meetingTopics:i.default,signinPopup:s.Z},data:function(){return{id:this.$route.params.id,showId:this.$route.query.showId,show:!1,data:[],currentIndex:0,curItem:{},second:5,timer:null,meeting:dsf.util.loadSessionStore("meeting"),allMeetingTopics:[],userId:dsf.util.loadSessionStore("user").user_id,isShowSchedules:!1,showSign:!1}},computed:{},watch:{},methods:{signin:function(){this.showSign=!1,this.curItem.signtime=dsf.date.format(new Date,"yyyy-mm-dd hh:ii")},goBack:function(){this.$router.go(-1)},formatDate:function(e,t){return e=e.replace(/-/g,"/"),moment(new Date(e)).format(t)},compareDate:function(e){var t=(new Date).getFullYear(),i="".concat(t,"-").concat(e.showDate," ").concat(e.stime),t="".concat(t,"-").concat(e.showDate," ").concat(e.etime),e=i.replace(/-/g,"/"),i=t.replace(/-/g,"/"),t=moment(new Date(e)),e=moment(new Date(i)),i=t.from(e,!0).replace(" ","").replace(/^(an|a)/,"1");return i.includes("month")?i=i.replace(/(months|month)/,"月"):i.includes("day")?i=i.replace(/(days|day)/,"天"):i.includes("hour")&&(i=i.replace(/(hours|hour)/,"小时")),i=i.includes("minute")?i.replace(/(minutes|minute)/,"分钟"):i},showMySeat:function(){var e,t;this.curItem.seatFileId?(t=dsf.url.getServerUrl("fn/office/openMobileOffice?fileId=".concat(this.curItem.seatFileId,"&moduleId=").concat(this.curItem.moduleId,"&nodeId=").concat(this.curItem.nodeId,"&flowId=").concat(this.curItem.flowId,"&filename=").concat(this.curItem.fileName)),(e=[]).push(t),ImagePreview({images:e,startPosition:0})):(t=dsf.url.getServerUrl("p1105/190105112112w29SDA3bDIEFCTSKWkd/seatDesign/index.html#/mobileView/hw/".concat(this.curItem.id,"/").concat(this.curItem.ryId)),this.$router.push({name:"dsfIframe",params:{url:t,title:"我的位置"}})),self.meeting.myMeetingIdx=self.currentIndex,dsf.util.saveToSessionStore("meeting",self.meeting)},getMeetingTopics:function(e){var t=this;e&&dsf.http.post("fn/conferenceMobile/scheduleTopics",{meetingId:this.meeting.id,scheduleId:e.id}).done(function(e){"success"==e.type&&e.data&&(t.allMeetingTopics=e.data)}).error(function(e){a.log(e)})},changeItem:function(e){this.currentIndex=e,this.curItem=this.data[e],this.getMeetingTopics(this.data[e])},loadData:function(){var i=this,s=(dsf.util.loadSessionStore("user"),this);this.data=[],this.$toast.loading("加载中"),dsf.http.post("/fn/conferenceMobile/mySchedule",{meetingId:this.id}).done(function(e){var t;s.$toast.clear(),"success"==e.type&&(s.data=e.data,s.showId?(t=s.data.findIndex(function(e){return e.id==s.showId}))<0&&(t=0):-1<s.meeting.myMeetingIdx?t=s.meeting.myMeetingIdx:(t=s.data.findIndex(function(e){return e.id==i.$route.query.id}))<0&&(t=0),s.currentIndex=t,s.curItem=s.data[t],i.getMeetingTopics(s.data[t]),s.$nextTick(function(){var e=document.getElementById("tab-".concat(s.currentIndex));e&&e.scrollIntoView({behavior:"auto",block:"nearest",inline:"nearest"})}),s.meeting.myMeetingIdx=-1,dsf.util.saveToSessionStore("meeting",s.meeting))})}},created:function(){var e=this;this.loadData(),this.$nextTick(function(){e.$route.query.index&&(e.currentIndex=e.$route.query.index)})},mounted:function(){},destroyed:function(){},activated:function(){a.log("meeting-activated")}},c=(0,n(51900).Z)(i,function(){var i=this,s=i._self._c;return s("div",{staticClass:"meeting"},[0<i.data.length?s("div",{staticClass:"content"},[i.curItem.id?s("div",{staticClass:"meet"},[s("div",{staticClass:"top_info"},[s("div",{staticClass:"meet_title"},[i._v(i._s(i.curItem.title))]),i._v(" "),s("div",{staticClass:"meet_time"},[i._v("\n                    "+i._s(i.curItem.showDateWeek)+"\n                ")])]),i._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:i.isShowSchedules,expression:"isShowSchedules"}],staticClass:"schedules"},i._l(i.data,function(e,t){return s("div",{key:t,class:{active:i.currentIndex==t,over:e.passDate},attrs:{id:"tab-".concat(t)},on:{click:function(e){i.isShowSchedules=!1,i.changeItem(t)}}},[s("p",[i._v(i._s(e.stime))]),i._v(" "),s("span",[i._v(i._s(e.showDate))])])}),0),i._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!i.isShowSchedules,expression:"!isShowSchedules"}],staticClass:"meet_info"},[s("div",{staticClass:"meet_hour"},[s("div",{class:["meet_start",{over:i.curItem.passDate}]},[s("span",[i._v(i._s(i.curItem.stime))]),i._v(" "),s("p",[i._v("开始时间")])]),i._v(" "),s("div",{staticClass:"meet_yuji"},[s("div",{staticClass:"change",on:{click:function(e){i.isShowSchedules=!0}}},[i._v("切换")]),i._v(" "),s("p",{staticClass:"line"}),i._v(" "),s("span",[i._v("预计"+i._s(i.compareDate(i.curItem)))])]),i._v(" "),s("div",{class:["meet_start",{over:i.curItem.passDate}]},[s("span",[i._v(i._s(i.curItem.etime))]),i._v(" "),s("p",[i._v("结束时间")])])]),i._v(" "),s("div",{staticClass:"meet_mgs"},[s("div",{directives:[{name:"show",rawName:"v-show",value:i.curItem.address,expression:"curItem.address"}],staticClass:"inputs"},[s("span",[i._v("会议地点")]),i._v(" "),s("p",[i._v(i._s(i.curItem.address))])]),i._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:i.curItem.moderator,expression:"curItem.moderator"}],staticClass:"inputs"},[s("span",[i._v("主持人")]),i._v(" "),s("p",[i._v(i._s(i.curItem.moderator))])]),i._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:i.curItem.ryId||i.curItem.seatFileId,expression:"curItem.ryId||curItem.seatFileId"}],staticClass:"inputs"},[s("span",[i._v("位置")]),i._v(" "),s("p",[i._v(i._s(i.curItem.seat))]),i._v(" "),s("div",{staticClass:"underline",on:{click:function(e){return i.showMySeat()}}},[i._v("查看座次")])]),i._v(" "),1==i.curItem.isSignIn?s("div",{staticClass:"inputs"},[s("span",[i._v("签到情况")]),i._v(" "),s("p"),i._v(" "),1==i.curItem.signValue||i.curItem.signtime?s("div",{staticClass:"btn",on:{click:function(e){i.showSign=!0}}},[i._v(i._s(i.curItem.signtime?"已签到":"签到"))]):s("div",[i._v(i._s(-1==i.curItem.signValue?"未开始":"已结束"))])]):i._e()])]),i._v(" "),i.curItem.remind?s("div",{staticClass:"wxts"},[s("img",{attrs:{src:n(62773),alt:"",srcset:""}}),i._v(" "),s("span",[i._v(i._s(i.curItem.remind))])]):i._e(),i._v(" "),i.curItem.content?s("div",[i._m(0),i._v(" "),s("div",{staticClass:"jieshao",domProps:{innerHTML:i._s(i.curItem.content)}}),i._v(" "),i.allMeetingTopics&&0<i.allMeetingTopics.length?[i._m(1),i._v(" "),s("meetingTopics",{staticClass:"topics",attrs:{allMeetingTopics:i.allMeetingTopics}})]:i._e()],2):i._e()]):i._e()]):i._e(),i._v(" "),0==i.data.length?s("div",{staticClass:"nodata"},[s("img",{attrs:{src:n(32322),alt:"",srcset:""}}),i._v(" "),s("span",[i._v("暂无数据")])]):i._e(),i._v(" "),s("signinPopup",{attrs:{showSign:i.showSign,isSign:!i.curItem.signtime,signtime:i.curItem.signtime,currentSigninDetail:{meetingId:i.meeting.id,scheduleId:i.curItem.id,signinType:i.curItem.signinType}},on:{"update:showSign":function(e){i.showSign=e},"update:show-sign":function(e){i.showSign=e},signIn:i.signin}})],1)},t,!1,null,"43f92db8",null).exports},32322:function(e,t,i){e.exports=i.p+"static/img/wait.a522949..png"},62773:function(e,t,i){e.exports=i.p+"static/img/tips.0e5b368..png"}}]);