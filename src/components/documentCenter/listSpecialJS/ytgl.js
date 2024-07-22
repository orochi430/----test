//议题管理列表
const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
  let meetingId = vueData.$route.query.id;
    vueData.$router.push({
      path: `/commonForm/210607181937YJxUC5fve4y7q3SH5hJ/${itemValue.id}?listId=MeetingList&method=viewYt&showNodeId=13&validateByList=1&meetingId=${meetingId}&pk=${itemValue.id}`,
    })
}
function updateTopicType(item,vueData,topicType){
    let params = {
        topicId:item.dataValue.id,
        topicType:topicType
    }
    dsf.http.post("/fn/conferenceMobile/updateTopicType", params).done(res => {
        if (res.code == 200) {
            dsf.layer.toast(res.message);
            vueData.onRefresh()
        } else {
          dsf.layer.toast(res.message);
        }
      }).error( (err)=> {
        dsf.layer.toast(err);
      })
}
//开始
exportObj.startTopic =  (item,vueData)=> {
    updateTopicType(item,vueData,1)
}
//结束
exportObj.endTopic =  (item,vueData)=> {
    updateTopicType(item,vueData,-1)
}
//提醒
exportObj.remindUser =  (item,vueData)=> {
    let meetingId = vueData.$route.query.id;
    let params = {
        meetingId:meetingId,
        topicId:item.dataValue.id
    }
    dsf.http.post("/fn/conferenceMobile/remindTopicUsers", params).done(res => {
        if (res.code == 200) {
            dsf.layer.toast(res.message);
        } else {
          dsf.layer.toast(res.message);
        }
      }).error( (err)=> {
        dsf.layer.toast(err);
      })
}
function openOrCloseVote(item,vueData,type){
  dsf.http.post("fn/meetingVote/openVote", {
    topicId:item.dataValue.id,
    type:type
  }).done(res => {
      if(res.code=='200'){
          dsf.layer.toast(res.message);
          vueData.onRefresh();
      }
  }).error(function(message) {
      dsf.layer.toast(message);
  })
};
//开启投票
exportObj.openVot =  (item,vueData)=> {
   openOrCloseVote(item,vueData,'1')
}
//结束投票
exportObj.closeVot =  (item,vueData)=> {
  openOrCloseVote(item,vueData,'-1')
}
//表决结果
exportObj.votStatistics =  (item,vueData)=> {
    let meetingId = vueData.$route.query.id;
    vueData.$router.push({
        path: `/meetingcast`,
        query: {
            meetingId:meetingId,
            topicId:item.dataValue.id,
            // showNodeId:'13'
          }
    })
}
export default exportObj;