/**
 * 上饶市 差旅申请表
 */
(function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        if(formData.main['A0040'].value == '拟稿中'){
            let arrValue = []
            dsf.http.post("ctrl/ccsq/getEntityByUserId").then(({data})=>{
                data.data.map(function (item,index){
                    let str ={
                        text:item.ccsy,
                        value:index+1
                    }
                    arrValue.push(str)
                })
                vueData.formMeta.controls[1].enumData = arrValue 
            })
        }
        vueData.$bus.on("checkVal",function (busObj){
                if(busObj.metaData.metaId == 'C-QT-CUSTOM-0025'){
                    dsf.http.post("ctrl/ccsq/getEntityByUserId").then(({data})=>{
                        data.data.forEach(item =>{
                            if(item.ccsy == busObj.text){
                                vueData.formData.main['C-QT-CUSTOM-0021'].value = item.kssj.substring(0,10)
                                vueData.formData.main['C-QT-CUSTOM-0022'].value = item.jssj.substring(0,10)
                                let day =''; //天数
                                let myDate1 = Date.parse(vueData.formData.main['C-QT-CUSTOM-0021'].value = item.kssj.substring(0,10))
                                let myDate2 = Date.parse(vueData.formData.main['C-QT-CUSTOM-0022'].value = item.jssj.substring(0,10))
                                let dif = Math.abs(Number(myDate2) - Number(myDate1))
                                day = Math.floor( Number(dif) /(1000 * 3600 * 24))+1
                                vueData.formData.main['C-QT-CUSTOM-0015'].value = day  
                            }
                        })
                    })
                    if(formData.main['C-QT-CUSTOM-0025'].text !=''){
                        formData.main['B0001'].value = formData.main['C-QT-CUSTOM-0025'].text
                    }
                }  
        })
        
    }

    window.spJS = exportObj;
})()