"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[70158],{70158:function(t,e,a){a.r(e),a.d(e,{default:function(){return r}});var i=a(66250),e=a(33453),n=a.n(e),s=a(70596),o=a(25108),e={data:function(){return{data:[],linedata:[],bardata:[],barnewdata:[],linenewdata:[],maxline:0,maxbar:0,currentDate:new Date,show:!1,showDate:moment(new Date).format("YYYY年MM月"),selectedUnit:{},unitColumns:[],showUnit:!1}},mounted:function(){var e=this;return(0,i.Z)(n().mark(function t(){return n().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getUnit();case 2:e.getTotalData(),e.getEchart1(),e.getEchart2();case 5:case"end":return t.stop()}},t)}))()},methods:{getUnit:function(){var e=this;return dsf.http.post("ctrl/editor/getReportUnitByReportUser").then(function(t){200==t.data.code&&(e.unitColumns=t.data.data,e.selectedUnit=e.unitColumns[0])})},confirmUnit:function(t){this.selectedUnit=t,this.showUnit=!1,this.getTotalData(),this.getEchart1(),this.getEchart2()},getTotalData:function(){var e=this;dsf.http.get("ctrl/reportEditorIndex/summaryData",{dateValue:moment(this.currentDate).format("YYYY-MM"),unitId:this.selectedUnit.unitId||""}).then(function(t){e.data=t.data.data})},getEchart1:function(){var e=this;dsf.http.get("ctrl/reportEditorIndex/scoreRankingData",{unitId:this.selectedUnit.unitId||""}).then(function(t){t.data&&t.data.data&&e.echartsinit1(t.data.data)})},getEchart2:function(){var e=this;dsf.http.get("ctrl/reportEditorIndex/reportAdoptData",{unitId:this.selectedUnit.unitId||""}).then(function(t){t.data&&t.data.data&&e.echartsinit2(t.data.data)})},confirm:function(t){o.log(t),this.currentDate=new Date(t),this.showDate=moment(this.currentDate).format("YYYY年MM月"),this.show=!1,this.getTotalData()},formatter:function(t,e){return"year"===t?"".concat(e,"年"):"month"===t?"".concat(e,"月"):e},echartsinit1:function(t){var e=s.init(this.$refs.charts2),t={color:["#26b52e","#0091ff"],tooltip:{trigger:"axis",axisPointer:{type:"none"},lineStyle:{opacity:0}},grid:{left:"5%",right:"10%",bottom:"18%",top:"20%",containLabel:!0,z:22},legend:{data:["排名","得分"],left:"center",bottom:10},xAxis:{type:"category",data:t.nameList,axisTick:{show:!1},axisLabel:{show:!0,interval:0,fontSize:12},axisLine:{lineStyle:{color:"#999999"}}},yAxis:[{min:0,type:"value",axisTick:{show:!1},name:"排名",splitLine:{show:!1,lineStyle:{color:"#999999",width:1,type:"dashed"}},axisLine:{show:!1,lineStyle:{color:"#999999"}}},{min:0,type:"value",axisTick:{show:!1},name:"得分",splitLine:{show:!0,lineStyle:{color:"#999999",width:1,type:"dashed"}},axisLine:{show:!1,lineStyle:{color:"#999999"}}}],series:[{name:"排名",type:"bar",barWidth:20,yAxisIndex:0,data:t.orderList},{name:"得分",type:"line",yAxisIndex:1,data:t.scoreList}]};e.setOption(t)},echartsinit2:function(t){var e=s.init(this.$refs.score),t={color:["#26b52e","#0091ff","#dbc600"],tooltip:{trigger:"axis",axisPointer:{type:"none"},lineStyle:{opacity:0}},grid:{left:"5%",right:"10%",bottom:"18%",top:"20%",containLabel:!0,z:22},legend:{data:["报送数","采用数","采用率"],left:"center",bottom:10},xAxis:{type:"category",data:t.nameList,axisTick:{show:!1},axisLabel:{show:!0,interval:0,fontSize:12},axisLine:{lineStyle:{color:"#999999"}}},yAxis:[{min:0,type:"value",axisTick:{show:!1},name:"数量",splitLine:{show:!1,lineStyle:{color:"#999999",width:1,type:"dashed"}},axisLine:{show:!1,lineStyle:{color:"#999999"}}},{min:0,max:100,type:"value",axisTick:{show:!1},name:"%",splitLine:{show:!0,lineStyle:{color:"#999999",width:1,type:"dashed"}},axisLine:{show:!1,lineStyle:{color:"#999999"}}}],series:[{name:"采用率",type:"line",data:t.adoptionRateList},{name:"报送数",type:"line",data:t.reportList},{name:"采用数",type:"line",data:t.adoptList}]};e.setOption(t)}}},r=(0,a(51900).Z)(e,function(){var a=this,i=a._self._c;return i("div",{staticClass:"bigbox",staticStyle:{width:"100%",height:"100%"}},[i("div",{staticClass:"submitter_box"},[i("div",{staticClass:"in-chart"},[i("div",{staticClass:"unit_box"},[i("span",{on:{click:function(t){a.showUnit=!0}}},[i("label",{attrs:{for:""}},[a._v(a._s(a.selectedUnit.unitName||"请选择"))]),a._v(" "),i("van-icon",{attrs:{name:"play"}})],1)]),a._v(" "),i("div",{staticClass:"echarts_summarydata"},[i("div",{staticClass:"echarts_head"},[i("span",[a._v("本月数据概况")]),a._v(" "),i("span",{on:{click:function(t){a.show=!0}}},[i("label",{attrs:{for:""}},[a._v(a._s(a.showDate))]),a._v(" "),i("van-icon",{attrs:{name:"play"}})],1)]),a._v(" "),i("div",{staticClass:"echarts_box"},a._l(a.data,function(t,e){return i("div",{key:e,staticClass:"echarts_smallbox"},[i("p",{staticClass:"echarts_blacktext"},[a._v(a._s(t.name))]),a._v(" "),i("p",{staticClass:"echarts_redtext"},[a._v(a._s(t.value))])])}),0)]),a._v(" "),i("div",{staticClass:"echarts_monthnumber"},[i("p",{staticClass:"echarts_head"},[a._v("年度得分及排名情况")]),a._v(" "),i("div",{staticStyle:{width:"100%","margin-top":"1.4%"}},[i("div",{ref:"charts2",staticClass:"charts"})])]),a._v(" "),i("div",{staticClass:"echarts_monthscore"},[i("p",{staticClass:"echarts_head"},[a._v("年度上报及采用情况")]),a._v(" "),i("div",{staticStyle:{width:"100%","margin-top":"1.4%"}},[i("div",{ref:"score",staticClass:"charts charts2"})])])])]),a._v(" "),i("van-popup",{attrs:{position:"bottom"},model:{value:a.show,callback:function(t){a.show=t},expression:"show"}},[i("van-datetime-picker",{attrs:{type:"year-month",title:"选择年月",formatter:a.formatter},on:{confirm:a.confirm,cancel:function(t){a.show=!1}},model:{value:a.currentDate,callback:function(t){a.currentDate=t},expression:"currentDate"}})],1),a._v(" "),i("van-popup",{attrs:{round:"",position:"bottom","get-container":"#app"},model:{value:a.showUnit,callback:function(t){a.showUnit=t},expression:"showUnit"}},[i("van-picker",{attrs:{"show-toolbar":"",columns:a.unitColumns,"value-key":"unitName"},on:{cancel:function(t){a.showUnit=!1},confirm:a.confirmUnit}})],1)],1)},[],!1,null,"230757f2",null).exports}}]);