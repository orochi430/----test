// 成都一体化  查看台账列表进表单逻辑
(function () {
    const exportObj = {}
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
        if (itemValue.allowMobile && itemValue.allowMobile != 1) {
            dsf.layer.toast("无权限查看具体文件信息")
            return
        }else{
            vueData.$router.push({
                path: `/commonForm/${moduleId || itemValue["A0004"]}/${pk||itemValue["id"]}`,
                query: {
                    validateByList: 1,
                    listId: '1903141007552oa8qPy14Jli1PosdgD',
                }
            });
        }
        
    }
    window.spListJS = exportObj
})()