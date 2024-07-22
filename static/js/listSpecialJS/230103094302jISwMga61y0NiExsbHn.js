// 审批列表
(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        type: gw,
        todoId: `${itemValue["inbox.S-INBOX-0003"]}_${itemValue["inbox.S-BASE-0001"]}`
      }
    });
  };
  window.spListJS = exportObj;
})();
