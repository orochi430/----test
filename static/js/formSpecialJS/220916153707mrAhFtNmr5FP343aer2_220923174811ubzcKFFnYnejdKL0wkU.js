// 【济南市委党校】移动端 周开支计划 部门合计 根据 金额自动算出
(function () {
    const exportObj = {};
    
    exportObj.initHandle = function (formData, formStruct, vueData) {
      function setTotal() {
        let total=0;
            formData.multinfos['221109105519RvZ0rD6o1OJqg3hL4H0'].rows.forEach(item=>{
                if(item["OA-CW-XMXX-0001"].value){
                    total=accAdd(total,Number(item["OA-CW-XMXX-0001"].value))
                }
            })
            vueData.$set(formData.main, "C-FINANCE-0004", { value: +total.toFixed(2) })
      }
      vueData.$bus.on("blurBus",function(busObj){
        if(busObj.metaData.metaId=="OA-CW-XMXX-0001" && busObj.subFormId=="221109105519RvZ0rD6o1OJqg3hL4H0"){
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