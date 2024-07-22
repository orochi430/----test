//平台 待办列表时间特殊处理
;(function () {
  const exportObj = {}
  function getDateFieldContent(time) {
    let serverTime = new Date().getTime();
    const itemTime = new Date(time).getTime();
    const diff = parseInt((serverTime - itemTime) / 1000);
    let str = '';
    const level1 = 60,
        level2 = 60 * 60,
        level3 = 60 * 60 * 24,
        level4 = 60 * 60 * 24 * 4;
    if (diff < level1) {
        str = '1分钟内';
    } else if (diff >= level1 && diff < level2) {
        str = `${parseInt(diff / level1)}分钟前`;
    } else if (diff >= level2 && diff < level3) {
        str = `${parseInt(diff / (level2))}小时前`;
    } else if (diff >= level3 && diff < level4) {
        str = `${parseInt(diff / (level3))}天前`;
    } else if (diff >= level4) {
        str = time.split(' ')[0]
    }
    return str;
}
  exportObj.init = function (vueData) {
    if (vueData.data.length) {
      vueData.data.forEach(item => {
        item.dataValue.moduleNameAndNode = item.dataValue.moduleNameAndNode.split("(")[0]
        item.dataValue.time = item.dataValue.arrivalTime
      })
    }
  }
  exportObj.dataFilter = function (listData, vueData) {
    // vueData.columns[1].icon = 'iconleixing'
    // vueData.columns[2].icon = 'iconren'
    // vueData.columns[3].icon = 'iconrili'
    // vueData.columns[4].showCategory = ''
    listData.forEach(item => {
      item.dataValue.moduleNameAndNode = item.dataValue.moduleNameAndNode.split("(")[0]
      item.dataValue.time = item.dataValue.arrivalTime
    })
    // vueData.columns.push({
    //   showCategory: "userTemplate"
    // })
  }
  window.spListJS = exportObj
})()
