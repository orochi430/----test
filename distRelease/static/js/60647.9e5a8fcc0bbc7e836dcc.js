"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[60647],{57868:function(a,t,e){e.r(t);var n=e(25108),e={initHandle:function(t,a,e){e.$set(t.main,"B0001",{value:"".concat(t.main.B0013.value.split(" ")[0]).concat(t.main.A0011.value,"调换申请")}),e.$bus.on("selectUserBus",function(a){n.log("busObj.metaData",a.metaData),"C-ZB-ZBDHSQ-0005"===a.metaData.metaId&&(n.log("busObj",a),dsf.http.post("/fn/shiftExchangeController/afterCodeChooseGetDate",{id:a.value}).then(function(a){200==a.data.code&&(e.$set(t.main,"C-ZB-ZBDHSQ-0006",{value:a.data.data.startTime}),e.$set(t.main,"C-ZB-ZBDHSQ-0007",{value:a.data.data.endTime}),e.$set(t.main,"B0064",{value:a.data.data.userId}))}))})}};t.default=e}}]);