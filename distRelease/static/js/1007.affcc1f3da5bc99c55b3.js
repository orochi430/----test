"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[1007],{1007:function(t,e,a){a.r(e),a.d(e,{default:function(){return i}});var e=a(79529),c=a.n(e),s=a(77193),e=a(26243),l=a.n(e),e=a(70596),n=a.n(e),r=a(25108),e={name:"officialDocumentEfficiency",props:[],components:{},data:function(){return{processingStatisticsData:{ljbjl:0},showProcessingStatistics:!0,showTodoTime:!0,accelerationRateData:{accelerationTimer:18.7,rate:"42.5"},accelerationRateList:[],showAccelerationRate:!0,showComprehensiveEfficiency:!0,comprehensiveEfficiencyData:{fraction:"0",comprehensiveEfficiencyList:[{name:"业务秘书处对比",list:[]},{name:"其他处室对比",list:[]},{name:"所有处室对比",list:[]}]},active:1,flag:!1,value:moment().format("YYYY年MM月"),activeName:"1",efficiencySelectParams:{year:(new Date).getFullYear(),month:(new Date).getMonth()+1,range:1,fileType:""}}},created:function(){},mounted:function(){var t=this;this.$nextTick(function(){t.getProcessingStatisticsData(),t.gettodoTimeData(),t.getAccelerationRateData(),t.getComprehensiveEfficiency()})},activated:function(){},computed:{num:function(){return 0==this.active?1:1==this.active?2:0}},watch:{active:function(t,e){this.getComprehensiveEfficiency()}},methods:{jumpToProcessingStatistics:function(){r.log("jumpTo"),this.$router.push("/banjianDetail")},processingStatisticsEcharts:function(t,e){var a=document.getElementById("processingStatistics"),t={title:{text:"按时办结率",left:"48%",top:"36%",textAlign:"center",subtext:t,textStyle:{color:"#666",fontSize:12},subtextStyle:{color:"#0091FF",fontSize:20,fontWeight:"bold"}},series:[{name:"Access From",type:"pie",radius:["70%","95%"],silent:!0,avoidLabelOverlap:!1,label:{show:!1,position:"center",color:"#666666"},labelLine:{show:!1},data:e}]};n().init(a).setOption(t)},getProcessingStatisticsData:function(){var i=dsf.layer.loading(),s=this;dsf.http.post("fn/efficiencySelect/processingVolumeStatistics",s.efficiencySelectParams).then(function(t){var e,a;dsf.layer.closeLoading(i),"success"===t.data.type?(e=(a=t.data.data).ljbjl,a.hbsq,a=a.asbjl,s.processingStatisticsData.ljbjl=e,s.processingStatisticsEcharts(a,[{value:c()(a),itemStyle:{color:"#008CFF"}},{value:100-c()(a),itemStyle:{color:"#F0F4F7"}}])):(dsf.layer.toast(t.data.message),s.showProcessingStatistics=!1)}).catch(function(t){dsf.layer.closeLoading(i),s.showProcessingStatistics=!1,r.log(t)})},jumpToTodoTime:function(){r.log("jumpTo"),this.$router.push("/daibanDetail")},todoTimeEcharts:function(t,e,a){var i=document.getElementById("todoTime"),i=n().init(i),e={title:{text:"待办总数",left:"48%",top:"36%",textAlign:"center",subtext:t,textStyle:{color:"#666",fontSize:12},subtextStyle:{color:"#0091FF",fontSize:20,fontWeight:"bold"}},series:[((0,s.Z)(t={name:"Access From",type:"pie",radius:["45%","66%"],silent:!0,avoidLabelOverlap:!1,label:{normal:{show:!0,position:"outside",formatter:function(t){return t.name+"\n\r"+"占比".concat((t.value/a*100).toFixed(1),"%")}},emphasis:{show:!0,textStyle:{fontSize:"14",fontWeight:"600"}}},labelLine:{show:!0}},"labelLine",{show:!1}),(0,s.Z)(t,"data",e),t)]};i.setOption(e)},gettodoTimeData:function(){var n=dsf.layer.loading(),o=this;dsf.http.post("fn/efficiencySelect/timeConsumptionAnalysisOfPendingItems",{year:(new Date).getFullYear(),month:(new Date).getMonth()+1,range:o.activeName}).then(function(t){var e,a,i,s,c;dsf.layer.closeLoading(n),"success"===t.data.type?(a=(e=t.data.data).dbsl,i=e.hjddsc,s=[{value:0,name:"24小时内",itemStyle:{color:"#008CFF"}},{value:0,name:"24-48小时",itemStyle:{color:"#FFE286"}},{value:0,name:"48-72小时",itemStyle:{color:"#FEAC00"}},{value:0,name:"超过72小时",itemStyle:{color:"#FF5454"}}],c=[],l()(i).forEach(function(t,e){0!==Number(i[t].replace("%",""))&&(s[e].value=Number(i[t].replace("%","")),c.push(s[e]))}),o.todoTimeEcharts(a,c,Number(i[72].replace("%",""))+Number(i["24-48"].replace("%",""))+Number(i["48-72"].replace("%",""))+Number(i[24].replace("%","")))):dsf.layer.toast(t.data.message)}).catch(function(t){dsf.layer.closeLoading(n),o.showTodoTime=!1,r.log(t)})},jumpAccelerationRate:function(){r.log("jumpTo"),this.$router.push("/tisulvDetail")},getAccelerationRateData:function(){var n=dsf.layer.loading(),o=this;dsf.http.post("fn/efficiencySelect/accelerationRateAnalysis",{year:(new Date).getFullYear(),month:(new Date).getMonth()+1}).then(function(t){var e,a,i,s,c;dsf.layer.closeLoading(n),"success"===t.data.type?(e=(c=t.data.data).avgHbtsl,a=c.avgPjhs,i=c.hbtsl,s=c.deptList,c=c.pjhsList,o.accelerationRateData.accelerationTimer=a,o.accelerationRateData.rate=e,o.flag=10<s.length,s.forEach(function(t,e){o.accelerationRateList.push({id:e+1,name:t,flag:e<=9})}),i.forEach(function(t,e){t.indexOf("%")&&(o.accelerationRateList[e].rate=t.slice(0,t.length-1))}),c.forEach(function(t,e){o.accelerationRateList[e].accelerationTimer=t})):dsf.layer.toast(t.data.message)}).catch(function(t){dsf.layer.closeLoading(n),o.showAccelerationRate=!1,r.log(t)})},jumpComprehensiveEfficiency:function(){r.log("jumpTo"),this.$router.push("/zongHeDetail")},getComprehensiveEfficiency:function(){var s=dsf.layer.loading(),c=this;dsf.http.post("fn/efficiencySelect/efficiencyIndexStatistic",{year:(new Date).getFullYear(),month:(new Date).getMonth()+1,range:c.num}).then(function(t){var e,a,i;dsf.layer.closeLoading(s),"success"===t.data.type?(a=(e=t.data.data).deptList,i=e.deptData,c.comprehensiveEfficiencyData.comprehensiveEfficiencyList[c.active].list=[],a.forEach(function(t,e){c.comprehensiveEfficiencyData.comprehensiveEfficiencyList[c.active].list.push({id:e+1,name:t,flag:e<=9,fraction:""})}),c.comprehensiveEfficiencyData.comprehensiveEfficiencyList[c.active].list.forEach(function(t,e){t.fraction=i[t.name].compositeScore})):dsf.layer.toast(t.data.message)}).catch(function(t){dsf.layer.closeLoading(s),c.showTodoTime=!1,r.log(t)}),dsf.http.post("fn/efficiencySelect/efficiencyStatistic",{year:(new Date).getFullYear(),month:(new Date).getMonth()+1,deptName:""}).then(function(t){var e;"success"===t.data.type?(e=t.data.data.unitComprehensiveEfficiency,c.comprehensiveEfficiencyData.fraction=e.compositeScore):dsf.layer.toast(t.data.message)}).catch(function(t){c.showTodoTime=!1,r.log(t)})},mroe:function(){this.flag=!1,this.accelerationRateList.forEach(function(t){t.flag=!0})}}},i=(0,a(51900).Z)(e,function(){var a=this,i=a._self._c;return i("div",{staticClass:"officialDocumentEfficiency"},[i("van-tabs",{model:{value:a.activeName,callback:function(t){a.activeName=t},expression:"activeName"}},[i("van-tab",{attrs:{title:"全单位",name:"1"}},[i("header",{staticClass:"header"},[a._v(a._s(a.value))]),a._v(" "),i("div",{staticClass:"processingStatistics"},[i("van-cell",{attrs:{title:"办件量统计","is-link":"",value:"详情分析"},on:{click:a.jumpToProcessingStatistics}}),a._v(" "),a.showProcessingStatistics?i("div",{staticClass:"content"},[i("div",{staticClass:"left"},[i("div",{staticClass:"gray"},[a._v("累计办件量")]),a._v(" "),i("div",{staticClass:"num"},[i("span",[a._v(a._s(a.processingStatisticsData.ljbjl))]),a._v("件\n            ")])]),a._v(" "),i("div",{staticClass:"right",attrs:{id:"processingStatistics"}})]):i("commonempty",{attrs:{description:"暂无数据"}})],1),a._v(" "),i("div",{staticClass:"todoTime"},[i("van-cell",{attrs:{title:"待办件耗时分析","is-link":"",value:"详情分析"},on:{click:a.jumpToTodoTime}}),a._v(" "),i("div",{staticClass:"tip"},[a._v("2023年1月1日 -今日")]),a._v(" "),a.showTodoTime?i("div",{staticClass:"content"},[i("div",{attrs:{id:"todoTime"}})]):i("commonempty",{attrs:{description:"暂无数据"}})],1),a._v(" "),i("div",{staticClass:"accelerationRate"},[i("van-cell",{attrs:{title:"提速率分析","is-link":"",value:"详情分析"},on:{click:a.jumpAccelerationRate}}),a._v(" "),a.showAccelerationRate?i("div",{staticClass:"contanier"},[i("div",{staticClass:"averageShow"},[i("div",{staticClass:"title"},[a._v("单位平均耗时")]),a._v(" "),i("div",{staticClass:"timer"},[i("span",[a._v(a._s(a.accelerationRateData.accelerationTimer))]),a._v(" 小时\n              "),i("div",{staticClass:"red"},[a._v("\n                "+a._s(a.accelerationRateData.rate)+" "),i("span")])])]),a._v(" "),i("div",{staticClass:"box"},[i("div",{staticClass:"tabel"},[i("div",{staticStyle:{flex:"10"}},[a._v("部门名称")]),a._v(" "),i("div",{staticStyle:{flex:"9","text-align":"center"}},[a._v("平均耗时(小时)")]),a._v(" "),i("div",{staticStyle:{flex:"10","text-align":"right"}},[a._v("环比提速率(%)")])]),a._v(" "),a._l(a.accelerationRateList,function(t){return[t.flag?i("div",{key:t.id,staticClass:"item"},[i("div",{staticClass:"serialNumber",style:{background:t.id<4?"#0086d9":""}},[a._v("\n                  "+a._s(t.id)+"\n                ")]),a._v(" "),i("div",{staticClass:"progress"},[i("div",{staticClass:"title"},[i("div",{staticStyle:{flex:"10"}},[a._v(a._s(t.name))]),a._v(" "),i("div",{staticStyle:{flex:"9","text-align":"center"}},[a._v("\n                      "+a._s(t.accelerationTimer)+"\n                    ")]),a._v(" "),i("div",{staticStyle:{flex:"10","text-align":"right"}},[a._v("\n                      "+a._s(t.rate)+"\n                    ")])]),a._v(" "),i("van-progress",{attrs:{percentage:c()(t.rate)||0,color:"#0091FF","show-pivot":!1,"stroke-width":"6"}})],1)]):a._e()]}),a._v(" "),10<a.accelerationRateList.length&&a.flag?i("div",{staticClass:"more",on:{click:a.mroe}},[a._v("\n              全部展示\n            ")]):a._e()],2)]):i("commonempty",{attrs:{description:"暂无数据"}})],1),a._v(" "),i("div",{staticClass:"comprehensiveEfficiency"},[i("van-cell",{attrs:{title:"综合效能指数评估","is-link":"",value:"详情分析"},on:{click:a.jumpComprehensiveEfficiency}}),a._v(" "),a.showComprehensiveEfficiency?i("div",{staticClass:"contanier"},[i("div",{staticClass:"averageShow"},[i("div",{staticClass:"title"},[a._v("单位效能")]),a._v(" "),i("div",{staticClass:"timer"},[i("span",[a._v(a._s(a.comprehensiveEfficiencyData.fraction))]),a._v(" 分\n            ")])]),a._v(" "),i("div",{staticClass:"box"},[i("van-tabs",{attrs:{type:"card"},model:{value:a.active,callback:function(t){a.active=t},expression:"active"}},a._l(a.comprehensiveEfficiencyData.comprehensiveEfficiencyList,function(t,e){return i("van-tab",{key:e,attrs:{title:t.name}},a._l(t.list,function(t){return i("div",{key:t.id,staticClass:"item"},[i("div",{staticClass:"serialNumber",style:{background:t.id<4?"#0086d9":""}},[a._v("\n                    "+a._s(t.id)+"\n                  ")]),a._v(" "),i("div",{staticClass:"progress"},[i("div",{staticClass:"title"},[i("div",{staticStyle:{flex:"4"}},[a._v(a._s(t.name))]),a._v(" "),i("div",{staticStyle:{flex:"2","text-align":"right"}},[a._v("\n                        "+a._s(t.fraction)+"\n                      ")])]),a._v(" "),i("van-progress",{attrs:{percentage:t.fraction,color:"#0091FF","show-pivot":!1,"stroke-width":"6"}})],1)])}),0)}),1)],1)]):i("commonempty",{attrs:{description:"暂无数据"}})],1)])],1)],1)},[],!1,null,"4a59f48d",null).exports}}]);