// 驻京办 餐饮安排
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
     vueData.$bus.on("selectUserBus", function (busObj) {
      console.log(busObj)
      if (busObj.metaData.metaId == "C-OA-CATER-ARRANGEMENT-0001") {
        dsf.http.post('ctrl/official/getYsjdUserInfo', { id: busObj.value }).then(res => {
          if (res.data.code == 200) {
            vueData.$set(formData.main, "C-OA-CATER-ARRANGEMENT-0002", { value: res.data.data.jhsm})
            vueData.$set(formData.main, "C-OA-CATER-ARRANGEMENT-0003", { value: res.data.data.returntime})
          }
        })
      }
    })
  }
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
      if (formData.multinfos['230523214822p0Qbv8zlcw1wr14TbcR'].rows) {
        let length = formData.multinfos['230523214822p0Qbv8zlcw1wr14TbcR'].rows.length
        vueData.$set(formData.main, 'B0073', {value: length})
      }
      resolve()
    })
  }
  window.spJS = exportObj
})()
