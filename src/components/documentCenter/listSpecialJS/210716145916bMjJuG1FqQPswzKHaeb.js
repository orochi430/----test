/*
 * @Author: jiangfeng
 * @Date: 2023-04-28 15:10:01
 * @Last Modified by: 会议
 * @Last Modified time: 2023-04-29 16:21:08
 */

import dsf from "../../../common";

const exportObj = {};
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
  console.log(itemValue);
  vueData.$router.push({
    path: `/commonForm/${itemValue["C-MEETINGROOM-POCCUPY-0005"]}/${itemValue["C-MEETINGROOM-POCCUPY-0004"]}`,
    query: {
      listId: '210607181937YJxUC5fve4y7q3SH5hJ',
      method: "checkInfo",
      validateByList: "1",
      mId: `${itemValue["C-MEETINGROOM-POCCUPY-0005"]}`,
  }
  });
};

exportObj.dataFilter = function(listData, vueData) {
  console.log(listData);
  listData.forEach(element => {
    let str =
      element.dataValue["C-MEETINGROOM-POCCUPY-0001"] +
      " ~ " +
      element.dataValue["C-MEETINGROOM-POCCUPY-0002"].substr(10);
    if (
      moment(new Date(element.dataValue["C-MEETINGROOM-POCCUPY-0001"])).format(
        "YYYYMMDD"
      ) !=
      moment(new Date(element.dataValue["C-MEETINGROOM-POCCUPY-0002"])).format(
        "YYYYMMDD"
      )
    ) {
      str =
        element.dataValue["C-MEETINGROOM-POCCUPY-0001"] +
        " ~ " +
        element.dataValue["C-MEETINGROOM-POCCUPY-0002"].substr(5);
    }
    vueData.$set(element.dataValue, "C-MEETINGROOM-POCCUPY-0001", str);
  });
};

export default exportObj;
