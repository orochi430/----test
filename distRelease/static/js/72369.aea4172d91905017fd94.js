"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[72369],{72369:function(t,i,a){a.r(i),a.d(i,{default:function(){return n}});var i=a(70596),e=a.n(i),i={name:"costTotal",components:{},data:function(){return{}},computed:{},watch:{},methods:{initChart1:function(){var t=e().init(this.$refs.chat1);t.clear(),t.setOption({color:["#0091FF"],grid:{right:20},xAxis:{data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333",rotate:-45}},yAxis:{min:0,type:"value",axisLine:{show:!1},splitLine:{show:!0,lineStyle:{color:"#ebebeb"}},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"},boundaryGap:["20%","20%"]},dataGroupId:"",animationDurationUpdate:500,series:{type:"bar",id:"sales",barWidth:15,data:[5,7,10,14,18,22,25,30,27,24,21,11],universalTransition:{enabled:!0,divideShape:"clone"}}},!0)},initChart2:function(t,i){t=e().init(t),i={color:["#0091FF","#44D7B6","#F7B500 ","#FA6400","#32C5FF"],tooltip:{trigger:"item"},legend:{bottom:10,left:"center",orient:"horizontal",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{name:"报销",type:"pie",radius:"40%",data:i,label:{show:!0,position:"outer",alignTo:"labelLine",backgroundColor:"auto",height:0,width:0,lineHeight:0,distanceToLabelLine:0,borderRadius:2.5,padding:[-20,-2.5,2.5,-2.5],formatter:"{b|{b}:}\n{a|{d}%}",rich:{a:{color:"#333",fontSize:14,lineHeight:24,fontWeight:"bold"},b:{padding:[0,5,0,5],color:"#333",fontSize:14,lineHeight:24}}},emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};t.clear(),t.setOption(i)}},created:function(){},mounted:function(){this.initChart1();this.initChart2(this.$refs.chat2,[{value:1048,name:"培训费"},{value:735,name:"评审费"},{value:580,name:"监考费"}]),this.initChart2(this.$refs.chat3,[{value:1048,name:"已报销"},{value:735,name:"未报销"}]);this.initChart2(this.$refs.chat4,[{value:1048,name:"讲课"},{value:735,name:"带班"},{value:120,name:"调研"},{value:500,name:"培训"}])},destroyed:function(){}},n=(0,a(51900).Z)(i,function(){var t=this,i=t._self._c;return i("div",{staticClass:"organization",staticStyle:{"padding-top":"20px"}},[i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("夜餐费")]),t._v(" "),i("div",{ref:"chat1",staticClass:"chart2"})]),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("劳务费")]),t._v(" "),i("div",{ref:"chat2",staticClass:"chart2"})]),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("出差报销")]),t._v(" "),i("div",{ref:"chat3",staticClass:"chart2"}),t._v(" "),i("div",{ref:"chat4",staticClass:"chart2"})])])},[],!1,null,"62efd93f",null).exports}}]);