"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[19571],{93183:function(a,e,n){n.r(e);var t=n(73473),i=n.n(t),u=n(25108),t={};function l(a){a=a.replace(/-/g,"/");return Date.parse(a)}t.handle=function(a,e){},t.initHandle=function(n,a,t){t.$bus.on("selectDateTime",function(a){var e;"B0021"!=a.metaData.metaId&&"B0022"!=a.metaData.metaId||t.formData.main.B0021.value&&t.formData.main.B0022.value&&(a=l(n.main.B0021.value),e=l(n.main.B0022.value),u.log(a,e),0<(e=Math.floor((e-a)/864e5)+1)?t.$set(t.formData.main,"B0010",{value:e}):(t.$set(t.formData.main,"B0021",{value:""}),t.$set(t.formData.main,"B0022",{value:""}),t.$set(t.formData.main,"B0010",{value:"0"}),dsf.layer.toast("结束时间必须大于开始时间")))})},t.saveFilter=function(n,a,e,t){return new(i())(function(a,e){("save"==t||"send"==t)&&l(n.main.B0021.value)<l(n.main.B0022.value)?e("结束时间必须大于开始时间"):a()})},e.default=t}}]);