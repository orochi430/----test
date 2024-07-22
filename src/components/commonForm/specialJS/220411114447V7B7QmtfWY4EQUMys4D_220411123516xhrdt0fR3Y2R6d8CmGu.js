/**
 * 办公厅疫情防控  出闭环申报表单
 */
import dsf from "../../../common";
const exportObj = {};

function filterTime(time) {
  var str = time.replace(/-/g, "/")
  return str
}

exportObj.initHandle = function (formData, formStruct, vueData) {

}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {
      // let today = dsf.date.format(new Date(), "yyyy-mm-dd")
      // let B0013 = dsf.date.format(new Date(filterTime(formData.main["B0013"].value)), "yyyy-mm-dd") //上报时间

      // if (B0013 != today) {
      //   reject("上报时间必须为当天")
      // } else {
      //   vueData.$set(vueData.formData.main, "B0013", { //上报时间为当前时间
      //     value: dsf.date.format(new Date(), "yyyy-mm-dd hh:ii:00")
      //   })
      //   resolve()
      // }
      resolve()

    } catch (error) {
      resolve()
    }
  })
}

export default exportObj;
