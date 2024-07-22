(function() {
  const exportObj = {};
  exportObj.link = function () {}
  exportObj.subtitleLinkTo = function(item, showMetaColumn, vueData) {
    if (item.dataValue.dw != "合计") {
      let arr = ["msgCount","checkCount","inCheckCount","closeCount","noCloseCount","inCheckAllCount","checkIdenticalCount","checkNoIdenticalCount"];
      if (showMetaColumn == "dw") {
        dsf.http.post("/fn/sbgl/hasChildren", { dwid: item.dataValue.dwid }).then(res => {
            if (res.data.code == 200) {
              vueData.$router.push({
                path: "/commonList?fileType=JSYCwcltj&notLink=1",query: {
                  secQuery: JSON.stringify({
                    dwid: item.dataValue.dwid,
                    query_year: "",
                    listType: "list",
                    isUnit: item.dataValue.isUnit
                  })
                }
              });
            }
          });
      } else if (arr.indexOf(showMetaColumn) != -1) {
        vueData.$router.push({path: "/commonList?fileType=JSYCwcltjXx&notLink=1",query: {
            secQuery: JSON.stringify({
              dwid: item.dataValue.dwid,
              type: arr.indexOf(showMetaColumn)
            })
          }
        });
      }
    }
  };
  window.spListJS = exportObj;
})();
