// 一体化办公厅-工作通知
(function () {
  const exportObj = {};
  exportObj.custom1 = function (formData, formStruct, vueData) {
    function remoteSend() {
      let remoteInfo = formData.main["231101214315NG4g4F3pEAHioGDva1q"] || {};
      const params = {
        pk: vueData.formMeta.parameters.pk,
        remoteSendUnitIds: remoteInfo["value"],
        remoteSendUnitNames: remoteInfo["text"],
        deptIds: formData.main["C-GW-FW-0104"].value,
        title: formData.main["B0001"].value,
      };
      dsf.layer.loading();
      dsf.http.post("fn/notification/remoteSend", params).then((res) => {
        if (res.data.type == "success") {
          let postData = {
            todoData:
              '[{"pk":"' +
              vueData.formMeta.parameters.pk +
              '","pnid":"' +
              vueData.formMeta.parameters.pnId +
              '"}]',
          };
          dsf.http.post("fn/flow/batchEndNode", postData).then((res) => {
            if (res.data.code == 200) {
              dsf.layer.toast("发送成功", true, () => vueData.backSucces());
            } else {
              dsf.layer.toast("操作失败", false);
            }
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
    }
    vueData.buttonHandle["save"](
      vueData.$route.params,
      vueData.formMeta,
      vueData.formData,
      vueData,
      vueData.$refs,
      remoteSend
    );
  };

  window.spJS = exportObj;
})();
