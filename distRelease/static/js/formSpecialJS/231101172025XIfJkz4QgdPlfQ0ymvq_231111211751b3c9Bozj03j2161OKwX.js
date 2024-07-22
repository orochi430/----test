// 成都一体化  先呈送范围  调用接口 显示内容
(function () {
    const exportObj = {};
    exportObj.beforeInitAsync = function (formData, formStruct, vueData){
        let typeId = formData.main["240223110855X6dICTgauNVvZz7hj4r"].value
        let filterOpinion = formStruct.controls.filter(item => {
            if (typeId == 4 || typeId == 5) {
                return item.controlId != "pDtK9smYwJrKVhsD" && item.controlId != "cKQ3AF9jbBxmlPXc"
            }
            else if (typeId == 2) {
                return item.controlId != "lwg8zC2e19rYdx3u" && item.controlId != "pDtK9smYwJrKVhsD"
            }
            else if (typeId == 1) {
                return item.controlId != "lwg8zC2e19rYdx3u" && item.controlId != "cKQ3AF9jbBxmlPXc"
            }
            else if (typeId == 3) {
                return item.controlId != "lwg8zC2e19rYdx3u" && item.controlId != "pDtK9smYwJrKVhsD" && item.controlId != "cKQ3AF9jbBxmlPXc"
            }
        })
        formStruct.controls = filterOpinion
    }
    exportObj.initHandle = function (formData, formStruct, vueData) {
        if (formData.main["2311292108363aeaewc0X2oryBw9B4M"].value != "") {
            let loading = dsf.layer.loading();
            dsf.http
                .post("fn/scopeOfSubmission/getShowText", {
                    ids: formData.main["C-LW-0040"].value
                })
                .then((res) => {
                    dsf.layer.closeLoading(loading);

                    if (res.data.type === "success") {
                        formData.main["2311292108363aeaewc0X2oryBw9B4M"].value = res.data.message;
                    } else {
                        dsf.layer.toast(res.data.message);
                    }
                })
                .error((err) => {
                    dsf.layer.closeLoading(loading);
                    console.log(err);
                });
        }
      

    }
    window.spJS = exportObj;
})();