"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[42986],{42986:function(t,e,i){i.r(e),i.d(e,{default:function(){return s}});var n=i(2728),r=i(25108),e={name:"wisdom_form",data:function(){return{file_list:[]}},created:function(){this.query=this.$route.query,n.Z.setTitle(this.query.title),this.getFile()},methods:{getFile:function(){var e=this;dsf.http.get("action?peoplesCongressInterfaceAction=5",{id:this.query.id}).then(function(t){r.log(t);t=t.data;e.file_list=t.files})},openFile:function(t){this.$router.push({name:"dsfIframe",params:{url:t.path,title:t.nrbt},query:{url:t.path,title:t.nrbt}})}}},s=(0,i(51900).Z)(e,function(){var i=this,t=i._self._c;return t("div",{staticClass:"wisdom_form"},[i._l(i.file_list,function(e){return t("van-cell",{key:e.nrid,attrs:{value:e.nrbt},on:{click:function(t){return i.openFile(e)}}})}),i._v(" "),i.file_list.length?i._e():t("div",{staticClass:"no_notice"},[i._v("暂无附件")])],2)},[],!1,null,"ec4710ee",null).exports}}]);