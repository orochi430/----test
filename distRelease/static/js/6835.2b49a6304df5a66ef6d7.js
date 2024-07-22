"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[6835],{6835:function(t,e,i){i.r(e),i.d(e,{default:function(){return l}});var a=i(5044),n=i(66250),e=i(33453),r=i.n(e),o=i(25108),e={name:"ZHTabsComponents",props:{userId:{type:String},currentActive:{type:String}},watch:{currentActive:{handler:function(t,e){t&&this.initNoticeData()},deep:!0,immediate:!0}},data:function(){return{active:0,tabList:[],currentTabId:"",currentTabUrl:"",page:0,loading:!1,finished:!1,refreshing:!1,finishedTips:""}},mounted:function(){},computed:{minHeight:function(){var t=this.rows=32*dsf.config.ZHnews.showRows;return"min-height:".concat(t,"px")}},methods:{onRefresh:function(){this.finished=!1,this.loading=!0,this.onLoad()},onLoad:function(){this.refreshing&&(this.page=0,this.refreshing=!1),this.fetchData(),o.log(1)},fetchData:function(){var s=this;return(0,n.Z)(r().mark(function t(){var n,e;return r().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(n=s).page+=1,e=15*(n.page-1),o.log("start: ",e),o.log(111111111),t.next=7,dsf.http.post(n.currentTabUrl,{columnId:n.currentTabId,start:e,limit:15,userId:s.userId,"x-auth-token":dsf.util.loadSessionStore("loginToken")},{headers:{"Content-Type":"application/json"}}).then(function(t){var e,i;o.log("获取tab下面内容的res: ",t),200==t.status?(e=[],t.data.data.forEach(function(t){e.push({title:t.bt,time:t.fbsj,url:t.url,id:t.id,imgUrl:t.imageUrl})}),(i=n.tabList.find(function(t){return t.id==n.currentTabId})).data=[].concat((0,a.Z)(i.data),e),n.loading=!1,(t.data.data.length<15||0==t.data.data.length)&&(s.finished=!0,s.finishedTips="没有更多了")):dsf.layer.toast(t.data.message)}).catch(function(t){o.log("列表刷新接口报错err: ",t)});case 7:case"end":return t.stop()}},t)}))()},initNoticeData:function(){var i=this,n=this;dsf.http.post("fn/website/api/mobile/columnTabs",{columnId:"230810175020a83AibJsZNqUdeVNFvc,230824121807qGW0USYTzgWE21UFSwV",showRoot:"1",userId:this.userId,"x-auth-token":dsf.util.loadSessionStore("loginToken")},{headers:{"Content-Type":"application/json"}}).then(function(t){if(200==t.status){t.data.data.forEach(function(t){var e={};e.tagTitle=t.name,e.moreUrl=t.moreUrl,e.id=t.id,e.data=[],e.tabUrl="fn/website/api/mobile/getColumnContent",n.tabList.push(e)});for(var e=0;e<n.tabList.length;e++)n.tabList[e].id==n.currentActive&&(n.currentTabId=n.tabList[e].id,n.currentTabUrl=n.tabList[e].tabUrl,n.active=e,o.log("self.active: ",n.active),o.log("11111111111111",n.tabList));n.$nextTick(function(){document.getElementById("item".concat(i.active)).scrollIntoView({behavior:"instant",block:"nearest"})})}else dsf.layer.toast(t.data.message)}).catch(function(t){o.log("获取新闻页通知公告的接口报错err: ",t)})},handelToogel:function(t,e){this.loading=!0,this.active=e,this.tabList[e].data=[],this.currentTabId=t.id,this.currentTabUrl=t.tabUrl,this.page=0,this.refreshing=!1,this.finished=!1,this.fetchData(),o.log(2)},change:function(){this.icoChange=!this.icoChange},goForm:function(t){o.log("item: ",t),-1<t.url.indexOf("weixin")?dsf.util.openWebviewToUrl({url:t.url,title:t.title}):t.url&&(o.log("item.url: ",t.url),dsf.util.openWebviewToUrl({url:t.url,title:t.title}))}}},s=i(51900),e=(0,s.Z)(e,function(){var n=this,s=n._self._c;return s("div",{staticClass:"DY-tabs"},[s("div",{staticClass:"card"},[s("div",{staticClass:"top"},n._l(n.tabList,function(e,i){return s("div",{key:i,staticClass:"tags",attrs:{id:"item"+i}},[s("van-badge",{attrs:{content:e.badge,max:"99"}},[s("p",{class:{title:i==n.active},on:{click:function(t){return n.handelToogel(e,i)}}},[n._v(n._s(e.tagTitle))])])],1)}),0),n._v(" "),n._l(n.tabList,function(t,e){return s("div",{directives:[{name:"show",rawName:"v-show",value:n.active==e,expression:"active == index"}],key:e,staticClass:"showList",style:n.minHeight},[s("van-pull-refresh",{on:{refresh:n.onRefresh},model:{value:n.refreshing,callback:function(t){n.refreshing=t},expression:"refreshing"}},[s("van-list",{attrs:{finished:n.finished,"finished-text":n.finishedTips,offset:"200"},on:{load:n.onLoad},model:{value:n.loading,callback:function(t){n.loading=t},expression:"loading"}},n._l(t.data,function(e,t){return s("div",{key:t,staticClass:"content"},[s("div",{staticClass:"content_left"},[s("div",{staticClass:"titleCon",on:{click:function(t){return n.goForm(e)}}},[n._v(n._s(e.title))]),n._v(" "),s("div",{staticClass:"value"},[n._v(n._s(e.time))])]),n._v(" "),e.imgUrl?s("div",{staticClass:"content_right"},[s("img",{attrs:{src:e.imgUrl,alt:""}})]):n._e()])}),0)],1),n._v(" "),null==t.data||t.data.length<=0?s("commonempty",{attrs:{description:"暂无新闻列表数据"}}):n._e()],1)})],2)])},[],!1,null,"f2dc265c",null).exports,c=i(25108),l=(0,s.Z)({data:function(){return{userInfo:dsf.util.loadSessionStore("user"),active:0,newsTabs:[],currentId:"",contentList:[],swiperData:[],moreLink:"",mobile:dsf.util.loadSessionStore("user").mobile,swiperActive:""}},components:{ZHTabsComponents:e},mounted:function(){c.log("this.$route.params.active: ",this.$route.params.active),c.log("this.$route: ",this.$route),c.log("this.$route: ",this.$route.params.active),this.swiperActive=this.$route.params.active,c.log("父组件this.swiperActive: ",this.swiperActive)},methods:{}},function(){var t=this,e=t._self._c;return e("div",{staticClass:"news"},[e("ZHTabsComponents",{attrs:{userId:t.userInfo.user_id,currentActive:t.swiperActive}})],1)},[],!1,null,"b0004df4",null).exports}}]);