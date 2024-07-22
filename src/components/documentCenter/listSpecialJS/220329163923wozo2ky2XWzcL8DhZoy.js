 // 工资查询【重庆财政局】
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    path: `/salaryDetailCQCZ/${pk}`,
    query: {
      listId: listid,
      // method: "showSalaryDetailFromMobile",
      // validateByList: 1,
      // title: '个人工资'
    }
  });
}
export default exportObj;
