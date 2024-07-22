// 汇总明细0000
(function () {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/2208021114429OtCQeD3SlItCSWLg74/${itemValue["COSTAPPROVE.A0001"]}`,
      query: {
        listid: "220805105324GDOLk6vsEKY3EPeoNxc",
        validateByList: 1,
        method: toSpecifyNode,
        toNodeId: -1
      }
    });
  };
  window.spListJS = exportObj;
})()
