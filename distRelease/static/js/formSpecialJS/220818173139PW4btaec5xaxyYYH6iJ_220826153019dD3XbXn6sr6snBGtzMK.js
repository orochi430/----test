
/**
 * 上饶市 自动计算天数
 */
(function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        let timeData =''; //开始时间
        let timeData2 = ''; //结束时间
        let day =''; //天数
        vueData.$bus.on("selectDateTime",function (busObj){
            if(busObj.metaData.metaId == 'C-QJSQ-LEAVE-005'){
                timeData = busObj.value
            }
            if(busObj.metaData.metaId == 'C-QJSQ-LEAVE-006'){
                timeData2 =busObj.value
            }
            let myDate1 = Date.parse(timeData)
            let myDate2 = Date.parse(timeData2)
            if(myDate1 > myDate2 && myDate1 != '' && myDate2 !=''){
                if(busObj.metaData.metaId == 'C-QJSQ-LEAVE-005'){
                    dsf.layer.toast("开始时间不能小于结束时间!")
                    formData.main['C-QJSQ-LEAVE-005'].value = ''
                }else if(busObj.metaData.metaId == 'C-QJSQ-LEAVE-006'){
                    dsf.layer.toast("结束时间不能小于开始时间!")
                    formData.main['C-QJSQ-LEAVE-006'].value = ''
                }
            }
        
            if(vueData.formData.main['C-QJSQ-LEAVE-005'].value !='' && vueData.formData.main['C-QJSQ-LEAVE-006'].value !=''){
                let dif = Math.abs(Number(myDate2) - Number(myDate1))
                day = Math.floor( Number(dif) /(1000 * 3600 * 24))+1
                formData.main['C-QJSQ-LEAVE-009'].value = day  
            }
        })

    }

    window.spJS = exportObj;
})()