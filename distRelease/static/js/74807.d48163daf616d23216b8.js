"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[74807],{74807:function(t,n,e){e.r(n),e.d(n,{default:function(){return d}});var n=e(26243),i=e.n(n),n=e(62680),a=e.n(n),n=e(95366),o=e.n(n),n=e(6919),s=e.n(n),r=e(522),l=e(77193),n=e(20629),c=e(25108);function u(n,t){var e,s=i()(n);return a()&&(e=a()(n),t&&(e=e.filter(function(t){return o()(n,t).enumerable})),s.push.apply(s,e)),s}function h(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?u(Object(e),!0).forEach(function(t){(0,l.Z)(n,t,e[t])}):s()?Object.defineProperties(n,s()(e)):u(Object(e)).forEach(function(t){Object.defineProperty(n,t,o()(e,t))})}return n}var n={name:"globalSearch",components:{},data:function(){var t;return{keyword:"",open:!0,showHistory:!0,list:[],finished:!1,loading:!1,refreshing:!1,page:1,limit:10,scrollPages:0,showDialog:!1,APP_NAME:"",APP_CODE:"",TITLE:"",WH:"",startDate:"",endDate:"",showCalendar:!1,RQ:"",searchList:[],menus:[],showMenu:!1,minDate:new Date(null!=(t=null==(t=dsf.config.commonList)||null==(t=t.searchDateSel)?void 0:t.minDate)?t:(new Date).getFullYear()-5,0,1)}},computed:h(h({},(0,n.rn)({isShowAppHeader:function(t){return t.isShowAppHeader}})),{},{maxDate:function(){var t=null==(t=dsf.config.commonList)||null==(t=t.searchDateSel)?void 0:t.maxDate;return t?"today"==t?new Date:new Date(t):void 0}}),watch:{},methods:{getAppMenu:function(){var n=this;dsf.http.get("fn/application/portal/authorizedApp").then(function(t){c.log("resss",t),n.menus=t.data.data})},setHis:function(t){var n,e;t&&((e=window.localStorage.getItem("searchHisStr"))?((e=e.split(",")).includes(t)?-1!==(n=e.indexOf(t))&&(e.splice(n,1),e.unshift(t)):e=[t].concat(e),window.localStorage.setItem("searchHisStr",e.join(","))):window.localStorage.setItem("searchHisStr",t),c.log(e))},onSearch:function(t){t||this.reflushVal(),this.showHistory=!1,this.doRefresh(),this.setHis(t)},onCancel:function(){this.reflushVal(),this.doRefresh()},onCancel1:function(){this.APP_CODE="",this.APP_NAME="",this.TITLE="",this.showDialog=!0},hisSearch:function(t){this.TITLE=t,this.doRefresh()},alive:function(t){this.scrollPages=t.target.scrollTop},close:function(){this.showDialog=!1},onConfirm:function(t){var t=(0,r.Z)(t,2),n=t[0],t=t[1];this.showCalendar=!1,this.startDate=moment(new Date(n)).format("YYYY-MM-DD"),this.endDate=moment(new Date(t)).format("YYYY-MM-DD"),this.RQ=this.startDate+" - "+this.endDate},doSearch:function(){this.showHistory=!1,this.showDialog=!1,this.doRefresh()},doRefresh:function(){this.list=[],this.page=1,this.finished=!1,this.refreshing=!0,this.loading=!0,this.onLoad()},onLoad:function(){var n=this;this.refreshing&&(this.list=[],this.page=1,this.refreshing=!1),dsf.http.post("fn/search/mobileQ",{RQ:this.RQ||"",WH:this.WH||"",appCode:this.APP_CODE||"",_content:this.TITLE||"",limit:this.limit,page:this.page}).then(function(t){t=t.data;t&&t.datas&&0<t.datas.length?n.list=n.list.concat(t.datas):n.finished=!0,t.datas.length<n.limit?n.finished=!0:n.page+=1}).catch(function(t){t=t.message;n.finished=!0,dsf.layer.toast(t)}).finally(function(){n.loading=!1,n.refreshing=!1})},go:function(t){dsf.config.login.enableAuthorize?t.mobileUrl?setTimeout(function(){dsf.middleground.openUrl({url:t.mobileUrl,title:t.APP_NAME,getCodeParams:{appCode:t.APP_CODE}})},100):dsf.layer.toast("请配置应用地址"):this.$router.push({path:"/commonForm/".concat(t.A0004,"/").concat(t.id,"?listId=searchFormView&method=view")})},reflushVal:function(){this.APP_CODE="",this.APP_NAME="",this.TITLE="",this.WH="",this.startDate="",this.endDate="",this.RQ=""},clearHis:function(){window.localStorage.getItem("searchHisStr",""),this.searchList=[]},openMenus:function(){this.getAppMenu(),this.showMenu=!0},menuConfirm:function(t){this.APP_NAME=t.appName,this.APP_CODE=t.appCode,this.showMenu=!1},menuCancel:function(){this.showMenu=!1}},created:function(){},mounted:function(){var t=window.localStorage.getItem("searchHisStr");t&&(this.searchList=t.split(",").splice(0,20))},activated:function(){var t=this.$route.query.keyword;t&&(this.TITLE=t,this.showHistory=!1)},destroyed:function(){}},d=(0,e(51900).Z)(n,function(){var e=this,s=e._self._c;return s("div",{staticClass:"globalSearch",style:{height:"calc(100vh - ".concat(e.dsf.util.getOffsetTop(),")")}},[s("van-nav-bar",{attrs:{"safe-area-inset-top":!0},scopedSlots:e._u([{key:"title",fn:function(){return[s("van-search",{attrs:{"show-action":"",placeholder:"请输入搜索关键词"},on:{search:e.onSearch,cancel:e.onCancel},scopedSlots:e._u([{key:"left-icon",fn:function(){return[s("van-icon",{staticStyle:{"font-weight":"bold"},attrs:{color:"#999",size:"18",name:"search"}})]},proxy:!0},{key:"action",fn:function(){return[s("span",{on:{click:e.onCancel1}},[e._v("筛选")])]},proxy:!0}]),model:{value:e.TITLE,callback:function(t){e.TITLE="string"==typeof t?t.trim():t},expression:"TITLE"}})]},proxy:!0}])}),e._v(" "),e.showHistory?s("div",{staticClass:"lists"},[s("div",{staticClass:"hisHeader"},[s("div",{staticClass:"histitle"},[s("span",[e._v("最近搜索")]),e._v(" "),s("p",{on:{click:function(t){e.open=!e.open}}},[s("span",[e._v("展开")]),e._v(" "),s("van-icon",{class:{open:e.open},attrs:{name:"arrow-down"}})],1)]),e._v(" "),s("span",{staticClass:"clear",on:{click:e.clearHis}},[e._v("清空")])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"hisList"},e._l(e.searchList,function(n){return s("p",{on:{click:function(t){return e.hisSearch(n)}}},[s("van-icon",{attrs:{name:"clock-o"}}),e._v(" "),s("span",[e._v(e._s(n))])],1)}),0)]):e._e(),e._v(" "),e.showHistory?e._e():s("div",{staticClass:"lists1"},[s("div",{staticClass:"listdiv"},[0!=e.list.length||e.loading?e._e():s("commonempty"),e._v(" "),s("van-list",{attrs:{finished:e.finished,"finished-text":""},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.list,function(n,t){return s("div",{key:t,staticClass:"dblist",on:{click:function(t){return e.go(n)}}},[n.APP_ICON?s("div",{staticClass:"sysicon"},[s("img",{attrs:{src:e.dsf.url.getWebPath(n.APP_ICON),alt:""}}),e._v(" "),s("span",[e._v(e._s(n.APP_NAME))])]):s("div",{staticClass:"sysicon"},[s("img",{attrs:{src:e.dsf.url.getWebPath("/static/images/shanxi/preSearch.png"),alt:""}}),e._v(" "),s("span",[e._v(e._s(n.APP_NAME))])]),e._v(" "),s("div",{staticClass:"texts"},[s("div",{staticClass:"tit",domProps:{innerHTML:e._s(n.B0001)}}),e._v(" "),s("div",{staticClass:"con",domProps:{innerHTML:e._s(n.FILECONTENT)}}),e._v(" "),s("div",{staticClass:"tim"},[s("p",[s("img",{attrs:{src:"static/images/platform/gs_icon2.png",alt:"",srcset:""}}),e._v(" "),s("span",[e._v(e._s(n.A0005))])]),e._v(" "),s("p",[n.WH?s("img",{attrs:{src:"static/images/platform/gs_icon5.svg",alt:"",srcset:""}}):e._e(),e._v(" "),n.WH?s("span",[e._v(e._s(n.WH))]):e._e()]),e._v(" "),s("p",[n.A0014?s("img",{attrs:{src:"static/images/platform/gs_icon3.png",alt:"",srcset:""}}):e._e(),e._v(" "),n.A0014?s("span",[e._v(e._s(n.A0014))]):e._e()])])])])}),0)],1)]),e._v(" "),s("van-popup",{style:{height:"80%"},attrs:{round:"",position:"bottom"},on:{close:e.close},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[s("div",{staticClass:"wrapSearch"},[s("div",{staticClass:"titles"},[s("van-icon",{attrs:{name:"arrow-down"},on:{click:function(t){e.showDialog=!1}}}),e._v(" "),s("span",[e._v("筛选")])],1),e._v(" "),s("div",{staticClass:"searchVal"},[s("div",[s("span",[e._v("应用")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.APP_NAME,expression:"APP_NAME",modifiers:{trim:!0}}],attrs:{type:"text",readonly:"",placeholder:"请选择"},domProps:{value:e.APP_NAME},on:{click:e.openMenus,input:function(t){t.target.composing||(e.APP_NAME=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),s("div",[s("span",[e._v("标题")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.TITLE,expression:"TITLE",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.TITLE},on:{input:function(t){t.target.composing||(e.TITLE=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),s("div",[s("span",[e._v("文号")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.WH,expression:"WH",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.WH},on:{input:function(t){t.target.composing||(e.WH=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),s("div",[s("span",[e._v("创建时间")]),e._v(" "),s("p",[s("span",{on:{click:function(t){e.showCalendar=!0}}},[s("label",[e._v(e._s(e.startDate))])]),e._v(" "),s("label"),e._v(" "),s("span",{on:{click:function(t){e.showCalendar=!0}}},[s("label",[e._v(e._s(e.endDate))])])])])]),e._v(" "),s("div",{staticClass:"buttomBtn"},[s("button",{staticClass:"refl",on:{click:e.reflushVal}},[e._v("重置")]),e._v(" "),s("button",{staticClass:"conf",on:{click:e.doSearch}},[e._v("确定")])])])]),e._v(" "),s("van-popup",{style:{height:"40%"},attrs:{position:"bottom",round:""},model:{value:e.showMenu,callback:function(t){e.showMenu=t},expression:"showMenu"}},[s("van-picker",{attrs:{title:"","show-toolbar":"",columns:e.menus},on:{confirm:e.menuConfirm,cancel:e.menuCancel},scopedSlots:e._u([{key:"option",fn:function(t){return[e._v("\n        "+e._s(t.appName)+"\n      ")]}}])})],1),e._v(" "),s("van-calendar",{attrs:{"min-date":e.minDate,"max-date":e.maxDate,type:"range"},on:{confirm:e.onConfirm},model:{value:e.showCalendar,callback:function(t){e.showCalendar=t},expression:"showCalendar"}})],1)},[],!1,null,"6dfbb4d0",null).exports},79156:function(t,n,e){e.d(n,{Z:function(){return i}});var s=e(78149);function i(t){if(s(t))return t}},26511:function(t,n,e){function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}e.d(n,{Z:function(){return s}})},522:function(t,n,e){e.d(n,{Z:function(){return o}});var s=e(79156),u=e(85579),h=e(22013);var i=e(33422),a=e(26511);function o(t,n){return(0,s.Z)(t)||function(t,n){var e=null==t?null:void 0!==u&&t[h]||t["@@iterator"];if(null!=e){var s,i,a,o,r=[],l=!0,c=!1;try{if(a=(e=e.call(t)).next,0===n){if(Object(e)!==e)return;l=!1}else for(;!(l=(s=a.call(e)).done)&&(r.push(s.value),r.length!==n);l=!0);}catch(t){c=!0,i=t}finally{try{if(!l&&null!=e.return&&(o=e.return(),Object(o)!==o))return}finally{if(c)throw i}}return r}}(t,n)||(0,i.Z)(t,n)||(0,a.Z)()}}}]);