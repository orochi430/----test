//社区疫情管理   人员信息列表
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  
}
exportObj.dataFilter = function (listData,vueData) {
  listData.forEach(element => {
    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0009.value"]=="1") {//核酸计算结果
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009","<font color=\"green\">阴性</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009.value","<font color=\"green\">阴性</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0009.value"]=="-1"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009","<font color=\"red\">阳性</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009.value","<font color=\"red\">阳性</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0009.value"]=="0"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009","<font>未查询</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009.value","<font>未查询</font>")
    }else {
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009","<font>暂未更新</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0009.value","<font>暂未更新</font>")
    }
    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0030.value"]=="-1") {//核酸超期情况结果
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030","<font color=\"green\">未超期</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030.value","<font color=\"green\">未超期</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0030.value"]=="1"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030","<font color=\"red\">已超期</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030.value","<font color=\"red\">已超期</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0030.value"]=="0"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030","<font>未查询</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030.value","<font>未查询</font>")
    }else {
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030","<font>暂未更新</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0030.value","<font>暂未更新</font>")
    }

    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0017.value"]=="00") {//健康码结果
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015","<font color=\"green\">绿码</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015.value","<font color=\"green\">绿码</font>")
    }else if(element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0017.value"]=="01"){
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015","<font color=\"red\">黄码</font>")
      vueData.$set(element.dataValue,"SQRY.C-EXPO-COMMUNITY-USER-0015.value","<font color=\"red\">黄码</font>")
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

    if (element.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0018.value"]=="通过") {//行程码结果
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
  if(itemValue.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0003"]) {
    window.location.href = `sms:${itemValue.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0003"]}`
  } else {
    dsf.layer.toast('未查询到手机号码')
  }
}
exportObj.tel = function (itemValue,vueData ) {
  if(itemValue.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0003"]) {
    window.location.href = `sms:${itemValue.dataValue["SQRY.C-EXPO-COMMUNITY-USER-0003"]}`
  } else {
    dsf.layer.toast('未查询到手机号码')
  }
}
export default exportObj;
