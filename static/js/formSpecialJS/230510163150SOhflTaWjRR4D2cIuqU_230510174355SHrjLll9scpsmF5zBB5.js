// 一体化 请假
;(function () {
  const exportObj = {}
  function filterTime(time) {
      var str = time.replace(/-/g, "/")
      return Date.parse(str)
    }
    function count(start, end, startH, endH, lType) {
      return new Promise((resolve, reject) => {
        dsf.http
          .post("ctrl/leave/approval/calcDays", {
            start: start,
            end: end,
            startH: startH,
            endH: endH,
            lType: lType
          })
          .then(res => {
            if (res.data.code == 200) {
              resolve(res.data.data)
            } else {
              reject()
            }
          })
          .catch(err => {
            reject()
          })
      })
    }
    function leaveCount(start, end, startH, endH, lType) {
      return new Promise((resolve, reject) => {
        dsf.http
          .post("ctrl/leave/approval/leaveTypeCalcDays", {
            start: start,
            end: end,
            startH: startH,
            endH: endH,
            lType: lType
          })
          .then(res => {
            if (res.data.code == 200) {
              resolve(res.data.data)
            } else {
              reject()
            }
          })
          .catch(err => {
            reject()
          })
      })
    }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    let dataText = null
    if (formStruct.parameters.nodeId == "TsCvDrsoPsjFGoo"){ // 销假节点
      dsf.http.post("ctrl/leaveController/getCode").then(res => {
        if ("success" == res.data.type) {
          dataText = res.data.data;
        }
      })
    }
    console.log(vueData.formData)
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "C-LEAVE-0002" || busObj.metaData.metaId == "C-LEAVE-0003") { // 请假开始结束日期
        let start = formData.main["C-LEAVE-0002"].value
        let end = formData.main["C-LEAVE-0003"].value
        let startH = formData.main["C-LEAVE-0004"].value
        let endH = formData.main["C-LEAVE-0005"].value
        let lType = formData.main["C-LEAVE-0001"].value
        if (start && end && filterTime(start) > filterTime(end)) {
          vueData.$set(formData.main, "C-LEAVE-0003", { value: "" })
          dsf.layer.toast("请假结束时间不能小于请假开始时间")
        } else if (start && end && startH && endH) {
          if (lType) { // 请假类型不为空
            count(start, end, startH, endH).then(data => {
              vueData.$set(formData.main, "C-LEAVE-0006", { value: data.sum })
              vueData.$set(formData.main, "C-LEAVE-0007", { value: data.work })
            })
          }
        }
      } else if (busObj.metaData.metaId == "C-LEAVE-0036") { // 销假时间
        let reportType = formData.main["C-LEAVE-0037"].value
        let startH = formData.main["C-LEAVE-0004"].value
        if (reportType) {
            let startDate = formData.main["C-LEAVE-0002"].value
            let endDate = formData.main["C-LEAVE-0003"].value
            let type =formData.main["C-LEAVE-0004"]
            let endType = formData.main["C-LEAVE-0005"]
            let reportDate = formData.main["C-LEAVE-0036"].value
            vueData.$set(formData.main, "C-LEAVE-0012", {value: startDate});
            vueData.$set(formData.main, "C-LEAVE-0014", type);
            if ((reportType == startH && startDate == reportDate) || reportDate < startDate || (reportType < startH && startDate == reportDate)) {
                vueData.$set(formData.main, "C-LEAVE-0036", {value: ''});
                vueData.$set(formData.main, "C-LEAVE-0013", {value: endDate});
                vueData.$set(formData.main, "C-LEAVE-0015", endType);
                dsf.layer.toast("销假时间不能小于等于请假开始时间！");
            } else {
                if (reportType == 2) {
                    vueData.$set(formData.main, "C-LEAVE-0013", {value: reportDate});
                    if (dataText) {
                        vueData.$set(formData.main, "C-LEAVE-0015", dataText[0]);
                    }
                } else if (reportType == 1) {
                    let dateTime = new Date(reportDate);
                    dateTime = dateTime.setDate(dateTime.getDate() - 1);
                    dateTime = new Date(dateTime);
                    vueData.$set(formData.main, "C-LEAVE-0013", {value: dsf.date.format(dateTime, 'yyyy-mm-dd')});
                    if (dataText) {
                        vueData.$set(formData.main, "C-LEAVE-0015", dataText[1]);
                    }
                }
                let start = formData.main["C-LEAVE-0012"].value
                let startH = formData.main["C-LEAVE-0014"].value
                let end = formData.main["C-LEAVE-0013"].value
                let endH = formData.main["C-LEAVE-0015"].value
                let lType = formData.main["C-LEAVE-0001"].value
                leaveCount(start,end,startH,endH,lType).then(data => {
                  vueData.$set(formData.main, "C-LEAVE-0016", { value: data.sum })
                  vueData.$set(formData.main, "C-LEAVE-0058", { value: data.work })
                })
            }
        }
      }
    })
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "C-LEAVE-0004" || busObj.metaData.metaId == "C-LEAVE-0005") { // 请假开始结束时段
        let start = formData.main["C-LEAVE-0002"].value
        let end = formData.main["C-LEAVE-0003"].value
        let startH = formData.main["C-LEAVE-0004"].value
        let endH = formData.main["C-LEAVE-0005"].value
        let lType = formData.main["C-LEAVE-0001"].value
        if (start && end && startH && endH) {
          if (start == end && startH > endH) {
            vueData.$set(formData.main, busObj.metaData.metaId, { value: "", text: '' })
            dsf.layer.toast("请假结束时间不能小于请假开始时间")
            return
          }
          if (lType) { // 请假类型不为空
            count(start, end, startH, endH, lType)
            .then(data => {
              vueData.$set(formData.main, "C-LEAVE-0006", { value: data.sum })
              vueData.$set(formData.main, "C-LEAVE-0007", { value: data.work })
            })
            .catch(err => {
              console.log(err)
            })
          }

        }
      } else if (busObj.metaData.metaId == "C-LEAVE-0037") { // 销假时间
        let reportType = formData.main["C-LEAVE-0037"].value
        let startH = formData.main["C-LEAVE-0004"].value
        if (reportType) {
            let startDate = formData.main["C-LEAVE-0002"].value
            let endDate = formData.main["C-LEAVE-0003"].value
            let type =formData.main["C-LEAVE-0004"]
            let endType = formData.main["C-LEAVE-0005"]
            let reportDate = formData.main["C-LEAVE-0036"].value
            vueData.$set(formData.main, "C-LEAVE-0012", {value: startDate});
            vueData.$set(formData.main, "C-LEAVE-0014", type);
            if ((reportType == startH && startDate == reportDate) || reportDate < startDate || (reportType < startH && startDate == reportDate)) {
                vueData.$set(formData.main, "C-LEAVE-0037", {value: ''});
                vueData.$set(formData.main, "C-LEAVE-0013", {value: endDate});
                vueData.$set(formData.main, "C-LEAVE-0015", endType);
                dsf.layer.toast("销假时间不能小于等于请假开始时间！");
            } else {
                if (reportType == 2) {
                    vueData.$set(formData.main, "C-LEAVE-0013", {value: reportDate});
                    if (dataText) {
                        vueData.$set(formData.main, "C-LEAVE-0015", dataText[0]);
                    }
                } else if (reportType == 1) {
                    let dateTime = new Date(reportDate);
                    dateTime = dateTime.setDate(dateTime.getDate() - 1);
                    dateTime = new Date(dateTime);
                    vueData.$set(formData.main, "C-LEAVE-0013", {value: dsf.date.format(dateTime, 'yyyy-mm-dd')});
                    if (dataText) {
                        vueData.$set(formData.main, "C-LEAVE-0015", dataText[1]);
                    }
                }
                let start = formData.main["C-LEAVE-0012"].value
                let startH = formData.main["C-LEAVE-0014"].value
                let end = formData.main["C-LEAVE-0013"].value
                let endH = formData.main["C-LEAVE-0015"].value
                let lType = formData.main["C-LEAVE-0001"].value
                leaveCount(start,end,startH,endH,lType).then(data => {
                  vueData.$set(formData.main, "C-LEAVE-0016", { value: data.sum })
                  vueData.$set(formData.main, "C-LEAVE-0058", { value: data.work })
                })
            }
        }
      } else if (busObj.metaData.metaId == "C-LEAVE-0001") { // 请假类型
        if (busObj.value == "230510233116KksWNoYo7lSgQCiglvB" || busObj.value == "1") {
          dsf.http.post("ctrl/leave/approval/pcYearLeaveStatistic", { year: new Date().getFullYear() }).then(res => {
            if (res.data.code == 200) {
              dsf.layer.confirm({
                title: "年假余额",
                message: `年假剩余天数：今年共${res.data.data.thisYear}天，其中（今年剩余${res.data.data.thisYearUsed}天，去年共${res.data.data.lastYear}天，去年剩余${res.data.data.lastYearUsed}天）`,
                messageAlign: "left"
              })
            }
          })
        }
      }
    })
    $('#ctr_F1YIPzbaJHM3D4hQ').on('click', function () {
      vueData.componentName = 'myLeaveDialog'

    })
  }
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
      if (vueData.formMeta.parameters.nodeId == '' || vueData.formMeta.parameters.nodeId == '0' || vueData.formMeta.parameters.nodeId == '-2' || vueData.formMeta.parameters.nodeId == 'tJ9xHjGSYO54Yb0') {
        let ksrq = formData.main["C-LEAVE-0002"].value
        let jsrq = formData.main["C-LEAVE-0003"].value
        let qjlx = formData.main["C-LEAVE-0001"].value
        let gj = formData.main["C-LEAVE-0006"].value
        let pk = vueData.formParams.pk
        dsf.http.post('ctrl/leave/approval/leaveSavingVerification', {
          "ksrq": ksrq,
          "jsrq": jsrq,
          "qjlx": qjlx,
          "gj": gj,
          "pk": pk
        }).then(res => {
          if (res.data.code == 200) {
            resolve()
          } else {
            reject(res.data.message)
          }
        })
      } else {
        resolve()
      }
    })
  }
  window.spJS = exportObj
})()
