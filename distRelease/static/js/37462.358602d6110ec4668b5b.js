"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[37462],{5287:function(e,t,i){i.d(t,{Z:function(){return o}});var n=i(25108),t={components:{EnclosurePreview:function(){return Promise.all([i.e(97805),i.e(82060),i.e(31204)]).then(i.bind(i,82060))}},data:function(){return{imgPreview:!1,previewImg:[],popFile:{},showFile:!1,filename:"",isPreview:!0,currentFile:{},fileUrl:"",isSignature:null==dsf.util.loadSessionStore("meeting").allowComments||dsf.util.loadSessionStore("meeting").allowComments,appTopMenu:dsf.config.appTopMenu.value}},methods:{open:function(e){var t;dsf.util.isImage(e.fileName)?(t="",t="peopleCongressFile"==this.$route.name||"210902111649AhoKqvPNPCT90ktfWET"===e.officeModuleId?dsf.url.getWebPath("fn/conferenceFile/download?pk=".concat(e.fileId)):dsf.url.getWebPath("fn/mobileFileDownload/download?fileId=".concat(e.fileId,"&moduleId=").concat(e.moduleId,"&fileName=").concat(e.fileName)),n.log(t),this.imgPreview=!0,this.previewImg=[t]):navigator.userAgent.includes("DreamSoft")&&dsf.config.commonForm.nativeWps?this.wpsOpen(e):(dsf.config.commonForm.LocalDocPreview?this.popFile=e:(t=dsf.url.getServerUrl("fn/office/openMobileOffice?fileId=".concat(e.fileId,"&moduleId=").concat(e.moduleId,"&nodeId=").concat(e.nodeId,"&flowId=").concat(e.flowId,"&filename=").concat(e.fileName,"&x-auth-token=").concat(dsf.util.loadSessionStore("loginToken"),"&handwriting=1&screenWidth=").concat(document.body.clientWidth)),e.officeModuleId&&(t+="&officeModuleId=".concat(e.officeModuleId)),this.fileUrl=t),this.filename=e.fileName,this.showFile=!0)},goPreview:function(){this.isPreview=!0},goHandWrite:function(){this.isPreview=!1},closeFile:function(){this.showFile=!1,dsf.config.commonForm.LocalDocPreview&&this.$refs.enclosurePreview.destroyInterval()},wpsOpen:function(e){var t=dsf.url.getRootPath(),i=dsf.util.loadSessionStore("loginToken"),t={keepCallback:!0,downUrl:t+"fn/file/download?infoId=".concat(e.id,"&fileId=").concat(e.fileId,"&fileName=").concat(e.fileName,"&moduleId=").concat(e.moduleId,"&x-auth-token=").concat(i,"&fullfilename=").concat(e.fileName),saveUrl:"",fileName:e.fileName,openWithWPS:!0,uploadFile:!0,openMode:"readOnly",enterReviseMode:!1,showReviewingPaneRightDefault:!1,userName:dsf.util.loadSessionStore("user").name};n.log(t),$WPS.downAndOpen(t,function(e){n.log(e)},function(e){n.log("错误回调",e)})}}},o=(0,i(51900).Z)(t,function(){var t=this,e=t._self._c;return e("div",{staticClass:"enclosurePop"},[e("van-image-preview",{attrs:{images:t.previewImg,closeable:""},model:{value:t.imgPreview,callback:function(e){t.imgPreview=e},expression:"imgPreview"}}),t._v(" "),e("van-popup",{staticClass:"file-preview",staticStyle:{height:"100vh"},attrs:{"close-on-click-overlay":!0,"lock-scroll":"",position:"bottom"},model:{value:t.showFile,callback:function(e){t.showFile=e},expression:"showFile"}},[e("van-nav-bar",{attrs:{title:t.filename,fixed:"",placeholder:""},on:{"click-left":t.closeFile,"click-right":t.closeFile},scopedSlots:t._u([t.appTopMenu?{key:"left",fn:function(){return[e("van-icon",{attrs:{name:"arrow-left"}}),t._v("返回\n        ")]},proxy:!0}:{key:"right",fn:function(){return[e("span",[t._v("关闭文件")])]},proxy:!0}],null,!0)}),t._v(" "),t.dsf.config.commonForm.LocalDocPreview?e("enclosure-preview",{ref:"enclosurePreview",attrs:{file:t.popFile,"is-preview":t.isPreview,"is-signature":t.isSignature,isShowCurPerson:!0,officeModuleId:t.popFile.officeModuleId||""},on:{goPreview:t.goPreview,goHandWrite:t.goHandWrite}}):e("div",{staticClass:"content"},[e("iframe",{attrs:{src:t.fileUrl,frameborder:"0"}})])],1)],1)},[],!1,null,"dfeb2380",null).exports},34755:function(e,t,s){s.d(t,{Z:function(){return i}});var t={components:{collapseTransition:s(25540).Z},props:{topics:{type:Array,default:function(){}},defaultFileLength:{type:Number,default:4},showAllTopic:{type:Boolean,default:!0},meetingId:{type:String},nextCss:{type:Boolean,default:!1}},data:function(){return{}},methods:{showAllFiles:function(e){e.showAllFiles=!e.showAllFiles},enterTopocsDetail:function(e){1==e.haveRole&&this.$router.push({path:"/commonForm/210607181937YJxUC5fve4y7q3SH5hJ/".concat(e.id),query:{listId:"MeetingList",method:"viewYt",showNodeId:"15",validateByList:"1",meetingId:this.meetingId,checkRole:"1"}})},openFile:function(e,t){"shandongtong"==dsf.config.projectName?this.$router.push({name:"meetingPreview",params:{file:e},query:{infoId:t.id,title:t.title}}):this.$emit("openFile",e)},getReviewStatusImg:function(e){switch(e){case"待定":return s(63102);case"通过":return s(21581);case"未通过":return s(44480);default:return""}}}},i=(0,s(51900).Z)(t,function(){var n=this,o=n._self._c;return o("div",[n._l(n.topics,function(i,e){return[o("collapseTransition",[o("div",{directives:[{name:"show",rawName:"v-show",value:n.showAllTopic||1==i.haveRole,expression:"showAllTopic || item.haveRole == 1"}],key:e,staticClass:"card",class:{currentCard:"进行中"==i.conductText&&1==i.haveRole}},[o("div",{staticClass:"topic-item"},[o("div",{staticClass:"topic-top",on:{click:function(e){return n.enterTopocsDetail(i)}}},[o("div",{staticClass:"title top-tit"},[o("span",[n._v(n._s(i.title))]),n._v(" "),n.nextCss?o("span",[n._v("预计：10:00-12:00")]):n._e()]),n._v(" "),n.nextCss?n._e():o("div",[i.conductText?o("span",{staticClass:"ingtag",class:{"gray-tag":"进行中"!=i.conductText}},[n._v(n._s(i.conductText))]):n._e(),n._v(" "),o("span",{staticClass:"sub"},[n._v("汇报人："+n._s(i.reporter))]),n._v(" "),n.nextCss||"已结束"==i.conductText?n._e():o("span",[n._v(n._s("预计："+i.startTime+" "+(null==(e=i.ytKssj)?void 0:e.substr(11))+"-"+(null==(e=i.ytJssj)?void 0:e.substr(11))))]),n._v(" "),n.nextCss||"已结束"!=i.conductText?n._e():o("span",[n._v(n._s("预计："+i.sjstartTime+" "+(null==(e=i.ytSjKssj)?void 0:e.substr(11))+"-"+(null==(e=i.ytSjJssj)?void 0:e.substr(11))))])]),n._v(" "),i.tag?o("div",[n._l(i.tag.split(","),function(e){return o("span",{key:e,staticClass:"type-tag"},[n._v(n._s(e))])}),n._v(" "),i.reportTime?o("span",{staticClass:"type-tag"},[n._v(n._s(i.reportTime)+"min")]):n._e()],2):n._e(),n._v(" "),i.reviewStatus&&!n.nextCss?o("div",{staticClass:"reviewStatus"},[o("img",{attrs:{src:n.getReviewStatusImg(i.reviewStatus),alt:""}})]):n._e()]),n._v(" "),n.nextCss?n._e():o("div",{staticClass:"topic-remind"}),n._v(" "),i.files&&!n.nextCss?o("div",{staticClass:"topic-file"},[o("div",{staticClass:"title"},[n._v("议题材料")]),n._v(" "),n._l(i.files.slice(0,n.defaultFileLength),function(t,e){return o("div",{staticClass:"file-item flex as",on:{click:function(e){return e.stopPropagation(),n.openFile(t,i)}}},[o("img",{attrs:{src:n.dsf.util.getFileTypeIcon(t.fileName),alt:""}}),n._v(" "),o("span",[n._v(n._s(t.fileName))])])}),n._v(" "),o("collapseTransition",[o("div",{directives:[{name:"show",rawName:"v-show",value:i.showAllFiles,expression:"item.showAllFiles"}]},n._l(i.files.slice(n.defaultFileLength),function(t,e){return o("div",{staticClass:"file-item flex as",on:{click:function(e){return e.stopPropagation(),n.openFile(t)}}},[o("img",{attrs:{src:n.dsf.util.getFileTypeIcon(t.fileName),alt:""}}),n._v(" "),o("span",[n._v(n._s(t.fileName))])])}),0)])],2):n._e(),n._v(" "),i.files&&i.files.length>n.defaultFileLength?o("div",{staticClass:"arrow",class:{down:!i.showAllFiles},on:{click:function(e){return e.stopPropagation(),n.showAllFiles(i)}}},[o("img",{attrs:{src:s(22244),alt:""}})]):n._e()])])])]})],2)},[],!1,null,"0c985dd6",null).exports},37462:function(e,t,i){i.r(t),i.d(t,{default:function(){return o}});var t=i(34755),n=i(5287),t={components:{topicItem:t.Z,enclosurePopup:n.Z},props:{allMeetingTopics:{type:Array},meetingId:{type:String},modal:{type:String,default:"form"}},data:function(){return{activeName:0,loading:null,meetingTopics:[],isNoData:!1}},watch:{allMeetingTopics:function(e,t){this.meetingTopics=e}},created:function(){this.getMyAgendas()},mounted:function(){},methods:{getMyAgendas:function(){var t=this;this.isNoData=!1,this.allMeetingTopics?this.meetingTopics=this.allMeetingTopics:(this.loading=dsf.layer.loading(),dsf.http.post("fn/conferenceMobile/meetingTopics",{meetingId:this.$route.params.id}).done(function(e){200==e.code&&e.data?(t.meetingTopics=e.data,t.meetingTopics.forEach(function(e){e.files.forEach(function(e){e.id=e.fileId,e.isHandwrite="1"})})):t.isNoData=!0}).error(function(e){}).always(function(){dsf.layer.closeLoading(t.loading)}))},openFile:function(e){this.$refs.enclosurePopup.open(e)}}},o=(0,i(51900).Z)(t,function(){var e=this,t=e._self._c;return t("div",{staticClass:"meetIngTopics",class:{index:"form"!==e.modal}},[t("topic-item",{attrs:{topics:e.meetingTopics},on:{openFile:e.openFile}}),e._v(" "),e.isNoData?t("commonempty"):e._e(),e._v(" "),t("enclosurePopup",{ref:"enclosurePopup"})],1)},[],!1,null,null,null).exports},25540:function(e,t){const i="0.3s height ease-in-out",n={beforeEnter(e){e.style.transition=i,e.dataset||(e.dataset={}),e.style.height=0},enter(e){0!==e.scrollHeight?e.style.height=e.scrollHeight+"px":e.style.height="",e.style.overflow="hidden"},afterEnter(e){e.style.transition="",e.style.height=""},beforeLeave(e){e.dataset||(e.dataset={}),"flex"!==e.style.display&&(e.style.display="block"),e.style.height=e.scrollHeight+"px",e.style.overflow="hidden"},leave(e){0!==e.scrollHeight&&(e.style.transition=i,e.style.height=0)},afterLeave(e){e.style.transition="",e.style.height=""}};t.Z={name:"CollapseTransition",functional:!0,render(e,{children:t}){return e("transition",{on:n},t)}}},22244:function(e,t,i){e.exports=i.p+"static/img/arrow.facd9fe..png"},44480:function(e,t,i){e.exports=i.p+"static/img/fail.baf0b80..png"},21581:function(e,t,i){e.exports=i.p+"static/img/pass.49907fc..png"},63102:function(e,t,i){e.exports=i.p+"static/img/pending.5704090..png"}}]);