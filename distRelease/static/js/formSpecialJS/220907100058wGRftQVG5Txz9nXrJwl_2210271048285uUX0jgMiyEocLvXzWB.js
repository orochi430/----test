(function () {
  // 127269 【北京市委党校国产化适配项目】--移动端，师讯通执行人，执行部门; 协办人、协办部门功能优化
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {

    // 选择部门带出指定人员
    vueData.$bus.$off("selectUserBus").on("selectUserBus", function (busObj) {
      // console.log("busObj", busObj)
      // 办理部门 -> 办理人
      setUserByDept("220907103453R6L83eNfcpWlr1SEqLN", "220907102626Z9hn7V0czFGcLUNmgRH", busObj);
      // 协办部门 -> 协办人
      setUserByDept("220914113825QAn2D1BIhGLjyuw7G0O", "220914112419cRJs1d73fBwkiwibXTJ", busObj);
    });

    function setUserByDept(deptMetaId, userMetaId, busObj) {
      if (busObj.metaData.metaId == deptMetaId) {
        dsf.http.post('fn/teacherPlatform/getDeptIdByUserId', { deptId: busObj.value }).done(res => {
          if (res.type == "success") {
            vueData.$set(formData.main, userMetaId, { text: res.data.text, value: res.data.value, schema: res.data.schema })
          }
        })
      }
    }
  }

  window.spJS = exportObj;
})();
