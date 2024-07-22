// 应用商城 申请应用
const exportObj = {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  if (vueData.$route.query.appid) {
    vueData.$set(formData.main, "S-APP-APPLY-0010", { value: vueData.$route.query.appid })
    vueData.$set(formData.main, "S-APP-APPLY-0009", { value: vueData.$route.query.appName })
  }
}
export default exportObj
