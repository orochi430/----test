


// 克拉玛依 差旅费用报销单
(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {

    //出差天数
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "C-ERP-CLFBX-0028" || busObj.metaData.metaId == "C-ERP-CLFBX-0029") {
        let startTime = formData.main["C-ERP-CLFBX-0028"].value
        let endTime = formData.main["C-ERP-CLFBX-0029"].value
        if (startTime && endTime) {
          let day = Math.floor((dsf.date.parse(endTime) - dsf.date.parse(startTime)) / (24 * 3600 * 1000)) + 1;
          vueData.$set(formData.main, "C-ERP-CLFBX-0030", { value: day })
        }
      }
    })

    let foodPeopleNum = formData.main["C-ERP-CLFBX-0004"].value
    let foodDay = formData.main["C-ERP-CLFBX-0010"].value
    let foodCost = formData.main["2311082034011kV3nqbktwybBJxwfov"].value
    let boardExpenses = 0 //伙食费
    //交通费
    vueData.$bus.on("inpBus", function (busObj) {
      if (busObj.metaData.metaId == "C-ERP-CLFBX-0002" || busObj.metaData.metaId == "C-ERP-CLFBX-0015") {
        let peopleNum = formData.main["C-ERP-CLFBX-0002"].value
        let day = formData.main["C-ERP-CLFBX-0015"].value
        let cost = formData.main["C-ERP-CLFBX-0006"].value
        if (peopleNum && day && cost) {
          let transportation = Number(peopleNum) * Number(day) * Number(cost)
          vueData.$set(formData.main, "C-ERP-CLFBX-0008", { value: transportation })
        }
      }
      //伙食费
      if (busObj.metaData.metaId == "C-ERP-CLFBX-0004" || busObj.metaData.metaId == "C-ERP-CLFBX-0010") {
        foodPeopleNum = formData.main["C-ERP-CLFBX-0004"].value
        foodDay = formData.main["C-ERP-CLFBX-0010"].value
        foodCost = formData.main["2311082034011kV3nqbktwybBJxwfov"].text
        if (foodPeopleNum && foodDay && foodCost) {
          boardExpenses = Number(foodPeopleNum) * Number(foodDay) * Number(foodCost)
          vueData.$set(formData.main, "C-ERP-CLFBX-0012", { value: boardExpenses })
        }
      }
      let allCostItem = ["C-ERP-CLFBX-0022", "C-ERP-CLFBX-0023", "C-ERP-CLFBX-0001", "C-ERP-CLFBX-0024", "C-ERP-CLFBX-0008", "C-ERP-CLFBX-0012", "C-ERP-CLFBX-0007", "C-ERP-CLFBX-0025", "C-ERP-CLFBX-0005", "C-ERP-CLFBX-0013"]
      if (allCostItem.includes(busObj.metaData.metaId)) {
        let allCost = 0
        allCostItem.forEach(val => {
          if (formData.main[val].value) allCost += Number(formData.main[val].value)
        })
        vueData.$set(formData.main, "C-ERP-CLFBX-0018", { value: dsf.util.amountWords(allCost) })
        vueData.$set(formData.main, "C-ERP-CLFBX-0032", { value: allCost })
        vueData.$set(formData.main, "C-ERP-CLFBX-0011", { value: allCost })

      }
    })
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "2311082034011kV3nqbktwybBJxwfov") {
        foodPeopleNum = formData.main["C-ERP-CLFBX-0004"].value
        foodDay = formData.main["C-ERP-CLFBX-0010"].value
        foodCost = formData.main["2311082034011kV3nqbktwybBJxwfov"].text
        if (foodPeopleNum && foodDay && foodCost) {
          boardExpenses = Number(foodPeopleNum) * Number(foodDay) * Number(foodCost)
          vueData.$set(formData.main, "C-ERP-CLFBX-0012", { value: boardExpenses })
        }
      }
    })


  }

  window.spJS = exportObj
})()
