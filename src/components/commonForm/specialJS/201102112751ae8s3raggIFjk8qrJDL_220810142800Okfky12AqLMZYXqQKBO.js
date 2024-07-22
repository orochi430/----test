const exportObj = {};
// “外卖食品预定”
// 检查当前发布的食品数量是否超过当天发布的总数
var resLog = true;
async function checkoutNum(formData, formStruct, vueData) {
    resLog = true;
    let spIds = [];
    let nums1 = [];
    // 遍历子表
    formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows.forEach(item => {
        let spID = item['2011111152511p1BHuXNBePEcSaLaDN'].value
        let nums = item['201102140826J53lVLYNbFLtqCZeEsf'].value
        spIds.push(spID)
        nums1.push(nums)
    })
    if (spIds.length == 0) {
        dsf.layer.toast("请选择要预定的食品！");
        return false;
    }
    let idStr = spIds.join(",");
    let numStr = nums1.join(",");
    let ydDate = formData.main["B0013"].value;//预定日期
    let url = "ctrl/menuAdmin/checkoutNum";
    let data = {
        "idStr": idStr,
        "numStr": numStr,
        "ydDte": ydDate
    };
    let result = await dsf.http.post(url, data)
    // .then(result => {
    console.log(result.data);
    if (result.data.code == 200) {
        resLog = true;
    } else {
        resLog = false;
        dsf.layer.toast(result.data.message);
    }
    console.log(resLog);

    // return res;

    // })


}
//日期校验
function dateOfValidation(formData, formStruct, vueData) {
    vueData.$bus.on("selectDateTime", function (param) {//领取日期 //lqDate.getTime()>ydDate.getTime()&&
        // debugger;
        console.log(param);
        if (param.metaData.metaId == "B0021") {
            let ydDate = new Date(formData.main["B0013"].value);
            let lqDate = new Date(param.value);
            let day = lqDate.getDay();
            let h = lqDate.getHours();
            if (!((h >= 16 && h < 17) && (day == 3 || day == 5) && lqDate.getTime() > ydDate.getTime())) {
                dsf.layer.toast("领取时间为每周三或周五下午16:00至17:00之间，且应大于预定日期，请重新填写。");
                // formData.main["B0021"].value = "";
                vueData.$set(formData.main, "B0021", {
                    value: ""
                })
            }
        } else if (param.metaData.metaId == "B0013") {
            let ydrqDate = new Date(param.value);
            let day = ydrqDate.getDay();
            let h = ydrqDate.getHours();
            let M = ydrqDate.getMinutes();
            if (!((h >= 8 && (h < 11 && M <= 30)) && (day == 2 || day == 3))) {
                dsf.layer.toast("预定时间为每周二、周三上午8:00-11:30，其他时间段内暂不允许预定，请重新填写。")
                // formData.main["B0013"].value = "";
                vueData.$set(formData.main, "B0013", {
                    value: ""
                })
            }
        }

    })
}
// vueData.$set(formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows[index], "201102140943qCgslf0DBGuterfch3b", {
//     value: sumMoney
// })
// 发布转态
function issueStateShow(vueData, formStruct, formData) {
    let but = {
        name: "预定", icon: "", action: "yuDing", parameters: ""
    };
    let val = formData.main['201111194607dVYexOOQhJnyEgPH43B'];
    // 判断表单中是否有预定按钮
    let btnIssue = false
    vueData.formMeta.buttons.mainButtons.forEach(item => {
        if (item.action == "yuDing") {
            btnIssue = true
        }
    })
    if (val.value != 0 && !btnIssue) { // 如果是已发布的新表单没有预定按钮
        vueData.formMeta.buttons.mainButtons.unshift(but)
    }
    if (val.value == 1) {//未预定
        let showSave = false
        // 数量不可编辑
        vueData.formMeta.subform['201102141615lvkWKiLz0C3qRUaQWI0'].controls.forEach((item) => {
            if (item.metaId == '201102140826J53lVLYNbFLtqCZeEsf') {
                vueData.$set(item, "privilege", {
                    editable: true,
                    visible: true,
                });
            }
        })
        vueData.formMeta.buttons.mainButtons.forEach(item => {
            if (item.action == "yuDing") {
                item.name = "预定"
            }
            if (item.action == "save") {
                showSave = true
            }
        })

        if (!showSave) {
            let but = {
                name: "保存", icon: "", action: "save", parameters: [{ name: "保存类型", remark: "暂无信息", value: "", key: "saveType" }]
            };
            vueData.formMeta.buttons.mainButtons.unshift(but)
        }

    } else if (val.value == 2) {//预定
        vueData.formMeta.buttons.mainButtons.forEach(item => {
            if (item.action == "yuDing") {
                item.name = "取消预定"
            }
        })
        vueData.formMeta.buttons.mainButtons = vueData.formMeta.buttons.mainButtons.filter(item => {
            return item.action == "yuDing"
        })
        // 数量不可编辑
        vueData.formMeta.subform['201102141615lvkWKiLz0C3qRUaQWI0'].controls.forEach((item) => {
            if (item.metaId == '201102140826J53lVLYNbFLtqCZeEsf') {
                vueData.$set(item, "privilege", {
                    editable: false,
                    visible: true,
                });
            }
        })
    }

}
// 改变发布状态
exportObj.yuDing =  function (formData, formStruct, vueData) {
    vueData.saveNoTip( async function () {
        let val = formData.main['201111194607dVYexOOQhJnyEgPH43B'].value;
        await checkoutNum(formData, formStruct, vueData)
        console.log(resLog);
        if (val == 1 && !resLog) return false;
        vueData.$set(formData.main, '201111194607dVYexOOQhJnyEgPH43B', {
            value: (val == 1) ? 2 : 1
        })
        let val2 = formData.main['201111194607dVYexOOQhJnyEgPH43B'].value;

        let url = "ctrl/menuAdmin/updateIssueState";
        let infoId = formStruct.parameters.pk;
        let data = {
            "infoId": infoId,
            "state": val2
        };
        dsf.http.post(url, data).then((result) => {
            console.log(result);
            if ("success" == result.data.type) {
                dsf.layer.toast("操作成功");
                // window.location.href = window.location.href;
                issueStateShow(vueData, formStruct, formData);
            } else {
                dsf.layer.toast("操作失败，请联系管理员！");
            }
        });
    })

}
exportObj.initHandle = function (formData, formStruct, vueData) {
    // 当前节点id
    var newFileFlag = formStruct.parameters.nodeId;
    if (newFileFlag != "-1") {//只要不是查看节点
        // 单个食品预定数量不可超过三个，如果超出则提示“每种食品数量不能超过三份，请重新填写”，并置空数量；
        vueData.$bus.on("inpBus", function (param) {
            // 如果是数量框
            if (param.metaData.metaId == "201102140826J53lVLYNbFLtqCZeEsf") {
                // 索引
                let index = param.subFormIndex;
                // 单价
                let money = formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows[index]['201102140715c36Cl3qs5mZ16lMZX7b'].value
                // 数量
                let num = Number(param.value)
                let sumMoney = parseFloat(money) * parseInt(num);
                if (num == "" || num == null) {
                    sumMoney = 0;
                }
                console.log(param);
                console.log(money);
                if (num > 3) {
                    formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows[index]['201102140826J53lVLYNbFLtqCZeEsf'].value = 0;
                    sumMoney = 0;
                    dsf.layer.toast("每种食品数量不能超过三份，请重新填写");
                }
                console.log(formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows[index]);
                formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows[index]['201102140943qCgslf0DBGuterfch3b'].value = String(sumMoney);

                // 计算总金额
                let numAll = 0
                // 遍历子表
                formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows.forEach(item => {
                    numAll += Number(item["201102140943qCgslf0DBGuterfch3b"].value)
                })
                console.log(numAll);
                vueData.$set(formData.main, "B0014", {
                    value: String(numAll)
                })
            }
        })
        // 领取日期每周三或周五下午16:00至17:00之间，且应大于预定日期。否则提示“领取时间为每周三或周五下午16:00至17:00之间，且应大于预定日期，请重新填写。”
        dateOfValidation(formData, formStruct, vueData);
        issueStateShow(vueData, formStruct, formData);
    }

    // 移动端不能重复选择食品
    vueData.$bus.on("subFormSelect", (checkItems, subFormId) => {
        if (formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows.length > 0) {
            console.log(checkItems, subFormId);
            let arr = formData.multinfos['201102141615lvkWKiLz0C3qRUaQWI0'].rows
            let flog = false
            for (let i = arr.length - 1; i >= 0; i--) {
                checkItems.checkItems.forEach(newItem => {
                    if (arr[i]['2011111152511p1BHuXNBePEcSaLaDN'].value == newItem.dataValue['A0001']) {
                        arr.splice(i, 1)
                        flog = true
                    }
                })
            }
            if (flog) {
                dsf.layer.toast("不可重复选择食品，请重新填写");
            }
        }

    })




}
// 所有预定人员的预定总数量不可超出“管理列表”中的总数量，如超出则在预定时提示“【食品名称】剩余【剩余数量+单位】”。
// 保存之前
exportObj.saveFilter = function (formData, formStruct, vueData, action) {

    return new Promise(async function (resolve, reject) {
        await checkoutNum(formData, formStruct, vueData)
        console.log(resLog);
        if (resLog) {
            let value = formData.main['201111194607dVYexOOQhJnyEgPH43B'].value == '' ? "0" : formData.main['201111194607dVYexOOQhJnyEgPH43B'].value;
            if (value == "0") {
                vueData.$set(formData.main, "201111194607dVYexOOQhJnyEgPH43B", {
                    value: "1"
                })
            }
            resolve()
        }

    })
}
// 保存之后
exportObj.saveAfter = function (vueData, sendButtonParams, formData) {
    console.log(vueData, sendButtonParams, formData);
    dsf.layer.toast("表单保存成功", null, () => {
        vueData.$eventBus.refresh(vueData);
        // if (!vueData.pk) {
        //   vueData.$router.replace({
        //     path: "/commonForm/" + vueData.moduleId + "/" + vueData.pk
        //   });
        // }
        issueStateShow(vueData, vueData.formMeta, formData);
    })

}
export default exportObj;