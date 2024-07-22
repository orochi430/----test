/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[64],{1136:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ds-control ds-myschedule ds-no-padding",style:e.myscheduleStyle},["list"==e.type?a("div",{staticClass:"ds-myschedule-header"},[a("div",{staticClass:"ds-myschedule-tabs"},e._l(e.scheduleTypeList,(function(t,s){return a("div",{key:s,staticClass:"ds-myschedule-tab",class:{active:e.type==t.value},on:{click:function(a){return e.changeType(t)}}},[e._v(" "+e._s(t.text)+" ")])})),0)]):e._e(),a("div",{staticClass:"ds-myschedule-main"},[a("div",{staticClass:"ds-myschedule-main-content"},["list"!=e.type?[a("DsfMyscheduleCalendar",{ref:"calendarNav",attrs:{url:e.scheduleUrl,"holiday-url":e.holidayUrl,type:e.type,"user-ids":e.userIds,"my-tree-node":e.myTreeNode,"edit-path":e.editPath,"is-public-use":e.isPublicUse,"is-show-holiday":e.isShowHoliday},on:{"update:type":function(t){e.type=t},changeType:e.changeType,mounted:e.mountedHandler}})]:[a("DsfViewPart",{attrs:{path:e.listPath,showModel:e.showModel}})]],2),"list"!=e.type&&1==e.isPublicUse?a("div",{staticClass:"ds-myschedule-main-user"},[a("DsfMyscheduleUser",{attrs:{"user-path":e.userPath,"user-ids":e.userIds,"my-tree-node":e.myTreeNode},on:{"update:userIds":function(t){e.userIds=t},"update:user-ids":function(t){e.userIds=t}}})],1):e._e()])])},i=[],n=a(4),d=a.n(n),l=a(1),r=a.n(l),o=dsf.component({name:"DsfMySchedule",mixins:[$mixins.control],ctrlCaption:"我的日程",design:{isMask:!1},props:{scheduleUrl:{type:String,default:"/agenda/info/queryFollowAgendaByDate"},userPath:{type:String,default:"pc/service/agenda/choose"},editPath:{type:String,default:"pc/service/agenda/edit?type=0"},dataLoadedFun:{type:Function,required:!1},type:{type:String,default:"month"},listPath:{type:String,default:"/pc/service/agenda/joinlist?type=join"},showModel:{type:String,default:"full"},holidayUrl:{type:String,default:"/agenda/info/findHoliday"},isShowHoliday:{type:Boolean,default:!1}},data:function(){return{scheduleTypeList:[{text:"月",value:"month"},{text:"周",value:"week"},{text:"日",value:"day"},{text:"列",value:"list"}],nowTime:dsf.date.format(new Date,"yyyy-mm-dd"),userIds:"",myTreeNode:{label:"我",id:"myNodeId"},isPublicUse:"0"!=window.$$serverConfig["setting_agenda_is_public_use"]}},computed:{myscheduleStyle:function(){return this.isDesign?{"min-height":"500px"}:{}}},watch:{type:function(e){this.reloadData()},userIds:function(e){this.reloadData()}},created:function(){},methods:{mountedHandler:function(){this.reloadData()},reloadData:function(){var e=this;this.$nextTick().then((function(){e.listTypeReloadData()}))},listTypeReloadData:function(){var e,t;"list"!=this.type&&(null===this||void 0===this||null===(e=this.$refs)||void 0===e||null===(e=e.calendarNav)||void 0===e||null===(t=e.reloadData)||void 0===t||t.call(e),this.setScroll())},changeType:function(e){this.$emit("update:type",e.value)},setScroll:function(){var e=this;return d()(r.a.mark((function t(){var a,s,i,n,d,l,o,u;return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("month"==e.type){t.next=10;break}return t.next=3,e.$nextTick();case 3:a=dsf.date.format(new Date,"yyyy-mm-dd"),s=dsf.date.parse(new Date).getTime()-dsf.date.parse(a).getTime(),i=s/1e3/60/60/24,n=e.$refs.calendarNav.$refs.scroll,d=n.$box,l=d.scrollHeight,o=d.offsetHeight,u=(l-o)*i,n.scrollTo({top:u});case 10:case"end":return t.stop()}}),t)})))()}}}),u=o,c=(a(709),a(0)),h=Object(c["a"])(u,s,i,!1,null,null,null);t["default"]=h.exports},1137:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ds-myschedule-user"},[a("div",{staticClass:"ds-myschedule-user-search"},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.openSelectUsers},slot:"suffix"})])],1),a("div",{staticClass:"ds-myschedule-user-list"},[a("el-tree",{ref:"tree",staticClass:"filter-tree",attrs:{data:e.userList,props:e.defaultProps,"filter-node-method":e.filterNode,"default-checked-keys":e.defaultCheckedUserIds,"node-key":"id","default-expand-all":"","show-checkbox":""},on:{"check-change":e.changeUser}})],1)])},i=[],n={name:"DsfMyscheduleUser",props:{userPath:{type:String,default:""},userIds:{type:String,default:""},myTreeNode:{type:Object,default:function(){return{label:"",id:""}}}},computed:{},watch:{value:function(e){this.$refs.tree.filter(e)}},data:function(){return{value:"",defaultProps:{children:"children",label:"label"},userList:[],defaultCheckedUserIds:[]}},created:function(){this.getUserList()},mounted:function(){},methods:{filterNode:function(e,t){return!e||-1!==t.label.indexOf(e)},openSelectUsers:function(){var e=this,t=[],a=this.$refs.tree.getCheckedKeys();if(0!=(null===a||void 0===a?void 0:a.length)){var s=_.remove(a,(function(t){return t!=e.myTreeNode.id}));0!=(null===s||void 0===s?void 0:s.length)&&_.each(s,(function(a){var s;t.push({text:null===(s=e.userList.find((function(e){return e.id==a})))||void 0===s?void 0:s.label,value:a})}))}this.$openDialog({title:"选择人员",width:"80%",height:"500px",params:{path:this.$replace(this.userPath),selectValue:t},btns:[{text:"确定",handler:function(t){if(t.content){var a=t.content;if(a&&a.yes&&dsf.isFunction(a.yes)){var s=a.yes();if(!s)return!1;var i=[],n=[e.myTreeNode],d=[e.myTreeNode.id];(null===s||void 0===s?void 0:s.length)>0&&_.each(s,(function(e){n.push({label:e.text,id:e._id}),i.push({userId:e._id,userName:e.text}),d.push(e._id)}));var l={userIds:i};e.$http.post("/agenda/follow/saveOrUpdate",l,{headers:{"Content-Type":"application/json"}}).done((function(t){var a=t.success,s=(t.data,t.message);a?(e.userList=n,e.defaultCheckedUserIds=d,e.$emit("update:userIds",d.join(","))):dsf.layer.message(s,!1)})).error((function(e){dsf.layer.message(e.message||"请求异常",!1)}))}}}},{text:"取消"}]})},getUserList:function(){var e=this;this.$http.get("/agenda/follow/getFollowers").done((function(t){var a=t.success,s=t.data,i=t.message;if(a){var n,d=[e.myTreeNode],l=[e.myTreeNode.id];0!=(null===(n=s.userIds)||void 0===n?void 0:n.length)&&_.each(s.userIds,(function(e){d.push({label:e.userName,id:e.userId}),l.push(e.userId)})),e.defaultCheckedUserIds=l,e.userList=d,e.$emit("update:userIds",l.join(","))}else dsf.layer.message(i,!1)})).error((function(e){dsf.layer.message(e.message||"请求异常",!1)}))},changeUser:function(e,t,a){var s=this.$refs.tree.getCheckedKeys();this.$emit("update:userIds",s.join(","))}}},d=n,l=(a(711),a(0)),r=Object(l["a"])(d,s,i,!1,null,null,null);t["default"]=r.exports},1138:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ds-control ds-myschedule-figure ds-no-padding"},[a("div",{staticClass:"ds-myschedule-figure-day"},[e._l(e.scheduleListNew,(function(t,s){return a("div",{key:s,staticClass:"ds-myschedule-figure-day-column"},e._l(t,(function(t,s){return a("div",{key:s,staticClass:"ds-myschedule-figure-day-column-plan",style:e.planStyle(t,e.scheduleListNew),attrs:{title:e.getScheduleTitle(t)},on:{click:function(a){return e.goDetails(t)}}},[a("span",{staticClass:"ds-myschedule-figure-day-column-plan-name"},[e._v(" ["+e._s(t.agendaTypeVo.name)+"] ")]),a("span",{staticClass:"ds-myschedule-figure-day-column-plan-theme"},[e._v(" "+e._s(t.theme)+" ")])])})),0)})),a("div",{staticClass:"ds-myschedule-calendar-nowtime-hr",style:e.nowTimeStyle})],2)])},i=[],n=dsf.component({name:"DsfMyScheduleFigure",mixins:[$mixins.control],ctrlCaption:"我的日程-瀑布图",design:{isMask:!1},props:{nowTime:{type:String,default:""},day:{type:String,default:""},scheduleList:{type:Array,default:function(){return[]}},editPath:{type:String,default:""}},data:function(){return{}},computed:{scheduleListNew:{get:function(){return this.reloadData(this.scheduleList)}},nowTimeStyle:{get:function(){var e=this.nowTime;if(!e)return{width:0};var t=dsf.date.format(new Date,"yyyy-mm-dd"),a=dsf.date.parse(t+" "+e).getTime()-dsf.date.parse(t).getTime();return{top:a/1e3/60/60/25*100+"%"}}}},created:function(){},methods:{planStyle:function(e,t){return e&&{height:e.timeCha/1e3/60/60/24*100+"%",top:e.startTimeByDayNumToDay/1e3/60/60/24*100+"%",backgroundColor:e.agendaTypeVo.colorValue+"10",borderLeft:"4px solid "+e.agendaTypeVo.colorValue}},reloadData:function(e){var t=this;if(this.day){var a=[[]],s=_.remove(_.cloneDeep(e),(function(e){return"1"!=e.isDay}));s.forEach((function(e){e.startTimeByDayNum=dsf.date.parse(e.startTimeByDay).valueOf(),e.startTimeByDayNumToDay=dsf.date.parse(e.startTimeByDay).valueOf()-dsf.date.parse(t.day+" 00:00:00").valueOf(),e.endTimeByDayNum=dsf.date.parse(e.endTimeByDay).valueOf(),e.timeCha=e.endTimeByDayNum-e.startTimeByDayNum}));var i=dsf.date.parse(this.day+" 00:00:00").valueOf(),n=dsf.date.parse(this.day+" 23:59:59").valueOf();while(s.length){var d=this.getDate(s,i,n),l=d.date,r=d.isWrap;i=l.endTimeByDayNum+1,r&&(i=l.endTimeByDayNum,a.push([])),a[a.length-1].push(l)}return a}},getDate:function(e,t,a){var s=e.filter((function(e){return e.startTimeByDayNum>=t&&e.timeCha<=a-t})),i=!1;s.length||(i=!0,s=_.cloneDeep(e)),s.sort((function(e,t){return e.startTimeByDayNum-t.startTimeByDayNum}));var n=s.shift(),d=e.findIndex((function(e){return e.id==n.id}));return e.splice(d,1),{date:n,isWrap:i}},goDetails:function(e){var t="1"==e.isOwn?"0":"1";this.$openDialog({title:"查看日程",width:"80%",height:"70vh",params:{path:this.$replace(this.editPath)+"&isview="+t+"&id="+e.id}})},getScheduleTitle:function(e){if(!e)return"";var t=e.endTime,a=e.startTime,s=e.theme,i=[s,a+" - "+t];return i.join("\n")}}}),d=n,l=(a(713),a(0)),r=Object(l["a"])(d,s,i,!1,null,null,null);t["default"]=r.exports},1139:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ds-control ds-myschedule-calendar ds-no-padding"},[e.isSwitch?a("div",{staticClass:"ds-myschedule-calendar-switch"},[a("div",{staticClass:"ds-myschedule-tabs"},e._l(e.scheduleTypeList,(function(t,s){return a("div",{key:s,staticClass:"ds-myschedule-tab",class:{active:e.type==t.value},on:{click:function(a){return e.changeType(t)}}},[e._v(" "+e._s(t.text)+" ")])})),0),a("div",{staticClass:"ds-myschedule-calendar-switch-time"},[a("i",{staticClass:"iconfont icon-left",on:{click:function(t){return e.switchRange(-1)}}}),e.datePickerType?a("el-date-picker",{key:e.datePickerType,attrs:{editable:!1,clearable:!1,type:e.datePickerType,format:e.datePickerFormat,size:"mini","prefix-icon":" ","value-format":"yyyy-MM-dd",placeholder:"选择周"},model:{value:e.pickerValue,callback:function(t){e.pickerValue=t},expression:"pickerValue"}}):e._e(),a("i",{staticClass:"iconfont icon-right",on:{click:function(t){return e.switchRange(1)}}})],1),a("div",{staticClass:"ds-myschedule-calendar-switch-btns"},[a("DsfButton",{attrs:{icon:"add"},on:{click:e.handleAdd}},[e._v("新增日程")]),a("DsfButton",{attrs:{icon:"dingwei"},on:{click:e.handlerBack}},[e._v("今天")])],1)]):e._e(),a("div",{class:["ds-myschedule-calendar-body","day"!=e.type?"fixed-head":""]},[a("div",{directives:[{name:"show",rawName:"v-show",value:"day"!=e.type,expression:"type != 'day'"}],staticClass:"ds-myschedule-calendar-table-header-wrap"},[a("table",{staticClass:"ds-myschedule-calendar-table-header"},[a("tr",["month"!=e.type?a("td",{staticClass:"ds-myschedule-calendar-table-allday-width"}):e._e(),e._l(e.weeks,(function(t,s){return a("td",{key:s,class:{now:e.nowDay==t.id}},[e._v(" "+e._s(t.text)+" "),a("span",{staticClass:"tag"},[e.holidayInfo[t.id]?[0==e.holidayInfo[t.id].is_work?a("span",{staticClass:"holiday",attrs:{title:e.getTitle(e.lunarRange[t.id])}},[e._v("休")]):e._e(),1==e.holidayInfo[t.id].is_work?a("span",{staticClass:"workday",attrs:{title:e.getTitle(e.lunarRange[t.id])}},[e._v("班")]):e._e()]:e._e()],2)])}))],2)])]),a("DsfVirtualScroll",{ref:"scroll"},[a("div",{class:["ds-myschedule-calendar-table-body-wrap",e.type]},[a("table",{staticClass:"ds-myschedule-calendar-table-body"},[a("thead",[a("tr",["month"!=e.type?a("th",{staticClass:"ds-myschedule-calendar-table-allday-width"}):e._e(),e._l(e.weeks,(function(e){return a("th",{key:e.id})}))],2)]),a("tbody",[a("tr",{directives:[{name:"show",rawName:"v-show",value:"month"!=e.type,expression:"type != 'month'"}]},[a("td",{staticClass:"ds-myschedule-calendar-table-allday-width",staticStyle:{"line-height":"60px"}},[e._v(" 全天 ")]),e._l(e.tableData[0],(function(t){return a("td",{key:t.id,staticClass:"ds-myschedule-calendar-table-allday-td",class:{now:e.nowDay==t.id}},[t.id?a("div",[t.schedule?[e._l(t.schedule,(function(t){return["1"==t.isDay?a("DsfMyScheduleCapsule",{key:t.id,attrs:{schedule:t,editPath:e.editPath}}):e._e()]}))]:e._e()],2):e._e()])}))],2),e._l(e.tableData,(function(t,s){return a("tr",{key:s},[a("td",{directives:[{name:"show",rawName:"v-show",value:"month"!=e.type,expression:"type != 'month'"}],staticClass:"ds-myschedule-calendar-table-allday ds-myschedule-calendar-table-allday-width"},[e._l(e.hoursList,(function(t){return a("div",{key:t.id,staticClass:"ds-myschedule-calendar-table-allday-text"},[a("span",[e._v(e._s(t.text))])])})),a("span",{staticClass:"ds-myschedule-calendar-nowtime-time",style:e.nowTimeStyle},[e._v(" "+e._s(e.nowTime)+" ")])],2),e._l(t,(function(t){return a("td",{key:t.id,class:{now:e.nowDay==t.id,holiday:e.holidayInfo[t.id]&&0==e.holidayInfo[t.id].is_work,workday:e.holidayInfo[t.id]&&1==e.holidayInfo[t.id].is_work}},[t.id&&"month"==e.type?a("div",{staticClass:"ds-myschedule-calendar-table-day",class:{offset:!t.offset},on:{click:function(a){e.active=t.id}}},[a("div",{staticClass:"ds-myschedule-calendar-table-day-day",attrs:{title:e.getTitle(e.lunarRange[t.id])}},[a("span",{staticClass:"ds-myschedule-calendar-table-day-num"},[e._v(e._s(t.day))]),a("span",{staticClass:"ds-myschedule-calendar-table-day-zhDay"},[e._v(" "+e._s(e.getZhDay(t.id))+" ")]),a("span",{staticClass:"ds-myschedule-calendar-table-tag"},[e.holidayInfo[t.id]&&0==e.holidayInfo[t.id].is_work?[e._v("休")]:e.holidayInfo[t.id]&&1==e.holidayInfo[t.id].is_work?[e._v("班")]:e._e()],2)]),t.schedule?[e._l(t.schedule,(function(s,i){return[0==i||2==t.schedule.length&&1==i?a("DsfMyScheduleCapsule",{key:s.id,attrs:{schedule:s,editPath:e.editPath}}):e._e()]})),t.schedule.length>2?a("div",{staticClass:"ds-myschedule-calendar-table-day-more",on:{click:function(a){return e.morePlan(t.id)}}},[e._v(" 更多 ")]):e._e()]:e._e()],2):t.id&&"month"!=e.type?[a("DsfMyScheduleFigure",{attrs:{"edit-path":e.editPath,day:t.id,scheduleList:t.schedule,"now-time":e.nowTime}})]:e._e()],2)}))],2)}))],2)])])])],1)])},i=[],n=a(8),d=a.n(n),l=a(2),r=a.n(l),o=864e5,u=6048e5,c={},h=[{key:"1",text:"星期一"},{key:"2",text:"星期二"},{key:"3",text:"星期三"},{key:"4",text:"星期四"},{key:"5",text:"星期五"},{key:"6",text:"星期六"},{key:"0",text:"星期日"}],y=dsf.component({name:"DsfMyscheduleCalendar",mixins:[$mixins.control],ctrlCaption:"我的日程日历",design:{isMask:!1},props:{holidayUrl:{type:String,default:"/agenda/info/findHoliday"},isShowHoliday:{type:Boolean,default:!1},url:{type:String,default:"/agenda/info/queryFollowAgendaByDate"},userIds:{type:String,default:""},isSwitch:{type:Boolean,default:!0},isPublicUse:{type:Boolean,default:!1},dataLoadedFun:{type:Function,required:!1},toDay:{type:[String,Date],default:null},type:{type:String,default:"week"},myTreeNode:{type:Object,default:function(){return{label:"",id:""}}},editPath:{type:String,default:""}},components:{DsfMyScheduleCapsule:function(){return a.e(64).then(a.bind(null,1269))}},data:function(){return{scheduleTypeList:[{text:"月",value:"month"},{text:"周",value:"week"},{text:"日",value:"day"},{text:"列",value:"list"}],weeks:h,pickerValue:"",active:null,range:[],lunarRange:{},scheduleInfo:{},scheduleInfoDay:{},scheduleInfoAllDay:{},nowDay:dsf.date.format(new Date,"yyyy-mm-dd"),nowTime:"",nowTimeInterval:null,hoursList:[],holidayInfo:{}}},computed:{datePickerType:{get:function(){return"day"==this.type?"date":this.type}},datePickerFormat:{get:function(){return"month"==this.type?"yyyy年MM月":"week"==this.type?"yyyy年MM月 (第WW周)":"yyyy年MM月dd日"}},tableData:function(){var e=7,t=this.type,a=this.range,s=this.scheduleInfo,i=(this.weeks,[]);return"week"==t?e=8:"day"==t&&(e=2),_.each(a,(function(t,a){var n=Math.ceil((a+1)/e);i[n-1]||(i[n-1]=[]),t.schedule=s[t.id],i[n-1].push(t)})),i},nowTimeStyle:{get:function(){var e=this.nowTime;if(!e)return{};var t=dsf.date.format(new Date,"yyyy-mm-dd"),a=dsf.date.parse(t+" "+e).getTime()-dsf.date.parse(t).getTime();return{top:a/1e3/60/60/25*100+"%"}}}},watch:{active:function(e){e&&this.$dispatch("change",e)},url:function(){this.reloadData()},toDay:{handler:function(e){if(!e)return this.pickerValue=dsf.date.format(new Date,"yyyy-mm-dd"),void this.reloadData();dsf.isString(e)&&(e=dsf.date.parse(e,"yyyy-mm-dd")),"date"!==dsf.type(e)&&(e=new Date),this.pickerValue=dsf.date.format(e,"yyyy-mm-dd"),this.reloadData()},immediate:!0},pickerValue:function(){this.reloadData()}},created:function(){for(var e=this,t=[],a=0;a<25;a++)t.push({id:("0"+a).slice(-2),text:("0"+a).slice(-2)+":00"});this.hoursList=t,this.loadScript((function(){e.setLunarRange()})),this.getNowTime(),this.nowTimeInterval=setInterval((function(){e.getNowTime()}),6e4)},beforeDestroy:function(){this.nowTimeInterval=null},methods:{switchRange:function(e){e&&("week"===this.type?this.switchWeek(e):"week2"===this.type?this.switchWeek(2*e):"month"===this.type?this.switchMonth(e):"day"==this.type&&this.switchDay(e))},switchWeek:function(e){var t=dsf.date.parse(this.pickerValue,"yyyy-mm-dd");t=new Date(t.getTime()+e*u),this.pickerValue=dsf.date.format(t,"yyyy-mm-dd")},switchMonth:function(e){var t=dsf.date.parse(this.pickerValue,"yyyy-mm-dd");t.setDate(0),t=new Date(t.getTime()+(4*e+2)*u),this.pickerValue=dsf.date.format(t,"yyyy-mm-01")},switchDay:function(e){var t=dsf.date.parse(this.pickerValue,"yyyy-mm-dd");t=new Date(t.getTime()+e*o),this.pickerValue=dsf.date.format(t,"yyyy-mm-dd")},getZhDay:function(e){var t,a,s=this.lunarRange[e];return s?null!==(t=this.holidayInfo[e])&&void 0!==t&&t.holidayFirst?null===(a=this.holidayInfo[e])||void 0===a?void 0:a.holidayFirst:s.jieRi.length?s.jieRi[0]:s.lunarJieQi||s.lunarDay:""},getTitle:function(e){if(!e)return"";var t,a=e.day,s=e.lunarYear,i=e.lunarMonth,n=e.lunarDay,d=e.lunarJieQi,l=e.jieRi,o=e.otherJieRi,u=e.dayId;if(this.holidayInfo[u])return null===(t=this.holidayInfo[u])||void 0===t||null===(t=t.holidayArr)||void 0===t?void 0:t.join("\n");var c=[a,"农历".concat(s,"年").concat(i,"月").concat(n)];d&&c.push("节气：".concat(d));var h=[].concat(r()(l),r()(o));return h.length&&c.push("今天是".concat(h.join("、"),"。")),c.join("\n")},getScheduleTitle:function(e){if(!e)return"";var t=e.endTime,a=e.startTime,s=e.theme,i=e.curUserName,n=e.addressText,d=[i,s,a+" - "+t,n];return d.join("\n")},loadScript:function(e){this.$http.importFiles(dsf.url.getWebPath("$/js/libs/lunar/lunarDay.js")).then((function(t){var a=d()(t,1),s=a[0].state;s?null===e||void 0===e||e():dsf.error("加载lunarDay.js文件出错")})).catch((function(e){dsf.error(e)}))},reloadData:function(){var e;this.scheduleInfo={};var t=dsf.date.parse(this.pickerValue,"yyyy-mm-dd");t=(null===(e=t)||void 0===e?void 0:e.getTime())||dsf.date.toDay();var a=this.getRange(t),s=a.range,i=a.active;this.range=s,this.active=i;var n=dsf.date.format(new Date(s[s.length-1].date.getTime()+o),"yyyy-mm-dd");if("month"==this.type)this.weeks=h;else if("week"==this.type){var d=[];_.each(h,(function(e){var t=s.find((function(t){return t.weekNum==e.key})).id;d.push({key:e.key,text:"".concat(e.text," ").concat(t.slice(5,7),"/").concat(t.slice(-2)),id:t})})),this.weeks=d}else"day"==this.type&&(this.weeks=[{key:new Date(this.pickerValue).getDay(),text:""}]);this.isDesign||(this.getScheduleInfo(s[0].id,n),this.getHolidayInfo(s[0].id,n)),this.setLunarRange()},getRange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:dsf.date.toDay(),t=new Date(e),a=t.getMonth(),s=this.type,i="month"===s;i&&(e=t.setDate(1));var n=[],d=dsf.date.toDay(),l=null,r=t.getDay()||7,u=7-r;if("week2"===s?u+=7:i&&(u+=35),"day"!=s)for(var c=1-r;c<=u;c++){var h=e+o*c,y=new Date(h),f=y.getDate(),p={id:dsf.date.format(y,"yyyy-mm-dd"),offset:!i||y.getMonth()===a,day:f,date:y,weekNum:y.getDay()};n.push(p),h==d&&(l=p)}else n=[{id:dsf.date.format(t,"yyyy-mm-dd"),offset:!i||t.getMonth()===a,day:t.getDate(),date:t,weekNum:t.getDay()}];return l||(l=n[0]),{range:n,active:l}},setLunarRange:function(){if(window.Solar){var e={};_.forEach(this.range,(function(t){var a=t.id,s=t.date;if(!c[a]){var i=window.Solar.fromDate(s),n=i.getLunar();c[a]={dayId:a,day:dsf.date.format(s,"yyyy年mm月dd日"),lunarYear:n.getYearInGanZhi(),lunarMonth:n.getMonthInChinese(),lunarDay:n.getDayInChinese(),lunarJieQi:n.getJieQi(),jieRi:[].concat(r()(n.getFestivals()),r()(i.getFestivals())),otherJieRi:i.getOtherFestivals()}}e[a]=c[a]})),this.lunarRange=e}},getScheduleInfo:function(e,t){var a=this;if(this.url&&""!=this.url){var s=1,i=this.userIds;-1!=i.indexOf(this.myTreeNode.id)?i=i.slice(this.myTreeNode.id.length+1):s=0,this.isPublicUse||(s=1);var n={startDate:e,endDate:t,categoryValue:0,isSelf:s,userIds:i};this.$http.get(this.url,n).done((function(e){var t=e.success,s=e.data,i=e.message;if(t){var n,d={},l={};_.forIn(s,(function(e,t){if((null===e||void 0===e?void 0:e.length)>0){var a=[],s=[];_.each(e,(function(e){"1"==(null===e||void 0===e?void 0:e.isDay)?s.push(e):a.push(e)})),d[t]=a,l[t]=s}})),a.scheduleInfo=s,a.scheduleInfoDay=d,a.scheduleInfoAllDay=l,null===(n=a.dataLoadedFun)||void 0===n||n.call(a,s,a)}else dsf.layer.message(i,!1)})).error((function(e){dsf.layer.message(e.message||"请求异常",!1)}))}else this.scheduleInfo={}},getHolidayInfo:function(e,t){var a=this;if(this.isShowHoliday&&this.holidayUrl&&""!=this.holidayUrl){var s={beginTime:e,endTime:t};this.$http.get(this.holidayUrl,s).done((function(e){var t=e.success,s=e.data,i=e.message;if(t){var n={};_.forEach(s,(function(e){var t,a,s,i=null===(t=e.time)||void 0===t?void 0:t.slice(0,10);n[i]=_.cloneDeep(e),n[i].holidayArr=null===(a=e.type_text)||void 0===a?void 0:a.split("^"),n[i].holidayFirst=e.type_text?null===(s=n[i])||void 0===s?void 0:s.holidayArr[0]:""})),a.holidayInfo=n}else dsf.layer.message(i,!1)})).error((function(e){dsf.layer.message(e.message||"请求异常",!1)}))}else this.holidayInfo={}},handlerBack:function(){this.pickerValue=this.nowDay},changeType:function(e){this.$emit("changeType",e)},morePlan:function(e){this.pickerValue=e,this.$emit("changeType",{text:"日",value:"day"})},handleAdd:function(){this.$openDialog({title:"新增日程",width:"80%",height:"70vh",params:{path:this.$replace(this.editPath)}})},getNowTime:function(){var e=new Date;this.nowTime=("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)}}}),f=y,p=(a(715),a(0)),m=Object(p["a"])(f,s,i,!1,null,null,null);t["default"]=m.exports},1269:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ds-myschedule-capsule ds-multi-ellipsis-1",style:e.scheduleStyle(e.schedule),attrs:{title:e.getScheduleTitle(e.schedule)},on:{click:function(t){return e.goDetails(e.schedule)}}},[a("span",{style:e.scheduleAbbreStyle(e.schedule)},[e._v(e._s(e.schedule.agendaTypeVo.abbre))]),a("span",[e._v(e._s(e.schedule.theme))])])},i=[],n=dsf.component({name:"DsfMyScheduleCapsule",mixins:[$mixins.control],ctrlCaption:"我的日程-胶囊",design:{isMask:!1},props:{schedule:{type:Object,default:function(){return{agendaTypeVo:{}}}},editPath:{type:String,default:""}},data:function(){return{}},computed:{},created:function(){},methods:{scheduleStyle:function(e){return e&&{backgroundColor:e.agendaTypeVo.colorValue+"10"}},scheduleAbbreStyle:function(e){return e&&{backgroundColor:e.agendaTypeVo.colorValue}},getScheduleTitle:function(e){if(!e)return"";var t=e.endTime,a=e.startTime,s=e.theme,i=[s,a+" - "+t];return i.join("\n")},goDetails:function(e){var t="1"==e.isOwn?"0":"1";this.$openDialog({title:"查看日程",width:"80%",height:"70vh",params:{path:this.$replace(this.editPath)+"&isview="+t+"&id="+e.id}})}}}),d=n,l=(a(929),a(0)),r=Object(l["a"])(d,s,i,!1,null,null,null);t["default"]=r.exports},537:function(e,t,a){var s=a(710);"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var i=a(19).default;i("2d7b90fc",s,!0,{sourceMap:!1,shadowMode:!1})},538:function(e,t,a){var s=a(712);"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var i=a(19).default;i("250708d8",s,!0,{sourceMap:!1,shadowMode:!1})},539:function(e,t,a){var s=a(714);"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var i=a(19).default;i("00a7600a",s,!0,{sourceMap:!1,shadowMode:!1})},540:function(e,t,a){var s=a(716);"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var i=a(19).default;i("4bb37384",s,!0,{sourceMap:!1,shadowMode:!1})},600:function(e,t,a){var s=a(930);"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var i=a(19).default;i("b41a3c54",s,!0,{sourceMap:!1,shadowMode:!1})},709:function(e,t,a){"use strict";a(537)},710:function(e,t,a){"use strict";a.r(t)},711:function(e,t,a){"use strict";a(538)},712:function(e,t,a){"use strict";a.r(t)},713:function(e,t,a){"use strict";a(539)},714:function(e,t,a){"use strict";a.r(t)},715:function(e,t,a){"use strict";a(540)},716:function(e,t,a){"use strict";a.r(t)},929:function(e,t,a){"use strict";a(600)},930:function(e,t,a){"use strict";a.r(t)}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_pc_schedule.js.map