/**
 * 中共凉山州委党校  特殊弹窗功能
 * 匿名函数自执行
 */
(function(){
    
    const exportObj = {};
  
    exportObj.initHandle = function(formData,formStruct,vueData){
        vueData.$bus.on("focusBus", function (busObj) {
            //进入弹窗   直接使用  buttonHandle .js 里面 componentName 
            // console.log(formData);
            console.log(busObj);
            // off("focusBus")
            if(busObj.metaData.metaId == "B0001"){
                vueData.componentName = "vehicleDialog"
            }
        })
        vueData.$bus.on("blurBus", function (busObj) {
        })
    } 
     exportObj.closeDialogCallback = function(data,actionName, formData,formMeta, vueData) {
        // console.log(data,'**');
        // console.log(formData,'-----');
        formData.main['B0001'].value = String(data)
    }
    //导出
    window.spJS = exportObj;
})()