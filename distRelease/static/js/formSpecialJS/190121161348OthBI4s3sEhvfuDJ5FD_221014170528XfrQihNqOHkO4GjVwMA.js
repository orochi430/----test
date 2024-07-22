// [徐州市委党校]会议考勤签到
(function () {
  const exportObj = {};

  exportObj.meegingSignIn = function (formData, formStruct, vueData) {
    console.log("ClientName=>", dsf.util.getClientName())
    if (dsf.util.getClientName() == 'app') {
      xsfBarcode.scan(
        (res) => {
          console.log("scan=>", res);
          //"http://10.0.111.57:8081/DreamWeb/ctrl/noticeQRCode/scan?id=221025142729a5WufrBk3nWsMPzD58Z"
          if (!res.cancelled) {
            doSignIn(res.text.split("id=")[1], vueData);
          }
        },
        (error) => {
          console.log("扫码失败=>", error);
          dsf.layer.toast(`扫码失败`, false);
        }
      )
    } else {
      dsf.layer.toast("请在app中操作", false);
    }
  };
  let doSignIn = function (meetingId, vueData) {
    dsf.http
      .get("fn/meetingAttendance/afterSigning", { meetingId })
      .done(res => {
        if (res.type == "success") {
          dsf.layer.toast("签到成功", true, () => vueData.backSucces());
        } else {
          dsf.layer.toast(res.message, false);
        }
      });
  }
  window.spJS = exportObj;
})();
