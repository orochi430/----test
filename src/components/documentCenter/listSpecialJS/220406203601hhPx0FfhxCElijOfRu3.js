const exportObj = {};
import qs from 'qs'
let enumData = []
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
exportObj.init = function (vueData) {
    vueData.$bus.on("checkSearchVal", async function (busObj) {
    console.log(vueData.controlData)
    console.log(busObj)
    if (busObj.metaData == "C-EXPO-MEETING-0008") {
      await getAddress(busObj.value)
      vueData.controlData.find(item => item.metaData == 'C-EXPO-MEETING-0009').value = ''
      vueData.controlData.find(item => item.metaData == 'C-EXPO-MEETING-0009').selectData = enumData
      // dataValueId = C0008_Data.find(item => item.value == busObj.value).id
    }
  })
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonTabs/DWGL`,
    query: {
      moduleId: moduleId,
      pk: pk,
      formId: '220406201147rVA7eCOsQ0tTsNGCkH8',
      listId: "220406203601hhPx0FfhxCElijOfRu3",
      method: "edit"
      // method: 'edit',
      // listId: '220325190647yQ6mQJYbbIcmNQr0dv5',
      // expiry: itemValue['S-ORGANIZE-0096']
    }
  });
}
exportObj.createRow = function (btn, vueData) {
  vueData.$router.push({
    path: "/commonForm/220319161951C1yU9QKfTJAvq2nIEF7",
    query: {
      formId: "220406201147rVA7eCOsQ0tTsNGCkH8",
      listId: "220406203601hhPx0FfhxCElijOfRu3",
      method: "newFile"
    }
  })
}
export default exportObj;
