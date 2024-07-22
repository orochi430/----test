// 成都一体化  督办依据按钮
(function () {
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        formData.main["C-DB-0086"].value = formStruct.parameters.pk;
    }
    exportObj.dbyiju = function (formData, formStruct, vueData) {
        vueData.commonPopParam = {
            listId: "231212192759RtRVwl7DCs1PV9KPANB",
            moduleId: "2106221028373ZUk9GFHfFW6v4gJXK7",
            params: {
                title: "批示管理",
            },
        };
        vueData.checkType = "radio";
        vueData.commonPop = true;
        // formData.main["C-DB-0006"].value
    }
    exportObj.choose = function (checkItems, vueData) {
        console.log("choose", checkItems);
        vueData.commonPop = false;
        vueData.formData.main["C-DB-0006"].value = checkItems[0].dataValue["C-DB-LDPS-0003.value"];
    }
    window.spJS = exportObj;
})()