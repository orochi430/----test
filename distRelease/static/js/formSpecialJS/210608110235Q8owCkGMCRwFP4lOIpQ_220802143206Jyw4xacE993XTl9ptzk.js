(function() {
  //【通辽市人民政府XC项目】督办模块--发送到办结按钮需支持移动端
  const exportObj = {};
  /**
   * 办结后操作
   * */
  var isAgreeTemp = -1;
  var pk, self;
  function afterEndNode() {
    // 同意：isAgreeTemp =1；拒绝：isAgreeTemp =0
    var deferUrl;
    if (isAgreeTemp == 1) {
      deferUrl = "/fn/defer/agreeDefer";
    } else if (isAgreeTemp == 0) {
      deferUrl = "/fn/defer/refuseDefer";
    }
    if (deferUrl) {
      dsf.http.post(deferUrl, { infoId: pk }).then(result => {
        if (result) {
          if ((result.data.type = "success")) {
            self.$router.go(-1);
          } else {
            dsf.layer.toast(result.data.message);
          }
        }
      });
    }
  }
  /**
   * 办结
   * */
  exportObj.agree = function(formData, formStruct, vueData) {
    isAgreeTemp = 1;
    endNode(-1, formData, formStruct, vueData);
  };
  exportObj.isagree = function(formData, formStruct, vueData) {
    isAgreeTemp = 0;
    endNode(-1, formData, formStruct, vueData);
  };
  /**
   * 当前节点特送到办结节点
   * @param isNeedOpinion 是否需要填写意见 1：需要 -1：不需要 默认-1
   */
  function endNode(isNeedOpinion, formData, formStruct, vueData) {
    pk = formStruct.parameters.pk;
    self = vueData;
    var data = {
      pk: formStruct.parameters.pk,
      pnid: formStruct.parameters.pnId,
      isNeedOpinion: isNeedOpinion || -1
    };
    vueData.buttonHandle["save"](
      vueData.$route.params,
      vueData.formMeta,
      vueData.formData,
      vueData,
      vueData.$refs,
      () => {
        FlowEndNode(data);
      },
      false,
      "",
      false,
      false
    );
  }
  function FlowEndNode(data) {
    dsf.layer.confirm(
      {
        title: "",
        message: "是否确定办结文件？"
      },
      () => {
        let params = { todoData: JSON.stringify([data]) };
        dsf.http.post("/fn/flow/batchEndNode", params).then(res => {
          if (res.data.code == 200) {
            dsf.layer.toast("办结成功", "success", afterEndNode);
          } else {
            dsf.layer.toast("办结失败", "fail");
          }
        });
      }
    );
  }
  window.spJS = exportObj;
})();
