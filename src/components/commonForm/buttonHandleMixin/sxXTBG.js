export default {
  // 陕西一体化 转领导批示
  forwardSign(routerParam, metaData, formData, VueData, refs) {
    dsf.http.post("fn/swglsx/getLdps", { pk: VueData.pk }).then(({ data }) => {
      if (data.data.length > 1) {
        VueData.componentName = "sxForwardSign"
        VueData.formParams.forwardSign = data.data
      } else if (data.data.length == 1) {
        if (data.data[0].convertLdpsInfoId) {
          VueData.componentName = "sxForwardSign"
          VueData.formParams.forwardSign = data.data
        } else {
          dsf.layer.confirm(
            {
              message: "是否确定转为领导批示？",
              confirmButtonText: "确认",
            },
            () => {
              dsf.http.post("fn/convert/moduleConvert", {
                sourceModule: metaData.parameters.moduleId,
                targetModule: "231021182454DIvMsj0WRzJIVVswcJh",
                srcInfo: metaData.parameters.pk,
                fwPnid: data.data[0].pNId
              }).then((res) => {
                if (res.data.code == 200) {
                  dsf.layer.toast("已成功转为领导批示！")
                } else {
                  dsf.layer.toast("类别转换失败")
                }
              });
            }
          );
        }
      }
    })
  },
  // 陕西一体化 签发
  acceptWeaver(routerParam, metaData, formData, VueData, refs) {
    let loading = null;
    function openFormZc(moduleId, pk, moduleName, opts, dataS) {
      dsf.http.post("fn/weaverExchange/docStatusCallBack", { pk: dataS.pk, recvType: 1 }).then(({ data }) => {
        dsf.layer.closeLoading(loading)
        if (data.code == 200) {
          dsf.layer.toast("操作成功", () => {
            VueData.$router.replace({
              path: `/commonForm/${moduleId}/${pk}/1`,
              query: {
                closePage: 1
              }
            })
          })
        } else {
          dsf.layer.toast("操作失败")
        }
      })
    }
    function onFinishAcceptCallbackZc(targetPk, targetModuleId, moduleName, opts, dataS) {
      setTimeout(function () {
        if (targetPk) {
          openFormZc(targetModuleId, targetPk, moduleName, opts, dataS);
        }
      }, 800);
    }
    function acceptZcConvert(pk, convertId, targetModuleId, opts, ruleId, dataS) {
      let url = "ctrl/remoteExchange/acceptByRule";
      let data = {
        pk: pk,
        convertId: convertId,
        targetModuleId: targetModuleId,
        isConvertToDo: opts.isConvertToDo === undefined ? false : opts.isConvertToDo,
        doSign: opts.doSign === undefined ? true : opts.doSign,
        ruleId: ruleId
      };
      dsf.http.post(url, data).then(function (result) {
        if (result.data.type == "success" && result.data.data) {
          let dt = result.data.data;
          let targetPk = dt.pk;
          let targetModuleName = dt.moduleName;
          dsf.http.post("ctrl/dreamWebsocket/sendMessageToCurrentUser", { badgeType: "remoteDoc" })
          onFinishAcceptCallbackZc(targetPk, targetModuleId, targetModuleName, opts, dataS);
        } else {
          dsf.layer.closeLoading(loading)
          dsf.layer.toast(result.data.message)
        }
      });
      // }
    }
    function doAcceptZc(moduleId, pk, opts = {}) {
      loading = dsf.layer.loading()
      let dataS = {
        docId: formData.main["A0002"].value,
        recvType: "1",
        recvInfo: "",
        pk: pk
      }
      let reqParam = {
        rcvRecordId: pk
      };
      dsf.http.post("ctrl/remoteExchangeData/getReceiveTarget", reqParam).then(function (res) {
        if (res.data.type === "success") {
          if (res.data.data && res.data.data.length > 1) {
            VueData.$refs.ckDialog
              .show(
                res.data.data,
                "请选择要转换的目标模块",
                "ruleId",
                "ruleName",
                [],
                false
              )
              .then((idArr) => {
                console.log(idArr);
                let targetData = res.data.data.find(item => item.ruleId == idArr[0]);
                acceptZcConvert(
                  pk,
                  targetData.id,
                  targetData.targetModuleId,
                  opts,
                  targetData.ruleId,
                  dataS
                );
              })
              .catch(() => {
                dsf.layer.closeLoading(loading)
                dsf.layer.toast("请选择要转换的目标模块");
              });
          } else {
            if (res.data.data && res.data.data.length > 0) {
              let targetData = res.data.data[0];
              opts.convertId = targetData.id; //类别转换id
              opts.ruleId = targetData.ruleId; //规则id
              opts.exchangeDocType = targetData.exchangeDocType;
              acceptZcConvert(
                pk,
                targetData.id,
                targetData.targetModuleId,
                opts,
                targetData.ruleId,
                dataS
              );
            } else {
              dsf.layer.closeLoading(loading)
              dsf.layer.toast("签收模块未配置");
            }
          }
        } else {
          dsf.layer.closeLoading(loading)
          dsf.layer.toast("转换失败")
        }
      });
    };

    doAcceptZc(metaData.parameters.moduleId, metaData.parameters.pk)
  },
  // 陕西一体化 退回
  rejectWeaver(routerParam, metaData, formData, VueData, refs) {
    VueData.componentName = "sxCopyOpinion"
    VueData.formParams.showWeaver = true
    VueData.spHandleJS.closeDialogCallback = function (data) {
      if (data.actionName == "确定") {
        let docId = formData.main["A0002"];
        let dataS = {
          docId: docId,
          recvType: "2",
          recvInfo: data.value,
          pk: metaData.parameters.pk
        }
        dsf.http.post("fn/weaverExchange/docStatusCallBack", dataS).then(({ data }) => {
          if (data.code == 200) {
            dsf.http.post("ctrl/dreamWebsocket/sendMessageToCurrentUser", { badgeType: "remoteDoc" }).then(() => {
              dsf.http.post("ctrl/dreamWebsocket/sendMessageToCurrentUser", { badgeType: "notice" }).then(() => {
                dsf.layer.toast("操作成功", () => {
                  VueData.backSucces()
                })
              })
            })
          } else {
            dsf.layer.toast("操作失败")
          }
        })
      }
    }
  },
  // 陕西一体化  意见列表
  changeOpinion(routerParam, metaData, formData, VueData, refs) {
    VueData.componentName = "opinionSxDialog"
    VueData.spHandleJS.closeDialogCallback = function (data) {
      VueData.initData()
    }
  },
  // 陕西一体化 强制删除按钮
  delFlowFile(routerParam, metaData, formData, VueData, refs) {
    let infoId = formData.main["A0001"].value;
    let moduleId = formData.main["A0004"].value;
    dsf.layer.confirm({
      message: "确定要彻底删除文件吗？",
      confirmButtonText: "确认"
    }, () => {
      toDelFlowFile()
    })
    function toDelFlowFile() {
      dsf.http.post("fn/shareRead/toDelFlowFile", { infoId: infoId, moduleId: moduleId }).then(function (result) {
        if (result.data.type == "success") {
          // 蓝信删除接口
          dsf.http.post("fn/lxOperData/delData", { infoId: infoId }).then(() => {
            dsf.layer.toast(result.data.message);
            VueData.backSucces()
          })
        } else {
          dsf.layer.toast(result.data.message);
        }
      });
    }
  },
  // 陕西一体化 批示内容 特殊发布表单信息
  shanxiRelease(routerParam, metaData, formData, VueData, refs, saveAfter) {
    let params = {
      infoId: formData.main['A0001'].value,
      bh: formData.main['B0003'].value,
      bt: formData.main['B0001'].value,
      tsrId: formData.main['C-REPORT-PUBLICATION-0008'].value,
      tsbt: formData.main['231124151534qUJ6fuhvWB66gbKWz1H'].value,
      moduleId: formData.main['A0004'].value,
    }
    if (metaData.parameters.nodeId == "Aw6aX6SQdlpb3it") {
      VueData.saveNoTip(() => {
        dsf.layer.confirm({
          title: '信息',
          message: `是否发布并办结?`,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }, () => {
          dsf.http.post("fn/informationDataController/docxToHtmlTextAfterPublish", params).then((res) => {
            console.log(res);
            if (res.data.code == '200') {
              formData.main['C-REPORT-PUBLICATION-0006'].text = '已发布'
              formData.main['C-REPORT-PUBLICATION-0006'].value = '1'
              VueData.buttonHandle.send(routerParam, metaData, formData, VueData, refs, saveAfter)
            }
          })
        }, () => {
          console.log("取消发布");
        })

      });
    } else {
      dsf.http.post("fn/informationDataController/docxToHtmlTextAfterPublish", params).then((res) => {
        if (res.data.code == '200') {
          dsf.layer.toast("发布成功!")
        }
      })
    }
  },
  // 陕西一体化 转领导批示自定义按钮
  convertToLeaderPs(routerParam, metaData, formData, VueData, refs) {
    let srcInfo = metaData.parameters.pk;
    dsf.http.post("fn/informationDataController/checkHaveConverted", { infoId: srcInfo }).then(function (result) {
      if ("success" == result.data.type) {
        if (result.data.data != "0") {
          dsf.layer.confirm(
            {
              message: "已生成过领导批示，是否需再次生成？",
              confirmButtonText: "确认",
            },
            () => {
              VueData.buttonHandle['Public.moduleRuleConvert'](routerParam, metaData, formData, VueData, refs, "", { convertId: "231130151924DWxUHL4ajooqw6zVkcs" });
            }
          )
        } else {
          VueData.buttonHandle['Public.moduleRuleConvert'](routerParam, metaData, formData, VueData, refs, "", { convertId: "231130151924DWxUHL4ajooqw6zVkcs" })
        }
      } else {
        dsf.layer.toast("服务器出错！")
      }
    });
  },
  xformSendFilter(routerParam, metaData, formData, VueData, refs) {
    dsf.http.post("fn/operLog/saveOper", {
      operName: VueData.nowButton.name,
      operPosition: VueData.$route.name,
      operData: VueData.nowButton.action,
      pk: metaData.parameters.pk,
      bt: formData.main["B0001"].value,
      isPc: 2
    }).then(() => {
      VueData.buttonHandle.send(routerParam, metaData, formData, VueData, refs)
    })
  }
}