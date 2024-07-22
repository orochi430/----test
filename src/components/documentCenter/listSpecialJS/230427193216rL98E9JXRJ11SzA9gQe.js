// 信息报送
const exportObj = {}
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}`,
    query: {
      formId: itemValue["A0008"] == "210108134837DusAGav5KEk6QXniSHm" ? "230410174529WdI4KjfMkfUXzPQgLQN " : "230522211351FsvyyoClqHzfD7HJaF8 ",
      method: "openform",
      validateByList: 1,
      listId: "OpenOtherViewForm"
    }
  })
}

export default exportObj
