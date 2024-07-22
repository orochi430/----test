/**
 * 督办立项
 */

;(function () {
  const exportObj = {}
  //获取责任人电话
  function getResponsibleMobile(formData, vueData, id) {
    dsf.http.post("/fn/superviseV6/approval/getResponsibleMobile", { userId: id }).then(res => {
      if (res.data.code == 200) {
        var responsibleMobile = dsf.config.setting["DB-LX-0001"] == "1" ? res.data.data.tel : res.data.data.responsibleMobile
        vueData.$set(formData.main, "C-DB-0126", { value: responsibleMobile })
      }
    })
  }

  //获取计划任务的labelText
  function reloadScheduledTask(formData, vueData, formStruct) {
    let aLinkCtr = formStruct.controls.find(item => item.controlType == "controlMobileAlink")
    dsf.http.post("fn/superviseV6/approvalTask/hasTasks", { relationId: formStruct.parameters.pk }).then(res => {
      let specialSaveObj = JSON.stringify({ relationId: formStruct.parameters.pk })
      let linkName = "查看/新建任务计划"
      let linkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz?specialSaveObj=${specialSaveObj}`
      if (res.data.code == 200 && res.data.data && res.data.data.taskTitle) {
        let method = "&listId=210618141757PmEKNvvLIJQtgqyDW44"
        //可编辑节点id
        let editNodeId = ["0", "-2", "-5", "fdn6eOc5Pxw6o8z", "Ks0iVYHVoRXz4tk"]
        if (editNodeId.indexOf(formStruct.parameters.nodeId) < 0) {
          method = "&method=view"
        }
        linkName = res.data.data.taskTitle
        linkInfo = `/commonForm/210604144527JntE2LI7dWrpBLsluZz/${res.data.data.taskId}?specialSaveObj=${specialSaveObj}${method}`
      }
      console.log(aLinkCtr)
      aLinkCtr.extra.linkInfo = linkInfo
      aLinkCtr.extra.linkName = linkName
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
    let DB_relationFile = formStruct.controls.find(item => item.label == "督办关联")
    // let relationFile_2 = formStruct.controls.find(item => item.metaId == "relationFile-2")
    // // 没有督办关联时隐藏
    // if (vueData.relationList.find(item => item.relaValue == 2) && vueData.relationList.find(item => item.relaValue == 2).document.length == 0) {
    //   if (DB_relationFile) DB_relationFile.show = 0
    //   if (relationFile_2) relationFile_2.show = 0
    // }
    let C_DB_0001 = formStruct.controls.find(item => item.metaId == "C-DB-0001")
    let C_DB_0002 = formStruct.controls.find(item => item.metaId == "C-DB-0002")
    // 根据系统设置，判断主办单位协办单位是用选人控件还是子表
    dsf.http.post("ctrl/superviseV6/m/system/config/db").then(res => {
      if (res.data.data.cbType == 1) {
        let DB_220808170715vHySOCUEffqz9jfTocG = formStruct.controls.find(item => item.metaId == "220808170715vHySOCUEffqz9jfTocG")
        let DB_2208081707395f0kQgjx9XflsmUXkxT = formStruct.controls.find(item => item.metaId == "2208081707395f0kQgjx9XflsmUXkxT")
        if (DB_220808170715vHySOCUEffqz9jfTocG) DB_220808170715vHySOCUEffqz9jfTocG.show = 0
        if (DB_2208081707395f0kQgjx9XflsmUXkxT) DB_2208081707395f0kQgjx9XflsmUXkxT.show = 0
        vueData.$set(formData.main, "C-DB-0127", { value: "1" })
      } else {
        vueData.notVaildateMetas.push("C-DB-0001")
        if (C_DB_0001) C_DB_0001.show = 0
        if (C_DB_0002) C_DB_0002.show = 0
        vueData.$set(formData.main, "C-DB-0127", { value: "2" })
      }
    })
    // 根据系统设置是否可选远程单位
    dsf.http.post('ctrl/superviseV6/approval/checkRemoteUnit').then(res => {
      if (res.data.code == 200 && res.data.data.remoteUnit == 0) {
        if (C_DB_0001.extra.tabs.length > 1) {
          C_DB_0001.extra.tabs.pop()
        }
        if (C_DB_0002.extra.tabs.length > 1) {
          C_DB_0002.extra.tabs.pop()
        }
      }
    })
    let aLinkCtr = formStruct.controls.find(item => item.controlType == "controlMobileAlink")
    // 获取计划任务的labelText
    if (aLinkCtr) reloadScheduledTask(formData, vueData, formStruct)

    // 显示隐藏计划任务
    let DB_0078 = formData.main["C-DB-0078"]?formData.main["C-DB-0078"].value:undefined
    if (DB_0078 && aLinkCtr) isShowControlMobileAlink(DB_0078, aLinkCtr)

    // 初始化立项人电话
    if (!formData.main["C-DB-0126"].value) {
      let id = formData.main["C-DB-0094"].value
      getResponsibleMobile(formData, vueData, id)
    }
    if (!(formData.main["C-DB-0016"]?formData.main["C-DB-0016"].value:undefined)) {
      vueData.$set(formData.main, "C-DB-0016", formData.main["C-DB-0094"])
    }
    // 初始化源督办id
    if (!formData.main["C-DB-0086"] || !formData.main["C-DB-0086"].value) {
      vueData.$set(formData.main, "C-DB-0086", { value: formStruct.parameters.pk })
    }
    // 初始化督办状态
    if (!formData.main["C-DB-0054"] || !formData.main["C-DB-0054"].value) {
      vueData.$set(formData.main, "C-DB-0054", { value: "1", text: "待确认" })
    }
    vueData.$bus.$off("selectUserBus").on("selectUserBus", function (busObj) {
      console.log("busObj.metaData", busObj.metaData)
      if (busObj.metaData.metaId === "C-DB-0094") {
        //加载责任人电话；
        console.log("busObj", busObj)
        vueData.$set(formData.main, "C-DB-0016", formData.main["C-DB-0094"])
        getResponsibleMobile(formData, vueData, busObj.value)
      } else if (busObj.metaData.metaId === "C-DB-0001") {
        // 主办单位为多个时清空协办单位,且协办单位不能再选
        let C_DB_0002 = formStruct.controls.find(item => item.metaId == "C-DB-0002")
        if (busObj.selectArr.length > 1) {
          vueData.$set(formData.main, "C-DB-0002", { value: "", text: "" })
          if (C_DB_0002) C_DB_0002.privilege.editable = false
        } else {
          if (C_DB_0002) C_DB_0002.privilege.editable = true
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
      if (busObj.metaData.metaId == "C-DB-0078") {
        // 远程单位不能选择周期性反馈
        if (busObj.value == 2) {
          let zbSchema = formData.main["C-DB-0001"].schema || ''
          let xbSchema = formData.main["C-DB-0002"].schema || ''
          let schemaArr = zbSchema.split(",").concat(xbSchema.split(","))
          if (schemaArr.length > 0) {
            if (schemaArr.find(schema => schema.indexOf("21:") == 0)) {
              vueData.$set(formData.main, 'C-DB-0078', {value: '1', text: '一次性反馈'})
              dsf.layer.toast("承办单位包含远程单位，无法选择周期性反馈")
              return
            }
          }
        }
        // 反馈类型控制计划任务
        isShowControlMobileAlink(busObj.value, aLinkCtr)
      }
    })

    // 选择主办协办人员时 获取人员信息填入
    vueData.$bus.off("subFormTreeSelect").on("subFormTreeSelect", function (busObj) {
      console.log(busObj)
      // 通过接口获取选中人员的信息
      if (busObj.selectArr.length + formData.multinfos[busObj.subFormId].rows.length > 2) {
        dsf.layer.toast("承办人应少于两人")
        return
      }
      let loading = dsf.layer.loading()
      dsf.http
        .post("/ctrl/superviseV6/approval/getUserDept", {
          userDept: JSON.stringify(
            busObj.selectArr.map(item => {
              return {
                userId: item.id,
                deptId: item.pid,
                userName: item.name
              }
            })
          )
        })
        .then(res => {
          dsf.layer.closeLoading(loading)
          if (res.data.code == 200) {
            res.data.data.forEach(async (item, index) => {
              // 获取主办/协办已选人员
              let comparisonArr =
                busObj.subFormId == "220808170715vHySOCUEffqz9jfTocG"
                  ? formData.multinfos["2208081707395f0kQgjx9XflsmUXkxT"].rows
                  : formData.multinfos["220808170715vHySOCUEffqz9jfTocG"].rows
              // 重复则不添加
              if (comparisonArr.find(it => item.userId == it["C-DB-CBR-003"].value)) {
                dsf.layer.toast("主办单位与协办单位不能重复")
                return
              }
              await vueData.$refs.formTab[0].$refs[busObj.subFormId][0].$refs.subform.addCard(false).then(newData => {
                // 机构类型
                vueData.$set(newData, "C-DB-CBR-001", {
                  value: item.orgLevel,
                  text: item.orgType
                })
                // 部门
                vueData.$set(newData, "C-DB-CBR-004", {
                  schema: "5::" + item.orgId,
                  value: item.orgId,
                  text: item.orgName
                })
                // 承办人
                vueData.$set(newData, "C-DB-CBR-003", {
                  schema: "1::" + item.orgId,
                  value: item.userId,
                  text: item.userName
                })
              })
            })
          }
          // // 协办单位选择树排除主办单位已选人员
          // if (busObj.subFormId == '220808170715vHySOCUEffqz9jfTocG') {
          //     let actionArgs = JSON.parse(formStruct.controls.find(item => item.metaId == '2208081707395f0kQgjx9XflsmUXkxT').extra.buttons[0].actionArgs.replace(/'/g, "\""))
          //     console.log(actionArgs)
          //     actionArgs.tabs[0].action = actionArgs.tabs[0].action + `&excludeIds=${res.data.data.map(item => item.userId).join(',')}`
          //     formStruct.controls.find(item => item.metaId == '2208081707395f0kQgjx9XflsmUXkxT').extra.buttons[0].actionArgs = JSON.stringify(actionArgs)
          // }
        })
    })
    // 判断主办的数量，如果主办为多个则清空协办且不可新增协办
    if (vueData.formData.multinfos["220808170715vHySOCUEffqz9jfTocG"]) {
      vueData.$watch(
        function () {
          return vueData.formData.multinfos["220808170715vHySOCUEffqz9jfTocG"].rows
        },
        function (n, o) {
          if (n.length > 1) {
            formData.multinfos["2208081707395f0kQgjx9XflsmUXkxT"].rows.splice(0, formData.multinfos["2208081707395f0kQgjx9XflsmUXkxT"].rows.length)
            formStruct.subform["2208081707395f0kQgjx9XflsmUXkxT"].controls[0].privilege.editable = false
          } else if (formStruct.controls.find(item => item.metaId == "220808170715vHySOCUEffqz9jfTocG").privilege.editable) {
            formStruct.subform["2208081707395f0kQgjx9XflsmUXkxT"].controls[0].privilege.editable = true
          }
        },
        {
          deep: true,
          immediate: true
        }
      )
    }
  }

  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    vueData.$set(formData.main, "C-DB-0016", formData.main["C-DB-0094"])
    vueData.$set(formData.main, "C-DB-0022", formData.main["C-DB-0126"])
    return new Promise(function (resolve, reject) {
      if (
        (formData.multinfos["2208081707395f0kQgjx9XflsmUXkxT"] && formData.multinfos["2208081707395f0kQgjx9XflsmUXkxT"].rows.filter(row => row.action != "Deleted").length > 0) ||
        formData.main["C-DB-0001"].value
      ) {
      } else {
        reject("请选择主办单位")
      }
      let zbSchema = formData.main["C-DB-0001"].schema || ''
      let xbSchema = formData.main["C-DB-0002"].schema || ''
      let schemaArr = zbSchema.split(",").concat(xbSchema.split(","))
      if (schemaArr.length > 0) {
        if (formData.main["C-DB-0078"].value == 2 && schemaArr.find(schema => schema.indexOf("21:") == 0)) {
          reject("承办单位包含远程单位，无法选择周期性反馈")
        }
      }
      resolve()
    })
  }
  window.spJS = exportObj
})()
