/**
 * 房地产的核心商务书-物业条款表单
 */
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    //把商务书主键设置到字表里去
    let fid = vueData.$route.query.fid;
    vueData.$set(formData.main, "zid", { value: fid })
    if (!vueData.pk) {
        //调用接口 ctrl/coreBusinessContract/selectListingsByZid
        dsf.http.post("fn/coreBusinessContract/selectListingsByZid", { id: fid, type: "wyf" }).then(({ data }) => {
            //console.log("selectListingsByZid",data);

            let subFormId = "2206011929158RPrj6JrL9Xq6UmghWw";
            //console.log("formData.multinfos[sourceId].rows",formData.multinfos[subFormId].rows);
            vueData.$nextTick(async () => {
                for (let index = 0; index < data.data.length; index++) {
                    let datarow = data.data[index];
                    if ( datarow.yhtjsrq==null) {
                        datarow.yhtjsrq = 0
                    } else {
                        datarow.yhtjsrq =dsf.date.format(new Date(datarow.yhtjsrq),'yyyy-mm-dd')
                    }
                    await vueData.$refs.formTab[0].$refs[subFormId][0].$refs.subform.addCard(false)
                    vueData.$set(formData.multinfos[subFormId].rows[index][subFormId], "value", datarow.id );
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-001", { value: datarow.cqfText, text: datarow.cqf });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-002", { value: datarow.lyText, text: datarow.ly });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-003", { value: datarow.lcText, text: datarow.lc });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-060", { value: datarow.fhText });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-005", { value: datarow.ytText, text: datarow.yt });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-006", { value: datarow.kzlmj });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-008", { value: datarow.zjj });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-009", { value: datarow.yhtmqhsj });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-010", { value: datarow.zzzk });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "C-ZS-BUSINESS-CONFIRMATION-CORE-LISTINGS-011", { value: datarow.yhtjsrq });
                    vueData.$set(formData.multinfos[subFormId].rows[index], "action", "Updated")
                }
            })
        });
    }
}
function dealChildData(formData, vueData, callback, temp_pk="") {
    let sourceId = "2206011929158RPrj6JrL9Xq6UmghWw";
    let rowsSourceItem = formData.multinfos[sourceId].rows
    //子表
    dsf.http.post("fn/commonTool/getIdByTableName", { dbName: "ImBzServiceConnection", tableName: "zs_business_confirmation_core_listings" }).then(({ data }) => {
        let maxid = data.data.id
        if (temp_pk) {
            let rowIndex = 0
            rowsSourceItem.forEach(element => {
                vueData.$set(element[sourceId], 'wy_rent_id', vueData.formData.main["A0001"].value)
                if (element.action == "Added") {
                    vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                    rowIndex++
                }
            });
        } else {
            let rowIndex = 0
            rowsSourceItem.forEach(element => {
                vueData.$set(element[sourceId], 'wy_rent_id', vueData.formData.main["A0001"].value)
                if (element.action == "Added") {
                    vueData.$set(element[sourceId], 'value', parseInt(maxid) + rowIndex)
                    rowIndex++
                }
            });
        }
        callback();
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