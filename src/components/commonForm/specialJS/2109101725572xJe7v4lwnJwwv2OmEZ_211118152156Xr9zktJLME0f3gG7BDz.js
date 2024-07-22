const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(vueData.allFile)
  vueData.allFile.forEach(item => {
    if (item.attachType != '12') {
      item.canShow = '-1'
    }
  })
}

export default exportObj;
