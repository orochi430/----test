//日志api列表
const exportObj = {};
import qs from 'qs'
import dsf from '../../../common';
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
    if (busObj.metaData == "SQGL.C-EXPO-MEETING-0008") {
      await getAddress(busObj.value)
      vueData.controlData.find(item => item.metaData == 'SQGL.C-EXPO-MEETING-0009').value = ''
      vueData.controlData.find(item => item.metaData == 'SQGL.C-EXPO-MEETING-0009').selectData = enumData
      // dataValueId = C0008_Data.find(item => item.value == busObj.value).id
    }
  })
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  
}

exportObj.dataFilter = function (listData,vueData) {
  listData.forEach(element => {
    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0004.value"]=="1") {//核酸计算结果
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004","<font color=\"green\">正常</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004.value","<font color=\"green\">正常</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0004.value"]=="-1"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004","<font color=\"red\">异常</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004.value","<font color=\"red\">异常</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0004.value"]=="0"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004","<font>未查询</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004.value","<font>未查询</font>")
    }else {
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004","<font>暂未更新</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0004.value","<font>暂未更新</font>")
    }

    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0017.value"]=="00") {//健康码结果
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015","<font color=\"green\">绿码</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015.value","<font color=\"green\">绿码</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0017.value"]=="01"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015","<font color=\"orange\">黄码</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015.value","<font color=\"orange\">黄码</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0017.value"]=="10"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015","<font color=\"red\">红码</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015.value","<font color=\"red\">红码</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0015.value"]=="0"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015","<font>未查询</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015.value","<font>未查询</font>")
    }else {
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015",`<font color=${element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0015.value"]=="1" ? 'green' : 'red'}>无结果</font>`)
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015.value",`<font color=${element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0015.value"]=="1" ? 'green' : 'red'}>无结果</font>`)
    }

    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0018.value"]=="1") {//行程码结果
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018","<font color=\"green\">正常</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018.value","<font color=\"green\">正常</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0018.value"]=="-1"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018","<font color=\"red\">异常</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018.value","<font color=\"red\">异常</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0018.value"]=="0"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018","<font>未查询</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018.value","<font>未查询</font>")
    }else {
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018","<font>暂未更新</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0018.value","<font>暂未更新</font>")
    }
    
    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0012.value"]=="1") {//疫苗计算结果
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012","<font color=\"green\">正常</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012.value","<font color=\"green\">正常</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0012.value"]=="-1"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012","<font color=\"red\">异常</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012.value","<font color=\"red\">异常</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0012.value"]=="0"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012","<font>未查询</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012.value","<font>未查询</font>")
    }else {
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012","<font>暂未更新</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0012.value","<font>暂未更新</font>")
    }

    
  });
}

exportObj.sms = function (itemValue,vueData) {
  window.location.href = `sms:${itemValue.dataValue["S-API-LOG-0013"]}`
}
exportObj.tel = function (itemValue,vueData ) {
  window.location.href = `tel:${itemValue.dataValue["S-API-LOG-0013"]}`
}
export default exportObj;
