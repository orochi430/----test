
/**
 * 房地产的核心商务书-租赁条款表单
 */
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
     let fis = ''
     if(vueData.$route.query.fid != undefined){
        fis = vueData.$route.query.fid
     }else if(vueData.$route.query.relaId != undefined){
        fis = vueData.$route.query.relaId
     }
   
    //把商务书主键设置到字表里去
    let fid = vueData.$route.query.fid;
    vueData.$set(formData.main, "zid", { value: fid })
    if (!vueData.pk) {
        //调用接口 ctrl/coreBusinessContract/selectListingsByZid
        dsf.http.post("fn/coreBusinessContract/selectListingsByZid", { id: fid, type: "zj" }).then(({ data }) => {
            let subFormId = "2205282020586HvvpQTiuchnYLUuhFl";
            //console.log("formData.multinfos[sourceId].rows",formData.multinfos[subFormId].rows);
            vueData.$nextTick(async () => {
                for (let index = 0; index < data.data.length; index++) {
                    let datarow = data.data[index];
                    let strDate = '';
                    if(datarow.yhtjsrq != null){
                        let date = new Date(datarow.yhtjsrq);
                        let Y = date.getFullYear() + '-';
                        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                        strDate = Y + M + D ;
                    }
                    
                    await vueData.$refs.formTab[0].$refs[subFormId][0].$refs.subform.addCard(false)
                    vueData.$set(formData.multinfos[subFormId].rows[index][subFormId], "value", datarow.id );
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-001", { value: datarow.cqfText, text: datarow.cqf });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-002", { value: datarow.lyText, text: datarow.ly });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-003", { value: datarow.lcText, text: datarow.lc });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-060", { value: datarow.fhText });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-005", { value: datarow.ytText, text: datarow.yt });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-006", { value: datarow.kzlmj });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "action", "Updated");
                    vueData.$set(formData.multinfos[subFormId].rows[index], 'C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-010', { value: datarow.zzzk});
                    vueData.$set(formData.multinfos[subFormId].rows[index], 'C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-009', { value: datarow.yhtmqhsj});
                    vueData.$set(formData.multinfos[subFormId].rows[index], 'C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-011', { value: strDate});
                    vueData.$set(formData.multinfos[subFormId].rows[index], 'C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-018', { value: datarow.ysfy});
                    vueData.$set(formData.multinfos[subFormId].rows[index], 'C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012', { value: datarow.ysfy})
                    isCxPrice()
                }
            })
        });
    }
    isCxPrice()
    function isCxPrice() {
        if(formData.main['c-zs-business-confirmation-core-rent-019'].text != ''){
            const pames ={
                spaceIds:fis,
                purpose1:formData.main['c-zs-business-confirmation-core-rent-019'].value,
                purpose2:formData.main['c-zs-business-confirmation-core-rent-020'].value,
                type:3
            }
            dsf.http.post("fn/enclosure/getFyPrice",pames).then(({data})=>{
                if(data.code == '500'){
                    dsf.layer.toast(data.message)
                }else if(data.code == '200'){
                    let arr = formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                    console.log(arr,'****67');
                    let jt = data.data.jtpgzdj
                    let xs =[]
                    if(data.data.xs.length >0){
                        xs = data.data.xs
                        console.log(xs);
                    }else{
                        xs = ''
                    }
                    let ysqyzjj =[]
                    if(data.data.ysqyzjj.length > 0){
                       ysqyzjj=data.data.ysqyzjj
                    }else{
                        ysqyzjj = ''
                    }
                    let xsqyzjj   = []
                    if(data.data.xsqyzjj.length > 0){
                        xsqyzjj =  data.data.xsqyzjj
                    }else{
                        xsqyzjj =''
                    }
                    
                    dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
                        if(data.code == '200'){
                            if(data.data.zdj == false){
                                formData.main['c-zs-business-confirmation-core-rent-021'].value = jt
                            }else{
                                formData.main['c-zs-business-confirmation-core-rent-018'].value = jt
                            }   
                            if(data.data.zjj == false){
                                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-061'].value = '*'
                                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-063'].value = '*'
                                let xsVas = xs.reverse()
                                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                    let ar = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                    xsVas.forEach(function (it,ix){
                                        if(index == ix){
                                            item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-062'].value = it[ar]
                                        }
                                    })
                                })
                            }else{
                               if(formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.length >0){
                                let xsVa = xs.reverse()
                                let xsqyzjjVa = xsqyzjj.reverse()
                                    formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                        let ar = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                        xsVa.forEach(function (it,ix){
                                            if(index == ix){
                                                item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-062'].value = it[ar]
                                            }
                                        })
                                    })
                                    formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                        let ae = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                        xsqyzjjVa.forEach(function (it,ix){
                                            if(index == ix){
                                                item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-063'].value = it[ae]
                                            }
                                        })
                                    })
                                    if(ysqyzjj != []){
                                        let ysqyzjjval = ysqyzjj.reverse()
                                        formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                            let ac = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                            ysqyzjjval.forEach(function (it,ix){
                                                if(index == ix){
                                                    if(it[ac] != -1){
                                                        item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-061'].value =it[ac]
                                                    }
                                                }
                                            })
                                        })
                                    }
                                } 
                            }                        
                        }
                    })                   
                }
            })

        }

       dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
        if(data.code == '200'){
            if(data.data.zdj == false){
                formData.main['c-zs-business-confirmation-core-rent-018'].value = '*'
            }
            if(data.data.zjj == false){
                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-061'].value = '*'
                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-063'].value = '*'
            }
         
        }
       }) 
    }
    function calc(formData,vueData){
        let suiL = formData.main['c-zs-business-confirmation-core-rent-008'].text //税率
        let DanJ = formData.main['c-zs-business-confirmation-core-rent-003'].value // 租金单价
        let suiLs = suiL.replace("%","")
        let su = suiLs / 100
        function isInteger(obj){
          return typeof obj === 'number' && obj % 1 === 0;
        }
        if(formData.main['c-zs-business-confirmation-core-rent-001'].text == '是'){   
            formData.main['c-zs-business-confirmation-core-rent-014'].value = DanJ  //含税率租金
        }else if(formData.main['c-zs-business-confirmation-core-rent-003'].value != '' 
                && formData.main['c-zs-business-confirmation-core-rent-008'].text != '' &&
                formData.main['c-zs-business-confirmation-core-rent-001'].text == '否'){
            if(isInteger(su)){
                let zj  =(Number(su) * Number(DanJ)+Number(DanJ))
                formData.main['c-zs-business-confirmation-core-rent-014'].value = zj
            }else{
                let zj  =(Number(su) * Number(DanJ)+Number(DanJ)).toFixed(2)
                formData.main['c-zs-business-confirmation-core-rent-014'].value = zj
            }
        }
    }
    
    vueData.$bus.off("checkVal").on("checkVal",function (busObj){
        if(formData.main['c-zs-business-confirmation-core-rent-001'].text == '是'||
           formData.main['c-zs-business-confirmation-core-rent-001'].text == '否'){
            if(busObj.metaData.metaId == 'c-zs-business-confirmation-core-rent-008' || formData.main['c-zs-business-confirmation-core-rent-008'].value  !=''){
                calc(formData,vueData)
            }
        }
        //数据联动调用接口

        if(busObj.metaData.metaId == 'c-zs-business-confirmation-core-rent-019'&&
         formData.main['c-zs-business-confirmation-core-rent-019'].text != '商业' || 
         formData.main['c-zs-business-confirmation-core-rent-019'].text != '' && 
         formData.main['c-zs-business-confirmation-core-rent-020'].text !='' ||
         busObj.metaData.metaId == 'c-zs-business-confirmation-core-rent-020'){
            const pames ={
                spaceIds:fis,
                purpose1:formData.main['c-zs-business-confirmation-core-rent-019'].value,
                purpose2:formData.main['c-zs-business-confirmation-core-rent-020'].value,
                type:3
            }
            
            dsf.http.post("fn/enclosure/getFyPrice",pames).then(({data})=>{
                if(data.code == '500'){
                    dsf.layer.toast(data.message)
                }else if(data.code == '200'){
                    let arr = formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                    console.log(arr,'****67');
                    let jt = data.data.jtpgzdj
                    let xs =[]
                    if(data.data.xs.length >0){
                        xs = data.data.xs
                        console.log(xs);
                    }else{
                        xs = ''
                    }
                    let ysqyzjj =[]
                    if(data.data.ysqyzjj.length > 0){
                       ysqyzjj=data.data.ysqyzjj
                    }else{
                        ysqyzjj = ''
                    }
                    let xsqyzjj   = []
                    if(data.data.xsqyzjj.length > 0){
                        xsqyzjj =  data.data.xsqyzjj
                    }else{
                        xsqyzjj =''
                    }
                    
                    dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
                        if(data.code == '200'){
                            if(data.data.zdj == false){
                                formData.main['c-zs-business-confirmation-core-rent-021'].value = jt
                            }else{
                                formData.main['c-zs-business-confirmation-core-rent-018'].value = jt
                            }   
                            if(data.data.zjj == false){
                                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-061'].value = '*'
                                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows[0]['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-063'].value = '*'
                                let xsVas = xs.reverse()
                                formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                    let ar = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                    xsVas.forEach(function (it,ix){
                                        if(index == ix){
                                            item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-062'].value = it[ar]
                                        }
                                    })
                                })
                            }else{
                               if(formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.length >0){
                                let xsVa = xs.reverse()
                                let xsqyzjjVa = xsqyzjj.reverse()
                                    formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                        let ar = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                        xsVa.forEach(function (it,ix){
                                            if(index == ix){
                                                item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-062'].value = it[ar]
                                            }
                                        })
                                    })
                                    formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                        let ae = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                        xsqyzjjVa.forEach(function (it,ix){
                                            if(index == ix){
                                                item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-063'].value = it[ae]
                                            }
                                        })
                                    })
                                    if(ysqyzjj != []){
                                        let ysqyzjjval = ysqyzjj.reverse()
                                        formData.multinfos['2205282020586HvvpQTiuchnYLUuhFl'].rows.forEach(function (item,index){
                                            let ac = item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-012'].value
                                            ysqyzjjval.forEach(function (it,ix){
                                                if(index == ix){
                                                    if(it[ac] != -1){
                                                        item['C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-061'].value =it[ac]
                                                    }
                                                }
                                            })
                                        })
                                    }
                                } 
                            }                        
                        }
                    })                   
                }
            })
         }

    })
    vueData.$bus.on("blurBus",function (busObj){
        if(formData.main['c-zs-business-confirmation-core-rent-001'].text == '是' ||
        formData.main['c-zs-business-confirmation-core-rent-001'].text == '否' ){
            if(busObj.metaData.metaId == 'c-zs-business-confirmation-core-rent-003'){
                calc(formData,vueData)
            }
        }
    })

    // function calcRatePrice(formData, vueData) {
    //     //c-zs-business-confirmation-core-rent-003 租金单价
    //     //c-zs-business-confirmation-core-rent-014 含税租金\
    //     // 1.根据“核心商务书-租赁条款”页面

    //     // 2.如果含税选择“是”，则“含税租金”=“租金单价”，

    //     // 3.如果含税选择“否”，则“含税租金”=“租金单价”÷（1＋“税率”）
    //     let boolRate = formData.main["c-zs-business-confirmation-core-rent-001"].value;
    //     let rentPrice = formData.main["c-zs-business-confirmation-core-rent-003"].value

    //     if (boolRate === "1") {
    //         vueData.$set(formData.main, 'c-zs-business-confirmation-core-rent-014', { value: rentPrice })
    //     } else {
    //         let rateStr = formData.main["c-zs-business-confirmation-core-rent-008"].value.replace('%', '');
    //         let rate = parseFloat(rateStr == "" ? "0" : rateStr) / 100;
    //         //“租金单价”÷（1＋“税率”）
    //         vueData.$set(formData.main, 'c-zs-business-confirmation-core-rent-014', { value: (parseFloat(rentPrice) * (1 + rate)).toFixed(2) })
    //     }
    // }

    //c-zs-business-confirmation-core-rent-001
    // vueData.$bus.on("checkVal", function (busObj) {
    //     if (busObj.metaData.metaId == "c-zs-business-confirmation-core-rent-001" || busObj.metaData.metaId == "c-zs-business-confirmation-core-rent-008") {
    //         if (busObj.value) {
    //             //console.log(busObj.value);
    //             calcRatePrice(formData, vueData)
    //         }
    //     }
    // });
    let flag = ""
    vueData.$bus.on("focusBus", function (busObj) {
        if(busObj.metaData.metaId == "c-zs-business-confirmation-core-rent-increase-001") {
            flag = busObj.value
        }
    })
    vueData.$bus.on("blurBus", function (busObj) {
        if(busObj.metaData.metaId == "c-zs-business-confirmation-core-rent-003") {
            //保留四位小数
            let NumberValue = String(busObj.value).indexOf(".")+1;
            let NumberValues = String(busObj.value).length - NumberValue;
            if(NumberValues > 4){
              let Num = busObj.value
              let NumS = Math.round(Num*10000)/10000
              vueData.$set(formData.main, 'c-zs-business-confirmation-core-rent-003', { value: NumS}) 
            }
            // calcRatePrice(formData, vueData);
            let subFormData = formData.multinfos["2205282021280Vbda2dwqnYIdfAD0OH"].rows
            if(subFormData.length != 0) {
                subFormData.forEach( item => {
                    if(item["c-zs-business-confirmation-core-rent-increase-001"].value) {
                        item["c-zs-business-confirmation-core-rent-increase-003"].value = 
                            ((Number(item["c-zs-business-confirmation-core-rent-increase-001"].value)/100 + 1) * Number(busObj.value)).toFixed(2)
                    }
                })
            }
        }

        if(busObj.metaData.metaId == "c-zs-business-confirmation-core-rent-007") {
            //填写表单保留8位小数
            let Numbera = String(busObj.value).indexOf(".")+1;
            let Numberb= String(busObj.value).length - Numbera;
            if(Numberb > 8){
              let Nums = busObj.value
              let NumVa = Math.round(Nums*100000000)/100000000
              vueData.$set(formData.main,"c-zs-business-confirmation-core-rent-007",{ value: NumVa})  
            }
            let subFormData = formData.multinfos["2205282021280Vbda2dwqnYIdfAD0OH"].rows
            if(subFormData.length != 0) {
                subFormData.forEach( item => {
                    if(item["c-zs-business-confirmation-core-rent-increase-001"].value) {
                        item["c-zs-business-confirmation-core-rent-increase-004"].value = 
                          ((Number(item["c-zs-business-confirmation-core-rent-increase-001"].value)/100 + 1) * Number(busObj.value)).toFixed(2)
                    }
                })
            }
        }

        if(busObj.metaData.metaId == "c-zs-business-confirmation-core-rent-increase-001") {
            if(flag != busObj.value) {
                let subFormData = formData.multinfos[busObj.subFormId].rows
                let main_003 = Number(formData.main["c-zs-business-confirmation-core-rent-003"].value)
                let main_007 = Number(formData.main["c-zs-business-confirmation-core-rent-007"].value)
                let subform_003 = Number(subFormData[busObj.subFormIndex]["c-zs-business-confirmation-core-rent-increase-003"].value)
                let subform_004 = Number(subFormData[busObj.subFormIndex]["c-zs-business-confirmation-core-rent-increase-004"].value)
                if(main_003) {
                    if(!subform_003) {
                        subFormData[busObj.subFormIndex]["c-zs-business-confirmation-core-rent-increase-003"].value = 
                            ((Number(busObj.value)/100 + 1) * main_003).toFixed(2)
                    } else {
                        subFormData[busObj.subFormIndex]["c-zs-business-confirmation-core-rent-increase-003"].value = 
                            (Number(subform_003) * Number(busObj.value)/100 + main_003).toFixed(2)
                    }
                }
                if(main_007) {
                    if(!subform_004) {
                        subFormData[busObj.subFormIndex]["c-zs-business-confirmation-core-rent-increase-004"].value = 
                            ((Number(busObj.value)/100 + 1) * main_007).toFixed(2)
                    } else {
                        subFormData[busObj.subFormIndex]["c-zs-business-confirmation-core-rent-increase-004"].value = 
                            (Number(subform_004) * Number(busObj.value)/100 + main_007).toFixed(2)
                    }
                }
            }
        }
    })
}

