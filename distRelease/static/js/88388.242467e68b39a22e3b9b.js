"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[88388],{24507:function(e,a,t){t.r(a);var l=t(90541),t={initHandle:function(a,e,t){var d={moduleId:t.moduleId};t.$route.query.replyId?d.replyId=t.$route.query.replyId:t.$route.query.forwardIds?d.forwardIds=t.$route.query.forwardIds:d.pk=t.$route.params.pk,l.Z.http.post("fn/mobileNote/getNotepaperById",d).then(function(e){t.noteId=e.data.id,t.$set(a.main,"B0001",{value:e.data.noteTitle||""}),t.$set(a.main,"B0006",{value:e.data.jjcd,text:e.data.jjcdText||""}),t.$set(a.main,"C-BJ-0001",{value:e.data.content||"",text:e.data.contentText||""}),t.$set(a.main,"C-BJ-0002",{value:e.data.range,text:e.data.rangeName,schema:e.data.rangeSchema}),t.allFile.length&&(t.allFile[0].file=e.data.file?e.data.file.attach.map(function(e){return{id:e.fileId,title:e.fileName,type:e.nrType,size:e.showFileSize,navtiveUrl:e.filePath,url:-1<["jpeg","bmp","webp","svgz","svg","gif","jpg","ico","png","tif"].indexOf(e.extension)?l.Z.url.getServerUrl("fn/mobileFileDownload/download?fileId=".concat(e.fileId,"&moduleId=").concat(t.moduleId,"&fileName=").concat(e.fileName,"&isTemp=true")):l.Z.url.getServerUrl("fn/office/openMobileOffice?fileId=".concat(e.fileId,"&moduleId=").concat(t.moduleId,"&x-auth-token=").concat(l.Z.util.loadSessionStore("loginToken"))),moduleId:t.moduleId,isHandwrite:"-1",isRevise:"-1",canEdit:"-1",canDownLoad:"1",name:"附件"}}):[],t.allFile[0].uploadObj=e.data.file?e.data.file.attach:[])})}};a.default=t}}]);