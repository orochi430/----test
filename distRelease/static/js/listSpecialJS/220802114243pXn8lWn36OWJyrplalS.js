//稿费核定明细表
(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/220808102550h57ghDM1nQeSroE0OGs/${itemValue["IMS.A0001"]}`,
      query: {
        listid: "2205191554270uDeR5nIzsQVvVSbCUH",
        validateByList: 1,
        method: "toSpecifyNode",
        toNodeId: 14
      }
    });
  };
  window.spListJS = exportObj;
})();
