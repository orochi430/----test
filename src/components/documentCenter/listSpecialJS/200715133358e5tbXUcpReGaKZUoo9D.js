const exportObj = {};
// 江西府办进行上一个节点判断跳转到指定查看节点
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  dsf.http.post('ctrl/wdct/checkClean', {
    pk: pk,
    pnid: itemValue['inbox.S-BASE-0001']
  }).then(res => {
    if(res.data.message == 'false') {
      // 需传对应模块的listid，列表项上无法通过配置返回
      let listId = listid
      switch(moduleId) {
        case '2012101418089O5CTabPvP6g5XF24ET':
          listId = '201210141808bbdgrKcFKssDfHDVaAC'
          break
        case '200715104703uowNRLyY9jeo5chSWDT':
          listId = '2012171844572iUSI5nLh84d6pLlkrc'
          break
        default:
          break
      }
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}`,
        query: {
          listId: listId,
          method: 'mobileview',
          pnId: itemValue['inbox.S-BASE-0001']
        }
      })
    } else {
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}?listId=${listid}`,
      })
    }
  })
  
}
export default exportObj;
