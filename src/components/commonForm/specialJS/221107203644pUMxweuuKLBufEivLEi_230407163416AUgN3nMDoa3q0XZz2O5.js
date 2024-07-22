// 用品领用 产品
const exportObj = {}
let goodsIds = []
exportObj.handle = function (formData, formStruct) {}
exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("subFormTreeSelect", function (data) {
    data.selectArr.forEach((item, index) => {
      // 判重
      if (formData.multinfos["221108103007d7rD3D4x1CAoIt2YmCb"].rows.find(row => row["B0003"].value == item.attrs.wh && row.action != "Deleted")) {
        console.log("有重复")
        return
      }
      // // 新增子表
      vueData.$refs.formTab[0].$refs["221108103007d7rD3D4x1CAoIt2YmCb"][0].$refs.subform.addCard(false).then(newData => {
        //物品编号
        vueData.$set(newData, "B0003", {
          value: item.attrs.wh
        })
        //品名
        vueData.$set(newData, "C-OFFICESUPPLIES-RECEIVE-GOODS-0001", {
          value: item.id,
          text: item.name
        })
        //类别
        vueData.$set(newData, "C-OFFICESUPPLIES-RECEIVE-GOODS-0002", {
          value: item.attrs.category,
          text: item.attrs.categoryText
        })
        //单位
        vueData.$set(newData, "C-OFFICESUPPLIES-RECEIVE-GOODS-0003", {
          value: item.attrs.goodsUnit
        })
        //单价
        vueData.$set(newData, "C-OFFICESUPPLIES-RECEIVE-GOODS-0005", {
          value: item.attrs.unitPrice
        })
        //申请数量
        vueData.$set(newData, "C-OFFICESUPPLIES-RECEIVE-GOODS-0007", {
          value: 0
        })
        //当前库存
        vueData.$set(newData, "C-OFFICESUPPLIES-RECEIVE-GOODS-0006", {
          value: item.attrs.stockCount
        })
      })
    })
  })
  vueData.$bus.on("blurBus", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-OFFICESUPPLIES-RECEIVE-GOODS-0007" && busObj.subFormId == "221108103007d7rD3D4x1CAoIt2YmCb") {
      let subformObj = formData.multinfos["221108103007d7rD3D4x1CAoIt2YmCb"].rows[busObj.subFormIndex]
      // if (busObj.value > subformObj["C-OFFICESUPPLIES-RECEIVE-GOODS-0006"].value) {
      //   dsf.layer.toast("申请数量已超出库存数量")
      //   vueData.$set(subformObj, "C-OFFICESUPPLIES-RECEIVE-GOODS-0007", {
      //     value: 0
      //   })
      //   return
      // }
      let unit = subformObj["C-OFFICESUPPLIES-RECEIVE-GOODS-0005"].value // 单价
      let total = unit * busObj.value
      vueData.$set(subformObj, "C-OFFICESUPPLIES-RECEIVE-GOODS-0008", {
        value: total.toFixed(2)
      })
    }
  })
}
exportObj.custom1 = function (formData, formStruct, vueData) {
  if (formData.main["A0009"].value != 0) {
    vueData.btnAction("send")
  } else {
    let flag = true
    let errgoods = []
    goodsIds = []
    if (formData.multinfos["221108103007d7rD3D4x1CAoIt2YmCb"].rows.filter(row => row.action != "Deleted").length == 0) {
      dsf.layer.toast("请选择领用物品")
      return
    }
    formData.multinfos["221108103007d7rD3D4x1CAoIt2YmCb"].rows.forEach(row => {
      if (row.action != "Deleted") {
        if (row["C-OFFICESUPPLIES-RECEIVE-GOODS-0007"].value == 0) {
          flag = false
          errgoods.push(row["C-OFFICESUPPLIES-RECEIVE-GOODS-0001"].text)
        } else {
          goodsIds.push(row["C-OFFICESUPPLIES-RECEIVE-GOODS-0001"].value)
        }
      }
    })
    if (!flag) {
      dsf.layer.toast(errgoods.join(",") + "申请数量需要大于0")
    } else {
      checkCurrentGoodsInfo(formData, formStruct, vueData)
        .then(() => {
          vueData.btnAction("send")
        })
        .catch(err => {
          dsf.layer.toast(err)
        })
    }
  }
}
function checkCurrentGoodsInfo(formData, formStruct, vueData) {
  // 校验当前商品信息--实时单价、库存、商品是否可用
  return new Promise((resolve, reject) => {
    let flag = true
    let failureGoodsArr = [] //失效品名
    let isChangeRemind = false //是否更新提醒 false :不提醒；true: 提醒
    dsf.http.post("ctrl/officeSupplies/getCurrentGoodsInfo", { goodsIds: goodsIds.join(",") }).then(res => {
      let goods = res.data.data
      formData.multinfos["221108103007d7rD3D4x1CAoIt2YmCb"].rows.forEach(row => {
        if (row.action != "Deleted") {
          let goodsInfo = goods[row["C-OFFICESUPPLIES-RECEIVE-GOODS-0001"].value]
          if (!goodsInfo || !goodsInfo["isValid"] || goodsInfo["isValid"] == "-1") {
            flag = false
            failureGoodsArr.push(goodsInfo["bt"])
            return
          }
          let unitPrice = row["C-OFFICESUPPLIES-RECEIVE-GOODS-0005"].value //单价
          if (parseFloat(unitPrice) != parseFloat(goodsInfo["unitPrice"])) {
            flag = false
            isChangeRemind = true
            vueData.$set(row, "C-OFFICESUPPLIES-RECEIVE-GOODS-0005", { value: goodsInfo["unitPrice"] }) //单价
          }

          let stockCount = row["C-OFFICESUPPLIES-RECEIVE-GOODS-0006"].value //库存
          if (parseInt(stockCount) != parseInt(goodsInfo["stockCount"])) {
            flag = false
            isChangeRemind = true
            vueData.$set(row, "C-OFFICESUPPLIES-RECEIVE-GOODS-0006", { value: goodsInfo["stockCount"] }) //库存
          }
        }
      })
      if (failureGoodsArr.length > 0) {
        reject(failureGoodsArr.join("、") + "领用受限，请领用其他物品")
      } else if (isChangeRemind) {
        reject("单价或库存数量与实际不一致，请重新提交")
      } else {
        resolve()
      }
    })
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    let flag = true
    let errgoods = []
    dsf.http.post("ctrl/officeSupplies/getNegativeNumberConfig").then(res => {
      if (res.data.type == "success") {
        if (res.data.data == 0) {
          formData.multinfos["221108103007d7rD3D4x1CAoIt2YmCb"].rows.forEach(row => {
            let kc = row["C-OFFICESUPPLIES-RECEIVE-GOODS-0006"].value
            let ly = row["C-OFFICESUPPLIES-RECEIVE-GOODS-0007"].value
            let pm = row["C-OFFICESUPPLIES-RECEIVE-GOODS-0001"].text
            if (parseInt(ly) > parseInt(kc)) {
              errgoods.push(pm)
              flag = false
            }
          })
        }
      }
      if (!flag) {
        reject(errgoods.join(",") + "的领用数量已超出库存数量")
      } else {
        resolve()
      }
    })
  })
}
exportObj.saveAfterAsync = function (formData, formStruct, vueData) {

}


export default exportObj
