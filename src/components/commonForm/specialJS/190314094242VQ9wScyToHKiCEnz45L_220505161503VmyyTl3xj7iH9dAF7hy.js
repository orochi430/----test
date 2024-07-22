//意见代录表单特殊js   发送后事件，返回2级
const exportObj = {};
exportObj.sendAfter = function (formData, formStruct, vueData) {
 dsf.http.post("fn/swBachReceipt/udate", {
    pk: vueData.pk,
    edate: formData.main["S-PROCESS-0019"].value
  }).then((data) => {
    let result = data.data
    if ("success" == result.type) {
      vueData.backSucces(1)
    }
  })
}
export default exportObj;
