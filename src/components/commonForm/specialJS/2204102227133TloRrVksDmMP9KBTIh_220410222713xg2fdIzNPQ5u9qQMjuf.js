/**
 * 办公厅疫情防控
 */
import dsf from "../../../common";
const exportObj = {};

function filterTime(time) {
  var str = time.replace(/-/g, "/")
  return str
}


function Calc(formData, formStruct, vueData) { //计算闭环类型

  /*
  0: {remark: "", id: "220318104835lvDM8kSiuvoIAmk26Pq", text: "居家办公", varClass: "layui-col-md3",…}
1: {remark: "", id: "220318104846I8qoNTTgItis1jG87Pz", text: "200号人民大厦", varClass: "layui-col-md4",…}
2: {remark: "", id: "220318104858vOLWrp32LzGsOaaAYGN", text: "CDC防控指挥部", varClass: "layui-col-md4",…}
3: {remark: "", id: "220321000504P6B7P1T0BHdrBMaSfKR", text: "市委督导组（各区）", varClass: "layui-col-md4",…}
4: {remark: "", id: "220411095547ix7LVaONPM7h7y0alA2", text: "浦东新区督导组", varClass: "layui-col-md3",…}
5: {remark: "", id: "220411095554D47OuyMg4rArjgIDN6U", text: "西郊驻地", varClass: "layui-col-md3",…}
6: {remark: "", id: "220411095600Ji5rUbPTljsuS9eoMzY", text: "世博会展方舱", varClass: "layui-col-md3",…}
7: {remark: "", id: "220411095608BodxG2ll7nOo2Yf9W6r", text: "其他", varClass: "layui-col-md3", value: "8"}
  */

  /*A组为出闭环申请*/
  let a1 = formData.main["C-EPIDEMIC_PREVENT-0011"].value == "2" ||
    formData.main["C-EPIDEMIC_PREVENT-0011"].value == "3" ||
    formData.main["C-EPIDEMIC_PREVENT-0011"].value == "6"||
    formData.main["C-EPIDEMIC_PREVENT-0011"].value == "9"
  let a2 = formData.main["C-EPIDEMIC_PREVENT-0012"].value == "1" ||
    formData.main["C-EPIDEMIC_PREVENT-0012"].value == "4" ||
    formData.main["C-EPIDEMIC_PREVENT-0012"].value == "5" ||
    formData.main["C-EPIDEMIC_PREVENT-0012"].value == "7"||
    formData.main["C-EPIDEMIC_PREVENT-0012"].value == "8"
  /*B组为入闭环申请*/
  let b1 = formData.main["C-EPIDEMIC_PREVENT-0012"].value == "2" ||
    formData.main["C-EPIDEMIC_PREVENT-0012"].value == "3" ||
    formData.main["C-EPIDEMIC_PREVENT-0012"].value == "6" ||
    formData.main["C-EPIDEMIC_PREVENT-0012"].value == "9"
  let b2 = formData.main["C-EPIDEMIC_PREVENT-0011"].value == "1" ||
    formData.main["C-EPIDEMIC_PREVENT-0011"].value == "4" ||
    formData.main["C-EPIDEMIC_PREVENT-0011"].value == "5" ||
    formData.main["C-EPIDEMIC_PREVENT-0011"].value == "7" ||
    formData.main["C-EPIDEMIC_PREVENT-0011"].value == "8"

  if (a1 && a2) {
    hideShowAndClearData(formData, formStruct, vueData, true)
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0025", {
      text: "出闭环申请",
      value: "2"
    })
    //出闭环隐藏上传核酸控件并清空
    formStruct.controls.find(item => item.controlId == "uctwv8b25t11P6aH").show = false
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0032", {
      value: ""
    })
    vueData.notVaildateMetas.push("C-EPIDEMIC_PREVENT-0032")
  } else if (b1 && b2) {
    hideShowAndClearData(formData, formStruct, vueData, true)
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0025", {
      text: "入闭环申请",
      value: "1"
    })
  }else{
    hideShowAndClearData(formData, formStruct, vueData)
  }

  console.log("计算闭环类型", JSON.stringify(formData.main["C-EPIDEMIC_PREVENT-0025"]))
}

