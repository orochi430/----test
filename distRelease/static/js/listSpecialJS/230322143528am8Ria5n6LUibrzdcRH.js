//蒙正通菜单单点 移动办公项目
(function() {
  const exportObj = {};
  // exportObj.initHandle = function (vueData) {
  //   vueData.readStatusKey = 'S-UNIFY-TASK-00014'
  //   vueData.haveReadVal = 1
  // }
  //let listInterval;
  //exportObj.dataFilter = function(listData, vueData) {
  //  if(vueData.start!=1||vueData.finished){
   //   clearInterval(listInterval);
   // }else{
    //  setTimer(vueData);
   // }
 // };
  exportObj.link = function(listid1, moduleId1, pk1, vueData, itemValue) {
    // console.log(listid,moduleId);
    let moduleId, pk, isEnterTodo, todoId;
    let str = itemValue["UNIFY-DATA-DONE-0021.value"];
    
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
        `/commonForm/${moduleId}/${pk}/${isEnterTodo}?todoId=${todoId}`
      );
      let prefix = itemValue["UNIFY-DATA-DONE-0021.value"]
        .split("#")[0]
        .split("/dist")[0];
      let url = `${prefix}/fn/mobileSso/redirectAuth?code=${userid}&state=${tmpUrl}`;
	  location.href=url;
      //xsfWindow.openWebView({
	//"title":"已办文件",
	//"url":url,
	//"colorString":"#000",
	//"show_title_bar":true,
	//"closeWeb":"closeWeb"})
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
            "fn/list/230322143528am8Ria5n6LUibrzdcRH/mobile/q?moduleId=230322142353yFWzZtIxXrb19erFIxH",
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
