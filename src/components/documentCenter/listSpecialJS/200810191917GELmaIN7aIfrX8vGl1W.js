//公司OA开票申请新建按钮
const exportObj = {};
exportObj.createRow = function (btn, vueData) {
  vueData.checkType = "radio";
  vueData.commonPopParam = {
    listId: "211105150832bfW4woSLHuJjvRF17Hv",
    moduleId: "200804094918otX3kBHkWAXmsmbSQ7N"
  }
  vueData.commonPop = true;
}

exportObj.choose = function (checkItems, vueData) {
  console.log("choose", checkItems);
  vueData.commonPop = false;

  let params = {
    convertId: "2111051358226Zd0z05bB8cTpoO5L0y",
    srcInfo: checkItems[0].dataValue["A0001"]
    // ,
    // initDataSource: 1
  }
  dsf.http.post("/fn/convert/moduleRuleConvert", params).then(res => {
    if (res.data.code == 200) {
      const {
        data
      } = res.data
      let route = {
        name: "commonForm",
        params: {
          pk: data.pk,
          moduleId: data.moduleId
        }
        // ,
        // query: {
        //   initDataSource: 1
        // }
      }
      vueData.$router.push(route)
    } else {
      dsf.layer.toast(res.data.message);
    }
  }).error(function (message) {
    dsf.layer.toast(message);
  })
}

export default exportObj;
