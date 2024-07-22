const exportObj = {};
exportObj.subtitleLinkTo = function (item, showMetaColumn, vueData) {
  if(showMetaColumn == 'dw') {
    dsf.http.post('/fn/sbgl/hasChildren', {dwid: item.dataValue.dwid}).then(res => {
      if(res.data.code == 200) {
        vueData.$router.push({
          path: '/commonList?fileType=JSYCsbgl&notLink=1',
          query: {
            secQuery: JSON.stringify({dwid: item.dataValue.dwid, query_year: '', listType: 'list'})
          }
        })
      }
    })
  }else if(showMetaColumn == 'jyyg' || showMetaColumn == 'dzyyg') {
    vueData.$router.push({
      path: '/commonList?fileType=JSYCsbglYg&notLink=1',
      query: {
        secQuery: JSON.stringify({dwid: item.dataValue.dwid, flag: showMetaColumn == 'jyyg' ? '1' : '2', isUnit: item.dataValue.isUnit})
      }
    })
  }else if(showMetaColumn == 'jys' || showMetaColumn == 'dzys') {
    vueData.$router.push({
      path: '/commonList?fileType=JSYCsbglQsd&notLink=1',
      query: {
        secQuery: JSON.stringify({dwid: item.dataValue.dwid, flag: showMetaColumn == 'jys' ? '1' : '2', isUnit: item.dataValue.isUnit})
      }
    })
  }
}
export default exportObj;
