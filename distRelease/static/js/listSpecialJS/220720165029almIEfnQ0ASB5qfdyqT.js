//【山东中烟】 约稿通知列表 
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    let queryValue = {
      listId: "220621092101nijrLwBI4eMy8ImY4p2",
      validateByList: 1,
      method:'viewFormPmd'
    }
   
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: queryValue
    });
  };
  window.spListJS = exportObj;
})();