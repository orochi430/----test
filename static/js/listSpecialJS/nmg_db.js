// const { default: dsf } = require("../../../src/common");
//内蒙古省级领导 sm 移动办公项目

(function() {
  const exportObj = {};
  exportObj.initHandle = function(vueData) {
    vueData.readStatusKey = "S-UNIFY-TASK-00014";
    vueData.haveReadVal = 0;
    // setTimer(vueData);
  };
  exportObj.dataFilter = function(listData, vueData) {
    // console.log("我执行了");
    if(vueData.start!=1||vueData.finished){
      clearInterval(listInterval);
    }else{
      setTimer(vueData);
    }

  };
  exportObj.link = function(listid, moduleId1, pk1, vueData, itemValue) {
    let moduleId, pk, isEnterTodo, todoId;
    let str = itemValue["S-UNIFY-TASK-00028.value"];
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
    dsf.http.get(
      `/fn/unifyTaskCtrl/markRead?pk=${itemValue["S-BASE-0001.value"]}`
    );
    // dsf.base64.encode;
    let tmpUrl = dsf.base64.encode(
      `/dianju?moduleId=${moduleId}&pk=${pk}&isEnterTodo=${isEnterTodo}&todoId=${todoId}`
    );
    let prefix = itemValue["S-UNIFY-TASK-00028.value"]
      .split("#")[0]
      .split("/dist")[0];
    //刷新未读已读
    window.closeWeb = function() {
      // if(location.href.indexOf("openSocket")<0){
      //   vueData.$router.replace(location.href.split("#/")[1]+"&openSocket=1")
      // }
      // vueData.$parent.$parent.$parent.finishedTips = "";
      // vueData.$parent.$parent.$parent.finished = false;
      // vueData.$parent.$parent.$parent.loading = true;
      // vueData.$parent.$parent.$parent.data = [];
      // vueData.$parent.$parent.$parent.distribIds = "";
      // vueData.$parent.$parent.$parent.start = 1;
      // vueData.$parent.$parent.$parent.fetchData();
      vueData.$bus.emit("refresh");
    };
    let url = `${prefix}/fn/mobileSso/redirectAuth?code=${userid}&state=${tmpUrl}`;
    xsfWindow.openWebView({
      title: "",
      url: url,
      colorString: "#fff",
      show_title_bar: false,
      closeWeb: "closeWeb"
    });
    //   xsfWindow.openWebView({
    //     "title": "",
    //     "url": url,
    //     "colorString": "#ffffff"
    // });
  };
  let listInterval;
  function setTimer(vueData) {
    clearInterval(listInterval);

    if (!vueData.data.length) {
      let params = {
        limit: 15,
        page: 1,

      };
      let secQuery=vueData.$route.query.secQuery;
      if(secQuery){
        if(JSON.parse(secQuery).important!=undefined){
          params.important=JSON.parse(vueData.$route.query.secQuery).important;
        }
        if(JSON.parse(secQuery).fileCategory){
          params.fileCategory=JSON.parse(vueData.$route.query.secQuery).fileCategory;
        }
      }


      if (vueData.keyword) {
        params["_content"] = vueData.keyword;
        params["key"] = vueData.keyword;
      }
      if (JSON.stringify(vueData.paramsData) != "{}") {
        let paramsData = {
          "query_S-UNIFY-TASK-0005": params["query_S-UNIFY-TASK-0005"],
          "query_S-UNIFY-TASK-00010": params["query_S-UNIFY-TASK-00010"],
          "query_S-UNIFY-TASK-00011": params["query_S-UNIFY-TASK-00011"],
          "query_S-UNIFY-TASK-00018": params["query_S-UNIFY-TASK-00018"],
          "query_S-UNIFY-TASK-00025": params["query_S-UNIFY-TASK-00025"],

        };
        vueData.paramsData = paramsData;
      }
      params = JSON.parse(
        JSON.stringify(Object.assign(params, vueData.paramsData))
      );
      listInterval = setInterval(() => {
        dsf.http
          .post(
            "fn/list/2206140944586bW055wjWnzurPnIaOC/mobile/q?moduleId=200604181624TgyhRFd9z8kt5NCPcLQ",
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
