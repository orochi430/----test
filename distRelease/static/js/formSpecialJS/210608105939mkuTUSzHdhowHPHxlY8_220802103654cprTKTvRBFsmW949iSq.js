(function () {
  /**
   * 督办反馈
   */
  const exportObj = {};
  // 根据反馈类型隐藏对应附件类型
  function hideAttach(val, attachs) {
    attachs[0].show = 0;
    attachs[1].show = 0;
    attachs[2].show = 0;
    if (val !== undefined && val !== "" && attachs[val - 1].privilege.editable)
      attachs[val - 1].show = 1;
  }
  //获取关联文件
  function getRelationFile(vueData) {
    let fileRela = {
      relaMode: 1, //1为单向关联，2为双向关联
      relacountLimit: 1, //限制条数
      relaName: "文件关联", //名称
      relaValue: 2, //关联文件类型值
      fileTotal: 0, //文件总数
    };
    return new Promise(function (resolve, reject) {
      dsf.http
        .post("ctrl/filerelation/select/checkedJson", {
          pks: vueData.$route.query.relationId,
          infoId: vueData.pk,
          relaType: fileRela.relaValue,
          relaName: fileRela.relaName,
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data.length) {
            resolve(res.data.data);
          } else {
            reject();
          }
        });
    });
  }
  function setFKQS(relationId, vueData) {
    dsf.http
      .post("ctrl/superviseV6/approval/getSuperviseInfo", { pk: relationId })
      .then((res) => {
        if ("success" == res.data.type && res.data.data) {
          //获取反馈方式，不定期/一次性隐藏反馈期数
          let feedbackSystem = res.data.data.feedbackSystem;
          if (1 != feedbackSystem) {
            dsf.http
              .post("ctrl/superviseV6/approval/curFeedbackSize", {
                infoId: relationId,
              })
              .then((result) => {
                if ("success" == result.data.type && result.data.data) {
                  let periodicalSize = result.data.data.periodicalSize;
                  if (periodicalSize) {
                    let periodicalText = result.data.data.periodicalText;
                    vueData.$set(vueData.formData.main, "C-DB-FK-0045", {
                      value: periodicalSize,
                      text: periodicalText,
                    });
                  }
                }
              });
          } else {
            let fkqsCtr = vueData.formMeta.controls.find(
              (item) => item.metaId == "C-DB-FK-0045"
            );
            if (fkqsCtr) fkqsCtr.show = 0;
          }
        }
      });
  }
  function reloadDbtzForm(vueData, aLinkCtr, masterid) {
    aLinkCtr.extra.linkInfo = `/commonForm/2106021016102xjgjpCc6tqdMZkrX20/${masterid}?nodeId=-1&skipValidate=true`;
    aLinkCtr.extra.linkName = vueData.formData.main["B0001"].value;
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 获取项目名称
    let aLinkCtr = formStruct.controls.find(
      (item) => item.controlType == "controlMobileAlink"
    );
    let masterid = formData.main["C-DB-FK-0049"].value;
    if (masterid && aLinkCtr) reloadDbtzForm(vueData, aLinkCtr, masterid);
    // 关联立项单
    if (
      !vueData.relationList[0] ||
      (!vueData.relationList[0].document.length &&
        formStruct.controls.find(
          (ctr) => ctr.metaId.indexOf("relationFile") > -1
        ))
    ) {
      getRelationFile(vueData)
        .then((data) => {
          dsf.http
            .post("fn/mobileRelationFile/save", {
              relaMode: data[0].relaMode,
              relaIds: data[0].relaId,
              pk: vueData.pk,
              moduleId: vueData.moduleId,
              fileRelaId: vueData.relationList[0].fileRelaId,
            })
            .then((res) => {
              if (res.data.code == 200) {
                dsf.http
                  .get("fn/mobileRelationFile/getFormRelationFiles", {
                    pk: vueData.pk,
                    moduleId: vueData.moduleId,
                    nodeId: formStruct.parameters.nodeId,
                    flowId: formStruct.parameters.flowId,
                  })
                  .then((response) => {
                    vueData.$set(vueData, "relationList", response.data.rows);
                    formStruct.controls.find(
                      (ctr) => ctr.metaId.indexOf("relationFile") > -1
                    ).show = 1;
                  });
              }
            });
        })
        .catch((err) => {});
    }
    // 根据反馈类型隐藏对应附件类型
    let attachs = formStruct.controls.filter(
      (item) => item.metaId.indexOf("attach") > -1
    );
    let feedType = formData.main["C-DB-FK-0024"].value;
    hideAttach(feedType, attachs);
    let relationId = formData.main["A0003"].value;
    let fkqs = formData.main["C-DB-FK-0045"].value;
    if (relationId && !fkqs) {
      setFKQS(relationId, vueData);
    }
    vueData.$bus.on("inputRadio", function (busObj) {
      if (busObj.metaData.metaId == "C-DB-FK-0024") {
        hideAttach(busObj.value, attachs);
      }
    });

    //反馈类型默认选中 选中优先级:正常反馈1>办结反馈3>延期申请2
    if (!vueData.formData.main["C-DB-FK-0024"].text) {
      let control = formStruct.controls.find(ele=>{
        return ele.metaId == "C-DB-FK-0024"
      })
      if (control.enumData.find((it) => it.value == "1")) {
        vueData.$set(vueData.formData.main, "C-DB-FK-0024", {
          value: 1,
          text: "正常反馈",
        });
      } else if (control.enumData.find((it) => it.value == "3")) {
        vueData.$set(vueData.formData.main, "C-DB-FK-0024", {
          value: 3,
          text: "办结反馈",
        });
      } else {
        vueData.$set(vueData.formData.main, "C-DB-FK-0024", {
          value: 2,
          text: "延期申请",
        });
      }
    }
    
  };
  exportObj.saveAfter = function (vueData, formData, formStruct) {
    dsf.http
      .post("fn/superviseV6/approval/syncFeedbackPeriodsId", { id: vueData.pk })
      .then((res) => {
        if (res.data.code == 200) {
          // dsf.layer.toast('保存成功')
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  };
  window.spJS = exportObj;
})();
