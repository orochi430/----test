(function () {
    const exportObj = {};
    exportObj.saveFilter = function (formData, formStruct, vueData, action) {
        function filterTime(time) {
            var str = time.replace(/-/g, "/")
            return Date.parse(str)
        }
        return new Promise(function (resolve, reject) {
            let endTime = filterTime(formData.main["C-OUTMANAGE-0002"].value)//返回时间
            let endPeriod = formData.main["C-OUTMANAGE-0022"].value//返回时段
            let startTime = filterTime(formData.main["C-OUTMANAGE-0001"].value)//出发时间
            let startPeriod = formData.main["C-OUTMANAGE-0021"].value//出发时段
            if (startTime && endTime && startPeriod && endPeriod) {
                if (startTime > endTime || (startTime == endTime && endPeriod < startPeriod)) {
                    reject("返回时间不能早于出发时间")
                } else {
                    resolve()
                }
            } else {
                resolve()
            }
        })
    };
    window.spJS = exportObj;
})();