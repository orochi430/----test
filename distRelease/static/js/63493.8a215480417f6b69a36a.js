"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[63493],{63493:function(t,s,a){a.r(s),a.d(s,{default:function(){return n}});var e=a(25108),s={data:function(){return{url:"",message:""}},created:function(){this.showQRCode()},methods:{showQRCode:function(){var s=this;dsf.http.post("fn/DutyForMobiles/showQRCode").then(function(t){e.log(t),200==t.data.code?s.url="data:image/jpeg;base64,".concat(t.data.data):s.message=t.data.message})}}},n=(0,a(51900).Z)(s,function(){var t=this,s=t._self._c;return s("div",[t.url?s("img",{staticClass:"qrcode",attrs:{src:t.url,alt:""}}):s("div",{staticClass:"message"},[t._v(t._s(t.message))]),t._v(" "),s("div",{staticClass:"box"},[s("div",[t._v("请提供给下一值班人")]),t._v(" "),s("div",[t._v(t._s(t.dsf.date.format(new Date,"yyyy-mm-dd")))])])])},[],!1,null,"3c4f420d",null).exports}}]);