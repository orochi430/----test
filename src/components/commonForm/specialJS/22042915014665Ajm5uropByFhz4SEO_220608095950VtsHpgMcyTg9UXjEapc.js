/**
 * 房地产的核心商务书-渠道管理模块，创建表单保存前替换A0001和子表ID --2022.06.08
 */
 const exportObj = {};
 exportObj.initHandle = function (formData, formStruct, vueData) {
    
 }
 exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
        let qdId="220608095720lUEcNCW0QISslzrt587";
        //let xsId="220608114530TXz5mPdIyaa3OGJQbHQ";
        let qdzhId="2206080957587kQQ1r7HHbInZix1AHU";
        let rowsQDItem = formData.multinfos[qdId].rows
        //let rowsXSItem = formData.multinfos[xsId].rows
        let rowsQDZHItem = formData.multinfos[qdzhId].rows
        //子表 2205282020586HvvpQTiuchnYLUuhFl
        dsf.http.post("fn/commonTool/getIdByTableName",{tableName :"mdm_channel_user", dbName:"ImBzServiceConnection"}).then(({ data }) => {
            let maxid = data.data.id
            if (!vueData.pk) {
                rowsQDItem.forEach((element, index) => {
                vueData.$set(element[qdId], 'value', parseInt(maxid) + index)
                });
            } else {
                let rowIndex1 = 0
                rowsQDItem.forEach((element, index) => {
                if (element.action == "Added") {
                    vueData.$set(element[qdId], 'value', parseInt(maxid) + rowIndex1)
                    rowIndex1++
                }
                });
            }
            return dsf.http.post("fn/commonTool/getIdByTableName", {tableName :"mdm_capital_account", dbName :"ImBzServiceConnection"});
        }).then(({ data }) => {
            let maxid = data.data.id
            if (!vueData.pk) {
                rowsQDZHItem.forEach((element, index) => {
                vueData.$set(element[qdzhId], 'value', parseInt(maxid) + index)
                });
            } else {
                let rowIndex1 = 0
                rowsQDZHItem.forEach((element, index) => {
                    if (element.action == "Added") {
                        vueData.$set(element[qdzhId], 'value', parseInt(maxid) + rowIndex1)
                        rowIndex1++
                    }
                });
            }

            //主表
            if (!vueData.pk) {
                dsf.http.post("fn/commonTool/getIdByTableName", {tableName : "mdm_channel", dbName : "ImBzServiceConnection"}).then(({data})=>{
                    let temp_pk = data.data.id

                    dsf.http.post("fn/UpdateGNRInfoController/updateInfo", {oldId: vueData.formParams.pk,newId:temp_pk,moduleId: formStruct.parameters.moduleId}).then(({ data }) => {
                    });

                    vueData.pk = temp_pk
                    vueData.formParams.pk = temp_pk
                    vueData.$set(formStruct.parameters, 'pk', temp_pk)
                    vueData.$set(formData.main, 'A0001', { value: temp_pk })
                    resolve()
                    // vueData.backSucces()
                })
            }else{
                resolve()
                // vueData.backSucces()
            }
        });
    })
}
export default exportObj;