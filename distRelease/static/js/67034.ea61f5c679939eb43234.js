"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[67034],{67034:function(t,e,a){a.r(e),a.d(e,{default:function(){return i}});var e=a(54258),n=a(25108),e={name:"inspectorStatistics",components:{VChart:e.Z},filters:{numFormat:function(t){return 999<t?"999...":t}},data:function(){return{chatConfig:"",username:"",isShowTypePicker:!1,currentType:"全部",currentTypeIndex:0,typeList:["全部","选项1","选项2"],isShowStartTimePicker:!1,isShowEndTimePicker:!1,startDate:"".concat((new Date).getFullYear(),"-01-01"),endDate:this.dateFormat(new Date,"yyyy-MM-dd"),minDate:new Date((new Date).getFullYear()-2,0,1),maxDate:new Date,statisticsList:[{dept:"县教体局",total:1027,inTimeFeedback:1024,lateFeedback:2,noFeedback:1},{dept:"县公安局",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"县发改委",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位测试办理单位测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1},{dept:"测试办理单位",total:5,inTimeFeedback:2,lateFeedback:2,noFeedback:1}],chatData:{}}},beforeMount:function(){},mounted:function(){for(var e=this,t=(this.username="123",[]),a=0;a<=360;a++){var i=a/180*Math.PI,i=Math.sin(2*i)*Math.cos(2*i);t.push([i,a])}this.chatData={title:{text:"极坐标双数值轴",show:!1},legend:{data:["pie"]},polar:{center:["50%","54%"]},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},angleAxis:{type:"value",startAngle:0},radiusAxis:{min:0},series:[{coordinateSystem:"polar",name:"pie",type:"pie",showSymbol:!1,data:t}],animationDuration:2e3},dsf.http.post("fn/mobileToDoAndRead/getToDoAndReadList2",{start:1,page:1,limit:15,fileType:"ToRead",showTotal:!0}).then(function(t){n.log(t.data.datas)}),dsf.http.get("static/chatConfig.json").then(function(t){t=t.data;n.log(t[e.$route.query.category]),e.chatConfig=t[e.$route.query.category]})},methods:{onClickLeft:function(){alert("返回")},typeConfirm:function(t,e){this.currentType=t,this.currentTypeIndex=e,this.isShowTypePicker=!1},startDateConfirm:function(t){new Date(t).getTime()>new Date(this.endDate.replace(/-/g,"/")).getTime()?dsf.layer.toast("开始日期不能大于结束日期"):(this.startDate=this.dateFormat(t,"yyyy-MM-dd"),this.isShowStartTimePicker=!1)},endDateConfirm:function(t){new Date(t).getTime()<new Date(this.startDate.replace(/-/g,"/")).getTime()?dsf.layer.toast("结束日期不能小于起始日期"):(this.endDate=this.dateFormat(t,"yyyy-MM-dd"),this.isShowEndTimePicker=!1)},dateFormat:function(t,e){var a,i={"M+":(t=new Date(t)).getMonth()+1,"d+":t.getDate(),"H+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()},t=4<=(t=t.getFullYear().toString()).length?t:"0000".substr(0,4-t.length)+t;for(a in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t+"").substr(4-RegExp.$1.length))),i)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?i[a]:("00"+i[a]).substr((""+i[a]).length)));return e}}},i=(0,a(51900).Z)(e,function(){var a=this,i=a._self._c;return i("div",{attrs:{id:"inspector-statistics"}},[i("van-nav-bar",{attrs:{title:a.username,"left-text":"返回"},on:{"click-left":a.onClickLeft}}),a._v(" "),i("div",{staticClass:"select-container"},[i("div",{staticClass:"selece-type",on:{click:function(t){a.isShowTypePicker=!0}}},[i("span",[a._v(a._s(a.currentType))]),a._v(" "),i("van-icon",{attrs:{name:"arrow-down"}})],1),a._v(" "),i("div",[i("span",{on:{click:function(t){a.isShowStartTimePicker=!0}}},[a._v(a._s(a.startDate))]),a._v(" "),i("span",[a._v("至")]),a._v(" "),i("span",{on:{click:function(t){a.isShowEndTimePicker=!0}}},[a._v(a._s(a.endDate))])])]),a._v(" "),i("div",{staticClass:"chart-container"},[i("v-chart",{attrs:{options:a.chatData}})],1),a._v(" "),a._m(0),a._v(" "),a._m(1),a._v(" "),i("div",{staticClass:"table-content-container"},[i("table",{attrs:{border:"1"}},a._l(a.statisticsList,function(t,e){return i("tr",{key:e,style:{backgroundColor:(e+1)%2==1?"":"#8FE9FF"}},[i("td",{staticClass:"dept-name"},[a._v(a._s(t.dept))]),a._v(" "),i("td",[a._v(a._s(a._f("numFormat")(t.total)))]),a._v(" "),i("td",[a._v(a._s(a._f("numFormat")(t.inTimeFeedback)))]),a._v(" "),i("td",[a._v(a._s(a._f("numFormat")(t.lateFeedback)))]),a._v(" "),i("td",[a._v(a._s(a._f("numFormat")(t.noFeedback)))])])}),0)]),a._v(" "),i("van-popup",{attrs:{position:"bottom"},model:{value:a.isShowTypePicker,callback:function(t){a.isShowTypePicker=t},expression:"isShowTypePicker"}},[i("van-picker",{attrs:{columns:a.typeList,"show-toolbar":"",title:"事项来源","default-index":a.currentTypeIndex},on:{cancel:function(t){a.isShowTypePicker=!1},confirm:a.typeConfirm}})],1),a._v(" "),i("van-popup",{attrs:{position:"bottom"},model:{value:a.isShowStartTimePicker,callback:function(t){a.isShowStartTimePicker=t},expression:"isShowStartTimePicker"}},[i("van-datetime-picker",{attrs:{type:"date",title:"选择起始时间","min-date":a.minDate,"max-date":a.maxDate},on:{cancel:function(t){a.isShowStartTimePicker=!1},confirm:a.startDateConfirm}})],1),a._v(" "),i("van-popup",{attrs:{position:"bottom"},model:{value:a.isShowEndTimePicker,callback:function(t){a.isShowEndTimePicker=t},expression:"isShowEndTimePicker"}},[i("van-datetime-picker",{attrs:{type:"date",title:"选择起始时间","min-date":a.minDate,"max-date":a.maxDate},on:{cancel:function(t){a.isShowEndTimePicker=!1},confirm:a.endDateConfirm}})],1)],1)},[function(){var t=this._self._c;return t("div",{staticClass:"table-title"},[t("p",[this._v("各单位督察件处理情况：")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"table-header-container"},[e("table",{attrs:{border:"1"}},[e("tr",[e("td",{staticStyle:{width:"30%"}},[t._v("办理单位")]),t._v(" "),e("td",[t._v("总文件数")]),t._v(" "),e("td",[t._v("已反馈")]),t._v(" "),e("td",[t._v("超期反馈")]),t._v(" "),e("td",[t._v("未反馈")])])])])}],!1,null,"ec67be1c",null).exports}}]);