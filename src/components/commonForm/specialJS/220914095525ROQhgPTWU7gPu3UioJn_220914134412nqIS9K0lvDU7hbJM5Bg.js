const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  let beginDate = '';
  let endDate = '';
  if(formStruct.parameters.nodeId=='0'){
        vueData.$bus.on("selectDateTime", function(busObj) {
            if(busObj.metaData.metaId == "C-LEAVE-0002"){
                beginDate = busObj.value;
            }
            if(busObj.metaData.metaId == "C-LEAVE-0003"){
                endDate = busObj.value;
            }
            if(beginDate&&endDate){
                let days = '';
                days = parseInt((new Date(endDate).getTime()-new Date(beginDate).getTime())/1000/3600/24)+1;
                formData.main['C-LEAVE-0006'].value = days;
            }
        })
    }
}

export default exportObj;