"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[87210],{87210:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var n=i(77193),e=i(8450),s=i.n(e),e=i(18868),o=i(4812),a=i(25108),e={name:"controlOpintionBtn",components:{DebounceClick:e.Z,OpinionSign:o.Z},props:{formData:{type:Object,default:function(){return{}}},formMeta:{type:Object,default:function(){return{}}}},data:function(){return{isShow:!1,value:"",tags:[],opinionRequired:1,errorMessage:"",_loading:"",flowKey:"",customNode:"",customId:"",xpath:"",isSign:0,signName:"",signTime:"",user:dsf.util.loadSessionStore("user")}},mounted:function(){this.getAdvice()},computed:{},watch:{value:function(t){0<t.length&&(this.errorMessage="")}},methods:{Sign:function(){this.isSign?this.isSign=0:(this.value="",this.isSign=1,this.signName=this.user.name,this.signTime=dsf.date.format(new Date,"yyyy-mm-dd"))},addContent:function(t){this.value=t.context,this.isSign=0},clearTags:function(t){var e=this;this.$dialog.confirm({title:"提示",message:"确定要删除吗？"}).then(function(){dsf.http.get("fn/mobileUsedOpinion/delete?id="+t.id).then(function(){e.getAdvice()})})},getAdvice:function(){var e=this;dsf.http.get("fn/mobileUsedOpinion/find").then(function(t){e.tags=t.data.rows})},addTemplate:function(){var e=this;""!=this.value?dsf.http.post("fn/mobileUsedOpinion/add",{__DATA:s()({opinion:this.value})}).then(function(t){e.getAdvice()}):dsf.layer.toast("请输入内容")},subOpinion:function(){this.saveOpinion("send")},saveOpinion:function(t){this.formData.flowinfo=(0,n.Z)({},this.flowKey,{id:this.customId,fid:this.formMeta.parameters.pnId,infoId:this.formMeta.parameters.pk,pid:this.formMeta.parameters.pId,pnid:this.formMeta.parameters.pnId,nodeId:this.formMeta.parameters.nodeId,wfId:this.formMeta.parameters.flowId,opinionContent:this.value,handwritePic:"",handwriteThumb:"",nodeName:this.formMeta.parameters.nodeName,isSign:this.isSign,signName:this.signName,signTime:this.signTime,opinionUsers:"",opinionUsersText:"",duserId:this.user.user_id,duserName:this.user.name,userId:this.user.user_id,userName:this.user.name,opinionFiles:[],customNode:this.customNode,customId:this.customId,editOpinionUser:this.user.name,editOpinionUserId:this.user.user_id}),a.log(this.formData.flowinfo),this.$emit("setOpinion",{content:this.value,isSign:this.isSign}),this.Show(),t&&this.$emit("send")},Show:function(){this.isShow=!this.isShow},setXpath:function(t){var e=this;this.xpath=t,this.flowKey="flow-".concat(this.formMeta.parameters.pk,"-").concat(this.formMeta.parameters.pId||0,"-").concat(this.formData.pnId||this.formMeta.parameters.pk,"-").concat(this.xpath||"QlMfchQAgMraxzKv"),a.log(this.flowKey),dsf.http.get("fn/mobileTodo/getCustomNode",{pk:this.formMeta.parameters.pk,userId:this.user.user_id,xpath:this.xpath}).then(function(t){e.customNode=t.data.customNode||"",e.customId=t.data.customId||""})}}},r=(0,i(51900).Z)(e,function(){var i=this,n=i._self._c;return n("div",{staticClass:"opintionView"},[n("van-popup",{attrs:{position:"bottom","get-container":"#app",round:""},model:{value:i.isShow,callback:function(t){i.isShow=t},expression:"isShow"}},[n("van-nav-bar",{attrs:{title:"填写意见","left-text":"取消","right-text":"设为常用意见"},on:{"click-left":function(t){return i.Show()},"click-right":i.addTemplate}}),i._v(" "),0==i.isSign?n("van-cell-group",{staticClass:"_file"},[n("van-field",{ref:"editOpinion",attrs:{"error-message":i.errorMessage,type:"textarea",rows:"10",autofocus:"",autosize:"",placeholder:"请输入意见"},model:{value:i.value,callback:function(t){i.value=t},expression:"value"}})],1):n("OpinionSign",{attrs:{signName:i.signName,signTime:i.signTime}}),i._v(" "),i.tags.length?n("div",{staticClass:"_file_log"},i._l(i.tags,function(e,t){return n("van-tag",{key:t,staticClass:"_file_tags",attrs:{size:"medium",type:"primary",closeable:!0},on:{close:function(t){return i.clearTags(e)},click:function(t){return i.addContent(e)}}},[i._v(i._s(e.context))])}),1):i._e(),i._v(" "),n("van-goods-action",[n("debounce-click",[n("van-goods-action-button",{attrs:{type:"default",text:"保存"},on:{click:function(t){return i.saveOpinion()}}})],1),i._v(" "),n("debounce-click",[n("van-goods-action-button",{attrs:{type:"theme",text:"提交"},on:{click:function(t){return i.subOpinion()}}})],1),i._v(" "),n("debounce-click",[n("van-goods-action-button",{attrs:{type:"theme",text:i.isSign?"取消签字":"签字"},on:{click:function(t){return i.Sign()}}})],1)],1)],1)],1)},[],!1,null,"63521f25",null).exports}}]);