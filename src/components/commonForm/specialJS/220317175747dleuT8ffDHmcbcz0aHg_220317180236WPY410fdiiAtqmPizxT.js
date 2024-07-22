/**
 * 发改委疫情防控
 */
const exportObj = {};

function filterTime(time) {
  var str = time.replace(/-/g, "/")
  return str
}

function Calc_0015(formData, formStruct, vueData) { //计算预计解封时间
  console.log("计算预计解封时间");
  if (!formData.main["C-EPIDEMIC_PREVENT-0013"].value.length || !formData.main["C-EPIDEMIC_PREVENT-0015"].value.length) {
    return
  }
  let tempAdd = 0
  let C0013 = formData.main["C-EPIDEMIC_PREVENT-0013"].value; //隔离类型
  if (C0013 == "1" || C0013 == "9" || C0013 == "10") { //未隔离和委内通知不计算时间
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0001", {
      value: ""
    })

    vueData.$set(vueData.formData.main, "B0005", {
      value: ""
    })
    return
  }
  switch (C0013) {
    case "2": //14天
    case "3": //14天
    case "4": //14天
    case "5": //14天
      tempAdd = 14
      break;
    case "8": //2天
      tempAdd = 2
      break;
    case "11": //14天
      tempAdd = 14
      break;
    case "12": //7天
      tempAdd = 7
      break;
    case "13": //7天
      tempAdd = 7
      break;
    case "14": //10天
      tempAdd = 10
      break;
    case "15": //2天
      tempAdd = 2
      break;
    // case "16": //12天
    //   tempAdd = 12
      break;
  }
  let temp = dsf.date.addDate(new Date(filterTime(formData.main["C-EPIDEMIC_PREVENT-0015"].value)), tempAdd)
  vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0001", {
    value: dsf.date.format(temp, "yyyy-mm-dd hh:ii:00")
  })

  Calc_B005(formData, formStruct, vueData)
}

function Calc_B005(formData, formStruct, vueData) { //计算解封时间
  console.log("计算解封时间");
  vueData.$set(vueData.formData.main, "B0005", {
    value: formData.main["C-EPIDEMIC_PREVENT-0001"].value
  })
  console.log("解封时间", formData.main["B0005"].value)
}

function Calc_C0022(formData, formStruct, vueData) { //计算管控类型
  console.log("计算管控类型");
  let tempdata = {}
  if (formData.main["C-EPIDEMIC_PREVENT-0021"].value == "6") {
    tempdata = {
      text: "次密接",
      value: "3"
    }
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", tempdata)
  } else if (formData.main["C-EPIDEMIC_PREVENT-0021"].value == "7") {
    tempdata = {
      text: "健康管理",
      value: "2"
    }
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", {
      text: "高危筛选",
      value: "5"
    })
  }

  console.log("隐藏管控类型：", JSON.stringify(formData.main["C-EPIDEMIC_PREVENT-0022"]))
  console.log("管控类型：", JSON.stringify(formData.main["C-EPIDEMIC_PREVENT-0023"]))
}


