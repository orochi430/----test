//陕西政府  批示按钮 打开弹窗   
(function () {
  const exportObj = {};
  exportObj.changeOpinion = function (formData, formStruct, vueData) {
    vueData.componentName = 'opinionSxDialog'
  }
  exportObj.closeDialogCallback = function (data, actionName, formData, formMeta, vueData) {
    if (data == true) {
      vueData.initData()
    }
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function checkCode(value) {
      function setControl(Ids, flag) {
        Ids.forEach(item => {
          vueData.$set(formStruct.controls.find(ele => ele.metaId == item), "show", flag)
        })
      }
      let showControls = ["C-GW-FW-0310", "B0043", "C-GW-FW-0112", "B0038", "B0010", "C-FW-0036"]
      let dataMap = new Map()
      dataMap.set(["231101095747kEnNmyDWFFuuKXBxHm1", "231031173309agF0BokkRimsMhibCsz", "231031173245vpypoF23Q8Yb9C3ZKCV", "231021211651sU0GXmUg1iVtEU0sXrp"], ["C-GW-FW-0310"])
      dataMap.set(["231101095738hh48Kye8SRuPQePJBc2", "231101095725gtXvNZ2ZTxiu1rNfgzL", "231031173301WnBszXn43zJI4kDHJAB", "231101110933cpqtQzftGtcInpIv12h",
        "231101161729ITyV0Y2qK7xL1qMJ7Px", "231103152358IisO035yh0UX4qUkVgd"], ["B0043", "C-GW-FW-0112"])
      dataMap.set(["DZHYJY", "DZHYJY", "ZTHHYJY"], ["B0038", "B0010"])
      dataMap.set(["SZTB", "YQTB"], ["B0038", "B0010", "C-FW-0036"])
      dataMap.set(["231102154824idQlTiVmtAMRKKmpmhN"], ["B0010", "C-FW-0036"])
      dataMap.set(["LHFW", "SWSZFLHFW"], ["C-GW-FW-0112"])
      for (values of dataMap.entries()) {
        if (values[0].includes(value)) {
          setControl(showControls, false)
          setControl(values[1], true)
        }
      }
    }
    if (formData.main["231101171656hcRSy4zFdGtYJ23xcQm"].value) {
      checkCode(formData.main["231101171656hcRSy4zFdGtYJ23xcQm"].value)
    }
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "231101171656hcRSy4zFdGtYJ23xcQm") {
        checkCode(busObj.value)
      }
    })
  }
  window.spJS = exportObj;
})();