function hideShowAndClearData(formData, formStruct, vueData, show = false) { //隐藏并清空出入闭环申请内容
  let dataMetaId = ["C-EPIDEMIC_PREVENT-0025", "C-EPIDEMIC_PREVENT-0028", "C-EPIDEMIC_PREVENT-0032", "C-EPIDEMIC_PREVENT-0017"]
  if (!show) {
    formStruct.controls.find(item => item.controlId == "ugXRAyh1etUkvirh").show = false
    formStruct.controls.find(item => item.controlId == "TIOY8Nd2HnmiSefN").show = false
    formStruct.controls.find(item => item.controlId == "pqJK2bsszegO64Kh").show = false
    formStruct.controls.find(item => item.controlId == "uctwv8b25t11P6aH").show = false
    formStruct.controls.find(item => item.controlId == "BAxMhIwAmI7H4CjT").show = false
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0025", {
      text: "",
      value: ""
    })
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0028", {
      value: ""
    })
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0032", {
      value: ""
    })
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0017", {
      text: "",
      value: ""
    })

    dataMetaId.forEach(element => {
      vueData.notVaildateMetas.push(element)
    });

  } else {
    formStruct.controls.find(item => item.controlId == "ugXRAyh1etUkvirh").show = true
    formStruct.controls.find(item => item.controlId == "TIOY8Nd2HnmiSefN").show = true
    formStruct.controls.find(item => item.controlId == "pqJK2bsszegO64Kh").show = true
    formStruct.controls.find(item => item.controlId == "uctwv8b25t11P6aH").show = true
    formStruct.controls.find(item => item.controlId == "BAxMhIwAmI7H4CjT").show = true

    dataMetaId.forEach(element => {
      if (vueData.notVaildateMetas.indexOf(element) > -1) { //大于-1才删除
        vueData.notVaildateMetas.splice(vueData.notVaildateMetas.indexOf(element), 1)
      }
    });
  }
}

let enumData = new Map()

