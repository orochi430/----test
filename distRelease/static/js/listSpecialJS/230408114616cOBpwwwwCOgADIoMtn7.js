// 8135演示 项目库列表
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: '/commonTabs/xmk',
      query: {
        moduleId: moduleId,
        pk: pk
      }
    })
  };
  window.spListJS = exportObj;
})();
