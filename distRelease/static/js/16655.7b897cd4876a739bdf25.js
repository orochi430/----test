"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[16655],{16655:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});var a=n(25108),e={name:"mztSignIn",data:function(){return{pageInfo:{orgName:"",title:"",scrUrl:"",type:3},returnMes:["签到成功","您已签到","非活动人员无法签到","活动结束无法签到"],imgName:["success","signedIn","unable","end"]}},created:function(){var t,e,n=this;a.log("text",this.$route.query.text),this.$route.query.text.includes("orgId")?(e=this.$route.query.text.split(",")[0],t=this.$route.query.text.split(",")[1],e="".concat(e,"/ctrl/api/sso/slogin?logName=[logName]&redirectUrl=").concat(e).concat(t),dsf.http.get(dsf.util.getReplaceUrl(e)).then(function(t){a.log(t),"200"==t.data.code&&(n.pageInfo=t.data.data,n.returnMes=["报到成功","已报到，无需再次报到","非本支部人员不能报到"],n.imgName=["success","unable","end"],n.pageInfo.scrUrl="static/images/mengzhengtong/".concat(n.imgName[n.pageInfo.type-1],".jpg"))})):(t=this.$route.query.text.split(",")[0],e=this.$route.query.text.split(",")[1],dsf.http.get("".concat(e,"/ctrl/partyOrgAct/signByQRCode"),{pk:t,userId:dsf.util.loadSessionStore("user").user_id}).then(function(t){a.log(t),"200"==t.data.code&&(n.pageInfo=t.data.data,n.pageInfo.scrUrl="static/images/mengzhengtong/".concat(n.imgName[n.pageInfo.type-1],".jpg"))}).catch(function(t){a.log("err",t)}))}},s=(0,n(51900).Z)(e,function(){var t=this,e=t._self._c;return e("div",{staticClass:"mztSignIn"},[e("div",{staticClass:"orgName"},[t._v(t._s(t.pageInfo.orgName))]),t._v(" "),e("div",{staticClass:"title"},[t._v(t._s(t.pageInfo.title))]),t._v(" "),e("div",{staticClass:"imgDiv"},[e("img",{attrs:{src:t.pageInfo.scrUrl}})]),t._v(" "),e("span",{staticClass:"returnInfo"},[e("strong",[t._v(t._s(t.returnMes[t.pageInfo.type-1]))])])])},[],!1,null,"0f0e945c",null).exports}}]);