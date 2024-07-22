/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[36],{1143:function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"dsf_year_calendar_view"},[t("div",{staticClass:"dsf_year_calendar_view_top"},[e.showFullYear?[e._v(" "+e._s(e.yearValue)+"年"+e._s(e.monthValue)+"月 ")]:[t("div",{staticClass:"dsf_year_calendar_view_top_year"},[t("el-select",{attrs:{placeholder:"请选择年"},on:{change:function(a){return e.chooseYears(e.yearValue)}},model:{value:e.yearValue,callback:function(a){e.yearValue=a},expression:"yearValue"}},e._l(e.yearOptions,(function(e,a){return t("el-option",{key:"selectitem"+a,attrs:{label:e.label,value:e.value}})})),1)],1),t("div",{staticClass:"dsf_year_calendar_view_top_month"},[t("div",{staticClass:"top_month_left",on:{click:function(a){return e.chooseMonth(e.month-1)}}},[t("i",{staticClass:"iconfont icon-zuojiantou"})]),t("div",{staticClass:"top_month_middle"},[t("el-select",{attrs:{placeholder:"请选择"},on:{change:function(a){return e.chooseMonth(e.monthValue)}},model:{value:e.monthValue,callback:function(a){e.monthValue=a},expression:"monthValue"}},e._l(e.monthOptions,(function(e,a){return t("el-option",{key:"selectitem"+a,attrs:{label:e.label,value:e.value}})})),1)],1),t("div",{staticClass:"top_month_left",on:{click:function(a){return e.chooseMonth(e.month+1)}}},[t("i",{staticClass:"iconfont icon-youjiantou"})])]),e.showFullYear?e._e():t("div",{staticClass:"dsf_year_calendar_view_top_backtoday"},[t("el-button",{staticClass:"backtoday_button",style:{visibility:!e.$YearMonthCalendarCtrl.hasBackToday||(new Date).getFullYear()==e.yearValue&&(new Date).getMonth()==e.month-1?"hidden":"visible"},attrs:{type:"plain"},on:{click:function(a){return e.backToday()}}},[e._v(" 返回今天 ")]),t("el-button",{staticClass:"backtoday_button",on:{click:function(a){return e.$emit("changeShowFullYears",!0,e.yearValue,e.month)}}},[e._v(" 切换至年历 ")])],1)]],2),t("table",{staticClass:"dsf_year_calendar_view_content",attrs:{border:"1",cellspacing:"0",cellpadding:"0","border-collapse":"collapse"}},[t("thead",[t("tr",e._l(e.weekDays,(function(a){return t("td",{key:a,staticClass:"c_content_header"},[e._v(e._s(a))])})),0)]),t("tbody",e._l(e.days,(function(a,l){return t("tr",{key:"hang"+l},e._l(a,(function(a,l){return t("td",{key:"cell"+l,staticClass:"c_content_cell",class:{c_content_cell_arrange:a.isArrange,select_tags:e.holidayTag.selectDay&&e.holidayTag.selectDay==a.day,is_rest:"rest"==a.dayType&&"makeupClass"!=a.holiday},attrs:{title:e.getTitle(a)},on:{click:function(t){return e.controlArrange(a)},mouseenter:function(t){return e.cancelSelectTags(a)}}},[e.showFullYear&&(a.jieri.length||a.jieqi)?t("el-tooltip",{attrs:{effect:"dark",placement:"right","popper-class":"dsf_year_calendar_view_tooltip"}},[t("div",{attrs:{slot:"content"},slot:"content"},[e._v(e._s(a.jieri[0]||a.jieqi))]),t("div",{class:a.day==e.today?"c_content_cell_day_white":"c_content_cell_day"},[e._v(" "+e._s(a.day==e.today?"今":a.gregorian||"")+" "),t("span",{staticClass:"c_content_cell_dot"})])]):t("div",{class:a.day==e.today?"c_content_cell_day_white":"c_content_cell_day"},[e._v(" "+e._s(a.day==e.today?"今":a.gregorian||"")+" ")]),a.holiday?t("div",{class:["c_content_cell_holidaybg","makeupClass"==a.holiday?"class":""]},[e.showFullYear?e._e():t("span",{staticClass:"text"},[e._v(e._s(a.typeText))])]):e._e(),a.day==e.today?t("div",{staticClass:"c_content_cell_todaybackground"}):e._e(),e.showFullYear?e._e():[t("div",{class:a.day==e.today?"c_content_cell_oldday_white":"c_content_cell_oldday"},[a.jieri.length||a.jieqi?t("span",{staticClass:"c_content_cell_month_day_text"},[e._v(" "+e._s(a.jieri.length?a.jieri[0]:a.jieqi)+" ")]):t("span",[e._v(e._s(a.lunar||""))])])]],2)})),0)})),0)]),e.showFullYear?e._e():t("div",{staticClass:"dsf_year_calendar_view_bottom"},[e._m(0),e._m(1),t("div",{staticClass:"holiday_tags"},[t("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleClickHolidayTag},model:{value:e.holidayTag.active,callback:function(a){e.$set(e.holidayTag,"active",a)},expression:"holidayTag.active"}},e._l(e.holidayTag.list,(function(e){return t("el-tab-pane",{key:e.holidaysId,attrs:{label:e.name,name:e.holidaysId}})})),1)],1)])])},n=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"dsf_year_calendar_view_bottom_notice"},[t("div",{staticClass:"notice_color_block"}),t("span",[e._v("补班")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"dsf_year_calendar_view_bottom_notice"},[t("div",{staticClass:"notice_color_block_holiday"}),t("span",[e._v("假日")])])}],r=t(2),s=t.n(r),i=dsf.component({ctrlCaption:"万年历月历",name:"DsfYearCalendar",mixins:[$mixins.control],inject:{$YearMonthCalendarCtrl:{default:null}},props:{yearOptions:{type:Array,default:function(){return[]}},showFullYear:{type:Boolean,default:!1},settingMonth:{type:Number,default:0},weekDays:{type:Array,default:function(){return["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]}},curYearValue:{type:Number,default:0}},data:function(){return this.monthOptions=[{value:1,label:"1月"},{value:2,label:"2月"},{value:3,label:"3月"},{value:4,label:"4月"},{value:5,label:"5月"},{value:6,label:"6月"},{value:7,label:"7月"},{value:8,label:"8月"},{value:9,label:"9月"},{value:10,label:"10月"},{value:11,label:"11月"},{value:12,label:"12月"}],{yearValue:"",monthValue:"",weekIndex:0,year:0,month:this.settingMonth||0,today:dsf.date.format(new Date,"yyyy年m月d日"),days:[],isOpenArrange:!1,arrangeArray:[],startDateTime:0,endDateTime:0,holidayTag:{list:[],active:null,selectDay:null}}},created:function(){var e=this.$YearMonthCalendarCtrl.loaded;if(this.showFullYear?e<=12:!e){var a;if(this.showFullYear?(this.$YearMonthCalendarCtrl.loaded++,e++):this.$YearMonthCalendarCtrl.loaded=13,this.$YearMonthCalendarCtrl.urlStartMonth&&!this.settingMonth)this.toYearMonth(this.curYearValue,this.$YearMonthCalendarCtrl.urlStartMonth);else if((null===(a=_.last(this.yearOptions))||void 0===a?void 0:a.value)>=(new Date).getFullYear())this.backToday();else{var t;this.yearValue=null===(t=_.last(this.yearOptions))||void 0===t?void 0:t.value,this.toYearMonth(this.yearValue,this.settingMonth||1)}this.showFullYear||this.getHolidayTags()}},methods:{backToday:function(){var e=new Date,a=e.getFullYear(),t=e.getMonth()+1,l=e.getDate();this.$emit("changeYear",a),this.showFullYear?(this.settingMonth==t&&(this.today="".concat(a,"年").concat(t,"月").concat(l,"日")),this.toYearMonth(a,this.settingMonth||t)):(this.today="".concat(a,"年").concat(t,"月").concat(l,"日"),this.toYearMonth(a,t))},toYearMonth:function(e,a){a<1||a>12||(this.yearValue=e,this.year=e,this.month=1*a,this.getDays())},getDays:function(){this.isOpenArrange=!1,this.arrangeArray=[],this.monthValue=this.month,this.days=[];var e=new Date;e.setFullYear(this.year,this.month,0);var a=e.getDate(),t=new Date(this.year,this.month-1,1),l=new Date(this.year,this.month-1,a);this.weekIndex=t.getDay();for(var n=this.year+"-"+(this.month<10?"0"+this.month:this.month),r=l.getDay(),i=[],o=1;o<=a;o++){if(1==o&&0!=this.weekIndex)for(var c=0;c<this.weekIndex;c++)i.push({gregorian:"",lunar:"",holiday:"",jieri:[]});var u=n+"-"+(o<10?"0"+o:o)+" 00:00:00",d=new Date("".concat(this.year,"/").concat(this.month,"/").concat(o)),h=window.Solar.fromDate(d),y=h.getLunar(),f=y.getYearInGanZhi(),_=y.getMonthInChinese(),v=y.getDayInChinese(),g=y.getJieQi(),p=y.getFestivals(),m=h.getFestivals(),Y=h.getOtherFestivals(),w=[].concat(s()(p),s()(m));if(i.push({day:dsf.date.format(d,"yyyy年m月d日"),isArrange:!0,gregorian:o,time:u,lunarYear:f,lunarMonth:_,lunarDay:v,lunar:"初一"==v?_+"月":v,jieqi:g,lunarjieri:p,basejieri:m,otherJieRi:Y,jieri:w,holiday:""}),o==a&&6!=r)for(var C=0;C<6-r;C++)i.push({gregorian:"",lunar:"",holiday:"",jieri:[]});if(7==i.length){var b=i;this.days.push(b),i=[]}}if(this.days.length<6)for(var D=0;D<6-this.days.length;D++)this.days.push([{gregorian:"",lunar:"",holiday:"",jieri:[]},{gregorian:"",lunar:"",holiday:"",jieri:[]},{gregorian:"",lunar:"",holiday:"",jieri:[]},{gregorian:"",lunar:"",holiday:"",jieri:[]},{gregorian:"",lunar:"",holiday:"",jieri:[]},{gregorian:"",lunar:"",holiday:"",jieri:[]},{gregorian:"",lunar:"",holiday:"",jieri:[]}]);this.requestHolidayData()},controlArrange:function(e){if(!this.$YearMonthCalendarCtrl.isReadOnly&&e.gregorian&&e.isArrange){var a={date:e.time,dayType:e.dayType,dateState:e.holiday};this.$http.post("calendar/changeDateStatus",a,!0).done((function(a){var t=a.success,l=a.data;t?(e.holiday=l.typeValue,e.typeText=l.typeText,dsf.layer.message("设置成功")):dsf.layer.message("设置失败",!1)}))}},getTitle:function(e){if(null===e||void 0===e||!e.day)return"";var a=e.day,t=e.lunarYear,l=e.lunarMonth,n=e.lunarDay,r=e.jieqi,i=e.jieri,o=e.otherJieRi,c=[a,"农历".concat(t,"年").concat(l,"月").concat(n)];r&&c.push("节气：".concat(r));var u=[].concat(s()(i),s()(o));return u.length&&c.push("今天是".concat(u.join("、"),"。")),c.join("\n")},chooseYears:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.month;this.toYearMonth(e,a),this.getHolidayTags()},chooseMonth:function(e){this.holidayTag.active=null,this.holidayTag.selectDay=null,this.toYearMonth(this.year,e)},requestHolidayData:function(){var e=this;if(!this.$YearMonthCalendarCtrl.isDesign){var a="";a=this.monthValue<10?"0"+this.monthValue:""+this.monthValue,this.$http.get("calendar/getCalendarInfosByMonth",dsf.mix({},{yearMonth:this.yearValue+""+a},this.queryString),!0).done((function(a){var t=a.success,l=a.data;if(t){var n={"星期日":0,"星期一":1,"星期二":2,"星期三":3,"星期四":4,"星期五":5,"星期六":6},r=[];_.forEach(l.weekInfos,(function(e,a){r[n[a]]=e})),_.forEach(e.days,(function(a,t){_.forEach(a,(function(a,t){e.$set(a,"dayType",r[t])}))})),e.getHoliday(l.calendarInfos)}}))}},getHoliday:function(e){var a=this;e.forEach((function(e){var t,l,n=null===e||void 0===e||null===(t=e.days)||void 0===t||null===(l=t.split)||void 0===l?void 0:l.call(t,"-");if(3==(null===n||void 0===n?void 0:n.length)){var r=parseInt(n[2])+a.weekIndex,s=parseInt((r-1)/7),i=(r-1)%7;a.days.length>0&&(a.days[s][i].holiday=e.typeValue||"",a.days[s][i].typeText=e.typeText||"",a.days[s][i].calendarId=e.calendarId||"")}}))},getHolidayTags:function(){var e=this;this.showFullYear||(this.$YearMonthCalendarCtrl.isDesign?this.holidayTag.list=[{name:"元旦",date:"",holidaysId:1},{name:"春节",date:"",holidaysId:2},{name:"清明节",date:"",holidaysId:3},{name:"劳动节",date:"",holidaysId:4},{name:"端午节",date:"",holidaysId:5},{name:"国庆节",date:"",holidaysId:6},{name:"中秋节",date:"",holidaysId:7}]:this.$http.get("calendar-holidays/getConfigHolidays",{year:this.yearValue},!0).done((function(a){var t=a.success,l=a.data,n=a.message;t?e.holidayTag.list=l:dsf.httpError(n)})).error((function(){dsf.layer.message("获取假日标签服务器异常",!1)})))},handleClickHolidayTag:function(e,a){var t=this;e=this.holidayTag.list[e._data.index];var l=new Date(e.date);if(this.holidayTag.selectDay==dsf.date.format(l,"yyyy年m月d日"))return this.holidayTag.selectDay=null,void setTimeout((function(){t.holidayTag.active=null}));var n=l.getMonth()+1;this.month!=n&&this.toYearMonth(this.yearValue,n),this.holidayTag.selectDay=dsf.date.format(l,"yyyy年m月d日")},cancelSelectTags:function(e){this.holidayTag.selectDay==e.day&&(this.holidayTag.selectDay=null,this.holidayTag.active=null)}}}),o=i,c=t(0),u=Object(c["a"])(o,l,n,!1,null,null,null);a["default"]=u.exports},1144:function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"dsf_year_calendar_full_view dsf_year_calendar_view"},[e.showFullYear?t("div",{staticClass:"dsf_year_calendar_view_top"},[t("div",{staticClass:"dsf_year_calendar_view_top_year"},[t("el-select",{attrs:{placeholder:"请选择"},on:{change:function(a){return e.chooseYears(e.yearValue)}},model:{value:e.yearValue,callback:function(a){e.yearValue=a},expression:"yearValue"}},e._l(e.yearOptions,(function(e,a){return t("el-option",{key:"selectitem"+a,attrs:{label:e.label,value:e.value}})})),1)],1),t("div",{staticClass:"dsf_year_calendar_view_top_backtoday"},[e.$YearMonthCalendarCtrl.hasBackToday&&(new Date).getFullYear()!=e.yearValue?t("el-button",{staticClass:"backtoday_button",attrs:{type:"plain"},on:{click:function(a){return e.backToday()}}},[e._v(" 返回今天 ")]):e._e(),e.showFullYear?t("el-button",{staticClass:"backtoday_button",on:{click:function(a){return e.$emit("changeShowFullYears",!1,e.yearValue)}}},[e._v(" 切换至月历 ")]):e._e()],1)]):e._e(),t("dsf-virtual-scroll",{staticClass:"dsf_year_calendar_full",attrs:{height:"auto"}},e._l(e.months,(function(a){return t("DsfYearCalendar",{key:a,ref:"month"+a,refInFor:!0,attrs:{settingMonth:a,showFullYear:e.showFullYear,weekDays:e.weekDays,curYearValue:e.yearValue,yearOptions:e.yearOptions}})})),1),e._m(0)],1)},n=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"dsf_year_calendar_view_bottom"},[t("div",{staticClass:"dsf_year_calendar_view_bottom_notice"},[t("div",{staticClass:"notice_color_block"}),e._v(" 补班 ")]),t("div",{staticClass:"dsf_year_calendar_view_bottom_notice"},[t("div",{staticClass:"notice_color_block_holiday"}),e._v(" 假日 ")])])}],r=dsf.component({ctrlCaption:"年历",name:"DsfFullyearCalendar",mixins:[$mixins.control],inject:{$YearMonthCalendarCtrl:{default:null}},props:{yearOptions:{type:Array,default:function(){return[]}},showFullYear:{type:Boolean,default:!0},settingMonth:{type:Number,default:0},curYearValue:{type:Number,default:0},weekDays:{type:Array,default:function(){return["日","一","二","三","四","五","六"]}},months:{type:Array,default:function(){return[1,2,3,4,5,6,7,8,9,10,11,12]}}},data:function(){return{yearValue:(new Date).getFullYear()}},created:function(){this.curYearValue&&(this.yearValue=this.curYearValue)},methods:{chooseYears:function(e){for(var a in this.yearValue=e,this.$refs)this.$refs[a][0].chooseYears&&this.$refs[a][0].chooseYears(e)},getDays:function(e){if(e)this.$refs["month"+e][0].getDays();else for(var a in this.$refs)this.$refs[a][0].getDays&&this.$refs[a][0].getDays()},backToday:function(){var e=new Date,a=e.getFullYear(),t=e.getMonth()+1;this.yearValue!=a&&(this.yearValue=a,this.chooseYears(this.yearValue));var l=this.$refs["month"+t][0].$el.offsetTop,n=document.querySelectorAll(".dsf_year_calendar_full")[0].scrollTop;Math.abs(l-n)>100&&document.querySelectorAll(".dsf_year_calendar_full")[0].scrollTo({top:l-72,behavior:"smooth"})}}}),s=r,i=t(0),o=Object(i["a"])(s,l,n,!1,null,null,null);a["default"]=o.exports},1145:function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"dsf_month_year_calendar"},[e.loading?e._e():[e.showFullYears?t("DsfFullyearCalendar",{ref:"fullyearCalendar",attrs:{showFullYear:e.showFullYears,yearOptions:e.yearOptions,curYearValue:e.curYearValue},on:{changeShowFullYears:e.changeShowFullYears,changeCurYearValue:e.changeCurYearValue,changeYear:e.changeYear}}):e._e(),e.showFullYears?e._e():t("DsfYearCalendar",{ref:"yearcalendar1",attrs:{showFullYear:e.showFullYears,yearOptions:e.yearOptions,curYearValue:e.curYearValue},on:{changeCurYearValue:e.changeCurYearValue,changeShowFullYears:e.changeShowFullYears}})]],2)},n=[],r=dsf.component({ctrlCaption:"万年历",name:"DsfYearMonthCalendar",mixins:[$mixins.control],provide:function(){return{$YearMonthCalendarCtrl:this}},props:{readOnly:{type:Boolean,default:!1},showFullYears:{type:Boolean,default:!0},selectStartType:{type:Number,default:2},selectEndType:{type:Number,default:1},minYearByDate:{type:Number,default:2018},minYearByDiff:{type:Number,default:0},maxYearByDate:{type:[Number,String],default:(new Date).getFullYear()},maxYearByDiff:{type:Number,default:0}},data:function(){return{yearOptions:[],curYearValue:null,urlStartMonth:null,loading:!0,hasBackToday:!0,month:null,loaded:0}},created:function(){this.loadScript(),this.setYearOptions()},methods:{loadScript:function(){var e=this;dsf.http.importFiles(dsf.url.getWebPath("$/js/libs/lunar/lunarDay.js")).then((function(){e.loading=!1})).catch((function(e){dsf.error(e)}))},setYearOptions:function(){var e,a=null,t=null,l=(new Date).getFullYear();a=1==this.selectStartType?(new Date).getFullYear():2==this.selectStartType?this.minYearByDate||l:l-this.minYearByDiff,t=1==this.selectEndType?(new Date).getFullYear():2==this.selectEndType?this.maxYearByDate||l:l+this.maxYearByDiff;var n,r,s,i=this.queryString,o=i.startDate,c=i.endDate;o&&c&&(a=parseInt(null===o||void 0===o||null===(n=o.split)||void 0===n||null===(n=n.call(o,"-"))||void 0===n?void 0:n[0]),this.curYearValue=a,this.urlStartMonth=null===o||void 0===o||null===(r=o.split)||void 0===r||null===(r=r.call(o,"-"))||void 0===r?void 0:r[1],t=parseInt(null===c||void 0===c||null===(s=c.split)||void 0===s||null===(s=s.call(c,"-"))||void 0===s?void 0:s[0]));a||(a=l),t||(t=l),a>t&&(a=t);for(var u=a;u<=t;u++)this.yearOptions.push({value:u,label:u+"年"});(null===(e=_.last(this.yearOptions))||void 0===e?void 0:e.value)<(new Date).getFullYear()&&(this.hasBackToday=!1)},changeCurYearValue:function(e){this.curYearValue=e},changeShowFullYears:function(e,a){var t=this,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;this.$emit("update:showFullYears",e),this.curYearValue=a,setTimeout((function(){e?(t.month=l,t.$refs.fullyearCalendar.chooseYears(t.curYearValue)):t.$refs.yearcalendar1.chooseYears(t.curYearValue,t.month)}),100)},changeYear:function(e){this.curYearValue=e}},computed:{isReadOnly:function(){return 1==this.queryString.isview||this.isDesign||1!=this.$eval("@[pri('_calendar_setting')]")}}}),s=r,i=(t(723),t(0)),o=Object(i["a"])(s,l,n,!1,null,null,null);a["default"]=o.exports},544:function(e,a,t){var l=t(724);"string"===typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);var n=t(19).default;n("254afa6e",l,!0,{sourceMap:!1,shadowMode:!1})},723:function(e,a,t){"use strict";t(544)},724:function(e,a,t){"use strict";t.r(a)}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_pc_calendar.js.map