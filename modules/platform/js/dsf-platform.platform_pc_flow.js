/*!
 * Name: @dsf/cli-platform
 * Version: 5.17.0-alpha.5
 * Description: 平台基础包
 * BuildTime: 2024/6/19 17:49:40
*/
(("undefined"!==typeof self?self:this)["webpackJsonpplatform"]=("undefined"!==typeof self?self:this)["webpackJsonpplatform"]||[]).push([[41],{1121:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.isDesign||!e.$form||e.$form&&e.sPID&&e.sCurLinkID&&!e.queryString.isHide?s("div",{staticClass:"ds-control ds-form-item ds-textbox",class:e.getCss},[e.showLabel?s("DsfFieldLabel",{style:e.getLabelWidthStyle(),attrs:{mode:e.showDataCaptionMode,"show-icon":e.showDataCaptionIcon,trigger:e.showDataCaptionTrigger,"data-caption":e.dataCapion,"is-design":e.isDesign,owner:e._self}},[e._v(" "+e._s(e.$t(e.label))+" ")]):e._e(),s("div",{staticClass:"ds-form-block",style:e.getFormItemBlockMarginLeft()},[e.$$readOnly?e.$$readOnly?s("div",{staticClass:"ds-form-readonly"},[s("DsfTextProxy",e._b({attrs:{"show-label":!1},model:{value:e.sOpinion.Content,callback:function(t){e.$set(e.sOpinion,"Content",t)},expression:"sOpinion.Content"}},"DsfTextProxy",e._self.$props,!1))],1):e._e():[s("div",{staticClass:"dis-eara",staticStyle:{"margin-bottom":"10px"}},[s("el-input",{class:{"ds-error-border":e.errors.length>0,"is-disabled":e.$$disabled,"one-btns":e.visibleUpBtn||e.visibleOptionsBtn,"two-btns":e.visibleUpBtn&&e.visibleOptionsBtn},attrs:{placeholder:e.placeholder,type:e.isTextarea?"textarea":"text",rows:e.textareaRows,disabled:e.$$disabled},model:{value:e.sOpinion.Content,callback:function(t){e.$set(e.sOpinion,"Content",t)},expression:"sOpinion.Content"}}),s("div",{staticClass:"dis-btns"},[e.visibleUpBtn?s("i",{staticClass:"iconfont icon-cloud-upload",attrs:{title:"上传附件"},on:{click:e.upload}}):e._e(),s("el-popover",{attrs:{placement:"right",width:"360",trigger:"click"},model:{value:e.showOptions,callback:function(t){e.showOptions=t},expression:"showOptions"}},[s("ul",{staticClass:"temp-list"},e._l(e.options,(function(t,i){return s("li",{key:i,staticClass:"item",attrs:{title:t.key_word},on:{click:function(s){return e.setValue(t)}}},[e._v(" "+e._s(t.key_word)+" ")])})),0),e.visibleOptionsBtn?s("i",{staticClass:"iconfont icon-detail temp-icon",attrs:{slot:"reference",title:"意见模板"},slot:"reference"}):e._e()])],1)],1),s("DsfUploadFile",{ref:"uploadFile",attrs:{"show-label":!1,"hide-btns":!0,dataKey:e.dataKey},model:{value:e.uploadFiles,callback:function(t){e.uploadFiles=t},expression:"uploadFiles"}})],e._t("error",(function(){return[e.errors.length>0?s("div",{staticClass:"ds-error-text"},[e._v(" "+e._s(e.errorsMsg)+" ")]):e._e()]}))],2)],1):e._e()},n=[],a=dsf.component({name:"DsfDisposeIdea",mixins:[$mixins.formControl,$mixins.disposeIdea]}),o=a,l=s(0),r=Object(l["a"])(o,i,n,!1,null,null,null);t["default"]=r.exports},1122:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.isDesign||e.sPID&&e.sCurLinkID?s("div",{staticClass:"ds-control ds-form-item ds-textbox",class:e.getCss},[e.showLabel?s("DsfFieldLabel",{style:e.getLabelWidthStyle(),attrs:{mode:e.showDataCaptionMode,"show-icon":e.showDataCaptionIcon,trigger:e.showDataCaptionTrigger,"data-caption":e.dataCapion,"is-design":e.isDesign,owner:e._self}},[e._v(" "+e._s(e.$t(e.label))+" ")]):e._e(),s("div",{staticClass:"ds-form-block",style:e.getFormItemBlockMarginLeft()},[e._l(e.data,(function(t,i){return[s("p",{key:i+"0",staticClass:"form-comment-box-value"},[t.rusername?s("i",{staticClass:"iconfont icon-icon_user"}):e._e(),s("span",{staticClass:"name"},[e._v(e._s(t.rusername))]),s("span",{staticClass:"content"},[e._v(e._s(t.opinionatts&&t.opinionatts.Content))]),s("span",{staticClass:"time"},[e._v(e._s(t.receivetime))])]),t.opinionatts&&t.opinionatts.Attachments&&t.opinionatts.Attachments.length>0?s("DsfFlowFileList",{key:i+"1",attrs:{attachments:t.opinionatts.Attachments}}):e._e()]})),e.isShowAdd?s("p",{staticClass:"form-comment-add"},[s("DsfButton",{on:{click:e.addComment}},[e._v(e._s(e.addCommentText))])],1):e._e()],2)],1):e._e()},n=[],a=dsf.component({name:"DsfFormCommentBox",mixins:[$mixins.formControl,$mixins.formCommentBox],ctrlCaption:"表单意见框"}),o=a,l=s(0),r=Object(l["a"])(o,i,n,!1,null,null,null);t["default"]=r.exports},1123:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ds-control ds-form-item"},[e.isDesign||e.sPID?i("div",{staticClass:"ds-flowprocess",class:{"is-vertical":e.isVertical}},[e.hideTitle&&e.hideCheckbox?e._e():i("div",{staticClass:"head"},[e.hideTitle?e._e():i("div",{staticClass:"title"},[i("label",{staticClass:"ds-font-3",attrs:{handler:"title"}},[e._v(e._s(e.title))])]),e.hideCheckbox||e.isVertical?e._e():i("div",{staticClass:"set"},[i("el-checkbox",{attrs:{label:"隐藏异常环节"},model:{value:e.isHideNode,callback:function(t){e.isHideNode=t},expression:"isHideNode"}}),i("el-checkbox",{attrs:{label:"隐藏无意见环节"},model:{value:e.isHideYj,callback:function(t){e.isHideYj=t},expression:"isHideYj"}})],1),!e.hideCheckbox&&e.isVertical?i("div",{staticClass:"set"},[i("el-switch",{staticClass:"error",attrs:{"active-text":"异常环节"},model:{value:e.isHideNode,callback:function(t){e.isHideNode=t},expression:"isHideNode"}}),i("el-switch",{attrs:{"active-text":"空意见环节"},model:{value:e.isHideYj,callback:function(t){e.isHideYj=t},expression:"isHideYj"}})],1):e._e()]),i("div",{staticClass:"content",attrs:{handler:"content"}},e._l(e.data,(function(t,n){return i("div",{key:n,staticClass:"item"},[i("div",{staticClass:"fl-box"},[e.isVertical?e._e():i("span",[e._v(e._s(t.reachtime))]),e.isVertical?i("span",{staticClass:"node-name",style:{textAlign:e.textAlign}},[e._v(e._s(t.nodename))]):e._e(),i("img",{staticClass:"tx",attrs:{src:s(432)}}),i("img",{staticClass:"icon",attrs:{src:s(433)("./status"+e.getStatus(t.STATUS)+".png")}})]),i("div",{staticClass:"fr-box",class:{end:"299"===t.nodetype}},[i("div",{staticClass:"des"},[e.isVertical?e._e():i("div",[i("span",[e._v("处理环节：")]),i("span",[e._v(e._s(t.nodename))])]),"299"!==t.nodetype?i("div",[i("span",[e._v("处理人：")]),t.signTypeValue&&"0"!=t.signTypeValue?i("DsfImage",{staticClass:"sign-user",attrs:{src:e._f("imgFormat")(t.signFilePath),failData:" "}}):i("span",[e._v(e._s(t.rusername))])],1):e._e(),e.isVertical?i("div",[i("span",[e._v("接收时间：")]),i("span",[e._v(e._s(t.reachtime))])]):e._e(),"299"!==t.nodetype?i("div",[i("span",[e._v("签收时间：")]),i("span",[e._v(e._s(t.receivetime))])]):e._e()]),e.showResult&&"299"!==t.nodetype?i("div",{staticClass:"yj result"},[i("div",[i("span",[e._v("处理结果：")]),i("span",[e._v(e._s(e.getResults(t)))])])]):e._e(),e.showOpinion&&e.showOpinion(t)?i("div",{staticClass:"yj"},[i("div",[i("span",[e._v("处理意见：")]),i("span",[e._v(e._s(t.opinionatts&&t.opinionatts.Content||e.processingOpinion))])])]):e._e(),e.showFileList(t)?i("DsfFlowFileList",{attrs:{attachments:t.opinionatts.Attachments,isVertical:e.isVertical,clickNameView:e.clickNameView}}):e._e(),t.ccUsers?i("div",{staticClass:"yj"},[i("div",{ref:"ccNode"+n,refInFor:!0,staticClass:"cc ellipsis"},[i("span",[e._v(e._s(t.ccUsers[0].lineName)+"：")]),i("span",{directives:[{name:"show",rawName:"v-show",value:t.showMore,expression:"item.showMore"}],staticClass:"more",on:{click:function(s){return e.moreCC(t)}}},[e._v("更多")]),e._l(t.ccUsers,(function(s,n){return[i("span",{key:s.userId,staticClass:"cc-name",class:{"is-read":"0"!=s.status}},[e._v(" "+e._s(s.userName)+" ")]),e._v(" "+e._s(n<t.ccUsers.length-1?"、":"")+" ")]}))],2)]):e._e()],1)])})),0)]):e._e()])},n=[],a=dsf.component({name:"DsfFlowProcess",mixins:[$mixins.control],ctrlCaption:"办理情况",props:{caption:{type:String,default:function(){return"wfprocess"}},title:{type:String,default:function(){return"办理情况"}},hideTitle:{type:Boolean,default:function(){return!1}},hideCheckbox:{type:Boolean,default:function(){return!1}},hideNode:{type:Boolean,default:function(){return!0}},hideYj:{type:Boolean,default:function(){return!0}},showResult:{type:Boolean,default:function(){return!1}},isVertical:{type:Boolean,default:function(){return!1}},textAlign:{type:String,default:"right"},orderDes:{type:Boolean,default:function(){return!1}},processingOpinion:{type:String,default:function(){return"无数据"}},clickNameView:{type:Boolean,default:function(){return!1}},results:{type:Object,default:function(){return{"-9":"提交","-8":"提交",0:"审核通过",1:"审核通过","-1":"不通过","-2":"返回修改"}}},getResults:{type:Function,default:function(e){return this.results[e.EXSTATUS]}},showOpinion:{type:Function,default:function(e){var t,s;return!e||0!==e.STATUS&&1!==e.STATUS?e&&(2===e.STATUS||-4===e.STATUS)&&"201"!==e.nodetype&&"299"!==e.nodetype:e.isCurrentUser&&((null===e||void 0===e||null===(t=e.opinionatts)||void 0===t?void 0:t.Content)||(null===e||void 0===e||null===(s=e.opinionatts)||void 0===s||null===(s=s.Attachments)||void 0===s?void 0:s.length)>0)}}},data:function(){return{sPID:null,sCurLinkID:null,isHideNode:this.hideNode,isHideYj:this.hideYj,data:[]}},watch:{hideNode:function(e){this.isHideNode=e},hideYj:function(e){this.isHideYj=e},isHideNode:function(e){this.$vm.flows.flowProcess&&(this.data=this.formatData(this.$vm.flows.flowProcess))},isHideYj:function(e){this.$vm.flows.flowProcess&&(this.data=this.formatData(this.$vm.flows.flowProcess))},"$vm.flows.flowProcess":function(e){this.data=e?this.formatData(e):[]}},created:function(){!this.isDesign&&this.sPID||(this.data=[{nodename:"开始",EXSTATUS:-9,STATUS:0,linkid:"faedda583f7742948b0714f0f17d1085",opinionatts:JSON.stringify({Content:"同意"}),ruserid:"",pid:"af60e455757d48dd801d07b1538eb806",rusername:"平台管理员",rdeptname:"平台管理组",reachtime:"2020年01月06日 18:20:21",receivetime:"2020年01月06日 18:20:21"},{nodename:"审批",EXSTATUS:0,STATUS:1,linkid:"saedda583f7742948b0714f0f17d108c",opinionatts:JSON.stringify({Content:"同意"}),ruserid:"",pid:"sf60e455757d48dd801d07b1538eb806",rusername:"平台管理员",rdeptname:"平台管理组",reachtime:"2020年01月08日 18:21:25",receivetime:"2020年01月08日 18:22:30",ccRecipientNames:"管理员"},{nodename:"审批",EXSTATUS:-1,STATUS:-4,linkid:"saedda583f7742948b0714f0f17d1085",opinionatts:JSON.stringify({Content:"不同意"}),ruserid:"",pid:"sf60e455757d48dd801d07b1538eb806",rusername:"平台管理员",rdeptname:"平台管理组",reachtime:"2020年01月08日 18:21:25",receivetime:"2020年01月08日 18:22:30"},{nodename:"结束",nodetype:"299",EXSTATUS:2,STATUS:1,linkid:"caedda583f7742948b0714f0f17d1085",opinionatts:JSON.stringify({Content:""}),ruserid:"",pid:"cf60e455757d48dd801d07b1538eb806",rusername:"平台管理员",rdeptname:"平台管理组",reachtime:"2020年01月09日 18:23:21",receivetime:"2020年01月09日 20:23:21"}])},mounted:function(){var e,t,s=this.$dialog&&this.$dialog.dialogArgs&&this.$dialog.dialogArgs.data&&this.$dialog.dialogArgs.data[0]||null;this.sPID=s?s.sPID:(null===(e=this.queryString)||void 0===e?void 0:e.sPID)||(null===(t=this.$route.query)||void 0===t?void 0:t.sPID)||"",this.sCurLinkID=s?s.sCurLinkID:this.$route.query.sCurLinkID||this.queryString.sCurLinkID,this.sPID&&this.init()},methods:{showMore:function(e,t){var s=this;this.$nextTick((function(){var e,i=null===(e=s.$refs["ccNode"+t])||void 0===e?void 0:e[0];s.data[t].showMore=(null===i||void 0===i?void 0:i.offsetWidth)<(null===i||void 0===i?void 0:i.scrollWidth)-2}))},moreCC:function(e){dsf.layer.openDialog({title:"抄送人列表",width:"600px",height:"500px",params:{path:"dsfa/flow/basic/ccuserlist?sPID=".concat(this.sPID,"&sCurLinkID=").concat(e.linkid)},btns:[]})},init:function(){var e,t=this;null!==(e=this.$vm)&&void 0!==e&&null!==(e=e.flows)&&void 0!==e&&e.loadFlowProcess||(this.$vm.flows.loadFlowProcess=!0,this.$http.get("wfr/getProcessInfoByPID",{sPID:this.sPID}).then((function(e){var s,i;e.data.success&&(null!==(s=t.$vm)&&void 0!==s&&s.flows&&(t.$set(t.$vm.flows,"flowProcess",e.data.data),null===(i=t.$vm.flows)||void 0===i||i.flowProcess.forEach((function(e){t.sCurLinkID===e.linkid&&"299"!=e.nodetype&&(t.$vm.flows.sOpinion=JSON.parse(e.opinionatts))}))))})))},getStatus:function(e){var t;return t="-31"==e?"-3":"-1"==e?"-2":e,t},showFileList:function(e){var t;return this.showOpinion(e)&&(null===(t=e.opinionatts)||void 0===t||null===(t=t.Attachments)||void 0===t?void 0:t.length)>0},formatData:function(e){var t,s,i=this,n=[];return null===(t=_.cloneDeep(e))||void 0===t||null===(s=t.forEach)||void 0===s||s.call(t,(function(e,t){var s,a;e.opinionatts=JSON.parse(e.opinionatts),(!i.isHideYj||null!==e&&void 0!==e&&null!==(s=e.opinionatts)&&void 0!==s&&s.Content||null!==e&&void 0!==e&&null!==(a=e.opinionatts)&&void 0!==a&&a.Attachments)&&(i.isHideNode&&"-4"==e.STATUS||(e.showMore=!1,i.showMore(e,t),n.push(e)))})),this.orderDes?n.reverse():n}}}),o=a,l=(s(691),s(0)),r=Object(l["a"])(o,i,n,!1,null,null,null);t["default"]=r.exports},1124:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"flow-add-comment"},[s("div",{staticClass:"content"},[s("div",{staticClass:"left"},[s("el-input",{attrs:{type:"textarea",max:1e3},model:{value:e.sOpinion.Content,callback:function(t){e.$set(e.sOpinion,"Content",t)},expression:"sOpinion.Content"}})],1),e.tpls.length>0?s("div",{staticClass:"template"},e._l(e.tpls,(function(t,i){return s("div",{key:i,staticClass:"item",on:{click:function(s){e.sOpinion.Content=t.key_word}}},[e._v(" "+e._s(t.key_word)+" ")])})),0):e._e()]),s("div",{staticClass:"upload-file"},[s("div",{staticClass:"title"},[s("span",{staticClass:"tip"},[e._v("附件")]),s("span",{staticClass:"upload--text",on:{click:e.upload}},[s("i",{staticClass:"el-icon-upload2"}),e._v(" 上传附件")])]),s("div",{staticClass:"file-list"},[e.loaded?s("DsfUploadFile",{ref:"uploadFile",attrs:{"show-label":!1,"hide-btns":!0,securityLevel:e.securityLevel},model:{value:e.uploadFiles,callback:function(t){e.uploadFiles=t},expression:"uploadFiles"}}):e._e(),e.sOpinion.Attachments&&0==e.sOpinion.Attachments.length?s("p",{staticClass:"no-file"},[e._v(" 暂无附件～ ")]):e._e()],1)]),s("div",{staticClass:"btns"},[s("span",{staticClass:"ds-button--icon-text addcomment-delete",on:{click:e.clearAll}},[s("i",{staticClass:"iconfont icon-delete"}),e._v(" 清 空")]),s("DsfButton",{staticClass:"addcomment-sure",on:{click:e.sure}},[e._v("确 定")]),s("DsfButton",{staticClass:"plain addcomment-cancel",on:{click:e.cancel}},[e._v("取 消")])],1)])},n=[],a=s(4),o=s.n(a),l=s(1),r=s.n(l),c={name:"DsfFlowAddComment",inject:{$dialog:{default:null}},props:{$vm:{type:[Object,null],default:function(){return null}},flow:{type:[Object,null],default:function(){return null}}},data:function(){return{loaded:!1,tpls:[],sOpinion:{Content:"",Attachments:[]},securityLevel:[]}},computed:{uploadFiles:{get:function(){return JSON.stringify(this.sOpinion.Attachments)},set:function(e){this.$set(this.sOpinion,"Attachments",JSON.parse(e))}}},created:function(){var e=this;return o()(r.a.mark((function t(){var s,i;return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.initFlow(),t.next=3,e.initSecret();case 3:e.loaded=!0,i=null===(s=e.$vm.$viewData)||void 0===s||null===(s=s[e.$vm.nameSpace.replace(/\./g,"_")+".ds_security_level"])||void 0===s?void 0:s.value,e.$nextTick((function(){e.$eventBus.$emit("changeFormEncryptLevel",i)}));case 6:case"end":return t.stop()}}),t)})))()},methods:{yes:function(){return this.sOpinion},validate:function(){return!!this.sOpinion.Content||(dsf.layer.message("处理意见不能为空",!1),!1)},initFlow:function(){var e,t,s,i,n=this;null!==(e=this.$vm)&&void 0!==e&&null!==(e=e.flows)&&void 0!==e&&null!==(e=e.disposeIdea)&&void 0!==e&&e.sOpinion&&(this.sOpinion=Object.assign(this.sOpinion,_.cloneDeep(this.$vm.flows.disposeIdea.sOpinion))),null!==(t=this.$vm)&&void 0!==t&&null!==(t=t.flows)&&void 0!==t&&t.sOpinion&&(this.sOpinion=Object.assign(this.sOpinion,_.cloneDeep(this.$vm.flows.sOpinion))),null!==(s=this.flow)&&void 0!==s&&null!==(s=s.disposeIdea)&&void 0!==s&&s.sOpinion&&(this.sOpinion=Object.assign(this.sOpinion,_.cloneDeep(this.flow.disposeIdea.sOpinion))),null!==(i=this.flow)&&void 0!==i&&i.sOpinion&&(this.sOpinion=Object.assign(this.sOpinion,_.cloneDeep(this.flow.sOpinion))),this.$http.get("wfr/getOpinionKeyWord",{sPID:this.flow.sPID}).done((function(e){e.success&&(n.tpls=e.data||[])}))},initSecret:function(){var e,t,s=this;if(null!==(e=this.$vm)&&void 0!==e&&null!==(e=e.flows)&&void 0!==e&&null!==(e=e.disposeIdea)&&void 0!==e&&e.dataKey)this.securityLevel=(null===(t=this.$vm)||void 0===t||null===(t=t.$viewInitData)||void 0===t||null===(t=t[this.$vm.flows.disposeIdea.dataKey])||void 0===t?void 0:t.dataSource)||[];else if(dsf.config.setting_security_is_open_classified)return this.$http.get("/dict/getSecretList/"+dsf.config.setting_encrypt_level_dictionary).done((function(e){return s.securityLevel=e.data||[],!0}))},upload:function(){this.$refs.uploadFile.openSelectFile()},clearAll:function(){this.sOpinion={Content:"",Attachments:[]},this.$refs.uploadFile.clearAll()},sure:function(){var e=this;if(this.validate()){var t={sPID:this.flow.sPID,sCurLinkID:this.flow.sCurLinkID,sOpinion:JSON.stringify(this.sOpinion),admin:dsf.isDef(this.flow.admin)?this.flow.admin:!!dsf.url.queryString("admin")};this.$http.get("wfr/opinion",t).done((function(t){var s,i,n,a;t.success&&"24000"==t.data.Code?(null===(s=e.$vm.flows)||void 0===s||null===(s=s.flowProcess)||void 0===s||s.forEach((function(s){s.linkid===e.flow.sCurLinkID&&(s.opinionatts=JSON.stringify(_.clone(e.sOpinion)),s.signFilePath=t.data.signFilePath,s.signTypeText=t.data.signTypeText,s.signTypeValue=t.data.signTypeValue,s.isCurrentUser=!0,s.rusername=dsf.session.get("user_name"),s.ruserid="")})),null!==(i=e.flow)&&void 0!==i&&i.sOpinion?null===(n=e.$vm)||void 0===n||n.reloadData():null!==(a=e.$vm)&&void 0!==a&&a.flows&&(e.$vm.flows.sOpinion=e.sOpinion)):dsf.layer.message(t.data.Message||t.message,!1);e.$dialog.close()})).catch((function(e){dsf.layer.message("处理意见异常",!1)}))}},cancel:function(){this.$dialog.close()}}},d=c,u=(s(693),s(0)),f=Object(u["a"])(d,i,n,!1,null,null,null);t["default"]=f.exports},1125:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"select-dept-tree"},[e.showSearch?s("div",{staticClass:"dsf-tree-search"},[s("el-input",{attrs:{disabled:e.loading,placeholder:"输入名称"},on:{input:function(t){return e.search()}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(!0)}},model:{value:e.searchKey,callback:function(t){e.searchKey=t},expression:"searchKey"}},[s("i",{staticClass:"iconfont el-input__icon icon-Magnifier",attrs:{slot:"suffix"},on:{click:function(t){return e.search(!0)}},slot:"suffix"})])],1):e._e(),s("div",{staticClass:"dsf-select-tree",style:{height:e.showSearch?"340px":"100%"}},[s("DsfVirtualTree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"treeForm",attrs:{data:e.treeData,props:e.defaultProps,lazy:e.lazy,load:e.loadNode,"node-key":"id","empty-text":e.loading?"数据加载中.....":"暂无数据","show-checkbox":!0,"default-expand-all":e.defaultExpandAll,"default-expanded-keys":e.defaultKeys,"default-checked-keys":e.checked,"check-strictly":!e.multi,"check-on-click-node":!0,"expand-on-click-node":!1,"filter-node-method":e.filterData},on:{"check-change":e.selectTree},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.node,n=t.data;return s("div",{staticClass:"custom-tree-node ellipsis"},[s("i",{staticClass:"iconfont",class:e.setIcon(i,e.lazy&&!n.leaf||e.dsf.isDef(n[e.defaultProps.children]))}),s("span",{directives:[{name:"title",rawName:"v-title",value:e.dsf.safe.xss(n[e.defaultProps.label]),expression:"dsf.safe.xss(data[defaultProps.label])"}],domProps:{innerHTML:e._s(e.dsf.safe.xss(n[e.defaultProps.label]))}}),s("i",{directives:[{name:"show",rawName:"v-show",value:e.showDel,expression:"showDel"}],staticClass:"iconfont icon-shanchu delete-node",on:{click:function(t){return e.del(t,i,n)}}})])}}])})],1)])},n=[],a={name:"DsfFlowSelectTree",props:{treeData:{type:Array,default:function(){return[]}},select:{type:[Object,Array],default:function(){return{}}},checked:{type:Array,default:function(){return[]}},showSearch:{type:Boolean,default:!1},multi:{type:Boolean,default:!1},formSearchKey:{type:String,default:""},filterType:{type:String,default:""},defaultKeys:{type:Array,default:function(){return[]}},loading:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},showDel:{type:Boolean,default:!1},delUrl:{type:String,default:""},loadNode:{type:Function,default:function(){return function(){}}},customerSearch:{type:Function,default:null},customIcon:{type:Array,default:function(){return[]}},setIcon:{type:Function,default:function(e,t){var s;return t?[e.expanded?"icon-dakai":"icon-wenjianjia"]:(null===(s=this.customIcon)||void 0===s?void 0:s.length)>0?this.customIcon:["icon-shiyongwendang"]}}},data:function(){return{searchKey:"",defaultProps:{children:"children",label:"label",isLeaf:"leaf"},defaultExpandAll:!this.lazy}},watch:{formSearchKey:function(e){this.showSearch||this.$refs.treeForm.filter(e)},checked:function(e){this.$refs.treeForm.setCheckedKeys(e)}},created:function(){},mounted:function(){},methods:{del:function(e,t,s){var i=this;e.stopPropagation(),this.$http.post(this.delUrl,{templateId:s.id}).done((function(e){if(e.success){var n=t.parent,a=n.data.children||n.data,o=a.findIndex((function(e){return e.id===s.id}));a.splice(o,1),i.$message("删除成功",!0)}else i.$message(e.message,!1)}))},selectTree:function(e,t,s){var i=this;if(!this.multi&&this.select[0]&&2===this.select[0].Selected)this.$refs.treeForm.setCheckedKeys([this.select[0].id]);else if(1!=t||this.multi){if(2===e.Selected){var n=this.$refs.treeForm.getCheckedKeys();n.push(e.id),this.$refs.treeForm.setCheckedKeys(n)}}else this.$refs.treeForm.setCheckedNodes([e]);var a=this.$refs.treeForm.getCheckedNodes();a=a.filter((function(e){return i.filterType?!e.disabled&&e.Type!=i.filterType:!e.disabled})),this.$emit("check-change",e,t,s),this.$emit("update:select",a)},filterData:function(e,t){var s,i;return!(e&&!this.customerSearch)||-1!==(null===(s=t.label)||void 0===s||null===(i=s.indexOf)||void 0===i?void 0:i.call(s,e))},search:function(e){if(this.customerSearch){if(!e||this.oldKey===this.searchKey)return;return this.oldKey=this.searchKey,this.searchKey?(this.defaultExpandAll=!0,void this.customerSearch(this.searchKey)):(this.defaultExpandAll=!this.lazy,void this.$refs.treeForm.reloadData())}this.$refs.treeForm.filter(this.searchKey)}}},o=a,l=s(0),r=Object(l["a"])(o,i,n,!1,null,null,null);t["default"]=r.exports},1126:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"choose-send-line"},e._l(e.lines,(function(t,i){return s("p",{key:i,staticClass:"item",class:{choosed:e.checked===t},on:{click:function(s){return e.chooseLine(t)}}},[s("span",{staticClass:"choose-send-line-text",attrs:{title:"next"===e.type?t.Name:t.NodeName+"-"+t.LinkUser.RUserName}},[e._v(" "+e._s("next"===e.type?t.Name:t.NodeName+"-"+t.LinkUser.RUserName)+" ")]),s("i",{staticClass:"iconfont icon-right"})])})),0)},n=[],a=s(4),o=s.n(a),l=s(1),r=s.n(l),c={name:"ChooseSendNode",props:{lines:{type:Array,default:function(){return[]}},callback:{type:Function,default:dsf.noop},chooseNode:{type:Function,default:null},requestID:{type:String,default:function(){return""}},type:{type:String,default:function(){return"next"}},isBatch:{type:Boolean,default:function(){return!1}}},data:function(){return{checked:null}},created:function(){},mounted:function(){},methods:{yes:function(){return this.checked},validate:function(){return!!this.checked||(dsf.layer.message("请选择要发送的环节",!1),!1)},chooseLine:function(e){var t=this;return o()(r.a.mark((function s(){var i,n,a,o;return r.a.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(!t.chooseNode){s.next=6;break}return s.next=3,t.chooseNode(e);case 3:s.t0=s.sent,s.next=7;break;case 6:s.t0=!0;case 7:if(n=s.t0,n){s.next=10;break}return s.abrupt("return");case 10:"next"===t.type?(t.checked=e,a={sRequestID:t.requestID,sLineID:e.LineID},o=t.isBatch?"wfr/batchSendToLine":"wfr/sendToLine",t.$http.post(o,a).then((function(s){2e4==s.data.state&&t.callback(s,!0,e)}))):t.callback([e.PID,dsf.url.queryString("sCurLinkID")],e.ID),null===(i=document.querySelector(".close-send-node"))||void 0===i||i.click();case 12:case"end":return s.stop()}}),s)})))()}}},d=c,u=(s(695),s(0)),f=Object(u["a"])(d,i,n,!1,null,null,null);t["default"]=f.exports},1127:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"choose-send-tree"},[s("div",{staticClass:"fl-box ds_tree_box"},[s("div",{staticClass:"dsf-tree-search"},[s("el-input",{attrs:{placeholder:"输入名称"},model:{value:e.searchKey,callback:function(t){e.searchKey=t},expression:"searchKey"}},[s("i",{staticClass:"iconfont el-input__icon icon-Magnifier",attrs:{slot:"suffix"},slot:"suffix"})])],1),s("DsfVirtualScroll",{attrs:{scrollX:!0,scrollY:!0,height:"calc(100% - 50px)"}},[s("el-collapse",{model:{value:e.actives,callback:function(t){e.actives=t},expression:"actives"}},e._l(e.linesData,(function(t,i){return s("el-collapse-item",{key:i,attrs:{title:t.Name,name:i}},[s("template",{slot:"title"},[s("span",{directives:[{name:"title",rawName:"v-title",value:t.Name,expression:"line.Name"}],staticClass:"ellipsis"},[e._v(e._s(t.Name))])]),t.Receivers&&t.Receivers.Dept?s("DsfFlowSelectTree",{ref:"selectTree-"+t.LineID,refInFor:!0,attrs:{"tree-data":t.Receivers.Dept,filterType:"0","form-search-key":e.searchKey,checked:t.checked,multi:t.MultiplayerEnabled,setIcon:e.setIcon},on:{"check-change":function(s,i,n){return e.selectTree(s,i,n,t)}}}):e._e()],2)})),1)],1)],1),s("div",{staticClass:"fl-box"},[s("DsfVirtualScroll",{attrs:{scrollX:!0,scrollY:!0,height:"calc(100% - "+e.staffHeight+"px)"}},[s("el-collapse",{model:{value:e.isActives,callback:function(t){e.isActives=t},expression:"isActives"}},e._l(e.linesData,(function(t,i){return s("el-collapse-item",{key:i,attrs:{name:i}},[s("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[s("span",{directives:[{name:"title",rawName:"v-title",value:t.Name,expression:"line.Name"}],staticClass:"ellipsis"},[e._v(e._s(t.Name))]),s("div",[t.isRole?e._e():s("span",{staticClass:"count"},[e._v("共 "),s("span",{staticClass:"count-number"},[e._v(e._s(t.selectDepts.length))]),e._v(" 人")]),s("span",{staticClass:"clear",on:{click:function(s){return e.clear(t,s)}}},[e._v("清空")])])]),t.selectDepts.length>0?s("el-table",{staticClass:"table",attrs:{data:t.selectDepts,"show-header":!1}},[s("el-table-column",[[e._v(e._s(t.ccLine?"抄送人":"审批人"))]],2),s("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.parentName))]}}],null,!0)}),s("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.Name))]}}],null,!0)}),s("el-table-column",{staticClass:"operation",attrs:{label:"操作",width:"60",align:"left"},scopedSlots:e._u([{key:"default",fn:function(i){return[s("i",{staticClass:"iconfont icon-shang",on:{click:function(s){return e.move(i.$index,t.selectDepts,"up")}}}),s("i",{staticClass:"iconfont icon-xia",on:{click:function(s){return e.move(i.$index,t.selectDepts,"down")}}})]}}],null,!0)}),s("el-table-column",{staticClass:"operation",attrs:{label:"操作",width:"40",align:"center"},scopedSlots:e._u([{key:"default",fn:function(i){return[2!=i.row.Selected?s("i",{staticClass:"iconfont icon-close",on:{click:function(s){return e.deleteRow(i.row,t)}}}):e._e()]}}],null,!0)})],1):e._e(),t.selectOtherUser?s("div",{staticClass:"add-cc-operation"},[s("dsf-button",{attrs:{size:"small",icon:"icon-output"},on:{click:function(s){return e.addCC(t)}}},[e._v("更多")])],1):e._e()],1)})),1)],1),e.staffs.length>0?s("div",{ref:"staff",staticClass:"regular-staff"},[s("p",{staticClass:"regular-title"},[s("span",[e._v("常用人员：")]),e._l(e.staffs,(function(t){return s("span",{key:t.userId,staticClass:"name",on:{click:function(s){return e.selectStaff(t)}}},[e._v(e._s(t.userName))])}))],2)]):e._e()],1)])},n=[],a=s(2),o=s.n(a),l={name:"ChooseSendTree",props:{lines:{type:Array,default:function(){return[]}}},data:function(){return{linesData:[],actives:[],isActives:[],searchKey:"",param:[],ccData:{},ccLine:"",staffs:[],staffHeight:0}},computed:{},created:function(){this.initData()},mounted:function(){},methods:{selectTree:function(e,t,s,i){if("0"!=e.Type)if(t)i.selectDepts.push(e);else{var n=i.selectDepts.indexOf(e);i.selectDepts.splice(n,1)}},setIcon:function(e,t){return"0"==e.data.Level?["icon-chengshi"]:"1"==e.data.Type?["icon-icon_user"]:"21"==e.data.Type||"22"==e.data.Type?["icon-nav-add-xjhy"]:"-1"==e.data.Level?["icon-ziyuanguanli"]:["icon-tab_home_unchecked"]},yes:function(){return this.param.join(";")},getCC:function(){return this.linesData.map((function(e){var t=e.LineID,s=e.selectDepts;return{LineID:t,selectDepts:s}}))},validate:function(){var e,t=[],s=[],i=!1,n=!1,a=!1;this.linesData.forEach((function(e){var o,l;if(!e.Required||null!==e&&void 0!==e&&e.selectDepts&&0!==(null===e||void 0===e||null===(o=e.selectDepts)||void 0===o?void 0:o.length)||s.push(e.Name),(null===(l=e.selectDepts)||void 0===l?void 0:l.length)>0){var r="".concat(e.LineID,":").concat(e.selectDepts.map((function(e){return e.ID})).join());t.push(r),1!=e.ccLine&&(a=!0)}1==e.ccLine&&(i=!0),e.Selected&&1!=e.ccLine&&(n=!0)}));var o=null===(e=this.lines.filter((function(e){return e.sendEndNode})))||void 0===e?void 0:e[0];return null!==o&&void 0!==o&&o.sendEndNode&&(a=!0),!n&&i&&o&&t.push("".concat(o.LineID,":")),s.length>0?(dsf.layer.message(s.join("，")+"为必选环节，请选择发送对象",!1),!1):a?(this.param=t,!0):(dsf.layer.message("请选择办理人",!1),!1)},initData:function(){var e=this,t=this.lines.filter((function(t){return 1==t.ccLine&&(e.ccLine=t.LineID),t.Receivers}));this.ccLine&&this.getStaffs(),t.forEach((function(t,s){var i;e.actives.push(s),e.isActives.push(s),t.selectDepts=[],t.checked=[],null!==t&&void 0!==t&&null!==(i=t.Receivers)&&void 0!==i&&i.Dept&&(t.Receivers.Dept=e.getTreeData(t.Receivers.Dept,t))})),this.linesData=dsf.mix(!0,[],t)},getStaffs:function(){var e=this;return this.$http.get("wfr/getUserNodeCcUserHistory",{lineId:this.ccLine,userSize:5}).done((function(t){return 2e4==t.state&&(e.staffs=dsf.isArray(t.data)?t.data:[],e.$nextTick((function(){var t,s=(null===(t=e.$refs)||void 0===t||null===(t=t.staff)||void 0===t?void 0:t.offsetHeight)||0;e.staffHeight=s+10}))),[]}))},selectStaff:function(e){var t=this;this.linesData.forEach((function(s){if(s.LineID==t.ccLine){var i="1_".concat(e.deptId,"_").concat(e.userId),n=s.selectDepts.findIndex((function(e){return e.id==i}));if(-1==n){var a={id:i,ID:i,Name:e.userName,sID:e.userId,parentID:e.deptId,parentName:e.deptName},o=t.$refs["selectTree-"+s.LineID][0].$refs.treeForm;o.getNode(i)?o.setChecked(i,!0):s.selectDepts.push(a)}}}))},getTreeData:function(e,t){var s=this.format(e,null,t);return[s]},format:function(e,t,s){var i=this;e.label=e.Name,e.id=e.ID,21!=e.Type&&22!=e.Type||(s.isRole=!0),s.MultiplayerEnabled?e.disabled=1!==e.Type&&2!==e.Type&&0!==e.Type&&21!==e.Type:e.disabled=0===e.Type,t&&(e.parentName=t.Name,e.parentID=t.ID),2===(null===e||void 0===e?void 0:e.Selected)&&(e.required=!0);var n={};if(e.ChildDepts&&0===e.ChildDepts.length){var a=e.Objs&&e.Objs[0]||{};a.Objs||a.ChildDepts||2!==a.Type?(n.Name=e.Name,n.ID=e.ID,e.children=e.Objs,e.children.forEach((function(e){i.format(e,n,s)}))):(e.disabled=!1,e.ID=a.ID,e.id=a.ID,e.Type=a.Type,e.parentName=e.Name,e.Name=a.Name,e.Selected=a.Selected,e.sID=a.sID,e.required=2===a.Selected)}else if(e.ChildDepts){var l;if(n.Name=e.Name,n.ID=e.ID,e.children=e.ChildDepts,-1!=e.ID&&e.Objs)(l=e.children).push.apply(l,o()(e.Objs));e.children.forEach((function(e){i.format(e,n,s)}))}var r=s.MultiplayerEnabled;return r?e.Selected&&(s.checked.push(e.ID),s.selectDepts.push(e)):(e.Selected&&1===e.Selected&&(s.selectDepts&&0===s.selectDepts.length||s.selectDepts&&2!==s.selectDepts[0].Selected)&&(s.checked=[e.ID],s.selectDepts=[e]),e.Selected&&2===e.Selected&&(s.checked=[e.ID],s.selectDepts=[e])),e},clear:function(e,t){t.stopPropagation();var s=e.selectDepts.filter((function(e){return 2==e.Selected})),i=s.map((function(e){return e.id})),n=this.$refs["selectTree-"+e.LineID][0].$refs.treeForm;n.setCheckedKeys(i),setTimeout((function(){e.selectDepts=s}))},deleteRow:function(e,t){var s=t.selectDepts.indexOf(e),i=this.$refs["selectTree-"+t.LineID][0].$refs.treeForm;return i.getNode(e.id)?i.setChecked(e.id,!1):t.selectDepts.splice(s,1),s},move:function(e,t,s){if(!(0===e&&"up"===s||e===t.length-1&&"down"===s)){var i="up"===s?e-1:e+1,n=t[i];t.splice(i,1),t.splice(e,0,n)}},addCC:function(e){var t=e.selectDepts.map((function(e){return{value:e.sID,text:e.Name,sID:e.sID,_id:e.sID,_type:e._type,deptId:e.parentID,deptName:e.parentName,required:e.required}})),s=this;this.$openDialog({title:"抄送人员",width:"800px",height:"500px",params:{path:this.$replace("dsfa/flow/basic/ccdialog"),selectValue:t,line:e},btns:[{text:"确定",handler:function(t){if(t.content){var i=t.content;if(i&&i.yes&&dsf.isFunction(i.yes)){var n=i.yes();if(!n)return!1;n=JSON.parse(JSON.stringify(n));var a=e.selectDepts.filter((function(e){return 2==e.Selected}));e.selectDepts=a,s.$set(s.ccData,e.LineID,[]),n.forEach((function(t){var i="1_".concat(t.deptId,"_").concat(t._id),n={id:i,ID:i,label:t._name,Name:t._name,sID:t._id,parentID:t.deptId,parentName:t.deptName,required:t.required},a=s.$refs["selectTree-"+e.LineID][0].$refs.treeForm;if(a.getNode(i))a.setChecked(i,!0);else{var o=e.selectDepts.findIndex((function(e){return e.id==i}));-1===o&&e.selectDepts.push(n)}}))}}}},{text:"取消"}]})}}},r=l,c=(s(697),s(0)),d=Object(c["a"])(r,i,n,!1,null,null,null);t["default"]=d.exports},1128:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"flow-file-list ds_uploadFile ds-upload"},[s("table",{staticClass:"layui-table fileContainer upload-table",attrs:{width:"100%"}},[s("tbody",e._l(e.Attachments,(function(t,i){return s("tr",{key:i,staticClass:"list-item"},[s("td",{staticClass:"textLeft"},[s("div",{staticClass:"fileName",on:{click:function(s){e.clickNameView?e.preview(t):e.downLoadFile(t)}}},[s("i",{staticClass:"icon",class:t.suffix}),s("span",[e._v(e._s(t.originalFileName))])])]),e.isVertical?e._e():s("td",{staticClass:"blank fontpostion",attrs:{width:"100"}},[e._v(" "+e._s(e.computeFileSize(t.size))+" ")]),e.isVertical?e._e():s("td",{staticClass:"operate fontpostion",attrs:{width:"100"}},[s("span",{staticClass:"previewBtn iconfont",attrs:{title:"预览"},on:{click:function(s){return e.preview(t)}}},[e._v("")]),s("span",{staticClass:"downLoad iconfont downLoadBtn"},[s("i",{staticClass:"iconfont",attrs:{title:"下载"},on:{click:function(s){return e.downLoadFile(t)}}},[e._v("")])])])])})),0)])])},n=[],a={name:"DsfFlowFileList",props:{Attachments:{type:Array,default:function(){return[]}},isVertical:{type:Boolean,default:function(){return!1}},clickNameView:{type:Boolean,default:function(){return!1}}},data:function(){return{}},created:function(){},methods:{preview:function(e){var t=dsf.config.setting_public_file_host,s=e.relativePath,i="preview/file?url=".concat(t).concat(s);this.$openWindow({url:i})},downLoadFile:function(e){var t=dsf.url.getWebPath("file/download");$('<form action="'.concat(t,'" method="get">\n          <input type="text" name="files" value="').concat(e.id,'"/>\n          <input type="text" name="zipName" value="').concat(e.fileName||"",'"/>\n        </form>')).appendTo("body").submit().remove()},computeFileSize:function(e){var t="";return t=parseInt(e)>105e4?(e/Math.pow(1024,2)).toFixed(2)+"M":(e/Math.pow(1024,1)).toFixed(2)+"K",t}}},o=a,l=s(0),r=Object(l["a"])(o,i,n,!1,null,null,null);t["default"]=r.exports},403:function(e,t,s){e.exports=s.p+"modules/platform/img/status-2.png"},404:function(e,t,s){e.exports=s.p+"modules/platform/img/status-3.png"},405:function(e,t,s){e.exports=s.p+"modules/platform/img/status-4.png"},406:function(e,t,s){e.exports=s.p+"modules/platform/img/status0.png"},407:function(e,t,s){e.exports=s.p+"modules/platform/img/status1.png"},408:function(e,t,s){e.exports=s.p+"modules/platform/img/status2.png"},432:function(e,t,s){e.exports=s.p+"modules/platform/img/head_logo.png"},433:function(e,t,s){var i={"./status-2.png":403,"./status-3.png":404,"./status-4.png":405,"./status0.png":406,"./status1.png":407,"./status2.png":408};function n(e){var t=a(e);return s(t)}function a(e){if(!s.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}n.keys=function(){return Object.keys(i)},n.resolve=a,e.exports=n,n.id=433},528:function(e,t,s){var i=s(692);"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=s(19).default;n("2e087444",i,!0,{sourceMap:!1,shadowMode:!1})},529:function(e,t,s){var i=s(694);"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=s(19).default;n("3ffdf108",i,!0,{sourceMap:!1,shadowMode:!1})},530:function(e,t,s){var i=s(696);"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=s(19).default;n("bf151b34",i,!0,{sourceMap:!1,shadowMode:!1})},531:function(e,t,s){var i=s(698);"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=s(19).default;n("74aeda9e",i,!0,{sourceMap:!1,shadowMode:!1})},691:function(e,t,s){"use strict";s(528)},692:function(e,t,s){"use strict";s.r(t)},693:function(e,t,s){"use strict";s(529)},694:function(e,t,s){"use strict";s.r(t)},695:function(e,t,s){"use strict";s(530)},696:function(e,t,s){"use strict";s.r(t)},697:function(e,t,s){"use strict";s(531)},698:function(e,t,s){"use strict";s.r(t)}}]);
//# sourceMappingURL=../../../smap/platform/dsf-platform.platform_pc_flow.js.map