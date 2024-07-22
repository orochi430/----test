//[上海市政府]信息公开登记
(function () {
  let addDays;
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    addDays = formData.main["C-OA-XXGK-0114"].value || 19;
    // 自动生成办理期限
    watchCtrl("C-OA-XXGK-0025", "C-OA-XXGK-0028", formData, vueData);
  };
  function watchCtrl(ctrlMetaId, relatedMetaId, formData, vueData) {
    vueData.$watch(function () {
      return formData.main[ctrlMetaId].value;
    }, function (nv, ov) {
      wathcHandle(nv, relatedMetaId, formData, vueData);
    }, {
      // deep: true,
      // immediate: true
    });
  }
  function wathcHandle(val, metaId, formData, vueData) {
    // 办理期限=受理日期+19个工作日
    dsf.http.get('fn/applyOpenController/caclAddDate', {
      time: val + " 00:00:00",
      addDayNum: addDays
    }).done(res => {
      console.log("caclAddDate-res", res)
      if (res.type == "success") {
        vueData.$set(formData.main, metaId, { value: res.data.workDate.split(" ")[0] });
      }
    }).error(err => {
      console.log("caclAddDate-err", err);
    })
  }
  window.spJS = exportObj;
})();
