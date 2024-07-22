// 【山东烟草会务系统】统计分析
import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  if (itemValue.id == "yqfk") {
    vueData.$router.push({
      name: "commontabs",
      params: { key: "fytjfx" },
      query: { fid: vueData.$route.query.fid }
    })
  } else {
    vueData.$router.push({
      name: "SDYCSignDetail",
      params: { id: itemValue.id },
      query: {
        fid: vueData.$route.query.fid
      }
    })
  }


}
export default exportObj;
