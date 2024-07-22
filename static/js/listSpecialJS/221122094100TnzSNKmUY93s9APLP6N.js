/**
 * 台州市委党校  签收功能  
 *  未签收---列表
 *  重置打开方式
 */
(function () {
    const exportObj = {};

    exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
        console.log(listid,'*******');
        vueData.$router.push({
            path:`/commonForm/${moduleId}/${pk}?listId=${listid}&validateByList=1&method=view`
        })
    }
    window.spListJS = exportObj;

})()