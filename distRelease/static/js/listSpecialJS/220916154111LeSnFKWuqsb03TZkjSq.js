(function () {
  // 皖政通提醒已完成列表
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        method: 'view',
        listId: listid
      }
    });
  }

  //此处window下面的对象spListJS要和表单spJS的区分，不然列表加载以后再打开表单会被冲掉。
  window.spListJS = exportObj;
})();
