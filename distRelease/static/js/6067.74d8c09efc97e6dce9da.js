"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[6067,18868,92137],{92137:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var n=i(25108),e={name:"TipsSetting",data:function(){return{tipsdata:[{id:"1",name:"开始时",ischecked:!1},{id:"2",name:"5分钟前",ischecked:!1},{id:"3",name:"15分钟前",ischecked:!0},{id:"4",name:"30分钟前",ischecked:!1},{id:"5",name:"1小时前",ischecked:!1},{id:"6",name:"1天前",ischecked:!1}],tipstype:["应用内","短信","电话"],curr:0,sectype:"",isnonetips:!1,lastData:""}},methods:{back:function(){this.$router.back()},secMultiple:function(t){this.isnonetips=!1,this.tipsdata[t].ischecked=!this.tipsdata[t].ischecked},changeTab:function(t){this.curr=t},noneTips:function(){this.isnonetips=!this.isnonetips,this.tipsdata.forEach(function(t){t.ischecked=!1})},sure:function(){var i=this;this.lastData="",this.isnonetips?this.lastData="无提醒":(this.tipsdata.forEach(function(t,e){t.ischecked&&(""==i.lastData?i.lastData=i.tipsdata[e].name:i.lastData+=","+i.tipsdata[e].name)}),""==this.lastData?this.lastData=this.tipstype[this.curr]+"提醒":this.lastData+=","+this.tipstype[this.curr]+"提醒"),n.log(this.lastData),this.$emit("getData",this.lastData)}}},a=(0,i(51900).Z)(e,function(){var i=this,n=i._self._c;return n("div",{staticClass:"ds-tips"},[n("div",{staticClass:"setting"},[n("van-cell",{staticClass:"none-tips",attrs:{value:"无提醒"},on:{click:i.noneTips},scopedSlots:i._u([i.isnonetips?{key:"right-icon",fn:function(){return[n("van-icon",{staticStyle:{"line-height":"inherit"},attrs:{name:"success",color:"#5094F3"}})]},proxy:!0}:null],null,!0)}),i._v(" "),n("van-cell-group",{staticClass:"none-tips"},i._l(i.tipsdata,function(t,e){return n("van-cell",{key:t.id,staticClass:"cell-choose",class:t.ischecked?"active":"",attrs:{value:t.name},on:{click:function(t){return i.secMultiple(e)}},scopedSlots:i._u([t.ischecked?{key:"right-icon",fn:function(){return[n("van-icon",{staticStyle:{"line-height":"inherit"},attrs:{name:"success",color:"#5094F3"}})]},proxy:!0}:null],null,!0)})}),1),i._v(" "),n("van-cell",{staticClass:"none-tips",attrs:{title:"提醒方式"},scopedSlots:i._u([{key:"default",fn:function(){return[n("div",{staticClass:"tabs-card"},i._l(i.tipstype,function(t,e){return n("div",{class:i.curr==e?"active":"",on:{click:function(t){return i.changeTab(e)}}},[n("span",[i._v(i._s(t))])])}),0)]},proxy:!0}])}),i._v(" "),n("div",{staticClass:"bf"},[n("van-button",{attrs:{type:"primary"},on:{click:i.sure}},[i._v("确定")])],1)],1)])},[],!1,null,null,null).exports},26401:function(t,e,i){i.r(e),i.d(e,{default:function(){return a}});var e=i(26243),r=i.n(e),e=i(8450),c=i.n(e),e=i(63560),n=i(92137),m=i(25108),e={name:"ScheduleLeader",components:{selectPerson:e.default,TipsSetting:n.default},filters:{dateFilter:function(t){return t?dsf.date.format(t,"mm月dd日 DD"):"请选择"},timeFilter:function(t,e){return t?dsf.date.format(t,"hh:ii"):e}},data:function(){var t=new Date;return t.setFullYear(t.getFullYear()+2),{minDate:new Date,maxDate:t,showStartTimePicker:!1,showEndTimePicker:!1,showStartTimePicker1:!1,showEndTimePicker1:!1,uploader:[],showPerson:!1,showRemind:!1,moduleId:"200203104738Me2hIuO6x5hHyzLKNhY",formId:"200203104738nZsmlZoj1cD9pwKnUil",info_id:"",form:{schedule:"",isAllDay:!1,address:"",remind:"15分钟前,应用内提醒",startTime:null,endTime:null,invited:"",file:[]},rules:{schedule:[{required:!0,message:"请填写日程名称"}]},attach_1:[],sdate:"",edate:"",AllDay:{text:"非全天事项",value:"-1"}}},mounted:function(){var t=this.$route.params.id;this.info_id=t,this.initData()},created:function(){},methods:{switchStatus:function(t){this.maininfo["C-RC-0005"]={},t?(this.AllDay.value="1",this.AllDay.text="全天事项"):(this.AllDay.value="-1",this.AllDay.text="非全天事项"),m.log(this.AllDay)},onConfirm:function(t,e){this.maininfo["C-RC-0003"]={},this.maininfo["C-RC-0004"]={},this.$set(this.form,e,t),"startTime"==e?(this.sdate=dsf.date.format(t,"yyyy-mm-dd hh:ii:00"),m.log(this.sdate)):(this.edate=dsf.date.format(t,"yyyy-mm-dd hh:ii:00"),m.log(this.edate)),this.showStartTimePicker=!1,this.showEndTimePicker=!1,this.showStartTimePicker1=!1,this.showEndTimePicker1=!1},onSubmit:function(e,i){var n=this,a=(m.log(this.form),m.log("===表单最终提交数据"),this.maininfo.B0001={},this.maininfo["C-RC-0005"]={},this.maininfo["C-RC-0003"]={},this.maininfo["C-RC-0004"]={},this.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"]={},this.maininfo["C-RC-0008"]={},this.maininfo["C-RC-0024"]={},this.maininfo["C-RC-0015"]={},this.maininfo["C-RC-0017"]={},this.maininfo["C-RC-0016"]={},this.maininfo["C-RC-0024"]={},this.maininfo.B0001.value=this.form.schedule,this.maininfo["C-RC-0003"].value=this.sdate,this.maininfo["C-RC-0004"].value=this.edate,this.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"].value=this.form.address,this.maininfo["C-RC-0024"].value="",this.maininfo["C-RC-0015"].value="",this.maininfo["C-RC-0017"].value="",this.maininfo["C-RC-0016"].value="提醒",this.maininfo["C-RC-0024"].value="1",{});r()(this.maininfo).forEach(function(t,e){a[t]={values:[{key:"value",value:n.maininfo[t].value}]},n.maininfo[t].hasOwnProperty("text")&&a[t].values.push({key:"text",value:n.maininfo[t].text})});for(var t=1;t<=39;t++){var s="A00"+(t<10?"0"+t:t);a[s]||(a[s]={},a[s].values=[{key:"value",value:""}])}a["C-RC-0008"]={},a["C-RC-0008"].values=[{key:"schema",value:this.form.invited.schema},{key:"text",value:this.form.invited.str},{key:"value",value:this.form.invited.id}],a["C-RC-0002"]={},a["C-RC-0002"].values=[{key:"text",value:"普通日程"},{key:"value",value:"1"}],a["C-RC-0005"]={},a["C-RC-0005"].values=[{key:"text",value:this.AllDay.text},{key:"value",value:this.AllDay.value}],a["C-RC-0006"]={},a["C-RC-0006"].values=[{key:"text",value:"公开"},{key:"value",value:"1"}],m.log(c()(a));var o={moduleId:this.moduleId,pk:this.info_id,formId:this.formId,__DATA:c()({maininfo:a})},l=(m.log(o),m.log(c()(o)),this);dsf.http.post("/fn/xform/save",o).then(function(t){m.log(t),"success"==t.data.type?(l.$toast.success("保存成功"),1==i&&l.$router.go("-1")):l.$toast.fail("提交失败,请重新提交"),e&&e(t)})},formatter:function(t,e){return"year"===t?"".concat(e,"年"):"month"===t?"".concat(e,"月"):"day"===t?"".concat(e,"日"):"hour"===t?"".concat(e,"时"):"minute"===t?"".concat(e,"分"):e},chooseStartTime:function(){this.form.isAllDay?(this.showStartTimePicker=!1,this.showStartTimePicker1=!0):(this.showStartTimePicker1=!1,this.showStartTimePicker=!0)},chooseEndTime:function(){this.form.isAllDay?(this.showEndTimePicker=!1,this.showEndTimePicker1=!0):(this.showEndTimePicker1=!1,this.showEndTimePicker=!0)},tipsSetting:function(){this.showRemind=!0},getData:function(t){m.log(t),this.showRemind=!1,this.form.remind=t},getUserNames:function(t){var i="",n="",a="";return t.forEach(function(t,e){""==i?i=t.name:i+=","+t.name,""==n?n=t.id:n+=","+t.id,""==a?a="1::"+t.id:a+=",1::"+t.id}),{str:i,id:n,schema:a}},getSelectUser:function(t){m.log("我的",t),0<t.length&&(this.form.invited=this.getUserNames(t))},cancePerson:function(){this.showPerson=!1},selectUser:function(){this.showPerson=!0,m.log("选人")},closePerson:function(){this.showPerson=!this.showPerson},initData:function(){var t="/fn/xform/data?moduleId=200203104738Me2hIuO6x5hHyzLKNhY&pk=",e=(this.info_id&&(t="/fn/xform/data?moduleId=200203104738Me2hIuO6x5hHyzLKNhY&pk="+this.info_id),this);dsf.http.get(t,{}).then(function(t){t&&t.data&&t.data.main&&(e.maininfo=t.data.main,e.info_id=e.maininfo.A0001.value,e.maininfo.B0001&&(e.form.schedule=e.maininfo.B0001.value),e.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"]&&(e.form.address=e.maininfo["1912101459016AWTVtzGEHaWAjhCQ5Z"].value),e.maininfo["C-RC-0003"]&&(e.form.startTime=e.maininfo["C-RC-0003"].value,e.sdate=e.maininfo["C-RC-0003"].value),e.maininfo["C-RC-0004"]&&(e.form.endTime=e.maininfo["C-RC-0004"].value,e.edate=e.maininfo["C-RC-0004"].value),e.maininfo["C-RC-0005"]&&"1"==e.maininfo["C-RC-0005"].value?e.form.isAllDay=!0:e.form.isAllDay=!1,e.maininfo["C-RC-0008"])&&(e.form.invited={str:e.maininfo["C-RC-0008"].text,id:e.maininfo["C-RC-0008"].value,schema:e.maininfo["C-RC-0008"].schema}),m.log(e.maininfo),e.getWebFiles()}),dsf.http.post("fn/mobileAttachment/getUploadAttachmentType",{flowId:"",moduleId:this.moduleId}).then(function(t){m.log("上传类型",t)})},doFileRead:function(t,e){var i=this,e="/fn/mobileAttachment/upload?fileId=&moduleId="+this.moduleId+"&mid="+this.moduleId+"&pId=0&pnId=0&nodeName="+encodeURI("拟稿")+"&nrType="+e+"&pk="+this.info_id+"&newFileFlag=0";dsf.http.upload(e,{},t).then(function(t){m.log(t),i.getWebFiles()})},afterRead:function(e){var i=this;this.$toast.loading({message:"上传中...",forbidClick:!0,duration:0,overlay:!0}),this.onSubmit(function(t){i.doFileRead(e,0)})},getWebFiles:function(){var t={info_id:this.info_id,infoId:this.info_id,moduleId:this.moduleId,nodeId:"",start:0,limit:100},i=this;dsf.http.post("/fn/mobileAttachment/getFormAttachment",t).then(function(t){m.log(t.data),t&&t.data&&t.data.rows&&t.data.rows.forEach(function(t,e){i.attach_1=t.document,m.log(i.attach_1)}),i.$toast.clear()})},removeFile:function(t){m.log(t);var t={pk:t.infoId,fileId:t.id,moduleId:t.moduleId,mid:t.moduleId,nrType:t.type,fileName:t.title},e=this;dsf.http.post("/fn/mobileFileUpload/delete",t).then(function(t){e.getWebFiles()})}}},a=(0,i(51900).Z)(e,function(){var i=this,n=i._self._c;return n("div",{staticClass:"ds-schedule-add"},[n("van-popup",{attrs:{position:"bottom"},model:{value:i.showStartTimePicker,callback:function(t){i.showStartTimePicker=t},expression:"showStartTimePicker"}},[n("van-datetime-picker",{attrs:{"min-date":i.minDate,"max-date":i.maxDate,formatter:i.formatter,type:"datetime"},on:{confirm:function(t){return i.onConfirm(t,"startTime")},cancel:function(t){i.showStartTimePicker=!1}}})],1),i._v(" "),n("van-popup",{attrs:{position:"bottom"},model:{value:i.showEndTimePicker,callback:function(t){i.showEndTimePicker=t},expression:"showEndTimePicker"}},[n("van-datetime-picker",{attrs:{"min-date":i.minDate,"max-date":i.maxDate,formatter:i.formatter,type:"datetime"},on:{confirm:function(t){return i.onConfirm(t,"endTime")},cancel:function(t){i.showEndTimePicker=!1}}})],1),i._v(" "),n("van-popup",{attrs:{position:"bottom"},model:{value:i.showStartTimePicker1,callback:function(t){i.showStartTimePicker1=t},expression:"showStartTimePicker1"}},[n("van-datetime-picker",{attrs:{"min-date":i.minDate,"max-date":i.maxDate,formatter:i.formatter,type:"date"},on:{confirm:function(t){return i.onConfirm(t,"startTime")},cancel:function(t){i.showStartTimePicker1=!1}}})],1),i._v(" "),n("van-popup",{attrs:{position:"bottom"},model:{value:i.showEndTimePicker1,callback:function(t){i.showEndTimePicker1=t},expression:"showEndTimePicker1"}},[n("van-datetime-picker",{attrs:{"min-date":i.minDate,"max-date":i.maxDate,formatter:i.formatter,type:"date"},on:{confirm:function(t){return i.onConfirm(t,"endTime")},cancel:function(t){i.showEndTimePicker1=!1}}})],1),i._v(" "),n("van-form",{on:{submit:function(t){return i.onSubmit("",1)}}},[n("van-cell-group",[n("van-field",{staticClass:"meeting-textarea",attrs:{rules:i.rules.schedule,name:"schedule",label:"日程",type:"textarea","left-icon":"i iconfont iconricheng",placeholder:"请输入",autosize:""},model:{value:i.form.schedule,callback:function(t){i.$set(i.form,"schedule",t)},expression:"form.schedule"}})],1),i._v(" "),n("van-cell-group",[n("van-field",{attrs:{name:"isAllDay",label:"全天","left-icon":"i iconfont iconshijian",readonly:""},scopedSlots:i._u([{key:"right-icon",fn:function(){return[n("van-switch",{attrs:{size:"16"},on:{change:i.switchStatus},model:{value:i.form.isAllDay,callback:function(t){i.$set(i.form,"isAllDay",t)},expression:"form.isAllDay"}})]},proxy:!0}])}),i._v(" "),n("div",{staticClass:"time-Range"},[n("div",{staticClass:"time-Range-item time-Range-start",style:{opacity:i.form.startTime?1:.7},on:{click:i.chooseStartTime}},[n("div",{staticClass:"time-Range-day"},[i._v(i._s(i._f("dateFilter")(i.form.startTime)))]),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!i.form.isAllDay,expression:"!form.isAllDay"}],staticClass:"time-Range-time"},[i._v(i._s(i._f("timeFilter")(i.form.startTime,"开始时间")))])]),i._v(" "),n("div",{staticClass:"time-Range-item time-Range-end",style:{opacity:i.form.endTime?1:.7},on:{click:i.chooseEndTime}},[n("div",{staticClass:"time-Range-day"},[i._v(i._s(i._f("dateFilter")(i.form.endTime)))]),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!i.form.isAllDay,expression:"!form.isAllDay"}],staticClass:"time-Range-time"},[i._v(i._s(i._f("timeFilter")(i.form.endTime,"结束时间")))])])])],1),i._v(" "),n("van-cell-group",[n("van-field",{attrs:{name:"address","left-icon":"i iconfont icondingwei","right-icon":"i iconfont iconaddress-dark",placeholder:"请输入日程地点"},model:{value:i.form.address,callback:function(t){i.$set(i.form,"address",t)},expression:"form.address"}})],1),i._v(" "),n("van-cell-group",[n("van-field",{attrs:{name:"invited","left-icon":"i iconfont iconyaoqingcanyuren",placeholder:"邀请参与人","is-link":"",readonly:""},on:{click:i.selectUser},model:{value:i.form.invited.str,callback:function(t){i.$set(i.form.invited,"str",t)},expression:"form.invited.str"}})],1),i._v(" "),n("van-cell-group",[n("van-field",{attrs:{name:"remind","left-icon":"i iconfont icontixing",placeholder:"","is-link":"",readonly:""},on:{click:i.tipsSetting},model:{value:i.form.remind,callback:function(t){i.$set(i.form,"remind",t)},expression:"form.remind"}})],1),i._v(" "),n("van-cell-group",[n("van-field",{staticClass:"meeting-upload",attrs:{name:"file",label:"附件","left-icon":"i iconfont iconjiahao",placeholder:"请输入",autosize:""},scopedSlots:i._u([{key:"label",fn:function(){return[n("span",[n("label",{staticClass:"mast-input"}),i._v("附件")])]},proxy:!0},{key:"input",fn:function(){return[n("div",{staticClass:"dofile",staticStyle:{width:"100%"}},[n("div",{staticClass:"upload-files"},i._l(i.attach_1,function(e,t){return n("div",{key:t,staticClass:"file-list"},[n("i",{staticClass:"iconfont iconfile"}),i._v(" "),n("span",[i._v(i._s(e.title))]),i._v(" "),n("van-icon",{attrs:{name:"clear"},on:{click:function(t){return i.removeFile(e)}}})],1)}),0),i._v(" "),n("van-uploader",{staticClass:"upload-btn",attrs:{"after-read":i.afterRead,accept:".jpg, .gif, .png, .jpeg, .txt, .pdf, .doc, .docx, .xls, .xlsx"}},[n("span",{staticClass:"add-file"},[n("van-icon",{attrs:{name:"plus"}})],1)])],1)]},proxy:!0}])})],1),i._v(" "),n("div",{staticClass:"footer",staticStyle:{display:"none"}},[n("van-button",{attrs:{type:"info","native-type":"submit"}},[i._v("提交")])],1)],1),i._v(" "),n("van-popup",{style:{height:"100%"},attrs:{"close-on-click-overlay":!1,position:"bottom"},model:{value:i.showPerson,callback:function(t){i.showPerson=t},expression:"showPerson"}},[n("selectPerson",{attrs:{type:0},on:{getSelectUser:i.getSelectUser,cancePerson:i.cancePerson}})],1),i._v(" "),n("van-popup",{style:{height:"80%"},attrs:{position:"bottom"},model:{value:i.showRemind,callback:function(t){i.showRemind=t},expression:"showRemind"}},[n("tips-setting",{on:{getData:i.getData}})],1)],1)},[],!1,null,null,null).exports},18868:function(t,e,i){var s=i(25108);const o=(n,a=500,s=!0)=>{let o,l=0,r,c,m=i=>{o=setTimeout(()=>{var t=(new Date).getTime(),e=t-l;e<i?(l=t,m(a-e)):(s||n.apply(r,c),clearTimeout(o),o=null)},i)};return function(){r=this,c=arguments;var t=(new Date).getTime();l=t,o||(s&&n.apply(r,c),m(a))}};e.Z={name:"DebounceClick",functional:!0,render(t,e){var i,n=e.props.time,a=e.props.immediate,e=e.slots().default;return void 0===e?(s.warn("<debounce> 组件必须要有子元素"),null):((e=e[0]||null).data.on&&e.data.on.click?(i=e.data.on.click,i=o(i,n,a),e.data.on.click=i):e.componentOptions&&e.componentOptions.listeners.click&&(i=e.componentOptions.listeners.click,i=o(i,n,a),e.componentOptions.listeners.click=i),e)}}}}]);