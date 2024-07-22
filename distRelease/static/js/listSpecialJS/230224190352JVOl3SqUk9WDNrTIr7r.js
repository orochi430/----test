// 核定已办列表
(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listid: "230224190352JVOl3SqUk9WDNrTIr7r",
        validateByList: 1,
        method: "toSpecifyNode",
        toNodeId: -1
      }
    });
  };
  window.spListJS = exportObj;
})();
