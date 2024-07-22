// 【中共徐州市委党校】移动端-日常支出预算申请
const exportObj = {};

exportObj.initHandle = async function (formData, formStruct, vueData) {
  // 若主表培训费未填写金额，则子表培训费申请明细表不做展示
  if(formStruct.parameters.nodeId != '0' && !formData.main["C-ERP-PAYCOST-0065"].value) {
    vueData.$set(formStruct.controls.find( item => item.metaId == "220620164545lo81BPD5xDN0bG5CI2p"),"propertyShow",0)
  }
  vueData.$bus.on("blurBus", function(busObj) {
    console.log(busObj)
    if (busObj.subFormId == '220620164521zyt3PWEkqUlY1Jb7qgO') {
      if (busObj.metaData.metaId == "GWJDF_004") { // 金额
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        let total = 0
        vueData.formData.multinfos[busObj.subFormId].rows.forEach(item => {
          total += Number(item["GWJDF_004"].value)
        })
        if (total > formData.main["C-ERP-PAYCOST-0023"].value) {
          dsf.layer.toast('金额相加不能大于公务接待费用')
          vueData.$set(subFormMain, 'GWJDF_004', {value: ''})
        }
      } 
    } else if (busObj.subFormId == '220620164545lo81BPD5xDN0bG5CI2p') {
      if (busObj.metaData.metaId == "C-QT-CUSTOM-0006") { // 金额
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        let total = 0
        vueData.formData.multinfos[busObj.subFormId].rows.forEach(item => {
          total += Number(item["C-QT-CUSTOM-0006"].value)
        })
        if (total > formData.main["C-ERP-PAYCOST-0065"].value) {
          dsf.layer.toast('经费开支相加不能大于培训费用')
          vueData.$set(subFormMain, 'C-QT-CUSTOM-0006', {value: ''})
        }
      } 
    } else if (busObj.subFormId == '220620164637rqpnv6b8S3RcV7ztoLW') {
      if (busObj.metaData.metaId == "YGCG_SQ_003") { // 金额
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        let total = 0
        vueData.formData.multinfos[busObj.subFormId].rows.forEach(item => {
          total += Number(item["YGCG_SQ_003"].value)
        })
        if (total > formData.main["C-ERP-PAYCOST-0042"].value) {
          dsf.layer.toast('金额相加不能大于因公出国（境）费用')
          vueData.$set(subFormMain, 'YGCG_SQ_003', {value: ''})
        }
      } 
    } else if (busObj.subFormId == '220620164703fScY1p502Lg1b7Ppi6R') {
      if (busObj.metaData.metaId == "GMFW_SQ_001") { // 金额
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        let total = 0
        vueData.formData.multinfos[busObj.subFormId].rows.forEach(item => {
          total += Number(item["GMFW_SQ_001"].value)
        })
        if (total > formData.main["C-ERP-PAYCOST-0069"].value) {
          dsf.layer.toast('金额相加不能大于购买服务费用')
          vueData.$set(subFormMain, 'GMFW_SQ_001', {value: ''})
        }
      } 
    } else if (busObj.subFormId == '2206201646076gxHoFZUdwJLveQzZXX') {
      if (busObj.metaData.metaId == "CLF_SQ_003") { // 金额
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        let total = 0
        vueData.formData.multinfos[busObj.subFormId].rows.forEach(item => {
          total += Number(item["CLF_SQ_003"].value)
        })
        if (total > formData.main["C-ERP-PAYCOST-0022"].value) {
          dsf.layer.toast('总额相加不能大于差旅费用')
          vueData.$set(subFormMain, 'CLF_SQ_003', {value: ''})
        }
      } 
    } else if (busObj.subFormId == '2206201646216ilcFK8WL2QQj6i1fJS') {
      if (busObj.metaData.metaId == "HYF_SQ_004") { // 金额
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        let total = 0
        vueData.formData.multinfos[busObj.subFormId].rows.forEach(item => {
          total += Number(item["HYF_SQ_004"].value)
        })
        if (total > formData.main["C-ERP-PAYCOST-0064"].value) {
          dsf.layer.toast('经费开支相加不能大于会议费用')
          vueData.$set(subFormMain, 'HYF_SQ_004', {value: ''})
        }
      } 
    } else if (busObj.subFormId == '2206201646501VY3Wij53idm0oVHQzk') {
      if (busObj.metaData.metaId == "BGSB_CGSQ_002") { // 金额
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        let total = 0
        vueData.formData.multinfos[busObj.subFormId].rows.forEach(item => {
          total += Number(item["BGSB_CGSQ_002"].value)
        })
        if (total > formData.main["C-ERP-PAYCOST-0002"].value) {
          dsf.layer.toast('总价相加不能大于办公设备采购费用')
          vueData.$set(subFormMain, 'BGSB_CGSQ_002', {value: ''})
        }
      } 
    }
	})

}

export default exportObj;
