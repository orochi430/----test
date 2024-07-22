const exportObj = {};

exportObj.initHandle=function (formData, formStruct, vueData){
  vueData.$set(formData.main, "B0001", {"value": `${formData.main['B0013'].value.split(" ")[0]}${formData.main['A0011'].value}调换申请`});
  vueData.$bus.on("selectUserBus", function(busObj){
    console.log("busObj.metaData",busObj.metaData);
    if(busObj.metaData.metaId==="C-ZB-ZBDHSQ-0005"){
        console.log("busObj",busObj);
        dsf.http.post('/fn/shiftExchangeController/afterCodeChooseGetDate', {id: busObj.value}).then(res => {
          if(res.data.code == 200) {
            vueData.$set(formData.main, "C-ZB-ZBDHSQ-0006", {"value": res.data.data.startTime});
            vueData.$set(formData.main, "C-ZB-ZBDHSQ-0007", {"value": res.data.data.endTime});
            vueData.$set(formData.main, "B0064", {"value": res.data.data.userId});
          }
        })
    }
});
}

export default exportObj;