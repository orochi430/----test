//[电气] 公文拟办单 标题点击
(function () {
  const exportObj = {};
  //点击表单标题 打开正文附件
  exportObj.initHandle = function (formData, formStruct, vueData) {
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

    //拟办意见赋值
    if (formStruct.parameters.nodeId == "DFMYvyQa2AKLZqk") {
      for (let item of formStruct.controls){
        if (item.metaId == "opinionFiles") {
          item.extra.opinionContent = formData.main["B0025"].value;
          break
        }
      }
     
      
    }
  }
  window.spJS = exportObj;
})()
