(function () {
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
      // 选择日期带出子表
      vueData.$bus.on("selectDateTime", function (busObj) {
        if (busObj.metaData.metaId == 'B0013') {
            //清空子表
            if (formData.multinfos["22081016362288GtGhc0vt2pkD8p817"].rows.length>0) {
                formData.multinfos["22081016362288GtGhc0vt2pkD8p817"].rows = []
            }           
            // 获取信息
            dsf.http.post('ctrl/backSchool/getVacationLeaver', {
                dept: formData.main['B0010'].value,
                date: busObj.value
            }).then(res => {
                if (res.data.code == 200) {
                    let userInfo = res.data.data
                        // 新增子表信息
                   if (userInfo.data.length>0) {
                    userInfo.data.forEach(item => {
                        if (vueData.$refs.formTab[0]) {
                            vueData.$refs.formTab[0].$refs['22081016362288GtGhc0vt2pkD8p817'][0].$refs.subform.addCard(false).then((newData) => {
                                vueData.$set(newData,"220810155408QORgHPLk5OHVG0Z32t5",{value:item.ngr})
                                vueData.$set(newData,"220810155635pSZ2ga1GIGFpCH1D4a2",{value:item.qjlx_text})
                                vueData.$set(newData,"220810160119xNOFNtt10yAwqI83yJk",{value:item.qjsy})
                            })
                        }
                    });
                   }else{
                    dsf.layer.toast("无请假人员信息")
                   }
                }
            })
        }
      });
    }
    window.spJS=exportObj;
  })();
  