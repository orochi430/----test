//[上海市政府]信息约稿
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {  
    let status = itemValue["A0009.value"];
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listId: listid,
        method: "remoteDept",
        validateByList: 1,
        nodeId1: status == 0 ? 0 : -1
      }
    });
  };
  window.spListJS = exportObj;
})();