/**
 * 用车申请
 * 公务出差 自动计算 天数
 * A0014
 * A0019
 * focusBus
 *  
 */
(function(){
    const exportObj = {};
    exportObj.initHandle = function(formData,formStruct,vueData){
        let timeData = '';
        let timeData2 = '';
        let day = '';
        vueData.$bus.on("selectDateTime",function (busObj){
            if(busObj.metaData.metaId  == "220905163924TfnYxgQkjzClTPIFV1H" || busObj.metaData.metaId  == "220905164432zxM5FZvQfJdcymH6woK") {
                 if(busObj.metaData.metaId  == "220905163924TfnYxgQkjzClTPIFV1H"){
                     timeData = busObj.value  //开始时间
                 }
                 if(busObj.metaData.metaId  == "220905164432zxM5FZvQfJdcymH6woK"){
                     timeData2 = busObj.value
                 }
                let myDate1 = Date.parse(timeData)  // 开始时间
                let myDate2 = Date.parse(timeData2) // 结束时间

                 if(myDate1 > myDate2 && myDate1 != "" && myDate2 !=""){
                    //dsf.layer.toast("开始时间不能大于开始时间！")
                    if(busObj.metaData.metaId  == "220905163924TfnYxgQkjzClTPIFV1H"){
                        dsf.layer.toast("开始时间不能大于结束时间！")
                        formData.main["220905163924TfnYxgQkjzClTPIFV1H"].value = ""
                        formData.main["220906184353z5fdFPoXB8DX3creHHW"].value = "" 
                    }else if(busObj.metaData.metaId  == "220905164432zxM5FZvQfJdcymH6woK"){
                        dsf.layer.toast("结束时间不能小于开始时间！")
                        formData.main["220905164432zxM5FZvQfJdcymH6woK"].value = ""
                        formData.main["220906184353z5fdFPoXB8DX3creHHW"].value = "" 
                    }
                 }
                 if(myDate1 != "" && myDate2 !="" && myDate1 !=undefined && myDate2 !=undefined && myDate1 < myDate2){
                    let dif = Math.abs(myDate2 - myDate1)
                    day = Math.floor(dif / (1000 * 3600 * 24))+1
                    formData.main["220906184353z5fdFPoXB8DX3creHHW"].value = day  
                 }
                 if(formData.main["220905163924TfnYxgQkjzClTPIFV1H"].value == formData.main["220905164432zxM5FZvQfJdcymH6woK"].value ){
                    formData.main["220906184353z5fdFPoXB8DX3creHHW"].value = 1
                 }
            }
        })
    }
    //导出
    window.spJS = exportObj;
})()