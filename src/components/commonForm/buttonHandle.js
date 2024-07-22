import dsf from "../../common";
import { ImagePreview } from "vant";
const saveForm = (params) => dsf.http.post("fn/xform/save", params); //表单保存
const setFocusFn = (params) => dsf.http.post("fn/mobileFocus/setFocus", params); //收藏//关注
const getFlowNode = (params) =>
  dsf.http.post("fn/mobileFlow/getFlowNode", params); //流程 选择流程
const deleteFocusFn = (params) =>
  dsf.http.post("/fn/mobileFocus/deleteFocus", params); //取消收藏，关注
const signInFn = (params) => dsf.http.post("fn/meeting/signMeeting", params); //签到
const documentResiveFn = (params) =>
  dsf.http.post("fn/remoteExchangeData/getReceiveTarget", params); //公文签收
const documentResiveAccept = (params) =>
  dsf.http.post("fn/remoteExchange/accept", params); //公文交换---签收办理---模块签收
const documentResiveAcceptByRule = (params) =>
  dsf.http.post("fn/remoteExchange/acceptByRule", params); //公文交换---签收办理---模块签收
const toppingFn = (params) => dsf.http.post("/fn/mobileToDo/topRead", params); //置顶
const cancelToppingFn = (params) =>
  dsf.http.post("/fn/mobileToDo/unTopRead", params); //取消置顶
const afterReadingFn = (params) =>
  dsf.http.post("fn/mobileToReadOperation/readed", params); //阅毕
const resiveInfoFn = (params) =>
  dsf.http.post("fn/remoteExchangeData/getSendRecord", params); //签收情况
const opinionReceiptFn = (params) =>
  dsf.http.post("fn/remoteExchange/feedbackByServer", params); //意见回执
const mettingCancelFn = (params) =>
  dsf.http.post("fn/meeting/endMeetingInstance", params); //会议取消
const logicDeleteXFormFn = (params) =>
  dsf.http.post("fn/recycle/logic", params); //删除
const agreeRecycleFn = (params) =>
  dsf.http.post("fn/flow/agreeRecycle", params); //错发回收同意回收
const refuseRecycleFn = (params) =>
  dsf.http.post("fn/flow/refuseRecycle", params); //错发回收同意回收
const releaseNoticeFn = (params) =>
  dsf.http.post("fn/supervise/approval/issue", params);
const releaseNoticeFn2 = (params) =>
  dsf.http.post("fn/supervise/approval/noticeIssue", params); //督办通知单下发通知
const feedBack = (params) =>
  dsf.http.post("fn/supervise/approval/feedBack", params); //反馈
const convert = (params) =>
  dsf.http.post("/fn/convert/moduleRuleConvert", params); // 类别转换
const handleSign = (params) =>
  dsf.http.post("fn/opinionSignCheck/todoUpdSign", params); // 签名,取消签名
const cancelEndNode = (params) =>
  dsf.http.post("/fn/flow/cancelEndNode", params); // 取消办结节点
const cancelEndInstance = (params) =>
  dsf.http.post("/fn/flow/cancelEndInstance", params); // 取消办结

const userinfo = dsf.util.loadSessionStore("user");

const changeFormData = (formData, VueData) => {
  let forSave = {
    maininfo: {},
  };
  //console.log(formData)
  if (formData.main) {
    let mainData = formData.main;
    Object.entries(mainData).forEach((element) => {
      let keys = element.slice(0);
      keys.shift();
      let forSaveArray = [];

      keys.forEach(function (onekey) {
        Object.keys(onekey).forEach(function (onePro) {
          forSaveArray.push({
            key: onePro,
            value: onekey[onePro],
          });
        });
      });
      forSave.maininfo[element[0]] = {
        values: forSaveArray,
      };
    });
  }
  if (formData.multinfos) {
    let multinfos = JSON.parse(JSON.stringify(formData.multinfos));
    Object.entries(multinfos).forEach((item) => {
      item[1].rows.forEach((itm) => {
        Object.entries(itm).forEach((element) => {
          if (element[0] != "action" && element[0] != "structControl") {
            let keys = element.slice(0);
            keys.shift();
            let forSaveArray = [];

            keys.forEach(function (onekey) {
              Object.keys(onekey).forEach(function (onePro) {
                forSaveArray.push({
                  key: onePro,
                  value: onekey[onePro],
                });
              });
            });
            itm[element[0]] = {
              values: forSaveArray,
            };
          }
        });
        delete itm.structControl;
      });
      // multinfos为真正子表元数据，删除maininfo中的子表数据
      if (forSave.maininfo[item[0]]) {
        delete forSave.maininfo[item[0]];
      }
    });
    //console.log(multinfos)
    forSave.multinfos = multinfos;
  }
  if (formData.flowinfo) {
    forSave.flowinfo = formData.flowinfo;
    /**
     * 经过与胡明路沟通，非拟稿时当表单无(意见控件、意见驱动控件、按钮输入意见)时则不需要传这三个参数，
     * "opinionContent":"","handwritePic":"","handwriteThumb":""
     * @luy 时间：2023年5月1日12:48:32
     */
    // if (VueData&&!VueData.formParams.isNewFile&&!(VueData.hasControlOpinionTagView||VueData.isShowQiXiangJuEditOpinion||VueData.isShowWriteOpintionBtn)) {
    //     let flowKey = `flow-${VueData.pk}-${VueData.formMeta.parameters.pId}-${VueData.formMeta.parameters.pnId}`;
    //     VueData.$delete(forSave.flowinfo[flowKey],'opinionContent')
    //     VueData.$delete(forSave.flowinfo[flowKey],'handwritePic')
    //     VueData.$delete(forSave.flowinfo[flowKey],'handwriteThumb')
    // }
  }
  if (formData.distribinfo) {
    forSave.distribinfo = formData.distribinfo;
  }
  return forSave;
};
const getSubFormNotVaildateMetas = (formData, VueData) => {
  let str = ''
  if (formData.multinfos) {
    Object.keys(formData.multinfos).forEach(key => {
      if (formData.multinfos[key].notVaildateMetas?.length > 0) {
        str += ('$' + key + '^' + formData.multinfos[key].notVaildateMetas.join(','))
      }
    })
  }
  return str
}

