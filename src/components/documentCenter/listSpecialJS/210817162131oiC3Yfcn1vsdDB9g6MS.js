
const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: `/commonForm/${itemValue['A0004']}/${itemValue['A0001']}?listId=MeetingBmList&method=viewBmb&validateByList=1&tzlx=${itemValue['c-meetingtz-025.value']}`,
    })
}
exportObj.custom1 = function(itemValue, vueData) {
    console.log(itemValue)
    vueData.$dialog.confirm({
        title: '提示',
        message: '确定要重报吗？'
    }).then(() => {

        dsf.http.post("fn/meetingNotice/backNotice", {
            pk: itemValue.dataValue['A0001']
        }).done(res => {
            dsf.layer.toast(res.message);
            vueData.onRefresh()
        }).error(function(message) {
            dsf.layer.toast(message);
        })

    }).catch(() => {});
}




export default exportObj;