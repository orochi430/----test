"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[86720],{86720:function(t,e,n){n.d(e,{Z:function(){return _}});var s=n(522),e=n(73473),a=n.n(e),e={name:"movingSituationSimple",props:{flowInfo:{type:Object,default:function(){return{}}}},data:function(){return{list:[],active:3,flowStatus:[],flowList:[]}},created:function(){},mounted:function(){},methods:{judgeStatus:function(t){return"yes"==t?1:"now"==t?2:"no"==t?0:void 0}},watch:{flowInfo:{handler:function(t,e){var n=this,s=this;t.passedNodes&&t.passedNodes.forEach(function(t){s.flowStatus.push(t.nodeName)}),t.stageList&&t.stageList.forEach(function(t){s.flowList.push({name:t.nodeName,status:n.judgeStatus(t.selected)})})},deep:!0,immediate:!0}}},i=n(51900),e=(0,i.Z)(e,function(){var n=this,s=n._self._c;return s("div",{staticClass:"ds-moving-situation-simple"},[n._m(0),n._v(" "),s("div",{staticClass:"_content"},n._l(n.flowList,function(t,e){return s("div",{key:e,staticClass:"_item",class:{_active:2==t.status,_finish:1==t.status,_not_faqi:0==t.status}},[s("div",{staticClass:"_title ds_font6"},[n._v(n._s(e+1))]),n._v(" "),s("div",{staticClass:"_con"},[n._v(n._s(t.name))])])}),0)])},[function(){var t=this,e=t._self._c;return e("div",{staticClass:"_header"},[e("div",{staticClass:"_huanjie _finish"},[e("i"),t._v(" "),e("span",[t._v("完成环节")])]),t._v(" "),e("div",{staticClass:"_huanjie _current"},[e("i"),t._v(" "),e("span",[t._v("当前环节")])]),t._v(" "),e("div",{staticClass:"_huanjie _not_faqi"},[e("i"),t._v(" "),e("span",[t._v("未发起环节")])])])}],!1,null,null,null).exports,o=n(26243),c=n.n(o),o=n(42152),r=n.n(o),l=n(25108),o={name:"movingSituationDetails",data:function(){return{active:2,contentData:[],defaultIcon:n(47122),showCB:!1,message:"",result:[],typeList:[],defaultText:"",curNode:{}}},created:function(){},mounted:function(){},methods:{cuiban:function(t){var n=this,t=(this.curNode=t,l.log(this.parameters),this.parameters.pk),e=this.parameters.moduleId;dsf.http.post("ctrl/flowmonitor/getUrgeRemindConfig",{infoId:t,moduleId:e}).then(function(t){var e,t=t.data;l.log(t),"success"==t.type?t.data&&(e=t.data.smsMethodType,n.message=t.data.sms,e&&(n.typeList=e,n.result=e.map(function(t){return t.codeValue})),n.showCB=!0):l.log("get urge config error!")})},doCBAction:function(){var e=this,t=this.parameters.pk,n=this.parameters.moduleId,s=this.message,a=this.result,i=this.curNode.id||this.parameters.pnId;return s?0==a.length?(dsf.layer.toast("请选择提醒方式！"),!0):void dsf.http.post("ctrl/flowmonitor/submitUrge",{moduleId:n,docid:t,bt:s,remindType:a.join(","),pnId:i}).then(function(t){t=t.data;l.log(t),"success"==t.type?(dsf.layer.toast("催办成功！"),e.closePop()):l.log("get urge config error!")}):(dsf.layer.toast("请输入催办内容！"),!0)},getStatus:function(t){return"7"==t.nodeType?"(抄送)":0<t.status?dsf.config.commonForm.moveingDetailText?"("+dsf.config.commonForm.moveingDetailText+")":"(审批中)":""},handleClick:function(t,e){t=new(r())("."+t,{text:function(){return e}});t.on("success",function(t){dsf.layer.toast("复制成功")}),t.on("error",function(t){dsf.layer.toast("复制失败")}),t.onClick(event)},closePop:function(){this.showCB=!1,this.message="",this.result=[],this.typeList=[],this.defaultText="",this.curNode={}}},props:{flowInfo:{type:Object,default:function(){return{}}},parameters:{type:Object}},watch:{flowInfo:{handler:function(t,e){var n,s=this;t.passedNodes&&(t.passedNodes.filter(function(t){return 7==t.nodeType}),n={},t.passedNodes.forEach(function(t,e){7!=t.nodeType?s.contentData.push(t):0<e&&(n[t.fid]?n[t.fid].children.push(t):n[t.fid]={children:[t],nodeName:"抄送人："+t.fduserName,nodeId:t.nodeId,nodeType:7,content:"",deptId:"",deptName:"",eDate:"",hasHandWrite:!1,orgNameLv1:"",orgNameLv2:"",orgNameLv3:"",orgNameLv4:"",orgNameLv5:"",pDate:"",photoImg:"",rDate:"",signImg:"",userId:""})}),l.log(n),c()(n).forEach(function(t){t=n[t];t.userName="接收人："+t.children.map(function(t){return t.userName}).join("、"),t.status=t.children.every(function(t){return t.pDate})?"-1":"1",s.contentData.push(t)})),this.active=s.contentData.length},deep:!0,immediate:!0}}},o=(0,i.Z)(o,function(){var s=this,a=s._self._c;return a("div",[a("div",{staticClass:"moving-situation-details"},["移动表单带表格线"==s.parameters.formTemplateName?a("van-row",[a("van-col",{attrs:{span:"mobile"==s.$store.state.clientType?7:4}},[a("div",{staticStyle:{"font-weight":"800","font-size":"var(--font_size_2)",padding:"0 0.12rem 0.3rem","text-align":"center"}},[s._v("\n                    流转情况")])])],1):s._e(),s._v(" "),a("div",{staticClass:"_content"},s._l(s.contentData,function(e,n){return a("div",{key:n,staticClass:"_item"},[a("div",{staticClass:"_head"},[a("img",{attrs:{src:s.dsf.url.getWebPath(e.photoImg)||s.defaultIcon,alt:"",onerror:"this.src='".concat(s.defaultIcon,"'")}}),s._v(" "),e.status<0?a("van-icon",{attrs:{name:"checked",color:"#13BA84"}}):a("van-icon",{attrs:{name:"more",color:"#e30000"}})],1),s._v(" "),a("div",{staticClass:"_con"},[a("span",{staticClass:"_titles"},[a("i",{staticClass:"_title ds_font4"},[s._v(s._s(e.nodeName))]),s._v(" "),a("i",{staticClass:"_time ds_font6"},[s._v(s._s(e.eDate.substring(5)))])]),s._v(" "),e.fduserName?a("span",{staticStyle:{color:"#999"}},[s._v("发送人："+s._s(e.fduserName)+"("+s._s(e.rDate.substring(5))+")")]):s._e(),s._v(" "),a("span",{staticClass:"_name ds_font6"},[e.fduserName?a("span",[s._v("接收人：")]):s._e(),s._v("\n                        "+s._s(e.userName)+"\n                        "),e.deptName&&s.dsf.config.commonFlow.showDeptName?a("span",[s._v(" - "+s._s(e.deptName))]):s._e()]),s._v(" "),a("span",{staticClass:"_detail ds_font6",style:{color:s.parameters.nodeId==e.nodeId?"#e30000":""}},[s._v(s._s(s.getStatus(e)))]),s._v(" "),a("p",[e.content?a("span",{staticClass:"_detail ds_font6"},[s._v('"'+s._s(e.content)+'"')]):s._e(),s._v(" "),e.content&&s.dsf.config.commonFlow.showCopyOpinionBtn?a("a",{class:"copyel copyel_"+n,on:{click:function(t){return s.handleClick("copyel_"+n,e.content)}}},[s._v("复制意见")]):s._e()]),s._v(" "),e.preContent?a("span",{staticClass:"_detail ds_font6"},[s._v(s._s(e.preContent))]):s._e(),s._v(" "),e.hasHandWriteImg&&e.hasHandWrite?a("div",{staticClass:"content"},[a("img",{staticStyle:{width:"150px"},attrs:{src:s.dsf.url.getWebPath(e.hasHandWriteImg),alt:""}})]):s._e(),s._v(" "),0<e.status&&s.dsf.config.commonFlow.showUrgingBtn&&(!e.children||0==e.children.length)?a("van-button",{staticClass:"cuiban",attrs:{type:"warning",size:"small"},on:{click:function(t){return s.cuiban(e)}}},[s._v("催办")]):s._e(),s._v(" "),e.children?a("div",{staticClass:"_content _content-children"},s._l(e.children,function(e,n){return a("div",{key:n,staticClass:"_item subitem"},[a("div",{staticClass:"_head"},[a("img",{attrs:{src:s.dsf.url.getWebPath(e.photoImg)||s.defaultIcon,alt:"",onerror:"this.src='".concat(s.defaultIcon,"'")}})]),s._v(" "),a("div",{staticClass:"_con"},[a("span",{staticClass:"_titles"},[a("i",{staticClass:"_title ds_font4 flex ac"},[s._v(" "+s._s(e.userName)+"\n                                        "),a("div",{staticClass:"status"},[s._v(s._s(e.status<0||0<e.pDate.length?"已读":"未读")+"\n                                        ")])]),s._v(" "),a("i",{staticClass:"_time ds_font6"},[s._v(s._s(e.pDate.substring(5)))])]),s._v(" "),a("p",[e.content?a("span",{staticClass:"_detail ds_font6"},[s._v('"'+s._s(e.content)+'"')]):s._e(),s._v(" "),e.content&&s.dsf.config.commonFlow.showCopyOpinionBtn?a("a",{class:"copyel copyel1_"+n,on:{click:function(t){return s.handleClick("copyel1_"+n,e.content)}}},[s._v("复制意见")]):s._e()]),s._v(" "),e.preContent?a("span",{staticClass:"_detail ds_font6"},[s._v(s._s(e.preContent))]):s._e(),s._v(" "),e.hasHandWriteImg&&e.hasHandWrite?a("div",{staticClass:"content"},[a("img",{staticStyle:{width:"150px"},attrs:{src:s.dsf.url.getWebPath(e.hasHandWriteImg),alt:""}})]):s._e(),s._v(" "),0<e.status&&s.dsf.config.commonFlow.showUrgingBtn?a("van-button",{staticClass:"cuiban",attrs:{type:"warning",size:"small"},on:{click:function(t){return s.cuiban(e)}}},[s._v("催办")]):s._e()],1)])}),0):s._e()],1)])}),0)],1),s._v(" "),a("van-popup",{style:{height:"70%"},attrs:{position:"bottom",round:""},model:{value:s.showCB,callback:function(t){s.showCB=t},expression:"showCB"}},[a("div",{staticClass:"cb_contain"},[a("van-nav-bar",{staticClass:"cbnav",attrs:{title:"催办信息发送","right-text":"关闭"},on:{"click-right":s.closePop}}),s._v(" "),a("div",{staticClass:"cbinfo"},[a("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:s.message,expression:"message",modifiers:{trim:!0}}],staticClass:"text",attrs:{placeholder:"请输入催办信息"},domProps:{value:s.message},on:{input:function(t){t.target.composing||(s.message=t.target.value.trim())},blur:function(t){return s.$forceUpdate()}}}),s._v(" "),a("div",{staticClass:"tipText"},[s._v("催办消息将以下面的形式发送：")]),s._v(" "),a("div",{staticClass:"cbtype"},[a("van-checkbox-group",{attrs:{direction:"horizontal"},model:{value:s.result,callback:function(t){s.result=t},expression:"result"}},s._l(s.typeList,function(t){return a("van-checkbox",{key:t.codeValue,attrs:{"icon-size":"16px",name:t.codeValue}},[s._v(s._s(t.codeName))])}),1)],1)]),s._v(" "),a("div",{staticClass:"btoms"},[a("van-button",{attrs:{type:"primary",size:"small"},on:{click:s.doCBAction}},[s._v("催办")])],1)],1)])],1)},[],!1,null,"97569b42",null).exports,d=n(25108),u={name:"movingSituationDetails_new",props:{formData:{type:Object,default:function(){return{}}}},components:{},data:function(){return{defaultIcon:n(47122),contentData:[]}},computed:{},watch:{},methods:{changeState:function(t,e){this.$set(this.contentData[t].children[e],"active",!this.contentData[t].children[e].active)},getNodeName:function(t){return t.children&&0<t.children.length?this.getNodeName(t.children[0]):t},getPersonList:function(){var t=dsf.layer.loading("流程获取中"),n=this;dsf.http.post("fn/mobileFormComment/showPnodesTree",{sourceType:16,isShowAbn:-1,infoId:this.formData.info_id}).then(function(t){t&&200==t.status&&(t.data.data.forEach(function(t){var e;t.children&&0<t.children.length&&(t.userName="多人处理",e=n.getNodeName(t),t.actName=e.actName,t.deptName=e.deptName,t.children.forEach(function(t){var e=n.getNodeName(t);t.deptName=e.deptName,t.active=!1}))}),d.log(t.data.data),n.contentData=t.data.data)}).finally(function(){n.$nextTick(function(){dsf.layer.closeLoading(t)})})},getStatus:function(t){return"7"==t.nodeType?"(抄送)":0<t.status?"(审批中)":""}},created:function(){},mounted:function(){d.log(this.data),this.getPersonList()},destroyed:function(){}},u=(0,i.Z)(u,function(){var s=this,a=s._self._c;return a("div",{staticClass:"movingSituationDetails_new"},s._l(s.contentData,function(t,n){return a("div",{key:n,staticClass:"flows"},[a("div",{staticClass:"photo"},[a("img",{staticClass:"img",attrs:{src:"xxx",alt:"",onerror:"this.src='".concat(s.defaultIcon,"'")}}),s._v(" "),t.status<0||t.pDate?a("van-icon",{attrs:{name:"checked",color:"#13BA84"}}):a("van-icon",{attrs:{name:"more",color:"#E6A23C"}})],1),s._v(" "),a("div",{staticClass:"texts"},[a("div",{staticClass:"title"},[a("span",[s._v(s._s(t.actName))]),s._v(" "),t.pDate?a("span",[s._v(s._s(t.pDate.substring(5)))]):s._e()]),s._v(" "),t.children&&0<t.children.length?a("div",{staticClass:"username"},[a("div",[a("p",[a("span",[s._v(s._s(t.userName))])])])]):s._e(),s._v(" "),t.children&&0!=t.children.length?s._e():a("div",{staticClass:"username"},[a("div",[a("p",[a("span",[s._v(s._s(t.userName))]),s._v(" "),a("span",[s._v(s._s(s.getStatus(t)))])]),s._v(" "),t.content?a("span",[s._v('"'+s._s(t.content)+'"')]):s._e()])]),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.children||0<t.children.length,expression:"!item.children || item.children.length > 0"}]},s._l(t.children,function(t,e){return a("div",{key:"node"+e,staticClass:"duoren"},[a("div",{staticClass:"dept"},[a("span",[s._v(s._s(e+1)+"、并行处理【"+s._s(t.deptName)+"】")]),s._v(" "),a("van-icon",{class:{active:t.active},attrs:{name:"arrow"},on:{click:function(t){return s.changeState(n,e)}}})],1),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"node.active"}],staticClass:"details"},s._l(t.children,function(t,e){return a("div",{directives:[{name:"show",rawName:"v-show",value:!t.children,expression:"!detail.children"}],key:"detail"+e},[a("p",[a("span",[s._v("发件人：")]),s._v(" "),a("span",[s._v(s._s(t.fDUserName))])]),s._v(" "),a("p",[a("span",[s._v("接收人：")]),s._v(" "),a("span",[s._v(s._s(t.dUserName))])]),s._v(" "),a("p",[a("span",[s._v("接收部门：")]),s._v(" "),a("span",[s._v(s._s(t.deptName))])]),s._v(" "),a("p",[a("span",[s._v("阅读时间：")]),s._v(" "),a("span",[s._v(s._s(t.pDate))])])])}),0)])}),0)])])}),0)},[],!1,null,"5e83e048",null).exports,v=n(84528),f=n(25108),e={name:"movingSituation",components:{movingSituationSimple:e,movingSituationDetails:o,DingBtn:v.default,movingSituationDetailsNew:u},props:{formData:{type:Object,default:function(){return{}}},isControl:{type:Boolean,default:!1},parameters:{type:Object,default:function(){return{}}}},data:function(){return{active:0,isActive:"right",hasYongDao:!1,flowInfo:{},dingObj:{},showNewFlow:dsf.config.commonFlow.useNewFlowPage}},mounted:function(){f.log(this.parameters)},created:function(){this.loadData(),dsf.config.ddSetting.isDing&&this.Ding(),this.isActive=dsf.config.commonFlow.isDefaultShowDetail?"right":"left"},methods:{handClickBtn:function(t){this.isActive=t},loadData:function(){var n=this;dsf.flow.getWorkFlowNodes({param:{infoId:n.formData.info_id||n.formData.A0001||n.formData.id},thenFun:function(t,e){(n.flowInfo=e).stageList&&0!=e.stageList.length?n.hasYongDao=!0:(n.isActive="right",n.hasYongDao=!1)}})},Ding:function(){var n=this,t=dsf.http.get("fn/common/getFileInfo?pk=".concat(this.formData.info_id)),e=dsf.http.get("fn/mobileNote/getMeetingUsersByNotepaper?pk=".concat(this.formData.info_id));a().all([t,e]).then(function(t){var t=(0,s.Z)(t,2),e=t[0].data,t=t[1].data.data;t.length&&(e="您有一份标题为【".concat(e.bt,"】的文件未处理，请及时处理！"),n.dingObj={users:t,text:e})}).catch(function(t){f.log(t)})}}},_=(0,i.Z)(e,function(){var e=this,t=e._self._c;return t("div",{staticClass:"ds-workflow ds-moving-situation",class:{"control-workflow":e.isControl}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.hasYongDao,expression:"hasYongDao"}],class:["_btn",{_controlBtn:e.isControl}]},[t("span",{class:"left"==e.isActive?"_active":"",on:{click:function(t){return e.handClickBtn("left")}}},[e._v("简约")]),e._v(" "),t("span",{class:"right"==e.isActive?"_active":"",on:{click:function(t){return e.handClickBtn("right")}}},[e._v("详细")])]),e._v(" "),t("movingSituationSimple",{directives:[{name:"show",rawName:"v-show",value:"left"==e.isActive&&e.hasYongDao,expression:"isActive=='left' && hasYongDao"}],attrs:{flowInfo:e.flowInfo}}),e._v(" "),[e.showNewFlow?t("movingSituationDetailsNew",{attrs:{formData:e.formData}}):t("movingSituationDetails",{attrs:{flowInfo:e.flowInfo,parameters:e.parameters}})],e._v(" "),t("Ding-btn",{class:[e.isControl?"controlDingBtn":"dingBtn"],attrs:{pk:e.formData.info_id,styleOptions:{width:"0.9rem",height:"0.9rem","border-radius":"50%"},prarms:e.dingObj,options:{size:"small",type:"info"},text:"提醒"}})],2)},[],!1,null,"4586dd48",null).exports},47122:function(t,e,n){t.exports=n.p+"static/img/icon_institution_level_two.49de590..png"}}]);