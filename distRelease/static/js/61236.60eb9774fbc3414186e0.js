"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[61236],{76697:function(t,a,e){e.r(a);var s,l,n=e(66250),o=e(33453),f=e.n(o),o=e(79529),p=e.n(o),o=e(73473),u=e.n(o),h=e(90541),i=e(25108),o={};function r(){d.apply(this,arguments)}function d(){return(d=(0,n.Z)(f().mark(function t(a,e,n,s,l){var o,u,i,r,d,p,c,m;return f().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n.main.B0003.value)return t.abrupt("return","");t.next=3;break;case 3:return o=l.formMeta.parameters.pk,i=new Date,u=h.Z.date.format(i,"yyyy-dd-dd hh:ii:ss"),m=c=p=d=r=i="",t.next=14,h.Z.http.post("fn/filecode/template",{pk:o,ruleId:a}).then(function(t){t=t.data;return"success"==t.type&&(r=t.data.selects[0].data,p=t.data.selects[2].data,4<t.data.selects.length)&&(m=t.data.selects[4].data),t={pk:o,ruleId:a,date:u,moduleId:n.main.A0004.value,metaId:"B0003",allowRecycle:"1"},h.Z.http.post("fn/filecode/data",t)}).then(function(t){t=t.data;"success"==t.type&&(d=t.data[0].data[0].showValue,c=t.data[1].data[0].showValue)});case 14:i=r?r+d+p+c+m:d+"-"+c,(i=e?i.replace("deptName",e):i).match("^")&&null==e&&(i=i.split("^").join("")),l.$set(l.formData.main,"B0003",{text:a,value:i});case 18:case"end":return t.stop()}},t)}))).apply(this,arguments)}function c(e,n,s){var l=1,t=e.main["C-FW-0033"].value,a=e.main["C-FW-0060"].value,t=(1==t?l=4:110!=a&&120!=a||(l=2),e.main.A0012.value),o=e.main["C-GW-FW-0202"].text;"情况专报"==o&&(l=3),"会议纪要"==o&&(o=e.main.B0056.text,l=3),h.Z.http.post("fn/fws/getFwWh",{type:l,flId:a,deptId:t,wz:o}).then(function(t){var a,t=t.data;"success"==t.type&&(t=t.message)&&(2==l?r((a=t.split("-"))[0],a[1],e,n,s):r(t,null,e,n,s))})}o.handle=function(t,a){},o.initHandle=function(a,t,e){var n;s=e.formMeta.parameters.nodeId,l=e.formMeta.parameters.nodeName,e.$route.params.pk||(n=e.$route.params.pk,a.main["C-FW-0022"].value=n,n=e.$route.query.MASTERID,a.main.B0035.value=n),e.$bus.on("inputRadio",function(t){"C-FW-0033"==t.metaData.metaId&&1!=t.value&&(t="<span style='font-size: 16px;'>根据《上海市行政规范性文件制定和备案规定》（市政府令第26号），“规范性文件是指除政府规章外，行政机关依据法定职权或者法律、法规、规章的授权制定的涉及公民、法人或者其他组织权利、义务，具有普遍约束力，在一定期限内可以反复适用的文件。”规范性文件可在对外实施行政行为时引作依据。",e.$dialog.alert({title:"提示",message:t=(t+="请确认发文是否具有以上定义所述特征。如有，请重新选择本属性为‘是’，并按照规范性文件制备相关规定办理。如继续选择“否”，所制定文件将不作为规范性文件管理，不")+"得在对外实施审批管理时引作法规依据，复议、诉讼时也不具有法规效力。"+"</span>"}).then(function(){}),a.main["C-FW-0037"].text="",a.main["C-FW-0037"].value="5")}),e.$bus.on("checkVal",function(t){"C-FW-0060"==t.metaData.metaId&&(t.value?h.Z.http.post("fn/fws/getFwDept",{id:t.value}).then(function(t){t=t.data,i.log(t);"success"==t.type&&(e.$set(e.formData.main,"B0025",{value:t.data[0].fieldStringShow}),e.$set(e.formData.main,"C-FW-0048",{value:t.data[0].fieldStringValue}))}):e.$set(e.formData.main,"B0055",{value:""})),"C-FW-0037"==t.metaData.metaId&&(1==t.value?e.$set(e.formData.main,"C-FW-0038",{value:1}):5==t.value?e.$set(e.formData.main,"C-FW-0038",{value:5}):t.value)}),h.Z.http.post("fn/fws/showyj",{pk:e.$route.params.pk}).then(function(t){t=t.data;i.log(t)}),"BN2qS5svAdAx6zS"!=s&&"编号定稿用印"!=l&&"登记局定稿用印"!=l||c(a,t,e)},o.afterLogicDeleteXForm=function(t,a,e){h.Z.http.post("fn/gwInterface/delete",{pk:e.$route.params.pk}).then(function(t){t.data})},o.tzqz=function(t,a,e){var n=t.main.A0001.value,s=t.main.A0004.value,l=t.main.B0025.value,o=t.main["C-FW-0048"].value;h.Z.http.post("ctrl/fws/redCheck",{id:n}).then(function(t){"操作成功"==t.data.message?h.Z.http.post("ctrl/fws/dragElectronicSignature",{id:n,qzType:"3",moduleId:s,fwDw:l,fwdwCode:o}).then(function(t){var t=t.data;"操作成功"==t.message?(t.data[0].url1,t=t.data[0].documentId,h.Z.http.post("ctrl/fws/updateDocumentId",{id:n,documentId:t,type:"1"}).then(function(t){t.data.message})):h.Z.layer.toast("签章页面接口获取失败，请联系管理员！")}):h.Z.layer.toast("请先套红文件，后续才能签章！")})},o.dzqz=function(t,a,e){var n=t.main.A0001.value,s=(t.main.A0004.value,t.main.B0025.value),l=t.main["C-FW-0048"].value;h.Z.http.post("ctrl/fws/redCheck",{id:n}).then(function(t){"操作成功"==t.data.message?"上海市纪委监委驻市规划资源局纪检监察组"==s||"上海市第三次全国国土调查领导小组办公室"==s?DSF.getURLRoot():"上海市人民政府"==s&&"10397，10722"==l?(h.Z.layer.loading("电子签章中,请稍等..."),h.Z.http.post("ctrl/fws/electronicSignature",{id:n,qzType:"2",fwDw:s,fwdwCode:l}).then(function(t){"操作成功"==t.data.message?h.Z.layer.toast("签章成功"):h.Z.layer.toast("签章失败，请联系管理员！")})):"上海市规划委员会"==s||"中国共产主义青年团上海市规划和自然资源局委员会"==s||"中共上海市自然资源确权登记局支部委员会"==s?h.Z.layer.toast("没有对应的签章，暂不盖章！"):(h.Z.layer.loading("电子签章中,请稍等..."),h.Z.http.post("ctrl/fws/electronicSignature",{id:n,qzType:"3",fwDw:s,fwdwCode:l}).then(function(t){"操作成功"==t.data.message?h.Z.layer.toast("签章成功"):h.Z.layer.toast("签章失败，请联系管理员！")})):h.Z.layer.toast("请先套红文件，后续才能签章！")})},o.custom2=function(t,a,e){var n=a.parameters.pk,s=a.parameters.nodeId;!function e(n,s,t,l,o,u,i,r,d){n?t?(t="ctrl/office/generatorFile?fileType=100&templateId="+t+"&moduleId=191017155313FhhVNpnRSCB9hg4KOWP&pk="+s,h.Z.http.post(t,{}).then(function(t){t.data,h.Z.layer.loading("打印单下载中,请稍等...");h.Z.http.post("ctrl/fws/leaderAutograph",{moduleId:n,pk:s}).then(function(t){t=t.data;"操作成功"==t.message?h.Z.http.post("ctrl/menhu/gjcs/gnr",{infoId:s,attValue:100}).then(function(t){t=t.data;"success"===t.type&&t.data.list<=0&&h.Z.layer.toast("没有打印单下载!")}):h.Z.layer.toast(t.message)})})):(t=i.main["C-LW-0004"].value,h.Z.http.post("ctrl/office/template",{moduleId:n,templateType:1,pk:s,bllx:t}).then(function(t){var a,t=t.data;"success"==t.type&&t.data&&(1==(a=p()(t.data.count,10))?(t=t.data.templateId)&&e(n,s,t,l,o,u,i,r,d):1<a||h.Z.layer.toast("缺少打印模板!"))})):h.Z.layer.toast("缺少打印模板!")}("191017155313FhhVNpnRSCB9hg4KOWP",n,"",a.parameters.flowId,s,"",t,a,e)},o.saveFilter=function(s,l,o){return new(u())(function(a,e){var t=s.main.B0003,t={ruleId:t.ruleid,whNum:t.num},n=!1;h.Z.http.post("fn/fws/checkWh",t).then(function(t){var t=t.data;i.log(t),0==(n="success"==t.type&&0==t.data?!0:n)?(e("文号已经被取走了，需要重新获取文号"),c(s,l,o)):(t="","主动公开信息"!=s.main["C-FW-0037"].text||s.main["C-FW-0035"].value||(t+="选择主动公开信息时，政策法规类别必选。"),"会议纪要"!=s.main["C-GW-FW-0202"].text||s.main.B0056.value||(t+="公文文种 选择会议纪要时，会议纪要子项必选。"),10729==s.main.B0051.value&&s.main["C-FW-0022"].value&&!s.main["C-GW-FW-0103"].value&&(t="选择科研管理发文时，消息发送范围必选。"),t&&e(t),a())})})},a.default=o}}]);