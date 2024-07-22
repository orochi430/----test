(function () {
    const exportObj = {};
    // 杭州党校-oa移动端
    exportObj.initHandle = function (formData, formStruct, vueData) {
        // 标题数据
        vueData.$watch(function () {
            return formData.main["B0001"].value;
        }, function (newValue, oldValue) {
            if (newValue.length) {
                // 为短信内容赋值
                vueData.$set(formData.main, "220719104439yYHTgh9M2ep2wgy3rvT", {
                    value: `您有一条标题为《${newValue}》的校委会通知，请注意查收！`
                })
            }
        }, {
            deep: true
        });
    };
    window.spJS = exportObj;
})();

