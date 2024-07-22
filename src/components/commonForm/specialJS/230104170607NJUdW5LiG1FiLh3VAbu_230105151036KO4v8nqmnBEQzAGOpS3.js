import dsf from "../../../common";
// 人员登记表--jf
const exportObj = {};
exportObj.initHandle = function(formData, formStruct, vueData) {
    console.log(11);
    let pk = dsf.util.loadLocalStore('formPk')
    console.log(pk);
    if (pk) {
        vueData.$router.push({
            path: `/commonForm/230104170607NJUdW5LiG1FiLh3VAbu/${pk}?listId=230105103323Jy7si9biQ5idnGvCkqY`,
        })
    }
    vueData.$bus.on("blurBus", function(busObj) {
        console.log(busObj);
        if (busObj.metaData.metaId == 'C-YGXXDJB-007') {
            var format = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
            if (!format.test(busObj.value)) {
                dsf.layer.toast("请输入正确的身份证！")
            } else {
                let data = busObj.value.slice(6, 14);
                let y = data.slice(0, 4);
                let m = data.slice(4, 6);
                let d = data.slice(6, 8);
                let birthday = y + '-' + m + '-' + d;
                vueData.$set(formData.main, 'C-YGXXDJB-004', { value: birthday })
                busObj.value.substr(16, 1) % 2 != 0 ? vueData.$set(formData.main, 'C-YGXXDJB-050', { text: '男', value: '男' }) : vueData.$set(formData.main, 'C-YGXXDJB-050', { text: '女', value: '女' })

            }
        }
        if (busObj.metaData.metaId == 'C-YGXXDJBYHXX-003') {
            if (busObj.value.length != 12) {
                dsf.layer.toast("请输入正确的大额行号(12个字符)！")
            }
        }
        if (busObj.metaData.metaId == 'C-YGXXDJB-003') {
            if (busObj.value.length != 2) {
                dsf.layer.toast("花名最多可输入两个汉字！")
                vueData.$set(formData.main, 'C-YGXXDJB-003', { value: busObj.value.slice(0, 2) })
            }
        }
    })


    if (vueData.formData.multinfos['230104172533wESYWbcP1LiqojizsNY']) {
        vueData.$watch(function() {
            return vueData.formData.multinfos['230104172533wESYWbcP1LiqojizsNY'].rows
        }, function(n, o) {
            console.log(n);
            if (n.length > 5) {
                formData.multinfos['230104172533wESYWbcP1LiqojizsNY'].rows.splice(5, 1)
                dsf.layer.toast("家庭成员信息最多5个！")
            }
        }, {
            deep: true,
            immediate: true,
        })
    }
    if (vueData.formData.multinfos['230104172542tOJoMxFPvkBmbTwEjVq']) {
        vueData.$watch(function() {
            return vueData.formData.multinfos['230104172542tOJoMxFPvkBmbTwEjVq'].rows
        }, function(n, o) {
            console.log(n);
            if (n.length > 2) {
                formData.multinfos['230104172542tOJoMxFPvkBmbTwEjVq'].rows.splice(2, 1)
                dsf.layer.toast("银行信息最多2个！")
            }
        }, {
            deep: true,
            immediate: true,
        })
    }

}


exportObj.save = function(formData, formStruct, vueData) {
    console.log(vueData.nowButton);
    vueData.notVaildateMetas = formStruct.controls.map(control => control.metaId)
    vueData.buttonHandle['saveNoTip'](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            null,
            false
        )
        // vueData.backSucces()
}

exportObj.saveFilter = function(formData, formStruct, vueData, action) {
    debugger
    console.log(action);
    return new Promise(function(resolve, reject) {
        try {
            if (action == 'send') {
                let len1 = vueData.formData.multinfos['230104172533wESYWbcP1LiqojizsNY'].rows.length || ""

                let len2 = vueData.formData.multinfos['230104172542tOJoMxFPvkBmbTwEjVq'].rows.length || ""
                console.log(len1);
                console.log(len2);
                if (len1 == 0) {
                    reject("请至少填写1个家庭成员信息")

                } else {
                    resolve()
                    dsf.util.saveToLocalStore('formPk', formStruct.parameters.pk)
                }
                // else if (len2 < 2) {
                //     reject("请至少填写两个开户行信息")
                // }
            } else {
                dsf.util.saveToLocalStore('formPk', formStruct.parameters.pk)
            }


            resolve()
        } catch (error) {
            resolve()
        }



    })

}

function name(params) {
    let url = `#/logNameAutologin?logName=rssjcj&state=Y29tbW9uRm9ybS8yMzAxMDQxNzA2MDdOSlVkVzVMaUcxRmlMaDNWQWJ1`
}




export default exportObj;
