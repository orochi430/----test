(function () {
  // 西藏会议邀请单 2022年9月13日12:41:09  ly
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$set(formData.main, "B0001", { value: vueData.$route.query.title })

    vueData.$set(formData.main, "220905182148ZRGd4a4g4j1tAblIDa1", { value: vueData.$route.query.meetingnum })

  }

  exportObj.saveAfter = function (vueData, formStruct, formData) {
    dsf.http.post('ctrl/vedioMeeting/sendMeetingNotice', { pk: vueData.formParams.pk }).then(res => {
      if (res.data.code == 200) {
        dsf.layer.toast("邀请成功！")
        XyMeeting.closeInvite()
        // vueData.$router.back()
        //vueData.backSucces()
      }else{
        dsf.layer.toast("邀请失败，请稍后再试！")
      }
    })
  }


  window.spJS = exportObj;
})();
