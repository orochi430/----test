//山东中烟 互动信息列表根据状态打开不同节点
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${itemValue["G_INFOS.A0004.value"]}/${itemValue["G_INFOS.A0001.value"]}?listId=231215184448o3F6NQE35xSwOxjZH5D&method=view`,
    })
  };
  window.spListJS = exportObj;
})();
