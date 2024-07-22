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
    window.spListJS = exportObj;
})()