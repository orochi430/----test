// 一体化市教委 收文
;(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectUserBus", function (busObj) {
      if (busObj.metaData.metaId == "C-LW-0051" || busObj.metaData.metaId == "C-LW-0003" || busObj.metaData.metaId == "C-LW-0040") {
        let zbDeptId = formData.main["C-LW-0051"].value
        let hbDeptId = formData.main["C-LW-0003"].value
        let yzDeptId = formData.main["C-LW-0040"].value
        let deptIds = "";
        if(zbDeptId){
            deptIds += zbDeptId+",";
        }
        if(hbDeptId){
            deptIds += hbDeptId+",";
        }
        if(yzDeptId){
            deptIds += yzDeptId+",";
        }

        if (deptIds) {
          dsf.http.post('fn/SjwCustomLw/getDeptLeaderInCharge', { pk: vueData.formMeta.parameters.pk, deptIds: deptIds }).then(res => {
            if (res.data.code == 200 && res.data.data) {
              vueData.$set(formData.main, 'C-LW-0031', res.data.data)
              createOpinion(vueData, formData, formStruct)
            }
          })
        } else {
          vueData.$set(formData.main, 'C-LW-0031', {value: '', text: ''})
          createOpinion(vueData, formData, formStruct)
        }
      }
    })
    // 意见输入框改为发送前填写了
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "C-LW-0031") {
        createOpinion(vueData, formData, formStruct)
      }
    })
    vueData.$bus.on("inputRadio",function (busObj) {
      if (busObj.metaData.metaId == "C-LW-0007" || busObj.metaData.metaId == "C-LW-0009" || busObj.metaData.metaId == "C-LW-0015") {
        createOpinion(vueData, formData, formStruct)
      }
    })
  }
  // 849 市教委收文：移动端拟办意见自动生成问题
  // exportObj.saveAfter = function (vueData, sendButtonParams, formData) {
  function createOpinion(vueData, formData, formStruct){
    let nodeId = vueData.formMeta.parameters.nodeId
    if (nodeId == "pctBERR9BcF27bg") { // 收文拟办节点
      let currentOpintion = ""
      let ldMap = formData.main["C-LW-0031"];
      if (ldMap && ldMap.text) {
        let map = formData.main["C-LW-0007"];
        console.log(map)
        let text = ldMap.text.replaceAll(",", "、");
        currentOpintion += "请" + text + "同志" + ((map && map.text) ? map.text : "") + "。\n";
      }

      let zbhb = "";
      let zbMap = formData.main["C-LW-0051"];
      if (zbMap && zbMap.text) {
        let text = zbMap.text.replaceAll(",", "、");
        zbhb += text;
      }
      let hbMap = formData.main["C-LW-0003"];
      if (hbMap && hbMap.text) {
        let text = hbMap.text.replaceAll(",", "、");
        zbhb += "会" + text;
      }
      if ((zbMap && zbMap.text) || (hbMap && hbMap.text)) {
        let type = formData.main["C-LW-0009"];
        currentOpintion += "拟请" + zbhb + ((type && type.text) ? type.text : "") + "。\n";
      }

      let yzMap = formData.main["C-LW-0040"];
      if (yzMap && yzMap.text) {
        let map = formData.main["C-LW-0015"];
        let text = yzMap.text.replaceAll(",", "、");
        currentOpintion += "请" + text + ((map && map.text) ? map.text : "") + "。\n";
      }

      formStruct.controls.find(
        (item) => item.controlType == "controlEditOpinion"
      ).extra.opinionContent = currentOpintion;
    }
  }
  window.spJS = exportObj
})()
