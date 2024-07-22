/**
 * 西藏领导日程
 */
const exportObj = {};

exportObj.initHandle = function (vueData) {
  // vueData.readStatusKey = 'S-UNIFY-TASK-00014'
  // vueData.haveReadVal = 1
}
exportObj.dataFilter = function (listData, vueData) {
  listData.forEach(element => {
    if (element["dataValue"]["GLID.2205250937358SEjp9eXdvT1IhOX1Sx"] && element["dataValue"]["GLID.2205250937358SEjp9eXdvT1IhOX1Sx"].length) {
      element["dataValue"]["readStatus"] = "2"
    } else {
      element["dataValue"]["readStatus"] = "-1"
    }
  });
}

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  var data = {
    "pk": pk,
    "moduleId": moduleId
  };
  if (!itemValue["GLID.220525093815sg80IY98g2O9iQIsHMa"].length) {
    dsf.http.post("fn/leadSchedule/addRead", data).then(res => {
      let result = res.data
      if ("success" == result.type) {
        itemValue["readStatus"] = "2"
        vueData.onRefresh();
      }
    })
  }
  vueData.$router.push({
    path: `/commonForm/${itemValue["lw.A0004"]}/${itemValue["lw.A0001"]}?method=inbox&listId=220427111908dXHMbNRnDEEuSbLdeSe`
  })
}
export default exportObj;
