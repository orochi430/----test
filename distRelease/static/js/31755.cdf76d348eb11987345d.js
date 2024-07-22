"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[31755],{31755:function(t,i,a){a.r(i),a.d(i,{default:function(){return l}});var i=a(70596),s=a.n(i),i={name:"organization",components:{},data:function(){return{}},computed:{},watch:{},methods:{initChart1:function(){var t=s().init(this.$refs.chat1);t.clear(),t.setOption({series:[{type:"gauge",center:["50%","70%"],radius:"100%",startAngle:200,endAngle:-20,axisLine:{lineStyle:{width:20,color:[[.25,"#f5631f"],[.5,"#f3b529"],[.75,"#2a90fc"],[1,"#53d7b6"]]}},pointer:{length:"40%",width:5,itemStyle:{offsetCenter:[20,0],color:"#53d7b6"}},axisTick:{show:!1,distance:-30,length:8,lineStyle:{color:"#fff",width:2}},splitLine:{show:!1,distance:-30,length:30,lineStyle:{color:"#fff",width:4}},axisLabel:{show:!1,color:"inherit",distance:40,fontSize:12},detail:{valueAnimation:!0,formatter:"{percent|{value}%}\n{word|办结率}",rich:{percent:{fontSize:18,lineHeight:28,color:"#53d7b6",fontWeight:"600",padding:[30,0,0,7]},word:{fontSize:14,lineHeight:28,color:"#000",fontFamily:"pf",padding:[-30,0,0,7]}},offsetCenter:[0,"-5%"],textStyle:{fontSize:14,color:"#53d7b6"}},data:[{value:70}]}]})},initChart2:function(){var t=s().init(this.$refs.chat2);t.clear(),t.setOption({color:["#44D7B6","#0091FF","#FA6400"],xAxis:{data:["收文","发文","签报"],axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"}},yAxis:{name:"小时",nameTextStyle:{fontSize:14,color:"#333",padding:[0,0,0,-40]},min:0,type:"value",axisLine:{show:!1},splitLine:{show:!0,lineStyle:{color:"#ebebeb"}},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"},boundaryGap:["20%","20%"]},dataGroupId:"",animationDurationUpdate:500,series:{type:"bar",id:"sales",barWidth:45,data:[{value:88,groupId:"收文",itemStyle:{color:"#44D7B6"}},{value:16,groupId:"发文",itemStyle:{color:"#0091FF"}},{value:32,groupId:"签报",itemStyle:{color:"#FA6400"}}],universalTransition:{enabled:!0,divideShape:"clone"}}},!0)},initChart3:function(){var t=s().init(this.$refs.chat3);t.clear(),t.setOption({color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"item"},title:{padding:[0,0,0,-25],text:"会议量",left:"30%",top:"38%",textStyle:{fontSize:18,color:"#333333"},subtext:" 73",subtextStyle:{fontSize:24,color:"#333333",fontWeight:"bold",width:60,align:"right",lineHeight:40}},legend:{top:"center",left:"70%",orient:"vertical",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{type:"pie",radius:["40%","65%"],center:["30%","50%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:13,name:"办公会"},{value:20,name:"党委会"},{value:10,name:"内部会"},{value:40,name:"专题会"}]}]})},initChart4:function(){var t=s().init(this.$refs.chat4),i={xAxis:{data:["101","201","301","401","501","601"],axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"}},yAxis:{name:"%",nameTextStyle:{fontSize:14,color:"#333",padding:[0,0,0,-40]},min:0,max:100,type:"value",axisLine:{show:!1},splitLine:{show:!0,lineStyle:{color:"#ebebeb"}},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"},boundaryGap:["20%","20%"]},series:[{data:[99,50,55,28,36,45],type:"line",lineStyle:{color:"#F7B500 "},areaStyle:{opacity:.8,color:new(s().graphic.LinearGradient)(0,0,0,1,[{offset:0,color:"rgba(247,181,0,0.76)"},{offset:1,color:"rgba(252,219,0,0.00)"}])}}]};t.setOption(i)},initChart5:function(t,i,a){t=s().init(t),i={series:[{type:"gauge",center:["50%","70%"],radius:"130%",startAngle:200,endAngle:-20,axisLine:{lineStyle:{width:10,color:[[.25,"#f5631f"],[.5,"#f3b529"],[.75,"#2a90fc"],[1,"#53d7b6"]]}},pointer:{length:"40%",width:3,itemStyle:{offsetCenter:[20,0],color:"#53d7b6"}},axisTick:{show:!1,distance:-30,length:8,lineStyle:{color:"#fff",width:2}},splitLine:{show:!1,distance:-30,length:30,lineStyle:{color:"#fff",width:4}},axisLabel:{show:!1,color:"inherit",distance:40,fontSize:12},detail:{valueAnimation:!0,formatter:"{percent|"+a+"%}\n{word|"+i+"}",rich:{percent:{fontSize:18,lineHeight:28,color:"#53d7b6",fontWeight:"600",padding:[20,0,0,7]},word:{fontSize:16,lineHeight:28,color:"#000",fontFamily:"pf",padding:[-10,0,0,7]}},offsetCenter:[0,"-5%"],textStyle:{fontSize:14,color:"#53d7b6"}},data:[{value:a}]}]};t.clear(),t.setOption(i)},initChart6:function(){var t=s().init(this.$refs.chat7);t.clear(),t.setOption({color:["#0091FF","#44D7B6","#F7B500 ","#FA6400","#32C5FF"],tooltip:{trigger:"item"},legend:{top:"center",left:"60%",orient:"vertical",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{type:"pie",center:["30%","50%"],radius:["0","60%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:13,name:"会议决议"},{value:20,name:"领导批示"},{value:10,name:"上级来文"},{value:40,name:"年度重点工作"},{value:10,name:"重要事项"}]}]})}},created:function(){},mounted:function(){this.initChart1(),this.initChart2(),this.initChart3(),this.initChart4(),this.initChart5(this.$refs.chat5,"办结率",70),this.initChart5(this.$refs.chat6,"反馈率",80),this.initChart6()},destroyed:function(){}},e=a(51900),i=(0,e.Z)(i,function(){var t=this,i=t._self._c;return i("div",{staticClass:"organization"},[i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("办文效能")]),t._v(" "),i("div",{staticClass:"xnbox"},[t._m(0),t._v(" "),i("div",{staticClass:"xnright"},[i("div",{ref:"chat1",staticClass:"chat"})])])]),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("运转平均耗时")]),t._v(" "),i("div",{ref:"chat2",staticClass:"chart2"})]),t._v(" "),t._m(2),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("会议类型")]),t._v(" "),i("div",{ref:"chat3",staticClass:"chart2"})]),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("会议室使用率")]),t._v(" "),i("div",{ref:"chat4",staticClass:"chart2"})]),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("督办效能")]),t._v(" "),i("div",{staticClass:"xnbox",staticStyle:{height:"auto"}},[t._m(3),t._v(" "),i("div",{staticClass:"xnright1"},[i("div",{ref:"chat5",staticClass:"chat"}),t._v(" "),i("div",{ref:"chat6",staticClass:"chat"})])])]),t._v(" "),t._m(4),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("督办类型")]),t._v(" "),i("div",{ref:"chat7",staticClass:"chart2"})])])},[function(){var t=this,i=t._self._c;return i("div",{staticClass:"xnleft"},[i("div",[i("span",[t._v("办文总数")]),t._v(" "),i("span",[t._v("98")])]),t._v(" "),i("div",[i("span",[t._v("办结文件")]),t._v(" "),i("span",[t._v("76")])]),t._v(" "),i("div",[i("span",[t._v("在办文件")]),t._v(" "),i("span",[t._v("22")])]),t._v(" "),i("div",[i("span",[t._v("超期文件")]),t._v(" "),i("span",[t._v("4")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("超期文件")]),t._v(" "),i("div",{staticClass:"wjtypes"},[i("span",[t._v("收文：1")]),t._v(" "),i("span",[t._v("发文：2")]),t._v(" "),i("span",[t._v("签报：1")])]),t._v(" "),i("div",{staticClass:"items"},[i("div",{staticClass:"item"},[i("span",{staticClass:"name"},[t._v("办公室")]),t._v(" "),i("p",{staticClass:"percent"},[i("span",{staticStyle:{background:"#F7B500",width:"62px"}})]),t._v(" "),i("span",{staticClass:"num"},[t._v("1")])]),t._v(" "),i("div",{staticClass:"item"},[i("span",{staticClass:"name"},[t._v("局领导")]),t._v(" "),i("p",{staticClass:"percent"},[i("span",{staticStyle:{background:"#0091FF",width:"124px"}}),t._v(" "),i("span",{staticStyle:{background:"#6DD400",width:"62px"}})]),t._v(" "),i("span",{staticClass:"num"},[t._v("3")])])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("办会效能")]),t._v(" "),i("div",{staticClass:"banhui"},[i("div",[i("div",[i("p",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("73")]),t._v(" "),i("span",[t._v("个")])]),t._v(" "),i("span",[t._v("会议总数")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#44D7B6"}},[t._v("621")]),t._v(" "),i("span",[t._v("人次")])]),t._v(" "),i("span",[t._v("会议人次")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("139")]),t._v(" "),i("span",[t._v("小时")])]),t._v(" "),i("span",[t._v("会议时长")])])]),t._v(" "),i("div",[i("div",[i("p",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("73")]),t._v(" "),i("span",[t._v("个")])]),t._v(" "),i("span",[t._v("会议室总数")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#44D7B6"}},[t._v("64")]),t._v(" "),i("span",[t._v("%")])]),t._v(" "),i("span",[t._v("会议室使用率")])])])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"xnleft xnleft1"},[i("div",[i("span",[t._v("立项")]),t._v(" "),i("span",[t._v("20")])]),t._v(" "),i("div",[i("span",[t._v("办结")]),t._v(" "),i("span",[t._v("8")])]),t._v(" "),i("div",[i("span",[t._v("在办")]),t._v(" "),i("span",[t._v("12")])]),t._v(" "),i("div",[i("span",[t._v("反馈")]),t._v(" "),i("span",[t._v("43")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("办会效能")]),t._v(" "),i("div",{staticClass:"fenxian"},[i("div",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("5")]),t._v(" "),i("span",[t._v("延期数")])]),t._v(" "),i("div",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("5")]),t._v(" "),i("span",[t._v("催办任务")])]),t._v(" "),i("div",[i("span",{staticStyle:{color:"#FA6400"}},[t._v("1")]),t._v(" "),i("span",[t._v("超期数")])])])])}],!1,null,"7fc4b1fa",null).exports,n=(0,e.Z)({name:"department",components:{},data:function(){return{}},computed:{},watch:{},methods:{initChart2:function(){var t=s().init(this.$refs.chat2);t.clear(),t.setOption({color:["#44D7B6","#0091FF","#FA6400"],xAxis:{data:["收文-部门承办","发文-签发","签报-部门会签"],axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!0,fontSize:12,color:"#333",rotate:-25,padding:[10,0,0,-20]}},yAxis:{name:"小时",nameTextStyle:{fontSize:14,color:"#333",padding:[0,0,0,-40]},min:0,type:"value",axisLine:{show:!1},splitLine:{show:!0,lineStyle:{color:"#ebebeb"}},axisTick:{show:!1},axisLabel:{show:!0,fontSize:12,color:"#333"},boundaryGap:["20%","20%"]},dataGroupId:"",animationDurationUpdate:500,series:{type:"bar",id:"sales",barWidth:45,data:[{value:88,groupId:"收文",itemStyle:{color:"#44D7B6"}},{value:16,groupId:"发文",itemStyle:{color:"#0091FF"}},{value:32,groupId:"签报",itemStyle:{color:"#FA6400"}}],universalTransition:{enabled:!0,divideShape:"clone"}}},!0)},initChart3:function(){var t=s().init(this.$refs.chat3);t.clear(),t.setOption({color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"item"},title:{padding:[0,0,0,-25],text:"会议量",left:"30%",top:"38%",textStyle:{fontSize:18,color:"#333333"},subtext:" 73",subtextStyle:{fontSize:24,color:"#333333",fontWeight:"bold",width:60,align:"right",lineHeight:40}},legend:{top:"center",left:"70%",orient:"vertical",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{type:"pie",radius:["40%","60%"],center:["30%","50%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:13,name:"办公会"},{value:20,name:"党委会"},{value:10,name:"内部会"},{value:40,name:"专题会"}]}]})},initChart5:function(t,i,a){t=s().init(t),i={series:[{type:"gauge",center:["50%","70%"],radius:"120%",startAngle:200,endAngle:-20,axisLine:{lineStyle:{width:10,color:[[.25,"#f5631f"],[.5,"#f3b529"],[.75,"#2a90fc"],[1,"#53d7b6"]]}},pointer:{length:"40%",width:3,itemStyle:{offsetCenter:[20,0],color:"#53d7b6"}},axisTick:{show:!1,distance:-30,length:8,lineStyle:{color:"#fff",width:2}},splitLine:{show:!1,distance:-30,length:30,lineStyle:{color:"#fff",width:4}},axisLabel:{show:!1,color:"inherit",distance:40,fontSize:12},detail:{valueAnimation:!0,formatter:"{percent|"+a+"%}\n{word|"+i+"}",rich:{percent:{fontSize:18,lineHeight:28,color:"#53d7b6",fontWeight:"600",padding:[20,0,0,7]},word:{fontSize:16,lineHeight:28,color:"#000",fontFamily:"pf",padding:[-10,0,0,7]}},offsetCenter:[0,"-5%"],textStyle:{fontSize:14,color:"#53d7b6"}},data:[{value:a}]}]};t.clear(),t.setOption(i)}},created:function(){},mounted:function(){this.initChart2(),this.initChart3(),this.initChart5(this.$refs.chat5,"办结率",70),this.initChart5(this.$refs.chat6,"反馈率",80)},destroyed:function(){}},function(){var t=this,i=t._self._c;return i("div",{staticClass:"organization"},[t._m(0),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("超期文件")]),t._v(" "),i("div",{staticClass:"cqlist"},[i("div",[i("p",[t._v("[签报] 关于xxx项目执行情况的说明报告")]),t._v(" "),i("p",[i("span",[i("van-icon",{attrs:{name:"contact"}}),t._v("\r\n                        张晓林\r\n                    ")],1),t._v(" "),i("span",[i("van-icon",{attrs:{name:"underway-o"}}),t._v("\r\n                        超期一天\r\n                    ")],1)])])])]),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("环节办理耗时")]),t._v(" "),i("div",{ref:"chat2",staticClass:"chart2"})]),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("会议类型")]),t._v(" "),i("div",{ref:"chat3",staticClass:"chart2"})]),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("督办效能")]),t._v(" "),i("div",{staticClass:"xnbox",staticStyle:{height:"auto"}},[t._m(2),t._v(" "),i("div",{staticClass:"xnright1"},[i("div",{ref:"chat5",staticClass:"chat"}),t._v(" "),i("div",{ref:"chat6",staticClass:"chat"})])])]),t._v(" "),t._m(3)])},[function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("办文效能")]),t._v(" "),i("div",{staticClass:"xnleft2"},[i("div",[i("span",[t._v("办文总数")]),t._v(" "),i("span",[t._v("98")])]),t._v(" "),i("div",[i("span",[t._v("拟稿文件")]),t._v(" "),i("span",[t._v("4")])]),t._v(" "),i("div",[i("span",[t._v("经办文件")]),t._v(" "),i("span",[t._v("17")])]),t._v(" "),i("div",[i("span",[t._v("在办文件")]),t._v(" "),i("span",[t._v("22")])]),t._v(" "),i("div",[i("span",[t._v("超期文件")]),t._v(" "),i("span",[t._v("22")])]),t._v(" "),i("div",[i("span",[t._v("办结文件")]),t._v(" "),i("span",[t._v("4")])])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("办会效能")]),t._v(" "),i("div",{staticClass:"banhui"},[i("div",[i("div",[i("p",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("15")]),t._v(" "),i("span",[t._v("个")])]),t._v(" "),i("span",[t._v("发起会议总数")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#44D7B6"}},[t._v("112")]),t._v(" "),i("span",[t._v("人次")])]),t._v(" "),i("span",[t._v("发起人次")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("38")]),t._v(" "),i("span",[t._v("小时")])]),t._v(" "),i("span",[t._v("总时长")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("2.5")]),t._v(" "),i("span",[t._v("小时")])]),t._v(" "),i("span",[t._v("平均时长")])])]),t._v(" "),i("div",[i("div",[i("p",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("33")]),t._v(" "),i("span",[t._v("个")])]),t._v(" "),i("span",[t._v("参加会议总数")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#44D7B6"}},[t._v("70")]),t._v(" "),i("span",[t._v("人次")])]),t._v(" "),i("span",[t._v("参加人次")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("62")]),t._v(" "),i("span",[t._v("小时")])]),t._v(" "),i("span",[t._v("总时长")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("1.8")]),t._v(" "),i("span",[t._v("小时")])]),t._v(" "),i("span",[t._v("平均时长")])])])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"xnleft xnleft1"},[i("div",[i("span",[t._v("立项")]),t._v(" "),i("span",[t._v("3")])]),t._v(" "),i("div",[i("span",[t._v("办结")]),t._v(" "),i("span",[t._v("0")])]),t._v(" "),i("div",[i("span",[t._v("在办")]),t._v(" "),i("span",[t._v("4")])]),t._v(" "),i("div",[i("span",[t._v("反馈")]),t._v(" "),i("span",[t._v("10")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("督办反馈")]),t._v(" "),i("div",{staticClass:"fenxian"},[i("div",[i("span",{staticStyle:{color:"#FA6400"}},[t._v("5")]),t._v(" "),i("span",[t._v("临期未反馈")])]),t._v(" "),i("div",[i("span",{staticStyle:{color:"#E02020"}},[t._v("4")]),t._v(" "),i("span",[t._v("超期未反馈")])]),t._v(" "),i("div",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("1")]),t._v(" "),i("span",[t._v("延期")])])])])}],!1,null,"b4030a40",null).exports,v=(0,e.Z)({name:"person",components:{},data:function(){return{}},computed:{},watch:{},methods:{initChart2:function(){var t=s().init(this.$refs.chat2);t.clear(),t.setOption({color:["#44D7B6","#0091FF","#FA6400"],xAxis:{data:["收文-部门承办","发文-签发","签报-部门会签"],axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333",rotate:-25,padding:[10,0,0,-20]}},yAxis:{name:"小时",nameTextStyle:{fontSize:14,color:"#333",padding:[10,0,0,-20]},min:0,type:"value",axisLine:{show:!1},splitLine:{show:!0,lineStyle:{color:"#ebebeb"}},axisTick:{show:!1},axisLabel:{show:!0,fontSize:14,color:"#333"},boundaryGap:["20%","20%"]},dataGroupId:"",animationDurationUpdate:500,series:{type:"bar",id:"sales",barWidth:45,data:[{value:88,groupId:"收文",itemStyle:{color:"#44D7B6"}},{value:16,groupId:"发文",itemStyle:{color:"#0091FF"}},{value:32,groupId:"签报",itemStyle:{color:"#FA6400"}}],universalTransition:{enabled:!0,divideShape:"clone"}}},!0)},initChart3:function(){var t=s().init(this.$refs.chat3);t.clear(),t.setOption({color:["#0091FF","#44D7B6","#F7B500 ","#6236FF"],tooltip:{trigger:"item"},title:{text:"会议量",left:"21%",top:"38%",textStyle:{fontSize:18,color:"#333333"},subtext:" 73",subtextStyle:{fontSize:24,color:"#333333",fontWeight:"bold",width:60,align:"right",lineHeight:40}},legend:{top:"center",left:"70%",orient:"vertical",icon:"circle",itemWidth:10,itemHeight:10,itemGap:20,textStyle:{color:"#333",fontSize:14}},series:[{type:"pie",radius:["40%","60%"],center:["30%","50%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!1,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:13,name:"办公会"},{value:20,name:"党委会"},{value:10,name:"内部会"},{value:40,name:"专题会"}]}]})},initChart5:function(t,i,a){t=s().init(t),i={series:[{type:"gauge",center:["50%","70%"],radius:"130%",startAngle:200,endAngle:-20,axisLine:{lineStyle:{width:10,color:[[.25,"#f5631f"],[.5,"#f3b529"],[.75,"#2a90fc"],[1,"#53d7b6"]]}},pointer:{length:"40%",width:3,itemStyle:{offsetCenter:[20,0],color:"#53d7b6"}},axisTick:{show:!1,distance:-30,length:8,lineStyle:{color:"#fff",width:2}},splitLine:{show:!1,distance:-30,length:30,lineStyle:{color:"#fff",width:4}},axisLabel:{show:!1,color:"inherit",distance:40,fontSize:12},detail:{valueAnimation:!0,formatter:"{percent|"+a+"%}\n{word|"+i+"}",rich:{percent:{fontSize:18,lineHeight:28,color:"#53d7b6",fontWeight:"600",padding:[20,0,0,7]},word:{fontSize:16,lineHeight:28,color:"#000",fontFamily:"pf",padding:[-10,0,0,7]}},offsetCenter:[0,"-5%"],textStyle:{fontSize:14,color:"#53d7b6"}},data:[{value:a}]}]};t.clear(),t.setOption(i)}},created:function(){},mounted:function(){this.initChart2(),this.initChart3(),this.initChart5(this.$refs.chat5,"办结率",70)},destroyed:function(){}},function(){var t=this,i=t._self._c;return i("div",{staticClass:"organization"},[t._m(0),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("环节办理耗时")]),t._v(" "),i("div",{ref:"chat2",staticClass:"chart2"})]),t._v(" "),t._m(2),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("会议类型")]),t._v(" "),i("div",{ref:"chat3",staticClass:"chart2"})]),t._v(" "),i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("督办效能")]),t._v(" "),i("div",{staticClass:"xnbox",staticStyle:{height:"auto"}},[t._m(3),t._v(" "),i("div",{staticClass:"xnright3"},[i("div",{ref:"chat5",staticClass:"chat"})])])]),t._v(" "),t._m(4)])},[function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("办文效能")]),t._v(" "),i("div",{staticClass:"grxn"},[i("div",{staticClass:"jj"},[i("div",[i("img",{attrs:{src:a(84727),alt:"",srcset:""}}),t._v(" "),i("span",{staticClass:"name"},[t._v("紧急")]),t._v(" "),i("span",{staticClass:"num",staticStyle:{color:"#F7B500"}},[t._v("1")])]),t._v(" "),i("div",[i("img",{attrs:{src:a(45429),alt:"",srcset:""}}),t._v(" "),i("span",{staticClass:"name"},[t._v("超期")]),t._v(" "),i("span",{staticClass:"num",staticStyle:{color:"#FA6400"}},[t._v("0")])]),t._v(" "),i("div",[i("img",{attrs:{src:a(39959),alt:"",srcset:""}}),t._v(" "),i("span",{staticClass:"name"},[t._v("重要")]),t._v(" "),i("span",{staticClass:"num",staticStyle:{color:"#E02020"}},[t._v("0")])])]),t._v(" "),i("div",{staticClass:"weiban"},[i("div",[i("span",[t._v("24小时内未办")]),t._v(" "),i("span",{staticStyle:{color:"#44D7B6"}},[t._v("0")])]),t._v(" "),i("div",[i("span",[t._v("48小时内未办")]),t._v(" "),i("span",{staticStyle:{color:"#0091FF"}},[t._v("0")])]),t._v(" "),i("div",[i("span",[t._v("72小时内未办")]),t._v(" "),i("span",{staticStyle:{color:"#F7B500"}},[t._v("0")])]),t._v(" "),i("div",[i("span",[t._v("72小时以上未办")]),t._v(" "),i("span",{staticStyle:{color:"#FA6400"}},[t._v("0")])])])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"xnleft2"},[i("div",[i("span",[t._v("办文总数")]),t._v(" "),i("span",[t._v("98")])]),t._v(" "),i("div",[i("span",[t._v("拟稿文件")]),t._v(" "),i("span",[t._v("4")])]),t._v(" "),i("div",[i("span",[t._v("经办文件")]),t._v(" "),i("span",[t._v("17")])]),t._v(" "),i("div",[i("span",[t._v("在办文件")]),t._v(" "),i("span",[t._v("22")])]),t._v(" "),i("div",[i("span",[t._v("超期文件")]),t._v(" "),i("span",[t._v("22")])]),t._v(" "),i("div",[i("span",[t._v("办结文件")]),t._v(" "),i("span",[t._v("4")])])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("办会效能")]),t._v(" "),i("div",{staticClass:"banhui"},[i("div",[i("div",[i("p",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("73")]),t._v(" "),i("span",[t._v("个")])]),t._v(" "),i("span",[t._v("已参加会议")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#44D7B6"}},[t._v("73")]),t._v(" "),i("span",[t._v("个")])]),t._v(" "),i("span",[t._v("待参加会议")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("621")]),t._v(" "),i("span",[t._v("小时")])]),t._v(" "),i("span",[t._v("总时长")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("139")]),t._v(" "),i("span",[t._v("小时")])]),t._v(" "),i("span",[t._v("平均时长")])])]),t._v(" "),i("div",[i("div",[i("p",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("3")]),t._v(" "),i("span",[t._v("次")])]),t._v(" "),i("span",[t._v("会议室预定次数")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#0091FF"}},[t._v("6")]),t._v(" "),i("span",[t._v("个")])]),t._v(" "),i("span",[t._v("会议室预定时长")])]),t._v(" "),i("div",[i("p",[i("span",{staticStyle:{color:"#44D7B6"}},[t._v("25")]),t._v(" "),i("span",[t._v("人")])]),t._v(" "),i("span",[t._v("参会人数")])])])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"xnleft xnleft3"},[i("div",[i("span",[t._v("承办")]),t._v(" "),i("span",[t._v("12")])]),t._v(" "),i("div",[i("span",[t._v("反馈")]),t._v(" "),i("span",[t._v("43")])])])},function(){var t=this,i=t._self._c;return i("div",{staticClass:"bwnx"},[i("div",{staticClass:"commtitle"},[t._v("督办反馈")]),t._v(" "),i("div",{staticClass:"fenxian"},[i("div",[i("span",{staticStyle:{color:"#FA6400"}},[t._v("5")]),t._v(" "),i("span",[t._v("临期未反馈")])]),t._v(" "),i("div",[i("span",{staticStyle:{color:"#E02020"}},[t._v("5")]),t._v(" "),i("span",[t._v("超期未反馈")])]),t._v(" "),i("div",[i("span",{staticStyle:{color:"#F7B500"}},[t._v("1")]),t._v(" "),i("span",[t._v("待反馈")])]),t._v(" "),i("div",[i("span",{staticStyle:{color:"#44D7B6"}},[t._v("1")]),t._v(" "),i("span",[t._v("已反馈")])])])])}],!1,null,"5c4451b0",null).exports,l=(0,e.Z)({name:"potencyCenter",components:{org:i,dept:n,per:v},data:function(){return{active:0}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){},destroyed:function(){}},function(){var i=this,t=i._self._c;return t("div",{staticClass:"potencyCenter",staticStyle:{"padding-top":"20px"}},[t("div",{staticClass:"potencyTabs"},[t("span",{class:{active:0==i.active},on:{click:function(t){i.active=0}}},[i._v("单位效能")]),i._v(" "),t("span",{class:{active:1==i.active},on:{click:function(t){i.active=1}}},[i._v("个人效能")]),i._v(" "),t("span",{class:{active:2==i.active},on:{click:function(t){i.active=2}}},[i._v("部门效能")])]),i._v(" "),t("div",{staticClass:"cont"},[0==i.active?t("org"):i._e(),i._v(" "),1==i.active?t("dept"):i._e(),i._v(" "),2==i.active?t("per"):i._e()],1)])},[],!1,null,"abac55f6",null).exports},45429:function(t,i,a){t.exports=a.p+"static/img/cq.8a14747..png"},84727:function(t,i,a){t.exports=a.p+"static/img/jj.dda18a5..png"},39959:function(t,i,a){t.exports=a.p+"static/img/zy.f321523..png"}}]);