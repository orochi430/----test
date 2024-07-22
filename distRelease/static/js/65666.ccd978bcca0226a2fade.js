"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[65666],{65666:function(t,e,i){i.r(e),i.d(e,{default:function(){return n}});var a=i(66250),e=i(33453),s=i.n(e),e={name:"myLeave",components:{},props:{},data:function(){return{userInfo:dsf.util.loadSessionStore("user"),default_avatar:'this.src="'+i(11727)+'"',avatar:"",showYear:!1,showType:!1,currentRate:0,lastRate:0,year:"2023",type:{text:"全部",value:0},yearOptions:[{text:"2019年",value:"2019"},{text:"2020年",value:"2020"},{text:"2021年",value:"2021"},{text:"2022年",value:"2022"},{text:"2023年",value:"2023"}],typeOptions:[],statistics:{lastYearUsed:0,lastYear:0,thisYearUsed:0,thisYear:0},leaveList:[]}},computed:{},watch:{},created:function(){},mounted:function(){this.init()},methods:{init:function(){var e=this;return(0,a.Z)(s().mark(function t(){return s().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.avatar=e.userInfo&&e.userInfo.photo||i(11727),e.getType(),e.getLeaveInfo(),e.getStatistic();case 4:case"end":return t.stop()}},t)}))()},getLeaveInfo:function(){var e=this;dsf.http.get("fn/leave/statistic/leaveDetails",{year:this.year,type:this.type.value}).then(function(t){t&&t.data&&200==t.data.code&&t.data.data&&t.data.data&&(e.leaveList=t.data.data)})},getType:function(){var e=this;dsf.http.get("fn/leave/type/selectType",{}).then(function(t){t&&t.data&&200==t.data.code&&(e.typeOptions=t.data.data.map(function(t){return{text:t.name||t.text,value:t.value}}))})},getStatistic:function(){var e=this;dsf.http.get("fn/leave/statistic/yearLeaveStatistic",{}).then(function(t){t&&t.data&&200==t.data.code&&(e.statistics=t.data.data,e.currentRate=e.statistics.thisYearUsed/e.statistics.thisYear*100,e.lastRate=e.statistics.lastYearUsed/e.statistics.lastYear*100)})},confirmYear:function(t,e){this.year=t.value,this.showYear=!1,this.getLeaveInfo()},confirmType:function(t,e){this.type=t,this.showType=!1,this.getLeaveInfo()}}},n=(0,i(51900).Z)(e,function(){var a=this,s=a._self._c;return s("div",{staticClass:"myLeave",style:{height:"calc(100vh - ".concat(a.$store.state.isShowAppHeader?"0.92rem":"0px"," - ").concat(a.$store.state.isShowAppFooter?"1.2rem":"0px",")")}},[s("div",{staticClass:"leave-head"},[s("div",{staticClass:"info-container"},[s("div",{staticClass:"info-img"},[s("img",{attrs:{src:a.avatar,onerror:a.default_avatar}})]),a._v(" "),s("div",{staticClass:"info-text"},[s("p",[a._v(a._s(a.userInfo.name))]),a._v(" "),s("p",[a._v(a._s(a.userInfo.unitName))]),a._v(" "),s("p",[a._v(a._s(a.userInfo.deptName))])])]),a._v(" "),s("div",{staticClass:"leave-statistics"},[s("van-circle",{attrs:{rate:a.currentRate,speed:100,"stroke-width":60,color:"#FF8F00",size:"80px"},scopedSlots:a._u([{key:"default",fn:function(){return[s("div",{staticClass:"pie-text"},[s("p",[s("label",{staticStyle:{color:"#FF8F00"}},[a._v(a._s(a.statistics.thisYearUsed))]),a._v("/"+a._s(a.statistics.thisYear)+"\r\n                        ")]),a._v(" "),s("span",[a._v("今年年假")])])]},proxy:!0}]),model:{value:a.currentRate,callback:function(t){a.currentRate=t},expression:"currentRate"}}),a._v(" "),s("van-circle",{attrs:{rate:a.lastRate,speed:100,"stroke-width":60,color:"#0091FF",size:"80px"},scopedSlots:a._u([{key:"default",fn:function(){return[s("div",{staticClass:"pie-text"},[s("p",[s("label",{staticStyle:{color:"#0091FF"}},[a._v(a._s(a.statistics.lastYearUsed))]),a._v("/"+a._s(a.statistics.lastYear)+"\r\n                        ")]),a._v(" "),s("span",[a._v("去年年假")])])]},proxy:!0}]),model:{value:a.lastRate,callback:function(t){a.lastRate=t},expression:"lastRate"}})],1)]),a._v(" "),s("div",{staticClass:"leave-select"},[s("div",{on:{click:function(t){a.showYear=!0}}},[a._v("\r\n            年度："+a._s(a.year)+"年\r\n            "),s("img",{attrs:{src:i(33969),alt:""}})]),a._v(" "),s("div",{on:{click:function(t){a.showType=!0}}},[a._v("\r\n            分类："+a._s(a.type.text)+"\r\n            "),s("img",{attrs:{src:i(33969),alt:""}})])]),a._v(" "),a.leaveList&&0<a.leaveList.length?s("div",{staticClass:"leave-content"},[s("div",{staticClass:"leave-line"}),a._v(" "),s("div",{staticClass:"list-container"},a._l(a.leaveList,function(t,e){return s("div",{key:e,staticClass:"leave-list"},[s("p",[s("img",{attrs:{src:i(58018),alt:""}}),a._v(" "),s("span",[a._v(a._s(t.month))])]),a._v(" "),s("ul",a._l(t.list,function(t,e){return s("li",{key:e},[s("span",[a._v(a._s(t.startTimeStr)+"～"+a._s(t.endTimeStr))]),a._v(" "),s("span",[a._v(a._s(t.leaveDays)+"天")]),a._v(" "),s("span",[a._v(a._s(t.leaveTypeText))])])}),0)])}),0)]):s("commonempty",{attrs:{description:"暂无请假数据"}}),a._v(" "),s("van-popup",{attrs:{position:"bottom","get-container":"#app"},model:{value:a.showYear,callback:function(t){a.showYear=t},expression:"showYear"}},[s("van-picker",{attrs:{"show-toolbar":"",columns:a.yearOptions},on:{confirm:a.confirmYear,cancel:function(t){a.showYear=!1}}})],1),a._v(" "),s("van-popup",{attrs:{position:"bottom","get-container":"#app"},model:{value:a.showType,callback:function(t){a.showType=t},expression:"showType"}},[s("van-picker",{attrs:{"show-toolbar":"",columns:a.typeOptions},on:{confirm:a.confirmType,cancel:function(t){a.showType=!1}}})],1)],1)},[],!1,null,"219e9820",null).exports},58018:function(t,e,a){t.exports=a.p+"static/img/dot.eb65e75..png"},33969:function(t,e,a){t.exports=a.p+"static/img/select.95a0f83..png"},11727:function(t,e,a){t.exports=a.p+"static/img/default-avatar.ad3a581..png"}}]);