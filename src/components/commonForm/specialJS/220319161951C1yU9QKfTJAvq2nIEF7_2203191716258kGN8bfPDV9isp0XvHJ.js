/**
 * 社区疫情管理表单
 */
import dsf from "../../../common";
import util from "@/common/util";
import qs from 'qs'
const exportObj = {};

exportObj.saveAfter = function (vueData, params,formData) {
  if (vueData.$route.params.pk || vueData._pk) {
    dsf.layer.toast("表单保存成功")
    vueData.$eventBus.refresh(this);
    //vueData.backSucces()
  } else {
    let pk = formData.main["A0001"].value
    let moduleId = formData.main["A0004"].value
    dsf.layer.toast("表单保存成功", undefined, () => {
      vueData.$router.replace({
        path: `/commonTabs/SQYQGL`,
        query: {
          moduleId: moduleId,
          pk: pk
        }
      });
    });
  }
}
let enumData = []

function getAddress(params) {
  dsf.http.Axios.post(dsf.url.getWebPath('/ctrl/street/getStreetByArea'),qs.stringify({codes: params.split(',')},{arrayFormat: 'brackets'}), {
    headers: {
      'x-auth-token': dsf.util.loadSessionStore("loginToken")
    }
  }).then(res => {
    console.log(res.data)
    enumData = []
    if(res.data) {
      Object.keys(res.data).forEach(key => {
        enumData.push({
          remark: "",
          id: key,
          text: res.data[key],
          varClass: "layui-col-md3",
          value: key
        })
      })
    }
  })
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  let C0008_Data = formStruct.controls.find(item => item.metaId == "C-EXPO-MEETING-0008").enumData
  let dataValueId =""
  if (formData.main["C-EXPO-MEETING-0008"].value.length) {
    dataValueId =C0008_Data.find(item => item.value == formData.main["C-EXPO-MEETING-0008"].value).value
    getAddress(dataValueId)
  }
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-EXPO-MEETING-0008") {
      vueData.$set(vueData.formData.main, "C-EXPO-MEETING-0009", {
        value: "",
        text: ""
      })
      dataValueId = C0008_Data.find(item => item.value == busObj.value).value
      getAddress(dataValueId)
    }
  })

  vueData.$bus.on("showCheckBox", function (vueObj) {
    if (vueObj.metaData.metaId == "C-EXPO-MEETING-0009" && formData.main["C-EXPO-MEETING-0008"].value.length > 0) {
      vueObj.controlData.columnsValue.columns = enumData;
      vueObj.currentColumns = enumData;
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {
      resolve()
    } catch (error) {
      resolve()
    }
  })
}

export default exportObj;
