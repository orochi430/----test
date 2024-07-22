//【山东中烟】 互动信息表单
(function () {
  const exportObj = {};
  //回复按钮  后台调用cms的程序调用接口推送更新数据
  exportObj.custom5 = function (formData, formStruct, vueData) {
    dsf.layer.confirm({
      message: "该回复将同步内容至外网",
      confirmButtonText:"确认",
      cancelButtonText:"取消"
    }, () => {
      formData.main['210812102252VwmMJxeb4XzJuq9U7cH'].value = 1
      formData.main['210812102252VwmMJxeb4XzJuq9U7cH'].text = '已回复'
      vueData.saveNoTip(function () {
        dsf.layer.toast("回复成功", true, function () {
          vueData.backSucces()
          if (formData.main["2210211021528SYS5CfvnKjLALSRLx4"].value == 1) {
            dsf.http.post("/ctrl/interactinf/updateGetDataInf", {
              pk: formStruct.parameters.pk
            }).then(res => {
              if (res.data.message == "true") {
                console.log("调用后台更新推送数据的回复内容/是否公开/回复时间信息，操作成功");
              } else if (res.data.message == "false") {
                console.log("调用后台更新推送数据的回复内容/是否公开/回复时间信息，操作失败");
              }
            })
          }
        })
      })
    })
  }
  //转互动审批单或者打开互动审批单  如果有已转的就打开没有就类别转换转审批单
  exportObj.custom1 = function (formData, formStruct, vueData) {
    let ztValue = formData.main["210812102252VwmMJxeb4XzJuq9U7cH"].value //状态
    let data = {
      pk: formData.main["A0001"]
    };
    let url = "ctrl/interactinf/haveInteractApprovalRelationFile";
    dsf.http.post(url, data).then(result => {
      console.log(result.data.type,result.data.data.haveFlag,ztValue);
      if (result.data.type == "success" && result.data.data.haveFlag == true) {
        let relationFileId = result.data.relationFileId;
        dsf.layer.confirm({
          message: "存在关联的互动审批单数据，是否查看？",
          confirmButtonText: '确定',
        }, () => {
          formData.main['210812102252VwmMJxeb4XzJuq9U7cH'].value = 2
          formData.main['210812102252VwmMJxeb4XzJuq9U7cH'].text = '已转审批单'
          vueData.buttonHandle["save"](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            vueData.$refs,
            undefined
          );
          vueData.$router.push({
            path: `/commonForm/220613172125bH1ZLWRjmLXvSnKCikA/${relationFileId}`,
            query: {
              validateByList: 1,
              listId: '220613172127oqn0gagfbPs30y7QCF1',
              method: 'viewForm'
            },
          })
        })

      } else if (result.data.type == "success" && result.data.data.haveFlag == false && ztValue != "2") {
        vueData.saveNoTip(function () {
          moduleRuleConvert('220614162244rJuIxCc6WGeTUw0ySez', '', afterCovertToInteractApproval);
        })
      } else if(ztValue == "2") {
        dsf.layer.toast("已转审批单")
      }
    })

    function moduleRuleConvert(convertId, isOpenForm, callback, buttonName) {
      let srcInfo = formStruct.parameters.pk
      let opts = {};
      opts.isOpenForm = isOpenForm;
      moduleRuleConvertEx(convertId, srcInfo, callback, null, null, opts);
    }

    function moduleRuleConvertEx(convertId, sourcePk, callback, initData, errorCallback, opts) {
      opts = opts || {};
      if (convertId) {
        let postData = {
          convertId: convertId,
          srcInfo: sourcePk
        };

        if (initData) {
          postData["initDataSource"] = 1;
        }
        opts.convertParams = postData;

        function doConvertPost() {
          dsf.http.post("ctrl/convert/moduleRuleConvert", postData).then(result => {
            let callbackResult;
            if (callback) {
              callbackResult = callback(result)
            }
            if (callbackResult !== true) {
              if ("success" == result.data.type) {
                if (typeof customOpenModuleConvert === "function") {
                  customOpenModuleConvert(opts, result.data.data);
                } else {
                  dsf.layer.toast("操作成功!", true, function () {
                    if (result.data["jump"] == "0") {} else {
                      if (opts.isOpenForm != undefined && opts.isOpenForm == "false") {
                        return false;
                      }
                      let data = result.data.data;
                      console.log('1111',data);
                      let queryValue = {
                        sourcePk,
                        convertId
                      }
                      // let url = DSF.getURLRoot() + "ctrl/formControl/form?moduleId=" + data.moduleId + "&pk=" + data.pk + "&sourcePk=" + sourcePk + "&convertId=" + convertId;
                      let openFlowNode = result.data["openFlowNode"] || "";

                      if (openFlowNode) {
                        queryValue.listId = 'customConvertOpenBean';
                        queryValue.method ='viewList';
                        queryValue.openFlowNode = openFlowNode
                        // url += "&listId=customConvertOpenBean&method=viewList&openFlowNode=" + openFlowNode;
                      }
                      formData.main['210812102252VwmMJxeb4XzJuq9U7cH'].value = 2
                      formData.main['210812102252VwmMJxeb4XzJuq9U7cH'].text = '已转审批单'
                      vueData.buttonHandle["save"](
                        vueData.$route.params,
                        vueData.formMeta,
                        vueData.formData,
                        vueData,
                        vueData.$refs,
                        undefined
                      );
                      vueData.$router.push({
                        path: `/commonForm/${data.moduleId}/${data.pk}`,
                        query: {
                          ...queryValue
                        }
                      });

                    }
                  })

                }
              } else {
                dsf.layer.toast(result.message)
              }
            }
          })
        }

        //需要文件限制
        dsf.http.post("ctrl/convert/fileConvertCount",
          postData
        ).then((result => {
          if ("success" == result.data.type) { //取值
            let canCount = parseInt(result.data.data);
            if (canCount == -1) {
              doConvertPost();
            } else if (canCount == 0) {
              dsf.layer.toast("转换生成文件已达到设定限制！")
            } else if (canCount > 0) {
              dsf.layer.confirm({
                message: "已存在" + canCount + "个转换文件，请确认是否继续转换生成新文件？",
                confirmButtonText: '确认',
              }, () => {
                doConvertPost();
              })
            }
          }
        }));

      }
    }

    //更新表单状态 已转审批单
    function afterCovertToInteractApproval() {
      let url = 'ctrl/interactinf/updateInteractInfStatus'
      let data = {
        pk: formData.main["A0001"],
        status: "2"
      };
      dsf.http.post(url, data).then(result => {
        if (result.type == "success") {
          console.log("更新互动信息单状态，更新成功");
        }
      })
    }

  }
  //保存按钮
  exportObj.custom4 = function (formData, formStruct, vueData) {
    vueData.saveNoTip(function(){
      dsf.layer.toast('保存成功',true)
    })
  }
  window.spJS = exportObj;
})();
