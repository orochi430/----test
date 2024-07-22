//远程议题申报单
(function () {
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        formStruct.subform["230605105750RCd8I2QYqrYFvXqa70L"].controls.forEach(item => {
            if (['230620204627X0dYMadSTcNI1tLFsoY','230620204723TtedurwmW1t3595XiBv'].includes(item.metaId)) {
                vueData.$set(item, "show", 0)
            }
        });

        formStruct.subform["230605105803yQmADz0aYvJxBmBUHxa"].controls.forEach(item => {
            if (['230629150528lHIdnMqKrfv5FfWogcL','230629151444xtkarwXpMRxchXo4OAv'].includes(item.metaId)) {
                vueData.$set(item, "show", 0)
            }
        });
    }

    exportObj.sendAfter = function (formData, formMeta, vueData) {
        dsf.http.post("ctrl/fgwApi/meeting/afterSend", {
            "pnid": formMeta.parameters.pnId,
            "pk": formMeta.parameters.pk
        }).then(result => {
            console.log("===============  发送成功 ===========================")
        }).error(() => {
            console.log("===============  请求异常 ===========================")
        })
    }
    window.spJS = exportObj;
})()