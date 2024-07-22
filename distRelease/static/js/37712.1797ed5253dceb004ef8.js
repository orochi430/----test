"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[37712],{37712:function(t,e,a){a.r(e),a.d(e,{default:function(){return i}});var n=a(522),e=a(79529),o=a.n(e),e=a(54258),e=(a(94859),a(21865),a(78511),a(83062),{name:"caruseAnalysis",components:{VChart:e.Z},data:function(){return{deptList:[],deptLoading:!1,deptFinished:!1,deptRefreshing:!1,list:[],loading:!1,finished:!1,refreshing:!1,totalTimes:0,date:"".concat(this.formatDate(new Date((new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-1"))," ~ ").concat(this.formatDate(new Date)),showCalendar:!1,minDate:new Date(new Date((new Date).getFullYear()-3+"-"+((new Date).getMonth()+1)+"-1")),maxDate:new Date,carUseTimesPieChart:{tooltip:{trigger:"item"},legend:{bottom:"30%",orient:"vertical",right:"5%"},series:[{name:"用车统计",type:"pie",left:"-35%",radius:["30%","60%"],avoidLabelOverlap:!1,label:{normal:{formatter:"{c}",position:"inside"}},emphasis:{label:{show:!0,fontSize:"20",fontWeight:"bold"}},labelLine:{show:!1},data:[]}]}}},created:function(){this.initPage()},mounted:function(){},methods:{initPage:function(){this.userInfo=dsf.util.loadSessionStore("user"),this.getUseCarTotalTimes()},formatDate:function(t){return"".concat(t.getFullYear(),"-").concat(t.getMonth()+1,"-").concat(t.getDate())},onConfirm:function(t){var t=(0,n.Z)(t,2),e=t[0],t=t[1];this.showCalendar=!1,this.date="".concat(this.formatDate(e)," ~ ").concat(this.formatDate(t)),this.getUseCarTotalTimes(),this.onLoadDept(),this.onLoad()},onLoadDept:function(){var t=this;setTimeout(function(){var s=t;s.deptRefreshing&&(s.deptList=[],s.deptRefreshing=!1),t.getUseCarTimesDepartmentDetail(function(t){for(var e=t.data,t=o()(t.count),a=e.length,n=0;n<a;n++)s.deptList.push(e[n]);s.deptLoading=!1;var i=s.deptList.length;(0==i||t<=i)&&(s.deptFinished=!0)})},1e3)},onDeptRefresh:function(){this.deptFinished=!1,this.deptLoading=!0,this.onLoadDept()},onLoad:function(){var t=this;setTimeout(function(){var i=t;i.refreshing&&(i.list=[],i.refreshing=!1),t.getUseCarTimesUserDetail(function(t){for(var e=t.data,t=t.count,a=e.length,n=0;n<a;n++)i.list.push(e[n]);i.loading=!1,(0==i.list.length||i.list.length>=t)&&(i.finished=!0)})},1e3)},onRefresh:function(){this.finished=!1,this.loading=!0,this.onLoad()},getUseCarTotalTimes:function(){var e=this,t={begindate:e.date.split("~")[0],enddate:e.date.split("~")[1],unitid:e.userInfo.unitId};dsf.http.post("fn/ycsq/showRingData",t).then(function(t){200==t.data.code?(t=t.data.data,e.totalTimes=t.count,e.carUseTimesPieChart.series[0].data.total=e.totalTimes,e.carUseTimesPieChart.series[0].data=t.data):dsf.layer.toast("获取数据失败,请稍后再试")})},getUseCarTimesDepartmentDetail:function(e){var t={begindate:this.date.split("~")[0],enddate:this.date.split("~")[1],unitid:this.userInfo.unitId,pageindex:1,pagesize:10};dsf.http.post("fn/ycsq/showRingData",t).then(function(t){200==t.data.code?e(t.data.data):dsf.layer.toast("获取数据失败,请稍后再试")})},getUseCarTimesUserDetail:function(e){var t={begindate:this.date.split("~")[0],enddate:this.date.split("~")[1],unitid:this.userInfo.unitId,pageindex:1,pagesize:10};dsf.http.post("fn/ycsq/byUser",t).then(function(t){200==t.data.code?e(t.data.data):dsf.layer.toast("获取数据失败,请稍后再试")})}}}),i=(0,a(51900).Z)(e,function(){var e=this,a=e._self._c;return a("div",{attrs:{id:"caruse-analysis"}},[a("div",{staticClass:"content"},[a("div",{staticClass:"card"},[a("van-row",{staticClass:"textlocation"},[a("van-col",{attrs:{span:"8"}},[a("label",[e._v("共用车")]),e._v(" "),a("label",{staticClass:"timesfont"},[e._v(e._s(e.totalTimes))]),e._v(" "),a("label",[e._v("次")])]),e._v(" "),a("van-col",{attrs:{span:"16"}},[a("van-field",{attrs:{readonly:"",clickable:"",name:"calendar",value:e.date,placeholder:""},on:{click:function(t){e.showCalendar=!0}}}),e._v(" "),a("van-calendar",{attrs:{type:"range","min-date":e.minDate,"max-date":e.maxDate,"first-day-of-week":"1"},on:{confirm:e.onConfirm},model:{value:e.showCalendar,callback:function(t){e.showCalendar=t},expression:"showCalendar"}})],1)],1),e._v(" "),a("div",{staticClass:"chart-container"},[a("v-chart",{attrs:{options:e.carUseTimesPieChart}})],1)],1),e._v(" "),a("div",{staticClass:"card"},[a("van-tabs",[a("van-tab",{attrs:{title:"按用车部门",name:"a"}},[a("van-pull-refresh",{on:{refresh:e.onDeptRefresh},model:{value:e.deptRefreshing,callback:function(t){e.deptRefreshing=t},expression:"deptRefreshing"}},[a("van-list",{attrs:{finished:e.deptFinished,"finished-text":"没有更多了"},on:{load:e.onLoadDept},model:{value:e.deptLoading,callback:function(t){e.deptLoading=t},expression:"deptLoading"}},e._l(e.deptList,function(t){return a("van-row",{key:t.name},[a("van-col",{staticClass:"mycell mycell-left",attrs:{span:"12"}},[e._v(e._s(t.deptname))]),e._v(" "),a("van-col",{staticClass:"mycell mycell-right",attrs:{span:"12"}},[e._v(e._s(t.times)+"次")])],1)}),1)],1)],1),e._v(" "),a("van-tab",{attrs:{title:"按用车人",name:"b"}},[a("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.refreshing,callback:function(t){e.refreshing=t},expression:"refreshing"}},[a("van-list",{attrs:{finished:e.finished,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.list,function(t){return a("van-row",{key:t.name},[a("van-col",{staticClass:"mycell",attrs:{span:"8"}},[e._v(e._s(t.name))]),e._v(" "),a("van-col",{staticClass:"mycell mycell-left",attrs:{span:"8"}},[e._v(e._s(t.deptname))]),e._v(" "),a("van-col",{staticClass:"mycell mycell-right",attrs:{span:"8"}},[e._v(e._s(t.times)+"次")])],1)}),1)],1)],1)],1)],1)])])},[],!1,null,"5328228a",null).exports},79156:function(t,e,a){a.d(e,{Z:function(){return i}});var n=a(78149);function i(t){if(n(t))return t}},26511:function(t,e,a){function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}a.d(e,{Z:function(){return n}})},522:function(t,e,a){a.d(e,{Z:function(){return o}});var n=a(79156),c=a(85579),f=a(22013);var i=a(33422),s=a(26511);function o(t,e){return(0,n.Z)(t)||function(t,e){var a=null==t?null:void 0!==c&&t[f]||t["@@iterator"];if(null!=a){var n,i,s,o,r=[],l=!0,d=!1;try{if(s=(a=a.call(t)).next,0===e){if(Object(a)!==a)return;l=!1}else for(;!(l=(n=s.call(a)).done)&&(r.push(n.value),r.length!==e);l=!0);}catch(t){d=!0,i=t}finally{try{if(!l&&null!=a.return&&(o=a.return(),Object(o)!==o))return}finally{if(d)throw i}}return r}}(t,e)||(0,i.Z)(t,e)||(0,s.Z)()}}}]);