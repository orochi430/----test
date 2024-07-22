//内蒙古省级领导 sm 移动办公项目
(function() {
  const exportObj = {};
  // exportObj.initHandle = function (vueData) {
  //   vueData.readStatusKey = 'S-UNIFY-TASK-00014'
  //   vueData.haveReadVal = 1
  // }
  let listInterval;
  exportObj.dataFilter = function(listData, vueData) {
    if(vueData.start!=1||vueData.finished){
      clearInterval(listInterval);
    }else{
      setTimer(vueData);
    }
  };
  exportObj.link = function(listid1, moduleId1, pk1, vueData, itemValue) {
    // console.log(listid,moduleId);
    let moduleId, pk, isEnterTodo, todoId;
    let str = itemValue["S-UNIFY-TASK-DONE-00015"];

    moduleId = str
      .split("/commonForm/")[1]
      .split("?")[0]
      .split("/")[0];
    pk = str
      .split("/commonForm/")[1]
      .split("?")[0]
      .split("/")[1];
    isEnterTodo = str
      .split("/commonForm/")[1]
      .split("?")[0]
      .split("/")[2];
    todoId = str
      .split("/commonForm/")[1]
      .split("?")[1]
      .split("=")[1];
      let userid = dsf.util.loadSessionStore("user").user_id;
      // dsf.base64.encode;
      let tmpUrl = dsf.base64.encode(
        `/dianju?moduleId=${moduleId}&pk=${pk}&isEnterTodo=${isEnterTodo}&todoId=${todoId}`
      );
      let prefix = itemValue["S-UNIFY-TASK-DONE-00015"]
        .split("#")[0]
        .split("/dist")[0];
      let url = `${prefix}/fn/mobileSso/redirectAuth?code=${userid}&state=${tmpUrl}`;
      xsfWindow.openWebView({"title":"","url":url,"colorString":"#fff","show_title_bar":false})
  };
  function setTimer(vueData) {
    clearInterval(listInterval);

    if (!vueData.data.length) {
      let params = {
        limit: 15,
        page: 1,

      };
      if (vueData.keyword) {
        params["_content"] = vueData.keyword;
        params["key"] = vueData.keyword;
      }
      if (JSON.stringify(vueData.paramsData) != "{}") {
        let paramsData = {
          "query_S-UNIFY-TASK-DONE-0002": params["query_S-UNIFY-TASK-DONE-0002"],
          "query_S-UNIFY-TASK-DONE-0003": params["query_S-UNIFY-TASK-DONE-0003"],
          "query_S-UNIFY-TASK-DONE-0004": params["query_S-UNIFY-TASK-DONE-0004"],
          "query_S-UNIFY-TASK-DONE-0006": params["query_S-UNIFY-TASK-DONE-0006"],
          "query_S-UNIFY-TASK-DONE-00015": params["query_S-UNIFY-TASK-DONE-00015"],
          "query_S-UNIFY-TASK-DONE-0007": params["query_S-UNIFY-TASK-DONE-0007"],
          "query_S-UNIFY-TASK-DONE-0009": params["query_S-UNIFY-TASK-DONE-0009"],
          "query_S-UNIFY-TASK-DONE-0010": params["query_S-UNIFY-TASK-DONE-0010"],
          "query_S-UNIFY-TASK-DONE-0011": params["query_S-UNIFY-TASK-DONE-0011"]

        };
        vueData.paramsData = paramsData;
      }
      params = JSON.parse(
        JSON.stringify(Object.assign(params, vueData.paramsData))
      );
      listInterval = setInterval(() => {
        dsf.http
          .post(
            "fn/list/201130103854F95OgH5AcjMNRI3QbgW/mobile/q?moduleId=201130103804O4Z0YaTT1pOpjQEhxPp",
            params
          )
          .then(({ data }) => {
            vueData.data = data.datas;
          });
      }, 30000);
    }
  }
  window.spListJS = exportObj;
})();
