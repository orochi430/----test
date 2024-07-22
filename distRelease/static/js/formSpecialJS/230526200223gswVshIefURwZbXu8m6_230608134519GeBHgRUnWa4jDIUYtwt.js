// 一体化财政局 发文
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    function jisuan() {
      let arr = []
      let sum = 0
      arr.splice(
        0,
        1,
        formData.main["B0014"].value,
        formData.main["C-FW-0073"].value,
        formData.main["C-FW-0074"].value,
        formData.main["230626103620eDkfM6g6KmITDHQ9vCy"].value,
        formData.main["230626103744cNkYjf0lCfbycQaJKLF"].value
      )

      sum = arr.reduce((prev, cur) => {
        if (!isNaN(Number(cur))) {
          return Number(prev) + Number(cur)
        } else {
          return Number(prev)
        }
      }, 0)
      vueData.$set(formData.main, "C-FW-0075", { value: sum })
    }
    jisuan()
    vueData.$bus.$off("inpBus").on("inpBus", function (busObj) {
      if (
        busObj.metaData.metaId == "B0014" ||
        busObj.metaData.metaId == "C-FW-0073" ||
        busObj.metaData.metaId == "C-FW-0074" ||
        busObj.metaData.metaId == "230626103620eDkfM6g6KmITDHQ9vCy" ||
        busObj.metaData.metaId == "230626103744cNkYjf0lCfbycQaJKLF"
      ) {
        jisuan()
      }
    })
    vueData.$bus.on("changeFileCode", function (busObj) {
      if (busObj.metaData.metaId == "B0003") {
        /**
         * 1)政策法规文件（C-FW-0062）：“是”；
         * 2)是否规范性文件（C-FW-0033）：“是”；
         * 3)查询范围（C-FW-0064）：“社会公开”；
         * 4)主题（C-FW-0078）：政策法规类；
         * 5)备案号（B0048）：沪财发备字；
         * 6)内部抄送（C-GW-FW-0103）：公开办；
         * 7)份数（C-FW-0074）：2。
         */
        if (busObj.ruleid == "230729203632nlg9NRDNspOq01LgpOF") {
          vueData.$set(formData.main, "C-FW-0062", { value: "1", text: "是" })
          vueData.$set(formData.main, "C-FW-0033", { value: "1", text: "是" })
          vueData.$set(formData.main, "C-FW-0064", { value: "0", text: "社会公开" })
          vueData.$set(formData.main, "C-FW-0078", { value: "1", text: "政策法规类" })
          vueData.$set(formData.main, "B0048", { value: "沪财发备字" })
          vueData.$set(formData.main, "C-FW-0103", { value: "10", text: "公开办" })
          vueData.$set(formData.main, "C-FW-0074", { value: 2 })
          jisuan()
        } else {
          vueData.$set(formData.main, "C-FW-0062", { value: "", text: "" })
          vueData.$set(formData.main, "C-FW-0033", { value: "", text: "" })
          vueData.$set(formData.main, "C-FW-0064", { value: "", text: "" })
          vueData.$set(formData.main, "C-FW-0078", { value: "", text: "" })
          vueData.$set(formData.main, "B0048", { value: "" })
          vueData.$set(formData.main, "C-FW-0103", { value: "", text: "" })
          vueData.$set(formData.main, "C-FW-0074", { value: "" })
          jisuan()
        }
      }
    })
    let CGWFW0104_Ctr = formStruct.controls.find(control => control.metaId == 'C-GW-FW-0104')
    // vueData.$set(CGWFW0104_Ctr.extra.tabs[0], 'action', CGWFW0104_Ctr.extra.tabs[0].action += `&excludeIds=${formData.main['A0013']}`)
    CGWFW0104_Ctr.extra.tabs[0].action += `&perPro=${formData.main['A0013'].value}`
  }
  // 流转情况-新
  exportObj.custom5 = function (formData, formStruct, vueData) {
    vueData.componentName = "movingSituationDialog";
  }
  window.spJS = exportObj
})()
