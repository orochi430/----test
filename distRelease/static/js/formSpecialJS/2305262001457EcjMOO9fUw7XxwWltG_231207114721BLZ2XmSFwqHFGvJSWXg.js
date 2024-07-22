// 一体化财政局 收文（移动表单领导主协办使用）
;(function () {
  const exportObj = {}
  var txTime = ""
  var bxtime = ""
  let init_C_LW_0031 = ""
  let init_230710141442CUo1zWThA5VUcZ2pN5B = ""
  let init_B0051 = ""
  let init_C_LW_0002 = ""
  let init_C_LW_0003 = ""
  /**
   * 根据当前时间获取N天后的时间
   * @param date
   * @param days
   * @returns {*}
   */
  function addWorkdays(date, days) {
    date.setDate(date.getDate() + days - 1)
    return date
  }
  // 主办单位与协办单位不能重复
  function checkRepeat(user, ...argument) {
    let userId = user.id.slice(user.id.lastIndexOf("_") + 1)
    let flag = false
    if (argument.length > 0) {
      for (let i = 0; i < argument.length; i++) {
        if (argument[i].value.split(",").find(id => id == userId)) {
          flag = true
          break
        }
      }
    }
    return flag
  }
  function openShuke(item, vueData) {
    let type = item.title.substr(item.title.lastIndexOf(".") + 1)
    let file = {
      id: item.id,
      title: type != "ofd" && type != "pdf" ? item.title.substr(0, item.title.lastIndexOf(".")) + ".pdf" : item.title,
      isHandleWrite: true,
      isAfterReading: false,
      openToPage: item.pagination || 0
    }
    let formData = {
      info_id: vueData.formMeta.parameters.pk,
      moduleId: vueData.formMeta.parameters.moduleId,
      nodeId: vueData.formMeta.parameters.nodeId,
      nodeName: vueData.formMeta.parameters.nodeName,
      flowId: vueData.formMeta.parameters.flowId,
      pId: vueData.formMeta.parameters.pId,
      pnId: vueData.formMeta.parameters.pnId,
      type: "todo"
    }
    try {
      dsf.shuke.shGovShuke(file, formData, shukeRes => {
        console.log(shukeRes)
        if (shukeRes.openTime) {
          item.pagination = shukeRes.currentPage
          dsf.http
            .post("/fn/approvalFileInformation/save", {
              infoId: vueData.formMeta.parameters.pk,
              fileId: item.id,
              startTime: moment(Number(shukeRes.openTime)).format("yyyy-MM-DD hh:mm:ss"),
              endTime: moment(Number(shukeRes.closeTime)).format("yyyy-MM-DD hh:mm:ss"),
              pagination: shukeRes.currentPage,
              readingTime: Math.floor((shukeRes.closeTime - shukeRes.openTime) / 1000)
            })
            .then(res => {})
        }
        if (shukeRes.type == "send" || shukeRes.type == "save") {
          vueData.$bus.emit("iSignatureSend", {
            act: "send"
          })
        }
      })
    } catch (error) {}
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 再次拟办节点 弹出再次拟办意见框
    if (vueData.formMeta.parameters.nodeId == "qTzpZgXEBU8GM0A") {
      if (formData.main["C-LW-0020"].value)
        dsf.layer.confirm(
          {
            title: "再次拟办原因",
            message: formData.main["C-LW-0020"].value,
            showCancelButton: false
          },
          () => {}
        )
    } else if (
      vueData.formMeta.parameters.nodeId == "7ZtUvWY1y95Hiq4" ||
      vueData.formMeta.parameters.nodeId == "saeVVHe7FujlWhg" ||
      vueData.formMeta.parameters.nodeId == "9bgsp2GT2fZWnwS"
    ) {
      // 领导批示环节直接打开签批件
      let attachType = vueData.allFile.find(item => item.attachType == 12)
      if (attachType && attachType.file.length) {
        openShuke(attachType.file[0], vueData)
      }
    }
    if (vueData.formMeta.parameters.nodeId == "WpsCqqGHpbBaNTs") {
      dsf.http.post("ctrl/tempSaveLwFile/opitionBox", { pnId: vueData.formMeta.parameters.pnId, nodeId: vueData.formMeta.parameters.nodeId }).then(res => {
        if (res.data.type === "success" && res.data.data) {
          //意见弹框
          dsf.layer.confirm(
            {
              title: "二次拟办审核",
              message: res.data.data,
              showCancelButton: false
            },
            () => {}
          )
        }
      })
    }
    // 初始化领导、部门元数据
    init_C_LW_0031 = formData.main["C-LW-0031"].value
    init_230710141442CUo1zWThA5VUcZ2pN5B = formData.main["230710141442CUo1zWThA5VUcZ2pN5B"].value
    init_B0051 = formData.main["B0051"].value
    init_C_LW_0002 = formData.main["C-LW-0002"].value
    init_C_LW_0003 = formData.main["C-LW-0003"].value
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "B0006") {
        var jjcd = busObj.value //获取当前公文种类
        // 获取当前时间
        var currentDate = new Date()
        //紧急程度为加急，办理期限默认值为当前时间+5天
        var target = $("#B0018")
        //增加之前先删除之前的
        $("div[name='timeRemaining']").remove()
        //加急
        if (jjcd == 2) {
          target.after(
            "<div  name='timeRemaining' class='ds_control ds_label_box text-center colorInherit' style='clear:both;color: red; font-size: 16px;display: flex;'><p>剩余5天</p></div>"
          )
          var futureDate = addWorkdays(currentDate, 5)
          var blrq = futureDate.getFullYear() + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getDate()
          vueData.$set(formData.main, "B0018", { value: blrq })
        }
        //紧急程度为特级，办理期限默认值为当前时间+3天
        if (jjcd == 3) {
          target.after(
            "<div  name='timeRemaining' class='ds_control ds_label_box text-center colorInherit' style='clear:both;color: red; font-size: 16px;display: flex;'><p>剩余3天</p></div>"
          )
          var futureDate = addWorkdays(currentDate, 3)
          var blrq = futureDate.getFullYear() + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getDate()
          vueData.$set(formData.main, "B0018", { value: blrq })
        }
      }
    })
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "B0018") {
        if (new Date(busObj.value).getTime() < new Date(dsf.date.format(new Date(), "yyyy-mm-dd")).getTime()) {
          vueData.$set(formData.main, "B0018", { value: "" })
          dsf.layer.toast("办理期限小于当前时间，请重新选择。")
        }
      }
    })
    vueData.$watch(
      function () {
        return vueData.formData.main["B0018"].value
      },
      function (n, o) {
        //增加之前先删除之前的
        $("div[name='timeRemaining']").remove()
        if (n != "") {
          let today = new Date()
          let year = today.getFullYear()
          let month = today.getMonth() + 1
          let day = today.getDate()
          if (month < 10) {
            month = "0" + month
          }
          if (day < 10) {
            day = "0" + day
          }
          let formattedDate = year + "-" + month + "-" + day
          let xztime = new Date(n)
          let dqtime = new Date(formattedDate)
          let timeDiff = xztime - dqtime
          let diffDays = ""
          if (timeDiff < 0) {
            diffDays = Math.ceil(Math.abs(timeDiff) / (1000 * 3600 * 24))
          } else {
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
          }
          let target = $("#B0018")
          target.after(`<div name='timeRemaining' style='color: ${timeDiff < 0 ? "#e30000" : diffDays > 1 ? "#0086d9" : "#FA6400"}'>
            ${timeDiff < 0 ? "超期" : "剩余"}${diffDays}天</div>`)
        }
      },
      {
        immediate: true
      }
    )
    vueData.$bus.$off("userClickBus").on("userClickBus", function (busObj) {
      if (busObj.user.checked) {
        //主办单位与协办单位判重
        if (busObj.metaId == "C-LW-0002" || busObj.metaId == "C-LW-0003") {
          let comparisonObj = busObj.metaId == "C-LW-0002" ? formData.main["C-LW-0003"] : formData.main["C-LW-0002"]
          let flag = checkRepeat(busObj.user, comparisonObj)
          //选择协办部门带出分管领导时判重
          if (busObj.metaId == "C-LW-0003") {
            let flag1 = false
            dsf.http.post("/ctrl/czjcustom/getSubLeaders", { deptIds: busObj.user.id.slice(busObj.user.id.lastIndexOf("_") + 1) }).then(res => {
              if (res.data.code == 200) {
                let leaders = res.data.data.leaders
                let walkers = res.data.data.walkers
                let zsIds = formData.main["C-LW-0031"].value ? formData.main["C-LW-0031"].value.split(",") : []
                for (let i = 0; i < leaders.length; i++) {
                  //如果主送领导，已经存在选择的部门中的分管领导，给出提醒
                  if (leaders[i] && zsIds.indexOf(leaders[i]["userId"]) > -1) {
                    flag1 = true
                    break
                  }
                }
                for (let i = 0; i < leaders.length; i++) {
                  //如果主送领导，已经存在选择的部门中的二级巡视员，给出提醒
                  if (walkers[i] && zsIds.indexOf(walkers[i]["userId"]) > -1) {
                    flag1 = true
                    break
                  }
                }
                if (!flag1) {
                  let oldfgldIds = formData.main["230710141442CUo1zWThA5VUcZ2pN5B"].value
                  let oldejxsyIds = formData.main["B0051"].value
                  leaders = leaders.filter(user => oldfgldIds.indexOf(user.userId) == -1)
                  walkers = walkers.filter(user => oldejxsyIds.indexOf(user.userId) == -1)
                  if (leaders.length > 0) {
                    let userValue = formData.main["230710141442CUo1zWThA5VUcZ2pN5B"].value
                    let userText = formData.main["230710141442CUo1zWThA5VUcZ2pN5B"].text
                    let userSchema = formData.main["230710141442CUo1zWThA5VUcZ2pN5B"].schema
                    vueData.$set(formData.main, "230710141442CUo1zWThA5VUcZ2pN5B", {
                      text: userText + (userText ? "," : "") + leaders.map(user => user.userName).join(","),
                      value: userValue + (userValue ? "," : "") + leaders.map(user => user.userId).join(","),
                      schema: userSchema + (userSchema ? "," : "") + leaders.map(user => user.userSchema).join(",")
                    })
                  }
                  if (walkers.length > 0) {
                    let userValue = formData.main["B0051"].value
                    let userText = formData.main["B0051"].text
                    let userSchema = formData.main["B0051"].schema
                    vueData.$set(formData.main, "B0051", {
                      text: userText + (userText ? "," : "") + walkers.map(user => user.userName).join(","),
                      value: userValue + (userValue ? "," : "") + walkers.map(user => user.userId).join(","),
                      schema: userSchema + (userSchema ? "," : "") + walkers.map(user => user.userSchema).join(",")
                    })
                  }
                } else {
                  busObj.user.checked = false
                  dsf.layer.toast("主要领导选择存在冲突，请重新选择")
                }
              } else {
                dsf.layer.toast(res.data.message)
              }
            })
          }
          if (flag) {
            busObj.user.checked = false
            dsf.layer.toast("主送领导、分管领导、二级巡视员不能重复")
          }
        } else if (busObj.metaId == "C-LW-0031" || busObj.metaId == "230710141442CUo1zWThA5VUcZ2pN5B" || busObj.metaId == "B0051") {
          //主送领导、分管领导、二级巡视员判重
          let flag = false
          if (busObj.metaId == "C-LW-0031") {
            let comparisonObj1 = formData.main["230710141442CUo1zWThA5VUcZ2pN5B"]
            let comparisonObj2 = formData.main["B0051"]
            flag = checkRepeat(busObj.user, comparisonObj1, comparisonObj2)
          } else if (busObj.metaId == "230710141442CUo1zWThA5VUcZ2pN5B") {
            let comparisonObj1 = formData.main["C-LW-0031"]
            let comparisonObj2 = formData.main["B0051"]
            flag = checkRepeat(busObj.user, comparisonObj1, comparisonObj2)
          } else if (busObj.metaId == "B0051") {
            let comparisonObj1 = formData.main["C-LW-0031"]
            let comparisonObj2 = formData.main["230710141442CUo1zWThA5VUcZ2pN5B"]
            flag = checkRepeat(busObj.user, comparisonObj1, comparisonObj2)
          }
          if (flag) {
            busObj.user.checked = false
            dsf.layer.toast("主送领导、分管领导、二级巡视员不能重复")
          }
        }
      }
    })
  }
  exportObj.saveAfter = function (vueData, formData, formStruct) {
    // 领导或部门数据变更才补充意见
    let nodeId = vueData.formMeta.parameters.nodeId
    if (nodeId == "YgJBZS7tULmcxHm" || nodeId == "RfqqqHGESZNlapb" || nodeId == "qTzpZgXEBU8GM0A" || nodeId == "Q23XZ6FnC7SDVMf") {
      if (
        init_C_LW_0031 == vueData.formData.main["C-LW-0031"].value &&
        init_230710141442CUo1zWThA5VUcZ2pN5B == vueData.formData.main["230710141442CUo1zWThA5VUcZ2pN5B"].value &&
        init_B0051 == vueData.formData.main["B0051"].value &&
        init_C_LW_0002 == vueData.formData.main["C-LW-0002"].value &&
        init_C_LW_0003 == vueData.formData.main["C-LW-0003"].value
      ) {
        return
      }
      vueData.currentOpintion = ""
      let zsld = formStruct.main["C-LW-0031"].text.replace(/,/g, "、")
      let fgld = formStruct.main["230710141442CUo1zWThA5VUcZ2pN5B"].text.replace(/,/g, "、")
      let ejxsy = formStruct.main["B0051"].text.replace(/,/g, "、")
      let zbdw = formStruct.main["C-LW-0002"].text.replace(/,/g, "、")
      let xbdw = formStruct.main["C-LW-0003"].text.replace(/,/g, "、")
      if (zsld || fgld || ejxsy || zbdw || xbdw) {
        let arr = []
        let str = ""
        arr.splice(0, 1, zsld, fgld)

        arr = arr.filter(item => item != "")
        if (arr.length > 0) {
          str = `请`
          str += arr.join("、")
          str += "同志阅示。"
        }
        if (ejxsy) {
          str += `请${ejxsy.split(",").join("、")}同志阅。`
        }
        if (xbdw || zbdw) {
          str += xbdw && zbdw ? `拟请${zbdw}会同${xbdw}` : zbdw ? `拟请${zbdw}` : `拟请${xbdw}`
          str += "阅办。"
        }
        let nbcs = formStruct.main["C-LW-0023"].value || 1
        vueData.$set(vueData, "currentOpintion", str)
      } else {
        vueData.currentOpintion = ""
      }
    }
  }
  // exportObj.BtnWriteOpinion = function (formData, formStruct, vueData) {
  //   let str = dsf.util.loadSessionStore("user").name + "同志" + moment().format("M月D日") + "圈阅"
  //   vueData.$set(vueData, "currentOpintion", str)
  //   vueData.btnAction("BtnWriteOpinion")
  // }
  // 再次拟办
  exportObj.CZJREPROPOSE = function (formData, formStruct, vueData) {
    dsf.layer.confirm(
      {
        title: "再次拟办原因",
        message: '<textarea rows="5" id="failReason" placeholder="请填写再次拟办原因" class="van-field__control" style="border: 1px solid #ddd; padding: 6px"></textarea>'
      },
      () => {
        vueData.$set(formData.main, "C-LW-0020", { value: document.getElementById("failReason").value })
        vueData.nowButtonParameters.nextLineId = "CoOLUFpV4QMI2ZO"
        vueData.alreadyWriteOpintion = true
        vueData.isShowWriteOpintionBtn = true
        vueData.btnAction("send")
      },
      () => {}
    )
  }
  // 不填意见发送
  exportObj.custom1 = function (formData, formStruct, vueData) {
    vueData.alreadyWriteOpintion = true
    vueData.isShowWriteOpintionBtn = true
    vueData.btnAction("send")
  }
  // 流转情况-新
  exportObj.custom5 = function (formData, formStruct, vueData) {
    vueData.componentName = "movingSituationDialog"
  }
  exportObj.afterEndInstance = function (vueData) {
    dsf.http.post('fn/fw/callback/enforceEndCenterFlow', { pk: vueData.pk }).then(res => {
      dsf.layer.toast("操作成功", true, () => vueData.backSucces());
    })
  }
  window.spJS = exportObj
})()
