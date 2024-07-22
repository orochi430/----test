// 考勤异常申请[皖政通]
const exportObj = {};
let now = dsf.date.format(new Date(), "yyyy-mm-dd hh:ii");

exportObj.initHandle = function (formData, formStruct, vueData) {
    if (vueData.$route.query.id) vueData.$set(formData.main, "B0035", { value: vueData.$route.query.id });
    let signTime = vueData.$route.query.signTime;
    if (signTime) {
        // 考勤异常时间
        if (formData.main["220815155026oGXQUym32a6vP0sI00t"]) vueData.$set(formData.main, "220815155026oGXQUym32a6vP0sI00t", { value: signTime });
        // 实际考勤时间
        if (formData.main["B0032"]) vueData.$set(formData.main, "B0032", { value: signTime });
    }
    vueData.$bus.on("selectDateTime", function (busObj) {
        if (busObj.metaData.metaId == "B0032") {
            if (busObj.value.slice(2, 10) != signTime.slice(2, 10)) {
                formData.main["B0032"].value = ""
                dsf.layer.toast("请选择考勤异常当日的时间")
            }
        }
    })
}

exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise((resolve, reject) => {
        let state = vueData.$route.query.state;
        // 拟稿时自动生成标题：申请人+考勤异常类型（迟到/早退/缺卡）+申请时间
        if (!vueData.pk && state && formData.main["B0009"]) {
            vueData.$set(formData.main, "B0001", {
                value: `${formData.main["B0009"].value}${state}${now}`
            })
        }
        // 判断是否超过申请次数上限
        if (vueData.nowButton.action == "send") {
            dsf.http
                .get(`fn/itas/leave/findUserExceCount`, { exdate: formData.main["220815155026oGXQUym32a6vP0sI00t"].value.split(" ")[0], pk: formStruct.parameters.pk })
                .done(res => {
                    if (res.type == "success") {
                        if (res.data) {
                            resolve();
                        } else {
                            reject("已超过该月申请次数");
                        }
                    } else {
                        reject(res.message);
                    }
                })
                .error(err => {
                    reject(`发生错误，请稍后重试`);
                    console.log("findUserExceCount-err", err);
                })
        } else {
            resolve();
        }
    })
}
export default exportObj;