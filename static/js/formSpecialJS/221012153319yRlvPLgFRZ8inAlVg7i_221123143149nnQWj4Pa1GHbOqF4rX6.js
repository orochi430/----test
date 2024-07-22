/**
 * 上饶市委党校
 */

// import qs from 'qs'
(function (){
    const exportObj = {};
    let script = document.createElement('script');
        script.type = "text/javascript";
        script.src = 'http://cdn.bootcdn.net/ajax/libs/qs/6.9.3/qs.min.js';
        document.body.appendChild(script);
    
    exportObj.initHandle = function (formData, formStruct, vueData) {
       let ArrayValue =[];
       let specificationValue = [];
       let ItemValue =[];
       let unitValue =[];
       let brandValue =[];
       //监听下拉选择事件
       vueData.$bus.on("checkVal",function(busObj){
           let subFormIndex = busObj.subFormIndex
            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0025'){
               if(formData.multinfos['221012160905ldKL8LavIrVwCL8dhY3'].rows[subFormIndex]['C-QT-CUSTOM-0025'].text != ''){
                let specification ={
                    type:2,
                    level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text
                }
                dsf.http.post("/ctrl/LinkageMenu/getHaveData",specification).then(({data})=>{
                data.data.map(function (item,index){
                    let str ={
                        text:item,
                        value:index+1
                    }
                    specificationValue.push(str)
                })
                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text = data.data[0]
                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].value = 1
                //***************** */
                if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text != ''){
                let ItemName ={
                type:3,
                level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
               }
                dsf.http.post("/ctrl/LinkageMenu/getHaveData",ItemName).then(({data})=>{
                    data.data.map(function (item,index){
                         let str ={
                             text:item,
                             value:index+1
                         }
                         ItemValue.push(str)
                    })
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text = data.data[0]
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].value = 1
                    //***************** */
                   if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text != ''){
                    let unit = {
                        type:4,
                        level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                        level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                        level3Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text,
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",unit).then(({data})=>{
                        data.data.map(function (item,index){
                            let str ={
                                text:item,
                                value:index+1
                            }
                            unitValue.push(str)
                        })
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text = data.data[0]
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].value = 1
                    if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text != ''){
                        let brand ={
                            type:5,
                            level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                            level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                            level3Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text,
                            level4Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text,
                        }
                        dsf.http.post("/ctrl/LinkageMenu/getHaveData",brand).then(({data})=>{
                            data.data.map(function (item,index){
                                let str ={
                                    text:item,
                                    value:index+1
                                }
                                brandValue.push(str)
                                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0029'].text = data.data[0]
                                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0029'].value = 1
                            })
                            const ba={
                                lb:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                                mc: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                                xh:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text,
                                dw:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text,
                                pp:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0029'].text,
                            }
                            dsf.http.post("/ctrl/wzgl/findAmount",ba).then(({data})=>{
                                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0000'].value = data.data
                            })
                        })
                        brandValue = []
                        formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[2].enumData = brandValue
                    }
                    })
                    unitValue =[]
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[5].enumData = unitValue
                    }
                })
                ItemValue =[]
                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[1].enumData = ItemValue
                }
                })
                specificationValue =[]
                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[3].enumData = specificationValue
               } 
            }
            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0026'){
                if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text != ''){
                    let ItemName ={
                    type:3,
                    level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                    level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                   }
                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",ItemName).then(({data})=>{
                        data.data.map(function (item,index){
                             let str ={
                                 text:item,
                                 value:index+1
                             }
                             ItemValue.push(str)
                        })
                        formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text = data.data[0]
                        formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].value = 1
                       if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text != ''){
                        let unit = {
                            type:4,
                            level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0025'].text,
                            level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0026'].text,
                            level3Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0027'].text,
                        }
                        dsf.http.post("/ctrl/LinkageMenu/getHaveData",unit).then(({data})=>{
                            data.data.map(function (item,index){
                                let str ={
                                    text:item,
                                    value:index+1
                                }
                                unitValue.push(str)
                            })
                        formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0028'].text = data.data[0]
                        formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0028'].value = 1
                         //************** */
                        if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0028'].text != ''){
                            let brand ={
                                type:5,
                                level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0025'].text,
                                level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0026'].text,
                                level3Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0027'].text,
                                level4Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0028'].text,
                            }
                            dsf.http.post("/ctrl/LinkageMenu/getHaveData",brand).then(({data})=>{
                                data.data.map(function (item,index){
                                    let str ={
                                        text:item,
                                        value:index+1
                                    }
                                    brandValue.push(str)
                                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0029'].text = data.data[0]
                                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[0]['C-QT-CUSTOM-0029'].value = 1
                                })
                                const ba={
                                    lb:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                                    mc: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                                    xh:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text,
                                    dw:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text,
                                    pp:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0029'].text,
                                }
                                dsf.http.post("/ctrl/wzgl/findAmount",ba).then(({data})=>{
                                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0000'].value = data.data
                                })
                            })
                            brandValue=[]
                            formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[2].enumData = brandValue
                        }
                        })
                        unitValue=[]
                        formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[5].enumData = unitValue
                        }
                    })
                    ItemValue=[]
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[1].enumData = ItemValue
                }
            }
            if(busObj.metaData.metaId == 'C-QT-CUSTOM-0027'){
                if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text != ''){
                    let unit = {
                        type:4,
                        level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                        level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                        level3Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text,
                    }
                    dsf.http.post("/ctrl/LinkageMenu/getHaveData",unit).then(({data})=>{
                        data.data.map(function (item,index){
                            let str ={
                                text:item,
                                value:index+1
                            }
                            unitValue.push(str)
                        })
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text = data.data[0]
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].value = 1
                    if(formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text != ''){
                        let brand ={
                            type:5,
                            level1Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                            level2Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                            level3Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text,
                            level4Name: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text,
                        }
                        dsf.http.post("/ctrl/LinkageMenu/getHaveData",brand).then(({data})=>{
                            data.data.map(function (item,index){
                                let str ={
                                    text:item,
                                    value:index+1
                                }
                                brandValue.push(str)
                                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0029'].text = data.data[0]
                                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0029'].value = 1
                            })
                            const ba={
                                lb:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0025'].text,
                                mc: formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0026'].text,
                                xh:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0027'].text,
                                dw:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0028'].text,
                                pp:formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0029'].text,
                            }
                            dsf.http.post("/ctrl/wzgl/findAmount",ba).then(({data})=>{
                                formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex]['C-QT-CUSTOM-0000'].value = data.data
                            })
                        })
                        brandValue = []
                        formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[2].enumData = brandValue
                    }
                    })
                    unitValue = []
                    formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[subFormIndex].structControl[5].enumData = unitValue
                    }
            }


       })
       //子表新增事件
       vueData.$bus.on("subFormAdd",function(busObj){
        const  param = {
            type: 1
        }
        dsf.http.post("/ctrl/LinkageMenu/getHaveData",param).then(({data})=>{
            data.data.map(function (item,index){
                let str ={
                    text:item,
                    value:index+1
                }
                ArrayValue.push(str)
            })

        })
         //物品类别
         let Naber =Number(busObj.newData['A0032'].value) - 1
         ArrayValue = []
         formData.multinfos["221012160905ldKL8LavIrVwCL8dhY3"].rows[Naber].structControl[0].enumData = ArrayValue
       })
    }

    exportObj.saveFilter = function (formData, formStruct, vueData) {
        
       let pa =[]
        formData.multinfos['221012160905ldKL8LavIrVwCL8dhY3'].rows.forEach(item=>{
            console.log(item);
            if(item.action != 'Deleted'){
                let str = {
                    mc:item['C-QT-CUSTOM-0026'].text,
                    xh:item['C-QT-CUSTOM-0027'].text,
                    dw:item['C-QT-CUSTOM-0028'].text,
                    lb:item['C-QT-CUSTOM-0025'].text,
                    pp:item['C-QT-CUSTOM-0029'].text,
                    sl:item['C-QT-CUSTOM-0003'].value,
                }
                pa.push(str)
            }
        })


        dsf.http.Axios.post(dsf.url.getWebPath('/ctrl/wzsl/withholding'),window.Qs.stringify({data: pa,type:1},{arrayFormat: 'indices'}), {
            headers: {
              'x-auth-token': dsf.util.loadSessionStore("loginToken")
            }
        }).then(res => {
        })
        return new Promise(function (resolve, reject) {
            debugger
            resolve()
        }) 
    }
    window.spJS = exportObj;
})()