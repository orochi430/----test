// 一体化市教委--建议提案表单
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {


    if (formStruct.parameters.nodeId == 'km1TIKo6lIb0uNS') {
      vueData.$bus.on("opinionInpFnBus", function (busObj) {
        console.log(busObj);
        if (busObj.metaData.metaId == "opinionFiles"&&busObj.val.length > 10) {
          dsf.layer.toast(`意见不得超过10个字`);
          busObj.metaData.extra.opinionContent = busObj.metaData.extra.opinionContent.substr(0,10)
        }
      });
    }

    if (formData.main["C-JYTA-DF-0013"].text == '其他') {
      formStruct.controls.forEach((item) => {
        item.metaId == "C-JYTA-DF-0014" ? vueData.$set(item, "show", 1) : ""; //非主动公开理由
      });
    }else{
      formStruct.controls.forEach((item) => {
        item.metaId == "C-JYTA-DF-0014" ? vueData.$set(item, "show", 0) : ""; //非主动公开理由
      });
    }

    vueData.$bus.on("inputRadio", function (data) {
      console.log(data);
      if (
        data.metaData.metaId == "C-JYTA-DF-0010" ||
        data.metaData.metaId == "C-JYTA-DF-0011" ||
        data.metaData.metaId == "C-JYTA-DF-0012" ||
        data.metaData.metaId == "C-JYTA-DF-0013"
      ) {
        // 处室公开意见
        if (data.value == "1") {
          render0022(0);
        } else {
          render0022(1);
        }
      }
      
      if (data.metaData.metaId == "C-JYTA-DF-0013") {
        // 处室公开意见
        if (data.text == "其他") {
          formStruct.controls.forEach((item) => {
            item.metaId == "C-JYTA-DF-0014" ? vueData.$set(item, "show", 1) : ""; //非主动公开理由
          });
        } else {
          formStruct.controls.forEach((item) => {
            item.metaId == "C-JYTA-DF-0014" ? vueData.$set(item, "show", 0) : ""; //非主动公开理由
          });
        }
      }
    });

    publicOP()
    function publicOP() {
      let level1 = formData.main["C-JYTA-DF-0010"].value;
      let level2 = formData.main["C-JYTA-DF-0011"].value;
      let level3 = formData.main["C-JYTA-DF-0012"].value;
      let level4 = formData.main["C-JYTA-DF-0022"].value;
      if (level4 == '1') {
        render0022(0);
      } else if (level3 == '1' && !level4) {
        render0022(0);
      } else if (level2 == '1' && !level4 && !level3) {
        render0022(0);
      } else if (level1 == '1' && !level4 && !level3 && !level2) {
        render0022(0);
      } else {
        render0022(1);
      }

      if (!level1 && !level2 && !level3 && !level4) {
        render0022(0);
      }
    }

    function render0022(show) {
      formStruct.controls.forEach((item) => {
        item.metaId == "C-JYTA-DF-0013" ? vueData.$set(item, "show", show) : ""; //非主动公开选项
      });
      if (show == '0') {
        formStruct.controls.forEach((item) => {
          item.metaId == "C-JYTA-DF-0014" ? vueData.$set(item, "show", 0) : ""; //非主动公开理由
        });
      }else{
        if (formData.main['C-JYTA-DF-0013'].value == '99') {
          formStruct.controls.forEach((item) => {
            item.metaId == "C-JYTA-DF-0014" ? vueData.$set(item, "show", 1) : ""; //非主动公开理由
          });
        }
      }
    }

    MajorSender();
    function MajorSender() {
      //意见痕迹
      dsf.http
        .post("ctrl/suggestionProposal/isMajorSender", {
          pk: formStruct.parameters.pk,
        })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.code == "200" && res.data.data) {
            getModifiedOpinion(formData, formStruct, vueData);
          } else {
            formStruct.controls.forEach((item) => {
              item.metaId == "C-JYTA-0077" ? vueData.$set(item, "show", 0) : ""; //意见痕迹
            });
            getModifiedOpinion(formData, formStruct, vueData);
          }
        });

        if (formData.main["C-JYTA-0081"]&&!formData.main["C-JYTA-0081"].value) {
          dsf.http
          .post("ctrl/suggestionProposal/getDeadlineDay", {
            week: formData.main['C-JYTA-0072'].value,
          })
          .then((res) => {
            if (res.data.code == "200") {
                vueData.$set(formData.main, "C-JYTA-0081", {value: res.data.message});
            }
          });
        }
    
        if (formData.main["C-JYTA-0082"]&&!formData.main["C-JYTA-0082"].value) {
          dsf.http
          .post("ctrl/suggestionProposal/getDeadlineDay", {
            week: formData.main['C-JYTA-0073'].value,
          })
          .then((res) => {
            if (res.data.code == "200") {
                vueData.$set(formData.main, "C-JYTA-0082", {value: res.data.message});
            }
          });
        }
        
    }
  };

  function getModifiedOpinion(formData, formStruct, vueData) {
    //获取意见痕迹
    dsf.http
      .post("ctrl/suggestionProposal/getModifiedOpinion", {
        pk: formStruct.parameters.pk,
      })
      .then((res) => {
        if (res.data.code == "200") {
          vueData.$set(formData.main, "C-JYTA-0077", { value: res.data.data });
        }
      });
  }

  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
      if (formData.main["C-JYTA-0077"].value) {
        vueData.$set(formData.main, "C-JYTA-0077", { value: "" });
      }
      resolve();
    });
  };

  exportObj.saveAfter = function (vueData, formStruct, formData) {
    getModifiedOpinion(vueData.formData, vueData.formMeta, vueData);
  };

  window.spJS = exportObj;
})();
