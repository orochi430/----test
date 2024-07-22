//杭州市委党校  月度计划表单
const exportObj = {};

function filterTime(time) {
  var str = time.replace(/-/g, "/")
  return Date.parse(str)
}
exportObj.handle = function (formData, formStruct) {}
exportObj.initHandle = function (formData, formStruct, vueData) {
  if (!vueData.pk) {
    vueData.$set(vueData.formData.main, "B0019", {
      value: dsf.date.format(new Date((new Date).getFullYear(), (new Date).getMonth() + 1, 1, 12), 'yyyy-mm')
    })
    dsf.http.post('fn/monthlyPlanSummary/lastMonthPlan').then(res => {
      if (res.data.code == 200) {
        if (res.data.data.length > 0) {
          vueData.$nextTick(async () => {
            for (let index = 0; index < res.data.data.length; index++) {
              const data = res.data.data[index];
              await vueData.$refs.formTab[0].$refs['2107091625010OyTRp72CGeuUomxxGs'][0].$refs.subform.addCard()
              vueData.formData.multinfos['2107091625010OyTRp72CGeuUomxxGs'].rows[index]['21070917005992zsYqABlKOF5PdkfMl'].value = data.important
              vueData.formData.multinfos['2107091625010OyTRp72CGeuUomxxGs'].rows[index]['210709151314EZ10iFoYDBKSs067RZc'].value = data.gzjh
            }
          })
        }
      }
    })
  }

  vueData.$bus.on("selectDateTime", function (busObj) {
    if (busObj.metaData.metaId == "B0013") {
      let B0013=new Date(filterTime(busObj.value));
      vueData.$set(vueData.formData.main, "B0019", {
        value: dsf.date.format(new Date(B0013.getFullYear(), B0013.getMonth() + 1, 1, 12), 'yyyy-mm')
      })

      vueData.$set(vueData.formData.main, "B0013", {
        value: dsf.date.format(filterTime(busObj.value), "yyyy-mm")
      })
      if (vueData.formData.main["B0019"].value) {
        let start = filterTime(formData.main["B0013"].value + "-01")
        let end = filterTime(formData.main["B0019"].value + "-01")
        console.log(start, end)
        let utc = end - start;
        console.log(utc)
        let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1
        console.log(dayTimes)
        if (dayTimes > 0) {} else {
          vueData.$set(vueData.formData.main, "B0019", {
            value: ""
          })
          dsf.layer.toast("计划月度时间不能小于总结月度时间")
        }
      }
    }
    if (busObj.metaData.metaId == "B0019") {
      vueData.$set(vueData.formData.main, "B0019", {
        value: dsf.date.format(filterTime(busObj.value), "yyyy-mm")
      })
      if (vueData.formData.main["B0013"].value) {
        let start = filterTime(formData.main["B0013"].value + "-01")
        let end = filterTime(formData.main["B0019"].value + "-01")
        console.log(start, end)
        let utc = end - start;
        console.log(utc)
        let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1
        console.log(dayTimes)
        if (dayTimes > 0) {} else {
          vueData.$set(vueData.formData.main, "B0019", {
            value: ""
          })
          dsf.layer.toast("计划月度时间不能小于总结月度时间")
        }
      }
    }
  })

}

//保存后事件
exportObj.saveAfter = function (vueData, formStruct, formData) {
  let startTime = filterTime(formData.main["B0013"].value)
  let endTime = filterTime(formData.main["B0019"].value)
  vueData.$set(vueData.formData.main, "B0013", {
    value: dsf.date.format(startTime, "yyyy-mm")
  })
  vueData.$set(vueData.formData.main, "B0019", {
    value: dsf.date.format(endTime, "yyyy-mm")
  })

  vueData.$eventBus.refresh(vueData, {
    text: 123
  });
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    if (action == "save" || action == "send") {
      let title=`${formData.main["B0010"].value}${formData.main["B0013"].value.replace('-','年')}月份重点工作完成情况及${formData.main["B0019"].value.replace('-','年')}月份工作计划`
      vueData.$set(vueData.formData.main, "B0001", {
        value: title
      })
      formData.main["B0013"].value
      let startTime = filterTime(formData.main["B0013"].value + "-01")
      let endTime = filterTime(formData.main["B0019"].value + "-01")
      vueData.$set(vueData.formData.main, "B0013", {
        value: dsf.date.format(startTime, "yyyy-mm-dd")
      })
      vueData.$set(vueData.formData.main, "B0019", {
        value: dsf.date.format(endTime, "yyyy-mm-dd")
      })
    }
    resolve()
  })
}

export default exportObj;
