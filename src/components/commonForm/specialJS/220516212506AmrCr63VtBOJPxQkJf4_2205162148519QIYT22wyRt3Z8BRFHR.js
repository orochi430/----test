/**
 * 社区疫情管理表单
 */
import dsf from "../../../common";
import util from "@/common/util";
import qs from 'qs'
const exportObj = {};

exportObj.saveAfter = function (vueData, params,formData) {
  vueData.$eventBus.refresh(vueData);
  if (vueData.$route.params.pk || vueData._pk) {
    dsf.layer.toast("表单保存成功")
    //vueData.backSucces()
  } else {
    let pk = formData.main["A0001"].value
    let moduleId = formData.main["A0004"].value
    dsf.layer.toast("表单保存成功", undefined, () => {
      vueData.$router.replace({
        path: `/commonTabs/CSGL`,
        query: {
          moduleId: moduleId,
          place_id: pk,
          area_street_id: vueData.$route.query.fid,
          listId: "220516215358qflS2YIo7ZgUbhqIBJM",
          method: "edit"
        }
      });
  });
  }
}
let enumData = []
let enumData1 = []

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
  if (!formData.main['C-PLACE-INFORMATION-009'].value) vueData.$set(vueData.formData.main, "C-PLACE-INFORMATION-009", { value: vueData.$route.query.fid }) // 存入社区id
  enumData = []
  enumData1 = []
  let C002_Data = formStruct.controls.find(item => item.metaId == "C-PLACE-INFORMATION-002").enumData
  let C006_Data = formStruct.controls.find(item => item.metaId == "C-PLACE-INFORMATION-006").enumData
  let dataValueId =""
  if (formData.main["C-PLACE-INFORMATION-002"].value.length) {
    dataValueId =C002_Data.find(item => item.value == formData.main["C-PLACE-INFORMATION-002"].value).value
    getAddress(dataValueId)
  }
  if (formData.main["C-PLACE-INFORMATION-006"].value.length) {
    dataValueId =C006_Data.find(item => item.value == formData.main["C-PLACE-INFORMATION-006"].value).id
    getKind(dataValueId)
  }
  vueData.$bus.on("checkVal", function (busObj) {
    if (busObj.metaData.metaId == "C-PLACE-INFORMATION-002") {
      vueData.$set(vueData.formData.main, "C-PLACE-INFORMATION-003", {
        value: "",
        text: ""
      })
      dataValueId = busObj.value
      getAddress(dataValueId)
      // 拼接场所地址
      vueData.$set(vueData.formData.main, "C-PLACE-INFORMATION-005", { value: busObj.text + formData.main['C-PLACE-INFORMATION-003'].text + formData.main['C-PLACE-INFORMATION-004'].value }) // 存入社区id
    } else if (busObj.metaData.metaId == "C-PLACE-INFORMATION-003") {
      vueData.$set(vueData.formData.main, "C-PLACE-INFORMATION-005", { value: formData.main['C-PLACE-INFORMATION-002'].text + busObj.text + formData.main['C-PLACE-INFORMATION-004'].value }) // 存入社区id
    } else if (busObj.metaData.metaId == "C-PLACE-INFORMATION-006") {
      vueData.$set(vueData.formData.main, "C-PLACE-INFORMATION-007", {
        value: "",
        text: ""
      })
      dataValueId = C006_Data.find(item => item.value == formData.main["C-PLACE-INFORMATION-006"].value).id
      getKind(dataValueId)
    }
  })
  vueData.$bus.on("inpBus", function (busObj) {
    if (busObj.metaData.metaId == "C-PLACE-INFORMATION-004") {
      vueData.$set(vueData.formData.main, "C-PLACE-INFORMATION-005", { value: formData.main['C-PLACE-INFORMATION-002'].text + formData.main['C-PLACE-INFORMATION-003'].text + busObj.value }) // 存入社区id
    }
  })
  vueData.$bus.on("showCheckBox", function (vueObj) {
    if (vueObj.metaData.metaId == "C-PLACE-INFORMATION-003") {
      if(formData.main["C-PLACE-INFORMATION-002"].value) {
        vueObj.controlData.columnsValue.columns = enumData;
        vueObj.currentColumns = enumData;
      }else {
        dsf.layer.toast('请先选择区')
      }
    }else if (vueObj.metaData.metaId == "C-PLACE-INFORMATION-007") {
      if(formData.main["C-PLACE-INFORMATION-006"].value) {
        vueObj.controlData.columnsValue.columns = enumData1;
        vueObj.currentColumns = enumData1;
      }else {
        dsf.layer.toast('请先选择一级分类')
      }
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
