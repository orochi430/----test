//日志api列表
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    name: "epidemicResult",
    query: {
      id:itemValue["S-BASE-0001"]
    }
  });
}

exportObj.dataFilter = function (listData,vueData) {
  listData.forEach(element => {
    if (element.dataValue["S-API-LOG-0016"]=="通过") {//核酸计算结果
      vueData.$set(element.dataValue,"S-API-LOG-0016","<font color=\"green\">通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0016.value","<font color=\"green\">通过</font>")
    }else if(element.dataValue["S-API-LOG-0016"]=="不通过"){
      vueData.$set(element.dataValue,"S-API-LOG-0016","<font color=\"red\">不通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0016.value","<font color=\"red\">不通过</font>")
    }

    if (element.dataValue["S-API-LOG-0021"]=="通过") {//健康码结果
      vueData.$set(element.dataValue,"S-API-LOG-0021","<font color=\"green\">通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0021.value","<font color=\"green\">通过</font>")
    }else if(element.dataValue["S-API-LOG-0021"]=="不通过"){
      vueData.$set(element.dataValue,"S-API-LOG-0021","<font color=\"red\">不通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0021.value","<font color=\"red\">不通过</font>")
    }

    if (element.dataValue["S-API-LOG-0023"]=="通过") {//行程码结果
      vueData.$set(element.dataValue,"S-API-LOG-0023","<font color=\"green\">通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0023.value","<font color=\"green\">通过</font>")
    }else if(element.dataValue["S-API-LOG-0023"]=="不通过"){
      vueData.$set(element.dataValue,"S-API-LOG-0023","<font color=\"red\">不通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0023.value","<font color=\"red\">不通过</font>")
    }
    
    if (element.dataValue["S-API-LOG-0019"]=="通过") {//疫苗计算结果
      vueData.$set(element.dataValue,"S-API-LOG-0019","<font color=\"green\">通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0019.value","<font color=\"green\">通过</font>")
    }else if(element.dataValue["S-API-LOG-0019"]=="不通过"){
      vueData.$set(element.dataValue,"S-API-LOG-0019","<font color=\"red\">不通过</font>")
      vueData.$set(element.dataValue,"S-API-LOG-0019.value","<font color=\"red\">不通过</font>")
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
