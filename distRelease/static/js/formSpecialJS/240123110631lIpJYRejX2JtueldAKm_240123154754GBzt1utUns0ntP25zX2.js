// 经信委--工作报批
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log(formData.main);
    vueData.$bus.on("inputRadio", function (data) {
      if (data.metaData.metaId == "B0069"&&data.value == '-1') {
        this.$dialog
          .confirm({
            title: "提示",
            message: "委内不公开的文件请走内网系统!",
            showCancelButton: false,
          })
          .then(() => {
            vueData.$set(formData.main, "B0069", {
              value: "1",
              text: "是"
            });
            console.log(formData.main['B0069']);
          }).catch((error) => {});
      }
    });
  };

  window.spJS = exportObj;
})();
