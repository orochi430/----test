"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[90948],{90948:function(t,a,i){i.r(a),i.d(a,{default:function(){return s}});var e=i(25108),a={name:"assistantPrice",data:function(){return{travelData:null,grade:null,isHot:!1,showPopover:!1}},computed:{hotText:function(){var a="";return this.travelData.hotMouth.forEach(function(t){e.log(t),-1<String(t).indexOf(".")?String(t).split(".")[1]<6?a+="".concat(t,"月上旬"):a+="".concat(t,"月下旬"):a+="".concat(t,"月")}),e.log(a,this.travelData.hotMouth),a}},created:function(){this.grade=this.$route.params.grade,this.travelData=this.$route.params.travelData;var a=(new Date).getMonth()+1,i=(e.log(a),e.log(this.travelData),(new Date).getDate());this.isHot=this.travelData.hotMouth.filter(function(t){return-1<String(t).indexOf(".")?5<String(t).split(".")[1]&&15<i||String(t).split(".")[1]<6&&i<16:String(t)==a}).length}},s=(0,i(51900).Z)(a,function(){var a=this,t=a._self._c;return t("div",{staticClass:"box"},[t("div",{staticClass:"nav"},[t("van-icon",{staticClass:"navicon",attrs:{name:"arrow-left"},on:{click:function(t){return a.$router.go(-1)}}}),a._v(" "),t("p",[a._v("公务助手")])],1),a._v(" "),t("van-cell",{attrs:{border:!1,title:"查询结果：",size:"large"}}),a._v(" "),t("div",{staticClass:"content disfr"},[t("div",{staticClass:"hotelPrice flex1"},[t("p",{staticClass:"disfr ac"},[a._v("住宿费标准"),t("van-icon",{staticStyle:{"margin-left":"5px"},attrs:{name:"question-o"}})],1),a._v(" "),t("div",{staticClass:"price"},[a._v("\n        "+a._s(a.travelData.price[a.grade].price)+"\n        "),t("span",[a._v("元/人/天")])])]),a._v(" "),t("div",{staticClass:"lrline"}),a._v(" "),t("div",{staticClass:"hotPrice flex1"},[t("p",{staticClass:"disfr ac"},[a._v("旺季浮动标准\n        "),t("van-popover",{attrs:{theme:"dark",placement:"top",trigger:"click"},scopedSlots:a._u([{key:"reference",fn:function(){return[t("van-icon",{staticStyle:{"margin-left":"5px"},attrs:{name:"question-o"}})]},proxy:!0}]),model:{value:a.showPopover,callback:function(t){a.showPopover=t},expression:"showPopover"}},[a.travelData.hotMouth.length?t("div",{staticStyle:{padding:"10px"}},[a._v("旺季月份为:"+a._s(a.hotText))]):t("div",{staticStyle:{padding:"10px"}},[a._v("该地区暂无旺季")])])],1),a._v(" "),t("div",{staticClass:"price"},[a.travelData.hotPrice&&a.isHot?t("div",{staticClass:"price"},[a._v("\n          "+a._s(a.travelData.hotPrice[a.grade].price)+"\n          "),t("span",[a._v("元/人/天")])]):t("div",{staticClass:"price"},[a._v("\n          本月非旺季\n        ")])])])]),a._v(" "),t("div",{staticClass:"hotInfo disfr"},[t("div",{staticClass:"iconLogo"},[t("van-icon",{attrs:{name:"warning",color:"#3386f1"}})],1),a._v(" "),a._m(0)])],1)},[function(){var t=this,a=t._self._c;return a("div",{staticClass:"infoContent flex1"},[a("p",{staticClass:"infoTitle"},[t._v("标准/旺季  住宿费说明：")]),t._v(" "),a("div",{staticClass:"info"},[t._v("\n        查询结果所列标准，均为财政部公布的标准\n      ")])])}],!1,null,"00ffa80c",null).exports}}]);