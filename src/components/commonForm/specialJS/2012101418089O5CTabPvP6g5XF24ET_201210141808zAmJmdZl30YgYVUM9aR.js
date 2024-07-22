import dsf from "../../../common";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  // 手机端和pad端显示不同按钮
  if (dsf.config.clientType=='iPad') {
    formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter(item => item.action != 'BtnWriteOpinion')
  } else {
    formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter(item => item.action != 'HandWriteSignature')
  }
  console.log("公文")
  dsf.http.post('ctrl/opinionc/getUploadePrivilege',{}).then(res => {
    if(res.data.type != 'success') {
      formStruct.controls.find(item=>item.metaId=="attach-0").show = 0
    }
  })
  let attach20 = formStruct.controls.find(ctr => ctr.metaId == 'attach-20')
  // 是否发文 隐藏 附件控件
  if(formData.main['B0057'].value == -1) {
    attach20.show = 0
  }
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "B0057") {
      if(busObj.value == 1) {
        attach20.show = 1
      } else {
        attach20.show = 0
      }
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  let deptName = dsf.util.loadSessionStore("user").deptName
  let date = dsf.date.format(new Date(), 'yyyy-mm-dd hh:ii:ss')
  // 拟稿节点 意见文本域加上部门和时间
  if(!vueData.$route.params.pk && formData.main["201215171743Ci2h4cvsPBQOW1sEPaC"] && formData.main["201215171743Ci2h4cvsPBQOW1sEPaC"].value) {
    if(formData.main["201215171743Ci2h4cvsPBQOW1sEPaC"].value.indexOf(`\n\n${deptName}  `) == -1) {
      formData.main["201215171743Ci2h4cvsPBQOW1sEPaC"].value += `\n\n${deptName}  ${date}`
    }
  }
  return new Promise(function(resolve,reject){
    resolve()
  })
}

exportObj.documentFilingForm = function (formData, formStruct, vueData) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: vueData.moduleId,
      pk: vueData.pk
    },
    query: {
      listId: "2203111616406YYuRaVY01Q9grPHERB",
      method: "showCY"
    }
  })
}

export default exportObj;