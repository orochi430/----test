// 督办增加承办

(function () {
const exportObj = {};
//获取关联文件
function getRelationFile(vueData) {
  let fileRela = {
    relaMode: 1, //1为单向关联，2为双向关联
    relacountLimit: 1, //限制条数
    relaName: "文件关联", //名称
    relaValue: 2, //关联文件类型值
    fileTotal: 0 //文件总数
  }
  return new Promise(function (resolve, reject) {
    dsf.http
      .post("ctrl/filerelation/select/checkedJson", {
        pks: vueData.$route.query.relationId,
        infoId: vueData.pk,
        relaType: fileRela.relaValue,
        relaName: fileRela.relaName
      })
      .then(res => {
        if (res.data.code == 200) {
          resolve(res.data.data)
        } else {
          reject()
        }
      })
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
exportObj.initHandle = function (formData, formStruct, vueData) {
  // PC做的逻辑是 如果是协办和主办  那增加承办只能是协办类型，如果是2个主办，那只能新增主办部门；如果是一个主办，那就能新增主办或协办。
  let sponsor = formData.main["C-DB-CHANGE-0008"] ? formData.main["C-DB-CHANGE-0008"].value.split(",").filter((item) => item !== "") : []
  let xieban = formData.main["C-DB-CHANGE-0009"] ? formData.main["C-DB-CHANGE-0009"].value.split(",").filter((item) => item !== "") : []
  if (sponsor.length > 0 && xieban.length > 0) {
    formStruct.controls.find(item => item.metaId == "C-DB-CHANGE-0003").privilege.editable = false
    vueData.$set(formData.main, "C-DB-CHANGE-0003", {value: '6', text: '增加协办部门'})
  } else if (sponsor.length > 1) {
    formStruct.controls.find(item => item.metaId == "C-DB-CHANGE-0003").privilege.editable = false
  }

  // 关联立项单
  if (!vueData.relationList[0] || !vueData.relationList[0].document.length) {
    getRelationFile(vueData).then(data => {
      dsf.http
        .post("fn/mobileRelationFile/save", {
          relaMode: data[0].relaMode,
          relaIds: data[0].relaId,
          pk: vueData.pk,
          moduleId: vueData.moduleId,
          fileRelaId: vueData.relationList[0].fileRelaId
        })
        .then(res => {
          if (res.data.code == 200) {
            dsf.http
              .get("fn/mobileRelationFile/getFormRelationFiles", {
                pk: vueData.pk,
                moduleId: vueData.moduleId,
                nodeId: formStruct.parameters.nodeId,
                flowId: formStruct.parameters.flowId
              })
              .then(response => {
                vueData.$set(vueData, "relationList", response.data.rows)
              })
          }
        })
    })
  }
  // 绑定前先注销，否则引起多次触发, 主办单位协办单位选人时不能重复，且判断是否有督办专员
  vueData.$bus.$off("userClickBus").on("userClickBus", function (busObj) {
    // console.log(busObj)
    if (busObj.metaId == "C-DB-CHANGE-0005") {
      if (busObj.user.checked) {
        hasRolePersonByDept(busObj.user).catch(() => {
          busObj.user.checked = false
          // 异步无法在 树控件loadChildData前改变checked，只能改变后再次执行loadChildData
          busObj.callback(busObj.user)
        })
      }
    }
  })
}
  window.spJS=exportObj;
})();

