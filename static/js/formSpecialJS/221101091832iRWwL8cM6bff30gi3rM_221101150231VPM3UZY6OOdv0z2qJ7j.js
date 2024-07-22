// [赣政通]20771 外出报备，共计天数=结束日期时间-开始日期时间-双休日-节假日
(function () {
    const exportObj = {};

    exportObj.initHandle = function (formData, formStruct, vueData) {
        watchCtrl("221101102323P2LBq2GP72ntbSiWrh2", formData, vueData); //出发时间
        watchCtrl("221101102434kECfTfhHjA7q8b6H2aE", formData, vueData); //返回时间

        //28047 发改委信息中心，移动端外出报备，事病假，公休假，关联年内已请假情况
        dsf.http.post('fn/vacation', { createUserId: formData.main["A0010"].value }).done(res => {
            if (res.type == "success") {
                vueData.$set(formData.main, "B0060", { value: res.data });
            } else {
                console.log("vacation-fail", res);
            }
        }).error(error => {
            console.log("vacation-err", error);
        })
    };

    function watchCtrl(metaId, formData, vueData) {
        vueData.$watch(function () {
            return formData.main[metaId].value;
        }, function (nv, ov) {
            calcTotalDays(formData, vueData);
        }, {
            deep: true
        });
    }

    function calcTotalDays(formData, vueData) {
        let stDate = formData.main["221101102323P2LBq2GP72ntbSiWrh2"].value;
        let edDate = formData.main["221101102434kECfTfhHjA7q8b6H2aE"].value;
        let days = "";
        vueData.$set(formData.main, "2211011033008oRHgjodO7eqK9zZocV", { value: days });
        if (stDate && edDate) {
            if (!(stDate > edDate)) {
                // flg：1外出报备(计算小时及排除节假日)，2事病假(不排除节假日)，3公休假(排除节假日)
                dsf.http.get('fn/getHoliday/getDays', {
                    startDate: stDate,
                    endDate: edDate,
                    flg: 1
                }).done(res => {
                    if (res.type == "success") {
                        vueData.$set(formData.main, "2211011033008oRHgjodO7eqK9zZocV", { value: res.data });
                    } else {
                        console.log("getDays-fail", res)
                    }
                }).error(error => {
                    console.log("getDays-err", error);
                })
            }
        }
    }

    window.spJS = exportObj;
})();
