(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        method:"mobileDczbView",
        listId: listid
      }
    });
  };
  window.spListJS = exportObj;
})();
