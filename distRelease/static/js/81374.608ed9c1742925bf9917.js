"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[81374],{81374:function(t,a,n){n.r(a),n.d(a,{default:function(){return i}});var e=n(25108),a={name:"lawIndex",data:function(){return{isLoading:!0,content_active:"rule",keyword:"",last_law:[],catalogue_list:[]}},created:function(){this.getLawData(),this.getCatalogue()},methods:{getLawData:function(){var a=this;dsf.http.post("fn/flfgyd/flfgquery?yhid=".concat(dsf.util.loadSessionStore("user").user_id)).then(function(t){t=t.data;e.log(t),a.last_law=t.data,a.isLoading=!1})},getCatalogue:function(){var a=this;dsf.http.post("fn/flfgyd/flfgquerylmfl").then(function(t){t=t.data;e.log(t),a.catalogue_list=t.data,a.isLoading=!1})},skipToSearch:function(t,a,n){e.log(this.keyword),this.$router.push({path:"/catalogSearch",query:{index_obj:{type_value:t,wjjbvalue:n,gjzname:a}}})},skipToDetail:function(t){this.$router.push({path:"/contentDetail",query:{wjid:t.wjid,title:t.fbbt,from:"one"}}),e.log(t)}}},i=(0,n(51900).Z)(a,function(){var n=this,e=n._self._c;return e("div",{staticClass:"law_index"},[e("div",{staticClass:"header_search"},[e("img",{attrs:{src:"static/images/ghjoa/fa.png"}}),n._v(" "),e("div",{staticClass:"search"},[e("van-search",{attrs:{"show-action":"",placeholder:"请输入搜索关键词","left-icon":""},scopedSlots:n._u([{key:"action",fn:function(){return[e("div",{on:{click:function(t){return n.skipToSearch("",n.keyword)}}},[e("van-icon",{attrs:{name:"search",color:"#2291ff",size:"20"}})],1)]},proxy:!0}]),model:{value:n.keyword,callback:function(t){n.keyword=t},expression:"keyword"}})],1)]),n._v(" "),e("div",{staticClass:"content_part"},[e("h3",{staticClass:"text_color"},[e("span",{class:"rule"==n.content_active?"active":"not_active",on:{click:function(t){n.content_active="rule"}}},[n._v("最新法律法规")]),n._v(" "),e("span",{staticClass:"vertical_line"}),n._v(" "),e("span",{class:"catalog"==n.content_active?"active":"not_active",on:{click:function(t){n.content_active="catalog"}}},[n._v("目录分类")])]),n._v(" "),"rule"==n.content_active?e("van-pull-refresh",{on:{refresh:function(t){return n.getLawData()}},model:{value:n.isLoading,callback:function(t){n.isLoading=t},expression:"isLoading"}},[e("van-list",{attrs:{"finished-text":"没有更多了"}},n._l(n.last_law,function(a,t){return e("van-cell",{key:t,attrs:{title:a.fbbt,label:"发布单位：".concat(a.fbdw).concat(a.fbrq)},on:{click:function(t){return n.skipToDetail(a)}}})}),1)],1):e("van-pull-refresh",{on:{refresh:function(t){return n.getCatalogue()}},model:{value:n.isLoading,callback:function(t){n.isLoading=t},expression:"isLoading"}},[e("van-list",{attrs:{"finished-text":"没有更多了"}},n._l(n.catalogue_list,function(a,t){return e("van-cell",{key:t,attrs:{title:a.fjlxname,value:"数量：".concat(a.fjlxcount)},on:{click:function(t){return n.skipToSearch(a.fjlxname,"",a.fjlxvalue)}}})}),1)],1)],1),n._v(" "),e("div",{staticClass:"law_bottom text_color"},[n._m(0),n._v(" "),n._m(1),n._v(" "),e("div",{staticClass:"question",on:{click:function(t){return n.$router.push({path:"questionOnline"})}}},[e("img",{attrs:{src:"static/images/ghjoa/qa.png"}})])])])},[function(){var t=this,a=t._self._c;return a("p",{staticClass:"up down"},[a("img",{attrs:{src:"static/images/ghjoa/fa_name.png"}}),t._v(" "),a("span",[t._v("法律法规库")])])},function(){var t=this,a=t._self._c;return a("p",{staticClass:"down"},[a("span",{staticClass:"line"}),t._v(" "),a("span",{staticClass:"fs-16"},[t._v("上海市规划与自然资源局综合事务系统")]),t._v(" "),a("span",{staticClass:"line"})])}],!1,null,"61391d75",null).exports}}]);