(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        method:"customNodeForm",
        listId: "OpenForm",
        customNodeId:-2,
        validateByList:1,
        formId:"221216135656thn80gXJKbm8tXsRJDa"
      }
    });
  };
  window.spListJS = exportObj;
})();
