"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[25700],{25700:function(t,n,e){e.r(n),e.d(n,{default:function(){return a}});var n={name:"DocumentStatistics",components:{VChart:e(54258).Z},data:function(){return{currentIndex:1,currentYear:(new Date).getFullYear(),statisticsList:[{dept:"县教体局",total:1027,inTimeSign:1024,noSign:2},{dept:"县公安局",total:5,inTimeSign:2,noSign:2},{dept:"县发改委",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位测试办理单位测试办理单位",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位",total:5,inTimeSign:2,noSign:2},{dept:"测试办理单位",total:5,inTimeSign:2,noSign:2}],chartOption:{tooltip:{trigger:"item",formatter:function(t){return"line"==t.seriesType?"".concat(t.seriesName,"</br>").concat(t.name,":").concat(t.value,"%"):"".concat(t.seriesName,"</br>").concat(t.name,":").concat(t.value)}},legend:{selectedMode:!0,data:["总计","已签收","未签收","签收率"],bottom:0,left:16},xAxis:[{type:"category",data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],splitLine:{show:!1}}],yAxis:[{type:"value",name:"数量",splitLine:{show:!0}},{type:"value",name:"签收率",axisLabel:{show:!0,interval:"auto",formatter:"{value}%"},splitLine:{show:!0}}],series:[{name:"总计",type:"bar",barGap:0,data:[2,4.9,7,23.2,25.6,76.7,135.6,162.2,32.6,20,6.4,3.3],itemStyle:{color:"#3AA1FF"}},{name:"已签收",type:"bar",data:[1,3.9,4,21.2,25.6,7.7,50.6,100.2,14.6,15,3.4,1.3],itemStyle:{color:"#4ECB73"}},{name:"未签收",type:"bar",data:[1,1.9,3,2.2,25.6,70.7,80.6,62.2,16.6,5,3.4,2.3],itemStyle:{color:"#FBD437"}},{name:"签收率",type:"line",yAxisIndex:1,data:[2,2.2,3.3,4.5,6.3,10.2,20.3,23.4,23,16.5,12,6.2],itemStyle:{color:"#51ACFF"}}]}}},created:function(){},mounted:function(){},methods:{tabBarClick:function(t){this.currentIndex=t},goNextYear:function(){this.currentYear=this.currentYear+1},goLastYear:function(){this.currentYear=this.currentYear-1}},filters:{numFormat:function(t){return 999<t?"999...":t}}},a=(0,e(51900).Z)(n,function(){var e=this,a=e._self._c;return a("div",{attrs:{id:"document-statistics"}},[a("van-nav-bar",{attrs:{title:"公文统计"}}),e._v(" "),a("div",{staticClass:"tab-bar-container"},[a("span",{style:{borderBottom:e.currentIndex?"3px solid #028BE6":""},on:{click:function(t){return e.tabBarClick(1)}}},[e._v("签收情况")]),e._v(" "),a("i",[e._v("|")]),e._v(" "),a("span",{style:{borderBottom:e.currentIndex?"":"3px solid #028BE6"},on:{click:function(t){return e.tabBarClick(0)}}},[e._v("反馈情况")])]),e._v(" "),a("div",{staticClass:"year-select-container"},[a("van-icon",{staticStyle:{transform:"rotateY(180deg)"},attrs:{name:"play"},on:{click:e.goLastYear}}),e._v(" "),a("span",[e._v(e._s(e.currentYear)+"年")]),e._v(" "),a("van-icon",{attrs:{name:"play"},on:{click:e.goNextYear}})],1),e._v(" "),a("div",{staticClass:"chart-container"},[a("v-chart",{attrs:{options:e.chartOption}})],1),e._v(" "),a("div",{staticClass:"table-title"},[a("p",[e._v(e._s(e.currentIndex?"各单位签收情况":"各单位反馈情况"))])]),e._v(" "),a("div",{staticClass:"table-header-container"},[a("table",{attrs:{border:"1"}},[a("tr",[a("td",{staticStyle:{width:"30%"}},[e._v("办理单位")]),e._v(" "),a("td",[e._v(e._s(e.currentIndex?"未签收":"未反馈"))]),e._v(" "),a("td",[e._v(e._s(e.currentIndex?"已签收":"已反馈"))]),e._v(" "),a("td",[e._v("总计")]),e._v(" "),a("td",[e._v(e._s(e.currentIndex?"签收率":"反馈率"))])])])]),e._v(" "),a("div",{staticClass:"table-content-container"},[a("table",{attrs:{border:"1"}},e._l(e.statisticsList,function(t,n){return a("tr",{key:n,style:{backgroundColor:(n+1)%2==1?"":"#8FE9FF"}},[a("td",{staticClass:"dept-name"},[e._v(e._s(t.dept))]),e._v(" "),a("td",[e._v(e._s(e._f("numFormat")(t.noSign)))]),e._v(" "),a("td",[e._v(e._s(e._f("numFormat")(t.inTimeSign)))]),e._v(" "),a("td",[e._v(e._s(e._f("numFormat")(t.total)))]),e._v(" "),a("td",[e._v(e._s(Math.round(t.inTimeSign/t.total*1e4)/100+"%"))])])}),0)])],1)},[],!1,null,"29012645",null).exports}}]);