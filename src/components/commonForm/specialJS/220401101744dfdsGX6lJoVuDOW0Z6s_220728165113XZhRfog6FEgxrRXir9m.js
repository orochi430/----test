const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    let date = formData.main['B0013'].value
    console.log(date);
    let params = {
        rq: date
    }
    if (formStruct.parameters.nodeId == 0) {
        dsf.http.post("fn/collect/voluntarily", params).then(res => {
            console.log(res);
            console.log(res.data.message);
            let message = res.data.message || ''
            // 为本日工作完成情况赋值
            vueData.$set(vueData.formData.main, "C-ZJTJJ_GZRZ-0004", {
                value: message
            })
        })
    }

}
export default exportObj;
