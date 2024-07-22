(function () {
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        var weekday = ['日', '一', '二', '三', '四', '五', '六']
        vueData.$bus.on("selectDateTime", function (busObj) {
            if (busObj.metaData.metaId == "B0005") { //开始时间
                if (busObj.value) {
                    //初始化结束日期~默认为开始时间所在的周日
                    let startDate = busObj.value;
                    let endDate = moment(startDate).add((7 - moment(startDate).day()), 'day').format('YYYY-MM-DD')
                    vueData.$set(formData.main, 'B0013', { value: endDate });

                    setSubFormTime(startDate, endDate)
                } else {
                    vueData.$set(formData.main, 'B0013', { value: '' })
                }
            }
            if (busObj.metaData.metaId == "B0013") { //开始时间
                if (busObj.value) {
                    let startDate = formData.main["B0005"].value;
                    let endDate = busObj.value;

                    setSubFormTime(startDate, endDate)
                }
            }
        })
        vueData.$nextTick(() => {
            ["B0005", "B0013"].forEach(ele => {
                vueData.$watch(
                    function () {
                        return vueData.formData.main[ele].value;
                    },
                    function (n, o) {
                        if (n == '') {
                            vueData.formData.multinfos["230904203802RWYUSu9R7QkrLJqIPtb"].rows.forEach(el => {
                                el.action = 'Deleted'
                            })
                            // vueData.$set(formData.multinfos["230904203802RWYUSu9R7QkrLJqIPtb"], "rows", [])
                        }
                    },
                    {
                        deep: true,
                        immediate: true,
                    }
                );
            })
        })

        // 新增子表
        function setSubFormTime(startDate, endDate) {
            if (moment(startDate).valueOf() <= moment(endDate).valueOf()) {
                vueData.formData.multinfos["230904203802RWYUSu9R7QkrLJqIPtb"].rows.forEach(el => {
                    el.action = 'Deleted'
                })
                // vueData.$set(formData.multinfos["230904203802RWYUSu9R7QkrLJqIPtb"], "rows", []);

                let days = moment(endDate).diff(moment(startDate), 'day');
                vueData.$refs.formTab[0].$refs[
                    "230904203802RWYUSu9R7QkrLJqIPtb"
                ][0].$refs.subform
                    .addMultipleCard(days + 1).then(newDataArr => {
                        for (let i = 0; i < newDataArr.length; i++) {
                            let time = moment(startDate).add(i, 'day').format('YYYY-MM-DD');
                            vueData.$set(newDataArr[i], 'B0025', {
                                value: moment(time).format('M月D日(星期') + weekday[moment(time).day()] + ')'
                            })
                        }
                    })
            }
        }

    }
    window.spJS = exportObj;
})();