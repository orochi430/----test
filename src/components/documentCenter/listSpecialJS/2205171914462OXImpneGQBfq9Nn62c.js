//日志api列表
const exportObj = {};

exportObj.dataFilter = function (listData,vueData) {
  listData.forEach(element => {
    if (element.dataValue["OA_ACCESS_RECORDS.C-ACCESS-RECORDS-0022"]=="请通行") {//核酸计算结果
      vueData.$set(element.dataValue,"OA_ACCESS_RECORDS.C-ACCESS-RECORDS-0022","<font color=\"green\">正常</font>")
      vueData.$set(element.dataValue,"OA_ACCESS_RECORDS.C-ACCESS-RECORDS-0022.value","<font color=\"green\">正常</font>")
    }else {
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030", `<font color=\"red\">${element.dataValue["OA_ACCESS_RECORDS.C-ACCESS-RECORDS-0022"]}</font>`)
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030.value",`<font color=\"red\">${element.dataValue["OA_ACCESS_RECORDS.C-ACCESS-RECORDS-0022"]}</font>`)
    }
  });
}

export default exportObj;
