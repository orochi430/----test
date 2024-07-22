//山东东营智慧督查
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        // method:"mobileDctzView",
        // listId: listid,
        listId: "ledgerAssert",
        method: "openRegisterForm",
        validateByList: 1
      }
    });
  };
  window.spListJS = exportObj;
})();