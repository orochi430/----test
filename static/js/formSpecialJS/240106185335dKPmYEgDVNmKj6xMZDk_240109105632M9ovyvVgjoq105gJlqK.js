//  成都一体化  退回审批表单渲染
(function () {
    const exportObj = {}
    exportObj.initHandle = function (formData, formStruct, vueData) {
        const pnId = vueData.$route.query.pnId;
        let loading = dsf.layer.loading();

        dsf.http
            .post("ctrl/distribute/getReturnApprovalFormInfo", { pnId })
            .then((res) => {
                dsf.layer.closeLoading(loading);

                if (res.data.type === "success") {
                    var formInfo = res.data.data;
                    vueData.$set(formData.main, "B0001", {
                        value: formInfo.bt
                    });
                    vueData.$set(formData.main, "B0009", {
                        value: formInfo.whoHandle
                    });
                    vueData.$set(formData.main, "B0010", {
                        value: formInfo.sendDeptname
                    });
                    vueData.$set(formData.main, "B0013", {
                        value: formInfo.rDate
                    });
                    vueData.$set(formData.main, "240106185551RAtYr4Wz8QbrvaLXbt9", {
                        value: formInfo.backReason
                    });
                } else {
                    dsf.layer.toast(res.data.message);
                }
            })
            .catch((err) => {
                dsf.layer.closeLoading(loading);
                console.log(err);
            });
    }


    window.spJS = exportObj
})()