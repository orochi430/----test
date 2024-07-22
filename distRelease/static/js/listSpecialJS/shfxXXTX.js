(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    let pk1 = "";
    let moduleId1 = "";
    if (!itemValue.url) {
      dsf.layer.toast("url不存在");
      return;
    }
    itemValue.url.split("?")[1].split("&").forEach(item => {
        item.includes("pk") ? (pk1 = item.split("=")[1]) : "";
        item.includes("moduleId") ? (moduleId1 = item.split("=")[1]) : "";
      });
    vueData.$router.push({
      path: `commonForm/${moduleId1}/${pk1}`
    });
  };

  window.spListJS = exportObj;
})();
