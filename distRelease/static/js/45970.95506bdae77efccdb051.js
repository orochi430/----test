"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[45970],{47335:function(s,u,e){e.r(u);var o=e(5044),r=e(25108),e={initHandle:function(e,s,n){var a=[];n.$bus.on("subFormSelect",function(s){r.log(s),"200912131453ppqrs2DIAXiwfYkisGv"==s.subFormId&&a.push.apply(a,(0,o.Z)(s.checkItems))}),n.$bus.on("blurBus",function(s){var u;r.log(s),"200912131453ppqrs2DIAXiwfYkisGv"==s.subFormId&&"C-OFFICE-SUPPLIE-SUB-0010"==s.metaData.metaId&&(u=e.multinfos[s.subFormId].rows[s.subFormIndex],Number(s.value)>Number(a[s.subFormIndex].dataValue.YSSY))&&(dsf.layer.toast("领用数量不能大于剩余数量"+a[s.subFormIndex].dataValue.YSSY),n.$set(u,"C-OFFICE-SUPPLIE-SUB-0010",{value:""}))}),n.$bus.on("subFormDelete",function(s){"200912131453ppqrs2DIAXiwfYkisGv"==s.subFormId&&a.splice(s.subFormIndex,1)})}};u.default=e}}]);