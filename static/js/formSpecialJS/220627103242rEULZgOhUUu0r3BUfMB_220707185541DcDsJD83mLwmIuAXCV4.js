(function () {
  // 江西商务厅请假
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {

    // 选择姓名带出职务
    vueData.$bus.$off("selectUserBus").on("selectUserBus", function (busObj) {
      // console.log(busObj)
      if (busObj.metaData.metaId == 'C-LEAVE-0034') {
        dsf.http.post('ctrl/travelApplication/getUser', {id: busObj.value}).then(res => {
          if (res.data.code == 200) {
            vueData.$set(formData.main, 'C-LEAVE-0019', {value: res.data.data.dingDingUnitRank})
          }
        })
      }
    });
    
  }
  window.spJS=exportObj;
})();
