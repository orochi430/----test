"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[89144],{89144:function(t,a,n){n.r(a),n.d(a,{default:function(){return s}});var a=n(14355),i=n(25108),a={name:"jinganAttendance",components:{DefaultList:a.default},props:{},data:function(){return{isFirstLoad:!1,active:0,default_avatar:'this.src="'+n(24955)+'"',avatar:dsf.url.getWebPath("/fn/mobilePhoto/download?id=".concat(dsf.util.loadSessionStore("user").user_id,"&time=").concat((new Date).getTime())),user:dsf.util.loadSessionStore("user"),signStyleObject:{height:this.getSignHeight()},btnDesc:"上班打卡",nowTime:new Date,myTimer:null,signInStatus:!1,listParams:{moduleId:"231030143312jAZimKcjnpJzxSm4bK8",listId:"231030144933P7tNP4KkJI7A8TbroI7",params:{notLink:!0}},pk:""}},filters:{dateFormat:function(t){return t?dsf.date.format(t,"hh:ii:ss"):""}},created:function(){},mounted:function(){this.isFirstLoad=!0,this.init()},methods:{getSignHeight:function(){var t=4.3;return this.$store.state.isShowAppHeader&&(t+=.92),"calc(100vh - "+t.toFixed(2)+"rem)"},setTime:function(){var t=this;t.myTimer=setInterval(function(){t.nowTime=new Date},1e3)},init:function(){this.setTime(),this.getMySignInfo()},getMySignInfo:function(){var a=this;dsf.http.get("ctrl/attendanceManage/searchAttendance",{userId:a.user.user_id,type:"1"}).then(function(t){t&&t.data&&200==t.data.code&&null!=t.data.data?(a.signInStatus=!0,a.pk=t.data.data.id):a.signInStatus=!1})},signIn:function(){var t=this;t.user=dsf.util.loadSessionStore("user"),t.signInStatus?dsf.layer.confirm({message:"是否更新打卡",confirmButtonText:"确认"},function(){t.clockIn()}):t.clockIn()},clockIn:function(){var a=this;dsf.http.get("ctrl/attendanceManage/addAttendance",{pk:a.pk,type:"1"}).then(function(t){t&&t.data&&(dsf.layer.toast(t.data.message,200==t.data.code),a.getMySignInfo())})}},beforeRouteLeave:function(t,a,n){this.myTimer&&clearInterval(this.myTimer),n()},activated:function(){var t=this;i.log("signIn.vue-activated","isFirstLoad ->",t.isFirstLoad),t.isFirstLoad||t.init(),t.isFirstLoad=!1},deactivated:function(){this.myTimer&&clearInterval(this.myTimer)},computed:{},watch:{}},s=(0,n(51900).Z)(a,function(){var a=this,t=a._self._c;return t("div",{staticClass:"attendance-page"},[t("div",{staticClass:"attendance-content"},[0==a.active?t("div",{staticClass:"signIn-box"},[t("div",{staticClass:"info"},[t("div",{staticClass:"info-avatar"},[t("img",{attrs:{src:a.avatar,onerror:a.default_avatar}})]),a._v(" "),t("div",{staticClass:"info-msg"},[t("div",{staticClass:"name"},[a._v(a._s(a.user.name))])])]),a._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"content-sign",style:a.signStyleObject},[t("div",{staticClass:"content-sign-container"},[t("div",{class:["sign-btn",a.signInStatus?"update":"sign"],on:{click:function(t){return a.signIn()}}},[t("div",{staticClass:"title"},[a._v(a._s(a.signInStatus?"已打卡":"上班打卡"))]),a._v(" "),t("div",{staticClass:"time"},[a._v(a._s(a._f("dateFormat")(a.nowTime)))])])])])])]):a._e(),a._v(" "),1==a.active?t("div",{staticClass:"statistics-box"},[t("DefaultList",{ref:"DefaultList",attrs:{params:a.listParams}})],1):a._e()]),a._v(" "),t("div",{staticClass:"navi"},[t("van-tabbar",{model:{value:a.active,callback:function(t){a.active=t},expression:"active"}},[t("van-tabbar-item",{scopedSlots:a._u([{key:"icon",fn:function(){return[t("i",{staticClass:"iconfont iconcalendar-check"})]},proxy:!0}])},[t("span",[a._v("签到打卡")])]),a._v(" "),t("van-tabbar-item",{scopedSlots:a._u([{key:"icon",fn:function(){return[t("i",{staticClass:"iconfont iconchart-bar"})]},proxy:!0}])},[t("span",[a._v("考勤统计")])])],1)],1)])},[],!1,null,"7a7940a7",null).exports},24955:function(t,a,n){t.exports=n.p+"static/img/avatar.72c69ac..png"}}]);