// 委办局-外出考察
(function () {
    const exportObj = {}
    exportObj.saveFilter = function (formData, formStruct, vueData) {
      return new Promise(function (resolve, reject) {
        formData.main["B0001"].value = `${formData.main["A0025"].value}赴${formData.main["B0025"].value}的外出登记申请`
        resolve()
      })
    }

    exportObj.initHandle = function (formData, formStruct, vueData) {
      // 根据团组负责人职位带入表单“职务”中---bug1422
      vueData.$bus.on("selectUserBus", function (busObj) {
        if (busObj.metaData.metaId == "C-OUTMANAGE-0004") {
          let zhiw = busObj.selectArr[0].attrs.zhiw;
          vueData.$set(formData.main['C-OUTMANAGE-0011'], "value", zhiw)
        }
      })
    }
    window.spJS = exportObj
  })();
  