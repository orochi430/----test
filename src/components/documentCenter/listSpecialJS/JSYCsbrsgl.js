const exportObj = {};
exportObj.subtitleLinkTo = function (item, showMetaColumn, vueData) {
  if(showMetaColumn == 'dw') {
    dsf.http.post('/fn/sbgl/hasChildren', {dwid: item.dataValue.dwid}).then(res => {
      if(res.data.code == 200) {
        vueData.$router.push({
          path: '/commonList?fileType=JSYCsbrsgl&notLink=1',
          query: {
            secQuery: JSON.stringify({dwid: item.dataValue.dwid, query_year: '', listType: 'list'})
          }
        })
      }
    })
  }else if(showMetaColumn == 'zs' || showMetaColumn == 'sbs' || showMetaColumn == 'wsbs') {
    vueData.$router.push({
      path: '/commonList?fileType=JSYCsbrgl&notLink=1',
      query: {
        secQuery: JSON.stringify({dwid: item.dataValue.dwid, flag: showMetaColumn == 'zs' ? '0' : (showMetaColumn == 'sbs' ? '1' : '2'), isUnit: item.dataValue.isUnit})
      }
    })
  }
}
export default exportObj;
