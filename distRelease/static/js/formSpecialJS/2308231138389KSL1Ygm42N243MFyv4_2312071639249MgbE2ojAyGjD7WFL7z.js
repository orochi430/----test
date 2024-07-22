// 一体化财政局 直属单位收文
;(function () {
  const exportObj = {}
  // 不填意见发送
  exportObj.custom1 = function (formData, formStruct, vueData) {
    vueData.alreadyWriteOpintion = true
    vueData.isShowWriteOpintionBtn = true
    vueData.btnAction("send")
  }
  // 再次拟办
  exportObj.CZJREPROPOSE = function (formData, formStruct, vueData) {
    dsf.layer.confirm(
      {
        title: "再次拟办原因",
        message: '<textarea rows="5" id="failReason" placeholder="请填写再次拟办原因" class="van-field__control" style="border: 1px solid #ddd; padding: 6px"></textarea>'
      },
      () => {
        vueData.$set(formData.main, "C-LW-0020", { value: document.getElementById("failReason").value })
        vueData.nowButtonParameters.nextLineId = "CoOLUFpV4QMI2ZO"
        vueData.alreadyWriteOpintion = true
        vueData.isShowWriteOpintionBtn = true
        vueData.btnAction("send")
      },
      () => {}
    )
  }
  // 退回市局拟办
  exportObj.custom2 = function (formData, formStruct, vueData) {
    dsf.layer.confirm(
      {
        title: "再次拟办原因",
        message: '<textarea rows="5" id="failReason" placeholder="请填写原因" class="van-field__control" style="border: 1px solid #ddd; padding: 6px"></textarea>'
      },
      () => {
        dsf.layer.loading()
        let reason = document.getElementById("failReason").value
        dsf.http.Axios.post(
          dsf.url.getWebPath("ctrl/zsdwsw/callback/sendJswZcnb"),
          {
            id: vueData.formMeta.parameters.pk,
            reason: reason
          },
          {
            headers: {
              "x-auth-token": dsf.util.loadSessionStore("loginToken"),
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        ).then(res => {
          dsf.layer.clear()
          if (res.data.code == 200) {
            dsf.layer.toast("操作成功")
            vueData.backSucces()
          } else {
            dsf.layer.toast(res.data.message)
          }
        })
      },
      () => {}
    )
  }
  exportObj.afterEndInstance = function (vueData) {
    dsf.http.post('fn/zsdwsw/callback/enforceEndSourceNode', { pk: vueData.pk }).then(res => {
      dsf.layer.toast("操作成功", true, () => vueData.backSucces());
    })
  }
  window.spJS = exportObj
})()
