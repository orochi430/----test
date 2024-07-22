;(function () {
  const exportObj = {}
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
    //控制所有数据都打开签收公文单
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listId: "200826152235RRXgUKUzphKhqF4EWwx",
        method: 'sendBack',
        validateByList: 1,
        disableButtons: true,
      }
    })
  }
  exportObj.exchangeBackReason = function (listData, vueData) {
    if (listData.dataValue["C-R-RCV-0011.value"]) {
      if (listData.dataValue["C-R-RCV-0011.value"] == "-2") {
        dsf.layer.alert({
          title: "",
          message: listData.dataValue["C-R-RCV-0019.value"]
        })
      } else {
        dsf.http
          .post("/ctrl/remoteExchangeData/getSendBackDoc", {
            pk: listData.dataValue["A0001"]
          })
          .then(({ status, data }) => {
            // console.log(data, "0000");
            if (status == 200) {
              vueData.$router.push(
                `/commonForm/${data.data.backData.moduleId}/${data.data.backData.pk}?listId=200826152235RRXgUKUzphKhqF4EWwx&method=sendBack&validateByList=1&disableButtons=true`
              )
            }
          })
          .catch(e => {
            dsf.layer.toast(data.message)
          })
      }
    }
  }
  window.spListJS = exportObj
})()