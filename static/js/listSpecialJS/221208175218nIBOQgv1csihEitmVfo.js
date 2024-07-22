//【山东通】 我的会议-近期会议
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    let queryValue = {
      id: pk
    };
    vueData.$router.push({
      path: `/conferenceIndex`,
      query: queryValue
    });
  };
  exportObj.shareMeeingInfo = function (itemValue, vueData) {
  
    let hostUrl = `${dsf.url.getRootPath()}/ctrl/sdtongSSO/loginMeeting?toUrl=` + dsf.base64.encode(`/commonForm/210902110807b6V0jmvL06vdMmcRTMW/${itemValue.dataValue["A0001"]}?listId=210922093738avCyOytkXRvnRaXlSZQ&method=mobileViewForm&validateByList=1`);

    let url = `${dsf.config.meetingConfig.sdtServerUrl}portal/custom_qywx.html?host=${encodeURIComponent(hostUrl)}` + `&response_type=code&scope=snsapi_base&agentid=${dsf.config.meetingConfig.agentId}&state=STATE#wechat_redirect`;

    console.log("url", url);
    try {
      //备注：shareAppMessage分享到会话接口，1.6及以上版本支持
      wx.invoke("shareAppMessage", {
          title: '会议信息', // 分享标题
          desc: '查看会议的基本信息', // 分享描述
          link: url, // 分享链接
          imgUrl: '' // 分享封面
        },
        function (res) {
          console.log("shareAppMessage-res", res);
          if (res.err_msg == "shareAppMessage:ok") {}
        }
      );
    } catch (e) {
      console.log("shareAppMessage-err", e);
      dsf.layer.toast("请在山东通app中操作", false);
    }
  }
  window.spListJS = exportObj;
})();
