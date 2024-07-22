//电气 已完成表单
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    if (itemValue["S-UNIFY-TASK-DONE-00015"]) {
      dsf.middleground.openUrl({
        url: itemValue["S-UNIFY-TASK-DONE-00015"],
        title: itemValue["S-UNIFY-TASK-DONE-0002"],
        getCodeParams: { appCode: itemValue["S-UNIFY-TASK-DONE-00017.value"] },
      });
    }else{
      dsf.layer.toast("该文件建议在电脑端处理");
    }
  };
  window.spListJS = exportObj;
})();
