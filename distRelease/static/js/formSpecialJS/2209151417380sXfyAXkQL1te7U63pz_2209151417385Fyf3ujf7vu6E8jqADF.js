(function () {
  const exportObj = {};
  let now = dsf.date.format(new Date(), "yyyy-mm-dd hh:ii");
//   exportObj.initHandle = function (formData, formStruct, vueData) {
//     if (formStruct.parameters.nodeId == 0 && formData.main["220815155026oGXQUym32a6vP0sI00t"]) {
//         vueData.$set(formData.main, "220815155026oGXQUym32a6vP0sI00t", {
//             value: now
//         })
//     }
// }
  exportObj.saveFilter = function (formData, formStruct, vueData) {
      return new Promise(function (resolve, reject) {
          // 拟稿时自动生成标题：申请人+申请时间
          if (!vueData.pk && formData.main["B0009"]) {
              vueData.$set(formData.main, "B0001", {
                  value: `${formData.main["B0009"].value}${now}`
              })
          }
          resolve();
      })
  }
  window.spJS=exportObj;
})();
