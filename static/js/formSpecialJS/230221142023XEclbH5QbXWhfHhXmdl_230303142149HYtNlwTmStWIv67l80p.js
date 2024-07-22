/**
 * 舟山市委党校
 * 子表自动获取当前时间  重点工作督查移动端
 */
(function (){
    const exportObj = {};

    exportObj.initHandle = function(formData,formStruct,vueData){
        if(vueData.formMeta.parameters.nodeId == 'uCBXDMEBT0pHaR8' || vueData.formMeta.parameters.nodeId == '-2' 
           || vueData.formMeta.parameters.nodeId == 'rhPBX3BtqH0LBID' || vueData.formMeta.parameters.nodeId == '-1'){
            formData.main['230221142104j2eL302OluHR0Q85wXs'].value = formData.main['230221142104j2eL302OluHR0Q85wXs'].value + '-01'
           }else{
            formData.main['B0001'].value = formData.main['A0029'].value+formData.main['230221142104j2eL302OluHR0Q85wXs'].value.slice(0,7)+'提交的重点工作督查'
           }
        // if(vueData.formMeta.parameters.nodeId == 'uCBXDMEBT0pHaR8'){
        //     formData.main['230221142104j2eL302OluHR0Q85wXs'].value = formData.main['230221142104j2eL302OluHR0Q85wXs'].value + '-01'
        // }else if(vueData.formMeta.parameters.nodeId == '-2'){
        //    formData.main['230221142104j2eL302OluHR0Q85wXs'].value = formData.main['230221142104j2eL302OluHR0Q85wXs'].value + '-01'
        // }else if(vueData.formMeta.parameters.nodeId == 'rhPBX3BtqH0LBID'){
        //    formData.main['230221142104j2eL302OluHR0Q85wXs'].value = formData.main['230221142104j2eL302OluHR0Q85wXs'].value + '-01'
        // }else if(vueData.formMeta.parameters.nodeId == '-1'){
        //     formData.main['230221142104j2eL302OluHR0Q85wXs'].value = formData.main['230221142104j2eL302OluHR0Q85wXs'].value + '-01' 
        // }else{
        //     formData.main['B0001'].value = formData.main['A0029'].value+formData.main['230221142104j2eL302OluHR0Q85wXs'].value.slice(0,7)+'提交的重点工作督查'
        // }
        //监听子表新增 自动获取时间
        vueData.$bus.on("subFormAdd", function(busObj){
            let timeValue = vueData.formData.main['230221142104j2eL302OluHR0Q85wXs'].value
            let timeYer = timeValue.slice(5,7)
            let timeyers = timeYer.slice(0,1)
            formData.multinfos['2303021944021LGZUick1u8sRhH0LtH'].rows.forEach(item =>{
                if(timeyers == 1){
                    item['2302211403566n4luCcqe3tvoWAI4oL'].value = timeYer + '月' 
                }else{
                    item['2302211403566n4luCcqe3tvoWAI4oL'].value = timeYer.slice(1,2)+'月'
                }
                item['230302095036lQCskxSfiOjZs2fpAMN'].value = timeValue.slice(0,7)
            })
        })
        //监听选择时间
        vueData.$bus.on("selectDateTime", function(busObj){
            let timeValue = vueData.formData.main['230221142104j2eL302OluHR0Q85wXs'].value
            let timeYer = timeValue.slice(5,7)
            let timeyers = timeYer.slice(0,1)
            let timeYers = timeValue.slice(0,7)
            
            formData.multinfos['2303021944021LGZUick1u8sRhH0LtH'].rows.forEach(item =>{
                if(timeyers == 1){
                   item['2302211403566n4luCcqe3tvoWAI4oL'].value = timeYer + '月' 
                }else{
                   item['2302211403566n4luCcqe3tvoWAI4oL'].value = timeYer.slice(1,2)+'月'
                }
                item['230302095036lQCskxSfiOjZs2fpAMN'].value = timeYers.slice(0,7)
                
            })
            formData.main['B0001'].value = formData.main['A0029'].value + timeYers + '提交的重点工作督查'
        })
        
    }

    window.spJS = exportObj;
})()