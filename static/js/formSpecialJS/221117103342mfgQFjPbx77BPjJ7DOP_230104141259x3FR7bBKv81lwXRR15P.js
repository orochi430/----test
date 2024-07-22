//[电气oa]协同办公

(function () {
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    //重写【选择发送人】的选人按钮事件
    // window["C-COOPERATIVE-OFFICE-002_beforeOpenCode"] = function (formData, url, vueDataNew) {
    //     vueData.commonPopParam = {
    //         listId: "2211251642003CwaWNfjHHMpnZviR8T",
    //         moduleId: "180503211544eOHl5qddafR20fjx18o"
    //     }
    //     vueData.checkType = "radio";
    //     vueData.commonPop = true;
    //     return "";
    // }

    //初始化相关文件信息
    dsf.http.get("fn/cooperativeOffice/searchSubForm", {
      pk: formStruct.parameters.pk
    }).done(res => {
      if (res.type == "success") {
        if (formData.main["oNrHxUI5Rm4DurUU"]) {
          formData.main["oNrHxUI5Rm4DurUU"].value = res.data.map(item => {
            return {
              dataValue: {
                "B0001": item.documentName,
                "A0001": item.documentId,
                "A0004": item.moduleId
              }
            }
          })
        }
      } else {
        dsf.layer.toast("相关文件获取失败！")
      }
    })
  }

  //【选择发送人】列表的确定事件
  // exportObj.choose = function (checkItems, vueData) {
  //     vueData.commonPop = false;
  //     console.log("checkItems", checkItems);
  //     //发送人
  //     if (checkItems.length > 0) {
  //         vueData.$set(vueData.formData.main, "C-COOPERATIVE-OFFICE-002", {
  //             value: checkItems[0].dataValue["S-BASE-0001"],
  //             text: checkItems[0].dataValue["S-USERGROUP-0001"],
  //             schema: ""
  //         })
  //     }
  // }

  //协同办公特殊发送
  exportObj.coordinationSend = function (formData, formStruct, vueData) {
    let send = function () {
      if (formData.main["C-COOPERATIVE-OFFICE-002"].value) {
        dsf.http.get(`fn/cooperativeOffice/send`, {
            pk: formStruct.parameters.pk
          })
          .done(res => {
            if (res.type == "success") {
              dsf.layer.toast("已发送", true, () => vueData.backSucces());
            } else {
              dsf.layer.toast("发送失败", false);
            }
          }).error(err => {
            console.log("send-err", err);
            dsf.layer.toast("发送失败", false);
          })
      } else {
        dsf.layer.toast("请选择发送人", false);
      }
    }
    // 保存表单
    vueData.buttonHandle["save"](
      vueData.$route.params,
      vueData.formMeta,
      vueData.formData,
      vueData,
      vueData.$refs,
      send
    );
  }

  //保存相关文件信息
  exportObj.saveAfter = function (vueData, formStruct, formData) {
      let req = {
        pk: vueData.formParams.pk,
        dataList: []
      }
    if (formData.main["oNrHxUI5Rm4DurUU"].value.length > 0) {
      // let req = {
      //     pk: vueData.formParams.pk,
      //     noticeKey: formData.main["lUcsoCJ9aHmJfrp4"]?.value?.filter(item => item.dataValue["A0004"] == "180805175628RK7ixI1IyrjDuG4njD5").map(item => item.dataValue["A0001"]).join(","),
      //     noticeName: formData.main["lUcsoCJ9aHmJfrp4"]?.value?.filter(item => item.dataValue["A0004"] == "180805175628RK7ixI1IyrjDuG4njD5").map(item => item.dataValue["B0001"]).join(","),
      //     newsKey: formData.main["lUcsoCJ9aHmJfrp4"]?.value?.filter(item => item.dataValue["A0004"] == "220803111621B521Wfaj0JHZLp0lbpU").map(item => item.dataValue["A0001"]).join(","),
      //     newsName: formData.main["lUcsoCJ9aHmJfrp4"]?.value?.filter(item => item.dataValue["A0004"] == "220803111621B521Wfaj0JHZLp0lbpU").map(item => item.dataValue["B0001"]).join(",")
      // }
    
      for(let item of formData.main["oNrHxUI5Rm4DurUU"].value){
        req.dataList.push({
          id:item.dataValue["A0001"],
          moduleId:item.dataValue["A0004"],
          moduleName:"协同",
          title: item.dataValue["B0001"] 
        })
      }
    }
    dsf.http.post('ctrl/cooperativeOffice/saveSubForm', req, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }).done(res => {
      if (res.type == "success") {
        dsf.layer.toast("保存成功")
      } else if (req.dataList.length == 0) {
        dsf.layer.toast("保存成功")
      } else {
        dsf.layer.toast("相关文件保存失败！")
      }
    })
  }

  window.spJS = exportObj;
})()
