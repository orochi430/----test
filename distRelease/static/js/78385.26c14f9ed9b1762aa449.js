"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[78385],{78385:function(t,a,i){i.r(a),i.d(a,{default:function(){return n}});var a=i(70596),e=i.n(a),s=i(25108),a={name:"suppliesTotal",components:{},data:function(){return{active:!0,nums:{},plans:{},roomRate:{},topics:{},types:{}}},computed:{},watch:{},methods:{initChart3:function(t,a){var i=e().init(this.$refs.chat3),a={color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"item"},title:{padding:[0,0,0,-25],text:"会议量",left:"50%",top:"30%",textStyle:{fontSize:18,color:"#333333"},subtext:" "+a,subtextStyle:{fontSize:24,color:"#333333",fontWeight:"bold",width:60,align:"right",lineHeight:40}},legend:{top:"bottom",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{type:"pie",radius:["30%","50%"],center:["50%","40%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:t}]};i.clear(),i.setOption(a)},initChart4:function(t){var a=e().init(this.$refs.chat4),t={xAxis:{axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"}},yAxis:{name:"%",nameTextStyle:{fontSize:14,color:"#333",padding:[0,0,0,-40]},min:0,type:"value",axisLine:{show:!1},splitLine:{show:!0,lineStyle:{color:"#ebebeb"}},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"},boundaryGap:["20%","20%"]},series:[{data:t,type:"line",lineStyle:{color:"#F7B500 "},areaStyle:{opacity:.8,color:new(e().graphic.LinearGradient)(0,0,0,1,[{offset:0,color:"rgba(247,181,0,0.76)"},{offset:1,color:"rgba(252,219,0,0.00)"}])}}]};a.setOption(t)},initChart5:function(t){var a=e().init(this.$refs.chat5),t={color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"item"},legend:{top:"center",left:"70%",orient:"vertical",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{type:"pie",radius:["40%","65%"],center:["30%","50%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:t}]};a.clear(),a.setOption(t)},initChart6:function(t){var a=e().init(this.$refs.chat6),t={color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"item"},legend:{top:"bottom",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{type:"pie",radius:["30%","50%"],center:["50%","40%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:t}]};a.clear(),a.setOption(t)},getPageData:function(){var a=this;dsf.http.post("ctrl/meetingStat/meetingStat",{}).then(function(t){t=t.data;s.log(t),t&&t.data&&(t.data.nums&&(a.nums=t.data.nums),t.data.plans&&(a.plans=t.data.plans,t.data.plans.planList.forEach(function(t){t.name=t.text}),a.initChart5(t.data.plans.planList)),t.data.topics&&(a.topics=t.data.topics,t.data.topics.topicList.forEach(function(t){t.name=t.text}),a.initChart6(t.data.topics.topicList)),t.data.types&&(t.data.types.forEach(function(t){t.name=t.text}),a.initChart3(t.data.types,t.data.nums.allNum||0)),t.data.roomRate)&&(t.data.roomRate.forEach(function(t){t.name=t.text}),a.initChart4(t.data.roomRate))})}},created:function(){},mounted:function(){this.getPageData()},destroyed:function(){}},n=(0,i(51900).Z)(a,function(){var t=this,a=t._self._c;return a("div",{staticClass:"organization",staticStyle:{"padding-top":"20px"}},[a("div",{staticClass:"bwnx"},[a("div",{staticClass:"commtitle"},[t._v("办会效能")]),t._v(" "),a("div",{staticClass:"banhui"},[a("div",[a("div",[a("p",[a("span",{staticStyle:{color:"#0091FF"}},[t._v(t._s(t.nums.allNum||0))]),t._v(" "),a("span",[t._v("个")])]),t._v(" "),a("span",[t._v("会议总数")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#44D7B6"}},[t._v(t._s(t.nums.userNum||0))]),t._v(" "),a("span",[t._v("人次")])]),t._v(" "),a("span",[t._v("会议人次")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#F7B500"}},[t._v(t._s(t.nums.hourNum||0))]),t._v(" "),a("span",[t._v("小时")])]),t._v(" "),a("span",[t._v("会议时长")])])]),t._v(" "),a("div",[a("div",[a("p",[a("span",{staticStyle:{color:"#0091FF"}},[t._v(t._s(t.nums.roomNum||0))]),t._v(" "),a("span",[t._v("个")])]),t._v(" "),a("span",[t._v("会议室总数")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#44D7B6"}},[t._v(t._s(t.nums.roomRate?t.nums.roomRate.replace("%",""):0))]),t._v(" "),a("span",[t._v("%")])]),t._v(" "),a("span",[t._v("会议室使用率")])])])])]),t._v(" "),a("div",{staticClass:"bwnx"},[a("div",{staticClass:"commtitle"},[t._v("会议类型")]),t._v(" "),a("div",{ref:"chat3",staticClass:"chart2"})]),t._v(" "),a("div",{staticClass:"bwnx"},[a("div",{staticClass:"commtitle"},[t._v("会议室使用率")]),t._v(" "),a("div",{ref:"chat4",staticClass:"chart2"})]),t._v(" "),a("div",{staticClass:"bwnx"},[a("div",{staticClass:"commtitle"},[t._v("会议计划执行情况")]),t._v(" "),a("div",{staticClass:"banhui"},[a("div",[a("div",[a("p",[a("span",{staticStyle:{color:"#0091FF"}},[t._v(t._s(t.plans.AllNum||0))]),t._v(" "),a("span",[t._v("个")])]),t._v(" "),a("span",[t._v("会议计划数")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#44D7B6"}},[t._v(t._s(t.plans.conveneNum||0))]),t._v(" "),a("span",[t._v("个")])]),t._v(" "),a("span",[t._v("会议召开数")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#F7B500"}},[t._v(t._s(t.plans.rate?t.plans.rate.replace("%",""):0))]),t._v(" "),a("span",[t._v("%")])]),t._v(" "),a("span",[t._v("会议计划执行率")])])])]),t._v(" "),a("div",{ref:"chat5",staticClass:"chart2"})]),t._v(" "),a("div",{staticClass:"bwnx"},[a("div",{staticClass:"commtitle"},[t._v("议题情况")]),t._v(" "),a("div",{staticClass:"banhui"},[a("div",[a("div",[a("p",[a("span",{staticStyle:{color:"#0091FF"}},[t._v(t._s(t.topics.allNum||0))]),t._v(" "),a("span",[t._v("个")])]),t._v(" "),a("span",[t._v("议题总数")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#44D7B6"}},[t._v(t._s(t.topics.attendNum||0))]),t._v(" "),a("span",[t._v("个")])]),t._v(" "),a("span",[t._v("上会数")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#F7B500"}},[t._v(t._s(t.topics.notNum||0))]),t._v(" "),a("span",[t._v("个")])]),t._v(" "),a("span",[t._v("未上会数")])]),t._v(" "),a("div",[a("p",[a("span",{staticStyle:{color:"#0091FF"}},[t._v(t._s(t.topics.attendRate?t.topics.attendRate.replace("%",""):0))]),t._v(" "),a("span",[t._v("%")])]),t._v(" "),a("span",[t._v("上会率")])])])]),t._v(" "),a("div",{ref:"chat6",staticClass:"chart2"})])])},[],!1,null,"ed8589fa",null).exports}}]);