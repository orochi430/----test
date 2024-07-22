const exportObj = {};
// 山东烟草通知公告内容字体大小固定
exportObj.initHandle = function (formData, formStruct, vueData) {
  let fontStyle = document.createElement('style')
  let cssRule = `.htmlBox p,.htmlBox span{font-size: 0.32rem !important;}`
  fontStyle.innerHTML = cssRule
  vueData.$el.appendChild(fontStyle)
};

export default exportObj;
