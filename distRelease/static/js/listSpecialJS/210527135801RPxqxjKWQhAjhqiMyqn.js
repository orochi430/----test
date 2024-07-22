// const { default: dsf } = require("../../../src/common");

//蒙正通菜单单点 移动办公项目
(function() {
    const exportObj = {};
    // exportObj.initHandle = function(vueData) {
    //   vueData.readStatusKey = "S-UNIFY-TASK-00014";
    //   vueData.haveReadVal = 1;
    // };
    exportObj.link = function(listid, moduleId1, pk1, vueData, itemValue) {
      let moduleId, pk, isEnterTodo; //, todoId;
      let str = itemValue["UNIFY-DATA-DONE-0021.value"];
      moduleId = str
        .split("/commonForm/")[1]
        .split("?")[0]
        .split("/")[0];
      pk = str
        .split("/commonForm/")[1]
        .split("?")[0]
        .split("/")[1];
     // isEnterTodo = str
     //   .split("/commonForm/")[1]
     //   .split("?")[0]
     //   .split("/")[2];
    //  todoId = str
     //   .split("/commonForm/")[1]
     //   .split("?")[1]
      //  .split("=")[1];
      distribIds  = str.split("distribId")[1]
	  .split("=")[1];
      let userid = JSON.parse(sessionStorage.getItem("user")).user_id;
    //   dsf.http.get(`/fn/unifyTaskCtrl/markRead?pk=${itemValue["S-BASE-0001.value"]}`)
      // dsf.base64.encode;
      let tmpUrl = dsf.base64.encode(
        `/dianju?moduleId=${moduleId}&pk=${pk}&distribIds=${distribIds}&qydFlag=true`
      );
      let prefix = itemValue["UNIFY-DATA-DONE-0021.value"]
        .split("#")[0]
        .split("/dist")[0];
      //返回刷新列表
    window.closeWeb = function() {
      // if(location.href.indexOf("openSocket")<0){
      //   vueData.$router.replace(location.href.split("#/")[1]+"&openSocket=1")
      // }
      vueData.$parent.$parent.$parent.finishedTips = "";
      vueData.$parent.$parent.$parent.finished = false;
      vueData.$parent.$parent.$parent.loading = true;
      vueData.$parent.$parent.$parent.data = [];
      vueData.$parent.$parent.$parent.distribIds = "";
      vueData.$parent.$parent.$parent.start = 1;
      vueData.$parent.$parent.$parent.fetchData();
    };
      let url = `${prefix}/fn/mobileSso/redirectAuth?code=${userid}&state=${tmpUrl}`;
      xsfWindow.openWebView({
        title: "已阅文件",
        url: url,
        colorString: "#000",
        show_title_bar: true,
        closeWeb: "closeWeb"
      });
      //   xsfWindow.openWebView({
      //     "title": "",
      //     "url": url,
      //     "colorString": "#ffffff"
      // });
    };
    let listInterval;
  exportObj.dataFilter = function(listData, vueData) {
    if(vueData.start!=1||vueData.finished){
      clearInterval(listInterval);
    }else{
      setTimer(vueData);
    }
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
          "query_S-UNIFY-FAVORITE-0001": params["query_S-UNIFY-FAVORITE-0001"],
          "query_S-UNIFY-FAVORITE-0002": params["query_S-UNIFY-FAVORITE-0002"],
          "query_S-UNIFY-FAVORITE-0003": params["query_S-UNIFY-FAVORITE-0003"],
          "query_S-UNIFY-TASK-DONE-0006": params["query_S-UNIFY-TASK-DONE-0006"],
          "query_S-UNIFY-FAVORITE-0006": params["query_S-UNIFY-TASK-DONE-00015"],
          "query_S-UNIFY-FAVORITE-0008": params["query_S-UNIFY-FAVORITE-0008"],
          "query_S-BASE-0004": params["query_S-BASE-0004"],
          "query_S-BASE-0007": params["query_S-BASE-0007"],
          
          
        };
        vueData.paramsData = paramsData;
      }
      params = JSON.parse(
        JSON.stringify(Object.assign(params, vueData.paramsData))
      );
      listInterval = setInterval(() => {
        dsf.http
          .post(
            "fn/list/210527135801RPxqxjKWQhAjhqiMyqn/mobile/q?moduleId=210526190113N1Nxycuf1n1qtul7pwM",
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
  
