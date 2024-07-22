// 公司OA系统项目上线试运行表单
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(vueData.formData)
  // 试运行开始时间C-XMSXSYX-004
  // 试运行结束时间C-XMSXSYX-005
  // 时长（天）C-XMSXSYX-006

  function filterTime(time) {
    var str = time.replace(/-/g, "/")
    return Date.parse(str)
  }

  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-XMSXSYX-004" || busObj.metaData.metaId == "C-XMSXSYX-005") {
      if (vueData.formData.main["C-XMSXSYX-004"].value && vueData.formData.main["C-XMSXSYX-005"].value) {
        let start = filterTime(formData.main["C-XMSXSYX-004"].value)
        let end = filterTime(formData.main["C-XMSXSYX-005"].value)
        let utc = end - start;
        let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1
        if (dayTimes > 0) {
          vueData.$set(vueData.formData.main, "C-XMSXSYX-006", {
            value: dayTimes
          })
        } else {
          vueData.$set(vueData.formData.main, "C-XMSXSYX-006", {
            value: "0"
          })
          dsf.layer.toast("试运行结束时间不能早于试运行开始时间")
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
    let start = filterTime(formData.main["C-XMSXSYX-004"].value)
    let end = filterTime(formData.main["C-XMSXSYX-005"].value)
    if (start > end) {
      reject("试运行结束时间不能早于试运行开始时间")
    } else {
      resolve()
    }
  })
}
export default exportObj;
