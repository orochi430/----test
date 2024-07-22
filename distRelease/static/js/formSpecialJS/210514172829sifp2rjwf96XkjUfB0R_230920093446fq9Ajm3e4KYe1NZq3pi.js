// 发改委公文运转  提交和驳回 特殊js
(function () {
    const exportObj = {};

    exportObj.custom3 = function (formData, formStruct, vueData) {
        vueData.componentName = "fgwChoseLeader"
        vueData.actionSaveCallback(() => {
        })
    }

    exportObj.closeDialogCallback = function (data, actionName, formData, formStruct, vueData) {
        vueData.actionSaveCallback(() => {
            let params = { pk: formStruct.parameters.pk, pId: formStruct.parameters.pId, pnId: formStruct.parameters.pnId, wldId: data.id }
            dsf.http.post('fn//sdszf/pc/gwyz/tld2wld', params).then(res => {
                if (res.data.code == 200) {
                    dsf.layer.toast('发送成功')
                    vueData.backSucces()
                } else {
                    dsf.layer.toast(res.data.message)
                }
            })
        })
    }



    exportObj.ldSend = function (formData, formStruct, vueData) {
        dsf.layer.confirm(
            {
                message: "是否确认发送",
                confirmButtonText: "确认",
            },
            () => {
                vueData.actionSaveCallback(()=>{
                    dsf.http.post('/ctrl/sdszf/pc/gwyz/signSend', { pk: formStruct.parameters.pk, pid: formStruct.parameters.pId, pnid: formStruct.parameters.pnId }).then(res => {
                        if (res.data.code == 200) {
                            dsf.layer.toast('发送成功')
                            vueData.backSucces()
                        } else {
                            dsf.layer.toast(res.data.message)
                        }
                    })
                })
            }
        );

    }

    // ldToBack
    // exportObj.ldSend = function (formData, formStruct, vueData) {
    //     dsf.layer.confirm(
    //         {
    //             title: "驳回原因",
    //             message:
    //                 '<textarea rows="5" id="failReason" placeholder="请填写驳回原因" class="van-field__control" style="border: 1px solid #ddd; padding: 6px"></textarea>',
    //         },
    //         () => {
    //             dsf.http.post('/ctrl/sdszfMobileCtrl/toBackJbr', { pk: formStruct.parameters.pk, pid: formStruct.parameters.pId, pnid: formStruct.parameters.pnId, reason: document.getElementById("failReason").value }).then(res => {
    //                 if (res.data.code == 200) {
    //                     dsf.layer.toast('驳回成功')
    //                     document.getElementById("failReason").value = ""
    //                     vueData.$eventBus.refresh(vueData);
    //                     vueData.backSucces()
    //                 } else {
    //                     dsf.layer.toast(res.data.message)
    //                 }
    //             })
    //         }
    //     );

    // }

    window.spJS = exportObj;
})();