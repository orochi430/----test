const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      validateByList: 1,
      listId: 'portalView',
      method: 'view'
    }
  });
}
export default exportObj;
