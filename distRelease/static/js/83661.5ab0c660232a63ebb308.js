"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[83661],{83661:function(t,e,i){i.r(e),i.d(e,{default:function(){return n}});var e=i(79529),r=i.n(e),e=i(70596),a=i.n(e),e={name:"projectTotal",components:{},data:function(){return{active:!0}},computed:{},watch:{},methods:{initChart1:function(){var c=[{value:55,name:"进行中"},{value:25,name:"待验收"},{value:20,name:"已验收"}],t=a().init(this.$refs.chat1),e={color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"item"},legend:{top:"center",left:"60%",orient:"vertical",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:12,rich:{name:{fontSize:14,lineHeight:28,color:"#333",fontFamily:"dig",fontWeight:"bold",width:70},percent0:{fontSize:14,lineHeight:28,color:"#0091FF",fontFamily:"dig",fontWeight:"bold",padding:[0,0,0,0]},percent1:{fontSize:14,lineHeight:28,color:"#44D7B6",fontFamily:"dig",fontWeight:"bold",padding:[0,0,0,0]},percent2:{fontSize:14,lineHeight:28,color:"#F7B500",fontFamily:"dig",fontWeight:"bold",padding:[0,0,0,0]},percent3:{fontSize:14,lineHeight:28,color:"#6236FF",fontFamily:"dig",fontWeight:"bold",padding:[0,0,0,0]},word:{fontSize:14,lineHeight:28,color:"#333",fontWeight:"bold",fontFamily:"pf"}}},formatter:function(t){for(var e=0,i=0,a=0,n=0,o=c.length;n<o;n++)e+=r()(c[n].value),c[n].name==t&&(a=n,i=r()(c[n].value));var s=(i/e*100).toFixed(0),l="percent"+a;return"{name|".concat(t,"}  {").concat(l,"|").concat(s,"%}")}},series:[{type:"pie",radius:["40%","60%"],center:["30%","50%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:c}]};t.clear(),t.setOption(e)},initChart2:function(){var t=a().init(this.$refs.chat2);t.clear(),t.setOption({color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{show:!1},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",data:["财务部","办公室","人事处","综合处"]},yAxis:{type:"value"},series:[{name:"类型1",type:"bar",stack:"total",label:{show:!0},emphasis:{focus:"series"},data:[320,302,301,334,390,330,320]},{name:"类型2",type:"bar",stack:"total",label:{show:!0},emphasis:{focus:"series"},data:[120,132,101,134,90,230,210]},{name:"类型3",type:"bar",stack:"total",label:{show:!0},emphasis:{focus:"series"},data:[220,182,191,234,290,330,310]}]})}},created:function(){},mounted:function(){this.initChart1(),this.initChart2()},destroyed:function(){}},n=(0,i(51900).Z)(e,function(){var t=this,e=t._self._c;return e("div",{staticClass:"organization",staticStyle:{"padding-top":"20px"}},[t._m(0),t._v(" "),e("div",{staticClass:"bwnx"},[e("div",{staticClass:"commtitle"},[t._v("阶段情况")]),t._v(" "),e("div",{ref:"chat1",staticClass:"chart2"})]),t._v(" "),e("div",{staticClass:"bwnx"},[e("div",{staticClass:"commtitle"},[t._v("部门项目")]),t._v(" "),e("div",{ref:"chat2",staticClass:"chart2"})])])},[function(){var t=this,e=t._self._c;return e("div",{staticClass:"bwnx"},[e("div",{staticClass:"commtitle"},[t._v("项目数量")]),t._v(" "),e("div",{staticClass:"banhui"},[e("div",[e("div",[e("p",[e("span",{staticStyle:{color:"#0091FF"}},[t._v("21")]),t._v(" "),e("span")]),t._v(" "),e("span",[t._v("项目总数")])]),t._v(" "),e("div",[e("p",[e("span",{staticStyle:{color:"#F7B500"}},[t._v("18")]),t._v(" "),e("span")]),t._v(" "),e("span",[t._v("进行中")])]),t._v(" "),e("div",[e("p",[e("span",{staticStyle:{color:"#44D7B6"}},[t._v("3")]),t._v(" "),e("span")]),t._v(" "),e("span",[t._v("已验收")])])])])])}],!1,null,"90d5d0e6",null).exports}}]);