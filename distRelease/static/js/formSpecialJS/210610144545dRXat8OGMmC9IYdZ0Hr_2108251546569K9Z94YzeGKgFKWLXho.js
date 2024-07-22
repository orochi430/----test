//【管理服务平台升级改造项目】--出省（市）报备移动端    
//如果表单中无出省数据，提交时，弹出提示语（“请填写目的地和交通方式”）
(function () {
    const exportObj = {};
    let now = dsf.date.format(new Date(), "yyyy-mm-dd hh:ii");
    exportObj.saveFilter = function (formData, formStruct, vueData) {
        console.log(formData);
        console.log(formStruct);
        return new Promise(function (resolve, reject) {
            let sum = 0
            formData.multinfos["220809112044yxz9tCU6JWAQGz94OGf"].rows.forEach(item => item.action!=="Deleted"? sum++:"")
            if (sum < 1) {
                reject('请填写目的地和交通方式');
            }
            resolve()
        })
    }
    window.spJS = exportObj;
})();
