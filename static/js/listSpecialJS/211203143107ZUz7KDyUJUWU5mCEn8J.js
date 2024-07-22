;(function () {
  const exportObj = {}
  exportObj.dataFilter = function (listData, vueData) {
    console.log('js调用了')
    listData.forEach((item) => {
      switch (item.dataValue['C-R-SEND-0010.value']) {
        case '0':
          item.dataValue['C-R-SEND-0010'] = '未签收'
          break
        // case '1':
        //   item.dataValue['C-R-SEND-0010'] = '部分签收'
        //   break
        case '1':
          item.dataValue['C-R-SEND-0010'] = '已签收'
          break
        case '-2':
          item.dataValue['C-R-SEND-0010'] = '已回收'
          break
        // case '-1':
        //   item.dataValue['C-R-SEND-0010'] = '退回'
        //   break
        default:
            if(!String(item.dataValue['C-R-SEND-0010.value'])) {
                item.dataValue['C-R-SEND-0010'] = '未签收'
            }
          break
      }
    })
    console.log(listData)
  }
  window.spListJS = exportObj
})()