function dealChildData(formData, vueData, callback, temp_pk="") {
    let rentId = "2205282021280Vbda2dwqnYIdfAD0OH";
    let rowsRentItem = formData.multinfos[rentId].rows
    let sourceId = "2205282020586HvvpQTiuchnYLUuhFl";
    let rowsSourceItem = formData.multinfos[sourceId].rows
    dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "ImBzServiceConnection", tableName: "ZS_BUSINESS_CONFIRMATION_CORE_RENT_INCREASE"}).then(({ data }) => {
        let maxid = data.data.id
        if (temp_pk) {
            let rowIndex = 0
            rowsRentItem.forEach(element => {
                vueData.$set(element[rentId], 'rent_id', vueData.formData.main["A0001"].value)
                if (element.action == "Added"  && element[rentId].value.length >= 10) {
                    vueData.$set(element[rentId], 'value', parseInt(maxid) + rowIndex)
                    rowIndex++
                }
            });
        } else {
            let rowIndex = 0
            rowsRentItem.forEach(element => {
                vueData.$set(element[rentId], 'rent_id', vueData.formData.main["A0001"].value)
                if (element.action == "Added"  && element[rentId].value.length >= 10) {
                    vueData.$set(element[rentId], 'value', parseInt(maxid) + rowIndex)
                    rowIndex++
                }
            });
        }
        return dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "ImBzServiceConnection", tableName: "zs_business_confirmation_core_listings"})
    }).then(({data})=>{
        let maxid = data.data.id
        if (temp_pk) {
            let rowIndex = 0
            rowsSourceItem.forEach(element => {
                vueData.$set(element[sourceId], 'rent_id', vueData.formData.main["A0001"].value)
                if (element.action == "Added"  && element[sourceId].value.length >= 10) {
                    vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                    rowIndex++
                }
            });
        } else {
            let rowIndex = 0
            rowsSourceItem.forEach(element => {
                vueData.$set(element[sourceId], 'rent_id', vueData.formData.main["A0001"].value)
                if (element.action == "Added"  && element[sourceId].value.length >= 10) {
                    vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                    rowIndex++
                }
            });
        }
        callback()
    })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
        //主表
        if (!vueData.pk) {
            dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "ImBzServiceConnection", tableName: "ZS_BUSINESS_CONFIRMATION_CORE_RENT" }).then(({ data }) => {
                let temp_pk = data.data.id
                vueData.pk = temp_pk
                vueData.formParams.pk = temp_pk
                vueData.$set(formStruct.parameters, 'pk', temp_pk)
                vueData.$set(formData.main, 'A0001', { value: temp_pk })
                dealChildData(formData, vueData, () => resolve(), temp_pk);
            })
        } else {
            dealChildData(formData, vueData, () => resolve());
        }
    })
}
exportObj.saveAfter = function (vueData, formData, formStruct) {
    vueData.$store.state.pageTitle = "移动表单"
    vueData.backSucces()
}
export default exportObj;