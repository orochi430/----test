"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[24159],{24159:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});var e=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"top"},[e("div",{staticClass:"flex jb"},[e("span"),t._v(" "),e("img",{staticStyle:{width:"1.46rem",height:"0.48rem"},attrs:{src:n(8685),alt:""}})]),t._v(" "),e("div",{staticClass:"title"},[t._v("疫情防控  人人有责")])])},function(){var t=this._self._c;return t("div",{staticClass:"ao"},[t("img",{attrs:{src:n(91747),alt:""}})])},function(){var t=this._self._c;return t("div",{staticStyle:{"font-size":"var(--font_size_4)",color:"#666"}},[t("div",{staticStyle:{"padding-bottom":"0.1rem"}},[this._v("开发公司：仪电双杨智能科技（上海）有限公司")])])}],i=n(8450),a=n.n(i),o=n(25108),i={data:function(){return{name:"",idCard:"",docHeight:document.documentElement.clientHeight,showHeight:document.documentElement.clientHeight,isShow:!0,show:!1,showKey:!1,showHistory:!1,phone:"",phonecode:"",smsBtnText:"发送验证码",smsBtnEnable:!1,phoneValidator:[{required:!0},{pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,message:"请输入正确手机号"}],idCardValidator:[{required:!0},{pattern:/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,message:"请输入正确身份证号码"}],data:null,keyword:"",list:[],loading:!1,finished:!1,finishedTips:"",container:null,start:1,usedTimes:"",allowTimes:""}},created:function(){},mounted:function(){var i=this;window.onresize=function(){i.showHeight=document.documentElement.clientHeight},this.$nextTick(function(){var t=document.documentElement.clientHeight,e=document.documentElement.clientWidth,n=i.$refs.box.offsetHeight;i.$refs.box.style.transform="translateY(".concat(0<t-n-e/1.3?t-n-e/1.3:0,"px)")})},watch:{showHeight:function(t,e){this.docHeight>t?this.isShow=!1:this.isShow=!0}},methods:{scan:function(){var e=this;$iaction.getIdentityCardMsg({type:"1",quality:"0"},function(t){o.log(t);t=JSON.parse(t);t.ID&&t.Name?(e.idCard=t.ID,e.name=t.Name,e.show=!0):dsf.layer.toast("未检测到身份证，请重新识别")},function(t){})},query:function(){var e=this,t={name:e.name,idNumber:e.idCard,deviceId:dsf.util.loadLocalStore("DeviceId")||"未获取到设备"};$iaction.encrypt({proName:"YQFKCX",encryptKey:a()(t),encryptType:"sm4"},function(t){e.loadingIndx=dsf.layer.loading(),dsf.http.Axios.post(dsf.url.getWebPath("/ctrl/app/device/action/queryByUser"),t,{headers:{"x-auth-token":dsf.util.loadSessionStore("loginToken"),"Content-Type":"application/json;charset=UTF-8"}}).then(function(t){dsf.layer.closeLoading(e.loadingIndx),200==t.data.code?$iaction.decode({proName:"YQFKCX",decodeKey:t.data.data,decodeType:"sm4"},function(t){e.$router.push({path:"/newEpidemicResult",query:{data:t}})},function(t){alert(t)}):dsf.layer.toast(t.data.message)}).error(function(t){dsf.layer.toast("查询失败，请重试")}).finally(function(){})},function(t){alert(t)})},scanCode:function(){var e;"app"==dsf.util.getClientName()?(e=this,xsfBarcode.scan(function(t){o.log(t),t.text&&(t={qrcode:t.text,deviceId:dsf.util.loadLocalStore("DeviceId")||"未获取到设备"},$iaction.encrypt({proName:"YQFKCX",encryptKey:a()(t),encryptType:"sm4"},function(t){e.loadingIndx=dsf.layer.loading(),dsf.http.Axios.post(dsf.url.getWebPath("/ctrl/app/device/action/onQRCodeRequest"),t,{headers:{"x-auth-token":dsf.util.loadSessionStore("loginToken"),"Content-Type":"application/json;charset=UTF-8"}}).then(function(t){dsf.layer.closeLoading(e.loadingIndx),200==t.data.code?$iaction.decode({proName:"YQFKCX",decodeKey:t.data.data,decodeType:"sm4"},function(t){e.$router.push({path:"/newEpidemicResult",query:{data:t}})},function(t){alert(t)}):dsf.layer.toast(t.data.message)}).error(function(t){dsf.layer.toast("查询失败，请重试")}).finally(function(){})},function(t){alert(t)}))},function(t){dsf.layer.toast("扫码失败")})):dsf.layer.toast("需在app中进行扫码")}}},s=(0,n(51900).Z)(i,function(){var e=this,t=e._self._c;return t("div",{staticClass:"epidemicPrevention",style:{minHeight:"calc(100vh - ".concat(e.$store.state.isShowAppHeader?"0.92rem":"0px",")")}},[t("div",{ref:"box",staticClass:"box"},[e._m(0),e._v(" "),e._m(1),e._v(" "),t("div",{staticClass:"bottom"},[t("van-button",{staticStyle:{width:"100%","font-size":"var(--font_size_2)"},attrs:{type:"info"},on:{click:function(t){return e.scan()}}},[e._v("身份证查询")]),e._v(" "),t("van-button",{staticStyle:{width:"100%","font-size":"var(--font_size_2)"},attrs:{type:"info"},on:{click:function(t){return e.scanCode()}}},[e._v("扫码查询")]),e._v(" "),e._m(2)],1)]),e._v(" "),e.isShow?t("div",{staticClass:"bg-bottom"},[t("img",{attrs:{src:n(31448),alt:""}})]):e._e(),e._v(" "),t("van-dialog",{attrs:{title:"身份证查询","show-confirm-button":!1},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t("van-form",{ref:"smslogin"},[t("van-field",{attrs:{rules:[{required:!0}],readonly:"",name:"姓名",placeholder:"请输入姓名",center:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),t("van-field",{attrs:{rules:[{required:!0}],readonly:"",name:"身份证",placeholder:"请输入身份证",center:""},model:{value:e.idCard,callback:function(t){e.idCard=t},expression:"idCard"}}),e._v(" "),t("van-button",{staticStyle:{width:"100%","font-size":"var(--font_size_3)"},attrs:{type:"info"},on:{click:function(t){return e.query()}}},[e._v("确认")])],1),e._v(" "),t("div",{staticClass:"close-icon",on:{click:function(t){e.show=!1}}},[t("van-icon",{attrs:{name:"close",size:"30px"}})],1)],1)],1)},e,!1,null,"4f222f85",null).exports},91747:function(t,e,n){t.exports=n.p+"static/img/ao.08e0938..png"},31448:function(t,e,n){t.exports=n.p+"static/img/bg1.17df9c8..png"},8685:function(t,e,n){t.exports=n.p+"static/img/logo2.437af24..png"}}]);