(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[27652],{48056:function(t,a,s){s(21013),t.exports=s(34579).Object.values},21013:function(t,a,s){var e=s(83856),i=s(52050)(!1);e(e.S,"Object",{values:function(t){return i(t)}})},27652:function(t,a,s){"use strict";s.r(a),s.d(a,{default:function(){return e}});var a=s(26243),h=s.n(a),a=s(64830),d=s.n(a),i=s(25108),a={name:"tisulvDetail",props:[],components:{},data:function(){return{anWenZhongActive:0,anZhuanTiActive:0,anWenZhongData:{list:[{name:"全部"},{name:"收文"},{name:"发文"}]},anZhuanTiData:{list:[{name:"全部",list:[]},{name:"下级",list:[{id:1,name:"第一秘书处",fraction:"87"},{id:2,name:"第二秘书处",fraction:"87"},{id:3,name:"第三秘书处",fraction:"87"}]},{name:"上级/平级",list:[{id:1,name:"第一秘书处",fraction:"87"},{id:2,name:"第二秘书处",fraction:"87"},{id:3,name:"第三秘书处",fraction:"87"}]}]},showPop:!1,showValue:"",showTime:!1,chuShiSec:"全单位",currentYearSec:"今年",params:{year:(new Date).getFullYear(),month:1,month_end:12,deptId:""},cSSelectList:[],selectParams:{result:"",curSelect:"今年"},curSelectList:[{name:"本月",checked:!1,id:"1"},{name:"今年",checked:!1,id:"2"},{name:"去年",checked:!1,id:"3"},{name:"选择年度",checked:!1,id:"4"}],todoMonthShow:!0,quJianShow:!0,pjhs:{avgHbtsl:0,avgHbsd:0,avgPjhs:1.825},datas:[],nums:[]}},created:function(){},mounted:function(){var t=this;this.$nextTick(function(){t.getData(),t.getDept()})},activated:function(){},computed:{columns:function(){var t=(new Date).getFullYear(),a=[];a.push(t);for(var s=1;s<=10;s++)a.push(t-s);return a}},watch:{anWenZhongActive:function(t,a){i.log("newVlue,oldVlue",t,a),this.anWenZhongEcharts(t,this.datas,this.nums)}},methods:{qujianEcharts:function(t,a,s){var e=document.getElementById("qujianEcharts"),e=echarts.init(e),i=a.toFixed().length,n=1;1==i?n=1:2==i?n=10:3==i?n=100:4==i&&(n=1e3),e.setOption({color:["rgba(0,145,255,1)","rgba(247,181,0,0.23)"],xAxis:{type:"category",axisTick:{show:!1},boundaryGap:!1,splitNumber:1,splitArea:{interval:1},axisLine:{show:!1},splitLine:{show:!0,lineStyle:{width:1,type:"dashed"}},data:t},grid:{left:"10%",right:"5%"},legend:{data:["单位耗时","处室耗时"],top:"10%"},yAxis:{type:"value",axisPointer:{type:"line"},max:a,min:0,interval:n,axisTick:{show:!1},axisLine:{show:!1},splitLine:{show:!0,lineStyle:{width:1,type:"dashed"}}},tooltip:{trigger:"axis"},dataZoom:[{type:"slider",xAxisIndex:0,start:0,end:40},{start:0,end:40}],series:[{name:"单位耗时",type:"line",data:s,symbol:"none",symbolSize:5,smooth:!0,lineStyle:{normal:{color:"rgba(0,145,255,1)",width:"1"}}}]})},anWenZhongEcharts:function(s,e,i){this.$nextTick(function(){var t=document.getElementById("anWenZhongEcharts".concat(s)),t=echarts.init(t),a={xAxis:{type:"category",data:e,splitArea:{interval:1},axisLine:{show:!1},splitLine:{show:!0,lineStyle:{width:1,type:"dashed"}},axisTick:{show:!1}},yAxis:{type:"value",axisTick:{show:!1},axisLine:{show:!1},splitLine:{show:!0,lineStyle:{width:1,type:"dashed"}}},grid:{left:"10%",right:"5%",top:"15%",bottom:"30%"},dataZoom:[{type:"slider",xAxisIndex:0,start:0,end:60},{start:0,end:60}],series:[{data:i,type:"bar",showBackground:!0,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)"},itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"black",fontSize:12}},color:"#0091FF"}}}]};t.setOption(a)})},inClickFn:function(){},onConfirm:function(t){this.showValue=t,this.showTime=!1},onCancel:function(){this.showTime=!1},checked:function(a){var s=this,e={};this.cSSelectList.forEach(function(t){t.id==a.id?(e=t,s.selectParams.result=t.name,s.chuShiSec=t.name):t.checked=!1}),e.checked=!e.checked},curSelect:function(a){var s=this,e={};this.curSelectList.forEach(function(t){t.id==a.id?(e=t,s.selectParams.curSelect=t.name):t.checked=!1}),e.checked=!e.checked},submit:function(){this.params.deptId=this.selectParams.result,this.chuShiSec=this.selectParams.result||"全单位",this.currentYearSec=this.selectParams.curSelect,"今年"==this.selectParams.curSelect?(this.params.year=(new Date).getFullYear(),this.params.month=1,this.params.month_end=12):"本月"==this.selectParams.curSelect?(this.params.year=(new Date).getFullYear(),this.params.month=(new Date).getMonth()+1,this.params.month_end=""):("去年"==this.selectParams.curSelect?this.params.year=(new Date).getFullYear()-1:this.params.year=this.showValue,this.params.month=1,this.params.month_end=12),this.showPop=!1,this.getData()},getData:function(){var l=dsf.layer.loading(),r=this;dsf.http.post("fn/efficiencySelect/flowSpeedAnalysisDetails",r.params).then(function(t){var a,s,e,i,n,c,o;dsf.layer.closeLoading(l),"success"===t.data.type?(a=(i=t.data.data).pjhs,s=i.qjpjhs,e=i.awzfx,i=i.zths,r.pjhs=a,r.datas=h()(e.wjzl),r.nums=d()(e.wjzl),r.anWenZhongEcharts(r.anWenZhongActive,r.datas,r.nums),n=0,c=[],o=[],s.forEach(function(t){n=t.hs>n?t.hs:n,o.push(t.hs),r.params.month_end?c.push(moment(t.edate).format("MM月")):c.push(moment(t.edate).format("DD日"))}),r.qujianEcharts(c,n,o),r.anZhuanTiData.list[0].list=[],r.anZhuanTiData.list[1].list=[],r.anZhuanTiData.list[2].list=[],i.qb.forEach(function(t,a){r.anZhuanTiData.list[0].list.push({id:a+1,name:t.ztmc,fraction:t.zths})}),i.xj.forEach(function(t,a){r.anZhuanTiData.list[1].list.push({id:a+1,name:t.ztmc,fraction:t.zths})}),i["sj/pj"].forEach(function(t,a){r.anZhuanTiData.list[2].list.push({id:a+1,name:t.ztmc,fraction:t.zths})})):(dsf.layer.toast(t.data.message),r.todoMonthShow=!1)}).catch(function(t){dsf.layer.closeLoading(l),r.todoMonthShow=!1,i.log(t)})},getDept:function(){var s=dsf.layer.loading(),e=this;dsf.http.post("fn/efficiencySelect/getAllDept").then(function(t){var a;dsf.layer.closeLoading(s),"success"===t.data.type?(a=t.data.data,e.cSSelectList=[],a.forEach(function(t){e.cSSelectList.push({name:t.text,id:t.value,checked:!1})})):dsf.layer.toast(t.data.message)}).catch(function(t){dsf.layer.closeLoading(s),i.log(t)})}}},e=(0,s(51900).Z)(a,function(){var s=this,e=s._self._c;return e("div",{staticClass:"tisulvDetail"},[e("div",{staticClass:"bg"},[s.todoMonthShow?e("div",{staticClass:"todoMonth"},[e("div",{staticClass:"text"},[s._v("平均耗时")]),s._v(" "),e("div",{staticClass:"num"},[e("span",[s._v(s._s(s.pjhs.avgPjhs.toFixed(1)))]),s._v("小时\n      ")]),s._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"left"},[e("div",{staticClass:"text"},[s._v("\n            同比上期："),e("span",[s._v(s._s(s.pjhs.avgHbsd.toFixed(1))+"小时")])])]),s._v(" "),e("div",{staticClass:"center"}),s._v(" "),e("div",{staticClass:"rghit"},[e("div",{staticClass:"text"},[s._v("\n            提速率："),e("span",{staticClass:"red"},[s._v(s._s(s.pjhs.avgHbtsl.toFixed(2))+"% "),e("span")])])])])]):e("commonempty",{staticStyle:{background:"#fff","border-radius":"10px"},attrs:{description:"数据获取失败"}}),s._v(" "),e("div",{staticClass:"select",on:{click:function(t){s.showPop=!0}}},[e("div",{staticClass:"left"},[s._v(s._s(s.chuShiSec)+" "),e("span",{staticClass:"jiao"})]),s._v(" "),e("div",{staticClass:"center"}),s._v(" "),e("div",{staticClass:"rghit"},[s._v(s._s(s.currentYearSec))])])],1),s._v(" "),e("div",{staticClass:"quJian"},[s._m(0),s._v(" "),s.quJianShow?e("div",{staticClass:"qujianEcharts",attrs:{id:"qujianEcharts"}}):e("commonempty",{staticStyle:{background:"#fff","border-radius":"10px"},attrs:{description:"数据获取失败"}})],1),s._v(" "),e("div",{staticClass:"anWenZhong"},[s._m(1),s._v(" "),e("div",{staticClass:"box"},[e("van-tabs",{attrs:{type:"card"},model:{value:s.anWenZhongActive,callback:function(t){s.anWenZhongActive=t},expression:"anWenZhongActive"}},s._l(s.anWenZhongData.list,function(t,a){return e("van-tab",{key:a,attrs:{title:t.name}},[e("div",{staticClass:"text"},[s._v("单位：小时")]),s._v(" "),e("div",{staticClass:"anWenZhongEcharts",attrs:{id:"anWenZhongEcharts".concat(a)}})])}),1)],1)]),s._v(" "),e("div",{staticClass:"anZhuanTi"},[s._m(2),s._v(" "),e("div",{staticClass:"box"},[e("van-tabs",{attrs:{type:"card"},model:{value:s.anZhuanTiActive,callback:function(t){s.anZhuanTiActive=t},expression:"anZhuanTiActive"}},s._l(s.anZhuanTiData.list,function(t,a){return e("van-tab",{key:a,attrs:{title:t.name}},[e("div",{staticClass:"text"},[s._v("单位：小时")]),s._v(" "),s._l(t.list,function(t){return e("div",{key:t.id,staticClass:"item"},[e("div",{staticClass:"serialNumber",style:{background:t.id<4?"#0086d9":""}},[s._v("\n              "+s._s(t.id)+"\n            ")]),s._v(" "),e("div",{staticClass:"progress"},[e("div",{staticClass:"title"},[e("div",[s._v(s._s(t.name))]),s._v(" "),e("div",{staticStyle:{color:"#0091ff","font-weight":"bold"}},[s._v("\n                  "+s._s(t.fraction)+"\n                ")])]),s._v(" "),e("van-progress",{attrs:{percentage:t.fraction,color:"#0091FF","show-pivot":!1,"stroke-width":"20"}})],1)])})],2)}),1)],1)]),s._v(" "),e("van-popup",{staticClass:"showPop",attrs:{position:"bottom"},model:{value:s.showPop,callback:function(t){s.showPop=t},expression:"showPop"}},[e("div",{staticClass:"roundTitle"},[e("van-icon",{attrs:{name:"arrow-down"},on:{click:function(t){s.showPop=!1}}}),s._v(" "),e("div",{staticClass:"title"},[s._v("选择")])],1),s._v(" "),e("div",{staticClass:"list1"},[e("div",{staticClass:"title"},[s._v("处室选择")]),s._v(" "),e("div",{staticClass:"box"},s._l(s.cSSelectList,function(a,t){return e("div",{key:t,staticClass:"item1",class:a.checked?"active":"",on:{click:function(t){return s.checked(a)}}},[s._v("\n          "+s._s(a.name)+"\n        ")])}),0)]),s._v(" "),e("div",{staticClass:"list2"},[e("div",{staticClass:"title"},[s._v("时间选择")]),s._v(" "),e("div",{staticClass:"box"},s._l(s.curSelectList,function(a,t){return e("div",{key:t,staticClass:"item2",class:a.checked?"active":"",on:{click:function(t){return s.curSelect(a)}}},[s._v("\n          "+s._s(a.name)+"\n        ")])}),0)]),s._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:"选择年度"==s.selectParams.curSelect,expression:"selectParams.curSelect == '选择年度'"}],staticClass:"list3"},[e("div",{staticClass:"title"},[s._v("选择年度")]),s._v(" "),e("div",{},[e("van-field",{attrs:{readonly:"",placeholder:"请选择"},on:{click:function(t){s.showTime=!0}},scopedSlots:s._u([{key:"right-icon",fn:function(){return[e("i",{staticClass:"iconfont iconriqi"})]},proxy:!0}]),model:{value:s.showValue,callback:function(t){s.showValue=t},expression:"showValue"}})],1)]),s._v(" "),e("div",{staticClass:"btn"},[e("div",{staticClass:"canle",on:{click:function(t){s.showPop=!1}}},[s._v("取消")]),s._v(" "),e("div",{staticClass:"yes",on:{click:s.submit}},[s._v("确定")])])]),s._v(" "),e("van-popup",{attrs:{position:"bottom",round:"","get-container":"#app"},model:{value:s.showTime,callback:function(t){s.showTime=t},expression:"showTime"}},[e("van-picker",{attrs:{title:"选择年份","show-toolbar":"",columns:s.columns},on:{confirm:s.onConfirm,cancel:s.onCancel}})],1)],1)},[function(){var t=this._self._c;return t("div",{staticClass:"title"},[t("div",{},[t("span",{staticClass:"blue"}),this._v(" "),t("span",{staticClass:"yellow"}),this._v(" "),t("span",{staticClass:"bold"},[this._v("区间平均耗时趋势图")])])])},function(){var t=this._self._c;return t("div",{staticClass:"title"},[t("div",{},[t("span",{staticClass:"blue"}),this._v(" "),t("span",{staticClass:"yellow"}),this._v(" "),t("span",{staticClass:"bold"},[this._v("办件平均耗时分析-按文种")])])])},function(){var t=this._self._c;return t("div",{staticClass:"title"},[t("div",{},[t("span",{staticClass:"blue"}),this._v(" "),t("span",{staticClass:"yellow"}),this._v(" "),t("span",{staticClass:"bold"},[this._v("按专题分析平均耗时")])])])}],!1,null,"046838ca",null).exports},64830:function(t,a,s){t.exports=s(48056)}}]);