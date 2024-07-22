const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  console.log(itemValue);
  vueData.$router.push({
    path: `/commonForm/${itemValue["A0004"]}/${itemValue["A0001"]}`,
    query: {
      listId: "MeetingList",
      method: "viewYt",
      validateByList: "1",
      showNodeId: "15",
    },
  });
};

exportObj.ConsiderationAdoption = function (btn, vueData) {
  //审议通过
  console.log(btn);
  vueData.showCheck = true;
  vueData.$eventBus.onDefaultListCheck(vueData, function (data) {
    console.log(data);
    ADo(btn, data, vueData, 1);
  });
};

exportObj.ConsiderationNoAdoption = function (btn, vueData) {
  //审议不通过
  console.log(vueData);
  vueData.showCheck = true;
  vueData.$eventBus.onDefaultListCheck(vueData, function (data) {
    console.log(data);
    ADo(btn, data, vueData, -1);
  });
};

function ADo(btn, listData, VueData, approval) {
  let pks = "";
  console.log(VueData);
  listData.forEach((item, index) => {
    index == listData.length - 1
      ? (pks += item.dataValue["A0001"])
      : (pks += item.dataValue["A0001"] + ",");
  });
  dsf.http
    .post("fn/meetingTopic/approval", {
      topicIds: pks,
      approval: approval,
    })
    .then(({ data }) => {
      if (data.code == "200") {
        dsf.layer.toast(data.message);
        VueData.onRefresh();
      } else {
        dsf.layer.toast(data.message);
      }
    });
}

export default exportObj;
