// 【济南市委党校】移动端 三年支出规划 合计金额根据三年支出合计自动算出
(function() {
  const exportObj = {};
  exportObj.initHandle = function(formData, formStruct, vueData) {
    function setTotal(busObj) {
      let total = 0;
        let tmpObj =
          formData.multinfos["22121210342867jpVqC5ize8jE0wc1r"].rows[
            busObj.subFormIndex
          ];
          if(!tmpObj){
            let sum = 0;
            formData.multinfos["22121210342867jpVqC5ize8jE0wc1r"].rows.forEach(
              item => {
                sum += Number(item["C-ERP-PAYCOST-0033"].value);
              }
            );
            formData.main["C-EXPENDITURE-0001"].value = +sum.toFixed(2);
          }
        if (tmpObj["C-ERP-PAYCOST-0062"].value) {
          total = accAdd(total, Number(tmpObj["C-ERP-PAYCOST-0062"].value));
        }
        if (tmpObj["C-ERP-PAYCOST-0051"].value) {
          total = accAdd(total, Number(tmpObj["C-ERP-PAYCOST-0051"].value));
        }
        if (tmpObj["C-ERP-PAYCOST-0052"].value) {
          total = accAdd(total, Number(tmpObj["C-ERP-PAYCOST-0052"].value));
        }
        if (total != 0) {
          tmpObj["C-ERP-PAYCOST-0033"].value = +total.toFixed(2);
          let sum = 0;
          formData.multinfos["22121210342867jpVqC5ize8jE0wc1r"].rows.forEach(
            item => {
              sum += Number(item["C-ERP-PAYCOST-0033"].value);
            }
          );
          formData.main["C-EXPENDITURE-0001"].value = +sum.toFixed(2);
        }
    }
    vueData.$bus.on("blurBus", function(busObj) {
      if (busObj.subFormId == "22121210342867jpVqC5ize8jE0wc1r") {
        setTotal(busObj);
      }
    });
    vueData.$bus.on("subFormDelete", function(busObj) {
      setTotal(busObj);
    });
  };
  function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }
  window.spJS = exportObj;
})();
