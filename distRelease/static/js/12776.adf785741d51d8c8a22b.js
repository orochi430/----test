(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[12776],{88520:function(e,t,i){"use strict";i.d(t,{Z:function(){return d}});var n,t=i(77193),s=(i(41762),i(41956)),o=i(25108),s={components:((0,t.Z)(n={},s.Z.name,s.Z),(0,t.Z)(n,"VPlayer",function(){return i.e(46316).then(i.bind(i,46316))}),n),props:{file:{type:Object,default:function(){}},meetingId:{type:String},isShowCount:{type:Boolean,default:!0}},data:function(){return{fileType:{pdf:["pdf"],img:["jpeg","bmp","webp","svgz","svg","gif","jpg","ico","png","tif"],txt:["txt","sql","xml","html","css","js","java","php","bat","log"],word:["docx","docm","doc","dotx","dotm","dot"],xls:["xlsx","xlsm","xlsb","xls","xltx","xltm","xlt","xlam","xla","ods"],ppt:["pptx","pptm","ppt","potx","potm","pot","ppsx","ppsm","pps","ppam","ppa"]},hasFilePng:["ai","cloud","html","img","jpg","mp3","mp4","pdf","png","ppt","psd","rar","txt","word","wps","xls","zip","folder"],imgPreview:!1,previewImg:[],video:{showVideo:!1,videoTitle:"",type:"video/mp4"}}},computed:{typeClass:function(){var e,t=this.file.type.toLowerCase();if(this.hasFilePng.includes(t))return i(83887)("./".concat(t,".png"));for(e in this.fileType)if(this.fileType[e].includes(t))return i(83887)("./".concat(e,".png"))}},methods:{link:function(){var t,i=this,n=this;"folder"==n.file.type?n.$router.push({name:"SDYCConferenceFile",params:{meetingId:n.meetingId,folderId:n.file.id},query:{title:n.file.name}}):(t="fn/sdycMeeting/setRead",dsf.http.post(t,{fileId:n.file.id}).done(function(e){"success"==e.type?(e.data.flag&&n.file.readNum++,n.isImage(n.file.name)?(t="SDYCConferenceFile"==n.$route.name?dsf.url.getWebPath("fn/conferenceFile/download?pk=".concat(n.file.id)):dsf.url.getWebPath("fn/mobileFileDownload/download?fileId=".concat(n.file.id,"&moduleId=").concat(n.file.moduleId,"&fileName=").concat(n.file.name)),i.imgPreview=!0,i.previewImg=[t]):n.isVideo(n.file.name)?(t=dsf.url.getWebPath("fn/conferenceFile/download?pk=".concat(n.file.id)),n.video.showVideo=!0,n.video.videoTitle=n.file.name,n.video.src=t,n.video.type="video/".concat(n.file.type)):n.isAudio(n.file.name)?(t=dsf.url.getWebPath("fn/conferenceFile/download?pk=".concat(n.file.id)),n.video.showVideo=!0,n.video.videoTitle=n.file.name,n.video.src=t,n.video.type="audio/".concat(n.file.type)):(n.file.flowId=0,n.file.nodeId=-1,e="fn/office/openMobileOffice?fileId=".concat(n.file.id,"&moduleId=").concat(n.file.moduleId,"&nodeId=").concat(n.file.nodeId,"&flowId=").concat(n.file.flowId,"&filename=").concat(n.file.name),n.file.officeModuleId&&(e+="&officeModuleId=".concat(n.file.officeModuleId)),n.$router.push({name:"dsfIframe",params:{url:dsf.url.getServerUrl(e)}}))):dsf.layer.toast("操作失败！")}).error(function(e){o.log("setRead-error",e),dsf.layer.toast("操作失败！")}).always(function(){}))},isImage:function(e){return e.toLowerCase().includes(".png")||e.toLowerCase().includes(".jpg")||e.toLowerCase().includes(".jpeg")||e.toLowerCase().includes(".bmp")||e.toLowerCase().includes(".gif")},isVideo:function(e){return e.toLowerCase().includes(".mp4")||e.toLowerCase().includes(".webm")||e.toLowerCase().includes(".wmv")||e.toLowerCase().includes(".3gp")||e.toLowerCase().includes(".flv")||e.toLowerCase().includes(".mkv")||e.toLowerCase().includes(".avi")},isAudio:function(e){return e.toLowerCase().includes(".mp3")||e.toLowerCase().includes(".wma")||e.toLowerCase().includes(".aac")||e.toLowerCase().includes(".ogg")||e.toLowerCase().includes(".m4a")}}},d=(0,i(51900).Z)(s,function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"file",on:{click:t.link}},[e("div",{staticClass:"typeIcon"},[e("img",{attrs:{src:t.typeClass,alt:""}}),t._v(" "),t.file.isNew?e("van-badge",{attrs:{dot:""}}):t._e()],1),t._v(" "),e("div",{staticClass:"info"},["folder"==t.file.type?e("div",[e("div",{staticClass:"title"},[t._v(t._s(t.file.name))]),t._v(" "),t.isShowCount?e("div",{staticClass:"num"},[t._v(t._s(t.file.fileCount)+"个文件")]):t._e()]):e("div",[e("div",{staticClass:"title"},[t._v(t._s(t.file.name))]),t._v(" "),t.isShowCount?e("div",{staticClass:"num"},[t._v(t._s(t.file.readNum)+"次查看")]):t._e()])])]),t._v(" "),e("van-image-preview",{attrs:{images:t.previewImg,closeable:""},model:{value:t.imgPreview,callback:function(e){t.imgPreview=e},expression:"imgPreview"}}),t._v(" "),e("van-popup",{style:{height:"100%"},attrs:{"close-on-click-overlay":!1,"lock-scroll":"",position:"bottom","get-container":"#app"},model:{value:t.video.showVideo,callback:function(e){t.$set(t.video,"showVideo",e)},expression:"video.showVideo"}},[t.video.showVideo?e("div",[e("VPlayer",{attrs:{video:t.video}})],1):t._e()])],1)},[],!1,null,"18b63d72",null).exports},36470:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return n}});var t=s(88520),i=s(25108),t={components:{fileItem:t.Z},data:function(){return{files:[],loading:null,meetingId:this.$route.params.meetingId,folderId:this.$route.params.folderId,errored:!1,isFirstLoad:!1}},created:function(){this.isFirstLoad=!0,this.getFiles()},activated:function(){this.isFirstLoad||this.getFiles(),this.isFirstLoad=!1},mounted:function(){},methods:{getFiles:function(){i.log("getFiles");var t=this,e=(t.loading=dsf.layer.loading(),"fn/sdycMeeting/files");dsf.config.staticJson.enable&&t.folderId&&(e+="/".concat(t.folderId)),dsf.http.post(e,{meetingId:t.meetingId,id:t.folderId}).done(function(e){t.files=[],"success"==e.type?t.files=e.data.map(function(e){return"1"==e.fileType?e.type="folder":e.type=e.name.substr(e.name.lastIndexOf(".")+1),e}):t.errored=!0}).error(function(e){t.errored=!0}).always(function(){dsf.layer.closeLoading(t.loading)})}}},n=(0,s(51900).Z)(t,function(){var i=this,n=i._self._c;return n("div",[i.errored?n("div",[i._v("\n    数据获取失败！\n  ")]):0<i.files.length?n("div",i._l(i.files,function(e,t){return n("div",{key:t},[n("file-item",{attrs:{file:e,"meeting-id":i.meetingId}}),i._v(" "),t<i.files.length-1?n("van-divider"):i._e()],1)}),0):n("div",{staticClass:"flex"},[n("commonempty",{staticClass:"file-empty",attrs:{image:s(89436),description:"暂无文件"}})],1)])},[],!1,null,"30ff48af",null).exports},83887:function(e,t,i){var n={"./ai.png":44936,"./cloud.png":54073,"./doc.png":39636,"./docx.png":70071,"./folder-team.png":36556,"./folder.png":7818,"./html.png":97744,"./img.png":32954,"./jpeg.png":90699,"./jpg.png":84693,"./mp3.png":77957,"./mp4.png":96128,"./ofd.png":88825,"./pdf.png":46616,"./png.png":95742,"./ppt.png":68985,"./psd.png":89041,"./rar.png":45074,"./txt.png":48339,"./word.png":26206,"./wps.png":83392,"./xls.png":49472,"./xlsx.png":81682,"./xml.png":66874,"./zip.png":99021};function s(e){e=o(e);return i(e)}function o(e){if(i.o(n,e))return n[e];throw(e=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",e}s.keys=function(){return Object.keys(n)},s.resolve=o,(e.exports=s).id=83887},44936:function(e,t,i){"use strict";e.exports=i.p+"static/img/ai.692fadd..png"},54073:function(e,t,i){"use strict";e.exports=i.p+"static/img/cloud.e0e5c0c..png"},39636:function(e,t,i){"use strict";e.exports=i.p+"static/img/doc.178d734..png"},70071:function(e,t,i){"use strict";e.exports=i.p+"static/img/docx.178d734..png"},36556:function(e,t,i){"use strict";e.exports=i.p+"static/img/folder-team.256a132..png"},7818:function(e,t,i){"use strict";e.exports=i.p+"static/img/folder.b74dd1f..png"},97744:function(e,t,i){"use strict";e.exports=i.p+"static/img/html.aed4382..png"},32954:function(e,t,i){"use strict";e.exports=i.p+"static/img/img.1e66416..png"},90699:function(e,t,i){"use strict";e.exports=i.p+"static/img/jpeg.6690b6f..png"},84693:function(e,t,i){"use strict";e.exports=i.p+"static/img/jpg.6690b6f..png"},77957:function(e,t,i){"use strict";e.exports=i.p+"static/img/mp3.11779e9..png"},96128:function(e,t,i){"use strict";e.exports=i.p+"static/img/mp4.bf3626d..png"},88825:function(e,t,i){"use strict";e.exports=i.p+"static/img/ofd.aa35dda..png"},46616:function(e,t,i){"use strict";e.exports=i.p+"static/img/pdf.0431c10..png"},95742:function(e,t,i){"use strict";e.exports=i.p+"static/img/png.99cbe3b..png"},68985:function(e,t,i){"use strict";e.exports=i.p+"static/img/ppt.2dcd0da..png"},89041:function(e,t,i){"use strict";e.exports=i.p+"static/img/psd.10d45f5..png"},45074:function(e,t,i){"use strict";e.exports=i.p+"static/img/rar.5ca3e88..png"},48339:function(e,t,i){"use strict";e.exports=i.p+"static/img/txt.9b1d964..png"},26206:function(e,t,i){"use strict";e.exports=i.p+"static/img/word.178d734..png"},83392:function(e,t,i){"use strict";e.exports=i.p+"static/img/wps.d841695..png"},49472:function(e,t,i){"use strict";e.exports=i.p+"static/img/xls.e136da2..png"},81682:function(e,t,i){"use strict";e.exports=i.p+"static/img/xlsx.e136da2..png"},66874:function(e,t,i){"use strict";e.exports=i.p+"static/img/xml.aed4382..png"},99021:function(e,t,i){"use strict";e.exports=i.p+"static/img/zip.4b7a304..png"},89436:function(e,t,i){"use strict";e.exports=i.p+"static/img/img_zwwj.5906452..png"}}]);