"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[7141,18868],{15714:function(t,e,n){n.r(e),n.d(e,{default:function(){return a}});var e=n(26243),l=n.n(e),e=n(8450),r=n.n(e),e=n(63560),i=n(88561),d=n(25108),e={name:"FeedBack",components:{selectPerson:e.default},data:function(){return{attach_1:[],showPerson:!1,fkdw:i.Z.loadSessionStore("user").deptName,fkr:i.Z.loadSessionStore("user").name,fksj:"",fkqk:"",xybgz:"",showPicker:!1,fileList:[],minDate:new Date((new Date).getFullYear()-40,0,1),maxDate:new Date((new Date).getFullYear()+10,11,31),currentDate:new Date,param:{},maininfo:{},moduleId:"190323160728t7fGwtjvQyVf8pQATUC",formId:"190325100957tjblcgSwSkWskJbreNy",info_id:"",masterId:"",Invited:{id:i.Z.loadSessionStore("user").deptId,str:i.Z.loadSessionStore("user").deptName}}},computed:{},watch:{},created:function(){},mounted:function(){var t;d.log("mounted==>",this.$route.params.data.dataValue),this.$route.params.data?(t=this.$route.params.data.dataValue,this.info_id=t.id,this.moduleId=t.moduleId,this.masterId=t.masterId,this.getUserList(),dsf.http.post("fn/mobileAttachment/getUploadAttachmentType",{flowId:"",moduleId:this.moduleId}).then(function(t){d.log("上传类型",t)}),this.fksj=dsf.date.format(new Date,"yyyy-mm-dd hh:ii:00")):(this.$toast.fail("参数错误"),this.$router.go(-1))},destroyed:function(){},methods:{onClickLeft:function(){this.$router.go(-1)},onSubmit:function(n,i){var a,t,o,s=this;this.fkdw?this.fkr?this.fksj?this.fkqk?(d.log("===提交"),this.maininfo["C-DB-FK-0001"]={},this.maininfo["C-DB-FK-0004"]={},this.maininfo["C-DB-FK-0006"]={},this.maininfo["C-DB-FK-0007"]={},this.maininfo["C-DB-FK-0007"].value=this.xybgz,this.maininfo["C-DB-FK-0004"].value=this.fksj,this.maininfo["C-DB-FK-0006"].value=this.fkqk,a={},l()(this.maininfo).forEach(function(t,e){a[t]={},a[t].values=[{key:"value",value:s.maininfo[t].value}],s.maininfo[t].hasOwnProperty("text")&&a[t].values.push({key:"text",value:s.maininfo[t].text})}),a["C-DB-FK-0001"]={},t={moduleId:this.moduleId,pk:this.info_id,formId:this.formId,__DATA:r()({maininfo:a})},d.log(t),d.log(r()(a)),o=this,dsf.http.post("/fn/xform/save",t).then(function(e){200==e.data.code?dsf.http.post("fn/supervise/approval/feedBack",{pk:o.info_id,fid:o.masterId}).then(function(t){d.log(t),"200"==t.data.code&&(o.$toast.success("提交成功"),1==i?o.$router.go("-1"):n&&n(e))}):o.$toast.fail("保存失败"),d.log(e)})):this.$toast.fail("请输入反馈情况"):this.$toast.fail("请选择反馈时间"):this.$toast.fail("请选择反馈人"):this.$toast.fail("请输入反馈单位")},getUserList:function(){var e=this;dsf.http.get("/fn/xform/data?pk="+this.info_id+"&moduleId="+this.moduleId,{}).then(function(t){e.maininfo=t.data.main,d.log(e.maininfo)})},onConfirm:function(t){this.fksj=dsf.date.format(t,"yyyy-mm-dd hh:ii:00"),this.showPicker=!1},initData:function(){},cancePerson:function(){this.showPerson=!1},getUserNames:function(t){var n="",i="";return t.forEach(function(t,e){""==n?(n=t.name,i=t.id):(n+=","+t.name,i+=","+t.id)}),{str:n,id:i}},getSelectUser:function(t){d.log("我的",t),0<t.length&&(this.Invited=this.getUserNames(t),this.fkr=this.Invited.str)},selectUser:function(){this.showPerson=!0,d.log("选人")},doFileRead:function(t,e){var n=this,e="/fn/mobileAttachment/upload?fileId=&moduleId="+this.moduleId+"&mid="+this.moduleId+"&pId=0&pnId=0&nodeName="+encodeURI("拟稿")+"&nrType="+e+"&pk="+this.info_id+"&newFileFlag=0";dsf.http.upload(e,{},t).then(function(t){d.log(t),n.getWebFiles()})},afterRead:function(e){var n=this;this.$toast.loading({message:"上传中...",forbidClick:!0,duration:0,overlay:!0}),this.onSubmit(function(t){n.doFileRead(e,1)})},getWebFiles:function(){var t={info_id:this.info_id,infoId:this.info_id,moduleId:this.moduleId,nodeId:"",start:-1,limit:100},n=this;dsf.http.post("/fn/mobileAttachment/getFormAttachment",t).then(function(t){d.log(t.data),t&&t.data&&t.data.rows&&t.data.rows.forEach(function(t,e){"1"==t.attachType&&(n.attach_1=t.document)}),n.$toast.clear()})},removeFile:function(t){d.log(t);var e=this,t=(this.$toast.loading({message:"删除中...",forbidClick:!0,duration:0,overlay:!0}),{pk:t.infoId,fileId:t.id,moduleId:t.moduleId,mid:t.moduleId,nrType:t.type,fileName:t.title});dsf.http.post("/fn/mobileFileUpload/delete",t).then(function(t){e.getWebFiles()})}}},a=(0,n(51900).Z)(e,function(){var n=this,i=n._self._c;return i("div",{staticClass:"receipt"},[i("div",{staticClass:"form-frame"},[i("div",{staticClass:"form-contain"},[i("van-form",{on:{submit:function(t){return n.onSubmit("",1)}}},[i("van-field",{attrs:{readyonly:"","input-align":"right",label:"*反馈人",placeholder:"请选择"},on:{click:n.selectUser},scopedSlots:n._u([{key:"label",fn:function(){return[i("span",[i("label",{staticClass:"mast-input"},[n._v("*")]),n._v("反馈人")])]},proxy:!0}]),model:{value:n.fkr,callback:function(t){n.fkr=t},expression:"fkr"}}),n._v(" "),i("van-popup",{attrs:{position:"bottom",round:""},model:{value:n.showPicker,callback:function(t){n.showPicker=t},expression:"showPicker"}},[i("van-datetime-picker",{attrs:{"min-date":n.minDate,"max-date":n.maxDate,type:"datetime"},on:{confirm:n.onConfirm,cancel:function(t){n.showPicker=!1}},model:{value:n.currentDate,callback:function(t){n.currentDate=t},expression:"currentDate"}})],1),n._v(" "),i("van-field",{attrs:{value:n.fksj,"input-align":"right",readonly:"",clickable:"",name:"calendar",placeholder:"请选择"},on:{click:function(t){n.showPicker=!0}},scopedSlots:n._u([{key:"label",fn:function(){return[i("span",[i("label",{staticClass:"mast-input"},[n._v("*")]),n._v("反馈时间")])]},proxy:!0}])}),n._v(" "),i("van-field",{staticClass:"reset files",attrs:{rows:"2",label:"*反馈情况"},scopedSlots:n._u([{key:"label",fn:function(){return[i("span",[i("label",{staticClass:"mast-input"},[n._v("*")]),n._v("反馈情况")])]},proxy:!0},{key:"input",fn:function(){return[i("div",{staticClass:"dofile",staticStyle:{width:"100%"}},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:n.fkqk,expression:"fkqk"}],attrs:{maxlength:"300"},domProps:{value:n.fkqk},on:{input:function(t){t.target.composing||(n.fkqk=t.target.value)}}})])]},proxy:!0}])}),n._v(" "),i("van-field",{staticClass:"files",staticStyle:{"flex-direction":"column"},attrs:{"input-align":"right",name:"uploader"},scopedSlots:n._u([{key:"label",fn:function(){return[i("span",[n._v("下一步工作：")])]},proxy:!0},{key:"input",fn:function(){return[i("div",{staticClass:"dofile",staticStyle:{width:"100%"}},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:n.xybgz,expression:"xybgz"}],attrs:{maxlength:"300"},domProps:{value:n.xybgz},on:{input:function(t){t.target.composing||(n.xybgz=t.target.value)}}})])]},proxy:!0}])}),n._v(" "),i("van-field",{staticStyle:{"margin-top":"15px"},attrs:{"input-align":"right",name:"uploader"},scopedSlots:n._u([{key:"label",fn:function(){return[i("span",[i("label",{staticClass:"mast-input"},[n._v("*")]),n._v("附件：")])]},proxy:!0},{key:"input",fn:function(){return[i("div")]},proxy:!0},{key:"right-icon",fn:function(){return[i("van-uploader",{staticClass:"upload-btn",attrs:{"after-read":n.afterRead}},[i("van-icon",{staticClass:"iconfont iconjiahao",attrs:{color:"#1989fa"}})],1)]},proxy:!0}])}),n._v(" "),i("div",{staticClass:"upload-files"},n._l(n.attach_1,function(e,t){return i("div",{key:t,staticClass:"file-list"},[i("i",{staticClass:"iconfont iconfile"}),n._v(" "),i("span",[n._v(n._s(e.title))]),n._v(" "),i("van-icon",{attrs:{color:"#999999",name:"clear"},on:{click:function(t){return n.removeFile(e)}}})],1)}),0),n._v(" "),i("div",{staticClass:"submit"},[i("van-button",{attrs:{square:"",block:"",type:"info","native-type":"submit"}},[n._v("提交")])],1)],1),n._v(" "),i("van-popup",{style:{height:"80%"},attrs:{"close-on-click-overlay":!1,position:"bottom",round:""},model:{value:n.showPerson,callback:function(t){n.showPerson=t},expression:"showPerson"}},[i("selectPerson",{attrs:{extra:{tabs:[{key:"self_unit"}],multiple:!1,rootObject:5},type:0},on:{getSelectUser:n.getSelectUser,cancePerson:n.cancePerson}})],1)],1)])])},[],!1,null,"014dcb0a",null).exports},18868:function(t,e,n){var o=n(25108);const s=(i,a=500,o=!0)=>{let s,l=0,r,d,c=n=>{s=setTimeout(()=>{var t=(new Date).getTime(),e=t-l;e<n?(l=t,c(a-e)):(o||i.apply(r,d),clearTimeout(s),s=null)},n)};return function(){r=this,d=arguments;var t=(new Date).getTime();l=t,s||(o&&i.apply(r,d),c(a))}};e.Z={name:"DebounceClick",functional:!0,render(t,e){var n,i=e.props.time,a=e.props.immediate,e=e.slots().default;return void 0===e?(o.warn("<debounce> 组件必须要有子元素"),null):((e=e[0]||null).data.on&&e.data.on.click?(n=e.data.on.click,n=s(n,i,a),e.data.on.click=n):e.componentOptions&&e.componentOptions.listeners.click&&(n=e.componentOptions.listeners.click,n=s(n,i,a),e.componentOptions.listeners.click=n),e)}}}}]);