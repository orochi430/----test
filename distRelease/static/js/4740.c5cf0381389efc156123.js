"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[4740],{30631:function(e,t,n){n.r(t);var o=n(83874),c=n.n(o),n={init:function(e){document.getElementById("qrcode")&&(document.getElementById("qrcode").innerHTML="")},link:function(e,t,n,o,c){o.$router.push({path:"/commonForm/".concat(t,"/").concat(n)})},qrcode:function(e,t){t.$dialog.alert({title:"设备码",message:'<div id="qrcode" style="margin: 0 auto;"></div><div style="padding-top: 0.2rem">请使用仪电哨兵设备扫码注册</div>'}).then(function(){t.onRefresh(),document.getElementById("qrcode").innerHTML=""}),t.$nextTick(function(){var e=document.getElementById("qrcode").clientWidth;new(c())(document.getElementById("qrcode"),{text:'action:{"command": "deviceRegister","data": {"communityId": "'.concat(t.$route.query.pk,'","operateUserId": "').concat(dsf.util.loadSessionStore("user").user_id,'"}}'),width:e,height:e,colorDark:"#000000",colorLight:"#ffffff",correctLevel:c().CorrectLevel.H})})}};t.default=n}}]);