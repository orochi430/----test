//意见维护列表
(function () {
  const exportObj = {};

  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    console.log(itemValue);
    vueData.$router.push({
      path: `/commonForm/190812173618iFCoPPLoNcCkftTOTHQ/${itemValue["S-BASE-0001.value"]}`,
      query: {
        customXForm: "231214135820jHjKGpzR7KjN02vKuF1",
        customInfoId:
          dsf.util.loadSessionStore("OpinionMaintenance").customInfoId,
        customPid: dsf.util.loadSessionStore("OpinionMaintenance").customPid,
        customFlowId:
          dsf.util.loadSessionStore("OpinionMaintenance").customFlowId,
        opinionNodeId:
          dsf.util.loadSessionStore("OpinionMaintenance").opinionNodeId,
        opinionNodeName:
          dsf.util.loadSessionStore("OpinionMaintenance").opinionNodeName,
        opinionNodeNameCondition:
          dsf.util.loadSessionStore("OpinionMaintenance")
            .opinionNodeNameCondition,
        leaderOpinion:
            dsf.util.loadSessionStore("OpinionMaintenance")
              .leaderOpinion,
        listId: "231204144747uQcstWFNRUu8AGKK6ml",
        method: "enterNode",
        showNodeId: "-2",
      },
    });
  };

  exportObj.create = function (data, vueData) {
    console.log(dsf.util.loadSessionStore("OpinionMaintenance"));
    vueData.$router.push({
      path: `/commonForm/190812173618iFCoPPLoNcCkftTOTHQ`,
      query: {
        customXForm: "231214135820jHjKGpzR7KjN02vKuF1",
        customInfoId:
          dsf.util.loadSessionStore("OpinionMaintenance").customInfoId,
        customPid: dsf.util.loadSessionStore("OpinionMaintenance").customPid,
        customFlowId:
          dsf.util.loadSessionStore("OpinionMaintenance").customFlowId,
        opinionNodeId:
          dsf.util.loadSessionStore("OpinionMaintenance").opinionNodeId,
        opinionNodeName:
          dsf.util.loadSessionStore("OpinionMaintenance").opinionNodeName,
        opinionNodeNameCondition:
          dsf.util.loadSessionStore("OpinionMaintenance")
            .opinionNodeNameCondition,
        leaderOpinion:
          dsf.util.loadSessionStore("OpinionMaintenance")
            .leaderOpinion,
      },
    });
  };
  window.spListJS = exportObj;
})();
