// 【济南市委党校】移动端 周开支汇总 部门合计 根据 金额自动算出
(function() {
  const exportObj = {};

  exportObj.initHandle = function(formData, formStruct, vueData) {
    function setTotal() {
      let total = 0;
      formData.multinfos["221216152310HukS3Enz00t3k71qHxX"].rows.forEach(
        item => {
          if (item["C-ERP-PAYCOST-0012"].value) {
            total = accAdd(total, Number(item["C-ERP-PAYCOST-0012"].value));
          }
        }
      );
      vueData.$set(formData.main, "C-FINANCE-0006", {
        value: Number(total.toFixed(2))
      });
    }
    vueData.$bus.on("subFormSelect", function(busObj) {
      let pks = [];
      for (
        let index = 0;
        index <
        formData.multinfos["221216152310HukS3Enz00t3k71qHxX"].rows.length;
        index++
      ) {
        if (
          !pks.includes(
            formData.multinfos["221216152310HukS3Enz00t3k71qHxX"].rows[index][
              "A001"
            ]?.value
          ) &&
          formData.multinfos["221216152310HukS3Enz00t3k71qHxX"].rows[index]["A001"]
            ?.value
        ) {
          pks.push(
            formData.multinfos["221216152310HukS3Enz00t3k71qHxX"].rows[index][
              "A001"
            ]?.value
          );
        }
      }

      busObj.checkItems = busObj.checkItems.filter(item => {
        return !pks.includes(item.dataValue.A0001);
      });

      let ids = "";
      busObj.checkItems.forEach(item => {
        ids += item.dataValue.A0001 + ",";
      });
      if(busObj.checkItems.length==0)return
      dsf.http.post("ctrl/commontro/getZkzdata", { ids }).then(({ data }) => {
        if (data.code == 200) {
          let sum = 0;
          JSON.parse(data.data).forEach(item => {
            if (vueData.$refs.formTab[0]) {
              vueData.$refs.formTab[0].$refs[
                "221216152310HukS3Enz00t3k71qHxX"
              ][0].$refs.subform
                .addCard(false)
                .then(newData => {
                  //项目名称
                  vueData.$set(newData, "C-ERP-PAYCOST-0062", {
                    value: item["XMMC"]
                  });
                  //事由
                  vueData.$set(newData, "C-ERP-PAYCOST-0058", {
                    value: item["SY"]
                  });
                  //金额
                  vueData.$set(newData, "C-ERP-PAYCOST-0012", {
                    value: item["JE"]
                  });
                  sum = accAdd(sum, Number(item["JE"]));
                  //部处
                  vueData.$set(newData, "C-ERP-PAYCOST-0009", {
                    value: item["BC"]
                  });
                  //联系人
                  vueData.$set(newData, "C-ERP-PAYCOST-0059", {
                    value: item["LSR"]
                  });
                  vueData.$set(newData, "A001", {
                    value: item["FID"]
                  });
                  if (vueData.formData.main["C-FINANCE-0006"].value != "") {
                    vueData.formData.main["C-FINANCE-0006"].value =
                      Number(vueData.formData.main["C-FINANCE-0006"].value) +
                      Number(sum.toFixed(2));
                  } else {
                    vueData.formData.main["C-FINANCE-0006"].value = Number(
                      sum.toFixed(2)
                    );
                  }
                });
            }
          });
        }
      });
    });
    vueData.$bus.on("blurBus", function(busObj) {
      if (
        busObj.metaData.metaId == "C-ERP-PAYCOST-0012" &&
        busObj.subFormId == "221216152310HukS3Enz00t3k71qHxX"
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
