//上海地产  跟进记录列表
const exportObj = {};

exportObj.createdata = function (btn, vueData) {
  let params = {
    pk: vueData.$route.query.pk
  }
  dsf.http.post("fn/customerLeads/newFollowRecord", params).then(res => {
    vueData.$router.push({
      name: "commonForm",
      params: {
        moduleId: "2204271747271slhX8kXtQoXDyAskg7",
        pk: res.data.pk
      },
      query: {
        formId: "220427174727TT4pVoRdXrqsDpDOyFl", fid: vueData.$route.query.pk
      }
    })
  });
}
// exportObj.createRow = function (btn, vueData) {
//   vueData.$router.push({
//     name: "commonForm",
//     params: {
//       moduleId: "2204271747271slhX8kXtQoXDyAskg7"
//     },
//     query: {
//       fid: vueData.$route.query.pk
//     }
//   })
// }

export default exportObj;
