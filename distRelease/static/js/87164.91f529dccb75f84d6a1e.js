"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[87164],{87164:function(e,t,i){i.r(t),i.d(t,{default:function(){return a}});i(85684);var n=i(43567),s=i(25108),t={name:"SDYCFriends",components:{},data:function(){return{id:this.$route.params.id,list:[],loading:!1,finished:!1,refreshing:!1,page:1,limit:10,isFirst:!0,timestamp:""}},computed:{},watch:{},methods:{onLoad:function(){var t=this;t.isFirst?(t.page=1,t.list=[]):t.page+=1,t.isFirst&&(t.isFirst=!1),t.$toast.loading("加载中"),dsf.http.post("/fn/sdycMeeting/spotNews",{meetingId:t.id,limit:t.limit,timestamp:t.timestamp}).done(function(e){t.refreshing&&(t.list=[],t.refreshing=!1),t.$toast.clear(),s.log(e.data),"success"==e.type&&(t.list=t.list.concat(e.data),t.timestamp=t.list[t.list.length-1].timestamp,e.data.length<t.limit)&&(t.finished=!0),t.loading=!1})},onRefresh:function(){this.timestamp="",this.finished=!1,this.loading=!0,this.onLoad(!0)},getClass:function(e){return 1==e?"img1":[2,3,4].includes(e)?"img2":"img3"},getFileImg:function(e,t){t=t?e.smallPhoto:e.photo;return dsf.url.getWebPath("/fn/file/downloadFileImage?fileName=".concat(t))},reviewImages:function(e,t){var i=this,s=[];e.forEach(function(e){s.push(i.getFileImg(e))}),(0,n.Z)({images:s,startPosition:t})}},created:function(){},mounted:function(){},destroyed:function(){}},a=(0,i(51900).Z)(t,function(){var s=this,n=s._self._c;return n("div",{staticClass:"friends",class:{noHeader:!s.$store.state.isShowAppHeader}},[n("van-pull-refresh",{on:{refresh:s.onRefresh},model:{value:s.refreshing,callback:function(e){s.refreshing=e},expression:"refreshing"}},[n("van-list",{attrs:{finished:s.finished,"finished-text":"没有更多了"},on:{load:s.onLoad},model:{value:s.loading,callback:function(e){s.loading=e},expression:"loading"}},[n("div",{staticClass:"frilists"},s._l(s.list,function(i,e){return n("div",{key:e,staticClass:"users"},[n("van-image",{attrs:{fit:"cover",round:"",src:s.dsf.url.getWebPath("/fn/file/downloadFileImage?fileName="+i.photo),"error-icon":"../../../../static/images/EnterpriseServices/default-avatar.png"}}),s._v(" "),n("div",{staticClass:"right"},[n("p",{staticClass:"username"},[s._v(s._s(i.userName))]),s._v(" "),n("p",{staticClass:"texts"},[s._v(s._s(i.title))]),s._v(" "),0<i.files.length?n("div",{staticClass:"images",class:s.getClass(i.files.length)},s._l(i.files,function(e,t){return n("van-image",{key:"file"+t,attrs:{"lazy-load":"",fit:"cover",src:s.getFileImg(e,!0)},on:{click:function(e){return s.reviewImages(i.files,t)}}})}),1):s._e()])],1)}),0)])],1)],1)},[],!1,null,"09309e72",null).exports}}]);