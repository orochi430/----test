//导出共有的对象
const exportObj = {};

exportObj.initHandle = async function (formData, formStruct, vueData) {
    //inputObj为输入的对象内容
    vueData.$bus.on("blurBus", function (inputObj) {
        if (inputObj.metaData.metaId == "220513112349sQ5GywYkYb6Q3wldaQ9") {//匹配报销金额控件
            //reg为正则匹配方法  
            let reg = /^[0-9]+.?\d*$/;
            //inputObj.value为输入的金额
            let money = reg.test(inputObj.value) ? inputObj.value : 0;
            //amountWords为转换方法
            money = dsf.util.amountWords(money)
            vueData.$set(vueData.formData.main, "220513112433jD7Hlz9ZHjl5DfG5PFB", { value: money })//匹配金额大写控件
        }
    })

}

exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
        try {
            let userId=formData.main["A0010"].value
            if (vueData.$route.params.pk) {
                userId=vueData.$user.user_id
            }
            dsf.http.post("fn/mobile/user/singleton", { userId:userId  }).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.signPhoto?.length) {
                        resolve()
                    }
                    else {
                        reject("暂无签名照片，请先上传签名照")
                    }
                } else {
                    reject("获取签名照异常，请联系管理员")
                }
            }).error(e => {
                reject("暂无签名照片，请先上传签名照")
            })

        } catch (error) {
            resolve()
        }
    })
}

exportObj.saveAfter = function (vueData, params, formData) {
    if (vueData.$route.params.pk) {
        dsf.layer.toast("表单保存成功")
        vueData.$eventBus.refresh(vueData);
    } else {
        dsf.http.post('ctrl/reimburse/mobileSignPhoto', { pk: vueData.formParams.pk }).then(res => {
            if (res.data.code == 200) {
                dsf.layer.toast("表单保存成功")
                vueData.$eventBus.refresh(vueData);
            } else {
                dsf.layer.toast(res.data.message)
            }
        }).error(e => {
        })
    }
}

export default exportObj;