"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[24090],{25319:function(t,e,o){o.r(e);var n=o(73473),s=o.n(n),c=o(25108),n={recovery:function(t,e){c.log(t,e.data);t=t.dataValue.A0001;dsf.http.post("fn/collect/recovery",{id:t}).then(function(t){dsf.layer.toast("回收成功！"),e.$eventBus.refresh(e)})},send:function(t,e){c.log(t,e);t=t.dataValue.A0001;dsf.http.post("fn/collect/send",{id:t}).then(function(t){dsf.layer.toast("发送成功！"),setTimeout(function(){e.$eventBus.refresh(e)},1e3)})},link:function(t,e,o,n,a){dsf.http.post("fn/collect/bdzt",{id:o}).then(function(t){c.log(t);t=t.data.message;n.$router.push({name:"commonForm",params:{moduleId:"220401101744dfdsGX6lJoVuDOW0Z6s",pk:o},query:{listId:"2204011037317J0ANrBJIGcmQFm8MQN",method:"viewList"}}),"3"==t&&n.$router.push({name:"commonForm",params:{moduleId:"220401101744dfdsGX6lJoVuDOW0Z6s",pk:o},query:{listId:"2204011037317J0ANrBJIGcmQFm8MQN",method:"bjList"}})})}};n.createRow=function(t,d){dsf.http.post("/ctrl/collect/querybm").then(function(t){1<t.data.data?dsf.http.post("/ctrl/collect/rbtxbm").then(function(t){var e,n,a;0<t.data.data.length?(n=e="",a=[],t.data.data.forEach(function(o){var t=new(s())(function(e,t){dsf.http.post("/ctrl/collect/typeData",{typeId:o}).then(function(t){setTimeout(function(){n+="<span id='".concat(o,'\' style="font-size: 16px;padding: 10px 0px;">').concat(t.data.data[0],"</span>"),e(n)},1)})});a.push(t)}),s().all(a).then(function(t){e="<p id='dialogP' style='display: flex; flex-direction: column;'>".concat(n,"<p/>"),d.$dialog.confirm({title:"请选择部门",showConfirmButton:!1,showCancelButton:!1,closeOnClickOverlay:!0,message:e}),d.$nextTick(function(){var t,e,o=document.getElementById("dialogP");t="click",e=function(t){t.preventDefault(),c.log(t);var e=t.target;c.log(e.id),dsf.http.post("/fn/collect/rbtxyf",{orgId:e.id}).then(function(t){200==t.data.code&&(0==t.data.message?(d.$dialog.close(),d.$router.push({name:"commonForm",params:{moduleId:d.moduleId},query:{draftOrgId:e.id}})):dsf.layer.toast("此部门今日已填写日报,请勿重复填写！"))}).error(function(t){dsf.layer.toast(t)})},o.addEventListener(t,e)})})):dsf.layer.toast("所有部门今日均已填写日报，请勿重复填写")}):d.$router.push({name:"commonForm",params:{moduleId:d.moduleId}})})},e.default=n}}]);