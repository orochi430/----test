"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[93377],{93377:function(t,s,a){a.r(s),a.d(s,{default:function(){return e}});var s=[function(){var t=this._self._c;return t("div",{staticClass:"ao"},[t("img",{attrs:{src:a(91747),alt:""}})])}],i={data:function(){return{list:[]}},filters:{filterName:function(t){return t?t.substring(0,1)+new Array(t.length).join("*"):""}},mounted:function(){var a=this;function t(){return(65536*(1+Math.random())|0).toString(16).substring(1)}var i=(new Date).getTime(),e="cms"+(t()+t())+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t(),c="YQFKCX";$iaction.encrypt({proName:"YQFKCX",encryptKey:i+c+e},function(t){var s=dsf.layer.loading();dsf.http.post("ctrl/serviceApi/getMoreVaccins/".concat(a.$route.query.idNumber,"/").concat(a.$route.query.name,"/").concat(a.$route.query.vaccinSource),{timestamp:i,token:e,app:c,vcode:t,deviceId:dsf.util.loadLocalStore("DeviceId")||"未获取到设备",deviceName:dsf.util.loadLocalStore("DeviceName")||"未获取到设备"}).then(function(t){dsf.layer.closeLoading(s),200==t.data.code?a.list=t.data.data:dsf.layer.toast(t.data.message)}).error(function(){return dsf.layer.closeLoading(s)})},function(t){alert(t)})},watch:{},methods:{}},e=(0,a(51900).Z)(i,function(){var a=this,i=a._self._c;return i("div",{staticClass:"epidemicPrevention",style:{minHeight:"calc(100vh - ".concat(a.$store.state.isShowAppHeader?"0.92rem":"0px",")")}},[i("div",{staticClass:"box"},[i("div",{staticClass:"top"},[i("div",{staticClass:"title"},[a._v("历史疫苗接种")]),a._v(" "),i("div",{staticClass:"cell"},[i("span",{staticClass:"key"},[a._v("姓名")]),a._v(" "),i("span",{staticClass:"val"},[a._v(a._s(a._f("filterName")(a.$route.query.name)))])]),a._v(" "),i("div",{staticClass:"cell"},[i("span",{staticClass:"key"},[a._v("身份证号")]),a._v(" "),i("span",{staticClass:"val"},[a._v(a._s(a.$route.query.idNumber.replace(/^(.{3})(?:\d+)(.{4})$/,"$1***********$2")))])])]),a._v(" "),a._m(0),a._v(" "),i("div",{staticClass:"bottom"},a._l(a.list,function(t,s){return i("div",{key:t.id,staticClass:"list"},[i("div",{staticClass:"cell",staticStyle:{"font-size":"var(--font_size_2)","font-weight":"600"}},[i("div",{staticClass:"key",staticStyle:{color:"#000"}},[a._v("第"+a._s(t.jzjc)+"剂")]),a._v(" "),i("div",{staticClass:"val"},[a._v(a._s(t.jzrqsj))])]),a._v(" "),i("div",{staticClass:"cell"},[i("div",{staticClass:"key"},[a._v("疫苗名称")]),a._v(" "),i("div",{staticClass:"val"},[i("span",[a._v(a._s(2==t.vaccinSource?t.scqybh:""))]),a._v(" "),t.ymmc&&2==t.vaccinSource?i("span",[a._v("（"+a._s(t.ymmc)+"）")]):t.ymmc?i("span",[a._v(a._s(t.ymmc))]):a._e()])]),a._v(" "),t.ymph?i("div",{staticClass:"cell"},[i("div",{staticClass:"key"},[a._v("疫苗批号")]),a._v(" "),i("div",{staticClass:"val"},[a._v(a._s(t.ymph))])]):a._e(),a._v(" "),t.scqybh?i("div",{staticClass:"cell"},[i("div",{staticClass:"key"},[a._v("生产企业")]),a._v(" "),i("div",{staticClass:"val"},[a._v(a._s(t.scqybh)),t.scqy?i("span",[a._v("（"+a._s(t.scqy)+"）")]):a._e()])]):a._e(),a._v(" "),2==t.vaccinSource?i("div",{staticClass:"cell"},[i("div",{staticClass:"key"},[a._v("接种单位")]),a._v(" "),i("div",{staticClass:"val"},[a._v(a._s(t.vaccinationSiteName))])]):a._e(),a._v(" "),1==t.vaccinSource?i("div",{staticClass:"cell"},[i("div",{staticClass:"key"},[a._v("接种地")]),a._v(" "),i("div",{staticClass:"val"},[a._v(a._s(t.vaccinationSiteName))])]):a._e()])}),0)])])},s,!1,null,"7f925f1c",null).exports},91747:function(t,s,a){t.exports=a.p+"static/img/ao.08e0938..png"}}]);