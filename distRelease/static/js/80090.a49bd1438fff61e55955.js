"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[80090],{80090:function(t,i,e){e.r(i),e.d(i,{default:function(){return d}});var i=e(26243),a=e.n(i),i=e(62680),n=e.n(i),i=e(95366),o=e.n(i),i=e(6919),c=e.n(i),l=e(77193);function r(i,t){var e,s=a()(i);return n()&&(e=n()(i),t&&(e=e.filter(function(t){return o()(i,t).enumerable})),s.push.apply(s,e)),s}var s=e(88561),i=e(84528),f=e(25108),i={name:"InspectorConditionRBhuiyi",components:{DingBtn:i.default},data:function(){return{alreadyFeedbackTotal:0,noFeedbackTotal:0,isActive:"left",isConditionActive:"fkqs2",listData:[],defaultStyles:{height:"48px",width:"96%",borderRadius:"6px"},listDataMock:{},type:1,dingObj:{},params:{pk:""},activeNames:[],wfkData:[]}},mounted:function(){if(this.$route.params.data)s.Z.saveToSessionStore("formData",this.$route.params.data);else{if(!s.Z.loadSessionStore("formData"))return this.$toast.fail("参数错误"),void this.$router.go(-1);this.$route.params.data=s.Z.loadSessionStore("formData")}this.params.pk=this.$route.params.data.dataValue.B0035,f.log(this.params.pk),this.initList()},methods:{initList:function(){var n=this,t=this.$route.params.data.dataValue.B0035;dsf.http.get("fn/superviseV5/feedback/getFeedBackByFid?id=".concat(t,"&rank=2"),n.params).then(function(t){n.listData=[{deptName:"部领导",data:[{feedBackUserName:"李小兵",strDate:"2021-10-13",content:"已反馈"}]},{deptName:"B司局",data:[{feedBackUserName:"孙达",strDate:"2021-10-13",content:"已反馈"}]},{deptName:"C司局",data:[{feedBackUserName:"陆杨",strDate:"2021-10-13",content:"已反馈"}]},{deptName:"D司局",data:[{feedBackUserName:"段凯涛",strDate:"2021-10-13",content:"已反馈"}]}]}),dsf.http.get("fn/superviseV5/feedback/getNoFeedBackByFid?id=".concat(t,"&rank=2"),n.params).then(function(t){n.wfkData=[{cbrText:"胡江",cbbmText:"技术部",status:1,foreignId:"04315916189527314"},{cbrText:"王嘉智",cbbmText:"文艺部",foreignId:"01073527405729134428",status:1},{cbrText:"张大鹏",cbbmText:"人事局",foreignId:"121068281424150312",status:1}],n.wfkData1=[{cbrText:"陆杨",cbbmText:"新闻协调部",status:1,foreignId:"04315916189527314"},{cbrText:"陆海云",cbbmText:"新闻协调部",foreignId:"01073527405729134428",status:1},{cbrText:"宋骏",cbbmText:"技术部",foreignId:"121068281424150312",status:1}];var i=[],e=dsf.util.loadSessionStore("user"),s={},a=n.wfkData.reduce(function(t,i){return s[i.foreignId]||i.foreignId==e.foreignId||(s[i.foreignId]=t.push(i)),t},[]);a.forEach(function(t){t.user_name=t.cbrText,t.foreign_id=t.foreignId,t.id=t.foreignId}),f.log("users==>",i),f.log("canUser",a),n.$set(n.dingObj,"users",i),n.$set(n.dingObj,"selectPerson",a)})},shipin:function(){dd.biz.conference.videoConfCall({title:"视频会议",calleeCorpId:"dinga215a69365c38b4e24f2f5cc6abecb85",calleeStaffIds:["68322808-685947715","0428350360389383399","10070005571930976529"],onSuccess:function(){},onFail:function(){}})},clickHeader:function(t){this.isActive=t},clickCondition:function(t){f.log(t),this.isConditionActive=t,this.filtersData()},cuiban:function(){var t=this;dsf.http.post("fn/cuibanRB").then(function(){t.dsf.layer.toast("催办成功")})},filtersData:function(){"fkqs0"==this.isConditionActive?(this.noFeedbackTotal=this.listDataMock.fkqs0.fkzt01.length,this.alreadyFeedbackTotal=this.listDataMock.fkqs0.fkzt02.length):"fkqs1"==this.isConditionActive?(this.noFeedbackTotal=1<this.listDataMock.lenght?this.listDataMock[1].fkzt1.length:0,this.alreadyFeedbackTotal=1<this.listDataMock.lenght?this.listDataMock[1].fkzt2.length:0):(this.noFeedbackTotal=this.listDataMock[0].fkzt1.length,this.alreadyFeedbackTotal=this.listDataMock[0].fkzt2.length),"fkqs0"==this.isConditionActive&&"left"==this.isActive&&(this.listData=this.filterData(this.listDataMock.fkqs0.fkzt01),f.log(this.listData)),"fkqs0"==this.isConditionActive&&"right"==this.isActive&&(this.listData=this.listDataMock.fkqs0.fkzt02),"fkqs1"==this.isConditionActive&&"left"==this.isActive&&(this.listData=1<this.listDataMock.lenght?this.filterData(this.listDataMock[1].fkzt1):[]),"fkqs1"==this.isConditionActive&&"right"==this.isActive&&(this.listData=1<this.listDataMock.lenght?this.listDataMock[1].fkzt2:[]),"fkqs2"==this.isConditionActive&&"left"==this.isActive&&(this.listData=this.filterData(this.listDataMock[0].fkzt1)),"fkqs2"==this.isConditionActive&&"right"==this.isActive&&(this.listData=this.listDataMock[0].fkzt2);var e=[],s=/(\d{4})-(\d{2})-(\d{2})(\s)(\d{2}):(\d{2})/,a=(f.log(this.listData),this.listData.forEach(function(t){var i;t.time="",t.sjfksj&&(i=s.exec(t.sjfksj),t.time=i[2]+"-"+i[3]+" "+i[5]+":"+i[6]),e.indexOf(t.foreignId)<0&&e.push(t.foreignId)}),dsf.util.loadSessionStore("user")),n={},t=this.listData.reduce(function(t,i){return n[i.foreignId]||i.foreignId==a.foreignId||(n[i.foreignId]=t.push(i)),t},[]);t.forEach(function(t){t.user_name=t.fkr,t.foreign_id=t.foreignId,t.id=t.foreignId}),f.log("users==>",e),f.log("canUser",t),this.$set(this.dingObj,"users",e),this.$set(this.dingObj,"selectPerson",t)},filterData:function(t){var i=[];return t.forEach(function(t){t.data.length&&t.data.forEach(function(t){i.push(t)})}),i},handleClick:function(t){this.$router.push("/commonForm/210608105939mkuTUSzHdhowHPHxlY8/2109121906368wtdwi06olY4uTNhozf")}}},d=(0,e(51900).Z)(i,function(){var e=this,s=e._self._c;return s("div",{staticClass:"inspector-condition"},[s("div",{staticClass:"_header"},[s("div",{staticClass:"_btn",class:"left"==e.isActive?"_active":"",on:{click:function(t){return e.clickHeader("left")}}},[e._v("\n       未报名"),e.noFeedbackTotal?s("span",[e._v("("+e._s(e.noFeedbackTotal)+")")]):e._e()]),e._v(" "),s("div",{staticClass:"_btn",class:"right"==e.isActive?"_active":"",on:{click:function(t){return e.clickHeader("right")}}},[e._v("\n       已报名"),e.alreadyFeedbackTotal?s("span",[e._v("("+e._s(e.alreadyFeedbackTotal)+")")]):e._e()])]),e._v(" "),"left"==e.isActive?s("div",{class:{_content:!0,_weifankui:"fkqs2"==e.isConditionActive,_yifanhui:"fkqs2"!=e.isConditionActive}},[s("ul",e._l(e.wfkData,function(t,i){return s("li",{key:i,staticClass:"_cell"},[s("span",{staticClass:"icon iconfont icontouxiang"}),e._v(" "),s("span",{staticClass:"_cell__title"},[e._v(e._s(t.cbrText))]),e._v(" "),s("span",{class:1==t.status?"_yi _cell__value":"_wei _cell__value"},[e._v(e._s(t.cbbmText))])])}),0),e._v(" "),s("div",{staticClass:"_footer"},["fkqs2"==e.isConditionActive?s("Ding-btn",{attrs:{prarms:e.dingObj,options:{size:"large",type:"info"},text:"DING一下"}}):e._e()],1)]):e._e(),e._v(" "),"right"==e.isActive?s("div",{staticClass:"_content _yifanhui"},[s("ul",e._l(e.wfkData1,function(t,i){return s("li",{key:i,staticClass:"_cell"},[s("span",{staticClass:"icon iconfont icontouxiang"}),e._v(" "),s("span",{staticClass:"_cell__title"},[e._v(e._s(t.cbrText))]),e._v(" "),s("span",{class:1==t.status?"_yi _cell__value":"_wei _cell__value"},[e._v(e._s(t.cbbmText))])])}),0),e._v(" "),s("div",{staticClass:"_footer"},[e.dsf.config.ddSetting.isDing?s("div",{staticClass:"box",style:function(i){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?r(Object(e),!0).forEach(function(t){(0,l.Z)(i,t,e[t])}):c()?Object.defineProperties(i,c()(e)):r(Object(e)).forEach(function(t){Object.defineProperty(i,t,o()(e,t))})}return i}({},e.defaultStyles)},[s("van-button",{attrs:{type:"info"},on:{click:e.shipin}},[e._v("视频会议")])],1):e._e()])]):e._e()])},[],!1,null,"332539b1",null).exports}}]);