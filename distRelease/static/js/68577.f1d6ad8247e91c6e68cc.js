"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[68577],{41775:function(t,e,n){n.d(e,{Z:function(){return c}});n(23307);var e=n(81392),o=n(26243),a=n.n(o),o=n(79529),l=n.n(o),o=n(46297),s=n(84628),i=n(50856),r=n(25108),o={components:{DsCard:o.Z,DsButtonGroup:s.Z,DsButtonToolbox:i.Z,Icon:e.Z},props:{tabObj:{type:Object},data:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},type:{type:String},keyColumn:{type:String},formMethod:{type:String},isHiddenBtn:{type:Boolean,default:function(){}}},data:function(){return{}},created:function(){},computed:{aSubTitles:function(){return r.log(this.columns.filter(function(t){return/^subTitle\w?$/i.test(t.showCategory)})),this.columns.filter(function(t){return/^subTitle\w?$/i.test(t.showCategory)})},bSubTitles:function(){return this.columns.filter(function(t){return/^content$/i.test(t.showCategory)})},needTitles:function(){return this.columns.filter(function(t){return/^needTitle\w?$/i.test(t.showCategory)})},titleIcon:function(){return this.columns.filter(function(t){return/^titleIcon\w?$/i.test(t.showCategory)})}},mounted:function(){r.log(this.bSubTitles)},methods:{isShowColumn:function(t,e){return e.dataValue[t.showMetaColumn]||0===e.dataValue[t.showMetaColumn]},isShowListBtn:function(t){var e=null==this.isHiddenBtn,n=!1,n=!(!t.buttons||!(t.buttons.commonButtons&&0<t.buttons.commonButtons.length||t.buttons.mainButtons&&0<t.buttons.mainButtons.length));return e&&n},link:function(t){var e,n,o,a;t.dataValue.allowMobile&&1!=t.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):("isRead"in t.dataValue&&!t.dataValue.isRead&&(t.dataValue.isRead=!0),e=(t=t.dataValue)[this.keyColumn]||t.info_id||t.id||t.A0001||t.fid||t["SW_XZD.A0001"],n=this.keyColumn?this.keyColumn.split(".")[0]+".A0004":"",n=t.moduleId||t.A0004||t["SW_XZD.A0004"]||t[n],"db"==this.type&&(n=t.masterModuleId||t.moduleId||t.A0004),a=t.masterId||"",n=n+"/"+e,o={},"gw"==this.type&&(n+="/1",o.todoId=t.todoId),this.type&&(n+="?type=".concat(this.type)),"SigninList"==this.$route.name&&(n+="?&listId=1903161124289nXBk8iVSmTMGYxn9bi&exchangeList=signedList"),"db"==this.type&&(a&&(n+="&masterId=".concat(a)),r.log(this.formMethod),this.formMethod)&&(n+="&formMethod=info"),"dy"==this.type&&(n+="&distribId=".concat(t.distribId),dsf.http.post("fn/mobileToRead/markRead",{pks:t.distribId}).then(function(t){r.log(t)})),this.tabObj&&this.tabObj.targetUrl?(a=this.tabObj.targetUrl.replace("[pk]",e),this.$router.push({path:a})):this.$router.push({path:"/commonForm/"+n,query:o}))},getTitle:function(){return this.columns.find(function(t){return"mainTitle"===t.showCategory})||{}},handleCommonClick:function(t,e,n){e.dataValue.allowMobile&&1!=e.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):this.$emit("commonClick",t,e,n)},handleMainClick:function(t,e,n){e.dataValue.allowMobile&&1!=e.dataValue.allowMobile?dsf.layer.toast("该文件只能在电脑端处理"):this.$emit("mainClick",t,e,n)},titleIconColor:function(t,e){t=t.dataValue[e.showMetaColumn].substr(0,1);return dsf.config.listTitleIcon&&-1<a()(dsf.config.listTitleIcon).indexOf(t)?(e=dsf.config.listTitleIcon[t],{backgroundColor:this.colorRgba(e,.12),color:e,borderColor:e}):""},colorRgba:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,n=t.toLowerCase();if(n&&/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(n)){if(4===n.length){for(var o="#",a=1;a<4;a+=1)o+=n.slice(a,a+1).concat(n.slice(a,a+1));n=o}for(var s=[],i=1;i<7;i+=2)s.push(l()("0x"+n.slice(i,i+2)));return"rgba("+s.join(",")+","+e+")"}return n}}},c=(0,n(51900).Z)(o,function(){var o=this,a=o._self._c;return a("div",{staticClass:"ds-list"},[o._l(o.data,function(n,e){return a("div",{key:n.id||"item-".concat(e),staticClass:"ds-item"},[a("DsCard",["isRead"in n.dataValue&&!n.dataValue.isRead?a("span",{staticClass:"isStatus"}):o._e(),o._v(" "),"readStatus"in n.dataValue&&"2"!=n.dataValue.readStatus?a("span",{staticClass:"isStatus"}):o._e(),o._v(" "),n.dataValue[o.getTitle().showMetaColumn]?a("div",{class:{ellipsis:o.dsf.config.commonList&&o.dsf.config.commonList.titleEllipsis},attrs:{slot:"header"},on:{click:function(t){return o.link(n)}},slot:"header"},[a("span",{class:{"col-title":"isRead"in n.dataValue&&!n.dataValue.isRead||"readStatus"in n.dataValue&&"2"!=n.dataValue.readStatus},style:{color:o.getTitle().color||"","word-wrap":"break-word","word-break":"break-all"}},[o._v("\n                "+o._s(n.dataValue[o.getTitle().showMetaColumn]))])]):o._e(),o._v(" "),a("div",{staticClass:"content",attrs:{slot:"content"},on:{click:function(t){return o.link(n)}},slot:"content"},[o._t("item-content",function(){return[a("div",{staticClass:"flex1"},[0<o.aSubTitles.length?a("div",{staticClass:"aSubTitles"},[o._l(o.aSubTitles,function(t,e){return[o.isShowColumn(t,n)?a("div",{key:"aSubTitles-".concat(e),staticClass:"subTitle"},[t.icon?a("Icon",{class:["iconfont",t.icon]}):o._e(),o._v(" "),a("span",{staticClass:"label",style:{color:t.color}},[o._v(o._s(n.dataValue[t.showMetaColumn]))])],1):o._e()]})],2):o._e(),o._v(" "),0<o.bSubTitles.length?a("div",{staticClass:"bSubTitles"},[o._l(o.bSubTitles,function(t,e){return[o.isShowColumn(t,n)?a("div",{key:"bSubTitles-".concat(e),staticClass:"subTitle"},[t.icon?a("Icon",{class:["iconfont",t.icon]}):o._e(),o._v(" "),a("span",{class:["label","ds-elips-".concat(t.showRows||1)],style:{color:t.color}},[o._v(o._s(n.dataValue[t.showMetaColumn]))])],1):o._e()]})],2):o._e(),o._v(" "),0<o.needTitles.length?a("div",{staticClass:"needTitles"},[o._l(o.needTitles,function(t,e){return[o.isShowColumn(t,n)?a("div",{key:"needTitles-".concat(e),staticClass:"subTitle"},[a("span",{staticClass:"name label ellipsis"},[o._v(o._s(t.showName))]),o._v(" "),a("span",{staticClass:"label val elips",style:{color:t.color}},[o._v(o._s(n.dataValue[t.showMetaColumn]))])]):o._e()]})],2):o._e()]),o._v(" "),0<o.titleIcon.length?a("div",[o._l(o.titleIcon,function(t,e){return[o.isShowColumn(t,n)?a("div",{key:"titleIcon-".concat(e),staticClass:"moduleIcon",style:o.titleIconColor(n,t)},[a("span",[o._v(o._s(n.dataValue[t.showMetaColumn].substr(0,1)))])]):o._e()]})],2):o._e()]},{item:n}),o._v(" "),o._t("item-extend",null,{item:n})],2),o._v(" "),o.isShowListBtn(n)?a("div",{attrs:{slot:"footer"},slot:"footer"},[o._t("item-footer",function(){return[a("DsButtonToolbox",{attrs:{buttons:n.buttons||{},more:!0,size:"small"},on:{commonClick:function(t){o.handleCommonClick(t,n,e)},mainClick:function(t){o.handleMainClick(t,n,e)}}})]},{item:{}})],2):o._e()])],1)}),o._v(" "),o.data.length||o.$parent.loading?o._e():a("commonempty")],2)},[],!1,null,"7d9709ac",null).exports},46297:function(t,e,n){n.d(e,{Z:function(){return o}});var o=(0,n(51900).Z)({},function(t,e){return t("div",{staticClass:"ds-card"},[e._t("default"),e._v(" "),t("div",{staticClass:"tabspage"},[e.$slots.tabspageCheck?t("div",{staticClass:"tabspageCheck"},[e._t("tabspageCheck")],2):e._e(),e._v(" "),t("div",{staticStyle:{flex:"1",overflow:"hidden"}},[e.$slots.header?t("div",{staticClass:"ds-card-header"},[e._t("header")],2):e._e(),e._v(" "),e.$slots.content?t("div",{staticClass:"ds-card-content"},[e._t("content")],2):e._e()]),e._v(" "),e.$slots.rightIcon?t("div",{staticClass:"rightIcon"},[e._t("rightIcon")],2):e._e()]),e._v(" "),e.$slots.footer?t("div",{staticClass:"ds-card-footer"},[e._t("footer")],2):e._e(),e._v(" "),e.$slots.footermin?t("div",{staticClass:"ds-card-footer ds-card-footer2"},[e._t("footermin")],2):e._e()],2)},[],!0,null,"1b02e7ea",null).exports},5361:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var e=n(26243),a=n.n(e),e=n(62680),s=n.n(e),e=n(95366),i=n.n(e),e=n(6919),o=n.n(e),l=n(77193),r=n(5044),e=n(41775),c=n(9303),u=n(25108);function d(e,t){var n,o=a()(e);return s()&&(n=s()(e),t&&(n=n.filter(function(t){return i()(e,t).enumerable})),o.push.apply(o,n)),o}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach(function(t){(0,l.Z)(e,t,n[t])}):o()?Object.defineProperties(e,o()(n)):d(Object(n)).forEach(function(t){Object.defineProperty(e,t,i()(n,t))})}return e}var e={name:"postlist",components:{DsList:e.Z},mixins:[c.Z],data:function(){return{value:"",loading:!1,finished:!1,refreshing:!1,pararms:{fid:"2005150207380I5RX93RDNOcgQQfQS7",limit:15},isMaxLength:!1,list:[],columns:[{showCategory:"mainTitle",showMetaColumn:"bt"},{showCategory:"subTitle",showMetaColumn:"fk",icon:"iconfasongren_danwei1"},{showCategory:"subTitle",showMetaColumn:"ry",icon:"iconfl-renyuan"},{showCategory:"subTitle",showMetaColumn:"date",icon:"iconriqi"}]}},methods:{onSearch:function(t){u.log("console"),this.$router.push({path:"/search"})},onCancel:function(){Toast("取消")},handleActionClick:function(){var t=arguments[0];(this["action-".concat(t)]||function(){u.log("action-".concat(t))}).apply(void 0,(0,r.Z)(Array.prototype.slice.call(arguments,1)))},onhandleHttp:function(t){var e=this;dsf.http.post("fn/list/200517204724Bc2geU4UAO7ON2brZWB/mobile/q?moduleId=200113151945A52p5tF0hUVkN2RlogI&page=1&limit=100",this.pararms).done(function(t){var n;e.loading=!1,t&&(n=[],!t.datas&&0==t.datas.length||(t.datas.forEach(function(t,e){n.push({dataValue:{fid:t.dataValue["FW_XZD.A0001"],bt:t.dataValue["FW_XZD.B0001"],moduleId:t.dataValue["FW_XZD.A0004"],fk:t.dataValue["FW_XZD.A0005"],ry:t.dataValue["FW_XZD.B0009"],date:t.dataValue["FW_XZD.B0013"]},buttons:{commonButton:(0,r.Z)(t.buttons.commonButton),mainButtons:(0,r.Z)(t.buttons.mainButtons)}})}),e.list=[].concat(n),e.total=t.total,e.total<=e.list.length))&&(e.finished=!0)}).error(function(t){u.log("error",t),self.dsf.layer.toast("请求异常",!1)})},onLoad:function(){this.onhandleHttp(void 0),this.total&&(this.$set(this.pararms,"limit",this.pararms.limit+15),f(f({},this.pararms),{},{limit:this.pararms.limit+15}))},onRefresh:function(){u.log("onRefresh"),this.finished=!1,this.loading=!0,this.onLoad()}}},h=(0,n(51900).Z)(e,function(){var e=this,t=e._self._c;return t("div",{staticClass:"ds-postlist"},[t("van-search",{attrs:{"show-action":"",placeholder:"搜索"},on:{focus:e.onSearch,cancel:e.onCancel},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),e._v(" "),t("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.refreshing,callback:function(t){e.refreshing=t},expression:"refreshing"}},[t("van-list",{attrs:{finished:e.finished,offset:100,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[t("DsList",{attrs:{data:e.list,columns:e.columns},on:{mainClick:e.handleActionClick,commonClick:e.handleActionClick}})],1)],1)],1)},[],!1,null,"57b6649c",null).exports}}]);