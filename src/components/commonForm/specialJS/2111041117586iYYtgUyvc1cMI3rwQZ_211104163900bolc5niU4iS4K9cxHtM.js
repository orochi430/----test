// 公司OA系统UI设计任务申请表单
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(vueData.formData)
  // 实际开始时间C-UIDESING-0009
  // 实际结束时间C-UIDESING-0010
  // 工作量（小时）C-UIDESING-0011

  function filterTime(time) {
    var str = time.replace(/-/g, "/")
    return Date.parse(str)
  }

  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-UIDESING-0009" || busObj.metaData.metaId == "C-UIDESING-0010") {
      if (vueData.formData.main["C-UIDESING-0009"].value && vueData.formData.main["C-UIDESING-0010"].value) {
        let start = filterTime(formData.main["C-UIDESING-0009"].value)
        let end = filterTime(formData.main["C-UIDESING-0010"].value)
        let utc = end - start;
        let dayTimes = Math.floor(utc / ( 60 * 60 * 1000))
        if (dayTimes > 0) {
          vueData.$set(vueData.formData.main, "C-UIDESING-0011", {
            value: dayTimes
          })
        } else {
          vueData.$set(vueData.formData.main, "C-UIDESING-0011", {
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
    let start = filterTime(formData.main["C-UIDESING-0009"].value)
    let end = filterTime(formData.main["C-UIDESING-0010"].value)
    if (start > end) {
      reject("实际结束时间不能早于实际开始时间")
    } else {
      resolve()
    }
  })
}
export default exportObj;
