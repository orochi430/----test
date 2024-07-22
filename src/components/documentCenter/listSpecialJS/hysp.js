//西藏会议视频特殊列表开发 2022年6月24日 @ly
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, VueData, itemValue) {
    console.log(itemValue)
    if (itemValue["vodId"]&&itemValue["vodId"].toString().length) {
        dsf.http.post(`fn/vedioMeeting/queryPlayConnection?vodId=${itemValue["vodId"]}`).then(({ data }) => {
            console.log(data)
            if (data.playUrl&&data.playUrl.length) {
                VueData.video.showVideo = true;
                VueData.video.videoTitle = "视频播放";
                VueData.video.src = data.playUrl;
            }
            else {
                dsf.layer.toast("当前会议视频暂无播放地址", false)
            }
        })
    }
}

export default exportObj;
