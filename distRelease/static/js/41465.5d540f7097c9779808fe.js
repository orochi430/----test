"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[41465],{41465:function(t,a,s){s.r(a),s.d(a,{default:function(){return i}});var e=s(25108),a={name:"SDYCSignDetail",components:{},data:function(){return{active:-1,value:"",data:[],tabs:[],id:this.$route.params.id,fid:this.$route.query.fid,default_avatar:'this.src="'+s(11727)+'"'}},computed:{},watch:{},methods:{openDrop:function(t){this.data[t].show?this.$set(this.data[t],"show",!1):this.$set(this.data[t],"show",!0)},loadData:function(){var a=this;this.data=[],this.$toast.loading("加载中"),dsf.http.post("/fn/sdycMeeting/signInDetails",{meetingId:this.fid,scheduleId:this.id,type:this.active,query_key:this.value}).then(function(t){e.log(t),a.$toast.clear(),t&&t.data&&200==t.data.code&&(a.data=t.data.data)})},loadSignInTabs:function(){var a=this;this.data=[],this.$toast.loading("加载中"),dsf.http.post("/fn/sdycMeeting/signInTabs",{meetingId:this.fid,scheduleId:this.id}).then(function(t){e.log(t),a.$toast.clear(),t&&t.data&&200==t.data.code&&(a.tabs=t.data.data)})},onSearch:function(){this.value&&this.loadData()},changeTab:function(t,a){this.active=t,this.value="",this.loadData()}},created:function(){this.loadSignInTabs(),this.loadData()},mounted:function(){},destroyed:function(){}},i=(0,s(51900).Z)(a,function(){var s=this,e=s._self._c;return e("div",{staticClass:"signDetail"},[e("van-tabs",{on:{change:s.changeTab},model:{value:s.active,callback:function(t){s.active=t},expression:"active"}},s._l(s.tabs,function(t,a){return e("van-tab",{key:a,attrs:{title:t.typeName+"("+t.count+")",name:t.type}})}),1),s._v(" "),e("van-search",{attrs:{placeholder:"搜索一下"},on:{search:s.onSearch},model:{value:s.value,callback:function(t){s.value=t},expression:"value"}}),s._v(" "),e("div",{staticClass:"userLists",class:{noHeader:s.$store.state.isShowAppHeader}},s._l(s.data,function(t,a){return e("div",{key:a,staticClass:"users"},[e("div",{staticClass:"title",on:{click:function(t){return s.openDrop(a)}}},[e("div",{staticClass:"name"},[s._v(s._s(t.unitName))]),s._v(" "),e("van-icon",{class:{active:t.show},attrs:{name:"arrow-down"}})],1),s._v(" "),t.show?s._e():e("div",{staticClass:"lists"},s._l(t.users,function(t,a){return e("div",{key:"user"+a,staticClass:"userlist"},[e("div",{staticClass:"imgs"},[e("img",{attrs:{src:s.dsf.url.getWebPath("/fn/file/downloadImage?fileName="+t.img),onerror:s.default_avatar}})]),s._v(" "),e("div",{staticClass:"msgs"},[e("p",[e("span",[s._v(s._s(t.name))]),s._v(" "),e("van-icon",{attrs:{name:"arrow"}})],1),s._v(" "),"1"==t.singValue?e("p",[e("span",[s._v(s._s(t.time))]),s._v(" "),e("span",[s._v("签到")])]):s._e()]),s._v(" "),e("div",{staticClass:"right",class:{yqd:"1"==t.singValue}},[s._v("\n            "+s._s(t.singText)+"\n          ")])])}),0)])}),0)],1)},[],!1,null,"0be9e568",null).exports},11727:function(t,a,s){t.exports=s.p+"static/img/default-avatar.ad3a581..png"}}]);