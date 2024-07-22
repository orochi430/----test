// 【中共徐州市委党校OA】人事系统--月工作纪实模块
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  let controlsAll = formStruct.controls
  function setShow (text, matchArr) {
    controlsAll.forEach(item => {
      if(item.defaultValue.value) {
        if(item.defaultValue.value.indexOf(text) != -1) {item.show = 1}
         else {
          matchArr.forEach(ele => {
            if(item.defaultValue.value.indexOf(`${ele}月份`) == 0) {item.show = 1}
           })
          }
        }
     })
  }
  function emptyShow () {
    controlsAll.forEach(item => {
      if(item.defaultValue.value) {
        if(item.defaultValue.value.indexOf("完成情况或进度") != -1 || item.defaultValue.value.indexOf("工作小结") != -1 || item.defaultValue.value.indexOf("工作纪实") != -1) {
          item.show = 0
        }
      }
    })
  }
  function chooseQuarter(text) {
    if(text == "一季度") {
      setShow(text,['一','二','三'])
    } else if (text == "二季度") {
      setShow(text,['四','五','六'])
    } else if (text == "三季度") {
      setShow(text,['七','八','九'])
    } else if (text == "四季度") {
      setShow(text,['十','十一','十二'])
    }
  }

  // 初始化数据
  emptyShow()
  chooseQuarter(formData.main["B0056"].text)

  vueData.$bus.on("checkVal",function(busObj){
    emptyShow()
    chooseQuarter(busObj.text)
  })
}

export default exportObj