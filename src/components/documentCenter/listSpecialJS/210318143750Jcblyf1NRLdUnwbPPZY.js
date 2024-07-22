import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  if (itemValue["C-BJ-0004"] != "2") {
    dsf.http.post('/fn/notepaper/markRead', {
      notePaperId: itemValue["A0001"],
      moduleId: itemValue["A0004"]
    }).then(res => {
      vueData.$router.push({
        path: `/commonForm/${itemValue["A0004"]}/${itemValue["A0001"]}`
      })
    })
  } else {
    vueData.$router.push({
      path: `/commonForm/${itemValue["A0004"]}/${itemValue["A0001"]}`
    })
  }

}
export default exportObj;
