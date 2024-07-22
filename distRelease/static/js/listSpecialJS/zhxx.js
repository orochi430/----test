// 振华消息：
(function () {
    const exportObj = {}
    exportObj.initHandle = function (vueData) {
        vueData.readStatusKey = "S-REMIND-0017"
        vueData.haveReadVal = 1
    }
    exportObj.dataFilter=function(listData,vueData){
        console.log('listData: ', listData);
        listData.forEach((item)=>{
            console.log(item)
            item.dataValue["S-REMIND-0016"]=moment(item.dataValue["S-REMIND-0016"]).format("yyyy-MM-DD")
            console.log('item.dataValue["S-REMIND-0016"]: ', item.dataValue["S-REMIND-0016"]);
        })

    }
    exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
        await dsf.http
          .post("ctrl/unifyOfficeInfo/requestChangeRead", {
            dataId: itemValue["S-BASE-0001.value"],
            type: "toremindunify",
            appCode: itemValue["S-REMIND-0031.value"]
          })
          .then(res => {
            itemValue["S-REMIND-0017.value"] = 1
            itemValue["S-REMIND-0017"] = "已读"
            itemValue["S-REMIND-0017.text"] = "已读"
          })
        if (itemValue["S-REMIND-0020.value"]) {
          dsf.middleground.openUrl({
            url: itemValue["S-REMIND-0020.value"],
            title: itemValue["S-REMIND-0008.value"],
            getCodeParams: { appCode: itemValue["S-REMIND-0031.value"] }
          })
        } else {
          dsf.layer.toast(itemValue["S-REMIND-0008"])
        }
      }
    window.spListJS = exportObj
})();