//上海地产  跟进记录列表
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: moduleId,
      pk: pk
    },
    query:{
      fid:vueData.$route.query.pk,
      formId:"220322154355WfdMO3jDn0kKQUpIvAt",
      listId :"220322154357sWrnJeVrq7tLsWUJalS",
      validateByList:1,
      method:"viewOrEdit"
    }

  });
}

exportObj.createRow = function (btn, vueData) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: "220322154355adLEdmkADFhIgMN8N9M"
    },
    query:{
      fid:vueData.$route.query.pk,
      formId:"220322154355WfdMO3jDn0kKQUpIvAt"
    }
  })
}

export default exportObj;
