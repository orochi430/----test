"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[44455],{44455:function(t,e,s){s.r(e),s.d(e,{default:function(){return n}});var e=s(73473),i=s.n(e),e=s(44884),o=s.n(e),e=s(51849),a=s(25108),e={components:{faceIdentify:e.default},data:function(){return{notLocation:dsf.config.attendance.notLocation,signStyleObject:{height:this.getSignHeight()},desc:"",isFirstLoad:!1,showPop:!1,default_avatar:'this.src="'+s(11727)+'"',avatar:dsf.url.getWebPath("/fn/mobilePhoto/download?id=".concat(dsf.util.loadSessionStore("user").user_id,"&time=").concat((new Date).getTime())),nowDate:dsf.date.format(new Date,"yyyy-mm-dd"),myTimer:null,nowTime:new Date,address:"定位中...",userName:dsf.util.loadSessionStore("user").name,groupName:this.getMyGroup(),signInTitle:"上班",signInDesc:"未打卡",signOutTitle:"下班",signOutDesc:"未打卡",btnDesc:"上班打卡",geoLocation:null,iosPosition:!1,isRemote:!1,user:dsf.util.loadSessionStore("user"),isSbGxdk:!0,isExclusiveInvoke:dsf.config.attendance.isExclusiveInvoke,retry:0}},filters:{dateFormat:function(t){return t?dsf.date.format(t,"hh:ii:ss"):""}},mounted:function(){var t=this;t.isFirstLoad=!0,t.init(),a.log("signIn.vue-mounted","isFirstLoad ->",t.isFirstLoad)},methods:{getSignHeight:function(){var t,e=5.4;return null!=(t=dsf.config.attendance.signInWithDesc)&&t.enable&&(e+=2),dsf.config.attendance.signInTips&&(e+=.4),"calc(100vh - "+e.toFixed(2)+"rem)"},closePop:function(){this.showPop=!1},updatePosition:function(){var t=this;t.geoLocation=null,t.address="定位中...",t.getPosition()},init:function(){this.setTime(),this.getMySignInfo(),this.notLocation||this.getPosition()},setTime:function(){var t=this;t.myTimer=setInterval(function(){t.nowTime=new Date},1e3)},getPosition:function(){var e,t,n=this;"1"==n.$route.query.demo?(n.geoLocation={status:"定位成功",LocationType:"5",Longitude:"121.92772",Latitude:"30.888838",Accuracy:"50.0米",Provider:"lbs",Speed:"0.0米/秒",Bearing:"0.0",Satellites:"0",Country:"中国",Province:"上海市",City:"上海市",CityCode:"021",District:"浦东新区",Street:"水芸路",StreetNum:"55号",AdCode:"310115",Address:"上海市浦东新区水芸路55号靠近港城广场",PoiName:"港城广场",Altitude:"0.0",Time:"2022-06-06 16:39:51"},n.address=n.geoLocation.Address):(e=dsf.config.attendance.reverseAddress,"mpaas"==dsf.util.getClientName()?croods.load(function(){croods.customPlugin({action:"ServicePermissionPlugin.getLocation",params:{coorType:"gcj02"},success:function(t){n.geoLocation=t.data,n.address=n.geoLocation.Address,a.log("ServicePermissionPlugin.getLocation-res",t),0==t.flag&&(n.iosPosition=!0,n.address=t.data.message),"定位失败"!==n.address&&(n.iosPosition=!1)}})}):"app"==dsf.util.getClientName()?$BaiduLocation.getLocation({},function(t){a.log("$BaiduLocation.getLocation-res",t),e.enable&&e.appInsideEnable?"dongyingshiwei"==dsf.config.projectName?n.dyswLocationPoint(JSON.parse(t)):n[e.platform](e.key,JSON.parse(t)):(n.geoLocation=JSON.parse(t),n.address=n.geoLocation.address)},function(t){a.log("$BaiduLocation.getLocation-err",t)}):"govding"!=dsf.util.getClientName()||null!=(t=n.isExclusiveInvoke)&&t.enable?window.wx&&wx.getLocation?wx.getLocation({isHighAccuracy:!0,type:"gcj02",success:function(t){a.log("WXgetLocation",t),e.enable?"dongyingshiwei"==dsf.config.projectName?n.dyswLocationPoint(t):n[e.platform](e.key,t):n.reverseAddressDreamWeb(t)},fail:function(t){n.address="定位失败",dsf.layer.toast("请检查手机定位是否开启！"),a.log("wxerr",t)}}):null!=(t=window.dd)&&t.ready(function(){o()({api:"location.get"}).then(function(t){var e,s;a.log("location.get ->",t),null!=(s=t.platform)&&s.toLowerCase().includes("ios")?(a.log("platform",t.platform),a.log(t.result.split(",")),e={},t.result.split(",").forEach(function(t){e[t.split("=")[0]]=t.split("=")[1]}),a.log("getPosition-res",e),n.geoLocation=e,"(null)"==n.geoLocation.address?(a.log("定位失败",(new Date).toString()),n.iosPosition=!0,null!=(s=n.isExclusiveInvoke)&&s.enable&&null!=(s=n.isExclusiveInvoke)&&s.interval&&null!=(s=n.isExclusiveInvoke)&&s.retry&&n.retry<n.isExclusiveInvoke.retry?setTimeout(function(){n.retry++,n.getPosition()},n.isExclusiveInvoke.interval):n.address="定位失败"):(n.retry=0,n.address=n.geoLocation.address)):t.data&&(a.log("安卓sdk定位"),t=JSON.parse(t.data),a.log("getPosition-res",t),"success"==t.status)&&(n.geoLocation=t.data,n.address=n.geoLocation.Address),"定位失败"!==n.address&&(n.iosPosition=!1)}).catch(function(t){a.log("getPosition-err",t)})}):(a.log("getPosition","govding"),dsf.dd.getGeolocation({targetAccuracy:100,coordinate:0,withReGeocode:!1,useCache:!1}).then(function(t){a.log("dd.getGeolocation-res ->",t),0==t.errorCode?(n.geoLocation=t,n.address=n.geoLocation.address):dsf.layer.toast(t.errorMessage,!1)}).catch(function(t){a.log("dd.getGeolocation-err ->",t),dsf.layer.toast(t.errorMessage||"发生错误，请稍后重试或联系管理员",!1)})))},signIn:function(t){var e,s=this;s.user=dsf.util.loadSessionStore("user"),"未打卡"==s.signInDesc||"缺卡"==s.signInDesc||"未打卡"==s.signOutDesc||"缺卡"==s.signOutDesc||[3,4,5,6].includes(Number(t))?s.notLocation||s.geoLocation&&s.address&&"定位失败"!==s.address&&"定位中..."!==s.address?!s.isRemote||null!=(e=s.user.attnd)&&e.faceAuth?(t||(t=1,"下班打卡"==s.btnDesc&&(t=2)),(e={type:t,bz:s.desc}).position=s.notLocation?"30.889472,121.927437":"".concat(s.geoLocation.Longitude||s.geoLocation.longitude,",").concat(s.geoLocation.Latitude||s.geoLocation.latitude),e.address=s.notLocation?"":s.address,dsf.http.post("fn/attnd/signIn",e).done(function(t){"success"==t.type?5==t.data||6==t.data?dsf.layer.confirm({message:t.message,confirmButtonText:"确认"},function(){s.signIn(t.data)}):(s.$router.push({path:"/attndSigned/".concat(s.nowTime.getTime())}),s.desc=""):dsf.layer.toast(t.message,!1)})):s.identify(t):dsf.layer.toast("未获取到位置信息",!1):dsf.layer.toast("已完成打卡",!1)},getMyGroup:function(){var s=this;dsf.http.get("fn/attnd/getMyGroup").done(function(t){var e;"success"==t.type&&(s.isRemote=1==t.data.isRemote,s.isSbGxdk="-1"!=t.data.isSbGxdk,s.groupName=t.data.groupName,(e=dsf.util.loadSessionStore("user")).attndGroupName||(e.attndGroupName=t.data.groupName,dsf.util.saveToSessionStore("user",e)))}).error(function(t){a.log("getMyGroup-error",t)}).always(function(){})},getMySignInfo:function(){var s=this;dsf.http.post("fn/attnd/getMySignInfo").done(function(t){var e;"success"==t.type&&(1==t.data.signInStatus&&t.data.signIn?(e=dsf.date.format(t.data.signIn,"hh:ii"),s.signInTitle="上班".concat(e),s.signInDesc="".concat(e,"已打卡"),s.btnDesc="下班打卡"):-1==t.data.signInStatus&&(s.signInDesc="缺卡",s.btnDesc="下班打卡"),1==t.data.signOutStatus&&t.data.signOut?(e=dsf.date.format(t.data.signOut,"hh:ii"),s.signOutTitle="下班".concat(e),s.signOutDesc="".concat(e,"已打卡"),s.btnDesc="上班打卡"):-1==t.data.signOutStatus&&(s.signOutDesc="缺卡",s.btnDesc="上班打卡"))})},updateSignIn:function(t){var e=this;dsf.layer.confirm({message:"是否更新打卡",confirmButtonText:"确认"},function(){e.signIn(t)})},getToken:function(){return new(i())(function(e,s){"undefined"==typeof croods?s("请在皖政通中操作"):croods.load(function(){croods.customPlugin({action:"UserPlugin.login",params:{},success:function(t){a.log("UserPlugin.login-res",t),e(t.token)},fail:function(t){a.log("UserPlugin.login-err",t),s(t)}})})})},startFace:function(n,o){return new(i())(function(e,s){"undefined"==typeof croods?s("请在皖政通中操作"):croods.load(function(){var t={fvtoken:n,key:o,appid:dsf.config.attendance.appId};a.log("FacePlugin.startFace-params",t),croods.customPlugin({action:"FacePlugin.startFace",params:t,success:function(t){a.log("FacePlugin.startFace-res",t),e(t)},fail:function(t){a.log("FacePlugin.startFace-fail",t),s("人脸识别失败，请稍后重试或联系管理员！")}})})})},identify:function(e){var s=this;s.getToken().done(function(t){return dsf.http.get("fn/wztFace/getFaceToken",{wztToken:t})}).done(function(t){if(a.log("getFaceToken-res",t),"success"==t.type)return s.startFace(t.data.fvtoken,t.data.key);throw"人脸识别失败，请稍后重试或联系管理员！"}).done(function(t){if("false"==t.flag)throw"startFace-fail: 暂不认证";if(t.accessToken)return dsf.http.get("fn/wztFace/accessCheck",{accessToken:t.accessToken});throw"人脸识别失败，请稍后重试或联系管理员！"}).done(function(t){if(a.log("accessCheck-res",t),"success"!=t.type)throw"人脸识别失败，请稍后重试或联系管理员！";if(!t.data.flag)throw"人脸识别失败，请稍后重试或联系管理员！";a.log("人脸识别认证成功"),s.user.attnd?s.user.attnd.faceAuth=1:s.user.attnd={faceAuth:1},dsf.util.saveToSessionStore("user",s.user),s.signIn(e)}).error(function(t){a.log("identify-err",t),"string"==typeof t&&t.includes("暂不认证")||dsf.layer.toast(t.message||t,!1)})},reverseAddressTencent:function(t,n){a.log("Tencent");var o=this;$.ajax({url:"https://apis.map.qq.com/ws/geocoder/v1/",type:"GET",data:{key:t,location:"".concat(n.latitude,",").concat(n.longitude),output:"jsonp",get_poi:1,poi_options:"policy=5"},dataType:"jsonp",success:function(t){a.log("v1",t);var e=t.result.pois[0].address+t.result.pois[0].title,s=t.result.formatted_addresses.standard_address,t=t.result.formatted_addresses.recommend;o.address=t||s||e,o.geoLocation=n},error:function(t){a.log("v1error",t),o.address="定位失败"}})},reverseAddressBaidu:function(t){},reverseAddressGaode:function(t){},reverseAddressDreamWeb:function(e){var s=this;dsf.http.get("ctrl/attend/locationInverseCoding",{longitude:e.longitude,latitude:e.latitude}).then(function(t){t=t.data;t.code?(s.geoLocation=e,s.address=t.message):s.address="定位失败"})},dyswLocationPoint:function(e){var s=this;dsf.http.post("ctrl/attnd/locationPoint",{location:"".concat(e.longitude,",").concat(e.latitude),userId:dsf.util.loadSessionStore("user").user_id}).then(function(t){var t=t.data;a.log("dysw",t),200==t.code&&t.message?(s.geoLocation=e,s.address=t.message):s.reverseAddressTencent(null==(t=dsf.config.attendance.reverseAddress)?void 0:t.key,e)})}},beforeRouteLeave:function(t,e,s){this.myTimer&&clearInterval(this.myTimer),s()},activated:function(){a.log("signIn.vue-activated","isFirstLoad ->",this.isFirstLoad),this.isFirstLoad||this.init(),this.isFirstLoad=!1},deactivated:function(){this.myTimer&&clearInterval(this.myTimer)}},n=(0,s(51900).Z)(e,function(){var t,e=this,s=e._self._c;return s("div",{staticClass:"signIn-page"},[s("div",{staticClass:"info"},[s("div",{staticClass:"info-avatar"},[s("img",{attrs:{src:e.avatar,onerror:e.default_avatar}})]),e._v(" "),s("div",{staticClass:"info-msg"},[s("div",{staticClass:"name"},[e._v(e._s(e.userName))]),e._v(" "),s("div",{staticClass:"group"},[e._v("\n        "+e._s(e.groupName)),s("span",{staticClass:"rule",on:{click:function(t){return e.$router.push("attndCheckRules")}}},[e._v("(查看规则)")])])]),e._v(" "),e.dsf.config.attendance.applications?s("div",{staticClass:"info-btn",on:{click:function(t){return e.$router.push("attndApplications")}}},[s("img",{attrs:{src:"static/images/attendance/qd-sq.png"}}),s("span",[e._v("申请")])]):e._e()]),e._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"content-box"},[s("div",{staticClass:"content-box-state"},[s("div",{staticClass:"sign"},[e._v(e._s(e.signInTitle))]),e._v(" "),s("div",{staticClass:"state"},["未打卡"!=e.signInDesc&&"缺卡"!=e.signInDesc?s("van-icon",{attrs:{name:"checked"}}):e._e(),e._v("\n          "+e._s(e.signInDesc)+"\n          "),"未打卡"!=e.signInDesc&&"未打卡"==e.signOutDesc&&"缺卡"!=e.signInDesc&&e.isSbGxdk?s("span",{staticClass:"state-update",on:{click:function(t){return e.updateSignIn(3)}}},[e._v("更新打卡")]):e._e()],1)]),e._v(" "),s("div",{staticClass:"content-box-state"},[s("div",{staticClass:"sign"},[e._v(e._s(e.signOutTitle))]),e._v(" "),s("div",{staticClass:"state"},["未打卡"!=e.signOutDesc&&"缺卡"!=e.signOutDesc?s("van-icon",{attrs:{name:"checked"}}):e._e(),e._v("\n          "+e._s(e.signOutDesc)+"\n          "),"未打卡"!=e.signOutDesc&&"缺卡"!=e.signOutDesc?s("span",{staticClass:"state-update",on:{click:function(t){return e.updateSignIn(4)}}},[e._v("更新打卡")]):e._e()],1)])]),e._v(" "),s("div",{staticClass:"content-sign",style:e.signStyleObject},[s("div",{staticClass:"content-sign-container"},[s("div",{staticClass:"sign-btn",on:{click:function(t){return e.signIn()}}},[s("div",{staticClass:"title"},[e._v(e._s(e.btnDesc))]),e._v(" "),s("div",{staticClass:"time"},[e._v(e._s(e._f("dateFormat")(e.nowTime)))])]),e._v(" "),e.notLocation?e._e():s("div",{staticClass:"sign-pos"},[e.geoLocation?s("div",[s("van-icon",{attrs:{name:"location-o"}}),e._v(e._s(e.address)+"\n            "),s("div",[s("button",{on:{click:function(t){return e.updatePosition()}}},[e._v("重新定位")])])],1):s("van-loading",{attrs:{size:"0.28rem"}},[e._v(e._s(e.address))])],1)])]),e._v(" "),null!=(t=e.dsf.config.attendance.signInWithDesc)&&t.enable?s("div",{staticClass:"content-desc"},[s("van-field",{attrs:{rows:"2",label:"",type:"textarea",placeholder:e.dsf.config.attendance.signInWithDesc.placeholder||"请输入备注",maxlength:e.dsf.config.attendance.signInWithDesc.maxlength||50,"show-word-limit":"","label-align":"right"},model:{value:e.desc,callback:function(t){e.desc=t},expression:"desc"}})],1):e._e(),e._v(" "),e.dsf.config.attendance.signInTips?s("div",{staticClass:"content-tips"},[e._v("\n      "+e._s(e.dsf.config.attendance.signInTips)+"\n    ")]):e._e()]),e._v(" "),s("van-popup",{style:{height:"100%"},attrs:{position:"bottom"},model:{value:e.showPop,callback:function(t){e.showPop=t},expression:"showPop"}},[s("van-nav-bar",{attrs:{title:"人脸识别"},on:{"click-left":function(t){e.showPop=!1}},scopedSlots:e._u([{key:"left",fn:function(){return[s("van-icon",{attrs:{name:"arrow-left"}}),s("span",[e._v("返回")])]},proxy:!0}])}),e._v(" "),s("face-identify",{on:{closePop:e.closePop,signIn:e.signIn}})],1)],1)},[],!1,null,"6661c03e",null).exports},51849:function(t,e,s){s.r(e),s.d(e,{default:function(){return n}});var e=s(73473),i=s.n(e),a=s(25108),e={data:function(){return{show:!0,errMsg:"抱歉，请确保是本人进行操作",user:dsf.util.loadSessionStore("user")}},methods:{identify:function(){var e=this;e.getToken().done(function(t){return dsf.http.get("fn/wztFace/getFaceToken",{wztToken:t})}).done(function(t){if(a.log("getFaceToken-res",t),"success"==t.type)return e.startFace(t.data.fvtoken,t.data.key);throw t.message}).done(function(t){if("false"==t.flag)throw"暂不认证";if("请求成功"==t.faceState)return dsf.http.get("fn/wztFace/accessCheck",{accessToken:t.accessToken});throw t.faceState}).done(function(t){if(a.log("accessCheck-res",t),"success"!=(null==t?void 0:t.type))throw t.message;if(!t.data.flag)throw t.subject;a.log("人脸识别认证成功"),e.user.attnd?e.user.attnd.faceAuth=1:e.user.attnd={faceAuth:1},dsf.util.saveToSessionStore("user",e.user),e.$emit("signIn")}).error(function(t){e.show=!1,null!=t&&t.message&&(e.errMsg=t.message),a.log("identify-err",t)})},startFace:function(n,o){return new(i())(function(e,s){"undefined"==typeof croods?s("请在皖政通中操作"):croods.load(function(){var t={fvtoken:n,key:o,appid:dsf.config.attendance.appId};a.log("FacePlugin.startFace-params",t),croods.customPlugin({action:"FacePlugin.startFace",params:t,success:function(t){a.log("FacePlugin.startFace-res",t),e(t)},fail:function(t){a.log("FacePlugin.startFace-fail",t),s(t)}})})})},back:function(){this.show=!0,this.$emit("closePop")},getToken:function(){return new(i())(function(e,s){"undefined"==typeof croods?s("请在皖政通中操作"):croods.load(function(){croods.customPlugin({action:"UserPlugin.login",params:{},success:function(t){a.log("UserPlugin.login-res",t),e(t.token)},fail:function(t){a.log("UserPlugin.login-err",t),s(t)}})})})}}},n=(0,s(51900).Z)(e,function(){var e=this,t=e._self._c;return t("div",{staticClass:"identify"},[t("transition",{attrs:{name:"fade"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"success"},[t("div",{staticClass:"text"},[e._v("\n        使用考勤系统前请您通过人脸识别认证\n        "),t("div",{staticClass:"SC"},[e._v("请确保正对手机，光线充足")])]),e._v(" "),t("img",{attrs:{src:"static/images/wanzhengtong/face_identify.png",alt:""}}),e._v(" "),t("button",{staticClass:"btn",on:{click:e.identify}},[e._v("采集本人人脸")])])]),e._v(" "),t("transition",{attrs:{name:"fade"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}],staticClass:"failed"},[t("div",{staticClass:"img"},[t("img",{attrs:{src:"static/images/wanzhengtong/face_error.png",alt:""}})]),e._v(" "),t("div",{staticClass:"text1"},[e._v("认证失败")]),e._v(" "),t("div",{staticClass:"text2"},[e._v(e._s(e.errMsg))]),e._v(" "),t("div",{staticClass:"button"},[t("button",{staticClass:"button1",on:{click:function(t){return e.back()}}},[e._v("返回")]),e._v(" "),t("button",{staticClass:"button2",on:{click:function(t){e.show=!0}}},[e._v("立即重试")])])])])],1)},[],!1,null,"8e56722a",null).exports},11727:function(t,e,s){t.exports=s.p+"static/img/default-avatar.ad3a581..png"}}]);