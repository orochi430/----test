"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[91314],{15307:function(n,e,t){t.r(e);var a=t(73473),i=t.n(a),d=t(90541),a={handle:function(n,e){},initHandle:function(e,n,i){var t=i.formMeta.controls.find(function(n){return"B0003"==n.metaId});i.$set(t,"initruleid",t.readonlyValue.ruleid||""),i.$bus.on("checkValToFilecode",function(n){"C-GW-FW-0202"==n.metaData.metaId&&t.privilege.editable&&d.Z.http.post("fn/ministry/bfwgetruleidbyfwlx",{fwlx:e.main["C-GW-FW-0202"].value}).then(function(n){200==n.data.code&&i.$set(t,"relateRuleid",n.data.data.filecodeid)})}),i.$watch(function(){return e.main},function(n,e){var t={action:"btnBWFW",icon:"",name:"生成会签",parameters:"0"},a={action:"btnDelBWFW",icon:"",name:"删除会签",parameters:"1"};"1"==n["210419103326nLnnu9jebQUtgOvASMx"].value?(i.delBtn(t),i.addBtn(a)):(i.delBtn(a),"1"==n["C-FW-0038"].value?i.addBtn(t):i.delBtn(t))},{deep:!0,immediate:!0})},saveFilter:function(n,e,t,a){return new(i())(function(n,e){n()})}};e.default=a}}]);