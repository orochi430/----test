// const { default: dsf } = require("../../../src/common");
//蒙正通待办中台跳转
(function () {
  const exportObj = {};
  exportObj.initHandle = function (vueData) {
    vueData.readStatusKey = "S-UNIFY-TASK-00014";
    vueData.haveReadVal = 0;
    // setTimer(vueData);
  };
  exportObj.dataFilter = function (listData, vueData) {
    // console.log("我执行了");
    // if (vueData.start != 1 || vueData.finished) {
    //   clearInterval(listInterval);
    // } else {
    //   setTimer(vueData);
    // }
  };
  exportObj.link = function (listid, moduleId1, pk1, vueData, itemValue) {
    let moduleId, pk, isEnterTodo, todoId;
    let str = itemValue["S-UNIFY-TASK-00028.value"];
    if (str.includes("/commonForm/")) {
      moduleId = str.split("/commonForm/")[1].split("?")[0].split("/")[0];
      pk = str.split("/commonForm/")[1].split("?")[0].split("/")[1];
      isEnterTodo = str.split("/commonForm/")[1].split("?")[0].split("/")[2];
      todoId = str.split("/commonForm/")[1].split("?")[1].split("=")[1];
      let userid = dsf.util.loadSessionStore("user").user_id;
      dsf.http.get(
        `/fn/unifyTaskCtrl/markRead?pk=${itemValue["S-BASE-0001.value"]}`
      );
      // dsf.base64.encode;
      let tmpUrl = dsf.base64.encode(
        `/mzt_dianju?moduleId=${moduleId}&pk=${pk}&isEnterTodo=${isEnterTodo}&todoId=${todoId}`
      );
      let prefix = itemValue["S-UNIFY-TASK-00028.value"]
        .split("#")[0]
        .split("/dist")[0];
      //刷新未读已读
      window.closeWeb = function () {
        console.log("刷新待办列表数据");
        vueData.$bus.emit("refresh");
        vueData.$parent.$parent.$parent.$parent.$parent.refreshBadge(0);
      };
      let url = `${prefix}/fn/mobileSso/redirectAuth?code=${userid}&state=${tmpUrl}`;
      // let url = `http://192.168.3.154:8006/nmg/fn/mobileSso/redirectAuth?code=${userid}&state=${tmpUrl}`;
      // location.href = url;
      xsfWindow.openWebView({
        title: "",
        url: url,
        colorString: "#fff",
        show_title_bar: false,
        closeWeb: "closeWeb",
        orientation: "2"//默认值是0竖屏，你改为空字符串和2都可以
      });
    }else{
      dsf.middleground.openUrl({
        url: str,
        title: itemValue["S-UNIFY-TASK-0005"],
        getCodeParams: { appCode: itemValue["S-UNIFY-TASK-0002.value"] }
      })
    }

  };
  let listInterval;
  function setTimer(vueData) {
    clearInterval(listInterval);

    if (!vueData.data.length) {
      let params = {
        limit: vueData.filterData ? vueData.filterData.limit : 15,
        page: 1,
      };
      // let secQuery=vueData.$route.query.secQuery;
      // if(secQuery){
      //   if(JSON.parse(secQuery).important!=undefined){
      //     params.important=JSON.parse(vueData.$route.query.secQuery).important;
      //   }
      //   if(JSON.parse(secQuery).fileCategory){
      //     params.fileCategory=JSON.parse(vueData.$route.query.secQuery).fileCategory;
      //   }
      // }

      // if (vueData.keyword) {
      //   params["_content"] = vueData.keyword;
      //   params["key"] = vueData.keyword;
      // }
      // if (JSON.stringify(vueData.paramsData) != "{}") {
      //   let paramsData = {
      //     "query_S-UNIFY-TASK-0005": params["query_S-UNIFY-TASK-0005"],
      //     "query_S-UNIFY-TASK-0002": params["query_S-UNIFY-TASK-0002"],
      //     "query_S-UNIFY-TASK-0003": params["query_S-UNIFY-TASK-0003"],
      //     "query_S-UNIFY-TASK-00014": params["query_S-UNIFY-TASK-00014"],
      //     "query_S-UNIFY-TASK-00016": params["query_S-UNIFY-TASK-00016"],
      //     "query_S-UNIFY-TASK-00017": params["query_S-UNIFY-TASK-00017"],
      //     "query_S-UNIFY-TASK-00018": params["query_S-UNIFY-TASK-00018"],
      //     "query_S-UNIFY-TASK-00019": params["query_S-UNIFY-TASK-00019"],
      //     "query_S-UNIFY-TASK-00020": params["query_S-UNIFY-TASK-00020"],
      //     "query_S-UNIFY-TASK-00022": params["query_S-UNIFY-TASK-00022"],
      //     "query_S-UNIFY-TASK-00025": params["query_S-UNIFY-TASK-0002"],
      //     "query_S-UNIFY-TASK-00024": params["query_S-UNIFY-TASK-00024"],
      //     "query_S-UNIFY-TASK-00028": params["query_S-UNIFY-TASK-00028"],
      //   };
      //   vueData.paramsData = paramsData;
      // }
      params = JSON.parse(
        JSON.stringify(Object.assign(params, vueData.paramsData))
      );
      listInterval = setInterval(() => {
        dsf.http
          .post(
            "fn/list/210129200739xulGB8Dp4Grx0L7U411/mobile/q?moduleId=200604181624TgyhRFd9z8kt5NCPcLQ",
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
