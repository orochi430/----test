//[中央党校]办公电话申请
(function () {
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    //使用人控件显隐
    if (formData.main["220816095938lG5hBfzFn9sIHYofDYs"]) {
      if (formData.main["220816095938lG5hBfzFn9sIHYofDYs"].value == "1") { //自动带入
        hideCtrl("220815190026EkwlxyePJGACstaNCjF", formStruct); //使用人（填写）
      } else {
        hideCtrl("220713145541ZkkcxRVOZpwkWQnW2ks", formStruct); //使用人（自动）
      }
    }

    //长途权限相关控件显隐
    if (formData.main["220713154814GdCdyvyWIbM1hqWL921"]) {
      //国内长途
      if (("," + formData.main["220713154814GdCdyvyWIbM1hqWL921"].value + ",").includes(",2,")) {
        if (formData.main["22071315514790TRP5NTLFjbD5eTBCK"]) { //国内长途模式
          if (formData.main["22071315514790TRP5NTLFjbD5eTBCK"].value != "2") { //不是自选
            hideCtrl("220713155353jerykzWl5NodUeVROGD", formStruct); //国内长途开始时间
            hideCtrl("2207131641067VUR3Xe9jjpdxl3jLUB", formStruct); //国内长途结束时间
          }
        }
      } else {
        hideCtrl("22071315514790TRP5NTLFjbD5eTBCK", formStruct); //国内长途模式
        hideCtrl("220713155353jerykzWl5NodUeVROGD", formStruct); //国内长途开始时间
        hideCtrl("2207131641067VUR3Xe9jjpdxl3jLUB", formStruct); //国内长途结束时间
      }
      //国际长途
      if (("," + formData.main["220713154814GdCdyvyWIbM1hqWL921"].value + ",").includes(",3,")) {
        if (formData.main["220713155257Ci9sntWZjtuWk3T7eDb"]) { //国际长途模式
          if (formData.main["220713155257Ci9sntWZjtuWk3T7eDb"].value != "2") { //不是自选
            hideCtrl("220713163948oNclhzuJXypjIZYy6Ev", formStruct); //国际长途开始时间
            hideCtrl("22071316415020OZButNIU6vbSITwTr", formStruct); //国际长途结束时间
          }
        }
      } else {
        hideCtrl("220713155257Ci9sntWZjtuWk3T7eDb", formStruct); //国际长途模式
        hideCtrl("220713163948oNclhzuJXypjIZYy6Ev", formStruct); //国际长途开始时间
        hideCtrl("22071316415020OZButNIU6vbSITwTr", formStruct); //国际长途结束时间
      }
    }
  }

  //隐藏控件
  let hideCtrl = function (metaId, formStruct) {
    let ctrl = formStruct.controls.find(item => item.metaId == metaId);
    if (ctrl) ctrl.show = 0;
  }

  window.spJS = exportObj;
})();
