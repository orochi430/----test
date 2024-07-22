const exportObj = {};
// 山东烟草通知公告内容字体大小固定
exportObj.initHandle = function (formData, formStruct, vueData) {
  let fontStyle = document.createElement('style')
  let cssRule = `.htmlBox p,.htmlBox span{font-size: 0.32rem !important;}`
  fontStyle.innerHTML = cssRule
  vueData.$el.appendChild(fontStyle)
};

//江西通知公告特殊js  
exportObj.noticeSendEndMobile = function (formData, metaData,  vueData) {
  let url="fn/flowSendVoApi/noticeSendEndMobile?pk="+vueData.formParams.pk
  vueData.saveNoTip(() => {
    dsf.http.post(url).then(response => {
      let res = response.data
      if (res.code == '200') {
        dsf.layer.toast("审批通过", true, () => {
          vueData.backSucces()
        })
      }
    })
  })
}
export default exportObj;
