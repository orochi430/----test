//【山东中烟】约稿通知列表点击进入约稿详情
(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/220613134310lPENzgUUCjpzQqH3kVK/${itemValue['220621090809lmMqOfSsbG0px4OiOis.value']}`,
      query: {
        validateByList:1,
        listId: "220613134319kSxYxbwytcAXpuwRAIT",
        method: "editfornoticelistPmd",
      }
    });
  };
  window.spListJS = exportObj;
})();