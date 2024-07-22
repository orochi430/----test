// 公司OA系统项目验收表单
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(vueData.formData)
  // 项目启动时间C-XMYS-007
  // 项目验收时间C-XMYS-008
  // 时长（天）C-XMYS-009

  function filterTime(time) {
    var str = time.replace(/-/g, "/")
    return Date.parse(str)
  }

  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-XMYS-007" || busObj.metaData.metaId == "C-XMYS-008") {
      if (vueData.formData.main["C-XMYS-007"].value && vueData.formData.main["C-XMYS-008"].value) {
        let start = filterTime(formData.main["C-XMYS-007"].value)
        let end = filterTime(formData.main["C-XMYS-008"].value)
        let utc = end - start;
        let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1
        if (dayTimes > 0) {
          vueData.$set(vueData.formData.main, "C-XMYS-009", {
            value: dayTimes
          })
        } else {
          vueData.$set(vueData.formData.main, "C-XMYS-009", {
            value: "0"
          })
          dsf.layer.toast("项目验收时间不能早于项目启动时间")
        }

      }
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  function filterTime(time) {
    var str = time.replace(/-/g, "/")
    return Date.parse(str)
  }
  return new Promise(function (resolve, reject) {
    let start = filterTime(formData.main["C-XMYS-007"].value)
    let end = filterTime(formData.main["C-XMYS-008"].value)
    if (start > end) {
      reject("项目验收时间不能早于项目启动时间")
    } else {
      resolve()
    }
  })
}
export default exportObj;
