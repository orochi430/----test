"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[17649],{17649:function(e,n,r){r.r(n),r.d(n,{default:function(){return i}});var t=r(25108),n={name:"EnclosurePre",props:{fileUrl:{type:String,default:""}},data:function(){return{}},mounted:function(){window.filePreview.onhashchange=function(e){t.log("tag",window.filePreview.location.href)}},computed:{fullUrl:function(){return dsf.url.openOffice(encodeURIComponent(this.fileUrl))}},methods:{}},i=(0,r(51900).Z)(n,function(){var e=this,n=e._self._c;return n("div",{staticClass:"ds-enclosure-pre"},[e.fileUrl&&0<e.fileUrl.length?n("iframe",{attrs:{id:"filePreview",src:e.fullUrl,frameborder:"0"}}):n("commonempty",{attrs:{description:"暂无预览"}})],1)},[],!1,null,null,null).exports}}]);