exportObj.initHandle = function (formData, formStruct, vueData) {
  //周末默认在家休息
  //   let today = dsf.date.getWeekDay(new Date())
  //   if (today == 5 || today == 7) {
  //     vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0011", {
  //       value: "3"
  //     })
  //     formStruct.controls.find(item => item.metaId == "C-EPIDEMIC_PREVENT-0011").privilege.editable = false
  //   }
  if (formData.main["C-EPIDEMIC_PREVENT-0013"].value == "5") {
    //formStruct.controls.find(item => item.metaId == "C-EPIDEMIC_PREVENT-0021").show = true
  } else {
    //formStruct.controls.find(item => item.metaId == "C-EPIDEMIC_PREVENT-0021").show = false
    vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0021", {
      value: ""
    })
  }

  vueData.$bus.on("inputRadio", function (busObj) {
    if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0021") { //封控类型
      Calc_C0022(formData, formStruct, vueData)
    }
  })

  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0013") { //隔离类型
      //formStruct.controls.find(item => item.metaId == "C-EPIDEMIC_PREVENT-0021").show = false
      vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0021", {
        value: ""
      })

      Calc_0015(formData, formStruct, vueData)
      let tempdata = {}
      switch (busObj.value) {
        case "2":
          tempdata = {
            text: "确诊",
            value: "7"
          }
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", tempdata)
          break;
        case "14":
          tempdata = {
            text: "密接",
            value: "4"
          }
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", tempdata)
          break;
        case "11":
        case "3":
        // tempdata = {
        //   text: "次密接",
        //   value: "3"
        // }
        // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
        // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", tempdata)
        // break;
        case "4":
          tempdata = {
            text: "健康管理",
            value: "2"
          }
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)

          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", {
            text: "高危筛选",
            value: "5"
          })
          break;
        case "5":
          formStruct.controls.find(item => item.metaId == "C-EPIDEMIC_PREVENT-0021").show = true
          Calc_C0022(formData, formStruct, vueData)
          break;
        case "8":
        case "9":
        case "10":
        case "12":
        case "13":
        case "15":
        case "16":
          tempdata = {
            text: "健康管理",
            value: "2"
          }
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", {
            text: "社区管理",
            value: "6"
          })
          break;
        case "20":
            tempdata = {
              text: "健康管理",
              value: "2"
            }
            vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
  
            vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", tempdata)
            break;
        default:
          tempdata = {
            text: "未隔离",
            value: "1"
          }
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0022", tempdata)
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0023", tempdata)

          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0015", {
            value: ""
          })
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0001", {
            value: ""
          })
          vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0016", {
            value: ""
          })
          break;
      }
      
      console.log("隐藏管控类型：", JSON.stringify(formData.main["C-EPIDEMIC_PREVENT-0022"]))
      console.log("管控类型：", JSON.stringify(formData.main["C-EPIDEMIC_PREVENT-0023"]))
    }
  })

  vueData.$bus.on("selectDateTime", function (busObj) {
    if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0015") { //管控时间
      Calc_0015(formData, formStruct, vueData)
    }
    if (busObj.metaData.metaId == "C-EPIDEMIC_PREVENT-0001") { //预计解封时间
      Calc_B005(formData, formStruct, vueData)
    }
  })


}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {

      let C0013_Value = formData.main["C-EPIDEMIC_PREVENT-0013"].value //隔离类型
      let C0013_Text = formData.main["C-EPIDEMIC_PREVENT-0013"].text
      if (C0013_Value == "5") {
        vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0017", {
          value: formData.main["C-EPIDEMIC_PREVENT-0021"].value,
          text: formData.main["C-EPIDEMIC_PREVENT-0021"].text
        })
      } else {
        vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0017", {
          value: C0013_Value,
          text: C0013_Text
        })
      }

      let C0001 = formData.main["C-EPIDEMIC_PREVENT-0001"].value //预计解封时间
      let C00016 = formData.main["C-EPIDEMIC_PREVENT-0016"].value //计划解封时间
      let C0001_Date = new Date(filterTime(dsf.date.format(new Date(filterTime(C0001)), "yyyy-mm-dd")))
      let C0016_Date = new Date(filterTime(dsf.date.format(new Date(filterTime(C00016)), "yyyy-mm-dd")))

      if (C00016) {
        vueData.$set(vueData.formData.main, "B0005", { //有计划解封时间直接给最终解封时间赋值
          value: C00016
        })

        // let temp = dsf.date.addDate(new Date(filterTime(C00016)), 1) //如果有计划解封时间就直接给上班时间+1天处理
        // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
        //   value: dsf.date.format(temp, "yyyy-mm-dd hh:ii:00")
        // })
      } else if (C0001) {
        // let temp = dsf.date.addDate(new Date(filterTime(C0001)), 1) //如果有预计解封时间就直接给上班时间+1天处理
        // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
        //   value: dsf.date.format(temp, "yyyy-mm-dd hh:ii:00")
        // })
      } else {
        // vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
        //   value: ""
        // })
      }

      if (formData.main["C-EPIDEMIC_PREVENT-0012"].value == "1") {
        let temp = dsf.date.addDate(new Date(), 1) //如果选择明天去上班则直接给上班时间+1天处理
        vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
          value: dsf.date.format(temp, "yyyy-mm-dd hh:ii:00")
        })
      } else {
        vueData.$set(vueData.formData.main, "C-EPIDEMIC_PREVENT-0009", {
          value: ""
        })
      }

      let C0006 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["C-EPIDEMIC_PREVENT-0006"].value)), "yyyy-mm-dd"))) //核酸时间
      let C0009 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["C-EPIDEMIC_PREVENT-0009"].value)), "yyyy-mm-dd"))) //上班时间
      let diffDays = dsf.date.diffDays(C0006, C0009)

      let C00015 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["C-EPIDEMIC_PREVENT-0015"].value)), "yyyy-mm-dd"))) //管控时间
      let B0005 = new Date(filterTime(dsf.date.format(new Date(filterTime(formData.main["B0005"].value)), "yyyy-mm-dd"))) //解封时间
      let today = dsf.date.format(new Date(), "yyyy-mm-dd")
      let B0013 = dsf.date.format(new Date(filterTime(formData.main["B0013"].value)), "yyyy-mm-dd") //上报时间
      vueData.$set(vueData.formData.main, "B0013", { //上报时间为当前时间
        value: dsf.date.format(new Date(), "yyyy-mm-dd hh:ii:00")
      })
      if (B0013 != today) {
        reject("上报时间必须为当天")
        // } else if (C0013_Value.length && C0013_Value != "1" && isNaN(diffDays) && formData.main["C-EPIDEMIC_PREVENT-0009"].value.length) {
        //   reject("请填写核酸检测时间")
      } else if (C0013_Value != "1" && C0013_Value != "16"&& C0013_Value != "20" && formData.main["C-EPIDEMIC_PREVENT-0011"].value == "1") {
        reject("隔离期间不允许选择办公场所上班")
        // } else if (C0013_Value == "9" && !isNaN(diffDays) && diffDays >= 2) {
        //   reject("核酸检测时间和上班时间必须48小时以内")
        // } else if (C0013_Value != "1" && C0013_Value != "9" && !isNaN(diffDays) && diffDays >= 7) {
        //   reject("核酸检测时间和上班时间必须小于7天")
        // } else if (C00015 <= C0009 && C0009 <= B0005) {
        //   reject("上班时间不能在管控时间范围内")
        // } else if (C0001.length && C00016.length && C0016_Date <= C0001_Date) {
        //   reject("计划解除时间必须大于预计解封时间")
      } else
        resolve()
    } catch (error) {
      resolve()
    }
  })
}

exportObj.changUser = function (formData, formStruct, vueData) {
  vueData.$router.push({
    name: "checklogin",
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
