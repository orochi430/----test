(function () {
   
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    console.log(vueData);
    if(moduleId == "211231145419buBNxbdk3TjXthhbR3h") {
      vueData.$router.push({
        path: `/commonTabs/flws`,
        query: {
          moduleId: moduleId,
          pk: pk,
          todoId: itemValue.todoId
        }
      });
    } else {
      let linkToQuery = {} 
      if (vueData.linkTo) {
          if (vueData.linkTo.query) { // 有跳转参数
              if (vueData.linkTo.isFixedValue) { // 参数是固定值
                  for (let [k, v] of Object.entries(vueData.linkTo.query)) {
                      linkToQuery[k] = v
                  }
              } else {
                  for (let [k, v] of Object.entries(vueData.linkTo.query)) {
                      //只有value在行数据内的才替换  否则不替换,使用原来的值   2022年9月1日13:35:23 @ly
                      if (itemValue.hasOwnProperty(v)) {
                          linkToQuery[k] = itemValue[v]
                      } else {
                          linkToQuery[k] = v
                      }
                  }
              }
          }
          if (vueData.linkTo.path && vueData.linkTo.path != '/commonForm') {
              vueData.$router.push({
                  path: vueData.linkTo.path,
                  query: linkToQuery
              })
              return
          }
      }
      if (vueData.$route.query.notLink) return
      if (itemValue.allowMobile && itemValue.allowMobile != 1) {
          dsf.layer.toast("该文件只能在电脑端处理")
          return
      }
      if ('isRead' in itemValue && !itemValue.isRead) {
          itemValue.isRead = true
      }
      if (vueData.keyColumn == "") return;
      if (vueData.$route.query.fileType == "weidaka") {
          return
      }
      let pk = itemValue[vueData.keyColumn] || itemValue.info_id || itemValue.id || Object.entries(itemValue).forEach((itm,
          index) => {
          if (itm[0].indexOf("A0001") >= 0) return [1]
      })
      let moduleValue = ""
      Object.entries(itemValue).forEach((item, index) => {
          if (item[0].indexOf("A0004") >= 0) {
              moduleValue = item[1]
          }
      })
      // console.log(moduleValue, pk)
      let fileType = vueData.$route.query.fileType || vueData.params.fileType;
      let moduleId = itemValue.moduleId || moduleValue || vueData.listmoduleId;
      let masterId = itemValue.masterId || "";
      let params = moduleId + "/" + pk;
      if (vueData.type == "gw" || fileType == "gw") {
          let isEnterTodo = 1;
          params += "/" + isEnterTodo;
      }
      if (vueData.type) {
          params += `?type=${vueData.type}`;
      }

      if (fileType) {
          params += `?type=${fileType}`;
      }

      if (vueData.$route.name == "SigninList") {
          //收文登记
          params += `?&listId=1903161124289nXBk8iVSmTMGYxn9bi&exchangeList=signedList`;
      }
      if (vueData.type == "db" || fileType == "ToOversee") {
          //首页tab督办
          params += `&masterId=${masterId}`;
      }
      if (itemValue.distribId) {//只要列表里面有这个参数，就传给表单页面
          //首页tab待阅
          params += `&distribId=${itemValue.distribId}`;
          if (itemValue.readStatus != "2") {
              itemValue.readStatus = "2";
              dsf.http.post('fn/mobileToRead/markRead', {
                  pks: itemValue.distribId
              }).then(res => { })
          }
      }
      let query = {
          listId: vueData.getListId(),
          method: vueData.params && vueData.params.method ? vueData.params.method : vueData.$route.query.method
      }

      if (itemValue.todoId && itemValue.todoId.indexOf("_") > -1) {//todoId是待办使用的，目前有列表返回todoId但是格式不正确，增加判断
          query.todoId = itemValue.todoId;
      }
      if (vueData.$route.query.activeTab) { // activeTab打开表单时激活哪个tab页
          query.activeTab = vueData.$route.query.activeTab;
      }
      if (vueData.$route.query.validateByList) { // validateByList校验表单权限
          query.validateByList = vueData.$route.query.validateByList;
      }
      if (dsf.config.specialList && dsf.config.specialList.previewPage && dsf.config.specialList.previewPage.findIndex(item => item && vueData.listId && item == vueData.listId) > -1) {
          console.log("/previewPage/" + params)
          vueData.$router.push({
              path: "/previewPage/" + params,
              query: {
                  listId: vueData.listId,
                  method: vueData.$route.query.method
              }
          })
          return
      }
      if (vueData.tabsPage) {
          vueData.$router.push({
              path: "/TabCommonForm/" + vueData.routeKey + "/" + vueData.clickTabIndex + "/" + params
          });
      } else {
          vueData.$router.push({
              path: "/commonForm/" + params,
              query: Object.assign(query, linkToQuery)
          });
      }
    }
  }
  window.spListJS = exportObj;
})();