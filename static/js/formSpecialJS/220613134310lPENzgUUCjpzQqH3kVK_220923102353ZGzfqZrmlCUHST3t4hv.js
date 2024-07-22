(function() {
  //【山东中烟】 约稿通知表单 约稿反馈按钮 根据反馈方式进入不同表单
  const exportObj = {};
  exportObj.initHandle = function(formData, formStruct, vueData) {
    if (
      formData.main["220613144546OLVzIc26cX75VPYyyof"].text == "直接反馈" &&
      formData.main["220802103956IQNRlvaEF4NqX1IAmJz"].text == ""
    ) {
      vueData.$set(formData.main, "220802103956IQNRlvaEF4NqX1IAmJz", {
        value: "221115145643KGVNyiLcewTyRR1uDKW",
        text: "信息约稿"
      });
    }
    vueData.$bus.on("inputRadio", function(busObj) {
      if (busObj.metaData.metaId == "220613144546OLVzIc26cX75VPYyyof") {
        if (busObj.text == "直接反馈") {
          vueData.$set(formData.main, "220802103956IQNRlvaEF4NqX1IAmJz", {
            value: "221115145643KGVNyiLcewTyRR1uDKW",
            text: "信息约稿"
          });
        } else {
          vueData.$set(formData.main, "220802103956IQNRlvaEF4NqX1IAmJz", {
            value: "",
            text: ""
          });
        }
      }
    });
  };
  exportObj.custom5 = function(formData, formStruct, vueData) {
    let pk = formStruct.parameters.pk;
    let url = "ctrl/arrangementController/hasRelationInf";
    dsf.http
      .post(url, {
        pk
      })
      .then(result => {
        if (result.data.type == "success") {
          let resultdata = result.data.data;
          if (resultdata.flag == "yes") {
            let fkmethod =
              formData.main["220613144546OLVzIc26cX75VPYyyof"].value;
            let formpk = resultdata.relationFilePk;
            let status = resultdata.status;
            let queryValue = {
              validateByList: 1
            };
            let moduleId;
            if (fkmethod == 1) {
              //我的稿件
              queryValue.listId = "2205191554270uDeR5nIzsQVvVSbCUH";
              moduleId = "220523181758hhFIiKebfU4pzg2n2CF";
              queryValue.imsFormId = "220523182052g6o8et0whBwpTzR09hl";
              queryValue.type =
                formData.main["220802103956IQNRlvaEF4NqX1IAmJz"].text;
            } else {
              //信息约稿（直接反馈）
              queryValue.listId = "220613154750bcjDt9uk6unTPXL4uNg";

              moduleId = "220613154749jCXf8LtZPNoquKtGxXa";
            }

            vueData.$router.push({
              path: `/commonForm/${moduleId}/${formpk}`,
              query: {
                ...queryValue
              }
            });
          } else if (resultdata.flag == "no") {
            let fkmethod =
              formData.main["220613144546OLVzIc26cX75VPYyyof"].value;
            let convertId = "220620091411dzObQpDzvOgqH0zdx4w";

            if (fkmethod == 1) {
              convertId = "220620091411dzObQpDzvOgqH0zdx4w"; //信息约稿 转 我的稿件 转换ID
            } else {
              convertId = "220620094102fZl1rVTpoxkxdVKYvrs"; //信息约稿 转 信息约稿（直接反馈） 转换ID
            }
            moduleRuleConvertEx(convertId, pk);
          }
        } else dsf.layer.toast("操作失败");
      });
    function moduleRuleConvertEx(
      convertId,
      sourcePk,
      callback,
      initData,
      errorCallback,
      opts
    ) {
      opts = opts || {};
      if (convertId) {
        let postData = {
          convertId: convertId,
          srcInfo: sourcePk
        };

        if (
          typeof ModuleObjectConvert != "undefined" &&
          ModuleObjectConvert[convertId]
        ) {
          let objectCovertParam =
            ModuleObjectConvert[convertId]["params"] || {};
          Object.assign(postData, objectCovertParam);
        }

        opts.convertParams = postData;

        function doConvertPost() {
          dsf.http
            .post("ctrl/convert/moduleRuleConvert", postData)
            .then(result => {
              let callbackResult;
              console.log(callback);
              if (callback) {
                callbackResult = callback(result);
              }
              if (callbackResult !== true) {
                if ("success" == result.data.type) {
                  if (typeof customOpenModuleConvert === "function") {
                    customOpenModuleConvert(opts, result.data.data);
                  } else {
                    dsf.layer.toast("操作成功!", true, function() {
                      if (result.data.data["jump"] == "0") {
                      } else {
                        if (
                          opts.isOpenForm != undefined &&
                          opts.isOpenForm == "false"
                        ) {
                          return false;
                        }
                        let data = result.data.data;
                        let queryValue = {
                          sourcePk,
                          convertId
                        };
                        let openFlowNode =
                          result.data.data["openFlowNode"] || "";
                        if (openFlowNode) {
                          queryValue.listId = "customConvertOpenBean";
                          queryValue.openFlowNode = openFlowNode;
                        }
                        vueData.$router.push({
                          path: `/commonForm/${data.moduleId}/${data.pk}`,
                          query: {
                            ...queryValue
                          }
                        });
                      }
                    });
                  }
                } else {
                  dsf.layer.toast(result.result.message);
                }
              }
            });
        }

        //需要文件限制
        dsf.http
          .post("ctrl/convert/fileConvertCount", postData)
          .then(result => {
            if ("success" == result.data.type) {
              //取值
              let canCount = parseInt(result["data"].data);
              if (canCount == -1) {
                doConvertPost();
              } else if (canCount == 0) {
                dsf.layer.toast("转换生成文件已达到设定限制！");
              } else if (canCount > 0) {
                dsf.layer.confirm(
                  {
                    message:
                      "已存在" +
                      canCount +
                      "个转换文件，请确认是否继续转换生成新文件？",
                    confirmButtonText: "确认"
                  },
                  () => {
                    doConvertPost();
                  }
                );
              }
            }
          });
      }
    }
  };
  //山东中烟 约稿发布按钮
  exportObj.manuscrlssued = function(formData, formStruct, vueData) {
    vueData.saveNoTip(function() {
      dsf.http
        .post("fn/sdycYuegao/manuscrIssued", { pk: vueData.formParams.pk })
        .then(res => {
          if (res.data.code == "200") {
            dsf.layer.toast("发布成功", true, () => {
              vueData.backSucces();
            });
          } else {
            dsf.layer.toast(res.data.message, false);
          }
        });
    });
  };
  window.spJS = exportObj;
})();
