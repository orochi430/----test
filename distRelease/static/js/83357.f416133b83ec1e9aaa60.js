(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[83357],{48056:function(e,t,a){a(21013),e.exports=a(34579).Object.values},21013:function(e,t,a){var i=a(83856),n=a(52050)(!1);i(i.S,"Object",{values:function(e){return n(e)}})},44174:function(e){e.exports=function(e,t,a,i){for(var n=-1,s=null==e?0:e.length;++n<s;){var r=e[n];t(i,r,a(r),e)}return i}},81119:function(e){e.exports=function(e,t,a,i){for(var n=-1,s=null==e?0:e.length;++n<s;){var r=e[n];t(i,r,a(r),e)}return i}},89465:function(e,t,a){var i=a(38777);e.exports=function(e,t,a){"__proto__"==t&&i?i(e,t,{configurable:!0,enumerable:!0,value:a,writable:!0}):e[t]=a}},67206:function(e){e.exports=function(e){return e}},55189:function(e,t,a){var r=a(44174),c=a(81119),o=a(67206),l=a(1469);e.exports=function(n,s){return function(e,t){var a=l(e)?r:c,i=s?s():{};return a(e,n,o(t,2),i)}}},38777:function(e,t,a){var i=a(10852),a=function(){try{var e=i(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();e.exports=a},10852:function(e){e.exports=function(e,t){return null==e?void 0:e[t]}},7739:function(e,t,a){var i=a(89465),a=a(55189),n=Object.prototype.hasOwnProperty,a=a(function(e,t,a){n.call(e,a)?e[a].push(t):i(e,a,[t])});e.exports=a},1469:function(e){var t=Array.isArray;e.exports=t},21864:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});var t={props:{fabItems:{type:Array,default:function(){return[]}},titleKey:{type:String,default:"title"}},data:function(){return{showFab:!1}},directives:{clickOutside:{bind:function(t,a,e){function i(e,t){return!e.el.contains(t.target)&&!t.target.dataset.outside&&(e.binding&&e.binding.value&&"function"==typeof e.binding.value?e.binding.value():void 0)}t.__clickOutside__=i,document.addEventListener("click",function(e){return i({el:t,binding:a},e)}),document.addEventListener("touchend",function(e){return i({el:t,binding:a},e)})},unbind:function(e){document.removeEventListener("click",e.__clickOutside__)}}},methods:{clickOutside:function(){this.showFab=!1},clickMain:function(){1==this.fabItems.length?this.clickItem(this.fabItems[0]):this.showFab=!this.showFab},clickItem:function(e){"go"==e.type?e.url?this.$router.push({path:e.url}):dsf.layer.toast("未传入跳转地址"):this.$emit("clickItem",e)}}},i=(0,a(51900).Z)(t,function(){var a=this,i=a._self._c;return i("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:a.clickOutside,expression:"clickOutside"}],staticClass:"fab-container"},[0<a.fabItems.length?i("div",{staticClass:"main-btn",on:{click:a.clickMain}},[1<a.fabItems.length?i("transition",{attrs:{name:"change",mode:"out-in"}},[a.showFab?i("div",{key:"open"},[i("van-icon",{attrs:{name:"cross"}})],1):i("div",{key:"close"},[i("van-icon",{attrs:{name:"ellipsis"}})],1)]):i("i",{staticClass:"iconfont",class:a.fabItems[0].icon||"iconjiahao",staticStyle:{"font-size":"var(--font_size_0)","font-weight":"bold"}})],1):a._e(),a._v(" "),1<a.fabItems.length?i("transition",{attrs:{name:"fade"}},[a.showFab?i("div",{staticClass:"fab-btns",on:{click:function(e){a.showFab=!a.showFab}}},a._l(a.fabItems,function(t,e){return i("div",{key:e,staticClass:"dsf-fab-item",on:{click:function(e){return a.clickItem(t)}}},[t.icon?i("i",{staticClass:"iconfont",class:t.icon}):a._e(),a._v(" "),i("span",[a._v(a._s(t[a.titleKey]))])])}),0):a._e()]):a._e()],1)},[],!1,null,"75ba6501",null).exports},32672:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return m}});var t=a(16257),i=a(25108),n={name:"selectLeader",props:{mainTab:{type:Object}},data:function(){return{postUrl:"/fn/ldrc/unit/getMobileLeaders",leaderList:[],checkedList:[],isChoodeAll:!1,isOpen:!0,chooseWeek:"current",leaderWeekSdate:"",leaderWeekEdate:"",currentWeekSdate:"",currentWeekEdate:"",lastNum:0,nextNum:0}},created:function(){this.getCurrentWeek()},mounted:function(){},watch:{mainTab:function(e){this.selectWeek("current")}},methods:{getCurrentWeek:function(){var e=(new Date).getTime(),t=(new Date).getDay()||7;this.currentWeekSdate=dsf.date.format(new Date(e-864e5*(t-1)),"yyyy-mm-dd"),this.currentWeekEdate=dsf.date.format(new Date(e+864e5*(7-t)),"yyyy-mm-dd")},init:function(e){var t=this;this.checkedList=[],this.dsf.http.post(e).then(function(e){200==e.data.code?t.leaderList=e.data.data.map(function(e){return e.isChecked=!1,e}):dsf.layer.toast("获取数据失败,请稍后再试")}).catch(function(e){return i.log(e)})},onClick:function(e,t){e.isChecked=!e.isChecked,this.checkedList.includes(e.id)?this.checkedList.splice(this.checkedList.indexOf(e.id),1):this.checkedList.push(e.id),this.isChoodeAll=this.checkedList.length==this.leaderList.length,this.$emit("selectLeader",{selectLeaderList:this.checkedList})},chooseAll:function(){var t=this;this.isChoodeAll=!this.isChoodeAll,this.checkedList=[],this.leaderList.forEach(function(e){e.isChecked=t.isChoodeAll,t.isChoodeAll&&t.checkedList.push(e.id)}),this.$emit("selectLeader",{selectLeaderList:this.checkedList})},selectWeek:function(e){"current"==(this.chooseWeek=e)?(this.lastNum=0,this.nextNum=0,this.leaderWeekSdate=this.currentWeekSdate,this.leaderWeekEdate=this.currentWeekEdate):"last"==e?(this.lastNum+=1,this.nextNum=0,this.leaderWeekSdate=dsf.date.format(dsf.date.parse(this.currentWeekSdate).getTime()-7*this.lastNum*24*60*60*1e3,"yyyy-mm-dd"),this.leaderWeekEdate=dsf.date.format(dsf.date.parse(this.currentWeekEdate).getTime()-7*this.lastNum*24*60*60*1e3,"yyyy-mm-dd")):"next"==e&&(this.nextNum+=1,this.lastNum=0,this.leaderWeekSdate=dsf.date.format(dsf.date.parse(this.currentWeekSdate).getTime()+7*this.nextNum*24*60*60*1e3,"yyyy-mm-dd"),this.leaderWeekEdate=dsf.date.format(dsf.date.parse(this.currentWeekEdate).getTime()+7*this.nextNum*24*60*60*1e3,"yyyy-mm-dd")),this.$emit("selectLeaderWeek",{leaderWeekSdate:this.leaderWeekSdate,leaderWeekEdate:this.leaderWeekEdate})}}},s=a(51900),n=(0,s.Z)(n,function(){var i=this,e=i._self._c;return e("div",{attrs:{id:"select-leader"}},[e("div",{staticStyle:{"background-color":"#f5f5f5",height:"0.2rem",width:"100vw"}}),i._v(" "),e("div",{staticClass:"content"},[i._l(i.leaderList,function(t,a){return[i.isOpen||!i.isOpen&&a<6?e("div",{key:t.id,staticClass:"item-container",class:t.isChecked?"color_active":"color_normal",on:{click:function(e){return i.onClick(t,a)}}},[e("span",[i._v(i._s(t.name||t.userName))]),i._v(" "),t.isChecked?e("div",{staticClass:"checked"},[e("van-icon",{staticClass:"success-icon",attrs:{name:"success"}})],1):i._e()]):i._e()]})],2),i._v(" "),6<i.leaderList.length?e("div",{staticClass:"row personChoose"},[e("span",{staticClass:"btn",on:{click:function(e){return i.chooseAll()}}},[i._v(i._s(i.isChoodeAll?"取消全选":"全选"))]),e("span"),i._v(" "),e("span",{staticClass:"btn",on:{click:function(e){i.isOpen=!i.isOpen}}},[i._v(i._s(i.isOpen?"收起":"展开"))])]):i._e(),i._v(" "),e("van-sticky",{attrs:{"offset-top":i.mainTab?i.dsf.util.getOffsetTop("1.76rem"):i.dsf.util.getOffsetTop("0.88rem")}},[e("div",{staticClass:"row timeChoose"},[e("span",{class:["btn",{"btn-active":"last"==i.chooseWeek}],on:{click:function(e){return i.selectWeek("last")}}},[i._v("上周")]),i._v(" "),e("span",{class:["btn",{"btn-active":"current"==i.chooseWeek}],on:{click:function(e){return i.selectWeek("current")}}},[i._v("本周")]),i._v(" "),e("span",{class:["btn",{"btn-active":"next"==i.chooseWeek}],on:{click:function(e){return i.selectWeek("next")}}},[i._v("下周")])])])],1)},[],!1,null,"4c6ffbf5",null).exports,r=a(5044),c=a(64830),o=a.n(c),l=a(90541),d=(a(95572),a(25108)),h=a(7739),c={name:"ScheduleList",props:{selectedDate:{type:String,default:""},week:{type:Array,default:function(){return[]}},month:{type:Array,default:function(){return[]}},currentTab:{type:Object,default:function(){}},hasSch:{type:Array,default:function(){return[]}},selectLeaderList:{type:Array,default:function(){return[]}},showType:{type:String,default:"week"},leaderWeek:{type:Array},curyear:{type:Number},curmonth:{type:Number}},data:function(){return{finished:!1,loading:!1,refreshing:!1,class:null,allClass:null,list:[],pageConfig:{pageNum:1,pageSize:20},screenHeight:"auto",previewUrl:"",hasRefresh:!0,types:["personal","leader"],leaderWeekLIst:[]}},computed:{dateRange:function(){return"week"==this.showType?this.week:this.month}},watch:{currentTab:{handler:function(e){"leader"==e.type?this.selectLeaderList.length?this.initfn(this.leaderWeek[0],this.leaderWeek[1]):(this.list=[],this.finished=!0):"week"==this.showType?this.initfn(this.week[0].date,this.week[6].date):this.initfn(moment("".concat(this.curyear,"-").concat(this.curmonth+1)).startOf("month").format("YYYY-MM-DD"),moment("".concat(this.curyear,"-").concat(this.curmonth+1)).endOf("month").format("YYYY-MM-DD"))},deep:!0},selectLeaderList:function(e){l.Z.config.homePage.schedule.defaultToday&&this.firstTabdata.scheduleShowPerson||(e.length?this.initfn(this.leaderWeek[0],this.leaderWeek[1]):(this.list=[],this.finished=!0))},leaderWeek:{handler:function(e){l.Z.config.homePage.schedule.defaultToday&&this.firstTabdata.scheduleShowPerson||(this.selectLeaderList.length?this.initfn(e[0],e[1],"leaderWeek"):(this.list=[],this.finished=!0))}},dateRange:function(e){"week"==this.showType?this.initfn(e[0].date,e[6].date):(e=moment(l.Z.date.format(new Date(this.curyear,this.curmonth,1),"yyyy-mm-dd")),this.initfn(e.startOf("month").format("YYYY-MM-DD"),e.endOf("month").format("YYYY-MM-DD")))},showType:function(e){}},activated:function(){},created:function(){var e=this;this.$eventBus.OnRefreshSchedule(this,function(){e.selectedDate?e.initfn(e.selectedDate):e.initfn(e.week[0].date,e.week[6].date)}),d.log(8465444)},methods:{onLoad:function(e){},goForm:function(e){"180719094152MnF6C2hEPtqIvhjJIxo"==e.moduleId&&(d.log(e),e.sourceModuleId?(this.$router.push({path:"/commonForm/".concat(e.sourceModuleId,"/").concat(e.sourceInfoId),query:{listId:e.listId,method:e.method,type:e.type,validateByList:e.validateByList}}),d.log(e.validateByList)):(e.agendaId||e.id||e.pk)&&(this.currentTab.params&&"personal"==this.currentTab.params.type?this.$router.push({name:"commonForm",params:{pk:e.agendaId||e.id||e.pk,moduleId:e.moduleId}}):this.$router.push({path:"/commonForm/".concat(e.moduleId,"/").concat(e.agendaId||e.id||e.pk),query:{method:"info",listId:"1807311741357weRO9ArLPr1orXgSB8"}})))},initfn:function(e,t,a){var i;!("week"==this.showType&&e==moment().startOf("week").add(1,"d").format("YYYY-MM-DD")||"month"==this.showType&&e==moment().startOf("month").format("YYYY-MM-DD"))||e==t||null!=(i=l.Z.config.homePage.schedule)&&i.allWeekOrMonth||(e=moment().format("YYYY-MM-DD")),t=t||e,this.$user||(this.$user=l.Z.util.loadLocalStore("user")),this.$user||l.Z.util.loadSessionStore("user")?(e||t)&&(i={},i="leader"==this.currentTab.type||this.currentTab.params&&"other"==this.currentTab.params.type?{sdate:e,edate:t,leaderIds:this.selectLeaderList.join(",")}:{sdate:e,edate:t,unitId:this.$user.unitId,requestEnv:"mobile",MODULE_ID:this.currentTab.params.MODULE_ID,type:this.currentTab.params.type,leaderId:0,dept:""},this.loadData(i,a)):this.dsf.layer.toast("用户丢了, 快去登录")},loadData:function(e,t){this.list=[],this.loading=!0,this.finished=!1;var a=this.currentTab.url;"leader"==this.currentTab.type?(a=this.currentTab.dataUrl,e.userIds=e.leaderIds,this.list=[]):this.currentTab.params&&"other"==this.currentTab.params.type&&(a=this.currentTab.url,e.userIds=e.leaderIds,this.list=[]),this.getData(a,e,t)},getData:function(e,t,a){var n=this;return l.Z.http.post(e,t).then(function(e){var i;"success"===e.data.type?(e=e.data.data,i=[],n.list=[],e.forEach(function(t){var e,a;t.schedule&&0<t.schedule.length&&(e=[],i.push(t.date),t.schedule.map(function(e){e.date=moment(t.date).format("MM-DD"),e.sdate=t.date,e.edate=t.date}),e=n.currentTab.params&&"leader"==n.currentTab.params.type?h(t.schedule,function(e){return e.attendant}):h(t.schedule,function(e){return e.userName}),n.isWeekOrMonth()&&n.selectedDate?(a=n.list).push.apply(a,(0,r.Z)(o()(e))):(a=n.list).push.apply(a,(0,r.Z)(o()(e))))}),t.sdate!==t.edate&&"date"==n.currentTab.type&&n.$emit("update:hasSch",i),n.refreshing=!1,n.finished=!0,n.loading=!1,setTimeout(function(){"leaderWeek"==a?window.scroll(0,document.getElementById("select-leader").offsetHeight):"date"==n.currentTab.type&&window.scroll(0,0)},50)):(n.finished=!0,n.dsf.layer.toast("数据请求失败，请稍后再试"))}).catch(function(e){n.finished=!0,d.log("接口请求失败 错误码:".concat(e))}).always(function(){n.refreshing=!1,n.loading=!1,0==n.list.length&&(n.screenHeight=document.documentElement.clientHeight-180)})},isWeekOrMonth:function(){var t=!1;return"week"==this.showType?this.week.filter(function(e){return e.isToday}).length&&"day"==this.currentTab.getDataType&&(t=!0):this.month.forEach(function(e){e.forEach(function(e){e.isToday&&(t=!0)})}),t},transTemplate:function(e,t){return l.Z.util.getReplaceUrl(e,t)}}},c=(0,s.Z)(c,function(){var i=this,n=i._self._c;return n("div",{staticClass:"ds_funList"},[n("div"),i._v(" "),n("van-list",{ref:"list",staticClass:"list_wrap",attrs:{finished:i.finished,"immediate-check":!1,offset:10},on:{load:i.onLoad},model:{value:i.loading,callback:function(e){i.loading=e},expression:"loading"}},[0<i.list.length?n("div",{staticClass:"item_box",attrs:{slot:"default"},slot:"default"},i._l(i.list,function(e,t){return n("div",{key:t,staticClass:"item flex jb"},[n("div",{staticStyle:{width:"100%"}},[i.currentTab.showTemplate?[n("div",{staticClass:"title"},[n("span",{staticClass:"point"}),i._v(" "),n("span",[i._v(i._s(i.transTemplate(i.currentTab.showTemplate.title,e[0])))])]),i._v(" "),i._l(e,function(a,e){return n("div",{key:"sch_".concat(e),staticClass:"info_box fontcolor fontsmallSize",on:{click:function(e){return i.goForm(a)}}},i._l(i.currentTab.showTemplate.content,function(e,t){return n("div",{key:"col_".concat(t)},[i._v("\n                                "+i._s(i.transTemplate(e,a))+"\n                            ")])}),0)})]:[n("div",{staticClass:"title"},[n("span",{staticClass:"point"}),i._v(" "),n("span",[i._v(i._s(e[0].date)+" "+i._s(e[0].userName||e[0].attendant))])]),i._v(" "),i._l(e,function(t,e){return n("div",{key:"sch_".concat(e),staticClass:"info_box fontcolor fontsmallSize",on:{click:function(e){return i.goForm(t)}}},[n("div",[i._v("\n                                "+i._s(t.time)+" "+i._s(t.content)+"\n                            ")]),i._v(" "),t.place?n("div",[i._v("\n                                地点："+i._s(t.place)+"\n                            ")]):i._e(),i._v(" "),!t.attendant||i.currentTab.params&&"leader"==i.currentTab.params.type?i._e():n("div",[i._v("\n                                参与人员："+i._s(t.attendant)+"\n                            ")])])})]],2)])}),0):i._e()]),i._v(" "),0==i.list.length&&i.finished?n("commonempty"):i._e()],1)},[],!1,null,null,null).exports,u=a(21864),f=a(25108),a={name:"ScheduleCenter",props:["tabKey"],components:{ScheduleList:c,timePicker:t.Z,dsfFab:u.Z,SelectLeader:n},filters:{privilegeShow:function(e){}},data:function(){return{endSliderCallBack:null,activeBgcolor:"#FF6A00",activeTextcolor:"#FFFFFF",todayDotcolor:"#FFFFFF",startNumber:1,clickMode:"month",cancelChecked:!1,havaSch:[],listData:[],notHavedata:!1,selectedDate:null,week:[],month:[],addUrl:"/commonForm/".concat(dsf.config.scheduleCenter.commonListModuleId),addBtn:[{icon:"iconjiahao",title:"新增",type:"go",url:"",action:""}],tabConfig:null,currentTab:null,selectLeaderList:[],leaderWeek:[],defaultShowType:"week",curyear:null,curmonth:null,mainTab:null}},mounted:function(){this.addBtn[0].url=this.getUrl},activated:function(){this.$refs.timePicker.toggleShowType("week")},created:function(){this.init()},computed:{getUrl:function(){return this.addUrl+"?defaultDate="+(this.selectedDate||moment().format("YYYY-MM-DD"))}},watch:{mainTab:function(e){e.tabItems.find(function(e){return"leader"==e.type})&&this.$refs.leaderSelect.init(e.tabItems.find(function(e){return"leader"==e.type}).url)},getUrl:function(){this.addBtn[0].url=this.getUrl}},methods:{init:function(){var a=this,e=this.tabKey||this.$route.params.key||"default";this.tabConfig=dsf.config.homePage.schedule[e],this.tabConfig.tabItems.forEach(function(t,e){!t.privilege||(dsf.util.loadSessionStore("user")?dsf.util.loadSessionStore("user").privileges:[]).filter(function(e){return e.name==t.privilege}).length?t.privilegeShow=!0:t.privilegeShow=!1,t.tabItems&&t.tabItems.length&&t.tabItems.forEach(function(e,t){e.isActive=0==t}),t.tabItems||(0==e&&(a.currentTab=t),"leader"==t.type&&a.$nextTick(function(){a.$refs.leaderSelect.init(t.url),a.leaderWeek.length||a.$refs.leaderSelect.selectWeek("current")})),t.tabItems&&t.tabItems.length&&0==e&&(a.currentTab=t.tabItems[0])})},mainTabClick:function(e,t){var a=this,i=(this.timePickerResize(),this.tabConfig.tabItems.filter(function(e){return e.tabname==t})[0]);i.active=0,i.tabItems&&i.tabItems.length?(this.currentTab=i.tabItems[0],i.tabItems.forEach(function(e,t){e.isActive=0==t}),this.mainTab=i,this.selectLeaderList=[]):this.currentTab=i,this.cancelChecked=!0,this.selectedDate="","date"==this.currentTab.type&&(this.week.filter(function(e){return e.isToday}).length&&"day"==this.currentTab.getDataType?(dsf.config.homePage.schedule.defaultToday&&this.$refs.timePicker.checkedDate==dsf.date.format(new Date,"yyyy-mm-dd")?this.$refs.timePicker.dateClick({date:this.$refs.timePicker.checkedDate}):this.$refs.timePicker.toggleShowType("week"),this.currentTab.params&&"other"==this.currentTab.params.type&&dsf.http.post("/fn/scheduleList/queryMobileShare").then(function(e){200==e.data.code?a.selectLeaderList=e.data.data.map(function(e){return e.id}):dsf.layer.toast("获取数据失败,请稍后再试")}).catch(function(e){return f.log(e)})):dsf.config.homePage.schedule.defaultToday&&setTimeout(function(){a.$refs.timePicker.dateClick({date:a.$refs.timePicker.checkedDate})},470)),"leader"==this.currentTab.type&&(window.scroll(0,0),this.leaderWeek.length||this.$refs.leaderSelect.selectWeek("current"))},itemTabClick:function(t,a){var i=this;this.tabConfig.tabItems.forEach(function(e){e.tabname==t.tabname&&e.tabItems&&e.tabItems.length&&e.tabItems.forEach(function(e){e.tabname==a.tabname?(e.isActive=!0,i.currentTab=e):e.isActive=!1})}),this.cancelChecked=!0,this.selectedDate="","date"==this.currentTab.type?(this.week.filter(function(e){return e.isToday}).length&&"day"==this.currentTab.getDataType?dsf.config.homePage.schedule.defaultToday&&this.$refs.timePicker.checkedDate==dsf.date.format(new Date,"yyyy-mm-dd")?setTimeout(function(){i.$refs.timePicker.dateClick({date:i.$refs.timePicker.checkedDate})},200):this.$refs.timePicker.toggleShowType("week"):dsf.config.homePage.schedule.defaultToday&&setTimeout(function(){i.$refs.timePicker.dateClick({date:i.$refs.timePicker.checkedDate})},200),this.currentTab.params&&"other"==this.currentTab.params.type&&dsf.http.post("/fn/scheduleList/queryMobileShare").then(function(e){200==e.data.code?i.selectLeaderList=e.data.data.map(function(e){return e.id}):dsf.layer.toast("获取数据失败,请稍后再试")}).catch(function(e){return f.log(e)})):"leader"!=this.currentTab.type||this.leaderWeek.length||this.$refs.leaderSelect.selectWeek("current")},thisWeek:function(t){var a=this,e=1<arguments.length&&void 0!==arguments[1]&&arguments[1];this.timePickerResize(),this.week=t,e&&this.$refs.timePicker.reGetprev_now_next(t[0].date),this.$nextTick(function(){var e=t.filter(function(e){return e.date==a.$refs.timePicker.checkedDate});e.length&&"day"==a.currentTab.getDataType&&"week"==a.defaultShowType?(a.$refs.timePicker.defaultDateShow(e[0]),a.selectedDate=e[0].date):a.selectedDate=""})},thisMonth:function(e){var i=this;this.timePickerResize(),this.month=e,this.$nextTick(function(){var t=!1,a="";e.forEach(function(e){e.forEach(function(e){e.isToday&&(t=!0,a=e)})}),t&&"day"==i.currentTab.getDataType&&"month"==i.defaultShowType?(i.$refs.timePicker.defaultDateShow(a),i.selectedDate=a.date):i.selectedDate=""})},checkedDate:function(e){var t=this;this.cancelChecked=!1,this.selectedDate=e,this.$nextTick(function(){""!=e?t.listGetData(e,e):"week"==t.defaultShowType?t.listGetData(t.week[0].date,t.week[6].date):t.listGetData(moment("".concat(t.curyear,"-").concat(t.curmonth+1)).startOf("month").format("YYYY-MM-DD"),moment("".concat(t.curyear,"-").concat(t.curmonth+1)).endOf("month").format("YYYY-MM-DD"))})},toaddScheduleAdd:function(){dsf.config.scheduleCenter.isCommonList?this.$router.push({path:"/commonForm/".concat(dsf.config.scheduleCenter.commonListModuleId)}):this.$router.push({path:"/scheduleAdd"})},selectLeader:function(e){this.selectLeaderList=e.selectLeaderList},selectLeaderWeek:function(e){this.leaderWeek=[e.leaderWeekSdate,e.leaderWeekEdate],f.log(this.$refs.leaderSelect.$el.offsetHeight)},toggleShowType:function(e){var t=this,a=(this.timePickerResize(),e[0]),e=e[1],i=(this.defaultShowType=a,this.$refs.timePicker.checkedDate),n=i?this.month.filter(function(e){return e.find(function(e){return e.date==i})})[0]:this.week;"week"==a?dsf.config.homePage.schedule.defaultToday?(this.thisWeek(n,e),setTimeout(function(){t.$refs.timePicker.dateClick({date:t.$refs.timePicker.checkedDate})},100)):this.thisWeek(n,e):dsf.config.homePage.schedule.defaultToday?(this.thisMonth(this.month),setTimeout(function(){t.$refs.timePicker.dateClick({date:t.$refs.timePicker.checkedDate})},100)):this.thisMonth(this.month)},listGetData:function(e,t){this.$refs.list.initfn(e,t)},timePickerResize:function(){var e=this;this.$store.state.isShowAppHeader&&this.$nextTick(function(){var t=10;e.$refs.sticky.$children.forEach(function(e){t+=e.$el.offsetHeight}),e.$refs.sticky.$el.style.height=t+"px"})}}},m=(0,s.Z)(a,function(){var i=this,n=i._self._c;return n("div",{staticClass:"ds-schedule"},[n("keep-alive",[n("div",{staticClass:"tab_box"},[n("van-sticky",{ref:"sticky",staticClass:"sticky",attrs:{"offset-top":i.dsf.util.getOffsetTop()}},[1<i.tabConfig.tabItems.length?n("van-tabs",{attrs:{ellipsis:!1},on:{click:i.mainTabClick}},[i._l(i.tabConfig.tabItems,function(a,e){return[a.privilegeShow?n("van-tab",{key:e,attrs:{title:a.tabname}},[n("div",{staticClass:"tab_title",attrs:{slot:"title"},slot:"title"},[i._v(i._s(a.tabname))]),i._v(" "),n("div",{staticClass:"tab_content",attrs:{slot:"default"},slot:"default"},[a.tabItems&&a.tabItems.length?n("van-tabs",{ref:"subTabs",refInFor:!0,on:{click:function(e){return i.timePickerResize()}},model:{value:a.active,callback:function(e){i.$set(a,"active",e)},expression:"item.active"}},i._l(a.tabItems,function(t,e){return n("van-tab",{key:e,attrs:{title:t.tabname}},[n("div",{staticClass:"tab_title",attrs:{slot:"title"},on:{click:function(e){return i.itemTabClick(a,t)}},slot:"title"},[i._v("\n                      "+i._s(t.tabname)+"\n                    ")]),i._v(" "),n("div",{staticClass:"tab_content",attrs:{slot:"default"},slot:"default"})])}),1):i._e()],1)]):i._e()]})],2):i._e(),i._v(" "),n("time-picker",{directives:[{name:"show",rawName:"v-show",value:"date"==i.currentTab.type,expression:"currentTab.type == 'date'"}],ref:"timePicker",attrs:{"end-slider-call-back":i.endSliderCallBack,"active-bgcolor":i.activeBgcolor,"active-textcolor":i.activeTextcolor,"today-dotcolor":i.todayDotcolor,"start-number":i.startNumber,"click-mode":i.clickMode,"hava-sch":i.havaSch,"cancel-checked":i.cancelChecked,curyear:i.curyear,curmonth:i.curmonth},on:{"update:havaSch":function(e){i.havaSch=e},"update:hava-sch":function(e){i.havaSch=e},"update:curyear":function(e){i.curyear=e},"update:curmonth":function(e){i.curmonth=e},thisWeek:i.thisWeek,thisMonth:i.thisMonth,checkedDate:i.checkedDate,toggleShowType:function(e){return i.toggleShowType(arguments)}}})],1),i._v(" "),n("div",[n("select-leader",{directives:[{name:"show",rawName:"v-show",value:"leader"==i.currentTab.type,expression:"currentTab.type == 'leader'"}],ref:"leaderSelect",attrs:{"main-tab":i.mainTab},on:{selectLeader:i.selectLeader,selectLeaderWeek:i.selectLeaderWeek}}),i._v(" "),n("schedule-list",{ref:"list",attrs:{week:i.week,month:i.month,"has-sch":i.havaSch,"selected-date":i.selectedDate,"current-tab":i.currentTab,"select-leader-list":i.selectLeaderList,"leader-week":i.leaderWeek,showType:i.defaultShowType,curyear:i.curyear,curmonth:i.curmonth},on:{"update:hasSch":function(e){i.havaSch=e},"update:has-sch":function(e){i.havaSch=e}}})],1),i._v(" "),n("dsf-fab",{directives:[{name:"show",rawName:"v-show",value:i.currentTab.isShowAddIcon,expression:"currentTab.isShowAddIcon"}],attrs:{"fab-items":i.addBtn},on:{clickItem:function(e){return i.btnAction("aaa")}}})],1)])],1)},[],!1,null,"27c7a017",null).exports},64830:function(e,t,a){e.exports=a(48056)}}]);