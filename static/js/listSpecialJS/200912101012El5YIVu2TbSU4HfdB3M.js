(function() {
  const exportObj = {};
  exportObj.dataFilter = function(listData, vueData) {
    listData.forEach(item => {
      if (item.dataValue["A0009"] != "已办结") {
        item.buttons.mainButtons = item.buttons.mainButtons.filter(
          ele => ele.action != "XJxiaojia"
        );
      }
    });
  };
  exportObj.XJxiaojia = function(itemValue, vueData) {
    dsf.http.post(`/fn/leave/report?pk=${itemValue.dataValue["A0001"]}`).then((res) => {
      vueData.$router.push({
        path: `/commonForm/221008093611s29Y1grbgGm1LSmwABT/${res.data.data}`
      });
    })
  };
  window.spListJS = exportObj;
})();
