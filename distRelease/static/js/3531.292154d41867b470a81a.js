"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[3531],{82815:function(a,e,n){n.r(e);var t=n(73473),i=n.n(t),o=n(90541),u=(n(88561),n(25108)),t={handle:function(a,e){},initHandle:function(t,a,l){function i(a){a=a.replace(/-/g,"/");return Date.parse(a)}u.log("请假审批"),u.log(l.formData),l.$bus.on("selectDateTime",function(a){var e,n;"C-LEAVE-0003"!=a.metaData.metaId&&"C-LEAVE-0002"!=a.metaData.metaId||l.formData.main["C-LEAVE-0003"].value&&l.formData.main["C-LEAVE-0002"].value&&(n=i(t.main["C-LEAVE-0002"].value),e=i(t.main["C-LEAVE-0003"].value),u.log(n,e),u.log(e=e-n),n=Math.floor(e/864e5)+1,u.log(n),0<n?l.$set(l.formData.main,"C-LEAVE-0006",{value:n}):(l.$set(l.formData.main,"C-LEAVE-0006",{value:""}),l.$set(l.formData.main,"C-LEAVE-0003",{value:""}),l.$set(l.formData.main,"C-LEAVE-0002",{value:""}),o.Z.layer.toast("结束时间必须晚于开始时间"))),u.log(a),u.log(l.formData)})},saveFilter:function(n,a,e,t){function l(a){a=a.replace(/-/g,"/");return Date.parse(a)}return new(i())(function(a,e){("save"==t||"send"==t)&&l(n.main["C-LEAVE-0003"].value)<l(n.main["C-LEAVE-0002"].value)?e("休假结束时间不能早于休假开始时间"):a()})}};e.default=t}}]);