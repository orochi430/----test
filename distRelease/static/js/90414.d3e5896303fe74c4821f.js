"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[90414],{90414:function(e,t,a){a.r(t),a.d(t,{default:function(){return i}});var n=a(25108),t={data:function(){return{userNmae:"",pk:this.$route.params.pk,iAgree:!1,imgHealth:[],imgJourney:[],imgNucleicAcid:[],specialRecord:"",showPersonType:!1,personTypes:[{id:1,name:"暂住"},{id:2,name:"常驻"}],personType:"",personTypeText:"",temperature:void 0,isToHighDanger:"0",isDiscomfort:"0",isAllVaccineInoc:"1",isContactDanger:"0",loading:null,errored:!1,meeting:dsf.util.loadSessionStore("meeting"),imgPreview:!1,previewImg:[],controls:[]}},computed:{readonly:function(){return!!this.pk},imgJourneyUrl:function(){return 0<this.imgJourney.length?this.imgJourney[0].url:""},imgHealthUrl:function(){return 0<this.imgHealth.length?this.imgHealth[0].url:""},imgNucleicAcidUrl:function(){return 0<this.imgNucleicAcid.length?this.imgNucleicAcid[0].url:""}},created:function(){this.init()},methods:{tempValidator:function(e){e=35<=e&&e<=42;return e||dsf.layer.toast("请输入正确的体温",!1),e},onFailed:function(e){n.log("failed",e)},showImgPreview:function(e){this.imgPreview=!0,this.previewImg=[e]},onSubmit:function(e){n.log("submit",e);var t=this;t.checkRequired()&&(t.loading=dsf.layer.loading(),t.controls.forEach(function(e){1==e.type?e.text=e.value:2==e.type&&(e.text="1"==e.value?"是":"否")}),e={id:null,bt:null,fid:t.meeting.id,personType:t.personType,personTypeText:t.personTypeText,temperature:t.temperature,isToHighDanger:t.isToHighDanger,isToHighDangerText:"0"==t.isToHighDanger?"否":"是",isDiscomfort:t.isDiscomfort,isDiscomfortText:"0"==t.isDiscomfort?"否":"是",isAllVaccineInoc:t.isAllVaccineInoc,isAllVaccineInocText:"0"==t.isAllVaccineInoc?"否":"是",isContactDanger:t.isContactDanger,isContactDangerText:"0"==t.isContactDanger?"否":"是",specialRecord:t.specialRecord,healthyCard:t.imgHealth[0].name,walkWayCard:t.imgJourney[0].name,checkCard:t.imgNucleicAcid[0].name,epSetups:t.controls},n.log("params",e),dsf.http.post("fn/sdycMeeting/saveEDData",e,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).done(function(e){"success"==e.type&&dsf.layer.toast("提交成",!0,function(){return t.$router.replace("SDYCConferenceIndex/".concat(t.meeting.id))})}).error(function(e){n.log("saveEDData-error",e)}).always(function(){dsf.layer.closeLoading(t.loading)}))},checkRequired:function(){var t,a=!0,e=this;return e.iAgree?e.personType?e.temperature?0==e.imgHealth.length?(a=!1,t="请上传健康码"):0==e.imgJourney.length?(a=!1,t="请上传行程码"):0==e.imgNucleicAcid.length&&(a=!1,t="请上传核酸检测"):(a=!1,t="请填写体温"):(a=!1,t="请选择人员类型"):(a=!1,t="请先阅读并勾选个人承诺"),e.controls.forEach(function(e){e.value||(a=!1,t=(1==e.type?"请填写":"请选择").concat(e.columnName))}),a||dsf.layer.toast(t,!1),a},afterReadHealth:function(e){this.uploadImage(e,0)},afterReadJourney:function(e){this.uploadImage(e,1)},afterReadNucleicAcid:function(e){this.uploadImage(e,2)},uploadImage:function(t,e){t.status="uploading",t.message="上传中...",dsf.http.upload("fn/sdycMeeting/uploadImage",{fileType:e},t).done(function(e){"success"==e.type?(t.status="done",t.name=e.data.fileName,t.url=dsf.url.getServerUrl("fn/sdycMeeting/downloadImage?fileName=".concat(e.data.fileName)),t.isImage=!0):(t.status="failed",t.message="上传失败",dsf.layer.toast(e.message))}).error(function(e){n.log("uploadImage-error",e),t.status="failed",t.message="上传失败"})},onPersonTypeSelect:function(e){this.showPersonType=!1,this.personType=e.id,this.personTypeText=e.name},init:function(){var t=this;t.loading=dsf.layer.loading(),t.pk?dsf.http.post("fn/sdycMeeting/getEDData",{pk:t.pk}).done(function(e){"success"==e.type&&(t.iAgree=!0,t.userNmae=e.data.ngr,t.personTypeText=e.data.personTypeText,t.temperature=e.data.temperature,t.isToHighDanger=e.data.isToHighDanger,t.isDiscomfort=e.data.isDiscomfort,t.isAllVaccineInoc=e.data.isAllVaccineInoc,t.isContactDanger=e.data.isContactDanger,t.specialRecord=e.data.specialRecord,t.imgHealth.push({url:dsf.url.getServerUrl("fn/sdycMeeting/downloadImage?fileName=".concat(e.data.healthyCard,"&infoId=").concat(t.pk)),isImage:!0,name:e.data.healthyCard}),t.imgJourney.push({url:dsf.url.getServerUrl("fn/sdycMeeting/downloadImage?fileName=".concat(e.data.walkWayCard,"&infoId=").concat(t.pk)),isImage:!0,name:e.data.walkWayCard}),t.imgNucleicAcid.push({url:dsf.url.getServerUrl("fn/sdycMeeting/downloadImage?fileName=".concat(e.data.checkCard,"&infoId=").concat(t.pk)),isImage:!0,name:e.data.checkCard}),t.controls=e.data.epSetups)}).error(function(e){n.log("getPersonTypes-error",e)}).always(function(){dsf.layer.closeLoading(t.loading)}):(t.userNmae=dsf.util.loadSessionStore("user").name,t.getPersonTypes(),t.getCustomItems())},getPersonTypes:function(){var t=this;dsf.http.get("fn/sdycMeeting/getPersonTypes").done(function(e){"success"==e.type&&(t.personTypes=e.data.map(function(e){return{id:e.value,name:e.text}}))}).error(function(e){n.log("getPersonTypes-error",e)}).always(function(){dsf.layer.closeLoading(t.loading)})},getCustomItems:function(){var t=this;dsf.http.post("fn/sdycMeeting/getCustomItems",{meetingId:t.meeting.id}).done(function(e){"success"==e.type&&(t.controls=e.data)}).error(function(e){n.log("getCustomItems-error",e)}).always(function(){dsf.layer.closeLoading(t.loading)})}}},i=(0,a(51900).Z)(t,function(){var a=this,n=a._self._c;return n("div",{staticClass:"contaniner"},[a.errored?n("div",{staticClass:"init-div"},[a._v("\n    您进行了未授权的访问,请重新登录！\n  ")]):a._e(),a._v(" "),n("div",{staticClass:"declare"},[n("van-form",{on:{submit:a.onSubmit,failed:a.onFailed}},[n("van-cell-group",[a.readonly?a._e():n("van-cell",{scopedSlots:a._u([{key:"title",fn:function(){return[n("div",{staticClass:"title"},[n("span",{staticClass:"bar"}),a._v(" "),n("span",{staticClass:"txt"},[a._v("填写防疫申报表单")])])]},proxy:!0}],null,!1,2184643356)}),a._v(" "),n("van-cell",{attrs:{title:"姓名",value:a.userNmae}}),a._v(" "),n("van-cell",{attrs:{"is-link":!a.readonly,value:a.readonly?a.personTypeText:a.personTypeText||"请选择",rules:[{required:!0,message:"请选择用户类型"}],center:""},on:{click:function(e){a.showPersonType=!0}},scopedSlots:a._u([{key:"title",fn:function(){return[a.readonly?a._e():n("span",{staticClass:"asterisk"},[a._v("*")]),a._v("人员类型\n          ")]},proxy:!0}])}),a._v(" "),a.readonly?a._e():n("van-action-sheet",{attrs:{actions:a.personTypes},on:{select:a.onPersonTypeSelect},model:{value:a.showPersonType,callback:function(e){a.showPersonType=e},expression:"showPersonType"}}),a._v(" "),n("van-field",{attrs:{type:"number",placeholder:"请输入体温","input-align":"right",readonly:a.readonly,rules:[{validator:a.tempValidator,message:"请输入正确的体温"}],center:""},scopedSlots:a._u([{key:"label",fn:function(){return[a.readonly?a._e():n("span",{staticClass:"asterisk"},[a._v("*")]),a._v("体温（℃）\n          ")]},proxy:!0}]),model:{value:a.temperature,callback:function(e){a.temperature=e},expression:"temperature"}}),a._v(" "),a.readonly?n("div",a._l(a.controls,function(e,t){return n("van-cell",{key:t,attrs:{title:e.columnName,value:1==e.type?e.value:e.text}})}),1):n("div",a._l(a.controls,function(t,e){return n("van-field",{key:e,attrs:{"input-align":"right",placeholder:"请填写内容"},scopedSlots:a._u([{key:"label",fn:function(){return[a.readonly?a._e():n("span",{staticClass:"asterisk"},[a._v("*")]),a._v(a._s(t.columnName)+"\n            ")]},proxy:!0},a.readonly||2!=t.type?null:{key:"input",fn:function(){return[n("van-radio-group",{attrs:{direction:"horizontal"},model:{value:t.value,callback:function(e){a.$set(t,"value",e)},expression:"item.value"}},[n("van-radio",{attrs:{name:"1"}},[a._v("是")]),a._v(" "),n("van-radio",{attrs:{name:"0"}},[a._v("否")])],1)]},proxy:!0}],null,!0),model:{value:t.value,callback:function(e){a.$set(t,"value",e)},expression:"item.value"}})}),1),a._v(" "),n("van-cell",{scopedSlots:a._u([{key:"title",fn:function(){return[n("div",[a._v("特别情况记录：")]),a._v(" "),a.readonly?n("div",{staticClass:"textarea"},[a._v(a._s(a.specialRecord))]):n("van-field",{staticClass:"textarea",attrs:{rows:"1",autosize:"",type:"textarea",maxlength:"100",placeholder:"请输入备注","show-word-limit":"",readonly:a.readonly},model:{value:a.specialRecord,callback:function(e){a.specialRecord=e},expression:"specialRecord"}})]},proxy:!0}])}),a._v(" "),n("van-cell",{scopedSlots:a._u([{key:"title",fn:function(){return[n("div",{staticClass:"upload_msg"},[a.readonly?a._e():n("span",{staticClass:"asterisk"},[a._v("*")]),a._v("健康码、行程码、核酸检测的截图：\n            ")]),a._v(" "),a.readonly?n("van-image",{attrs:{width:"1.6rem",height:"1.6rem",fit:"contain",src:a.imgHealthUrl},on:{click:function(e){return a.showImgPreview(a.imgHealthUrl)}}}):n("van-uploader",{attrs:{"after-read":a.afterReadHealth,"max-count":1},scopedSlots:a._u([{key:"preview-cover",fn:function(e){e.file;return[n("div",{staticClass:"preview-cover van-ellipsis"},[a._v("健康码")])]}}]),model:{value:a.imgHealth,callback:function(e){a.imgHealth=e},expression:"imgHealth"}},[n("div",{staticClass:"imgbox"},[n("van-image",{attrs:{width:"28",height:"24",src:"static/images/shandongyancao/conference/camera.png"}}),a._v(" "),n("div",[a._v("健康码")])],1)]),a._v(" "),a.readonly?n("van-image",{attrs:{width:"1.6rem",height:"1.6rem",fit:"contain",src:a.imgJourneyUrl},on:{click:function(e){return a.showImgPreview(a.imgJourneyUrl)}}}):n("van-uploader",{attrs:{"after-read":a.afterReadJourney,"max-count":1},scopedSlots:a._u([{key:"preview-cover",fn:function(e){e.file;return[n("div",{staticClass:"preview-cover van-ellipsis"},[a._v("行程码")])]}}]),model:{value:a.imgJourney,callback:function(e){a.imgJourney=e},expression:"imgJourney"}},[n("div",{staticClass:"imgbox"},[n("van-image",{attrs:{width:"28",height:"24",src:"static/images/shandongyancao/conference/camera.png"}}),a._v(" "),n("div",[a._v("行程码")])],1)]),a._v(" "),a.readonly?n("van-image",{attrs:{width:"1.6rem",height:"1.6rem",fit:"contain",src:a.imgNucleicAcidUrl},on:{click:function(e){return a.showImgPreview(a.imgNucleicAcidUrl)}}}):n("van-uploader",{attrs:{"after-read":a.afterReadNucleicAcid,"max-count":1},scopedSlots:a._u([{key:"preview-cover",fn:function(e){e.file;return[n("div",{staticClass:"preview-cover van-ellipsis"},[a._v("核酸检测")])]}}]),model:{value:a.imgNucleicAcid,callback:function(e){a.imgNucleicAcid=e},expression:"imgNucleicAcid"}},[n("div",{staticClass:"imgbox"},[n("van-image",{attrs:{width:"28",height:"24",src:"static/images/shandongyancao/conference/camera.png"}}),a._v(" "),n("div",[a._v("核酸检测")])],1)])]},proxy:!0}])}),a._v(" "),n("van-cell",{scopedSlots:a._u([{key:"title",fn:function(){return[n("div",[a.readonly?a._e():n("span",{staticClass:"asterisk"},[a._v("*")]),a._v("本次会议防疫政策：\n            ")]),a._v(" "),a.readonly?n("div",{staticClass:"textarea"},[a._v("\n              "+a._s(a.meeting.edPolicy)+"\n            ")]):n("van-checkbox",{attrs:{shape:"square",disabled:a.readonly},model:{value:a.iAgree,callback:function(e){a.iAgree=e},expression:"iAgree"}},[a._v("\n              "+a._s(a.meeting.edPolicy)+"\n            ")])]},proxy:!0}])})],1),a._v(" "),a.readonly?a._e():n("div",{staticClass:"blank"}),a._v(" "),a.readonly?a._e():n("div",{staticClass:"btn-container"},[n("van-button",{staticClass:"btn",attrs:{type:"info","native-type":"submit"}},[a._v("\n          我要提交\n        ")])],1)],1)],1),a._v(" "),n("van-image-preview",{attrs:{images:a.previewImg,closeable:""},model:{value:a.imgPreview,callback:function(e){a.imgPreview=e},expression:"imgPreview"}})],1)},[],!1,null,"f01854f8",null).exports}}]);