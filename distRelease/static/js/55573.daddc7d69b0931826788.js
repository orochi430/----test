"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[55573],{55573:function(t,s,a){a.r(s),a.d(s,{default:function(){return e}});var n=a(25108),s={data:function(){return{userInfo:null,default_avatar:'this.src="'+a(42370)+'"'}},created:function(){this.getData()},methods:{getData:function(){var s=this;dsf.http.get("fn/conferenceMobile/singleton",{userId:dsf.util.loadSessionStore("user").user_id}).done(function(t){t.data&&(s.userInfo=t.data)}).error(function(t){n.log("error",t)})},changeClick:function(){this.$router.push({path:"/meetingPad/index/changePwd"})},setFontSize:function(){this.$router.push({path:"/meetingPad/index/setFontSize"})},logout:function(){this.$router.push({name:"meetingPadLogin"})}}},e=(0,a(51900).Z)(s,function(){var s=this,t=s._self._c;return t("div",{staticClass:"personal-container"},[t("div",{staticClass:"personal-top"},[t("van-icon",{attrs:{name:"arrow-left"},on:{click:function(t){return s.$router.back()}}}),s._v(" "),t("h2",[s._v("个人中心")])],1),s._v(" "),t("div",{staticClass:"personal-con"},[s.userInfo?t("div",{staticClass:"personal-main"},[t("div",{staticClass:"personal-main-left"},[t("img",{attrs:{onerror:s.default_avatar,src:s.dsf.url.getWebPath(s.userInfo.photo),alt:""}}),s._v(" "),t("div",{staticClass:"personal-main-left-username"},[s._v(s._s(s.userInfo.userName))])]),s._v(" "),t("div",{staticClass:"personal-main-right"},[t("div",{staticClass:"info-item"},[t("span",{staticClass:"name"},[s._v("性别")]),s._v(" "),t("span",{staticClass:"val"},[s._v(s._s(s.userInfo.sex))])]),s._v(" "),t("div",{staticClass:"info-item"},[t("span",{staticClass:"name"},[s._v("手机号码")]),s._v(" "),t("span",{staticClass:"val"},[s._v(s._s(s.userInfo.tel))])]),s._v(" "),t("div",{staticClass:"info-item"},[t("span",{staticClass:"name"},[s._v("部门")]),s._v(" "),t("span",{staticClass:"val"},[s._v(s._s(s.userInfo.dept))])])])]):s._e(),s._v(" "),t("div",{staticClass:"personal-operation"},[t("div",{staticClass:"personal-operation-item",on:{click:s.changeClick}},[t("span",{staticClass:"icon-xgmm"}),s._v(" "),t("span",[s._v("修改密码")])]),s._v(" "),t("div",{staticClass:"personal-operation-item",on:{click:s.setFontSize}},[t("span",{staticClass:"icon-ztdxsz"}),s._v(" "),t("span",[s._v("字体大小设置")])])])]),s._v(" "),t("div",{staticClass:"personal-logout"},[t("van-button",{attrs:{type:"info"},on:{click:s.logout}},[s._v("退出登录")])],1)])},[],!1,null,"5af5661a",null).exports},42370:function(t,s,a){t.exports=a.p+"static/img/avatar.2072ed9..png"}}]);