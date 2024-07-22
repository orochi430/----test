// 经信委--工作报批
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("inputRadio", function (data) {
      console.log(data);
      console.log(data.metaData.metaId);
      console.log(data.value);
      if (data.metaData.metaId == "B0069"&&data.value == '-1') {
        console.log(11);
        this.$dialog
          .confirm({
            title: "提示",
            message: "委内不公开的文件请走内网系统!",
            showCancelButton: false,
          })
          .then(() => {
            console.log(22);
            vueData.$set(vueData.formData.main, "B0069",{value: '1', text: '是'})
          }).catch((error) => {});
      }
    });
  };

  window.spJS = exportObj;
})();
