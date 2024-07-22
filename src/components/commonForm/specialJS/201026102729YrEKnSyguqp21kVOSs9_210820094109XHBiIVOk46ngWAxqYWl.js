import dsf from "../../../common";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  // 根据发文类型联动文号规则
  let wenhaoCtr = vueData.formMeta.controls.find(item => item.metaId == 'B0003')
  vueData.$set(wenhaoCtr, 'initruleid', wenhaoCtr.readonlyValue.ruleid || '')
  vueData.$bus.on("checkValToFilecode", function (busObj) {
    if(busObj.metaData.metaId == 'C-GW-FW-0202') {
      if(wenhaoCtr.privilege.editable){
        dsf.http.post('fn/ministry/bfwgetruleidbyfwlx', {
          fwlx: formData.main['C-GW-FW-0202'].value
        }).then(res => {
          if(res.data.code == 200) {
            vueData.$set(wenhaoCtr, 'relateRuleid', res.data.data.filecodeid)
          }
        })
        return
      }
    }
  })
  vueData.$watch(function () {
    return formData.main
  }, function (n, o) {
    let btnBWFW = {
      action: "btnBWFW",
      icon: "",
      name: "生成会签",
      parameters: "0"
    }
    let btnDelBWFW = {
      action: "btnDelBWFW",
      icon: "",
      name: "删除会签",
      parameters: "1"
    }
    if (n["210419103326nLnnu9jebQUtgOvASMx"].value=="1") {
      vueData.delBtn(btnBWFW);
      vueData.addBtn(btnDelBWFW);
    }else{
      vueData.delBtn(btnDelBWFW);
      if (n["C-FW-0038"].value == "1") {
        vueData.addBtn(btnBWFW);
      } else {
        vueData.delBtn(btnBWFW);
      }
    }
  }, {
    deep: true,
    immediate: true,
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    resolve()
  })
}
export default exportObj;
