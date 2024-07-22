
const exportObj = {};
let enumData1 = []
function getKind(fid) {
  dsf.http.get(`/fn/codemanage/getCodeListByFId?fId=${fid}`).then(res => {
    enumData1 = []
    if(res.data.code == 200) {
      res.data.data.forEach(item => {
        enumData1.push({
          remark: "",
          id: item.id,
          text: item.codeName,
          varClass: "layui-col-md3",
          value: item.codeValue
        })
      })
    }
  })
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  if (!vueData.pk) {
    vueData.$set(vueData.formData.main, "C-EXPO-ACCESS-CONTROL-0006", {
      value: vueData.$route.query.fid
    })
    vueData.$set(vueData.formData.main, "C-EXPO-ACCESS-CONTROL-0023", {
      value: vueData.$route.query.place_id
    })
  }
  
  enumData1 = []
  let C006_Data = formStruct.controls.find(item => item.metaId == "C-EXPO-ACCESS-CONTROL-0028").enumData
  let dataValueId =""
  if (formData.main["C-EXPO-ACCESS-CONTROL-0028"].value.length) {
    dataValueId =C006_Data.find(item => item.value == formData.main["C-EXPO-ACCESS-CONTROL-0028"].value).id
    getKind(dataValueId)
  }
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-EXPO-ACCESS-CONTROL-0028") {
      vueData.$set(vueData.formData.main, "C-EXPO-ACCESS-CONTROL-0029", {
        value: "",
        text: ""
      })
      dataValueId = C006_Data.find(item => item.value == formData.main["C-EXPO-ACCESS-CONTROL-0028"].value).id
      getKind(dataValueId)
    }
  })
  vueData.$bus.on("showCheckBox", function (vueObj) {
    if (vueObj.metaData.metaId == "C-EXPO-ACCESS-CONTROL-0029") {
      if(formData.main["C-EXPO-ACCESS-CONTROL-0028"].value) {
        vueObj.controlData.columnsValue.columns = enumData1;
        vueObj.currentColumns = enumData1;
      }else {
        dsf.layer.toast('请先选择一级分类')
      }
    }
  })

}

export default exportObj;
