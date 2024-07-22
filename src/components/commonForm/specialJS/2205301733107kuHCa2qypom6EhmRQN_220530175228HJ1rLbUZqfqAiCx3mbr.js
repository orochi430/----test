/**
 * 房地产 -佣金表单；
 */
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectUserBus", function (busObj) {
        if (busObj.metaData.metaId == "c-zs-commission-agreement-006") {
            if (busObj.value) {
                dsf.http.post("fn/coreBusinessContract/loadHtData", { htId: busObj.text }).then((res) => {
                    console.log("res", res);
                    if (res.status == 200) {
                        //渠道公司名称
                        vueData.$set(formData.multinfos["220610140658sZn0u7ANCi4TvQJ5oUD"].rows[0], "C-ZS-BUSINESS-CONFIRMATION-CORE-027",
                            {
                                text: res.data.data.channel_company_name,
                                value: res.data.data.channel_company_value
                            });
                        //佣金标准
                        vueData.$set(formData.multinfos["220610140658sZn0u7ANCi4TvQJ5oUD"].rows[0], "C-ZS-BUSINESS-CONFIRMATION-CORE-030",
                            { value: res.data.data.commission_standard });
                        //佣金计价方式
                        vueData.$set(formData.multinfos["220610140658sZn0u7ANCi4TvQJ5oUD"].rows[0], "C-ZS-BUSINESS-CONFIRMATION-CORE-031",
                            {
                                text: res.data.data.commission_pricing_methodname,
                                value: res.data.data.commission_pricing_method
                            });
                        //佣金金额
                        vueData.$set(formData.multinfos["220610140658sZn0u7ANCi4TvQJ5oUD"].rows[0], "C-ZS-BUSINESS-CONFIRMATION-CORE-032",
                            { value: res.data.data.commission_amount });

                        let subFormId = "220531115155vUYteRrjWYKES6drI1y";
                        res.data.data.fylist.forEach((datarow, index) => {
                            vueData.$set(formData.multinfos[subFormId].rows[index], "c-zs-commission-agreement-space-005", { value: datarow.owner_company, text: datarow.owner_company });
                            vueData.$set(formData.multinfos[subFormId].rows[index], "c-zs-commission-agreement-space-007", { value: datarow.cur_manager_company, text: datarow.cur_manager_company });
                            vueData.$set(formData.multinfos[subFormId].rows[index], "c-zs-commission-agreement-space-009", { value: datarow.build_name, text: datarow.build_name });
                            vueData.$set(formData.multinfos[subFormId].rows[index], "c-zs-commission-agreement-space-011", { value: datarow.floor_name, text: datarow.fhfloor_nameText });
                            vueData.$set(formData.multinfos[subFormId].rows[index], "c-zs-commission-agreement-space-014", { value: datarow.space_type, text: datarow.space_type });
                            vueData.$set(formData.multinfos[subFormId].rows[index], "c-zs-commission-agreement-space-016", { value: datarow.max_area });
                            vueData.$set(formData.multinfos[subFormId].rows[index], "c-zs-commission-agreement-space-017", { value: datarow.price });
                        });
                    }
                })
            }
        }
    })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
        resolve()
    })
}
exportObj.saveAfter = function (vueData, formData, formStruct) {
    vueData.backSucces()
}
export default exportObj;