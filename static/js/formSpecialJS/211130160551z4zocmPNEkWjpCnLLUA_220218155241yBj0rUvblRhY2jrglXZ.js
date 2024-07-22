(function () {
  const exportObj = {};
  let storeData = {}, storeData_1 = {}, storeData_2 = {}
  let dianpu1 = ["JSYC_RS_APPLY_007", "JSYC_RS_APPLY_008", "JSYC_RS_APPLY_009", "JSYC_RS_APPLY_010"]
  let dianpu2 = ["220508015251w7pmDPAjMAEdkPOOTqj", "220121195321hwgOm6eRzFbld7lcD2k", "220121195507DbCbFSMp6ENDKrJCQte", "220121195618Zh61t8j6Zt7BWnUAckb"]
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 卷烟店铺列表
    vueData.commonPopParam = {
      params: {
        fileType: 'dpxkz',
        showFilterIcon: true,
        showSearch: true
      }
    }
    // 存储不同经营类型的上一次数据
    dsf.http.post('fn/retailer/getStoreData', {
      type: 1
    }).then(res => {
      if (res.data.code == 200) {
        storeData_1 = res.data.data
      }
    })
    dsf.http.post('fn/retailer/getStoreData', {
      type: 2
    }).then(res => {
      if (res.data.code == 200) {
        storeData_2 = res.data.data
      }
    })
    // 根据店铺许可证号 设置其余店铺字段
    function setShopLicenseInfo(shopLicense) {
      dsf.http.post('fn/retailer/getMobileListData', {
        query_licNo: shopLicense
      }).then(res => {
        vueData.$set(formData.main, "JSYC_RS_APPLY_008", { value: res.data.datas[0].dataValue.companyName })
        vueData.$set(formData.main, "JSYC_RS_APPLY_009", { value: res.data.datas[0].dataValue.managerName })
        vueData.$set(formData.main, "JSYC_RS_APPLY_010", { value: res.data.datas[0].dataValue.businessAddr })
      })
    }
    function controlsWhetherShow(flag) {
      dianpu1.forEach(item => { flagShow(item, !flag) })
      dianpu2.forEach(item => { flagShow(item, flag) })
      if (flag) {
        dianpu2.forEach(item => {
          if (vueData.notVaildateMetas.indexOf(item) > -1) {
            vueData.notVaildateMetas.splice(vueData.notVaildateMetas.indexOf(item), 1)
          }
        })
        dianpu1.forEach(item => {
          setEmptyValue(item)
          vueData.notVaildateMetas.push(item)
        })
        storeData = storeData_2
        if (storeData.DPXKZH) vueData.$set(formData.main, "220508015251w7pmDPAjMAEdkPOOTqj", { value: storeData.DPXKZH })
        if (storeData.dpmc) vueData.$set(formData.main, "220121195321hwgOm6eRzFbld7lcD2k", { value: storeData.dpmc })
        if (storeData.dpfzr) vueData.$set(formData.main, "220121195507DbCbFSMp6ENDKrJCQte", { value: storeData.dpfzr })
        if (storeData.dpjyd) vueData.$set(formData.main, "220121195618Zh61t8j6Zt7BWnUAckb", { value: storeData.dpjyd })

      } else {
        dianpu1.forEach(item => {
          if (vueData.notVaildateMetas.indexOf(item) > -1) {
            vueData.notVaildateMetas.splice(vueData.notVaildateMetas.indexOf(item), 1)
          }
        })
        dianpu2.forEach(item => {
          setEmptyValue(item)
          vueData.notVaildateMetas.push(item)
        })
        storeData = storeData_1
        if (storeData.shopLicense) {
          vueData.$set(formData.main, "JSYC_RS_APPLY_007", { value: storeData.shopLicense })
          setShopLicenseInfo(storeData.shopLicense)
        }
      }
    }
    function flagShow(metaId, flag) {
      formStruct.controls.find(item => item.metaId == metaId).show = flag
    }
    function setEmptyValue(metaId) {
      vueData.$set(formData.main, metaId, { value: "" })
    }
    // 拟稿时弹出承诺告知书
    if (!vueData.$route.params.pk || vueData.$route.query.todoId) {
      dsf.layer.confirm({
        title: '承诺告知书',
        message: `根据国家有关法律法规和行业政策纪律要求，为增强法纪意识和自律意识，切实履行规范经营各项规定，我自愿作如下明示承诺：
        一、不泄露商业信息或案件信息，为个人获取利益或造成企业重大损失、产生不良影响；
        二、不与零售户发生经济往来，不利用职权或工作之便，向客户借钱或推销商品；
        三、不利用职权或工作之便，以明显低于市场零售价向零售户收购卷烟；
        四、本人不从事或参与私人营利性卷烟零售活动，近亲属不在本人直接管理或服务范围内从事或参与私人营利性卷烟零售活动；
        五、不以批条销售、套购截留等方式插手卷烟零售；
        六、不直接或间接利用职权或工作之便，违反规定为亲属及其他特定关系人卷烟零售提供便利、谋取不当利益；
        七、不接受或索要利害关系人吃请、贿赂或其它消费；
        八、不损害企业利益、他人利益或行业形象的其他任何行为。
        <span style="color: red">请您务必认真阅读、充分理解《承诺告知书》相关条款，如无异议，点击“同意”如实申报；当亲属店或人员参与状态如有变化时，请主动及时申报。</span>`,
        confirmButtonText: '同意',
        cancelButtonText: '暂不申报',
        messageAlign: 'left'
      }, () => {
        // 拟稿时 经营类型默认设为卷烟 1
        vueData.$set(formData.main, "JSYC_RS_APPLY_001", {
          text: storeData_1.haveRs == '1' && storeData_1.shopStatus == '1' && (storeData_1.selfParticipate == '1' || storeData_1.relativeParticipate == '1') ? '是' : '否',
          value: storeData_1.haveRs == '1' && storeData_1.shopStatus == '1' && (storeData_1.selfParticipate == '1' || storeData_1.relativeParticipate == '1') ? '1' : '2'
        })
        if (storeData_1.haveRs == '1' && storeData_1.shopStatus == '1' && (storeData_1.selfParticipate == '1' || storeData_1.relativeParticipate == '1')) {
          vueData.$set(formData.main, "JSYC_RS_APPLY_024", { text: "卷烟", value: "1" })
          vueData.$set(formData.main, "220508014550Le0tK9LgWlBXPM1LTvB", { text: "省内", value: "1" })
        } else {
          vueData.$set(formData.main, "220508014550Le0tK9LgWlBXPM1LTvB", { text: "", value: "" })
        }
        storeData = storeData_1
        if (storeData_1.shopLicense) {
          vueData.$set(formData.main, "JSYC_RS_APPLY_007", { value: storeData_1.shopLicense })
          setShopLicenseInfo(storeData_1.shopLicense)
        }
      }, () => {
        vueData.backSucces()
      })
    }
    // 阅签列表打开的办结表单添加阅签按钮
    if (vueData.$route.query.verify == 1) {
      formStruct.buttons.mainButtons.unshift({
        name: '阅签',
        action: 'subBtnPopup',
        parameters: [{ name: '二级按钮', key: 'subButtons', value: `\{'name': '阅签通过', 'icon': '','action': 'retailerPass'};{'name': '阅签不通过', 'icon': '','action': 'retailerFail'\}` }]
      })
    }
    vueData.$bus.on("checkVal", function (busObj) {
      // 经营类型改变时，联动隐藏的字段置空
      if (busObj.metaData.metaId == "220508014550Le0tK9LgWlBXPM1LTvB") {
        if (busObj.value == 1 && formData.main["JSYC_RS_APPLY_024"].text == "卷烟") {
          controlsWhetherShow(0)
        } else if (busObj.value == 2 || formData.main["JSYC_RS_APPLY_024"].text == "电子烟") {
          controlsWhetherShow(1)
        }
      }
      // 是否有亲属店 为无时 店铺字段置空，为有时 经营类型默认为 卷烟
      if (busObj.metaData.metaId == "JSYC_RS_APPLY_001") {
        if (formData.main["JSYC_RS_APPLY_001"].value == 1) {
          vueData.$set(formData.main, "220508014550Le0tK9LgWlBXPM1LTvB", { text: "省内", value: "1" })
          storeData = storeData_1
          if (storeData_1.shopLicense) {
            vueData.$set(formData.main, "JSYC_RS_APPLY_007", { value: storeData_1.shopLicense })
            setShopLicenseInfo(storeData_1.shopLicense)
          }
        } else if (formData.main["JSYC_RS_APPLY_001"].value == 2) {
          vueData.$set(formData.main, "220508014550Le0tK9LgWlBXPM1LTvB", { text: "", value: "" })
          dianpu1.forEach(item => { setEmptyValue(item) })
          dianpu2.forEach(item => { setEmptyValue(item) })
        }
      }
      if (busObj.metaData.metaId == "JSYC_RS_APPLY_011" || busObj.metaData.metaId == "JSYC_RS_APPLY_005" || busObj.metaData.metaId == "JSYC_RS_APPLY_006") {
        let isDiffShopStatus = storeData.shopStatus && formData.main["JSYC_RS_APPLY_011"].value != storeData.shopStatus
        let isDiffSelfParticipate = storeData.selfParticipate && formData.main["JSYC_RS_APPLY_005"].value != storeData.selfParticipate
        let isDiffRelativeParticipate = storeData.relativeParticipate && formData.main["JSYC_RS_APPLY_006"].value != storeData.relativeParticipate
        console.log(isDiffShopStatus, isDiffSelfParticipate, isDiffRelativeParticipate)
        let reasonCtr = formStruct.controls.find(ctr => ctr.metaId == 'JSYC_RS_APPLY_022')
        if (isDiffShopStatus || isDiffSelfParticipate || isDiffRelativeParticipate) {
          vueData.$set(reasonCtr.validator, 'required', {})
          console.log(formStruct.controls.find(ctr => ctr.metaId == 'JSYC_RS_APPLY_022'))
          // formStruct.controls.find(ctr => ctr.metaId == 'JSYC_RS_APPLY_022').validator.required = {}
        } else {
          vueData.$set(reasonCtr.validator, 'required', null)
          delete reasonCtr.validator.required
        }
      }
      if (busObj.metaData.metaId == "JSYC_RS_APPLY_024") {
        console.log(busObj);
        if (busObj.text == "电子烟" || formData.main["220508014550Le0tK9LgWlBXPM1LTvB"].text == "省外") {
          controlsWhetherShow(1)
        } else if (busObj.text == "卷烟" && formData.main["220508014550Le0tK9LgWlBXPM1LTvB"].text == "省内") {
          controlsWhetherShow(0)
        }
      }
    })
    // 点击店铺许可证输入框 弹出列表选择，带出店铺信息
    vueData.$bus.on("focusBus", function (busObj) {
      if (busObj.metaData.metaId == "JSYC_RS_APPLY_007") {
        vueData.commonPop = true
      }
    })
  }
  exportObj.choose = function (checkItems, vueData) {
    console.log("choose", checkItems);
    vueData.commonPop = false;
    vueData.$set(vueData.formData.main, "JSYC_RS_APPLY_007", { value: checkItems[0].dataValue.licNo })
    vueData.$set(vueData.formData.main, "JSYC_RS_APPLY_008", { value: checkItems[0].dataValue.companyName })
    vueData.$set(vueData.formData.main, "JSYC_RS_APPLY_009", { value: checkItems[0].dataValue.managerName })
    vueData.$set(vueData.formData.main, "JSYC_RS_APPLY_010", { value: checkItems[0].dataValue.businessAddr })
  }
  exportObj.retailerSend = function (formData, formStruct, vueData) {
    console.log(vueData)
    vueData.btnAction("send")
  }
  exportObj.retailerPass = function (formData, formStruct, vueData) {
    console.log("阅签通过")
    dsf.http.post('/fn/InnerTubeReview/updateAuditStatusByType', {
      type: 2,
      ids: formStruct.parameters.pk
    }).then(res => {
      if (res.data.code == 200) {
        dsf.layer.toast('阅签通过')
        vueData.backSucces()
      } else {
        dsf.layer.toast(res.data.message)
      }
    })
  }
  exportObj.retailerFail = function (formData, formStruct, vueData) {
    console.log("阅签不通过")
    dsf.layer.confirm({
      title: "阅签不通过",
      message: '<textarea rows="3" id="failReason" placeholder="请填写阅签不通过原因" class="van-field__control" style="border: 1px solid #ddd; padding: 6px"></textarea>',
    }, () => {
      console.log(document.getElementById('failReason').value)
      dsf.http.post('/fn/InnerTubeReview/updateAuditStatusByType', {
        type: -1,
        ids: formStruct.parameters.pk,
        backReason: document.getElementById('failReason').value
      }).then(res => {
        if (res.data.code == 200) {
          dsf.layer.toast('阅签不通过')
          vueData.backSucces()
        } else {
          dsf.layer.toast(res.data.message)
        }
      })
    }, () => {
    })
  }
  exportObj.ViewAttachments = function (formData, formStruct, vueData) {
    vueData.notVaildateMetas = formStruct.controls.map(control => control.metaId)
    vueData.buttonHandle['saveNoTip'](
      vueData.$route.params,
      vueData.formMeta,
      vueData.formData,
      vueData,
      function () {
        if (!vueData.$route.params.pk) {
          vueData.$router.replace({
            path: `/commonForm/211130160551z4zocmPNEkWjpCnLLUA/${formStruct.parameters.pk}`,
            query: vueData.$route.query
          })
        }
        vueData.$router.push('/commonForm/211130160551z4zocmPNEkWjpCnLLUA/220506180007g2cOryyZN4WiPOZYxpC?formId=220222141728C34YtW5Vp37ViScWo82&nodeId=-1&listId=innerTuber&validateByList=1')
      },
      false
    )
  }
  window.spJS = exportObj;
})();
