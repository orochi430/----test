(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[11495],{85990:function(t){t.exports=function(t){return t}},31957:function(t,n,s){s="object"==typeof s.g&&s.g&&s.g.Object===Object&&s.g;t.exports=s},55639:function(t,n,s){var s=s(31957),i="object"==typeof self&&self&&self.Object===Object&&self,s=s||i||Function("return this")();t.exports=s},50361:function(t,n,s){var i=s(85990);t.exports=function(t){return i(t,5)}},23279:function(t,n,s){var b=s(13218),x=s(7771),C=s(14841),_=Math.max,y=Math.min;t.exports=function(i,s,t){var a,e,o,r,c,l,f=0,u=!1,h=!1,n=!0;if("function"!=typeof i)throw new TypeError("Expected a function");function d(t){var n=a,s=e;return a=e=void 0,f=t,r=i.apply(s,n)}function p(t){var n=t-l;return void 0===l||s<=n||n<0||h&&o<=t-f}function v(){var t,n=x();if(p(n))return g(n);c=setTimeout(v,(t=s-((n=n)-l),h?y(t,o-(n-f)):t))}function g(t){return c=void 0,n&&a?d(t):(a=e=void 0,r)}function m(){var t=x(),n=p(t);if(a=arguments,e=this,l=t,n){if(void 0===c)return f=t=l,c=setTimeout(v,s),u?d(t):r;if(h)return clearTimeout(c),c=setTimeout(v,s),d(l)}return void 0===c&&(c=setTimeout(v,s)),r}return s=C(s)||0,b(t)&&(u=!!t.leading,h="maxWait"in t,o=h?_(C(t.maxWait)||0,s):o,n="trailing"in t?!!t.trailing:n),m.cancel=function(){void 0!==c&&clearTimeout(c),a=l=e=c=void(f=0)},m.flush=function(){return void 0===c?r:g(x())},m}},13218:function(t){t.exports=function(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}},7771:function(t,n,s){var i=s(55639);t.exports=function(){return i.Date.now()}},14841:function(t){t.exports=function(t){return t}},67963:function(t,n,s){"use strict";s.r(n),s.d(n,{default:function(){return p}});var n=s(26243),a=s.n(n),n=s(62680),e=s.n(n),n=s(95366),o=s.n(n),n=s(6919),i=s.n(n),r=s(77193),c=s(50361),l=s(23279),n={name:"retrievalList",props:{finishedText:{type:String,default:"没有更多了"},list:{type:Array,default:function(){return[]}},mapping:{type:Object,default:function(){return null}}},data:function(){return{loading:!1,finished:!1,refreshing:!1,date:moment().format("YYYY-MM-DD")}},computed:{listMapping:function(){var s,i=this,t=this.mapping?(s=a()(this.mapping),(t=c(this.list)).map(function(n,t){s.forEach(function(t){n.hasOwnProperty(t)&&(n[i.mapping[t]]=n[t])})}),t):this.list;return t}},methods:{onRefresh:function(){this.finished=!1,this.loading=!0,l(this.load(),2e3)},load:function(){this.loading=!1,this.$emit("onLoad")}}},f=s(51900),n=(0,f.Z)(n,function(){var s=this,i=s._self._c;return i("div",{attrs:{id:"ds-list-box"}},[i("van-pull-refresh",{on:{refresh:s.onRefresh},model:{value:s.refreshing,callback:function(t){s.refreshing=t},expression:"refreshing"}},[i("van-list",{staticClass:"ds-list",attrs:{finished:s.finished,"immediate-check":!1,"finished-text":s.finishedText},on:{load:s.load},model:{value:s.loading,callback:function(t){s.loading=t},expression:"loading"}},s._l(s.listMapping,function(t,n){return i("div",{key:n,staticClass:"ds-result-list"},[i("p",[s._v(s._s(t.text||"暂无信息..."))]),s._v(" "),i("div",[i("p",{staticClass:"ds-result-icon ds-result-icon-left"},[i("span",{staticClass:"icon iconfont",class:t.icon||"iconGroup-"}),s._v(" "),i("span",[s._v(s._s(t.title||"收文"))])]),s._v(" "),i("p",{staticClass:"ds-result-icon ds-result-icon-right"},[i("span",{staticClass:"icon iconfont",class:t.icon||"iconrili"}),s._v(" "),i("span",[s._v(s._s(t.date||s.date))])])])])}),0)],1)],1)},[],!1,null,"366c5b41",null).exports,u=s(25108);function h(n,t){var s,i=a()(n);return e()&&(s=e()(n),t&&(s=s.filter(function(t){return o()(n,t).enumerable})),i.push.apply(i,s)),i}function d(n){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?h(Object(s),!0).forEach(function(t){(0,r.Z)(n,t,s[t])}):i()?Object.defineProperties(n,i()(s)):h(Object(s)).forEach(function(t){Object.defineProperty(n,t,o()(s,t))})}return n}var p=(0,f.Z)({name:"official",components:{List:n},data:function(){return{bgColor:"#ffffff",showCancel:!1,activeName:"search",officialLogs:[],tags:["测试1","测试2"],searchTypeList:[{text:"标题",icon:"iconbiaoti"},{text:"文号",icon:"iconyouxuliebiao"},{text:"正文内容",icon:"iconwj-zw"},{text:"审批意见",icon:"iconshenpi"},{text:"标签",icon:"iconbiaoqian"}],mapping:{},list:[],pararms:{page:1,limit:15,content:""},len:0,isMaxLength:!1}},mounted:function(){var t=dsf.util.loadLocalStore("officialLogs"),n=dsf.util.loadLocalStore("pararms");this.officialLogs=t||[],this.pararms=d(d({},this.pararms),n)},methods:{onLoad:function(){this.$set(this.pararms,"limit",this.pararms.limit+15);var t=d({},this.pararms);this.onhandleHttp(t)},clearSearchLogs:function(){this.officialLogs=[]},logSearch:function(t){this.$set(this.pararms,"content",t)},onSearch:function(t,n){var s,t=t.target.value;t&&(this.showCancel=!0,this.bgColor="#f8f8f7",(s=this.officialLogs).length<10||s.shift(),s.push(t),dsf.util.saveToLocalStore("officialLogs",s),t=d({},this.pararms),this.onhandleHttp(t))},onhandleHttp:function(t){var n=this;this.isMaxLength?self.dsf.layer.toast("已经到最后一页！"):dsf.http.post("fn/search/mobileQ",t).done(function(t){n.len==t.datas.length?n.isMaxLength=!0:(n.len=t.datas.length,n.list=t.datas,n.mapping={A0005:"title",B0001:"text",A0014:"date"})}).error(function(t){u.log("console",t)})},clearTags:function(t){u.log(t);var n=this;this.dsf.http.post("fn/search/mobileQ",this.pararms).done(function(t){t.data;n.dsf.layer.toast("请求成功",!0)}).error(function(t){u.log("console",t)}).always(function(t){t.data})},onCancel:function(){this.showCancel=!1,this.bgColor="#ffffff"}}},function(){var s=this,i=s._self._c;return i("div",{staticClass:"ds-search bgColor",style:{backgroundColor:s.bgColor}},[i("div",{directives:[{name:"show",rawName:"v-show",value:"search"===s.activeName,expression:"activeName === 'search'"}]},[s.showCancel?i("div",{staticClass:"ds-result"},[i("div",{staticClass:"ds-result-bg"}),s._v(" "),i("div",{staticClass:"ds-result-search"},[i("van-search",{attrs:{shape:"round",background:"#ffffff","show-action":"",placeholder:"搜索标题、文号、正文内容、标签"},on:{blur:s.onSearch,cancel:s.onCancel},model:{value:s.pararms.content,callback:function(t){s.$set(s.pararms,"content",t)},expression:"pararms.content"}})],1),s._v(" "),i("List",{attrs:{list:s.list,mapping:s.mapping},on:{onLoad:s.onLoad}})],1):i("div",{staticClass:"ds-search-box"},[i("van-search",{attrs:{offset:100,"show-action":s.showCancel,shape:"round",placeholder:"搜索标题、文号、正文内容、标签"},on:{search:s.onSearch,blur:s.onSearch,cancel:s.onCancel},model:{value:s.pararms.content,callback:function(t){s.$set(s.pararms,"content",t)},expression:"pararms.content"}}),s._v(" "),i("div",[i("div",{staticClass:"ds-search-log"},[i("p",[s._v("\n            最近查询\n            "),i("van-icon",{staticClass:"ds-search-log-icon",attrs:{name:"cross"},on:{click:s.clearSearchLogs}})],1),s._v(" "),i("ul",{staticClass:"ds-log ds-searchLogs"},s._l(s.officialLogs,function(n,t){return i("li",{key:t,staticClass:"van-ellipsis",on:{click:function(t){return s.logSearch(n)}}},[s._v("\n              "+s._s(n)+"\n            ")])}),0)]),s._v(" "),i("div",{staticClass:"ds-search-log"},[i("p",[s._v("常用标签")]),s._v(" "),i("div",{staticClass:"ds-log"},s._l(s.tags,function(t){return i("van-tag",{key:t,staticClass:"ds-tags",attrs:{closeable:"",size:"medium",type:"primary"},on:{close:function(t){return s.clearTags("primary")}}},[s._v("\n              "+s._s(t)+"\n            ")])}),1)]),s._v(" "),i("div",{staticClass:"ds-fix-bottom"},[i("van-row",{staticClass:"ds-search-bottom",attrs:{gutter:"10",type:"flex",justify:"center"}},[i("van-col",{attrs:{span:"7"}},[i("p",{staticClass:"ds-search-line"})]),s._v(" "),i("van-col",{attrs:{span:"10"}},[s._v("在这里可以搜索到")]),s._v(" "),i("van-col",{attrs:{span:"7"}},[i("p",{staticClass:"ds-search-line"})])],1),s._v(" "),i("ul",{staticClass:"ds-searchTypeList"},s._l(s.searchTypeList,function(t,n){return i("li",{key:n},[i("p",[i("span",{staticClass:"icon iconfont",class:t.icon})]),s._v("\n              "+s._s(t.text)+"\n            ")])}),0)],1)])],1)])])},[],!1,null,"42c672de",null).exports}}]);