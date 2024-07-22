//电气 签章申请表 
(function () {
  const exportObj = {};
  //“申请类型”选择‘本部门印章’后‘申请部门负责人’自动带出‘申请部门’所选部门的正副部长， 根据“部门负责人”角色；选择“其他部门签章”后‘所属部门负责人’自动带出‘申请部门’所选部门的正副部长。
  let moudle = null;
  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formData.main["B0030"].text == "其他部门印章") {
      moudle = 1;
      vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-005"][0].$el.style.display = '';
      vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-007"][0].$el.style.display = '';
    } else {
      moudle = 0;
      getDeptUser("", vueData, "C-SEAL-APPLIFORM-007");
      vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-005"][0].$el.style.display = 'none';
      vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-007"][0].$el.style.display = '';

    }






    vueData.$bus.on("inputRadio", function (vueObj) {
      if (vueObj.text == "本部门印章") {
        moudle = 0;
        getDeptUser("", vueData, "C-SEAL-APPLIFORM-007");
        dataClear(vueData, "C-SEAL-APPLIFORM-005");
        vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-005"][0].$el.style.display = 'none';
        vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-007"][0].$el.style.display = ''
      } else {
        moudle = 1;
        dataClear(vueData, "C-SEAL-APPLIFORM-001");

        vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-005"][0].$el.style.display = '';
        vueData.$refs.formTab[0].$refs["C-SEAL-APPLIFORM-007"][0].$el.style.display = ''
      }
    })

    vueData.$bus.on("selectUserBus", function (vueObj) {
      if (vueObj.metaData.metaId == "C-SEAL-APPLIFORM-001") {
        if (moudle == 0) {
          getDeptUser(vueObj.value, vueData, "C-SEAL-APPLIFORM-007")
        } else getDeptUser(vueObj.value, vueData, "C-SEAL-APPLIFORM-005")
      }
    })

  }
  exportObj.saveFilter = function (formData, formMeta, vueData) {
    return new Promise(function (resolve, reject) {
      if (moudle == 0 && formData.main["C-SEAL-APPLIFORM-007"].text == "") {
        reject("申请部门负责人不能为空");
      } else if (moudle == 1 && formData.main["C-SEAL-APPLIFORM-005"].text == "") {
        reject("所属部门负责人不能为空");
      } else if (moudle == 1 && formData.main["C-SEAL-APPLIFORM-007"].text == "") {
        reject("申请部门负责人不能为空");
      } else resolve()
    })
  }

  function dataClear(vueData, data) {
    vueData.$set(vueData.formData.main, data, {
      schema: "",
      text: "",
      value: ""
    })
  }

  function getDeptUser(deptId, vueData, data) {
    dsf.http.post("ctrl/applicationForm/getDeptUser", {
      deptId: deptId,
    }).then((res) => {
      vueData.$set(vueData.formData.main, data, {
        schema: res.data.data.userSchema,
        text: res.data.data.userText,
        value: res.data.data.userValue

      })
    })
  }

  window.spJS = exportObj;
})()
