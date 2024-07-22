// 振华便签：
(function () {
    const exportObj = {}
    exportObj.initHandle = function (vueData) {
        vueData.readStatusKey = "un.Unify-Note-User-0003"
        vueData.haveReadVal = 1
    }
    exportObj.dataFilter=function(listData,vueData){
        listData.forEach((item)=>{
            console.log(item)
            item.dataValue["n.Unify-Note-0004"]=moment(item.dataValue["n.Unify-Note-0004"]).format("yyyy-MM-DD")
            console.log('item.dataValue["n.Unify-Note-0004"]: ', item.dataValue["n.Unify-Note-0004"]);
        })

    }
    exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
        if (itemValue["n.Unify-Note-0003"]) {
            await dsf.http
                .post("ctrl/unifyOfficeInfo/requestChangeRead", {
                    dataId: itemValue["n.A0001.value"],
                    type: "unifynote",
                    appCode: itemValue["n.Unify-Note-0012.value"]
                })
                .then(res => {
                    itemValue["un.Unify-Note-User-0003"] = 1
                })


            dsf.middleground.openUrl({
                url: itemValue["n.Unify-Note-0003"],
                title: itemValue["n.Unify-Note-0005.value"],
                getCodeParams: { appCode: itemValue["n.Unify-Note-0012.value"] }
            })
        } else {
            dsf.layer.toast("该文件建议在电脑端处理")
        }
    }
    window.spListJS = exportObj
})();