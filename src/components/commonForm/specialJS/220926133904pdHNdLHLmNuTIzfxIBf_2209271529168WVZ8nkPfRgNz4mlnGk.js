//差旅报销
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("blurBus", function(busObj) {
        if(busObj.metaData.metaId == "C-ERP-CLFBX-SUB-0021"){
            let totalPrice = 0;
            formData.multinfos['220927150511asfYXxu472TVXS2olSp'].rows.forEach((item)=>{
                if(item['C-ERP-CLFBX-SUB-0021']){
                    totalPrice += Number(item['C-ERP-CLFBX-SUB-0021'].value);
                }
            })
            formData.main['220928180243ZH6ap3yXClqnDuQWZJb'].value = totalPrice;
            formData.main['OA-BXAPPLY-0028'].value = dsf.util.amountWords(totalPrice);
        }
    })
}
export default exportObj;