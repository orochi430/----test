"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[39499],{39499:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var t=n(8450),a=n.n(t),i=n(88561),s=n(62596),r=n(25108),t={created:function(){this.loadInfo()},methods:{loadInfo:function(){var e,t=this,n=window.navigator.userAgent.toLowerCase();r.log("autoLoginToUrl","ua",n),-1<n.indexOf("lanxin")?((e=document.createElement("script")).type="text/javascript",e.src="static/js/lanxin/jssdk.js",document.head.appendChild(e),e.onload=function(){t.login()}):-1<n.indexOf("micromessenger")&&null!=(e=dsf.config.ddSetting)&&e.wxAuth?-1<window.location.href.indexOf("digitalgd")||-1<window.location.href.indexOf("gdzwfw")?((e=document.createElement("script")).type="text/javascript",e.src="./static/js/jweixin-1.6.0.js",document.head.appendChild(e),e.onload=function(){r.log("device","加载粤政易JS"),t.wxAuthentication(window.document.location.href.split("#")[0])}):"shGovYth"==dsf.config.projectName?((e=document.createElement("script")).type="text/javascript",e.src="./static/js/jweixin-1.6.0.js",document.body.appendChild(e),e.onload=function(){window.wx=wx,t.wxAuthShGov()}):n.includes("shandong")?((e=document.createElement("script")).type="text/javascript",e.src="./static/js/jweixin-1.6.0.js",document.body.appendChild(e),e.onload=function(){t.wxAuthShanDong(window.document.location.href.split("#")[0])}):((n=document.createElement("script")).type="text/javascript",n.src="./static/js/jweixin-1.6.0.js",document.body.appendChild(n),n.onload=function(){(window.wx=wx).ready(function(){r.log("autoLoginToUrl","wx","ready"),wx.checkJsApi({jsApiList:["previewFile","openUrl","onMenuShareWechat","onMenuShareAppMessage"],success:function(e){r.log("autoLoginToUrl","checkJsApi-res",e)}})}),wx.error(function(e){r.log("autoLoginToUrl","wx","error",e)}),wx.config({beta:!0,debug:!1,appId:dsf.util.loadSessionStore("wxParams").corpId,timestamp:dsf.util.loadSessionStore("wxParams").timestamp,nonceStr:dsf.util.loadSessionStore("wxParams").noncestr,signature:dsf.util.loadSessionStore("wxParams").signature,jsApiList:["previewFile","openUrl","onMenuShareWechat","onMenuShareAppMessage"]}),t.login()}):t.login()},wxAuthentication:function(t){var n=this;r.log("调用了粤政易鉴权",t),dsf.http.post("fn/digitalgd/config?url=".concat(t),{}).then(function(e){r.log("进入了JS鉴权",e),e.data?(wx.config({beta:!0,debug:!1,appId:e.data.data.appId,timestamp:e.data.data.timestamp,nonceStr:e.data.data.nonceStr,signature:e.data.data.signature,jsApiList:["previewFile","request3rdApp"]}),wx.error(function(e){r.log("鉴权失败",e)}),n.login()):r.log("调用了粤政易鉴权失败",t)}).catch(function(e){r.log(e)})},wxAuthShanDong:function(e){var t=this;window.wx=wx,r.log("山东通鉴权",e),dsf.http.post("fn/sdtongSSO/wxConfig",{url:e}).done(function(e){r.log("sdtongSSO","wxConfig",e),"success"==e.type?(wx.config({beta:!0,debug:!1,appId:e.data.appId,timestamp:e.data.timestamp,nonceStr:e.data.nonceStr,signature:e.data.signature,jsApiList:["previewFile","request3rdApp","openUrl","onMenuShareWechat","onMenuShareAppMessage","openChatWithMsg"]}),wx.ready(function(){r.log("autoLoginToUrl","wx","ready"),wx.checkJsApi({jsApiList:["previewFile","request3rdApp","openUrl","onMenuShareWechat","onMenuShareAppMessage","openChatWithMsg"],success:function(e){r.log("autoLoginToUrl","checkJsApi-res",e)}}),wx.invoke("agentConfig",{agentid:e.data.agentid,corpid:e.data.appId,timestamp:e.data.timestamp,nonceStr:e.data.nonceStr,signature:e.data.signature},function(e){e.err_msg})}),wx.error(function(e){r.log("autoLoginToUrl","wx","error",e)}),t.login()):r.log("sdtongSSO","wxConfig","fail")}).catch(function(e){r.log(e)})},wxAuthShGov:function(){wx.config({beta:!0,debug:!1,appId:dsf.util.loadSessionStore("wxParams").corpId,timestamp:dsf.util.loadSessionStore("wxParams").timestamp,nonceStr:dsf.util.loadSessionStore("wxParams").noncestr,signature:dsf.util.loadSessionStore("wxParams").signature,jsApiList:["previewFile","request3rdApp","openUrl","onMenuShareWechat","onMenuShareAppMessage","openChatWithMsg","request3rdApp","scanQRCode"]}),wx.ready(function(){r.log("autoLoginToUrl","wx","ready"),wx.checkJsApi({jsApiList:["previewFile","request3rdApp","openUrl","onMenuShareWechat","onMenuShareAppMessage","openChatWithMsg","request3rdApp","scanQRCode"],success:function(e){r.log("autoLoginToUrl","checkJsApi-res",e)}})}),wx.error(function(e){r.log("autoLoginToUrl","wx","error",e)}),wx.hideMenuItems({menuList:["menuItem:share:appMessage","menuItem:favorite"]}),this.login()},hexToString:function(e){var t="";if(e.length%2==0)for(var n=0;n<e.length;n+=2)t+="%"+e.charAt(n)+e.charAt(n+1);return decodeURIComponent(t)},login:function(){var t=this,e=t.$route.params.token,n=t.$route.params.state,o=s.Z.decode(n.replace(new RegExp("@","gm"),"/"));i.Z.loadSessionStore("loginToken");dsf.http.get("fn/mobileAuth/getUserDataByToken?token=".concat(e),{}).then(function(e){r.log("getUserDataByToken-res",e),1==(e=e.data).rcode?(i.Z.saveToSessionStore("user",e.data),i.Z.saveToSessionStore("loginToken",e.data.auth.token),i.Z.saveToLocalStore("loginToken",e.data.auth.token),i.Z.saveToLocalStore("user",a()(e.data)),i.Z.logIn(function(){o.toLowerCase().includes("/commonform/")?t.$router.replace({path:o,query:{closePage:1}}):t.$router.replace(o)},o)):(0==e.rcode?dsf.layer.toast(e.message):dsf.layer.toast("登录失败！"),t.$router.go(-1))}).catch(function(e){dsf.layer.toast("登录失败！"),setTimeout(function(){t.$router.go(-1)},2e3),r.log(e)})}},mounted:function(){}},o=(0,n(51900).Z)(t,function(){return(0,this._self._c)("div")},[],!1,null,"67669896",null).exports}}]);