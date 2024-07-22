//【山东中烟】 约稿发布列表 根据不同发布状态 进入不同节点
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    let queryValue = {
      listId: listid,
      validateByList: 1,
    }
    if (itemValue['2206171518292G0fPZWEKqadfCRP6Xs.value'] == 1) {
      queryValue.method = 'viewforpublistPmd';
    } else if (itemValue['2206171518292G0fPZWEKqadfCRP6Xs.value'] == 0) {
      queryValue.method = 'editforpublistPmd';
    }
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: queryValue
    });
  };
  window.spListJS = exportObj;
})();
