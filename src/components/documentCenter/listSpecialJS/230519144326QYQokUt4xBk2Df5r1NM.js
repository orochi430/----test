// 应用商城 我的评价
const exportObj = {}
exportObj.delEvaluate = function (itemValue, VueData) {
  dsf.layer.confirm(
    {
      message: "是否确认删除",
      confirmButtonText: "确认"
    },
    () => {
      dsf.http
        .post("fn/application/store/evaluate/del", {
          evaId: itemValue.dataValue["EVALUATE.S-BASE-0001"]
        })
        .then(res => {
          if (res.data.code == 200) {
            dsf.layer.toast("删除成功")
            VueData.onRefresh()
          }
        })
    }
  )
}

export default exportObj
