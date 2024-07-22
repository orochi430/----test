const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  console.log(itemValue);
  let params = `method=topicView&meetingUserId=${itemValue["A0010"]}&listId=MeetingList`;
  vueData.$router.push({
    path: `/commonForm/${itemValue["A0004"]}/${itemValue["A0001"]}?${params}`,
  });
};

exportObj.recovery = function (btn, vueData) {
  //回收
  console.log(btn);
  vueData.showCheck = true;
  vueData.$eventBus.onDefaultListCheck(vueData, function (data) {
    console.log(data);
    Cover(btn, data, vueData, 1);
  });
};

function Cover(btn, listData, VueData) {
  let pks = "";
  listData.forEach((item, index) => {
    index == listData.length - 1
      ? (pks += item.dataValue["A0001"])
      : (pks += item.dataValue["A0001"] + ",");
  });
  dsf.http
    .post("fn/meetingTopic/modifyTopicStatus", {
      ids: pks,
      type: 2,
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
