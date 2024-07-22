//陕西政府  批示按钮 打开弹窗
(function () {
  const exportObj = {};
  exportObj.changeOpinion = function (formData, formStruct, vueData) {
    vueData.componentName = 'opinionSxDialog'
  }
  exportObj.closeDialogCallback = function (data, actionName, formData, formMeta, vueData) {
    if (data == true) {
      vueData.initData()
    }
  }
  //1.添加元数据B0025主题词  当作标题,原B0001来文标题 改放到隐藏域中。B0025添加指定权限,B0001设置保存权限
  //2.更新代码
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    function beforeSaveForm() {
      //1.添加元数据B0025主题词  当作标题,原B0001来文标题 改放到隐藏域中。B0025添加指定权限,B0001设置保存权限
      let lwlx = formData.main["B0056"].value;//来文类型
      if ("1" == lwlx) {//办文
        vueData.$set(formData.main, "B0001", { "value": "[办文]" + formData.main["B0025"].value })
      } else if ("3" == lwlx) {//阅文
        vueData.$set(formData.main, "B0001", { "value": "[阅文]" + formData.main["B0025"].value })
      } else if ("5" == lwlx) {//简报
        vueData.$set(formData.main, "B0001", { "value": "[简报]" + formData.main["B0025"].value })
      } else if ("7" == lwlx) {//其他
        vueData.$set(formData.main, "B0001", { "value": "[其他]" + formData.main["B0025"].value })
      } else if ("9" == lwlx) {//办文回复
        vueData.$set(formData.main, "B0001", { "value": "[办文回复]" + formData.main["B0025"].value })
      } else if ("11" == lwlx) {//批文回复
        vueData.$set(formData.main, "B0001", { "value": "[批文回复]" + formData.main["B0025"].value })
      } else if ("13" == lwlx) {//分送
        vueData.$set(formData.main, "B0001", { "value": "[分送]" + formData.main["B0025"].value })
      } else {
        vueData.$set(formData.main, "B0001", { "value": formData.main["B0025"].value + formData.main["C-LW-0044"].value })
      }
    }
    return new Promise(function (resolve, reject) {
      beforeSaveForm()
      resolve()
    })
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 工作秘密字样显隐
    // 初始化
    let flag = formData.main["B0023"].value == "-2"
    vueData.$set(formData.main["B0041"], "value", flag ? "工作秘密" : "")
    formStruct.controls.find(item => item.metaId == "B0041").show = flag
    // 省长特殊逻辑
    dsf.http.post("fn/FWReportController/isSz").then(({ data }) => {
      if (data.data) {
        formStruct.controls.find(item => item.metaId == "B0041").show = false
        vueData.$set(formData.main["B0041"], "value", "")
      }
    })
    // 属性联动
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "B0023") {
        let flag = busObj.value == "-2";
        vueData.$set(formData.main["B0041"], "value", flag ? "工作秘密" : "")
        formStruct.controls.find(item => item.metaId == "B0041").show = flag
      }
    })
  }
  window.spJS = exportObj;
})();