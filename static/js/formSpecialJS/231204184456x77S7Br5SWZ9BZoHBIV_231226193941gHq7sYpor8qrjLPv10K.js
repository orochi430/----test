// 一体化市教委--建议提案表单
(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectUserBus", function (data) {
      console.log(data);
      if (data.metaData.metaId == "C-JYTA-0017"){ // 主办处室
        let other = data.value + ',' + formData.main["C-JYTA-0018"].value
        getLeader(other)
      }
      if (data.metaData.metaId == "C-JYTA-0018"){ // 会办处室
        let other = formData.main["C-JYTA-0017"].value + ',' + data.value
        getLeader(other)
      }
      if (data.metaData.metaId == "C-JYTA-0069"){ // 新增审阅领导
        setOpinion()
      }
    })
    vueData.$bus.on("inputRadio", function (data) {
      console.log(data);
      if (data.metaData.metaId == "C-JYTA-0070" || data.metaData.metaId == "C-JYTA-0071"){ // 审阅类型、主办处室办理类型
        setOpinion()
      }
    })
    function getLeader(depts){  //获取领导
      dsf.http
      .post("ctrl/suggestionProposal/getManagerLeaders", {
        depts: depts,
      })
      .then((res) => {
        let data = res.data.data
        if (res.data.code == "200") {
          vueData.$set(formData.main, "C-JYTA-0069", {
            value: data.ids,
            text: data.text,
            schema: data.schema,
          });  //审阅领导
          setOpinion()
        }
      });
    }
    function setOpinion(){  //分办意见回显
      let str = ''
      if (formData.main["C-JYTA-0069"]?.text) {
        str += '请' + formData.main["C-JYTA-0069"].text.replaceAll(",", "、") + '同志' + formData.main["C-JYTA-0070"].text + '。\n'
      }
      if (formData.main["C-JYTA-0017"]?.text || formData.main["C-JYTA-0018"]?.text) {
        str += '拟请'
        if (formData.main["C-JYTA-0017"]?.text) {
          str += formData.main["C-JYTA-0017"].text.replaceAll(",", "、")
        }
        if (formData.main["C-JYTA-0018"]?.text) {
          str += '会' + formData.main["C-JYTA-0018"].text.replaceAll(",", "、")
        }
        str += formData.main["C-JYTA-0071"].text + '。'
      }
      vueData.$set(formData.main, "C-JYTA-0075", {
        value: str,
      });  //分办意见
    }

    Deadline()
    function Deadline(){  //承办期限计算
      dsf.http
      .post("ctrl/suggestionProposal/getConfigDeadline", {
        pk: formStruct.parameters.pk,
      })
      .then((res) => {
        console.log(res.data.data);
        let data = res.data.data
        if (res.data.code == "200") {
          if (formData.main["C-JYTA-0072"]) {
            vueData.$set(formData.main, "C-JYTA-0072", {value: data.zb});
          }
          if (formData.main["C-JYTA-0073"]) {
            vueData.$set(formData.main, "C-JYTA-0073", {value: data.hb});
          }

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

    MajorSender()
    function MajorSender(){  //意见痕迹
      dsf.http
      .post("ctrl/suggestionProposal/isMajorSender", {
        pk: formStruct.parameters.pk,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.code == "200"&&res.data.data) {
          getModifiedOpinion(formData, formStruct, vueData)
        }else{
          formStruct.controls.forEach((item) => {
            item.metaId == "C-JYTA-0077"
              ? vueData.$set(item, "show", 0)
              : ""; //意见痕迹
          });
        }
      });
    }

  }

  function getModifiedOpinion(formData, formStruct, vueData){  //获取意见痕迹
    dsf.http
    .post("ctrl/suggestionProposal/getModifiedOpinion", {
      pk: formStruct.parameters.pk,
    })
    .then((res) => {
      if (res.data.code == "200") {
        vueData.$set(formData.main, "C-JYTA-0077", {value: res.data.data});
      }
    });
  }

  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
      if (formData.main["C-JYTA-0077"].value) {
        vueData.$set(formData.main, "C-JYTA-0077", {value: ''});
      }
      resolve();
    });
  };

  exportObj.saveAfter = function (vueData, formStruct, formData) {
    getModifiedOpinion(vueData.formData, vueData.formMeta, vueData)
  }

  window.spJS = exportObj
})();
