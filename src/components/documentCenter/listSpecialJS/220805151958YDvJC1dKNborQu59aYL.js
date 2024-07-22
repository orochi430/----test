// 【平台】通知公告
import dsf from "../../../common";

const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    vueData.$set(itemValue, "B.C-HWXT-HYXX-USER-0002.text", '已读');
    let fid = vueData.$route.query.secQuery ? JSON.parse(vueData.$route.query.secQuery).fid : vueData.$route.query.fid;
    vueData.$router.push({
        path: `/conference/notice`,
        query: {
            moduleId: moduleId,
            pk: pk,
            fid: fid
        }
    });
}
export default exportObj;