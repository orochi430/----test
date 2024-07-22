// 应用商城 评价审核
const exportObj = {}
exportObj.pass = function (itemValue, VueData) {
  dsf.http
    .post("fn/application/store/changeEvaluateState", {
      evaIds: itemValue.dataValue["EVALUATE.S-BASE-0001"],
      status: "9"
    })
    .then(res => {
      if (res.data.code == 200) {
        dsf.layer.toast("审核通过")
        VueData.onRefresh()
      }
    })
}

exportObj.fail = function (itemValue, VueData) {
  dsf.http
    .post("fn/application/store/changeEvaluateState", {
      evaIds: itemValue.dataValue["EVALUATE.S-BASE-0001"],
      status: "2"
    })
    .then(res => {
      if (res.data.code == 200) {
        dsf.layer.toast("审核不通过")
        VueData.onRefresh()
      }
    })
}
export default exportObj
