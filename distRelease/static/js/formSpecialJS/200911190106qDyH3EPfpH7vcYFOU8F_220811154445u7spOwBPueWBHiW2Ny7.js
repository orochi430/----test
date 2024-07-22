// 江苏人事 请假申请
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function calLeaveDays () {
      let leaveType = formData.main["C-LEAVE-0001"].value
      let startTime = formData.main["C-LEAVE-0002"].value
      let endTime = formData.main["C-LEAVE-0003"].value
  
      if(leaveType && startTime && endTime){
        dsf.http.post("/fn/leaveController/calLeaveDays", { leaveType, startTime, endTime }).then(({data}) => {
          formData.main["C-LEAVE-0016"].value = data.data
        })
      }
    }
    dsf.http.post(`/fn/leaveController/checkNxj?userId=${dsf.util.loadSessionStore("user")["user_id"]}`).then(({data}) => {
      let total = data.data.nxjjcts+data.data.nxjjzts-data.data.synjts+data.data.sjLjts+data.data.bjLjts+data.data.hjts+data.data.cjts+data.data.hljts+data.data.tqjts+data.data.sjts
      formData.main["C-LEAVE-0006"].value = String(total)
    })
    vueData.$bus.on("checkVal", function (busObj) {
      if(busObj.metaData.metaId == "C-LEAVE-0001") {
        calLeaveDays()
      }
    })
    vueData.$bus.on("selectDateTime", function (busObj) {
      if(busObj.metaData.metaId == "C-LEAVE-0002" || busObj.metaData.metaId == "C-LEAVE-0003") {
        calLeaveDays()
      }
    })
  }
  window.spJS=exportObj;
})();
