//公司OA项目需求、开发、变更申请任务单新建按钮
const exportObj = {};
exportObj.createRow = function (btn, vueData) {
  vueData.checkType = "radio";
  vueData.commonPopParam = {
    listId: "210408094834Cqu0IODez2qn3wXDnQh",
    moduleId: "200801181621stvy8De68zNVAglWxUP"
  }
  vueData.commonPop = true;
}

exportObj.choose = function (checkItems, vueData) {
  console.log("choose", checkItems);
  vueData.commonPop = false;

  let params = {
    convertId: "2111051618201c10tcG9wGthsW7Ygsz",
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
