"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[20483],{20483:function(t,e,s){s.r(e),s.d(e,{default:function(){return i}});var e=s(8450),n=s.n(e),e=s(63450),a=s(25108),e={name:"EntrustSetting",components:{controlUserList:e.default},data:function(){return{isOpenEntrust:!1,show:!1,selectUserInfo:{},isAjaxComplete:!1,metaData:{extra:{multiple:!1,onlyChooseLeaf:!1,tabs:[]}}}},created:function(){this.init()},mounted:function(){},methods:{init:function(){var e=this;dsf.http.post("fn/agency/getAgency",{}).then(function(t){e.isAjaxComplete=!0,200==t.data.code?(t=t.data.data,a.log(t),0<t.agencyStatus&&(e.isOpenEntrust=!0),e.selectUserInfo.name=t.agencyUserName,e.selectUserInfo.userId=t.agencyUserId,e.metaData.extra.tabs=t.extra.tabs.map(function(t){return t.action="fn/"+t.action,t})):dsf.layer.toast("获取数据失败,请稍后再试")}).catch(function(t){return a.log(t)})},goBack:function(){this.$router.go(-1)},switchToggle:function(t){t||(this.selectUserInfo={userId:"",name:""}),this.confirm()},openSelectUserPage:function(){this.isOpenEntrust?this.show=!0:this.$toast("未启动委托代办功能")},close:function(t){this.show=t},getSelectUser:function(t){a.log(t[0]),this.show=!1,this.selectUserInfo=t[0],this.selectUserInfo.userId=this.selectUserInfo.id.split("-")[1],this.confirm()},confirm:function(){var t={agencyUserId:this.selectUserInfo.userId,agencyUserName:this.selectUserInfo.name,agencyStatus:this.isOpenEntrust?1:-1,agencyStatusText:this.isOpenEntrust?"是":"否",isAgencyPeriod:-1,isAgencyPeriodText:"否",agencyStart:"",agencyEnd:"",agencyType:1,agencyMode:1};dsf.http.post("fn/agency/save",{data:n()(t)}).then(function(t){a.log(t)})}}},i=(0,s(51900).Z)(e,function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"entrust-setting"}},[t("div",{staticClass:"content"},[t("van-list",[t("van-cell",[t("div",{staticClass:"flex ac jb"},[t("span",{staticClass:"font_16"},[e._v("启动委托代办")]),e._v(" "),t("van-switch",{attrs:{disabled:!e.isAjaxComplete,size:"24px"},on:{change:e.switchToggle},model:{value:e.isOpenEntrust,callback:function(t){e.isOpenEntrust=t},expression:"isOpenEntrust"}})],1)]),e._v(" "),t("van-cell",[t("div",{staticClass:"flex ac jb",on:{click:e.openSelectUserPage}},[t("p",{staticClass:"flex1"},[t("span",{staticClass:"font_16"},[e._v("设置委托人员")]),e._v(" "),e.isOpenEntrust&&e.selectUserInfo?t("span",{staticClass:"font_16"},[e._v(" "+e._s(e.selectUserInfo.name))]):e._e()]),e._v(" "),t("van-icon",{attrs:{size:"0.4rem",color:"#999",name:"arrow"}})],1)])],1)],1),e._v(" "),t("van-popup",{style:{height:"100%"},attrs:{position:"bottom"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t("control-user-list",{attrs:{pageTitle:"人员选择",selectType:1,extra:e.metaData.extra},on:{close:e.close,getSelectUser:e.getSelectUser}})],1)],1)},[],!1,null,"1fb8a47f",null).exports}}]);