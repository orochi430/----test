"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[86519],{86519:function(t,n,e){e.r(n),e.d(n,{default:function(){return i}});var n=e(18428),s=e.n(n),a=e(25108),n={name:"democracy_list",data:function(){return{keyword:"",list:""}},watch:{keyword:function(t,n){!t&&this.list&&(this.list.forEach(function(t){t.show=!0}),s()([],this.list))}},created:function(){this.getData()},methods:{getData:function(){var n=this,t=dsf.util.loadLocalStore("user").user_id;dsf.http.post("fn/DepartmentType/DemocraticEvaluation",{userId:t}).then(function(t){n.list=t.data,n.list.forEach(function(t){t.pcEnd=t.pcEnd.split(" ")[0],t.pcStart=t.pcStart.split(" ")[0],t.show=!0})})},onSearch:function(){var n=this;a.log("搜索了"),this.list.forEach(function(t){t.ndText.includes(n.keyword)?t.show=!0:t.show=!1}),this.list=s()([],this.list)}}},i=(0,e(51900).Z)(n,function(){var n=this,e=n._self._c;return e("div",{staticClass:"democracy_list"},[e("van-nav-bar",{attrs:{title:"民主测评","left-text":"返回","left-arrow":""},on:{"click-left":function(t){return n.$router.back()}}}),n._v(" "),e("van-search",{attrs:{"show-action":"",placeholder:"请输入搜索关键词"},on:{search:n.onSearch},scopedSlots:n._u([{key:"action",fn:function(){return[e("div",{on:{click:n.onSearch}},[n._v("搜索")])]},proxy:!0}]),model:{value:n.keyword,callback:function(t){n.keyword=t},expression:"keyword"}}),n._v(" "),n.list&&n.list.length?e("van-cell-group",n._l(n.list,function(t){return e("van-cell",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"items.show"}],key:t.id,attrs:{title:t.ndText,label:t.pcStart+" 至 "+t.pcEnd,to:{name:"democracyAssess",params:{scoringId:t.id,title:t.ndText,start:t.pcStart,end:t.pcEnd}}}})}),1):e("commonempty")],1)},[],!1,null,"11833caf",null).exports}}]);