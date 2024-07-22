//杭州市委党校 校历征集汇总
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  if (itemValue["iscp"] == "已填写") {
    vueData.$router.push({
      path: "/commonForm/210825144555mZVMP3V1EA2NwKHsnvJ/" + itemValue["calendarId"],
      query: {
        "listId": "210825151137dVcmbnZBIkOar86NlIb",
        "validateByList": "1"
      }
    });
  } else {
    dsf.layer.toast("当前部门未填写！");
  }
}
//校历列表 杭州市委党校，汇总
exportObj.xlzjckhz = function (btn,vueData) {
  dsf.http.post('fn/calendar/determineWhether', {
    pk: vueData.$route.query.pk
  }).then((resultdata) => {
    let result = resultdata.data
    var id = result.message;
    if (result.type == "success") {
      if (id == "1") {
        vueData.$router.push({
          path: "/commonForm/210825144555mZVMP3V1EA2NwKHsnvJ",
          query: {
            "id": vueData.$route.query.pk,
            "summaryFlag": "1"
          }
        });
      } else {
        vueData.$router.push({
          path: "/commonForm/210825144555mZVMP3V1EA2NwKHsnvJ/" + id
        });
      }
    }
  }).catch(err => { });

}
exportObj.dataFilter = function (listData, vueData) {
  vueData.listButtons.mainButtons = [{
    showIndex: 0,
    condition: "",
    name: "汇总",
    icon: "",
    action: "xlzjckhz"
  }]
  vueData.listButtons.commonButton = []
}
export default exportObj;
