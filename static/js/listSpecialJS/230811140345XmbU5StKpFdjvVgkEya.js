// 一体化  人事信息发布-通知
; (function () {
    const exportObj = {}
    
    exportObj.initHandle = function (vueData) {
        vueData.readStatusKey = 'B0058'
        vueData.haveReadVal = "2" //1 未阅 2 已阅
    }

    exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
        itemValue['B0058'] = "2";
        vueData.$router.push({
            path: `/commonForm/${moduleId}/${pk}`,
            query: {
                listId: listid,
                distribId: itemValue['DISTRIB_ID']
            }
        })
    }
    window.spListJS = exportObj
})()