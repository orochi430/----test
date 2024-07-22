"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[40322],{40322:function(t,e,a){a.r(e),a.d(e,{default:function(){return n}});var s=a(66250),e=a(33453),l=a.n(e),e=a(8450),o=a.n(e),e=a(73473),r=a.n(e),e=a(79529),i=a.n(e),e=a(70596),c=a.n(e),u=a(25108),e={name:"dlist",components:{},data:function(){return{showStreet:!1,streets:[],streetsIndex:0,showArea:!1,areas:[],areaIndex:0,totalData:{all_nuclein_late_num:1,all_nuclein_num:0,all_num:4,all_red_num:0,all_vaccin_num:0,all_vaccin_late_num:3,all_yellow_num:0},showChart1:!0,showChart2:!0}},methods:{toTotalList:function(){},toList:function(t,e){},initChart1:function(t){0==t.xAxis.length?this.showChart1=!1:this.showChart1=!0;var e=c().init(this.$refs.chart1),t={color:["#FA6400","#E02020","#F7B500"],tooltip:{trigger:"axis",position:function(t,e,a,n,i){return t[0]>=i.viewSize[0]/2?[t[0]-i.contentSize[0],"10%"]:[t[0],"10%"]},axisPointer:{type:"shadow"}},legend:{icon:"roundRect",itemWidth:15,data:t.legend,show:!0,right:0,textStyle:{fontSize:"12px",color:"#666"}},xAxis:{type:"category",boundaryGap:!1,data:t.xAxis,axisLine:{show:!0,lineStyle:{color:"#ccc"}}},grid:{top:85,bottom:30,left:50,right:15},yAxis:{type:"value",name:"(单位:人)",minInterval:1,nameTextStyle:{align:"right",color:"#666",fontSize:"12px"},axisLine:{show:!0,lineStyle:{color:"#ccc"}},splitLine:{show:!1}},series:[{name:t.legend[0],data:t.values1,type:"line",symbolSize:6},{name:t.legend[1],data:t.values2,type:"line",symbolSize:6},{name:t.legend[2],data:t.values3,type:"line",symbolSize:6},{name:t.legend[3],data:t.values4,type:"line",symbolSize:6}]};e.setOption(t,!0)},initChart2:function(e){var a,n=this,t=(0==e.xAxis.length?this.showChart2=!1:this.showChart2=!0,c().init(this.$refs.chart2)),i={color:["#E02020","#F7B500","#FA6400","#F66C6C"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"},triggerOn:"click",formatter:function(t){u.log(t),a=t[0].dataIndex}},legend:{data:e.legend,icon:"roundRect",itemWidth:15,show:!0,right:0,textStyle:{fontSize:"12px",color:"#666"}},grid:{top:60,bottom:50,left:60,right:15},xAxis:{name:"单位:人",minInterval:1,nameTextStyle:{align:"right",color:"#666",fontSize:"12px",verticalAlign:"top",lineHeight:60},type:"value",boundaryGap:[0,"10%"],axisLine:{show:!0,lineStyle:{color:"#ccc"}},axisLabel:{color:"#666"}},yAxis:{type:"category",data:e.xAxis,axisLine:{show:!0,lineStyle:{color:"#ccc"}},splitLine:{show:!1},axisLabel:{color:"#666"}},series:[{name:e.legend[0],data:e.values1,type:"bar",barWidth:15,label:{show:!0,color:"inherit",position:"right"}},{name:e.legend[1],data:e.values2,type:"bar",barWidth:15,label:{show:!0,color:"inherit",position:"right"}},{name:e.legend[2],data:e.values3,type:"bar",barWidth:15,label:{show:!0,color:"inherit",position:"right"}},{name:e.legend[3],data:e.values4,type:"bar",barWidth:15,label:{show:!0,color:"inherit",position:"right"}}]};t.resize({height:120*e.xAxis.length+50}),t.getZr().on("click",function(t){u.log(a),void 0!==a&&(n.$router.push({path:"commonlist/220327050407Q71XVhrYzoh0Q9qbE75/220319194130l6pirMZJe74yeqvID8I",query:{secQuery:o()({unitId:e.ids[a],nuclein_Status:"-1",nuclein_Overdue:"1",vaccin_Result:"-1",redCode:"10",yellowCode:"01"})}}),a=void 0)}),t.setOption(i,!0)},onStreetConfirm:function(a,n){var i=this;return(0,s.Z)(l().mark(function t(){var e;return l().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i.streetsIndex=n,i.showStreet=!1,e=dsf.layer.loading(),c().init(i.$refs.chart1).clear(),c().init(i.$refs.chart2).clear(),r().all([i.loadTotalData(a.code_value,2),i.getHistoryCharts(a.code_value,2),i.getChartsByArea(a.code_value,2)]).then(function(t){dsf.layer.closeLoading(e)}).catch(function(t){dsf.layer.closeLoading(e),dsf.layer.toast(t),u.log(t)}),i.onCancel();case 7:case"end":return t.stop()}},t)}))()},onAreaConfirm:function(t,e){this.showArea=!1,vant.Toast("当前值：".concat(t,", 当前索引：").concat(e))},onCancel:function(){this.showArea=!1,this.showStreet=!1},haddleStreetClick:function(){this.onCancel(),this.showStreet=!0},haddleAreaClick:function(){this.onCancel(),this.showArea=!0},initStreetData:function(){var a=this,t=dsf.util.loadSessionStore("user").user_id||dsf.util.loadSessionStore("user").userId,n=dsf.layer.loading();dsf.http.post("/ctrl/sqa/getAreaByUserId?userid="+t).then(function(){var e=(0,s.Z)(l().mark(function t(e){return l().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e&&"200"===e.data.code?(a.streets=e.data.data.area,0<a.streets.length?r().all([a.loadTotalData(a.streets[0].code_value,2),a.getHistoryCharts(a.streets[0].code_value,2),a.getChartsByArea(a.streets[0].code_value,2)]).then(function(t){dsf.layer.closeLoading(n)}).catch(function(t){dsf.layer.toast(t),u.log(t)}):dsf.layer.toast("暂无数据")):dsf.layer.toast(e.data.message);case 1:case"end":return t.stop()}},t)}));return function(t){return e.apply(this,arguments)}}()).error(function(t){dsf.layer.toast("查询失败，请重试"),u.log(t)})},loadTotalData:function(t,e){var a=this;return dsf.http.post("/ctrl/sqa/getRealTopData?id="+t+"&type="+e).then(function(t){t&&"200"===t.data.code&&(a.totalData=t.data.data.data[0])}).error(function(t){})},getHistoryCharts:function(t,e){var a={legend:["核酸异常","抗原异常","健康码异常"],xAxis:[],values1:[],values2:[],values3:[]};[{tj_date:"05-07",nuclein_num:0,vaccin_num:1,nuclein_late_num:0},{tj_date:"05-10",nuclein_num:2,vaccin_num:3,nuclein_late_num:0}].map(function(t,e){a.xAxis.push(t.tj_date),a.values1.push(i()(t.nuclein_num)),a.values2.push(i()(t.vaccin_num)),a.values3.push(i()(t.nuclein_late_num))}),this.initChart1(a)},getChartsByArea:function(t,e){var n=this;return dsf.http.post("/ctrl/sqa/getChartsByArea?id="+t+"&type="+e).then(function(t){var a;u.log(t),t&&"200"===t.data.code&&(t=t.data.data.data,a={legend:["核酸阳性","未按要求接种疫苗","健康码异常","未按时核酸检测"],ids:[],xAxis:[],values1:[],values2:[],values3:[],values4:[]},t.map(function(t,e){!t.bt&&t.name&&(t.bt=t.name),a.xAxis.push(t.bt.substr(0,4)+"\n"+t.bt.substr(4)),a.ids.push(t.id),a.values1.push(i()(t.nuclein_num)),a.values2.push(i()(t.vaccin_num)),a.values3.push(i()(t.health_num)),a.values4.push(i()(t.nuclein_late_num))}),n.initChart2(a),u.log(a))}).catch(function(t){})}},mounted:function(){this.getHistoryCharts()}},n=(0,a(51900).Z)(e,function(){var e=this,t=e._self._c;return t("div",{staticClass:"warpbox"},[t("div",{staticClass:"totals"},[t("div",{on:{click:function(t){return e.toTotalList()}}},[t("span",[e._v("总人数")]),e._v(" "),t("span",{staticStyle:{color:"#0073CA"}},[e._v(e._s(e.totalData.all_num||0))])]),e._v(" "),t("div",{staticStyle:{"border-bottom":"none"},on:{click:function(t){return e.toList(e.totalData.all_red_num,{unitId:e.streets[e.streetsIndex].code_value,nuclein_Status:"-99",nuclein_Overdue:"-99",vaccin_Result:"-99",redCode:"10",yellowCode:"-99"})}}},[t("span",[e._v("健康码异常")]),e._v(" "),t("span",{staticStyle:{color:"#E02020"}},[e._v(e._s(e.totalData.all_red_num||0))])]),e._v(" "),t("div",{on:{click:function(t){return e.toList(e.totalData.all_nuclein_num,{unitId:e.streets[e.streetsIndex].code_value,nuclein_Status:"-1",nuclein_Overdue:"-99",vaccin_Result:"-99",redCode:"-99",yellowCode:"-99"})}}},[t("span",[e._v("核酸阳性")]),e._v(" "),t("span",{staticStyle:{color:"#F66C6C"}},[e._v(e._s(e.totalData.all_nuclein_num||0))])]),e._v(" "),t("div",{on:{click:function(t){return e.toList(e.totalData.all_nuclein_late_num,{unitId:e.streets[e.streetsIndex].code_value,nuclein_Status:"-99",nuclein_Overdue:"1",vaccin_Result:"-99",redCode:"-99",yellowCode:"-99"})}}},[t("span",[e._v("核酸超期")]),e._v(" "),t("span",{staticStyle:{color:"#FA6400"}},[e._v(e._s(e.totalData.all_nuclein_late_num||0))])]),e._v(" "),t("div",{on:{click:function(t){return e.toList(e.totalData.all_vaccin_num,{unitId:e.streets[e.streetsIndex].code_value,nuclein_Status:"-99",nuclein_Overdue:"-99",vaccin_Result:"-1",redCode:"-99",yellowCode:"-99"})}}},[t("span",[e._v("抗原阳性")]),e._v(" "),t("span",{staticStyle:{color:"#F7B500"}},[e._v(e._s(e.totalData.all_vaccin_num||0))])]),e._v(" "),t("div",{on:{click:function(t){return e.toList(e.totalData.all_vaccin_num,{unitId:e.streets[e.streetsIndex].code_value,nuclein_Status:"-99",nuclein_Overdue:"-99",vaccin_Result:"-1",redCode:"-99",yellowCode:"-99"})}}},[t("span",[e._v("抗原超期")]),e._v(" "),t("span",{staticStyle:{color:"#F7B500"}},[e._v(e._s(e.totalData.all_vaccin_late_num||0))])])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.showChart1,expression:"showChart1"}],staticClass:"chartBox"},[t("div",{staticClass:"title"},[e._v("异常情况趋势")]),e._v(" "),t("div",{ref:"chart1",staticClass:"chart2"})])])},[],!1,null,null,null).exports}}]);