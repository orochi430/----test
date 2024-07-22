// <!-- 征询单中议题填报--jf -->

const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
  console.log(listid);
  // vueData.$eventBus.refreshBadge(vueData)
  vueData.$router.push({
    path: `/commonForm/${moduleId}/${pk}?listId=210731153816nI4Ajx2pjB2mnhXB76o`
  });
};

exportObj.createRow = function(btn, vueData) {
  console.log(btn);
  console.log(vueData);
  vueData.$router.push({
    path: `/commonForm/${vueData.moduleId}`,
    query: {
      listId: "210731153816nI4Ajx2pjB2mnhXB76o",
      method: "editInfo",
      validateByList: "1",
      sfzx: "1",
      masterId: vueData.$parent.$parent.formData.main["A0001"].value,
      hylx: vueData.$parent.$parent.formData.main["C-MEETINGAGENDA-0012"].value,
      hylxText:
        vueData.$parent.$parent.formData.main["C-MEETINGAGENDA-0012"].text
    }
  });
};

export default exportObj;