const buttonHandle = {
  releaseNoticeFn,
  save(
    routerParam,
    metaData,
    formData,
    VueData,
    refs,
    callback,
    isBack,
    params,
    isValidate = true,
    isTip = true
  ) {
    //保存--------YY
    let saveFilterThen = async function () {
      let saveFunc = function () {
        let loadingIdx = null;
        if (isTip) loadingIdx = dsf.layer.loading("提交中");
        //判断当前是否存在签批tab，存在的话就需要调用一次保存(使用嵌入iframe时)
        if (
          refs.signForm &&
          refs.signForm.length &&
          refs.signForm[0].$refs["currentFile"] &&
          refs.signForm[0].$refs["currentFile"].contentWindow.signMobile
        ) {
          refs.signForm[0].$refs["currentFile"].contentWindow.setCompleteHandle(
            1
          );
        }
        //判断当前是否存在签批tab，存在的话就需要调用一次保存(使用签批插件时)
        if (
          refs.signForm &&
          refs.signForm.length &&
          refs.signForm[0].$refs["tabEnclosurePreview"]
        ) {
          refs.signForm[0].$refs["tabEnclosurePreview"].setCompleteHandle(1);
        }

        //判断当前是否存在相关文件tab，并且可签批状态下执行保存签批内容操作
        if (
          refs.relevantFile &&
          refs.relevantFile.length &&
          refs.relevantFile[0].$refs["enclosure"] &&
          !refs.relevantFile[0].$refs["enclosure"].isPreview
        ) {
          refs.relevantFile[0].$refs["enclosure"].$refs[
            "tabEnclosurePreview"
          ].setCompleteHandle(1);
        }

        let saveObj = {
          moduleId: VueData.formParams.moduleId,
          pk: VueData.formParams.pk || formData.main.A0001.value,
          flowId: formData.main["A0006"]?.value || metaData.parameters.flowId,
          nodeId: routerParam.nodeId || metaData.parameters.nodeId,
          nodeName: metaData.parameters.nodeName,
          formId: metaData.parameters.formId,
          initDataSource: VueData.$route.query.initDataSource
            ? VueData.$route.query.initDataSource
            : null,
          __DATA: JSON.stringify(changeFormData(formData, VueData)),
          notVaildateMetas:
            "main^" + [...new Set(VueData.notVaildateMetas)].join(",") + getSubFormNotVaildateMetas(formData, VueData)
        };
        if (
          VueData.$route.query.todoId &&
          VueData.$route.query.agencyType == "2"
        ) {
          saveObj.agencyType = 2;
          saveObj.agencyUserId = VueData.$route.query.agencyUserId;
          saveObj.agencyUserName = VueData.$route.query.agencyUserName;
        }
        let specialSaveObj = VueData.$route.query.specialSaveObj
          ? JSON.parse(VueData.$route.query.specialSaveObj)
          : {};
        saveForm(Object.assign(specialSaveObj, saveObj))
          .then(function (res) {
            if (res.data.code != 200) {
              dsf.layer.toast(res.data.message.split("(")[0]);
              return;
            } else {
              if (dsf.config.commonForm.saveToStorage) VueData.delFormStorage()
              VueData.removeLocalOptions();
              VueData.initSubForm();
              if (callback) {
                dsf.layer.closeLoading(loadingIdx);
                let sendButtonParams = params
                  ? params
                  : VueData.nowButtonParameters;
                callback(VueData, sendButtonParams, formData);
              } else {
                //refresh只有在纯保存操作时才调用，如果是发送则不调用，因为发送后有其他函数调用负责refresh操作
                let successMessage =
                  VueData.nowButtonParameters.successMessage || "表单保存成功"; // 按钮配置保存成功提示参数
                if (isTip) dsf.layer.toast(successMessage);
                // 是保存按钮时，取参数1 保存后关闭
                if (
                  VueData.nowButton.action == "save" &&
                  (VueData.nowButtonParameters.saveType == "1" ||
                    VueData.nowButtonParameters.saveType == "5")
                ) {
                  VueData.backSucces();
                } else {
                  VueData.$eventBus.refresh(VueData, {
                    text: 123,
                    noRefreshTitle: true,
                  });
                }
              }
              if (isBack) {
                VueData.backSucces();
              }
            }
          })
          .error(function () { });
      };

      let nestedFormPromiseAll = []; //所有嵌套表单的保存方法
      Object.keys(metaData.subform).forEach(async (obj, index) => {
        if (VueData.$refs?.formTab[0]?.$refs[obj]) {
          let tempForm =
            VueData.$refs.formTab[0].$refs[obj][0].$refs.subform.$refs
              .nestedForm; //子表控件中找嵌套表单
          // console.log(tempForm)
          if (tempForm) {
            tempForm.forEach((element) => {
              nestedFormPromiseAll.push(
                element.$refs.controlNestedForm.saveNestedForm()
              );
            });
          }
        }
      });
      if (nestedFormPromiseAll.length) {
        await Promise.all(nestedFormPromiseAll);
      }

      if (VueData.allFile.length) {
        for (let i = 0; i < VueData.allFile.length; i++) {
          if (
            VueData.allFile[i].allowVerify == 1 &&
            VueData.allFile[i].file.length == 0
          ) {
            dsf.layer.toast(`${VueData.allFile[i].name}不能为空，请上传文件`);
            return;
          }
        }
      }
      if (
        VueData.$refs.formTab &&
        VueData.$refs.formTab.length &&
        VueData.$refs.formTab[0].$refs.commonForm &&
        isValidate
      ) {
        VueData.$refs.formTab[0].$refs.commonForm
          .validate()
          .then(() => {
            saveFunc();
          })
          .catch((rej) => {
            console.log(rej);
            VueData.headTab = "formTab"; // 表单验证不通过返回表单页
            VueData.$nextTick(() => {
              VueData.$refs.formTab[0].$refs.commonForm.scrollToField(
                rej[0].name
              );
            });
            dsf.layer.toast(rej[0].message, false);
          });
      } else {
        saveFunc();
      }
    };
    if (VueData.spHandleJS && VueData.spHandleJS.saveFilter) {
      VueData.spHandleJS
        .saveFilter(
          VueData.formData,
          VueData.formMeta,
          VueData,
          VueData.nowButtonParameters.action
        )
        .then((res) => {
          saveFilterThen();
        })
        .catch((err) => {
          console.log(err);
          dsf.layer.toast(err);
        });
    } else {
      saveFilterThen();
    }
  },
  saveNoTip(
    routerParam,
    metaData,
    formData,
    VueData,
    callback,
    isValidate = true
  ) {
    //保存无任何提示--------YY isValidate 默认需要校验
    this.save(
      routerParam,
      metaData,
      formData,
      VueData,
      VueData.$refs,
      callback,
      false,
      null,
      isValidate,
      false
    );
  },
  saveNestedFormSync(
    routerParam,
    metaData,
    formData,
    VueData,
    refs,
    callback,
    isBack,
    params
  ) {
    //保存--------YY
    console.log("Updated111");
    return new Promise((resolve, reject) => {
      saveForm({
        moduleId: metaData.parameters.moduleId,
        pk: metaData.parameters.pk,
        flowId: metaData.parameters.flowId,
        nodeId: metaData.parameters.nodeId,
        formId: metaData.parameters.formId,
        initDataSource: null,
        __DATA: JSON.stringify(changeFormData(formData)),
        notVaildateMetas: "main^" + [...new Set(VueData.notVaildateMetas)],
      })
        .then(function (res) {
          console.log("Updated11");
          resolve(res);
        })
        .error(function (err) {
          reject(err);
        });
    });
  },
  saveAndBack(routerParam, metaData, formData, VueData, refs, callback) {
    this.save(routerParam, metaData, formData, VueData, refs, callback, true);
  },
  async send(
    routerParam,
    metaData,
    formData,
    VueData,
    refs,
    saveAfter,
    params,
    moreSendButtonParams
  ) {
    //发送--------YY
    let self = this;
    let sendParam = JSON.parse(JSON.stringify(metaData));
    let sendButtonParams = params ? params : VueData.nowButtonParameters;
    if (Object.keys(sendButtonParams).length == 0) {
      sendButtonParams = {
        pid: metaData.parameters.pId,
        pnid: metaData.parameters.pnId,
        wfId: metaData.parameters.flowId,
      };
    }
    if (moreSendButtonParams)
      Object.assign(sendButtonParams, moreSendButtonParams);

    // 指定意见内容
    if (sendButtonParams.sendOpinion) {
      if (metaData.controls.find((item) => item.controlType == "controlEditOpinion")) {
        metaData.controls.find(
          (item) => item.controlType == "controlEditOpinion"
        ).extra.opinionContent += sendButtonParams.sendOpinion;
      } else {
        VueData.isShowWriteOpintionBtn = true;
        VueData.alreadyWriteOpintion = true;
        await dsf.http.post(
          `/fn/mobileSaveOpinion/saveOpinion?flowId=${metaData.parameters.flowId}&nodeId=${metaData.parameters.nodeId}&moduleId=${metaData.parameters.moduleId}`,
          {
            __DATA: JSON.stringify({
              info_id: metaData.parameters.pk,
              pid: new String(metaData.parameters.pId),
              pnid: new String(metaData.parameters.pnId),
              opinion: sendButtonParams.sendOpinion,
              type: "g_inbox",
            }),
          }
        ).then((res) => {

        })
      }
    }

    async function foo(VueData, sendButtonParams) {
      if (saveAfter) {
        await saveAfter(VueData, sendButtonParams, formData);
      }

      //console.log(VueData.shoEditOpinion)
      VueData.sendFileData = {
        opinionContent: sendButtonParams.opinionContent,
        id: sendButtonParams.infoId,
        moduleId: routerParam.moduleId,
        sendType: sendButtonParams.sendType || "SR_SEND",
        pid: sendButtonParams.pid || metaData.parameters.pId || 0,
        pnid: sendButtonParams.pnid || metaData.parameters.pnId || 0,
        flowId: sendButtonParams.wfId || metaData.parameters.flowId,
        nextLineId: sendButtonParams.nextLineId,
        info_id: metaData.parameters.pk,
        bt: sendButtonParams.bt,
        moduleName: "",
        allowEditOpinion: VueData.shoEditOpinion
          ? metaData.parameters.allowEditOpinion
          : VueData.shoEditOpinion,
        opinionRequired: metaData.parameters.opinionRequired,
        direction: sendButtonParams.direction,
        nodeId: metaData.parameters.nodeId,
        hasControlOpinionTagView: VueData.hasControlOpinionTagView,
        nextNodeId: sendButtonParams.nextNodeId,
        isBackTrack: sendButtonParams.isBackTrack,
        intelligenceSend: sendButtonParams.intelligenceSend, // 智能发送
        determineUser:
          sendButtonParams.determineUser || VueData.$route.query.agencyUserId,
        disableAutoSend: sendButtonParams.disableAutoSend,
        agencyType: VueData.$route.query.agencyType,
        sendUserId: sendButtonParams.RealUserId,
        sendUserName: sendButtonParams.RealUserName,
        sendDeptId: sendButtonParams.RealDeptID,
        sendDeptName: sendButtonParams.RealDeptName,
      };
      // 意见输入框通过按钮弹出，并且没有意见驱动控件时，发送需要判断是否填写意见并弹出
      let isGo = true;
      VueData.formParams.sendCheck = true;
      if (dsf.config.commonFlow?.openOpinionPopupBeforeSend) {
        if (
          VueData.shoEditOpinion != 0 &&
          metaData.parameters.allowEditOpinion > 0 &&
          !VueData.alreadyWriteOpintion
        ) {
          isGo = false;
          self.BtnWriteOpinion(routerParam, metaData, formData, VueData, refs);
        }
      } else {
        if (VueData.hasControlOpinionTagView) {
          // 发送前判断意见驱动必填
          if (!Object.values(formData.flowinfo)[0].opinionContent) {
            isGo = false;
            dsf.layer.toast("请填写意见", false);
          } else {
            VueData.formParams.sendCheck = false;
          }
        } else if (
          metaData.parameters.opinionRequired &&
          VueData.isShowQiXiangJuEditOpinion &&
          VueData.formParams.isSign == 0
        ) {
          VueData.formParams.sendCheck = false;
          if (VueData.qixiangjuOpinion.length < 1) {
            isGo = false;
            // dsf.layer.toast("请填写意见", false);
            //self.qxjEditOpinion(routerParam, metaData, formData, VueData, refs)
          }
        } else if (
          metaData.parameters.opinionRequired &&
          VueData.isShowWriteOpintionBtn &&
          !VueData.hasControlOpinionTagView &&
          VueData.formParams.isSign == 0
        ) {
          VueData.formParams.sendCheck = false;
          if (VueData.currentOpintion.length < 1) {
            isGo = false;
            // dsf.layer.toast("请填写意见", false);
            self.BtnWriteOpinion(
              routerParam,
              metaData,
              formData,
              VueData,
              refs
            );
          }
        }
      }
      if (isGo) {
        VueData.showPopUp = true;
        VueData.alreadyWriteOpintion = false;
        VueData.$nextTick(() => {
          VueData.$refs["sendPop"].$el.style.display = "none";
          VueData.$refs.sendFileCom.show();
        });
      }
    }
    // let arr = metaData.controls.map((item) => {
    //   return item.privilege.editable
    // }).filter(item => item)
    // if (!arr.length) {
    //   foo(VueData, sendButtonParams)
    // } else {
    this.save(
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      foo,
      false,
      sendButtonParams
    );
    // }
  },
  custom1(routerParam, metaData, formData, VueData, refs, callback) {
    //上报（提交）
    if (formData.main["G-REPORT-003"].value == 2) {
      VueData.$set(formData.main, "G-REPORT-003", {
        value: "4",
        text: "已调整",
      });
    } else {
      VueData.$set(formData.main, "G-REPORT-003", {
        value: "3",
        text: "已上报",
      });
    }
    this.saveAndBack(routerParam, metaData, formData, VueData, refs, callback);
  },
  custom2(routerParam, metaData, formData, VueData, refs) {
    //取消上报
    VueData.$set(formData.main, "G-REPORT-003", {
      value: "2",
      text: "已取消",
    });
    this.save(routerParam, metaData, formData, VueData, refs);
  },
  deleteFocus(routerParam, metaData, formData, VueData, refs) {
    //取消收藏，关注------Y
    dsf.layer.loading("提交中");
    let buttonParams = VueData.nowButtonParameters;
    //console.log(buttonParams)
    let paramsObj = {
      // fid: 0,
      infoId: buttonParams.infoId,
      "x-auth-token": dsf.util.loadSessionStore("loginToken"),
    };
    deleteFocusFn(paramsObj).then(({ data }) => {
      let { message } = data;
      dsf.layer.toast(message);
      if (message == "操作成功") {
        VueData.initData();
      }
    });
  },
  setFocus(routerParam, metaData, formData, VueData, refs) {
    //收藏，关注---------Y
    if (dsf.config.setting["SYS-MOBILE-FORM-0018"] != 1) {
      dsf.layer.loading("提交中");
      let buttonParams = VueData.nowButtonParameters;
      let paramsObj = {
        fid: 0,
        infoId: buttonParams.infoId,
        "x-auth-token": dsf.util.loadSessionStore("loginToken"),
      };
      setFocusFn(paramsObj).then(({ data }) => {
        // let { message } = data;
        dsf.layer.toast("操作成功");
        VueData.initData();
      });
    } else {
      VueData.showChooseFolder = true;
    }
  },
  logicDeleteXForm(routerParam, metaData, formData, VueData, refs) {
    //删除---------------YY
    let array = new Array();
    let param = {
      pk: metaData.parameters.pk,
      moduleId: metaData.parameters.moduleId,
    };
    array.push(param);
    let data = {
      data: JSON.stringify(array),
      moduleId: metaData.parameters.moduleId,
    };
    dsf.layer.confirm(
      {
        message: "是否确认删除",
        confirmButtonText: "确认",
      },
      () => {
        if (VueData.spHandleJS && VueData.spHandleJS.beforeDelete) {
          VueData.spHandleJS
            .beforeDelete(VueData.formData, VueData.formMeta, VueData)
            .then((result) => {
              logicDeleteXFormFn(data).then((res) => {
                VueData.dsf.layer.toast(res.data.message);
                if (VueData.specialJSObj.spHandleJS["afterLogicDeleteXForm"]) {
                  VueData.specialJSObj.spHandleJS["afterLogicDeleteXForm"](
                    VueData.formData,
                    VueData.formMeta,
                    VueData
                  );
                }
                VueData.backSucces();
              });
            });
        } else {
          logicDeleteXFormFn(data).then((res) => {
            VueData.dsf.layer.toast(res.data.message);
            if (VueData.specialJSObj.spHandleJS["afterLogicDeleteXForm"]) {
              VueData.specialJSObj.spHandleJS["afterLogicDeleteXForm"](
                VueData.formData,
                VueData.formMeta,
                VueData
              );
            }
            VueData.backSucces();
          });
        }
      }
    );
  },
  qingDiao(routerParam, metaData, formData, VueData, refs) {
    //签到-------------YY
    signInFn({
      pk: formData.main.A0001.value,
      deviceId: "", //选填
      userId: dsf.util.loadSessionStore("user").user_id,
    })
      .then(function (res) {
        VueData.dsf.layer.toast(res.data.message);
        VueData.init();
      })
      .error(function () {
        VueData.dsf.layer.toast("网络忙,请重试");
      });
  },
  zhiDing(routerParam, metaData, formData, VueData, refs) {
    //置顶-----------W
    toppingFn({
      pk: formData.main.A0001.value,
      type: VueData.getType(),
    })
      .then(({ data }) => {
        const { message, result, type } = data;
        if (type === "success" || result) {
          VueData.init();
        }
        dsf.layer.toast("操作成功");
      })
      .error(() => {
        dsf.layer.clear();
      });
  },
  quXiaoZhiDing(routerParam, metaData, formData, VueData, refs) {
    //取消置顶-----------W
    cancelToppingFn({
      pk: formData.main.A0001.value,
      type: VueData.getType(),
    })
      .then(({ data }) => {
        const { message, result, type } = data;
        if (type === "success" || result) {
          VueData.init();
        }
        dsf.layer.toast("操作成功");
      })
      .error(() => {
        dsf.layer.clear();
      });
  },
  reviewed(routerParam, metaData, formData, VueData, refs) {
    //阅毕--------------Y
    //console.log(formData)
    let buttonParams = {
      infoIds: formData.main.A0001.value,
      distribIds: formData.distribId,
      shareContent: formData.distribinfo
        ? Object.values(formData.distribinfo)[0].shareContent
        : "已阅",
    };
    // VueData.$router.go(-1);
    // return;
    let afterReading = function () {
      afterReadingFn(buttonParams)
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            // VueData.init();
            dsf.layer.toast("阅毕成功", true, () => VueData.backSucces());
          }
        })
        .error(() => {
          dsf.layer.clear();
        });
    };
    afterReading();
    // this.save(routerParam, metaData, formData, VueData, refs, afterReading);
  },
  instruction(routerParam, metaData, formData, VueData, refs) {
    //批示阅毕--------------Y
    VueData.showyuebi = true;
    VueData.$nextTick(() => {
      VueData.$refs.yuebi.Show();
    });
  },
  "Flow.backSend"(routerParam, metaData, formData, VueData, refs) {
    this.save(routerParam, metaData, formData, VueData, refs, () => {
      VueData.returnNodePop = true;
    });
  },
  dswReaded(routerParam, metaData, formData, VueData, refs) {
    //阅毕进已办（大事务）
    let pk = metaData.parameters.pk;
    this.reviewed(routerParam, metaData, formData, VueData, refs);
    dsf.http.post("fn/ybController/ybyb", { pk: pk });
  },

  partReview(routerParam, metaData, formData, VueData, refs) {
    //分阅----------------------YY
    let shareRead = function () {
      VueData.showSeparate = true;
      let data = {
        info_id: formData.main.A0001.value,
      };
      VueData.$nextTick(() => {
        VueData.$refs.readPop.show(data).then(
          () => {
            if (
              VueData.nowButtonParameters.refreshForm == 1 ||
              VueData.formMeta.controls.find(
                (ctr) => ctr.controlType == "controlShareRead"
              )
            ) {
              VueData.init();
            }
          },
          (msg) => { }
        );
      });
    };
    this.save(routerParam, metaData, formData, VueData, refs, shareRead);
  },
  rePartReview(routerParam, metaData, formData, VueData, refs) {
    //再次分阅----------------------YY
    let shareRead = function () {
      VueData.showSeparate = true;
      let data = {
        info_id: formData.main.A0001.value,
      };
      //如果已经存在分阅文件ID了 那就是再次分阅的操作，添加该参数
      if (
        VueData.$route.query.distribId &&
        VueData.$route.query.distribId != "0"
      ) {
        data.distribId = VueData.$route.query.distribId;
      }
      VueData.$nextTick(() => {
        VueData.$refs.readPop.show(data).then(
          () => {
            if (
              VueData.formMeta.controls.find(
                (ctr) => ctr.controlType == "controlShareRead"
              )
            ) {
              VueData.init();
            }
          },
          (msg) => { }
        );
      });
    };
    this.save(routerParam, metaData, formData, VueData, refs, shareRead);
  },
  fenYue(routerParam, metaData, formData, VueData, refs) {
    //PC分阅按钮1----------------------YY
    this.partReview(routerParam, metaData, formData, VueData, refs);
  },
  "xform.shareRead"(routerParam, metaData, formData, VueData, refs) {
    //PC分阅按钮2----------------------YY
    this.partReview(routerParam, metaData, formData, VueData, refs);
  },
  "xform.close"(routerParam, metaData, formData, VueData, refs) {
    //表单关闭
    VueData.$router.go(-1);
  },
  viewMeetingSignPD(routerParam, metaData, formData, VueData, refs) {
    //报名情况---------------YY
    VueData.$router.push({
      path: "/meeting/signup/status",
      query: {
        id: formData.main.A0001.value,
      },
    });
  },
  videoConferencing(routerParam, metaData, formData, VueData, refs) {
    //视频会议----------------w
    dsf.video.startWithConf(
      formData.main.A0001.value ||
      formData.main.A0001.value ||
      formData.main.A0001.value
    );
  },
  processVideo(routerParam, metaData, formData, VueData, refs) {
    // 流程视频------------w
    dsf.video.startWithForm(
      formData.main.A0001.value ||
      formData.main.A0001.value ||
      formData.main.A0001.value
    );
  },
  "RemoteDocExchange.remoteFeedback": function (
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    function foo(VueData) {
      //console.log(VueData.$route)
      dsf.http
        .post(
          `fn/remoteExchange/feedback?rcvRecordId=${VueData.$route.params.rcvRecordId}&feedbackId=${VueData.$route.params.pk}&feedbackModuleId=${VueData.$route.params.moduleId}`
        )
        .then((res) => {
          if (res.data.type == "success") {
            VueData.dsf.layer.toast(res.data.message);
          }
        });
    }
    this.save(routerParam, metaData, formData, VueData, refs, foo);
  },
  yiJianHuiZhi(routerParam, metaData, formData, VueData, refs) {
    //意见回执------------YY
    //console.log(metaData, formData)
    dsf.http
      .post("fn/remoteExchange/feedbackByServer", {
        rcvRecordId: formData.main["A0001"].value,
        doFeedback: false,
      })
      .then((res) => {
        const { message, type, data } = res.data;
        if (type === "success") {
          VueData.$router.push({
            name: "commonForm",
            params: {
              pk: data.feedbackId,
              moduleId: data.feedbackModuleId,
              rcvRecordId: data.rcvRecordId,
            },
          });
        } else {
          this.dsf.layer.toast(message);
        }
      });
  },
  showNotice(routerParam, metaData, formData, VueData, refs) {
    //督办反馈查看督办通知表单
    let masterId = formData.main["C-DB-FK-018"].value;
    VueData.$router.push({
      path: "/commonForm/190323145209SuSc9CTjs9rg88i22T1/" + masterId,
      query: {
        listId: "201202164226r9VxOPsVNy6npQnMKST",
      },
    });
  },
  exchangeFeedbackByRemoteRcv(routerParam, metaData, formData, VueData, refs) {
    //意见回执------------YY
    opinionReceiptFn({
      receiveDocId: formData.main.A0001.value,
    })
      .then((res) => {
        const { message, type, data } = res.data;
        if (type === "success") {
          VueData.$router.push({
            path: "/opinionReceipt",
            query: {
              feedbackId: data.feedbackId,
              feedbackModuleId: data.feedbackModuleId,
              rcvRecordId: formData.main.A0002.value,
            },
          });
        } else {
          VueData.dsf.layer.toast(message);
        }
      })
      .error(() => { });
  },
  back(routerParam, metaData, formData, VueData, refs) {
    // 公文退回-----------------YY
    let buttonParams = VueData.nowButtonParameters;
    let dataValue = {
      pid: buttonParams.pid,
      pnid: buttonParams.pnid,
      wfId: buttonParams.wfId,
    };
    VueData.dataValue = dataValue;
    VueData.showFlowBack = true;
    VueData.$nextTick(() => {
      VueData.$refs.wfDialog.show({
        text: "退回",
      });
      // VueData.$router.back()
    });
    // this.selected = item.dataValue;
  },
  //NoopinionBack 是空意见退回方式 意见可以为空
  NoopinionBack(routerParam, metaData, formData, VueData, refs) {
    // 公文退回-----------------YY
    let buttonParams = VueData.nowButtonParameters;
    let dataValue = {
      pid: buttonParams.pid,
      pnid: buttonParams.pnid,
      wfId: buttonParams.wfId,
    };
    VueData.dataValue = dataValue;
    VueData.showFlowBack = true;
    VueData.$nextTick(() => {
      VueData.$refs.wfDialog.show({
        text: "退回原因",
      });
    });
  },
  feedback(routerParam, metaData, formData, VueData, refs) {
    // 督办反馈-------------YY
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "210723164631rGtQC0zTkW9rU5dYlxQ",
        initDataSource: 1,
        srcInfo: formData.main.A0001.value,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.replace({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: formData.main.A0001.value,
              relationId: formData.main.A0001.value,
              type: "反馈",
            },
          });
        }
      });
  },
  deptFeedback(routerParam, metaData, formData, VueData, refs) {
    // 督办部门内反馈-------------YY
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "2207191416105iDaeqzLIL5zalLANw6",
        initDataSource: 1,
        srcInfo: formData.main.A0001.value,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.replace({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: formData.main.A0001.value,
              relationId: formData.main.A0001.value,
            },
          });
        }
      });
  },
  DUBANTIJIAO(routerParam, metaData, formData, VueData, refs) {
    this.save(routerParam, metaData, formData, VueData, refs, function () {
      dsf.http
        .post("fn/supervise/approval/feedBack", {
          pk: formData.main.A0001.value,
          fid: formData.main["C-DB-FK-018"].value,
        })
        .then(function (result) {
          //console.log(result)
          if (result.data.code == "200") {
            dsf.layer.toast("提交成功", true, () => {
              VueData.$router.go(-1);
            });
            return;
          }
        });
    });
  },
  Transfer(routerParam, metaData, formData, VueData, refs) {
    //督办转办-------------YY
    let dataValue = {
      info_id: formData.main.A0001.value,
      // pnid: buttonParams.pnid,
      // wfId: buttonParams.wfId,
    };
    VueData.showPerson = true;
    VueData.dataValue = dataValue;
    VueData.isTransfer = true;
    VueData.extra = {
      multiple: false,
      tabs: [
        {
          action:
            "fn/user/select/data?types=person&rootObject=5&action=self_org&async=true",
          name: "本机构",
          subTabKey: "department",
        },
      ],
    };
  },
  "xform.changeUser"(routerParam, metaData, formData, VueData, refs) {
    // 公文转办--------------YY
    //console.log(metaData)
    let dataValue = {
      info_id: formData.main.A0001.value,
      pnid: metaData.parameters.pnId,
      wfId: metaData.parameters.flowId,
      pid: metaData.parameters.pId,
    };
    VueData.showPerson = true;
    VueData.dataValue = dataValue;
    VueData.extra = {
      multiple: false,
      tabs: [
        {
          action:
            "fn/user/select/data?types=person&rootObject=5&action=self_org&async=true",
          name: "本机构",
          subTabKey: "department",
        },
      ],
    };
    VueData.isTransfer = true;
  },
  "xform.cancelReceive"(routerParam, metaData, formData, VueData, refs) {
    // 取消签收
    dsf.layer.confirm(
      {
        title: "提示",
        message: "是否确认取消签收？",
      },
      () => {
        let params = {
          pk: VueData.pk,
          todoId: VueData.$route.query.todoId,
          moduleId: VueData.moduleId,
        };
        dsf.http.post("fn/flow/cancelReceive", params).then((res) => {
          dsf.layer.toast(res.data.message, true, () => VueData.backSucces());
        });
      }
    );
  },
  baoMing(routerParam, metaData, formData, VueData, refs) {
    //公文报名----------YY
    let buttonParams = {
      meetingtzId: formData.main.A0001.value,
      pk: formData.main.A0001.value,
      pnId: metaData.parameters.pnId,
      deptBaoming: true,
    };
    VueData.$refs.signFile.show(buttonParams).then(
      () => {
        dsf.layer.toast("报名成功", true);
        VueData.init();
      },
      (res) => {
        // 弹窗关闭
      }
    );
  },
  duBanQingKuang(routerParam, metaData, formData, VueData, refs) {
    //督办情况------------YY
    let params = {
      dataValue: {
        B0035: formData.main.B0035.value,
      },
    };
    VueData.$router.push({
      name: "InspectorCondition",
      params: {
        data: params,
      },
    });
  },
  shenQingYanQi(item, index, isPop) {
    // 督办延期---------（没有）
    if (isPop) {
      this.showDelayform = true;
    } else {
      this.$router.push({
        name: "DelayForm",
        params: {
          data: item,
        },
      });
    }
  },
  banJie(routerParam, metaData, formData, VueData, refs) {
    // 督办办结-------------(没有)
    this.$router.push({
      name: "supervise",
      params: {
        info_id: formData.main.A0001.value,
      },
    });
  },
  releaseNotice(routerParam, metaData, formData, VueData, refs) {
    //console.log("releaseNotice")
    function foo(VueData, { }, formData) {
      //console.log(this)
      releaseNoticeFn2({
        pk: formData.main["A0001"].value,
      }).then((res) => {
        // console.log(res)
        dsf.layer.toast(res.data.message);
      });
    }
    if (formData.main["A0004"].value == "190326163643A2kqaNa59H8vqHitU53") {
      //通知单
      this.save(routerParam, metaData, formData, VueData, refs, foo);
    } else {
      releaseNoticeFn({
        pk: formData.main["A0001"].value,
      }).then((res) => {
        dsf.layer.toast(res.data.message);
      });
    }
  },
  exchangeReject(routerParam, metaData, formData, VueData, refs) {
    //拒签----------------YY
    //console.log(formData.main)
    let params = {
      dataValue: {
        A0004: formData.main["A0004"].value,
        A0001: formData.main["A0001"].value,
      },
    };
    VueData.$router.push({
      name: "RejectedSign",
      params: {
        data: params,
      },
    });
  },
  // exchangeAccept(routerParam, metaData, formData, VueData, refs) {
  //   //公文签收--------------YY
  //   dsf.layer.loading("提交中");
  //   dsf.http
  //     .post("fn/remoteExchangeData/getReceiveTarget", {
  //       rcvRecordId: formData.main["A0001"].value,
  //     })
  //     .then(({ data }) => {
  //       const target = data.data[0] || {};
  //       //一体化签收
  //       let postdata = {
  //         pk: formData.main["A0001"].value,
  //         convertId: target.id,
  //         targetModuleId: target.targetModuleId,
  //         isConvertToDo: '',
  //         moduleId: formData.main["A0004"].value,
  //         ruleId: target.ruleId,
  //       };
  //       dsf.http
  //         .post("ctrl/exRemoteInterfaceController/acceptDoc", postdata)
  //         .then(({ data }) => {
  //           const { message, result, type } = data;
  //           if (type === "success" || result) {
  //             VueData.backSucces()
  //           }
  //           dsf.layer.toast(message, true);
  //         })
  //         .catch(() => {
  //         });
  //     });

  //   //之前的方法
  //   // let buttonParams=VueData.nowButtonParameters;
  //   // dsf.layer.loading("提交中");
  //   // documentResiveFn({ rcvRecordId: formData.main.A0001.value })
  //   //   .then(({ data }) => {
  //   //     const target = data.data[0] || {};
  //   //     //其他方式兼容所有
  //   //     let postdata = {
  //   //       pk: formData.main.A0001.value,
  //   //       convertId: target.id,
  //   //       targetModuleId: target.targetModuleId,
  //   //       isConvertToDo: false,
  //   //       doSign: true,
  //   //       ruleId: target.ruleId,
  //   //     };
  //   //     return documentResiveAcceptByRule(postdata);
  //   //   })
  //   //   .then(({ data }) => {
  //   //     dsf.layer.toast(data.message, true, () => VueData.backSucces());
  //   //   })
  //   //   .catch((err) => {
  //   //     dsf.layer.toast("签收失败", false);
  //   //     console.log("签收失败", err);
  //   //   });
  // },
  leaveMeeting(routerParam, metaData, formData, VueData, refs) {
    //会议请假-----------YY
    //console.log('会议请假')
    VueData.$refs.askLeave
      .show({
        meetingtzId: formData.main.A0001.value,
      })
      .then(() => {
        dsf.layer.toast("请假成功", true);
      });
  },
  unconfirmMeeting(routerParam, metaData, formData, VueData, refs) {
    //会议取消---------YY
    mettingCancelFn({
      sqid: formData.main.A0001.value,
    })
      .then((res) => {
        const { message, type } = res.data;
        VueData.dsf.layer.toast(message);
        if (type === "success") {
          // VueData.$router.back()
        }
      })
      .finally(() => {
        dsf.layer.closeLoading(loading);
      });
  },
  handleMeetingtzPD(routerParam, metaData, formData, VueData, refs) {
    // 会议报名-----------------YY
    let buttonParams = {
      meetingtzId: formData.main.A0001.value,
      pk: formData.main.A0001.value,
      pnId: metaData.parameters.pnId,
    };
    VueData.$refs.signFile.show(buttonParams).then(
      () => {
        dsf.layer.toast("报名成功", true);
        VueData.init();
      },
      (res) => {
        // 弹窗关闭
      }
    );
  },
  huiYiBianGeng(routerParam, metaData, formData, VueData, refs) {
    // 会议变更----------YY
    VueData.$router.push({
      path: "/meeting/change",
      query: {
        pk: formData.main.A0001.value,
        moduleId: formData.main.A0004.value,
      },
    });
  },
  qianShouQingKuang(routerParam, metaData, formData, VueData, refs) {
    // 签收情况------------YY
    resiveInfoFn({
      remoteId: formData.main.A0001.value,
    }).then(function (data) {
      //console.log(data)
      if (data.data.type == "error") {
        dsf.layer.toast(data.data.message, true);
      } else {
        let params = {
          dataValue: {
            fid: data.data.data.sendRecordId,
          },
        };
        VueData.$router.push({
          name: "signIn",
          params: {
            data: params,
          },
        });
      }
    });
  },
  agreeRecycle(routerParam, metaData, formData, VueData, refs) {
    let obj = {
      pk: VueData.pk,
      todoId: metaData.parameters.pId + "_" + metaData.parameters.pnId,
      moduleId: VueData.moduleId,
    };
    agreeRecycleFn(obj).then((res) => {
      dsf.layer.toast("操作成功", true, () => VueData.backSucces());
    });
  },
  refuseRecycle(routerParam, metaData, formData, VueData, refs) {
    let obj = {
      pk: VueData.pk,
      todoId: metaData.parameters.pId + "_" + metaData.parameters.pnId,
      moduleId: VueData.moduleId,
    };
    refuseRecycleFn(obj).then((res) => {
      dsf.layer.toast("操作成功", true, () => VueData.backSucces());
    });
  },
  showSignature(routerParam, metaData, formData, VueData, refs) {
    if (dsf.config.ddSetting.dingdingType == "xunmeng") {
      dsf.http
        .get("fn/wdct/signOff", {
          infoId: VueData.formParams.pk,
          moduleId: VueData.formParams.moduleId,
        })
        .then((res) => {
          if (res.data.code == "200") {
            let resData = res.data.data;
            resData.downloadUrl =
              dsf.url.getRootPath() +
              resData.downloadUrl +
              `&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
            let param = {
              pageIndex: 1,
              url: resData.downloadUrl,
              type: 0,
            };
            dsf.commonForm
              .nativeCommon("documentannotate", param)
              .then((resPdf) => {
                //console.log(resPdf, ":718")
                dsf.http
                  .get(resData.saveUrl, {
                    sourceUrl: JSON.stringify(resPdf.data),
                  })
                  .then((quanyue) => {
                    //console.log(quanyue, "721")
                    dsf.layer.toast("批示成功");
                    VueData.$emit("quanyue");
                  });
              })
              .catch((err) => {
                dsf.layer.toast("批示失败");
                //console.log(err, ":165")
              });
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    } else {
      dsf.http
        .get("fn/handWrite/signOff", {
          infoId: VueData.formParams.pk,
          moduleId: VueData.formParams.moduleId,
        })
        .then((res) => {
          if (res.data.code == "200") {
            let resData = res.data.data;
            resData.downloadUrl = dsf.url.getRootPath() + resData.downloadUrl;
            dsf.dd.signature(resData);
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    }
  },
  //讯盟手写签批
  HandWriteSignature(routerParam, metaData, formData, VueData, refs) {
    let currentFile = "";
    if (VueData.headTab == "signForm") {
      currentFile = VueData.$refs.signForm[0].currentFile;
    } else if (VueData.headTab == "relevantFile") {
      currentFile = VueData.$refs.relevantFile[0].$refs.enclosure.fileObj;
    }
    dsf.http
      .get("fn/wdct/circle", {
        infoId: currentFile.infoId,
        moduleId: currentFile.moduleId,
        fileId: currentFile.id,
      })
      .then((res) => {
        if (res.data.code == "200") {
          let resData = res.data.data;
          resData.downloadUrl =
            dsf.url.getRootPath() +
            resData.downloadUrl +
            `&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
          //console.log(resData.downloadUrl, resData.saveUrl, "179")
          let param = {
            pageIndex: 1,
            url: resData.downloadUrl,
            type: 0,
          };
          dsf.commonForm
            .nativeCommon("documentannotate", param)
            .then((resPdf) => {
              dsf.http
                .get(resData.saveUrl, {
                  sourceUrl: resPdf.data,
                })
                .then((quanyue) => {
                  dsf.layer.toast("批示成功");
                  VueData.$eventBus.quanyue(VueData);
                });
            })
            .catch((err) => {
              dsf.layer.toast("批示失败");
            });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  BtnWriteOpinion(routerParam, metaData, formData, VueData, refs) {
    //审批意见
    VueData.showBtnWriteOpintion = true;
    VueData.isShowWriteOpintionBtn = true;
    VueData.alreadyWriteOpintion = false;
    VueData.$nextTick(() => {
      VueData.$refs.BtnWriteOpintion.Show();
    });
  },
  YoZoHandWrite(routerParam, metaData, formData, VueData, refs) {
    //打开永中手写签批
    //console.log(VueData.headTab);
    let currentFile = "";
    if (VueData.headTab == "signForm") {
      currentFile = VueData.$refs.signForm[0].currentFile;
    } else if (VueData.headTab == "relevantFile") {
      currentFile = VueData.$refs.relevantFile[0].$refs.enclosure.fileObj;
    }
    VueData.$nextTick(() => {
      VueData.$router.push({
        name: "HandwrittenSign",
        query: {
          pk: VueData.formParams.pk,
          moduleId: VueData.formParams.moduleId,
          todoId: VueData.$route.query.todoId,
          fileId: currentFile ? currentFile.id : "",
        },
      });
    });
  },
  seeNoticeStatus(routerParam, metaData, formData, VueData, refs) {
    VueData.$router.push({
      path: "/announcementStatus",
      query: {
        pk: formData.main.A0001.value,
        bt: `您有一份标题为【${formData.main.B0001.value}】的公告,请及时处理`,
      },
    });
  },
  "Public.moduleRuleConvert"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs,
    initDataSource,
    buttonParams
  ) {
    //转换
    let convertParams = buttonParams || VueData.nowButtonParameters;
    //console.log(convertParams)
    let params = {
      convertId: convertParams.convertId,
      srcInfo: formData.main["A0001"].value,
      isEndSrcFlow: convertParams.isEndSrcFlow,
    };
    if (initDataSource) params.initDataSource = initDataSource;
    convert(params)
      .then((res) => {
        if (res.data.code != 200) {
          dsf.layer.toast(res.data.message);
          return;
        } else {
          const { data } = res.data;
          // dsf.layer.toast("成功")
          let route = {
            name: "commonForm",
            params: {
              pk: data.pk,
              moduleId: data.moduleId,
            },
          };
          if (initDataSource)
            route.query = {
              initDataSource: params.initDataSource,
            };
          VueData.$router.push(route);
        }
      })
  },
  "Public.tempModuleRuleConvert"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    // 预转换
    let convertParams = VueData.nowButtonParameters;
    this["Public.moduleRuleConvert"](
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      1,
      convertParams
    );
  },
  "Public.moduleConvertAndEndNode"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs,
    initDataSource,
    buttonParams
  ) {
    // 类别转换后办结源文件
    let convertParams = buttonParams || VueData.nowButtonParameters;
    let params = {
      convertId: convertParams.convertId,
      srcInfo: formData.main["A0001"].value,
      isEndSrcFlow: convertParams.isEndSrcFlow
    };
    function pushForm(data, flag) {
      let route = {
        name: "commonForm",
        params: {
          pk: data.pk,
          moduleId: data.moduleId,
        },
      };
      if (flag)
        route.query = {
          flag: params.flag,
        };
      VueData.$router.push(route);
    }
    if (initDataSource) params.initDataSource = initDataSource;
    convert(params).then((res) => {
      if (res.data.code != 200) {
        dsf.layer.toast(res.data.message);
        return;
      } else {
        const toFormData = res.data.data;
        let postData = {
          todoData: '[{"pk":"' + VueData.formParams.pk + '","pnid":"' + metaData.parameters.pnId + '"}]',
        };
        dsf.http.post("fn/flow/batchEndNode", postData).then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("转换成功，源文件已办结", true);
            if (JSON.stringify(convertParams.isOpenForm) != "false") {
              pushForm(toFormData, initDataSource)
            }
          } else {
            dsf.layer.toast("办结失败", false);
          }
        })
      }
    })
  },
  tempXtModuleRuleConvert(routerParam, metaData, formData, VueData, refs) {
    // 电气--转协同
    let params = { pkId: VueData.formParams.pk, ifZxt: "1" };
    dsf.http.post("fn/dealZxtContro/updateNotSenXt", params).then((res) => {
      if (res.data.type == "success") {
        let xtStatusCou = res.data.data.xtStatusCou;
        let findBanjie = function (btns) {
          return btns.findIndex((item) => item.name == "办结");
        };
        let spliceBanjie = function (btns, start) {
          return btns.splice(start, 1);
        };
        let buttons = VueData.formMeta.buttons;
        if (xtStatusCou == 0) {
          if (findBanjie(buttons.commonButtons) != -1) {
            spliceBanjie(findBanjie(buttons.commonButtons));
          } else if (findBanjie(buttons.mainButtons) != -1) {
            spliceBanjie(buttons.mainButtons, findBanjie(buttons.mainButtons));
          }
        }
        this["Public.tempModuleRuleConvert"](
          routerParam,
          metaData,
          formData,
          VueData,
          refs
        );
      } else {
        dsf.layer.toast(res.data.message);
      }
    });
  },
  dongSendToXt(routerParam, metaData, formData, VueData, refs) {
    // 电气--不转协同
    let params = { pkId: VueData.formParams.pk, ifZxt: "-1" };
    dsf.http.post("fn/dealZxtContro/notSenXt", params).then((res) => {
      if (res.data.type == "success") {
        // this.save(routerParam, metaData, formData, VueData, refs)
        saveForm({
          moduleId: metaData.parameters.moduleId,
          pk: metaData.parameters.pk,
          flowId: metaData.parameters.flowId,
          nodeId: metaData.parameters.nodeId,
          formId: metaData.parameters.formId,
          initDataSource: null,
          __DATA: JSON.stringify(changeFormData(formData)),
          notVaildateMetas: "main^" + [...new Set(VueData.notVaildateMetas)],
        }).then((res) => {
          if (res.data.code != 200) {
            dsf.layer.toast(res.data.message.split("(")[0]);
            return;
          } else {
            VueData.initData();
          }
        });
      }
    });
  },
  fileCodeToVoid(routerParam, metaData, formData, VueData, refs) {
    // 电气--文号作废
    dsf.layer.confirm(
      {
        title: "提示",
        message: "确定要文号作废吗？",
      },
      () => {
        dsf.http
          .post(`fn/dqFileCodeUse/toVoid?pk=${VueData.formParams.pk}`)
          .then((res) => {
            dsf.layer.toast(res.data.message);
            if (res.data.type == "success") {
              VueData.$eventBus.emitRefreshFilecode(VueData, {});
            }
          });
      }
    );
  },
  "Flow.endInstance"(routerParam, metaData, formData, VueData, refs) {
    // 办结文件
    dsf.layer.confirm(
      {
        message: "是否确定办结文件？",
        confirmButtonText: "确认",
      },
      () => {
        dsf.http
          .post("/fn/flow/endInstance", {
            pk: VueData.formParams.pk,
          })
          .then((response) => {
            if (response.data.code != 200) {
              dsf.layer.toast(response.data.message);
            } else {
              if (VueData.spHandleJS.afterEndInstance) {
                VueData.spHandleJS.afterEndInstance(VueData)
              } else {
                dsf.layer.toast("操作成功", true, () => VueData.backSucces());
              }
            }
          });
      }
    );
  },
  // [重庆财政]特殊办结
  bjSw(routerParam, metaData, formData, VueData, refs) {
    // 保存表单
    VueData.saveNoTip(() => {
      dsf.http
        .post(`fn/sw/queryCount`, {
          pk: metaData.parameters.pk,
          pnId: metaData.parameters.pnId,
        })
        .done((res) => {
          if (res.type == "success") {
            if (res.data > 0) {
              // 办结
              this["batchEndNode"](
                routerParam,
                metaData,
                formData,
                VueData,
                refs
              );
            } else {
              dsf.layer.toast(
                "办理意见、上传附件、关联文件至少选择一项上传",
                false
              );
            }
          } else {
            dsf.layer.toast("操作失败", false);
          }
        })
        .error((err) => {
          console.log("queryCount-err", err);
          dsf.layer.toast("操作失败", false);
        });
    });
  },
  transaction(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("ctrl/wdct/checkClean", {
        pk: metaData.parameters.pk,
        pnid: metaData.parameters.pnId || VueData.$route.query.pnId,
      })
      .then((res) => {
        if (res.data.message == "false") {
          dsf.layer.alert(
            {
              title: "提示",
              message: "请在pc端中，完成抄清操作",
              confirmButtonText: "知道了",
            },
            () => { }
          );
        } else {
          VueData.isShowTransactionActionSheet = true;
        }
      });
  },
  noticeSend(routerParam, metaData, formData, VueData, refs) {
    this.NoticePublish(routerParam, metaData, formData, VueData, refs);
  },
  NoticePublish(routerParam, metaData, formData, VueData, refs) {
    //通知公告发布
    dsf.layer.loading("发布中");
    saveForm({
      moduleId: VueData.formParams.moduleId,
      pk: VueData.formParams.pk || formData.main.A0001.value,
      flowId: routerParam.flowId || metaData.parameters.flowId,
      nodeId: routerParam.nodeId || metaData.parameters.nodeId,
      formId: metaData.parameters.formId,
      initDataSource: VueData.$route.query.initDataSource
        ? VueData.$route.query.initDataSource
        : null,
      __DATA: JSON.stringify(changeFormData(formData)),
    })
      .then(function (res) {
        if (res.data.code != 200) {
          dsf.layer.toast(res.data.message);
          return;
        } else {
          dsf.http
            .post("/fn/notice/publish", {
              pks: VueData.formParams.pk,
              moduleId: routerParam.moduleId,
            })
            .then((response) => {
              if (response.data.code != 200) {
                dsf.layer.toast(response.data.message);
                return;
              } else {
                dsf.layer.toast("成功", true, () => VueData.backSucces());
              }
            });
        }
      })
      .error(function () { });
  },
  cancelPublish(routerParam, metaData, formData, VueData, refs) {
    // 通知公告取消发布
    VueData.$dialog
      .confirm({
        title: "提示",
        message: "是否确认取消发布该条通知公告",
      })
      .then(() => {
        console.log("then");
        dsf.http
          .post("fn/notice/cancelPublish", {
            pks: VueData.formParams.pk,
            moduleId: routerParam.moduleId,
          })
          .then((retVal) => {
            if (retVal.data.code == 200) {
              dsf.layer.toast(retVal.data.message, true, () =>
                VueData.backSucces()
              );
            }
          });
      })
      .catch(() => {
        console.log("cancell");
      });
  },
  delayTodo(routerParam, metaData, formData, VueData, refs) {
    // 缓办
    dsf.layer.confirm(
      {
        message: "是否缓办该表单",
        confirmButtonText: "确认",
      },
      () => {
        this.save(routerParam, metaData, formData, VueData, refs);
        dsf.http
          .post("fn/flow/delayTodo", {
            pnIds: metaData.parameters.pnId,
            isDelay: true,
          })
          .then((res) => {
            if (res.data.code == 200) {
              dsf.layer.toast(res.data.message, () => VueData.backSucces());
            } else {
              dsf.layer.toast(res.data.message);
            }
          });
      }
    );
  },
  cancelDelayTodo(routerParam, metaData, formData, VueData, refs) {
    // 取消缓办
    dsf.layer.confirm(
      {
        message: "是否取消缓办",
        confirmButtonText: "确认",
      },
      () => {
        dsf.http
          .post("fn/flow/delayTodo", {
            pnIds: metaData.parameters.pnId,
            isDelay: false,
          })
          .then((res) => {
            if (res.data.code == 200) {
              dsf.layer.toast(res.data.message, () => VueData.backSucces());
            } else {
              dsf.layer.toast(res.data.message);
            }
          });
      }
    );
  },
  changeMeetingInfo(routerParam, metaData, formData, VueData, refs) {
    if (formData.main["c-meetingsqbg-002"].value == "1") {
      if (
        formData.main["c-meetingsqbg-003"].value ==
        formData.main["c-meetingsqbg-004"].value &&
        formData.main["c-meetingsqbg-005"].value ==
        formData.main["c-meetingsqbg-007"].value &&
        formData.main["c-meetingsqbg-012"].value ==
        formData.main["c-meetingsqbg-013"].value &&
        formData.main["c-meetingsqbg-006"].value ==
        formData.main["c-meetingsqbg-008"].value &&
        formData.main["c-meetingsqbg-043"].value ==
        formData.main["c-meetingsqbg-001"].value
      ) {
        dsf.layer.toast("没有信息变化，无需变更！");
        return;
      }
      // 先校验时间段内会议室是否有占用
      dsf.http
        .post("fn/meetingRoomOccupy/checkRoomOccupy", {
          pk: VueData.$route.query.fid,
          hys:
            formData.main["c-meetingsqbg-004"].value ||
            formData.main["c-meetingsqbg-003"].value,
          sdate:
            formData.main["c-meetingsqbg-007"].value ||
            formData.main["c-meetingsqbg-005"].value,
          edate:
            formData.main["c-meetingsqbg-008"].value ||
            formData.main["c-meetingsqbg-006"].value,
        })
        .then((res) => {
          if (res.data.type == "success") {
            dsf.layer.confirm(
              {
                message: "是否确认变更",
                confirmButtonText: "确认",
              },
              () => {
                // 先保存表单再变更
                this.send(
                  routerParam,
                  metaData,
                  formData,
                  VueData,
                  refs,
                  change
                );
              }
            );
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    } else {
      dsf.layer.confirm(
        {
          message: "是否取消会议",
          confirmButtonText: "确认",
        },
        () => {
          // 先保存表单再变更
          this.send(routerParam, metaData, formData, VueData, refs, change);
        }
      );
    }
    let change = function () {
      dsf.layer.toast("变更成功", () => VueData.backSucces());
      return;
      dsf.http
        .post("fn/meetingNotice/changeMeetingInfo", {
          pk: VueData.formParams.pk,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("变更成功", () => VueData.backSucces());
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    };
    return;
    // 会议变更
    let change1 = function () {
      dsf.http
        .post("fn/meetingNotice/changeMeetingInfo", {
          pk: VueData.formParams.pk,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("变更成功", () => VueData.backSucces());
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    };
    // 先校验时间段内会议室是否有占用
    dsf.http
      .post("fn/meetingRoomOccupy/checkRoomOccupy", {
        pk: VueData.$route.query.fid,
        hys:
          formData.main["c-meetingsqbg-004"].value ||
          formData.main["c-meetingsqbg-003"].value,
        sdate:
          formData.main["c-meetingsqbg-007"].value ||
          formData.main["c-meetingsqbg-005"].value,
        edate:
          formData.main["c-meetingsqbg-008"].value ||
          formData.main["c-meetingsqbg-006"].value,
      })
      .then((res) => {
        if (res.data.type == "success") {
          dsf.layer.confirm(
            {
              message: "是否确认变更",
              confirmButtonText: "确认",
            },
            () => {
              // 先保存表单再变更
              this.save(
                routerParam,
                metaData,
                formData,
                VueData,
                refs,
                change1
              );
            }
          );
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  issueNotice(routerParam, metaData, formData, VueData, refs) {
    // 会议下发通知
    let issueNotice = function () {
      dsf.http
        .post("fn/meetingNotice/issueNotice", {
          pk: metaData.parameters.pk,
        })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            dsf.layer.toast("下发通知成功", true, () => VueData.backSucces());
          } else {
            dsf.layer.toast("下发通知失败", false);
          }
        });
    };

    // 先校验时间段内会议室是否有占用

    // this.save(routerParam, metaData, formData, VueData, refs, issueNotice)
    if (!formData.main["c-meetingtz-019"].value) {
      dsf.layer.toast(`开始时间不能为空`);
      return;
    }
    if (!formData.main["c-meetingtz-020"].value) {
      dsf.layer.toast(`结束时间不能为空`);
      return;
    }
    if (!formData.main["c-meetingtz-010"].value) {
      dsf.layer.toast(`会议室不能为空`);
      return;
    }
    dsf.http
      .post("fn/meetingRoomOccupy/checkRoomOccupy", {
        // pk: metaData.parameters.pk,
        pk: formData.main["B0035"].value,
        hys: formData.main["c-meetingtz-010"].value,
        sdate: formData.main["c-meetingtz-019"].value,
        edate: formData.main["c-meetingtz-020"].value,
      })
      .then((res) => {
        if (res.data.type == "success") {
          dsf.layer.confirm(
            {
              message: "是否确认下发通知",
              confirmButtonText: "确认",
            },
            () => {
              // 先保存表单再下发通知
              this.save(
                routerParam,
                metaData,
                formData,
                VueData,
                refs,
                issueNotice
              );
            }
          );
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  singleMeetingIssueNotice(routerParam, metaData, formData, VueData, refs) {
    //远程报名单提交
    let report = function () {
      dsf.http
        .post("ctrl/meetingRemote/singleMeetingIssueNotice", {
          pk: metaData.parameters.pk,
        })
        .then((res) => {
          console.log(res);
          if (res.status == "200") {
            dsf.layer.toast("下发通知成功", () => {
              VueData.backSucces();
            });
          }
        });
    };
    this.save(routerParam, metaData, formData, VueData, refs, report);
  },
  goSignUpForm(routerParam, metaData, formData, VueData, refs) {
    if (
      metaData.parameters.todoId &&
      metaData.parameters.moduleId != "230517224206lQszMtXvkQGlirGaxBu"
    ) {
      dsf.http
        .post("fn/meetingNotice/getBmInfoById", {
          pk: metaData.parameters.todoId.split("_")[0],
        })
        .then((res) => {
          if (res.data.code == 200) {
            VueData.$router.push({
              name: "commonForm",
              params: {
                moduleId: res.data.data.moduleId,
                pk: metaData.parameters.todoId.split("_")[0],
              },
              query: {
                listId: "MeetingList",
                method: "customNode",
                validateByList: 1,
                showNodeId: "19",
                pk: metaData.parameters.todoId.split("_")[0],
                type: "1",
                isback: 2,
              },
            });
          }
        });
    } else {
      let query = {};
      if (VueData.$route.query.noticeType == 1) {
        query = {
          listId: "MeetingList",
          method: "chooseMember",
          validateByList: 1,
          type: 1,
          isback: 2,
        };
      } else if (VueData.$route.query.noticeType == 2) {
        query = {
          listId: "MeetingList",
          method: "reportMember",
          validateByList: 1,
          isback: 2,
        };
      } else {
        query = {
          listId: "MeetingList",
          method: "reportMember",
          validateByList: 1,
          formId: "230603000903YhuPIxN0fH1JJHUbrj0",
          isback: 2,
        };
      }
      VueData.$router.push({
        name: "commonForm",
        params: {
          moduleId:
            VueData.$route.query.signUpModuleId || metaData.parameters.moduleId,
          pk: VueData.$route.query.signUpPk || metaData.parameters.pk,
        },
        query: query,
      });
    }
  },
  reportBm(routerParam, metaData, formData, VueData, refs) {
    let that = this;
    // 会议报名
    let userIds = "";
    for (let key in formData.multinfos) {
      if (formData.multinfos[key].rows.length > 0) {
        formData.multinfos[key].rows.forEach((ele) => {
          userIds += ele["c-meetingchry-002"].value + ",";
        });
      }
    }
    dsf.http
      .post("fn/meetingNotice/checkSignup", {
        pk: metaData.parameters.pk,
        userIds: userIds,
        fid: formData.main["A0031"].value,
      })
      .then((res) => {
        console.log(res);
        if (res.data.data) {
          dsf.layer.toast(res.data.data);
        } else {
          that.save(routerParam, metaData, formData, VueData, refs, report);
        }
      });
    let report = function () {
      dsf.http
        .post("ctrl/meetingNotice/submitSignUp", {
          pk: metaData.parameters.pk,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200 || res.code == 200) {
            dsf.layer.toast("上报成功", "success", () => {
              if (VueData.$route.query.isback) {
                VueData.backSucces(VueData.$route.query.isback)
              } else {
                VueData.backSucces()
              }
            });
          } else {
            debugger
            dsf.layer.toast(res.data.message);
          }
        });
    };
  },
  IParticipate(routerParam, metaData, formData, VueData, refs) {
    // 我参加
    let User = dsf.util.loadSessionStore("user");
    console.log(User);
    if (metaData.parameters.todoId) {
      dsf.http
        .post("fn/meetingNotice/getBmInfoById", {
          pk: metaData.parameters.todoId.split("_")[0],
        })
        .then((res) => {
          if (res.data.code == 200) {
            VueData.$router.push({
              name: "commonForm",
              params: {
                moduleId: res.data.data.moduleId,
                pk: metaData.parameters.todoId.split("_")[0],
              },
              query: {
                listId: "MeetingList",
                method: "reportMember",
                validateByList: 1,
                userId: User.user_id,
                deptId: User.deptId,
                isback: 2,
              },
            });
          }
        });
    } else {
      VueData.$router.push({
        name: "commonForm",
        params: {
          moduleId:
            VueData.$route.query.signUpModuleId || metaData.parameters.moduleId,
          pk: VueData.$route.query.signUpPk || metaData.parameters.pk,
        },
        query: {
          listId: "MeetingList",
          method: "reportMember",
          validateByList: 1,
          userId: User.user_id,
          deptId: User.deptId,
          isback: 2,
        },
      });
    }
  },
  OtherParticipate(routerParam, metaData, formData, VueData, refs) {
    // 他人参加
    let dataValue = {
      info_id: formData.main.A0001.value,
      pnid: metaData.parameters.pnId,
      wfId: metaData.parameters.flowId,
      pid: metaData.parameters.pId,
    };
    VueData.showPerson = true;
    VueData.dataValue = dataValue;
    VueData.extra = {
      typesString: "person,department,post,group,privateGroup",
      rootObject: "5",
      multiple: true,
      tabs: [
        {
          key: "self_dept",
          action: `fn/user/select/data?types=person&rootObject=1&action=self_dept&async=true&excludeIds=${dsf.util.loadSessionStore("user").user_id
            }`,
          urlParams: {},
        },
      ],
    };

    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      console.log(data);
      let userId = "";
      let deptId = "";
      data.forEach((ele, i) => {
        i == 0 ? (userId += ele.id) : (userId += "," + ele.id);
        i == 0
          ? (deptId += ele.attrs.deptId)
          : (deptId += "," + ele.attrs.deptId);
      });
      if (metaData.parameters.todoId) {
        dsf.http
          .post("fn/meetingNotice/getBmInfoById", {
            pk: metaData.parameters.todoId.split("_")[0],
          })
          .then((res) => {
            if (res.data.code == 200) {
              VueData.$router.push({
                name: "commonForm",
                params: {
                  moduleId: res.data.data.moduleId,
                  pk: metaData.parameters.todoId.split("_")[0],
                },
                query: {
                  listId: "MeetingList",
                  method: "reportMember",
                  validateByList: 1,
                  userId: userId,
                  deptId: deptId,
                  isback: 2,
                },
              });
            }
          });
      } else {
        VueData.$router.push({
          name: "commonForm",
          params: {
            moduleId:
              VueData.$route.query.signUpModuleId ||
              metaData.parameters.moduleId,
            pk: VueData.$route.query.signUpPk || metaData.parameters.pk,
          },
          query: {
            listId: "MeetingList",
            method: "reportMember",
            validateByList: 1,
            userId: userId,
            deptId: deptId,
            isback: 2,
          },
        });
      }
    };
  },
  departmentalRegistration(routerParam, metaData, formData, VueData, refs) {
    // 报名、他人参加及我参加合并
    let dataValue = {
      info_id: formData.main.A0001.value,
      pnid: metaData.parameters.pnId,
      wfId: metaData.parameters.flowId,
      pid: metaData.parameters.pId,
    };
    VueData.showPerson = true;
    VueData.dataValue = dataValue;
    VueData.extra = {
      typesString: "person,department,post,group,privateGroup",
      rootObject: "5",
      multiple: true,
      tabs: [
        {
          key: "self_dept",
          action: `fn/user/select/data?types=person&rootObject=3&action=self_dept&async=true`,
          urlParams: {},
        },
      ],
    };

    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      console.log(data);
      let userId = "";
      let deptId = "";
      data.forEach((ele, i) => {
        i == 0 ? (userId += ele.id) : (userId += "," + ele.id);
        i == 0
          ? (deptId += ele.attrs.deptId)
          : (deptId += "," + ele.attrs.deptId);
      });
      if (metaData.parameters.todoId) {
        dsf.http
          .post("fn/meetingNotice/getBmInfoById", {
            pk: metaData.parameters.todoId.split("_")[0],
          })
          .then((res) => {
            if (res.data.code == 200) {
              VueData.$router.push({
                name: "commonForm",
                params: {
                  moduleId: res.data.data.moduleId,
                  pk: metaData.parameters.todoId.split("_")[0],
                },
                query: {
                  listId: "MeetingList",
                  method: "reportMember",
                  validateByList: 1,
                  userId: userId,
                  deptId: deptId,
                  isback: 2,
                },
              });
            }
          });
      } else {
        VueData.$router.push({
          name: "commonForm",
          params: {
            moduleId:
              VueData.$route.query.signUpModuleId ||
              metaData.parameters.moduleId,
            pk: VueData.$route.query.signUpPk || metaData.parameters.pk,
          },
          query: {
            listId: "MeetingList",
            method: "reportMember",
            validateByList: 1,
            userId: userId,
            deptId: deptId,
            isback: 2,
          },
        });
      }
    };
  },
  applicationSituation(routerParam, metaData, formData, VueData, refs) {
    //表单跳转报名情况列表
    VueData.$router.push({
      path: "/meetingEnter",
      query: {
        pk: metaData.parameters.pk,
      },
    });
  },
  SeatingView(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("fn/meetingRoomOccupy/seatView", {
        pk: formData.main["B0035"].value,
        moduleId: metaData.parameters.moduleId,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === "200") {
          if (res.data.data.seatType == "2") {
            ImagePreview([res.data.data.imgUrl]);
          } else if (res.data.data.seatType == "1" && !fileId) {
            dsf.layer.toast(`未上传座位图，请导入`);
          } else if (res.data.data.seatType == "1" && fileId) {
            ImagePreview([res.data.data.imgUrl]);
          }
        } else {
          dsf.layer.toast(res.data.data.message);
        }
      });
  },
  newMeetingLeave(routerParam, metaData, formData, VueData, refs) {
    // 个人会议报名请假
    let leave = function () {
      dsf.http
        .post("/fn/meetingNotice/leave", {
          pk: metaData.parameters.pk,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("请假成功");
            VueData.backSucces(2);
          } else {
            dsf.layer.toast("请假失败");
          }
        });
    };
    dsf.layer.confirm(
      {
        message: "是否确认请假",
        confirmButtonText: "确认",
      },
      () => {
        this.save(routerParam, metaData, formData, VueData, refs, leave);
      }
    );
  },
  // 会议报名请假
  meetingLeaveToBmd(routerParam, metaData, formData, VueData, refs) {
    if (metaData.parameters.todoId) {
      dsf.http
        .post("fn/meetingNotice/getBmInfoById", {
          pk: metaData.parameters.todoId.split("_")[0],
        })
        .then((res) => {
          if (res.data.code == 200) {
            VueData.$router.push({
              name: "commonForm",
              params: {
                moduleId: res.data.data.moduleId,
                pk: metaData.parameters.todoId.split("_")[0],
              },
              query: {
                listId: "MeetingList",
                method: "customNode",
                validateByList: 1,
                showNodeId: "19",
                pk: metaData.parameters.todoId.split("_")[0],
                type: "2",
              },
            });
          }
        });
    } else {
      VueData.$router.push({
        name: "commonForm",
        params: {
          moduleId: VueData.$route.query.signUpModuleId,
          pk: VueData.$route.query.signUpPk,
        },
        query: {
          listId: "MeetingList",
          method: "chooseMember",
          validateByList: 1,
          type: 2,
        },
      });
    }
  },
  // 会议报名委托
  meetingEntrust(routerParam, metaData, formData, VueData, refs) {
    if (metaData.parameters.todoId) {
      dsf.http
        .post("fn/meetingNotice/getBmInfoById", {
          pk: metaData.parameters.todoId.split("_")[0],
        })
        .then((res) => {
          if (res.data.code == 200) {
            VueData.$router.push({
              name: "commonForm",
              params: {
                moduleId: res.data.data.moduleId,
                pk: metaData.parameters.todoId.split("_")[0],
              },
              query: {
                listId: "MeetingList",
                method: "customNode",
                validateByList: 1,
                showNodeId: "19",
                pk: metaData.parameters.todoId.split("_")[0],
                type: "3",
              },
            });
          }
        });
    } else {
      VueData.$router.push({
        name: "commonForm",
        params: {
          moduleId: VueData.$route.query.signUpModuleId,
          pk: VueData.$route.query.signUpPk,
        },
        query: {
          listId: "MeetingList",
          method: "chooseMember",
          validateByList: 1,
          type: 3,
        },
      });
    }
  },
  newMeetingTrunTo(routerParam, metaData, formData, VueData, refs) {
    // 单位会议报名转交
    let dataValue = {
      info_id: formData.main.A0001.value,
      pnid: metaData.parameters.pnId,
      wfId: metaData.parameters.flowId,
      pid: metaData.parameters.pId,
    };
    VueData.showPerson = true;
    VueData.dataValue = dataValue;
    VueData.extra = {
      typesString: "person,department,post,group,privateGroup",
      rootObject: "5",
      multiple: false,
      tabs: [
        {
          key: "self_dept",
          action:
            "fn/user/select/data?types=person&rootObject=1&action=self_dept&async=true",
          urlParams: {},
        },
      ],
    };
    VueData.isTransfer = true;
    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      console.log(data);
      let trunUser = null;
      data.forEach((item, index) => {
        if (item.children && item.children.length > 0) {
          data.splice(index, 1);
        }
      });
      if (VueData.isTransfer) {
        if (data.length > 1) {
          dsf.layer.toast("请仅选中一人转交", true);
          return;
        } else {
          trunUser = data[0];
        }
      }
      dsf.http
        .post("fn/meetingNotice/trunTo", {
          // pk: metaData.parameters.pk,
          pk: VueData.$route.query.signUpPk, //这里是需要报名单的PK
          userId: trunUser.id,
          userName: trunUser.name,
          userSchema: `${trunUser.type}::${trunUser.id}`,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("转交成功", true, () => {
              VueData.backSucces();
            });
          } else {
            dsf.layer.toast("转交失败", false);
          }
        });
    };
  },
  // 会议报名提交[江西]
  meetingSignUp(routerParam, metaData, formData, VueData, refs) {
    let mSignUp = function () {
      dsf.http
        .post("/fn/meetingNotice/reportBm", {
          pk: metaData.parameters.pk,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("报名成功", true, () => VueData.backSucces());
          } else {
            dsf.layer.toast("报名失败", false);
          }
        });
    };
    this.send(routerParam, metaData, formData, VueData, refs, mSignUp);
  },
  // 会议报名请假[江西]
  meetingLeave(routerParam, metaData, formData, VueData, refs) {
    let mLeave = function () {
      dsf.http
        .post("/fn/meetingNotice/leave", {
          pk: metaData.parameters.pk,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("请假成功", true, () => VueData.backSucces());
          } else {
            dsf.layer.toast("请假失败", false);
          }
        });
    };
    dsf.layer.confirm(
      {
        message: "是否确认请假？",
        confirmButtonText: "确认",
      },
      () => {
        this.send(routerParam, metaData, formData, VueData, refs, mLeave);
      }
    );
  },
  // 会议报名委托[江西]
  meetingTurnTo(routerParam, metaData, formData, VueData, refs) {
    let dataValue = {
      info_id: formData.main.A0001.value,
      pnid: metaData.parameters.pnId,
      wfId: metaData.parameters.flowId,
      pid: metaData.parameters.pId,
    };
    VueData.showPerson = true;
    VueData.dataValue = dataValue;
    VueData.extra = {
      multiple: false,
      tabs: [
        {
          action:
            "fn/user/select/data?types=person&rootObject=5&action=self_org&async=true",
          name: "本机构",
          subTabKey: "department",
        },
      ],
    };
    VueData.isTransfer = true;
    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      console.log("getSelectUser", data);
      let turnUser = null;
      data.forEach((item, index) => {
        if (item.children && item.children.length > 0) {
          data.splice(index, 1);
        }
      });
      if (VueData.isTransfer) {
        if (data.length > 1) {
          dsf.layer.toast("请仅选中一人委托", false);
          return;
        } else {
          turnUser = data[0];
        }
      }
      // 会议委托
      let mTurnto = function () {
        dsf.http
          .post("fn/meetingNotice/trunTo", {
            pk: metaData.parameters.pk,
            userId: turnUser.id,
            userName: turnUser.name,
            userSchema: `${turnUser.type}::${turnUser.id}`,
          })
          .done((res) => {
            if (res.code == 200) {
              dsf.layer.toast("委托成功", true, () => VueData.backSucces());
            } else {
              dsf.layer.toast("委托失败", false);
            }
          });
      };
      // 公文转交
      let user = dsf.util.loadSessionStore("user");
      let ids = data.map((item) => item.id.replace("person_", ""));
      let params = {
        pk: dataValue.info_id,
        pId: dataValue.pid,
        pnId: dataValue.pnid,
        fromUserId: user.user_id,
        userId: ids.join(","),
        userName: data.map((it) => it.name).join(","),
        deptId: data.map((it) => it.pid).join(","),
        deptName: "",
      };
      dsf.http
        .post("/fn/flow/changeUser", params)
        .done((res) => {
          console.log("changeUser", res);
          if (res.type == "success") {
            // dsf.layer.toast('转交成功', true);
            mTurnto();
          } else {
            dsf.layer.toast(res.message, false);
          }
        })
        .error((e) => console.log(e))
        .always();
    };
  },
  // 会议申请转会议纪要
  MeetingJiYao(routerParam, metaData, formData, VueData, refs) {
    console.log("11");
    dsf.http
      .post("/ctrl/meeting/getHyjyByHyId", {
        pk: metaData.parameters.pk,
      })
      .then((res) => {
        console.log(res);
      });
  },
  FaQiqunliao(routerParam, metaData, formData, VueData, refs) {
    dd.biz.contact.createGroup({
      corpId: "dinga215a69365c38b4e24f2f5cc6abecb85", //企业id，可选，若配置必须是用户所属企业的corpId，即实现在指定企业创建群聊天；
      users: [
        "68322808-685947715",
        "0428350360389383399",
        "10070005571930976529",
      ],
      onSuccess: function (result) {
        /*{
                    id: 123   //企业群id
                }*/
      },
      onFail: function (err) { },
    });
  },
  ShiPin(routerParam, metaData, formData, VueData, refs) {
    dd.biz.conference.videoConfCall({
      title: "视频会议",
      calleeCorpId: "dinga215a69365c38b4e24f2f5cc6abecb85",
      calleeStaffIds: [
        "68322808-685947715",
        "0428350360389383399",
        "10070005571930976529",
      ],
      onSuccess: function () { },
      onFail: function () { },
    });
  },
  btnBWFW(routerParam, metaData, formData, VueData, refs) {
    formData.main["210419103326nLnnu9jebQUtgOvASMx"].value = "1";
    this.save(routerParam, metaData, formData, VueData, refs, function () {
      VueData.$router.push({
        name: "commonForm",
        params: {
          moduleId: VueData.formParams.moduleId,
          pk: VueData.formParams.pk,
        },
        query: {
          formId: "210830173152r9RoWUtbmDiuH3qkM4W",
        },
      });
    });
  },
  btnDelBWFW(routerParam, metaData, formData, VueData, refs) {
    formData.main["210419103326nLnnu9jebQUtgOvASMx"].value = "0";
    this.save(routerParam, metaData, formData, VueData, refs, function () { });
  },
  batchEndNode(routerParam, metaData, formData, VueData, refs) {
    let postData = {
      todoData:
        '[{"pk":"' +
        VueData.formParams.pk +
        '","pnid":"' +
        metaData.parameters.pnId +
        '"}]',
    };
    dsf.layer.confirm(
      {
        message: "是否确定办结文件？",
        confirmButtonText: "确认",
      },
      () => {
        dsf.http.post("fn/flow/batchEndNode", postData).then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("办结成功", true, () => VueData.backSucces());
          } else {
            dsf.layer.toast("办结失败", false);
          }
        });
      }
    );
  },
  openMeetingFeedback(routerParam, metaData, formData, VueData, refs) {
    // 宝山会议反馈
    dsf.http
      .post("fn/qfhy/getFeedbackId", {
        pk: formData.main.A0001.value,
        userId: dsf.util.loadSessionStore("user").user_id,
        fklx: 1,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/2104141606331OznBwa4xmtnxhSqh0a/${res.data.data.pk}`,
          });
        }
      });
  },
  ckcxqk(routerParam, metaData, formData, VueData, refs) {
    // 宝山会议出席情况
    VueData.$router.push({
      path: `/commonList/210419095025TxVutUdY12sOd4xXzW0/2104141711253iKSCQ3bJElFKMNksTA`,
      query: {
        secQuery: `{"hyId": "${formData.main.A0001.value}"}`,
        notLink: 1,
      },
    });
  },
  goList1(routerParam, metaData, formData, VueData, refs) {
    // 日报社反馈列表
    VueData.$router.push({
      path: `/commonList/210912190154BBu4DDZxWW1fPHjdcMS/210608105939mkuTUSzHdhowHPHxlY8`,
      query: {
        secQuery: `{"fid": "${routerParam.pk}"}`,
        fid: routerParam.pk,
      },
    });
  },
  goList2(routerParam, metaData, formData, VueData, refs) {
    // 日报社
    VueData.$router.push({
      path: `/commonList/210912185726VzhfDurrSSVxw35J8Qh/210723164628N6ZfKTUlQtwXLTT7Mrg`,
      query: {
        secQuery: `{"fid": "${routerParam.pk}"}`,
        fid: routerParam.pk,
      },
    });
  },
  // 短信签名 - 个人[红船oa]
  smsUserSign(routerParam, metaData, formData, VueData, refs) {
    if (formData.main["C-SMS-0013"]) {
      formData.main["C-SMS-0013"].value += `【${userinfo.name}】`;
    }
  },
  // 短信签名 - 部门[红船oa]
  smsDeptSign(routerParam, metaData, formData, VueData, refs) {
    if (formData.main["C-SMS-0013"]) {
      formData.main["C-SMS-0013"].value += `【${userinfo.deptName}】`;
    }
  },
  // 来访人员审批 - 同意[人民日报]
  approvalVisitAgree(routerParam, metaData, formData, VueData, refs) {
    if (formData.main["C-RBS-VISITOR-016"]) {
      formData.main["C-RBS-VISITOR-016"].value = "1";
      formData.main["C-RBS-VISITOR-016"].text = "同意";
      VueData.btnAction("send");
    }
  },
  // 来访人员审批 - 不同意[人民日报]
  approvalVisitDisagree(routerParam, metaData, formData, VueData, refs) {
    if (formData.main["C-RBS-VISITOR-016"]) {
      formData.main["C-RBS-VISITOR-016"].value = "-1";
      formData.main["C-RBS-VISITOR-016"].text = "不同意";
      VueData.btnAction("send");
    }
  },
  //督办通知单确认
  acknowledgeReceipt(routerParam, metaData, formData, VueData, refs) {
    //当分配方式为“接收确认”时，
    if (formData.main["C-DB-0081"]) {
      let reciveConfirmVal = formData.main["C-DB-0081"].value;
      if (reciveConfirmVal == 1) {
        dsf.layer.confirm(
          {
            message: "请确认本人是否是该督办件的经办人?",
            confirmButtonText: "确认",
          },
          () => {
            //调用发送按钮
            VueData.btnAction("send");
          }
        );
      } else {
        //调用发送按钮
        VueData.btnAction("send");
      }
    }
  },
  // 详情：图文页 到 表单页 （气象局）
  toFormtab(routerParam, metaData, formData, VueData, refs) {
    if (VueData.formStyle) {
      VueData.formStyle = 0;
    } else {
      VueData.formStyle = 1;
    }
  },
  // 流程情况:（气象局）
  flowinfo(routerParam, metaData, formData, VueData, refs) {
    VueData.isShowQiXiangJuFlow = true;
  },
  // 意见查看：（气象局）
  opinionView(routerParam, metaData, formData, VueData, refs) {
    VueData.isShowQiXiangJuOpinion = true;
  },
  // 自定义节点意见：气象局
  qxjEditOpinion(routerParam, metaData, formData, VueData, refs) {
    VueData.isShowQiXiangJuEditOpinion = true;
    VueData.isShowWriteOpintionBtn = true;
    console.log(VueData.nowButton);
    VueData.$nextTick(() => {
      VueData.$refs.QiXiangJuEditOpinion.Show();
      if (VueData.nowButton.xpath)
        VueData.$refs.QiXiangJuEditOpinion.setXpath(VueData.nowButton.xpath);
    });
  },
  flowEnd(routerParam, metaData, formData, VueData, refs) {
    // 气象局流程结束
    let batchEndNode = function (postData) {
      dsf.http
        .post("fn/flow/batchEndNode", {
          todoData: JSON.stringify(postData),
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("办结成功", true, () => VueData.backSucces());
          } else {
            dsf.layer.toast("办结失败", false);
          }
        });
    };
    dsf.http
      .post("fn/cmaEndNode/checkIssueStatus", {
        pk: VueData.formParams.pk,
        pnId: metaData.parameters.pnId,
      })
      .then((res) => {
        let postData = [
          {
            pk: VueData.formParams.pk,
            pnid: metaData.parameters.pnId,
          },
        ];
        if (res.data.data.deptName) {
          dsf.layer.confirm(
            {
              message:
                "当前文件正由协办单位办理，确定结束将会影响协办单位文件办理!",
              confirmButtonText: "确认",
            },
            () => {
              res.data.data.pnIdArray.forEach((item) => {
                postData.push({
                  pk: VueData.formParams.pk,
                  pnid: item.pnId,
                });
              });
              batchEndNode(postData);
            }
          );
        } else {
          batchEndNode(postData);
        }
      });
  },
  // 发起便笺
  sendNote(routerParam, metaData, formData, VueData, refs) {
    if (VueData.$route.query.todoId || VueData.$route.query.distribId) {
      let formType = VueData.$route.query.todoId ? "ToDo" : "ToRead";
      VueData.$router.push({
        path: "/TabCommonForm/Note/0/180725205942uc2zjrqnTt5sg7ReWmV",
        query: {
          formType: formType,
          formPk: VueData.$route.query.todoId || VueData.$route.query.distribId,
        },
      });
    } else {
      dsf.layer.toast("当前模块暂无此功能");
    }
  },
  // 退回，发送到退回线
  "Flow.refuse"(routerParam, metaData, formData, VueData, refs) {
    this.send(routerParam, metaData, formData, VueData, refs, null, null, {
      direction: -1,
    });
  },
  // 通过（发送到一般线）
  "Flow.pass"(routerParam, metaData, formData, VueData, refs) {
    this.send(routerParam, metaData, formData, VueData, refs, null, null, {
      direction: 1,
    });
  },
  // 发送到指定线
  "Flow.sendToLine"(routerParam, metaData, formData, VueData, refs) {
    this.send(routerParam, metaData, formData, VueData, refs);
  },
  assetCheck(routerParam, metaData, formData, VueData, refs) {
    // 恩施资产清查
    VueData.$router.push({
      path: "/assetInventory",
      query: {
        showBtn: 1,
        qcId: routerParam.pk,
      },
    });
  },
  inventory(routerParam, metaData, formData, VueData, refs) {
    VueData.$router.push(
      "/commonList/211230155130PulGlXwmXzMg0s7PYTs/211230143315oQvGkV0bGLgCJF0BYFf?notLink=1&title=清查情况"
    );
  },
  mobileFlowRecycle(routerParam, metaData, formData, VueData, refs) {
    // 移动端回收(不需要申请回收)
    dsf.layer.confirm(
      {
        message: "确认回收此份文件吗?",
        confirmButtonText: "确认",
      },
      () => {
        let params = {
          pk: metaData.parameters.pk,
          flowId: metaData.parameters.flowId,
          pId: metaData.parameters.pId,
          pnId: metaData.parameters.pnId,
          fPnId: metaData.parameters.fid,
          bt: "",
          userId: dsf.util.loadSessionStore("user").user_id,
          nodeName: "",
        };
        dsf.http.post("fn/mobileFlow/recycle", params).then((retVal) => {
          if (retVal.data.result) {
            dsf.layer.toast(retVal.data.message, true, () =>
              VueData.backSucces()
            );
          } else {
            dsf.layer.toast(retVal.data.message);
          }
        });
      }
    );
  },

  reclaimFiles(routerParam, metaData, formData, VueData, refs) {
    // 西藏表单文件回收
    dsf.layer.confirm(
      {
        message: "确认回收此份文件吗?",
        confirmButtonText: "确认",
      },
      () => {
        let params = {
          pk: VueData.$route.query.infoId,
          flowId: VueData.$route.query.flowId,
          pId: VueData.$route.query.pId,
          pnId: VueData.$route.query.pnId,
          fPnId: VueData.$route.query.fid,
          bt: "",
          userId: dsf.util.loadSessionStore("user").user_id,
          nodeName: "",
        };
        dsf.http.post("fn/flow/recycle", params).then((retVal) => {
          if (retVal.data.result) {
            dsf.layer.toast(retVal.data.message, true, () =>
              VueData.backSucces()
            );
          } else {
            dsf.layer.toast(retVal.data.message);
          }
        });
      }
    );
  },
  signUserName(routerParam, metaData, formData, VueData, refs) {
    //【赣政通药监局】增加移动端签名按钮
    handleSign({
      pid: metaData.parameters.pId,
      pnid: metaData.parameters.pnId,
      isSign: 1,
      pk: VueData.formParams.pk,
    })
      .then(({ data }) => {
        let signUserNameBtn = metaData.buttons.mainButtons.find(
          (item) => item.action == "signUserName"
        );
        //console.log(signUserNameBtn);
        signUserNameBtn.action = "cancelSignUserName";
        signUserNameBtn.name = "取消签名";
        dsf.layer.toast("签名成功");
        // VueData.init()
      })
      .catch((err) => {
        console.log(err);
        dsf.layer.toast("操作失败");
      });
  },
  cancelSignUserName(routerParam, metaData, formData, VueData, refs) {
    //【赣政通药监局】增加移动端签名按钮
    handleSign({
      pid: metaData.parameters.pId,
      pnid: metaData.parameters.pnId,
      isSign: 0,
      pk: VueData.formParams.pk,
    })
      .then(({ data }) => {
        let signUserNameBtn = metaData.buttons.mainButtons.find(
          (item) => item.action == "cancelSignUserName"
        );
        //console.log(signUserNameBtn);
        signUserNameBtn.action = "signUserName";
        signUserNameBtn.name = "签名";
        dsf.layer.toast("取消签名成功");
        //VueData.init()
      })
      .catch((err) => {
        console.log(err);
        dsf.layer.toast("操作失败");
      });
  },
  toCreatePersonalAgenda(routerParam, metaData, formData, VueData, refs) {
    //【山东烟草】转日程
    dsf.http
      .post("ctrl/sdycCommonController/toCreatePersonalAgenda", {
        pk: VueData.formParams.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push(
            `/commonForm/180719094152MnF6C2hEPtqIvhjJIxo/${res.data.data.pk}`
          );
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  reShareInfoSdyc(routerParam, metaData, formData, VueData, refs) {
    //console.log(metaData)
    let data = {
      info_id: formData.main.A0001.value,
    };
    VueData.separateTabs = [
      {
        action:
          "fn/user/select/data?types=person&rootObject=1&action=self_dept&async=true",
        name: "本部门",
        subTabKey: "department",
      },
    ];
    VueData.showSeparate = true;
    VueData.$nextTick((res) => {
      //console.log(VueData.$refs.readPop)
      VueData.$refs.readPop.show(data);
    });
  },
  sdycAuthAttention(routerParam, metaData, formData, VueData, refs) {
    // 山东烟草授权关注
    this.save(routerParam, metaData, formData, VueData, refs, function () {
      VueData.$router.push(
        `/commonForm/220312111313dbJt7LhwcN926JU2Exh?formId=220312111553JSGNoLqb3WDBqNLoA8P&infoId=${routerParam.pk}`
      );
    });
  },
  sdycAuthAttentionSure(routerParam, metaData, formData, VueData, refs) {
    // 山东烟草授权关注确认
    if (!VueData.formData.main["220312112056WneBhpkupoW3EWDfipt"].value) {
      dsf.layer.toast("请选择接收人");
    } else {
      dsf.http
        .post("fn/authAttention/saveData", {
          infoId: VueData.$route.query.infoId,
          userId:
            VueData.formData.main["220312112056WneBhpkupoW3EWDfipt"].value,
          userName:
            VueData.formData.main["220312112056WneBhpkupoW3EWDfipt"].text,
          userSchema:
            VueData.formData.main["220312112056WneBhpkupoW3EWDfipt"].schema,
          msg: VueData.formData.main["220312105343lkMYl5vkBrCucLyKkeW"].value,
        })
        .then((res) => {
          if (res.data.code == 200) {
            dsf.layer.toast("授权关注成功", true, () => VueData.backSucces());
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    }
  },
  sdycAuthAttentionList(routerParam, metaData, formData, VueData, refs) {
    // 山东烟草授权关注情况列表
    VueData.$router.push({
      path: "/commonList/220312112323qE4N32wpnJkHiph7HAv/220312111313dbJt7LhwcN926JU2Exh",
      query: {
        secQuery: JSON.stringify({
          sourcePk: routerParam.pk,
        }),
      },
    });
  },
  "Flow.proxyFormSend"(routerParam, metaData, formData, VueData, refs) {
    //意见代录发送按钮
    let oldflowKey = `flow-${VueData.formParams.pk}-${metaData.parameters.pId}-${metaData.parameters.pnId}`;
    if (formData.flowinfo[oldflowKey]) {
      VueData.$set(formData.main, "S-PROCESS-0030", {
        value: formData.flowinfo[oldflowKey].opinionContent,
      });
    }

    let sendButtonParams = VueData.nowButtonParameters;
    if (Object.keys(sendButtonParams).length == 0) {
      sendButtonParams = {
        determineUser: formData.main["S-PROCESS-0005"].value,
        determineInfoId: formData.main["S-PROCESS-0003"].value,
        pid: formData.main["S-PROCESS-0004"].value,
        pnid: formData.main["S-BASE-0001"].value,
      };
    }

    function foo(VueData, sendButtonParams) {

      VueData.sendFileData = {
        id: "",
        moduleId: routerParam.moduleId,
        sendType: "SR_SEND",
        pid: sendButtonParams.pid || 0,
        pnid: sendButtonParams.pnid || 0,
        flowId: "",
        info_id: sendButtonParams.determineInfoId,
        bt: "",
        moduleName: "",
        allowEditOpinion: VueData.shoEditOpinion
          ? metaData.parameters.allowEditOpinion
          : VueData.shoEditOpinion,
        opinionRequired: metaData.parameters.opinionRequired,
        direction: sendButtonParams.direction,
        nodeId: metaData.parameters.nodeId,
        determineUser: sendButtonParams.determineUser,
        determineInfoId: sendButtonParams.determineInfoId,
      };
      VueData.showPopUp = true;
      VueData.$nextTick(() => {
        VueData.$refs.sendFileCom.show();
      });
    }
    this.save(
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      foo,
      false,
      sendButtonParams
    );
  },
  openOpinion2(routerParam, metaData, formData, VueData, refs) {
    //江西办公厅意见代录按钮开发
    let originPk = VueData.formParams.pk;
    let originModuleId = VueData.formParams.moduleId;
    dsf.http
      .post("fn/opinionc/yjdl", {
        pk: originPk,
      })
      .then((result) => {
        result = result.data;
        if (result.type == "success") {
          VueData.$router.push({
            path: `/commonForm/190314094242VQ9wScyToHKiCEnz45L/${result.message}`,
            query: {
              listId: "1903141007552oa8qPy14Jli1PosdgD",
              method: "view",
              validateByList: 1,
              originModuleId: originModuleId,
              originPk: originPk,
              status: 1,
              specialSaveObj: JSON.stringify({
                originModuleId: originModuleId,
                originPk: originPk,
              }),
            },
          });
        } else {
          dsf.layer.toast("无可代录意见！");
        }
      });
  },
  reject(routerParam, metaData, formData, VueData, refs) {
    //上海地产集团驳回按钮开发
    if (!VueData.nowButton.parameters.length) {
      dsf.layer.toast("当前按钮未配置参数");
      return;
    }
    VueData.$refs["rejectDialog"]
      .show(VueData.nowButton.parameters[0].name)
      .then((reason) => {
        dsf.http
          .post(VueData.nowButton.parameters[0].value, {
            pk: VueData.formParams.pk,
            reason: reason,
          })
          .then(({ data }) => {
            dsf.layer.toast(data.message, true, () => VueData.backSucces());
          });
      });
  },
  noteReply(routerParam, metaData, formData, VueData, refs) {
    // 便笺回复
    VueData.$router.push({
      path: `/commonForm/${routerParam.moduleId}`,
      query: {
        method: "create",
        listId: "180726211007WCqjA6vmt7HaNaInl7U",
        replyId: routerParam.pk,
      },
    });
  },
  noteForward(routerParam, metaData, formData, VueData, refs) {
    // 便笺转发
    VueData.$router.push({
      path: `/commonForm/${routerParam.moduleId}`,
      query: {
        method: "create",
        listId: "180726211007WCqjA6vmt7HaNaInl7U",
        forwardIds: routerParam.pk,
      },
    });
  },
  noteSave(routerParam, metaData, formData, VueData, refs) {
    // 便笺保存
    let sendObj = {
      id: VueData.noteId,
      noteTitle: formData.main["B0001"] ? formData.main["B0001"].value : "",
      content: formData.main["C-BJ-0001"]
        ? formData.main["C-BJ-0001"].value
        : "",
      range: formData.main["C-BJ-0002"] ? formData.main["C-BJ-0002"].value : "",
      rangeName: formData.main["C-BJ-0002"]
        ? formData.main["C-BJ-0002"].text
        : "",
      rangeSchema: formData.main["C-BJ-0002"]
        ? formData.main["C-BJ-0002"].schema
        : "",
      jccd: formData.main["B0006"] ? formData.main["B0006"].value : "",
      jccdText: formData.main["B0006"] ? formData.main["B0006"].text : "",
      isSms: formData.main["C-BJ-0024"]
        ? formData.main["C-BJ-0024"].value
        : "-1",
      isSmsText: formData.main["C-BJ-0024"]
        ? formData.main["C-BJ-0024"].text
        : "否",
      smsContent: formData.main["C-BJ-0025"]
        ? formData.main["C-BJ-0025"].value
        : "",
      file: {
        attach: VueData.allFile.length
          ? VueData.allFile[0].uploadObj || []
          : [],
      },
    };
    if (VueData.$route.query.replyId) {
      sendObj.replyId = VueData.$route.query.replyId;
    }
    if (VueData.$route.query.forwardIds) {
      sendObj.forwardIds = VueData.$route.query.forwardIds;
    }
    const sendData = {
      __DATA: JSON.stringify(sendObj),
      moduleId: VueData.moduleId,
    };
    dsf.http.post("fn/mobileNote/save", sendData).then((parm) => {
      if (parm.data.result) {
        dsf.layer.toast(parm.data.message, true);
      } else {
        dsf.layer.toast(parm.data.message, false);
      }
    });
  },
  noteSend(routerParam, metaData, formData, VueData, refs) {
    // 便笺发送
    let sendObj = {
      id: VueData.noteId,
      noteTitle: formData.main["B0001"] ? formData.main["B0001"].value : "",
      content: formData.main["C-BJ-0001"]
        ? formData.main["C-BJ-0001"].value
        : "",
      range: formData.main["C-BJ-0002"] ? formData.main["C-BJ-0002"].value : "",
      rangeName: formData.main["C-BJ-0002"]
        ? formData.main["C-BJ-0002"].text
        : "",
      rangeSchema: formData.main["C-BJ-0002"]
        ? formData.main["C-BJ-0002"].schema
        : "",
      jccd: formData.main["B0006"] ? formData.main["B0006"].value : "",
      jccdText: formData.main["B0006"] ? formData.main["B0006"].text : "",
      isSms: formData.main["C-BJ-0024"]
        ? formData.main["C-BJ-0024"].value
        : "-1",
      isSmsText: formData.main["C-BJ-0024"]
        ? formData.main["C-BJ-0024"].text
        : "否",
      smsContent: formData.main["C-BJ-0025"]
        ? formData.main["C-BJ-0025"].value
        : "",
      file: {
        attach: VueData.allFile.length
          ? VueData.allFile[0].uploadObj || []
          : [],
      },
    };
    if (VueData.$route.query.replyId) {
      sendObj.replyId = VueData.$route.query.replyId;
    }
    if (VueData.$route.query.forwardIds) {
      sendObj.forwardIds = VueData.$route.query.forwardIds;
    }
    const sendData = {
      __DATA: JSON.stringify(sendObj),
      moduleId: VueData.moduleId,
    };
    dsf.http.post("fn/mobileNote/send", sendData).then((parm) => {
      if (parm.data.result) {
        dsf.layer.toast(parm.data.message, true, () => VueData.backSucces());
      } else {
        dsf.layer.toast(parm.data.message, false);
      }
    });
  },
  noReplyToConclude(routerParam, metaData, formData, VueData, refs) {
    // 便笺无回复办结
    dsf.http
      .post("ctrl/notepaper/noReplyToConclude", { pk: VueData.pk, userId: "" })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.backSucces();
        }
      });
  },
  fwRuleConvert(routerParam, metaData, formData, VueData, refs) {
    // 党校发文同步规章制度
    dsf.http
      .post("/ctrl/fwconvertRules/conversion", {
        ids: metaData.parameters.pk || VueData.formParams.pk || routerParam.pk,
      })
      .then((res) => {
        if (res.data.type == "success") {
          if (res.data.message == "1") {
            dsf.layer.toast("同步成功", true, () => VueData.backSucces());
          } else if (res.data.message == "2") {
            dsf.layer.toast("文件已转规章制度", false);
          }
        } else {
          dsf.layer.toast("同步失败", false);
        }
      });
  },
  // 校历列表 杭州市委党校，取消发布
  xiaoliPublish(routerParam, metaData, formData, VueData, refs) {
    let pk = formData.main.A0001.value;
    let flag = formData.main["2108241539404N5u3scBD2B9v1lJWtg"].value; //是否发布

    if (flag == "1") {
      this.dsf.layer.toast("该通知已发布!");
    } else {
      let param = {
        pk: pk,
      };
      this.save(routerParam, metaData, formData, VueData, refs, function () {
        dsf.http
          .post("fn/calendar/release", param)
          .then((res) => {
            const { message, type } = res.data;

            if (type === "success" && message == "1") {
              dsf.layer.toast("发布成功", true, () => VueData.backSucces());
            } else {
              dsf.layer.toast("发布失败", false);
            }
          })
          .finally(() => { });
      });
    }
  },
  // 校历列表 杭州市委党校，发布
  xiaolicancelPublish(routerParam, metaData, formData, VueData, refs) {
    let pk = formData.main.A0001.value;
    let param = {
      pk: pk,
    };
    this.save(routerParam, metaData, formData, VueData, refs, function () {
      dsf.http
        .post("fn/calendar/unRelease", param)
        .then((res) => {
          const { message, type } = res.data;
          if (type === "success" && message == "1") {
            dsf.layer.toast("取消成功", true, () => VueData.backSucces());
          } else {
            dsf.layer.toast("已有部门填写了校历征集,不能取消发布!", false);
          }
        })
        .finally(() => { });
    });
  },
  //取消办结
  "xform.cancelEndInstance"(routerParam, metaData, formData, VueData, refs) {
    cancelEndInstance({
      pk: formData.main.A0001.value,
      reason: "取消办结",
    }).then(({ data }) => {
      dsf.layer.toast(data.message, true, () => VueData.backSucces());
    });
  },
  //取消办结节点
  "Flow.cancelEndNode"(routerParam, metaData, formData, VueData, refs) {
    let loading = dsf.layer.loading("正在取消");
    cancelEndNode({
      pk: formData.main.A0001.value,
    }).then(({ data }) => {
      dsf.layer.closeLoading(loading);
      dsf.layer.toast(data.message, true, () => VueData.backSucces());
    });
  },
  ycSendBack(routerParam, metaData, formData, VueData, refs) {
    // 江苏烟草退回
    dsf.layer.confirm(
      {
        title: "退回原因",
        message:
          '<textarea rows="5" id="failReason" placeholder="请填写退回原因" class="van-field__control" style="border: 1px solid #ddd; padding: 6px"></textarea>',
      },
      () => {
        console.log(document.getElementById("failReason").value);
        let buttonParams = VueData.nowButtonParameters;
        dsf.http
          .post("ctrl/projectApprovalApply/saveBackOpinion", {
            infoId: metaData.parameters.pk,
            nodeId: buttonParams.nextNodeId,
            opinion: document.getElementById("failReason").value,
          })
          .then((res) => {
            if (res.data.code == 200) {
              VueData.sendFileData = {
                id: metaData.parameters.pk,
                moduleId: routerParam.moduleId,
                sendType: "SR_JUMPSEND",
                pid: metaData.parameters.pId || 0,
                pnid: metaData.parameters.pnId || 0,
                flowId: metaData.parameters.flowId,
                info_id: metaData.parameters.pk,
                bt: formData.main["B0001"].value,
                allowEditOpinion: 0,
                opinionRequired: metaData.parameters.opinionRequired,
                nodeId: metaData.parameters.nodeId,
                nextNodeId: buttonParams.nextNodeId,
                endOtherLink: 0,
                isBackTrack: -1,
              };
              VueData.showPopUp = true;
              VueData.$nextTick(() => {
                VueData.$refs.sendFileCom.show();
              });
            } else {
              dsf.layer.toast("保存退回意见失败");
            }
          });
      },
      () => { }
    );
  },
  fanKuiQingKuang(routerParam, metaData, formData, VueData, refs) {
    // 督办反馈情况
    VueData.$router.push(`/superviseIdea?id=${VueData.pk}`);
  },
  DBjieShouQingKuang(routerParam, metaData, formData, VueData, refs) {
    // 督办接收情况
    VueData.$router.push(`/superviseAccept?id=${VueData.pk}`);
  },
  //督办项目台账-催办
  saveDBCB(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "2106161334381PC5vugnZwQyjNoMLzA",
        initDataSource: 1,
        srcInfo: VueData.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: VueData.pk,
              relationId: VueData.pk,
              type: "催办",
            },
          });
        }
      });
  },
  //督办项目台账-延期
  ApplyDelay(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "2106161334595i5kcF958pSy79wI6t1",
        initDataSource: 1,
        srcInfo: VueData.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: VueData.pk,
              relationId: VueData.pk,
              type: "延期",
            },
          });
        }
      });
  },
  //督办项目台账-办结
  banJie(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "210616133423XmMnuQ7yvMILNoWX6NY",
        initDataSource: 1,
        srcInfo: VueData.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: VueData.pk,
              relationId: VueData.pk,
              type: "办结",
            },
          });
        }
      });
  },
  //督办项目台账-评价
  pingJia(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "210723193202gK3WrhlYN0pG9bE77fE",
        initDataSource: 1,
        srcInfo: VueData.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: VueData.pk,
              relationId: VueData.pk,
              type: "评价",
            },
          });
        }
      });
  },
  //督办项目台账-增加承办
  increaseChengBan(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "220805171120LY8GOHEtSNDgVStRskk",
        initDataSource: 1,
        srcInfo: VueData.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: VueData.pk,
              relationId: VueData.pk,
              type: "增加承办",
            },
          });
        }
      });
  },
  //督办项目台账-变更计划
  bianGengPlan(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "220805171717HXpWekYcCtbO2GgbEWh",
        initDataSource: 1,
        srcInfo: VueData.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: VueData.pk,
              relationId: VueData.pk,
              type: "变更计划",
            },
          });
        }
      });
  },
  //督办项目台账-变更
  dbtzChange(routerParam, metaData, formData, VueData, refs) {
    dsf.http
      .post("/ctrl/convert/moduleRuleConvert", {
        convertId: "210715193605z4SYYk4JHBUGNy3b7tF",
        initDataSource: 1,
        srcInfo: VueData.pk,
      })
      .then((res) => {
        if (res.data.code == 200) {
          VueData.$router.push({
            path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
            query: {
              initDataSource: 1,
              sourcePk: VueData.pk,
              relationId: VueData.pk,
              type: "变更",
            },
          });
        }
      });
  },
  // 特送
  "xform.specialSend"(routerParam, metaData, formData, VueData, refs) {
    this.send(
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      null,
      {
        pid: metaData.parameters.pId,
        pnid: metaData.parameters.pnId,
        wfId: metaData.parameters.flowId,
        sendType: "SR_SPECIAL",
      },
      VueData.nowButtonParameters
    );
  },
  // 抄送
  "xform.copySend"(routerParam, metaData, formData, VueData, refs) {
    let self = this
    if (VueData.nowButtonParameters.isNeedOpinion == "1") {
      VueData.componentName = "sxCopyOpinion"
      VueData.spHandleJS.closeDialogCallback = function (data) {
        if (JSON.stringify(data) != "{}" && data.actionName == "确定") {
          self.send(
            routerParam,
            metaData,
            formData,
            VueData,
            refs,
            null,
            {
              pid: metaData.parameters.pId,
              pnid: metaData.parameters.pnId,
              wfId: metaData.parameters.flowId,
              opinionContent: data.value,
              sendType: "SR_COPY",
            },
            VueData.nowButtonParameters
          )
        }
      }
    } else {
      this.send(
        routerParam,
        metaData,
        formData,
        VueData,
        refs,
        null,
        {
          pid: metaData.parameters.pId,
          pnid: metaData.parameters.pnId,
          wfId: metaData.parameters.flowId,
          sendType: "SR_COPY",
        },
        VueData.nowButtonParameters
      );
    }

  },
  "xform.exSend"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    dsf.layer.loading()
    VueData.componentName = 'exSendDialog';
    dsf.http
      .post("fn/mobileFlow/getFlowNode", {
        "type": 'SR_EXSEND',
        "infoId": metaData.parameters.pk,
        "moduleId": metaData.parameters.moduleId,
        "pid": metaData.parameters.pId,
        "nextNodeId": VueData.nowButtonParameters.startNodeId,
        "nextLineId": VueData.nowButtonParameters.nextLineId,
      })
      .then((res) => {
        dsf.layer.clear()
        if (res.status == '200') {
          VueData.$bus.$emit("ZFLineData", res.data.data);
        }
      })
  },
  commonDialogBtn(routerParam, metaData, formData, VueData, refs) {
    if (VueData.nowButtonParameters && VueData.nowButtonParameters.name) {
      VueData.componentName = VueData.nowButtonParameters.name;
    } else {
      dsf.layer.toast("按钮参数配置错误，请检查参数是否正确！！");
    }

    console.log(VueData.nowButtonParameters);
  },
  // 流转情况
  showFlow(routerParam, metaData, formData, VueData, refs) {
    if (VueData.nowButtonParameters.isNew == 1) {
      VueData.componentName = "newMovingDialog";
    } else {
      VueData.componentName = "movingDialog";
    }
  },
  // 成都市一体化协同办公平台 查看办理效能详情
  effectivenessHandle(routerParam, metaData, formData, VueData, refs) {
    VueData.$router.push({
      path: `/effectivenessDetail?pk=${VueData.pk}`
    })
  },
  // 舟山市委党校发送前填入意见
  InputOpinion(routerParam, metaData, formData, VueData, refs) {
    if (VueData.nowButtonParameters.param1 == 1) {
      VueData.formMeta.controls.find(
        (item) => item.controlType == "controlEditOpinion"
      ).extra.opinionContent = "同意";
      this["Flow.pass"](routerParam, metaData, formData, VueData, refs);
    } else if (VueData.nowButtonParameters.param1 == -1) {
      VueData.formMeta.controls.find(
        (item) => item.controlType == "controlEditOpinion"
      ).extra.opinionContent = "不同意";
      this["Flow.refuse"](routerParam, metaData, formData, VueData, refs);
    }
  },
  //强制回收
  "xform.forceRecycle"(routerParam, metaData, formData, VueData, refs) {
    dsf.layer.confirm(
      {
        message: "您是否确认强制回收？",
        confirmButtonText: "确认",
      },
      () => {
        // VueData.componentName = "forceRecycle"
        // return
        dsf.http
          .post("/fn/flow/getForceRecycleData", {
            pk: VueData.pk,
          })
          .then((res) => {
            if (res.data.code == 200) {
              VueData.componentName = "forceRecycle";
            } else {
              dsf.layer.toast("接口请求失败！");
            }
          });
      }
    );
  },
  // 会议2.0会议通知下发通知--jf
  "DSF.Meeting.Action.issueNotice"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    let issueNotice = function () {
      if (
        formData.multinfos &&
        formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"]
      ) {
        dsf.http
          .post("/ctrl/meeting/changeTopicFid", {
            fid: formData.main["A0001"].value,
            ids: formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows.map(
              (item) => item["210618155422Xgcs9ChmODWRV36fMHJ"].value
            ),
          })
          .then((res) => {
            console.log(res);
          });
      }
      let hys = formData.main["c-meetingsq-009"]
        ? formData.main["c-meetingsq-009"].value
        : formData.main["c-meetingtz-010"].value;
      let sdate = formData.main["c-meetingsq-007"]
        ? formData.main["c-meetingsq-007"].value
        : formData.main["c-meetingtz-019"].value;
      let edate = formData.main["c-meetingsq-008"]
        ? formData.main["c-meetingsq-008"].value
        : formData.main["c-meetingtz-020"].value;
      dsf.http
        .post("fn/meetingRoomOccupy/checkRoomOccupy", {
          //校验会议室是否空置
          pk: formData.main["B0035"].value,
          hys: hys,
          sdate: sdate,
          edate: edate,
        })
        .then((res) => {
          console.log(res);
          if (res.data.type == "error") {
            dsf.layer.toast(res.data.message);
            return;
          } else {
            generatorFile();
          }
        });
    };
    let advise = function () {
      let loader = dsf.layer.loading("通知下发中");
      dsf.http
        .post("/fn/meetingNotice/issueNotice", {
          pk: metaData.parameters.pk,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            if (!res.data.data) {
              dsf.layer.toast("操作成功", () => {
                VueData.backSucces();
              });
              return;
            }
            if (res.data.data.needOpen) {
              VueData.$router.replace({
                path: `/commonForm/${res.data.data.moduleId}/${res.data.data.tzId}`,
                query: {
                  listId: res.data.data.listId,
                  method: res.data.data.method,
                  validateByList: res.data.data.validateByList,
                  notCheck: true,
                },
              });
            } else {
              dsf.layer.toast("下发通知成功", () => {    //直接会议申请下发通知
                console.log(VueData.isFromList);
                if (VueData.isFromList) {
                  VueData.backSucces();
                } else {
                  if (VueData.$route.query.isFromreserve) {
                    // 返回会议室预定
                    VueData.$router.replace({
                      path: `/reserveNewMeeting?title=会议室预定`,
                    });
                  } else {
                    // 返回会议申请
                    VueData.$router.go(-1)
                  }

                }
              });
            }
          } else {
            dsf.layer.toast(res.data.message);
          }
          dsf.layer.closeLoading(loader);
        });
    };
    let generatorFile = function () {
      // 通知正文模板，没有元数据则是会议申请的下发通知，有元数据则是会议通知的下发通知，会议通知时，有模板下发通知
      if (formData.main["c-meetingtz-091"]?.value) {
        dsf.http
          .post("ctrl/meetingNotice/generatorFile", {
            //更新打印单
            fileType: "0",
            templateId: formData.main["c-meetingtz-091"].value,
            moduleId: metaData.parameters.moduleId,
            pk: metaData.parameters.pk,
          })
          .then((res) => {
            console.log(res);
            if (res.status == "200") {
              dsf.layer.toast(res.data.message);
              advise();
            }
          });
      } else {
        // 会议申请与会议通知无模板也可下发通知
        advise();
      }
    };

    this.save(routerParam, metaData, formData, VueData, refs, issueNotice);
  },
  // 办公厅转会议通知--jf
  issueMeetingNotice(routerParam, metaData, formData, VueData, refs) {
    let issueNotice = function () {
      if (
        formData.multinfos &&
        formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"]
      ) {
        dsf.http
          .post("/ctrl/meeting/changeTopicFid", {
            fid: formData.main["A0001"].value,
            ids: formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows.map(
              (item) => item["210618155422Xgcs9ChmODWRV36fMHJ"].value
            ),
          })
          .then((res) => {
            console.log(res);
          });
      }
      let hys = formData.main["c-meetingsq-009"]
        ? formData.main["c-meetingsq-009"].value
        : formData.main["c-meetingtz-010"].value;
      let sdate = formData.main["c-meetingsq-007"]
        ? formData.main["c-meetingsq-007"].value
        : formData.main["c-meetingtz-019"].value;
      let edate = formData.main["c-meetingsq-008"]
        ? formData.main["c-meetingsq-008"].value
        : formData.main["c-meetingtz-020"].value;
      dsf.http
        .post("fn/meetingRoomOccupy/checkRoomOccupy", {
          //校验会议室是否空置
          pk: formData.main["B0035"].value,
          hys: hys,
          sdate: sdate,
          edate: edate,
        })
        .then((res) => {
          console.log(res);
          if (res.data.type == "error") {
            dsf.layer.toast(res.data.message);
          } else {
            advise()
          }
        });
    };
    let advise = function () {
      let loader = dsf.layer.loading("通知下发中");
      dsf.http
        .post("/ctrl/meetingNoticeSfb/issueNotice", {
          pk: metaData.parameters.pk,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            if (!res.data.data) {
              dsf.layer.toast("操作成功", () => {
                VueData.backSucces();
              });
              return;
            }
            if (res.data.data.needOpen) {
              VueData.$router.replace({
                path: `/commonForm/${res.data.data.moduleId}/${res.data.data.tzId}`,
                query: {
                  listId: res.data.data.listId,
                  method: res.data.data.method,
                  validateByList: res.data.data.validateByList,
                  notCheck: true,
                },
              });
            } else {
              dsf.layer.toast("下发通知成功", () => {
                if (VueData.isFromList) {
                  VueData.backSucces();
                } else {
                  VueData.$router.replace({
                    path: `/commonList/200818195728QeQ7vIeoJ3jWto301pj/190121161348OthBI4s3sEhvfuDJ5FD?title=会议通知`,
                  });
                }
              });
            }
          } else {
            dsf.layer.toast(res.data.message);
          }
          dsf.layer.closeLoading(loader);
        });
    };
    this.save(routerParam, metaData, formData, VueData, refs, issueNotice);
  },

  // 会议2.0会议申请发送转会议通知--jf
  "DSF.Meeting.Action.meetingNgSend"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    let self = this;
    if (!formData.main["c-meetingsq-007"].value) {
      dsf.layer.toast(`开始时间不能为空`);
      return;
    }
    if (!formData.main["c-meetingsq-008"].value) {
      dsf.layer.toast(`结束时间不能为空`);
      return;
    }
    if (!formData.main["c-meetingsq-009"].value) {
      dsf.layer.toast(`会议室不能为空`);
      return;
    }
    dsf.http
      .post("fn/meeting/getMeetingConfig?configCode=p1001-HY-TYSZ-002")
      .then((res) => {
        console.log(res);
        if (res.status == "200") {
          confirm(res.data.data || "");
        }
      });
    let confirm = function (type) {
      dsf.http
        .post("fn/meetingRoomOccupy/checkRoomOccupy", {
          pk: formData.main["B0035"].value,
          hys: formData.main["c-meetingsq-009"].value,
          sdate: formData.main["c-meetingsq-007"].value,
          edate: formData.main["c-meetingsq-008"].value,
        })
        .then((res) => {
          if (res.data.type == "error") {
            if (type == "1") {
              dsf.layer.confirm(
                {
                  message: res.data.message + "是否确认发送？",
                  confirmButtonText: "确认",
                },
                () => {
                  self.send(
                    routerParam,
                    metaData,
                    formData,
                    VueData,
                    refs,
                    null
                  );
                }
              );
            } else {
              dsf.layer.toast(res.data.message);
            }
          } else {
            self.send(routerParam, metaData, formData, VueData, refs, null);
          }
        });
    };
  },
  "xform.saveFormTemporarily"(routerParam, metaData, formData, VueData, refs, callback) {
    // 表单暂存
    // VueData.notVaildateMetas = VueData.formMeta.controls.map(
    //   (control) => control.metaId
    // );
    // 暂存字段 不进行元数据校验
    VueData.$route.query.specialSaveObj = JSON.stringify({ temporarilySave: true })
    this.saveNoTip(routerParam, metaData, formData, VueData, callback, false);
  },
  remoteTransmission(routerParam, metaData, formData, VueData, refs) {
    //内蒙呼和浩特远程发送-------------利雅
    let dataValue = {
      info_id: formData.main.A0001.value,
      // pnid: buttonParams.pnid,
      // wfId: buttonParams.wfId,
    };
    VueData.showPerson = true;
    VueData.dataValue = dataValue;
    VueData.isTransfer = true;
    VueData.selectType = 1;
    let orgType = VueData.nowButtonParameters.orgType;
    VueData.extra = {
      multiple: true,
      tabs: [
        {
          action: `fn/orgManager/getOrgByType?orgType=${orgType}&checkedIds=`,
          name: "远程发送",
          subTabKey: "department",
        },
      ],
    };
    // 重写选人确认后的getSelectUser方法，调用接口
    VueData.getSelectUser = function (data) {
      let uids = "",
        unames = "",
        domains = "",
        printNums = "";
      data.forEach((ele) => {
        uids += ele.id + ",";
        unames += ele.name + ",";
        domains += ele.attrs.domain + ",";
        printNums += "999,";
      });
      let range = uids + "|" + unames + "|" + domains + "|" + printNums;
      let param = {
        infoId: VueData.formParams.pk,
        range: range,
        nrtypes: "",
        targetType: 3,
        orgType: orgType,
      };
      let loader = dsf.layer.loading("发送中");
      dsf.http.get("fn/proxySend/remotesend", param).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          dsf.layer.toast("远程发送成功");
        } else {
          dsf.layer.toast("远程发送失败");
        }
        dsf.layer.closeLoading(loader);
        VueData.$nextTick(() => {
          VueData.$router.go(-1);
        });
      });
    };
  },
  meetingRemoteSubmitBm(routerParam, metaData, formData, VueData, refs) {
    //远程报名单提交
    let report = function () {
      dsf.http
        .post("ctrl/meetingRemote/submitNotice", {
          pk: metaData.parameters.pk,
          isEndFlow: 1,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data?.code == '200') {
            dsf.layer.toast("上报成功", () => {
              if (VueData.$route.query.isback) {
                VueData.backSucces(VueData.$route.query.isback)
              } else {
                VueData.backSucces()
              }
            });
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    };
    this.save(routerParam, metaData, formData, VueData, refs, report);
  },
  remoteMeetingConvertSq(routerParam, metaData, formData, VueData, refs) {
    //远程通知单转会议申请
    dsf.layer.confirm(
      {
        title: "提示",
        message: "确认是否转会议申请",
      },
      () => {
        dsf.http
          .post("ctrl/convert/moduleConvert", {
            sourceModule: metaData.parameters.moduleId,
            targetModule: "190111184257QgSNR8cW92akDpqeWMA",
            srcInfo: metaData.parameters.pk,
            isEndSrcFlow: 1,
            pnid: metaData.parameters.pnId,
          })
          .then((res) => {
            if (res.data.code == 200) {
              VueData.$router.push({
                path: `/commonForm/190111184257QgSNR8cW92akDpqeWMA/${res.data.data.pk}`,
              });
            }
          });
      }
    );
  },
  remoteMeetingConvertSw(routerParam, metaData, formData, VueData, refs) {
    //远程通知单转收文
    dsf.layer.confirm(
      {
        title: "提示",
        message: "请确认是否转收文",
      },
      () => {
        dsf.http
          .post("ctrl/meetingRemote/getConvertSwModuleId", {})
          .then((res) => {
            if (res.status == "200" && res.data) {
              Covert(res.data.data);
            } else {
              dsf.layer.toast("请联系管理员配置转换模块");
            }
          });
      }
    );

    let Covert = function (moduleId) {
      dsf.http
        .post("ctrl/convert/moduleConvert", {
          sourceModule: metaData.parameters.moduleId,
          targetModule: moduleId,
          srcInfo: metaData.parameters.pk,
          isEndSrcFlow: 1,
          pnid: metaData.parameters.pnId,
        })
        .then((res) => {
          if (res.data.code == 200) {
            VueData.$router.push({
              path: `/commonForm/${moduleId}/${res.data.data.pk}`,
            });
          }
        });
    };
  },
  openRemoteMeetingNotice(routerParam, metaData, formData, VueData, refs) {
    //远程通知单反馈
    dsf.http
      .post("ctrl/meetingRemote/getMeetingNotice", {
        sourceId: formData.main["A0003"].value,
        moduleId: metaData.parameters.moduleId,
        pk: metaData.parameters.pk,
      })
      .then((res) => {
        if (res.status == "200" && res.data?.data) {
          debugger;
          let nodeId = res.data.data.hytzStatus != "1" ? "16" : "-1";
          VueData.$router.push({
            name: "commonForm",
            params: {
              moduleId: "230517224206lQszMtXvkQGlirGaxBu",
              pk: formData.main["A0003"].value,
            },
            query: {
              listId: "MeetingList",
              method: "customNode",
              validateByList: 1,
              showNodeId: nodeId,
            },
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  exchangeAccept(
    routerParam,
    metaData,
    formData,
    VueData,
    refs,
    callback,
    isOpenForm = true
  ) {
    /***
     * 公文交换 签收
     * 1、获取要转换的目标模块，多个时弹出选择框
     * 2、选择模块后，根据不同的交换类型，调用不同的接口
     * 3、调用接口后会返回原业务表单的pk，跳转到该表单
     ***/
    function doAccept() {
      let opts = {
        mode: VueData.formData.main["C-R-RCV-0088"].value,
        backFileId: VueData.formData.main["C-R-RCV-0056"].value,
        isfeedback: VueData.formData.main["C-R-RCV-0041"].value,
        moduleId: VueData.moduleId,
        isOpenForm: isOpenForm,
      };
      let loadIndex = dsf.layer.loading();
      let pk = VueData.pk;
      dsf.http
        .post("ctrl/remoteExchangeData/getReceiveTarget", {
          rcvRecordId: VueData.pk,
        })
        .then((res) => {
          dsf.layer.closeLoading(loadIndex);
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
                  let targetData = idArr[0];
                  accept(
                    pk,
                    targetData.id,
                    targetData.targetModuleId,
                    opts,
                    targetData.ruleId
                  );
                })
                .catch(() => {
                  dsf.layer.toast("请选择要转换的目标模块");
                });
            } else {
              if (res.data.data && res.data.data.length > 0) {
                let targetData = res.data.data[0];
                // bug93825 添加参数后面openForm 需要这参数做标识 by:三七 20220418
                opts.convertId = targetData.id; //类别转换id
                opts.ruleId = targetData.ruleId; //规则id
                opts.exchangeDocType = targetData.exchangeDocType;
                accept(
                  pk,
                  targetData.id,
                  targetData.targetModuleId,
                  opts,
                  targetData.ruleId
                );
              } else {
                dsf.layer.toast("签收模块未配置");
              }
            }
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    }
    function accept(pk, convertId, targetModuleId, opts, ruleId) {
      opts = opts || {};
      let systemExchangeVendor = VueData.formData.main["C-R-RCV-0088"].value;
      if (systemExchangeVendor == "3") {
        // 类别转换
        convert({
          convertId: convertId,
          srcInfo: pk,
        }).then((res) => {
          if (res.data.code != 200) {
            dsf.layer.toast(res.data.message);
            return;
          } else {
            const { data } = res.data;
            acceptCallback(pk, data.pk, data.moduleId, data.moduleName, opts);
          }
        });
      } else {
        let url = "";
        let data = null;
        if (systemExchangeVendor == "5") {
          //新内部签收
          url = "ctrl/localInsideController/accept";
          data = {
            pk: pk,
            convertId: convertId,
            targetModuleId: targetModuleId,
            moduleId: opts.moduleId,
          };
        } else if (systemExchangeVendor == "6" || opts.mode == "6") {
          // 目前都走这个接口
          //交换中心统一接口
          url = "ctrl/exRemoteInterfaceController/acceptDoc";
          data = {
            pk: pk,
            convertId: convertId,
            targetModuleId: targetModuleId,
            isConvertToDo:
              opts.isConvertToDo == undefined ? "" : opts.isConvertToDo,
            moduleId: opts.moduleId,
            ruleId: ruleId,
          };
        } else {
          url = "ctrl/remoteExchange/acceptByRule";
          data = {
            pk: pk,
            convertId: convertId,
            targetModuleId: targetModuleId,
            isConvertToDo:
              opts.isConvertToDo === undefined ? false : opts.isConvertToDo,
            doSign: opts.doSign === undefined ? true : opts.doSign,
            ruleId: ruleId,
          };
        }
        let loadIndex = dsf.layer.loading();
        dsf.http
          .post(url, data)
          .then((res) => {
            dsf.layer.closeLoading(loadIndex);
            if (res.data.type == "success" && res.data.data) {
              let dt = res.data.data;
              let targetPk = dt.pk;
              let targetModuleName = dt.moduleName;
              onFinishAcceptCallback(
                targetPk,
                targetModuleId,
                targetModuleName,
                opts
              );
            } else {
              dsf.layer.toast(res.data.message);
            }
          })
          .catch((error) => {
            dsf.layer.toast("请求失败");
          });
      }
    }
    function acceptCallback(
      pk,
      targetPk,
      targetModuleId,
      targetModuleName,
      opts
    ) {
      let systemExchangeVendor = VueData.formData.main["C-R-RCV-0088"].value;
      opts = opts || {};
      let data = {
        sourcePk: pk,
        targetPk: targetPk,
        targetModuleId: targetModuleId,
        isConvertToDo:
          opts.isConvertToDo === undefined ? false : opts.isConvertToDo,
        doSign: opts.doSign === undefined ? true : opts.doSign,
      };
      let acceptCallbackUrl = "ctrl/remoteExchange/acceptCallback";
      //公司内部
      if (systemExchangeVendor == "3") {
        acceptCallbackUrl = "ctrl/hardDiskExchange/acceptCallback";
      }
      dsf.http.post(acceptCallbackUrl, data).then((res) => {
        if (res.data.type == "success") {
          onFinishAcceptCallback(
            targetPk,
            targetModuleId,
            targetModuleName,
            opts
          );
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
    }
    function onFinishAcceptCallback(
      targetPk,
      targetModuleId,
      moduleName,
      opts
    ) {
      if (opts.isOpenForm) {
        dsf.layer.toast("签收成功", "success", () => {
          openForm(targetPk, targetModuleId, moduleName, opts)
        });
        // 签收成功先不做跳转表单功能
        // VueData.$eventBus.refresh(VueData)
        // openForm(targetPk, targetModuleId, moduleName, opts)
        // VueData.$router.replace(`/commonForm/${targetModuleId}/${targetPk}`)
      } else {
        dsf.layer.toast("签收成功", "success", () => {
          VueData.backSucces();
        });
      }
    }
    async function getJointFeedbackFormUrl(pk, moduleId, isJoint, relaId, isFeedback) {
      let strEdit = "";
      let url = "/commonForm/";
      if (isJoint == "2" && relaId) { //联合会签
        if (isFeedback) { //会签回执
          url += `200903105015ZPCUsVIG564HqIlyu16/${relaId}` + "?listId=ExchangeToDoList&method=jointFeedback&validateByList=1&rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback + strEdit;
        } else {
          url += `201229211221GAua7d9c37nlHDE9pu8/${relaId}` + "?listId=ExchangeToDoList&method=joint&validateByList=1&rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback;
        }
      } else if (isJoint == "3" && relaId) { //联合盖章
        if (isFeedback) { //盖章回执
          url += `200903105015ZPCUsVIG564HqIlyu16/${relaId}` + "?listId=ExchangeToDoList&method=sealFeedback&validateByList=1&rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback + strEdit;
        } else {
          url += `201229211221GAua7d9c37nlHDE9pu8/${relaId}` + "?listId=ExchangeToDoList&method=seal&validateByList=1&rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback;
        }
      } else {
        if (isFeedback && relaId) {
          url += `200903105015ZPCUsVIG564HqIlyu16/${relaId}` + "?listId=ExchangeToDoList&method=normalFeedback&validateByList=1&rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback;
        } else {
          if (relaId) {
            let data = {
              pk: relaId
            };
            let infoUrl = "ctrl/remoteExchangeData/getInfo";
            await dsf.http.post(infoUrl, { data }).then(function (result) {
              if (result.data.data && result.data.data.moduleId) {
                url += `${result.data.data.moduleId}/${relaId}` + "?rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback + "&listId=ExchangeToDoList&method=normalRela&validateByList=1";
              } else {
                url += `${moduleId}/${relaId}` + "?rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback + "&listId=ExchangeToDoList&method=normal&validateByList=1";
              }
            });
          } else {
            url += "pk=" + pk + "&moduleId=" + moduleId + "&rcvRecordId=" + pk + "&isJoint=" + isJoint + "&isFeedback=" + isFeedback + "&listId=ExchangeToDoList&method=normal&validateByList=1";
          }
        }
      }
      return url;
    }
    function openForm(pk, moduleId, moduleName, opts) {
      let url = `/commonForm/${moduleId}/${pk}`;
      if (opts.mode == 6) {//统一接口
        let backFileId = opts.backFileId;
        let isfeedback = opts.isfeedback;
        if (isfeedback != null && (isfeedback == 1 || isfeedback == 2)) {
          url += "?reloadParentFormOnSave=true&listId=ExchangeRecvList&method=view&validateByList=1";
        } else if (backFileId != null && backFileId != "") {
          url += "?reloadParentFormOnSave=true&listId=ExchangeRecvList&method=view&validateByList=1";
        }
      } else {
        if (opts && opts.extParams && (opts.extParams.isJoint == 2 || opts.extParams.isJoint == 3) ||
          (VueData.$router.query.isJoint == 2 || VueData.$router.query.isJoint == 3)) {
          let ext = opts ? opts.extParams || {} : {};
          let isJoint = "";
          let relaId = "";
          let isFeedback = "";
          let allowFeedback = "";
          let signStatus = "";
          if (ext.isJoint == 2 || ext.isJoint == 3) {
            isJoint = ext.isJoint;
            relaId = ext.relaId || pk;
            isFeedback = ext.isFeedback;
            signStatus = 1;
            allowFeedback = ext.allowFeedback;
          } else {
            isJoint = VueData.$router.query.isJoint ? VueData.$router.query.isJoint : "";
            relaId = pk;
            isFeedback = VueData.$router.query.isFeedback == "true" ? true : false;
            signStatus = 1;
            allowFeedback = VueData.$router.query.allowFeedback ? VueData.$router.query.allowFeedback : "";
          }
          url = getJointFeedbackFormUrl(pk, moduleId, isJoint, relaId, isFeedback);
          url += "&handleMark=" + VueData.$router.query.handleMark ? VueData.$router.query.handleMark : ""
            + "&fromList=ExchangeToDoList&signStatus=" + signStatus + "&allowFeedback=" + allowFeedback;
        } else {
          url += "?reloadParentFormOnSave=true&listId=ExchangeRecvList&method=view&validateByList=1";
        }
      }
      console.log(url);
      if (VueData.nowButtonParameters.closePage == 1) {
        url = url + (url.includes("?") ? "&" : "?") + "closePage=1"
      }
      VueData.$router.replace({ path: url })
    }
    this.save(routerParam, metaData, formData, VueData, refs, doAccept);
  },
  exchangeSendBack(routerParam, metaData, formData, VueData, refs) {
    // 公文交换退回
    dsf.http
      .post("ctrl/remoteExchange/checkCanReject", {
        pk: VueData.formParams.pk,
        moduleId: VueData.formParams.moduleId,
        level: 3,
      })
      .then((res) => {
        if (res.data.type === "success") {
          VueData.componentName = "exchangeSendBack";
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  "RemoteDocExchange.acceptByButtonParam"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    // 是否打开签收后的表单：值：1、-1
    let isOpenForm = VueData.nowButtonParameters.isOpenForm == -1 ? false : true
    this.exchangeAccept(
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      null,
      isOpenForm
    );
  },
  "RemoteDocExchange.commonSend"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    // 公文交换-远程发送
    let {
      vendor,
      exchangeModeId,
      allowFeedback,
      isJoint,
      docType,
      singleSendRecord,
      sendLevel,
      selectAttvalue,
      desc,
      sendAs,
      initDataMeta,
      repetition,
      selectFileRelationValue,
      sendType,
      templateId,
      checkFileRequired,
      otherParameters,
    } = VueData.nowButtonParameters;
    let exchangeDocType = docType;
    function parseComplexConfig(config) {
      let extPattern = {};
      if (config.indexOf("[") > -1) {
        let patterns = config.match(/\[[^\[]*\]/g);
        for (let i = 0; patterns && i < patterns.length; i++) {
          let pt = patterns[i];
          if (pt) {
            pt = pt.substring(1, pt.length - 1); //去掉中括号
            let sps = pt.split("=");
            if (sps && sps.length == 2) {
              let v = sps[1];
              if (sps[1] === "true") {
                v = true;
              } else if (sps[1] === "false") {
                v = false;
              }
              extPattern[sps[0]] = v;
            }
          }
        }
        console.log(JSON.stringify(extPattern));
        config = config.substring(0, config.indexOf("["));
      }
      return { pattern: extPattern, config: config };
    }
    function processAllowFeedback(optAllow) {
      let allowFeedback;
      let formFeedback = formData.main["B0054"]?.value;
      if (!optAllow && formFeedback) {
        allowFeedback = formFeedback;
      } else {
        if (optAllow) {
          let splitFB = optAllow.split(":");
          if (splitFB.length >= 2 && splitFB[0]) {
            let allowMeta = splitFB[0];
            let allowValues = (splitFB.length >= 2 ? splitFB[1] : "1") || "";
            let allowMetaValue = formData.main[allowMeta]?.value;
            let values = allowValues.split(",");
            for (let i = 0; i < values.length; i++) {
              if (allowMetaValue == values[i]) {
                allowFeedback = 1;
                break;
              }
            }
          } else {
            allowFeedback = optAllow;
          }
        }
      }
      if (allowFeedback === undefined) {
        allowFeedback = -1;
      }
      return allowFeedback;
    }
    function processRepetitionData(repetitionData, opts, pk) {
      //
      let sendType = "";
      if (opts.remoteSendPaper && opts.remoteSendPaper == "convert") {
        sendType = opts.remoteSendPaper;
      }
      if (pk !== "") {
        let mapUrl = "ctrl/remoteExchangeData/getLastSendDetail";
        dsf.http
          .post(mapUrl, { pk: pk, sendType: sendType, convertId: opts.convertId })
          .then((result) => {
            if (result.data) {
              if ("success" == result.data.type) {
                repetitionData.ids = result.data.data.ids || "";
                repetitionData.text = result.data.data.names || "";
                repetitionData.dyfs = result.data.data.dyfs || "";
                repetitionData.dyfh = result.data.data.dyfh || "";
                if (result.data.data.isFeedback) {
                  opts.allowFeedback = result.data.data.isFeedback;
                }
                opts.repetitionData = repetitionData;
              } else {
                let msg = "获取发送单位";
                console.error(msg);
                dsf.layer.toast(result.data.message);
              }
            } else {
              let msg = "获取发送单位";
              console.error(msg);
              dsf.layer.toast(msg);
            }
          });
      }
    }
    async function getSendRule() {
      let parsedConfig = parseComplexConfig(vendor);
      let extPattern = parsedConfig.pattern;
      vendor = parsedConfig.config;
      let parsedJoint = parseComplexConfig(isJoint);
      let jointPattern = parsedJoint.pattern;
      isJoint = parsedJoint.config;
      if (jointPattern.text) {
        extPattern.isJointText = jointPattern.text;
      }
      let flat = undefined;
      if (sendLevel) {
        let sendLevels = sendLevel.split(";");
        sendLevel = sendLevels[0];
        if (sendLevels.length > 1) {
          flat = sendLevels[1];
        }
      }
      if (vendor == 6) {
        if (sendLevel == null || sendLevel == "") {
          let xwfx = formData.main["C-GW-FW-0202"]?.value; //行文方向
          if (xwfx == "1") {
            //上行文
            sendLevel = "superiorOfficialsend";
          } else if (xwfx == "2") {
            //平行文
            sendLevel = "sidewaysOfficialsend";
          } else if (xwfx == "3") {
            //下行文
            sendLevel = "lowerOfficialsend";
          }
        }
        if (!sendType || !sendLevel) {
          let moduleId = VueData.moduleId || formData.main["A0004"]?.value;
          await dsf.http
            .post("fn/remoteExchangeData/getSendRule", {
              moduleId: moduleId,
              exchangeModeId: exchangeModeId,
              exchangeDocType: exchangeDocType,
            })
            .then((res) => {
              if (res.data.data) {
                if (!sendLevel) {
                  sendLevel = res.data.data.sendRangeName;
                }
                if (!sendType) {
                  sendType =
                    res.data.data.businessType +
                    "," +
                    res.data.data.businessTypeText +
                    ";11," +
                    res.data.data.receiveType;
                }
              } else {
                dsf.layer.toast(res.data.message);
                return;
              }
            });
        }
        if (sendLevel == null || sendLevel == "") {
          dsf.layer.toast("发送范围层级未填写，请联系管理员!");
          return;
        }
      }
      let opts = {
        vendor: vendor,
        exchangeModeId: exchangeModeId,
        allowFeedback: allowFeedback,
        isJoint: isJoint,
        exchangeDocType: exchangeDocType,
        singleSendRecord: singleSendRecord,
        sendLevel: sendLevel,
        selectAttvalue: selectAttvalue,
        selectFileRelationValue: selectFileRelationValue,
        desc: desc || "",
        sendAs: sendAs || "",
        initDataMeta: initDataMeta || "",
        repetition: repetition || 0,
        templateId: templateId,
        flat: 0, // 树模式
        checkFileRequired: checkFileRequired,
        //isDocumentPaper:(isDocumentPaper||"")//为1时代表稿纸模式
      };

      //发送类型
      if (sendType) {
        let sendTypes = sendType.split(";");
        if (sendTypes.length > 1) {
          let typec = sendTypes[0].split(",");
          if (typec.length > 1) {
            opts.typeclass = typec[0];
            opts.typeclassName = typec[1];
          } else {
            dsf.layer.toast("发送类型配置不正确，请联系管理员!");
            return;
          }
          typec = sendTypes[1].split(",");
          if (typec.length > 1) {
            opts.typemethod = typec[0];
            opts.typemethodname = typec[1];
          } else {
            dsf.layer.toast("发送类型方法配置不正确，请联系管理员!");
            return;
          }
        } else {
          dsf.layer.toast("发送类型配置不正确，请联系管理员!");
          return;
        }
      }
      $.extend(opts, extPattern);
      doCommonSend(opts);
    }
    function doCommonSend(opts) {
      let isJoint = opts.isJoint;
      let exchangeDocType = opts.exchangeDocType;
      let singleSendRecord =
        opts.singleSendRecord === undefined ? -1 : opts.singleSendRecord;

      let allowFeedback = processAllowFeedback(opts.allowFeedback); //根据按钮配置得是否需要反馈来确定当前状态是否需要反馈

      if (isJoint === undefined) {
        isJoint = -1;
      }
      exchangeDocType = exchangeDocType || "";

      let pk = opts.pk || VueData.formMeta.parameters.pk;
      let moduleId = opts.moduleId || VueData.moduleId;

      $.extend(opts, {
        allowFeedback: allowFeedback,
        isJoint: isJoint,
        exchangeDocType: exchangeDocType,
        singleSendRecord: singleSendRecord,
      });
      //重发自动带出的单位
      let repetitionData = {
        ids: "",
        text: "",
        dyfs: "",
        dyfh: "",
      };
      //添加已发送的单位,opts.repetition是否回显已发送单位
      if (opts.repetition && (opts.repetition === "1" || opts.repetition === 1)) {
        processRepetitionData(repetitionData, opts, pk);
      }
      switch (opts.vendor) {
        case "1":
          // 内部公文交换
          $.extend(opts, {
            sendurl: "fn/dreamExView/getTargetOrganizeList",
          });
          // RemoteDocExchange.DreamEx.send(pk, moduleId, opts);
          console.log("暂不支持");
          break;
        case "2":
          $.extend(opts, {
            sendurl:
              "fn/localExchangeView/getOrganizeList?isRemote=-1&filterByDomain=1&id=" +
              pk +
              "&level=" +
              opts.sendLevel,
          });
          // RemoteDocExchange.Local.send(pk, moduleId, opts);
          console.log("暂不支持");
          break;
        case "5":
          $.extend(opts, {
            sendurl:
              "fn/localExchangeView/getOrganizeList?isRemote=-1&filterByDomain=1&id=" +
              pk +
              "&level=" +
              opts.sendLevel,
          });
          // RemoteDocExchange.Local.send(pk, moduleId, opts);
          console.log("暂不支持");
          break;
        case "3":
          $.extend(opts, {
            sendurl:
              "fn/localExchangeView/selOrganizeList?sendOrgid=" +
              opts.sendOrgid +
              "&level=" +
              opts.sendLevel +
              "&sendAs=" +
              opts.sendAs,
          });
          // RemoteDocExchange.Local.send(pk, moduleId, opts);
          console.log("暂不支持");
          break;
        case "4":
          $.extend(opts, {
            sendurl:
              "fn/exchangeCenterCaller/getSendRange?level=" + opts.sendLevel,
          });
          debugger;
          ExCenterDoLocalSend(pk, moduleId, opts);
          break;
        case "6":
          $.extend(opts, {
            sendurl:
              "fn/exRemoteInterfaceController/selSendRange?infotype=" +
              opts.sendLevel,
          });
          debugger;
          ExCenterDoLocalSend(pk, moduleId, opts);
          break;
        default:
          dsf.layer.toast("undefined vendor=" + opts.vendor);
          break;
      }
      async function ExCenterDoLocalSend(pk, moduleId, params) {
        //校验多文件类型是否已上传
        if (params.checkFileRequired) {
          await dsf.http
            .post("ctrl/remoteExchangeData/checkFileRequired", {
              pk: pk,
              fileTypes: params.checkFileRequired,
            })
            .then((res) => {
              if ("success" == res.data.type) {
              } else {
                dsf.layer.toast(res.data.message);
                return;
              }
            });
        }
        if (params.isJoint == "2" || params.isJoint == "3") {
          dsf.http
            .post("ctrl/remoteExchangeData/getSendRecord", {
              remoteId: pk,
              isJoint: params.isJoint,
            })
            .then((result) => {
              if ("success" == result.data.type || result.data.code == "404") {
                let dt = result.data.data;
                if (params.isJoint == "2") {
                  //联合会签
                  if (result.data.data && result.data.data.sendRecordId) {
                    dsf.layer.confirm(
                      {
                        title: "提示",
                        message: "是否发起新一轮会签",
                      },
                      () => {
                        doExCenterSendSelect(pk, moduleId, params);
                      }
                    );
                  } else {
                    doExCenterSendSelect(pk, moduleId, params);
                  }
                } else {
                  //联合盖章
                  //点击联合盖章按钮，校验是否会签完毕，如有未会签的文件则提醒‘请会签完之后进行盖章’，未会签完的文件禁止进行盖章。（只提醒）
                  if (dt && dt.join && dt.join.partFeedback) {
                    dsf.layer.confirm(
                      {
                        title: "提示",
                        message: "请会签完之后进行盖章",
                        showCancelButton: true,
                      },
                      () => {
                        jointSeal(dt, params, pk, moduleId, result.data);
                      }
                    );
                  } else {
                    jointSeal(dt, params, pk, moduleId, result.data);
                  }
                }
              } else {
                console.log(result.data.message);
                dsf.layer.toast(result.data.message);
              }
            });
        } else {
          doExCenterSendSelect(pk, moduleId, params);
        }
      }
      function jointSeal(dt, params, pk, moduleId, result) {
        if (dt && dt.sendRecordId) {
          VueData.$refs.ckDialog
            .show(
              [
                { id: 1, name: "增加盖章单位" },
                { id: 2, name: "重新盖章" },
                { id: 3, name: "发起新一轮盖章" },
              ],
              "请选择操作类型",
              "id",
              "name",
              [],
              false
            )
            .then((idArr) => {
              let type = idArr[0];
              if (type == 1) {
                //增加盖章单位
                if (result.data.allSealed) {
                  dsf.layer.toast("盖章已完成，不能增加盖章单位。");
                  return;
                }
                params.sealType = "add";
                params.sendRecordId = result.data.sendRecordId;
                params.mode = params.vendor;
                doExCenterExsend(pk, params.sendRecordId, params);
              } else if (type == 2) {
                //重新盖章
                dsf.http
                  .post("ctrl/exchangeCenterOperation/findReSealData", {
                    //查询已盖章的文件
                    sendRecordId: result.data.sendRecordId,
                  })
                  .then((sealData) => {
                    params.sealType = "reseal";
                    //params.sendRecordId = result.data.sendRecordId; //不传，发起新的一轮盖章
                    if (sealData.data.type == "success") {
                      if (sealData.data.data && sealData.data.data.seal) {
                        confirmReseal(
                          pk,
                          moduleId,
                          params,
                          sealData.data.data.seal,
                          sealData.data.data.all
                        );
                      } else {
                        dsf.layer.toast("未找到盖章数据");
                      }
                    } else {
                      dsf.layer.toast(sealData.data.message);
                    }
                  });
              } else {
                //发起新一轮盖章
                params.sealType = "new";
                doExCenterSendSelect(pk, moduleId, params);
              }
            });
        } else {
          params.sealType = "normal";
          doExCenterSendSelect(pk, moduleId, params);
        }
      }
      function confirmReseal(pk, moduleId, params, arr, allArr) {
        VueData.$refs.ckDialog
          .show(arr, "请选择盖章基准文件", "id", "title", [], false)
          .then((idArr) => {
            let resealId = idArr[0].id;
            params.mergeDocId = resealId;

            let excludeArr = [];
            if (resealId) {
              let checkIdx = arr.findIndex((item) => item.id == resealId);
              arr.forEach((item, idx) => {
                let unitId = item.swdwId;
                if (idx <= checkIdx) {
                  if (item.id != "-1") {
                    excludeArr.push(unitId);
                  }
                }
              });
            }
            let excludeUnits = excludeArr.join(",");

            let sendUnits = [];
            let sendUnitNames = [];
            for (let i = 0; allArr && i < allArr.length; i++) {
              let item = allArr[i];
              if (excludeArr.indexOf(item.swdwId) === -1) {
                sendUnits.push(item.swdwId);
                sendUnitNames.push(item.swdwName);
              }
            }
            params.sendUnits = sendUnits.join(",");
            params.sendUnitNames = sendUnitNames.join(",");
            params.sendurl =
              "fn/exchangeCenterCaller/getOneSendRange?pk=" +
              pk +
              "&level=" +
              params.sendLevel +
              "&filterByExclude=true&excludeUnits=" +
              excludeUnits;
            doExCenterSendSelect(pk, moduleId, params);
          });
      }
      async function doExCenterExsend(pk, recordId, params) {
        if (params.isJoint == 3 || params.isJoint == 5) {
          await dsf.http
            .post("ctrl/remoteExchangeData/getSendRecord", {
              remoteId: pk,
              isJoint: params.isJoint,
            })
            .then((result) => {
              if ("success" == result.data.type) {
                if (result.data.data.allSealed) {
                  dsf.layer.toast("盖章已完成，不能增加盖章单位。");
                  return;
                }

                params.pk = params.sourceId;
                pk = params.sourceId;
                params.sealType = "add";
                params.sendRecordId = recordId;
                if (params.mode == "6") {
                  params.sendurl =
                    "fn/exRemoteInterfaceController/selOneSendRange?pk=" +
                    pk +
                    "&infotype=" +
                    params.sendLevel +
                    "&recordId=" +
                    params.sendRecordId;
                } else {
                  params.sendurl =
                    "fn/exchangeCenterCaller/getOneSendRange?pk=" +
                    pk +
                    "&level=" +
                    params.sendLevel +
                    "&recordId=" +
                    params.sendRecordId;
                }
                doExCenterSendSelect(pk, params.moduleId, params);
              } else {
                console.error(result.data);
              }
            });
          return;
        }
        let url =
          "fn/exchangeCenterCaller/getOneSendRange?pk=" +
          pk +
          "&level=" +
          params.sendlevel +
          "&recordId=" +
          recordId +
          "&flat=" +
          params.flat;
        if (params.mode == "6") {
          url =
            "fn/exRemoteInterfaceController/selOneSendRange?pk=" +
            pk +
            "&infotype=" +
            params.sendlevel +
            "&recordId=" +
            recordId +
            "&flat=" +
            params.flat;
        }

        VueData.componentName = "ExCenterSend";
        // VueData.dataValue = dataValue;
        VueData.selectType = 1;
        // let orgType = VueData.nowButtonParameters.orgType;
        VueData.extra = {
          multiple: true,
          tabs: [
            {
              action: url,
              name: "选择机构",
              subTabKey: "department",
              params: params,
            },
          ],
        };
      }
      function doExCenterSendSelect(pk, moduleId, params) {
        debugger;
        let modeId = params.exchangeModeId || "";
        let selectAttvalue = params.selectAttvalue || "";
        let selectFileRelationValue = params.selectFileRelationValue || "";
        let isJoint = params.isJoint || "";
        let desc = params.desc;

        let jointExch = {};
        if (isJoint == "2" || isJoint == "3") {
          if (params.sealType != "add") {
            jointExch = formData.main["C-FW-0035"] || {}; //联合发文单位
          }
        }

        let initData = {
          ids: jointExch.value || "",
          text: jointExch.text || "",
        };

        if (params.sendUnits) {
          if (initData.ids) {
            initData.ids += ",";
          }
          initData.ids += params.sendUnits || "";
        }
        if (params.sendUnitNames) {
          if (initData.text) {
            initData.text += ",";
          }
          initData.text += params.sendUnitNames || "";
        }
        if (params.initDataMeta) {
          processInitDataMeta(initData, params);
        }
        if (
          params.sendByTargets ||
          (params.remoteSendPaper && params.remoteSendPaper != "convert")
        ) {
          //params.remoteSendPaper : 专用纸--发送模式
          let targetInfo = "";
          if (params.remoteSendPaper) {
            //专用纸--发送模式
            console.log(params.remoteSendPaper);
            targetInfo = formData.main[params.remoteSendPaper]?.value || "";
          } else {
            let targets = [];
            let valueSplit;
            let textSplit;
            let targetMetaId = params.targetMetaId;
            if (targetMetaId) {
              let targetMeta = formData.main[targetMetaId];
              if (!targetMeta) {
                dsf.layer.toast("发送目标单位元数据为空");
                return;
              }
              valueSplit = formData.main[targetMetaId].value.split(",");
              textSplit = formData.main[targetMetaId].text.split(",");
            } else {
              valueSplit = params.targetIds.split(",");
              textSplit = params.targetNames.split(",");
            }
            for (let i = 0; i < valueSplit.length; i++) {
              let obj = {
                id: valueSplit[i],
                name: textSplit[i],
              };
              targets.push(obj);
            }
            targetInfo = JSON.stringify(targets);
          }
          if (!targetInfo) {
            console.log("发送目标单位为空");
            dsf.layer.toast("发送目标单位为空");
            return;
          }
          params.selectedAttachments = ""; //全选
          params.pk = pk;
          params.moduleId = moduleId;
          params.sourceId = formData.main["A0003"].value;

          // let extraPageNum = DSF.getURLParam("extraPageNum");
          // if (extraPageNum !== "") {
          //     params.extraPageNum = extraPageNum;
          // }
          params.reloadParent = true;
          // RemoteDocExchange.ExCenter.sendByTargets(targetInfo, params);
          console.log("暂不支持");
        } else {
          let url =
            params.sendurl +
            "&pk=" +
            pk +
            "&moduleId=" +
            moduleId +
            "&exchangeModeId=" +
            modeId +
            "&sendType=4&selectAttvalue=" +
            selectAttvalue +
            "&isJoint=" +
            isJoint +
            "&desc=" +
            encodeURIComponent(desc) +
            "&flat=" +
            params.flat +
            "&selectFileRelationValue=" +
            selectFileRelationValue;
          if (params.colseCopyPageDowm) {
            url += "&colseCopyPageDowm=" + params.colseCopyPageDowm;
          }
          if (params.templateId) {
            url += "&templateId=" + params.templateId;
          }
          VueData.componentName = "ExCenterSend";
          // VueData.dataValue = dataValue;
          VueData.selectType = 1;
          // let orgType = VueData.nowButtonParameters.orgType;
          VueData.extra = {
            multiple: true,
            tabs: [
              {
                action: url,
                name: "选择机构",
                subTabKey: "department",
                params: params,
              },
            ],
          };
        }
      }
    }
    this.save(routerParam, metaData, formData, VueData, refs, getSendRule);
  },
  "DSF.Meeting.Action.meetingChange"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    dsf.http
      .post("ctrl/meetingChange/convert", {
        masterId: VueData.formData.main["B0035"].value,
      })
      .then((res) => {
        if (res.data.code == 200) {
          let query = {
            initDataSource: 1,
            fid: VueData.formData.main["B0035"].value,
            pk: res.data.data.pk,
            source: res.data.data.source,
          };
          if (res.data.data.showNodeId) {
            Object.assign(query, {
              showNodeId: res.data.data.showNodeId,
              listId: "MeetingList",
              method: "customNode",
            });
          }

          if (res.data.data.hyTodo && res.data.data.hyTodo == '1') {
            dsf.layer.toast("操作成功", true, () => VueData.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: query,
            }));
          } else {
            VueData.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: query,
            });
          }
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  /**
   * 转换为退文单 (收文)
   * @param ruleId
   */
  "RemoteDocExchange.doSW2SendBackDoc"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    let pk = VueData.pk;
    let exchangeMode = VueData.nowButtonParameters.exchangeMode;
    let ruleId = VueData.nowButtonParameters.ruleId;
    let subExchangeDocType = VueData.nowButtonParameters.subExchangeDocType;
    let srcType = VueData.nowButtonParameters.srcType;
    let opts = {};
    if (exchangeMode == "6") {
      opts.sourceId = formData.main["A0003"].value;
      opts.exchangeModeId = exchangeMode;
    }
    doSendBackDocImpl(
      pk,
      "receivedDoc",
      ruleId,
      subExchangeDocType,
      srcType,
      opts
    );
    function doSendBackDocImpl(
      pk,
      type,
      ruleId,
      subExchangeDocType,
      srcType,
      opts
    ) {
      let data = {
        type: type,
        pk: pk,
        ruleId: ruleId,
        subExchangeDocType: subExchangeDocType || "",
      };
      Object.assign(data, opts);
      dsf.layer.loading();
      dsf.http
        .post("ctrl/remoteExchangeData/getSendBackDoc", data)
        .then((res) => {
          dsf.layer.clear();
          if (res.data.type === "success" && res.data.data) {
            let rcvRecordId = res.data.data.rcvRecordId;
            let backData = res.data.data.backData;
            if (backData && backData.pk && backData.moduleId) {
              let targetPk = backData.pk;
              let targetModuleId = backData.moduleId;
              VueData.$router.replace(
                `/commonForm/${targetModuleId}/${targetPk}?reloadParentFormOnSave=true&rcvRecordId=${rcvRecordId}&srcType=${srcType}`
              );
            } else {
              let sConvertId = res.data.data.convert.id;
              convert({
                convertId: sConvertId,
                srcInfo: pk,
              }).then((result) => {
                if ("success" == result.data.type) {
                  let targetPk = result.data.data.pk;
                  let targetModuleId = result.data.data.moduleId;
                  VueData.$router.replace(
                    `/commonForm/${targetModuleId}/${targetPk}?reloadParentFormOnSave=true&rcvRecordId=${rcvRecordId}&srcType=${srcType}`
                  );
                } else {
                  dsf.layer.toast(result.data.message);
                }
              });
            }
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    }
  },
  "RemoteDocExchange.sendBackDoc"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    let isSendToEnd = VueData.nowButtonParameters.isSendToEnd;
    let isCreateTodo = VueData.nowButtonParameters.isCreateTodo;
    let sendType = VueData.nowButtonParameters.sendType;
    let exchangeDocType = VueData.nowButtonParameters.exchangeDocType;
    let exchangeModeId = VueData.nowButtonParameters.exchangeModeId;
    let opts = {
      exchangeDocType: exchangeDocType,
      exchangeModeId: exchangeModeId,
    };

    this.save(routerParam, metaData, formData, VueData, refs, sendBackDocImpl);
    function sendBackDocImpl() {
      let pk = VueData.pk;
      let moduleId = VueData.moduleId;
      let rcvRecordId = VueData.$route.query.rcvRecordId;

      let data = {
        pk: pk,
        moduleId: moduleId,
        rcvRecordId: rcvRecordId,
        isSendToEnd: isSendToEnd,
        isCreateTodo: isCreateTodo,
      };
      Object.assign(data, opts);
      dsf.layer.loading();

      let url = "ctrl/remoteExchange/sendBackDoc";
      if (sendType == "5") {
        url = "ctrl/localInsideController/sendBackDoc";
      } else if (sendType == "6") {
        //交换中心统一接口地址
        url = "ctrl/exRemoteInterfaceController/sendBackDoc";
      }
      dsf.http.post(url, data).then((result) => {
        dsf.layer.clear();
        if (result.data.type === "success") {
          VueData.backSucces();
        } else {
          dsf.layer.toast(result.data.message);
        }
      });
    }
  },
  // 秘书 领导待办 送领导
  "xform.inboxToLeader"(routerParam, metaData, formData, VueData, refs) {
    dsf.layer.loading();
    dsf.http
      .post("fn/flow/updateInboxSecretaryStatus", {
        pnId: metaData.parameters.pnId,
        status: 2,
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200) {
          dsf.layer.toast("发送成功", "success", () => {
            VueData.removeLocalOptions();
            VueData.backSucces();
          });
        }
      });
  },
  // 秘书 领导待办 替领导办
  "xform.inboxForwardSkipLeader"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    if (VueData.$route.query.status == 3 || metaData.parameters.secretaryProcessStatus == 3) {
      VueData.isShowWriteOpintionBtn = true;
      VueData.alreadyWriteOpintion = true;
    }
    this.send(
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      null,
      {
        determineUser: VueData.$route.query.leaderId,
      },
      VueData.nowButtonParameters
    );
  },
  // 秘书 领导待办 退给经办人
  "xform.inboxBackwardSkipLeader"(
    routerParam,
    metaData,
    formData,
    VueData,
    refs
  ) {
    if (VueData.$route.query.status == 3 || metaData.parameters.secretaryProcessStatus == 3) {
      VueData.isShowWriteOpintionBtn = true;
      VueData.alreadyWriteOpintion = true;
    }
    this.send(
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      null,
      {
        determineUser: VueData.$route.query.leaderId,
        direction: -1,
        disableAutoSend: -2,
      },
      VueData.nowButtonParameters
    );
  },
  // 秘书 领导待办 回秘书
  "xform.inboxToSecretary"(routerParam, metaData, formData, VueData, refs) {
    function inboxToSecretary() {
      dsf.layer.loading();
      dsf.http
        .post("fn/flow/updateInboxSecretaryStatus", {
          pnId: metaData.parameters.pnId,
          status: 3,
        })
        .then((res) => {
          dsf.layer.clear();
          if (res.data.code == 200) {
            dsf.layer.toast("发送成功", "success", () => {
              VueData.backSucces();
            });
          }
        });
    }
    this.save(
      routerParam,
      metaData,
      formData,
      VueData,
      refs,
      inboxToSecretary,
      true
    );
  },
  // 秘书 领导待阅 送领导
  "xform.shareToLeader"(routerParam, metaData, formData, VueData, refs) {
    dsf.layer.loading();
    dsf.http
      .post("ctrl/leaderShareRead/changeProcessMode", {
        distribIds: metaData.parameters.distribId,
        type: 2,
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200) {
          dsf.layer.toast("发送成功", "success", () => {
            VueData.backSucces();
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  // 秘书 领导待阅 确认
  "xform.shareLeaderConfirm"(routerParam, metaData, formData, VueData, refs) {
    dsf.layer.loading();
    dsf.http
      .post("ctrl/leaderShareRead/changeProcessMode", {
        distribIds: metaData.parameters.distribId,
        type: 4,
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200) {
          dsf.layer.toast("操作成功", "success", () => {
            VueData.backSucces();
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  // 阅件送机要秘书
  "xform.toJySec"(routerParam, metaData, formData, VueData, refs) {
    dsf.layer.loading();
    dsf.http
      .post("ctrl/instructionsInfo/toSec", {
        distribId: metaData.parameters.distribId,
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200) {
          dsf.layer.toast("操作成功", "success", () => {
            VueData.backSucces();
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  // 机要秘书转批示件
  "xform.secToPsj"(routerParam, metaData, formData, VueData, refs) {
    dsf.layer.loading();
    dsf.http
      .post("ctrl/instructionsInfo/secToPsj", {
        insId: VueData.$route.query.insId,
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200) {
          dsf.layer.toast("操作成功", "success", () => {
            VueData.backSucces();
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  // 机要秘书阅毕
  "xform.secReadEnd"(routerParam, metaData, formData, VueData, refs) {
    dsf.layer.loading();
    dsf.http
      .post("ctrl/instructionsInfo/secToPsj", {
        insId: VueData.$route.query.insId,
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200) {
          dsf.layer.toast("操作成功", "success", () => {
            VueData.backSucces();
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  // 一体化办公厅 阅件转批件
  readAndToInstruction(routerParam, metaData, formData, VueData, refs) {
    let nrId = VueData.allFile[0].document[0].id;
    let uploadFile = true;
    dsf.http
      .post("ctrl/p2433Common/readed", {
        pk: metaData.parameters.pk,
        moduleId: metaData.parameters.moduleId,
        nrId: nrId,
        uploadFile: uploadFile,
        isSecretary: true,
        distribId: VueData.$route.query.distribId,
      })
      .then((res) => {
        if (res.data.type == "success") {
          dsf.layer.toast("操作成功", "success", () => {
            VueData.backSucces();
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  },
  // im待办调起聊天
  async "DreamIM.createChatGroup"(routerParam, metaData, formData, VueData, refs) {
    let formPk = metaData.parameters.pk
    await new Promise((resolve, reject) => {
      dsf.http.get('fn/im/operation/getGroupInfo', {
        groupId: formPk,
        type: 'document'
      }).then(res => {
        if (res.data.type == "success" && res.data.data?.groupId) {
          let groupId = res.data.data.groupId;
          if (res.data.data.inGroup) {
            window.native && window.native.chatTo({
              "conversationType": "GROUP",
              "toId": groupId
            });
          } else {
            dsf.http.get('fn/im/operation/joinGroup', {
              groupId: groupId,
            }).then(response => {
              if ("success" === response.data.type) {
                window.native && window.native.chatTo({
                  "conversationType": "GROUP",
                  "toId": groupId
                });
              } else {
                dsf.layer.toast(response.data.message);
              }
            })
          }
        } else {
          resolve()
        }
      })
    })
    dsf.http
      .post("fn/im/operation/getChatUsersByDocument", { pk: formPk })
      .then(res => {
        if (res.data.type == "success" && res.data.data) {
          let users = res.data.data.users || []
          let options = {
            title: "选择联系人",
            data: {
              users: users,
              //不限制选择数
              isLimitCount: false,
              //最大选择数
              total: 9999,
            }
          }
          window.native &&
            window.native.showSelectUsers(options, function (selUsers) {
              console.log(selUsers)
              if (selUsers && selUsers.userIds) {
                let chatUsers = selUsers.userIds.join(",");
                let opts = {
                  groupId: formPk,
                  type: "document",
                  userIds: chatUsers
                }
                dsf.http.post('fn/im/operation/createChatGroup', opts).then(response => {
                  if ("success" === response.data.type && response.data.data) {
                    let groupId = response.data.data.groupId;
                    dsf.layer.toast("创建群成功");
                    window.native && window.native.chatTo({
                      "conversationType": "GROUP",
                      "toId": groupId
                    });
                  } else {
                    dsf.layer.toast(response.data.message);
                  }
                })
              }
            })
        }
      })
      .catch(err => {
        dsf.layer.toast("创建群聊失败")
      })
  },
  handwritSign(routerParam, metaData, formData, VueData, refs) {
    let formParameters = metaData.parameters;
    let hasPostposition = !!(
      formParameters.secretaryProcessMode == 2 ||
      formParameters.secretaryProcessMode == 3
    ); // 有后置秘书
    dsf.layer.loading();
    dsf.http
      .post(`ctrl/instructions/signedFile`, {
        id:
          formParameters.moduleId == "230716135502ednDlLWLSO8VsLwqzrC"
            ? formParameters.pnId
            : formParameters.pk,
        moduleId: formParameters.moduleId,
        nodeId: formParameters.nodeId,
        pnId: formParameters.pnId,
        needSignFile: 1,
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200 && res.data.data && res.data.data.fileId) {
          let data = res.data.data;
          let type = data.fileName.substr(data.fileName.lastIndexOf(".") + 1);
          let file = {
            id: data.fileId,
            title:
              type != "ofd" && type != "pdf"
                ? data.fileName.substr(0, data.fileName.lastIndexOf(".")) +
                ".pdf"
                : data.fileName,
            isHandleWrite: true,
            hasWenzi: false,
            uploadFileId: data.uploadFileId,
            fileType: data.fileType,
            openToPage: data.pagination || 0,
          };
          let formData = {
            info_id: formParameters.pk,
            moduleId: formParameters.moduleId,
            nodeId: formParameters.nodeId,
            nodeName: formParameters.nodeName,
            flowId: formParameters.flowId,
            pId: formParameters.pId,
            pnId: formParameters.pnId,
            type: "todo",
            canBack: false, // 无后置才可退回
          };
          dsf.shuke.shGovShuke(file, formData, (shukeRes) => {
            console.log(shukeRes);
            if (shukeRes.openTime) {
              dsf.http
                .post("/fn/approvalFileInformation/save", {
                  infoId: formParameters.pk,
                  fileId: data.uploadFileId,
                  startTime: moment(Number(shukeRes.openTime)).format(
                    "yyyy-MM-DD hh:mm:ss"
                  ),
                  endTime: moment(Number(shukeRes.closeTime)).format(
                    "yyyy-MM-DD hh:mm:ss"
                  ),
                  pagination: shukeRes.currentPage,
                  readingTime: Math.floor(
                    (shukeRes.closeTime - shukeRes.openTime) / 1000
                  ),
                })
                .then((res) => { });
              if (data.uploadFileId != data.fileId) {
                dsf.http
                  .post("/fn/approvalFileInformation/save", {
                    infoId: formParameters.pk,
                    fileId: data.fileId,
                    startTime: moment(Number(shukeRes.openTime)).format(
                      "yyyy-MM-DD hh:mm:ss"
                    ),
                    endTime: moment(Number(shukeRes.closeTime)).format(
                      "yyyy-MM-DD hh:mm:ss"
                    ),
                    pagination: shukeRes.currentPage,
                    readingTime: Math.floor(
                      (shukeRes.closeTime - shukeRes.openTime) / 1000
                    ),
                  })
                  .then((res) => { });
              }
            }
            if (shukeRes.type == "send") {
              VueData.alreadyWriteOpintion = true;
              VueData.isShowWriteOpintionBtn = true;
              if (hasPostposition) {
                VueData.handleActionClick("xform.inboxToSecretary");
              } else {
                VueData.handleActionClick("send");
              }
              // } else if (shukeRes.type == "close" || shukeRes.type == "back") {
              // VueData.backSucces()
            }
          });
        }
      })
      .catch((err) => {
        dsf.layer.toast("暂不支持手写签批");
      });
  },
  // 增加领导审核-领导加签
  addLeaderReview(routerParam, metaData, formData, VueData, refs) {
    VueData.handleActionClick("xform.saveFormTemporarily");
    VueData.ShowAddLeaderReview = true;
    VueData.leaderReviewKey = Math.random();
    VueData.leaderOrder = VueData.nowButtonParameters.showOrder || "2"; //选择领导排序 1顺序 2倒序  默认为倒序（从小领导到大领导，序号从大到小）
  },
  // 分阅情况
  "xform.shareAbout"(routerParam, metaData, formData, VueData, refs) {
    VueData.componentName = "shareAboutDialog";
  },
  // 流转设置
  "xform.processNodeSendRange"(routerParam, metaData, formData, VueData, refs) {
    // VueData.handleActionClick("xform.saveFormTemporarily");
    VueData.$route.query.specialSaveObj = JSON.stringify({ temporarilySave: true })
    this.saveNoTip(routerParam, metaData, formData, VueData, () => {
      VueData.ShowAddLeaderReview = true;
      VueData.leaderReviewKey = Math.random();
      VueData.leaderOrder = VueData.nowButtonParameters.order || "2";
      VueData.processSettings = {
        flowId: VueData.nowButtonParameters.flowId,
        nodeId: VueData.nowButtonParameters.nodeId,
        targetNodeId: VueData.nowButtonParameters.targetNodeId,
        isLoad: VueData.nowButtonParameters.isLoad, //是否加载最近一次配置
        sendMode: VueData.nowButtonParameters.sendMode || "1", //1.横传直传，2.仅横传、3.仅直传；默认为1
        order: VueData.nowButtonParameters.order || "2", //"1.顺序：领导从大到小  2.倒序：从小到大  3.选择顺序"
      };
    })
  },
  jingan_quanyue(routerParam, metaData, formData, VueData, refs, saveAfter) {
    VueData.isShowWriteOpintionBtn = true;
    VueData.alreadyWriteOpintion = true;
    dsf.layer.loading();
    dsf.http
      .post(
        `/fn/mobileSaveOpinion/saveOpinion?flowId=${metaData.parameters.flowId}&nodeId=${metaData.parameters.nodeId}&moduleId=${metaData.parameters.moduleId}`,
        {
          __DATA: JSON.stringify({
            info_id: metaData.parameters.pk,
            pid: new String(metaData.parameters.pId),
            pnid: new String(metaData.parameters.pnId),
            opinion: "圈阅。",
            type: "g_inbox",
          }),
        }
      )
      .then((res) => {
        dsf.layer.clear();
        if (!res.data.result) {
          dsf.layer.toast(res.data.message, false);
        } else {
          this.send(routerParam, metaData, formData, VueData, refs, saveAfter);
        }
      })
      .catch(() => {
        dsf.layer.clear();
      });
  },
  //陕西一体化 超级一键回收 平台可用
  async superRecycleV2(routerParam, metaData, formData, VueData, refs) {
    let loading = dsf.layer.loading()
    let infoId = VueData.pk;
    let issuper = VueData.nowButtonParameters.issuper;
    VueData.formParams.isSuperRecycle = true
    await dsf.http.post("fn/flow/getInfoStatus", { infoId }).then(function ({ data }) {
      if (data.type == "success" && data.data == 2) {
        dsf.layer.toast("文件已办结!");
      } else if (data.type == "error") {
        dsf.layer.closeLoading(loading)
        dsf.layer.toast("服务器错误!");
      }
    });
    await dsf.http.post("fn/flow/getSuperRecycleData", { pk: infoId, issuper }).then(function ({ data }) {
      if (data.data.length) {
        VueData.formParams.superRecycleData = data.data
        VueData.formParams.issuper = issuper
        dsf.layer.closeLoading(loading)
        VueData.componentName = "sxSuperRecycle"
      } else {
        dsf.layer.closeLoading(loading)
        dsf.layer.toast("暂无回收节点！")
      }
    })
  },
  //陕西一体化 回收 平台可用
  recycle(routerParam, metaData, formData, VueData, refs) {
    let dataParams = {
      pk: VueData.pk,
      pid: metaData.parameters.pid || metaData.parameters.pId,
      bt: formData.main["B0001"].value
    };
    dsf.layer.confirm({
      message: "<div style='font-size: 18px;'>确定回收该文件吗？</div>",
      confirmButtonText: "确定",
    }, function () {
      dsf.http.post("ctrl/flow/checkRecycle", dataParams).then(function ({ data }) {
        if (data.type == "success") {
          if (data.message == "1") {
            dsf.http.post("ctrl/flow/recycle", data.data).then(function (result) {
              if (result.data.type == "success") {
                dsf.layer.toast(result.data.message, () => {
                  VueData.backSucces()
                })
              } else {
                dsf.layer.toast(result.data.message);
              }
            });
          } else {
            dsf.http.post("ctrl/flow/recycleListData", { pk: VueData.pk }).then(function ({ data }) {
              if (data.count == 0) {
                dsf.layer.toast("暂无回收节点！")
              } else {
                VueData.formParams.superRecycleData = data.data
                VueData.formParams.isSuperRecycle = false
                VueData.componentName = "sxSuperRecycle"
              }
            })
          }
        } else {
          dsf.layer.toast(data.message);
        }
      });
    });
  },
  // 陕西一体化 意见列表修改按钮 平台可用
  "Flow.openEditOpinionList"(routerParam, metaData, formData, VueData, refs) {
    VueData.componentName = "opinionSxDialog"
    VueData.formParams.selectOpinion = true
    VueData.spHandleJS.closeDialogCallback = function (data) {
      VueData.initData()
    }
  },
  // pc发送弹出意见框按钮，移动功能同send
  'xform.sendAndInputOpinion'(routerParam, metaData, formData, VueData, refs, saveAfter, params, moreSendButtonParams) {
    this.send(routerParam, metaData, formData, VueData, refs, saveAfter, params, moreSendButtonParams)
  },
  // 当前节点特送到办结节点
  'xform.endNode'(routerParam, metaData, formData, VueData, refs) {
    let self = this;
    this.saveNoTip(routerParam, metaData, formData, VueData, () => {
      endNode();
    }, false);
    let endNode = function() {
      dsf.layer.confirm(
        {
          message: "是否确定办结文件？",
          confirmButtonText: "确认",
        },
        () => {
          var params = [{
            pk: VueData.formParams.pk,
            pnid: metaData.parameters.pnId,
            isNeedOpinion: VueData.nowButtonParameters.isNeedOpinion || -1,
          }]
          if (VueData.nowButtonParameters.isNeedOpinion == 1) {
            VueData.componentName = "endNodeOpinion";
            VueData.spHandleJS.closeDialogCallback = function (data) {
              console.log(data)
              if (JSON.stringify(data) != "{}" && data.actionName == "确定") {
                params[0]['opinion'] = data.value;
                batchEndNode(params)
              }
            }
          } else {
            // 不需要填写意见
            batchEndNode(params)
          }
        }
      );
    }
    let batchEndNode = function(params) {
      dsf.http.post("/fn/flow/batchEndNode", {
        todoData : JSON.stringify(params)
      })
      .then((res) => {
        if (res.data.code == 200) {
          dsf.layer.toast("办结成功", true, () => VueData.backSucces());
        } else {
          dsf.layer.toast("办结失败", false);
        }
      });
    }
  },
}
export default buttonHandle;
