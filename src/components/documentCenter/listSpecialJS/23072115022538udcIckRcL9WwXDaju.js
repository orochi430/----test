// 单点已签收议题征询 --会议交换

const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  console.log(itemValue);
  let url = "";
  if (itemValue["C-R-RCV-0012.value"] == 1) {
    //是否有反馈
    dsf.http
      .get("ctrl/meetingRemote/getSingleMeetingNoticeBySw", {
        pk: itemValue["A0003"],
      })
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          let data = res.data.data;
          url = `/commonForm/${data.moduleId}/${data.id}?listId=RemoteMeetingList&mId=${data.moduleId}&method=openRemoteNoticeView&validateByList=1&pk=${data.id}`;
          vueData.$router.push({
            path: url,
          });
        }
      });
  } else {
    if (itemValue["C-R-RCV-0058.value"] == 1) {
      dsf.layer.toast("该数据是强制签收数据，请联系发件单位后操作!");
      return;
    }

    if (itemValue["A0003"]) {
      dsf.http
        .get("ctrl/remoteExchangeData/getInboxData", {
          pk: itemValue["A0003"],
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            let data = res.data.data;
            if (data.pid && data.pnid) {
              //本人有待办
              url = `/commonForm/${data.moduleId}/${itemValue["A0003"]}?pk=${
                itemValue["A0003"]
              }&todoId=${data.pid + "_" + data.pnid}`;
            } else {
              if (data.status == 1) {
                //其他人有代办
                url = `/commonForm/${data.moduleId}/${itemValue["A0003"]}?listId=RemoteMeetingList&mId=${data.moduleId}&method=openRemoteNoticeView&validateByList=1&pk=${itemValue["A0003"]}`;
              } else {
                //无待办
                url = `/commonForm/${data.moduleId}/${itemValue["A0003"]}?listId=20082313555438zby5yWOGo2grZPrkJ&method=meetingSignUpRcv&validateByList=1&pk=${itemValue["A0003"]}`;
              }
            }
            vueData.$router.push({
              path: url,
            });
          }
        });
    } else {
      dsf.layer.toast("未找到需要反馈的通知!");
    }
  }
};

exportObj.dataFilter = function (listData,vueData) {
  listData.forEach( item => {
    if (!item.dataValue['C-R-RCV-0012']) {
      item.dataValue['C-R-RCV-0012'] = '未反馈'
      item.dataValue['C-R-RCV-0012.text'] = '未反馈'
    }
  })
}

export default exportObj;
