// 公司OA系统课程制作申请单表单
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(vueData.formData)
//   实际开始时间C-COUREMAKING-0010
// 实际结束时间C-COUREMAKING-0011
// 时长（天）C-COUREMAKING-0012

  function filterTime(time) {
    var str = time.replace(/-/g, "/")
    return Date.parse(str)
  }

  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-COUREMAKING-0010" || busObj.metaData.metaId == "C-COUREMAKING-0011") {
      if (vueData.formData.main["C-COUREMAKING-0010"].value && vueData.formData.main["C-COUREMAKING-0011"].value) {
        let start = filterTime(formData.main["C-COUREMAKING-0010"].value)
        let end = filterTime(formData.main["C-COUREMAKING-0011"].value)
        let utc = end - start;
        let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1
        if (dayTimes > 0) {
          vueData.$set(vueData.formData.main, "C-COUREMAKING-0012", {
            value: dayTimes
          })
        } else {
          vueData.$set(vueData.formData.main, "C-COUREMAKING-0012", {
            value: "0"
          })
          dsf.layer.toast("实际结束时间不能早于实际开始时间")
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
    let start = filterTime(formData.main["C-COUREMAKING-0010"].value)
    let end = filterTime(formData.main["C-COUREMAKING-0011"].value)
    if (start > end) {
      reject("实际结束时间不能早于实际开始时间")
    } else {
      resolve()
    }
  })
}
export default exportObj;
