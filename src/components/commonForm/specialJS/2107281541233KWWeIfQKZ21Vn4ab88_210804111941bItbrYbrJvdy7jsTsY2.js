// 公司OA系统项目技术支持申请表单
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}

function filterTime(time) {
  var str = time.replace(/-/g, "/")
  return Date.parse(str)
}

let delData = []
exportObj.initHandle = function (formData, formStruct, vueData) {
  var nodeId = formStruct.parameters["nodeId"];
  if (nodeId == 'SqiqArAJBxTC7bI') {
    dsf.http.post("fn/workhour/getSetting").then((res) => {
      let result = res.data
      if (result && result.data) {
        vueData.formData.multinfos["220124104225OaDatbjshhgn5oaS1wl"].rows.forEach(element => {
          let uid = element["C-ERP-DETAILS-0001"].value
          if (uid && uid.indexOf(result.data.userId) < 0) {
            delData.push(element)
          }
        });
        delData = delData.reverse() //从最后一条开始删除操作   不然会影响数组下标
        delData.forEach(element => {
          let idx = vueData.formData.multinfos["220124104225OaDatbjshhgn5oaS1wl"].rows.indexOf(element)
          vueData.formData.multinfos["220124104225OaDatbjshhgn5oaS1wl"].rows.splice(idx, 1)
        });
      }
    })
  }

  // 实际开始时间C-XMGL-XMJSZCSQ-011
  // 实际结束时间C-XMGL-XMJSZCSQ-012
  // 工作量（天）C-XMGL-XMJSZCSQ-013
  vueData.$bus.on("selectDateTime", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-XMGL-XMJSZCSQ-011" || busObj.metaData.metaId == "C-XMGL-XMJSZCSQ-012") {
      if (vueData.formData.main["C-XMGL-XMJSZCSQ-011"].value && vueData.formData.main["C-XMGL-XMJSZCSQ-012"].value) {
        let start = filterTime(formData.main["C-XMGL-XMJSZCSQ-011"].value)
        let end = filterTime(formData.main["C-XMGL-XMJSZCSQ-012"].value)
        let utc = end - start;
        let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1
        if (dayTimes > 0) {
          vueData.$set(vueData.formData.main, "C-XMGL-XMJSZCSQ-013", {
            value: dayTimes
          })
        } else {
          vueData.$set(vueData.formData.main, "C-XMGL-XMJSZCSQ-013", {
            value: "0"
          })
          dsf.layer.toast("实际结束时间不能早于实际开始时间")
        }

      }
    }
  })
}

function calcWork(formData, formStruct, vueData) {
  let mindate = "",
    maxdate = "",
    totalworktime = 0;
  //此处要用已剔除的数据和当前显示的数据进行统计
  let subData = [...delData, ...formData.multinfos["220124104225OaDatbjshhgn5oaS1wl"].rows]
  subData.forEach((item, index) => {
    if (item.action != "Deleted") {
      if (index == 0) {
        maxdate = mindate = item["B0013"].value
        totalworktime = Number(item["C-ERP-DETAILS-0003"].value)
      } else {
        if (maxdate == "") {
          maxdate = filterTime(item["B0013"].value)
        }
        if (mindate == "") {
          mindate = filterTime(item["B0013"].value)
        }
        let temp1 = filterTime(maxdate)
        let temp2 = filterTime(mindate)
        let temp3 = filterTime(item["B0013"].value)
        if (temp3 > temp1) {
          maxdate = item["B0013"].value
        }
        if (temp3 < temp2) {
          mindate = item["B0013"].value
        }
        totalworktime += Number(item["C-ERP-DETAILS-0003"].value)
      }
    }
  })
  vueData.$set(vueData.formData.main["C-XMGL-XMJSZCSQ-011"], "value", mindate)
  vueData.$set(vueData.formData.main["C-XMGL-XMJSZCSQ-012"], "value", maxdate)
  vueData.$set(vueData.formData.main["C-XMGL-XMJSZCSQ-013"], "value", totalworktime)
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  var nodeId = formStruct.parameters["nodeId"];
  if (nodeId == 'SqiqArAJBxTC7bI') {
    calcWork(formData, formStruct, vueData)
  }

  return new Promise(function (resolve, reject) {
    let start = filterTime(formData.main["C-XMGL-XMJSZCSQ-011"].value)
    let end = filterTime(formData.main["C-XMGL-XMJSZCSQ-012"].value)
    if (start > end) {
      reject("实际结束时间不能早于实际开始时间")
    } else {
      resolve()
    }
  })
}
export default exportObj;
