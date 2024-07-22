// 【济南市委党校】移动端 零星票据汇总表 合计 根据 金额 自动算出
(function() {
  const exportObj = {};
  exportObj.initHandle = function(formData, formStruct, vueData) {
    function setTotal() {
      let total = 0;
      formData.multinfos["221128173457GFWM69m0mOvGwg7By80"].rows.forEach(
        item => {
          if (item["C-XZ-RECEPTION-0012"].value) {
            total = accAdd(total, Number(item["C-XZ-RECEPTION-0012"].value));
          }
        }
      );
      vueData.$set(formData.main, "C-ERP-PAYCOST-0018", {
        value: dsf.util.amountWords(+total.toFixed(2))
      });
      vueData.$set(formData.main, "C-ERP-PAYCOST-0059", {
        value: +total.toFixed(2)
      });
    }
    vueData.$bus.on("blurBus", function(busObj) {
      if (
        busObj.metaData.metaId == "C-XZ-RECEPTION-0012" &&
        busObj.subFormId == "221128173457GFWM69m0mOvGwg7By80"
      ) {
        setTotal();
      }
    });
    vueData.$bus.on("subFormDelete", function() {
      setTotal();
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
