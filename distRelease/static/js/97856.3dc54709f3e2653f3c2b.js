"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[97856],{97856:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});var a=n(25108);moment.locale("zh-cn");var e={name:"SDYCObserve",components:{},data:function(){return{activeNames:[],id:this.$route.params.id,data:[],currentIndex:0,curItem:{}}},computed:{},watch:{},methods:{showSchedule:function(t){return t=t.replace(/-/g,"/"),moment(t).format("YYYYMMDD")==moment(this.curItem.date).format("YYYYMMDD")},formatDate:function(t,e){return t?(t=t.replace(/-/g,"/"),"D"==e&&moment(new Date(t)).format("YYYYMMDD")==moment(new Date).format("YYYYMMDD")?"今天":dsf.date.format(new Date(t),e)):""},isOverTime:function(t){return t=t.replace(/-/g,"/"),(new Date).getTime()>=new Date(t).getTime()},changeItem:function(t){this.currentIndex=t,this.curItem=this.data[t]},loadData:function(){var e=this;this.data=[],this.$toast.loading("加载中"),dsf.http.post("/fn/sdycMeeting/mySites",{meetingId:this.id}).done(function(t){a.log(t),e.$toast.clear(),"success"==t.type&&(e.data=t.data,t=e.data.findIndex(function(t){return 0==t.passDate}),e.currentIndex=t=t<0?0:t,e.curItem=e.data[t],e.$nextTick(function(){var t=document.getElementById("tab-".concat(e.currentIndex));t&&t.scrollIntoView({behavior:"auto",block:"nearest",inline:"nearest"})}))})}},created:function(){this.loadData()},mounted:function(){},destroyed:function(){}},s=(0,n(51900).Z)(e,function(){var a=this,s=a._self._c;return s("div",{staticClass:"observe"},[s("div",{staticClass:"richeng"},a._l(a.data,function(t,e){return s("div",{key:e,class:{active:a.currentIndex==e,over:t.passDate},attrs:{id:"tab-".concat(e)},on:{click:function(t){return a.changeItem(e)}}},[s("span",[a._v(a._s(a.formatDate(t.date,"D")))]),a._v(" "),s("p",[a._v(a._s(a.formatDate(t.date,"yyyy-mm-dd")))])])}),0),a._v(" "),0<a.data.length?s("div",{staticClass:"guanmo"},[s("div",{staticClass:"inputs1"},[s("span",[a._v("观摩车辆")]),a._v(" "),s("p",[a._v(a._s(a.curItem.car_name))])]),a._v(" "),s("div",{staticClass:"inputs1"},[s("span",[a._v("车牌号")]),a._v(" "),s("p",[a._v(a._s(a.curItem.car_num))])]),a._v(" "),s("div",{staticClass:"inputs2"},[s("div",{staticClass:"title"},[a._v("联络员")]),a._v(" "),s("div",{staticClass:"nerr"},a._l(a.curItem.connect_user,function(t,e){return s("div",{key:"user"+e},[s("span",[a._v(a._s(t.username))]),a._v(" "),s("p",[s("span",[s("a",{attrs:{href:"tel:"+t.mobile}},[a._v(a._s(t.mobile))])]),a._v(" "),s("van-icon",{attrs:{name:"arrow"}})],1)])}),0)])]):a._e(),a._v(" "),0<a.data.length?s("div",{staticClass:"sites"},[s("div",{staticClass:"siteList"},a._l(a.curItem.sites,function(t,e){return s("div",{directives:[{name:"show",rawName:"v-show",value:a.showSchedule(t.start_time),expression:"showSchedule(item.start_time)"}],key:"site"+e,staticClass:"normal",class:{over:a.isOverTime(t.start_time)}},[s("div",{staticClass:"contain"},[s("span",[a._v(a._s(t.site_name))]),a._v(" "),t.trip?s("div",{staticClass:"collapsebox"},[s("van-collapse",{model:{value:a.activeNames,callback:function(t){a.activeNames=t},expression:"activeNames"}},[s("van-collapse-item",{attrs:{name:1+e},scopedSlots:a._u([{key:"title",fn:function(){return[s("div",{staticClass:"contain-box"},[s("span",{staticClass:"contain-time"},[a._v(a._s(a.formatDate(t.start_time,"hh:ii"))+"\n                      "+a._s(t.end_time?"-":"")+"\n                      "+a._s(a.formatDate(t.end_time,"hh:ii")))]),a._v(" "),t.row?s("p",{staticClass:"contain-seat"},[s("span",[a._v(a._s(t.row))]),a._v("排 "),s("span",[a._v(a._s(t.col))]),a._v("座\n                    ")]):a._e()])]},proxy:!0}],null,!0)},[a._v(" "),s("div",{staticClass:"content"},[a._v(a._s(t.trip))])])],1)],1):s("div",[s("span",[a._v(a._s(a.formatDate(t.start_time,"hh:ii"))+"\n              "+a._s(t.end_time?"-":"")+"\n              "+a._s(a.formatDate(t.end_time,"hh:ii")))]),a._v(" "),t.row?s("p",[s("span",[a._v(a._s(t.row))]),a._v("排 "),s("span",[a._v(a._s(t.col))]),a._v("座\n            ")]):a._e()])])])}),0)]):a._e(),a._v(" "),0==a.data.length?s("div",{staticClass:"nodata"},[s("img",{attrs:{src:n(32322),alt:"",srcset:""}}),a._v(" "),s("span",[a._v("暂无数据")])]):a._e()])},[],!1,null,null,null).exports},32322:function(t,e,a){t.exports=a.p+"static/img/wait.a522949..png"}}]);