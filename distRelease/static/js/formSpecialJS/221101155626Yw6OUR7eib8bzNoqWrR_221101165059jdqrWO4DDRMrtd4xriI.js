// [赣政通]20771 事病假，共计天数=结束日期时间-开始日期时间-双休日-节假日
(function () {
    const exportObj = {};

    exportObj.initHandle = function (formData, formStruct, vueData) {
        watchCtrl("C-QJSQ-LEAVE-005", formData, vueData); //起始时间
        watchCtrl("C-QJSQ-LEAVE-011", formData, vueData); //起始时段
        watchCtrl("C-QJSQ-LEAVE-006", formData, vueData); //结束时间
        watchCtrl("C-QJSQ-LEAVE-012", formData, vueData); //结束时段

        //28047 发改委信息中心，移动端外出报备，事病假，公休假，关联年内已请假情况
        dsf.http.post('fn/vacation', { createUserId: formData.main["A0010"].value }).done(res => {
            if (res.type == "success") {
                vueData.$set(formData.main, "C-QJSQ-LEAVE-010", { value: res.data });
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
        let stDate = formData.main["C-QJSQ-LEAVE-005"].value;
        let stDur = formData.main["C-QJSQ-LEAVE-011"].value;
        let edDate = formData.main["C-QJSQ-LEAVE-006"].value;
        let edDur = formData.main["C-QJSQ-LEAVE-012"].value;
        let days = "";
        vueData.$set(formData.main, "C-QJSQ-LEAVE-007", { value: days });
        if (stDate && stDur && edDate && edDur) {
            if (!(stDate > edDate || (stDate == edDate && stDur > edDur))) {
                // morning：请假开始时间段，1:上午 2:下午
                // after：请假结束时间段，1:上午 2:下午
                // flg：1外出报备(计算小时及排除节假日)，2事病假(不排除节假日)，3公休假(排除节假日)
                dsf.http.post('fn/getHoliday/getDays', {
                    startDate: stDate,
                    endDate: edDate,
                    flg: 2,
                    morning: stDur,
                    after: edDur
                }).done(res => {
                    if (res.type == "success") {
                        vueData.$set(formData.main, "C-QJSQ-LEAVE-007", { value: res.data });
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
