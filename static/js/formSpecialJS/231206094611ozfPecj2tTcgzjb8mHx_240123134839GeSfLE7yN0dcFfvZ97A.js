// 一体化市教委--建议提案表单
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("textClick", function (data) {
      vueData.$router.push({
        path: `/commonList/2401041051137AbouIix3NZdnrdxR5O/231206104524YZmvXIsRIxJnkiqyat9`,
        query: {
          secQuery: `{"fid": "${formData.main['A0001'].value}"}`,
        },
      });
    });

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

  };

  window.spJS = exportObj;
})();
