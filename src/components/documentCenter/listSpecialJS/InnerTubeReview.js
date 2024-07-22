const exportObj = {};
exportObj.init = function (vueData) {
    if (vueData.$route.query.infoId) {
        dsf.http.post('ctrl/InnerTubeReview/clearTodoAdd',{
            infoId: vueData.$route.query.infoId
        }).then(res => {
            // vueData.onRefresh()
        })
    }
}
exportObj.initHandle = function (vueData) {
    vueData.isShowNullColumn = false
}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: `/commonForm/211130160551z4zocmPNEkWjpCnLLUA/${itemValue.ID}`,
        query: {
            verify: itemValue.AUDIT_TEXT == '未阅签' ? 1 : 0,
            listId: 'innerTuber',
            validateByList: '1',
            nodeId: '-1'
        }
    })
}
export default exportObj;
