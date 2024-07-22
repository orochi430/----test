// 会议请假
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  let masterid = pk;
  let newpk = "";
  let bt = itemValue["hykq001.B0001"];
  let kssj = itemValue["hykq001.C-ERP-BMKQ-0002"];
  dsf.http.post('fn/leave/getLeaveByHyId', {
    hyId: masterid
  }).then((resultdata) => {
    let result = resultdata.data;
    let query = {}
    if (result.data.id) {
      newpk = result.data.id
      query = {
        listId: "200917151324kJBgElfgnRXaYuM8AoV",
        validateByList: "1"
      }
      if (result.data.status == "0") {
        query.method = "edit";
      } else {
        query.method = "view";
      }
    } else {
      query.masterid = masterid;
      query.bt = bt;
      query.kssj = kssj;
    }
    vueData.$router.push({
      path: "/commonForm/200910163553dOPeZXSHV7QsMuQZH9S/" + newpk,
      query: query
    });

  }).catch(err => {});
}
export default exportObj;
