"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[17237],{17237:function(t,s,a){a.r(s),a.d(s,{default:function(){return i}});var s=[function(){var t=this._self._c;return t("div",{staticClass:"ao"},[t("img",{attrs:{src:a(91747),alt:""}})])}],e={data:function(){return{list:[]}},filters:{filterName:function(t){return t?t.substring(0,1)+new Array(t.length).join("*"):""}},mounted:function(){var a=this;function t(){return(65536*(1+Math.random())|0).toString(16).substring(1)}var e=(new Date).getTime(),i="cms"+(t()+t())+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t(),l="YQFKCX";$iaction.encrypt({proName:"YQFKCX",encryptKey:e+l+i},function(t){var s=dsf.layer.loading();dsf.http.post("ctrl/serviceApi/getMoreNucleins/".concat(a.$route.query.idNumber||" ","/").concat(a.$route.query.name||" "),{timestamp:e,token:i,app:l,vcode:t,deviceId:dsf.util.loadLocalStore("DeviceId")||"未获取到设备",deviceName:dsf.util.loadLocalStore("DeviceName")||"未获取到设备"}).then(function(t){dsf.layer.closeLoading(s),200==t.data.code?a.list=t.data.data:dsf.layer.toast(t.data.message)}).error(function(){return dsf.layer.closeLoading(s)})},function(t){alert(t)})},watch:{},methods:{}},i=(0,a(51900).Z)(e,function(){var s=this,a=s._self._c;return a("div",{staticClass:"epidemicPrevention",style:{minHeight:"calc(100vh - ".concat(s.$store.state.isShowAppHeader?"0.92rem":"0px",")")}},[a("div",{staticClass:"box"},[a("div",{staticClass:"top"},[a("div",{staticClass:"title"},[s._v("历史核酸检测")]),s._v(" "),a("div",{staticClass:"cell"},[a("span",{staticClass:"key"},[s._v("姓名")]),s._v(" "),a("span",{staticClass:"val"},[s._v(s._s(s._f("filterName")(s.$route.query.name)))])]),s._v(" "),a("div",{staticClass:"cell"},[a("span",{staticClass:"key"},[s._v("身份证号")]),s._v(" "),a("span",{staticClass:"val"},[s._v(s._s(s.$route.query.idNumber.replace(/^(.{3})(?:\d+)(.{4})$/,"$1***********$2")))])])]),s._v(" "),s._m(0),s._v(" "),a("div",{staticClass:"bottom"},s._l(s.list,function(t){return a("div",{key:t.id,staticClass:"list"},[a("div",{staticClass:"cell"},[a("div",{staticClass:"key"},[s._v("采样时间")]),s._v(" "),a("div",{staticClass:"val"},[s._v(s._s(t.sampleDate))])]),s._v(" "),a("div",{staticClass:"cell"},[a("div",{staticClass:"key"},[s._v("采样单位")]),s._v(" "),a("div",{staticClass:"val"},[s._v(s._s(t.sampleOrgname||"核酸码采集"))])]),s._v(" "),a("div",{staticClass:"cell"},[a("div",{staticClass:"key"},[s._v("采样方式")]),s._v(" "),a("div",{staticClass:"val"},[s._v(s._s(t.testOrgname||t.natResultText?t.sampleTypeText:"待检测机构上传"))])]),s._v(" "),a("div",{staticClass:"cell"},[a("div",{staticClass:"key"},[s._v("检测时间")]),s._v(" "),a("div",{staticClass:"val"},[s._v(s._s(t.testOrgname||t.natResultText?t.collectDate:"待检测机构上传"))])]),s._v(" "),a("div",{staticClass:"cell"},[a("div",{staticClass:"key"},[s._v("检测机构")]),s._v(" "),a("div",{staticClass:"val"},[s._v(s._s(t.testOrgname||t.natResultText?t.testOrgname:"待检测机构上传"))])]),s._v(" "),a("div",{staticClass:"cell",staticStyle:{color:"#000","font-size":"var(--font_size_2)","font-weight":"600"}},[a("div",{staticClass:"key",staticStyle:{color:"#000"}},[s._v("报告时间")]),s._v(" "),a("div",{staticClass:"val"},[s._v(s._s(t.testOrgname||t.natResultText?t.reportDate:"待检测机构上传"))])]),s._v(" "),a("div",{staticClass:"cell",staticStyle:{"font-size":"var(--font_size_2)","font-weight":"600"}},[a("div",{staticClass:"key",staticStyle:{color:"#000"}},[s._v("检测结果")]),s._v(" "),t.testOrgname||t.natResultText?a("div",{staticClass:"val",style:{color:1==t.natResult?"#29B93D":"#DE4B2D"}},[s._v(s._s(t.natResultText))]):a("div",{staticClass:"val"},[s._v("待检测机构上传")])])])}),0)])])},s,!1,null,"22ceb0f0",null).exports},91747:function(t,s,a){t.exports=a.p+"static/img/ao.08e0938..png"}}]);