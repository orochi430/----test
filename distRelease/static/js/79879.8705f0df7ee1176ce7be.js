"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[79879],{79879:function(t,e,n){n.r(e),n.d(e,{default:function(){return r}});var i=n(25108),e={data:function(){return{dirs:[],folderId:this.$route.params.folderId,meetingId:this.$route.params.meetingId}},created:function(){this.getDirs()},methods:{getDirs:function(){var e=this;dsf.http.post("fn/sdycMeeting/files",{meetingId:e.meetingId,id:e.folderId}).done(function(t){"success"==t.type&&(e.dirs=t.data.filter(function(t){return"1"==t.fileType}))}).error(function(t){i.log("fileDetails-error",t)}).always(function(){})},go:function(t){this.$router.push({path:"/SDYCConferenceFile/".concat(this.meetingId,"/").concat(t.id),query:{title:t.name}})}}},r=(0,n(51900).Z)(e,function(){var n=this,i=n._self._c;return 0==n.dirs.length?i("commonempty",{attrs:{description:"暂无数据"}}):i("div",{staticClass:"dir-contanier"},n._l(n.dirs,function(e,t){return i("div",{key:t,staticClass:"dir",on:{click:function(t){return n.go(e)}}},[n._v("\n    "+n._s(e.name)),i("span",[n._v("（"+n._s(e.fileCount)+"）")])])}),0)},[],!1,null,"6cefd395",null).exports}}]);