"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[92642],{92642:function(t,e,i){i.r(e),i.d(e,{default:function(){return s}});var e=i(62689),o=i(25108),e={name:"topicDetail",components:{file:e.default},data:function(){return{showPercent:!1,showVote:!1,showStatus:!1,statusRadio:"1",showResult:!1,resultRadio:"1",showDetail:!1,detail:"",lists:[{attendDept:"测试部门2",reporter:"李斌",reporterDept:"办公厅",id:"2206241232282po1UvmledWDH4YZtxC",attach:[{fileName:"正文.docx",moduleId:"210607181937YJxUC5fve4y7q3SH5hJ",nodeId:"1",flowId:"0",fileId:"220624123304J8715c6MjsSF0WwtMZB"}],title:"议题1",is_yd:!1,is_show:!0,tag:"民生类",reportTime:"5"}],imgType:["jpeg","bmp","webp","svgz","svg","gif","jpg","ico","png","tif"],imgPreview:!1,previewImg:[],showFile:!1,filename:"",fileUrl:"",fileType:""}},computed:{},watch:{},methods:{toggle:function(t){this.$set(this.lists[t],"show",!this.lists[t].show)},initTopicData:function(){var e=this;dsf.http.post("/fn/meetingNotice/getTopic",{pk:this.formData.main.A0001.value}).then(function(t){o.log(t.data.data),200==t.data.code&&0<t.data.data.length&&(t.data.data.forEach(function(t,e){t.show=0==e,t.attach&&0<t.attach.length&&t.attach.forEach(function(t){t.ext="",t.ext=t.fileName.substr(t.fileName.lastIndexOf(".")+1).toLowerCase()}),o.log(t.attach)}),e.lists=t.data.data)})},openFile:function(t){var e=this,s=(o.log(t),this.filename=t.fileName,this.fileType=t.fileName.substr(t.fileName.lastIndexOf(".")+1),dsf.util.loadSessionStore("loginToken")),a="";-1<this.imgType.indexOf(this.fileType)?(a=dsf.url.getServerUrl("fn/mobileFileDownload/download?fileId=".concat(t.fileId,"&moduleId=").concat(this.moduleId,"&fileName=").concat(t.fileName)),this.imgPreview=!0,this.previewImg=[a]):(a=dsf.url.getServerUrl("fn/office/openMobileOffice?fileId=".concat(t.fileId,"&moduleId=").concat(this.moduleId,"&x-auth-token=").concat(s)),4==dsf.config.previewSetting.previewType?dsf.http.post("fn/office/mobile/wpsPreview",{fileId:t.fileId,readOnly:0<t.canEdit}).then(function(t){t=t.data;e.showFile=!0,e.fileUrl=t.data}):dsf.config.commonForm.webViewPreview?(s=dsf.config.serverUrl+dsf.config.webRoot+a.replace("../",""),o.log(s),xsfWindow.openWebView({title:t.fileName,url:s,colorString:"#111111"})):(this.showFile=!0,this.fileUrl=a))},closeFile:function(){this.showFile=!1},detailClick:function(){this.showDetail=!0}},created:function(){},mounted:function(){},destroyed:function(){}},s=(0,i(51900).Z)(e,function(){var s=this,a=s._self._c;return a("div",{staticClass:"meettingTopic"},[s._l(s.lists,function(t,e){return a("div",{key:e,staticClass:"lists"},[a("div",{staticClass:"texts active"},[a("div",{staticClass:"inputs"},[a("span",[s._v("议题名称：")]),s._v(" "),a("p",[s._v(s._s(t.title))])]),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("汇报人员：")]),s._v(" "),a("p",[s._v(s._s(t.reporter))])]),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("汇报部门：")]),s._v(" "),a("p",[s._v(s._s(t.reporterDept))])]),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("汇报时长：")]),s._v(" "),a("p",[s._v(s._s(t.reportTime?t.reportTime+"(分钟)":""))])]),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("参会部门：")]),s._v(" "),a("p",[s._v(s._s(t.attendDept))])]),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("议题标签：")]),s._v(" "),a("p",[s._v(s._s(t.tag))])]),s._v(" "),s._m(0,!0),s._v(" "),0<t.attach.length?a("div",{staticClass:"files"},s._l(t.attach,function(e){return a("div",{key:e.id,on:{click:function(t){return s.openFile(e)}}},[a("span",[a("van-image",{attrs:{src:"../../../../static/images/fileType/"+e.ext+".png"},scopedSlots:s._u([{key:"error",fn:function(){return[a("img",{attrs:{src:i(54073),alt:"",srcset:""}})]},proxy:!0}],null,!0)})],1),s._v(" "),a("p",[s._v(s._s(e.fileName))])])}),0):s._e(),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("议题状态：")]),s._v(" "),a("p",[s._v("未开始")]),s._v(" "),a("van-icon",{attrs:{name:"arrow"},on:{click:function(t){s.showStatus=!0}}})],1),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("审议结果：")]),s._v(" "),a("p",[s._v("未开始")]),s._v(" "),a("van-icon",{attrs:{name:"arrow"},on:{click:function(t){s.showResult=!0}}})],1),s._v(" "),a("div",{staticClass:"inputs"},[a("span",[s._v("审议明细：")]),s._v(" "),a("p",[s._v("未开始")]),s._v(" "),a("van-icon",{attrs:{name:"arrow"},on:{click:s.detailClick}})],1)])])}),s._v(" "),a("div",{staticClass:"biaojue"},[s._v("投票表决")]),s._v(" "),a("div",{staticClass:"showNext"},[s._v("查看下一个议题详情")]),s._v(" "),a("van-image-preview",{attrs:{images:s.previewImg,closeable:""},model:{value:s.imgPreview,callback:function(t){s.imgPreview=t},expression:"imgPreview"}}),s._v(" "),a("van-popup",{staticClass:"file-preview",staticStyle:{height:"100vh"},attrs:{"close-on-click-overlay":!0,"lock-scroll":"",position:"bottom"},model:{value:s.showFile,callback:function(t){s.showFile=t},expression:"showFile"}},[a("van-nav-bar",{attrs:{title:s.filename,"left-text":"返回","left-arrow":"",fixed:"",placeholder:""},on:{"click-left":s.closeFile}}),s._v(" "),a("file",{style:{height:"calc(100vh - ".concat(s.dsf.util.getOffsetTop("0.92rem"),")")},attrs:{"file-url":s.fileUrl}})],1),s._v(" "),a("van-dialog",{attrs:{title:"议题状态","show-cancel-button":"",confirmButtonColor:"#3478F7",cancelButtonColor:"#999"},model:{value:s.showStatus,callback:function(t){s.showStatus=t},expression:"showStatus"}},[a("div",{staticClass:"warpBox"},[a("van-radio-group",{attrs:{"checked-color":"#3478F7"},model:{value:s.statusRadio,callback:function(t){s.statusRadio=t},expression:"statusRadio"}},[a("van-radio",{attrs:{name:"1"}},[s._v("未开始")]),s._v(" "),a("van-radio",{attrs:{name:"2"}},[s._v("进行中")]),s._v(" "),a("van-radio",{attrs:{name:"3"}},[s._v("已结束")])],1)],1)]),s._v(" "),a("van-dialog",{attrs:{title:"审议结果","show-cancel-button":"",confirmButtonColor:"#3478F7",cancelButtonColor:"#999"},model:{value:s.showResult,callback:function(t){s.showResult=t},expression:"showResult"}},[a("div",{staticClass:"warpBox"},[a("van-radio-group",{attrs:{"checked-color":"#3478F7"},model:{value:s.resultRadio,callback:function(t){s.resultRadio=t},expression:"resultRadio"}},[a("van-radio",{attrs:{name:"1"}},[s._v("未通过")]),s._v(" "),a("van-radio",{attrs:{name:"2"}},[s._v("已通过")]),s._v(" "),a("van-radio",{attrs:{name:"3"}},[s._v("待定")])],1)],1)]),s._v(" "),a("van-dialog",{attrs:{title:"审议明细","show-cancel-button":"",confirmButtonColor:"#3478F7",cancelButtonColor:"#999"},model:{value:s.showDetail,callback:function(t){s.showDetail=t},expression:"showDetail"}},[a("div",{staticClass:"warpBox warpBox1"},[a("van-field",{attrs:{rows:"5",autosize:"",type:"textarea",maxlength:"500",placeholder:"请输入审议明细"},model:{value:s.detail,callback:function(t){s.detail=t},expression:"detail"}})],1)]),s._v(" "),a("van-popup",{staticClass:"votePopup",model:{value:s.showVote,callback:function(t){s.showVote=t},expression:"showVote"}},[a("div",{staticClass:"vote"},[a("van-icon",{attrs:{name:"cross"}}),s._v(" "),a("div",{staticClass:"title"},[s._v("\n                议题表决\n            ")]),s._v(" "),a("div",{staticClass:"subtitle"},[s._v("\n                关于议题1：*****************的意见\n            ")]),s._v(" "),a("div",{staticClass:"options"},[a("span",{staticClass:"active"},[s._v("A 通过")]),s._v(" "),a("span",[s._v("B 不通过")]),s._v(" "),a("span",[s._v("C 弃权")])]),s._v(" "),a("van-button",{attrs:{type:"info",size:"small",color:"#3478F7"}},[s._v("提交")])],1)]),s._v(" "),a("van-popup",{staticClass:"votePopup",model:{value:s.showPercent,callback:function(t){s.showPercent=t},expression:"showPercent"}},[a("div",{staticClass:"vote"},[a("van-icon",{attrs:{name:"cross"}}),s._v(" "),a("div",{staticClass:"title"},[s._v("\n                表决结果\n            ")]),s._v(" "),a("div",{staticClass:"percent"},[a("div",[a("span",{staticClass:"item"},[s._v("A 通过")]),s._v(" "),a("div",{staticClass:"perc"},[a("p",[a("span",{staticStyle:{width:"60%"}})]),s._v(" "),a("span",[s._v("30%")])])]),s._v(" "),a("div",[a("span",{staticClass:"item"},[s._v("B 不通过")]),s._v(" "),a("div",{staticClass:"perc"},[a("p",[a("span",{staticStyle:{width:"60%"}})]),s._v(" "),a("span",[s._v("30%")])])]),s._v(" "),a("div",[a("span",{staticClass:"item"},[s._v("C 弃权")]),s._v(" "),a("div",{staticClass:"perc"},[a("p",[a("span",{staticStyle:{width:"60%"}})]),s._v(" "),a("span",[s._v("30%")])])])])],1)])],2)},[function(){var t=this._self._c;return t("div",{staticClass:"inputs",staticStyle:{border:"none"}},[t("span",[this._v("议题材料：")])])}],!1,null,"743b6802",null).exports},54073:function(t,e,s){t.exports=s.p+"static/img/cloud.e0e5c0c..png"}}]);