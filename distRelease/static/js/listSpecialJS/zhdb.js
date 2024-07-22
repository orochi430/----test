// 振华待办

(function () {
    const exportObj = {}
    exportObj.initHandle = function (vueData) {
        vueData.readStatusKey = "S-UNIFY-TASK-00014"
        vueData.haveReadVal = 1
    }
    exportObj.dataFilter=function(listData,vueData){
        console.log('listData: ', listData);
        listData.forEach((item)=>{
            item.dataValue["S-UNIFY-TASK-00025"]=moment(item.dataValue["S-UNIFY-TASK-00025"]).format("yyyy-MM-DD")
        })
    }
    exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
        debugger
        if (itemValue["S-UNIFY-TASK-00028"]) {
            await dsf.http
                .post("ctrl/unifyOfficeInfo/requestChangeRead", {
                    dataId: itemValue["S-BASE-0001"],
                    type: "todounify",
                    appCode: itemValue["S-UNIFY-TASK-0002.value"]
                })
                .then(res => {
                    itemValue["S-UNIFY-TASK-00014"] = 1
                })


            dsf.middleground.openUrl({
                url: itemValue["S-UNIFY-TASK-00028"],
                title: itemValue["S-UNIFY-TASK-0005"],
                getCodeParams: { appCode: itemValue["S-UNIFY-TASK-0002.value"] }
            })
        } else {
            dsf.layer.toast("该文件建议在电脑端处理")
        }
    }
    window.spListJS = exportObj
})();
