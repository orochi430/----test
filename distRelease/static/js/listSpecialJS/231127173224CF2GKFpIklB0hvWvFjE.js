// 经信委列表跳转
(function () {
    const exportObj = {}
    exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}`,
        query: {
          listId: "MeetingBmList",
          validateByList: 1,
          noRela: 1,
          method: 'chooseMember',
        }
      })
    }
    window.spListJS = exportObj
  })()