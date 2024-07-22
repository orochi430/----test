(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query:{
        isEnterTodo:1,
      }
    });
  };
  window.spListJS = exportObj;
})();
