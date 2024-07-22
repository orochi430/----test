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
export default exportObj;
