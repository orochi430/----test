/** 
 * 上海地产  房源确认单
*/
(function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData){
        dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
            if(data.code == '200'){
                if(data.data.zjj == false){
                    formData.multinfos['220515200738rHRfGXihfmSwDNGCPk4'].rows[0]['c-res-space-101'].value = '*'
                }
            }
        })
    }

    window.spJS = exportObj;
})()