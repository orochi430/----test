(function (){

    const exportObj = {};

        exportObj.initHandle = function (formData, formStruct, vueData) {
            let params ={
                infoId:formStruct.parameters.pk,
                type:0
            }
            dsf.http.post("fn/informationDataController/updReadStatus",params).then((data)=>{
                console.log(data);
            })
            vueData.$bus.emit("commonListValue", formStruct.parameters.pk) 
        }

        exportObj.custom1 = function(formData, formStruct, vueData){
            vueData.componentName = 'instructionsDialog'
        }
        
        exportObj.closeDialogCallback = function(data,actionName, formData,formMeta, vueData) {
        }

        
        
    window.spJS = exportObj;

})()