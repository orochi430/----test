// 一体化 派车
;(function () {
  const exportObj = {}
  let currentSubformIndex = 0
  let currentMetaId = ""
  exportObj.initHandle = function (formData, formStruct, vueData) {
    window["C-OA-TRAVEL-ITINERARY-0002_beforeOpenCode"] = function (formData, url, vueObj) {
      currentSubformIndex = vueObj.subFormIndex
      currentMetaId = "C-OA-TRAVEL-ITINERARY-0002"
      let carStartTime = formData.main["C-OA-TRANSPORT-SINGLE-0004"].value //开始时间
      let carEndTime = formData.main["B0013"].value //结束时间
      //子表ID
      let rows = formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows
      let selectedCarIds = "" //子表选择的车辆信息
      for (let i = 0; i < rows.length; i++) {
        if (rows[i]["C-OA-TRAVEL-ITINERARY-0002"].value != "") {
          selectedCarIds += rows[i]["C-OA-TRAVEL-ITINERARY-0002"].value + ","
        }
      }
      vueData.refreshListKey = Math.random()
      vueData.commonPopParam = {
        moduleId: "230324154321VtBQRWHz63eIDQhHLlX",
        listId: "230330133949rMnPu49lPnyHYUfwKte",
        params: {
          carStartTime: carStartTime,
          carEndTime: carEndTime,
          selectedCarIds: selectedCarIds
        }
      }
      vueData.commonPop = true
      return ""
    }
    window["C-OA-TRAVEL-ITINERARY-0003_beforeOpenCode"] = function (formData, url, vueObj) {
      currentSubformIndex = vueObj.subFormIndex
      currentMetaId = "C-OA-TRAVEL-ITINERARY-0003"
      vueData.refreshListKey = Math.random()
      let carStartTime = formData.main["C-OA-TRANSPORT-SINGLE-0004"].value //开始时间
      let carEndTime = formData.main["B0013"].value //结束时间
      //子表ID
      let rows = formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows
      let selectedDriverIds = "" //子表选择的车辆信息
      for (let i = 0; i < rows.length; i++) {
        if (rows[i]["C-OA-TRAVEL-ITINERARY-0003"].value != "") {
          selectedDriverIds += rows[i]["C-OA-TRAVEL-ITINERARY-0003"].value + ","
        }
      }
      vueData.commonPopParam = {
        moduleId: "230323174734Bx71mWoldQxpvRhTXxs",
        listId: "2303311544433Ag4SnUIf0fQsVpM3rJ",
        params: {
          carStartTime: carStartTime,
          carEndTime: carEndTime,
          selectedDriverIds: selectedDriverIds
        }
      }
      vueData.commonPop = true
      return ""
    }
  }
  exportObj.choose = function (checkItems, vueData) {
    console.log("choose", checkItems)
    vueData.commonPop = false
    if (currentMetaId == "C-OA-TRAVEL-ITINERARY-0003") {
      let value = checkItems[0].dataValue["A0001"]
      let text = checkItems[0].dataValue["C-OA-DRIVER-INFORMATION-0001"]
      vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0003", { value: value, text: text })
      vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0004", { value: '' })
    } else if (currentMetaId == "C-OA-TRAVEL-ITINERARY-0002") {
      // 车辆号码
      let clhm = checkItems[0].dataValue["CLXX.A0001"]
      let clhmName = checkItems[0].dataValue["CLXX.C-OA-VEHICLE-INFORMATION-0001"]
      vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0002", { value: clhm, text: clhmName })
      // 车辆类型
      let cltype = checkItems[0].dataValue["23041917162811RS88SVaNIPAQbOptR"]
      let cltypeName = checkItems[0].dataValue["CLXX.C-OA-VEHICLE-INFORMATION-0006"]
      vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0005", { value: cltype, text: cltypeName })
      // 用车成本
      let yccb = checkItems[0].dataValue["CLXX.C-OA-VEHICLE-INFORMATION-0014"]
      vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0007", { value: yccb })

      let dqlc = checkItems[0].dataValue["CLXX.C-OA-VEHICLE-INFORMATION-0013"]
      vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0010", { value: dqlc })
      // 司机
      let sjid = checkItems[0].dataValue["230419172241CwXxxU5ZiKLb2c9WzDr"]
      if (sjid) {
        dsf.http.post("ctrl/drvierInfoRmatio/checkDriverStatus", { sjid: sjid }).then(res => {
          let lxfs = checkItems[0].dataValue["CLXX.C-OA-VEHICLE-INFORMATION-0023"]
          if ("success" == res.data.type) {
            //为待命状态带出司机信息，'
            let sjname = checkItems[0].dataValue["CLXX.C-OA-VEHICLE-INFORMATION-0022"]
            vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0003", { value: sjid, text: sjname })
            vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0004", { value: lxfs })
          } else {
            //不是待命状态，给出提醒。+
            dsf.layer.toast("该车司机为出车状态，请重新指派司机。")
            vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0003", { value: "", text: "" })
            vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0004", { value: "" })
          }
        })
      } else {
        vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0003", { value: "", text: "" })
        vueData.$set(vueData.formData.multinfos["230329101010OdUqewSZKluxZYaTDIL"].rows[currentSubformIndex], "C-OA-TRAVEL-ITINERARY-0004", { value: "" })
      }
    }
  }
  window.spJS = exportObj
})()
