// 成都一体化  先呈送范围  调用接口 显示内容
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectUserBus", function (busObj) {
      console.log("busbus", busObj);
      if (busObj.metaData.metaId == "C-LW-0040") {
        let loading = dsf.layer.loading();

        dsf.http
          .post("fn/scopeOfSubmission/showOrder", {
            ids: busObj.value
          })
          .then((res) => {
            dsf.layer.closeLoading(loading);
            if (res.data.type === "success") {
              vueData.$set(formData.main, "C-LW-0040", {
                value: res.data.data.data.value,
                text: res.data.data.data.text
              })
              vueData.$set(formData.main, "2311292108363aeaewc0X2oryBw9B4M", { value: res.data.data.text })
            } else {
              dsf.layer.toast(res.data.message);
            }
          })
          .error((err) => {
            dsf.layer.closeLoading(loading);
            console.log(err);
          });
      }
    })

  }
  window.spJS = exportObj;
})();