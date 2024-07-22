/**
 * 台州市委党 签收功能
 *  不可签收功能
 */
(function () {
    const exportObj = {};

    exportObj.link = function (listid, moduleId, pk, vueData, itemValue){
        vueData.$router.push({
            path:`/commonForm/${moduleId}/${pk}?listId=${listid}&validateByList=1&method=view`
        })
    }
    window.spListJS = exportObj;
})()