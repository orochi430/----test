/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[31],{1221:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ds-control ds-form-item ds-upload upload-file mobile",class:e.getCss},[e.simple&&e.readOnly&&!e.isDesign?[i("DsfTextProxy",e._b({model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},"DsfTextProxy",e._self.$props,!1))]:[i("van-field",{attrs:{required:e.required,"label-width":e.getLabelWidth(!0),"error-message":e.errorsMsg,"error-message-align":e.$inputAlign},scopedSlots:e._u([{key:"input",fn:function(){return[i("van-uploader",{attrs:{"after-read":e.afterRead,"before-delete":e.beforeDelete,accept:e.isAndroid?"image/*":e.uploadFileExts,multiple:e.multiple,"max-size":e.maxSize,"max-count":e.uploadFileNum,"show-upload":!e.readOnly,readonly:e.readOnly,deletable:!e.readOnly,capture:e.isMiniProgram},on:{oversize:e.onOversize},scopedSlots:e._u([{key:"preview-cover",fn:function(t){return[i("div",{staticClass:"preview-row"},[i("img",{staticClass:"preview-icon",attrs:{src:e.$fileSuffixIcon(t)}}),i("div",{staticClass:"preview-cover"},[i("p",{staticClass:"van-ellipsis"},[e._v(e._s(t.originalFileName))]),i("p",{staticClass:"bye-size"},[e._v(e._s(e.formatBytes(t.size)))])]),i("div",{staticClass:"preview-btn",on:{click:function(i){return i.stopPropagation(),e.handleColumnClick("view",t)}}},[e._v("预览")]),e.readOnly?e._e():i("div",{staticClass:"preview-btn",on:{click:function(i){return i.stopPropagation(),e.beforeDelete(t)}}},[e._v("删除")]),e.showDownload?i("div",{staticClass:"preview-btn",on:{click:function(i){return e.handleColumnClick("download",t)}}},[e._v("下载")]):e._e()])]}}]),model:{value:e.fileListCopy,callback:function(t){e.fileListCopy=t},expression:"fileListCopy"}})]},proxy:!0},e.showLabel?{key:"label",fn:function(){return[i("DsfFieldLabel",{attrs:{owner:e._self,"is-mobile":"","data-caption":e.dataCapion,showIcon:e.showDataCaptionIcon}},[e._v(e._s(e.label))])]},proxy:!0}:null],null,!0)})]],2)},n=[],s=i(3),l=i.n(s);function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){l()(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var u=dsf.component({name:"DsfMobileUploadFile",mixins:[$mixins.formControl],ctrlCaption:"文件上传",props:{simple:{type:Boolean,default:!1},showLabel:{type:Boolean,default:!0},formatter:{type:String,default:"multipleFiles^originalFileName"},label:{type:String,default:"文件上传"},multiple:{type:Boolean,default:!0},uploadFileNum:{type:[Number,String],default:5},uploadFileSize:{type:Number,default:0},zipFileName:{type:String,default:""},required:{type:Boolean,default:!1},requestUrl:{type:String,default:""},extsSetting:{type:Object,default:function(){return{}}},metadata:{type:Object,default:function(){return dsf.metadata.get("file-meta-data")}},inputAlign:{type:String,default:"right"},showDownload:{type:Boolean,default:!1},acceptImage:{type:Boolean,default:!1},isStatic:{type:Boolean,default:!1},isPublic:{type:Boolean,default:!0}},data:function(){return{previewPopup:!1,filePath:"",fileListCopy:[],uploadFileType:"file",uploadFileExts:"",acceptMime:"",isAndroid:this.acceptImage,isMiniProgram:null,newData:[]}},computed:{$inputAlign:function(){return this.readOnly?"right":this.inputAlign},setRequestUrl:function(){return this.requestUrl||"/file/upload/"},maxSize:function(){return this.uploadFileSize>0?1048576*parseInt(this.uploadFileSize):1e8},extendData:function(){var e=this.isStatic,t=this.isPublic,i={isStatic:Number(e),isPublic:Number(t)};return this.$vm&&(i["namespace"]=this.$vm.nameSpace,i["pageName"]=this.$vm.pageName),i}},watch:{value:function(e){this.initValue(e)}},created:function(){this.initValue(this.value),this.rebuildDialogData()},mounted:function(){this.checkMiniProgram()},methods:{checkMiniProgram:function(){var e=this;dsf.client.weixin()&&wx.miniProgram.getEnv((function(t){t.miniprogram?e.isMiniProgram="camera":e.isMiniProgram=null}))},checkAndroid:function(){var e=window.navigator.userAgent;e.indexOf("Android")&&(this.isAndroid=!0)},initValue:function(e){"string"==dsf.type(e)&&(this.fileListCopy=JSON.parse(e),this.newData=this.fileListCopy)},beforeDelete:function(e){var t=this;dsf.layer.confirm("确定要删除【".concat(e.originalFileName,"】文件吗?")).then((function(){var i=JSON.parse(JSON.stringify(t.fileListCopy));i.splice(i.findIndex((function(t){return t.id==e.id})),1),t.emitValueChange(JSON.stringify(i)),t.$nextTick((function(){t.emitFormValidate(t.fileListCopy)}))})).catch((function(e){return e}))},onOversize:function(e){dsf.layer.message("文件大小不能超过".concat(parseInt(this.uploadFileSize),"MB"),!1)},afterRead:function(e,t){var i=this;e.length||(e=[e]);var a=this.fileListCopy.length-e.length;this.__uploadingFiles=0,_.forEach(e,(function(e,n){i.checkFileExts(e)?(i.__uploadingFiles++,i.uploadMultipleFile(e,n,a)):i.fileListCopy.splice(t.index,1)}))},uploadMultipleFile:function(e,t,i){var a=this;e.status="uploading",e.message="上传中...",this.$http.upload(this.setRequestUrl,r(r({},this.extendData),{},{file:e.file}),!0).done((function(t){t.success&&2e4==t.state?(e.status="done",e.message="成功",a.newData.push(t.data[0]),a.emitValueChange(JSON.stringify(a.newData))):20104==t.state&&a.handleError(t,e)})).catch((function(t){a.handleError(t,e)})).always((function(){a.__uploadingFiles--,a.__uploadingFiles||(a.fileListCopy=_.filter(a.fileListCopy,(function(e){return"failed"!=e.status&&e.id})),a.$nextTick((function(){a.emitFormValidate(a.fileListCopy),a.$dispatch("upload-complete",a.fileListCopy),a.$dispatch("upload-file",a.fileListCopy)})))}))},handleError:function(e,t){t.status="failed",t.message=e.message;var i=JSON.parse(JSON.stringify(e));"404"==i.status?dsf.layer.message("服务器异常",!1):dsf.layer.message(t.file.name+" "+i.message,!1)},checkFileExts:function(e){var t=e.file.name,i=t.lastIndexOf("."),a=t.substr(i+1).toLowerCase();return _.some(this.fileListCopy,["originalFileName",t])?(setTimeout((function(){dsf.layer.message("已存在文件【".concat(t,"】，请修改后重新上传"),!1)}),0),!1):!this.uploadFileExts||(!!this.uploadFileExts.includes(a)||(dsf.layer.message("请选择包含这些格式的文件：".concat(this.uploadFileExts),!1),!1))},handleColumnClick:function(e,t,i){var a=this,n={view:function(){if(a.$listeners["file-preview"])a.$dispatch("file-preview",t);else{var e=a.$getWebPath("preview/file",!0),i=dsf.config.setting_public_file_host,n=t.relativePath;a.filePath="".concat(e,"?url=").concat(i).concat(n),a.$openDialog({title:t.originalFileName||t.name,template:"<iframe :src=\"'".concat(a.filePath,'\'" width="100%" height="100%" frameborder="0"></iframe>'),height:"100vh",width:"100vw",position:"right"})}},download:function(){a.$listeners["file-download"]?a.$dispatch("file-download",t):dsf.driver.downloadFiles?dsf.driver.downloadFiles({files:[t]}):dsf.layer.message("可在浏览器打开此网页下载文件")}};n[e]&&n[e]()},formatBytes:function(e,t){if(0==e)return"0 B";var i=1024,a=t||2,n=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(a))+" "+n[s]},rebuildDialogData:function(){if(this.extsSetting.extStr){var e=this.extsSetting;this.uploadFileType=e.fileType,this.isLinkeMine=e.isLinkeMine,this.uploadFileExts=e.extStr,this.acceptMime=e.mineStr}}}}),c=u,d=i(0),f=Object(d["a"])(c,a,n,!1,null,null,null);t["default"]=f.exports},1222:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ds-control ds-form-item ds-upload upload-img mobile",class:e.getCss},[e.simple&&e.readOnly&&!e.isDesign?[i("DsfTextProxy",e._b({model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},"DsfTextProxy",e._self.$props,!1))]:[i("van-field",{attrs:{required:e.required,"label-width":e.getLabelWidth(!0),"error-message":e.errorsMsg,"error-message-align":e.$inputAlign},scopedSlots:e._u([{key:"input",fn:function(){return[i("van-uploader",{class:{hide:e.isNative},attrs:{multiple:e.multiple,accept:e.isAndroid?"image/*":e.uploadFileExts,"after-read":e.afterRead,"before-delete":e.beforeDelete,"max-count":e.uploadFileNum,"max-size":e.maxSize,"show-upload":!e.readOnly,readonly:e.readOnly,deletable:!e.readOnly,capture:e.isMiniProgram},on:{oversize:e.onOversize},model:{value:e.fileListCopy,callback:function(t){e.fileListCopy=t},expression:"fileListCopy"}}),e.isAndroid&&e.isNative&&!e.readOnly?[i("div",{directives:[{name:"show",rawName:"v-show",value:e.fileListCopy.length!=e.uploadFileNum,expression:"fileListCopy.length != uploadFileNum"}],staticClass:"van-uploader",style:{alignSelf:"flex-start"}},[i("van-button",{staticClass:"van-uploader__upload",staticStyle:{padding:"0"},attrs:{color:"#eee"},on:{click:e.handleClick}},[i("van-icon",{attrs:{name:"plus",color:"#bebebe",size:"0.38rem"}})],1)],1)]:e._e()]},proxy:!0},e.showLabel?{key:"label",fn:function(){return[i("DsfFieldLabel",{attrs:{owner:e._self,"is-mobile":"","data-caption":e.dataCapion,showIcon:e.showDataCaptionIcon}},[e._v(e._s(e.label))])]},proxy:!0}:null],null,!0)})]],2)},n=[],s=i(3),l=i.n(s);function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){l()(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var u=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:512,a=window.atob(e),n=[],s=0;s<a.length;s+=i){for(var l=a.slice(s,s+i),o=new Array(l.length),r=0;r<l.length;r++)o[r]=l.charCodeAt(r);var u=new Uint8Array(o);n.push(u)}var c=new Blob(n,{type:t});return c},c=dsf.component({name:"DsfMobileUploadImg",mixins:[$mixins.formControl],ctrlCaption:"图片上传",props:{simple:{type:Boolean,default:!1},showLabel:{type:Boolean,default:!0},label:{type:String,default:"图片上传"},multiple:{type:Boolean,default:!0},uploadFileNum:{type:[Number,String],default:5},uploadFileSize:{type:Number,default:0},required:{type:Boolean,default:!1},requestUrl:{type:String,default:""},isCutPic:{type:Boolean,default:!0},aspectRatio:{type:String,default:""},uploadFileExts:{type:String,default:".jpg,.jpeg,.png,.gif"},extsSetting:{type:Object,default:function(){return{}}},metadata:{type:Object,default:function(){return dsf.metadata.get("photo-meta-data")}},inputAlign:{type:String,default:"right"},isStatic:{type:Boolean,default:!1},isPublic:{type:Boolean,default:!0},formatter:{type:String,default:"htmlFiles"}},data:function(){return{previewPopup:!1,filePath:"",fileListCopy:[],uploadFileType:"image/*",acceptMime:"",editImg:!1,editFileImg:{},cropper:"",isAndroid:!1,isMiniProgram:null,androidKey:"",isNative:!1}},computed:{$inputAlign:function(){return this.readOnly?"right":this.inputAlign},setRequestUrl:function(){return this.requestUrl||"/file/upload/"},maxSize:function(){return this.uploadFileSize>0?1048576*parseInt(this.uploadFileSize):1e8},extendData:function(){var e=this.isStatic,t=this.isPublic,i={isStatic:Number(e),isPublic:Number(t)};return this.$vm&&(i["namespace"]=this.$vm.nameSpace,i["pageName"]=this.$vm.pageName),i}},watch:{value:function(e){this.initValue(e)}},created:function(){this.initValue(this.value),this.rebuildDialogData(),this.isAndroid=dsf.client.android(),this.isNative=dsf.client.native()},mounted:function(){this.checkMiniProgram()},methods:{handleClick:function(){var e=this,t=this.uploadFileNum-this.fileListCopy.length;$ImagePicker.choicePictures({limitCount:t,fileType:"base64"},(function(t){t.length||(t=[t]);var i=e.fileListCopy.length;if(t.length+i>e.uploadFileNum)return dsf.layer.message("当前限制选择最多上传 ".concat(e.uploadFileNum," 个文件"),!1),!1;var a=t.map((function(t,i){var a=t.path,n=a.lastIndexOf("/"),s=a.substring(n+1),l=s.split("."),o="data:image/"+l[l.length-1]+";base64,"+t.base64file,r={file:{name:s}};if(e.checkFileExts(r))return e.upload(o,l[l.length-1],s)}));e.loading=dsf.layer.loading("上传中..."),Promise.all(a).then((function(t){var a=JSON.parse(JSON.stringify(e.fileListCopy));_.forEach(t,(function(e,t){e&&(a[t+i]=e)})),e.emitValueChange(JSON.stringify(a)),e.$nextTick((function(){e.emitFormValidate(e.fileListCopy),e.$dispatch("mobile-upload-img",e.fileListCopy)})),dsf.layer.closeLoading(e.loading)}))}))},upload:function(e,t,i){var a=this;return new Promise((function(n,s){var l=u(e.split(",")[1],"image/"+t);l.name=i,a.$http.upload(a.setRequestUrl,r(r({},a.extendData),{},{file:l})).done((function(e){e.success&&2e4==e.state?n(e.data[0]):(dsf.layer.message(e.message||"上传失败",!1),s(e))})).error((function(e){dsf.layer.message("上传失败发生未知异常",!1),s(e)}))}))},checkMiniProgram:function(){var e=this;dsf.client.weixin()&&wx.miniProgram.getEnv((function(t){t.miniprogram?e.isMiniProgram="camera":e.isMiniProgram=null}))},initValue:function(e){var t=this;if("string"==dsf.type(e))if(this.$listeners["img-init-value"])this.$dispatch("img-init-value",e);else if("[]"===e||_.isEqual(e,[]))this.fileListCopy=[];else{var i=JSON.parse(e).filter((function(e){return e}));_.forEach(i,(function(e,i){e.url=t.$getWebPath(e.relativePath,!0),e.isImage=!0})),this.fileListCopy=i}},beforeDelete:function(e,t){var i=this;dsf.layer.confirm("确定要删除【".concat(e.originalFileName,"】文件吗?")).then((function(){var e=JSON.parse(JSON.stringify(i.fileListCopy));e.splice(t.index,1),i.emitValueChange(JSON.stringify(e)),i.$nextTick((function(){i.emitFormValidate(i.fileListCopy)}))})).catch((function(e){return e}))},afterRead:function(e,t){var i=this;e.length||(e=[e]);var a=this.fileListCopy.length-e.length;_.forEach(e,(function(e,n){i.checkFileExts(e)?i.uploadMultipleFile(e,n,a):i.fileListCopy.splice(t.index,1)}))},uploadMultipleFile:function(e,t,i){var a=this;e.status="uploading",e.message="上传中",this.$http.upload(this.setRequestUrl,r(r({},this.extendData),{},{file:e.file}),!0).done((function(n){if(n.success&&2e4==n.state){e.status="";var s=n.data[0],l=JSON.parse(JSON.stringify(a.fileListCopy));l[t+i]=s,a.emitValueChange(JSON.stringify(l)),a.$nextTick((function(){a.emitFormValidate(a.fileListCopy),a.$dispatch("upload-complete",a.fileListCopy),a.$dispatch("mobile-upload-img",a.fileListCopy)}))}})).catch((function(e){a.fileListCopy.splice(a.fileListCopy.length-1,1),dsf.layer.message(e.message,!1)}))},checkFileExts:function(e){var t=e.file.name,i=t.lastIndexOf("."),a=t.substr(i+1).toLowerCase();return _.some(this.fileListCopy,["originalFileName",t])?(setTimeout((function(){dsf.layer.message("已存在文件【".concat(t,"】，请修改后重新上传"),!1)}),0),!1):!this.uploadFileExts||(!!this.uploadFileExts.includes(a)||(dsf.layer.message("请选择包含这些格式的文件：".concat(this.uploadFileExts),!1),!1))},beforeRead:function(e){var t=this;return e.length||(e=[e]),_.forEach(e,(function(e){var i=e.name.split("."),a=i[i.length-1].toLowerCase();if(!t.uploadFileExts.includes(a))return dsf.layer.message("请选择包含这些格式的文件：".concat(t.uploadFileExts),!1),!1})),!0},computeFileSize:function(e){if(null==e||""==e)return"0 Bytes";var t=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],i=0,a=parseFloat(e);i=Math.floor(Math.log(a)/Math.log(1024));var n=a/Math.pow(1024,i);return n=n.toFixed(2),n+t[i]},onOversize:function(e){dsf.layer.message("图片大小不能超过".concat(parseInt(this.uploadFileSize),"MB"),!1)},formatBytes:function(e,t){if(0==e)return"0 B";var i=1024,a=t||2,n=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(a))+" "+n[s]},rebuildDialogData:function(){if(this.extsSetting.extStr){var e=this.extsSetting;this.uploadFileType=e.fileType,this.isLinkeMine=e.isLinkeMine,this.uploadFileExts=e.extStr,this.acceptMime=e.mineStr}}}}),d=c,f=i(0),p=Object(f["a"])(d,a,n,!1,null,null,null);t["default"]=p.exports},1223:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ds-control ds-form-item ds-upload upload-img mobile",class:e.getCss},[e.simple&&e.readOnly&&!e.isDesign?[i("DsfTextProxy",e._b({model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},"DsfTextProxy",e._self.$props,!1))]:[i("van-field",{attrs:{required:e.required,"label-width":e.getLabelWidth(!0),"error-message":e.errorsMsg,"error-message-align":e.$inputAlign},scopedSlots:e._u([{key:"input",fn:function(){return[i("van-uploader",{attrs:{multiple:e.multiple,accept:e.isAndroid?"image/*":e.uploadFileExts,"max-size":e.maxSize,"after-read":e.afterRead,"before-delete":e.beforeDelete,"max-count":e.uploadFileNum,"show-upload":!e.readOnly,readonly:e.readOnly,deletable:!e.readOnly,capture:e.isMiniProgram},on:{oversize:e.onOversize},model:{value:e.fileListCopy,callback:function(t){e.fileListCopy=t},expression:"fileListCopy"}})]},proxy:!0},e.showLabel?{key:"label",fn:function(){return[i("DsfFieldLabel",{attrs:{owner:e._self,"is-mobile":"","data-caption":e.dataCapion,showIcon:e.showDataCaptionIcon}},[e._v(e._s(e.label))])]},proxy:!0}:null],null,!0)})]],2)},n=[],s=i(3),l=i.n(s);function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){l()(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var u=dsf.component({name:"DsfMobileUploadPhoto",mixins:[$mixins.formControl],ctrlCaption:"上传照片",props:{simple:{type:Boolean,default:!1},showLabel:{type:Boolean,default:!0},label:{type:String,default:"上传照片"},multiple:{type:Boolean,default:!1},uploadFileNum:{type:[Number,String],default:1},maxFileSize:{type:Number,default:0},required:{type:Boolean,default:!1},switchMode:{type:Boolean,default:!0},requestUrl:{type:String,default:""},isCutPic:{type:Boolean,default:!1},aspectRatio:{type:String,default:"1/1"},maxSideWidth:{type:Number,default:0},isResize:{type:Boolean,default:!1},isRound:{type:Boolean,default:!1},uploadFileExts:{type:String,default:".jpg,.jpeg,.png"},extsSetting:{type:Object,default:function(){return{}}},metadata:{type:Object,default:function(){return dsf.metadata.get("photo-meta-data",{valueAttributes:[{name:"上传照片",code:"photo",type:dsf.metadata.getDataType("object"),length:500,defaultValue:null,unit:null,textType:"JSON"}]})}},inputAlign:{type:String,default:"right"},isStatic:{type:Boolean,default:!1},isPublic:{type:Boolean,default:!0},formatter:{type:String,default:"htmlFiles"}},data:function(){return{previewPopup:!1,filePath:"",fileListCopy:[],uploadFileType:"image/*",isAndroid:!1,photoSize:0,isMiniProgram:null}},computed:{$inputAlign:function(){return this.readOnly?"right":this.inputAlign},setRequestUrl:function(){return this.requestUrl||"/file/upload/"},maxSize:function(){return this.maxFileSize>0?1048576*parseInt(this.maxFileSize):1e8},extendData:function(){var e=this.isStatic,t=this.isPublic,i={isStatic:Number(e),isPublic:Number(t)};return this.$vm&&(i["namespace"]=this.$vm.nameSpace,i["pageName"]=this.$vm.pageName),i}},watch:{value:function(e){this.initValue(e)}},created:function(){this.initValue(this.value),this.isAndroid=dsf.client.android(),this.photoSize=this.isCutPic?52428800:this.maxFileSize},mounted:function(){this.checkMiniProgram()},methods:{checkMiniProgram:function(){var e=this;dsf.client.weixin()&&wx.miniProgram.getEnv((function(t){t.miniprogram?e.isMiniProgram="camera":e.isMiniProgram=null}))},initValue:function(e){if("string"==dsf.type(e))if(this.$listeners["photo-init-value"])this.$dispatch("photo-init-value",e);else if("[]"===e||_.isEqual(e,[]))this.fileListCopy=[];else{var t=JSON.parse(e);t[0].url=this.$getWebPath(t[0].relativePath,!0),t[0].isImage=!0,this.fileListCopy=t}},afterRead:function(e,t){this.checkFileExts(e)?(e.status="uploading",e.message="上传中",this.isCutPic?this.$openDialog({title:"裁剪",content:"mobileCropImage",height:"100vh",width:"100vw",position:"right",showClose:!1,hasFooter:!1,params:{imgSrc:e.content,aspectRatio:this.aspectRatio,maxSideWidth:this.maxSideWidth,isRound:this.isRound,isResize:this.isResize},event:{onChange:this.saveFile,onCancel:this.beforeDelete}}):this.saveFile(e.file,e.content)):this.beforeDelete()},checkFileExts:function(e){var t=e.file.name,i=t.lastIndexOf("."),a=t.substr(i+1).toLowerCase();return!this.uploadFileExts||(!!this.uploadFileExts.includes(a)||(dsf.layer.message("请选择包含这些格式的文件：".concat(this.uploadFileExts),!1),!1))},beforeRead:function(e){var t=e.name.split("."),i=t[t.length-1].toLowerCase();return!!this.uploadFileExts.includes(i)||(dsf.layer.message("请选择包含这些格式的文件：".concat(this.uploadFileExts),!1),!1)},beforeDelete:function(){var e=this;this.fileListCopy=[],this.emitValueChange(JSON.stringify(this.fileListCopy)),this.$nextTick((function(){e.emitFormValidate(e.fileListCopy)}))},saveFile:function(e,t){var i=this;e.name||(e.name="file.jpeg"),this.$http.upload(this.setRequestUrl,r(r({},this.extendData),{},{file:e}),!0).done((function(t){var a=t.success,n=t.state,s=t.data,l=t.message;if(a&&2e4==n){e.status="";var o=_.cloneDeep(i.fileListCopy);o[0]=s[0];var r=JSON.stringify(o);o[0].url=i.$getWebPath(o[0].relativePath,!0),o[0].isImage=!0,i.fileListCopy=o,i.emitValueChange(r),i.$nextTick((function(){i.emitFormValidate(o),i.$dispatch("upload-complete",o)}))}else dsf.layer.message(l),i.beforeDelete()})).catch((function(e){i.beforeDelete(),dsf.layer.message(e.message,!1)}))},getFileSize:function(e){var t=parseInt(e);return(e.indexOf("M")>-1||e.indexOf("m")>-1)&&(t=1024*parseInt(e)),t},onOversize:function(e){dsf.layer.message("图片大小不能超过".concat(parseInt(this.maxFileSize),"MB"),!1)},formatBytes:function(e,t){if(0==e)return"0 B";var i=1024,a=t||2,n=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],s=Math.floor(Math.log(e)/Math.log(i));return parseFloat((e/Math.pow(i,s)).toFixed(a))+" "+n[s]}}}),c=u,d=i(0),f=Object(d["a"])(c,a,n,!1,null,null,null);t["default"]=f.exports},1237:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ds-control ds-design-img",style:{"text-align":e.align},on:{click:e.clickHandler}},[e.url?i("van-image",{style:{width:e.width,height:e.height,display:"block",minHeight:"40px"},attrs:{src:e.$url}}):[e.isDesign?i("div",{staticClass:"van-image",staticStyle:{display:"block",height:"auto"}},[i("div",{staticClass:"van-image__error",staticStyle:{position:"relative"}},[e._v("请上传图片")])]):e._e()]],2)},n=[],s=dsf.component({name:"DsfMobileUploadDesignImg",mixins:[$mixins.control],ctrlCaption:"设计图",data:function(){return{}},props:{url:{type:String,default:""},width:{type:[Number,String],default:"100%"},height:{type:[Number,String],default:"auto"},align:{type:String,default:"left"},toUrl:{type:String,default:""}},computed:{$url:function(){return dsf.url.getWebPath(this.url)}},created:function(){},methods:{clickHandler:function(){this.toUrl&&this.$openWindow({url:dsf.url.getWebPath(this.toUrl)})}}}),l=s,o=(i(815),i(0)),r=Object(o["a"])(l,a,n,!1,null,null,null);t["default"]=r.exports},394:function(e,t,i){"use strict";function a(e,t){dsf.http.importFiles([dsf.url.getWebPath("$/js/libs/vuePictureCut/vue-picture-cut.css"),dsf.url.getWebPath("$/js/libs/vuePictureCut/vue-picture-cut.umd.min.js")]).then((function(){window.Vue.use(window["vue-picture-cut"].default),null===e||void 0===e||e(window["vue-picture-cut"])})).catch((function(e){dsf.error(e),dsf.layer.message("加载vuePictureCut脚本出错",!1),null===t||void 0===t||t(e)}))}function n(e,t){dsf.http.importFiles([dsf.url.getWebPath("$/js/libs/vcrontab/vcrontab.umd.min.js")]).then((function(){window.Vue.use(window["vcrontab"].default),null===e||void 0===e||e()})).catch((function(e){dsf.error(e),dsf.layer.message("加载vcrontab脚本出错",!1),null===t||void 0===t||t(e)}))}function s(e,t){dsf.http.importFiles([dsf.url.getWebPath("$/js/libs/quill/quill.core.css"),dsf.url.getWebPath("$/js/libs/quill/quill.snow.css"),dsf.url.getWebPath("$/js/libs/quill/quill.bubble.css"),dsf.url.getWebPath("$/js/libs/quill/quill.js"),dsf.url.getWebPath("$/js/libs/quill/vue-quill-editor.js")]).then((function(){window.Vue.use(window["VueQuillEditor"]),null===e||void 0===e||e()})).catch((function(e){dsf.error(e),dsf.layer.message("加载quill脚本出错",!1),null===t||void 0===t||t(e)}))}i.d(t,"c",(function(){return a})),i.d(t,"b",(function(){return n})),i.d(t,"a",(function(){return s}))},589:function(e,t,i){var a=i(816);"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i(19).default;n("370ca8bf",a,!0,{sourceMap:!1,shadowMode:!1})},815:function(e,t,i){"use strict";i(589)},816:function(e,t,i){"use strict";i.r(t)},975:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.ready?i("vue-picture-cut",{ref:"pictureCut",attrs:{src:e.imgSrc,"max-pixel":e.maxSideWidth||null,"msk-option":e.mskOption}},[i("mobile-crop-image-menu",{attrs:{slot:"menu","confirm-name":"确定","cancel-name":"取消","menu-rotate-name":"旋转"},on:{"on-change":e.saveFileImg,"on-cancel":e.handleClose},slot:"menu"})],1):e._e()},n=[],s=i(8),l=i.n(s),o=i(394),r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vue-picture-cut-menu dark-theme",class:[["default","dark","gray"].indexOf(e.theme)>-1?e.theme+"-theme":"default-theme"]},[i("div",{staticClass:"vue-picture-cut-menu_slider"},[i("div",{staticClass:"vue-picture-cut-menu_slider-box"},[i("span",[e._v(e._s(e.menuRotateName))]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.sliderAngle,expression:"sliderAngle"}],attrs:{type:"range",min:-180,max:180},domProps:{value:e.sliderAngle},on:{__r:function(t){e.sliderAngle=t.target.value}}}),i("div",{staticClass:"vue-picture-cut-menu_slider-box-bar"},[i("div",{staticClass:"vue-picture-cut-menu_slider-box-button",style:{left:100*e.sliderAngle/361+50+"%"}},[i("div",{staticClass:"vue-picture-cut-menu_slider-box-tips"},[e._v(" "+e._s(e.sliderAngle)+"° ")])])])])]),i("div",{staticClass:"vue-picture-cut-menu_box"},[i("div",{staticClass:"vue-picture-cut-menu_box-content"},[i("div",{staticClass:"vue-picture-cut-menu_box-list",staticStyle:{width:"179px"}},[i("div",{staticClass:"vue-picture-cut-menu_box-item v-p-icon_flip-v",on:{click:e.setFlipV}}),i("div",{staticClass:"vue-picture-cut-menu_box-item v-p-icon_flip-h",on:{click:e.setFlipH}}),i("span"),i("div",{staticClass:"vue-picture-cut-menu_box-item v-p-icon_rotate-left",on:{click:function(t){return e.rotate(90,!0)}}}),i("div",{staticClass:"vue-picture-cut-menu_box-item v-p-icon_rotate-right",on:{click:function(t){return e.rotate(-90,!0)}}})])])]),i("div",{staticClass:"vue-picture-cut-menu_confirm",staticStyle:{"max-width":"558px"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.cancel,expression:"cancel"}],staticClass:"__cancel",on:{click:function(t){return e.$emit("on-cancel")}}},[e._v(e._s(e.cancelName))]),i("div",{staticClass:"__sure",class:{__center:!e.cancel},on:{click:e.sureCut}},[e._v(e._s(e.confirmName))])])])},u=[],c={name:"mobileCropImageMenu",props:{theme:{type:String,default:"default"},maxPixel:{type:Number,required:!1},encoderOptions:{type:Number,required:!1},format:{type:String,required:!1},cancel:{type:Boolean,default:!0},cancelName:{type:String,default:"Cancel"},confirmName:{type:String,default:"Ok"},sizeAutoName:{type:String,default:"auto"},sizeRawName:{type:String,default:"raw"},menuRotateName:{type:String,default:"Rotate"}},data:function(){return{sliderAngle:0}},watch:{sliderAngle:function(e){if(this.photoRoot){var t=this.photoRoot.getEventList("PhotoMain");t&&t.setAngle(parseInt(e))}}},mounted:function(){this.photoRoot=this.$parent.photoRoot},methods:{sureCut:function(){if(this.photoRoot){var e=this.photoRoot.getEventList("PhotoMask");if(e){var t=e.clip(this.maxPixel,this.encoderOptions,this.format);t&&this.$emit("on-change",{blob:t.file,base64:t.src})}}},setMaskSize:function(e,t){if(this.photoRoot){var i=this.photoRoot.getEventList("PhotoMask");i&&(i.reset(e,t),i.setResize(!1))}},setMaskSizeToOriginal:function(){if(this.photoRoot){var e=this.photoRoot.getEventList("PhotoMain");e&&this.setMaskSize(e.imgRect.w,e.imgRect.h)}},setMaskResize:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(this.photoRoot){var t=this.photoRoot.getEventList("PhotoMask");t&&t.setResize(e)}},rotate:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.photoRoot&&e%360!==0){var i=this.photoRoot.getEventList("PhotoMain");if(i){var a=(i.showRect.r+e)%360;this.sliderAngle=a>180?a-360:a<-180?a+360:a,i.setAngle(i.showRect.r+e,t)}}},setFlipV:function(){if(this.photoRoot){var e=this.photoRoot.getEventList("PhotoMain");e&&e.setFlipV(1===e.showRect.sV,!0)}},setFlipH:function(){if(this.photoRoot){var e=this.photoRoot.getEventList("PhotoMain");e&&e.setFlipH(1===e.showRect.sH,!0)}}}},d=c,f=i(0),p=Object(f["a"])(d,r,u,!1,null,null,null),h=p.exports,m={name:"mobileCropImage",components:{MobileCropImageMenu:h},inject:{$dialog:{default:null}},props:{imgSrc:{type:String,default:""},aspectRatio:{type:String,default:"2/3"},maxSideWidth:{type:Number,default:0},isResize:Boolean,isRound:Boolean},data:function(){return{ready:!1}},computed:{mskOption:function(){var e=this.aspectRatio.split("/"),t=l()(e,2),i=t[0],a=t[1];return{width:parseInt(i),height:parseInt(a),isRound:this.isRound,resize:this.isResize}}},created:function(){var e=this;Object(o["c"])((function(){e.ready=!0}))},methods:{saveFileImg:function(e){var t;this.$emit("onChange",e.blob,e.base64),null===(t=this.$dialog)||void 0===t||t.close()},handleClose:function(){var e;this.$emit("onCancel"),null===(e=this.$dialog)||void 0===e||e.close()}}},g=m,v=Object(f["a"])(g,a,n,!1,null,null,null);t["default"]=v.exports}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_mobile_upload.js.map