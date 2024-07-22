// 【中共徐州市委党校迁建工程智慧校园平台软件】-- 工作台-食材出库
// @fangpang 2022-07-15
const exportObj = {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  let subformData = formData.multinfos["220617163412maw90H1uViWcL4g8Hu5"].rows
  vueData.$bus.on("blurBus", function (busObj) {
    if(busObj.metaData.metaId == "C-QT-CUSTOM-0001"){
      if(parseInt(subformData[busObj.subFormIndex]["C-QT-CUSTOM-0005"].value) < busObj.value) {
        dsf.layer.toast("出库数量不能大于库存数量")
        subformData[busObj.subFormIndex]["C-QT-CUSTOM-0001"].value = ""
     }
    }
  });
}


exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    let subformData = formData.multinfos["220617163412maw90H1uViWcL4g8Hu5"].rows
    if(subformData.length == 0){
      reject("未选择数据")
    } else {
      resolve()
    }
  })
}

exportObj.saveAfter = function (vueData, formStruct, formData) {
  // let subformData = formData.multinfos["220617163412maw90H1uViWcL4g8Hu5"].rows
  // subformData.forEach((item) => {
  //   item["C-QT-CUSTOM-0005"].value = parseInt(item["C-QT-CUSTOM-0005"].value) - item["C-QT-CUSTOM-0001"].value
  // })
  dsf.http.post(`fn/goodsrk/updFoodInventory?id=${formData.main["A0001"].value}&module_id=${formData.main["A0004"].value}`).then(({data}) => {
    dsf.layer.toast(data.message)
    console.log(data.code);
  })
}
export default exportObj