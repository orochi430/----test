// 校历列表 杭州市委党校
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  const itemPk = pk
  var state = Number(itemValue["2108241539404N5u3scBD2B9v1lJWtg"]);
  dsf.http.post('fn/calendar/accessControl', {
    pk: itemPk
  }).then((resultdata) => {
    let result = resultdata.data
    if (result.type == "success" && result.message == "1") {
      if (state == 0) { //编辑
        vueData.$router.push({
          path: "/commonForm/210824151257cBZiKZP383jY0jUASSO/" + itemPk,
          query: {
            "listId": "210824163615Ze67RBK6cULzuoy0wRN",
            "method": "openCalendarform",
            "publishedornot": state
          }
        });
      } else if (state == 1) { //查看
        dsf.http.post('fn/calendar/openCalendarform', {
          pk: itemPk
        }).then((resultdata) => {
          let result = resultdata.data
          if (result.type == "success" && result.message == "2") {
            dsf.layer.toast('此校历征集单未填写，无法查看');
          } else {
            vueData.$router.push({
              path: "/commonForm/210825144555mZVMP3V1EA2NwKHsnvJ/" + result.message,
              query: {
                listId: "210825151137dVcmbnZBIkOar86NlIb",
                "method": "edit",
              }
            });
          }
        }).catch(err => {});
      }
    } else if (result.message == "3") {
      //流程中的不能填写
      dsf.http.post('fn/calendar/openCalendarform', {
        pk: itemPk
      }).then((resultdata) => {
        let result = resultdata.data
        if (result.type == "success" && result.message == "2") {
          dsf.layer.toast('此校历征集单未填写，无法查看');
        } else {
          vueData.$router.push({
            path: "/commonForm/210825144555mZVMP3V1EA2NwKHsnvJ/" + result.message,
            query: {
              listId: "210825151137dVcmbnZBIkOar86NlIb",
              "method": "edit",
            }
          });
        }
      }).catch(err => {});
    } else {
      var item_pk = itemValue["A0001"];
      var item_bt = itemValue["B0001"];
      var item_startTime = itemValue["210824161004JbiylZFH63jZ6isTfHE"];
      var item_endTime = itemValue["210824161053W6zTaiAuHr2B7IEgdrZ"];

      dsf.http.post('fn/calendar/fill', {
        id: item_pk
      }).then((resultdata) => {
        let result = resultdata.data
        if (result.type == "success" && result.message == "1") {
          vueData.$router.push({
            path: "/commonForm/210825144555mZVMP3V1EA2NwKHsnvJ",
            query: {
              "id":item_pk,
              "bt": item_bt,
              "startTime": item_startTime,
              "endTime": item_endTime
            }
          });
        } else {
          vueData.$router.push({
            path: "/commonForm/210825144555mZVMP3V1EA2NwKHsnvJ/" + result.message,
            query: {
              "validateByList": 1,
              "listId": "210825151137dVcmbnZBIkOar86NlIb"
            }
          });
        }
      }).catch(err => {});

    }
  }).catch(err => {});

}

export default exportObj;
