// 驻京办 迎送接待
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("checkVal", function (busObj) {
      // 选择人员带出职务
      if (busObj.metaData.metaId == 'B0072') {
        dsf.http.post('ctrl/receptionGuest/duties', { id: busObj.value }).then(res => {
          if (res.data.code == 200) {
            vueData.$set(formData.multinfos['230524041220Egfd11KMDKngalPeCZ9'].rows[busObj.subFormIndex], 'C-ERP-WS-INFO-0004', {value: res.data.message})
          }
        })
      }
    })
  }

  window.spJS = exportObj
})()
