// 【山东烟草会务系统】消息发布
const exportObj = {}

// 发送消息
exportObj.messageSend = function (formData, formStruct, vueData) {
  let saveAfter = function (VueData, sendButtonParams, formData) {
    dsf.http.post('/fn/sdycMeeting/messageSend', {
      msgId: VueData.formParams.pk
    }).done(res => {
      if (res.type == "success") {
        dsf.layer.toast("已发送", true, () => {
          vueData.backSucces();
        })
      } else {
        dsf.layer.toast("操作失败", false);
      }
    }).error(error => {
      console.log("messageSend-error", error)
      dsf.layer.toast("操作失败", false);
    }).always(() => { })
  }
  // 保存表单
  vueData.buttonHandle["save"](
    vueData.$route.params,
    vueData.formMeta,
    vueData.formData,
    vueData,
    vueData.$refs,
    saveAfter
  );
}

// exportObj.saveFilter =  function (formData, formStruct, VueData) {
//   console.log("saveFilter")
//   return new Promise(function(resolve,reject){
//       resolve();
//   })
// }
exportObj.initHandle = function (formData, formStruct, vueData) {
  // 重写接收人列表接口
  let userCtl = formStruct.controls.find(item => item.metaId == "220713143311tmtA9M2YjLr8vXedLJh");
  if (userCtl) {
    userCtl.extra.tabs[0] = {
      action: `fn/conferenceUser/getParticipantsSelectTreeData?meetingId=${vueData.$route.query.fid}`,
      name: "接收人"
    }
  }
}
export default exportObj