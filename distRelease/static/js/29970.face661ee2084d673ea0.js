"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[29970],{29970:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var t={data:function(){return{renda:null,errored:!0,tips:"您暂无权限使用该系统！",code:this.$route.params.code}},created:function(){"401"===this.code&&(this.tips="您进行了未授权的访问，请重新登录！")},mounted:function(){var t=this;t.loadJsSdk(function(e){t.renda=e,t.navigateToApp()})},methods:{loadJsSdk:function(e){var t=navigator.userAgent,n=/miniProgram/i.test(t)&&/micromessenger/i.test(t),t=t.includes("AlipayClient"),i=document.createElement("script"),n=(i.type="text/javascript",n?i.src="./static/js/jweixin-1.6.0.js":t&&(i.src="https://appx/web-view.min.js"),document.head.appendChild(i),document.createElement("script"));n.type="text/javascript",n.src="https://szrd.jxrd.gov.cn/jsApi/sdk.mini.js",document.head.appendChild(n),n.onload=function(){e&&e(renda)}},navigateToApp:function(e,t){e=e||"home",t=t||3;var n=this;n.renda&&(n.renda.isWx||n.renda.isZfb)&&n.renda.navigateToApp&&setTimeout(function(){n.renda.navigateToApp(e)},1e3*t)}}},i=(0,n(51900).Z)(t,function(){var e=this,t=e._self._c;return t("div",[e.errored?t("commonempty",{attrs:{image:"error",description:e.tips}}):e._e()],1)},[],!1,null,"f14793d4",null).exports}}]);