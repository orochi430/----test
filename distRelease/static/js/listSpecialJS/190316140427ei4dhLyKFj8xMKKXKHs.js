//签收情况列表
(function () {
    const exportObj = {};

    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
        let remoteId = itemValue["A0002"]
        let osourceId = itemValue["A0003"]
        let isJoint = itemValue["C-R-SEND-0018.value"]
        let isFeedback = itemValue["C-R-SEND-0026.value"]
        let sourceId = ""
        dsf.http.get('ctrl/remoteExchangeData/getSettings').then(res1 => {
            let result = res1.data
            if (result.data && result.data.isShowOriginFwForm && result.data.isShowOriginFwForm == "1") {//显示原始发文表单
                if (remoteId && remoteId != null) {
                    sourceId = remoteId;
                }
                //会办回执 remoteId对应收文Id  需要改回去
                if (isJoint == '4' && isFeedback == '1'){
                    sourceId = osourceId;
                }
                dsf.http.get('ctrl/remoteExchangeData/getSourceInfo', { "pk": sourceId }).then(ress => {
                    let res = ress.data
                    if (res.data && res.data.moduleId) {//显示原始发文表单
                        vueData.$router.push({
                            path: `/commonForm/${res.data.moduleId}/${sourceId}`,
                            query: {
                                listId: "190316140427ei4dhLyKFj8xMKKXKHs",
                                method: "view",
                                sendRecordId: pk,
                                canSaveFid: false,
                                fromList: "sendRecord"
                            }
                        })
                    } else {
                        dsf.layer.toast("打开表单失败", false);
                    }
                })
            } else {//打开已发公文表单
                vueData.$router.push({
                    path: `/commonForm/190316115452TEcLfcQBFJozNasHYrm/${pk}`,
                    query: {
                        listId: "190316140427ei4dhLyKFj8xMKKXKHs",
                        method: "view",
                        fid: pk,
                        canSaveFid: false
                    }
                })
            }
        })

    };


    exportObj.qianShouQingKuang = function (itemValue, vueData) {
        vueData.$router.push({
            name: "signIn",
            query: {
                fid: itemValue.dataValue["A0001"]
            }
        });
    };



    window.spListJS = exportObj;
})();
