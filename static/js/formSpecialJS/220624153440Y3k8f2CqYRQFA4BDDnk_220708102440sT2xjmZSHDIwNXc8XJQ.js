(function () {
  // 江西商务厅出差
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {

    // 选择姓名带出职务
    vueData.$bus.$off("selectUserBus").on("selectUserBus", function (busObj) {
      // console.log(busObj)
      if (busObj.metaData.metaId == 'C-OUTMANAGE-0010') {
        dsf.http.post('ctrl/travelApplication/getUser', {id: busObj.value}).then(res => {
          if (res.data.code == 200) {
            vueData.$set(formData.main, 'C-OUTMANAGE-0011', {value: res.data.data.dingDingUnitRank})
          }
        })
      }
    });
    
  }
  window.spJS=exportObj;
})();
