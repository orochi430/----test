//财务报销
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("blurBus", function(busObj) {
        if(busObj.metaData.metaId == "C-ERP-CLFBX-SUB-0021"){
            let totalPrice = 0;
            formData.multinfos['220926142511FYM2CXMBYFFVQhiGw2O'].rows.forEach((item)=>{
                if(item['C-ERP-CLFBX-SUB-0021']){
                    totalPrice += Number(item['C-ERP-CLFBX-SUB-0021'].value);
                }
            })
            formData.main['220928175128hQaAeEmpjQJorjwlI7i'].value = totalPrice;
            formData.main['OA-BXAPPLY-0020'].value = dsf.util.amountWords(totalPrice);
        }
    })
}
export default exportObj;