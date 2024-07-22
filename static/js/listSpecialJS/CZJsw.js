;(function () {
  const exportObj = {}
  exportObj.dataFilter = function (listData, vueData) {
    if (dsf.util.loadSessionStore("user").privileges.some(item => item.id == '231215175007OfCqXbBlZGmrxsnSzmL')) {
      vueData.listButtons.mainButtons = [{action: 'batchSend', name: '批量办理'}]
    }
  }
  window.spListJS = exportObj
})()
