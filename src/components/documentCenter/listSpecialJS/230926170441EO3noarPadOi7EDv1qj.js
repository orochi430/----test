import dsf from "../../../common";
// 会中待服务--jf
const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    console.log(itemValue);
    dsf.layer.confirm({
        title: '服务详情',
        confirmButtonText: '已服务',
        cancelButtonText: '关闭',
        showCancelButton: true,
        message: `<div style="width:100%;padding-left:70px;white-space:nowrap;">
                            <p style="text-align:left; padding:5px 0"><span>${itemValue['B0009']}</span><span style="padding-left: 20px;">${itemValue['B0011']}</span></p>
                            <p style="text-align:left; padding:5px 0""><span>座位：${itemValue['C-HWXT-SERVE-CALL-0001.value']}</span></p>
                            <p style="text-align:left; padding:5px 0""><span>${itemValue['C-HWXT-SERVE-CALL-0004.value']}</span></p>
                        </div>`
      },() => {
        dsf.http.post('/fn/conferenceServeCall/finishServe', {
            pk: pk
        }).done(res => {
            if (res.type == "success") {
                dsf.layer.toast(res.message);
                vueData.onRefresh()
            } else {
                dsf.layer.toast("操作失败！");
            }
        })
    })
    return
    dsf.http.post('/fn/conferenceMessage/read', {
        pk: pk
    }).done(res => {
        if (res.type == "success") {
            
        } else {
            dsf.layer.toast("操作失败！");
        }
    }).error(error => {
        console.log("messageRead-error", error)
        dsf.layer.toast("操作失败！");
    }).always(() => {})
}

exportObj.dataFilter = function (listData,vueData) {
    console.log(listData);
}
export default exportObj;
