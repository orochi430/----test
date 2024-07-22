//发改委疫情上报
const exportObj = {};
exportObj.createRow = function (btn, vueData) {
  dsf.http.post("/fn/covidProtect/toadyForm").then(res => {
    if (res.data.code != 200) {
      dsf.layer.toast(res.data.message);
    } else {
      const {
        data
      } = res.data
      let route = {
        name: "commonForm",
        params: {
          moduleId: data.moduleId
        }
      }
      if (data.pk) {
        route.params.pk = data.pk
      }
      if (data.initDataSource) {
        route.query = {
          initDataSource: data.initDataSource,
          listId:"191101180952ZBvw3u1nGer5IvYN5M0"
        }
      }
      vueData.$router.push(route)
    }
  }).error(function (message) {
    dsf.layer.toast(message);
  })
}

exportObj.changUser = function (btn, vueData) {
  vueData.$router.push({
    name: "checklogin",
    query: {
      changUser: 1
    }
  })
}

export default exportObj;
