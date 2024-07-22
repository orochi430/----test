/**
 * 一体化办公厅 请假申请
 */
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    let person = dsf.util.loadSessionStore("user")
    console.log(person)
    formStruct.controls.forEach(item => {
      if (item.metaId == "B0072") {
        item.show = 0
        vueData.notVaildateMetas.push(item.metaId)
      }
    })

    // 751 请假申请流程的“动态审核”节点，用户在移动端需要看到“主持工作同志”字段
    if ((person && person["careerRank"] == "5") || (formStruct.parameters.hasFlow == 1 && formData.main['B0072'].value)) {
      formStruct.controls.forEach(item => {
        if (item.metaId == "B0072") {
          item.show = 1
        }
      })
    }

    vueData.$bus.on("getUser", function (data) {
      console.log(data)
      console.log(formData)
      if (data.metaData.metaId == "B0072") {
        vueData.$bus.emit("codeSelect", `&excludeIds=${formData.main["B0051"].value}`)
      }
    })
  }

  exportObj.custom1 = function (formData, formStruct, vueData) {
    function toForm() {
      if (!vueData.$route.params.pk) {
        vueData.$router.replace(`/commonForm/${vueData.formMeta.parameters.moduleId}/${vueData.formMeta.parameters.pk}`)
        vueData.$router.push(`/commonForm/${vueData.formMeta.parameters.moduleId}/${vueData.formMeta.parameters.pk}?formId=231113185242je9XvECaNUEK9kLORlB`)
      } else if(vueData.formMeta.parameters.todoId) {
        vueData.$router.push(`/commonForm/${vueData.formMeta.parameters.moduleId}/${vueData.formMeta.parameters.pk}/1?todoId=${vueData.formMeta.parameters.todoId}&formId=231113185242je9XvECaNUEK9kLORlB`)
      }
    }
    vueData.buttonHandle["save"](
        vueData.$route.params,
        vueData.formMeta,
        vueData.formData,
        vueData,
        vueData.$refs,
        toForm
    );
  }
  //导出
  window.spJS = exportObj
})()
