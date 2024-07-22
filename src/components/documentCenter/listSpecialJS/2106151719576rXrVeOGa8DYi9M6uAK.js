const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  console.log(itemValue);
  vueData.$router.push({
    path: `/commonForm/${itemValue["A0004"]}/${itemValue["A0001"]}`,
    query: {
      listId: "MeetingList",
      method: "topicEdit",
      validateByList: "1",
      gly: "1",
      meetingUserId: itemValue["A0010.value"],
    },
  });
};

exportObj.createRow = function (btn, vueData) {
  //新增议题
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: "210607181937YJxUC5fve4y7q3SH5hJ",
    },
    query: {
      gly: 1,
    },
  });
};

exportObj.meetingApplications = function (btn, vueData) {
  //转会议申请
  console.log(btn);
  vueData.showCheck = true;
  vueData.$eventBus.onDefaultListCheck(vueData, function (data) {
    console.log(data);
    if (btn.action == 'meetingApplications') {
      Applications(btn, data, vueData);
    }
  });
};

// 简单消息弹框--jf
exportObj.nullify = function (btn, vueData) {
  //作废
  console.log(btn);
  vueData.showCheck = true;

  vueData.$eventBus.onDefaultListCheck(vueData, function (data) {
    console.log(data);
    vueData.$refs.remindDialog.show("作废", ``, `请填写作废理由`);
    vueData.$refs.remindDialog.submitFun = () => {
      ADone(btn, data, vueData);
    };
  });
};

function Applications(btn, listData, VueData) {
  if (!VueData.showCheck) {
    return
  }
  // return
  let pks = "";
  if (
    listData.find((item) => {
      return (
        item.dataValue["C-MEETING-TOPIC-0042.value"] !=
        listData[0].dataValue["C-MEETING-TOPIC-0042.value"]
      );
    })
  ) {
    dsf.layer.toast("请选择相同类型议题");
    return;
  }
  listData.forEach((item, index) => {
    index == listData.length - 1
      ? (pks += item.dataValue["A0001"])
      : (pks += item.dataValue["A0001"] + ",");
  });
  dsf.http
    .post("fn/meetingApply/topicToMeeting", {
      ids: pks,
    })
    .then(({ data }) => {
      console.log(data);
      if (data.code == "200") {
        dsf.layer.toast(data.message);
        VueData.$router.push({
          name: "commonForm",
          params: {
            moduleId: data.data.moduleId,
            pk: data.data.pk,
          },
          query: {
            listId: "2106211601159duvNrTl9jdgtRo0fSJ",
            renderType: true, //打开会议申请是否要初始化联动
          },
        });
        VueData.onRefresh();
        VueData.showCheck = false;
      } else {
        // dsf.layer.toast(data.message);
      }
    });
}

function ADone(btn, listData, VueData) {
  let pks = "";
  listData.forEach((item, index) => {
    index == listData.length - 1
      ? (pks += item.dataValue["A0001"])
      : (pks += item.dataValue["A0001"] + ",");
  });
  dsf.http
    .post("fn/meetingTopic/modifyTopicStatus", {
      ids: pks,
      type: "-1",
      cancelReason: VueData.$refs.remindDialog.message,
    })
    .then(({ data }) => {
      if (data.code == "200") {
        dsf.layer.toast(data.message);
        VueData.onRefresh();
        VueData.$refs.remindDialog.close();
      } else {
        dsf.layer.toast(data.message);
      }
    });
}

export default exportObj;
