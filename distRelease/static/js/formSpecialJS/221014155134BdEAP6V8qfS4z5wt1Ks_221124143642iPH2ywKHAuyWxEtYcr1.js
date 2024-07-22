/**
 * 上饶市委党校
 * 物资出库
 */
(function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        let ArrayValue =[];
        let specificationValue = [];
        let ItemValue =[];
        let unitValue =[];
        let brandValue =[];
        const  param = {
            type: 1
        }
        dsf.http.post("/ctrl/LinkageMenu/getHaveData",param).then(({data})=>{
            data.data.map(function(item,index){
                let str ={
                    text: item,
                    value:index+1
                }
                ArrayValue.push(str)
            })
            vueData.formMeta.controls[2].enumData = ArrayValue
        }) 

        vueData.$bus.on("checkVal",function(busObj){
           if(busObj.metaData.metaId == 'C-QT-CUSTOM-0026'){
               if(vueData.formData.main['C-QT-CUSTOM-0026'].text !=''){
                const  specification ={
                type:2,
                level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text
                } 
                dsf.http.post("/ctrl/LinkageMenu/getHaveData",specification).then(({data})=>{
                    data.data.map(function(item,index){
                        let str ={
                            text: item,
                            value: index+1
                        }
                        specificationValue.push(str)
                        vueData.formData.main["C-QT-CUSTOM-0025"].text = data.data[0]
                        vueData.formData.main["C-QT-CUSTOM-0025"].value = 1

                    })
                if(vueData.formData.main['C-QT-CUSTOM-0025'].text != ''){
                    const ItemName ={
                        type:3,
                        level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                        level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",ItemName).then(({data})=>{
                        data.data.map(function(item,index){
                            let str={
                                text:item,
                                value:index+1
                            }
                            ItemValue.push(str)
                            vueData.formData.main["C-QT-CUSTOM-0027"].text = data.data[0]
                            vueData.formData.main["C-QT-CUSTOM-0027"].value = data.data[0]

                        })
                        if(vueData.formData.main["C-QT-CUSTOM-0027"].text != ''){
                            const unit ={
                                type:4,
                                level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                level3Name:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                            }
                            dsf.http.post("/ctrl/LinkageMenu/getHaveData",unit).then(({data})=>{
                                data.data.map(function(item,index){
                                    let str={
                                        text:item,
                                        value:index+1
                                    }
                                    unitValue.push(str)
                                    vueData.formData.main["C-QT-CUSTOM-0028"].text = data.data[0]
                                    vueData.formData.main["C-QT-CUSTOM-0028"].value = 1
                                })
                                if(vueData.formData.main["C-QT-CUSTOM-0028"].text != ''){
                                    const brand={
                                        type:5,
                                        level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                        level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                        level3Name:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                                        level4Name:vueData.formData.main['C-QT-CUSTOM-0028'].text,
                                    }
                                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",brand).then(({data})=>{
                                        data.data.map(function(item,index){
                                            let str ={
                                                text:item,
                                                value:index+1
                                            }
                                            brandValue.push(str)
                                            vueData.formData.main["C-QT-CUSTOM-0029"].text = data.data[0]
                                            vueData.formData.main["C-QT-CUSTOM-0029"].value = 1
                                        })
                                         const ba={
                                            lb:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                            mc:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                            xh:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                                            dw:vueData.formData.main['C-QT-CUSTOM-0028'].text,
                                            pp:vueData.formData.main['C-QT-CUSTOM-0029'].text,
                                        }
                                        dsf.http.post("/ctrl/wzgl/findAmount",ba).then(({data})=>{
                                            vueData.formData.main['C-QT-CUSTOM-0001'].value = data.data
                                        })
                                    //    
                                    })
                                   
                                }
                            })
                        }
                    })
                }
            })
                specificationValue = []
                vueData.formMeta.controls[5].enumData = specificationValue
                ItemValue = []
                vueData.formMeta.controls[3].enumData = ItemValue
                unitValue = []
                vueData.formMeta.controls[7].enumData = unitValue 
                brandValue = []
                vueData.formMeta.controls[4].enumData = brandValue
               }  

               
           }

            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0025'){
                if(vueData.formData.main['C-QT-CUSTOM-0025'].text != ''){
                    const ItemName ={
                        type:3,
                        level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                        level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",ItemName).then(({data})=>{
                        data.data.map(function(item,index){
                            let str={
                                text:item,
                                value:index+1
                            }
                            ItemValue.push(str)
                            vueData.formData.main["C-QT-CUSTOM-0027"].text = data.data[0]
                            vueData.formData.main["C-QT-CUSTOM-0027"].value = data.data[0]

                        })
                        if(vueData.formData.main["C-QT-CUSTOM-0027"].text != ''){
                            const unit ={
                                type:4,
                                level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                level3Name:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                            }
                            dsf.http.post("/ctrl/LinkageMenu/getHaveData",unit).then(({data})=>{
                                data.data.map(function(item,index){
                                    let str={
                                        text:item,
                                        value:index+1
                                    }
                                    unitValue.push(str)
                                    vueData.formData.main["C-QT-CUSTOM-0028"].text = data.data[0]
                                    vueData.formData.main["C-QT-CUSTOM-0028"].value = 1
                                })
                                if(vueData.formData.main["C-QT-CUSTOM-0028"].text != ''){
                                    const brand={
                                        type:5,
                                        level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                        level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                        level3Name:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                                        level4Name:vueData.formData.main['C-QT-CUSTOM-0028'].text,
                                    }
                                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",brand).then(({data})=>{
                                        data.data.map(function(item,index){
                                            let str ={
                                                text:item,
                                                value:index+1
                                            }
                                            brandValue.push(str)
                                            vueData.formData.main["C-QT-CUSTOM-0029"].text = data.data[0]
                                            vueData.formData.main["C-QT-CUSTOM-0029"].value = 1
                                        }) 
                                        const ba={
                                            lb:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                            mc:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                            xh:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                                            dw:vueData.formData.main['C-QT-CUSTOM-0028'].text,
                                            pp:vueData.formData.main['C-QT-CUSTOM-0029'].text,
                                        }
                                        dsf.http.post("/ctrl/wzgl/findAmount",ba).then(({data})=>{
                                            vueData.formData.main['C-QT-CUSTOM-0001'].value = data.data
                                        })  
                                    })
                                }
                            })
                        }
                    })
                    ItemValue = []
                    vueData.formMeta.controls[3].enumData = ItemValue
                    unitValue = []
                    vueData.formMeta.controls[7].enumData = unitValue 
                    brandValue = []
                    vueData.formMeta.controls[4].enumData = brandValue
                }
            }
            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0027'){
                if(vueData.formData.main["C-QT-CUSTOM-0027"].text != ''){
                    const unit ={
                        type:4,
                        level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                        level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                        level3Name:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",unit).then(({data})=>{
                        data.data.map(function(item,index){
                            let str={
                                text:item,
                                value:index+1
                            }
                            unitValue.push(str)
                            vueData.formData.main["C-QT-CUSTOM-0028"].text = data.data[0]
                            vueData.formData.main["C-QT-CUSTOM-0028"].value = 1
                        })
                        // unitValue =[]
                        // vueData.formMeta.controls[7].enumData = unitValue
                        if(vueData.formData.main["C-QT-CUSTOM-0028"].text != ''){
                            const brand={
                                type:5,
                                level1Name:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                level2Name:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                level3Name:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                                level4Name:vueData.formData.main['C-QT-CUSTOM-0028'].text,
                            }
                            dsf.http.post("/ctrl/LinkageMenu/getHaveData",brand).then(({data})=>{
                                data.data.map(function(item,index){
                                    let str ={
                                        text:item,
                                        value:index+1
                                    }
                                    brandValue.push(str)
                                    vueData.formData.main["C-QT-CUSTOM-0029"].text = data.data[0]
                                    vueData.formData.main["C-QT-CUSTOM-0029"].value = 1
                                })
                                const ba={
                                    lb:vueData.formData.main['C-QT-CUSTOM-0026'].text,
                                    mc:vueData.formData.main['C-QT-CUSTOM-0025'].text,
                                    xh:vueData.formData.main['C-QT-CUSTOM-0027'].text,
                                    dw:vueData.formData.main['C-QT-CUSTOM-0028'].text,
                                    pp:vueData.formData.main['C-QT-CUSTOM-0029'].text,
                                }
                                dsf.http.post("/ctrl/wzgl/findAmount",ba).then(({data})=>{
                                    vueData.formData.main['C-QT-CUSTOM-0001'].value = data.data
                                })
                            //    
                            })
                        }
                    })
                    unitValue = []
                    vueData.formMeta.controls[7].enumData = unitValue 
                    brandValue = []
                    vueData.formMeta.controls[4].enumData = brandValue
                }
            }
        })
        
        
    }

    exportObj.saveFilter = function (formData, formStruct, vueData, action) {
        const pams = {
            mc:formData.main['C-QT-CUSTOM-0025'].text,
            xh:formData.main['C-QT-CUSTOM-0027'].text,
            dw:formData.main['C-QT-CUSTOM-0028'].text,
            lb:formData.main['C-QT-CUSTOM-0026'].text,
            pp:formData.main['C-QT-CUSTOM-0029'].text,
            sl:formData.main['C-QT-CUSTOM-0005'].value,
            pk:vueData.formParams.pk,
        }
        return new Promise((resolve, reject) => {
            dsf.http.post("/ctrl/ck/ck",pams).then(({data})=>{
            console.log(data);
            if(data.message == '操作成功'){
                resolve('出库成功!')
            }else{
                reject('出库失败')
            }
          })
        })
    }

    window.spJS = exportObj;
})()