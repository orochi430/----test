"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[81609],{34527:function(e,t,n){n.d(t,{Z:function(){return a}});var s=n(25108),t={name:"commonHead",components:{},props:{},data:function(){return{tabIndex:0,type:0,option:[],keyword:"",showDialog:!1,showSelect:!1,selected:0,selectList:[{name:"按名称",term:[{name:"从A到Z",orderType:1,reversed:!1,value:1},{name:"从Z到A",orderType:1,reversed:!0,value:2}]},{name:"更新时间",term:[{name:"从近到远",orderType:3,reversed:!1,value:3},{name:"从远到近",orderType:3,reversed:!0,value:4}]},{name:"创建时间",term:[{name:"从近到远",orderType:2,reversed:!1,value:5},{name:"从远到近",orderType:2,reversed:!0,value:6}]},{name:"文件大小",term:[{name:"从小到大",orderType:4,reversed:!1,value:7},{name:"从大到小",orderType:4,reversed:!0,value:8}]}]}},computed:{},watch:{},created:function(){},mounted:function(){this.getMenus()},methods:{showSearchBox:function(){this.$router.push({name:"diskSearch"})},getMenus:function(){var n=this;dsf.http.post("fn/cloud/file/getMenu",{},{headers:{"Content-Type":"application/json"}}).then(function(e){var t=e.status,e=e.data;s.log(e,t),200===t&&(e.data.forEach(function(e){e.text=e.name,e.value=e.type}),n.type=e.data[0].value,n.$store.commit("setMenuType",n.type),n.option=e.data)}).catch(function(e){e.message})},change:function(e){this.$store.commit("setMenuType",this.option[e].type)},closeSelect:function(){this.showSelect=!1},changeSelect:function(e){this.selected=e},resetSelect:function(){this.selected=2}}},a=(0,n(51900).Z)(t,function(){var n=this,s=n._self._c;return s("div",{staticClass:"commonHead"},[s("van-search",{attrs:{placeholder:"在全部文件中搜索","left-icon":"",readonly:"",clearable:!1},on:{click:n.showSearchBox},scopedSlots:n._u([{key:"left-icon",fn:function(){return[s("i",{staticClass:"iconfont iconsousuo i1",staticStyle:{color:"#989A9F"}})]},proxy:!0}]),model:{value:n.keyword,callback:function(e){n.keyword=e},expression:"keyword"}}),n._v(" "),s("div",[s("van-tabs",{attrs:{ellipsis:!1},on:{change:n.change},model:{value:n.tabIndex,callback:function(e){n.tabIndex=e},expression:"tabIndex"}},n._l(n.option,function(e,t){return s("van-tab",{key:t,attrs:{title:e.name}})}),1)],1),n._v(" "),s("van-popup",{attrs:{position:"bottom",round:"","get-container":"#app"},model:{value:n.showSelect,callback:function(e){n.showSelect=e},expression:"showSelect"}},[s("div",{staticClass:"select-contain"},[s("div",{staticClass:"checkbox"},[n._v("多选")]),n._v(" "),n._l(n.selectList,function(e,t){return s("div",{key:t,staticClass:"select-box"},[s("span",[n._v(n._s(e.name))]),n._v(" "),s("div",n._l(e.term,function(t,e){return s("p",{key:e,class:{active:n.selected==t.value},on:{click:function(e){return n.changeSelect(t.value)}}},[n._v(n._s(t.name))])}),0)])}),n._v(" "),s("div",{staticClass:"btn"},[s("div",{class:{reset:2!=n.selected},on:{click:n.resetSelect}},[n._v("重置")]),n._v(" "),s("div",{staticClass:"finish",on:{click:n.closeSelect}},[n._v("完成")])])],2)])],1)},[],!1,null,"74ae117e",null).exports},81609:function(e,t,a){a.r(t),a.d(t,{default:function(){return n}});var t={name:"outsideLink",components:{CommonHead:a(34527).Z},data:function(){return{moreSvg:a(38922),moreFileSvg:a(3145),company:0,option:[{text:"梦创双杨",value:0},{text:"新款商品",value:1},{text:"活动商品",value:2}],keyword:"",showDialog:!1,list:[],finished:!1,loading:!1,refreshing:!1,start:1,limit:15,show:!1}},computed:{},watch:{},methods:{onClickLeft:function(){this.$router.go(-1)},onLoad:function(){var t=this;setTimeout(function(){for(var e=0;e<10;e++)t.list.push(t.list.length+1);t.loading=!1,40<=t.list.length&&(t.finished=!0)},1e3)},doRefresh:function(e){this.keyword=e,this.page=1,this.list=[],this.finished=!1,this.loading=!0,this.onLoad()}},created:function(){},mounted:function(){},destroyed:function(){}},n=(0,a(51900).Z)(t,function(){var n=this,s=n._self._c;return s("div",{staticClass:"recycle"},[s("van-nav-bar",{attrs:{title:"回收站","left-text":"返回","left-arrow":""},on:{"click-left":n.onClickLeft},scopedSlots:n._u([{key:"right",fn:function(){return[s("van-image",{attrs:{width:"24",height:"24",src:n.moreSvg},on:{click:function(e){n.show=!0}}})]},proxy:!0}])}),n._v(" "),s("div",{staticClass:"commonHead"},[s("div",{staticClass:"title"},[n._v("外链管理")]),n._v(" "),s("div",{staticClass:"top"},[s("van-dropdown-menu",{attrs:{"active-color":"#3296fa"}},[s("van-dropdown-item",{attrs:{options:n.option},model:{value:n.company,callback:function(e){n.company=e},expression:"company"}})],1)],1)]),n._v(" "),s("div",{staticClass:"files"},[s("van-pull-refresh",{attrs:{disabled:n.finished},on:{refresh:n.doRefresh},model:{value:n.refreshing,callback:function(e){n.refreshing=e},expression:"refreshing"}},[s("van-list",{attrs:{finished:n.finished,"finished-text":""},on:{load:n.onLoad},model:{value:n.loading,callback:function(e){n.loading=e},expression:"loading"}},[s("div",{staticClass:"dongtai"},n._l(n.list,function(e,t){return s("div",{key:t,staticClass:"file"},[s("img",{staticClass:"icon",attrs:{src:a(84977),alt:"",srcset:""}}),n._v(" "),s("div",[s("p",[s("span",{staticClass:"ydq"},[n._v("孟旭在“【战略】一体")]),n._v(" "),s("span",[n._v("2022/01/05到期 7.8MB")])]),n._v(" "),s("van-image",{attrs:{src:n.moreFileSvg}})],1)])}),0)])],1)],1),n._v(" "),s("van-popup",{attrs:{closeable:"",round:"","close-icon":"close",position:"bottom"},model:{value:n.show,callback:function(e){n.show=e},expression:"show"}},[s("div",{staticClass:"paixu"},[s("span",{staticClass:"title"},[n._v("排序")]),n._v(" "),s("p",{staticClass:"buttons"},[s("span",{staticClass:"active"},[n._v("时间排序")]),n._v(" "),s("span",[n._v("名称排序")])]),n._v(" "),s("span",{staticClass:"title"},[n._v("操作")]),n._v(" "),s("p",{staticClass:"buttons"},[s("span",[n._v("多选")]),n._v(" "),s("span",{staticStyle:{color:"#e50012"}},[n._v("清空回收站")])])])])],1)},[],!1,null,"4b5e7f79",null).exports},3145:function(e,t,n){e.exports=n.p+"static/img/more-file.dcc4cb0..svg"},38922:function(e,t,n){e.exports=n.p+"static/img/more.c306a04..svg"},84977:function(e,t,n){e.exports=n.p+"static/img/logo_xizang.da06629..jpg"}}]);