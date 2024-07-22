/**
 *  模块位置：
 *  业务模块-地产集团-项目-项目信息
 */
 const exportObj = {};
 exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: `/commonTabs/xmxx`,
        query: {
            moduleId: moduleId,
            listId:listid,
            pk: pk,
            method:vueData.params.method,
            validateByList:1
        }
    });
 }
 export default exportObj;
 