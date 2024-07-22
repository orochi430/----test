const exportObj = {};
import qs from 'qs'
let enumData = []
let enumData1 = []
function getAddress(params) {
  
  console.log(params.split(','))
  return dsf.http.Axios.post(dsf.url.getWebPath('/ctrl/street/getStreetByArea'),qs.stringify({codes: params.split(',')},{arrayFormat: 'brackets'}), {
    headers: {
      'x-auth-token': dsf.util.loadSessionStore("loginToken")
    }
  }).then(res => {
    console.log(res.data)
    enumData = []
    if(res.data) {
      Object.keys(res.data).forEach(key => {
        enumData.push({text: res.data[key], value: key})
      })
    }
  })
}
function getKind(params) {
  return dsf.http.Axios.post(dsf.url.getWebPath('/ctrl/place/getSubListByCode'),qs.stringify({codes: params.split(','),codeFid: '220516212750jLz8lVfr3DAvOKYEosM'},{arrayFormat: 'brackets'}), {
    headers: {
      'x-auth-token': dsf.util.loadSessionStore("loginToken")
    }
  }).then(res => {
    console.log(res.data)
    enumData1 = []
    if(res.data) {
      enumData1 = res.data
    }
  })
}
exportObj.init = function (vueData) {
    vueData.$bus.on("checkSearchVal", async function (busObj) {
    console.log(vueData.controlData)
    console.log(busObj)
    if (busObj.metaData == "C-PLACE-INFORMATION-002") {
      await getAddress(busObj.value)
      vueData.controlData.find(item => item.metaData == 'C-PLACE-INFORMATION-003').value = ''
      vueData.controlData.find(item => item.metaData == 'C-PLACE-INFORMATION-003').selectData = enumData
      // dataValueId = C0008_Data.find(item => item.value == busObj.value).id
    } else if(busObj.metaData == "C-PLACE-INFORMATION-006") {
      await getKind(busObj.value)
      vueData.controlData.find(item => item.metaData == 'C-PLACE-INFORMATION-007').value = ''
      vueData.controlData.find(item => item.metaData == 'C-PLACE-INFORMATION-007').selectData = enumData1
    }
  })
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonTabs/CSGL`,
    query: {
      moduleId: moduleId,
      place_id: pk,
      area_street_id: vueData.$route.query.pk,
      method: 'edit',
      listId: listid,
    }
  });
}
exportObj.createRow = function (btn, vueData) {
  vueData.$router.push({
    path: `/commonForm/${vueData.moduleId}`,
    query: {
      fid: vueData.$route.query.pk
    }
  })
}
export default exportObj;