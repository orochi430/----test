// 驻京办 驾驶员维护
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectUserBus", function (busObj) {
      console.log(busObj)
      if (busObj.metaData.metaId == "C-OA-DRIVER-INFORMATION-0001") {
        dsf.http.post('fn/official/getSelectUserInfo', { id: busObj.value }).then(res => {
          if (res.data.code == 200) {
            vueData.$set(formData.main, "C-OA-DRIVER-INFORMATION-0014", { value: res.data.data.pinyinInitial})
            vueData.$set(formData.main, "C-OA-DRIVER-INFORMATION-0003", { value: res.data.data.sex, text: res.data.data.sexText})
            vueData.$set(formData.main, "B0005", { value: res.data.data.birthday})
            vueData.$set(formData.main, "C-OA-DRIVER-INFORMATION-0015", { value: res.data.data.homeAdd})
            vueData.$set(formData.main, "B0012", { value: res.data.data.mobile})
          }
        })
      }
    })
  }

  window.spJS = exportObj
})()
