// 振华待阅：
(function () {
    const exportObj = {}
    exportObj.dataFilter=function(listData,vueData){
        console.log('listData: ', listData);
        listData.forEach((item)=>{
            item.dataValue["UNIFY-DATA-0018"]=moment(item.dataValue["UNIFY-DATA-0018"]).format("yyyy-MM-DD")
            console.log('item.dataValue["UNIFY-DATA-0018"]: ', item.dataValue["UNIFY-DATA-0018"]);
        })
        // setTimeout(() => {
        //     vueData.columns = [
        //       {
        //         "showCategory": "mainTitle",
        //         "showName": "标题",
        //         "showMetaColumn": "bt"
        //       },
        //       {
        //         "showCategory": "subTitleA",
        //         "showName": "文件种类",
        //         "icon": "iconwenjianleixing",
        //         "showMetaColumn": "moduleName"
        //       },
        //       {
        //         "showCategory": "subTitleC",
        //         "showName": "来自张三",
        //         "icon": "iconlaiyuan",
        //         "showMetaColumn": "name"
        //       },
        //       {
        //         "showCategory": "subTitleC",
        //         "showName": "时间",
        //         "icon": "iconriqi",
        //         "showMetaColumn": "time"
        //       }
        //     ]
        //   }, 100)
    }
    // exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
    //     if (itemValue["S-UNIFY-TASK-00028"]) {
    //         await dsf.http
    //             .post("ctrl/unifyOfficeInfo/requestChangeRead", {
    //                 dataId: itemValue["S-BASE-0001"],
    //                 type: "todounify",
    //                 appCode: itemValue["S-UNIFY-TASK-0002.value"]
    //             })
    //             .then(res => {
    //                 itemValue["S-UNIFY-TASK-00014"] = 1
    //             })


    //         dsf.middleground.openUrl({
    //             url: itemValue["S-UNIFY-TASK-00028"],
    //             title: itemValue["S-UNIFY-TASK-0005"],
    //             getCodeParams: { appCode: itemValue["S-UNIFY-TASK-0002.value"] }
    //         })
    //     } else {
    //         dsf.layer.toast("该文件建议在电脑端处理")
    //     }
    // }
    window.spListJS = exportObj
})();