function caclWorkDay(formData, formStruct, vueData) {
  if (formData.main["C-EPIDEMIC_PREVENT-0022"].value == "1") {
    let dataArr = []
    formStruct.controls.find(item => item.controlId == "49IU3P3BFSrZQcio").enumData.forEach(element => {
      if (element.text != "居家办公") {
        dataArr.push(element);
      }
    });
    enumData["非居家办公"] = dataArr
  } else if (formData.main["C-EPIDEMIC_PREVENT-0022"].value == "4") {
    let dataArr = []
    formStruct.controls.find(item => item.controlId == "49IU3P3BFSrZQcio").enumData.forEach(element => {
      if (element.text == "居家办公") {
        dataArr.push(element);
      }
    });
    enumData["居家办公"] = dataArr
  }
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  formStruct.controls.find(item => item.controlId == "QI0CB66kYe9Rr1i4").show = false
  if (formData.main["C-EPIDEMIC_PREVENT-0022"].value.length) {
    if (formData.main["C-EPIDEMIC_PREVENT-0022"].value == "2" || formData.main["C-EPIDEMIC_PREVENT-0022"].value == "3") {
      formStruct.controls.find(item => item.controlId == "QI0CB66kYe9Rr1i4").show = false
    } else {
      formStruct.controls.find(item => item.controlId == "QI0CB66kYe9Rr1i4").show = true
    }
  }

  Calc(formData, formStruct, vueData)
  caclWorkDay(formData, formStruct, vueData)

  vueData.$bus.on("checkVal", function (busObj) {

    if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0011" || busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0012") {
      Calc(formData, formStruct, vueData)
    }

    if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0013") { //小区是否有阳
      let tempdata = null
      if (busObj.value == "1") {
        tempdata = {
          text: "7天内有阳",
          value: "1"
        }
      } else if (busObj.value == "2") {
        tempdata = {
          text: "14天内有阳",
          value: "2"
        }
      } else if (busObj.value == "3") {
        tempdata = {
          text: "14天内无阳",
          value: "3"
        }
      }
      vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0021", tempdata)
    }


    if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0022") { //管理类型
      if (busObj.value == "3" || busObj.value == "2") {
        formStruct.controls.find(item => item.controlId == "QI0CB66kYe9Rr1i4").show = false
        hideShowAndClearData(formData, formStruct, vueData)
      } else {
        formStruct.controls.find(item => item.controlId == "QI0CB66kYe9Rr1i4").show = true
      }
      caclWorkDay(formData, formStruct, vueData)

    }
  })

  // 当日工作状态下拉显示时触发赋值
  vueData.$bus.on("showCheckBox", function (vueObj) {
    console.log(vueObj)
    if (vueObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0011") {
      if (formData.main["C-EPIDEMIC_PREVENT-0022"].value == "1") {
        vueObj.controlData.columnsValue.columns = enumData["非居家办公"];
        vueObj.currentColumns = enumData["非居家办公"];
      } else if (formData.main["C-EPIDEMIC_PREVENT-0022"].value == "4") {
        vueObj.controlData.columnsValue.columns = enumData["居家办公"];
        vueObj.currentColumns = enumData["居家办公"];
      }
    }
  })

  vueData.$bus.on("inputRadio", function (busObj) {

    // if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0021") { //小区是否有阳
    //   let tempdata = null
    //   if (busObj.value == "1") {
    //     tempdata = {
    //       text: "封控区",
    //       value: "1"
    //     }
    //   } else if (busObj.value == "2") {
    //     tempdata = {
    //       text: "管控区",
    //       value: "2"
    //     }
    //   } else if (busObj.value == "3") {
    //     tempdata = {
    //       text: "防范区",
    //       value: "3"
    //     }
    //   }
    //   vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0013", tempdata)
    // }
  })

  // vueData.$bus.on("selectDateTime", function (busObj) {
  //   if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0015") { //管控时间
  //     Calc_0015(formData, formStruct, vueData)
  //   }
  //   if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0001") { //预计解封时间
  //     Calc_B005(formData, formStruct, vueData)
  //   }
  // })


}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {

      // let C0013_Value = formData.main["C-EPIDEMIC_PREVENT-0013"].value //隔离类型
      // let C0013_Text = formData.main["C-EPIDEMIC_PREVENT-0013"].text
      // if (C0013_Value == "5") {
      //   vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0017", {
      //     value: formData.main["C-EPIDEMIC_PREVENT-0021"].value,
      //     text: formData.main["C-EPIDEMIC_PREVENT-0021"].text
      //   })
      // } else {
      //   vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0017", {
      //     value: C0013_Value,
      //     text: C0013_Text
      //   })
      // }

      // let C0001 = formData.main["C-EPIDEMIC_PREVENT-0001"].value //预计解封时间
      // let C00016 = formData.main["C-EPIDEMIC_PREVENT-0016"].value //计划解封时间
      // let C0001_Date = new Date(filterTime(dsf.date.format(new Date(filterTime(C0001)), "yyyy-mm-dd")))
      // let C0016_Date = new Date(filterTime(dsf.date.format(new Date(filterTime(C00016)), "yyyy-mm-dd")))

      // if (C00016) {
      //   vueData.$set(vueData.formData.main, "B0005", { //有计划解封时间直接给最终解封时间赋值
      //     value: C00016
      //   })

      //   // let temp = dsf.date.addDate(new Date(filterTime(C00016)), 1) //如果有计划解封时间就直接给上班时间+1天处理
      //   // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
      //   //   value: dsf.date.format(temp, "yyyy-mm-dd hh:ii:00")
      //   // })
      // } else if (C0001) {
      //   // let temp = dsf.date.addDate(new Date(filterTime(C0001)), 1) //如果有预计解封时间就直接给上班时间+1天处理
      //   // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
      //   //   value: dsf.date.format(temp, "yyyy-mm-dd hh:ii:00")
      //   // })
      // } else {
      //   // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
      //   //   value: ""
      //   // })
      // }

      // if (formData.main["C-EPIDEMIC_PREVENT-0012"].value == "1") {
      //   let temp = dsf.date.addDate(new Date(), 1) //如果选择明天去上班则直接给上班时间+1天处理
      //   vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
      //     value: dsf.date.format(temp, "yyyy-mm-dd hh:ii:00")
      //   })
      // } else {
      //   vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
      //     value: ""
      //   })
      // }

      // let C0006 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["C-EPIDEMIC_PREVENT-0006"].value)), "yyyy-mm-dd"))) //核酸时间
      // let C0009 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["C-EPIDEMIC_PREVENT-0009"].value)), "yyyy-mm-dd"))) //上班时间
      // let diffDays = dsf.date.diffDays(C0006, C0009)

      // let C00015 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["C-EPIDEMIC_PREVENT-0015"].value)), "yyyy-mm-dd"))) //管控时间
      // let B0005 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["B0005"].value)), "yyyy-mm-dd"))) //解封时间
      let today = dsf.date.format(new Date(), "yyyy-mm-dd")
      let B0013 = dsf.date.format(new Date(filterTime(formData.main["B0013"].value)), "yyyy-mm-dd") //上报时间

      if (B0013 != today) {
        reject("上报时间必须为当天")
      } else {
        vueData.$set(vueData.formData.main, "B0013", { //上报时间为当前时间
          value: dsf.date.format(new Date(), "yyyy-mm-dd hh:ii:00")
        })
        resolve()
      }
      // if (B0013 != today) {
      //   reject("上报时间必须为当天")
      //   // } else if (C0013_Value.length && C0013_Value != "1" && isNaN(diffDays) && formData.main["C-EPIDEMIC_PREVENT-0009"].value.length) {
      //   //   reject("请填写核酸检测时间")
      // } else if (C0013_Value != "1" && formData.main["C-EPIDEMIC_PREVENT-0011"].value == "1") {
      //   reject("隔离期间不允许选择办公场所上班")
      //   // } else if (C0013_Value == "9" && !isNaN(diffDays) && diffDays >= 2) {
      //   //   reject("核酸检测时间和上班时间必须48小时以内")
      //   // } else if (C0013_Value != "1" && C0013_Value != "9" && !isNaN(diffDays) && diffDays >= 7) {
      //   //   reject("核酸检测时间和上班时间必须小于7天")
      //   // } else if (C00015 <= C0009 && C0009 <= B0005) {
      //   //   reject("上班时间不能在管控时间范围内")
      //   // } else if (C0001.length && C00016.length && C0016_Date <= C0001_Date) {
      //   //   reject("计划解除时间必须大于预计解封时间")
      // } else
      //   resolve()
    } catch (error) {
      resolve()
    }
  })
}

exportObj.changUser = function (formData, formStruct, vueData) {
  vueData.$router.push({
    name: "bgtlogin",
    query: {
      changUser: 1
    }
  })
}

exportObj.GoList = function (formData, formStruct, vueData) {
  vueData.$eventBus.refresh(vueData, {
    text: 123
  });
  vueData.$router.push({
    name: "commonList",
    params: {
      listId: "220317182010dMuHAbBvsDpqMU6srLe",
      moduleId: "220317175747dleuT8ffDHmcbcz0aHg"
    },
    query: {
      title: "疫情防控信息上报"
    }
  })
}

export default exportObj;
