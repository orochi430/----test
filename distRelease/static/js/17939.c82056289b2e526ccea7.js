"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[17939],{59698:function(t,a,e){e.r(a);var n=e(66250),o=e(33453),m=e.n(o),o=e(79529),r=e.n(o),o=e(62207),d=e.n(o),o=e(73473),s=e.n(o),o=e(8450),i=e.n(o),v=e(90541),Q=e(25108),o={},l=0,J=0,u=0,p=0,x=0,h=0,y=!0,C="",L="",S=0,g="",M="",D=(new Date).getFullYear(),f=v.Z.util.loadSessionStore("user");function X(t,a,e){var n;n=!1,(e=e).formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(function(t){15==t["C-QJSQJGLMX-004"].value&&(n=!0)}),n?e.$set(e.formData.main,"B0033",{value:C}):e.$set(e.formData.main,"B0033",{value:L})}function G(t,a){return t=Date.parse(t),a=Date.parse(a),a=Math.abs(a-t),Math.floor(a/864e5)}function Z(t,a,e){t=t.replace(/\-/g,"/"),a=a.replace(/\-/g,"/"),e=e.toLowerCase();var t=new Date(t),a=new Date(a),n=1;switch(e){case"second":n=1e3,0;break;case"minute":n=6e4,0;break;case"hour":n=36e5;break;case"day":n=864e5}return r()((a.getTime()-t.getTime())/r()(n))}function b(){c.apply(this,arguments)}function c(){return(c=(0,n.Z)(m().mark(function t(a,e,n,o){var r,s,i,u,l,f,c;return m().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=n.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows[o.subFormIndex],Q.log(r),!r){t.next=41;break}if(s=r["C-QJSQJGLMX-001"].value,-1<(i=r["C-QJSQJGLMX-014"].text).indexOf("全天")?i="全天":-1<i.indexOf("上午")?i="上午":-1<i.indexOf("下午")&&(i="下午"),s){t.next=8;break}return t.abrupt("return");case 8:if(u=r["C-QJSQJGLMX-002"].value,-1<(l=r["C-QJSQJGLMX-015"].text).indexOf("全天")?l="全天":-1<l.indexOf("上午")?l="上午":-1<l.indexOf("下午")&&(l="下午"),u){t.next=13;break}return t.abrupt("return");case 13:if(s&&u){if(Z(s,u,"day")<0)return v.Z.layer.toast("结束日期小于开始日期，请重新填写！",!1),n.$set(r,"C-QJSQJGLMX-002",{value:""}),t.abrupt("return");t.next=18}else t.next=35;break;case 18:if(f=r["C-QJSQJGLMX-004"].text,0!=S)t.next=30;else{if(-1<f.indexOf("公休假")||-1<f.indexOf("调休")||-1<f.indexOf("事假")||-1<f.indexOf("病假"))return t.next=23,v.Z.http.post("fn/vacation/getdays",{start:s,end:u,type:f}).then(function(t){var a,e,t=t.data;Q.log(t),"success"==t.type&&(a=t.data.days,e=t.data.snum,t=t.data.endnum,s==u&&i==l&&"全天"==i||s==u&&"上午"==i&&"下午"==l?a=1:s==u&&i==l?a=.5:(0==e&&"下午"==i&&(a-=.5),0==t&&"上午"==l&&(a-=.5)),"调休"==f&&-1==a?(v.Z.layer.toast(s+"日期后的调休假不足当前调休天数！",!1),n.$set(r,"C-QJSQJGLMX-002",{value:""}),n.$set(r,"C-QJSQJGLMX-020",{value:0})):(n.$set(r,"C-QJSQJGLMX-020",{value:a}),"公休假"!=f&&"调休"!=f||n.$set(r,"C-QJSQJGLMX-019",{value:a})))});t.next=25}break;case 23:t.next=28;break;case 25:c=Z(s,u,"day")+1,s==u&&i==l&&"全天"==i||s==u&&"上午"==i&&"下午"==l?c=1:s==u&&i==l?c=.5:(c=G(s,u),"上午"==i&&"下午"==l||"上午"==i&&"全天"==l||"全天"==i&&"下午"==l||"全天"==i&&"全天"==l?c+=1:(i==l||"下午"==i&&"全天"==l||"全天"==i&&"上午"==l)&&(c+=.5)),n.$set(r,"C-QJSQJGLMX-020",{value:c});case 28:t.next=33;break;case 30:c=G(s,u),"上午"==i&&"下午"==l||"上午"==i&&"全天"==l||"全天"==i&&"下午"==l||"全天"==i&&"全天"==l?c+=1:(i==l||"下午"==i&&"全天"==l||"全天"==i&&"上午"==l)&&(c+=.5),n.$set(r,"C-QJSQJGLMX-020",{value:c});case 33:t.next=38;break;case 35:n.$set(r,"C-QJSQJGLMX-017",{value:0}),n.$set(r,"C-QJSQJGLMX-019",{value:0}),n.$set(r,"C-QJSQJGLMX-020",{value:0});case 38:return t.next=40,v.Z.http.post("fn/schedule/zbcx",{userid:a.main["C-LEAVE-0033"].value,kssj:s,jssj:u}).then(function(t){var t=t.data,a=(Q.log(t),t);if(null!=a&&0<a.length){for(var e="",n=0;n<a.length;n++)e+=""==e?"您在"+a[n].zbrq:","+a[n].zbrq;v.Z.layer.toast(e+="存在值班情况",!1)}});case 40:!function(t,a){var e,n=t.main.B0013.value,t=t.main.B0019.value;n&&t?(e=0,a.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(function(t){"Deleted"!=t.action&&(e+=d()(t["C-QJSQJGLMX-020"].value))}),a.$set(a.formData.main,"B0014",{value:e})):a.$set(a.formData.main,"B0014",{value:0})}(a,n);case 41:case"end":return t.stop()}},t)}))).apply(this,arguments)}function w(t,a,e,n,o){if(20!=g){var n=e.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows[n.subFormIndex],r=(Q.log(n),n["C-QJSQJGLMX-004"].text),s=0,i=e.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows;if("公休假"==r)if(1==o){for(var u=0;u<i.length;u++)"Deleted"!=i[u].action&&"公休假"==(r=i[u]["C-QJSQJGLMX-004"].text)&&(s+=+i[u]["C-QJSQJGLMX-017"].value);l<s&&(v.Z.layer.toast("调休天数大于上一年剩余公休天数，请重新填写！",!1),e.$set(n,"C-QJSQJGLMX-017",{value:""}))}else{for(u=0;u<i.length;u++)"Deleted"!=i[u].action&&"公休假"==(r=i[u]["C-QJSQJGLMX-004"].text)&&(s+=+i[u]["C-QJSQJGLMX-019"].value);J<s&&(v.Z.layer.toast("调休天数大于当前年剩余公休天数，请重新填写！",!1),e.$set(n,"C-QJSQJGLMX-019",{value:""}))}else if("调休"==r)if(1==o){for(u=0;u<i.length;u++)"Deleted"!=i[u].action&&"调休"==(r=i[u]["C-QJSQJGLMX-004"].text)&&(s+=+i[u]["C-QJSQJGLMX-017"].value);p<s&&(v.Z.layer.toast("调休天数大于当上一年剩余调休天数，请重新填写！",!1),e.$set(n,"C-QJSQJGLMX-017",{value:""}))}else{for(u=0;u<i.length;u++)"Deleted"!=i[u].action&&"调休"==(r=i[u]["C-QJSQJGLMX-004"].text)&&(s+=+i[u]["C-QJSQJGLMX-019"].value);x<s&&(v.Z.layer.toast("调休天数大于当前年剩余调休天数，请重新填写！",!1),e.$set(n,"C-QJSQJGLMX-019",{value:""}))}}}o.saveAfter=function(a,t,e){v.Z.http.post("fn/leaveChack/qjsjbc",{pk:e.main.A0001.value}).then(function(t){t=t.data;Q.log(t),1==t.bool&&(v.Z.layer.toast("保存成功"),a.$eventBus.refresh(a))})},window["C-LEAVE-0034_beforeOpenCode"]=function(t,a){var e=t.main["C-LEAVE-0036"].value,t=t.main["C-LEAVE-0035"].value;return e?t?(e&&(a+="?date="+e+"&type="+t),a):(v.Z.layer.toast("请选择调整类型！",!1),""):(v.Z.layer.toast("请选择值班日期！",!1),"")},o.initHandle=function(f,c,m){g=m.formMeta.parameters.nodeId,M=m.formMeta.parameters.flowId,-1<g.indexOf("2gietW4MxTpnLG4")||-1<g.indexOf("GxYBikPZXiKZFIg")||g.indexOf("XujpRr9H2c2UNOy"),m.$bus.on("checkVal",function(t){"C-QJSQJGLMX-004"==t.metaData.metaId&&X(0,0,m),"C-QJSQJGLMX-014"!=t.metaData.metaId&&"C-QJSQJGLMX-015"!=t.metaData.metaId||b(f,c,m,t)}),m.$bus.on("selectDateTime",function(t){"C-QJSQJGLMX-001"==t.metaData.metaId&&(n=f,o=c,s=m,r=t,Q.log(r),e="",s.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(function(t){"Deleted"!=t.action&&(t=t["C-QJSQJGLMX-001"].value)&&(e=e||new Date(t),(a=new Date(t))<e)&&(e=a)}),s.$set(s.formData.main,"B0013",{value:v.Z.date.format(e,"yyyy-mm-dd")}),b(n,o,s,r)),"C-QJSQJGLMX-002"==t.metaData.metaId&&(n=f,o=c,s=t,u="",(r=m).formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(function(t){"Deleted"!=t.action&&(t=t["C-QJSQJGLMX-002"].value)&&(u=u||new Date(t),i=new Date(t),u<=i)&&(u=i)}),r.$set(r.formData.main,"B0019",{value:v.Z.date.format(u,"yyyy-mm-dd")}),b(n,o,r,s));var a,e,n,o,r,s,i,u,t=m.formData.main.B0013,l=m.formData.main.B0019,t=(t=t.value,l=l.value,t=new Date(Date.parse(t.replace(/-/g,"/"))).getTime(),l=new Date(Date.parse(l.replace(/-/g,"/"))).getTime(),Math.abs(t-l)/864e5);m.$set(m.formData.main,"B0014",{value:1+t})}),m.$bus.on("inpBus",function(t){"C-QJSQJGLMX-017"==t.metaData.metaId&&w(0,0,m,t,1),"C-QJSQJGLMX-019"==t.metaData.metaId&&w(0,0,m,t,2)}),20==g&&(y=!1),v.Z.http.post("fn/vacation/cxsydw",{userId:f.main["C-LEAVE-0033"].value}).then(function(t){t=t.data;Q.log(t),0==t.message&&(S=1)}),v.Z.http.post("fn/vacation/getInit",{userid:f.main["C-LEAVE-0033"].value}).then(function(t){var a,t=t.data,e=(Q.log(t),t);"success"==t.type&&0==S&&(l=e.data.sgx,J=e.data.cgx,u=e.data.tx,p=e.data.GWYS,x=e.data.BREAKREST,h=e.data.gy,C=e.data.lasttq+e.data.bt,L=e.data.bt,t="共"+(l+J)+"天，",0==l&&(t+="其中（"+(D-1)+"年"+l+"天，"),t+=D+"年"+J+"天）",l+J==0&&(t="0"),a="共"+(p+x)+"天，",0!=p&&(a+="其中（"+(D-1)+"年"+p+"天，"),a+=D+"年"+x+"天）",p+x==0&&(a="0"),f.main["C-LEAVE-0019"].value=t,f.main.B0033.value=e.data.bt,f.main["C-LEAVE-0011"].value=a)});m.$route.query.type;"GxYBikPZXiKZFIg"!=g&&"LCmV7xcqQEYX5Uy"!=g||"1"==f.main.B0055.value&&v.Z.layer.toast("该处室内其他处级干部已请假！"),v.Z.http.post("fn/fws/showyj",{pk:f.main.A0001.value}).then(function(t){t=t.data;Q.log(t),t.html}),v.Z.http.post("fn/vacation/cxqjxj",{pk:f.main.A0001.value}).then(function(t){t=t.data;Q.log(t),t.data}),m.$watch(function(){return f.main["C-LEAVE-0033"]},function(t,a){t.value},{deep:!0})},o.saveFilter=function(i,t,u){return new(s())(function(a,e){try{var t,n,o,r,s;"2004151356420etidaZjudnWsttL8SL"==M?(t=i.main.B0013.value,n=i.main.B0019.value,o=f.user_id,r=f.deptId,s="",v.Z.http.post("fn/leaveChack/leaderChack",{starTime:t,endTime:n,uid:o,deptId:r}).then(function(t){200==t.code&&("无处长请假"!=(s=t.data.msg)?v.Z.layer.confirm({message:s,confirmButtonText:"确认"},function(){u.$set(u.formData.main,"B0055",{value:1,text:"是"}),a()},function(){e()}):a())})):"2005211450226HH9MYmnumAfNLK95DM"==M&&0<h&&-1<i.main["C-LEAVE-0032"].value.indexOf("10")?v.Z.layer.confirm({message:"您本年度出国"+h+"次，是否继续提交?",confirmButtonText:"确认"},function(){a()},function(){e()}):a()}catch(t){a()}})},o.custom1=function(t,a,e){var o=!0,r=0,s=0;if(e.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows.forEach(function(t){var a,e,n=t["C-QJSQJGLMX-004"].text;"公休假"==n?(e=+t["C-QJSQJGLMX-017"].value+ +t["C-QJSQJGLMX-019"].value,a=+t["C-QJSQJGLMX-020"].value,r+=a,e!=a&&(v.Z.layer.toast("上一年公休天数加上当前年公休天数不等于总公休天数，请重新填写！"),o=!1)):"调休"==n&&(e=+t["C-QJSQJGLMX-020"].value,s+=e)}),y){if(+l+J<r)return o=!1,void v.Z.layer.toast("公休总天数大于当前剩余公休天数，请重新填写！");"调休"==type&&u<s&&(o=!1,v.Z.layer.toast("调休总天数大于当前剩余调休天数，请重新填写！"))}o&&this.$dialog.confirm({title:"提示",message:"是否办结？"}).then(function(){v.Z.http.post("fn/meeting/overJq",{pk:t.main.A0001.value}).then(function(t){t=t.data;Q.log(t),1==t.data?v.Z.layer.toast("办结成功！",void 0,function(){e.backSucces()}):v.Z.layer.toast("办结失败！")})})},o.custom2=function(t,a,e){"B6iSwEThhdmFE8S"==g?v.Z.http.post("fn/vacation/qjxj",{pk:t.main.A0001.value,type:"1"}).then(function(t){t=t.data;Q.log(t),1==t.data?v.Z.layer.toast("作废成功！",void 0,function(){e.backSucces()}):v.Z.layer.toast("作废失败！")}):v.Z.http.post("fn/vacation/qjxj",{pk:t.main.A0001.value}).then(function(t){t=t.data;Q.log(t),1==t.data?v.Z.layer.toast("销假成功！",void 0,function(){e.backSucces()}):v.Z.layer.toast("销假失败！")})},o.showRestVacations=function(t,a,e){t='<div style="padding: 20px"><font size="5px"> 公休剩余天数: <font color="red">'+t.main["C-LEAVE-0019"].value+'</font> <br>调休剩余天数：<font color="red"> '+t.main["C-LEAVE-0011"].value+"</font></font></div>";e.$dialog.alert({title:"提示",message:t}).then(function(){})},o.xq=function(t,a,e){var n=t.main.A0014.value,o=new Date(n),n=v.Z.date.format(o,"yyyy-mm-dd"),o=(o.setFullYear(o.getFullYear()-1),v.Z.date.format(o,"yyyy-mm-dd"));e.$router.push({path:"/commonList?fileType=JQXQ",query:{start:o,end:n,userId:t.main.A0010.value,notLink:1}})},o.bg=function(t,a,e){var n=e.formData.multinfos["210312194834FNFROx1B8AmrspWQKsd"].rows,o={pk:t.main.A0001.value,rows:i()(n)};v.Z.layer.confirm({message:"是否确认变更假期时间?",confirmButtonText:"确认"},function(){v.Z.http.post("fn/vacation/update",o).then(function(t){"success"==t.type?e.saveNoTip(function(t){v.Z.layer.toast("变更成功！")}):v.Z.layer.toast("变更失败！")})})},a.default=o}}]);