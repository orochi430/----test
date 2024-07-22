/**
 *  模块位置：
 *  业务模块-地产集团-招商房源-招商房源
 */
 const exportObj = {};
 exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: `/commonTabs/zsfy`,
        query: {
            moduleId: moduleId,
            listId:listid,
            pk: pk,
            validateByList:1,
            method:vueData.params.method
        }
    });
 }
 export default exportObj;
 