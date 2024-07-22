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
        path: `/commonTabs/DWGL`,
        query: {
          moduleId: moduleId,
          pk: pk,
          formId: '220406201147rVA7eCOsQ0tTsNGCkH8',
          listId: "220406203601hhPx0FfhxCElijOfRu3",
          method: "edit"
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
  enumData = []
  formStruct.controls.find(item => item.metaId == 'C-EXPO-MEETING-0003').controlType = 'controlMap'
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
    if (vueObj.metaData.metaId == "C-EXPO-MEETING-0009") {
      if(formData.main["C-EXPO-MEETING-0008"].value) {
        vueObj.controlData.columnsValue.columns = enumData;
        vueObj.currentColumns = enumData;
      }else {
        dsf.layer.toast('请先选择区')
      }
    }
  })

  // 地图选择带入地址、经纬度
  vueData.$bus.on("setAddress", function (vueObj) {
    if (vueObj.metaData.metaId == "C-EXPO-MEETING-0003") {
      vueData.$set(vueData.formData.main, "C-EXPO-MEETING-0003", { value: vueObj.address })
      vueData.$set(vueData.formData.main, "C-EXPO-MEETING-0034", { value: vueObj.lng })
      vueData.$set(vueData.formData.main, "C-EXPO-MEETING-0035", { value: vueObj.lat })
    }
  })
}
exportObj.beforeDelete = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    dsf.http.post('ctrl/expo/community/beforeDelete', {ids: formStruct.parameters.pk}).then(res => {
      if (res.data.code == 200) {
        resolve()
      } else {
        dsf.layer.toast(res.data.message)
        reject()
      }
    }).error(e => {
      reject()
    })
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
