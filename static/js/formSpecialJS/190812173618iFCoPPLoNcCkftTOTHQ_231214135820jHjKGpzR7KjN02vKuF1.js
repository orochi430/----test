(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 意见内容输入添加意见模板---bug1300
    formStruct.controls.find(item=>{
      item.metaId == "S-OPINION-0008" ? vueData.$set(item, "showOpinionTem", true) : ''
    })
    let opinion = vueData.formData.main["S-OPINION-0008"].value || "";
    vueData.$bus.on('textareaTemp', function (data) {
      opinion += data.template.context;
      vueData.$set(vueData.formData.main, "S-OPINION-0008", {
        value: opinion
      }) 
    })
    
    if (vueData.formTabs) {
      let tab = vueData.formTabs.findIndex((tab) => tab.title == "流转情况");
      if (tab >= 0) {
        vueData.formTabs.splice(tab, 1);
      }
    }

    vueData.$set(vueData.formData.main, "S-OPINION-0001", {
      value: `{"customInfoId": "${vueData.$route.query.customInfoId}", "customPid": "${vueData.$route.query.customPid}", "customFlowId": "${vueData.$route.query.customFlowId}", "opinionNodeId": "${vueData.$route.query.opinionNodeId}"}`,
    });
    vueData.$set(formData.main, "S-OPINION-0039", {
      value: vueData.$route.query.leaderOpinion,
      text: vueData.$route.query.leaderOpinion == 1? '是': '否',
    });
    let idArr = vueData.$route.query.opinionNodeId.split(",");
    console.log(idArr);
    if (idArr.length > 0) {
      idArr.forEach((id, i) => {
        dsf.http
          .post("/ctrl/opinionControlP2433/getInfo", {
            flowId: vueData.$route.query.customFlowId,
            opinionNodeId: id,
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              formStruct.controls.forEach((item) => {
                if (item.metaId == "S-OPINION-0005") {
                  item.enumData.push({
                    id: id,
                    remark: "",
                    text: res.data.data.opinionNodeName,
                    value: res.data.data.opinionNodeName,
                    varClass: "layui-col-md3",
                  });
                }
              });
              if (i == 0 && formStruct.parameters.nodeId == 0) {
                
                vueData.$set(vueData.formData.main, "S-OPINION-0005", {
                  value: res.data.data.opinionNodeName,
                  text: res.data.data.opinionNodeName,
                });
              }
            }
          });
      });
    }
  };

  exportObj.saveAfter = function (vueData, formStruct, formData) {
    vueData.backSucces();
  };

  exportObj.afterLogicDeleteXForm = function (formData, formStruct, vueData) {
    dsf.http
      .post("fn/opinionControlP2433/clearCache", {
        pk: vueData.$route.query.customInfoId,
      })
      .then((res) => {
        if (res.data.code == 200) {
          console.log("刷新");
        }
      });
  };

  window.spJS = exportObj;
})();
