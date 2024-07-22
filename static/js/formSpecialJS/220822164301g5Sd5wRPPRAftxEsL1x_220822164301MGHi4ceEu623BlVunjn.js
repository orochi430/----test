//[电气] 党委发文-上行文 标题点击
(function () {
  const exportObj = {};
  //点击表单标题 打开正文附件
  let node = null

  exportObj.initHandle = function (formData, formStruct, vueData) {
    node = formStruct.parameters.nodeId
    // for (let item of formStruct.controls) {
    //   if (item.label == "标题" && item.privilege.editable == false) {
    //     let textAttach = formData.attach["attach-0"]
    //     if (textAttach.length > 0) {
    //       let paramVal = {
    //         fileId: textAttach[0].id,
    //         moduleId: formStruct.parameters.moduleId,
    //         fileName: textAttach[0].fileName,
    //         nodeId: -7,
    //         screenWidth: 375,
    //         "x-auth-token": dsf.util.loadSessionStore("loginToken"),
    //         addLoading: 1
    //       }

    //       let titleEle = vueData.$refs.formTab[0].$refs.B0001[0].$refs.controlTextBox.$el.childNodes[0].childNodes[0];
    //       titleEle.innerHTML = `<span class="van-field__control" id="goElc" onclick="goEnc()">${formData.main["B0001"].value}</span>`
    //       document.getElementById("goElc").onclick = function goEnc() {
    //         dsf.http.post('/fn/office/openMobileOffice', paramVal).then(res => {
    //           if (res.data.code == 200) {
    //             vueData.$router.push({
    //               name: "dsfIframe",
    //               query: {
    //                 url: res.data.message,
    //                 title: textAttach[0].fileName
    //               },
    //             });

    //           }
    //         })
    //       };
    //     } else {
    //       dsf.layer.toast("无正文文件")
    //     }
    //   }
    // }
  }
  exportObj.saveAfter = function (vueData, formStruct, formData) {

    if (node === "Gu6TDlmxyUVyhQw") {
      //行政发文-印发节点(机要秘书印发，归档(Gu6TDlmxyUVyhQw))
      let pk = formData.main["A0001"].value;
      let wjbh = formData.main["B0003"].value; //文件编号 B0003
      let ngrq = formData.main["B0013"].value; //拟稿日期 C_FW_0042
      let yfrq = formData.main["B0022"].value; //印发日期 B0022
      let qfr = formData.main["C-GW-FW-0112"].value; //签发人 C_GW_FW_0112
      let bookmarkDict = {
        "B0003": wjbh,
        "C_FW_0042": ngrq,
        "B0022": yfrq,
        "C_GW_FW_0112": qfr
      };
      let param = {
        "infoId": pk,
        "bookmarkDict": bookmarkDict
      };

      dsf.http.post("ctrl/fwAttachFile/fillByInfoId", param, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      }).then(res => {
        if (res.data.type !== "success") {
          dsf.layer.toast("同步表单数据到附件失败!");
        } else {
          // console.log(JSON.stringify(syncFileResult))
          dsf.layer.toast("保存成功");
        }
      })

    } else
      dsf.layer.toast("保存成功");
  }
  window.spJS = exportObj;
})()
