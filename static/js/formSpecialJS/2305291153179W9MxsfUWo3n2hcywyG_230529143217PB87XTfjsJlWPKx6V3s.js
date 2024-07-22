// 驻京办 工作周报
;(function () {
  const exportObj = {}
  function setDay(day) {
    switch (day) {
      case 0:
        return '周日'
      case 1:
        return '周一'
      case 2:
        return '周二'
      case 3:
        return '周三'
      case 4:
        return '周四'
      case 5:
        return '周五'
      case 6:
        return '周六'
      case 7:
        return '周日'
    }
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    formStruct.subform['230529115854RcFymGbrpTqmHENsm7D'].controls.find(item => item.metaId == 'LabelForTextControl').showLable = false
    formStruct.subform['230529115854RcFymGbrpTqmHENsm7D'].controls.find(item => item.metaId == 'B0025').show = 0
    formStruct.subform['230529115854RcFymGbrpTqmHENsm7D'].controls.find(item => item.metaId == 'B0060').show = 0
    formData.multinfos['230529115854RcFymGbrpTqmHENsm7D'].rows.forEach(row => {
      row.structControl[0].label = row['B0060'].value + row['B0025'].value
      row.structControl.find(item => item.metaId == 'LabelForTextControl').showLable = false
      row.structControl.find(item => item.metaId == 'B0025').show = 0
      row.structControl.find(item => item.metaId == 'B0060').show = 0
    })
    vueData.$bus.on("clickDateTime", function (busObj) {
      console.log(busObj)
      vueData.componentName = 'chooseWeek'
    })
    vueData.$bus.on("chooseWeek", function (busObj) {
      dsf.http.post('ctrl/workLog/checkWeek', {
        pk: formStruct.parameters.pk,
        startDate: busObj.week.sdate
      }).then(res => {
        if (res.data.code == 200) {
          vueData.$set(formData.main, 'C-WEEKLY-REPORT-0001', {value: busObj.week.sdate})
          vueData.$set(formData.main, 'C-WEEKLY-REPORT-0002', { value: busObj.week.edate })
          formData.multinfos['230529115854RcFymGbrpTqmHENsm7D'].rows.forEach((row, index) => {
            let day = setDay(moment(busObj.week.sdate).add(index, "days").day())
            let date = moment(busObj.week.sdate).add(index,"days").format("YYYY-MM-DD")
            row.structControl[0].label = date + day
            row['B0025'] = {value: day}
            row['B0060'] = {value: date}
          })
        } else {
          dsf.layer.toast(res.data.message)
        }
      })
    })
    vueData.$bus.on("subFormAdd", function (busObj) {
      busObj.newData.structControl[0].label = setDay(busObj.index + 1)
      busObj.newData['B0025'] = {value: setDay(busObj.index + 1)}
    })
  }

  window.spJS = exportObj
})()
