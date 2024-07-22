/**
 * 台州市委党  签收功能
 * 已签收  一打开表单数据
 */
(function () {
    const exportObj = {};

    exportObj.link = function (listid, moduleId, pk, vueData, itemValue){
        vueData.$router.push({
            path:`/commonForm/${moduleId}/${pk}?listId=${listid}&validateByList=1&method=view`
        })
    }
    window.spListJS = exportObj;
})();