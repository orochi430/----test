"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[35763],{75313:function(t,e,a){a.r(e),a.d(e,{default:function(){return o}});var e=[function(){var t=this._self._c;return t("div",{staticClass:"logo flex jb"},[t("img",{attrs:{src:a(95964),alt:""}}),this._v(" "),t("img",{attrs:{src:a(67236),alt:""}})])}],n=a(5044),s=a(25108),i={components:{VPlayer:function(){return a.e(46316).then(a.bind(a,46316))}},data:function(){return{clientName:dsf.util.getClientName(),isShowImg:!1,previewImgs:[],language:dsf.util.loadSessionStore("language")||"CN",token:void 0,video:{showVideo:!1,videoTitle:"",type:"video/mp4"},showImgIdx:0,ctype:this.$route.query.ctype}},methods:{onShowImgChange:function(t){this.showImgIdx=t},saveImage:function(){try{s.log("eshimin-invoke-saveImage"),eshimin.invoke("saveImage",{type:"url",data:this.previewImgs[this.showImgIdx],name:"qrcode.png"},function(t){s.log("eshimin-invoke-saveImage","res=>",t),0==t.errorCode?dsf.layer.toast("已保存至相册",!0):dsf.layer.toast(t.errorMessage,!1)})}catch(t){s.log("eshimin-invoke-saveImage-err",t),dsf.layer.toast("请在随申办APP中操作",!1)}},changeLang:function(){var t=this;"CN"==t.language?t.language="EN":t.language="CN"},go:function(e){var t,a=this,i=null==(t=dsf.config.ciie)||null==(t=t.homePage)||null==(t=t.menus)?void 0:t.find(function(t){return t.id==e});if(s.log("menu=>",i),i)if(a.buriePoint(i.pType),i.isImg)a.isShowImg=!0,a.previewImgs=[],(t=a.previewImgs).push.apply(t,(0,n.Z)(i.src));else if(i.isVideo)a.video.showVideo=!0,a.video.videoTitle=i.title,a.video.src=i.path,a.video.type="video/mp4";else if(i.isSdk)try{"esmwx"==a.ctype?(s.log("wx=>",wx,i.path.wx),wx.miniProgram.navigateTo({url:i.path.wx})):"esmappx"==a.ctype?(s.log("appx=>",my,i.path.appx),my.navigateTo({url:i.path.appx})):(s.log("eshimin-invoke-".concat(i.name)),eshimin.invoke(i.name,i.params,function(t){s.log("eshimin-invoke-".concat(i.name),"res=>",t),0!=t.errorCode&&dsf.layer.toast(t.errorMessage,!1)}))}catch(t){s.log("eshimin-invoke-".concat(i.name,"-err"),t),dsf.layer.toast("请在随申办APP中操作",!1)}else i.path?i.path.toLowerCase().startsWith("http")?location.href=i.path:a.$router.push(i.path):dsf.layer.toast("敬请期待！");else dsf.layer.toast("请检查菜单配置！")},playerReadied:function(t){t.requestFullscreen()},buriePoint:function(t){"number"==typeof t&&dsf.http.get("/api/enterJbFollow",{type:t}).done(function(t){if(0!=t.code)throw t.msg;s.log("enterJbFollow=>",t)}).error(function(t){s.log("enterJbFollow-error",t)}).always(function(){})}},mounted:function(){this.buriePoint(0),s.log("userAgent=>",window.navigator.userAgent)}},o=(0,a(51900).Z)(i,function(){var e=this,t=e._self._c;return t("div",{class:["container",{EN:"EN"==e.language}],style:{height:"calc(100vh - ".concat(e.$store.state.isShowAppHeader?"0.92rem":"0px",")")}},[e._m(0),e._v(" "),t("img",{staticClass:"top-model-bg",attrs:{src:a(55134),alt:""}}),e._v(" "),t("div",{staticClass:"top-model"},[t("img",{attrs:{src:a(56949),alt:""}}),e._v(" "),t("div",{staticClass:"box top-left"},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("news")}}},[e._v("\n          "+e._s("CN"==e.language?"追新闻":"Follow the news")+"\n        ")])]),e._v(" "),t("img",{staticClass:"panda",attrs:{src:a(40966),alt:""}})],1),e._v(" "),t("div",{staticClass:"box top-right"},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("exhibition")}}},[e._v("\n          "+e._s("CN"==e.language?"赏云展":"Appreciation Exhibition")+"\n        ")])]),e._v(" "),t("img",{staticClass:"panda",attrs:{src:a(71774),alt:""}})],1),e._v(" "),t("div",{staticClass:"box bottom-left"},[t("img",{staticClass:"panda",attrs:{src:a(62339),alt:""}}),e._v(" "),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("exhibitors")}}},[e._v("\n          "+e._s("CN"==e.language?"找展商":"Seek exhibitors")+"\n        ")])])],1),e._v(" "),t("div",{staticClass:"box bottom-right"},[t("img",{staticClass:"panda",attrs:{src:a(94096),alt:""}}),e._v(" "),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("activity")}}},[e._v("\n          "+e._s("CN"==e.language?"查活动":"Query activity")+"\n        ")])])],1),e._v(" "),t("div",{staticClass:"box middle-top"},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("benefits")}}},[e._v("\n          "+e._s("CN"==e.language?"专属福利":"Exclusive benefits")+"\n        ")])])],1),e._v(" "),t("div",{staticClass:"box middle-center"},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("food")}}},[e._v("\n          "+e._s("CN"==e.language?"品美食":"Taste delicious food")+"\n        ")])])],1),e._v(" "),t("div",{staticClass:"box middle-bottom"},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("services")}}},[e._v("\n          "+e._s("CN"==e.language?"享服务":"Enjoy services")+"\n        ")])])],1)]),e._v(" "),t("div",{staticClass:"bottom-model"},[t("img",{staticClass:"bg",attrs:{src:a(26567),alt:""}}),e._v(" "),t("div",{staticClass:"visit"},[t("img",{attrs:{src:a(21339),alt:""}}),e._v(" "),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("visit")}}},[e._v("\n          "+e._s("CN"==e.language?"兜上海":"Visit Shanghai")+"\n        ")])])],1),e._v(" "),t("div",{staticClass:"twin"},[t("img",{attrs:{src:a(25634),alt:""}}),e._v(" "),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("twin")}}},[e._v("\n          "+e._s("CN"==e.language?"进博孪生":"Import Expo twin")+"\n        ")])])],1),e._v(" "),t("div",{staticClass:"qrcode"},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"tag",on:{click:function(t){return e.go("qrcode")}}},[e._v("\n          "+e._s("CN"==e.language?"进博会官微":"CIIE Wechat Official Account")+"\n        ")])])],1)]),e._v(" "),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("div",{key:e.language,staticClass:"change-btn",on:{click:e.changeLang}},[t("span",[e._v(e._s("CN"==e.language?"EN":"CN"))])])]),e._v(" "),t("van-popup",{style:{height:"100%"},attrs:{"close-on-click-overlay":!1,"lock-scroll":"",position:"bottom","get-container":"#app"},model:{value:e.video.showVideo,callback:function(t){e.$set(e.video,"showVideo",t)},expression:"video.showVideo"}},[e.video.showVideo?t("div",[t("VPlayer",{attrs:{video:e.video},on:{playerReadied:e.playerReadied}})],1):e._e()]),e._v(" "),t("van-image-preview",{attrs:{images:e.previewImgs,closeable:""},on:{change:e.onShowImgChange},model:{value:e.isShowImg,callback:function(t){e.isShowImg=t},expression:"isShowImg"}},[t("div",{staticClass:"color-high",attrs:{slot:"cover"},slot:"cover"},["eshimin"==e.clientName?t("van-button",{on:{click:e.saveImage}},[e._v("点击下载")]):e._e()],1)])],1)},e,!1,null,"76bcfa2c",null).exports},67236:function(t,e,a){t.exports=a.p+"static/img/5years.0335aa9..png"},55134:function(t,e,a){t.exports=a.p+"static/img/bg_01.0224cdd..png"},26567:function(t,e,a){t.exports=a.p+"static/img/bg_02.ff6844d..png"},95964:function(t,e,a){t.exports=a.p+"static/img/logo.abd361e..png"},56949:function(t,e,a){t.exports=a.p+"static/img/model1.ffed88d..png"},40966:function(t,e,a){t.exports=a.p+"static/img/panda1.885f4e6..png"},71774:function(t,e,a){t.exports=a.p+"static/img/panda2.0d8e0f1..png"},62339:function(t,e,a){t.exports=a.p+"static/img/panda3.f4d15c1..png"},94096:function(t,e,a){t.exports=a.p+"static/img/panda4.2f3d9b9..png"},25634:function(t,e,a){t.exports=a.p+"static/img/twin.d69291e..png"},21339:function(t,e,a){t.exports=a.p+"static/img/visit.43c03bc..png"}}]);