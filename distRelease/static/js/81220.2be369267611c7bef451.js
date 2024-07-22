"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[81220],{81220:function(t,a,e){e.r(a),e.d(a,{default:function(){return d}});var o=e(66250),a=e(33453),r=e.n(a),a=e(8450),n=e.n(a),a=e(73473),s=e.n(a),a=e(79529),i=e.n(a),a=e(70596),l=e.n(a),c=e(25108),a={name:"area",components:{},data:function(){return{dlist:"",showStreet:!1,streets:[],streetsIndex:0,showArea:!1,areas:[],areaIndex:0,totalData:{all_nuclein_late_num:0,all_nuclein_num:0,all_num:0,all_red_num:0,all_vaccin_num:0,all_yellow_num:0},showChart1:!0,showChart2:!0}},methods:{toTotalList:function(){this.totalData.all_num&&this.$router.push({path:"commonlist/220325170030r0mPMER4RgnisIwjKYn/220319194130l6pirMZJe74yeqvID8I",query:{secQuery:n()({unitId:this.areas[this.areaIndex].id})}})},toList:function(t,a){t&&this.$router.push({path:"commonlist/220325170513SJWWMUxWRahqQNyKht7/220319194130l6pirMZJe74yeqvID8I",query:{secQuery:n()(a)}})},initChart1:function(t){0==t.xAxis.length?this.showChart1=!1:this.showChart1=!0;var a=l().init(this.$refs.chart1),t={tooltip:{trigger:"axis",position:function(t,a,e,n,i){return t[0]>=i.viewSize[0]/2?[t[0]-i.contentSize[0],"10%"]:[t[0],"10%"]},axisPointer:{type:"shadow"}},legend:{icon:"circle",itemWidth:15,data:["未按时核酸检测人数"],show:!0,right:0,textStyle:{fontSize:"12px",color:"#666"}},xAxis:{type:"category",boundaryGap:!1,data:t.xAxis,axisLine:{show:!0},splitLine:{show:!1}},grid:{top:40,bottom:30,left:50,right:15},yAxis:{type:"value",name:"单位:人",minInterval:1,nameTextStyle:{align:"right",color:"#666",fontSize:"12px"},axisLine:{show:!0},splitLine:{show:!1}},series:[{name:"未按时核酸检测人数",data:t.data,type:"line",symbolSize:6,lineStyle:{color:"#FD9D00",width:3},itemStyle:{normal:{color:"#FA6400"}},areaStyle:{opacity:.8,color:new(l().graphic.LinearGradient)(0,0,0,1,[{offset:0,color:"rgba(250,100,0,0.71)"},{offset:1,color:"rgba(253,157,0,0.30)"}])}}]};a.setOption(t,!0)},initChart2:function(t){0==t.xAxis.length?this.showChart2=!1:this.showChart2=!0,l().init(this.$refs.chart2).setOption({tooltip:{trigger:"axis",position:function(t,a,e,n,i){return t[0]>=i.viewSize[0]/2?[t[0]-i.contentSize[0],"10%"]:[t[0],"10%"]},axisPointer:{type:"shadow"}},legend:{icon:"circle",itemWidth:15,data:["未按要求接种疫苗人数"],show:!0,right:0,textStyle:{fontSize:"12px",color:"#666"}},xAxis:{type:"category",boundaryGap:!1,data:t.xAxis,axisLine:{show:!0},splitLine:{show:!1}},grid:{top:40,bottom:30,left:50,right:15},yAxis:{type:"value",name:"单位:人",minInterval:1,nameTextStyle:{align:"right",color:"#666",fontSize:"12px"},axisLine:{show:!0},splitLine:{show:!1}},series:[{name:"未按要求接种疫苗人数",data:t.data,type:"line",symbolSize:6,lineStyle:{color:"#FD9D00",width:3},itemStyle:{normal:{color:"#FA6400"}},areaStyle:{opacity:.8,color:new(l().graphic.LinearGradient)(0,0,0,1,[{offset:0,color:"rgba(247,181,0,0.43)"},{offset:1,color:"rgba(252,219,0,0.10)"}])}}]},!0)},onStreetConfirm:function(t,a){c.log(t),this.showStreet=!1,this.streetsIndex=a,vant.Toast("当前值：".concat(t.name,", 当前索引：").concat(a))},onAreaConfirm:function(e,n){var i=this;return(0,o.Z)(r().mark(function t(){var a;return r().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i.showArea=!1,i.areaIndex=n,a=dsf.layer.loading(),l().init(i.$refs.chart1).clear(),l().init(i.$refs.chart2).clear(),s().all([i.loadTotalData(e.id,1),i.getNucleinChartsByAreaId(e.id),i.getVaccinChartsByAreaId(e.id)]).then(function(t){dsf.layer.closeLoading(a)}).catch(function(t){dsf.layer.toast(t),c.log(t)}),i.onCancel();case 7:case"end":return t.stop()}},t)}))()},onCancel:function(){this.showArea=!1,this.showStreet=!1},haddleStreetClick:function(){this.showStreet=!0},haddleAreaClick:function(){this.showArea=!0},initStreetData:function(t,a){var e=this,n=dsf.util.loadSessionStore("user").user_id||dsf.util.loadSessionStore("user").userId,i=dsf.layer.loading();dsf.http.post("/ctrl/sqa/getAreaByUserId?userid="+n).then(function(){var a=(0,o.Z)(r().mark(function t(a){return r().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a&&"200"==a.data.code?(e.areas=a.data.data.community,c.log(e.areas),0<e.areas.length?s().all([e.loadTotalData(e.areas[0].id,1),e.getNucleinChartsByAreaId(e.areas[0].id),e.getVaccinChartsByAreaId(e.areas[0].id)]).then(function(t){dsf.layer.closeLoading(i)}).catch(function(t){dsf.layer.toast(t),c.log(t)}):dsf.layer.toast("暂无数据"),c.log(a.data.data)):dsf.layer.toast(a.data.message);case 1:case"end":return t.stop()}},t)}));return function(t){return a.apply(this,arguments)}}()).error(function(t){dsf.layer.toast("查询失败，请重试")})},loadTotalData:function(t,a){var e=this;return dsf.http.post("/ctrl/sqa/getRealTopData?id="+t+"&type="+a).then(function(t){t&&"200"===t.data.code&&(e.totalData=t.data.data.data[0])}).catch(function(t){})},onChange:function(t,a,e){},getNucleinChartsByAreaId:function(t){var a=this;return dsf.http.post("/ctrl/sqa/getNucleinChartsByAreaId?id="+t).then(function(t){var e;t&&"200"===t.data.code&&(e={xAxis:[],data:[]},t.data.data.data.map(function(t,a){e.xAxis.push(t.tj_date.substr(5).replace("-",".")),e.data.push(i()(t.nuclein_late_num))}),a.initChart1(e))}).error(function(t){})},getVaccinChartsByAreaId:function(t){var a=this;return dsf.http.post("/ctrl/sqa/getVaccinChartsByAreaId?id="+t).then(function(t){var e;c.log(t),t&&"200"===t.data.code&&(e={xAxis:[],data:[]},t.data.data.data.map(function(t,a){e.xAxis.push(t.tj_date.substr(5).replace("-",".")),e.data.push(i()(t.vaccin_num))}),c.log(e),a.initChart2(e))}).catch(function(t){})}},mounted:function(){this.initStreetData()},beforeRouteEnter:function(t,a,e){e(function(t){"commonList"!=a.name&&(t.areaIndex=0,t.streetsIndex=0,t.totalData.all_nuclein_late_num=0,t.totalData.all_nuclein_num=0,t.totalData.all_num=0,t.totalData.all_red_num=0,t.totalData.all_vaccin_num=0,t.totalData.all_yellow_num=0,l().init(t.$refs.chart1).clear(),l().init(t.$refs.chart2).clear(),t.initStreetData())})}},d=(0,e(51900).Z)(a,function(){var a=this,t=a._self._c;return t("div",{staticClass:"warpbox"},[t("div",{staticClass:"selector"},[t("div",{on:{click:a.haddleAreaClick}},[t("span",{staticClass:"left"},[a._v("社区选择")]),a._v(" "),t("p",{staticClass:"right"},[0<a.areas.length?t("span",[a._v(a._s(a.areas[a.areaIndex].name))]):a._e(),a._v(" "),t("van-icon",{attrs:{name:"arrow"}})],1)])]),a._v(" "),t("div",{staticClass:"totals"},[t("div",{on:{click:function(t){return a.toTotalList()}}},[t("span",[a._v("总人数")]),a._v(" "),t("span",{staticStyle:{color:"#0073CA"}},[a._v(a._s(a.totalData.all_num||0))])]),a._v(" "),t("div",{on:{click:function(t){return a.toList(a.totalData.all_nuclein_num,{unitId:a.areas[a.areaIndex].id,nuclein_Status:"-1",nuclein_Overdue:"-99",vaccin_Result:"-99",redCode:"-99",yellowCode:"-99"})}}},[t("span",[a._v("核酸阳性")]),a._v(" "),t("span",{staticStyle:{color:"#F66C6C"}},[a._v(a._s(a.totalData.all_nuclein_num||0))])]),a._v(" "),t("div",{on:{click:function(t){return a.toList(a.totalData.all_nuclein_late_num,{unitId:a.areas[a.areaIndex].id,nuclein_Status:"-99",nuclein_Overdue:"1",vaccin_Result:"-99",redCode:"-99",yellowCode:"-99"})}}},[t("span",[a._v("核酸超期")]),a._v(" "),t("span",{staticStyle:{color:"#FA6400"}},[a._v(a._s(a.totalData.all_nuclein_late_num||0))])]),a._v(" "),t("div",{on:{click:function(t){return a.toList(a.totalData.all_vaccin_num,{unitId:a.areas[a.areaIndex].id,nuclein_Status:"-99",nuclein_Overdue:"-99",vaccin_Result:"-1",redCode:"-99",yellowCode:"-99"})}}},[t("span",[a._v("未按要求接种疫苗")]),a._v(" "),t("span",{staticStyle:{color:"#F7B500"}},[a._v(a._s(a.totalData.all_vaccin_num||0))])]),a._v(" "),t("div",{staticStyle:{"border-bottom":"none"},on:{click:function(t){return a.toList(a.totalData.all_red_num,{unitId:a.areas[a.areaIndex].id,nuclein_Status:"-99",nuclein_Overdue:"-99",vaccin_Result:"-99",redCode:"10",yellowCode:"-99"})}}},[t("span",[a._v("健康码（红码）")]),a._v(" "),t("span",{staticStyle:{color:"#E02020"}},[a._v(a._s(a.totalData.all_red_num||0))])]),a._v(" "),t("div",{staticStyle:{"border-bottom":"none"},on:{click:function(t){return a.toList(a.totalData.all_yellow_num,{unitId:a.areas[a.areaIndex].id,nuclein_Status:"-99",nuclein_Overdue:"-99",vaccin_Result:"-99",redCode:"-99",yellowCode:"01"})}}},[t("span",[a._v("健康码（黄码）")]),a._v(" "),t("span",{staticStyle:{color:"#FA6400"}},[a._v(a._s(a.totalData.all_yellow_num||0))])])]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.showChart1,expression:"showChart1"}],staticClass:"chartBox"},[t("div",{staticClass:"title"},[a._v("未按时核酸检测")]),a._v(" "),t("div",{ref:"chart1",staticClass:"chart1"})]),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:a.showChart2,expression:"showChart2"}],staticClass:"chartBox"},[t("div",{staticClass:"title"},[a._v("未按要求接种疫苗")]),a._v(" "),t("div",{ref:"chart2",staticClass:"chart1"})]),a._v(" "),t("van-popup",{attrs:{round:"",position:"bottom"},model:{value:a.showArea,callback:function(t){a.showArea=t},expression:"showArea"}},[t("van-picker",{attrs:{title:"社区选择","value-key":"name","show-toolbar":"","default-index":a.areaIndex,columns:a.areas},on:{confirm:a.onAreaConfirm,cancel:a.onCancel}})],1)],1)},[],!1,null,null,null).exports}}]);