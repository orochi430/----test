// 政务微信 我的素材列表 点击进查看节点
(function (){
    const exportObj = {};
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
        console.log(vueData);
        vueData.$router.push({
            path:`/commonForm/201230104729NVc4Ecw28SzntMvQ9B0/${pk}`,
            query:{
               listId:"P1108Common",
               method: "openForm",
               toNodeId: '-1',
               pk:pk
            }
        })
  }
  exportObj.dataFilter = function (listData, vueData) {
    vueData.controlData.filter
    vueData.controlData.push({
    "metaData": "status",
    "selectData": [
        {
            "value": "TGCB_STATUS__=__-1___PUBLISH_STATUS__=__0",
            "text": "已退回"
        },
        {
            "value": "PUBLISH_STATUS__=__0___TGCB_STATUS__==__-1",
            "text": "未报送"
        },
        {
            "value": "PUBLISH_STATUS__=__1___USE_STATUS__==__1",
            "text": "已报送"
        }
    ],
    "control": "search_controlRadio",
    "title": "状态",
      "placehold": "",
    "value": ""
})
  }
    window.spListJS = exportObj;
})()
