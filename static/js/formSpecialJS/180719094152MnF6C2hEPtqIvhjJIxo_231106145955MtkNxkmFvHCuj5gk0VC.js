;(function () {
  // 静安 个人日程
  const exportObj = {}

  exportObj.saveAfter = function (vueData, formData, formStruct) {
    vueData.$eventBus.refreshSchedule(vueData) // 事件总线的日程刷新事件通知
    dsf.layer.toast("日程保存成功", undefined, () => vueData.$router.go(-1))
  }

  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (vueData.$route.query.defaultDate) {
      let s = vueData.$route.query.defaultDate + " " + formData.main["C-RC-0003"].value.split(" ")[1]
      let e = vueData.$route.query.defaultDate + " " + formData.main["C-RC-0004"].value.split(" ")[1]

      vueData.$set(formData.main["C-RC-0003"], "value", s)
      vueData.$set(formData.main["C-RC-0004"], "value", e)
    }
    if (!vueData.$route.params.pk) {
      let s = moment()
      if (moment().minute() > 30) {
        s = moment().add(1, 'h').set('minute', 0).format('yyyy-MM-DD HH:mm')
      } else {
        s = moment().set('minute', 30).format('yyyy-MM-DD HH:mm')
      }
      let e = moment(s).add(1, 'h').format('yyyy-MM-DD HH:mm')
      vueData.$set(formData.main, "C-RC-0003", { value: s })
      vueData.$set(formData.main, "C-RC-0004", { value: e })
    }
    function change0016() {
			let sms = `日程事项：${formData.main["B0001"].value}将于${formData.main["C-RC-0003"].value}开始，请注意时间！`
			vueData.$set(formData.main["C-RC-0016"], "value", sms)
    }
    vueData.$bus.on("blurBus", function (busObj) {
			if (busObj.metaData.metaId == "B0001") {
				change0016()
			}
		})
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "C-RC-0003") {
        let e = moment(busObj.value).add(1, 'h').format('yyyy-MM-DD HH:mm')
        vueData.$set(formData.main, "C-RC-0004", { value: e })
				change0016()
      }
    })
  }
  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
      if (!formData.main["C-RC-0004"].value) {
        let end = formData.main["C-RC-0003"].value.split(" ")[0] + " 23:59"
        vueData.$set(formData.main, "C-RC-0004", { value: end })
      }
      resolve()
    })
  }

  exportObj.afterLogicDeleteXForm = function (formData, formStruct, vueData) {
    console.log("删除后")
    dsf.http.post("fn/schedulecenter/delScheduleRemind", { pk: formStruct.parameters.pk }).then(res => {
      if (res.data.code == 200) {
        vueData.$eventBus.refreshSchedule(vueData) // 事件总线的日程刷新事件通知
      }
    })
  }
  window.spJS = exportObj
})()
