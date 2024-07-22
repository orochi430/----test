//山东中烟 互动信息列表根据状态打开不同节点
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    let method = "viewFormPmd";
    dsf.http.post("ctrl/interactinf/queryFormOpenMethodForInteractInfList", {
      pk
    }).then((result) => {
      console.log(result.data.type, result.data.data.formOpenMethod);
      if (result.data.type == "success") {
        method = result.data.data.formOpenMethod.concat('Pmd');
        vueData.$router.push({
          path: `/commonForm/210812102237n1DE6tBy5YSy665FkiI/${pk}`,
          query: {
            listId: '2108130926526PvaySZK8Olm7EKg5lz',
            method,
            validateByList: 1,
          }
        })
      }
    })
  };
  window.spListJS = exportObj;
})();
