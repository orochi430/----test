// 【济南市委党校】移动端 年度支出预算表 合计根据政府采购金额 字段 自动算出 
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function setTotal() {
      let total=0;
      formData.multinfos['221212132610XdJpZMdQvU1kBNRD5hT'].rows.forEach(item=>{
              if(item["C-ERP-PAYCOST-0009"].value){
                  total=accAdd(total,Number(item["C-ERP-PAYCOST-0009"].value))
              }
          })
          
          vueData.$set(formData.main, "B0025", { value: +total.toFixed(2) })
    }
    vueData.$bus.on("blurBus",function(busObj){
      if(busObj.metaData.metaId=="C-ERP-PAYCOST-0009" && busObj.subFormId=="221212132610XdJpZMdQvU1kBNRD5hT"){
          setTotal();
      }
      
    })
    vueData.$bus.on("subFormDelete", function() {
      setTotal();
    });
  }
  function accAdd(arg1,arg2){ 
      var r1,r2,m; 
      try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
      try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
      m=Math.pow(10,Math.max(r1,r2)) 
      return (arg1*m+arg2*m)/m 
      } 
  window.spJS = exportObj;
})();
