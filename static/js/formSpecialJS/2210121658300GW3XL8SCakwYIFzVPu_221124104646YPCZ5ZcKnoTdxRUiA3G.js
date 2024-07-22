/**
 * 上饶 物资入库
 */

 (function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        let ArrValue =[];
        let specificationValue = [];
        let ItemValue =[];
        let unitValue =[];
        let brandValue =[];
       
        vueData.$bus.on("checkVal",function(busObj){
            console.log(busObj);
            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0026'){
                if(formData.main['C-QT-CUSTOM-0026'].text != ''){
                    const specification ={
                        codeVal:formData.main['C-QT-CUSTOM-0026'].value 
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getData",specification).then(({data})=>{
                        data.data.map(function(item,index){
                            let str ={
                                text :item[0],
                                value:item[1],
                            }
                            specificationValue.push(str)
                            console.log(specificationValue);
                        })
                        vueData.formData.main['C-QT-CUSTOM-0031'].text = data.data[0][0]
                        vueData.formData.main['C-QT-CUSTOM-0031'].value = data.data[0][1]
                         if(vueData.formData.main['C-QT-CUSTOM-0031'].value != ''){
                            const Item ={
                                codeVal:formData.main['C-QT-CUSTOM-0031'].value 
                            }
                        dsf.http.post("/ctrl/LinkageMenu/getData",Item).then(({data})=>{
                            data.data.map(function(item,index){
                                let str ={
                                    text :item[0],
                                    value:item[1],
                                }
                                ItemValue.push(str)
                            })
                            vueData.formData.main['C-QT-CUSTOM-0027'].text = data.data[0][0]
                            vueData.formData.main['C-QT-CUSTOM-0027'].value = data.data[0][1]
                            if(formData.main['C-QT-CUSTOM-0027'].text != ''){
                                const unit ={
                                    codeVal:formData.main['C-QT-CUSTOM-0027'].value 
                                }
                            dsf.http.post("/ctrl/LinkageMenu/getData",unit).then(({data})=>{
                                data.data.map(function(item,index){
                                    let str ={
                                        text :item[0],
                                        value:item[1],
                                    }
                                    unitValue.push(str)
                                })
                                vueData.formData.main['C-QT-CUSTOM-0025'].text = data.data[0][0]
                                vueData.formData.main['C-QT-CUSTOM-0025'].value = data.data[0][1]
                                if(vueData.formData.main['C-QT-CUSTOM-0025'].text != ''){
                                    const brand ={
                                        codeVal:formData.main['C-QT-CUSTOM-0025'].value 
                                    }
                                    dsf.http.post("/ctrl/LinkageMenu/getData",brand).then(({data})=>{
                                        data.data.map(function(item,index){
                                            let str ={
                                                text :item[0],
                                                value:item[1],
                                            }
                                            brandValue.push(str)
                                        })
                                        vueData.formData.main['C-QT-CUSTOM-0030'].text = data.data[0][0]
                                        vueData.formData.main['C-QT-CUSTOM-0030'].value = data.data[0][1]
                                    })
                                }
                            })
                        } 
                        })
                        }
                    })
                   
                }
                specificationValue = []
                vueData.formMeta.controls[3].enumData = specificationValue
                ItemValue =[]
                vueData.formMeta.controls[6].enumData =ItemValue
                unitValue =[]
                vueData.formMeta.controls[5].enumData =unitValue
                brandValue =[]
                vueData.formMeta.controls[9].enumData =brandValue
            }

            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0031'){
                if(vueData.formData.main['C-QT-CUSTOM-0031'].value != ''){
                    const Item ={
                        codeVal:formData.main['C-QT-CUSTOM-0031'].value 
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getData",Item).then(({data})=>{
                        data.data.map(function(item,index){
                            let str ={
                                text :item[0],
                                value:item[1],
                            }
                            ItemValue.push(str)
                        })
                        vueData.formData.main['C-QT-CUSTOM-0027'].text = data.data[0][0]
                        vueData.formData.main['C-QT-CUSTOM-0027'].value = data.data[0][1]
                        if(formData.main['C-QT-CUSTOM-0027'].text != ''){
                            const unit ={
                                codeVal:formData.main['C-QT-CUSTOM-0027'].value 
                            }
                        dsf.http.post("/ctrl/LinkageMenu/getData",unit).then(({data})=>{
                            data.data.map(function(item,index){
                                let str ={
                                    text :item[0],
                                    value:item[1],
                                }
                                unitValue.push(str)
                            })
                            vueData.formData.main['C-QT-CUSTOM-0025'].text = data.data[0][0]
                            vueData.formData.main['C-QT-CUSTOM-0025'].value = data.data[0][1]
                            if(vueData.formData.main['C-QT-CUSTOM-0025'].text != ''){
                                const brand ={
                                    codeVal:formData.main['C-QT-CUSTOM-0025'].value 
                                }
                                dsf.http.post("/ctrl/LinkageMenu/getData",brand).then(({data})=>{
                                    data.data.map(function(item,index){
                                        let str ={
                                            text :item[0],
                                            value:item[1],
                                        }
                                        brandValue.push(str)
                                    })
                                    vueData.formData.main['C-QT-CUSTOM-0030'].text = data.data[0][0]
                                    vueData.formData.main['C-QT-CUSTOM-0030'].value = data.data[0][1]
                                })
                            }
                        })
                        } 
                    })
                    ItemValue =[]
                    vueData.formMeta.controls[6].enumData =ItemValue
                    unitValue =[]
                    vueData.formMeta.controls[5].enumData =unitValue
                    brandValue =[]
                    vueData.formMeta.controls[9].enumData =brandValue
                }
            }

            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0027'){
                if(formData.main['C-QT-CUSTOM-0027'].text != ''){
                    const unit ={
                        codeVal:formData.main['C-QT-CUSTOM-0027'].value 
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getData",unit).then(({data})=>{
                        data.data.map(function(item,index){
                            let str ={
                                text :item[0],
                                value:item[1],
                            }
                            unitValue.push(str)
                        })
                        vueData.formData.main['C-QT-CUSTOM-0025'].text = data.data[0][0]
                        vueData.formData.main['C-QT-CUSTOM-0025'].value = data.data[0][1]
                        if(vueData.formData.main['C-QT-CUSTOM-0025'].text != ''){
                            const brand ={
                                codeVal:formData.main['C-QT-CUSTOM-0025'].value 
                            }
                            dsf.http.post("/ctrl/LinkageMenu/getData",brand).then(({data})=>{
                                data.data.map(function(item,index){
                                    let str ={
                                        text :item[0],
                                        value:item[1],
                                    }
                                    brandValue.push(str)
                                })
                                vueData.formData.main['C-QT-CUSTOM-0030'].text = data.data[0][0]
                                vueData.formData.main['C-QT-CUSTOM-0030'].value = data.data[0][1]
                            })
                        }
                    })
                    unitValue =[]
                    vueData.formMeta.controls[5].enumData =unitValue
                    brandValue =[]
                    vueData.formMeta.controls[9].enumData =brandValue
                } 
            }
           
        })
        
        
    }

    exportObj.saveFilter = function (formData, formStruct, vueData, action) {
        const pams = {
            lb:formData.main['C-QT-CUSTOM-0026'].text,
            mc:formData.main['C-QT-CUSTOM-0031'].text,
            xh:formData.main['C-QT-CUSTOM-0027'].text,
            pp:formData.main['C-QT-CUSTOM-0030'].text,
            dw:formData.main['C-QT-CUSTOM-0025'].text,
            sl:formData.main['C-QT-CUSTOM-0005'].value,
            dd:formData.main['C-QT-CUSTOM-0002'].value
        }
        return new Promise((resolve, reject) => {
            dsf.http.post("/ctrl/rk/saveToWZGL",pams).then(({data})=>{
            console.log(data);
            if(data.message == '操作成功'){
                resolve()
            }else{
                reject('出库失败!')
            }
          })
        })
    }

    window.spJS = exportObj;
})()