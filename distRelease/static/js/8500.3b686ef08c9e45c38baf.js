"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[8500],{8500:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});var a=n(25108),e={components:{},data:function(){return{showViewer:!1,imgList:[],agendaInfo:null,agendaId:this.$route.params.agendaId,loading:null,meetingInfo:dsf.util.loadSessionStore("meeting")}},created:function(){this.init()},methods:{init:function(){var e=this;e.loading=dsf.layer.loading(),dsf.http.post("fn/peopleCongress/agendaDetails",{agendaId:e.agendaId}).done(function(t){"success"==t.type&&(e.agendaInfo=t.data)}).error(function(t){a.log("agendaDetails-err",t)}).always(function(){dsf.layer.closeLoading(e.loading)})},toSeats:function(t){var e,n=this;3==t.seatway?(e=dsf.url.getServerUrl("seatDesign/index.html#/mobileView/hw/".concat(t.id,"/").concat(t.meetingUserId)))?location.href=e:dsf.layer.toast("暂无数据！"):2==t.seatway&&t.seatImgUrl?(n.imgList=[],n.showViewer=!0,e=t.seatImgUrl,e=dsf.url.getServerUrl(e.substring(e.indexOf("/")+1,e.length)),n.imgList.push(e)):dsf.layer.toast("暂无数据！")}}},s=(0,n(51900).Z)(e,function(){var n=this,a=n._self._c;return n.agendaInfo?a("div",[a("div",[a("van-cell",{attrs:{title:n.agendaInfo.title}}),n._v(" "),a("van-cell",{scopedSlots:n._u([{key:"default",fn:function(){return[a("div",{staticClass:"content",domProps:{innerHTML:n._s(n.agendaInfo.content)}})]},proxy:!0}],null,!1,892160186)})],1),n._v(" "),a("div",{staticClass:"meeting-box",staticStyle:{"margin-top":"0.2rem"}},n._l(n.agendaInfo.meetings,function(e,t){return a("div",{key:t},[a("van-cell",{staticClass:"ac",attrs:{value:"".concat(n.dsf.date.format(e.startTime,"m-d"),"　").concat(n.dsf.date.format(e.startTime,"HH:ii"),"-").concat(n.dsf.date.format(e.endTime,"HH:ii")),title:"会场时间"}}),n._v(" "),a("van-cell",{staticClass:"ac",attrs:{value:e.position,title:"会场地址"}}),n._v(" "),a("van-cell",{staticClass:"ac",attrs:{value:e.seat,title:"会场座位"},scopedSlots:n._u([{key:"right-icon",fn:function(){return[a("span",{staticClass:"tag",on:{click:function(t){return n.toSeats(e)}}},[n._v("座位图")])]},proxy:!0}],null,!0)})],1)}),0),n._v(" "),a("van-image-preview",{attrs:{images:n.imgList,closeable:""},on:{close:function(t){n.imgList=[]}},model:{value:n.showViewer,callback:function(t){n.showViewer=t},expression:"showViewer"}})],1):n._e()},[],!1,null,"40c058b6",null).exports}}]);