"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[74213],{30232:function(t,e,a){a.r(e);var n=a(66250),r=a(33453),l=a.n(r),p=a(25108),r={},s=[];function h(t,e){return s=[],dsf.http.post("/ctrl/propertyJoint/getCodeItems",{codeFid:t,queryModuleId:"2206111015248zPjoAGO8jdei91mR3B",triggerCondition:1<arguments.length&&void 0!==e?e:"2206111112144ujEhZ2mPEg5uDmhjel"}).then(function(t){p.log(t.data),200==t.data.code&&(s=t.data.data)})}r.initHandle=function(t,i,d){d.$route.params.pk||d.$set(t.main,"220611172205xsTK3z1uLWem4PbwQo2",{value:d.$route.query.enterpriseUserId});var m=i.controls.find(function(t){return"220611181058haWHcgtwdnu9r4G2A7G"==t.metaId}),c=i.controls.find(function(t){return"220611181509P1I11FJSkEwjdggb941"==t.metaId}),f=i.controls.find(function(t){return"2206111907081Hr09vP5R7EqdIbRaEP"==t.metaId});t.main["220611181058haWHcgtwdnu9r4G2A7G"].value||(m.propertyShow=0),t.main["220611181509P1I11FJSkEwjdggb941"].value||(c.propertyShow=0),t.main["2206111907081Hr09vP5R7EqdIbRaEP"].value||(f.propertyShow=0),d.$set(i.controls.find(function(t){return"220611182621faDGuS01WDQLHw27coR"==t.metaId}),"autosizeStyle",{maxHeight:"100px",minHeight:"50px",overflow:"auto",padding:"5px !important",border:"1px solid #CFCFCF",borderRadius:"2px"}),t.main["220611182621faDGuS01WDQLHw27coR"].value="按照产业链完整、投资规模较大、符合疫情防控要求、具备防疫条件等标准，从省、市、县重点项目库中遴选一定数量的在建项目和新开工项目，分别列入本级“四保”项目白名单(覆盖本级重点项目年度计划投资70%以上)，主要包括省、市、县三级领导分包推进项目、“三个一批”项目中具有引领带动作用的项目、灾后恢复重建重点建设项目等。考虑到“打捆项目”施工分散，管控难度较大，原则上不列入白名单。具体申报条件：\n  (一)符合安全生产要求。\n  能够落实安全生产法律法规和标准规范，具备安全施工条件，无重大生产安全事故隐患。\n  (二)符合施工环境保护要求。\n  能够落实施工环境保护制度，能够达到扬尘污染防控、环保调控等有关标准。\n  (三)符合疫情防控要求。\n  状项目具备封闭式管理条件，有固定的餐饮、住宿场所，对施工人员和机械、车辆能够做到实时管控，在应急状态下能够实现闭环管理；高速公路、铁路等线性项目，能够做到工作场所和住所的“点对点”接送，减少中途接触环节，确保防疫安全。\n  (四)符合诚信履约要求。\n  项目建设单位信用良好，在“信用中国”无不良信用记录。",d.$bus.on("checkVal",function(){var e=(0,n.Z)(l().mark(function t(e){var a,n,r,u,o;return l().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(p.log(e),"2206111110457h7fqDzMJlYjSpK9GDp"==e.metaData.metaId)return d.$set(d.formData.main,"2206111112144ujEhZ2mPEg5uDmhjel",{value:"",text:""}),n=e.metaData.enumData.find(function(t){return t.value==e.value}).id,a=i.controls.find(function(t){return"2206111112144ujEhZ2mPEg5uDmhjel"==t.metaId}),t.next=7,h(n);t.next=10;break;case 7:a.enumData=s,t.next=50;break;case 10:if("2206111214403ReuhgYa9PMB0IjYKXL"==e.metaData.metaId)return d.$set(d.formData.main,"220611122303fSAXDtNAnFRYwc3ZDl3",{value:"",text:""}),n=e.metaData.enumData.find(function(t){return t.value==e.value}).id,r=i.controls.find(function(t){return"220611122303fSAXDtNAnFRYwc3ZDl3"==t.metaId}),t.next=16,h(n);t.next=19;break;case 16:r.enumData=s,t.next=50;break;case 19:if("220611163308Mvzsh6ftqzFXYOOZbil"==e.metaData.metaId)return d.$set(d.formData.main,"220611181058haWHcgtwdnu9r4G2A7G",{value:"",text:""}),d.$set(d.formData.main,"220611181509P1I11FJSkEwjdggb941",{value:"",text:""}),d.$set(d.formData.main,"2206111907081Hr09vP5R7EqdIbRaEP",{value:"",text:""}),m.propertyShow=0,c.propertyShow=0,f.propertyShow=0,u=e.metaData.enumData.find(function(t){return t.value==e.value}).id,t.next=29,h(u,"220611181058haWHcgtwdnu9r4G2A7G");t.next=32;break;case 29:0<s.length&&(m.propertyShow=1,m.enumData=s),t.next=50;break;case 32:if("220611181058haWHcgtwdnu9r4G2A7G"==e.metaData.metaId)return d.$set(d.formData.main,"220611181509P1I11FJSkEwjdggb941",{value:"",text:""}),d.$set(d.formData.main,"2206111907081Hr09vP5R7EqdIbRaEP",{value:"",text:""}),c.propertyShow=0,f.propertyShow=0,u=e.metaData.enumData.find(function(t){return t.value==e.value}).id,t.next=40,h(u,"220611181509P1I11FJSkEwjdggb941");t.next=43;break;case 40:0<s.length&&(c.propertyShow=1,c.enumData=s),t.next=50;break;case 43:if("220611181509P1I11FJSkEwjdggb941"==e.metaData.metaId)return d.$set(d.formData.main,"2206111907081Hr09vP5R7EqdIbRaEP",{value:"",text:""}),f.propertyShow=0,o=e.metaData.enumData.find(function(t){return t.value==e.value}).id,t.next=49,h(o,"2206111907081Hr09vP5R7EqdIbRaEP");t.next=50;break;case 49:0<s.length&&(f.propertyShow=1,f.enumData=s);case 50:case"end":return t.stop()}},t)}));return function(t){return e.apply(this,arguments)}}())},e.default=r}}]);