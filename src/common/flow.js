function getWorkFlowNodes({
    param,
    thenFun,
    catchFun,
    finallyFun,
    hasLoader
}) {
    let that = this,
        loader = hasLoader ? dsf.layer.loading() : null,
        params = param || {
            infoId: '1',
            start: 0,
            limit: 999
        }
    dsf.http.post("/fn/mobileFormComment/getFLowList", params)
        .then((res) => {
            //console.log(res)
            let _nodes = res.data;
            thenFun && thenFun(res, _nodes);
        }).catch((e) => {
            catchFun && catchFun(e);
        }).finally(() => {
            finallyFun && finallyFun(e);
            loader && dsf.layer.closeLoading(loader)
        })
}

export default {
    getWorkFlowNodes
}