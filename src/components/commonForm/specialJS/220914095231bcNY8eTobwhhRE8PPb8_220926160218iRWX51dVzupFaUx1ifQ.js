const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  let beginDate = '';
  let endDate = '';
  if(formStruct.parameters.nodeId=='0'){
        vueData.$bus.on("selectDateTime", function(busObj) {
            if(busObj.metaData.metaId == "C-OUTMANAGE-0001"){
                beginDate = busObj.value;
            }
            if(busObj.metaData.metaId == "C-OUTMANAGE-0002"){
                endDate = busObj.value;
            }
            if(beginDate&&endDate){
                let days = '';
                days = parseInt((new Date(endDate).getTime()-new Date(beginDate).getTime())/1000/3600/24)+1;
                formData.main['C-OUTMANAGE-0014'].value = days;
            }
        })
    }
    vueData.$bus.on("blurBus", function(busObj) {
        if(busObj.metaData.metaId == "C-ERP-CLFBX-SUB-0021"){
            let totalPrice = 0;
            formData.multinfos['220914102629x64f2xhmspcuOaGPEK3'].rows.forEach((item)=>{
                if(item['C-ERP-CLFBX-SUB-0021']){
                    totalPrice += Number(item['C-ERP-CLFBX-SUB-0021'].value);
                }
            })
            formData.main['220914102654ul9aovt5UXyaygCbYkT'].value = totalPrice;
            formData.main['220914112554SAo5vC9iPsg65IXR2PT'].value = dsf.util.amountWords(totalPrice);
        }
    })
}
export default exportObj;