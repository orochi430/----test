;(function () {
  /**
   * 督办通知
   */

  const exportObj = {}
  //获取责任人电话
  function getResponsibleMobile(formData, vueData, id, main) {
    dsf.http.post("/fn/superviseV6/approval/getResponsibleMobile", { userId: id }).then(res => {
      if (res.data.code == 200) {
        var responsibleMobile = res.data.data.responsibleMobile
        vueData.$set(formData.main, main, { value: responsibleMobile })
      }
    })
  }

  //获取计划任务的labelText
  function reloadScheduledTask(formData, vueData, formStruct, ctr, url) {
    // let aLinkCtr = formStruct.controls.filter(item => item.controlType == 'controlMobileAlink')[0]
    dsf.http.post(url).then(res => {
      let specialSaveObj = JSON.stringify({ relationId: formStruct.parameters.pk })
      let linkName = ""
      let linkInfo = ""
      if (res.data.code == 200 && res.data.data && res.data.data.taskTitle) {
        linkName = res.data.data.taskTitle
        linkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz/${res.data.data.taskId}?specialSaveObj=${specialSaveObj}&listId=210618141757PmEKNvvLIJQtgqyDW44&method=view&viewAttachUseSignMode=1`
      }
      ctr.extra.linkInfo = linkInfo
      ctr.extra.linkName = linkName
    })
  }

  // 检查选中部门是否有督办专员
  function hasRolePersonByDept(user) {
    return new Promise((resolve, reject) => {
      dsf.http
        .post("fn/superviseV6/approval/hasRolePersonByDept", {
          deptId: user.id.slice(user.id.lastIndexOf("_") + 1),
          deptName: user.showName
        })
        .then(res => {
          if (res.data.code == 200) {
            resolve()
          } else {
            dsf.layer.toast(res.data.message)
            reject()
          }
        })
    })
  }
  // 主办单位与协办单位不能重复
  function checkRepeat(comparisonObj, user) {
    if (comparisonObj.value.split(",").find(item => item == user.id.slice(user.id.lastIndexOf("_") + 1))) {
      user.checked = false
      dsf.layer.toast("主办单位与协办单位不能重复")
    }
  }
  // 显示隐藏计划任务
  function isShowControlMobileAlink(val, ctr) {
    val == 2 ? (ctr.show = 1) : (ctr.show = 0)
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 判断主办单位协办单位是用选人控件还是子表
    if (formData.main["C-DB-0127"].value == 1) {
      let controlMobileFl_zb = formStruct.controls.find(item => item.metaId == "controlMobileFl" && item.label == "主办单位")
      let controlMobileFl_xb = formStruct.controls.find(item => item.metaId == "controlMobileFl" && item.label == "协办单位")
      let DB_220805122012mf8KIUf71sblliZGMQY = formStruct.controls.find(item => item.metaId == "220805122012mf8KIUf71sblliZGMQY")
      let DB_220805122049uPzxdHtw9IUt6EjkuYg = formStruct.controls.find(item => item.metaId == "220805122049uPzxdHtw9IUt6EjkuYg")
      if (controlMobileFl_zb) controlMobileFl_zb.show = 0
      if (controlMobileFl_xb) controlMobileFl_xb.show = 0
      if (DB_220805122012mf8KIUf71sblliZGMQY) DB_220805122012mf8KIUf71sblliZGMQY.show = 0
      if (DB_220805122049uPzxdHtw9IUt6EjkuYg) DB_220805122049uPzxdHtw9IUt6EjkuYg.show = 0
    } else {
      let C_DB_0123 = formStruct.controls.find(item => item.metaId == "C-DB-0123")
      let C_DB_0124 = formStruct.controls.find(item => item.metaId == "C-DB-0124")
      if (C_DB_0123) C_DB_0123.show = 0
      if (C_DB_0124) C_DB_0124.show = 0
      // 获取承办单位子表数据
      if (formData.multinfos["220805122012mf8KIUf71sblliZGMQY"].rows.length == 0 && formData.multinfos["220805122049uPzxdHtw9IUt6EjkuYg"].rows.length == 0) {
        dsf.http.post("ctrl/superviseV6/approval/getChbrs", { sourceId: vueData.pk }).then(res => {
          if (res.data.data) {
            let data = res.data.data
            let zbId = "220805122012mf8KIUf71sblliZGMQY"
            let xbId = "220805122049uPzxdHtw9IUt6EjkuYg"

            let zbrs = data.zbrs
            for (let i = 0; i < zbrs.length; i++) {
              let item = zbrs[i]
              console.log(item)
              vueData.$refs.formTab[0].$refs[zbId][0].$refs.subform.addCard(false).then(newData => {
                newData["C-DB-CBR-003"] = { value: item.chbr, text: item.chbrText, schema: item.chbrSchema }
                newData["C-DB-CBR-001"] = { value: item.orgType, text: item.orgTypeText }
                newData["C-DB-CBR-002"] = { value: item.leader }
                newData["C-DB-CBR-004"] = { value: item.cbUnit, text: item.cbUnitText, schema: item.cbUnitSchema }
                newData["action"] = "Updated"
              })
            }

            let xbrs = data.xbrs
            for (let i = 0; i < xbrs.length; i++) {
              let item = xbrs[i]
              vueData.$refs.formTab[0].$refs[xbId][0].$refs.subform.addCard(false).then(newData => {
                newData["C-DB-CBR-003"] = { value: item.chbr, text: item.chbrText, schema: item.chbrSchema }
                newData["C-DB-CBR-001"] = { value: item.orgType, text: item.orgTypeText }
                newData["C-DB-CBR-002"] = { value: item.leader }
                newData["C-DB-CBR-004"] = { value: item.cbUnit, text: item.cbUnitText, schema: item.cbUnitSchema }
                newData["action"] = "Updated"
              })
            }
          }
        })
      }
    }

    let aLinkCtrs = formStruct.controls.filter(item => item.controlType == "controlMobileAlink")
    // 获取原计划任务的labelText
    if (aLinkCtrs.length) {
      reloadScheduledTask(formData, vueData, formStruct, aLinkCtrs[0], `fn/superviseV6/approvalTask/getTaskByLeafRelationId?infoId=${formStruct.parameters.pk}`)
      reloadScheduledTask(formData, vueData, formStruct, aLinkCtrs[1], `fn/superviseV6/approvalTask/hasTasks?relationId=${formStruct.parameters.pk}`)
    }

    // 显示隐藏计划任务
    let DB_0078 = formData.main["C-DB-0078"]? formData.main["C-DB-0078"].value : ''
    if (DB_0078 && aLinkCtrs.length) isShowControlMobileAlink(DB_0078, aLinkCtrs[0])

    // 显示隐藏任务下发计划任务
    let DB_0082 = formData.main["C-DB-0082"].value
    if (DB_0082 && aLinkCtrs.length) isShowControlMobileAlink(DB_0082, aLinkCtrs[1])

    // 初始化责任人电话
    if (!formData.main["C-DB-0022"].value) {
      let id = formData.main["C-DB-0016"].value
      getResponsibleMobile(formData, vueData, id, "C-DB-0022")
    }

    // ‘转部门内部人员’节点 分配方式只显示‘接收确认’选项
    if (formStruct.parameters.nodeId === "XVFQiYfrCLfubcN") {
      let DB_0081 = formStruct.controls.find(item => item.metaId == "C-DB-0081")
      DB_0081.enumData.splice(1, DB_0081.enumData.length)
    }

    vueData.$bus.$off("selectUserBus").on("selectUserBus", function (busObj) {
      console.log("busObj.metaData", busObj.metaData)
      if (busObj.metaData.metaId === "C-DB-0001") {
        // 主办单位为多个时清空协办单位,且协办单位不能再选
        if (busObj.selectArr.length > 1) {
          vueData.$set(formData.main, "C-DB-0002", { value: "", text: "" })
          formStruct.controls.find(item => item.metaId == "C-DB-0002").privilege.editable = false
        } else {
          formStruct.controls.find(item => item.metaId == "C-DB-0002").privilege.editable = true
        }
      }
    })
    // 绑定前先注销，否则引起多次触发, 主办单位协办单位选人时不能重复，且判断是否有督办专员
    vueData.$bus.$off("userClickBus").on("userClickBus", function (busObj) {
      // console.log(busObj)
      if (busObj.metaId == "C-DB-0002" || busObj.metaId == "C-DB-0001") {
        let comparisonObj = busObj.metaId == "C-DB-0002" ? formData.main["C-DB-0001"] : formData.main["C-DB-0002"]

        checkRepeat(comparisonObj, busObj.user)

        if (busObj.user.checked) {
          hasRolePersonByDept(busObj.user).catch(() => {
            busObj.user.checked = false
            // 异步无法在 树控件loadChildData前改变checked，只能改变后再次执行loadChildData
            busObj.callback(busObj.user)
          })
        }
      }
    })
    vueData.$bus.on("inputRadio", function (busObj) {
      // 反馈类型控制计划任务
      if (busObj.metaData.metaId == "C-DB-0078") {
        isShowControlMobileAlink(busObj.value, aLinkCtrs[0])
      } else if (busObj.metaData.metaId == "C-DB-0082") {
        isShowControlMobileAlink(busObj.value, aLinkCtrs[1])
      } else if (busObj.metaData.metaId == "C-DB-0081") {
        if (busObj.value != "210607162654rncyrI8JWu5gQbYaVLh") {
          // 非任务下发, 隐藏计划任务
          aLinkCtrs[1].show = 0
        } else {
          isShowControlMobileAlink(DB_0082, aLinkCtrs[1])
        }
      }
    })
  }
  // exportObj.saveAfter = function (vueData, formData, formStruct) {
  //   vueData.backSucces()
  // }
  window.spJS = exportObj
})()
