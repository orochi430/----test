"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[66751],{66751:function(e,t,a){a.r(t),a.d(t,{default:function(){return i}});var t=a(8450),n=a.n(t),s=a(25108),t={data:function(){return{title:dsf.config.login.applicationName||"dreamweb会务系统",logname:"",password:"",DeviceId:"postman",DeviceName:"postman"}},beforeCreate:function(){},created:function(){dsf.util.clearSession();this.setDeviceInfo()},methods:{login:function(){var t=this;dsf.http.post("/fn/mobileAuth/login",{__DATA:n()({logname:t.logname,password:t.password,device_id:t.DeviceId,device_desc:t.DeviceName})}).done(function(e){s.log("login == ",e),1==e.rcode&&(dsf.util.saveToSessionStore("user",e.data),t.getData()),dsf.layer.toast(e.message)}).error(function(e){s.log("error",e),dsf.layer.toast("系统错误，请稍后重试！",!1)})},getData:function(){var a=this;dsf.http.post("fn/conferenceMobile/meetingList",{query_meetingType:"",query_meetingStatus:""}).done(function(e){var t;e&&e.datas&&(t=[],e.datas.forEach(function(e){t.push(e.dataValue)}),0<t.length?dsf.config.login.defaultUrl?a.$router.push({name:"".concat(dsf.config.login.defaultUrl),query:{meetingId:t[0].id}}):a.$router.push({name:"meetingPadAppcenter",query:{meetingId:t[0].id}}):a.$router.push({name:"meetingPadEmpty"}))}).error(function(e){dsf.layer.toast("数据获取失败！",!1)}).always(function(){})},setDeviceInfo:function(){"app"==dsf.util.getClientName()&&document.addEventListener("deviceready",function(){s.log("deviceready_testlogin"),s.log(xsfCommon),xsfCommon.SystemTools(["DeviceId"],function(e){s.log(e),self.DeviceId=JSON.parse(e).DeviceId},function(e){alert("open failed: "+e)}),xsfCommon.SystemTools(["DeviceName"],function(e){s.log(e),self.DeviceName=JSON.parse(e).DeviceName},function(e){alert("open failed: "+e)})})}}},i=(0,a(51900).Z)(t,function(){var t=this,e=t._self._c;return e("div",{staticClass:"contanier"},[e("div",{staticClass:"box"},[e("div",{staticClass:"top"},[e("div",[e("img",{attrs:{src:"static/images/meetingPad/com_logo.png",alt:""}}),t._v(t._s(t.title)+"\n            ")]),t._v(" "),e("div",[t._v("用户登录")])]),t._v(" "),e("div",{staticClass:"form"},[e("van-form",{on:{submit:t.login}},[e("div",{staticClass:"left-label"},[t._v("用户名")]),t._v(" "),e("van-field",{attrs:{rules:[{required:!0}],name:"用户名",center:"",placeholder:"请输入用户名"},model:{value:t.logname,callback:function(e){t.logname=e},expression:"logname"}}),t._v(" "),e("div",{staticClass:"left-label"},[t._v("密码")]),t._v(" "),e("van-field",{attrs:{rules:[{required:!0}],type:"password",name:"密码",center:"",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),e("div",{staticClass:"btnbox"},[e("van-button",{staticClass:"btn",attrs:{type:"info","native-type":"submit"}},[t._v("登 录\n                    ")])],1)],1)],1),t._v(" "),t._m(0)])])},[function(){var e=this,t=e._self._c;return t("div",{staticClass:"shadow"},[t("div",{staticClass:"oval"}),e._v(" "),t("div",{staticClass:"btn"},[t("img",{attrs:{src:"static/images/meetingPad/btn-shadow.png",alt:""}})]),e._v(" "),t("div",{staticClass:"org"},[e._v("上海梦创双杨数据科技股份有限公司")])])}],!1,null,"7b291816",null).exports}}]);